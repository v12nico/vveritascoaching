// ─── OLAF ZMUDZKI — PHASE TWO ────────────────────────────────────────────────
// Built from his intake (client_intakes row 4, submitted 2026-08-09 05:01).
//
// This file is the PRESCRIPTION — the plan Nico assigns. It is deliberately not
// where progress lives: logs, check-ins and weights belong in the database, and
// putting them here would mean editing code every time he trains.
//
// 6'1", 146 lb, wants to build muscle. This is not a fat-loss program and the
// content must never drift into one.
//
// PHASE TWO from 2026-09-14 (week 5 of 8). Phase one was scored on consistency
// and the mirror, and he passed — 30 lb on the chest-supported row in three
// weeks at an unchanged bodyweight. Phase two is scored on the scale, because
// size needs mass. The target (152), the intake (3,100) and the end date
// (2026-10-12) are duplicated in docs/olaf-call-2026-09-14.html — change one
// and you must change the other.

export const olaf = {
  token: 'olaf-2f7k9qxm',          // the URL he gets; not guessable, not his name
  name: 'Olaf',
  fullName: 'Olaf Zmudzki',
  email: 'olaf.31052007@gmail.com',
  startedOn: '2026-08-09',

  title: 'OLAF — PHASE TWO',
  subtitle: 'the frame is built. now we add size.',

  stats: {
    age: 19, height: "6'1\"", weight: '146 lb', location: 'toronto',
  },

  objective: {
    primary: 'build muscle',
    secondary: 'improve overall health',
    // His own words, from the intake. Kept verbatim — it is what he is here for.
    why: 'i’ve been wanting to improve my health for a long time but haven’t had the opportunity.',
    priorities: ['legs', 'chest', 'shoulders', 'core', 'proportions'],
  },

  // ── the current block ──────────────────────────────────────────────────────
  // Still keyed week1 because the component reads that key for every client.
  // `label` overrides the hardcoded "week one" heading — without it his
  // dashboard tells a man in week five that he is in week one.
  week1: {
    label: 'week five · phase two',
    mission: 'eat past 146.',
    note: 'phase one was about proving you would show up, and you did — thirty pounds '
        + 'on your row in three weeks at the same bodyweight. that was the frame. this '
        + 'phase has one number in it, and the scale is where it shows. everything '
        + 'below is there to move it.',
    targets: [
      'weigh in every morning, before food',
      'eat 3,100 calories — track them, not just the protein',
      'protein stays 140–160 g',
      'two walks a week. that is the entire cardio plan',
      'photos tonight, then every sunday',
      'message me every night, training day or not',
    ],
  },

  // ── phase one, and what changed ────────────────────────────────────────────
  // Read by scripts/render-olaf-sheet.mjs. The phase-one column lives here
  // because the rest of this file was overwritten when phase two started, so
  // without it there is no record of what he is being moved away from.
  phaseOne: {
    label: 'what phase one proved',
    note: 'five weeks, and the scale never moved. that was not a failure — it is what '
        + 'building and staying lean at the same time looks like. here is what it cost you.',
    proved: [
      '14 sessions logged. four days a week, mostly held.',
      '+30 lb on the chest-supported row — 140 to 170 in three weeks.',
      '+10 lb on the lat pulldown — 130 to 140.',
      'seated leg curl 80 to 100. leg extension 130 to 140.',
      'protein hit or close on 8 of your last 9 check-ins.',
    ],
  },

  changes: [
    { item: 'scored on',    from: 'consistency, and the mirror', to: 'the scale' },
    { item: 'target',       from: 'none',                        to: '152 by october 12' },
    { item: 'food',         from: 'protein only',                to: '3,100 kcal a day' },
    { item: 'tracked',      from: 'protein',                     to: 'calories and protein' },
    { item: 'weigh-ins',    from: 'twice in five weeks',         to: 'every morning, before food' },
    { item: 'cardio',       from: 'two walks — drifted to daily',to: 'two walks. that is all' },
    { item: 'photos',       from: 'none',                        to: 'tonight, then every sunday' },
    { item: 'after oct 12', from: '—',                           to: 'you run it yourself' },
  ],

  // Named by token, not by name: this file carries his weight and his own words,
  // and /olaf-phase-two.pdf would be as guessable as /client/olaf.
  sheet: { href: '/sheets/olaf-2f7k9qxm.pdf', label: 'phase two — the whole plan (pdf)' },

  // ── the arc ────────────────────────────────────────────────────────────────
  // Four weeks left and then he runs it alone, so the plan past the program is
  // part of the plan. He should be able to see the exit from the dashboard.
  arc: {
    label: '8 weeks · four behind you, four left',
    note: 'these last four weeks are not just more coaching. they are you learning to '
        + 'run this without me, because on october 12 that is exactly what happens.',
    phases: [
      { weeks: '1–4', name: 'the frame',
        goal: 'show up four days a week, eat consistently, learn the lifts.',
        marker: 'done. 30 lb on your row and 10 on your pulldown, at the same bodyweight.' },
      { weeks: '5–8', name: 'the size',
        goal: 'eat past 146. 3,100 a day, cardio back down to two walks.',
        marker: '152 on the scale by october 12, with photos to prove it.' },
      { weeks: '9+', name: 'on your own',
        goal: 'same three rules, no me. progression, weekly average, protein floor.',
        marker: '160 by january.' },
    ],
  },

  // He is about to see water and glycogen move the scale fast, then watch it
  // slow down. Both are the plan working. Unwarned, he reads the fast part as
  // proof and the slow part as failure, and stops eating.
  reminder: {
    label: 'when the scale jumps in week one',
    text: 'you are going to see 2–3 lb appear in the first ten days. that is not fat '
        + 'and it is not a head start. you have been eating around 2,400 and your '
        + 'muscles have been running low on fuel — filling them back up shows on the '
        + 'scale almost immediately, and it is why you will look fuller before you are '
        + 'actually bigger. after that it settles to about a pound a week. the fast '
        + 'part and the slow part are the same plan.',
  },

  // ── training ───────────────────────────────────────────────────────────────
  // 4 days, upper/lower. Machines and supported movements, because he said he
  // dislikes squats and deadlifts — forcing them would cost adherence, and
  // adherence is the whole objective. Two hard working sets, low junk volume.
  training: {
    structure: 'upper / lower · 4 days',
    rule: '2 working sets per movement. warm up first. last set should be hard — '
        + '1–2 reps left in the tank, not failure with sloppy form.',
    days: [
      {
        day: 'tuesday', label: 'upper a', focus: 'chest emphasis',
        exercises: [
          { name: 'incline chest press machine', sets: 2, reps: '6–8',  cue: 'control the way down. drive through the chest, not the shoulders.' },
          { name: 'pec deck / chest fly',        sets: 2, reps: '8–10', cue: 'stretch under control. never let the stack slam.' },
          { name: 'chest-supported row',         sets: 2, reps: '6–10', cue: 'chest stays on the pad. pull with the back, not the arms.' },
          { name: 'neutral-grip lat pulldown',   sets: 2, reps: '6–10', cue: 'elbows down and in. no leaning back for momentum.' },
          { name: 'machine lateral raise',       sets: 2, reps: '8–12', cue: 'light. this is the one you go slow on.' },
          { name: 'cable triceps pressdown',     sets: 2, reps: '6–10', cue: '' },
          { name: 'machine or cable curl',       sets: 2, reps: '6–10', cue: '' },
        ],
      },
      {
        day: 'wednesday', label: 'lower a', focus: 'quad emphasis',
        exercises: [
          { name: 'leg press',            sets: 2, reps: '6–10', cue: 'full range you can control. knees track over toes.' },
          { name: 'leg extension',        sets: 2, reps: '8–12', cue: 'pause a beat at the top.' },
          { name: 'seated leg curl',      sets: 2, reps: '6–10', cue: '' },
          { name: 'adductor machine',     sets: 2, reps: '8–12', cue: '' },
          { name: 'calf raise',           sets: 2, reps: '8–12', cue: 'full stretch at the bottom.' },
          { name: 'cable crunch',         sets: 2, reps: '8–12', cue: '' },
        ],
        note: 'no barbell squat. not needed for what we’re building.',
      },
      {
        day: 'thursday', label: 'upper b', focus: 'back + shoulders',
        exercises: [
          { name: 'chest-supported row',              sets: 2, reps: '6–8',  cue: 'heaviest back movement of the week. earn it.' },
          { name: 'lat pulldown',                     sets: 2, reps: '6–10', cue: '' },
          { name: 'flat or slight-incline chest press', sets: 2, reps: '6–10', cue: '' },
          { name: 'rear delt machine',                sets: 2, reps: '8–12', cue: '' },
          { name: 'lateral raise machine',            sets: 2, reps: '8–12', cue: '' },
          { name: 'preacher curl machine',            sets: 2, reps: '6–10', cue: '' },
          { name: 'overhead cable triceps extension', sets: 2, reps: '6–10', cue: '' },
        ],
      },
      {
        day: 'sunday', label: 'lower b', focus: 'posterior chain + legs',
        exercises: [
          { name: 'hack squat or pendulum squat', sets: 2, reps: '6–10', cue: 'if the machine doesn’t feel right, use leg press instead and tell me.' },
          { name: 'lying or seated leg curl',     sets: 2, reps: '6–10', cue: '' },
          { name: 'hip extension / back extension', sets: 2, reps: '8–12', cue: '' },
          { name: 'leg extension',                sets: 2, reps: '8–12', cue: '' },
          { name: 'calf raise',                   sets: 2, reps: '8–12', cue: '' },
          { name: 'ab machine or cable crunch',   sets: 2, reps: '8–12', cue: '' },
        ],
        note: 'no conventional deadlift.',
      },
    ],
    progression: {
      rule: 'double progression.',
      explain: 'stay at the same weight until you hit the TOP of the rep range on both '
             + 'working sets. then add the smallest jump available and start again at the bottom.',
      example: '80 × 7 and 80 × 6 → keep 80.  80 × 8 and 80 × 8 → go to 85.',
    },
    sleep: {
      headline: '8–9 hours. you already have it.',
      note: 'bed 11–12, up at 8. that’s the one thing you don’t need to fix — so don’t '
          + 'break it. every low-energy day you’ve logged was a day you got up early.',
    },
    cardio: {
      headline: 'two walks a week. that is all.',
      note: 'the hikes, the hour in the forest, the 10k step target, the walk after '
          + 'every meal — you added all of that yourself and none of it was in the plan. '
          + 'each one is small. together they are a part-time job, and every one of them '
          + 'eats the surplus before it lands. stopping is not laziness. two incline '
          + 'walks, 15–20 minutes, and the rest of that effort goes into food.',
    },
  },

  // ── nutrition ──────────────────────────────────────────────────────────────
  // He said "you decide for me". His real problem is not eating enough or often
  // enough — first meal at 2pm, no lunch break. Precision comes later.
  nutrition: {
    headline: 'eat past 146.',
    note: 'five flat weeks is not a mystery. you have been hitting protein, eating '
        + 'about maintenance, and then walking off whatever was left. the protein part '
        + 'is solved — this phase is about total food.',
    protein: { target: 150, min: 140, max: 160, unit: 'g' },
    proteinNote: 'anywhere in 140–160 is a win. 138 is not a failure — stop counting it as one.',
    // Protein was never the problem. This is.
    calories: {
      target: 3100,
      range: 'the floor is 3,000. under that is a maintenance day.',
      note: 'protein is the floor, calories are the lever. 150 g inside 2,400 calories '
          + 'is a maintenance day with good protein — which is exactly what the last '
          + 'five weeks were. weigh it or use the app, but know the number.',
    },
    // Two shapes, because his days are not the same. Work is Fri–Mon 9–5 with no
    // lunch break; school is Tue–Thu. Giving him one structure would mean it is
    // wrong four days a week — and the days it is wrong are the hard ones.
    workDays: {
      label: 'friday – monday · work 9–5',
      note: 'no real lunch break. everything here has to survive a bag and a shift.',
      meals: [
        { slot: 'meal 1 — before 9am', protein: '30–40 g',
          options: ['4 eggs', 'greek yogurt or cottage cheese', 'potatoes', 'fruit', 'milk', 'coffee'],
          note: 'you wake at 8 and start at 9. you have the hour. this is the meal that '
              + 'has never once happened and it is the one that decides whether you gain.' },
        { slot: 'work meal — portable', protein: '30–40 g',
          options: ['drinkable greek yogurt', 'canned wild-caught fish', 'aged cheese',
                    'pre-cooked ground beef', 'boiled eggs', 'fruit'],
          note: 'carrots and a shake is not a meal. this is the one we fix first.' },
        { slot: 'post-work meal', protein: '40 g+',
          options: ['ground beef or steak', 'potatoes or sweet potatoes', 'aged cheddar', 'fruit'] },
        { slot: 'evening', protein: '30–40 g',
          options: ['protein source', 'carb source', 'fruit', 'dairy if you want it'] },
      ],
    },
    offDays: {
      label: 'tuesday – thursday · school',
      note: 'you are home and you can actually cook. this is where you make up ground '
          + 'and where the training days live — tue, wed and thu are all sessions.',
      meals: [
        { slot: 'breakfast', protein: '35–45 g',
          options: ['eggs', 'steak or ground beef', 'potatoes', 'fruit', 'milk', 'coffee'] },
        { slot: 'lunch', protein: '35–45 g',
          options: ['red meat', 'fish or scallops', 'rice or potatoes', 'aged cheese', 'fruit'] },
        { slot: 'pre-workout', protein: 'light',
          options: ['fruit', 'orange juice', 'water and salt'] },
        { slot: 'dinner — post-workout', protein: '40 g+',
          options: ['ground beef or steak', 'potatoes or rice', 'greek yogurt', 'fruit', 'honey'] },
      ],
    },
    preWorkout: 'fruit or orange juice, and water. keep it simple.',
    rhythm: '3–4 real feedings. not six. you don’t have time for six and you don’t need them.',
  },

  grocery: [
    { group: 'protein', items: ['eggs', 'ground beef', 'steak', 'greek yogurt', 'cottage cheese',
                                'whole milk', 'aged cheese', 'scallops', 'oysters', 'fish', 'whey protein'] },
    { group: 'carbs + fruit', items: ['potatoes', 'sweet potatoes', 'oranges', 'orange juice',
                                      'bananas', 'apples', 'mango', 'rice', 'honey'] },
    { group: 'work survival', items: ['ready-to-drink protein', 'yogurt cups', 'cheese portions',
                                      'pre-cooked meat', 'fruit you can carry', 'trail-friendly carbs'],
      note: 'the entire point of this shelf is deleting the sentence "i didn’t have time to eat."' },
  ],

  daily: [
    'weigh in first thing, before food',
    'train if it is a training day',
    'hit 3,100 calories and 140–160 g protein',
    'eat 4–5 real feedings',
    'no unplanned delivery',
    'message me at night',
  ],

  // His exact words were "never let me get a cheat meal in". Taken as what he
  // meant — no impulsive uber eats — not as a licence to moralise food at him.
  standard: {
    label: 'no impulsive off-plan orders',
    quote: 'never let me get a cheat meal in.',
    note: 'this isn’t about one meal being evil. it’s about the 11pm order you didn’t '
        + 'plan and didn’t want. if you want something off-plan, tell me first and we '
        + 'fit it in on purpose.',
  },

  followUp: 'you are 146 with four weeks left. 152 is the number and it is reachable, '
          + 'but only if the food goes up and the walking comes down on the same day. '
          + 'one without the other is another five flat weeks.',
}

export default olaf
