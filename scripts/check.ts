/**
 * Site checks. `npm run check` runs everything against out/ (build first).
 * `tsx scripts/check.ts --source` runs only the source checks (used in prebuild).
 *
 * Fails on (numbers match docs/BUILD_MAEDAY_SITE.md "scripts/check.ts"):
 *  1. Any [[PLACEHOLDER]] in built HTML unless ALLOW_PLACEHOLDERS=1
 *  2. Em dash, "!" in visible copy, banned words, UK spellings, "Ltd"/"Limited" after Antek Automation,
 *     VAT or sales tax; "24/7" not written as "24/7 on request"
 *  3. Any $ figure or minute figure not in config, derived from config, or in competitors.ts
 *  4. A tel: link to any number other than the configured demo line; a phone number in copy that is not a 555 number
 *  5. JSON-LD that does not parse; FAQPage text that differs from the visible FAQ; any Review or AggregateRating
 *  6. An AnswerBlock outside 40 to 60 words, or an indexable page without one
 *  7. A compare page without a "better choice if" entry for the competitor; a competitor without url and checked
 *  8. A claim gated by a false flag (Spanish, text alerts, tour booking, human fallback, vendor dispatch,
 *     integration names outside compare pages). Elements marked data-gate-ok (limits, "not yet" answers,
 *     competitor facts) are skipped.
 *  9. Broken internal links; missing title, description or canonical; not exactly one H1; no "Last updated";
 *     an example call log without its "invented" label
 * Warnings (do not fail): titles over 60 characters, descriptions over 155.
 */
import './load-env';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { site } from '../src/site.config';
import { allowedMinutes, allowedPrices } from '../src/lib/format';
import { competitors } from '../src/content/competitors';
import { comparePages } from '../src/content/compare';

const SOURCE_ONLY = process.argv.includes('--source');
const ALLOW_PLACEHOLDERS = process.env.ALLOW_PLACEHOLDERS === '1';
const OUT = 'out';
/** [[KEY]] or [[KEY: suggested text]]. Upper-case key, so Next's inline [["..."]] data never matches. */
const PLACEHOLDER = /\[\[[A-Z][A-Z0-9_]*(?::[^\]]*)?\]\]/g;

const errors: string[] = [];
const warnings: string[] = [];
const fail = (file: string, msg: string) => errors.push(`${file}: ${msg}`);
const warn = (file: string, msg: string) => warnings.push(`${file}: ${msg}`);

const BANNED = [
  'leverage',
  'revolutionize',
  'seamless',
  'seamlessly',
  'solution',
  'solutions',
  'cutting-edge',
  'game-changer',
  'game changer',
  'AI-powered',
  'omnichannel',
  'unlock',
  'supercharge',
  'robust',
];
const UK = [
  'colour',
  'favour',
  'organise',
  'organisation',
  'centre',
  'licence',
  'behaviour',
  'analyse',
  'cancelled',
  'cancelling',
  'enquiry',
  'enquiries',
  'programme',
  'specialise',
  'optimise',
  'personalise',
  'neighbour',
  'neighbours',
  'recognise',
  'summarise',
  'prioritise',
  'labelled',
  'travelling',
];
const FORBIDDEN = [/Antek Automation,? (Ltd|Limited)/i, /\bVAT\b/, /sales tax/i];

/** Claims behind a false flag. Applied to visible text minus data-gate-ok elements. */
const GATED: { flag: keyof typeof site.flags; re: RegExp; skipComparePages?: boolean }[] = [
  { flag: 'spanish', re: /\bSpanish\b|\bbilingual\b/i },
  { flag: 'sms', re: /\b(SMS|text alerts?|text messages?|texts? (?:to|the|your)|by text|via text|text confirmations?)\b/i },
  { flag: 'tourBooking', re: /\b(?:books?|booking|schedules?|scheduling) (?:a |the )?(?:tours?|showings?)\b|\b(?:tour|showing) calendar\b/i },
  { flag: 'humanFallback', re: /\b(?:human (?:fallback|backup|takeover)|live (?:person|agent|operator|receptionist)s?|transfers? to a (?:person|human))\b/i },
  { flag: 'vendorDispatch', re: /\bvendor dispatch\b|\bdispatch(?:es)? (?:your |a |outside )?vendors?\b/i },
  { flag: 'ownerReport', re: /\bmonthly owner reports?\b/i },
  { flag: 'softwareIntegration', re: /\b(AppFolio|Buildium|Yardi|Rent Manager|Rentvine|Entrata)\b/, skipComparePages: true },
];

