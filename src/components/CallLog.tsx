import type { CallLogData, LogLine } from '@/content/types';

const tagClass: Record<NonNullable<LogLine['tag']>, string> = {
  emergency: 'bg-signal text-white',
  leasing: 'bg-dusk text-midnight',
  morning: 'bg-sand text-slate',
  policy: 'bg-dusk text-midnight',
  owner: 'bg-dusk text-midnight',
};
const tagLabel: Record<NonNullable<LogLine['tag']>, string> = {
  emergency: 'Emergency',
  leasing: 'Leasing',
  morning: 'Logged for morning',
  policy: 'Your policy',
  owner: 'Owner',
};

/** The signature 2am call log. Data-driven, always labelled as an example with invented names. */
export function CallLog({ log, compact = false }: { log: CallLogData; compact?: boolean }) {
  return (
    <div
      className={`flex min-w-0 flex-col gap-3 rounded-[24px] bg-night p-5 text-white md:p-[26px] ${compact ? '' : 'shadow-log'}`}
      data-call-log
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <p className="mono m-0 text-xs tracking-eyebrow text-mist uppercase">{log.label}</p>
        <span className="text-[13px] text-mist">{log.company}</span>
      </div>
      <ol className="m-0 flex list-none flex-col gap-3 p-0">
        {log.lines.map((l, i) =>
          l.caller ? (
            <li key={i} className="flex items-start gap-3 rounded-[14px] bg-midnight px-4 py-3.5">
              <span className="mono w-[68px] flex-none text-sm text-amber">{l.time}</span>
              <span className="flex min-w-0 flex-col gap-1.5 text-[15px] leading-snug">
                <span>{l.caller}</span>
                {l.quote && <span className="text-fog">&ldquo;{l.quote}&rdquo;</span>}
                {l.tag && (
                  <span className={`self-start rounded-[6px] px-2.5 py-0.5 text-[13px] font-semibold ${tagClass[l.tag]}`}>{tagLabel[l.tag]}</span>
                )}
              </span>
            </li>
          ) : (
            <li key={i} className="flex gap-3 px-4 text-[15px] leading-snug">
              <span className="mono w-[68px] flex-none text-sm text-mist">{l.time}</span>
              <span className="min-w-0">
                {l.text}
                {l.status && (
                  <>
                    {' · '}
                    <span className={l.status === 'answered, connected' ? 'font-semibold text-reached-on-dark' : 'text-mist'}>{l.status}</span>
                  </>
                )}
              </span>
            </li>
          ),
        )}
      </ol>
      <p className="m-0 mt-1 text-[13px] text-mist">{log.note}</p>
      <span data-call-log-end hidden />
    </div>
  );
}
