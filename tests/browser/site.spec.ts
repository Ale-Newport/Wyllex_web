import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('the continuous phone story reaches every chapter without console errors', async ({
  page,
}, testInfo) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  await page.goto('/');
  await expect(page.locator('.experience')).toHaveAttribute('data-stage', '0');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Law worth');
  const phone = await page.locator('.phone-frame').boundingBox();
  expect(phone).not.toBeNull();
  expect(phone!.y).toBeGreaterThan(70);
  expect(phone!.y + phone!.height).toBeLessThan(page.viewportSize()!.height);
  await page.screenshot({ path: `test-results/${testInfo.project.name}-hero.png` });
  for (const [index, name] of [
    'Your subjects',
    'The feed',
    'Fresh formats',
    'Make it stick',
    'Your own pace',
    'Find your focus',
    'See your progress',
    'All together',
  ].entries()) {
    await page.getByRole('button', { name, exact: true }).click();
    await expect(page.locator('.experience')).toHaveAttribute('data-stage', String(index + 1));
    await expect(page.locator('.phone-frame')).toBeInViewport();
  }
  expect(errors).toEqual([]);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  );
});
test('subjects support keyboard selection', async ({ page }) => {
  await page.goto('/#subjects');
  const tab = page.getByRole('tab', { name: /Tort Law/ });
  await tab.click();
  await tab.press('ArrowUp');
  await expect(page.getByRole('tabpanel')).toContainText('When does a promise count?');
  await expect(page.getByRole('tab', { name: /Contract Law/ })).toHaveAttribute(
    'aria-selected',
    'true',
  );
  await page.getByRole('tab', { name: /Contract Law/ }).press('End');
  await expect(page.getByRole('tabpanel')).toContainText('But what makes it law?');
});
test('waitlist validates and shows loading, success and duplicate states', async ({ page }) => {
  await page.goto('/#waitlist');
  await page.getByRole('button', { name: 'Get early access' }).click();
  await expect(
    page.getByText('Enter a valid email address, such as you@university.ac.uk.'),
  ).toBeVisible();
  let duplicate = false;
  await page.route('**/api/waitlist', async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    await route.fulfill({
      status: duplicate ? 200 : 201,
      contentType: 'application/json',
      body: JSON.stringify({ status: duplicate ? 'duplicate' : 'joined' }),
    });
  });
  await page.getByLabel('Your email', { exact: true }).fill('student@example.com');
  await page.getByLabel('University').fill('University of York');
  await page.getByRole('button', { name: 'Get early access' }).click();
  await expect(page.getByRole('button', { name: 'Saving your place…' })).toBeVisible();
  await expect(page.getByRole('status')).toContainText('You’re on the list.');
  duplicate = true;
  await page.getByRole('button', { name: 'Use a different email' }).click();
  await page.getByLabel('Your email', { exact: true }).fill('student@example.com');
  await page.getByRole('button', { name: 'Get early access' }).click();
  await expect(page.getByRole('status')).toContainText('You’re already on the list.');
});
test('unconfigured waitlist gives an honest recoverable error', async ({ page }) => {
  await page.goto('/#waitlist');
  await page.getByLabel('Your email', { exact: true }).fill('student@example.com');
  await page.getByRole('button', { name: 'Get early access' }).click();
  await expect(page.getByRole('alert')).toContainText('temporarily unavailable');
  await expect(page.getByRole('button', { name: 'Get early access' })).toBeEnabled();
});
test('mobile layouts have no overflow and the menu and chapters work', async ({
  page,
}, testInfo) => {
  for (const size of [
    { width: 320, height: 568 },
    { width: 375, height: 667 },
    { width: 390, height: 844 },
    { width: 768, height: 1024 },
  ]) {
    await page.setViewportSize(size);
    await page.goto('/');
    await expect(page.locator('.phone-frame')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
    if (size.width < 768) {
      await page.getByRole('button', { name: 'Open navigation' }).click();
      await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible();
      await page.keyboard.press('Escape');
      await expect(page.getByRole('button', { name: 'Open navigation' })).toHaveAttribute(
        'aria-expanded',
        'false',
      );
    }
    if (testInfo.project.name === 'chromium')
      await page.screenshot({ path: `test-results/mobile-${size.width}.png` });
    await page.getByRole('button', { name: 'Make it stick', exact: true }).click();
    await expect(page.locator('.experience')).toHaveAttribute('data-stage', '4');
  }
});
test('reduced motion keeps all chapters available without a long scroll', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.getByRole('button', { name: 'Find your focus', exact: true }).click();
  await expect(page.locator('.experience')).toHaveAttribute('data-stage', '6');
  expect(
    await page.locator('.experience').evaluate((el) => el.getBoundingClientRect().height),
  ).toBeLessThan(1100);
  await page.getByRole('button', { name: 'All together', exact: true }).click();
  await expect(page.locator('.story-copy')).toContainText('Your Law degree. One feed.');
});
test('main and legal pages pass accessibility checks and have metadata', async ({ page }) => {
  for (const path of ['/', '/privacy', '/terms']) {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      `https://wyllex.com${path === '/' ? '/' : path}`,
    );
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      'content',
      'https://wyllex.com/og.png',
    );
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(results.violations).toEqual([]);
  }
});
test('links, SEO assets and the error page resolve', async ({ page, request }) => {
  await page.goto('/');
  const hrefs = await page
    .locator('a[href]')
    .evaluateAll((elements) => elements.map((el) => el.getAttribute('href') || ''));
  for (const href of new Set(hrefs.filter((h) => h.startsWith('/')))) {
    const url = new URL(href, 'https://wyllex.com');
    const response = await request.get(url.pathname);
    expect(response.status()).toBe(200);
    if (url.hash && url.pathname === '/')
      expect(await page.locator(url.hash).count()).toBeGreaterThan(0);
  }
  for (const path of ['/robots.txt', '/sitemap-index.xml', '/og.png', '/favicon.svg'])
    expect((await request.get(path)).status()).toBe(200);
  const response = await page.goto('/not-a-real-page');
  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { name: 'No case to answer.' })).toBeVisible();
});
test('content and email fallback remain accessible without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    ignoreHTTPSErrors: true,
    baseURL: 'https://localhost:8788',
  });
  const page = await context.newPage();
  await page.goto('/');
  await expect(page.locator('.no-script-story')).toContainText('Make scrolling work for you.');
  await expect(page.getByText('Prefer to join by email?')).toBeVisible();
  await context.close();
});
