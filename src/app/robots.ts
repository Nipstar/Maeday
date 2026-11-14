import type { MetadataRoute } from 'next';
import { site } from '@/site.config';

export const dynamic = 'force-static';

/** Allow everyone. AI and search crawlers are named explicitly so the intent is clear. */
export const crawlers = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Google-Extended',
  'Applebot-Extended',
  'Bingbot',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }, ...crawlers.map((userAgent) => ({ userAgent, allow: '/' }))],
    sitemap: `${site.domain}/sitemap.xml`,
    host: site.domain,
  };
}
