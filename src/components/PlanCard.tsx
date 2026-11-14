import { site, type Plan } from '@/site.config';
import { fill, money, num, rate } from '@/lib/format';
import { btn } from '@/lib/ui';
import { BookLink } from './BookLink';
import { StartLink } from './StartLink';

const extras: Record<Plan['id'], string[]> = {
  starter: ['Emergency rules and on-call ladder', 'Email summary and recording for every call'],
  growth: ['Everything in Starter', 'Rules set per property'],
  portfolio: ['Everything in Growth', '{portfolioExtra}'],
};

/** Full plan card for the pricing page. Starter carries "Or start Starter now" (order form). */
export function PlanCard({ plan, withStart = false }: { plan: Plan; withStart?: boolean }) {
  return (
    <div
      className={`flex min-w-0 flex-col gap-3 rounded-[24px] bg-white p-7 ${plan.featured ? 'border-2 border-midnight' : 'border border-line'}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="m-0 text-[26px] font-semibold">{plan.name}</h2>
        {plan.featured && <span className="rounded-[8px] bg-dusk px-3 py-1 text-sm font-semibold">Most portfolios</span>}
      </div>
      <p className="m-0 font-display text-[48px] leading-none font-bold tracking-head">
        {money(plan.price)}
        <span className="ml-1 font-sans text-base font-medium text-slate">/ month</span>
      </p>
      <p className="m-0 text-slate">{plan.blurb}</p>
      <ul className="m-0 flex list-disc flex-col gap-2 border-t border-line-soft pt-4 pl-5 text-base marker:text-amber-deep">
        <li>
          {num(plan.minutes)} minutes, about {num(plan.approxCalls)} calls
        </li>
        <li>{rate(plan.overagePerMinute)} a minute after that</li>
        {extras[plan.id].map((e) => (
          <li key={e}>{fill(e)}</li>
        ))}
      </ul>
      <div className="mt-auto flex flex-col gap-2 pt-3">
        <BookLink position={`plan-${plan.id}`} className={plan.featured ? btn.primary : btn.outline} />
        {withStart && plan.buyNow && (
          <StartLink plan="starter" className="min-h-12 self-center py-3 font-semibold underline underline-offset-4">
            Or start {plan.name} now
          </StartLink>
        )}
      </div>
      <p className="sr-only">Prices in {site.currency}.</p>
    </div>
  );
}
