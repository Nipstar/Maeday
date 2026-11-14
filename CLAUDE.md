# CLAUDE.md

Marketing site for **MaeDay** (propertymanagementafterhoursansweringservice.com): after-hours answering for US property managers, a service of Antek Automation. Mae, an AI voice agent, answers calls when the office is closed, sends emergencies to the on-call tech by the manager's own rules with retries and a backup, logs the rest for the morning and emails a timestamped log. Primary CTA: book a 20-minute setup call. Static Next.js (App Router, `output: 'export'`, `trailingSlash: true`), TypeScript, Tailwind CSS v4. Hosted on **Vercel** (`npm run build`, static export served from `out/`, headers in `vercel.json`; Node 22). `public/_headers` mirrors the headers so Cloudflare Pages still works as a fallback: keep the two in sync. No server runtime: no Functions, Middleware or ISR; nothing may need one. No Astro. Deploy steps: `docs/DEPLOY.md`.

`docs/BUILD_MAEDAY_SITE.md` is the source of truth for product, routes, page specs and rules. `docs/RESEARCH.md` holds keywords and the original research. `BUILD_LOG.md` records every source and competitor fact with its check date, open placeholders, items for Andy to review and next pages.

## Where things live

- `src/site.config.ts`: the single source for every price, minute figure, phone number, URL, flag and the legal and buyer sources (`site.sources`, each with `url` and `checked`). Deployment values come from `NEXT_PUBLIC_*` env vars at build time, falling back to `[[PLACEHOLDER]]`s; read each by its literal `process.env.NEXT_PUBLIC_X` name. **Never type a price, minute figure, phone number or URL into a page, component or content file.**
- `src/content/competitors.ts`: competitor facts, each read on the vendor's own page, with `url` and `checked`.
- `src/content/`: all copy. `home.ts`, `pricing.ts`, `faqs.ts`, `service.ts`, `segments.ts` (one object per segment page), `compare.ts` (compare pages and the hub), `guides.ts`, `about.ts`. Strings use tokens (`{starter.price}`, `{setupFee.monthly}`, `{c.smithai.tier1.price}`, `{texasRepairDays}`...) filled by `fill()` in `src/lib/format.ts`, and `{@key}` inline links from `src/lib/links.ts` (rendered by `<Rich>`; plain text until the target page exists).
- `src/components/`: shared UI. Every "Book a setup call" is `<BookLink position>` (modal, UTMs, `click_book`). Every "Hear a sample call" is `<CallLink position>` (`tel:` from config, `click_call`). "Start Starter now" is `<StartLink plan="starter">`, pricing page only. `<CallLog>` is the signature log, always labelled as an invented example. `<AnswerBlock>` is the 40 to 60 word answer on every indexable page.
- `src/lib/schema.ts`: JSON-LD built from the same data the page renders. Visible `<Faq>` and FAQPage JSON-LD render from one array. Never Review or AggregateRating.
- `src/app/globals.css`: brand tokens in `@theme` (Midnight, Night, Porch Amber, Amber Deep, Daylight, Slate, Line, Dusk, Signal, Reached). `src/lib/fonts.ts`: Bricolage Grotesque, Instrument Sans, IBM Plex Mono from @fontsource.
- `reference/design/*.dc.html`: design source (Main = brand board, Home, Pricing, Apartments = segment template, CompareSmithAi = compare template); `canvas.json` has per-page SEO notes. `reference/logo/`: the marks.
- `scripts/defer-scripts.mjs` (postbuild): loads the Next.js runtime chunks after first paint. If a Next.js upgrade changes how scripts are emitted, check it still finds them (the Playwright test "runtime loads after first paint" fails if not).
- `scripts/check.ts`: the checks. `scripts/check-selftest.ts`: proves each rule fails. `scripts/schema-validate.ts`: JSON-LD. `scripts/generate-llms.ts`: `llms.txt` and `llms-full.txt` (prebuild, gitignored). `scripts/lighthouse.mjs`, `scripts/indexnow.ts`.

## Copy rules (enforced by `scripts/check.ts` where a machine can check them)

