import type { Metadata } from 'next';
import Link from '@/components/Link';
import { notFound } from 'next/navigation';
import { site } from '@/site.config';
import { getSegment, segments } from '@/content/segments';
import { fill } from '@/lib/format';
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
import { PlanSection } from '@/components/PlanSection';
import { Faq } from '@/components/Faq';
import { FinalCta } from '@/components/FinalCta';
import { UpdatedDate } from '@/components/UpdatedDate';
import { JsonLd } from '@/components/JsonLd';

type Props = { params: Promise<{ segment: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return segments.map((s) => ({ segment: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = getSegment((await params).segment);
  if (!s) return {};
  return pageMeta({ title: s.title, description: fill(s.metaDescription), path: routes.segment(s.slug) });
}

export default async function SegmentPage({ params }: Props) {
  const s = getSegment((await params).segment);
  if (!s) notFound();
  const path = routes.segment(s.slug);
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: s.name, path },
  ];
  const related = s.related.map(getSegment).filter((x) => x !== undefined);

  return (
    <>
      <section data-hero className="on-dark bg-midnight text-white">
        <div className="wrap pt-8 pb-16 md:pt-10 md:pb-20">
          <Breadcrumbs items={crumbs} dark />
          <div className="flex flex-wrap items-center gap-12">
            <div className="flex min-w-0 flex-[1_1_480px] flex-col gap-5">
              <p className="eyebrow m-0 text-amber">{s.eyebrow}</p>
              <h1 className="m-0 text-[38px] leading-[1.04] font-bold tracking-display md:text-[56px]">{s.h1}</h1>
              <p className="m-0 text-lg leading-relaxed text-fog">{fill(s.intro)}</p>
              <div className="flex flex-wrap gap-3">
                <BookLink position="hero" className={btn.primary} />
                <CallLink position="hero" className={btn.outlineDark} />
              </div>
            </div>
            <div className="min-w-0 flex-[1_1_400px]">
              <CallLog log={s.callLog} />
            </div>
          </div>
        </div>
      </section>

      <section className="wrap pt-14 pb-4 md:pt-[72px]">
        <div className="max-w-[860px]">
          <AnswerBlock heading={s.answerHeading} text={s.answer} />
          <UpdatedDate className="mt-4" />
        </div>
      </section>

      <section aria-labelledby="problems-h" className="wrap py-14 md:py-[72px]">
        <SectionHead id="problems-h" title={s.problemsHeading} className="mb-8" />
        <CardGrid cards={s.problems} />
      </section>

      <section aria-labelledby="impl-h" className="border-y border-line bg-white">
        <div className="wrap py-14 md:py-[72px]">
          <SectionHead id="impl-h" title={s.implicationsHeading} className="mb-8" />
          <CardGrid cards={s.implications} variant="outline" />
        </div>
      </section>

      <section aria-labelledby="payoff-h" className="wrap py-14 md:py-[72px]">
        <SectionHead id="payoff-h" title={s.needPayoffHeading} intro={s.needPayoffIntro} className="mb-8" />
        <CardGrid cards={s.needPayoff} />
      </section>

      <section aria-labelledby="calls-h" className="border-y border-line bg-white">
        <div className="wrap py-14 md:py-[72px]">
          <SectionHead id="calls-h" title={s.callsHeading} className="mb-8" />
          <CardGrid cards={s.calls} variant="outline" cols={s.calls.length === 4 ? 2 : 3} />
        </div>
      </section>

      {s.specifics.map((sp, i) => (
        <section key={sp.heading} aria-labelledby={`spec-${i}`} className={i % 2 ? 'border-y border-line bg-white' : ''}>
          <div className="wrap grid grid-cols-1 gap-10 py-14 md:py-[72px] lg:grid-cols-[1fr_1.2fr]">
            <div className="min-w-0">
              <SectionHead id={`spec-${i}`} title={sp.heading} intro={sp.intro} />
              {sp.note && <p className="mt-4 mb-0 text-sm text-slate">{sp.note}</p>}
            </div>
            <div className="flex min-w-0 flex-col gap-4">
              {sp.items.length > 0 && (
                <ul className="m-0 flex list-none flex-col gap-3 p-0" {...(sp.gateOk ? { 'data-gate-ok': true } : {})}>
                  {sp.items.map((it) => (
                    <li key={it} className="rounded-[16px] border border-line bg-white p-5 text-base leading-relaxed">
                      {fill(it)}
                    </li>
                  ))}
                </ul>
              )}
              {sp.examples && (
                <ul className="m-0 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2">
                  {sp.examples.map((e) => (
                    <li key={e.name} className="on-dark rounded-[16px] bg-midnight p-5 text-white">
                      <p className="mono m-0 text-xs tracking-eyebrow text-amber uppercase">{e.name}</p>
                      <p className="mt-2 mb-0 text-fog">{e.text}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>
      ))}

      <PlanSection />

      <section id="faq" aria-labelledby="faq-h" className="wrap py-14 md:py-[72px]">
        <SectionHead id="faq-h" title={s.faqHeading} className="mb-6" />
        <Faq items={s.faqs} />
        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="m-0 text-2xl font-semibold">Other property types</h2>
            <ul className="mt-4 mb-0 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={routes.segment(r.slug)}
                    className="flex min-h-12 flex-col gap-1 rounded-[16px] border border-line bg-white p-5 text-midnight no-underline hover:border-midnight hover:text-midnight"
                  >
                    <strong className="font-display text-lg">{r.name}</strong>
                    <span className="text-[15px] text-slate">{r.cardLine}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <FinalCta heading={s.ctaHeading} position="final" />

      <JsonLd
        data={[
          webPage({ path, name: s.title, description: fill(s.metaDescription) }),
          service({ path, name: `${site.name} ${s.primary}`, description: fill(s.answer), audience: s.audience }),
          faqPage(s.faqs),
          breadcrumbs(crumbs),
        ]}
      />
    </>
  );
}
