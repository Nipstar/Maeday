'use client';

import { useEffect, useState } from 'react';
import { BookLink } from './BookLink';
import { CallLink } from './CallLink';
import { btn } from '@/lib/ui';

/** Mobile bar: appears once the hero ([data-hero]) has scrolled out of view. */
export function StickyCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hero = document.querySelector('[data-hero]');
    if (!hero) {
      const onScroll = () => setShow(window.scrollY > 600);
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
    }
    const io = new IntersectionObserver(([e]) => setShow(!e.isIntersecting && e.boundingClientRect.top < 0));
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  return (
    <div
      data-sticky-cta
      data-visible={show ? 'true' : 'false'}
      aria-hidden={!show}
      inert={!show}
      className={`on-dark fixed inset-x-0 bottom-0 z-30 flex gap-2 border-t border-night bg-midnight px-4 pt-3 pb-[max(12px,env(safe-area-inset-bottom))] transition-transform duration-200 md:hidden ${
        show ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <BookLink position="sticky" className={`${btn.primary} min-h-12 flex-1 px-3 text-base`} />
      <CallLink position="sticky" className={`${btn.outlineDark} min-h-12 px-4 text-base`}>
        Sample call
      </CallLink>
    </div>
  );
}