function walk(dir: string, exts: string[]): string[] {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) return walk(p, exts);
    return exts.some((e) => p.endsWith(e)) ? [p] : [];
  });
}

function wordCheck(file: string, text: string) {
  if (text.includes('—')) fail(file, 'contains an em dash (U+2014)');
  for (const w of BANNED) {
    const re = new RegExp(`(^|[^\\w-])${w.replace(/[-]/g, '[-\\s]?')}($|[^\\w-])`, 'i');
    if (re.test(text)) fail(file, `banned word "${w}"`);
  }
  for (const w of UK) if (new RegExp(`\\b${w}\\b`, 'i').test(text)) fail(file, `UK spelling "${w}"`);
  for (const re of FORBIDDEN) if (re.test(text)) fail(file, `forbidden phrase ${re}`);
}

// ---------- source checks ----------
for (const file of walk('src', ['.ts', '.tsx'])) {
  const text = readFileSync(file, 'utf8');
  // Strip comment lines so instructions to developers can mention the rules.
  wordCheck(file, text.replace(/^\s*(\/\/|\*|\/\*).*$/gm, ''));
}
for (const c of competitors) {
  if (!c.url?.startsWith('https://')) fail('src/content/competitors.ts', `${c.id} has no url`);
  if (!c.checked) fail('src/content/competitors.ts', `${c.id} has no checked date`);
}
for (const p of comparePages) {
  if (!p.theyBetter?.length) fail('src/content/compare.ts', `${p.slug} has no "better choice if" entry for the competitor`);
  if (!p.maeBetter?.length) fail('src/content/compare.ts', `${p.slug} has no "MaeDay is the better choice if" entry`);
  if (!competitors.some((c) => c.id === p.competitorId)) fail('src/content/compare.ts', `${p.slug} names unknown competitor ${p.competitorId}`);
}
for (const [k, s] of Object.entries(site.sources)) {
  if (!s.url.startsWith('https://') || !s.checked) fail('src/site.config.ts', `source ${k} needs a url and a checked date`);
}

// ---------- built checks ----------
const decode = (s: string) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;|&#160;/g, ' ')
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(+d));
const norm = (s: string) => decode(s.replace(/<!-- -->/g, '').replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();

function visibleText(html: string): string {
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1] ?? '';
  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '';
  const body = html
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<head>[\s\S]*?<\/head>/, ' ');
  return norm(`${title} \n ${desc} \n ${body.replace(/<[^>]+>/g, ' \n ')}`);
}

/** Removes elements marked data-gate-ok (their own tag must not nest inside them). */
const stripGateOk = (html: string) => html.replace(/<(\w+)\b[^>]*\bdata-gate-ok\b[^>]*>[\s\S]*?<\/\1>/g, ' ');

const prices = allowedPrices();
const minutes = allowedMinutes();

function figureCheck(file: string, text: string) {
  for (const m of text.matchAll(/\$\s?(\d+(?:,\d{3})*(?:\.\d+)?)/g)) {
    const n = Number(m[1].replace(/,/g, ''));
    if (!prices.has(n)) fail(file, `price "${m[0]}" is not a config or competitor value`);
  }
  for (const m of text.matchAll(/(\d+(?:,\d{3})*(?:\.\d+)?)(?:\s*(?:to|and)\s*(\d+(?:,\d{3})*(?:\.\d+)?))?[\s-]*(?:call\s+)?(?:min\b|minutes?\b|minute\b)/gi)) {
    for (const g of [m[1], m[2]].filter(Boolean)) {
      if (!minutes.has(Number(g.replace(/,/g, '')))) fail(file, `minute figure "${m[0]}" is not a config or competitor value`);
    }
  }
  for (const m of text.matchAll(/(?:\(\d{3}\)\s?|\b\d{3}[-. ])?\b(\d{3})[-.](\d{4})\b/g)) {
    if (m[1] !== '555' && !site.demoPhone.display.includes(m[0])) fail(file, `phone number "${m[0]}" is not a 555 number or the demo line`);
  }
}

