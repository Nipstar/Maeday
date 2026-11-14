// Runs Lighthouse (mobile, default throttling) against a static server on out/ for every page in the sitemap
// (or the paths given as arguments) and prints the four category scores. Fails under 95 in any category.
// Single runs vary by a few points on shared machines, so a page that misses is run twice more and judged
// on the median of three runs (Lighthouse's own advice for variability).
// Usage: node scripts/lighthouse.mjs [/path/ ...]   (build first; serves out/ on port 4173)
import { spawn, execFileSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const PORT = 4173;
const CHROME = process.env.CHROME_PATH || '/opt/pw-browsers/chromium';
const base = `http://localhost:${PORT}`;
let paths = process.argv.slice(2);
if (!paths.length) {
  const sm = existsSync('out/sitemap.xml') ? readFileSync('out/sitemap.xml', 'utf8') : '';
  paths = [...sm.matchAll(/<loc>https?:\/\/[^/]+(\/[^<]*)<\/loc>/g)].map((m) => m[1]);
  if (!paths.length) paths = ['/'];
}
const server = spawn('npx', ['serve', 'out', '-l', String(PORT), '--no-clipboard'], { stdio: 'ignore' });
await new Promise((r) => setTimeout(r, 2500));
mkdirSync('.lighthouse', { recursive: true });
const rows = [];
let failed = false;
try {
  const once = (p, n) => {
    const out = `.lighthouse/${p.replace(/\//g, '_') || 'home'}${n ? `.${n}` : ''}.json`;
    execFileSync('npx', ['lighthouse', `${base}${p}`, '--quiet', '--output=json', `--output-path=${out}`, `--chrome-path=${CHROME}`,
      '--chrome-flags=--headless=new --no-sandbox', '--only-categories=performance,accessibility,best-practices,seo'], { stdio: 'ignore' });
    const r = JSON.parse(readFileSync(out, 'utf8'));
    return {
      scores: Object.fromEntries(Object.entries(r.categories).map(([k, v]) => [k, Math.round(v.score * 100)])),
      lcp: r.audits['largest-contentful-paint'].numericValue,
      cls: r.audits['cumulative-layout-shift'].numericValue,
    };
  };
  const median = (xs) => [...xs].sort((a, b) => a - b)[Math.floor(xs.length / 2)];
  for (const p of paths) {
    const runs = [once(p, 0)];
    if (Object.values(runs[0].scores).some((v) => v < 95)) runs.push(once(p, 1), once(p, 2));
    const s = Object.fromEntries(Object.keys(runs[0].scores).map((k) => [k, median(runs.map((r) => r.scores[k]))]));
    rows.push({ path: p, ...s, lcp: `${(median(runs.map((r) => r.lcp)) / 1000).toFixed(1)} s`, cls: median(runs.map((r) => r.cls)).toFixed(3), runs: runs.length });
    if (Object.values(s).some((v) => v < 95)) failed = true;
  }
} finally {
  server.kill();
}
console.table(rows);
writeFileSync('.lighthouse/summary.json', JSON.stringify(rows, null, 2));
if (failed) {
  console.error('lighthouse: a category scored under 95');
  process.exit(1);
}
