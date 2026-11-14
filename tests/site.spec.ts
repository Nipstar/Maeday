import { readFileSync } from 'node:fs';
import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/** Every page in the sitemap, plus the noindex pages and a 404. */
const sitemap = readFileSync('out/sitemap.xml', 'utf8');
const indexed = [...sitemap.matchAll(/<loc>https?:\/\/[^/]+(\/[^<]*)<\/loc>/g)].map((m) => m[1]);
const pages = [...indexed, '/thank-you/', '/privacy/', '/terms/'];

const env = readFileSync('.env.example', 'utf8');
const demoTel = env.match(/NEXT_PUBLIC_DEMO_PHONE_E164=(.*)/)?.[1]?.trim();
const builtWithTestEnv = readFileSync('out/index.html', 'utf8').includes(`tel:${demoTel}`);

for (const path of pages) {
  test.describe(path, () => {
    test('no horizontal scroll', async ({ page }) => {
      await page.goto(path);
      const [sw, cw] = await page.evaluate(() => [document.documentElement.scrollWidth, document.documentElement.clientWidth]);
      expect(sw).toBeLessThanOrEqual(cw);
    });

    test('axe: no violations', async ({ page }) => {
      await page.goto(path);
      const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
      expect(results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`)).toEqual([]);
    });

    test('tel: links only go to the demo line', async ({ page }) => {
      await page.goto(path);
      const tels = await page.$$eval('a[href^="tel:"]', (as) => as.map((a) => a.getAttribute('href')));
      const expected = builtWithTestEnv ? `tel:${demoTel}` : 'tel:[[DEMO_PHONE_E164]]';
      for (const t of tels) expect(t).toBe(expected);
    });

    test('FAQ JSON-LD equals the visible FAQ', async ({ page }) => {
      await page.goto(path);
      const { visible, ld } = await page.evaluate(() => {
        const norm = (s: string | null) => (s ?? '').replace(/\s+/g, ' ').trim();
        const visible = [...document.querySelectorAll('[data-faq] details')].map((d) => ({
          q: norm(d.querySelector('[data-faq-q]')!.textContent),
          a: norm(d.querySelector('[data-faq-a]')!.textContent),
        }));
        const ld = [...document.querySelectorAll('script[type="application/ld+json"]')]
          .map((s) => JSON.parse(s.textContent!))
          .filter((d) => d['@type'] === 'FAQPage')
          .flatMap((d) => d.mainEntity.map((q: { name: string; acceptedAnswer: { text: string } }) => ({ q: norm(q.name), a: norm(q.acceptedAnswer.text) })));
        return { visible, ld };
      });
      expect(ld).toEqual(visible);
    });
  });
}

test('sticky CTA appears only after the hero leaves view (mobile)', async ({ page }, info) => {
  test.skip(info.project.name !== 'mobile-375', 'mobile only');
  for (const path of ['/', '/pricing/', '/apartments/']) {
    await page.goto(path);
    const bar = page.locator('[data-sticky-cta]');
    await expect(bar).toHaveAttribute('data-visible', 'false');
    await page.evaluate(() => {
      const hero = document.querySelector('[data-hero]')!;
      window.scrollTo(0, hero.getBoundingClientRect().bottom + window.scrollY + 50);
    });
    await expect(bar).toHaveAttribute('data-visible', 'true');
    await expect(bar).toBeInViewport();
  }
});

test('sticky CTA is not shown on desktop', async ({ page }, info) => {
  test.skip(info.project.name !== 'desktop-1280', 'desktop only');
  await page.goto('/');
  await page.evaluate(() => window.scrollTo(0, 3000));
  await expect(page.locator('[data-sticky-cta]')).toBeHidden();
});

test('booking modal loads only on click, with UTMs', async ({ page }) => {
  test.skip(!builtWithTestEnv, 'needs a build with .env.example values (a real booking URL)');
  await page.route(/example\.com|msgsndr\.com/, (r) => r.fulfill({ status: 200, contentType: 'text/html', body: '<p>calendar</p>' }));
  await page.goto('/pricing/?utm_source=test&utm_campaign=qa');
  expect(await page.locator('iframe[data-booking-iframe]').count()).toBe(0);
  expect(await page.locator('script[src*="form_embed.js"]').count()).toBe(0);
  await page.locator('main a[data-cta="book"]').first().click();
  const iframe = page.locator('iframe[data-booking-iframe]');
  await expect(iframe).toHaveCount(1);
  const src = (await iframe.getAttribute('src'))!;
  expect(src).toContain('utm_source=test');
  expect(src).toContain('utm_campaign=qa');
  expect(src).toContain('source_page=%2Fpricing%2F');
  expect(await page.locator('script[src*="form_embed.js"]').count()).toBe(1);
  const events = await page.evaluate(() => (window.dataLayer ?? []).map((e) => e.event));
  expect(events).toContain('click_book');
});

test('Start Starter now carries UTMs to the order form', async ({ page }) => {
  test.skip(!builtWithTestEnv, 'needs a build with .env.example values');
  let hit = '';
  await page.route(/example\.com/, (r) => {
    hit = r.request().url();
    return r.fulfill({ status: 200, contentType: 'text/html', body: '<p>order</p>' });
  });
  await page.goto('/pricing/?utm_source=test&gclid=abc');
  await page.locator('a[data-cta="start"]').click();
  await expect.poll(() => hit).toContain('utm_source=test');
  expect(hit).toContain('gclid=abc');
  expect(hit).toContain('source_page=%2Fpricing%2F');
});

test('every page has exactly one h1 and a Last updated date', async ({ page }) => {
  for (const path of indexed) {
    await page.goto(path);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('[data-updated]').first()).toBeVisible();
  }
});
