'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { track } from '@/lib/analytics';

/**
 * "Send this to the owner or your partner": the problem, the cost, the fix, the price, the link,
 * as a prefilled email and a copy button. Arms the champion when we are not in the room.
 */
export function ForwardBox({ heading, intro, subject, body }: { heading: string; intro: string; subject: string; body: string }) {
  const path = usePathname() || '/';
  const [copied, setCopied] = useState(false);
  const mailto = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(`${subject}\n\n${body}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      /* clipboard blocked: the text is on the page to select by hand */
    }
    track({ event: 'forward_copy', page_path: path });
  }

  return (
    <section aria-labelledby="forward-h" className="py-16 md:py-[72px]">
      <div className="wrap grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-12">
        <div className="min-w-0">
          <h2 id="forward-h" className="m-0 text-[32px] leading-[1.08] font-bold md:text-[40px]">
            {heading}
          </h2>
          <p className="mt-3 mb-6 text-lg leading-relaxed text-slate">{intro}</p>
          <div className="flex flex-wrap gap-3">
            <a
              href={mailto}
              onClick={() => track({ event: 'forward_email', page_path: path })}
              className="inline-flex min-h-[52px] items-center rounded-[12px] border-[1.5px] border-midnight px-[22px] font-semibold text-midnight no-underline hover:bg-midnight hover:text-white"
            >
              Email it
            </a>
            <button
              type="button"
              onClick={copy}
              className="inline-flex min-h-[52px] items-center rounded-[12px] border-[1.5px] border-midnight px-[22px] font-semibold text-midnight hover:bg-midnight hover:text-white"
            >
              {copied ? 'Copied' : 'Copy the text'}
            </button>
          </div>
          <p className="mt-3 mb-0 min-h-6 text-sm text-slate" aria-live="polite">
            {copied ? 'Copied to your clipboard.' : ''}
          </p>
        </div>
        <div className="min-w-0 rounded-[20px] border border-line bg-white p-6">
          <p className="mono m-0 mb-3 text-xs tracking-eyebrow text-slate uppercase">Subject: {subject}</p>
          <div className="text-base leading-relaxed whitespace-pre-line text-midnight [overflow-wrap:anywhere]">{body}</div>
        </div>
      </div>
    </section>
  );
}
