import { site, type Plan } from '@/site.config';
import { fill } from '@/lib/format';
import type { Faq } from '@/content/types';

/** JSON-LD builders. Every builder takes the same data the page renders, so the two cannot drift. Never Review or AggregateRating. */

const orgId = `${site.domain}/#organization`;
const parentId = `${site.domain}/#antek`;
const founderId = `${site.domain}/#founder`;

export function organization() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': orgId,
    name: site.name,
    url: site.domain,
    logo: `${site.domain}/icon.svg`,
    slogan: site.tagline,
    description: site.descriptor,
    email: site.email,
    areaServed: { '@type': 'Country', name: 'United States' },
    parentOrganization: { '@type': 'Organization', '@id': parentId, name: site.owner },
    founder: { '@type': 'Person', '@id': founderId, name: site.founder },
  };
}

export function website() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.domain}/#website`,
    name: site.name,
    url: site.domain,
    publisher: { '@id': orgId },
    inLanguage: 'en-US',
  };
}

function planOffer(p: Plan, path: string, withOverage: boolean) {
  const monthly = {
    '@type': 'UnitPriceSpecification',
    name: `${p.name} monthly price, ${p.minutes} minutes included`,
    price: p.price,
    priceCurrency: site.currency,
    billingDuration: 'P1M',
    unitCode: 'MON',
    referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'MON' },
  };
  const overage = {
    '@type': 'UnitPriceSpecification',
    name: `${p.name} minutes over the allowance`,
    price: p.overagePerMinute,
    priceCurrency: site.currency,
    unitCode: 'MIN',
    referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'MIN' },
  };
  return {
    '@type': 'Offer',
    name: `${site.name} ${p.name}`,
    description: `${p.minutes} minutes a month, billed by the second. ${p.blurb}`,
    url: `${site.domain}${path}`,
    price: p.price,
    priceCurrency: site.currency,
    availability: 'https://schema.org/InStock',
    eligibleRegion: { '@type': 'Country', name: 'US' },
    priceSpecification: withOverage ? [monthly, overage] : monthly,
  };
}

export function offers(path: string, withOverage = false) {
  return site.plans.map((p) => planOffer(p, path, withOverage));
}

export function service({ path, name, description, audience }: { path: string; name: string; description: string; audience?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    serviceType: 'Property management answering service',
    description,
    url: `${site.domain}${path}`,
    provider: { '@id': orgId },
    brand: { '@type': 'Brand', name: site.name },
    areaServed: { '@type': 'Country', name: 'United States' },
    audience: { '@type': 'BusinessAudience', audienceType: audience ?? 'Property managers' },
    offers: offers(path),
  };
}

export function product({ path, description }: { path: string; description: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${site.name} after-hours answering`,
    description,
    brand: { '@type': 'Brand', name: site.name },
    url: `${site.domain}${path}`,
    offers: offers(path, true),
  };
}

/** FAQ text is filled with the same fill() the visible FAQ uses. */
export function faqPage(faqs: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: fill(f.q),
      acceptedAnswer: { '@type': 'Answer', text: fill(f.a) },
    })),
  };
}

export function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${site.domain}${it.path}`,
    })),
  };
}

export function webPage({ path, name, description, speakable = false }: { path: string; name: string; description: string; speakable?: boolean }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${site.domain}${path}#webpage`,
    url: `${site.domain}${path}`,
    name,
    description,
    isPartOf: { '@id': `${site.domain}/#website` },
    dateModified: site.lastUpdatedIso,
    ...(speakable ? { speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '[data-speakable]'] } } : {}),
  };
}

export function article({
  path,
  headline,
  description,
  published,
  sources,
}: {
  path: string;
  headline: string;
  description: string;
  published: string;
  sources: { url: string }[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    url: `${site.domain}${path}`,
    mainEntityOfPage: `${site.domain}${path}`,
    datePublished: published,
    dateModified: site.lastUpdatedIso,
    author: { '@type': 'Person', '@id': founderId, name: site.founder, worksFor: { '@id': parentId, name: site.owner } },
    publisher: { '@id': orgId },
    citation: sources.map((s) => s.url),
    inLanguage: 'en-US',
  };
}

export function aboutPage({ path, description }: { path: string; description: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    url: `${site.domain}${path}`,
    description,
    about: { '@id': orgId },
    mainEntity: {
      '@type': 'Person',
      '@id': founderId,
      name: site.founder,
      jobTitle: 'Founder',
      worksFor: { '@type': 'Organization', '@id': parentId, name: site.owner },
    },
  };
}
