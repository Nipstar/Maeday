import { site } from '@/site.config';
import { BookLink } from './BookLink';
import { CallLink } from './CallLink';
import { fill } from '@/lib/format';

/** Amber band. The tagline is the default heading. */
export function FinalCta({ heading = site.tagline, text, withCall = false, position = 'final' }: { heading?: string; text?: string; withCall?: boolean; position?: string }) {
  return (
    <section id="book" className="bg-amber" aria-labelledby="book-h">
      <div className="wrap flex flex-wrap items-center justify-between gap-7 py-14 md:py-16">
        <div className="min-w-0 flex-[1_1_480px]">
          <h2 id="book-h" className="m-0 text-[32px] leading-[1.08] font-bold text-midnight md:text-[42px]">
            {fill(heading)}
          </h2>
          <p className="mt-2.5 mb-0 text-lg leading-relaxed text-midnight">
            {fill(text ?? 'On a {setupCallMinutes}-minute setup call we go through your properties, your emergency list and who is on call. You leave with a plan and a price.')}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <BookLink
            position={position}
            className="inline-flex min-h-14 items-center rounded-[12px] bg-midnight px-7 text-[17px] font-semibold text-white no-underline hover:bg-night hover:text-white"
          />
          {withCall && (
            <CallLink
              position={position}
              className="inline-flex min-h-14 items-center rounded-[12px] border-[1.5px] border-midnight px-6 text-[17px] font-semibold text-midnight no-underline hover:bg-midnight hover:text-white"
            />
          )}
        </div>
      </div>
    </section>
  );
}
