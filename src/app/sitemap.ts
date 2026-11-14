import type { MetadataRoute } from 'next';
import { site } from '@/site.config';
import { indexableRoutes, routes } from '@/lib/routes';

export const dynamic = 'force-static';

/** Indexable pages only (thank-you, privacy and terms are noindex). lastmod is the content's last-updated date. */
export default function sitemap(): MetadataRoute.Sitemap {
  return indexableRoutes().map((path) => ({
    url: `${site.domain}${path}`,
    lastModified: site.lastUpdatedIso,
    changeFrequency: 'monthly',
    priority: path === '/' ? 1 : path === routes.pricing ? 0.9 : 0.7,
  }));
}
