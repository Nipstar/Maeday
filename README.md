# MaeDay: propertymanagementafterhoursansweringservice.com

Marketing site for **MaeDay**, after-hours answering for US property managers, a service of Antek Automation. Mae, an AI voice agent, answers tenant, owner, prospect and vendor calls when the office is closed, sends real emergencies to the on-call tech by the manager's own rules (with retries and a backup), logs everything else for the morning and emails a timestamped summary of every call. Plans, from `src/site.config.ts`: Starter $197 a month for 500 minutes, Growth $397 for 1,250, Portfolio $797 for 2,500, billed by the second. The one action the site sells is a 20-minute setup call.

Next.js (App Router, `output: 'export'`, `trailingSlash: true`), TypeScript, Tailwind CSS v4. Fully static: the build writes plain HTML to `out/`. No server runtime.

## Run

```bash
npm install
```

```bash
npm run dev
```

Open http://localhost:3000.

## Build and check

```bash
ALLOW_PLACEHOLDERS=1 npm run build
```

```bash
ALLOW_PLACEHOLDERS=1 npm run check
```

- `prebuild` regenerates `public/llms.txt` and `public/llms-full.txt` and runs the source copy checks.
- `postbuild` runs `scripts/check.ts` on `out/`. **Without `ALLOW_PLACEHOLDERS=1` the build fails while any `[[PLACEHOLDER]]` is left.** That is deliberate: production cannot ship with placeholders.
- `npm run check` = built checks + ESLint + `tsc --noEmit`.
- `npm run schema` validates every page's JSON-LD.
- `npm run check:selftest` breaks the built site one rule at a time and confirms `check.ts` fails each time.
- `npm test` runs Playwright and axe at 375 px and 1280 px against `out/`. Build with the test values first: `cp .env.example .env.local`.
- `npm run lighthouse` runs Lighthouse mobile on every sitemap page and fails under 95.
- `npm run preview` serves `out/` locally.

GitHub Actions (`.github/workflows/ci.yml`) runs all of the above on every pull request.

## Environment variables

Deployment values come from `NEXT_PUBLIC_*` environment variables, read at **build time** and baked into the static HTML (redeploy after changing one). None is secret. Any left unset shows its `[[PLACEHOLDER]]`. Copy `.env.example` to `.env.local` for local builds.

| Variable | Replaces | Notes |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | default domain | Optional override. Leave unset in production; Vercel previews use their branch URL automatically |
| `NEXT_PUBLIC_EMAIL` | `[[EMAIL]]` | Footer, schema, legal pages, thank-you |
| `NEXT_PUBLIC_DEMO_PHONE_DISPLAY` | `[[DEMO_PHONE_DISPLAY]]` | Twilio number on the Retell demo agent ("Oak Street Property Management"), as shown |
| `NEXT_PUBLIC_DEMO_PHONE_E164` | `[[DEMO_PHONE_E164]]` | Same number for `tel:` links, e.g. `+15550100142` |
| `NEXT_PUBLIC_BOOKING_URL` | `[[BOOKING_URL]]` | Setup-call calendar (GHL booking widget on crm.antekautomation.com). Opens in a modal |
| `NEXT_PUBLIC_ORDER_FORM_URL` | `[[ORDER_FORM_URL]]` | Starter checkout (pricing page only) |
| `NEXT_PUBLIC_GO_LIVE` | `[[GO_LIVE]]` | Setup time shown in FAQs and on thank-you, e.g. `3 to 5 business days` |
| `NEXT_PUBLIC_GTM_ID` | (GTM off) | Optional |
| `ALLOW_PLACEHOLDERS` | | `1` on Preview and Development builds only. Never on Production |

`.env.example` holds fictional values (555-01xx numbers, example.com URLs) for testing.

## Deploy to Vercel

Full steps, environment variables per environment, the domain and redirect setup (`www`, `callmaeday.com`, `getmaeday.com`), crawler access and the live checks are in [`docs/DEPLOY.md`](docs/DEPLOY.md). In short:

1. Vercel > Add New > Project > import `Nipstar/maeday`. Framework **Next.js** (auto-detected), build and output on their defaults: Vercel runs `npm run build` (with the `prebuild` and `postbuild` checks) and serves the static export from `out/`. Node.js `22.x`.
2. Environment variables per environment (Production, Preview, Development). `ALLOW_PLACEHOLDERS=1` on Preview and Development only. Previews point canonicals at their own branch URL automatically.
3. Domains: the apex, with `www` redirecting to it; DNS stays on Cloudflare with **DNS only** records pointing at Vercel.

Headers come from `vercel.json`: HSTS, nosniff, Referrer-Policy, Permissions-Policy, a CSP that allows the booking calendar and GTM, long cache on `/_next/static/*` and fonts, `text/plain` on `llms*.txt`, `image/png` on the extensionless OG images.

## Deploy to Cloudflare Pages (fallback)

Framework preset None, build `npm run build`, output `out`, `NODE_VERSION=22`, the same variables. Headers come from `public/_headers`, which mirrors `vercel.json`: keep the two in sync. See `docs/DEPLOY.md` section 9.

## Where things live

