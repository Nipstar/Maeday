/**
 * Competitor facts, shared by the pricing table, compare pages and the hub.
 * Every entry was read on the vendor's own page on `checked` (see BUILD_LOG.md).
 * Facts only, never disparaging. Re-fetch before changing a figure and update `checked`.
 * scripts/check.ts fails if an entry has no url or checked date.
 */

export type Tier = { price: number; amount: number; unit: 'minutes' | 'calls'; overage?: number };

export type Competitor = {
  id: string;
  name: string;
  /** Short label used in tables */
  short: string;
  kind: 'human' | 'ai' | 'pm-addon';
  /** "Human answering service", "AI receptionist", ... */
  typeLabel: string;
  url: string;
  checked: string;
  /** What you are billed by, as the page states it */
  billedBy: string;
  /** Published plans with included minutes or calls */
  tiers?: Tier[];
  /** Pay-as-you-go: a monthly base with no included minutes */
  payg?: { base: number; perMinute: number };
  /** "From $44 a month" style entry price, when no tiers are published */
  from?: number;
  /** Per-unit (per rental unit, per month) pricing for property software add-ons */
  perUnit?: { price: number; label: string }[];
  minimum?: number;
  setupFee?: number;
  freeTier?: { amount: number; unit: 'calls'; overage: number };
  /** Plain facts from the page, no figures (figures go in the fields above) */
  facts: string[];
  /** Other pages this entry's figures come from */
  alsoUrls?: { label: string; url: string }[];
};

