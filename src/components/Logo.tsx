import Link from '@/components/Link';

/** The house outline with one lit window. stroke is white on Midnight tiles, Midnight on light. */
export function Mark({ size = 26, stroke = '#FFFFFF', strokeWidth = 2 }: { size?: number; stroke?: string; strokeWidth?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M3 11.5 12 4l9 7.5" fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M6 10.2v9.3a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-9.3"
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="9.75" y="12.25" width="4.5" height="4.5" rx="0.8" fill="#F2A93B" />
    </svg>
  );
}

/** Reversed logo for Midnight bands: "Day" takes Porch Amber. */
export function Logo({ href = '/' }: { href?: string }) {
  return (
    <Link href={href} className="flex items-center gap-2.5 text-white no-underline hover:text-white" aria-label="MaeDay home">
      <span className="flex size-[38px] items-center justify-center rounded-[10px] bg-night">
        <Mark />
      </span>
      <span className="font-display text-2xl font-bold tracking-head">
        Mae<span className="text-amber">Day</span>
      </span>
    </Link>
  );
}
