import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/site.config';
import { hub } from '@/content/compare';
import { getCompetitor } from '@/content/competitors';
import { fill, tierSummary } from '@/lib/format';
import { pageMeta } from '@/lib/seo';
import { routes } from '@/lib/routes';
import { breadcrumbs, faqPage, webPage } from '@/lib/schema';
import { maeSummary } from '@/components/CompareTable';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { AnswerBlock } from '@/components/AnswerBlock';
import { SectionHead } from '@/components/SectionHead';
import { CardGrid } from '@/components/Cards';
import { Faq } from '@/components/Faq';
import { FinalCta } from '@/components/FinalCta';
import { UpdatedDate } from '@/components/UpdatedDate';
import { JsonLd } from '@/components/JsonLd';

const path = routes.hub;
const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Compare', path },
];

export const metadata: Metadata = pageMeta({ title: hub.title, description: fill(hub.metaDescription), path });

const cols = [
  { key: 'billing', label: 'Billing unit' },
  { key: 'ladder', label: 'Emergency ladder' },
  { key: 'perProperty', label: 'Per-property rules' },
  { key: 'leasing', label: 'Leasing calls' },
  { key: 'owner', label: 'Owner calls' },
  { key: 'software', label: 'Software required' },
] as const;

export default function HubPage() {
  return (
    <>
      <section data-hero className="wrap pt-8 pb-10 md:pt-12">
        <Breadcrumbs items={crumbs} />
        <p className="eyebrow text-amber-deep">Compare · prices checked {site.pricesChecked}</p>
        <h1 className="m-0 max-w-[900px] text-[36px] leading-[1.05] font-bold tracking-display md:text-[52px]">{hub.h1}</h1>
        <p className="mt-5 mb-0 max-w-[820px] rounded-[16px] border border-amber bg-white p-5 text-base leading-relaxed" data-disclosure>
          <strong>Disclosure:</strong> {hub.disclosure}
        </p>
        <UpdatedDate className="mt-4" />
        <div className="mt-8 max-w-[900px]">
          <AnswerBlock heading={hub.answer.heading} text={hub.answer.text} gateOk />
        </div>
      </section>

      <section aria-labelledby="criteria-h" className="border-y border-line bg-white">
        <div className="wrap py-14 md:py-[72px]">
          <SectionHead id="criteria-h" title={hub.criteriaHeading} intro={hub.criteriaIntro} className="mb-8" />
          <CardGrid cards={hub.criteria} variant="outline" cols={4} />
        </div>
      </section>

      <section aria-labelledby="hub-table-h" className="wrap py-14 md:py-[72px]">
        <SectionHead id="hub-table-h" title={hub.tableHeading} intro="Every service on the same criteria. Other services are described only from their own websites." className="mb-8" />
        <div className="scroll-x rounded-[20px] border border-line bg-white" role="region" aria-label="Answering services compared" tabIndex={0}>
          <table className="w-full min-w-[1080px] text-left text-[14px]" data-gate-ok>
            <caption className="sr-only">Property management answering services compared, prices checked {site.pricesChecked}</caption>
            <thead>
              <tr className="border-b border-line bg-daylight">
                <th scope="col" className="px-3 py-3 font-semibold">Service</th>
                {cols.map((c) => (
                  <th key={c.key} scope="col" className="px-3 py-3 font-semibold">{c.label}</th>
                ))}
                <th scope="col" className="px-3 py-3 font-semibold">Published price</th>
              </tr>
            </thead>
            <tbody>
              {hub.rows.map((r) => {
                const isMae = r.id === 'maeday';
                const comp = isMae ? undefined : getCompetitor(r.id);
                return (
                  <tr key={r.id} className={`border-b border-line align-top last:border-0 ${isMae ? 'bg-dusk/60' : ''}`}>
                    <th scope="row" className="px-3 py-3 font-semibold">
                      {comp ? (
                        <>
                          <a href={comp.url} rel="noopener">{comp.name}</a>
                          <span className="mt-1 block text-[12px] font-normal text-slate">Checked {comp.checked}</span>
                          {r.compareSlug && (
                            <Link href={routes.compare(r.compareSlug)} className="mt-1 block text-[13px] font-normal">
                              Full comparison
                            </Link>
                          )}
                        </>
                      ) : (
                        <>
                          {site.name}
                          <span className="mt-1 block text-[12px] font-normal text-slate">Ours</span>
                        </>
                      )}
                    </th>
                    {cols.map((c) => (
                      <td key={c.key} className="px-3 py-3">{r[c.key]}</td>
                    ))}
                    <td className="px-3 py-3">{comp ? tierSummary(comp, { short: true }) : maeSummary()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section id="faq" aria-labelledby="faq-h" className="border-t border-line bg-white">
        <div className="wrap py-14 md:py-[72px]">
          <SectionHead id="faq-h" title="Questions about this comparison" className="mb-6" />
          <Faq items={hub.faqs} />
        </div>
      </section>

      <FinalCta position="final" withCall />

      <JsonLd data={[webPage({ path, name: hub.title, description: fill(hub.metaDescription) }), faqPage(hub.faqs), breadcrumbs(crumbs)]} />
    </>
  );
}
