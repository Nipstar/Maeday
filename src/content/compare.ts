import type { ComparePage } from './types';

/**
 * One object per /compare/[slug]/ page. Every competitor fact comes from competitors.ts and was
 * read on the vendor's own page on its `checked` date. Never disparage. Every page says when the
 * other service is the better choice (scripts/check.ts fails without it).
 */
export const comparePages: ComparePage[] = [
  {
    slug: 'smith-ai',
    competitorId: 'smithai',
    navLabel: 'vs Smith.ai',
    title: 'MaeDay vs Smith.ai for Property Management',
    metaDescription:
      'Smith.ai or MaeDay for after-hours property calls? Prices checked {c.smithai.checked}, what each includes, and when Smith.ai is the better pick.',
    h1: 'MaeDay vs Smith.ai for property management',
    answer:
      "Smith.ai is a general AI receptionist billed per call, with a free plan for {c.smithai.free.amount} calls and a live agent as a paid add-on. MaeDay is built only for property managers and billed by the second, with each property's emergency list and on-call ladder set up. Choose Smith.ai for very low volume, MaeDay when after-hours emergencies are the job.",
    rows: [
      { label: 'Billed by', mae: 'The second', them: 'The call' },
      {
        label: 'Entry price',
        mae: '{starter.price} a month for {starter.minutes} minutes',
        them: 'Free for {c.smithai.free.amount} calls a month, then {c.smithai.tier1.price} a month for {c.smithai.tier1.amount} calls',
      },
      {
        label: 'Higher volume',
        mae: '{growth.price} for {growth.minutes} minutes; {portfolio.price} for {portfolio.minutes}',
        them: '{c.smithai.tier2.price} a month for {c.smithai.tier2.amount} calls',
      },
      { label: 'Over your allowance', mae: '{overageLow} to {overageHigh} a minute', them: '{c.smithai.overageLow} to {c.smithai.overageHigh} a call' },
      { label: 'Setup fee', mae: '{setupFee.monthly} on monthly plans, free on annual', them: 'None' },
      { label: 'Contract', mae: '{contract}', them: 'Month to month, no contract on self-serve plans' },
      { label: 'Who sets it up', mae: 'We build it with you after a setup call', them: 'You, with dedicated support, on Pro; full-service setup on Enterprise' },
      { label: 'A person takes over', mae: 'No. Emergencies go to your own on-call team', them: 'A live agent is available as a per-call add-on', gateOk: true },
      { label: 'Spanish', mae: 'Not yet', them: 'English and Spanish on every plan', gateOk: true },
      {
        label: 'Built for',
        mae: 'Property managers only: emergency list per property, on-call ladder with retries, leasing and owner routing',
        them: 'Businesses in many industries. Ask Smith.ai how it handles on-call ladders',
      },
    ],
    sourceNote: 'Smith.ai figures from its AI Receptionist pricing page and its own comparison page, checked {c.smithai.checked}.',
    theyBetter: [
      'You get fewer than {c.smithai.free.amount} calls a month and the free plan covers it',
      'You want a live agent able to step in on calls, as a paid add-on',
      'You need Spanish on the line today',
      'You run several kinds of business on one line, not just rentals',
    ],
    maeBetter: [
      'After-hours maintenance emergencies are most of your calls',
      'Your on-call tech, backup and manager need calling in order, with retries',
      'Different properties have different rules',
      'You want per-second billing and a timestamped log for owners',
    ],
    costHeading: 'What would {ex150.calls} calls a month cost?',
    cost:
      "At about {typicalCallMinutes} minutes a call, {ex150.calls} calls is around {ex150.minutes} minutes, which fits inside MaeDay {ex150.maePlan} at {ex150.mae}. Smith.ai's {c.smithai.tier1.price} Pro plan includes {c.smithai.tier1.amount} calls, with larger call bundles and {c.smithai.tier1.overage} a call over the allowance, and the {c.smithai.tier2.price} Enterprise plan includes {c.smithai.tier2.amount} calls. Your own numbers will differ: we run them on the setup call.",
    faqs: [
      {
        q: 'Is Smith.ai cheaper than MaeDay?',
        a: "At very low volume, yes: Smith.ai's free plan covers {c.smithai.free.amount} calls a month. Above that it depends on how long your calls are, because Smith.ai bills by the call and MaeDay by the second.",
      },
      {
        q: 'Can a person take over a call with MaeDay?',
        a: 'No. MaeDay sends emergencies to your own on-call team. If you want a receptionist to step in on calls, Smith.ai offers a live agent as a per-call add-on.',
        gateOk: true,
      },
      {
        q: 'Does MaeDay answer for businesses that are not property managers?',
        a: 'No. It is set up only for property management calls: emergency lists per property, on-call ladders, leasing and owner calls.',
      },
    ],
    ctaHeading: 'Still deciding? Hear Mae handle a burst pipe first.',
  },
  {
    slug: 'specialty-answering-service',
    competitorId: 'sas',
    navLabel: 'vs Specialty Answering Service',
    title: 'MaeDay vs Specialty Answering Service',
    metaDescription:
      'Human operators or an AI voice agent for after-hours property calls? Specialty Answering Service and MaeDay compared, facts checked {c.sas.checked}.',
    h1: 'MaeDay vs Specialty Answering Service for property management',
    answer:
      'Specialty Answering Service uses human operators, starts from {c.sas.from} a month with a two-week free trial, and has Spanish-speaking staff. MaeDay uses Mae, an AI voice agent built for property managers, billed by the second from {starter.price} a month. Choose Specialty if you want a person on every call, MaeDay for an on-call ladder with retries.',
    rows: [
      { label: 'Who answers', mae: 'Mae, an AI voice agent', them: 'Human operators' },
      { label: 'Published price', mae: 'From {starter.price} a month for {starter.minutes} minutes', them: 'From {c.sas.from} a month' },
      { label: 'Billed by', mae: 'The second', them: 'Not shown on the page' },
      { label: 'Emergency screening', mae: 'Your emergency list, set for each property', them: 'Calls screened for emergency and non-emergency response by your protocols' },
      {
        label: 'Reaching on-call staff',
        mae: 'Warm transfer by phone, then retries and backups in your order',
        them: 'On-call staff dispatched by phone, text, pager or email',
        gateOk: true,
      },
      { label: 'Spanish', mae: 'Not yet', them: 'Representatives fluent in English and Spanish', gateOk: true },
      { label: 'Trying it', mae: 'A {setupCallMinutes}-minute setup call, then {goLive} to go live', them: 'Two-week free trial' },
      { label: 'Setup fee', mae: '{setupFee.monthly} on monthly plans, free on annual', them: 'Not shown on the page' },
    ],
    sourceNote: "Specialty Answering Service facts from its property management page, checked {c.sas.checked}.",
    theyBetter: [
      'You want a person on every call',
      'You need Spanish-speaking staff today',
      'You want a free trial before any setup',
      'You want on-call staff reached by pager or text',
    ],
    maeBetter: [
      'You want billing by the second, with spam and wrong numbers left out',
      'Your on-call ladder needs retries and backups in a fixed order',
      'Different properties need different emergency lists',
      'You want the recording and transcript of every call',
    ],
    costHeading: 'What would {ex150.calls} calls a month cost?',
    cost:
      "Specialty Answering Service does not show a per-minute rate on its page, so a like-for-like cost cannot be worked out from published prices. At about {typicalCallMinutes} minutes a call, {ex150.calls} calls is around {ex150.minutes} minutes, which fits inside MaeDay {ex150.maePlan} at {ex150.mae}. Ask Specialty for a quote at that volume and compare.",
    faqs: [
      {
        q: 'Is a human answering service better for emergencies?',
        a: 'A person can handle a call nobody planned for. Mae follows your list and ladder exactly the same way every time. Which matters more depends on your calls, and the setup call is a good place to work that out.',
      },
      {
        q: 'Can MaeDay answer in Spanish?',
        a: 'Not yet. If Spanish-speaking callers are a large share of your calls, a human service with Spanish-speaking staff is the better fit today.',
        gateOk: true,
      },
      {
        q: 'Can I try MaeDay before I commit?',
        a: 'Call the sample line to hear Mae handle an emergency. On the setup call we go through your properties and give you a plan and a price before anything is built.',
      },
    ],
    ctaHeading: 'Hear Mae take an emergency call, then decide.',
  },
];

