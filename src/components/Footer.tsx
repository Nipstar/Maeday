import Link from '@/components/Link';
import { isPlaceholder, site } from '@/site.config';
import { segments } from '@/content/segments';
import { comparePages } from '@/content/compare';
import { guides } from '@/content/guides';
import { builtPages, routes } from '@/lib/routes';

const link = 'text-fog no-underline hover:text-white';

export function Footer() {
  const email = site.email;
  return (
    <footer className="on-dark bg-midnight pt-14 pb-28 text-[15px] text-fog md:pb-10">
      <div className="wrap">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-8">
          <div>
            <p className="m-0 font-display text-2xl font-bold tracking-head text-white">
              Mae<span className="text-amber">Day</span>
            </p>
            <p className="mt-2 mb-0 text-fog">{site.descriptor}.</p>
            <p className="mt-4 mb-0 text-sm text-mist">
              {site.name} is a service of {site.owner}. {site.address} · {site.phone} ·{' '}
              {isPlaceholder(email) ? <span>{email}</span> : <a href={`mailto:${email}`} className={link}>{email}</a>}
            </p>
            <p className="mt-4 mb-0 text-sm text-mist">
              Only need a general receptionist? See the{' '}
              <a href={site.sister.url} className="text-fog underline underline-offset-2 hover:text-white">
                {site.sister.anchor}
              </a>
              .
            </p>
          </div>
          <nav aria-label="Service" className="flex flex-col gap-2.5">
            <span className="font-semibold text-white">Service</span>
            <Link href={builtPages.service ? routes.service : '/#how'} className={link}>
              How it works
            </Link>
            {builtPages.pricing && <Link href={routes.pricing} className={link}>Pricing</Link>}
            {guides.map((g) => (
              <Link key={g.slug} href={routes.guide(g.slug)} className={link}>
                {g.navLabel}
              </Link>
            ))}
            {builtPages.about && <Link href={routes.about} className={link}>About</Link>}
          </nav>
          {segments.length > 0 && (
            <nav aria-label="Who it's for" className="flex flex-col gap-2.5">
              <span className="font-semibold text-white">Who it&apos;s for</span>
              {segments.map((s) => (
                <Link key={s.slug} href={routes.segment(s.slug)} className={link}>
                  {s.name}
                </Link>
              ))}
            </nav>
          )}
          {(comparePages.length > 0 || builtPages.hub) && (
            <nav aria-label="Compare" className="flex flex-col gap-2.5">
              <span className="font-semibold text-white">Compare</span>
              {builtPages.hub && <Link href={routes.hub} className={link}>All services compared</Link>}
              {comparePages.map((c) => (
                <Link key={c.slug} href={routes.compare(c.slug)} className={link}>
                  {c.navLabel}
                </Link>
              ))}
            </nav>
          )}
        </div>
        <div className="mt-12 flex flex-wrap justify-between gap-3 border-t border-night pt-6 text-[13px] text-mist">
          <span>
            © {site.copyrightYear} {site.owner}. {site.tagline}
          </span>
          {builtPages.legal && (
            <span className="flex flex-wrap gap-x-3">
              <Link href={routes.privacy} className="text-mist hover:text-white">Privacy</Link>
              <Link href={routes.terms} className="text-mist hover:text-white">Terms</Link>
            </span>
          )}
        </div>
      </div>
    </footer>
  );
}
