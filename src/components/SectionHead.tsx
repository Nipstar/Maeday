import { Rich } from '@/lib/rich';

/** Question-style H2 and a one or two sentence answer under it. */
export function SectionHead({
  title,
  intro,
  id,
  dark = false,
  className = '',
}: {
  title: string;
  intro?: string;
  id?: string;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={`max-w-[780px] ${className}`}>
      <h2 id={id} className={`m-0 text-[32px] leading-[1.08] font-bold md:text-[44px] ${dark ? 'text-white' : ''}`}>
        <Rich text={title} />
      </h2>
      {intro && (
        <p className={`mt-3 mb-0 text-[17px] leading-relaxed md:text-lg ${dark ? 'text-fog' : 'text-slate'}`}>
          <Rich text={intro} className={dark ? 'text-amber' : undefined} />
        </p>
      )}
    </div>
  );
}
