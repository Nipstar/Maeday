import { site } from '@/site.config';
import type { Card } from '@/content/types';
import { Rich } from '@/lib/rich';
import { chip } from '@/lib/ui';

const tagClass = {
  emergency: chip.emergency,
  morning: chip.morning,
  neutral: chip.neutral,
  reached: chip.reached,
};

/** A grid of cards: problems, implications, call types, better-choice items. */
export function CardGrid({ cards, as: H = 'h3', variant = 'white', cols = 3 }: { cards: Card[]; as?: 'h3'; variant?: 'white' | 'outline' | 'dark'; cols?: 2 | 3 | 4 }) {
  const grid = cols === 2 ? 'md:grid-cols-2' : cols === 4 ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-2 lg:grid-cols-3';
  const box =
    variant === 'dark' ? 'bg-night text-white' : variant === 'outline' ? 'border border-line bg-daylight' : 'border border-line bg-white';
  return (
    <ul className={`m-0 grid list-none grid-cols-1 gap-4 p-0 md:gap-5 ${grid}`}>
      {cards.map((c) => {
        const srcs = (c.sources ?? []).map((k) => site.sources[k]);
        return (
          <li key={c.title} className={`flex flex-col gap-2.5 rounded-[20px] p-6 ${box}`} {...(c.gateOk ? { 'data-gate-ok': true } : {})}>
            {c.tag && <span className={`${chip.base} self-start py-0.5 text-[13px] ${tagClass[c.tagKind ?? 'neutral']}`}>{c.tag}</span>}
            <H className="m-0 text-[21px] leading-tight font-semibold">
              <Rich text={c.title} />
            </H>
            <p className={`m-0 text-base leading-relaxed ${variant === 'dark' ? 'text-fog' : 'text-slate'}`}>
              <Rich text={c.text} />
            </p>
            {srcs.length > 0 && (
              <p className={`mt-auto mb-0 pt-1 text-[13px] ${variant === 'dark' ? 'text-mist' : 'text-slate'}`}>
                {srcs.length > 1 ? 'Sources: ' : 'Source: '}
                {srcs.map((src, i) => (
                  <span key={src.url}>
                    {i > 0 && '; '}
                    <a href={src.url} className={variant === 'dark' ? 'text-amber' : undefined} rel="noopener">
                      {src.label}
                    </a>
                    , checked {src.checked}
                  </span>
                ))}
              </p>
            )}
          </li>
        );
      })}
    </ul>
  );
}
