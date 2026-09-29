# Wyllex

**Law worth scrolling.** A complete consumer website for the upcoming Wyllex iOS app. Built with Astro, React, TypeScript, Tailwind CSS and GSAP. Designed for Cloudflare Pages with one small signup Function and Supabase storage. No application server, authentication system, paid assets, stock photography, or service-role database key is required.

## The experience

One persistent CSS/SVG iPhone moves through a 700svh desktop story: introduction, subjects, the scrolling feed, five teaching formats, revision, recommendations, focus, progress, and the final product reveal. Mobile uses a shorter 580svh sequence, copy above the device, a fixed camera, and compact layouts. Chapter buttons allow direct navigation. Reduced motion replaces the long scroll with a single explorable panel. A server-rendered narrative and email signup fallback are available without JavaScript.

The remaining page includes an eight-subject keyboard-accessible explorer, how it works, and the waitlist. `/privacy`, `/terms`, a custom 404, original social artwork, favicon, robots and sitemap are included. All app content and statistics are explicitly illustrative. No real student outcomes are asserted.

## Installation and local development

Use **Node 22.12+** (Node 22 LTS recommended) and npm. Exact dependency versions and a lockfile are committed.

```sh
npm install
cp .env.example .env
npm run dev
```

Astro serves the visual preview at `http://localhost:4321`. It does not execute Cloudflare Pages Functions. Without the API, signup displays a recoverable error; it never invents a successful subscription.

For a full local Cloudflare environment:

```sh
npm run build
cp .env.example .dev.vars
# Add Supabase values to .dev.vars; leave optional providers empty.
npm run pages:dev
```

The Pages emulator runs at `https://localhost:8788` with a local certificate. The HTTPS mode preserves production CSP behavior in WebKit. Browser tests trust this local test certificate only. Use the HTTP Astro preview for normal visual development if the local certificate is not trusted on your machine; do not weaken production headers.

`.env` supplies **build-time** variables; `.dev.vars` supplies **Pages Function runtime** values. Both are ignored by Git. Restart/rebuild after changing configuration. To suppress Astro telemetry in restricted environments, set `ASTRO_TELEMETRY_DISABLED=1`.

### Commands

| Command             | Purpose                                                |
| ------------------- | ------------------------------------------------------ |
| `npm run dev`       | Astro visual development preview                       |
| `npm run build`     | Generate static production assets in `dist/`           |
| `npm run preview`   | Preview static build (without API)                     |
| `npm run pages:dev` | Production-like HTTPS Pages + Functions emulator       |
| `npm run lint`      | Astro/TypeScript checks and ESLint accessibility rules |
| `npm test`          | Signup validation and server security/response tests   |
| `npm run test:e2e`  | Chromium, Firefox and WebKit browser checks            |
| `npm run check`     | Lint, unit tests and production build                  |
| `npm run assets`    | Recreate the original SVG/PNG social card              |
| `npm run deploy`    | Check, build, then deploy with authenticated Wrangler  |

Before the first browser-test run, install browsers with `npx playwright install chromium firefox webkit`. Run `npm run build` before `npm run test:e2e`. Tests automatically start an HTTPS Pages emulator, mock successful/duplicate signups, and exercise the real missing-configuration error. They never insert records into a production database. Leave Supabase unconfigured for this test run.

## Environment variables

| Variable                   | Required     | Where                              | Purpose                                                        |
| -------------------------- | ------------ | ---------------------------------- | -------------------------------------------------------------- |
| `PUBLIC_SUPABASE_URL`      | For signup   | Pages runtime / `.dev.vars`        | Supabase project URL                                           |
| `PUBLIC_SUPABASE_ANON_KEY` | For signup   | Pages runtime / `.dev.vars`        | Public **anon** project key; RLS applies                       |
| `PUBLIC_POSTHOG_KEY`       | No           | Build / `.env`                     | PostHog project token; empty disables analytics and consent UI |
| `PUBLIC_POSTHOG_HOST`      | With PostHog | Build / `.env`                     | Ingestion host; default `https://eu.i.posthog.com`             |
| `PUBLIC_APP_STORE_URL`     | No           | Build / `.env`                     | Changes primary CTAs to the App Store                          |
| `RESEND_API_KEY`           | No           | Pages runtime secret / `.dev.vars` | Optional signup confirmation email                             |
| `RESEND_FROM_EMAIL`        | With Resend  | Pages runtime / `.dev.vars`        | Verified sender; defaults to brand contact in site config      |

