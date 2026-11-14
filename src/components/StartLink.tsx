'use client';

import type { MouseEvent, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { site } from '@/site.config';
import { track, withUtm } from '@/lib/analytics';

/** "Start Starter now": the order form with UTMs and source_page, fires click_start. Pricing page only. */
export function StartLink({ className, children, plan }: { className?: string; children: ReactNode; plan: 'starter' }) {
  const path = usePathname() || '/';

  function onClick(e: MouseEvent<HTMLAnchorElement>) {
    e.currentTarget.href = withUtm(site.orderUrl, path);
    track({ event: 'click_start', plan, page_path: path });
  }

  return (
    <a href={site.orderUrl} onClick={onClick} className={className} data-cta="start">
      {children}
    </a>
  );
}
