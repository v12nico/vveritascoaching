// ─── OCCUPATION CAMPAIGNS ────────────────────────────────────────────────────
// One message per trade, not one message for everybody. A flyer that addresses
// "every occupation" addresses none of them — the whole reason a narrow flyer
// converts is that the reader thinks "that is literally my job".
//
// The PRODUCT never changes. Same dashboard, same programming, same coach. Only
// the pain named at the top changes. Adding a sector is a new entry here.
//
// Rules for writing one:
//   · the hook names a specific fact of their day, never a fitness outcome
//   · the sub says the thing their job makes impossible
//   · the five lines answer that objection, in their language
//   · close on identity, not on training

export const OCCUPATIONS = [
  {
    key: 'healthcare',
    kicker: 'for baltimore healthcare',
    hook: ['every program', 'assumes you', 'wake up at |seven|.'],
    sub: 'you don’t. twelve-hour shifts, thirteen hours away from your kitchen. you eat '
       + 'when you can, not when you should — and you’re on your feet all day and somehow '
       + 'still haven’t trained.',
    lines: [
      'built around your actual shift. nights included.',
      'four short sessions, not six long ones',
      'food that survives thirteen hours away from a kitchen',
      'check in whenever your night ends — 3am is fine',
      'every set logged, so you’re never guessing what to lift',
    ],
    close: ['built for people who', 'take care of |everyone else|.'],
  },
  {
    key: 'trades',
    kicker: 'for the trades',
    hook: ['you’ve been up', 'since five. the gym', 'is not the |hard part|.'],
    sub: 'hands wrecked, back tight, and every plan you’ve seen was written for somebody '
       + 'who sat down all day. you don’t need more volume. you need training that counts '
       + 'the eight hours you already did.',
    lines: [
      'built around a body that already worked today',
      'short sessions — not two hours after a ten hour day',
      'food that survives a truck and a cooler',
      'lifting that fixes your back instead of adding to it',
      'every set logged, so progress is a fact and not a feeling',
    ],
    close: ['built for people who', 'already did |a day’s work|.'],
  },
  {
    key: 'federal',
    kicker: 'for fort meade & the corridor',
    hook: ['you sit for nine', 'hours and call it', 'a |desk job|.'],
    sub: 'cleared, salaried, completely sedentary. the badge doesn’t come off, the chair '
       + 'doesn’t move, and “go to the gym more” is not a plan when you’re on site by seven.',
    lines: [
      'built around a badge-in, badge-out day',
      'three sessions a week, not six',
      'food you can pack the night before',
      'real work on what nine hours of sitting does to your hips and back',
      'every set logged, so you can actually see it working',
    ],
    close: ['built for people who can’t', 'talk about |their day|.'],
  },
  {
    key: 'responders',
    kicker: 'for police, fire & ems',
    hook: ['twenty-four on.', 'forty-eight off.', 'no program fits |that|.'],
    sub: 'every plan assumes a monday. you don’t have mondays. you have rotations, calls '
       + 'at 3am, and a body that has to be ready whether or not you slept.',
    lines: [
      'built around your rotation, not a calendar week',
      'train hard on days off, maintain on shift',
      'food that works at a station',
      'ready when it matters — not just aesthetic',
      'every set logged, so one bad tour doesn’t erase a good month',
    ],
    close: ['built for people who', 'run |toward it|.'],
  },
  {
    key: 'service',
    kicker: 'for retail, service & hospitality',
    hook: ['nine hours on your', 'feet and you never', 'got a |lunch break|.'],
    sub: 'no set schedule, no real break, shifts that move every week. every plan you’ve '
       + 'seen assumes you eat at noon. you haven’t eaten at noon in a year.',
    lines: [
      'built around a schedule that changes every week',
      'food you can genuinely eat standing up',
      'four short sessions, moved when your shift moves',
      'no sunday meal prep required',
      'every set logged, so the weeks you get slammed still count',
    ],
    close: ['built for people who don’t', 'get a |lunch break|.'],
  },
  {
    key: 'teachers',
    kicker: 'for teachers',
    hook: ['you didn’t sit', 'down once. you', 'also didn’t |eat|.'],
    sub: 'a twenty-five minute lunch, papers at night, and you’re expected to have energy '
       + 'at seven tomorrow. nobody writes programs for a job with no breaks in it.',
    lines: [
      'built around a bell schedule',
      'food that fits a twenty-five minute lunch',
      'three sessions, done before dinner',
      'something for the stress, not just the physique',
      'every set logged, so you can see it working',
    ],
    close: ['built for people who give', 'it all away |by three|.'],
  },
  {
    key: 'drivers',
    kicker: 'for drivers & logistics',
    hook: ['you sit for ten', 'hours and it', 'still |wrecks you|.'],
    sub: 'seat, dock, seat again. the food is whatever’s on the route and the only stretch '
       + 'you get is climbing out of the cab.',
    lines: [
      'built around windshield time',
      'food you can buy on a route — no meal prep',
      'short sessions that fit around a run',
      'real work on the back and hips that sitting destroys',
      'every set logged, so a hard week doesn’t feel wasted',
    ],
    close: ['built for people who', 'live |on the road|.'],
  },
]

export default OCCUPATIONS