The Supabase variables keep the requested `PUBLIC_` names but signup uses them from the Function. An anon key is deliberately not privileged. **Never use a service-role key**, put Resend credentials in a public-prefixed variable, or commit environment files.

Missing Supabase settings yield HTTP 503 and a friendly retry/contact message. Missing PostHog means zero analytics requests. Missing Resend means signups still work, without a confirmation email.

## Supabase

1. Create a Supabase project, preferably in the region selected for your data policy.
2. Apply `supabase/migrations/202609290001_waitlist.sql` in the SQL editor. Alternatively, link the project with the Supabase CLI and run `supabase db push`.
3. Add the project URL and legacy public **anon** key to the Pages runtime environment. Do not use `service_role`.
4. Verify the migration's RLS policies and privileges before launch.
5. Submit an address you control on a staging deployment. Verify one row, then submit its uppercase variant and verify the duplicate response and unchanged row count.
6. Using the anon key, verify SELECT, UPDATE and DELETE are denied. Never grant public SELECT to make an insert response work.

### Schema and security

`waitlist` contains `id` (UUID), normalized unique `email`, optional `university`, server-generated `created_at`, referring hostname, and three UTM labels. Email normalization and a database uniqueness constraint prevent case-variant duplicates. Field-length checks also apply in SQL. The browser and Function both validate email.

RLS is enabled. Anonymous users can INSERT only the six visitor-controlled columns; they cannot supply IDs or timestamps. There are no anonymous SELECT, UPDATE or DELETE grants/policies. The API uses `Prefer: return=minimal` so it never needs to read subscribers. There is no security-definer function and no privileged credential.

The Function checks same-origin requests, JSON content, a bounded 4 KB body, input lengths, and a hidden honeypot. It distinguishes unique-constraint conflicts from other failures and does not reveal database error details. An explicit duplicate response necessarily discloses whether a submitted address is already registered; no list or subscriber details are readable.

This remains an intentionally public signup endpoint. RLS is not bot protection, and the anonymous Supabase insert endpoint can be called directly by anyone who knows the project credentials. Configure sensible Cloudflare rate limiting for `/api/waitlist` and monitor Supabase usage. For sustained abuse, add server-verified Turnstile and move insertion behind a private database function/role; that is a separate infrastructure change. Do not solve abuse by exposing a privileged key.

Administrative access, exports, correction and deletion happen through the Supabase dashboard. Deletion requests should be verified against the signup address. Backups follow the provider retention policy.

## Cloudflare Pages deployment

Connect this Git repository to a **Pages** project named `wyllex`, or create it with `npx wrangler pages project create wyllex`. Select the production branch you intend to ship.

| Setting             | Value                         |
| ------------------- | ----------------------------- |
| Framework           | Astro                         |
| Root directory      | Repository root               |
| Build command       | `npm run build`               |
| Build output        | `dist`                        |
| Node version        | `22` (via `.node-version`)    |
| Functions directory | `functions` (auto-discovered) |

`wrangler.toml` supplies the Pages name, output directory and compatibility date. Add runtime values and secrets in the Pages project's settings for **Production** and separately for **Preview**. Add public PostHog/App Store variables to the build environment, then rebuild. Preview deployments should use a separate Supabase project or leave signup disabled.

For CLI deployment, authenticate with Wrangler, then run `npm run deploy`. Wrangler uploads `dist` and compiles `functions/` from this repository. Do **not** drag and drop only the static `dist` folder into an upload that omits Pages Functions. The shipped `_routes.json` routes only `/api/*` through Functions; the marketing pages stay static.