| What | Where |
|---|---|
| Every price, minute, phone number, URL, flag, legal and buyer source | `src/site.config.ts` |
| Competitor facts (with URL and check date) | `src/content/competitors.ts` |
| Home, pricing, FAQs | `src/content/home.ts`, `pricing.ts`, `faqs.ts` |
| Service page | `src/content/service.ts` |
| Segment pages | `src/content/segments.ts` (one object per segment) |
| Compare pages and hub | `src/content/compare.ts` |
| Guides | `src/content/guides.ts` |
| About | `src/content/about.ts` |
| Tokens (`{starter.price}`) and price maths | `src/lib/format.ts` |
| Inline links (`{@guide}`) | `src/lib/links.ts`, `src/lib/rich.tsx` |
| JSON-LD builders | `src/lib/schema.ts` |
| Brand tokens | `src/app/globals.css` (`@theme`) |
| Fonts | `src/lib/fonts.ts` (@fontsource through `next/font/local`) |
| Checks | `scripts/check.ts`, `scripts/check-selftest.ts`, `scripts/schema-validate.ts` |
| Tests | `tests/site.spec.ts`, `playwright.config.ts` |
| Design source | `reference/design/*.dc.html`, `reference/logo/*.svg` |
| Build log, sources and open items | `BUILD_LOG.md` |

Icons: `npm run icons` rebuilds `src/app/icon.svg`, `apple-icon.png` and `favicon.ico` from `reference/logo/`.

## Remaining placeholders

The first seven are set by environment variable. The rest are in `src/site.config.ts` unless noted. `[[KEY: text]]` placeholders carry suggested wording: confirm it, then replace the whole token.

| Placeholder | Where it shows | Needed from Andy |
|---|---|---|
| `[[EMAIL]]` | Footer, Organization JSON-LD, about, thank-you, legal pages, llms.txt | Public email for MaeDay |
| `[[DEMO_PHONE_DISPLAY]]`, `[[DEMO_PHONE_E164]]` | Every "Hear a sample call", sticky bar, llms.txt | Twilio number on the Retell demo agent |
| `[[BOOKING_URL]]` | Every "Book a setup call", llms.txt | Setup-call calendar URL |
| `[[ORDER_FORM_URL]]` | "Or start Starter now" (pricing) | Starter checkout URL, with redirect to `/thank-you/` |
| `[[GO_LIVE]]` | Home FAQ, compare page (Specialty), thank-you | Setup time |
| `[[ANNUAL_PRICE: ...]]` | Pricing plan note, pricing FAQ | Annual price or discount |
| `[[CONTRACT: ...]]` | Pricing FAQ, Smith.ai compare table | Month to month or minimum term |
| `[[ROLLOVER: ...]]` | Pricing "What counts as a minute?", pricing FAQ | Unused minutes: roll over or reset |
| `[[PORTFOLIO_EXTRA]]` | Portfolio plan card | What Portfolio adds beyond minutes |
| `[[CONCURRENT_CALLS: 20]]` | Apartments and student housing FAQs | Concurrent calls per client on Retell |
| `[[INTEGRATION_TIMING: ...]]` | Home FAQ (AppFolio, Buildium, Yardi) | Date, or keep "planned" wording |
| `[[TOUR_BOOKING_TIMING: ...]]` | Apartments FAQ | Date, or keep "planned" wording |
| `[[ADDRESS]]`, `[[PHONE]]` | Footer, about | Antek Automation contact details for a US site |
| `[[PRIVACY_*]]`, `[[TERMS_*]]` | `src/app/privacy/page.tsx`, `src/app/terms/page.tsx` | Reviewed legal text (then remove `noindex`) |

## Setup checklist (outside this repo)

- [ ] **Booking calendar** for the 20-minute setup call (GHL on crm.antekautomation.com). It must allow framing from the site domain, and pass `utm_*`, `gclid`, `fbclid`, `msclkid` and `source_page` into the booking. URL in `NEXT_PUBLIC_BOOKING_URL`. If it runs on a host other than crm.antekautomation.com, `*.leadconnectorhq.com` or `*.msgsndr.com`, add it to `frame-src` in `public/_headers` and `vercel.json`.
- [ ] **Starter order form** (GHL or Stripe), $197 monthly plus the $297 setup fee, redirecting after payment to `https://propertymanagementafterhoursansweringservice.com/thank-you/`. URL in `NEXT_PUBLIC_ORDER_FORM_URL`.
- [ ] **Retell demo agent** ("Oak Street Property Management") on a **Twilio demo number**: display and E.164 forms in the two demo-phone variables.
- [ ] **Twilio A2P 10DLC** brand and campaign registration (text alerts depend on it; flip `flags.sms` only after approval).
- [ ] **Vercel project** created from the repo, environment variables set, apex and `www` added with DNS-only records in Cloudflare (see `docs/DEPLOY.md`).
- [ ] **callmaeday.com** and **getmaeday.com** bought on Cloudflare and 301-redirected to the apex (Vercel domain redirect or a Cloudflare Redirect Rule; see `docs/DEPLOY.md`).
- [ ] Reverse link on aireceptionistforsmallbusiness.net `/for/property-management/` with the anchor "after-hours answering service for property managers".
- [ ] Search Console and Bing Webmaster Tools verified; sitemap submitted.

## Analytics

`window.dataLayer` events: `click_book` (page, position), `click_call` (page, position), `click_start` (plan, page), `forward_copy` and `forward_email` (ForwardBox), `copy_list` (guide), `purchase_complete` (thank-you, once per session). UTM params and click IDs are captured to `sessionStorage` on first landing and appended to the booking and order URLs with `source_page`. GTM loads only when `NEXT_PUBLIC_GTM_ID` is set. Booking completions are counted on the booking calendar by UTM.
