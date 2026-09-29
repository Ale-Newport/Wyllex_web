# Release validation

Validated locally on 29 September 2026 against the production build and the Cloudflare Pages HTTPS emulator. This is a record of observed results, not a guarantee of production performance or a legal/accessibility certification.

## Build and code quality

- `npm install` completed; npm reported zero known vulnerabilities.
- `npm run lint`: Astro/TypeScript and ESLint passed with no errors, warnings, or hints.
- `npm test`: 25 tests passed. Coverage includes input normalization, size bounds, origin checks, HTTP responses, provider failures, duplicate signup, optional email, and consent-gated analytics.
- `npm run build`: all four HTML pages, robots and sitemap generated successfully.
- No unfinished TODOs, external stock assets, or privileged browser credentials.

## Browser checks

`npm run test:e2e`: 27 tests passed across Chromium, Firefox and WebKit.

Checks cover all nine product chapters, browser console errors, navigation, keyboard subject selection, form validation/loading/success/duplicate/error states, responsive layouts, reduced motion, no-JavaScript content, internal links, metadata, social assets, and the 404 page. Automated axe checks found no WCAG A/AA violations on `/`, `/privacy` or `/terms` in these runs.

Responsive coverage includes 320 × 568, 375 × 667, 390 × 844, 768 × 1024 and desktop. Manual visual review covered the hero and product sequence, the phone frame, subject explorer, supporting sections, waitlist, footer and both legal pages. Real iOS Safari, VoiceOver and physical-device scrolling remain useful release checks; WebKit engine tests are not a substitute for every real device.

## Lighthouse

Lighthouse 13.5.0, mobile simulated throttling, local HTTPS Pages server, 29 September 2026:

| Category       | Score |
| -------------- | ----: |
| Performance    |    97 |
| Accessibility  |   100 |
| Best practices |   100 |
| SEO            |   100 |

First contentful paint: **1.2 s**. Largest contentful paint: **2.6 s**. Total blocking time: **0 ms**. Cumulative layout shift: **0**.

The font optimization uses self-hosted Latin WOFF2 files, explicit preloads, and no embedded font data URLs, preserving the production CSP. The initial headline renders without a fade. Recheck Lighthouse on the real domain after deployment; latency, hardware, consented analytics and configured services affect results.

## Service and deployment boundaries

No production service credentials were supplied. Successful and duplicate signup responses and email behavior were tested with mocked providers; the real Pages Function's missing-configuration response was exercised in each browser. No actual Supabase records or confirmation emails were created.

Before accepting public signups, apply the migration, configure Supabase, and verify a real signup, case-insensitive duplicate and denied public reads/updates/deletes. If enabled, verify Resend delivery and PostHog consent with the real projects. Provision the Cloudflare Pages project, attach the domain, set the www redirect and confirm HTTPS. The README contains the complete setup and founder/legal confirmation checklist.

The npm override pins Miniflare's `undici` dependency to 7.29.1 to avoid the advisory reported by the initially resolved version. Re-evaluate this override with future Wrangler upgrades.
