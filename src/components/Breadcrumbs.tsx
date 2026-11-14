import Link from '@/components/Link';

/** Visible breadcrumb. The BreadcrumbList JSON-LD is built from the same items on each page. */
export function Breadcrumbs({ items, dark = false }: { items: { name: string; path: string }[]; dark?: boolean }) {
  const link = dark ? 'text-fog hover:text-white' : 'text-slate';
  return (
    <nav aria-label="Breadcrumb" className={`mb-6 text-sm ${dark ? 'text-mist' : 'text-slate'}`}>
      <ol className="m-0 flex list-none flex-wrap gap-1.5 p-0">
        {items.map((it, i) => (
          <li key={it.path} className="flex gap-1.5">
            {i > 0 && <span aria-hidden="true">/</span>}
            {i < items.length - 1 ? (
              <Link href={it.path} className={link}>
                {it.name}
              </Link>
            ) : (
              <span aria-current="page">{it.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
