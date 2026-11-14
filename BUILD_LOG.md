# BUILD_LOG

Build of the MaeDay site from `docs/BUILD_MAEDAY_SITE.md`, branch `build/v1`. Newest phase last.

## Phase 0: Audit (14 November 2026)

### Versions confirmed (npm registry, 14 Nov 2026)

| Package | Version used | Notes |
|---|---|---|
| next | 16.4.6 | latest stable |
| react, react-dom | 19.3.1 | |
| tailwindcss, @tailwindcss/postcss | 4.3.5 | Tailwind v4 |
| @fontsource/bricolage-grotesque | 5.3.0 | static weights 600, 700 (Latin) |
| @fontsource/instrument-sans | 5.3.0 | 400, 500, 600 |
| @fontsource/ibm-plex-mono | 5.3.0 | 500 |
| typescript | 6.0.x | 7.0.2 is out; kept 6 to match ai-receptionist and eslint-config-next |
| eslint | 9.39.x | 10.x is out; eslint-config-next 16 targets 9 |
| tsx, sharp, @next/env | 4.23.15, 0.35.5, 16.4.6 | |
| Playwright | 1.63.0 | matches the browser preinstalled in the build container |

### Routes

| URL | Primary (US vol, KD) | Secondaries | Title | H1 | Design source |
|---|---|---|---|---|---|
| `/` | property management answering service (1,100, 0) | answering service property management; answering service for property management companies; after hours answering service property management; property management call answering service; 24 7 answering service property management | Property Management Answering Service \| MaeDay | After-hours answering that reaches your on-call tech. | Home.dc.html + brief (Problem, Implication, Need-payoff, ForwardBox added) |
| `/pricing/` | cost of property management answering service (40) | property management answering service cost; answering service pricing per minute | Property Management Answering Service Pricing \| MaeDay | Property management answering service pricing | Pricing.dc.html |
| `/emergency-maintenance-answering/` | maintenance answering service (150, 1) | property management after hours emergency; after hours maintenance | Emergency Maintenance Answering Service \| MaeDay | Emergency maintenance answering for property managers | Home sections (How it works, Limits) |
| `/apartments/` | apartment answering service (90, 0) | answering service for apartment complexes; multifamily answering service | Apartment Answering Service, After Hours \| MaeDay | Apartment answering service for nights and weekends | Apartments.dc.html |
| `/hoa/` | hoa answering service (10) | community association answering service | HOA Answering Service for After-Hours Calls \| MaeDay | HOA answering service for after-hours calls | Segment template |
| `/single-family-rentals/` | none measurable | single family rental answering service | Single-Family Rental Answering Service \| MaeDay | After-hours answering for single-family rentals | Segment template |
| `/student-housing/` | none measurable | student housing answering service | Student Housing Answering Service \| MaeDay | Student housing answering service for nights and weekends | Segment template |
| `/best-property-management-answering-service/` | best answering service for property management (150, 4) | best property management answering service (70); ai answering service for property management (60) | Best Property Management Answering Services Compared | Best property management answering services, compared | Compare template, hub variant |
| `/compare/smith-ai/` | branded | | MaeDay vs Smith.ai for Property Management | MaeDay vs Smith.ai for property management | CompareSmithAi.dc.html |
| `/compare/specialty-answering-service/` | branded | | MaeDay vs Specialty Answering Service | MaeDay vs Specialty Answering Service for property management | Compare template |
| `/guides/what-counts-as-a-maintenance-emergency/` | what is considered emergency maintenance in an apartment (200, 1) | emergency maintenance examples; what is emergency maintenance; maintenance emergency list; is no hot water a maintenance emergency; is ac not working a maintenance emergency | What Counts as a Maintenance Emergency? \| MaeDay | What counts as a maintenance emergency? | Guide layout |
| `/about/` | none | | About MaeDay \| Antek Automation | Who builds MaeDay | Simple page |
| `/thank-you/`, `/privacy/`, `/terms/`, 404 | noindex | | | | Simple page |

Metas come from `canvas.json` where it has one (Home, Pricing, Apartments, Compare Smith.ai) and are filled from config; the others are written in the content files and checked for length.

Ambiguities and decisions:
1. Home "Who it's for" card for single-family rentals says "vendor dispatch". Vendor dispatch beyond the client's own team is behind a `false` flag, so the card says "travel time to the property" instead.
2. Canvas chip "Works with any property software" could read as an integration claim. Built as "Works alongside any property software" (email summary, no integration).
3. Canvas uses "24/7 is available on request", "Does 24/7 cost more?" and "24/7 lines". The brief allows "24/7" only as "24/7 on request", so every use is rewritten to that phrase (the check enforces it, except in competitor facts).
4. Canvas compare row "Human escalation included" for Smith.ai no longer matches Smith.ai's page (see sources). Rewritten from today's page.
5. Property Meld MAX On-Call is $1.50 per unit on today's page, as an add-on to Property Meld Ops ($2.00 per unit, $200 a month minimum). The research's $2.00 was the Ops plan. All copy uses today's figures.
6. The canvas implication "The repair clock starts when the tenant reports it" is sourced to contactcenterusa.com, a vendor blog. It is used as that vendor's statement, linked and dated, not as law.
7. NYC heat rules cannot be used: nyc.gov refused the fetch (403). Left out until re-verified.
8. The hub "scores" services: built as a criteria table of published facts, no stars, numbers or ratings.

### Placeholder map (canvas `[BRACKET]` to config)