- US English. No em dashes. No exclamation marks.
- Banned: leverage, revolutionize, seamless, solution(s), cutting-edge, game-changer, AI-powered, omnichannel, unlock, supercharge, robust.
- No invented statistics, testimonials, logos or results. No guarantees, including response times. A statistic needs a named source, link and check date in `site.sources`, fetched before use.
- Never "Antek Automation Ltd" or "Limited". Never mention VAT or sales tax.
- Sell the outcome (the emergency reached the on-call tech, the tenant got an answer), not "AI". **Mae is "she"**, an AI voice agent; never imply she is a person.
- The mayday pun appears in the brand name and the tagline ("When it's a mayday, Mae answers.") only. No sirens, alarms or panic copy. No stock photos, robots or headsets: Mae is an initial in a circle.
- "24/7" only as "24/7 on request".
- **Flags gate claims.** `site.flags` (sms, softwareIntegration, tourBooking, spanish, humanFallback, vendorDispatch, ownerReport) are false at launch: never claim those features. Mentions in limits, "not yet" answers and competitor facts sit inside elements marked `data-gate-ok` (`gateOk: true` on a card, FAQ or row).
- Honest limits up front: Mae does not call 911 (fire, gas or injury: hang up and call 911), does not judge safety beyond the client's rules, cannot fix it if nobody on the ladder answers, does not screen applicants or describe neighborhoods, says she is an AI if asked; texts start after carrier registration.
- **Fair Housing:** leasing copy never mentions neighborhoods, schools or who lives somewhere, and says accommodation requests go to a person.
- Example calls use invented names and 555 numbers and are labelled as examples.
- Competitors: facts only from their own pages, dated and linked; never disparage; every compare page says when the other service is the better choice.
- Placeholders are `[[UPPER_CASE]]` or `[[KEY: suggested wording]]` and stay visible until filled.
- Every page in SPIN order: situation, problem, implication, need-payoff, then Mae. One H1. Question-style H2s; the first sentence under an H2 answers it. Every page shows "Last updated".

## Checks

```bash
ALLOW_PLACEHOLDERS=1 npm run build
```

```bash
ALLOW_PLACEHOLDERS=1 npm run check
```

`check.ts` fails on: placeholders in built HTML (unless `ALLOW_PLACEHOLDERS=1`); em dash, `!`, banned words, UK spellings, Ltd/Limited, VAT or sales tax, "24/7" without "on request"; any `$` or minute figure not in config, derived from it or in `competitors.ts`; a `tel:` link to anything but the demo line or a phone number that is not a 555 number; JSON-LD that does not parse, fails `schema-validate.ts`, has Review or AggregateRating, or whose FAQPage differs from the visible FAQ; an AnswerBlock outside 40 to 60 words or an indexable page without one; a compare page without both "better choice if" boxes, or a competitor or source without `url` and `checked`; a claim behind a false flag; broken internal links, missing title, description or canonical, not exactly one H1, no "Last updated", a call log without its "invented" label. The same copy rules run on `llms.txt` and `llms-full.txt`. Warnings: titles over 60 characters, descriptions over 155. `npm run check` also runs ESLint and `tsc --noEmit`. Before committing also run `npm run check:selftest` and, with `.env.example` copied to `.env.local`, `npm test`.

## Adding pages

- **New segment:** add an object to `src/content/segments.ts` (unique copy for that segment's real calls: problems, implications, need-payoff, call cards, specifics, an example call log with invented names and 555 numbers, 4 FAQs, 2 `related` slugs). Route, header, footer, sitemap, OG image and llms.txt pick it up.
- **New compare page:** add an object to `src/content/compare.ts` with `theyBetter` and `maeBetter`. Re-fetch the competitor's own pages first and add or update the entry in `competitors.ts` with today's `checked` date; record the fetch in `BUILD_LOG.md`. Add a hub row.
- **New guide:** add to `guides.ts` and a page under `src/app/guides/`. Sources go in `site.sources` after fetching.
- **New top-level route:** add it to `routes` and `builtPages` / `indexableRoutes()` in `src/lib/routes.ts` so it reaches the sitemap and llms.txt, and give it an `opengraph-image.tsx`.
