import type { Faq as FaqItem } from '@/content/types';
import { Rich } from '@/lib/rich';

/**
 * Native <details> accordion. Text comes from the same array as the FAQPage JSON-LD
 * (faqPage() in lib/schema.ts); scripts/check.ts verifies they match.
 */
export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="border-t border-line" data-faq>
      {items.map((f) => (
        <details key={f.q} className="border-b border-line py-5" {...(f.gateOk ? { 'data-gate-ok': true } : {})}>
          <summary className="flex min-h-12 items-start justify-between gap-5 font-display text-[19px] leading-snug font-semibold">
            <span data-faq-q>
              <Rich text={f.q} />
            </span>
            <span className="faq-plus text-[26px] leading-none text-amber-deep" aria-hidden="true">
              +
            </span>
          </summary>
          <div className="mt-2 mb-0 max-w-[760px] text-base leading-relaxed text-slate" data-faq-a>
            <Rich text={f.a} />
          </div>
        </details>
      ))}
    </div>
  );
}
