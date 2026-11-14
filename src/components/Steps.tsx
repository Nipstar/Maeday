import type { Card } from '@/content/types';
import { Rich } from '@/lib/rich';

/** Numbered steps (01, 02, ...). */
export function Steps({ items }: { items: Card[] }) {
  return (
    <ol className="m-0 grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-2 md:gap-5 lg:grid-cols-4">
      {items.map((s, i) => (
        <li key={s.title} className="flex flex-col gap-2.5 rounded-[20px] border border-line bg-white p-[26px]">
          <span className="mono text-sm text-amber-deep" aria-hidden="true">
            {String(i + 1).padStart(2, '0')}
          </span>
          <h3 className="m-0 text-[22px] leading-tight font-semibold">{s.title}</h3>
          <p className="m-0 text-base leading-relaxed text-slate">
            <Rich text={s.text} />
          </p>
        </li>
      ))}
    </ol>
  );
}
