import Link from 'next/link';
import { site } from '@/site.config';
import { fill, money, num, rate } from '@/lib/format';
import { builtPages, routes } from '@/lib/routes';

/** Pricing preview on Midnight: three plans in brief, link to the full pricing page. */
export function PlanSection({ heading = 'What does it cost?', id = 'price-h' }: { heading?: string; id?: string }) {
  return (
    <section aria-labelledby={id} className="on-dark bg-midnight text-white">
      <div className="wrap py-16 md:py-[72px]">
        <h2 id={id} className="m-0 text-[32px] leading-[1.08] font-bold md:text-[44px]">
          {heading}
        </h2>
        <p className="mt-2.5 mb-8 max-w-[760px] text-lg leading-relaxed text-fog">
          {fill(
            'Billed by the second, not rounded up. Spam and wrong numbers are not counted. Setup is {setupFee.monthly} on monthly plans and free on annual plans.',
          )}
        </p>
        <ul className="m-0 grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-3 md:gap-5">
          {site.plans.map((p) => (
            <li key={p.id} className={`flex flex-col gap-2 rounded-[20px] bg-night p-7 ${p.featured ? 'outline-2 outline-amber' : ''}`}>
              <h3 className="m-0 text-[22px] font-semibold">{p.name}</h3>
              <p className="m-0 font-display text-[44px] leading-none font-bold tracking-head md:text-[48px]">
                {money(p.price)}
                <span className="ml-1 font-sans text-base font-medium text-fog"> / month</span>
              </p>
              <p className="m-0 text-fog">
                {num(p.minutes)} minutes, about {num(p.approxCalls)} calls. Then {rate(p.overagePerMinute)} a minute.
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-6 mb-0 text-fog">
          {fill('Call counts assume about {typicalCallMinutes} minutes a call.')}{' '}
          {builtPages.pricing && (
            <Link href={routes.pricing} className="font-semibold text-amber underline underline-offset-4 hover:text-white">
              See full pricing and how it compares
            </Link>
          )}
        </p>
      </div>
    </section>
  );
}
