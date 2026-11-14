/**
 * Single source of truth. Every price, minute figure, phone number and URL on the site comes from
 * here or from src/content/competitors.ts. Never type one into a page, component or content file.
 *
 * Values written as [[LIKE_THIS]] are placeholders. A production build fails while any placeholder
 * reaches the built HTML (set ALLOW_PLACEHOLDERS=1 for preview builds). Placeholders written as
 * [[KEY: suggested text]] carry the suggested wording: confirm it, then replace the whole token.
 *
 * Deployment values come from NEXT_PUBLIC_* environment variables, read at build time and baked
 * into the static HTML. Unset or blank, they fall back to their [[PLACEHOLDER]]. See .env.example.
 */

/** An env value, or the fallback when it is unset or blank. */
function env(value: string | undefined, fallback: string): string {
  const v = value?.trim();
  return v ? v : fallback;
}

export type Plan = {
  id: 'starter' | 'growth' | 'portfolio';
  name: string;
  price: number;
  minutes: number;
  approxCalls: number;
  overagePerMinute: number;
  blurb: string;
  buyNow?: boolean;
  featured?: boolean;
};

const plans: Plan[] = [
  { id: 'starter', name: 'Starter', price: 197, minutes: 500, approxCalls: 150, overagePerMinute: 0.35, blurb: 'For one to a few properties.', buyNow: true },
  { id: 'growth', name: 'Growth', price: 397, minutes: 1250, approxCalls: 400, overagePerMinute: 0.3, blurb: 'For growing portfolios with leasing calls.', featured: true },
  { id: 'portfolio', name: 'Portfolio', price: 797, minutes: 2500, approxCalls: 800, overagePerMinute: 0.25, blurb: 'For larger portfolios and lines answered 24/7 on request.' },
];

/**
 * On Vercel preview deployments, canonicals, OG images and the sitemap point at the branch's preview URL
 * (Vercel's system variables, exposed by default). NEXT_PUBLIC_SITE_URL overrides it; production uses the apex.
 */
const vercelPreviewUrl =
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview' && process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL}`
    : '';