| Canvas | Config key | Placeholder |
|---|---|---|
| `[DEMO LINE]` | `site.demoPhone.display` / `.tel` | `[[DEMO_PHONE_DISPLAY]]`, `[[DEMO_PHONE_E164]]` (env) |
| `#book` links | `site.bookingUrl` | `[[BOOKING_URL]]` (env) |
| `#order` link | `site.orderUrl` | `[[ORDER_FORM_URL]]` (env) |
| `[X BUSINESS DAYS]` | `site.goLive` | `[[GO_LIVE]]` (env) |
| `[ANNUAL PRICE, CONFIRM]` | `site.annual` | `[[ANNUAL_PRICE: 12 times monthly, setup fee waived]]` |
| `[MONTH TO MONTH OR MINIMUM TERM, CONFIRM]`, compare `[CONFIRM]` | `site.contract` | `[[CONTRACT: month to month]]` |
| `[ROLL OVER OR RESET, CONFIRM]` | `site.rollover` | `[[ROLLOVER: unused minutes reset on your billing date]]` |
| `[EXTRA INCLUDED, CONFIRM]` | `site.portfolioExtra` | `[[PORTFOLIO_EXTRA]]` |
| `[PLANNED, CONFIRM TIMING]` (software) | `site.timing.integration` | `[[INTEGRATION_TIMING: planned, no date yet]]` |
| `[PLANNED, CONFIRM]` (tours) | `site.timing.tourBooking` | `[[TOUR_BOOKING_TIMING: planned, no date yet]]` |
| `[20]` concurrent calls | `site.concurrentCalls` | `[[CONCURRENT_CALLS: 20]]` |
| `[ADDRESS]`, `[PHONE]`, `[EMAIL]` | `site.address`, `site.phone`, `site.email` | `[[ADDRESS]]`, `[[PHONE]]`, `[[EMAIL]]` |
| Legal text | `src/app/privacy`, `src/app/terms` | `[[PRIVACY_*]]`, `[[TERMS_*]]` |

### Sources re-fetched (14 November 2026)

Every source was fetched again from the build container on 14 Nov 2026 and read as text. "Pass" means the page says it today in the words quoted. Anything marked "Fail" or "Unreachable" is left off the site.

Competitors:

| Vendor | URL | Result | What the page says today |
|---|---|---|---|
| Specialty Answering Service | https://www.specialtyansweringservice.net/industries/real-estate/property-management-answering-service/ | Pass | "Pricing just right starting at $44/mo"; "2-week free trial"; calls "screened for emergency and non-emergency response" following your protocols; on-call staff "dispatched via phone, text, pager, or email"; representatives "fluent in both English and Spanish". No per-minute rate shown. |
| Ruby | https://www.ruby.com/campaign/hello-ruby/ | Pass (prices); Fail (billing increment, contract) | $250/month for 50 minutes; $395 for 100; $720 for 200; $1,725 for 500. The page does not state 60-second rounding or contract terms, so neither is used. |
| Smith.ai receptionists (human) | https://smith.ai/pricing/receptionists | Pass | $300/month for 30 calls (overage $11.50/call); $810 for 90 ($10.50); $2,100 for 300 ($8.50); 30-day money-back guarantee on all plans. |
| MAP Communications | https://www.mapcommunications.com/pricing/ | Pass, overage changed | $49/mo, 0 minutes, $1.37 per additional minute; $179 for 125 minutes ($1.30/min after); $339 for 250 ($1.28); $649 for 500 ($1.28); "No Long Term Contracts"; "English & Spanish Fluency". |
| Abby Connect | https://www.abby.com/comparisons/abby-vs-answerconnect/ | Pass, plus a new plan | $164 for 50 Abby Minutes (Starter), $329 for 100, $599 for 200, $1,380 for 500; month to month, no setup fee. |
| Smith.ai AI Receptionist | https://smith.ai/ai-receptionist | Pass, terms changed | Free: $0, 25 calls/mo, $3.00/call after; Pro: $150/mo, 75 calls, $2.00/call; Enterprise: $500/mo, 300 calls, $1.67/call. "No setup fees"; "Month-to-month, no contract on self-serve plans"; "Live agent involvement available as a per-call add-on on any plan"; AI-initiated escalation to a human has no fee; "EN + ES fluency". The 30-day money-back guarantee appears on the human receptionist page, not this one, so it is not claimed for the AI plan. |
| Smith.ai vs Rosie | https://smith.ai/ai-receptionist-service-comparison/smith-ai-vs-rosie | Pass | "per-call rates from $1.67 to $3.00 and no setup fee". |
| Buildium Maintenance Contact Center | https://www.buildium.com/maintenance-contact-center/ | Pass | Minimum $140 per month; all maintenance calls $1.10 per unit per month; missed maintenance calls (all calls after office hours) $.70 per unit per month; one-time setup fee $300; 24/7 coverage including holidays; call center agents; connected to your Buildium account. |
| Property Meld MAX On-Call | https://propertymeld.com/pricing/ | Fail on price, corrected | MAX On-Call add-on $1.50/unit; Property Meld Ops $2.00/unit; "$200/month minimum"; "True emergencies reach the right person instantly"; every call becomes a Meld in Property Meld. |
| PATLive | https://www.patlive.com/pricing/ | Pass (now verified) | Pay as you go $49/month, no included minutes, $2.99/additional minute; 50 minutes $99 ($2.29/min after); 14-day free trial; no contracts. Added to `competitors.ts`. |
| AnswerConnect | https://www.answerconnect.com/pricing | Unreachable (404) | Left out. Abby's page quotes AnswerConnect prices, but that is a third party. |
| Dialzara | https://dialzara.com/industries/property-management | Pass (features only) | Per-property emergency contacts and escalation rules; on-call alerts "via call, text, and email". No price on the page. Not in tables. |
| Dialbox | https://dialbox.us/for/property-management | Unreachable (blocked) | Left out. |

