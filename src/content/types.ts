/** Copy strings may contain {tokens} filled from site.config.ts by fill() in src/lib/format.ts. */

export type Faq = {
  q: string;
  a: string;
  /** The answer names a feature that is not live yet, or a competitor (allowed by the flag check) */
  gateOk?: boolean;
};

/** One line of the signature call log. 555 numbers and invented names only. */
export type LogLine = {
  time: string;
  /** Headline row: caller, number, address */
  caller?: string;
  quote?: string;
  tag?: 'emergency' | 'leasing' | 'morning' | 'policy' | 'owner';
  /** Plain step text */
  text?: string;
  /** Status at the end of a step */
  status?: 'no answer' | 'answered, connected' | 'logged';
};

export type CallLogData = {
  label: string;
  company: string;
  lines: LogLine[];
  /** "Example call. Names and numbers are invented." */
  note: string;
};

export type Card = { title: string; text: string; tag?: string; tagKind?: 'emergency' | 'morning' | 'neutral' | 'reached' };

export type Source = { label: string; url: string; checked: string };

export type Segment = {
  slug: string;
  /** Nav and footer label */
  name: string;
  /** Home "Who it's for" card line */
  cardLine: string;
  title: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  intro: string;
  primary: string;
  secondaries: string[];
  audience: string;
  answerHeading: string;
  answer: string;
  callLog: CallLogData;
  problemsHeading: string;
  problems: [Card, Card, Card];
  implicationsHeading: string;
  implications: [Card, Card, Card];
  needPayoffHeading: string;
  needPayoff: string[];
  callsHeading: string;
  calls: Card[];
  specifics: {
    heading: string;
    intro: string;
    items: string[];
    note?: string;
    /** Optional property cards ("Riverside Commons: on-call Luis, then Marco") */
    examples?: { name: string; text: string }[];
    gateOk?: boolean;
  };
  faqHeading: string;
  faqs: Faq[];
  ctaHeading: string;
  related: [string, string];
};

export type CompareRow = { label: string; mae: string; them: string; gateOk?: boolean };

export type ComparePage = {
  slug: string;
  competitorId: string;
  navLabel: string;
  title: string;
  metaDescription: string;
  h1: string;
  answer: string;
  rows: CompareRow[];
  sourceNote: string;
  theyBetter: string[];
  maeBetter: string[];
  costHeading: string;
  cost: string;
  faqs: Faq[];
  ctaHeading: string;
};

export type Guide = {
  slug: string;
  navLabel: string;
  title: string;
  metaDescription: string;
  h1: string;
  answer: string;
  published: string;
  publishedIso: string;
};
