# Deploy: Vercel

Not deployed yet. These are the steps to put the site live on Vercel at the apex, with `www`, `callmaeday.com` and `getmaeday.com` redirecting to it. Tag the release `v1.0.0` once it is live and the checks at the end pass. Cloudflare Pages still works as a fallback (section 9).

Domain: `propertymanagementafterhoursansweringservice.com`. Its DNS is on Andy's Cloudflare account (added 24 Oct 2026, no records yet); Cloudflare stays the DNS provider and Vercel serves the site.

Vercel and Cloudflare rename menus often. If a label below has moved, search for the same words.

## 1. Before the first production deploy

Production builds fail while any `[[PLACEHOLDER]]` is left, so fill these first:

- The environment variables in section 3 (email, demo line, booking URL, order form URL, go-live time).
- The placeholders that live in code, in `src/site.config.ts`: `annual`, `contract`, `rollover`, `portfolioExtra`, `concurrentCalls`, `timing.integration`, `timing.tourBooking`, `address`, `phone`.
- Reviewed legal text in `src/app/privacy/page.tsx` and `src/app/terms/page.tsx` (replace `[[PRIVACY_*]]` and `[[TERMS_*]]`, and remove `noindex` when the text is final).
- Check locally with the real values in `.env.local`: `npm run build` (without `ALLOW_PLACEHOLDERS`) must pass. It prints any placeholder still left and the pages it is on.

## 2. Create the Vercel project

1. Vercel dashboard > **Add New** > **Project** > import **Nipstar/maeday** from GitHub (install the Vercel GitHub app on the repo if asked).
2. Framework preset: **Next.js** (auto-detected). Root directory: `./`.
3. Build and output settings: leave the defaults. Vercel runs `npm run build`, which also runs `prebuild` (llms.txt and source checks) and `postbuild` (runtime deferral and site checks), and it detects the static export (`output: 'export'`) and serves `out/`. Install command: default (`npm install`).
4. Node.js version: `22.x` (Settings > **Build and Deployment** > Node.js Version). `package.json` also pins `"engines": { "node": "22.x" }`.
5. Add the **Production** environment variables from section 3 before the first deploy, then **Deploy**. A failing check fails the deploy, which is intended.
6. Settings > **Git**: production branch `main`. Every other branch and every pull request gets a preview deployment.

Headers come from `vercel.json` (security headers and CSP, long cache on `/_next/static/*` and fonts, `text/plain` on `llms*.txt`, `image/png` on the extensionless OG images, `trailingSlash: true`). `public/_headers` holds the same headers for Cloudflare Pages; keep the two in sync.

## 3. Environment variables per environment

Project > **Settings** > **Environment Variables**. Tick the environments each value applies to. None is secret (all end up in the public HTML), so they do not need to be marked Sensitive. Values are read at build time: after changing one, redeploy (Deployments > the latest > **Redeploy**).

| Variable | Production | Preview | Development |
|---|---|---|---|
| `NEXT_PUBLIC_EMAIL` | the real public email | same | same |
| `NEXT_PUBLIC_DEMO_PHONE_DISPLAY` | the Twilio demo number as shown | same | same |
| `NEXT_PUBLIC_DEMO_PHONE_E164` | the same number in E.164 (`+1` and 10 digits) | same | same |
| `NEXT_PUBLIC_BOOKING_URL` | the setup-call calendar URL | same | same |
| `NEXT_PUBLIC_ORDER_FORM_URL` | the Starter checkout URL | a test-mode checkout if you have one | same as Preview |
| `NEXT_PUBLIC_GO_LIVE` | e.g. `3 to 5 business days` | same | same |
| `NEXT_PUBLIC_GTM_ID` | the GTM container ID, or leave unset | leave unset | leave unset |
| `NEXT_PUBLIC_SITE_URL` | **leave unset** | leave unset (previews use their branch URL automatically) | leave unset |
| `ALLOW_PLACEHOLDERS` | **never set** | `1` | `1` |

Keep **Automatically expose System Environment Variables** on (Settings > Environment Variables, it is on by default). On previews, `site.config.ts` reads `NEXT_PUBLIC_VERCEL_ENV` and `NEXT_PUBLIC_VERCEL_BRANCH_URL` so canonicals, OG images and the sitemap point at the preview URL instead of the live domain. Vercel also sends `X-Robots-Tag: noindex` on preview deployments, so previews stay out of search.

