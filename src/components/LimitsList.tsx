import { Rich } from '@/lib/rich';

/** "What won't Mae do?" Honest limits. Marked data-gate-ok: it names features that are not live yet. */
export function LimitsList({ items }: { items: { strong: string; text: string }[] }) {
  return (
    <ul className="m-0 grid min-w-0 list-none grid-cols-1 gap-4 p-0 md:grid-cols-2" data-gate-ok>
      {items.map((l) => (
        <li key={l.strong} className="rounded-[16px] border border-line bg-white p-5 text-base leading-relaxed">
          <strong className="font-semibold">{l.strong}</strong> <Rich text={l.text} />
        </li>
      ))}
    </ul>
  );
}