### Custom domain: wyllex.com

1. Add `wyllex.com` as a Pages custom domain. For an apex domain, manage its zone/nameservers in Cloudflare and follow Pages' DNS setup.
2. Add `www.wyllex.com` as well so both hostnames have a valid TLS certificate and reach the project.
3. In the domain's **Rules → Redirect Rules**, add a single permanent redirect:
   - Match expression: `(http.host eq "www.wyllex.com")`
   - Dynamic destination: `concat("https://wyllex.com", http.request.uri.path)`
   - Status: **301**
   - Preserve query string: **on**
4. Enable **Always Use HTTPS** and verify both HTTP hostnames redirect to HTTPS. Keep TLS in Full (strict) where an origin is relevant. Pages manages its own certificates.
5. Confirm `/`, `/privacy`, `/terms`, `/robots.txt`, `/sitemap-index.xml` and `/og.png` resolve on the apex; confirm `www` preserves path and query on redirect.

Host-based redirects must be configured at the zone. Cloudflare Pages `_redirects` accepts relative source paths and cannot express this host condition. The checked-in file documents this intentionally; it contains no invalid absolute-source rule. Security headers include HSTS, a restrictive permissions policy, anti-framing and CSP. Because HSTS includes subdomains, confirm every active Wyllex subdomain supports HTTPS before public launch.

## PostHog and consent

Set the project key and ingestion host, then rebuild. Only explicit events are captured:

`page_view`, `hero_cta_clicked`, `scroll_demo_started`, `scroll_demo_completed`, `waitlist_started`, `waitlist_joined`, `subject_viewed`.

There is no PostHog SDK, autocapture, session replay, persistent analytics ID, or email/university collection. A small typed client sends events to PostHog's public ingestion API **after consent**. A random page-session identifier exists only in memory. Only the pathname is sent, never query strings; location enrichment and person-profile creation are disabled. The consent choice is stored locally, and “Privacy choices” in the footer permits withdrawal. DNT and GPC disable collection even if consent was previously accepted.

The default CSP permits EU/US PostHog ingestion domains. For a self-hosted PostHog host, also add its exact HTTPS origin to `connect-src` in `public/_headers`. Do not use a wildcard for every domain. Verify the browser sends no analytics request before consent, sends the intended events after acceptance, and stops after withdrawal. Configure the project's retention period and confirm it matches the policy before launch.

## Resend confirmation email

Optional: verify the sender domain in Resend, configure SPF/DKIM as instructed by Resend, then add `RESEND_API_KEY` as a **Pages secret** and `RESEND_FROM_EMAIL` as a verified sender address. The default is derived from the brand contact.

Only a newly inserted signup triggers an email. Delivery runs through `waitUntil`; a delivery failure does not undo a successfully saved signup. Duplicate signups do not trigger another email. No subscriber details or provider response bodies are logged. The confirmation includes a reply-to address and instructions to leave the list. No marketing campaign is sent automatically. Process unsubscribe requests before any later mailing.

## Editing the brand and content

- **`src/config/site.ts`**: brand, domain/canonical origin, contact, social links, App Store link, analytics/Supabase public settings and legal metadata. Empty social links render nothing.
- **`src/lib/content.ts`**: the nine chapters and eight Law subject descriptions/examples.
- **`src/components/sections/ProductExperience.tsx`**: scroll pacing, chapter controls, mobile/reduced-motion decisions and analytics milestones.
- **`src/components/phone/PhoneFrame.tsx`**: persistent device frame and screen transitions.
- **`src/components/app/AppUI.tsx`**: reusable fictional iOS screens and original SVG illustrations. Replace lesson content here; the native design grid is 338 × 702 pixels.
- **`src/styles/global.css`**: brand tokens, responsive layouts, phone/UI styling and motion.
- **`scripts/generate-og.mjs`**: original social artwork source. Run `npm run assets` after changing its copy or visual direction. `public/og.svg` and `public/og.png` are committed outputs.
- **`functions/api/waitlist.ts`**: server-only signup and confirmation delivery.

