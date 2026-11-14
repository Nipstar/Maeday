import Link from '@/components/Link';
import { Logo } from './Logo';
import { BookLink } from './BookLink';
import { segments } from '@/content/segments';
import { comparePages } from '@/content/compare';
import { builtPages, routes } from '@/lib/routes';
import { btn } from '@/lib/ui';

const navLink = 'text-chalk no-underline hover:text-white';

function Chevron() {
  return (
    <svg className="menu-chevron transition-transform" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

type Item = { label: string; href: string };

function Menu({ label, items }: { label: string; items: Item[] }) {
  return (
    <details className="menu relative">
      <summary className={`${navLink} flex min-h-11 items-center gap-1.5`}>
        {label} <Chevron />
      </summary>
      <ul className="absolute left-1/2 top-full z-30 m-0 w-72 -translate-x-1/2 list-none rounded-[16px] border border-line bg-white p-2 shadow-[0_20px_40px_-20px_rgba(16,24,43,0.35)]">
        {items.map((i) => (
          <li key={i.href}>
            <Link href={i.href} className="block rounded-[10px] px-3.5 py-2.5 text-midnight no-underline hover:bg-daylight hover:text-amber-deep">
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </details>
  );
}

/** Dropdowns and the mobile menu use native <details>: no JS, keyboard accessible. */
export function Header() {
  const who: Item[] = segments.map((s) => ({ label: s.name, href: routes.segment(s.slug) }));
  const compare: Item[] = [
    ...(builtPages.hub ? [{ label: 'Best answering services compared', href: routes.hub }] : []),
    ...comparePages.map((c) => ({ label: c.navLabel, href: routes.compare(c.slug) })),
  ];
  const main: Item[] = [
    ...(builtPages.service ? [{ label: 'How it works', href: routes.service }] : [{ label: 'How it works', href: '/#how' }]),
    ...(builtPages.pricing ? [{ label: 'Pricing', href: routes.pricing }] : []),
  ];

  return (
    <header className="on-dark relative z-20 bg-midnight text-white">
      <div className="wrap flex min-h-[74px] items-center justify-between gap-4 py-3">
        <Logo />
        <nav aria-label="Main" className="hidden items-center gap-6 text-[15px] lg:flex">
          {main.map((i) => (
            <Link key={i.href} href={i.href} className={navLink}>
              {i.label}
            </Link>
          ))}
          {who.length > 0 && <Menu label="Who it's for" items={who} />}
          {compare.length > 0 && <Menu label="Compare" items={compare} />}
        </nav>
        <div className="flex items-center gap-2">
          <BookLink position="header" className={`${btn.small} max-[400px]:hidden`} />
          <details className="menu lg:hidden">
            <summary className="flex size-12 items-center justify-center rounded-[12px] border border-night text-white" aria-label="Menu">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </summary>
            <nav aria-label="Mobile" className="absolute inset-x-0 top-full z-30 border-t border-night bg-midnight px-4 pt-2 pb-6 text-[17px]">
              <ul className="m-0 flex list-none flex-col p-0">
                {main.map((i) => (
                  <li key={i.href}>
                    <Link href={i.href} className={`${navLink} block py-3`}>
                      {i.label}
                    </Link>
                  </li>
                ))}
              </ul>
              {who.length > 0 && (
                <>
                  <p className="eyebrow mt-4 text-mist">Who it&apos;s for</p>
                  <ul className="m-0 list-none p-0">
                    {who.map((i) => (
                      <li key={i.href}>
                        <Link href={i.href} className={`${navLink} block py-2.5 text-base`}>
                          {i.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {compare.length > 0 && (
                <>
                  <p className="eyebrow mt-4 text-mist">Compare</p>
                  <ul className="m-0 list-none p-0">
                    {compare.map((i) => (
                      <li key={i.href}>
                        <Link href={i.href} className={`${navLink} block py-2.5 text-base`}>
                          {i.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              <BookLink position="mobile-menu" className={`${btn.primary} mt-5 w-full`} />
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
