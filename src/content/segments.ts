import type { Segment } from './types';

/**
 * One object per segment page (/apartments/, /hoa/, ...). Unique copy for each segment's real calls,
 * never find-and-replace. Example calls use invented names and 555 numbers.
 */
export const segments: Segment[] = [
  {
    slug: 'apartments',
    name: 'Apartments and multifamily',
    cardLine: 'Leaks, no heat and after-hours leasing calls.',
    title: 'Apartment Answering Service, After Hours | MaeDay',
    metaDescription:
      'After-hours answering for apartment communities: leaks and no-heat calls reach your on-call tech, leasing calls get the same answers every time.',
    eyebrow: 'Apartments and multifamily',
    h1: 'Apartment answering service for nights and weekends',
    intro:
      "When the leasing office closes, the calls keep coming: a leak in one unit, no heat in another, a prospect who wants to see a two-bed on Saturday. Mae answers all of them, sends the emergencies to your on-call maintenance tech, and gives every prospect the same straight answers.",
    primary: 'apartment answering service',
    secondaries: ['answering service for apartment complexes', 'multifamily answering service'],
    audience: 'Apartment and multifamily property managers',
    answerHeading: 'What does an apartment answering service do?',
    answer:
      "It answers the community's phone after the leasing office closes. Maintenance emergencies such as a leak into the unit below or no heat go to your on-call tech, routine requests are logged for the morning, and prospects get the same answers from your approved script. Each community keeps its own rules and on-call ladder.",
    callLog: {
      label: 'Saturday, January',
      company: 'Riverside Commons, 120 units',
      note: 'Example calls. Names and numbers are invented.',
      lines: [
        { time: '11:42 PM', caller: 'James Ortiz · 555-0161 · Building C, unit 204', quote: "The heat's off and it's 19 degrees out.", tag: 'emergency' },
        { time: '11:43 PM', text: 'Calling Luis Romero, on-call maintenance', status: 'answered, connected' },
        { time: '11:58 PM', caller: 'Ana Kim · 555-0198 · prospect', quote: 'Do you have a two-bedroom for March?', tag: 'leasing' },
        { time: '12:01 AM', text: 'Availability and how to apply from your script · details sent to leasing' },
      ],
    },
    problemsHeading: 'What goes wrong with apartment calls after hours?',
    problems: [
      {
        title: 'One leak, two units',
        text: 'Water does not stay in the unit it starts in. A message that waits until the office opens can mean a second ceiling and a second resident.',
      },
      {
        title: 'Prospects hit voicemail',
        text: 'Evening and weekend are when people search for apartments. If the leasing line goes to voicemail, the question about a two-bed goes unanswered.',
      },
      {
        title: 'Every community does it differently',
        text: 'One building has a super on site, another relies on a tech across town. The rules live in people\'s heads, and the night answerer does not have them.',
      },
    ],
    implicationsHeading: 'What does that cost a community?',
    implications: [
      {
        title: 'Repairs and residents',
        text: 'A leak that reaches the unit below adds a repair, a displaced resident and an insurance conversation. The clock on a habitability repair also starts when the resident tells you.',
        sources: ['repairClock'],
      },
      {
        title: 'Leases that go elsewhere',
        text: 'A prospect who reaches nobody at 7pm can call the next listing. You never learn they called, so the loss never shows up in a report.',
      },
      {
        title: 'Uneven answers on leasing calls',
        text: 'Different people giving different answers about rent, pets or requirements is how Fair Housing problems start. The Fair Housing Act applies however the phone is answered.',
      },
    ],
    needPayoffHeading: 'What changes when every call gets the right answer?',
    needPayoffIntro: 'Your on-call tech hears about the leak while it is still one unit, and the prospect hears back the same night.',
    needPayoff: [
      { title: 'Leaks caught early', text: 'Mae asks where the water is and whether it is spreading, then calls your on-call tech while the resident is still on the line.' },
      { title: 'Leasing answered at night', text: 'Availability, rent, pets and how to apply, from your script, with the prospect\'s details sent to your leasing team.' },
      { title: 'Each community on its own rules', text: 'Mae works out which community the caller lives in and follows that property\'s list and ladder.' },
    ],
    callsHeading: 'What do apartment calls look like after hours?',
    calls: [
      {
        title: "Water where it shouldn't be",
        text: "Leaks that reach the unit below are the reason most managers want a call at night. Mae asks where the water is and whether it's spreading.",
        tag: 'Emergency',
        tagKind: 'emergency',
      },
      {
        title: 'No heat, no hot water',
        text: 'Set your own temperature line for winter, and whether no hot water waits until morning.',
        tag: 'Your list',
        tagKind: 'neutral',
      },
      {
        title: 'Noise and neighbors',
        text: 'Logged with unit numbers for your team. Mae points to your community rules and, if someone feels unsafe, to 911.',
        tag: 'Logged for morning',
        tagKind: 'morning',
      },
      {
        title: 'Prospects after the office closes',
        text: 'Evening and weekend leasing questions get answered instead of going to voicemail, and the lead lands with your leasing team.',
        tag: 'Leasing',
        tagKind: 'neutral',
      },
    ],
    specifics: [
      {
        heading: 'How does Mae handle leasing calls fairly?',
        intro:
          'The Fair Housing Act applies however a call is answered. Mae is set up to answer the same way every time, and to hand anything sensitive to a person on your team.',
        items: [
          'The same answers on availability, rent, pets and requirements for every caller, from your approved script.',
          'No descriptions of neighborhoods, schools or who lives there, and no steering toward one unit over another.',
          'No pre-screening or turning anyone away by phone.',
          'Reasonable accommodation and assistance animal questions go straight to your team.',
          'Every call recorded and transcribed, so you can check consistency.',
        ],
        note: 'General information, not legal advice. Have your leasing script reviewed.',
      },
      {
        heading: 'Several communities, different rules?',
        intro:
          'Each property gets its own emergency list, on-call ladder and leasing script. Mae works out which community the caller lives in from the address or building, then follows that property\'s rules.',
        items: [],
        examples: [
          { name: 'Riverside Commons', text: 'On-call: Luis, then Marco. No hot water waits until 7am.' },
          { name: 'Hillside Lofts', text: 'On-call: building super, then the manager. Lockouts: locksmith list.' },
        ],
        note: 'Example properties. Names are invented.',
      },
    ],
    faqHeading: 'Apartment manager questions',
    faqs: [
      {
        q: 'Can Mae book tours?',
        a: "At launch she takes the prospect's details and preferred times and sends them to leasing. Booking straight into your tour calendar is {tourBookingTiming}.",
        gateOk: true,
      },
      {
        q: 'What about a storm night with lots of calls?',
        a: 'Mae answers up to {concurrentCalls} calls at once, so a resident with a leak is not stuck behind a flood in another building.',
      },
      {
        q: "Do residents know it's not a person?",
        a: 'Mae introduces herself by name and says she is an AI voice agent if asked. Most callers just want the problem handled.',
      },
      {
        q: 'Which plan fits a 120-unit community?',
        a: 'Starter, at {starter.price} for {starter.minutes} minutes, covers about {starter.calls} calls of {typicalCallMinutes} minutes. We check your real call volume on the setup call and suggest a plan.',
      },
    ],
    ctaHeading: 'Bring your on-call schedule. We will set up the rest.',
    related: ['hoa', 'student-housing'],
  },
  {
    slug: 'hoa',
    name: 'HOAs and community associations',
    cardLine: 'Common-area emergencies and homeowner calls.',
    title: 'HOA Answering Service for After-Hours Calls | MaeDay',
    metaDescription:
      'After-hours answering for HOAs and community associations: common-area emergencies reach your on-call contact, homeowner calls are logged by association.',
    eyebrow: 'HOAs and community associations',
    h1: 'HOA answering service for after-hours calls',
    intro:
      'After hours, association calls are about the things nobody owns alone: the gate, the pool, the roof over six units. Mae answers in your company name, sends common-area emergencies to whoever is on call for that association, and logs the rest for your team.',
    primary: 'hoa answering service',
    secondaries: ['community association answering service', 'hoa after hours answering'],
    audience: 'HOA and community association managers',
    answerHeading: 'What does an HOA answering service do?',
    answer:
      "It answers the management company's line for each association when the office is closed. Common-area emergencies such as a roof leak into several units or a gate stuck open go to the on-call contact for that association. Homeowner repairs and board messages are logged with the association's name for the morning.",
    callLog: {
      label: 'Thursday night',
      company: 'Lakeview Estates HOA, 240 homes',
      note: 'Example calls. Names and numbers are invented.',
      lines: [
        { time: '9:52 PM', caller: 'Tom Becker · 555-0177 · 18 Heron Way', quote: 'The main gate is stuck open and cars are driving straight in.', tag: 'emergency' },
        { time: '9:53 PM', text: 'Calling Rosa Diaz, on-call for Lakeview', status: 'answered, connected' },
        { time: '10:31 PM', caller: 'Linda Park · 555-0119 · board member', quote: 'Can you tell the manager the pool lights are out again?', tag: 'morning' },
        { time: '10:33 PM', text: "Logged for the manager with Lakeview's name and Linda's number" },
      ],
    },
    problemsHeading: 'Why are association calls hard to answer at night?',
    problems: [
      {
        title: 'Common areas have no single owner',
        text: 'A tenant calls their landlord. A homeowner with water coming through the ceiling from the roof calls whoever answers, and that is often your personal cell.',
      },
      {
        title: 'Whose repair is it?',
        text: 'A leak inside a home is usually the owner\'s problem. A leak from the roof or a shared pipe is the association\'s. The night answerer needs your rules to tell the two apart.',
      },
      {
        title: 'Every association has its own list',
        text: 'One board wants a call for a stuck gate, another only for water or fire. Keeping track of that across several associations is a job in itself.',
      },
    ],
    implicationsHeading: 'What does a missed common-area call cost?',
    implications: [
      {
        title: 'Damage across several homes',
        text: 'A roof or shared-pipe leak does not stop at one unit. Each hour it waits can add another homeowner, and another claim against the association.',
      },
      {
        title: 'Security and liability',
        text: 'A gate or garage door stuck open overnight is an open door to the whole community, and the board will ask who knew and when.',
      },
      {
        title: 'A board that wants a record',
        text: 'When the board asks what happened on Thursday night, a timestamped log of who called and who was reached is a much better answer than a recollection.',
      },
    ],
    needPayoffHeading: 'What changes when the right contact gets the call?',
    needPayoffIntro: 'Common-area emergencies reach the person on call for that association, and homeowner repairs stop waking you up.',
    needPayoff: [
      { title: 'Each association on its own rules', text: 'Mae knows which association the caller belongs to from the address and follows that list and ladder.' },
      { title: 'Homeowner repairs handled politely', text: 'Your script explains what the association covers and what it does not, and the call is logged in case the board wants to follow up.' },
      { title: 'A record for every board meeting', text: 'Every call and every attempt is timestamped, with the association name on it.' },
    ],
    callsHeading: 'What do association calls look like after hours?',
    calls: [
      { title: 'Roof leaks into several units', text: 'Water from the roof or a shared pipe goes to your on-call ladder. Mae asks how many homes are affected.', tag: 'Emergency', tagKind: 'emergency' },
      { title: 'Gates and garage doors', text: 'Stuck open or stuck shut. Your list says whether it is a call tonight or a ticket for the morning.', tag: 'Your list', tagKind: 'neutral' },
      { title: 'Pools, sprinklers and amenities', text: 'A broken sprinkler head flooding the street, pool lights out, a clubhouse door left open. Logged or escalated by your rules.', tag: 'Your list', tagKind: 'neutral' },
      { title: 'Repairs inside a home', text: 'Mae explains, from your script, that repairs inside the home are the owner\'s, and logs the call for your team.', tag: 'Logged for morning', tagKind: 'morning' },
      { title: 'Board members', text: 'Recognized by name and number and passed to the manager as a message, so they stop calling your cell at night.', tag: 'Owners and board', tagKind: 'neutral' },
      { title: 'Neighbor complaints', text: 'Noise, parking and pets, logged with the address. If someone feels unsafe, Mae tells them to call 911.', tag: 'Logged', tagKind: 'morning' },
    ],
    specifics: [
      {
        heading: 'How does Mae tell an association repair from a homeowner repair?',
        intro: 'She follows the responsibility rules you give her for each association. When the rules do not cover a call, she treats it the safe way you choose: escalate, or log it for the morning.',
        items: [
          'Common elements (roof, exterior walls, shared pipes, gates, pools) follow the association\'s emergency list.',
          'Repairs inside a home are explained as the owner\'s responsibility, in your words, and logged.',
          'Calls that could be either, such as water coming through a ceiling, are escalated unless your rules say otherwise.',
          'Board members and committee chairs can be named so their calls reach the manager as messages.',
        ],
        examples: [
          { name: 'Lakeview Estates', text: 'On-call: Rosa, then the manager. Gate stuck open: call tonight.' },
          { name: 'Pine Ridge Townhomes', text: "On-call: the community's own tech, then Rosa. Pool calls: log for morning." },
        ],
        note: 'Example associations. Names are invented.',
      },
    ],
    faqHeading: 'HOA manager questions',
    faqs: [
      {
        q: 'Can each association have its own after-hours rules?',
        a: 'Yes. Every association gets its own emergency list, on-call ladder and wording, and Mae picks the right one from the caller\'s address or community name.',
      },
      {
        q: 'What happens when a homeowner calls about a repair inside their home?',
        a: 'Mae explains, using your script, what the association covers, logs the call with the address, and tells the homeowner when your team will follow up.',
      },
      {
        q: 'Can board members reach the manager after hours?',
        a: 'They get a message to the manager by email, logged with their name. If you want certain board calls transferred, we set that up per association.',
      },
      {
        q: 'Which plan fits a company that manages several associations?',
        a: 'Plans are by minutes, not by association. Growth, at {growth.price} for {growth.minutes} minutes, covers about {growth.calls} calls of {typicalCallMinutes} minutes. We check your volume on the setup call.',
      },
    ],
    ctaHeading: 'Bring your association list. We will set up each one.',
    related: ['apartments', 'single-family-rentals'],
  },
];

export function getSegment(slug: string): Segment | undefined {
  return segments.find((s) => s.slug === slug);
}
