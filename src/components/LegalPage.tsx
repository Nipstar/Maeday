import type { ReactNode } from 'react';
import { UpdatedDate } from './UpdatedDate';

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section data-hero className="py-16 md:py-24">
      <div className="wrap max-w-[760px] [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-bold [&_p]:text-slate">
        <h1 className="m-0 text-[40px] leading-[1.06] font-bold tracking-display md:text-[52px]">{title}</h1>
        <UpdatedDate className="mt-4" />
        {children}
      </div>
    </section>
  );
}
