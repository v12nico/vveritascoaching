// ─── TAYLLORE JOHNSON — THE EDUCATION BLOCK ──────────────────────────────────
// Built from her intake (submitted 2026-09-05 19:13).
//
// 32, 5'7", 203 lb, down 40 lb in six months. Cyber security, Owings Mills.
// In person every Sunday at Anytime Fitness Columbia. 8 weeks.
//
// SHE TOLD US WHAT SHE IS BUYING, IN HER OWN WORDS:
//   "I'm looking for hands-on education so that I can sustain myself after
//    coaching is over. Body recomp is secondary. That will come once I execute
//    with proper education."
//
// So this file is a CURRICULUM. Every phase teaches one principle she can name
// and use on her own in week nine. If it reads like a plan she has to be given
// again in twelve weeks, it has failed at the thing she actually paid for.
//
// THE CONSTRAINT: she has eaten roughly 1,499 kcal for six months at 203 lb.
// Energy is 5/10 and the scale has stopped. Her instinct — written on the
// intake — is "I can slow my food intake down." The whole first phase is
// pointed the other way. Nothing in this file may drift into a deeper deficit.

export const tayllore = {
  token: 'tayllore-6r3nw8qz',
  name: 'Tayllore',
  fullName: 'Tayllore Johnson',
  email: 'taydj5@gmail.com',
  // First in-person sunday, not the day she is sent the link. She gets the
  // dashboard early to read; nothing is logged until the block opens. The
  // missed-checkin cron watches from startedOn, so an earlier date would email
  // Nico that she went quiet during the eleven days before she had started.
  startedOn: '2026-09-20',

  title: 'TAYLLORE — THE EDUCATION BLOCK',
  subtitle: 'learn the lifts. eat enough to build. leave able to run it yourself.',

  stats: { age: 32, height: "5'7\"", weight: '203 lb', location: 'owings mills' },

  objective: {
    primary: 'body recomposition',
    secondary: 'understand progressive overload well enough to program yourself',
    // Her words, verbatim from the intake. This is the brief.
    why: 'i want to feel good in my body. i want to be confident. i also want to work out with my mom.',
    priorities: ['stomach / waist', 'glutes', 'strength', 'independence'],
  },

  // ── the 8 weeks ─────────────────────────────────────────────────────────────
  // A curriculum, not a calendar. Each phase has one idea she should be able to
  // explain back without notes — that is the actual deliverable.
  arc: {
    label: '8 weeks · 8 sundays · columbia',
    note: 'sunday is the lesson. the other six days are you proving you can run it '
        + 'without me. by week eight you should be writing the next block yourself.',
    phases: [
      { weeks: '1–2', name: 'the lifts',
        goal: 'learn squat, hip thrust and rdl properly, and eat more than you have been.',
        marker: 'you can set up an rdl without asking. measurements taken.' },
      { weeks: '3–5', name: 'progressive overload',
        goal: 'the one thing you said you want to truly understand. you will run it, not hear about it.',
        marker: 'you can look at last week’s log and tell me what today should be.' },
      { weeks: '6–7', name: 'pushing',
        goal: 'real intensity. this is the part you said you skip.',
        marker: 'you know what one or two reps left in the tank actually feels like.' },
      { weeks: '8', name: 'handover',
        goal: 'you write block two. i check it.',
        marker: 'you leave with a program you wrote and can defend.' },
    ],
  },

  week1: {
    mission: 'eat more. lift heavier. measure everything.',
    note: 'you have eaten around 1,500 calories for six months and the scale stopped. '
        + 'that is not a broken metabolism, that is a body that adapted exactly like it '
        + 'is supposed to. week one we go up, not down. the scale may rise a pound or '
        + 'two of food and water. that is expected and it is not fat.',
    targets: [
      'measure waist and hips — the scale is the worst tool you own right now',
      'three sessions: sunday with me, wednesday, friday',
      'hit the protein number every day',
      'eat the fourth feeding, even when you are not hungry',
      'keep one run. add two incline walks instead.',
      'check in each night, two lines',
    ],
  },

  // ── training ────────────────────────────────────────────────────────────────
  // She is experienced, not a beginner — "on and off" lifting, currently doing
  // 2 miles 4x a week and strength ONCE. The ratio is the problem, not the
  // effort. Barbell over machines throughout: she named barbell squats and
  // barbell hip thrusts as lifts she loves, and said she hates the thrust
  // machine. Build on what she already wants to do.
  training: {
    structure: 'lower / upper / lower · 3 days',
    rule: 'two working sets that actually mean something. the last one should have '
        + '1–2 reps left in it — not failure, not comfortable. you said you '
        + 'need to push harder in your sessions. this is where that happens.',
    days: [
      {
        day: 'sunday', label: 'lower a · with me', focus: 'the teaching session',
        exercises: [
          { name: 'barbell back squat',   sets: 3, reps: '5–8',  cue: 'your favourite, so it leads. we build the whole block around this one.' },
          { name: 'romanian deadlift',    sets: 3, reps: '8–10', cue: 'the one you said your form is never right on. we fix it in week one, on camera, so you can check yourself later.' },
          { name: 'barbell hip thrust',   sets: 3, reps: '8–10', cue: 'barbell, not the machine. pause a full second at the top.' },
          { name: 'bulgarian split squat', sets: 2, reps: '8–10 each', cue: 'you like these. they stay.' },
          { name: 'cable crunch',         sets: 3, reps: '10–15', cue: 'this builds the muscle under your stomach. it does not burn fat off it — nothing does.' },
        ],
        note: 'this is the hour you are paying for. come with questions.',
      },
      {
        day: 'wednesday', label: 'upper', focus: 'push · pull',
        exercises: [
          { name: 'chest-supported row',      sets: 3, reps: '8–10', cue: 'chest stays on the pad. pull with your back, not your arms.' },
          { name: 'lat pulldown',             sets: 3, reps: '8–12', cue: '' },
          { name: 'dumbbell shoulder press',  sets: 2, reps: '8–12', cue: '' },
          { name: 'incline dumbbell press',   sets: 2, reps: '8–12', cue: '' },
          { name: 'rear delt fly',            sets: 2, reps: '12–15', cue: '' },
          { name: 'bicep curl',               sets: 2, reps: '10–12', cue: '' },
        ],
        note: 'you work remotely wednesday. train before you open your laptop, not after.',
      },
      {
        day: 'friday', label: 'lower b', focus: 'glutes · hamstrings',
        exercises: [
          { name: 'barbell hip thrust',   sets: 3, reps: '6–8',  cue: 'heaviest thrust of the week. this is the glute builder.' },
          { name: 'goblet or hack squat', sets: 3, reps: '10–12', cue: 'lighter than sunday, more reps.' },
          { name: 'seated leg curl',      sets: 3, reps: '10–12', cue: '' },
          { name: 'walking lunge',        sets: 2, reps: '10 each', cue: '' },
          { name: 'hanging knee raise',   sets: 3, reps: '10–15', cue: '' },
        ],
      },
    ],
    progression: {
      rule: 'double progression. this is the thing you asked to truly understand.',
      explain: 'you do not add weight because a week went by. you add it when you have '
             + 'earned it. stay at the same weight until you hit the TOP of the rep range '
             + 'on every working set. only then go up the smallest jump available, and '
             + 'start again at the bottom of the range. that is the entire system, and it '
             + 'is why the log matters more than how you felt.',
      example: '135 × 6 and 135 × 5 → keep 135.  135 × 8 and 135 × 8 → go to 145.',
    },
    sleep: {
      headline: '21:30 to 04:15, and you rated it 10/10.',
      note: 'you are the first client i have had who does not need this fixed. protect it. '
          + 'it is doing more for your recovery than anything i could add.',
    },
    cardio: {
      headline: 'lift first. incline walk second. keep one run.',
      note: 'you run four times a week and lift once. the running is not the problem \u2014 '
          + 'the ratio is. three lifting sessions become the priority, incline walking '
          + 'becomes the cardio that does not eat your recovery, and you keep one run a '
          + 'week because you actually like it and it keeps you conditioned. '
          + 'incline walk: 12 percent, 3 mph, 20\u201330 minutes, after lifting or on an off '
          + 'day. it burns real energy without making you hungrier or more beat up, which '
          + 'is exactly what running four times a week was doing to you.',
    },
  },

  // ── nutrition ───────────────────────────────────────────────────────────────
  // She said "you decide for me". She is at ~1,499 kcal, six months deep, and her
  // stated instinct is to eat LESS. Estimated maintenance is roughly 2,300-2,450
  // at 203 lb with her activity, so this is a deliberate step UP toward it.
  // No calorie number is printed on her page on purpose: she struggles with
  // overeating and inconsistent meals, and structure fixes both better than a
  // target she will negotiate with.
  nutrition: {
    headline: 'you are going to eat more. that is the plan.',
    note: 'six months at fifteen hundred calories is why the scale stopped and why your '
        + 'energy sits at a five. we are going up, on purpose, and holding there while '
        + 'you build. the scale may go up a pound or two in week one from food and water. '
        + 'that is not fat and it is not failure — it is the plan working.',
    protein: { target: 150, min: 140, max: 165, unit: 'g' },
    proteinNote: 'four feedings, roughly 38g of protein in each. that is 150. hit that '
               + 'and you do not need to count anything else — protein is what makes '
               + 'sure the weight you add is muscle and not what you just spent six months losing.',

    // ── the standard ──────────────────────────────────────────────────────────
    // She already buys this way — her intake says "I eat whole foods. Local farm
    // raised meat, organic and low toxic food." So this is not a new rule being
    // imposed, it is her own habit given a standard and a reason. The reasons are
    // deliberately plain: she works in cyber security and asked to UNDERSTAND
    // things, so "because I said so" would be the wrong register.
    quality: {
      label: 'the standard',
      headline: 'quality is not a garnish. it is the food.',
      rules: [
        {
          item: 'red meat: grass-fed and grass-finished. never conventional.',
          why: 'a grain-finished cow and a grass-finished one are not the same food. '
             + 'grass-finished has a far better omega-3 to omega-6 ratio and more cla. '
             + 'conventional beef is finished on grain to put weight on fast, and that '
             + 'shows up in the fat you eat.',
        },
        {
          item: 'dairy: grass-fed. full fat.',
          why: 'same animal, same logic. the fat is where the nutrients sit, so '
             + 'low-fat dairy removes the part worth eating and usually replaces it '
             + 'with sugar or gum to fix the texture.',
        },
        {
          item: 'eggs: pasture-raised. corn and soy free if you can find it.',
          why: 'a hen\u2019s diet lands in the yolk. pasture-raised yolks are darker for a '
             + 'reason. corn and soy free is the upgrade if it exists near you \u2014 if it '
             + 'does not, pasture-raised is already most of the win. do not skip eggs '
             + 'over this.',
        },
        {
          item: 'fish: wild caught. fins and scales.',
          why: 'farmed fish are fed the same grain and get the same fat profile problem. '
             + 'salmon, tuna, cod, snapper, tilapia all work inside your restriction.',
        },
        {
          item: 'produce: organic where it matters most.',
          why: 'you do not need to buy everything organic. prioritise the thin-skinned '
             + 'things you eat a lot of \u2014 for you that is kale and blueberries. '
             + 'anything with a peel you throw away matters much less.',
        },
        {
          item: 'no seed oils. cook in butter, ghee, tallow or olive oil.',
          why: 'canola, vegetable, sunflower and soybean oil are industrially processed '
             + 'and heavy in omega-6. this is the single easiest swap on the list and it '
             + 'is mostly about what restaurants cook in, not what you buy.',
        },
      ],
      note: 'you already eat this way \u2014 you told me local farm raised, organic, low toxic. '
          + 'this just makes it a standard instead of a preference. and to be straight with '
          + 'you: none of this is why the scale stopped. it is why you feel good while we '
          + 'fix that. food quality and food quantity are two different problems and you '
          + 'have already solved the harder one.',
    },

    workDays: {
      label: 'monday · tuesday · thursday — in office, 4 to 4',
      note: 'long days away from your kitchen. these are the days you skip meals and then '
          + 'eat everything at night, so these are the ones we build first.',
      meals: [
        { slot: 'before you leave', protein: '38 g',
          options: ['4 eggs + greek yogurt', 'ground beef and rice from last night', 'blueberries'],
          note: 'you are up at 4:15. eat before you drive, not at your desk at eleven.' },
        { slot: 'packed lunch', protein: '38 g',
          options: ['ground beef or chicken, 6 oz', 'rice or pasta, measured the night before', 'kale, steamed or as a salad'] },
        { slot: 'afternoon feeding', protein: '38 g',
          options: ['greek yogurt', 'cottage cheese', 'a tin of fins-and-scales fish', 'cantaloupe'],
          note: 'this is the one that stops the 8pm eating. do not skip it.' },
        { slot: 'dinner', protein: '38 g',
          options: ['lamb, beef or chicken', 'rice or pasta', 'kale', 'pesto on anything'] },
      ],
    },
    offDays: {
      label: 'wednesday · friday · weekend — home, and training days',
      note: 'you are home and you can cook. these are also your three lifting days, so '
          + 'this is where the food actually matters most.',
      meals: [
        { slot: 'breakfast', protein: '38 g', options: ['eggs', 'blueberry smoothie with protein', 'rice or oats'] },
        { slot: 'pre-training', protein: 'light', options: ['fruit', 'cantaloupe', 'coffee'],
          note: 'something small an hour out. do not lift on nothing.' },
        { slot: 'post-training', protein: '40 g+', options: ['ground beef', 'chicken gizzards', 'pasta or rice', 'kale'] },
        { slot: 'evening', protein: '38 g', options: ['greek yogurt', 'cottage cheese', 'blueberries'] },
      ],
    },
    preWorkout: 'fruit or coffee about an hour out. keep it simple.',
    rhythm: 'four feedings. the fourth one is the whole point — it is what stops the '
          + 'overeating at night, which you named yourself as the thing you struggle with.',
  },

  // Built entirely from the foods she listed, inside her restrictions:
  // fins-and-scales seafood only, lamb / chicken / beef only, no bison.
  grocery: [
    { group: 'protein', items: ['ground beef', 'chicken breast + thighs', 'chicken gizzards', 'lamb',
                                'salmon or tilapia', 'eggs', 'greek yogurt', 'cottage cheese'],
      note: 'fins and scales only, and lamb / chicken / beef. no pork, no shellfish, no bison.' },
    { group: 'carbs + fruit', items: ['rice', 'pasta', 'oats', 'blueberries', 'cantaloupe', 'potatoes'] },
    { group: 'the rest', items: ['kale — a lot of it', 'pesto', 'olive oil', 'whatever veg you like'],
      note: 'you said you cannot live without kale, so it gets its own line.' },
    { group: 'sunday prep', items: ['a tray of ground beef', 'a pot of rice', 'boiled eggs', 'portioned yogurt'],
      note: 'monday, tuesday and thursday are 4-to-4. the food has to already exist before those days start.' },
  ],

  daily: [
    'hit your protein',
    'eat the fourth feeding',
    'train if it is a training day',
    'log every set as you go',
    'check in at night',
  ],

  // Her own answer, verbatim: "my workouts! I will keep up with my diet. I just
  // need to push myself during my workouts."
  standard: {
    label: 'the one you set for yourself',
    quote: 'i just need to push myself during my workouts.',
    note: 'so that is the standard. not more sessions, not longer sessions. the last set '
        + 'of every movement has to be genuinely hard. you already know you will keep up '
        + 'with the food — you said so. this is the part i will not let you soften.',
  },

  reminder: {
    label: 'when the scale does not move',
    text: 'you are 203 pounds and down forty. the scale is the worst measure of what we '
        + 'are doing now, because building and losing at the same time barely shows on it. '
        + 'the tape measure and the log are the real scoreboard. check those.',
  },

  followUp: 'i need your waist and hips before sunday — you left them blank and they '
          + 'are the only numbers that will show what is actually happening over eight weeks. '
          + 'take them first thing, before eating, and send them to me.',
}

export default tayllore
