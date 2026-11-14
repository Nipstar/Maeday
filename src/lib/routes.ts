import { segments } from '@/content/segments';
import { comparePages } from '@/content/compare';
import { guides } from '@/content/guides';

export const routes = {
  home: '/',
  pricing: '/pricing/',
  service: '/emergency-maintenance-answering/',
  segment: (slug: string) => `/${slug}/`,
  compare: (slug: string) => `/compare/${slug}/`,
  hub: '/best-property-management-answering-service/',
  guide: (slug: string) => `/guides/${slug}/`,
  about: '/about/',
  thankYou: '/thank-you/',
  privacy: '/privacy/',
  terms: '/terms/',
};

/** Top-level pages that exist (added phase by phase). Segment, compare and guide pages come from content. */
export const builtPages = {
  pricing: false,
  service: false,
  hub: false,
  about: false,
  legal: false,
};

/** Every indexable page, for the sitemap and llms.txt. */
export function indexableRoutes(): string[] {
  return [
    routes.home,
    ...(builtPages.pricing ? [routes.pricing] : []),
    ...(builtPages.service ? [routes.service] : []),
    ...segments.map((s) => routes.segment(s.slug)),
    ...(builtPages.hub ? [routes.hub] : []),
    ...comparePages.map((c) => routes.compare(c.slug)),
    ...guides.map((g) => routes.guide(g.slug)),
    ...(builtPages.about ? [routes.about] : []),
  ];
}
