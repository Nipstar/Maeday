import type { Metadata } from 'next';
import Link from '@/components/Link';
import { site } from '@/site.config';
import { home } from '@/content/home';
import { homeFaqs } from '@/content/faqs';
import { getSegment } from '@/content/segments';
import { fill } from '@/lib/format';
import { plain } from '@/lib/rich';
import { pageMeta } from '@/lib/seo';
import { btn, chip } from '@/lib/ui';
import { routes } from '@/lib/routes';
import { faqPage, service, webPage } from '@/lib/schema';
import { BookLink } from '@/components/BookLink';
import { CallLink, DemoNumber } from '@/components/CallLink';
import { CallLog } from '@/components/CallLog';
import { AnswerBlock } from '@/components/AnswerBlock';
import { SectionHead } from '@/components/SectionHead';
import { CardGrid } from '@/components/Cards';
import { Steps } from '@/components/Steps';
import { LimitsList } from '@/components/LimitsList';
import { PlanSection } from '@/components/PlanSection';
import { Faq } from '@/components/Faq';
import { ForwardBox } from '@/components/ForwardBox';
import { FinalCta } from '@/components/FinalCta';
import { UpdatedDate } from '@/components/UpdatedDate';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = pageMeta({
  title: home.title,
  description: fill(home.metaDescription),
  path: '/',
});

export default function Home() {
  const h = home.hero;
  return (
    <>
      {/* 1. Hero (need-payoff) */}
      <section data-hero className="on-dark bg-midnight text-white">
        <div className="wrap flex flex-wrap items-center gap-12 pt-10 pb-16 md:pt-14 md:pb-[88px]">
          <div className="flex min-w-0 flex-[1_1_480px] flex-col gap-5">
            <p className="eyebrow m-0 text-amber">{h.eyebrow}</p>
            <h1 className="m-0 text-[40px] leading-[1.03] font-bold tracking-display md:text-[60px]">{h.h1}</h1>
            <p className="m-0 text-lg leading-relaxed text-fog md:text-[19px]">{fill(h.sub)}</p>
            <div className="flex flex-wrap gap-3">
              <BookLink position="hero" className={btn.primary} />
              <CallLink position="hero" className={btn.outlineDark} />
            </div>
            <DemoNumber className="m-0 hidden text-[15px] text-mist md:block" />
            <ul className="m-0 flex list-none flex-wrap gap-2.5 p-0 text-sm">
              {h.chips.map((c) => (
                <li key={c} className={`${chip.base} ${chip.dark}`}>
                  {fill(c)}
                </li>
              ))}
            </ul>
          </div>
          <div className="min-w-0 flex-[1_1_420px]">
            <CallLog log={home.heroLog} />
          </div>
        </div>
      </section>

      {/* 2. AnswerBlock */}
      <section className="wrap pt-14 pb-4 md:pt-[72px]">
        <div className="max-w-[860px]">
          <AnswerBlock heading={home.answer.heading} text={home.answer.text} />
          <UpdatedDate className="mt-4" />
        </div>
      </section>

      {/* 3. Problem */}
      <section aria-labelledby="problem-h" className="wrap py-14 md:py-[72px]">
        <SectionHead id="problem-h" title={home.problem.heading} intro={home.problem.intro} className="mb-8" />
        <CardGrid cards={home.problem.cards} />
      </section>

      {/* 4. Implication */}
      <section aria-labelledby="implication-h" className="border-y border-line bg-white">
        <div className="wrap py-14 md:py-[72px]">
          <SectionHead id="implication-h" title={home.implication.heading} intro={home.implication.intro} className="mb-8" />
          <CardGrid cards={home.implication.cards} variant="outline" cols={2} />
          <p className="mt-5 mb-0 text-sm text-slate">{home.implication.note}</p>
        </div>
      </section>

      {/* 5. Need-payoff */}
      <section aria-labelledby="payoff-h" className="wrap py-14 md:py-[72px]">
        <SectionHead id="payoff-h" title={home.needPayoff.heading} intro={home.needPayoff.intro} className="mb-8" />
        <CardGrid cards={home.needPayoff.items} cols={4} />
      </section>

      {/* 6. How it works */}
      <section id="how" aria-labelledby="how-h" className="wrap pb-14 md:pb-[72px]">
        <SectionHead id="how-h" title={home.steps.heading} className="mb-7" />
        <Steps items={home.steps.items} />
      </section>

      {/* 7. Which calls */}
      <section aria-labelledby="calls-h" className="border-y border-line bg-white">
        <div className="wrap py-14 md:py-[72px]">
          <SectionHead id="calls-h" title={home.calls.heading} intro={home.calls.intro} className="mb-8" />
          <CardGrid cards={home.calls.cards} variant="outline" />
        </div>
      </section>

      {/* 8. Limits */}
      <section aria-labelledby="limits-h" className="wrap py-14 md:py-[72px]">
        <div className="flex flex-wrap gap-10">
          <div className="min-w-0 flex-[1_1_300px]">
            <SectionHead id="limits-h" title={home.limits.heading} intro={home.limits.intro} />
          </div>
          <div className="min-w-0 flex-[2_1_560px]">
            <LimitsList items={home.limits.items} />
          </div>
        </div>
      </section>

      {/* 9. Pricing preview */}
      <PlanSection />

      {/* 10. When something else is better */}
      <section aria-labelledby="else-h" className="wrap py-14 md:py-[72px]">
        <SectionHead id="else-h" title={home.better.heading} intro={home.better.intro} className="mb-7" />
        <CardGrid cards={home.better.cards} />
      </section>

      {/* 11. Who it's for */}
      <section aria-labelledby="who-h" className="border-y border-line bg-white">
        <div className="wrap py-14 md:py-[72px]">
          <SectionHead id="who-h" title={home.who.heading} className="mb-7" />
          <ul className="m-0 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
            {home.who.cards.map((c) => {
              const inner = (
                <>
                  <strong className="font-display text-xl font-semibold">{c.name}</strong>
                  <span className="text-[15px] text-slate">{c.line}</span>
                </>
              );
              return (
                <li key={c.slug}>
                  {getSegment(c.slug) ? (
                    <Link
                      href={routes.segment(c.slug)}
                      className="flex h-full min-h-12 flex-col gap-1.5 rounded-[16px] border border-line p-[22px] text-midnight no-underline hover:border-midnight hover:text-midnight"
                    >
                      {inner}
                    </Link>
                  ) : (
                    <div className="flex h-full flex-col gap-1.5 rounded-[16px] border border-line p-[22px]">{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* 12. FAQ */}
      <section id="faq" aria-labelledby="faq-h" className="wrap py-14 md:py-[72px]">
        <SectionHead id="faq-h" title={home.faqHeading} className="mb-6" />
        <Faq items={homeFaqs} />
      </section>

      {/* 13. ForwardBox */}
      <div className="border-t border-line bg-white">
        <ForwardBox
          heading={home.forward.heading}
          intro={home.forward.intro}
          subject={home.forward.subject}
          body={plain(home.forward.body)}
        />
      </div>

      {/* 14. FinalCta */}
      <FinalCta text={home.final.text} withCall position="final" />

      <JsonLd
        data={[
          webPage({ path: '/', name: home.title, description: fill(home.metaDescription), speakable: true }),
          service({ path: '/', name: `${site.name} property management answering service`, description: fill(home.answer.text) }),
          faqPage(homeFaqs),
        ]}
      />
    </>
  );
}
