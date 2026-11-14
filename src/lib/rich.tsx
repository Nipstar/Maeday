import Link from '@/components/Link';
import { Fragment } from 'react';
import { fill } from '@/lib/format';
import { LINK, plain, richLinks } from '@/lib/links';

export { plain, richLinks };

/** Renders copy with {tokens} filled and {@link} markers as links (see lib/links.ts). */
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
