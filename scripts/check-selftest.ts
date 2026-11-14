/**
 * Proves scripts/check.ts fails on each rule: copies out/ to a temp dir, breaks one thing at a time,
 * runs the check against it and expects a failure with the right message. Build first.
 *   npx tsx scripts/check-selftest.ts
 */
import { cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

type Case = { name: string; file: string; edit: (html: string) => string; expect: RegExp };

const sub = (a: string | RegExp, b: string) => (h: string) => {
  const next = h.replace(a, b);
  if (next === h) throw new Error(`self-test edit did not apply: ${a}`);
  return next;
};

const cases: Case[] = [
  { name: '1. placeholder without ALLOW_PLACEHOLDERS', file: 'index.html', edit: sub('<h1', '<p>[[TEST_PLACEHOLDER]]</p><h1'), expect: /placeholders left in built HTML/ },
  { name: '2. em dash', file: 'index.html', edit: sub('reaches your on-call tech.</h1>', 'reaches your on-call tech — fast.</h1>'), expect: /em dash/ },
  { name: '2. exclamation mark', file: 'index.html', edit: sub('reaches your on-call tech.</h1>', 'reaches your on-call tech!</h1>'), expect: /exclamation mark/ },
  { name: '2. banned word', file: 'index.html', edit: sub('reaches your on-call tech.</h1>', 'a seamless way to reach your tech.</h1>'), expect: /banned word "seamless"/ },
  { name: '2. UK spelling', file: 'index.html', edit: sub('reaches your on-call tech.</h1>', 'reaches your on-call tech, colour coded.</h1>'), expect: /UK spelling/ },
  { name: '2. Ltd', file: 'index.html', edit: sub('reaches your on-call tech.</h1>', 'from Antek Automation Ltd.</h1>'), expect: /forbidden phrase/ },
  { name: '2. 24/7 without "on request"', file: 'index.html', edit: sub('reaches your on-call tech.</h1>', 'answers 24/7.</h1>'), expect: /24\/7 on request/ },
  { name: '3. price not in config', file: 'index.html', edit: sub('reaches your on-call tech.</h1>', 'from $149 a month.</h1>'), expect: /price "\$149"/ },
  { name: '3. minute figure not in config', file: 'index.html', edit: sub('reaches your on-call tech.</h1>', 'with 600 minutes.</h1>'), expect: /minute figure/ },
  { name: '4. tel: to another number', file: 'index.html', edit: sub(/href="tel:[^"]*"/, 'href="tel:+12125550000"'), expect: /not the configured demo line/ },
  { name: '4. real-looking phone number', file: 'index.html', edit: sub('reaches your on-call tech.</h1>', 'call 212-867-5309.</h1>'), expect: /not a 555 number/ },
  { name: '5. JSON-LD does not parse', file: 'index.html', edit: sub('<script type="application/ld+json">', '<script type="application/ld+json">{'), expect: /JSON-LD does not parse/ },
  { name: '5. FAQ differs from JSON-LD', file: 'index.html', edit: sub('<span data-faq-q="true">What counts as an emergency?', '<span data-faq-q="true">What counts as a real emergency?'), expect: /FAQ question 1 differs/ },
  { name: '5. Review schema', file: 'index.html', edit: sub('"@type":"WebSite"', '"@type":"WebSite","review":{"@type":"Review"}'), expect: /Review or AggregateRating/ },
  { name: '6. AnswerBlock too short', file: 'pricing/index.html', edit: sub(/(data-answer-text="true"[^>]*>)[\s\S]*?<\/p>/, '$1Too short.</p>'), expect: /AnswerBlock is \d+ words/ },
  { name: '7. compare page without "better choice if" for them', file: 'compare/smith-ai/index.html', edit: sub('data-better="them"', 'data-better="x"'), expect: /better choice if/ },
  { name: '8. claim behind a false flag (Spanish)', file: 'index.html', edit: sub('reaches your on-call tech.</h1>', 'answers in Spanish.</h1>'), expect: /flags\.spanish=false/ },
  { name: '8. integration name outside compare pages', file: 'index.html', edit: sub('reaches your on-call tech.</h1>', 'syncs with AppFolio.</h1>'), expect: /flags\.softwareIntegration=false/ },
  { name: '8. text alerts claimed', file: 'index.html', edit: sub('reaches your on-call tech.</h1>', 'sends text alerts.</h1>'), expect: /flags\.sms=false/ },
  { name: '9. broken internal link', file: 'index.html', edit: sub('<h1', '<a href="/no-such-page/">x</a><h1'), expect: /broken internal link/ },
  { name: '9. two h1s', file: 'index.html', edit: sub('<h1', '<h1>Extra</h1><h1'), expect: /2 <h1> elements/ },
  { name: '9. missing canonical', file: 'index.html', edit: sub('rel="canonical"', 'rel="x"'), expect: /missing canonical/ },
  { name: '9. call log without the invented label', file: 'index.html', edit: sub('Example call. Names and numbers are invented.', 'Tonight.'), expect: /invented/ },
];

let failed = 0;
for (const c of cases) {
  const dir = mkdtempSync(join(tmpdir(), 'maeday-check-'));
  try {
    cpSync('out', dir, { recursive: true });
    const path = join(dir, c.file);
    writeFileSync(path, c.edit(readFileSync(path, 'utf8')));
    const env = { ...process.env, CHECK_OUT: dir, ALLOW_PLACEHOLDERS: c.name.startsWith('1.') ? '0' : '1' };
    const r = spawnSync('npx', ['tsx', 'scripts/check.ts'], { env, encoding: 'utf8' });
    const out = `${r.stdout}\n${r.stderr}`;
    const ok = r.status !== 0 && c.expect.test(out);
    if (!ok) failed++;
    console.log(`${ok ? 'ok  ' : 'MISS'}  ${c.name}`);
    if (!ok) console.log(out.split('\n').filter((l) => l.startsWith('FAIL')).slice(0, 5).join('\n'));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}
console.log(`\ncheck self-test: ${cases.length - failed}/${cases.length} rules caught`);
if (failed) process.exit(1);
