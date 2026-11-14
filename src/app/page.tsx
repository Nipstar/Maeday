import type { Metadata } from 'next';
import { site } from '@/site.config';
import { fill } from '@/lib/format';
import { pageMeta } from '@/lib/seo';
import { btn } from '@/lib/ui';
import { BookLink } from '@/components/BookLink';
import { CallLink, DemoNumber } from '@/components/CallLink';
import { AnswerBlock } from '@/components/AnswerBlock';
import { UpdatedDate } from '@/components/UpdatedDate';

export const metadata: Metadata = pageMeta({
  title: 'Property Management Answering Service | MaeDay',
  description: fill(
    'After-hours answering for property managers. Emergencies reach your on-call tech, with retries and backups. From {starter.price} a month for {starter.minutes} minutes.',
  ),
  path: '/',
});

/** Phase 1 placeholder: replaced by the full home page in Phase 2. */
export default function Home() {
  return (
    <>
    <section data-hero className="on-dark bg-midnight pt-14 pb-20 text-white">
      <div className="wrap max-w-[760px]">
        <p className="eyebrow text-amber">Property management answering service</p>
        <h1 className="m-0 text-[40px] leading-[1.04] font-bold tracking-display md:text-[60px]">
          After-hours answering that reaches your on-call tech.
        </h1>
        <p className="mt-5 text-[19px] text-fog">{site.tagline}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <BookLink position="hero" className={btn.primary} />
          <CallLink position="hero" className={btn.outlineDark} />
        </div>
        <DemoNumber className="mt-4 mb-0 hidden text-[15px] text-mist md:block" />
      </div>
    </section>
    <section className="py-14">
      <div className="wrap max-w-[860px]">
        <AnswerBlock
          heading="What is a property management answering service?"
          text="It answers your office line when nobody can: nights, weekends and holidays. A good one sorts emergencies from everything else, reaches the right on-call person fast, and keeps a record of every call. MaeDay does this with Mae, an AI voice agent set up with your own emergency list and on-call ladder, for {starter.price} a month."
        />
        <UpdatedDate className="mt-6" />
      </div>
    </section>
    </>
  );
}