function claimCheck(file: string, html: string, isCompare: boolean) {
  const text = visibleText(stripGateOk(html));
  for (const g of GATED) {
    if (site.flags[g.flag]) continue;
    if (g.skipComparePages && isCompare) continue;
    const m = text.match(g.re);
    if (m) {
      const at = m.index ?? 0;
      fail(file, `claim behind flags.${g.flag}=false: "...${text.slice(Math.max(0, at - 50), at + m[0].length + 20)}..."`);
    }
  }
  for (const m of text.matchAll(/24\/7(?! on request)/g)) {
    const at = m.index ?? 0;
    fail(file, `"24/7" must read "24/7 on request": "...${text.slice(Math.max(0, at - 40), at + 30)}..."`);
  }
}

function jsonLdCheck(file: string, html: string) {
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  const faqLd: { q: string; a: string }[] = [];
  for (const raw of blocks) {
    if (/"@type":"(Review|AggregateRating)"/.test(raw)) fail(file, 'JSON-LD contains Review or AggregateRating');
    let data: { '@type'?: string; mainEntity?: { name: string; acceptedAnswer: { text: string } }[] };
    try {
      data = JSON.parse(raw);
    } catch (e) {
      fail(file, `JSON-LD does not parse: ${(e as Error).message}`);
      continue;
    }
    if (data['@type'] === 'FAQPage') {
      for (const q of data.mainEntity ?? []) faqLd.push({ q: q.name.trim(), a: q.acceptedAnswer.text.trim() });
    }
  }
  const qs = [...html.matchAll(/<span data-faq-q="true">([\s\S]*?)<\/span>/g)].map((m) => norm(m[1]));
  const as = [...html.matchAll(/<div[^>]*data-faq-a="true"[^>]*>([\s\S]*?)<\/div>/g)].map((m) => norm(m[1]));
  if (qs.length !== faqLd.length) {
    fail(file, `visible FAQ has ${qs.length} questions, FAQPage JSON-LD has ${faqLd.length}`);
    return;
  }
  faqLd.forEach((f, i) => {
    if (f.q !== qs[i]) fail(file, `FAQ question ${i + 1} differs from JSON-LD:\n    visible: ${qs[i]}\n    json-ld: ${f.q}`);
    if (f.a !== as[i]) fail(file, `FAQ answer ${i + 1} differs from JSON-LD:\n    visible: ${as[i]}\n    json-ld: ${f.a}`);
  });
}

function linkCheck(file: string, html: string) {
  for (const m of html.matchAll(/href="(\/[^"]*)"/g)) {
    const href = decode(m[1]);
    if (href.startsWith('//') || href.startsWith('/_next/')) continue;
    const path = href.split(/[?#]/)[0];
    const target = path.endsWith('/') ? join(OUT, path, 'index.html') : join(OUT, path);
    if (!existsSync(target) && !existsSync(`${target}.html`)) fail(file, `broken internal link ${href}`);
  }
  for (const m of html.matchAll(/href="tel:([^"]*)"/g)) {
    if (decode(m[1]) !== site.demoPhone.tel) fail(file, `tel: link to ${m[1]}, not the configured demo line`);
  }
}

function indexable(html: string) {
  return !/<meta name="robots" content="[^"]*noindex/.test(html);
}

