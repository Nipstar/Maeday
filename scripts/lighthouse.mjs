// Runs Lighthouse (mobile, default throttling) against a static server on out/ for every page in the sitemap
// (or the paths given as arguments) and prints the four category scores. Fails under 95 in any category.
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
  for (const p of paths) {
    const out = `.lighthouse/${p.replace(/\//g, '_') || 'home'}.json`;
    execFileSync('npx', ['lighthouse', `${base}${p}`, '--quiet', '--output=json', `--output-path=${out}`, `--chrome-path=${CHROME}`,
      '--chrome-flags=--headless=new --no-sandbox', '--only-categories=performance,accessibility,best-practices,seo'], { stdio: 'ignore' });
    const r = JSON.parse(readFileSync(out, 'utf8'));
    const s = Object.fromEntries(Object.entries(r.categories).map(([k, v]) => [k, Math.round(v.score * 100)]));
    const lcp = r.audits['largest-contentful-paint'].displayValue;
    const cls = r.audits['cumulative-layout-shift'].displayValue;
    rows.push({ path: p, ...s, lcp, cls });
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
