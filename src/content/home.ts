import type { Card, CallLogData } from './types';

/** Home page copy, in SPIN order (docs/BUILD_MAEDAY_SITE.md "Home"). Figures are {tokens}. */
export const home = {
  title: 'Property Management Answering Service | MaeDay',
  metaDescription:
    'After-hours answering for property managers. Emergencies reach your on-call tech, with retries and backups. From {starter.price} a month for {starter.minutes} minutes.',
  hero: {
    eyebrow: 'Property management answering service',
    h1: 'After-hours answering that reaches your on-call tech.',
    sub: 'Mae answers your tenant, owner and prospect calls when the office is closed. Real emergencies go to your on-call tech by your rules, with retries and a backup. Everything else is logged for the morning. From {starter.price} a month.',
    chips: ['After hours · {onRequest}', 'Billed by the second', 'Works alongside any property software'],
  },
  heroLog: {
    label: "Tonight's call log",
    company: 'Oak Street Property Management',
    note: 'Example call. Names and numbers are invented.',
    lines: [
      { time: '2:14 AM', caller: 'Maria Lopez · 555-0142 · 14 Elm St, unit 3B', quote: "Water's coming from under the kitchen sink.", tag: 'emergency' },
      { time: '2:15 AM', text: 'Calling Dave Chen, on-call', status: 'no answer' },
      { time: '2:20 AM', text: 'Retrying Dave Chen', status: 'no answer' },
      { time: '2:21 AM', text: 'Calling Priya Shah, backup', status: 'answered, connected' },
      { time: '2:24 AM', text: 'Summary and recording emailed to you' },
    ],
  } satisfies CallLogData,
  answer: {
    heading: 'What is a property management answering service?',
    text: 'It answers your office line when nobody can: nights, weekends and holidays. A good one sorts emergencies from everything else, reaches the right on-call person fast, and keeps a record of every call. MaeDay does this with Mae, an AI voice agent set up with your own emergency list and on-call ladder, for {starter.price} a month.',
  },
  problem: {
    heading: 'What happens to your after-hours calls now?',
    intro: 'For most managers it is one of three things, and none of them can tell a flood from a dripping tap.',
    cards: [
      {
        title: 'Voicemail nobody hears until morning',
        text: 'The tenant with water on the floor leaves a message at 2am. You hear it at 8am, along with the noise complaint and the question about parking.',
      },
      {
        title: 'A message service that only relays',
        text: 'Someone answers and passes the call on, but every call gets the same treatment. You get woken for a slow drain, or the burst pipe waits in an inbox.',
      },
      {
        title: 'Your own phone on the nightstand',
        text: 'You or one of your techs carries the line every night. Every ring could be an emergency, so every ring gets answered, and nobody sleeps well.',
      },
    ] satisfies Card[],
  },
  implication: {
    heading: 'What does a missed emergency cost?',
    intro: 'Rarely just the repair. The cost grows with every hour the call sits, and some of it is set by law.',
    cards: [
      {
        title: 'Water reaches the unit below',
        text: 'A leak caught at 2am is one unit and a plumber. Found at 8am, it can be two units, a ceiling, and a second tenant who now has a complaint too.',
      },
      {
        title: 'The repair clock starts when the tenant tells you',
        text: 'Habitability timelines run from notice, not from when you play the voicemail. A timestamped call log is your evidence of when you heard and what you did.',
        sources: ['repairClock'],
      },
      {
        title: 'Repair timelines are set by state law',
        text: 'Texas law presumes {texasRepairDays} is a reasonable time to repair after notice. In California it is usually {californiaRepairDays}, but as little as {californiaUrgentDays} for a broken furnace in very cold weather.',
        sources: ['texasAg', 'californiaDre'],
      },
      {
        title: 'Techs woken for things that could wait',
        text: 'If every call is urgent, none is. A tech called out for a squeaky door at midnight is slower to pick up the next time, and the next time may be the flood.',
      },
    ] satisfies Card[],
    note: 'General information, not legal advice. Check the rules for your state and city.',
  },
  needPayoff: {
    heading: 'What changes when the right person gets the call?',
    intro: 'The emergency reaches your on-call tech, and the tenant gets an answer. The rest follows from that.',
    items: [
      { title: 'Emergencies reach someone fast', text: 'Mae calls your on-call tech while the tenant is still on the line, then the retry, then the backup.' },
      { title: 'Routine calls wait for the morning', text: 'The slow drain and the parking question are logged with the details, and nobody is woken for them.' },
      { title: 'Every attempt is on record', text: 'Who called, who Mae tried, who answered and when, ready for the owner who asks what happened.' },
      { title: 'You sleep', text: 'Your phone rings only for the calls on your own emergency list, and only if your techs do not answer first.' },
    ] satisfies Card[],
  },
  steps: {
    heading: 'What happens when a tenant calls at 2am?',
    items: [
      { title: 'Mae answers in your name', text: 'First ring, your company name, a short recording notice. No hold music, no voicemail.' },
      { title: 'Checks your emergency list', text: 'Property, unit and problem, checked against the rules you set for that property. Flood yes, dripping tap no.' },
      { title: 'Reaches your on-call tech', text: 'Transfers the call with a spoken summary. No answer? She retries, then calls your backup, in the order you choose.' },
      { title: 'You get the log', text: 'Every call summarized by email with the recording and a timestamp for each attempt. Ready for the owner report.' },
    ] satisfies Card[],
  },
  calls: {
    heading: 'Which calls does Mae handle?',
    intro: 'Most after-hours calls are not emergencies. Mae sorts them so you only get woken for the ones that are.',
    cards: [
      { tag: 'Emergency', tagKind: 'emergency', title: 'Maintenance emergencies', text: 'Flooding, no heat, no water, sewage backup, electrical hazards. Your list decides. These go to your on-call ladder straight away.' },
      { tag: 'Logged for morning', tagKind: 'morning', title: 'Routine repairs', text: 'Slow drains, a broken blind, a noisy fan. Mae takes the details and tells the tenant when to expect a reply.' },
      { tag: 'Your policy', tagKind: 'neutral', title: 'Lockouts', text: 'Call your on-call tech, give a locksmith list, or ask the tenant to call in the morning. You choose once at setup and Mae follows it every time.' },
      { tag: 'Leasing', tagKind: 'neutral', title: 'Prospects and leasing questions', text: 'Availability, rent, pets, how to apply, from your approved script. Every caller gets the same answers, and their details reach your leasing team.' },
      { tag: 'Owners', tagKind: 'neutral', title: 'Owner calls', text: 'Recognized and routed to whoever handles owner relations, as a message or a transfer.' },
      { tag: 'Logged', tagKind: 'morning', title: 'Vendors and everyone else', text: 'Vendors, neighbors, wrong numbers. Logged and summarized. Spam and wrong numbers are not billed.' },
    ] satisfies Card[],
  },
  limits: {
    heading: "What won't Mae do?",
    intro: 'Better you hear it now than at 2am.',
    items: [
      { strong: "She won't call 911.", text: 'Anyone reporting fire, a gas smell or an injury is told to hang up and call 911 first.' },
      { strong: "She won't judge safety beyond your rules.", text: "If it's not on your emergency list, it waits for the morning." },
      { strong: "She can't fix it if nobody answers.", text: 'If your whole ladder is asleep, she logs every attempt and alerts you.' },
      { strong: "She won't screen applicants.", text: 'No talk of neighborhoods or who lives there. Accommodation requests go to your team.' },
      { strong: 'Texts come a little later.', text: 'Text alerts start once US carrier registration is approved, usually {textAlertApproval}. Calls and email work from day one.' },
      { strong: "She's not a person.", text: 'Mae is an AI voice agent and says so if asked.' },
    ],
  },
  better: {
    heading: 'When is something else the better choice?',
    intro: "We'd rather you pick the right service than the wrong one with us.",
    cards: [
      {
        title: 'You want a live person on every call',
        text: 'A human answering service such as Specialty Answering Service is the better fit, and some offer Spanish-speaking staff today.',
        gateOk: true,
      },
      {
        title: 'You already run Property Meld or Buildium',
        text: 'Their own after-hours add-ons create work orders inside the software. If maintenance is all you need answered, start there.',
        gateOk: true,
      },
      {
        title: 'You get a handful of calls a month',
        text: 'A general AI receptionist with a free tier may cost less. See {@smithai}.',
      },
    ] satisfies Card[],
  },
  who: {
    heading: 'Who is MaeDay for?',
    cards: [
      { slug: 'apartments', name: 'Apartments and multifamily', line: 'Leaks, no heat and after-hours leasing calls.' },
      { slug: 'hoa', name: 'HOAs and community associations', line: 'Common-area emergencies and homeowner calls.' },
      { slug: 'single-family-rentals', name: 'Single-family rentals', line: 'Scattered sites, owners who call, travel time to the property.' },
      { slug: 'student-housing', name: 'Student housing', line: 'Lockouts, parents calling, move-in week.' },
    ],
  },
  faqHeading: 'Questions property managers ask',
  forward: {
    heading: 'Send this to the owner or your partner',
    intro: 'Not your call alone? Here is the short version, ready to email or paste into a message.',
    subject: 'An idea for our after-hours calls',
    body: [
      'Right now our after-hours calls go to voicemail or to one of our phones, and a real emergency can sit until morning.',
      'What it costs us: a leak that reaches the unit below, repair timelines that start when the tenant tells us, techs woken for things that could wait, and no record to show the owner.',
      'The fix: MaeDay answers after hours in our name. Mae, an AI voice agent, checks each call against our own emergency list for that property, calls our on-call tech, retries, then calls the backup, and emails us a timestamped log of every call. Routine requests wait for the morning.',
      'The price: from {starter.price} a month for {starter.minutes} minutes, billed by the second. Setup is {setupFee.monthly} on monthly plans.',
      'More here: {domain}/',
    ].join('\n\n'),
  },
  final: {
    text: 'On a {setupCallMinutes}-minute setup call we go through your properties, your emergency list and who is on call. You leave with a plan and a price.',
  },
};
