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

## For Andy to review

- Phase 0: the corrected Property Meld price ($1.50/unit add-on plus Ops), the changed Smith.ai AI terms (per-call live agent add-on, Spanish included, no money-back on the AI page), and the sources left out (NYC heat rules, both Trustpilot complaints, AnswerConnect).

## Next pages

(Filled in Phase 5.)
