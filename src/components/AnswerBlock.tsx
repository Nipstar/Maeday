import { fill } from '@/lib/format';

/**
 * The 40 to 60 word answer under a question H2 (scripts/check.ts enforces the length).
 * data-speakable marks it for SpeakableSpecification on the home page.
 */
export function AnswerBlock({ heading, text, id = 'answer', label = 'Short answer', as: H = 'h2' }: { heading: string; text: string; id?: string; label?: string; as?: 'h2' | 'h3' }) {
  return (
    <div className="rounded-[20px] border border-line bg-white p-6 md:p-8" data-answer-block>
      <p className="eyebrow text-amber-deep">{label}</p>
      <H id={id} className="m-0 text-[24px] leading-tight font-semibold md:text-[28px]">
        {fill(heading)}
      </H>
      <p className="mt-3 mb-0 text-[17px] leading-relaxed text-slate md:text-lg" data-answer-text data-speakable>
        {fill(text)}
      </p>
    </div>
  );
}
