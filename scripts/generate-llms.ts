/**
 * Writes public/llms.txt and public/llms-full.txt from the content files (runs in prebuild).
 * llms.txt: a fixed description of MaeDay, page list with one-line summaries, plans and prices from
 * config, what Mae won't do, contact. llms-full.txt adds the copy of every page.
 */
import './load-env';
import { writeFileSync } from 'node:fs';
import { site } from '../src/site.config';
import { fill, money, num, rate, tierSummary } from '../src/lib/format';
import { plain } from '../src/lib/links';
import { builtPages, routes } from '../src/lib/routes';
import { home } from '../src/content/home';
import { pricing } from '../src/content/pricing';
import { homeFaqs, pricingFaqs } from '../src/content/faqs';
import { servicePage } from '../src/content/service';
import { segments } from '../src/content/segments';
import { comparePages, hub } from '../src/content/compare';
import { competitors, getCompetitor } from '../src/content/competitors';
import { emergencyGuide, guides } from '../src/content/guides';
import { about } from '../src/content/about';
import type { Card, Faq } from '../src/content/types';

const url = (p: string) => `${site.domain}${p}`;

const description = `${site.name} is an after-hours answering service for US property managers, run by ${site.owner}. ${site.persona}, an AI voice agent, answers tenant, owner, prospect and vendor calls when the office is closed, checks each emergency against the manager's own list for that property, calls the on-call tech (then retries, then the backup), logs routine requests for the morning and emails a timestamped summary of every call. Coverage is after hours by default and 24/7 on request at the same rates.`;

const plans = [
  ...site.plans.map(
    (p) => `- ${p.name}: ${money(p.price)} a month for ${num(p.minutes)} minutes (about ${num(p.approxCalls)} calls), then ${rate(p.overagePerMinute)} a minute. ${p.blurb}`,
  ),
  `- Setup: ${money(site.setupFee.monthly)} on monthly plans, free on annual plans`,
  `- Billing: by the second, no rounding up. Spam, robocalls, wrong numbers and calls under ${site.billing.minBillableSeconds} seconds are not counted. Calls Mae makes to the on-call ladder are counted.`,
  `- Prices in ${site.currency}, checked ${site.pricesChecked}`,
].join('\n');

const limits = home.limits.items.map((l) => `- ${l.strong} ${plain(l.text)}`).join('\n');

const pages: { name: string; path: string; summary: string }[] = [
  { name: 'Home', path: routes.home, summary: plain(home.answer.text) },
  ...(builtPages.pricing ? [{ name: 'Pricing', path: routes.pricing, summary: plain(pricing.answer.text) }] : []),
  ...(builtPages.service ? [{ name: 'Emergency maintenance answering', path: routes.service, summary: plain(servicePage.answer.text) }] : []),
  ...segments.map((s) => ({ name: s.name, path: routes.segment(s.slug), summary: plain(s.answer) })),
  ...(builtPages.hub ? [{ name: 'Best property management answering services compared', path: routes.hub, summary: plain(hub.answer.text) }] : []),
  ...comparePages.map((c) => ({ name: c.h1, path: routes.compare(c.slug), summary: plain(c.answer) })),
  ...guides.map((g) => ({ name: g.h1, path: routes.guide(g.slug), summary: plain(g.answer) })),
  ...(builtPages.about ? [{ name: 'About', path: routes.about, summary: plain(about.answer.text) }] : []),
];

const contact = [
  `- Book a ${site.setupCallMinutes}-minute setup call: ${site.bookingUrl}`,
  `- Hear a sample call: ${site.demoPhone.display}`,
  `- Email: ${site.email}`,
  `- ${site.name} is a service of ${site.owner}, founded by ${site.founder}.`,
].join('\n');

const llms = `# ${site.name}

> ${description}

${site.tagline}

## Plans

${plans}

## What Mae won't do

${limits}

## Pages

${pages.map((p) => `- [${p.name}](${url(p.path)}): ${p.summary}`).join('\n')}

## Contact

${contact}

## Optional

- [Full text of every page](${url('/llms-full.txt')})
`;

const faqText = (faqs: Faq[]) => faqs.map((f) => `Q: ${plain(f.q)}\nA: ${plain(f.a)}`).join('\n\n');
const cards = (cs: Card[]) => cs.map((c) => `- ${plain(c.title)}: ${plain(c.text)}${(c.sources ?? []).map((k) => ` (Source: ${site.sources[k].label}, ${site.sources[k].url}, checked ${site.sources[k].checked})`).join('')}`).join('\n');

const sections: string[] = [];

sections.push(`## Home (${url('/')})

${home.hero.h1}

${plain(home.hero.sub)}

### ${home.answer.heading}
${plain(home.answer.text)}

### ${home.problem.heading}
${cards(home.problem.cards)}

### ${home.implication.heading}
${cards(home.implication.cards)}
${home.implication.note}

### ${home.needPayoff.heading}
${cards(home.needPayoff.items)}

### ${home.steps.heading}
${home.steps.items.map((s, i) => `${i + 1}. ${s.title}: ${plain(s.text)}`).join('\n')}

### ${home.calls.heading}
${cards(home.calls.cards)}

### ${home.limits.heading}
${limits}

### ${home.better.heading}
${cards(home.better.cards)}

### ${home.faqHeading}
${faqText(homeFaqs)}`);

