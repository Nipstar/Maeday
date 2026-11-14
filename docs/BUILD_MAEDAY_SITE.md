# MaeDay Site, Build 01: propertymanagementafterhoursansweringservice.com

## Purpose

Build a fast, static, mobile-first marketing site for **MaeDay**, Antek Automation's after-hours answering service for US property managers. The site ranks for the "property management answering service" and "after hours" searches, gets cited by AI search engines, and sends every visitor to one action: **book a 20-minute setup call**. A secondary path lets small accounts start the Starter plan straight away.

Mae is the voice on the phone. She answers tenant, owner, prospect and vendor calls when the office is closed, checks each emergency against the manager's own rules for that property, calls the on-call tech (then retries, then the backup), logs routine requests for the morning, and emails a timestamped summary of every call. The site sells that outcome: **the emergency reached the on-call tech, and the tenant got an answer.**

Copy this build pattern from `Nipstar/ai-receptionist` (read-only): Next.js static export, Tailwind v4, `src/site.config.ts` as the single source for prices, `NEXT_PUBLIC_*` env vars for deployment values, `scripts/check.ts` enforcing the copy rules, JSON-LD built from the same data as the visible FAQ, `llms.txt`, and `vercel.json` plus `public/_headers`. Copy the structure, not the copy and not the look.

Repo: `Nipstar/maeday` (Andy creates it).

## Source-of-truth files (put these in the repo before Phase 0)

| File | What it is | Where from |
|---|---|---|
| `docs/RESEARCH.md` | Phase 1 research: keywords, page map, competitor facts with URLs and dates, buyer needs, recommendation, capability checklist | Export of the Claude Doc "Phase 1 Research: propertymanagementafterhoursansweringservice.com" |
| `docs/BUILD_MAEDAY_SITE.md` | This brief | This file |
| `reference/design/Main.dc.html` | Brand board: logo, colours, type, components, voice rules | Design canvas "MaeDay · after-hours answering site" |
| `reference/design/Home.dc.html` | Home page design and copy | Canvas |
| `reference/design/Pricing.dc.html` | Pricing page design and copy | Canvas |
| `reference/design/Apartments.dc.html` | Segment template (`/apartments/`) | Canvas |
| `reference/design/CompareSmithAi.dc.html` | Compare template (`/compare/smith-ai/`) | Canvas |
| `reference/design/canvas.json` | Canvas index, including per-page SEO notes, build notes and the placeholder list | Canvas |

Canvas: https://claude.ai/artifact/YLSc8BedsgUGjtpMLs32TN
Research doc: https://claude.ai/artifact/9uDLiU8hCkpNFsc4S46q5j

Where the canvas and this brief disagree, this brief wins. It adds two SPIN sections the Home artboard does not have yet (Problem and Implication, below). Build them with the canvas components.

## Product source of truth (confirmed by Andy, 14 Nov 2026)

- **Brand:** MaeDay. The voice agent is **Mae** ("she", never "it"). Tagline: "When it's a mayday, Mae answers." The mayday pun appears in the name and that one line only. Everywhere else the tone is calm.
- **Seller:** Antek Automation. Never "Ltd" or "Limited". Footer: "MaeDay is a service of Antek Automation."
- **Voice and telephony:** Retell (voice agent) and Twilio (numbers, transfers, SMS). Not GoHighLevel.
- **Coverage:** after hours by default, 24/7 on request at the same rates.
- **Primary CTA:** Book a setup call (20 minutes). **Secondary CTA:** Hear a sample call (demo line). **Tertiary, pricing page only:** Start Starter now (order form).
- **Plans** (all in `site.config.ts`, never typed into a page):

| Plan | Monthly | Minutes | About this many calls at 3 min | Overage |
|---|---|---|---|---|
| Starter | $197 | 500 | 150 | $0.35/min |
| Growth | $397 | 1,250 | 400 | $0.30/min |
| Portfolio | $797 | 2,500 | 800 | $0.25/min |

