import Link from 'next/link';
import { Fragment } from 'react';
import { site } from '@/site.config';
import { fill } from '@/lib/format';
import { builtPages, routes } from '@/lib/routes';
import { comparePages } from '@/content/compare';
import { guides } from '@/content/guides';

/**
 * Inline links inside copy: write {@key} in a content string. <Rich> renders the link,
 * plain() returns the link text only (for JSON-LD, llms.txt and mailto bodies).
 * External URLs come from site.config.ts only.
 */
const hasCompare = (slug: string) => comparePages.some((c) => c.slug === slug);
const hasGuide = (slug: string) => guides.some((g) => g.slug === slug);

/** `live: false` renders the text without a link until that page is built. */
export const richLinks: Record<string, { href: string; text: string; external?: boolean; live: boolean }> = {
  sister: { href: site.sister.url, text: site.sister.anchor, external: true, live: true },
  pricing: { href: routes.pricing, text: 'pricing', live: builtPages.pricing },
  service: { href: routes.service, text: 'how emergency answering works', live: builtPages.service },
  guide: { href: routes.guide('what-counts-as-a-maintenance-emergency'), text: 'what counts as a maintenance emergency', live: hasGuide('what-counts-as-a-maintenance-emergency') },
  smithai: { href: routes.compare('smith-ai'), text: 'how we compare with Smith.ai', live: hasCompare('smith-ai') },
  sas: { href: routes.compare('specialty-answering-service'), text: 'MaeDay vs Specialty Answering Service', live: hasCompare('specialty-answering-service') },
  hub: { href: routes.hub, text: 'every service compared', live: builtPages.hub },
};

const LINK = /\{@(\w+)\}/g;

export function plain(text: string): string {
  return fill(text).replace(LINK, (m, k: string) => {
    const l = richLinks[k];
    if (!l) throw new Error(`Unknown link ${m} in: ${text}`);
    return l.text;
  });
}

export function Rich({ text, className }: { text: string; className?: string }) {
  const parts = fill(text).split(LINK);
  return (
    <>
      {parts.map((part, i) => {
        if (i % 2 === 0) return <Fragment key={i}>{part}</Fragment>;
        const l = richLinks[part];
        if (!l) throw new Error(`Unknown link {@${part}} in: ${text}`);
        if (!l.live) return <Fragment key={i}>{l.text}</Fragment>;
        return l.external ? (
          <a key={i} href={l.href} className={className}>
            {l.text}
          </a>
        ) : (
          <Link key={i} href={l.href} className={className}>
            {l.text}
          </Link>
        );
      })}
    </>
  );
}
