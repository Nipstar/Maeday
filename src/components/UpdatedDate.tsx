import { site } from '@/site.config';

/** "Last updated" line shown on every page. */
export function UpdatedDate({ date = site.lastUpdated, className = '' }: { date?: string; className?: string }) {
  return (
    <p className={`m-0 text-sm text-slate ${className}`} data-updated>
      Last updated <time dateTime={site.lastUpdatedIso}>{date}</time>
    </p>
  );
}
