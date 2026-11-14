/** Shared button classes. 52px tall, 12px radius (squarer than a pill). One amber button per screen. */
const base =
  'inline-flex items-center justify-center gap-2 rounded-[12px] font-semibold no-underline transition-colors text-center';

export const btn = {
  /** Amber, Midnight text */
  primary: `${base} min-h-[52px] px-[26px] text-[17px] bg-amber text-midnight hover:bg-[#e89a24] hover:text-midnight`,
  /** Outline on light */
  outline: `${base} min-h-[52px] px-[22px] text-[17px] border-[1.5px] border-midnight text-midnight hover:bg-midnight hover:text-white`,
  /** Outline on Midnight */
  outlineDark: `${base} min-h-[52px] px-[22px] text-[17px] border-[1.5px] border-white text-white hover:bg-white hover:text-midnight`,
  /** Header button */
  small: `${base} min-h-11 px-[18px] text-[15px] bg-amber text-midnight hover:bg-[#e89a24] hover:text-midnight`,
  /** Text link button */
  text: 'font-semibold underline underline-offset-4',
};

/** Chips */
export const chip = {
  base: 'inline-flex items-center rounded-[8px] px-3 py-[5px] text-sm font-semibold',
  emergency: 'bg-signal text-white',
  reached: 'bg-reached-wash text-reached-text',
  morning: 'bg-sand text-slate',
  neutral: 'bg-dusk text-midnight',
  dark: 'bg-night text-chalk font-normal',
};