if (builtPages.pricing) {
  sections.push(`## Pricing (${url(routes.pricing)})

${plain(pricing.sub)}

${plans}

### ${pricing.minute.heading}
${plain(pricing.minute.intro)}
${pricing.minute.items.map((i) => `- ${i.strong} ${plain(i.text)}`).join('\n')}

### ${pricing.why.heading}
${cards(pricing.why.cards)}

### ${pricing.compare.heading}
Published prices from each company's own website:
- ${site.name}: ${site.plans.map((p) => `${money(p.price)} for ${num(p.minutes)} minutes`).join('; ')}; billed by the second
${pricing.compare.ids
  .map((id) => getCompetitor(id))
  .map((c) => `- ${c.name} (${c.typeLabel}): ${tierSummary(c)}; billed by ${c.billedBy.toLowerCase()}; ${c.url}, checked ${c.checked}`)
  .join('\n')}

### ${pricing.faqHeading}
${faqText(pricingFaqs)}`);
}

if (builtPages.service) {
  const p = servicePage;
  sections.push(`## ${p.h1} (${url(routes.service)})

${plain(p.answer.text)}

### ${p.problem.heading}
${cards(p.problem.cards)}

### ${p.implication.heading}
${cards(p.implication.cards)}

### ${p.ladder.heading}
${p.ladder.steps.map((s, i) => `${i + 1}. ${s.title}: ${s.text}`).join('\n')}

### Questions
${faqText(p.faqs)}`);
}

for (const s of segments) {
  sections.push(`## ${s.h1} (${url(routes.segment(s.slug))})

${plain(s.intro)}

### ${s.answerHeading}
${plain(s.answer)}

### ${s.problemsHeading}
${cards(s.problems)}

### ${s.implicationsHeading}
${cards(s.implications)}

### ${s.callsHeading}
${cards(s.calls)}

${s.specifics.map((sp) => `### ${sp.heading}\n${plain(sp.intro)}\n${sp.items.map((i) => `- ${plain(i)}`).join('\n')}`).join('\n\n')}

### ${s.faqHeading}
${faqText(s.faqs)}`);
}

if (builtPages.hub) {
  sections.push(`## ${hub.h1} (${url(routes.hub)})

${hub.disclosure}

${plain(hub.answer.text)}

### ${hub.criteriaHeading}
${cards(hub.criteria)}

### Competitors (from their own websites)
${competitors.map((c) => `- ${c.name}: ${c.typeLabel}. ${tierSummary(c)}. ${c.facts.join('. ')}. ${c.url}, checked ${c.checked}`).join('\n')}`);
}

for (const c of comparePages) {
  const comp = getCompetitor(c.competitorId);
  sections.push(`## ${c.h1} (${url(routes.compare(c.slug))})

${plain(c.answer)}

| | ${site.name} | ${comp.name} |
|---|---|---|
${c.rows.map((r) => `| ${r.label} | ${fill(r.mae)} | ${fill(r.them)} |`).join('\n')}

${fill(c.sourceNote)} ${comp.url}

### ${comp.short} is the better choice if
${c.theyBetter.map((t) => `- ${fill(t)}`).join('\n')}

### ${site.name} is the better choice if
${c.maeBetter.map((t) => `- ${fill(t)}`).join('\n')}

### ${fill(c.costHeading)}
${fill(c.cost)}

### Questions
${faqText(c.faqs)}`);
}

for (const g of guides) {
  const e = emergencyGuide;
  sections.push(`## ${g.h1} (${url(routes.guide(g.slug))})

By ${site.founder}. ${plain(g.answer)}

### ${e.why.heading}
${e.why.paragraphs.map(plain).join('\n\n')}

### ${e.list.heading}
${e.list.rows.map((r) => `- ${r.problem}: ${r.verdict}. ${r.rule}`).join('\n')}
${e.list.note}

### ${e.timelines.heading}
${e.timelines.items.map((t) => `- ${t.place}: ${plain(t.text)} (Source: ${site.sources[t.source].url}, checked ${site.sources[t.source].checked})`).join('\n')}
${e.timelines.note}

### ${e.faqHeading}
${faqText(e.faqs)}`);
}

if (builtPages.about) {
  sections.push(`## About (${url(routes.about)})

${plain(about.answer.text)}

${about.sections.map((s) => `### ${s.heading}\n${s.text.map(plain).join('\n\n')}`).join('\n\n')}`);
}

const full = `${llms}
---

# Full text

${sections.join('\n\n')}
`;

writeFileSync('public/llms.txt', llms);
writeFileSync('public/llms-full.txt', full);
console.log(`llms: wrote public/llms.txt (${llms.length} chars) and public/llms-full.txt (${full.length} chars)`);
