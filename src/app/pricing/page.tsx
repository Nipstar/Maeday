import type { Metadata } from 'next';
import { site } from '@/site.config';
import { pricing } from '@/content/pricing';
import { pricingFaqs } from '@/content/faqs';
import { fill } from '@/lib/format';
import { Rich } from '@/lib/rich';
import { pageMeta } from '@/lib/seo';
import { routes } from '@/lib/routes';
import { breadcrumbs, faqPage, product, webPage } from '@/lib/schema';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { AnswerBlock } from '@/components/AnswerBlock';
import { PlanCard } from '@/components/PlanCard';
import { SectionHead } from '@/components/SectionHead';
import { CardGrid } from '@/components/Cards';
import { CompareTable } from '@/components/CompareTable';
import { CallLog } from '@/components/CallLog';
import { Faq } from '@/components/Faq';
import { FinalCta } from '@/components/FinalCta';
import { UpdatedDate } from '@/components/UpdatedDate';
import { JsonLd } from '@/components/JsonLd';
import { home } from '@/content/home';

const path = routes.pricing;
const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Pricing', path },
];

export const metadata: Metadata = pageMeta({ title: pricing.title, description: fill(pricing.metaDescription), path });

export default function PricingPage() {
  return (
    <>
      <section data-hero className="wrap pt-8 pb-10 md:pt-12">
        <Breadcrumbs items={crumbs} />
        <p className="eyebrow text-amber-deep">{pricing.eyebrow}</p>
        <h1 className="m-0 max-w-[900px] text-[38px] leading-[1.05] font-bold tracking-display md:text-[56px]">{pricing.h1}</h1>
        <p className="mt-4 mb-0 max-w-[760px] text-lg leading-relaxed text-slate">{fill(pricing.sub)}</p>
        <UpdatedDate className="mt-4" />
      </section>

      <section aria-label="Plans" className="wrap pb-6">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {site.plans.map((p) => (
            <PlanCard key={p.id} plan={p} withStart />
          ))}
        </div>
        <p className="mt-5 mb-0 text-[15px] text-slate">{fill(pricing.planNote)}</p>
      </section>

      <section className="wrap py-12 md:py-16">
        <div className="max-w-[860px]">
          <AnswerBlock heading={pricing.answer.heading} text={pricing.answer.text} />
        </div>
      </section>

      <section aria-labelledby="minute-h" className="border-y border-line bg-white">
        <div className="wrap grid grid-cols-1 gap-10 py-14 md:py-[72px] lg:grid-cols-2">
          <div className="min-w-0">
            <SectionHead id="minute-h" title={pricing.minute.heading} intro={pricing.minute.intro} />
            <ul className="mt-6 mb-0 flex list-none flex-col gap-3 p-0">
              {pricing.minute.items.map((i) => (
                <li key={i.strong} className="rounded-[16px] border border-line bg-daylight p-5 text-base leading-relaxed">
                  <strong className="font-semibold">{i.strong}</strong> {fill(i.text)}
                </li>
              ))}
            </ul>
          </div>
          <div className="min-w-0 self-center">
            <CallLog log={home.heroLog} compact />
          </div>
        </div>
      </section>

      <section aria-labelledby="why-h" className="wrap py-14 md:py-[72px]">
        <SectionHead id="why-h" title={pricing.why.heading} intro={pricing.why.intro} className="mb-8" />
        <CardGrid cards={pricing.why.cards} />
      </section>

      <section aria-labelledby="compare-h" className="border-t border-line bg-white">
        <div className="wrap py-14 md:py-[72px]">
          <SectionHead id="compare-h" title={pricing.compare.heading} intro={pricing.compare.intro} className="mb-8" />
          <CompareTable ids={pricing.compare.ids} caption={fill(pricing.compare.caption)} />
          <p className="mt-5 mb-0 text-[15px] text-slate">
            <Rich text={pricing.compare.after} />
          </p>
        </div>
      </section>

      <section id="faq" aria-labelledby="faq-h" className="wrap py-14 md:py-[72px]">
        <SectionHead id="faq-h" title={pricing.faqHeading} className="mb-6" />
        <Faq items={pricingFaqs} />
      </section>

      <FinalCta heading={pricing.ctaHeading} text={pricing.ctaText} position="final" />

      <JsonLd
        data={[
          webPage({ path, name: pricing.title, description: fill(pricing.metaDescription) }),
          product({ path, description: fill(pricing.answer.text) }),
          faqPage(pricingFaqs),
          breadcrumbs(crumbs),
        ]}
      />
    </>
  );
}
