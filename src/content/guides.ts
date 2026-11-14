import type { Faq, Guide, SourceKey } from './types';

/** Guide index (routes, sitemap, llms.txt). Full copy for each guide is below. */
export const guides: Guide[] = [
  {
    slug: 'what-counts-as-a-maintenance-emergency',
    navLabel: 'What counts as an emergency',
    title: 'What Counts as a Maintenance Emergency? | MaeDay',
    metaDescription:
      'A manager-facing guide to maintenance emergencies: a template emergency list, no hot water, AC and toilets, and repair timelines with official sources.',
    h1: 'What counts as a maintenance emergency?',
    answer:
      'A maintenance emergency is a problem that threatens safety, risks serious damage to the property, or leaves a home without a basic service such as heat, water or a working toilet. Flooding, gas, fire, sewage backups, electrical hazards and no heat in cold weather are on most lists. Most other repairs can wait for business hours.',
    published: '14 November 2026',
    publishedIso: '2026-11-14',
  },
];

export type ListRow = { problem: string; verdict: 'Emergency' | 'Your call' | 'Next business day' | '911 first'; rule: string };

export const emergencyGuide = {
  eyebrow: 'Guide for property managers',
  why: {
    heading: 'Why does the definition matter?',
    paragraphs: [
      'To a tenant at 2am, every problem feels urgent. To your on-call tech, a call about a squeaky door is a night of sleep lost. Without a written list, whoever answers the phone decides, and they decide differently each time.',
      'One manager on BiggerPockets put the line simply: "If the property isn\'t flooded, frozen, burning, or housing someone dead, we usually don\'t need to know about it until business hours the next day." Another, managing {lowVolumeRentals}, reported {lowVolumeCalls} emergency calls a month, about half of them lockouts.',
      'A written list fixes both problems. Real emergencies get a call tonight, and everything else is logged for the morning, the same way every time.',
    ],
    sources: ['floodedFrozenBurning', 'lowVolume'] as SourceKey[],
  },
  list: {
    heading: 'A template emergency list',
    intro: 'Start from this list and change it for each property. "Your call" rows are the ones managers set differently.',
    caption: 'Template maintenance emergency list',
    rows: [
      { problem: 'Fire or smoke', verdict: '911 first', rule: 'Tell the caller to get out and call 911. Then call the on-call manager.' },
      { problem: 'Gas smell', verdict: '911 first', rule: 'Tell the caller to leave and call 911 or the gas company from outside. Then call on-call.' },
      { problem: 'Flooding, burst pipe or active leak', verdict: 'Emergency', rule: 'Call on-call now. Ask where the water is and whether it is reaching another unit.' },
      { problem: 'Sewage backup', verdict: 'Emergency', rule: 'Call on-call now.' },
      { problem: 'No heat in cold weather', verdict: 'Emergency', rule: 'Set your own outdoor temperature line for each property.' },
      { problem: 'No water to the home', verdict: 'Emergency', rule: 'Call on-call now, after checking it is not a citywide outage.' },
      { problem: 'Electrical hazard', verdict: 'Emergency', rule: 'Sparking, burning smell, exposed wires or water near power. Call on-call now.' },
      { problem: 'Door or window that will not lock', verdict: 'Emergency', rule: 'A security problem. Call on-call now.' },
      { problem: 'Only toilet not working or overflowing', verdict: 'Emergency', rule: 'If there is a second working toilet, it can usually wait.' },
      { problem: 'Lockout', verdict: 'Your call', rule: 'Send on-call staff, give a locksmith list, or ask them to call in the morning.' },
      { problem: 'No hot water', verdict: 'Your call', rule: 'A common rule: wait until morning unless it affects a whole building.' },
      { problem: 'Air conditioning not working', verdict: 'Your call', rule: 'Decide by heat and by resident. Extreme heat or a medically vulnerable resident is a reason to act tonight.' },
      { problem: 'Fridge, oven or dishwasher failure', verdict: 'Next business day', rule: 'Log the details and the unit for the morning.' },
      { problem: 'Slow drain, running toilet, dripping tap', verdict: 'Next business day', rule: 'Log the details for the morning.' },
      { problem: 'Noise or neighbor complaint', verdict: 'Next business day', rule: 'Not maintenance. Log it, and if someone feels unsafe, tell them to call 911.' },
    ] satisfies ListRow[],
    note: 'Template only. Check your local codes and lease, and set the list for each property.',
  },
  timelines: {
    heading: 'How long do you have to make a repair?',
    intro:
      'It depends on the state, and the clock usually starts when the tenant notifies you. Two examples, from official sources:',
    items: [
      {
        place: 'Texas',
        text: 'The Texas Attorney General says the law presumes {texasRepairDays} to be a reasonable time to repair a condition that affects health or safety after the tenant gives notice, though the landlord can rebut that presumption.',
        source: 'texasAg' as SourceKey,
      },
      {
        place: 'California',
        text: 'The California Department of Real Estate says the law usually considers {californiaRepairDays} reasonable, but a shorter period may be, depending on the situation: for a broken furnace in very cold weather, {californiaUrgentDays} may be reasonable.',
        source: 'californiaDre' as SourceKey,
      },
    ],
    note: 'General information, not legal advice. Rules differ by state and city. Check the law where your properties are.',
  },
  atNight: {
    heading: 'How do you make the list work at 2am?',
    text: 'A list only helps if whoever answers the phone uses it. Give it to your answering service, set it per property, and decide who gets called if the on-call tech does not pick up. That is what MaeDay does: see {@service}.',
  },
  faqHeading: 'Quick answers',
  faqs: [
    {
      q: 'Is no hot water a maintenance emergency?',
      a: 'Usually not on its own. A common rule is next business day for one home, and an emergency when it affects a whole building or comes with a leak from the water heater. Put your rule on your list.',
    },
    {
      q: 'Is AC not working a maintenance emergency?',
      a: 'It depends on the heat and on who lives there. In extreme heat, or for an elderly or medically vulnerable resident, treat it as urgent. Check your local codes, then decide per property.',
    },
    {
      q: 'Is a clogged toilet an emergency?',
      a: 'Only if it is the only toilet in the home or it is overflowing. With a second working toilet, it can usually wait for the morning.',
    },
    {
      q: 'Is a lockout an emergency?',
      a: 'It is a policy choice. Some managers send on-call staff, some give a locksmith list, and some ask the tenant to call in the morning. Pick one and apply it every time.',
    },
  ] satisfies Faq[],
};