Set `PUBLIC_APP_STORE_URL` to the final HTTPS listing and rebuild to activate the App Store CTA. Until then, every primary acquisition link leads to the waitlist. Do not insert fake store URLs or social handles.

## Accessibility and performance

Semantic landmarks, a skip link, visible focus styles, keyboard subject tabs, associated form labels, live form results and reduced-motion support are implemented. Decorative app screens are hidden from assistive technology; equivalent chapter copy is present in the document. All essential content is server-rendered. Fonts are self-hosted. SVG/CSS visuals avoid image/video downloads and autoplay constraints. GSAP changes transforms and CSS properties; React state updates only when the active chapter or format changes. Secondary subject interaction hydrates when visible.

The test suite covers browser engines, small phones, tablet, navigation, reduced motion, signup states, keyboard controls, no-JavaScript fallback, metadata, links, missing pages and automated WCAG checks. Automated checks complement visual inspection; they do not certify full accessibility. Real iOS Safari and assistive-technology testing should also be part of ongoing releases.

See [release validation](docs/validation.md) for the recorded browser checks, 25 passing unit tests and mobile Lighthouse results (97 performance; 100 accessibility, best practices and SEO), including the limits of local and mocked-provider testing.

## Founder decisions to confirm before public launch

These are operational/legal confirmations, not unfinished interface work:

- Confirm the operating person's or entity's legal name, contact address requirements, jurisdiction and ownership. The central config currently names **Wyllex**, with **England and Wales** as the governing law.
- Activate and monitor **hello@wyllex.com**, including privacy and deletion requests.
- Have counsel review the privacy notice, terms, minimum age (16+), provider arrangements, international transfers, consent language, and learning/content disclaimers for the actual launch markets. No legal-compliance certification is claimed.
- Implement the stated retention process: waitlist details up to 12 months after public launch; discontinued waitlists deleted within 90 days. Confirm the actual PostHog retention and provider backup policies.
- Confirm course/jurisdiction coverage and have qualified subject reviewers verify educational material before placing it in the released app. Website examples are introductory UK/EU illustrations, not the full curriculum.
- Confirm the iOS focus/app-blocking functionality, permissions and availability before representing it as a released feature.

## Deployment checklist

- [ ] `npm install`, `npm run lint`, `npm test`, `npm run build`, `npm run test:e2e` pass.
- [ ] Review desktop/mobile, full story, reduced motion and all three main routes.
- [ ] Apply Supabase migration; configure runtime URL and anon key; verify one real signup and duplicate in staging.
- [ ] Verify anonymous records cannot be listed, modified or deleted.
- [ ] Configure rate limiting and monitor signup errors.
- [ ] Verify sender DNS and confirmation delivery if using Resend.
- [ ] Verify consent behavior with your own PostHog key if using analytics.
- [ ] Complete founder/legal confirmations and activate contact mailbox.
- [ ] Deploy the repository with its Pages Functions, not just a static upload.
- [ ] Attach apex and www domains, enable the 301 Redirect Rule and HTTPS.
- [ ] Check production headers, social preview, sitemap and Lighthouse after deployment.

Provider credentials, account provisioning, DNS changes and real email delivery cannot be validated until the founder supplies/configures those services. The implementation fails gracefully when they are absent.

## Source references

Deployment follows [Cloudflare Pages Functions](https://developers.cloudflare.com/pages/functions/get-started/) and [Wrangler Pages configuration](https://developers.cloudflare.com/pages/functions/wrangler-configuration/). Database access follows [Supabase row-level security](https://supabase.com/docs/guides/database/postgres/row-level-security). Consent handling is informed by the [ICO's visitor privacy approach](https://ico.org.uk/global/privacy-notice/visitors-to-our-website/). These references do not replace a review of Wyllex's actual operations.