Legal, statistical and buyer sources:

| Fact | URL | Result | Wording used |
|---|---|---|---|
| Texas repair time | https://www.texasattorneygeneral.gov/consumer-protection/home-real-estate-and-travel/renters-rights | Pass | "The law presumes seven days to be a reasonable time, but the landlord can rebut this presumption." |
| Texas Property Code 92.056 | https://law.justia.com/codes/texas/property-code/title-8/chapter-92/subchapter-b/section-92-056/ | Unreachable (403) | Statute page not linked; the AG page is the source. |
| California repair time | https://www.dre.ca.gov/publications/ResourceGuidebook/gb09_dealingwith.html | Pass | "The law usually considers 30 days to be reasonable, but a shorter period may be considered reasonable, depending on the situation. For example, if the furnace is broken and it is very cold outdoors, one to two days may be considered reasonable". Cites Civ. Code § 1942. |
| California Civil Code 1942 | https://law.justia.com/codes/california/code-civ/division-3/part-4/title-5/chapter-2/section-1942 | Unreachable (403) | Not linked; named only as cited by the DRE guide. |
| NYC heat and hot water rules | https://www.nyc.gov/site/hpd/news/029-24/heat-season-alert-city-mobilizes-keep-new-yorkers-safe-this-winter | Unreachable (403) | Left out. |
| Repair clock starts at notice | https://contactcenterusa.com/blog/property-management-answering-service | Pass | "Habitability clocks start when the resident notifies you" (vendor blog heading, quoted as theirs). |
| All-party recording consent | https://www.rev.com/blog/phone-call-recording-laws-state | Pass, list changed | "All-Party (Two-Party) Consent States (11): California, Delaware, Florida, Illinois, Maryland, Massachusetts, Montana, Nevada, New Hampshire, Pennsylvania, and Washington." |
| Cost at low volume (PATLive) | https://www.biggerpockets.com/forums/898/topics/347738-answering-service | Pass | "I ended up having $300 to $400 bills/month. I could not sustain that." "I finally cancelled the service mostly for financial reasons." |
| Flooded, frozen or burning | https://www.biggerpockets.com/forums/52/topics/570655-answering-service-recommendations | Pass | "If the property isn't flooded, frozen, burning, or housing someone dead, we usually don't need to know about it until business hours the next day." |
| Low emergency volume | https://www.biggerpockets.com/forums/52/topics/756172-after-hours-call-center-for-property-managment-is-it-effective | Pass (no date on page) | A broker managing "almost 350 rentals": "fewer than four 'emergency' calls a month. About half of them are tenants that have locked themselves out." Post date not shown, so no year is given. |
| Ruby billed minutes complaint | https://www.trustpilot.com/review/ruby.com?page=6 | Unreachable (403) | Left out. |
| PATLive messages, ring times, 25,000 work orders | https://ca.trustpilot.com/review/patlive.com?page=4 | Unreachable (403) | Left out. |
| HUD AI guidance and withdrawal | archives.hud.gov, naahq.org, gao.gov | Not fetched | Not used on the site. Copy says only that the Fair Housing Act applies. |

Network note: the build container's default network allows package registries only. A personal environment named `maeday` was created with the 20 source hosts allowed so the sources could be fetched. Justia, nyc.gov, Trustpilot and dialbox.us still refuse automated requests.

## Phase 1: Scaffold, config and brand (14 November 2026)

Built:
- Next.js 16 App Router, `output: 'export'`, `trailingSlash: true`, TypeScript, Tailwind v4, copied structure from ai-receptionist (configs, `load-env.ts`, `check.ts` pattern, JSON-LD builders, `_headers` + `vercel.json`).
- `src/site.config.ts` with the brief's shape, plus `sources` (every legal and buyer source with its check date), `sourceFigures`, `timing`, `flags` (all false, plus `vendorDispatch` and `ownerReport`) and `sister` (cross-link).
- `src/content/competitors.ts`: verified rows only (Smith.ai AI, Smith.ai receptionists, Ruby, MAP, PATLive, Abby, Specialty Answering Service, Buildium Maintenance Contact Center, Property Meld MAX On-Call), each with `url` and `checked`.
- `src/lib/format.ts`: `money`, `rate`, `fill()` tokens for plans, setup fee, billing, placeholders, sources and every competitor figure; `allowedPrices()` and `allowedMinutes()` feed the check.
- Brand tokens in `globals.css`, fonts self-hosted from @fontsource through `next/font/local` (display face preloaded only), logo marks in `reference/logo/` (`mark.svg`, `mark-light.svg`, `mark-small.svg` for the thicker favicon stroke) and `npm run icons` for `icon.svg`, `apple-icon.png`, `favicon.ico`.
- `Header` (Midnight, native `<details>` menus), `Footer` (service line, sister-site link), `StickyCta` (mobile, after `[data-hero]` leaves view), `BookLink` + `BookingModal` (iframe and `form_embed.js` load on first click), `CallLink`, `StartLink`, UTM capture, GTM (off unless set), `.env.example`, `public/_headers`, `vercel.json`.
- `scripts/check.ts` with all nine rules from the brief, plus: "24/7" only as "24/7 on request", phone numbers in copy must be 555 numbers, every indexable page has "Last updated", every call log carries its "invented" label. Flag rule skips elements marked `data-gate-ok` (limits, "not yet" answers, competitor facts).
- `scripts/lighthouse.mjs`: Lighthouse mobile on every sitemap page against `out/`.

