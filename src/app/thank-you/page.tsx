import type { Metadata } from 'next';
import { site } from '@/site.config';
import { pageMeta } from '@/lib/seo';
import { btn } from '@/lib/ui';
import { routes } from '@/lib/routes';
import { BookLink } from '@/components/BookLink';
import { PurchaseComplete } from '@/components/PurchaseComplete';

export const metadata: Metadata = pageMeta({
  title: 'Thank you | MaeDay',
  description: 'Your MaeDay Starter order is in. Next: a setup call to build your emergency list and on-call ladder.',
  path: routes.thankYou,
  noindex: true,
});

export default function ThankYou() {
  return (
    <section data-hero className="py-20 md:py-28">
      <div className="wrap max-w-[760px]">
        <p className="eyebrow text-amber-deep">Order received</p>
        <h1 className="m-0 text-[38px] leading-[1.05] font-bold tracking-display md:text-[52px]">Thank you. Next, your setup call.</h1>
        <ol className="mt-8 mb-0 flex flex-col gap-4 pl-6 text-lg leading-relaxed text-slate">
          <li>Book your {site.setupCallMinutes}-minute setup call below. We go through your properties, your emergency list and who is on call.</li>
          <li>We build and test your line. That takes {site.goLive}.</li>
          <li>You forward your after-hours calls to your new number, and Mae starts answering.</li>
        </ol>
        <div className="mt-9 flex flex-wrap gap-3">
          <BookLink position="thank-you" className={btn.primary} />
        </div>
        <p className="mt-6 mb-0 text-[15px] text-slate">Questions? Email {site.email}.</p>
        <PurchaseComplete />
      </div>
    </section>
  );
}
