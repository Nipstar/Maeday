import type { Metadata } from 'next';
import { site } from '@/site.config';
import { emergencyGuide as g, guides } from '@/content/guides';
import { fill } from '@/lib/format';
import { Rich } from '@/lib/rich';
import { pageMeta } from '@/lib/seo';
import { routes } from '@/lib/routes';
import { article, breadcrumbs, faqPage } from '@/lib/schema';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { AnswerBlock } from '@/components/AnswerBlock';
import { SectionHead } from '@/components/SectionHead';
import { CopyList } from '@/components/CopyList';
import { Faq } from '@/components/Faq';
import { FinalCta } from '@/components/FinalCta';
import { UpdatedDate } from '@/components/UpdatedDate';
import { JsonLd } from '@/components/JsonLd';

const meta = guides.find((x) => x.slug === 'what-counts-as-a-maintenance-emergency')!;
const path = routes.guide(meta.slug);
const crumbs = [
  { name: 'Home', path: '/' },
  { name: meta.navLabel, path },
];
const verdictClass: Record<string, string> = {
  Emergency: 'bg-signal text-white',
  '911 first': 'bg-midnight text-white',
  'Your call': 'bg-dusk text-midnight',
  'Next business day': 'bg-sand text-slate',
};

export const metadata: Metadata = pageMeta({ title: meta.title, description: fill(meta.metaDescription), path });

export default function GuidePage() {
  const sourceKeys = [...new Set([...g.why.sources, ...g.timelines.items.map((i) => i.source)])];
  const sources = sourceKeys.map((k) => site.sources[k]);
  const listText = [
    `${g.list.caption}`,
    ...g.list.rows.map((r) => `${r.problem}: ${r.verdict}. ${r.rule}`),
    g.list.note,
  ].join('\n');

  return (
    <article>
      <header data-hero className="wrap pt-8 pb-8 md:pt-12">
        <Breadcrumbs items={crumbs} />
        <p className="eyebrow text-amber-deep">{g.eyebrow}</p>
        <h1 className="m-0 max-w-[900px] text-[38px] leading-[1.05] font-bold tracking-display md:text-[56px]">{meta.h1}</h1>
        <p className="mt-4 mb-0 text-[15px] text-slate">
          By {site.founder}, {site.owner}. Published <time dateTime={meta.publishedIso}>{meta.published}</time>.
        </p>
        <UpdatedDate className="mt-1" />
      </header>

      <section className="wrap pb-6">
        <div className="max-w-[860px]">
          <AnswerBlock heading="The short answer" text={meta.answer} />
        </div>
      </section>

      <section aria-labelledby="why-h" className="wrap py-12 md:py-16">
        <div className="max-w-[760px]">
          <SectionHead id="why-h" title={g.why.heading} />
          {g.why.paragraphs.map((p) => (
            <p key={p} className="mt-4 mb-0 text-lg leading-relaxed text-slate">
              {fill(p)}
            </p>
          ))}
          <p className="mt-4 mb-0 text-[13px] text-slate">
            Sources:{' '}
            {g.why.sources.map((k, i) => (
              <span key={k}>
                {i > 0 && '; '}
                <a href={site.sources[k].url} rel="noopener">{site.sources[k].label}</a>, checked {site.sources[k].checked}
              </span>
            ))}
          </p>
        </div>
      </section>

      <section aria-labelledby="list-h" className="border-y border-line bg-white">
        <div className="wrap py-12 md:py-16">
          <SectionHead id="list-h" title={g.list.heading} intro={g.list.intro} className="mb-6" />
          <CopyList text={listText} />
          <div className="scroll-x mt-6 rounded-[20px] border border-line" role="region" aria-label={g.list.caption} tabIndex={0}>
            <table className="w-full min-w-[640px] text-left text-[15px]">
              <caption className="sr-only">{g.list.caption}</caption>
              <thead>
                <tr className="border-b border-line bg-daylight">
                  <th scope="col" className="px-4 py-3 font-semibold">Problem</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Treat as</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Typical rule</th>
                </tr>
              </thead>
              <tbody>
                {g.list.rows.map((r) => (
                  <tr key={r.problem} className="border-b border-line align-top last:border-0">
                    <th scope="row" className="px-4 py-3 font-semibold">{r.problem}</th>
                    <td className="px-4 py-3">
                      <span className={`inline-block rounded-[6px] px-2.5 py-0.5 text-[13px] font-semibold whitespace-nowrap ${verdictClass[r.verdict]}`}>{r.verdict}</span>
                    </td>
                    <td className="px-4 py-3 text-slate">{r.rule}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 mb-0 text-sm text-slate">{g.list.note}</p>
        </div>
      </section>

      <section aria-labelledby="time-h" className="wrap py-12 md:py-16">
        <SectionHead id="time-h" title={g.timelines.heading} intro={g.timelines.intro} className="mb-6" />
        <ul className="m-0 grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-2">
          {g.timelines.items.map((t) => {
            const src = site.sources[t.source];
            return (
              <li key={t.place} className="flex flex-col gap-2 rounded-[20px] border border-line bg-white p-6">
                <h3 className="m-0 text-[21px] font-semibold">{t.place}</h3>
                <p className="m-0 leading-relaxed text-slate">{fill(t.text)}</p>
                <p className="mt-auto mb-0 pt-1 text-[13px] text-slate">
                  Source: <a href={src.url} rel="noopener">{src.label}</a>, checked {src.checked}
                </p>
              </li>
            );
          })}
        </ul>
        <p className="mt-5 mb-0 rounded-[12px] bg-sand px-4 py-3 text-[15px] text-midnight">{g.timelines.note}</p>
      </section>

      <section aria-labelledby="night-h" className="on-dark bg-midnight text-white">
        <div className="wrap max-w-[860px] py-12 md:py-16">
          <h2 id="night-h" className="m-0 text-[30px] leading-tight font-bold md:text-[40px]">{g.atNight.heading}</h2>
          <p className="mt-4 mb-0 text-lg leading-relaxed text-fog">
            <Rich text={g.atNight.text} className="text-amber underline hover:text-white" />
          </p>
        </div>
      </section>

      <section id="faq" aria-labelledby="faq-h" className="wrap py-12 md:py-16">
        <SectionHead id="faq-h" title={g.faqHeading} className="mb-6" />
        <Faq items={g.faqs} />
      </section>

      <section aria-labelledby="sources-h" className="wrap pb-14">
        <h2 id="sources-h" className="m-0 text-2xl font-semibold">Sources</h2>
        <ul className="mt-3 mb-0 flex flex-col gap-1.5 pl-5 text-[15px] text-slate">
          {sources.map((s) => (
            <li key={s.url}>
              <a href={s.url} rel="noopener">{s.label}</a>, checked {s.checked}
            </li>
          ))}
        </ul>
      </section>

      <FinalCta position="final" />

      <JsonLd
        data={[
          article({ path, headline: meta.h1, description: fill(meta.metaDescription), published: meta.publishedIso, sources }),
          faqPage(g.faqs),
          breadcrumbs(crumbs),
        ]}
      />
    </article>
  );
}