`vercel env pull .env.local` fetches the Development values for local builds.

## 4. Custom domain, apex and www

1. Project > **Settings** > **Domains** > add `propertymanagementafterhoursansweringservice.com`. Vercel shows the DNS records it needs, usually an `A` record for the apex (`76.76.21.21`); use exactly what it shows.
2. Add `www.propertymanagementafterhoursansweringservice.com` too, and choose **Redirect to** `propertymanagementafterhoursansweringservice.com` with **301 Moved Permanently**. Vercel shows the record, usually a `CNAME` to `cname.vercel-dns.com`.
3. In Cloudflare, zone `propertymanagementafterhoursansweringservice.com` > **DNS** > **Records**, add those records with Proxy status **DNS only** (grey cloud). Proxying through Cloudflare in front of Vercel breaks Vercel's certificate issuance and doubles the caching layers.
4. Back in Vercel, wait for both domains to show **Valid Configuration**; Vercel issues the certificates.
5. If Cloudflare shows SSL/TLS settings for the zone, they do not apply to DNS-only records. Leave them.

## 5. callmaeday.com and getmaeday.com

Andy buys both on Cloudflare Registrar. Pick one of these and do it for both domains.

**Option A, in Vercel (recommended: every domain managed in one place).**

1. Project > **Settings** > **Domains** > add `callmaeday.com` > **Redirect to** `propertymanagementafterhoursansweringservice.com`, **301 Moved Permanently**. Add `www.callmaeday.com` the same way.
2. In the Cloudflare zone for `callmaeday.com`, add the records Vercel shows (apex `A`, `www` `CNAME`), **DNS only**.
3. Repeat for `getmaeday.com` and `www.getmaeday.com`.

**Option B, in Cloudflare (no Vercel changes).** In each zone: DNS > add proxied `A` records for `@` and `www` to `192.0.2.1` (orange cloud; the redirect fires before the target is reached). Rules > **Redirect Rules** > Create rule: All incoming requests; Type **Dynamic**; Expression `concat("https://propertymanagementafterhoursansweringservice.com", http.request.uri.path)`; Status **301**; **Preserve query string** on. SSL/TLS **Full**, **Always Use HTTPS** on.

Either way `https://callmaeday.com/pricing/?utm_source=card` must land on `https://propertymanagementafterhoursansweringservice.com/pricing/?utm_source=card`. Check with the curl lines in section 7. `site.shortDomain` is `callmaeday.com`; use it on print and in the voice agent's sign-off.

## 6. Let the crawlers in

`robots.txt` allows GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, Claude-User, PerplexityBot, Google-Extended, Applebot-Extended and Bingbot. Make sure nothing in front of the site blocks them:

1. Vercel project > **Firewall**: **Attack Challenge Mode** off. Under **Bot Management** (or **Rules** > managed rulesets), leave **Bot Protection** off or on log only, and do not enable the **AI Bots** ruleset (it blocks AI crawlers). No custom rule that challenges these user agents.
2. Settings > **Deployment Protection**: Vercel Authentication may stay on for **Preview** deployments; it must not apply to **Production**.
3. Cloudflare: with DNS-only records, Cloudflare's bot settings do not touch the site. If anyone later turns the proxy on, turn off Bot Fight Mode and AI crawler blocking there too.

Confirm with each user agent (expect `200`, not `403` or a challenge page):

```bash
for ua in GPTBot OAI-SearchBot ChatGPT-User ClaudeBot Claude-SearchBot Claude-User PerplexityBot Google-Extended Applebot-Extended Bingbot; do
  printf '%-18s ' "$ua"; curl -s -o /dev/null -w '%{http_code}\n' -A "Mozilla/5.0 (compatible; $ua/1.0)" https://propertymanagementafterhoursansweringservice.com/
done
curl -s https://propertymanagementafterhoursansweringservice.com/robots.txt
```

## 7. Live checks

Run these against the live apex after the production deploy.

