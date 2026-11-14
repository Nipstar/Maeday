/**
 * Structural JSON-LD validation for the built pages: every block parses, has @context schema.org and a
 * known @type, and carries the properties Google's structured-data docs require for that type.
 * Used by scripts/check.ts (failures) and runnable on its own for a report: npx tsx scripts/schema-validate.ts
 */
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

type Node = Record<string, unknown>;
const isObj = (x: unknown): x is Node => typeof x === 'object' && x !== null && !Array.isArray(x);
const arr = (x: unknown): unknown[] => (Array.isArray(x) ? x : x === undefined ? [] : [x]);
const str = (x: unknown) => typeof x === 'string' && x.trim().length > 0;
const url = (x: unknown) => typeof x === 'string' && /^https?:\/\//.test(x);

const KNOWN = new Set(['Organization', 'WebSite', 'WebPage', 'Service', 'Product', 'Offer', 'FAQPage', 'BreadcrumbList', 'Article', 'AboutPage']);

function need(errs: string[], cond: boolean, msg: string) {
  if (!cond) errs.push(msg);
}

function offer(o: unknown, errs: string[], where: string) {
  need(errs, isObj(o), `${where}: offer is not an object`);
  if (!isObj(o)) return;
  need(errs, o['@type'] === 'Offer', `${where}: offer @type must be Offer`);
  need(errs, typeof o.price === 'number', `${where}: offer.price must be a number`);
  need(errs, o.priceCurrency === 'USD', `${where}: offer.priceCurrency must be USD`);
  for (const ps of arr(o.priceSpecification)) {
    need(errs, isObj(ps) && ps['@type'] === 'UnitPriceSpecification' && typeof ps.price === 'number' && str(ps.priceCurrency), `${where}: bad UnitPriceSpecification`);
  }
}

export function validateBlock(d: unknown): string[] {
  const errs: string[] = [];
  if (!isObj(d)) return ['block is not an object'];
  need(errs, d['@context'] === 'https://schema.org', '@context must be https://schema.org');
  const t = String(d['@type']);
  need(errs, KNOWN.has(t), `unexpected @type ${t}`);
  const raw = JSON.stringify(d);
  need(errs, !/"@type":"(Review|AggregateRating)"/.test(raw), 'contains Review or AggregateRating');
  switch (t) {
    case 'Organization':
      need(errs, str(d.name) && url(d.url) && url(d.logo), 'Organization needs name, url, logo');
      need(errs, isObj(d.parentOrganization) && str(d.parentOrganization.name), 'Organization needs parentOrganization');
      need(errs, isObj(d.founder) && str(d.founder.name), 'Organization needs founder');
      break;
    case 'WebSite':
      need(errs, str(d.name) && url(d.url), 'WebSite needs name and url');
      break;
    case 'WebPage':
    case 'AboutPage':
      need(errs, url(d.url), `${t} needs url`);
      if (d.speakable) need(errs, isObj(d.speakable) && arr(d.speakable.cssSelector).length > 0, 'speakable needs cssSelector');
      break;
    case 'Service':
      need(errs, str(d.name) && str(d.description) && url(d.url), 'Service needs name, description, url');
      need(errs, isObj(d.provider), 'Service needs provider');
      arr(d.offers).forEach((o, i) => offer(o, errs, `Service.offers[${i}]`));
      break;
    case 'Product':
      need(errs, str(d.name) && str(d.description), 'Product needs name and description');
      need(errs, arr(d.offers).length > 0, 'Product needs offers');
      arr(d.offers).forEach((o, i) => offer(o, errs, `Product.offers[${i}]`));
      break;
    case 'FAQPage': {
      const qs = arr(d.mainEntity);
      need(errs, qs.length > 0, 'FAQPage needs mainEntity');
      qs.forEach((q, i) => {
        need(errs, isObj(q) && q['@type'] === 'Question' && str(q.name), `FAQPage question ${i + 1} needs @type Question and name`);
        const a = isObj(q) ? q.acceptedAnswer : undefined;
        need(errs, isObj(a) && a['@type'] === 'Answer' && str(a.text), `FAQPage question ${i + 1} needs acceptedAnswer.text`);
      });
      break;
    }
    case 'BreadcrumbList': {
      const items = arr(d.itemListElement);
      need(errs, items.length >= 2, 'BreadcrumbList needs at least 2 items');
      items.forEach((it, i) => {
        need(errs, isObj(it) && it.position === i + 1 && str(it.name) && url(it.item), `BreadcrumbList item ${i + 1} needs position, name, item URL`);
      });
      break;
    }
    case 'Article':
      need(errs, str(d.headline) && String(d.headline).length <= 110, 'Article needs a headline under 110 characters');
      need(errs, isObj(d.author) && str(d.author.name), 'Article needs author.name');
      need(errs, /^\d{4}-\d{2}-\d{2}/.test(String(d.datePublished)) && /^\d{4}-\d{2}-\d{2}/.test(String(d.dateModified)), 'Article needs ISO datePublished and dateModified');
      break;
  }
  return errs;
}

export function blocksOf(html: string): string[] {
  return [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
}

function walk(dir: string): string[] {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') ? [p] : [];
  });
}

if (process.argv[1]?.endsWith('schema-validate.ts')) {
  let bad = 0;
  for (const f of walk('out').sort()) {
    const types: string[] = [];
    const errs: string[] = [];
    for (const raw of blocksOf(readFileSync(f, 'utf8'))) {
      try {
        const d = JSON.parse(raw);
        types.push(String(d['@type']));
        errs.push(...validateBlock(d));
      } catch (e) {
        errs.push(`does not parse: ${(e as Error).message}`);
      }
    }
    bad += errs.length;
    console.log(`${errs.length ? 'FAIL' : 'ok  '}  ${relative('out', f).padEnd(60)} ${types.join(', ')}${errs.length ? `\n      ${errs.join('\n      ')}` : ''}`);
  }
  if (bad) process.exit(1);
}