- **Setup fee:** $297 on monthly plans, $0 on annual plans.
- **Billing:** by the second, no rounding up. Not counted: spam, robocalls, wrong numbers, calls under 10 seconds. Counted: tenant, owner, prospect and vendor calls, plus Mae's calls to the on-call ladder.
- **At launch:** answering in the client's name with a recording notice on every call; triage against each property's emergency list; warm transfer to the on-call tech; outbound call to the tech if the transfer fails; retry and backup ladder; routine repairs logged for the morning; lockouts handled by the client's policy; leasing answers from an approved script with the prospect's details passed on; owner-call routing; an email summary with recording and transcript for every call.
- **After Twilio A2P 10DLC approval (1 to 3 weeks):** text alerts to the on-call tech, text confirmation to the tenant, texts to backup contacts.
- **Later (config flags, all `false` at launch):** property software integration (Rentvine and Buildium first), tour booking into a calendar, Spanish, human fallback, vendor dispatch beyond the client's own team, monthly owner report.
- **Limits stated on the site:** Mae does not call 911 and tells anyone reporting fire, gas or injury to hang up and call 911. She does not judge safety beyond the client's rules. If nobody on the ladder answers, she logs every attempt and alerts the manager, but she cannot fix the problem. She does not screen applicants or describe neighborhoods. She says she is an AI if asked. Texts start after carrier registration.

## Stack and hosting