```bash
SITE=https://propertymanagementafterhoursansweringservice.com

# Headers: HSTS, nosniff, Referrer-Policy, Permissions-Policy, CSP, frame options
curl -sI $SITE/ | grep -iE 'strict-transport|x-content-type|referrer-policy|permissions-policy|content-security|x-frame'

# Long cache on built assets
curl -sI "$SITE$(curl -s $SITE/ | grep -o '/_next/static/chunks/[^"]*\.js' | head -1)" | grep -i cache-control

# llms files served as text/plain
curl -sI $SITE/llms.txt | grep -i content-type
curl -sI $SITE/llms-full.txt | grep -i content-type

# OG images served as PNG
curl -sI $SITE/opengraph-image | grep -i content-type
curl -sI $SITE/pricing/opengraph-image | grep -i content-type

# 404 page with a 404 status; missing trailing slash redirects
curl -s -o /dev/null -w '%{http_code}\n' $SITE/no-such-page/
curl -sI $SITE/pricing | grep -iE '^(HTTP|location)'

# Domain redirects (expect 301 to the apex, path and query kept)
curl -sI https://www.propertymanagementafterhoursansweringservice.com/pricing/ | grep -iE '^(HTTP|location)'
curl -sI "https://callmaeday.com/pricing/?utm_source=test" | grep -iE '^(HTTP|location)'
curl -sI "https://getmaeday.com/" | grep -iE '^(HTTP|location)'

# Sitemap and IndexNow key file
curl -s $SITE/sitemap.xml | grep -c '<loc>'          # expect 12
curl -s $SITE/6f1d2c9a4b8e4f0e9d3a7c5b2e1f8a40.txt    # expect the key
```

Then:

1. **Lighthouse on the live URL**, mobile, every sitemap page: PageSpeed Insights (https://pagespeed.web.dev/) or `npx lighthouse $SITE/ --form-factor=mobile`. Target 95+ in all four categories, LCP 1.8 s or less, CLS 0.05 or less. Record the results in `BUILD_LOG.md`.
2. **Structured data**: run the home, pricing, one segment, one compare page and the guide through Google's Rich Results Test (https://search.google.com/test/rich-results) and https://validator.schema.org/. Expect FAQPage, BreadcrumbList, Product (pricing) and Article (guide) detected, no errors.
3. **Booking modal**: on the live site, add `?utm_source=test` to the URL and click "Book a setup call". The calendar must load in the modal. If the modal is blank, the calendar's host is missing from `frame-src` in `vercel.json` (and `public/_headers`), or the calendar refuses framing. Make a test booking and confirm the UTM and `source_page` reached the calendar.
4. **Demo line**: tap "Hear a sample call" on a phone; Mae should answer as Oak Street Property Management.
5. **Starter order**: complete a test order; it must land on `/thank-you/` and fire `purchase_complete` once (check in GTM preview if GTM is on).
6. **IndexNow ping**: `npm run indexnow` (expect `200` or `202`).
7. **Search Console and Bing Webmaster Tools** (Andy): verify the domain with a DNS TXT record in Cloudflare and submit `https://propertymanagementafterhoursansweringservice.com/sitemap.xml` in both.
8. Tag the release: `git tag v1.0.0 && git push origin v1.0.0`.

## 8. Notes for Vercel

- **CSP and the Vercel Toolbar.** The CSP in `vercel.json` does not allow `vercel.live`, so the Vercel Toolbar (comments on preview deployments) is blocked by the browser. Either turn the toolbar off (Settings > General > Vercel Toolbar) or add `https://vercel.live` to `script-src`, `frame-src` and `connect-src` for previews. Production does not need it.
- **No server features.** The site is a static export: no Functions, no Middleware, no ISR. Vercel's free Hobby plan is for non-commercial use; a commercial site belongs on Pro.
- **Analytics.** GTM loads only when `NEXT_PUBLIC_GTM_ID` is set. Vercel Web Analytics is not wired in; adding it needs its script host in the CSP.

## 9. Cloudflare Pages (fallback)

If the site ever moves to Cloudflare Pages: Workers & Pages > Create > Pages > Connect to Git, framework preset **None**, build command `npm run build`, output directory `out`, environment variable `NODE_VERSION=22` plus the variables in section 3 (`ALLOW_PLACEHOLDERS=1` on Preview only, and `NEXT_PUBLIC_SITE_URL` set to the preview URL on Preview). Headers come from `public/_headers`. Add the apex and `www` under Custom domains, and use a Redirect Rule for `www` to the apex and option B in section 5 for the short domains.
