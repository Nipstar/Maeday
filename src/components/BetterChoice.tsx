import { fill } from '@/lib/format';

/** "[Name] is the better choice if" and "MaeDay is the better choice if". Both are required on compare pages. */
export function BetterChoice({ name, them, mae }: { name: string; them: string[]; mae: string[] }) {
  const box = 'flex min-w-0 flex-col gap-3 rounded-[20px] p-6 md:p-7';
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      <div className={`${box} border border-line bg-white`} data-better="them" data-gate-ok>
        <h3 className="m-0 text-[22px] font-semibold">{name} is the better choice if</h3>
        <ul className="m-0 flex list-disc flex-col gap-2 pl-5 text-base leading-relaxed text-slate">
          {them.map((t) => (
            <li key={t}>{fill(t)}</li>
          ))}
        </ul>
      </div>
      <div className={`${box} on-dark bg-midnight text-white`} data-better="mae">
        <h3 className="m-0 text-[22px] font-semibold">MaeDay is the better choice if</h3>
        <ul className="m-0 flex list-disc flex-col gap-2 pl-5 text-base leading-relaxed text-fog marker:text-amber">
          {mae.map((t) => (
            <li key={t}>{fill(t)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