function metaCheck(file: string, html: string) {
  const h1s = html.match(/<h1[\s>]/g)?.length ?? 0;
  if (h1s !== 1) fail(file, `has ${h1s} <h1> elements, expected 1`);
  if (!indexable(html)) return;
  const title = norm(html.match(/<title>(.*?)<\/title>/s)?.[1] ?? '');
  const desc = decode(html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '');
  if (!title) fail(file, 'missing <title>');
  else if (title.length > 60) warn(file, `title is ${title.length} chars (target under 60): ${title}`);
  if (!desc) fail(file, 'missing meta description');
  else if (desc.length > 155) warn(file, `description is ${desc.length} chars (target under 155)`);
  if (!html.includes('rel="canonical"')) fail(file, 'missing canonical link');
  if (!html.includes('data-updated')) fail(file, 'no "Last updated" date');
  const answers = [...html.matchAll(/<p[^>]*data-answer-text="true"[^>]*>([\s\S]*?)<\/p>/g)].map((m) => norm(m[1]));
  if (!answers.length) fail(file, 'indexable page without an AnswerBlock');
  for (const a of answers) {
    const words = a.split(/\s+/).filter(Boolean).length;
    if (words < 40 || words > 60) fail(file, `AnswerBlock is ${words} words (40 to 60): ${a}`);
  }
}

function logCheck(file: string, html: string) {
  for (const m of html.matchAll(/<div[^>]*data-call-log="true"[^>]*>([\s\S]*?)data-call-log-end/g)) {
    if (!/invented/i.test(norm(m[1]))) fail(file, 'example call log without the "Names and numbers are invented" label');
  }
}

function compareCheck(file: string, html: string) {
  if (!/data-better="them"/.test(html)) fail(file, 'compare page without a "[Name] is the better choice if" box');
  if (!/data-better="mae"/.test(html)) fail(file, 'compare page without a "MaeDay is the better choice if" box');
}

if (!SOURCE_ONLY) {
  const pages = walk(OUT, ['.html']);
  if (pages.length === 0) {
    console.error('check: no HTML in out/. Run `npm run build` first.');
    process.exit(1);
  }
  const placeholders = new Map<string, Set<string>>();
  for (const abs of pages) {
    const file = relative('.', abs);
    const html = readFileSync(abs, 'utf8');
    const route = file.replace(/^out\//, '/').replace(/index\.html$/, '');
    const isCompare = route.startsWith('/compare/') || route.startsWith('/best-');
    for (const m of html.matchAll(PLACEHOLDER)) {
      const key = m[0].split(':')[0].replace(/\]\]$/, '') + ']]';
      if (!placeholders.has(key)) placeholders.set(key, new Set());
      placeholders.get(key)!.add(route);
    }
    const text = visibleText(html);
    wordCheck(file, text);
    if (/!/.test(text.replace(PLACEHOLDER, ''))) {
      const at = text.indexOf('!');
      fail(file, `exclamation mark in visible copy: "...${text.slice(Math.max(0, at - 40), at + 1)}"`);
    }
    figureCheck(file, text.replace(PLACEHOLDER, ''));
    claimCheck(file, html, isCompare);
    jsonLdCheck(file, html);
    linkCheck(file, html);
    logCheck(file, html);
    if (route.startsWith('/compare/')) compareCheck(file, html);
    if (!file.endsWith('404.html') && !file.includes('_not-found')) metaCheck(file, html);
  }
  if (placeholders.size) {
    const list = [...placeholders].map(([k, files]) => `  ${k}  (${files.size} page${files.size > 1 ? 's' : ''})`).join('\n');
    if (ALLOW_PLACEHOLDERS) warnings.push(`placeholders left in built HTML (allowed by ALLOW_PLACEHOLDERS=1):\n${list}`);
    else errors.push(`placeholders left in built HTML (set ALLOW_PLACEHOLDERS=1 for preview builds):\n${list}`);
  }
  console.log(`check: scanned ${pages.length} pages`);
}

for (const w of warnings) console.warn(`warn  ${w}`);
for (const e of errors) console.error(`FAIL  ${e}`);
if (errors.length) {
  console.error(`\ncheck: ${errors.length} problem(s)`);
  process.exit(1);
}
console.log(`check: ${SOURCE_ONLY ? 'source' : 'source + built'} checks passed${warnings.length ? ` with ${warnings.length} warning(s)` : ''}`);
