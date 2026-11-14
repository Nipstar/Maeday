You are building the MaeDay marketing site in this repo (Nipstar/Maeday) for propertymanagementafterhoursansweringservice.com.

Read these first, end to end:
1. docs/BUILD_MAEDAY_SITE.md (the build brief: source of truth for product, config, routes, page specs, copy rules, checks and phases)
2. docs/RESEARCH.md (keywords, competitor facts with URLs and dates, sources for every legal and buyer fact)
3. Every file in reference/design/ (the design canvas: Main.dc.html is the brand board, then Home, Pricing, Apartments as the segment template, CompareSmithAi as the compare template; canvas.json holds per-page SEO titles, metas, H1s and build notes)
4. Clone https://github.com/Nipstar/ai-receptionist read-only into /tmp/ai-receptionist and read its README.md, CLAUDE.md, src/site.config.ts, src/lib/format.ts, src/lib/schema.ts, src/content/competitors.ts and scripts/check.ts. Copy that structure and tooling. Do not copy its copy or its look.

How to run this build (this overrides the brief's "Stop. Report. Wait."):
- Work on a branch named build/v1. Do Phases 0 to 7 of the brief in order, without stopping between phases.
- After each phase: run `ALLOW_PLACEHOLDERS=1 npm run build` and `ALLOW_PLACEHOLDERS=1 npm run check` (from Phase 1 on), fix every failure, update BUILD_LOG.md, commit with the message the brief gives for that phase, and push the branch.
- Where the brief says Andy reviews, keep going and list what he should look at in BUILD_LOG.md under "For Andy to review".
- Stop early only if something blocks the build (a tool or package that will not install, a check you cannot make pass without breaking a copy rule). Then push what you have and report.
- Phase 5: build the guide plus /single-family-rentals/ and /student-housing/. Leave the extra compare pages and the on-call guide as entries in BUILD_LOG.md "Next pages", not built.
- Phase 8 (deploy): do not deploy. Write docs/DEPLOY.md with the exact Cloudflare Pages steps, env vars per environment, the callmaeday.com and getmaeday.com redirect rule, and the live checks from the brief.
- At the end, open a pull request from build/v1 to main titled "MaeDay site v1" whose description lists: pages built, checks passing, Lighthouse and axe results, every source and competitor fact re-checked with its date, anything you could not verify and left out, and every remaining [[PLACEHOLDER]] with where it shows.

Non-negotiables (also in the brief):
- Next.js static export, Tailwind v4, TypeScript. No Astro. No server runtime.
- Every price, minute figure, phone number and URL comes from src/site.config.ts or src/content/competitors.ts. Never type one into a page.
- Every page in SPIN order as the brief describes, including the Problem, Implication and ForwardBox sections on Home that the canvas does not show yet.
- US English. No em dashes. No exclamation marks. No banned words. No invented statistics, testimonials, logos or results. No guarantees. Never "Antek Automation Ltd". No VAT or sales tax.
- Mae is "she", an AI voice agent, never implied to be a person. Features behind a false flag (SMS, Spanish, software integrations, tour booking, human fallback) are never claimed.
- Re-fetch every competitor page and every legal or statistical source before using it. Anything you cannot verify on the source page is left out.
- Example calls use invented names and 555 numbers and are labelled as examples.
- Placeholders stay visible as [[UPPER_CASE]] until Andy fills them.
- Write README.md and CLAUDE.md as the brief describes, so later sessions follow the same rules.
