import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './tests/browser',
  fullyParallel: true,
  workers: 3,
  timeout: 30000,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'https://localhost:8788',
    ignoreHTTPSErrors: true,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'], viewport: { width: 1280, height: 800 } },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'], viewport: { width: 1366, height: 768 } },
    },
  ],
  webServer: {
    command: 'npm run pages:dev',
    url: 'https://localhost:8788',
    ignoreHTTPSErrors: true,
    reuseExistingServer: !process.env.CI,
    timeout: 60000,
    env: { WRANGLER_SEND_METRICS: 'false', XDG_CONFIG_HOME: '/tmp/wyllex-config' },
  },
});
