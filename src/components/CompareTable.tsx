import { site } from '@/site.config';
import { competitors, type Competitor } from '@/content/competitors';
import { money, num, tierSummary } from '@/lib/format';

/** MaeDay's own row, from config. */
export function maeSummary(): string {
  return site.plans.map((p, i) => `${money(p.price)} for ${num(p.minutes)}${i === 0 ? ' min' : ''}`).join('; ');
}

/**
 * Dated price table from competitors.ts. Every vendor name links to its own page.
 * Marked data-gate-ok: competitor facts may name software or features MaeDay does not offer yet.
 */
export function CompareTable({ ids, caption }: { ids: string[]; caption: string }) {
  const rows = ids.map((id) => competitors.find((c) => c.id === id)).filter((c): c is Competitor => !!c);
  return (
    <div className="scroll-x rounded-[20px] border border-line bg-white" role="region" aria-label={caption} tabIndex={0}>
      <table className="w-full min-w-[720px] text-left text-[15px]" data-gate-ok>
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-line bg-daylight">
            <th scope="col" className="px-4 py-3 font-semibold">Service</th>
            <th scope="col" className="px-4 py-3 font-semibold">Type</th>
            <th scope="col" className="px-4 py-3 font-semibold">Published price</th>
            <th scope="col" className="px-4 py-3 font-semibold">Billed by</th>
            <th scope="col" className="px-4 py-3 font-semibold">Checked</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-line bg-dusk/60">
            <th scope="row" className="px-4 py-3 font-semibold">{site.name}</th>
            <td className="px-4 py-3">AI voice agent, property managers only</td>
            <td className="px-4 py-3">{maeSummary()}</td>
            <td className="px-4 py-3">The second</td>
            <td className="px-4 py-3">{site.pricesChecked}</td>
          </tr>
          {rows.map((c) => (
            <tr key={c.id} className="border-b border-line last:border-0">
              <th scope="row" className="px-4 py-3 font-semibold">
                <a href={c.url} rel="noopener">
                  {c.name}
                </a>
              </th>
              <td className="px-4 py-3">{c.typeLabel}</td>
              <td className="px-4 py-3">{tierSummary(c, { short: true })}</td>
              <td className="px-4 py-3">{c.billedBy}</td>
              <td className="px-4 py-3 whitespace-nowrap">{c.checked}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
