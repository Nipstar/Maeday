import type { AnchorHTMLAttributes } from 'react';

/**
 * Plain <a> for internal links. The site is a static export: full page loads are fast from the CDN,
 * and skipping the Next.js router avoids background prefetching of every header and footer link
 * (main-thread and network work that cost Lighthouse performance on mobile).
 */
export default function Link({ href, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  return <a href={href} {...rest} />;
}