Checks: `ALLOW_PLACEHOLDERS=1 npm run build` and `ALLOW_PLACEHOLDERS=1 npm run check` pass (placeholders listed as warnings).

Lighthouse mobile, placeholder home (local static server, simulated throttling): Performance 96, Accessibility 100, Best practices 100, SEO 100, CLS 0, LCP 2.6 s (target 1.8 s, revisited in Phase 7).

## Phase 2: Home and pricing (14 November 2026)

Built:
- Shared components: `CallLog` (data-driven, always labelled "Example call. Names and numbers are invented."), `AnswerBlock`, `SectionHead`, `CardGrid` (with linked, dated sources under a card), `Steps`, `LimitsList`, `PlanCard`, `PlanSection`, `CompareTable` (from `competitors.ts`, every name linked, check date per row), `Faq` (native `<details>`), `ForwardBox` (prefilled `mailto:` + copy button, `forward_email` / `forward_copy` events), `FinalCta`, `Breadcrumbs`, `UpdatedDate`, `Rich` (inline `{@link}` markers that render as plain text until the target page exists).
- `/` in the brief's 14-step SPIN order, including the Problem, Implication (sourced: Contact Center USA on the repair clock, Texas Attorney General seven-day presumption, California DRE 30 days), Need-payoff and ForwardBox sections the canvas does not have yet. JSON-LD: WebPage with SpeakableSpecification on the AnswerBlock, Service with three Offers, FAQPage.
- `/pricing/`: hero, three `PlanCard`s (Starter carries "Or start Starter now"), AnswerBlock, "What counts as a minute?", "Why does billing by the second matter?" (sourced BiggerPockets threads), dated `CompareTable` (Smith.ai AI and human, Ruby, MAP, PATLive, Specialty Answering Service, Buildium, Property Meld), FAQ with the sister-site link, FinalCta. JSON-LD: Product with three Offers, each with monthly and per-minute `UnitPriceSpecification`; FAQPage; BreadcrumbList.
- Checked at 375 px and 1280 px: no horizontal scroll (the forward-box text needed `overflow-wrap` for the long domain), sticky CTA hidden until the hero leaves view.

Checks: build and check pass.

Lighthouse mobile (local static server, simulated throttling, three runs): `/` Performance 93 to 98, `/pricing/` 95; Accessibility, Best practices and SEO 100. CLS 0 to 0.046. Simulated LCP 2.3 to 3.0 s; observed LCP in the same trace is 0.19 s. The simulated figure tracks time-to-interactive (Next.js runtime scripts, about 150 KB), not fonts: preloading or `font-display: optional` did not move it. Kept the brief's font setup (display face preloaded only).

## Phase 3: Service, segments and about (14 November 2026)

Built:
- `/emergency-maintenance-answering/`: hero, AnswerBlock, Problem, Implication (Texas AG, California DRE, Contact Center USA, each linked and dated), Need-payoff, the escalation ladder as six numbered steps (a horizontal row on desktop), an example log of a night where the on-call tech and backup miss the call and the manager answers, Limits, FAQ, CTA. JSON-LD: WebPage, Service with Offers, FAQPage, BreadcrumbList.
- Segment template `src/app/[segment]/page.tsx` from `src/content/segments.ts`: `/apartments/` (canvas copy, Fair Housing section, several-communities section) and `/hoa/` (new copy: common areas, homeowner versus association repairs, board members, per-association rules). Each has its own example call log, Problem, Implication, Need-payoff, call cards, FAQ and related segments (shown only when built). JSON-LD: Service (audience), FAQPage, BreadcrumbList, WebPage.
- `/about/` (Antek Automation, Andy Norman, more than 30 years in field service, Certified Retell AI Partner, no invented clients or results; AboutPage JSON-LD with founder), `/thank-you/` (noindex, `purchase_complete` once per session), `/privacy/` and `/terms/` (noindex, `[[PRIVACY_*]]` and `[[TERMS_*]]`), 404.

Checks: build and check pass on 12 pages. No horizontal scroll at 375 px on any Phase 3 page.

## Phase 4: Compare pages (14 November 2026)

Re-fetched before writing (14 Nov 2026, same day as Phase 0): smith.ai/ai-receptionist, Smith.ai's comparison page and Specialty Answering Service's property management page. No change from the Phase 0 reading. `competitors.ts` already held the verified figures.

