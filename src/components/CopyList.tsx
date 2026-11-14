'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { track } from '@/lib/analytics';

/** Copy the template list as plain text, or print it. */
export function CopyList({ text }: { text: string }) {
  const path = usePathname() || '/';
  const [copied, setCopied] = useState(false);
  const cls =
    'inline-flex min-h-12 items-center rounded-[12px] border-[1.5px] border-midnight px-5 font-semibold text-midnight hover:bg-midnight hover:text-white';
  return (
    <div className="no-print flex flex-wrap items-center gap-3">
      <button
        type="button"
        className={cls}
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
          } catch {
            /* clipboard blocked: the table can be selected by hand */
          }
          track({ event: 'copy_list', page_path: path });
        }}
      >
        {copied ? 'Copied' : 'Copy the list'}
      </button>
      <button type="button" className={cls} onClick={() => window.print()}>
        Print the list
      </button>
      <span className="text-sm text-slate" aria-live="polite">
        {copied ? 'Copied to your clipboard.' : ''}
      </span>
    </div>
  );
}