- Next.js (App Router), `output: 'export'`, `trailingSlash: true`, TypeScript, Tailwind CSS v4. No server runtime. No Astro.
- Hosting: **Cloudflare Pages** (the domain is already on Andy's Cloudflare account, added 24 Oct 2026, no DNS records yet). Build `npm run build`, output `out/`, headers in `public/_headers`. Keep `vercel.json` in sync so a Vercel deploy also works.
- Fonts: Bricolage Grotesque (600, 700), Instrument Sans (400, 500, 600), IBM Plex Mono (500). Self-host through `@fontsource` (static weights, Latin subset, `font-display: swap`, preload the display face only).
- No client framework beyond what Next needs. Inline JS only for: the booking modal (loads on first click), the sticky mobile CTA bar, UTM capture, and the forward-box copy button.

## site.config.ts

Mirror `ai-receptionist`'s `site.config.ts` (the `env()` helper, the literal `process.env.NEXT_PUBLIC_X` reads, `isPlaceholder()`), with this shape:

```ts
export const site = {
  name: 'MaeDay',
  persona: 'Mae',
  tagline: "When it's a mayday, Mae answers.",
  descriptor: 'After-hours answering for property managers',
  domain: env(process.env.NEXT_PUBLIC_SITE_URL, 'https://propertymanagementafterhoursansweringservice.com'),
  shortDomain: 'callmaeday.com', // 301 to the main domain, Cloudflare redirect rule
  owner: 'Antek Automation', // never "Ltd" or "Limited"
  email: env(process.env.NEXT_PUBLIC_EMAIL, '[[EMAIL]]'),
  demoPhone: {
    display: env(process.env.NEXT_PUBLIC_DEMO_PHONE_DISPLAY, '[[DEMO_PHONE_DISPLAY]]'),
    tel: env(process.env.NEXT_PUBLIC_DEMO_PHONE_E164, '[[DEMO_PHONE_E164]]'),
  },
  bookingUrl: env(process.env.NEXT_PUBLIC_BOOKING_URL, '[[BOOKING_URL]]'),
  orderUrl: env(process.env.NEXT_PUBLIC_ORDER_FORM_URL, '[[ORDER_FORM_URL]]'), // Starter only
  goLive: env(process.env.NEXT_PUBLIC_GO_LIVE, '[[GO_LIVE]]'), // e.g. "3 to 5 business days"
  plans: [
    { id: 'starter', name: 'Starter', price: 197, minutes: 500, approxCalls: 150, overagePerMinute: 0.35, blurb: 'For one to a few properties.', buyNow: true },
    { id: 'growth', name: 'Growth', price: 397, minutes: 1250, approxCalls: 400, overagePerMinute: 0.30, blurb: 'For growing portfolios with leasing calls.', featured: true },
    { id: 'portfolio', name: 'Portfolio', price: 797, minutes: 2500, approxCalls: 800, overagePerMinute: 0.25, blurb: 'For larger portfolios and 24/7 lines.' },
  ],
  currency: 'USD',
  setupFee: { monthly: 297, annual: 0 },
  annual: '[[ANNUAL_PRICE: 12 times monthly, setup fee waived]]',
  contract: '[[CONTRACT: month to month]]',
  rollover: '[[ROLLOVER: unused minutes reset on your billing date]]',
  portfolioExtra: '[[PORTFOLIO_EXTRA]]',
  billing: { incrementSeconds: 1, minBillableSeconds: 10, typicalCallMinutes: 3 },
  coverage: { default: 'after hours', onRequest: '24/7' },
  concurrentCalls: '[[CONCURRENT_CALLS: 20]]',
  textAlertApproval: '1 to 3 weeks',
  flags: { sms: false, softwareIntegration: false, tourBooking: false, spanish: false, humanFallback: false },
  analytics: { gtmId: env(process.env.NEXT_PUBLIC_GTM_ID, '') },
  pricesChecked: '14 November 2026',
  copyrightYear: 2026,
} as const;
```

Content strings use tokens (`{starter.price}`, `{starter.minutes}`, `{setupFee.monthly}`, `{textAlertApproval}`, `{goLive}`...) filled by `fill()` in `src/lib/format.ts`, as in ai-receptionist. Features gated by a flag render only when the flag is `true`.

`src/content/competitors.ts`: one entry per competitor with `name`, `kind` (`human`, `ai`, `pm-addon`), the published price fields, `url` (their own page), `checked` (date) and `notes`. Seed it from `docs/RESEARCH.md` section 3, verified rows only. Unverified rows (PATLive, AnswerConnect) stay out until Phase 4 re-fetches them.

## Environment variables

| Variable | Replaces | Notes |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | default domain | Set to the preview URL on test deploys only |
| `NEXT_PUBLIC_EMAIL` | `[[EMAIL]]` | Footer, schema, legal pages |
| `NEXT_PUBLIC_DEMO_PHONE_DISPLAY` | `[[DEMO_PHONE_DISPLAY]]` | Twilio number on the Retell demo agent ("Oak Street Property Management") |
| `NEXT_PUBLIC_DEMO_PHONE_E164` | `[[DEMO_PHONE_E164]]` | Same number for `tel:` links |
| `NEXT_PUBLIC_BOOKING_URL` | `[[BOOKING_URL]]` | Setup-call calendar (GHL booking widget on crm.antekautomation.com, as calldella.com uses) |
| `NEXT_PUBLIC_ORDER_FORM_URL` | `[[ORDER_FORM_URL]]` | Starter checkout |
| `NEXT_PUBLIC_GO_LIVE` | `[[GO_LIVE]]` | Setup time shown in FAQs |
| `NEXT_PUBLIC_GTM_ID` | (off) | Optional |
| `ALLOW_PLACEHOLDERS` | | `1` on preview builds only |

Ship a `.env.example` with fictional values (555-01xx numbers).

## Integrations

- **Setup call (primary CTA):** every "Book a setup call" button is `<BookLink>`. It opens the booking URL in a modal on the page; the iframe and `form_embed.js` load on first click, never at page load. It carries UTMs and fires `click_book` with page and position. No JS: a plain link to the booking URL.
- **Demo line:** every "Hear a sample call" button is `<CallLink>` (`tel:` from config, `click_call`). The number is shown as text beside it on desktop.
- **Starter order form:** `<StartLink plan="starter">` on the pricing page only, with UTMs and `click_start`. After payment the form redirects to `/thank-you/`.
- **Chat widget:** none at launch.
- **Out of scope for this repo:** the Retell agents, the n8n escalation ladder and the Twilio A2P registration. They are separate builds. The site only shows what `flags` says is live.

## Brand tokens (`src/app/globals.css`, `@theme`)

From the brand board (`reference/design/Main.dc.html`). It is a new brand with no existing components, so the tokens are listed here.

| Token | Value | Use |
|---|---|---|
| `--color-midnight` | #10182B | Text, the mark, dark bands, footer |
| `--color-night` | #1E2A44 | Cards and tiles on Midnight |
| `--color-amber` | #F2A93B | Primary button (Midnight text), the lit window. One per screen |
| `--color-amber-deep` | #8F5200 | Links and eyebrows on light |
| `--color-daylight` | #FBF8F2 | Page background; cards are white on it |
| `--color-slate` | #4A5468 | Secondary text |
| `--color-line` | #E6E0D4 | Hairlines and card borders |
| `--color-dusk` | #E9EEF8 | Neutral chips, Mae's speech bubble |
| `--color-signal` | #C2412D | The "Emergency" tag only |
| `--color-reached` | #2E7D5B (text #1F5E43 on #E3F1EA) | "Answered, connected" in call logs only |
| Muted on dark | #AAB4C8, #C9D0DD | Secondary text on Midnight |

Buttons 52 px tall, 12 px radius. Cards 16 to 24 px radius, 1 px hairline, no heavy shadows except the hero call log. Headings sentence case, tracking -0.03em. Mono only for times, phone numbers and log lines. Logo: house outline with one lit amber window (`reference/design/Main.dc.html`); export `reference/logo/mark.svg`, `mark-light.svg`, and build `icon.svg`, `apple-icon.png` and `favicon.ico` from it. Amber never colours the wordmark on light backgrounds.

Shared components (from the canvas): `Header`, `Footer`, `BookLink`, `CallLink`, `StartLink`, `CallLog` (the signature 2am log, data-driven, labelled "Example call. Names and numbers are invented."), `AnswerBlock`, `SectionHead`, `Steps`, `CallTypeCard`, `LimitsList`, `PlanCard`, `PlanSection`, `CompareTable`, `BetterChoice`, `Faq`, `ForwardBox`, `FinalCta`, `StickyCta` (mobile, after the hero leaves view), `Breadcrumbs`, `UpdatedDate`, `JsonLd`.

## Route table

| Route | Launch | Design source | Primary keyword (US vol, KD) | Template |
|---|---|---|---|---|
| `/` | Yes | Home.dc.html | property management answering service (1,100, 0) | Home |
| `/pricing/` | Yes | Pricing.dc.html | cost of property management answering service (40) | Pricing |
| `/emergency-maintenance-answering/` | Yes | Home "How it works" and "What won't Mae do" sections | maintenance answering service (150, 1) | Service |
| `/apartments/` | Yes | Apartments.dc.html | apartment answering service (90, 0) | Segment |
| `/hoa/` | Yes | Segment template | hoa answering service (10) | Segment |
| `/single-family-rentals/` | Phase 5 | Segment template | none measurable | Segment |
| `/student-housing/` | Phase 5 | Segment template | none measurable | Segment |
| `/best-property-management-answering-service/` | Yes | Compare template, hub variant | best answering service for property management (150, 4) | Compare hub |
| `/compare/smith-ai/` | Yes | CompareSmithAi.dc.html | branded | Compare |
| `/compare/specialty-answering-service/` | Yes | Compare template | branded | Compare |
| `/compare/property-meld-max-on-call/` | Phase 5 | Compare template | branded | Compare |
| `/compare/buildium-maintenance-contact-center/` | Phase 5 | Compare template | branded | Compare |
| `/compare/ai-answering-vs-call-center/` | Phase 5 | Compare template | property management call center (300, 5) | Compare |
| `/guides/what-counts-as-a-maintenance-emergency/` | Yes | Guide layout | what is considered emergency maintenance in an apartment (200, 1) and the guide cluster | Guide |
| `/guides/on-call-rotation-and-escalation/` | Phase 5 | Guide layout | none measurable | Guide |
| `/about/` | Yes | Simple page | none | About |
| `/thank-you/`, `/privacy/`, `/terms/`, 404 | Yes | Simple page | noindex | |

Keyword ownership with `aireceptionistforsmallbusiness.net`: that site's `/for/property-management/` keeps "ai receptionist for property management" and "property management virtual receptionist". This site owns every "answering service", "after hours", emergency and on-call term. Neither targets "property management virtual assistant" (staffing intent). Cross-links: one link from the footer and the pricing FAQ here, with the anchor "AI receptionist for property management"; Andy adds the reverse link on the other site with the anchor "after-hours answering service for property managers". Distinct titles and H1s, self-canonicals, no shared text.

## SPIN page order and content specs

Every page runs in SPIN order: the reader's situation briefly, their problem, what it costs them, what fixing it is worth, then Mae. Capability comes after the need is named. Keep each section short.

### Home (`/`)

1. **Hero** (need-payoff headline): H1 "After-hours answering that reaches your on-call tech." Eyebrow "Property management answering service". Subhead, Book a setup call, Hear a sample call, chips, `CallLog`.
2. **AnswerBlock** (40 to 60 words, enforced): H2 "What is a property management answering service?"
3. **Problem** (new, not on the canvas): H2 "What happens to your after-hours calls now?" Three short cards: voicemail that nobody hears until morning; a message-taking service that relays the call but cannot tell a flood from a dripping tap; the manager's own phone on the nightstand every night.
4. **Implication** (new): H2 "What does a missed emergency cost?" Water reaching the unit below, the repair clock that starts when the tenant reports it, techs woken for things that could wait, and owners asking for a record you do not have. Use only sourced facts, each linked and dated (Texas Property Code 92.056 seven-day presumption; California Civil Code 1942 and the DRE guide; NYC HPD heat rules; the contactcenterusa.com point that the repair clock starts at notice). No invented figures.
5. **Need-payoff:** H2 "What changes when the right person gets the call?" Emergencies reach someone fast, routine calls wait, every attempt is on record for the owner, and the manager sleeps.
6. **How it works** (canvas `Steps`): H2 "What happens when a tenant calls at 2am?"
7. **Which calls** (canvas `CallTypeCard` grid).
8. **Limits** (canvas `LimitsList`): H2 "What won't Mae do?"
9. **Pricing preview** (canvas `PlanSection`).
10. **When something else is better** (canvas `BetterChoice`).
11. **Who it's for** (segment links).
12. **FAQ** (canvas questions; FAQPage JSON-LD from the same array).
13. **ForwardBox:** "Send this to the owner or your partner." A prefilled `mailto:` and a copy button: the problem, the cost, the fix, the price, the link. It arms the champion when we are not in the room.
14. **FinalCta** (amber band, tagline) and **Footer**.

### Pricing (`/pricing/`)

Hero and AnswerBlock ("What does a property management answering service cost?"), the three `PlanCard`s (Starter carries Start Starter now), H2 "What counts as a minute?", an implication section H2 "Why does billing by the second matter?" (per-minute rounding and paying for hold time, from the complaints in the research, linked), the dated `CompareTable` from `competitors.ts` (every name links to the vendor's page; caption "Published prices from each company's own website, checked {pricesChecked}"), pricing FAQ, FinalCta. JSON-LD: Product with three Offers and a UnitPriceSpecification for overage.

### Service page (`/emergency-maintenance-answering/`)

H1 "Emergency maintenance answering for property managers." AnswerBlock, then Problem (calls that ring out, techs woken for the wrong things), Implication (water spread, habitability timelines, liability without a record), Need-payoff, then the full escalation story: emergency list per property, warm transfer with a spoken summary, retry timing, backup, final alert, the log. Show the ladder as a numbered list or a simple horizontal diagram, not a table. Limits, FAQ, CTA.

### Segment template (`/apartments/`, `/hoa/`, `/single-family-rentals/`, `/student-housing/`)

One object per segment in `src/content/segments.ts`: `slug`, `title`, `metaDescription`, `h1`, `primary`, `secondaries`, `answer`, `problems[3]`, `implications[3]`, `needPayoff`, `exampleCalls[]` (invented names, 555 numbers, rendered with `CallLog`), `specifics` (one section unique to the segment), `faqs[4]`, `related[2]`. Unique copy for each segment's real calls, not find-and-replace.

- **Apartments:** leaks into the unit below, no heat, noise, prospects after the office closes; Fair Housing on leasing calls; different rules per community.
- **HOA:** common-area emergencies (pool, gate, garage door, sprinklers, roof leaks into several units), homeowner versus association responsibility, board members calling, the manager's own after-hours list per association.
- **Single-family rentals:** scattered sites, owners who call directly, tenants unsure who to call, vendor or tech travel time.
- **Student housing:** lockouts at night, parents calling, move-in and move-out peaks, residents who have never reported a repair before.

### Compare template (`/compare/[slug]/`)

One object per page in `src/content/compare.ts`. Order: H1 "MaeDay vs [Name] for property management", a dated "short answer" box (40 to 60 words), a side-by-side table of facts from the competitor's own pages (each linked, with the check date), "[Name] is the better choice if" and "MaeDay is the better choice if" (both required, the build fails without the first), a worked cost example from config and `competitors.ts`, then CTA. Never disparage. Never Review or AggregateRating schema. Phase 4 re-fetches every competitor page before writing.

- **Smith.ai:** use the canvas copy.
- **Specialty Answering Service:** human operators, from $44 a month, Spanish-speaking staff, dispatch by phone, text, pager or email. They are the better choice if you want a person on every call.
- **Property Meld MAX On-Call** and **Buildium Maintenance Contact Center:** per-unit add-ons that create work orders inside their own platform and cover maintenance only. They are the better choice if you run that software and only need maintenance answered.
- **AI answering vs call center:** the category comparison, owning "property management call center".
- **Hub (`/best-property-management-answering-service/`):** states at the top that MaeDay is ours, then scores every service on the same criteria (billing unit, emergency ladder, per-property rules, leasing calls, owner calls, software required, published price) with links to each compare page.

### Guide (`/guides/what-counts-as-a-maintenance-emergency/`)

Manager-facing, owning the guide cluster (what is considered emergency maintenance, maintenance emergency list, is no hot water / no AC / a clogged toilet an emergency). Includes a template emergency list as a printable table and a copy button. State repair timelines with official sources (Texas, California, NYC), marked "General information, not legal advice". Article schema with author Andy Norman, sources listed, Updated date, one contextual link up to `/emergency-maintenance-answering/`.

### About (`/about/`)

Who builds MaeDay: Antek Automation, founded by Andy Norman, who spent more than 30 years in field service, from field engineer to service manager. On-call schedules and escalation are where he worked. Certified Retell AI Partner. No invented clients, logos or results.

## SEO and AI-search requirements

- One H1 per page. Title under 60 characters, meta description under 155 (titles and metas per page are on the canvas notes). Question-style H2s where natural; the first paragraph under each H2 answers it in one or two sentences.
- `AnswerBlock` on every indexable page, 40 to 60 words, enforced at build.
- Statistics only with a named source, year and link, re-fetched in Phase 0 and recorded in `BUILD_LOG.md`. Competitor facts only from the competitor's own page, dated and linked.
- JSON-LD built from config and content, never hand-written: Organization (MaeDay, `parentOrganization` Antek Automation, `founder` Andy Norman), WebSite, BreadcrumbList on every page below home, Service with Offers on service and segment pages, Product with Offers and UnitPriceSpecification on pricing, FAQPage text identical to the visible FAQ (tested), Article on guides, SpeakableSpecification on the home AnswerBlock. Never Review or AggregateRating.
- `robots.txt` allowing GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, Claude-User, PerplexityBot, Google-Extended, Applebot-Extended and Bingbot, with a `Sitemap:` line.
- `llms.txt` and `llms-full.txt` generated at prebuild from content (as in ai-receptionist): a fixed one-paragraph description of MaeDay, page list with one-line summaries, plans and prices from config, what Mae won't do, contact.
- `sitemap.xml` with real `lastmod`. IndexNow key and a post-deploy ping script.
- OG images per page via `opengraph-image.tsx` in the brand (Midnight, amber window, page title).
- Every page shows "Last updated".

## Copy rules (enforced by `scripts/check.ts`)

- US English. No em dashes. No exclamation marks.
- Banned: leverage, revolutionize, seamless, solution(s), cutting-edge, game-changer, AI-powered, omnichannel, unlock, supercharge, robust.
- No invented statistics, testimonials, logos or results. No guarantees, including response times.
- Never "Antek Automation Ltd" or "Limited". Never mention VAT or sales tax.
- Sell the outcome (the emergency reached the on-call tech, the tenant got an answer), not "AI". Mae is "she". She is an AI voice agent and the site never implies she is a person.
- Honest limits up front (the list in Product source of truth). Features behind a `false` flag are never claimed.
- "24/7" only as "24/7 on request".
- The mayday pun appears in the brand name and the tagline only. No sirens, alarms or panic copy.
- No stock photos, no robots, no headsets. Mae appears as an initial in a circle.
- Example calls use invented names and 555 numbers, labelled as examples.
- Fair Housing: leasing copy never mentions neighborhoods, schools or who lives somewhere, and says accommodation requests go to a person.
- Placeholders are `[[UPPER_CASE]]` or `[[KEY: suggested wording]]` and stay visible until filled.

## scripts/check.ts

Port ai-receptionist's `check.ts`, then add the MaeDay rules. `prebuild` runs the source checks; `postbuild` runs the built checks on `out/`. It fails on:

1. Any `[[PLACEHOLDER]]` in built HTML unless `ALLOW_PLACEHOLDERS=1`.
2. Em dash, `!` in visible copy, banned words, UK spellings, "Ltd"/"Limited" after Antek Automation, VAT or sales tax.
3. Any `$` figure or minute figure not in config, derived from config, or in `competitors.ts`.
4. A `tel:` link to any number other than the configured demo line.
5. JSON-LD that does not parse; FAQPage text that differs from the visible FAQ; any Review or AggregateRating type.
6. An AnswerBlock outside 40 to 60 words.
7. A compare page without a "better choice if" entry for the competitor, or a competitor fact without `url` and `checked`.
8. A claim gated by a `false` flag (Spanish, text alerts, integration names AppFolio/Buildium/Yardi/Rent Manager/Rentvine outside compare pages and the "not yet" FAQ, tour booking).
9. Broken internal links; missing title, description or canonical; not exactly one H1.

Warnings: titles over 60 characters, descriptions over 155. `npm run check` also runs ESLint and `tsc --noEmit`.

## Analytics

`window.dataLayer` events: `click_book` (page, position), `click_call` (page, position), `click_start` (plan, page), `forward_copy` and `forward_email` (ForwardBox), `purchase_complete` (thank-you, once per session). UTMs and click IDs are captured to `sessionStorage` on first landing and appended to the booking and order URLs with `source_page`. GTM loads only when `NEXT_PUBLIC_GTM_ID` is set. Booking completions are counted on the booking calendar by UTM.

## Performance and accessibility

Lighthouse mobile 95+ in every category on every page. LCP 1.8 s or less, CLS 0.05 or less, no third-party script at load (booking iframe and GTM load late). Designed at 375 px first: 16 px gutters, 17 px body, 48 px tap targets, no horizontal scroll (wide tables in a scroll box). axe: zero violations. Colour pairs already pass 4.5:1 on the brand board; keep them.

## Phases and commit points

Work on `main` with one commit per phase (message as given). Write progress to `BUILD_LOG.md`. **Stop. Report. Wait.** after every phase.

### Phase 0: Audit (commit `docs: phase 0 audit`)
1. Read this brief, `docs/RESEARCH.md` and every `reference/design/*.dc.html` end to end.
2. Table every route: URL, primary, secondaries, title, meta, H1, design source. Flag anything ambiguous.
3. Map every `[BRACKETED]` placeholder on the canvas to a config key or `[[PLACEHOLDER]]`.
4. List every statistic, legal reference and competitor fact the copy will use. Fetch each source and confirm it still reads the same. Record pass or fail with the date.
5. Confirm current Next.js, Tailwind v4 and `@fontsource` versions.

### Phase 1: Scaffold, config, tokens, layout (commit `feat: scaffold, config and brand`)
Scaffold from the ai-receptionist structure. `site.config.ts`, `competitors.ts` (verified rows), `format.ts`, `globals.css` tokens, fonts, logo and icons, `Header`, `Footer`, `StickyCta`, `BookLink` modal, `CallLink`, `StartLink`, UTM capture, `.env.example`, `public/_headers`, `vercel.json`. One placeholder page. Report a Lighthouse mobile run.

### Phase 2: Home and pricing (commit `feat: home and pricing`)
All shared section components, then `/` and `/pricing/` in SPIN order from the specs above. FAQ and JSON-LD from one array. Andy reviews both at 375 px before you continue.

### Phase 3: Service, segments, about (commit `feat: service, segments and about`)
`/emergency-maintenance-answering/`, `/apartments/`, `/hoa/`, `/about/`, `/thank-you/`, `/privacy/` and `/terms/` (noindex until Andy supplies reviewed legal text), 404.

### Phase 4: Compare pages (commit `feat: compare pages`)
Re-fetch each competitor's pricing and feature pages, update `competitors.ts` with what they say and the date, then build `/compare/smith-ai/`, `/compare/specialty-answering-service/` and the hub. Anything you cannot verify from the source page is left out and listed in `BUILD_LOG.md`.

### Phase 5: Guides and later pages (commit `feat: guides and remaining pages`)
`/guides/what-counts-as-a-maintenance-emergency/` with sourced timelines. Then, if Andy says go: `/single-family-rentals/`, `/student-housing/`, the remaining compare pages and the on-call guide.

### Phase 6: SEO and AI search (commit `feat: schema, llms, robots, sitemap, og`)
JSON-LD builders, `llms.txt` and `llms-full.txt`, `robots.txt`, sitemap, OG images, IndexNow. Validate every page's JSON-LD and record the results.

### Phase 7: QA (commit `test: checks and ci`)
`check.ts` complete, Lighthouse CI, axe, Playwright at 375 px and 1280 px (no horizontal scroll, sticky CTA appears after the hero, every CTA carries UTMs, `tel:` only to the demo line, FAQ JSON-LD equals visible text, booking modal loads only on click). GitHub Actions on PRs.

### Phase 8: Deploy (tag `v1.0.0`)
1. Cloudflare Pages project from the repo: framework None, build `npm run build`, output `out`, `NODE_VERSION=22`, env vars per environment, `ALLOW_PLACEHOLDERS=1` on Preview only.
2. Custom domain on the apex, `www` redirecting to it. `callmaeday.com` and `getmaeday.com` 301 to the apex through a Cloudflare redirect rule.
3. Check Bot Fight Mode and AI crawler blocking are off so the bots in `robots.txt` can fetch pages; confirm with each user agent.
4. Live checks: `curl -I` for headers, `/llms.txt` as text/plain, 404, Lighthouse on the live URL, IndexNow ping. Andy verifies Search Console and Bing Webmaster Tools.

**Stop. Report. Done.**

## README.md contents

Mirror ai-receptionist's README: what the site is (one paragraph, MaeDay by Antek Automation, plans from config); Run; Build and check (`ALLOW_PLACEHOLDERS=1 npm run build`, `npm run check`); Environment variables table; Deploy to Cloudflare Pages (and Vercel); Where things live table; Remaining placeholders table; Setup checklist outside the repo (booking calendar, Starter order form and thank-you redirect, Retell demo agent and Twilio demo number, Twilio A2P 10DLC registration, callmaeday.com redirect); Analytics events.

## CLAUDE.md contents

Mirror ai-receptionist's CLAUDE.md, rewritten for MaeDay: one-paragraph description and stack; Where things live (config, content files, components, schema, tokens, design source, checks); Copy rules (the list above, including Mae is "she", the tagline limit, flags gate claims, Fair Housing wording); Checks (the two commands, what fails); Adding pages (new segment = object in `segments.ts`; new compare = object in `compare.ts` plus any competitor in `competitors.ts` re-fetched and dated; new route = add to `indexableRoutes()`).

## Remaining placeholders

| Placeholder | Where | Needed from Andy |
|---|---|---|
| `[[EMAIL]]` | Footer, schema, legal | Public email for MaeDay |
| `[[DEMO_PHONE_DISPLAY]]`, `[[DEMO_PHONE_E164]]` | Every Hear a sample call | Twilio number on the Retell demo agent |
| `[[BOOKING_URL]]` | Every Book a setup call | Setup-call calendar URL |
| `[[ORDER_FORM_URL]]` | Start Starter now | Starter checkout URL and thank-you redirect |
| `[[GO_LIVE]]` | FAQs, thank-you | Setup time, e.g. "3 to 5 business days" |
| `[[ANNUAL_PRICE]]` | Pricing | Annual price or discount |
| `[[CONTRACT]]` | Pricing FAQ, compare | Month to month or minimum term |
| `[[ROLLOVER]]` | Pricing FAQ | Unused minutes: roll over or reset |
| `[[PORTFOLIO_EXTRA]]` | Portfolio card | What Portfolio adds beyond minutes |
| `[[CONCURRENT_CALLS]]` | Apartments FAQ | Concurrent calls per client on Retell |
| `[[ADDRESS]]`, `[[PHONE]]` | Footer | Antek Automation contact details to show on a US site |
| `[[PRIVACY_*]]`, `[[TERMS_*]]` | Legal pages | Reviewed privacy policy and terms |
| Integration timing, tour booking timing | FAQs | Dates, or keep "not yet" wording |

## Definition of done

1. Live on HTTPS at the apex with `www`, `callmaeday.com` and `getmaeday.com` redirecting; every launch route published.
2. Lighthouse mobile 95+ in all four categories on every page; axe clean.
3. Every page in SPIN order with an AnswerBlock, FAQ with matching schema and one CTA path with UTMs.
4. Prices, minutes, numbers and URLs come only from config; flags gate every later feature.
5. Schema validates; `llms.txt`, `llms-full.txt`, `robots.txt` and the sitemap are live; AI crawlers can fetch pages.
6. `BUILD_LOG.md` lists every verified source and competitor fact with its check date, and any open placeholders.

## Out of scope

Retell agent build, n8n escalation workflow, Twilio A2P registration, a Spanish site, a chat widget, paid ads, and changes to aireceptionistforsmallbusiness.net beyond the one reverse link Andy adds.

---

## Claude Code prompts (paste one per phase)

**Kickoff (Phase 0):**
> Read `docs/BUILD_MAEDAY_SITE.md`, `docs/RESEARCH.md` and every file in `reference/design/`. Clone `Nipstar/ai-receptionist` read-only into `/tmp/ai-receptionist` and read its README, CLAUDE.md, `src/site.config.ts`, `src/lib/format.ts` and `scripts/check.ts`. Do Phase 0 only. Write the results to `BUILD_LOG.md`, commit `docs: phase 0 audit`, then stop and report.

**Each later phase:**
> Continue `docs/BUILD_MAEDAY_SITE.md` with Phase N only. Follow the copy rules and keep every price, minute and number in `site.config.ts`. Run `ALLOW_PLACEHOLDERS=1 npm run build` and `ALLOW_PLACEHOLDERS=1 npm run check`; both must pass. Update `BUILD_LOG.md`, commit with the message the brief gives, then stop and report what you built, anything you could not verify, and the open placeholders.

**Fix after review:**
> Andy's review notes for Phase N are below. Change only what they ask, rerun both checks, update `BUILD_LOG.md`, make a new commit `fix: phase N review` (do not amend), then stop and report.
