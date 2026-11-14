import Link from '@/components/Link';
import type { Metadata } from 'next';
import { btn } from '@/lib/ui';
import { BookLink } from '@/components/BookLink';

export const metadata: Metadata = { title: { absolute: 'Page not found | MaeDay' }, robots: { index: false } };

export default function NotFound() {
  return (
    <section data-hero className="py-24 md:py-32">
      <div className="wrap max-w-[720px] text-center">
        <p className="eyebrow text-amber-deep">404</p>
        <h1 className="m-0 text-[40px] leading-[1.06] font-bold tracking-display md:text-[56px]">This page isn&apos;t here.</h1>
        <p className="mt-5 mb-0 text-xl text-slate">The link may be old or mistyped. These will get you back on track.</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link href="/" className={btn.outline}>
            Go to the home page
          </Link>
          <BookLink position="404" className={btn.primary} />
        </div>
      </div>
    </section>
  );
}