export const competitors: Competitor[] = [
  {
    id: 'smithai',
    name: 'Smith.ai AI Receptionist',
    short: 'Smith.ai AI',
    kind: 'ai',
    typeLabel: 'AI receptionist, many industries',
    url: 'https://smith.ai/ai-receptionist',
    checked: '14 November 2026',
    billedBy: 'The call',
    freeTier: { amount: 25, unit: 'calls', overage: 3.0 },
    tiers: [
      { price: 150, amount: 75, unit: 'calls', overage: 2.0 },
      { price: 500, amount: 300, unit: 'calls', overage: 1.67 },
    ],
    setupFee: 0,
    facts: [
      'No setup fees',
      'Month to month, no contract on self-serve plans',
      'A live agent is available as a per-call add-on on any plan',
      'English and Spanish included on every plan',
      'The Pro plan is set up by you, with dedicated support',
    ],
    alsoUrls: [{ label: "Smith.ai's own comparison page", url: 'https://smith.ai/ai-receptionist-service-comparison/smith-ai-vs-rosie' }],
  },
  {
    id: 'smithhuman',
    name: 'Smith.ai Virtual Receptionists',
    short: 'Smith.ai receptionists',
    kind: 'human',
    typeLabel: 'Human receptionists',
    url: 'https://smith.ai/pricing/receptionists',
    checked: '14 November 2026',
    billedBy: 'The call',
    tiers: [
      { price: 300, amount: 30, unit: 'calls', overage: 11.5 },
      { price: 810, amount: 90, unit: 'calls', overage: 10.5 },
      { price: 2100, amount: 300, unit: 'calls', overage: 8.5 },
    ],
    facts: ['30-day money-back guarantee on all plans'],
  },
  {
    id: 'ruby',
    name: 'Ruby',
    short: 'Ruby',
    kind: 'human',
    typeLabel: 'Human receptionists',
    url: 'https://www.ruby.com/campaign/hello-ruby/',
    checked: '14 November 2026',
    billedBy: 'The minute',
    tiers: [
      { price: 250, amount: 50, unit: 'minutes' },
      { price: 395, amount: 100, unit: 'minutes' },
      { price: 720, amount: 200, unit: 'minutes' },
      { price: 1725, amount: 500, unit: 'minutes' },
    ],
    facts: ['Plans sold by minutes per month'],
  },
  {
    id: 'map',
    name: 'MAP Communications',
    short: 'MAP',
    kind: 'human',
    typeLabel: 'Human answering service',
    url: 'https://www.mapcommunications.com/pricing/',
    checked: '14 November 2026',
    billedBy: 'The minute',
    payg: { base: 49, perMinute: 1.37 },
    tiers: [
      { price: 179, amount: 125, unit: 'minutes', overage: 1.3 },
      { price: 339, amount: 250, unit: 'minutes', overage: 1.28 },
      { price: 649, amount: 500, unit: 'minutes', overage: 1.28 },
    ],
    facts: ['No long-term contracts', 'English and Spanish', '24/7 coverage'],
  },
  {
    id: 'patlive',
    name: 'PATLive',
    short: 'PATLive',
    kind: 'human',
    typeLabel: 'Human answering service',
    url: 'https://www.patlive.com/pricing/',
    checked: '14 November 2026',
    billedBy: 'The minute',
    payg: { base: 49, perMinute: 2.99 },
    tiers: [{ price: 99, amount: 50, unit: 'minutes', overage: 2.29 }],
    facts: ['14-day free trial', 'No contracts', 'US-based receptionists'],
  },
  {
    id: 'abby',
    name: 'Abby Connect',
    short: 'Abby',
    kind: 'human',
    typeLabel: 'Human receptionists',
    url: 'https://www.abby.com/comparisons/abby-vs-answerconnect/',
    checked: '14 November 2026',
    billedBy: 'The minute',
    tiers: [
      { price: 164, amount: 50, unit: 'minutes' },
      { price: 329, amount: 100, unit: 'minutes' },
      { price: 599, amount: 200, unit: 'minutes' },
      { price: 1380, amount: 500, unit: 'minutes' },
    ],
    facts: ['Month to month, no setup fee'],
  },
  {
    id: 'sas',
    name: 'Specialty Answering Service',
    short: 'Specialty Answering Service',
    kind: 'human',
    typeLabel: 'Human answering service, property management line',
    url: 'https://www.specialtyansweringservice.net/industries/real-estate/property-management-answering-service/',
    checked: '14 November 2026',
    billedBy: 'Not shown on the page',
    from: 44,
    facts: [
      'Calls screened for emergency and non-emergency response by your protocols',
      'On-call staff dispatched by phone, text, pager or email',
      'Representatives fluent in English and Spanish',
      'Two-week free trial',
      'No per-minute rate shown on the page',
    ],
  },
  {
    id: 'buildium',
    name: 'Buildium Maintenance Contact Center',
    short: 'Buildium contact center',
    kind: 'pm-addon',
    typeLabel: 'Buildium add-on, maintenance calls only',
    url: 'https://www.buildium.com/maintenance-contact-center/',
    checked: '14 November 2026',
    billedBy: 'The rental unit',
    perUnit: [
      { price: 0.7, label: 'missed maintenance calls, and all maintenance calls after office hours' },
      { price: 1.1, label: 'all maintenance calls' },
    ],
    minimum: 140,
    setupFee: 300,
    facts: [
      'Call center agents, 24/7 including holidays',
      'Decides whether a call is an emergency',
      'Connected directly to your Buildium account',
      'Maintenance calls only',
    ],
  },
  {
    id: 'meld',
    name: 'Property Meld MAX On-Call',
    short: 'Property Meld MAX On-Call',
    kind: 'pm-addon',
    typeLabel: 'Property Meld add-on, maintenance calls',
    url: 'https://propertymeld.com/pricing/',
    checked: '14 November 2026',
    billedBy: 'The rental unit',
    perUnit: [
      { price: 1.5, label: 'MAX On-Call add-on' },
      { price: 2.0, label: 'Property Meld Ops plan' },
    ],
    minimum: 200,
    facts: [
      'AI intake and triage built into Property Meld',
      'Routes true emergencies to the right person',
      'Every call becomes a work order in your Property Meld account',
      'Requires Property Meld',
    ],
  },
];

export function getCompetitor(id: string): Competitor {
  const c = competitors.find((x) => x.id === id);
  if (!c) throw new Error(`Unknown competitor ${id}`);
  return c;
}
