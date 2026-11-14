'use client';

import { useEffect, useRef, useState } from 'react';
import { BOOK_EVENT } from './BookLink';

const EMBED_SCRIPT = 'https://link.msgsndr.com/js/form_embed.js';

/**
 * One modal for the whole site. The iframe and the calendar's form_embed.js load on the first
 * "Book a setup call" click, never at page load.
 */
export function BookingModal() {
  const ref = useRef<HTMLDialogElement>(null);
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    function open(e: Event) {
      const next = (e as CustomEvent<{ url: string }>).detail.url;
      setUrl(next);
      if (!document.querySelector(`script[src="${EMBED_SCRIPT}"]`)) {
        const s = document.createElement('script');
        s.src = EMBED_SCRIPT;
        s.async = true;
        document.body.appendChild(s);
      }
      ref.current?.showModal();
    }
    window.addEventListener(BOOK_EVENT, open);
    return () => window.removeEventListener(BOOK_EVENT, open);
  }, []);

  return (
    <dialog
      ref={ref}
      aria-labelledby="book-dialog-title"
      className="m-auto h-[min(760px,92vh)] w-[min(720px,94vw)] max-w-none overflow-hidden rounded-[20px] border border-line bg-white p-0 backdrop:bg-midnight/70"
      onClick={(e) => {
        if (e.target === ref.current) ref.current?.close();
      }}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-3">
          <h2 id="book-dialog-title" className="m-0 text-lg font-bold">
            Book a setup call
          </h2>
          <button
            type="button"
            onClick={() => ref.current?.close()}
            className="flex size-12 items-center justify-center rounded-[12px] text-2xl text-midnight hover:bg-daylight"
            aria-label="Close"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        {url && (
          <iframe
            src={url}
            title="Setup call calendar"
            className="w-full flex-1 border-0"
            data-booking-iframe
          />
        )}
        {url && (
          <p className="m-0 border-t border-line px-5 py-2 text-sm text-slate">
            Calendar not loading?{' '}
            <a href={url} target="_blank" rel="noopener">
              Open it in a new tab
            </a>
          </p>
        )}
      </div>
    </dialog>
  );
}
