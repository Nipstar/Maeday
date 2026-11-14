import type { Metadata } from 'next';
import { site } from '@/site.config';
import { servicePage as p } from '@/content/service';
import { home } from '@/content/home';
import { fill } from '@/lib/format';
import { Rich } from '@/lib/rich';
import { pageMeta } from '@/lib/seo';
import { btn } from '@/lib/ui';
import { routes } from '@/lib/routes';
import { breadcrumbs, faqPage, service, webPage } from '@/lib/schema';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { BookLink } from '@/components/BookLink';
import { CallLink } from '@/components/CallLink';
import { CallLog } from '@/components/CallLog';
import { AnswerBlock } from '@/components/AnswerBlock';
import { SectionHead } from '@/components/SectionHead';
import { CardGrid } from '@/components/Cards';
import { LimitsList } from '@/components/LimitsList';
import { Faq } from '@/components/Faq';
import { FinalCta } from '@/components/FinalCta';
import { UpdatedDate } from '@/components/UpdatedDate';
import { JsonLd } from '@/components/JsonLd';

const path = routes.service;
const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Emergency maintenance answering', path },
];

export const metadata: Metadata = pageMeta({ title: p.title, description: fill(p.metaDescription), path });

export default function ServicePage() {
  return (
    <>
      <section data-hero className="on-dark bg-midnight text-white">
        <div className="wrap pt-8 pb-16 md:pt-10 md:pb-20">
          <Breadcrumbs items={crumbs} dark />
          <div className="flex max-w-[820px] flex-col gap-5">
            <p className="eyebrow m-0 text-amber">{p.eyebrow}</p>
            <h1 className="m-0 text-[38px] leading-[1.04] font-bold tracking-display md:text-[56px]">{p.h1}</h1>
            <p className="m-0 text-lg leading-relaxed text-fog">{fill(p.sub)}</p>
            <div className="flex flex-wrap gap-3">
              <BookLink position="hero" className={btn.primary} />
              <CallLink position="hero" className={btn.outlineDark} />
            </div>
          </div>
        </div>
      </section>

      <section className="wrap pt-14 pb-4 md:pt-[72px]">
        <div className="max-w-[860px]">
          <AnswerBlock heading={p.answer.heading} text={p.answer.text} />
          <UpdatedDate className="mt-4" />
        </div>
      </section>

      <section aria-labelledby="problem-h" className="wrap py-14 md:py-[72px]">
        <SectionHead id="problem-h" title={p.problem.heading} className="mb-8" />
        <CardGrid cards={p.problem.cards} />
      </section>

      <section aria-labelledby="impl-h" className="border-y border-line bg-white">
        <div className="wrap py-14 md:py-[72px]">
          <SectionHead id="impl-h" title={p.implication.heading} className="mb-8" />
          <CardGrid cards={p.implication.cards} variant="outline" />
          <p className="mt-5 mb-0 text-sm text-slate">{p.implication.note}</p>
        </div>
      </section>

      <section aria-labelledby="payoff-h" className="wrap py-14 md:py-[72px]">
        <SectionHead id="payoff-h" title={p.payoff.heading} intro={p.payoff.intro} className="mb-8" />
        <CardGrid cards={p.payoff.cards} />
      </section>

      <section id="ladder" aria-labelledby="ladder-h" className="on-dark bg-midnight text-white">
        <div className="wrap py-14 md:py-[72px]">
          <SectionHead id="ladder-h" title={p.ladder.heading} intro={p.ladder.intro} dark className="mb-10" />
          <ol className="m-0 grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-3 lg:grid-cols-6">
            {p.ladder.steps.map((s, i) => (
              <li key={s.title} className="relative flex flex-col gap-2 rounded-[18px] bg-night p-5">
                <span className="mono flex size-9 items-center justify-center rounded-full bg-amber text-sm text-midnight" aria-hidden="true">
                  {i + 1}
                </span>
                <h3 className="m-0 text-lg leading-tight font-semibold">{s.title}</h3>
                <p className="m-0 text-[15px] leading-relaxed text-fog">{s.text}</p>
                {i < p.ladder.steps.length - 1 && (
                  <span className="absolute top-1/2 -right-3 hidden text-amber lg:block" aria-hidden="true">
                    →
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="example-h" className="wrap grid grid-cols-1 items-center gap-10 py-14 md:py-[72px] lg:grid-cols-2">
        <div className="min-w-0">
          <SectionHead id="example-h" title={p.exampleHeading} intro={p.exampleIntro} />
        </div>
        <div className="min-w-0">
          <CallLog log={p.exampleLog} compact />
        </div>
      </section>

      <section aria-labelledby="limits-h" className="border-y border-line bg-white">
        <div className="wrap flex flex-wrap gap-10 py-14 md:py-[72px]">
          <div className="min-w-0 flex-[1_1_300px]">
            <SectionHead id="limits-h" title={home.limits.heading} intro={home.limits.intro} />
            <p className="mt-4 mb-0 text-[15px] text-slate">
              <Rich text="More on {@guide}." />
            </p>
          </div>
          <div className="min-w-0 flex-[2_1_560px]">
            <LimitsList items={home.limits.items} />
          </div>
        </div>
      </section>

      <section id="faq" aria-labelledby="faq-h" className="wrap py-14 md:py-[72px]">
        <SectionHead id="faq-h" title={p.faqHeading} className="mb-6" />
        <Faq items={p.faqs} />
      </section>

      <FinalCta heading={p.ctaHeading} withCall position="final" />

      <JsonLd
        data={[
          webPage({ path, name: p.title, description: fill(p.metaDescription) }),
          service({ path, name: `${site.name} emergency maintenance answering`, description: fill(p.answer.text) }),
          faqPage(p.faqs),
          breadcrumbs(crumbs),
        ]}
      />
    </>
  );
}
