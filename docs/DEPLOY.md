# Deploy: Cloudflare Pages

Not deployed yet. These are the steps for Andy (or a later session with Cloudflare access) to put `build/v1` live at the apex, with `www`, `callmaeday.com` and `getmaeday.com` redirecting to it. Tag the release `v1.0.0` once it is live and the checks at the end pass.

Domain: `propertymanagementafterhoursansweringservice.com` (already on Andy's Cloudflare account since 24 Oct 2026, no DNS records yet).

Cloudflare renames menus often. If a label below has moved, search the dashboard for the same words.

## 1. Before the first production deploy

Fill these first (production builds fail while any `[[PLACEHOLDER]]` is left):

- The seven environment variables in section 3 (email, demo line, booking URL, order form URL, go-live time).
- The placeholders that live in code, in `src/site.config.ts`: `annual`, `contract`, `rollover`, `portfolioExtra`, `concurrentCalls`, `timing.integration`, `timing.tourBooking`, `address`, `phone`.
- Reviewed legal text in `src/app/privacy/page.tsx` and `src/app/terms/page.tsx` (replace `[[PRIVACY_*]]` and `[[TERMS_*]]`, and remove `noindex` when the text is final).
- Run locally with the real values in `.env.local`: `npm run build` (without `ALLOW_PLACEHOLDERS`) must pass. It prints any placeholder still left and the pages it is on.

## 2. Create the Pages project

1. Cloudflare dashboard > **Workers & Pages** > **Create** > **Pages** tab > **Connect to Git**.
2. Authorize GitHub if asked, pick **Nipstar/maeday**.
3. Project name: `maeday`. Production branch: `main`.
4. Build settings:
   - Framework preset: **None**
   - Build command: `npm run build`
   - Build output directory: `out`
   - Root directory: (leave empty)
5. Environment variables: add the **Production** set from section 3 now (you can add Preview after the first deploy under **Settings** > **Environment variables**).
6. **Save and Deploy**. The first build runs `prebuild` (llms.txt and source checks), `next build` and `postbuild` (site checks). A failing check fails the deploy, which is intended.

Preview deploys: every push to another branch (for example `build/v1`) gets a `*.maeday.pages.dev` URL with the Preview variables.

## 3. Environment variables per environment

Set under Workers & Pages > `maeday` > **Settings** > **Environment variables**, separately for Production and Preview. None is secret (they are all public in the HTML); use plain text, not encrypted secrets, so they are visible at build time.

| Variable | Production | Preview |
|---|---|---|
| `NODE_VERSION` | `22` | `22` |
| `NEXT_PUBLIC_EMAIL` | the real public email | same as production, or `hello@example.com` |
| `NEXT_PUBLIC_DEMO_PHONE_DISPLAY` | the Twilio demo number as shown, e.g. `(555) 010-0142` style formatting | same as production |
| `NEXT_PUBLIC_DEMO_PHONE_E164` | the same number in E.164, e.g. `+1` and 10 digits | same as production |
| `NEXT_PUBLIC_BOOKING_URL` | the setup-call calendar URL | same as production |
| `NEXT_PUBLIC_ORDER_FORM_URL` | the Starter checkout URL | a test-mode checkout if you have one |
| `NEXT_PUBLIC_GO_LIVE` | e.g. `3 to 5 business days` | same as production |
| `NEXT_PUBLIC_GTM_ID` | the GTM container ID, or leave unset | leave unset |
| `NEXT_PUBLIC_SITE_URL` | **leave unset** | the preview URL, e.g. `https://build-v1.maeday.pages.dev` (so canonicals, OG images and the sitemap point at the preview) |
| `ALLOW_PLACEHOLDERS` | **never set** | `1` |

Values are read at build time. After changing one, redeploy (Deployments > the latest > **Retry deployment**).

## 4. Custom domain, apex and www

1. Workers & Pages > `maeday` > **Custom domains** > **Set up a custom domain** > `propertymanagementafterhoursansweringservice.com` > **Activate domain**. Cloudflare adds the proxied CNAME at the apex for you (CNAME flattening).
2. Add `www.propertymanagementafterhoursansweringservice.com` as a second custom domain the same way.
3. Redirect `www` to the apex (one canonical host): in the `propertymanagementafterhoursansweringservice.com` zone > **Rules** > **Redirect Rules** > **Create rule** (single redirect):
   - Name: `www to apex`
   - When incoming requests match: Custom filter expression: `(http.host eq "www.propertymanagementafterhoursansweringservice.com")`
   - Then: Type **Dynamic**, Expression: `concat("https://propertymanagementafterhoursansweringservice.com", http.request.uri.path)`, Status code **301**, **Preserve query string** on.
4. SSL/TLS > **Edge Certificates**: **Always Use HTTPS** on. HSTS is already sent by `public/_headers`; do not also enable HSTS preload in the dashboard until the site has been stable for a few weeks.

## 5. callmaeday.com and getmaeday.com redirect rule

Andy buys both on Cloudflare Registrar (Domain Registration > Register Domains). Each becomes its own zone. For **each** of `callmaeday.com` and `getmaeday.com`:

1. **DNS** > **Records** > add two proxied records so Cloudflare answers for the domain (the target is never reached, the redirect fires first):
   - Type `A`, Name `@`, IPv4 `192.0.2.1`, Proxy status **Proxied**
   - Type `A`, Name `www`, IPv4 `192.0.2.1`, Proxy status **Proxied**
2. **Rules** > **Redirect Rules** > **Create rule**:
   - Name: `to main site`
   - When incoming requests match: **All incoming requests**
   - Then: Type **Dynamic**, Expression: `concat("https://propertymanagementafterhoursansweringservice.com", http.request.uri.path)`, Status code **301**, **Preserve query string** on.
3. SSL/TLS: mode **Full**, **Always Use HTTPS** on (the Universal certificate covers `@` and `www`).

So `https://callmaeday.com/pricing/?utm_source=card` lands on `https://propertymanagementafterhoursansweringservice.com/pricing/?utm_source=card`. The site's `site.shortDomain` is `callmaeday.com`; use it on print and in the voice agent's sign-off.

Alternative if you prefer one place for both: **Bulk Redirects** at account level (Account Home > Bulk Redirects), a list with `callmaeday.com` and `getmaeday.com` as source URLs, target the apex, 301, with "Preserve path suffix", "Include subdomains" and "Preserve query string" on. The DNS records in step 1 are still needed.

## 6. Let the crawlers in

`public/robots.txt` allows GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, Claude-User, PerplexityBot, Google-Extended, Applebot-Extended and Bingbot. Cloudflare can block them before they read it. In the apex zone:

1. **Security** > **Bots**: **Bot Fight Mode** off (it challenges many legitimate crawlers). If the account has Super Bot Fight Mode, set "Definitely automated" to Allow and leave "Verified bots" allowed.
2. **AI Crawl Control** (or Security > Bots > "Block AI bots" on older dashboards): set to **do not block**, and make sure no AI crawler is set to Block. Turn off the **managed robots.txt** option so Cloudflare does not prepend its own disallow rules to `robots.txt`.
3. **Security** > **WAF** > custom rules: none that challenge these user agents.

Confirm with each user agent (expect `HTTP/2 200` and the page, not a 403 or a challenge):

```bash
for ua in GPTBot OAI-SearchBot ChatGPT-User ClaudeBot Claude-SearchBot Claude-User PerplexityBot Google-Extended Applebot-Extended Bingbot; do
  printf '%-18s ' "$ua"; curl -s -o /dev/null -w '%{http_code}\n' -A "Mozilla/5.0 (compatible; $ua/1.0)" https://propertymanagementafterhoursansweringservice.com/
done
curl -s https://propertymanagementafterhoursansweringservice.com/robots.txt
```

## 7. Live checks

Run all of these against the live apex after the production deploy.

```bash
SITE=https://propertymanagementafterhoursansweringservice.com

# Headers: HSTS, nosniff, Referrer-Policy, Permissions-Policy, CSP on a page
curl -sI $SITE/ | grep -iE 'strict-transport|x-content-type|referrer-policy|permissions-policy|content-security|x-frame'

# Long cache on built assets
curl -sI "$SITE$(curl -s $SITE/ | grep -o '/_next/static/[^"]*\.css' | head -1)" | grep -i cache-control

# llms files served as text/plain
curl -sI $SITE/llms.txt | grep -i content-type
curl -sI $SITE/llms-full.txt | grep -i content-type

# OG images served as PNG
curl -sI $SITE/opengraph-image | grep -i content-type
curl -sI $SITE/pricing/opengraph-image | grep -i content-type

# 404 page with a 404 status
curl -s -o /dev/null -w '%{http_code}\n' $SITE/no-such-page/

# Redirects (expect 301 to the apex, path and query kept)
curl -sI https://www.propertymanagementafterhoursansweringservice.com/pricing/ | grep -iE '^(HTTP|location)'
curl -sI "https://callmaeday.com/pricing/?utm_source=test" | grep -iE '^(HTTP|location)'
curl -sI "https://getmaeday.com/" | grep -iE '^(HTTP|location)'

# Sitemap and IndexNow key file
curl -s $SITE/sitemap.xml | grep -c '<loc>'          # expect 12
curl -s $SITE/6f1d2c9a4b8e4f0e9d3a7c5b2e1f8a40.txt    # expect the key
```

Then:

1. **Lighthouse on the live URL**, mobile, every page: `node scripts/lighthouse.mjs` runs against a local server, so for live use PageSpeed Insights (https://pagespeed.web.dev/) on each URL in the sitemap, or `npx lighthouse $SITE/ --form-factor=mobile`. Target 95+ in all four categories, LCP 1.8 s or less, CLS 0.05 or less. Record the results in `BUILD_LOG.md`.
2. **Structured data**: run the home, pricing, one segment, one compare page and the guide through Google's Rich Results Test (https://search.google.com/test/rich-results) and https://validator.schema.org/. Expect FAQPage, BreadcrumbList, Product (pricing) and Article (guide) detected, no errors.
3. **Booking modal**: on the live site, click "Book a setup call" with `?utm_source=test` on the URL. The calendar must load in the modal (if it is blank, the calendar host is missing from `frame-src` in `public/_headers`, or the calendar refuses framing). Make a test booking and confirm the UTM and `source_page` reached the calendar.
4. **Demo line**: tap "Hear a sample call" on a phone; Mae should answer as Oak Street Property Management.
5. **Starter order**: complete a test order; it must land on `/thank-you/` and fire `purchase_complete` once (check with GTM preview if GTM is on).
6. **IndexNow ping**: `npm run indexnow` (expect `200` or `202`).
7. **Search Console and Bing Webmaster Tools** (Andy): verify the domain (DNS TXT record in Cloudflare), submit `https://propertymanagementafterhoursansweringservice.com/sitemap.xml` in both.
8. Tag the release: `git tag v1.0.0 && git push origin v1.0.0`.

## 8. Vercel (alternative)

`vercel.json` mirrors `public/_headers`. Import the repo in Vercel (framework Next.js, defaults), add the same variables per environment (Production and Preview), and point the domain there instead. The redirect rules for `callmaeday.com` and `getmaeday.com` stay in Cloudflare either way.
