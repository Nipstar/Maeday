'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { site } from '@/site.config';
import { track } from '@/lib/analytics';

/** Every "Hear a sample call" button: tel: link to the demo line from config, fires click_call. */
export function CallLink({ className, children, position }: { className?: string; children?: ReactNode; position: string }) {
  const path = usePathname() || '/';
  return (
    <a
      href={`tel:${site.demoPhone.tel}`}
      className={className}
      data-cta="call"
      data-position={position}
      onClick={() => track({ event: 'click_call', page_path: path, position })}
    >
      {children ?? 'Hear a sample call'}
    </a>
  );
}

/** The demo number as text, for desktop visitors who cannot tap. */
export function DemoNumber({ className, prefix = 'Sample call line:' }: { className?: string; prefix?: string }) {
  return (
    <p className={className}>
      {prefix} <span className="mono whitespace-nowrap">{site.demoPhone.display}</span>
    </p>
  );
}