export function getComparePage(slug: string): ComparePage | undefined {
  return comparePages.find((c) => c.slug === slug);
}

/**
 * Hub (/best-property-management-answering-service/): the same criteria for every service.
 * Values for other services come only from their own pages (competitors.ts); anything a page
 * does not state says so.
 */
export const NOT_STATED = 'Not stated on their page';

export type HubRow = {
  id: string;
  billing: string;
  ladder: string;
  perProperty: string;
  leasing: string;
  owner: string;
  software: string;
  compareSlug?: string;
};

export const hub = {
  title: 'Best Property Management Answering Services Compared',
  metaDescription:
    'Property management answering services compared on billing, on-call escalation, per-property rules, leasing and owner calls, software and published price.',
  h1: 'Best property management answering services, compared',
  disclosure:
    'MaeDay is our service. We have tried to compare it fairly: every other service is described only from its own website, checked on the date shown, and the table says when a page does not state something.',
  answer: {
    heading: 'What is the best property management answering service?',
    text: 'It depends on who you want answering and how you want to pay. Human services such as Ruby, MAP or Specialty Answering Service put a person on every call. Buildium and Property Meld add-ons cover maintenance inside their own software. AI services such as Smith.ai and MaeDay cost less per call, and MaeDay is built only for property managers.',
  },
  criteriaHeading: 'What should you compare?',
  criteriaIntro: 'Seven questions sort most of the choice. The first three decide what happens to an emergency at 2am.',
  criteria: [
    { title: 'Billing unit', text: 'By the second, the minute, the call or the rental unit. Short calls and rare emergencies favor finer billing.' },
    { title: 'Emergency ladder', text: 'If the on-call tech misses the call, does anyone try again, and then try someone else?' },
    { title: 'Per-property rules', text: 'Can each property have its own emergency list and on-call people?' },
    { title: 'Leasing calls', text: 'Are prospects answered from a script, the same way every time?' },
    { title: 'Owner calls', text: 'Are owners recognized and routed to the right person?' },
    { title: 'Software required', text: 'Does it only work inside one property management platform?' },
    { title: 'Published price', text: 'Can you see the price on their website, or do you need a quote?' },
  ],
  tableHeading: 'How do the services compare?',
  rows: [
    {
      id: 'maeday',
      billing: 'The second',
      ladder: 'Yes: on-call, retries, backup, manager, in your order',
      perProperty: 'Yes',
      leasing: 'Yes, from your approved script',
      owner: 'Yes, routed as a message or transfer',
      software: 'None, works alongside any',
    },
    {
      id: 'smithai',
      billing: 'The call',
      ladder: 'Call routing; on-call ladder not stated',
      perProperty: 'Multi-location support on Enterprise',
      leasing: NOT_STATED,
      owner: NOT_STATED,
      software: 'None',
      compareSlug: 'smith-ai',
    },
    {
      id: 'sas',
      billing: 'Not shown on the page',
      ladder: 'On-call staff dispatched by phone, text, pager or email',
      perProperty: NOT_STATED,
      leasing: NOT_STATED,
      owner: NOT_STATED,
      software: 'None',
      compareSlug: 'specialty-answering-service',
    },
    { id: 'ruby', billing: 'The minute', ladder: NOT_STATED, perProperty: NOT_STATED, leasing: NOT_STATED, owner: NOT_STATED, software: 'None' },
    { id: 'map', billing: 'The minute', ladder: NOT_STATED, perProperty: NOT_STATED, leasing: NOT_STATED, owner: NOT_STATED, software: 'None' },
    { id: 'patlive', billing: 'The minute', ladder: NOT_STATED, perProperty: NOT_STATED, leasing: NOT_STATED, owner: NOT_STATED, software: 'None' },
    {
      id: 'buildium',
      billing: 'The rental unit',
      ladder: 'Decides whether a call is an emergency; escalation not stated',
      perProperty: NOT_STATED,
      leasing: 'No, maintenance calls only',
      owner: 'No, maintenance calls only',
      software: 'Buildium',
    },
    {
      id: 'meld',
      billing: 'The rental unit',
      ladder: 'Routes true emergencies to the right person',
      perProperty: NOT_STATED,
      leasing: NOT_STATED,
      owner: NOT_STATED,
      software: 'Property Meld',
    },
  ] satisfies HubRow[],
  faqs: [
    {
      q: 'Is MaeDay the best property management answering service?',
      a: 'For after-hours emergencies that need an on-call ladder, per-property rules and per-second billing, we built it to be. If you want a person on every call, or maintenance answered inside Buildium or Property Meld, one of the others is the better fit.',
      gateOk: true,
    },
    {
      q: 'Why do some cells say "Not stated on their page"?',
      a: 'We only describe other services from their own websites. When a page does not say whether a feature exists, we say so rather than guess. Ask the company directly.',
    },
    {
      q: 'How often are these prices checked?',
      a: 'Each row shows the date we read that company\'s page. Prices change, so follow the links for today\'s figures.',
    },
  ],
};
