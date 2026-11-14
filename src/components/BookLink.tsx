'use client';

import type { MouseEvent, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { site } from '@/site.config';
import { track, withUtm } from '@/lib/analytics';

export const BOOK_EVENT = 'maeday:book';

/**
 * Every "Book a setup call" button. Opens the booking calendar in a modal (BookingModal) with UTMs,
 * and fires click_book. Without JS, or while the URL is a placeholder, it is a plain link.
 */
export function BookLink({ className, children, position }: { className?: string; children?: ReactNode; position: string }) {
  const path = usePathname() || '/';

  function onClick(e: MouseEvent<HTMLAnchorElement>) {
    track({ event: 'click_book', page_path: path, position });
    const url = withUtm(site.bookingUrl, path);
    e.currentTarget.href = url;
    if (!/^https?:\/\//.test(url)) return;
    e.preventDefault();
    window.dispatchEvent(new CustomEvent(BOOK_EVENT, { detail: { url } }));
  }

  return (
    <a href={site.bookingUrl} onClick={onClick} className={className} data-cta="book" data-position={position}>
      {children ?? 'Book a setup call'}
    </a>
  );
}
