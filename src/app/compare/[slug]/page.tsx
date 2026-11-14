import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { site } from '@/site.config';
import { comparePages, getComparePage } from '@/content/compare';
import { getCompetitor } from '@/content/competitors';
import { fill } from '@/lib/format';
import { pageMeta } from '@/lib/seo';
import { btn } from '@/lib/ui';
import { builtPages, routes } from '@/lib/routes';
import { breadcrumbs, faqPage, webPage } from '@/lib/schema';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { BookLink } from '@/components/BookLink';
import { CallLink } from '@/components/CallLink';
import { AnswerBlock } from '@/components/AnswerBlock';
import { SectionHead } from '@/components/SectionHead';
import { BetterChoice } from '@/components/BetterChoice';
import { Faq } from '@/components/Faq';
import { FinalCta } from '@/components/FinalCta';
import { UpdatedDate } from '@/components/UpdatedDate';
import { JsonLd } from '@/components/JsonLd';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return comparePages.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = getComparePage((await params).slug);
  if (!c) return {};
  return pageMeta({ title: fill(c.title), description: fill(c.metaDescription), path: routes.compare(c.slug) });
}

export default async function ComparePage({ params }: Props) {
  const c = getComparePage((await params).slug);
  if (!c) notFound();
  const comp = getCompetitor(c.competitorId);
  const path = routes.compare(c.slug);
  const crumbs = [
    { name: 'Home', path: '/' },
    ...(builtPages.hub ? [{ name: 'Compare', path: routes.hub }] : []),
    { name: comp.short, path },
  ];

  return (
    <>
      <section data-hero className="wrap pt-8 pb-10 md:pt-12">
        <Breadcrumbs items={crumbs} />
        <p className="eyebrow text-amber-deep">Compare · checked {comp.checked}</p>
        <h1 className="m-0 max-w-[900px] text-[36px] leading-[1.05] font-bold tracking-display md:text-[52px]">{c.h1}</h1>
        <UpdatedDate className="mt-4" />
        <div className="mt-8 max-w-[900px]">
          <AnswerBlock heading="The short answer" text={c.answer} label={`Checked ${comp.checked}`} gateOk />
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <BookLink position="hero" className={btn.primary} />
          <CallLink position="hero" className={btn.outline} />
        </div>
      </section>

      <section aria-labelledby="table-h" className="border-y border-line bg-white">
        <div className="wrap py-14 md:py-[72px]">
          <SectionHead id="table-h" title="How do they compare side by side?" className="mb-8" />
          <div className="scroll-x rounded-[20px] border border-line" role="region" aria-label={`${site.name} and ${comp.name} compared`} tabIndex={0}>
            <table className="w-full min-w-[640px] text-left text-[15px]" data-gate-ok>
              <caption className="sr-only">
                {site.name} and {comp.name} compared, checked {comp.checked}
              </caption>
              <thead>
                <tr className="border-b border-line bg-daylight">
                  <td className="px-4 py-3" />
                  <th scope="col" className="px-4 py-3 font-semibold">{site.name}</th>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    <a href={comp.url} rel="noopener">{comp.name}</a>
                  </th>
                </tr>
              </thead>
              <tbody>
                {c.rows.map((r) => (
                  <tr key={r.label} className="border-b border-line last:border-0">
                    <th scope="row" className="w-[22%] px-4 py-3 align-top font-semibold">{r.label}</th>
                    <td className="px-4 py-3 align-top">{fill(r.mae)}</td>
                    <td className="px-4 py-3 align-top">{fill(r.them)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 mb-0 text-sm text-slate">
            {fill(c.sourceNote)} Sources:{' '}
            {[{ label: `${comp.name} page`, url: comp.url }, ...(comp.alsoUrls ?? [])].map((u, i) => (
              <span key={u.url}>
                {i > 0 && ', '}
                <a href={u.url} rel="noopener">{u.label}</a>
              </span>
            ))}
            . Prices change, so follow the links for today&apos;s figures.
          </p>
        </div>
      </section>

      <section aria-labelledby="pick-h" className="wrap py-14 md:py-[72px]">
        <SectionHead id="pick-h" title="Which should you pick?" className="mb-8" />
        <BetterChoice name={comp.short} them={c.theyBetter} mae={c.maeBetter} />
      </section>

      <section aria-labelledby="cost-h" className="border-y border-line bg-white">
        <div className="wrap max-w-[900px] py-14 md:py-[72px]">
          <h2 id="cost-h" className="m-0 text-[30px] leading-tight font-bold md:text-[40px]">{fill(c.costHeading)}</h2>
          <p className="mt-4 mb-0 text-lg leading-relaxed text-slate">{fill(c.cost)}</p>
          {builtPages.pricing && (
            <p className="mt-4 mb-0">
              <Link href={routes.pricing} className="font-semibold">See full MaeDay pricing</Link>
              {builtPages.hub && (
                <>
                  {' · '}
                  <Link href={routes.hub} className="font-semibold">See every service compared</Link>
                </>
              )}
            </p>
          )}
        </div>
      </section>

      <section id="faq" aria-labelledby="faq-h" className="wrap py-14 md:py-[72px]">
        <SectionHead id="faq-h" title="Common questions" className="mb-6" />
        <Faq items={c.faqs} />
      </section>

      <FinalCta heading={c.ctaHeading} withCall position="final" />

      <JsonLd
        data={[
          webPage({ path, name: fill(c.title), description: fill(c.metaDescription) }),
          faqPage(c.faqs),
          breadcrumbs(crumbs),
        ]}
      />
    </>
  );
}
