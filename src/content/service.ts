import type { CallLogData, Card, Faq } from './types';

/** /emergency-maintenance-answering/ copy (docs/BUILD_MAEDAY_SITE.md "Service page"). */
export const servicePage = {
  title: 'Emergency Maintenance Answering Service | MaeDay',
  metaDescription:
    'After-hours maintenance calls checked against your emergency list for each property, then sent to your on-call tech with retries, a backup and a full log.',
  eyebrow: 'Maintenance answering service',
  h1: 'Emergency maintenance answering for property managers',
  sub: 'Mae answers your maintenance line after hours, checks each call against your emergency list for that property, and works down your on-call ladder until someone picks up. Routine repairs wait for the morning. Every attempt is logged.',
  answer: {
    heading: 'What is an emergency maintenance answering service?',
    text: "It answers maintenance calls when your office is closed and decides, by your rules, which ones cannot wait. Those go straight to your on-call tech, with retries and a backup if nobody answers. Everything else is logged for the morning, and you get a timestamped record of every call and every attempt.",
  },
  problem: {
    heading: 'Why do after-hours maintenance calls go wrong?',
    cards: [
      { title: 'Calls that ring out', text: 'The on-call phone is in another room, or on silent. The tenant leaves a voicemail and nobody calls them back until morning.' },
      { title: 'Techs woken for the wrong things', text: 'A running toilet at midnight gets the same urgency as a burst pipe, because whoever answers cannot tell the difference.' },
      { title: 'No second attempt', text: 'A message service passes the call to one number. If that tech misses it, the chain stops there.' },
    ] satisfies Card[],
  },
  implication: {
    heading: 'What does a slow response cost?',
    cards: [
      { title: 'Water keeps moving', text: 'Every hour a leak runs, it reaches more of the building: the cabinet, the floor, the ceiling below.' },
      {
        title: 'Habitability timelines start at notice',
        text: 'Texas law presumes {texasRepairDays} is a reasonable time to repair after notice. California usually allows {californiaRepairDays}, and as little as {californiaUrgentDays} for a broken furnace in very cold weather.',
        sources: ['texasAg', 'californiaDre'],
      },
      {
        title: 'No record, no defense',
        text: 'If a tenant says nobody responded, a voicemail you heard at 8am does not help. A log of who was called, and when, does.',
        sources: ['repairClock'],
      },
    ] satisfies Card[],
    note: 'General information, not legal advice. Check the rules for your state and city.',
  },
  payoff: {
    heading: 'What does a good after-hours maintenance line do?',
    intro: 'It gets the emergency to a person who can fix it, and leaves everyone else to sleep.',
    cards: [
      { title: 'Sorts by your list', text: 'Flood yes, dripping tap no. The list is yours, set for each property.' },
      { title: 'Keeps calling until someone answers', text: 'Retries and backups in the order you choose, so one missed call does not end the chain.' },
      { title: 'Writes it all down', text: 'Every call and attempt timestamped, with the recording and transcript, for you and for the owner.' },
    ] satisfies Card[],
  },
  ladder: {
    heading: 'Who gets called, and when?',
    intro: 'You set the order and the waits on the setup call. Mae follows them every time.',
    steps: [
      { title: 'Check the emergency list', text: 'Property, unit and problem, checked against the list for that property. Not on the list: logged for the morning.' },
      { title: 'Warm transfer to the on-call tech', text: 'Mae calls your on-call tech and connects the tenant with a short spoken summary first, so nobody repeats the story.' },
      { title: 'Retry', text: 'No answer? Mae calls the tech again after the wait you set, and tells the tenant what is happening.' },
      { title: 'Backup', text: 'Still no answer: your backup tech, then the next name on the ladder.' },
      { title: 'Manager', text: 'If the ladder runs out, Mae calls the manager you name.' },
      { title: 'Final alert and the log', text: 'If nobody answers at all, Mae alerts the manager by email with every attempt listed, and tells the tenant when to expect a call back.' },
    ] satisfies Card[],
  },
  exampleHeading: 'What does it look like when nobody picks up?',
  exampleIntro: 'The rare bad night is the one owners ask about. Here is what the log shows.',
  exampleLog: {
    label: 'Sunday, 3am',
    company: 'Maple Court Apartments',
    note: 'Example call. Names and numbers are invented.',
    lines: [
      { time: '3:02 AM', caller: 'Kevin Walsh · 555-0134 · 220 Maple Ct, unit 6', quote: 'There is sewage coming up in the bathtub.', tag: 'emergency' },
      { time: '3:03 AM', text: 'Calling Sam Patel, on-call', status: 'no answer' },
      { time: '3:08 AM', text: 'Retrying Sam Patel', status: 'no answer' },
      { time: '3:09 AM', text: 'Calling Joe Rivera, backup', status: 'no answer' },
      { time: '3:10 AM', text: 'Calling Erin Cole, manager', status: 'answered, connected' },
      { time: '3:14 AM', text: 'Summary, recording and every attempt emailed to the manager' },
    ],
  } satisfies CallLogData,
  faqHeading: 'Maintenance answering questions',
  faqs: [
    {
      q: 'How fast does Mae call the on-call tech?',
      a: 'While the tenant is still on the line. Mae checks the problem against your list for that property, then calls your on-call tech. How fast the repair happens depends on your team, so we do not promise a response time.',
    },
    {
      q: 'How long does Mae wait before retrying?',
      a: 'As long as you choose. You set the wait, the number of retries and the order of backups on the setup call, and you can change them later.',
    },
    {
      q: 'What if nobody on the ladder answers?',
      a: 'Mae tells the tenant what happens next, logs every attempt with the time, and alerts the manager by email. She cannot send someone herself.',
    },
    {
      q: 'Can each property have a different on-call tech?',
      a: 'Yes. Each property can have its own emergency list, ladder and lockout policy, and Mae picks the right one from the address the caller gives.',
    },
    {
      q: 'Does Mae call 911?',
      a: 'No. Anyone reporting fire, a gas smell or an injury is told to hang up and call 911 first. Mae then follows your list for the follow-up.',
    },
    {
      q: 'Can the on-call tech get a text instead of a call?',
      a: 'Not yet. Text alerts to the on-call tech start once US carrier registration is approved, usually {textAlertApproval}. Until then Mae calls, and email summaries work from day one.',
      gateOk: true,
    },
  ] satisfies Faq[],
  ctaHeading: 'Bring your on-call list. We will build the ladder with you.',
};
