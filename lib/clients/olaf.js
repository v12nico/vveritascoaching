// ─── OLAF ZMUDZKI — BUILD PHASE ──────────────────────────────────────────────
// Built from his intake (client_intakes row 4, submitted 2026-08-09 05:01).
//
// This file is the PRESCRIPTION — the plan Nico assigns. It is deliberately not
// where progress lives: logs, check-ins and weights belong in the database, and
// putting them here would mean editing code every time he trains.
//
// 6'1", 146 lb, wants to build muscle. This is not a fat-loss program and the
// content must never drift into one.

export const olaf = {
  token: 'olaf-2f7k9qxm',          // the URL he gets; not guessable, not his name
  name: 'Olaf',
  fullName: 'Olaf Zmudzki',
  email: 'olaf.31052007@gmail.com',
  startedOn: '2026-08-09',

  title: 'OLAF — BUILD PHASE',
  subtitle: 'build the frame. build the routine. build confidence.',

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

  // ── week one ───────────────────────────────────────────────────────────────
  week1: {
    mission: 'prove consistency.',
    note: 'this week isn’t about doing everything perfectly. i need data. train, eat '
        + 'consistently, check in, and let me see how your body and schedule respond. '
        + 'then we make the plan more precise.',
    targets: [
      'complete 4 / 4 workouts',
      'hit your protein range at least 6 of 7 days',
      'build one reliable work meal you can repeat',
      'message me each night — two lines is enough',
      'weigh in once, first thing, before eating',
      'tell me your real wake time on work days',
    ],
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
    cardio: {
      headline: '1–2 incline walks a week · 15–20 min',
      note: 'you already walk, and i’m not taking it away. but we’re building muscle, '
          + 'so cardio is for your heart and your recovery — not for burning off food. '
          + 'hikes and walking outside still count.',
    },
  },

  // ── nutrition ──────────────────────────────────────────────────────────────
  // He said "you decide for me". His real problem is not eating enough or often
  // enough — first meal at 2pm, no lunch break. Precision comes later.
  nutrition: {
    headline: 'eat enough. eat consistently.',
    note: 'you’re 6\'1" and 146 lb. the plan is not restriction. the plan is getting '
        + 'enough food in you, on a schedule your job actually allows.',
    protein: { target: 150, min: 140, max: 160, unit: 'g' },
    proteinNote: 'anywhere in 140–160 is a win. 138 is not a failure — stop counting it as one.',
    // Two shapes, because his days are not the same. Work is Fri–Mon 9–5 with no
    // lunch break; school is Tue–Thu. Giving him one structure would mean it is
    // wrong four days a week — and the days it is wrong are the hard ones.
    workDays: {
      label: 'friday – monday · work 9–5',
      note: 'no real lunch break. everything here has to survive a bag and a shift.',
      meals: [
        { slot: 'meal 1 — before work', protein: '30–40 g',
          options: ['eggs', 'greek yogurt or cottage cheese', 'potatoes', 'fruit', 'milk', 'coffee'] },
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
    'train if it’s a training day',
    'hit your protein range',
    'eat 3–4 real meals',
    'stick to the food plan — no unplanned delivery',
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

  followUp: 'your intake says you wake at 10am, but you work 9–5 friday to monday. '
          + 'what does your actual wake and sleep time look like on a work day? '
          + 'i’m not setting your sleep target until i know.',
}

export default olaf
