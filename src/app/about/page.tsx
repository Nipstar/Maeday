import type { Metadata } from 'next';
import { isPlaceholder, site } from '@/site.config';
import { about } from '@/content/about';
import { fill } from '@/lib/format';
import { pageMeta } from '@/lib/seo';
import { routes } from '@/lib/routes';
import { aboutPage, breadcrumbs } from '@/lib/schema';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { AnswerBlock } from '@/components/AnswerBlock';
import { FinalCta } from '@/components/FinalCta';
import { UpdatedDate } from '@/components/UpdatedDate';
import { JsonLd } from '@/components/JsonLd';

const path = routes.about;
const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'About', path },
];

export const metadata: Metadata = pageMeta({ title: about.title, description: fill(about.metaDescription), path });

export default function AboutPage() {
  return (
    <>
      <section data-hero className="wrap pt-8 pb-10 md:pt-12">
        <Breadcrumbs items={crumbs} />
        <p className="eyebrow text-amber-deep">{about.eyebrow}</p>
        <h1 className="m-0 text-[38px] leading-[1.05] font-bold tracking-display md:text-[56px]">{about.h1}</h1>
        <UpdatedDate className="mt-4" />
      </section>
      <section className="wrap pb-6">
        <div className="max-w-[860px]">
          <AnswerBlock heading={about.answer.heading} text={about.answer.text} />
        </div>
      </section>
      <section className="wrap py-12 md:py-16">
        <div className="flex max-w-[760px] flex-col gap-10">
          {about.sections.map((s) => (
            <div key={s.heading}>
              <h2 className="m-0 text-[28px] leading-tight font-bold md:text-[34px]">{s.heading}</h2>
              {s.text.map((t) => (
                <p key={t} className="mt-3 mb-0 text-lg leading-relaxed text-slate">
                  {fill(t)}
                </p>
              ))}
            </div>
          ))}
          <p className="m-0 text-[15px] text-slate">
            {site.name} is a service of {site.owner}. {[site.address, site.phone].filter((v) => !isPlaceholder(v)).map((v) => `${v} · `)}{site.email}
          </p>
        </div>
      </section>
      <FinalCta position="final" />
      <JsonLd data={[aboutPage({ path, description: fill(about.metaDescription) }), breadcrumbs(crumbs)]} />
    </>
  );
}
