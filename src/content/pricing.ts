import type { Card } from './types';

/** /pricing/ copy (docs/BUILD_MAEDAY_SITE.md "Pricing"). Figures are {tokens}. */
export const pricing = {
  title: 'Property Management Answering Service Pricing | MaeDay',
  metaDescription:
    '{starter.price} a month for {starter.minutes} minutes, billed by the second. See what counts as a minute and how MaeDay compares with Ruby, Smith.ai and others.',
  eyebrow: 'Pricing',
  h1: 'Property management answering service pricing',
  sub: '{starter.price} a month for {starter.minutes} minutes, billed by the second. Spam and wrong numbers are not counted. Setup is {setupFee.monthly} on monthly plans and free on annual plans.',
  answer: {
    heading: 'What does a property management answering service cost?',
    text: 'MaeDay costs {starter.price} a month for {starter.minutes} minutes, {growth.price} for {growth.minutes} or {portfolio.price} for {portfolio.minutes}, billed by the second. Spam, wrong numbers and calls under {minBillableSeconds} seconds are not counted. Setup is {setupFee.monthly} on monthly plans and free on annual plans. Calls to your on-call ladder count, because they are part of handling the emergency.',
  },
  planNote:
    'Setup {setupFee.monthly} on monthly plans, free on annual plans ({annual}). Call counts assume about {typicalCallMinutes} minutes a call. Prices in US dollars.',
  minute: {
    heading: 'What counts as a minute?',
    intro:
      'Time Mae spends on a call for you, billed to the second. That includes the calls she makes to your on-call tech and backup, because those are part of handling the emergency.',
    items: [
      { strong: 'Counted:', text: 'tenant, owner, prospect and vendor calls, plus calls to your on-call ladder.' },
      { strong: 'Not counted:', text: 'spam, robocalls, wrong numbers and calls under {minBillableSeconds} seconds.' },
      {
        strong: 'Not rounded:',
        text: 'a {billingExample.minutes} minute {billingExample.seconds} second call is {billingExample.minutes} minutes {billingExample.seconds} seconds, not {billingExample.roundedUpTo} minutes.',
      },
      { strong: 'Unused minutes:', text: '{rollover}.' },
    ],
  },
  why: {
    heading: 'Why does billing by the second matter?',
    intro: 'Because most after-hours calls are short, and the expensive ones are rare. You should pay for the time spent, not for a bundle sized for a busy day line.',
    cards: [
      {
        title: 'Emergencies are rare',
        text: 'A broker managing {lowVolumeRentals} said on BiggerPockets that they get {lowVolumeCalls} emergency calls a month, about half of them lockouts. Your bill should look like that too.',
        sources: ['lowVolume'],
      },
      {
        title: 'Flat bundles get expensive at low volume',
        text: 'One BiggerPockets landlord canceled a live answering service after bills of {costComplaintLow} to {costComplaintHigh} a month, mostly for financial reasons.',
        sources: ['costComplaint'],
        gateOk: true,
      },
      {
        title: 'Per-call billing charges by the call',
        text: 'On a per-call plan, a short wrong number can cost the same as a long emergency. Mae leaves spam and wrong numbers out and bills the rest to the second.',
      },
    ] satisfies Card[],
  },
  compare: {
    heading: 'How does that compare?',
    intro:
      "Published prices from each company's own website, checked {pricesChecked}. Prices change, so follow the links for today's figures.",
    caption: "Published prices from each company's own website, checked {pricesChecked}",
    ids: ['smithai', 'smithhuman', 'ruby', 'map', 'patlive', 'sas', 'buildium', 'meld'],
    after: 'Per-unit add-ons only work inside their own software. Human services include a person on every call. Read {@smithai}, or see {@hub}.',
  },
  faqHeading: 'Pricing questions',
  ctaHeading: "Not sure which plan? We'll size it on the setup call.",
  ctaText: 'Bring a rough count of your after-hours calls, or just your unit count. We will suggest a plan and show you the math.',
};