// Each variable is read by its literal name so Next.js can inline it into client code.
export const site = {
  name: 'MaeDay',
  persona: 'Mae',
  tagline: "When it's a mayday, Mae answers.",
  descriptor: 'After-hours answering for property managers',
  domain: env(process.env.NEXT_PUBLIC_SITE_URL, vercelPreviewUrl || 'https://propertymanagementafterhoursansweringservice.com').replace(/\/+$/, ''),
  shortDomain: 'callmaeday.com', // 301 to the main domain, Cloudflare redirect rule (getmaeday.com too)
  owner: 'Antek Automation', // never "Ltd" or "Limited"
  founder: 'Andy Norman',
  email: env(process.env.NEXT_PUBLIC_EMAIL, '[[EMAIL]]'),
  address: 'Chantry House, 38 Chantry Way, Andover SP10 1LZ, United Kingdom',
  phone: '[[PHONE]]',
  /** Antek Automation's registration details, from antekautomation.com/privacy-policy (checked 14 November 2026) */
  legal: { status: 'sole trader', ico: 'ZC133436', duns: '235593033' },
  demoPhone: {
    // Twilio number on the Retell demo agent ("Oak Street Property Management")
    display: env(process.env.NEXT_PUBLIC_DEMO_PHONE_DISPLAY, '[[DEMO_PHONE_DISPLAY]]'),
    tel: env(process.env.NEXT_PUBLIC_DEMO_PHONE_E164, '[[DEMO_PHONE_E164]]'),
  },
  bookingUrl: env(process.env.NEXT_PUBLIC_BOOKING_URL, '[[BOOKING_URL]]'),
  orderUrl: env(process.env.NEXT_PUBLIC_ORDER_FORM_URL, '[[ORDER_FORM_URL]]'), // Starter only
  goLive: env(process.env.NEXT_PUBLIC_GO_LIVE, '[[GO_LIVE]]'), // e.g. "3 to 5 business days"
  setupCallMinutes: 20,
  plans,
  currency: 'USD',
  setupFee: { monthly: 297, annual: 0 },
  annual: '12 times the monthly price',
  contract: "Month to month, cancel with 30 days' notice",
  rollover: 'they reset on your billing date',
  portfolioExtra: 'Lowest per-minute overage rate',
  billing: {
    incrementSeconds: 1,
    minBillableSeconds: 10,
    typicalCallMinutes: 3,
    /** The "not rounded" example on pricing: a 2 minute 10 second call */
    example: { minutes: 2, seconds: 10, roundedUpTo: 3 },
  },
  coverage: { default: 'after hours', onRequest: '24/7' },
  concurrentCalls: '20',
  textAlertApproval: '1 to 3 weeks', // US A2P 10DLC carrier registration
  timing: {
    integration: '[[INTEGRATION_TIMING: planned, with no date yet]]',
    tourBooking: 'planned, with no date yet',
  },
  /** Features that are not live. Copy behind a false flag never renders; scripts/check.ts enforces it. */
  flags: { sms: false, softwareIntegration: false, tourBooking: false, spanish: false, humanFallback: false, vendorDispatch: false, ownerReport: false },
  analytics: { gtmId: env(process.env.NEXT_PUBLIC_GTM_ID, '') }, // optional, empty disables GTM
  indexNowKey: '6f1d2c9a4b8e4f0e9d3a7c5b2e1f8a40',
  /** Cross-link to the sister site (footer and pricing FAQ only). live: false hides both until that page exists. */
  sister: {
    live: false,
    url: 'https://aireceptionistforsmallbusiness.net/for/property-management/',
    anchor: 'AI receptionist for property management',
  },
  social: { retellPartner: 'Certified Retell AI Partner' },
  pricesChecked: '14 November 2026',
  lastUpdated: '14 November 2026',
  lastUpdatedIso: '2026-11-14',
  copyrightYear: 2026,
  /**
   * Legal and buyer sources quoted on the site. Each one was fetched and read on `checked`
   * (see BUILD_LOG.md). Never add one without fetching it.
   */
  sources: {
    texasAg: {
      label: 'Texas Attorney General, Renters rights',
      url: 'https://www.texasattorneygeneral.gov/consumer-protection/home-real-estate-and-travel/renters-rights',
      checked: '14 November 2026',
    },
    californiaDre: {
      label: 'California Department of Real Estate, Dealing with repairs',
      url: 'https://www.dre.ca.gov/publications/ResourceGuidebook/gb09_dealingwith.html',
      checked: '14 November 2026',
    },
    repairClock: {
      label: 'Contact Center USA, property management answering service guide',
      url: 'https://contactcenterusa.com/blog/property-management-answering-service',
      checked: '14 November 2026',
    },
    recordingConsent: {
      label: 'Rev, phone call recording laws by state',
      url: 'https://www.rev.com/blog/phone-call-recording-laws-state',
      checked: '14 November 2026',
    },
    lowVolume: {
      label: 'BiggerPockets forum, after-hours call center thread',
      url: 'https://www.biggerpockets.com/forums/52/topics/756172-after-hours-call-center-for-property-managment-is-it-effective',
      checked: '14 November 2026',
    },
    floodedFrozenBurning: {
      label: 'BiggerPockets forum, answering service recommendations',
      url: 'https://www.biggerpockets.com/forums/52/topics/570655-answering-service-recommendations',
      checked: '14 November 2026',
    },
    costComplaint: {
      label: 'BiggerPockets forum, answering service thread',
      url: 'https://www.biggerpockets.com/forums/898/topics/347738-answering-service',
      checked: '14 November 2026',
    },
  },
  /** Figures quoted from the sources above (allowed by the figure check because they live here) */
  sourceFigures: {
    texasRepairDays: 'seven days',
    californiaRepairDays: '30 days',
    californiaUrgentDays: 'one to two days',
    lowVolumeRentals: 'almost 350 rentals',
    lowVolumeCalls: 'fewer than four',
    costComplaintLow: 300,
    costComplaintHigh: 400,
    allPartyStates: [
      'California',
      'Delaware',
      'Florida',
      'Illinois',
      'Maryland',
      'Massachusetts',
      'Montana',
      'Nevada',
      'New Hampshire',
      'Pennsylvania',
      'Washington',
    ],
  },
} as const;

export type Site = typeof site;

const PLACEHOLDER = /\[\[[A-Z][A-Z0-9_]*(?::[^\]]*)?\]\]/;

/** True while a config value is still a [[PLACEHOLDER]]. */
export function isPlaceholder(value: string): boolean {
  return PLACEHOLDER.test(value);
}

export function getPlan(id: Plan['id']): Plan {
  const p = site.plans.find((x) => x.id === id);
  if (!p) throw new Error(`Unknown plan ${id}`);
  return p;
}
