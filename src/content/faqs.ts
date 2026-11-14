import { site } from '@/site.config';
import type { Faq } from './types';

/** Visible FAQ and FAQPage JSON-LD render from these arrays. */

export const homeFaqs: Faq[] = [
  {
    q: 'What counts as an emergency?',
    a: 'You decide. We start from a standard list (flooding, no heat in cold weather, no water, gas, sewage, electrical hazards, lockouts) and set it per property on the setup call. Our guide covers {@guide}.',
  },
  {
    q: "What if my on-call tech doesn't answer?",
    a: 'Mae retries after the wait you set, then calls your backup, then you. Every attempt is timestamped in the log.',
  },
  {
    q: 'Does it work with AppFolio, Buildium or Yardi?',
    a: 'Mae works with any property software that accepts data through an API or webhooks, so call details can land where your team already works. We set this up with you on the setup call. Every call also comes with an email summary.',
    gateOk: true,
  },
  {
    q: 'Are calls recorded?',
    a: 'Yes. Every call opens with a short recording notice, in every state, and you get the recording and transcript.',
  },
  {
    q: 'Can it answer during the day too?',
    a: 'Yes. Plans cover after hours by default, and {onRequest} at the same per-minute rates.',
  },
  {
    q: 'How long does setup take?',
    a: 'A {setupCallMinutes}-minute setup call, then {goLive} to build and test your emergency rules and ladder before your line goes live.',
  },
];

export const pricingFaqs: Faq[] = [
  {
    q: 'What does the {setupFee.monthly} setup cover?',
    a: "Building your emergency list per property, your on-call ladder and retry timing, your leasing script, and test calls before you go live. It's free on annual plans.",
  },
  {
    q: 'How many calls is {starter.minutes} minutes?',
    a: 'About {starter.calls} at {typicalCallMinutes} minutes each. Most after-hours calls are short, and emergencies use extra minutes for the calls to your on-call tech.',
  },
  {
    q: 'Is there a contract?',
    a: '{contract}. Annual plans are paid yearly with the setup fee waived: {annual}.',
  },
  {
    q: 'Do unused minutes roll over?',
    a: 'No, {rollover}.',
  },
  {
    q: 'What happens if I go over my minutes?',
    a: 'Extra minutes are billed by the second at your plan rate: {starter.overage} a minute on Starter, {growth.overage} on Growth and {portfolio.overage} on Portfolio.',
  },
  {
    q: 'Does 24/7 on request cost more?',
    a: 'No. Same plans, same per-minute rates. Daytime calls simply use more of your minutes.',
  },
  ...(site.sister.live
    ? [
        {
          q: 'Do you also offer a general receptionist?',
          a: 'MaeDay is built for after-hours property calls. For a receptionist that answers a general business line during the day, see our {@sister}.',
        },
      ]
    : []),
];