Built:
- Compare template `src/app/compare/[slug]/page.tsx` from `src/content/compare.ts`: H1, dated short answer (AnswerBlock, 40 to 60 words), side-by-side table (every competitor fact from `competitors.ts`, vendor name linked, check date and source links under it), "[Name] is the better choice if" and "MaeDay is the better choice if" (both required by the check), worked cost example for 150 calls from config, FAQ, CTA. JSON-LD: WebPage, FAQPage, BreadcrumbList. No Review or AggregateRating.
- `/compare/smith-ai/`: canvas copy, updated to today's Smith.ai page (live agent is a per-call add-on, Spanish included, Pro is self-setup, $2.00/call on Pro). The canvas's per-call total for 150 calls on Smith.ai is not shown: Smith.ai offers a 150-call Pro bundle at a discount without stating its price, so the page points to Smith.ai for that figure.
- `/compare/specialty-answering-service/`: human operators, from $44 a month, Spanish-speaking staff, dispatch by phone, text, pager or email, two-week free trial. No per-minute rate is published, so no like-for-like cost is computed.
- Hub `/best-property-management-answering-service/`: disclosure at the top that MaeDay is ours, the seven criteria, one table scoring MaeDay, Smith.ai AI, Specialty, Ruby, MAP, PATLive, Buildium and Property Meld on billing unit, emergency ladder, per-property rules, leasing calls, owner calls, software required and published price. Anything a vendor page does not state reads "Not stated on their page".

Left out (could not verify on the vendor's own page): AnswerConnect prices (pricing page 404), Dialbox (blocked), Ruby's billing increment and contract terms, Smith.ai's 30-day money-back on the AI plan (only on the human receptionist page), Smith.ai's price for its 150-call Pro bundle.

Checks: build and check pass on 15 pages (the AnswerBlock length check caught a 61-word answer, fixed).

## Phase 5: Guides and remaining pages (14 November 2026)

Built:
- `/guides/what-counts-as-a-maintenance-emergency/`: manager-facing guide by Andy Norman with byline, published and updated dates, AnswerBlock, "Why does the definition matter?" (BiggerPockets quotes, linked and dated), a 15-row template emergency list as a printable table with Copy and Print buttons (`copy_list` event; print stylesheet hides header, footer and the sticky bar), state repair timelines for Texas (Attorney General) and California (DRE) marked "General information, not legal advice", one contextual link up to `/emergency-maintenance-answering/`, quick answers on no hot water, AC, a clogged toilet and lockouts (FAQPage), and a Sources list. JSON-LD: Article (author Andy Norman, citations), FAQPage, BreadcrumbList.
- `/single-family-rentals/`: scattered homes, owners who call, travel time, per-area ladders, one number for the portfolio.
- `/student-housing/`: lockouts by policy, parents and privacy (Mae does not confirm who lives there), move-in and move-out waves, first-time renters.
- The guide link in the home FAQ and the service page now renders as a link (it was plain text until the page existed).

Not built (per the run instructions; listed under Next pages): the three remaining compare pages and the on-call guide.

Checks: build and check pass on 18 pages. No horizontal scroll at 375 px.

## Phase 6: Schema, llms, robots, sitemap, OG (14 November 2026)

Built:
- JSON-LD builders in `src/lib/schema.ts`, all from the data each page renders: Organization (MaeDay, `parentOrganization` Antek Automation, `founder` Andy Norman), WebSite, WebPage (SpeakableSpecification on the home AnswerBlock and H1), Service with three Offers (home, service, segments), Product with three Offers and monthly plus per-minute `UnitPriceSpecification` (pricing), FAQPage (same `plain()` text as the visible FAQ), BreadcrumbList (every page below home), Article (guide: author Andy Norman, datePublished, dateModified, citations), AboutPage. No Review or AggregateRating anywhere.
- `scripts/schema-validate.ts` (`npm run schema`): parses every block and checks the properties Google's structured-data docs require per type. Wired into `check.ts`.
- `public/llms.txt` and `llms-full.txt` generated at prebuild from content: fixed description, plans and billing from config, what Mae won't do, every page with its AnswerBlock as the summary, contact; the full file adds every page's copy, competitor facts with URLs and check dates, and sources. `check.ts` now runs the copy rules on both files.
- `robots.txt` allows `*` plus GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, Claude-User, PerplexityBot, Google-Extended, Applebot-Extended and Bingbot, with a `Sitemap:` line.
- `sitemap.xml`: 12 indexable pages with `lastmod` from `site.lastUpdatedIso` (thank-you, privacy and terms left out).
- OG images per page (`opengraph-image.tsx`, 1200 x 630, Midnight, lit-window mark, page title, "From $197/mo" from config) for home, pricing, service, every segment, every compare page, hub, guide and about.
- IndexNow: key file `public/<key>.txt` and `npm run indexnow` (post-deploy ping of every indexable URL).

JSON-LD validation (`npm run schema`, 14 Nov 2026): 18 of 18 HTML files pass.

| Page | Types |
|---|---|
| `/` | WebPage (speakable), Service, FAQPage, Organization, WebSite |
| `/pricing/` | WebPage, Product, FAQPage, BreadcrumbList, Organization, WebSite |
| `/emergency-maintenance-answering/` | WebPage, Service, FAQPage, BreadcrumbList, Organization, WebSite |
| `/apartments/`, `/hoa/`, `/single-family-rentals/`, `/student-housing/` | WebPage, Service, FAQPage, BreadcrumbList, Organization, WebSite |
| `/best-property-management-answering-service/`, `/compare/smith-ai/`, `/compare/specialty-answering-service/` | WebPage, FAQPage, BreadcrumbList, Organization, WebSite |
| `/guides/what-counts-as-a-maintenance-emergency/` | Article, FAQPage, BreadcrumbList, Organization, WebSite |
| `/about/` | AboutPage, BreadcrumbList, Organization, WebSite |
| `/thank-you/`, `/privacy/`, `/terms/`, 404 | Organization, WebSite |

Google's Rich Results Test and validator.schema.org could not be reached from the build container; run the live URLs through both after deploy (see `docs/DEPLOY.md`).

## Phase 7: Checks and CI (14 November 2026)

Built:
- `scripts/check.ts` complete: all nine rules from the brief plus the extras listed in Phase 1, JSON-LD validation, and the copy rules on `llms.txt` / `llms-full.txt`. `CHECK_OUT` points it at another directory.
- `scripts/check-selftest.ts` (`npm run check:selftest`): copies `out/`, breaks one rule at a time and expects a failure. 23 of 23 cases caught: placeholder, em dash, `!`, banned word, UK spelling, Ltd, bare "24/7", price not in config, minute figure not in config, other `tel:` number, non-555 phone number, broken JSON-LD, FAQ mismatch, Review schema, short AnswerBlock, compare page without "better choice if", Spanish claim, integration name, text alerts claim, broken link, two H1s, missing canonical, call log without its "invented" label.
- Playwright (`tests/site.spec.ts`, `npm test`) at 375 px and 1280 px on all 15 HTML pages: no horizontal scroll, axe (WCAG 2.1 A and AA) zero violations, `tel:` only to the demo line, FAQ JSON-LD equals the visible FAQ text, sticky CTA hidden until the hero leaves view (mobile) and never shown on desktop, booking modal iframe and `form_embed.js` absent until the first click and then present with `utm_*` and `source_page`, "Start Starter now" carries `utm_source`, `gclid` and `source_page`, one H1 and "Last updated" on every indexable page. Result: 128 passed, 2 skipped (the mobile-only and desktop-only sticky tests skip on the other viewport).
- axe found one issue, fixed: links inside running text were told apart by color only (`link-in-text-block`). Links are now underlined by default; buttons and nav opt out.
- `@axe-core/playwright` pulled a newer `playwright-core` than `@playwright/test` 1.63; pinned with `overrides` so types and the preinstalled browser match.
- Lighthouse: `scripts/lighthouse.mjs` (`npm run lighthouse`), mobile, every sitemap page, fails under 95.
- GitHub Actions `.github/workflows/ci.yml` on pull requests and pushes to main: build with the test env, check, self-test, schema, Playwright + axe, Lighthouse (reports kept as an artifact).
- README.md and CLAUDE.md written as the brief describes.

Lighthouse mobile, 14 Nov 2026 (local static server, simulated throttling):

| Page | Perf | A11y | Best practices | SEO | LCP (simulated) | CLS |
|---|---|---|---|---|---|---|
| `/` | 97 | 100 | 100 | 100 | 2.3 s | 0.046 |
| `/pricing/` | 97 | 100 | 100 | 100 | 2.5 s | 0 |
| `/emergency-maintenance-answering/` | 96 | 100 | 100 | 100 | 2.7 s | 0 |
| `/apartments/` | 95 | 100 | 100 | 100 | 2.9 s | 0 |
| `/hoa/` | 96 | 100 | 100 | 100 | 2.8 s | 0.018 |
| `/single-family-rentals/` | 96 | 100 | 100 | 100 | 2.5 s | 0 |
| `/student-housing/` | 95 | 100 | 100 | 100 | 2.9 s | 0 |
| `/best-property-management-answering-service/` | 96 | 100 | 100 | 100 | 2.7 s | 0.001 |
| `/compare/smith-ai/` | 96 | 100 | 100 | 100 | 2.7 s | 0 |
| `/compare/specialty-answering-service/` | 96 | 100 | 100 | 100 | 2.7 s | 0.004 |
| `/guides/what-counts-as-a-maintenance-emergency/` | 95 | 100 | 100 | 100 | 2.8 s | 0.005 |
| `/about/` | 97 | 100 | 100 | 100 | 2.6 s | 0.008 |

All pages meet 95+ in every category and CLS 0.05 or less. Not met: the brief's LCP target of 1.8 s. The simulated LCP (2.3 to 2.9 s) tracks the Next.js runtime scripts (about 150 KB compressed), not the content: observed LCP in the same traces is about 0.2 s, and preloading or `font-display: optional` did not change it. Performance scores varied by up to 4 points between runs. Re-run on the live Cloudflare URL (HTTP/2, Brotli, edge cache) after deploy.

## Phase 7 fix: Lighthouse on CI (14 November 2026)

The first CI run on PR #1 passed everything except Lighthouse. On GitHub's runner `/` scored 89 for performance, `/hoa/` and the guide 94, and `/hoa/` had CLS 0.063 (limit 0.05). The local scores reported above (95 to 97) did not hold there.

Causes found:
- LCP (simulated) followed the Next.js runtime: its seven chunks were requested from `<head>`, so Lighthouse's model counted their download and execution before the largest paint. Observed paint was about 0.2 s.
- CLS came from the body font (Instrument Sans) arriving late with `font-display: swap` and re-wrapping the hero text and call log.

Changes:
- `scripts/defer-scripts.mjs` (runs in `postbuild`, before the checks): moves the Next.js runtime chunks from `<head>` to a small loader that starts them just after the first frame is painted. The HTML is fully server-rendered, so nothing visible waits for them, and hydration buffers its data until they arrive. Tested: a new Playwright test confirms the loader is present, the chunks load, and five pages hydrate with no console errors; all 130 browser tests pass. Trade-off: a click on "Book a setup call" or "Start Starter now" in the first fraction of a second, before the runtime arrives, follows the plain link (the right destination, but without the UTM parameters and without the modal).
- Body and mono fonts now use `font-display: optional` (no swap after first paint). The display face that sets the headings keeps `swap` and is the only one preloaded, as the brief says. **Deviation from the brief** ("font-display: swap" for all): with swap, CLS went over 0.05 on slower machines.
- Internal links are plain `<a>` (`src/components/Link.tsx`) instead of `next/link`: full page loads from the CDN, no background prefetching of every header and footer link.
- `experimental.inlineCss` in `next.config.ts`: the stylesheet is inlined, removing one render-blocking request.
- `scripts/lighthouse.mjs`: a page that misses 95 is run twice more and judged on the median of three (Lighthouse's own advice for run-to-run variance). One-off spikes were seen locally, for example a single 310 ms blocking-time run on `/compare/smith-ai/` that scored 93 and 99 on the next three runs.
- CI uploads the Lighthouse reports (`include-hidden-files: true`; the hidden folder was skipped before).

Lighthouse mobile after the fix, 14 Nov 2026 (local, simulated throttling, all pages passed on the first run):

| Page | Perf | A11y | Best practices | SEO | LCP | CLS |
|---|---|---|---|---|---|---|
| `/` | 97 | 100 | 100 | 100 | 1.7 s | 0 |
| `/pricing/` | 97 | 100 | 100 | 100 | 1.8 s | 0 |
| `/emergency-maintenance-answering/` | 95 | 100 | 100 | 100 | 2.3 s | 0 |
| `/apartments/` | 98 | 100 | 100 | 100 | 1.8 s | 0 |
| `/hoa/` | 99 | 100 | 100 | 100 | 1.7 s | 0 |
| `/single-family-rentals/` | 96 | 100 | 100 | 100 | 2.7 s | 0 |
| `/student-housing/` | 98 | 100 | 100 | 100 | 2.0 s | 0 |
| `/best-property-management-answering-service/` | 99 | 100 | 100 | 100 | 1.5 s | 0 |
| `/compare/smith-ai/` | 99 | 100 | 100 | 100 | 1.7 s | 0 |
| `/compare/specialty-answering-service/` | 99 | 100 | 100 | 100 | 1.7 s | 0 |
| `/guides/what-counts-as-a-maintenance-emergency/` | 99 | 100 | 100 | 100 | 1.4 s | 0 |
| `/about/` | 100 | 100 | 100 | 100 | 1.5 s | 0 |

LCP is at or under 1.8 s on 8 of 12 pages in this run and varies by up to a second between runs; it is no longer tied to the scripts.

## Hosting change: Vercel (14 November 2026)

Andy confirmed the site goes on Vercel, not Cloudflare Pages. Changes:
- `docs/DEPLOY.md` rewritten for Vercel: project import (Next.js preset, defaults, Node 22), environment variables per environment (Production, Preview, Development), apex and `www` (redirect, 301) with DNS-only records in Cloudflare, `callmaeday.com` and `getmaeday.com` as Vercel domain redirects (or a Cloudflare Redirect Rule), Vercel Firewall settings so AI crawlers are not blocked, Deployment Protection only on previews, the Vercel Toolbar and the CSP, and the same live checks. Cloudflare Pages kept as section 9.
- `package.json` `engines.node` pinned to `22.x` (Vercel reads it).
- `site.config.ts`: on Vercel preview deployments the site domain is the branch preview URL (`NEXT_PUBLIC_VERCEL_ENV`, `NEXT_PUBLIC_VERCEL_BRANCH_URL`, exposed by Vercel by default), so previews need no `NEXT_PUBLIC_SITE_URL`. Production is unchanged.
- README, CLAUDE.md and `.env.example` updated. `vercel.json` already mirrored `public/_headers` (checked: every global header matches).

## Phase 8: Deploy (not run)

Per the run instructions, nothing was deployed. (Superseded by the hosting change above: `docs/DEPLOY.md` now covers Vercel first.) The original version had the exact Cloudflare Pages steps (project settings, build command and output, `NODE_VERSION=22`), environment variables per environment (`ALLOW_PLACEHOLDERS=1` on Preview only, `NEXT_PUBLIC_SITE_URL` on Preview only), the apex and `www` setup, the `callmaeday.com` and `getmaeday.com` 301 redirect rule (single redirect per zone, or Bulk Redirects), crawler access (Bot Fight Mode, AI crawl blocking, managed robots.txt) with a per-user-agent curl loop, and the live checks: headers, `llms.txt` as `text/plain`, OG images as PNG, 404 status, redirects, sitemap count, Lighthouse on the live URL, Rich Results Test, booking modal, demo line, Starter test order, IndexNow ping, Search Console and Bing. Tag `v1.0.0` after they pass.

## Open placeholders (build of 14 Nov 2026, no env values set)

| Placeholder | Where it shows | Set by |
|---|---|---|
| `[[BOOKING_URL]]` | Every page (header, hero, sticky bar, final CTA), llms files | `NEXT_PUBLIC_BOOKING_URL` |
| `[[DEMO_PHONE_E164]]` | Every page (`tel:` links) | `NEXT_PUBLIC_DEMO_PHONE_E164` |
| `[[DEMO_PHONE_DISPLAY]]` | Home hero (desktop), llms files | `NEXT_PUBLIC_DEMO_PHONE_DISPLAY` |
| `[[EMAIL]]` | Every page (footer), about, thank-you, legal, Organization JSON-LD, llms files | `NEXT_PUBLIC_EMAIL` |
| `[[ORDER_FORM_URL]]` | `/pricing/` | `NEXT_PUBLIC_ORDER_FORM_URL` |
| `[[GO_LIVE]]` | `/` FAQ, `/compare/specialty-answering-service/`, `/thank-you/`, llms-full | `NEXT_PUBLIC_GO_LIVE` |
| `[[PHONE]]` | Every page (footer, hidden while unset), about | `site.phone` |

## For Andy to review

- Phase 2, at 375 px: `/` and `/pricing/`.
- Home Implication copy (new, not on the canvas) and its three sources.
- Pricing "Why does billing by the second matter?" uses two BiggerPockets posts; the Ruby and PATLive Trustpilot complaints from the research could not be fetched and are not used.
- Growth plan bullet "Rules set per property" is from the canvas, but every plan triages per property at launch (Home FAQ says so). Consider a different Growth bullet.
- Phase 3: `/emergency-maintenance-answering/`, `/apartments/`, `/hoa/`, `/about/` at 375 px.
- HOA copy is new (no canvas board). The HOA example association "Pine Ridge Townhomes" puts "the community's own tech" first on the ladder, not an outside vendor, because vendor dispatch is behind a false flag.
- Apartments FAQ "Which plan fits a 120-unit community?" no longer says "Most single communities start on Starter" (no data behind it); it gives the Starter numbers and offers to size it on the call.
- About says Mae runs on Retell with Twilio. Remove if you prefer not to name suppliers.
- Phase 7 fix: body and mono fonts use `font-display: optional` instead of the brief's `swap` (CLS). On a first, cold visit body text may show in the fallback font for that page view.
- Phase 7 fix: the Next.js runtime loads just after first paint (`scripts/defer-scripts.mjs`). A click in the first fraction of a second goes to the plain booking or order URL without UTMs. Revisit if Next.js changes how it emits scripts (the build step only touches `/_next/static/chunks/*.js` async tags).
- Phase 5: the template emergency list on the guide (15 rows, with "Your call" for lockouts, no hot water and AC). It is generic guidance; check it matches how you would set up a client.
- Student housing parent-privacy wording ("Mae does not confirm whether a student lives in the community") is a product rule I wrote. Confirm the agent will behave that way.
- Phase 4: the hub's "Not stated on their page" cells. They are accurate but make the table look one-sided; the alternative is to drop those columns for vendors whose pages say nothing.
- The canvas compare table said Ruby bills "Minute, rounded up". Ruby's page does not state rounding, so the table says "The minute".

- Phase 0: the corrected Property Meld price ($1.50/unit add-on plus Ops), the changed Smith.ai AI terms (per-call live agent add-on, Spanish included, no money-back on the AI page), and the sources left out (NYC heat rules, both Trustpilot complaints, AnswerConnect).

## Next pages

Not built in v1. Each needs its sources re-fetched on the day it is written.

| Route | Template | Notes |
|---|---|---|
| `/compare/property-meld-max-on-call/` | Compare | Property Meld page checked 14 Nov 2026: MAX On-Call $1.50/unit add-on on Ops $2.00/unit, $200/month minimum. Better choice if you run Property Meld and only need maintenance answered. |
| `/compare/buildium-maintenance-contact-center/` | Compare | Buildium page checked 14 Nov 2026: $0.70 or $1.10 per unit, $140 minimum, $300 setup, human agents 24/7, maintenance only. Better choice if you run Buildium and only need maintenance answered. |
| `/compare/ai-answering-vs-call-center/` | Compare (category) | Owns "property management call center" (300, KD 5). Needs a source for call center pricing beyond the vendor pages already checked. |
| `/guides/on-call-rotation-and-escalation/` | Guide | No measurable keyword. Draw on Andy's field service experience; no statistics without a source. |
| `/commercial/` | Segment | Listed as "later" on the canvas. |

## 14 November 2026: legal pages

- `/privacy/` and `/terms/` written from Antek Automation's own policies, fetched 14 November 2026: https://www.antekautomation.com/privacy-policy (address, ICO ZC133436, DUNS 235593033, retention periods, UK GDPR rights) and https://www.antekautomation.com/terms-of-business (payment, 30 days' notice, liability cap, England and Wales law). Adapted for a US service: MaeDay limits, controller/processor split for client call data, US state privacy rights, US-based providers (Retell, Twilio, Vercel).
- `site.address` filled; `site.legal` holds status, ICO and DUNS.
- For Andy to review: both pages are drafts, not legal advice. Check governing law (England and Wales) suits US clients, the retention periods (call recordings 90 days, transcripts and logs 12 months) match how Retell and the email summaries actually store data, and the email in `NEXT_PUBLIC_EMAIL` (currently `hello@example.com`). Pages stay noindex.
- Pricing terms filled from the suggested wording: contract "Month to month, cancel with 30 days' notice" (matches the terms page), annual "12 times the monthly price", rollover "they reset on your billing date".
- Sister-site link (footer and pricing FAQ) hidden with `site.sister.live: false` until that page is live.
- Home FAQ on AppFolio, Buildium and Yardi now says Mae works with any property software that accepts data through an API or webhooks, set up on the setup call. `site.timing.integration` is no longer used. Andy to confirm this is offered at launch.
- Filled: concurrent calls "20" and tour booking "planned, with no date yet" (suggested wording); Portfolio card extra "Lowest per-minute overage rate" (true from plan config). Andy to confirm Mae handles 20 calls at once on the Retell plan.
