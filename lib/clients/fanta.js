// ─── FANTA — IDENTITY PHASE ──────────────────────────────────────────────────
// Built from her intake (submitted 2026-08-14 22:53).
//
// 5'1", 122 lb, 22, registrar in healthcare. Wants recomposition and a waist.
// Says "I'm trying to change my identity n be the person I want to be" and
// finished the last sentence with "identity is the gym as well" — so the frame
// is identity, not a number, and the copy holds that line.
//
// THE CONSTRAINT: she wakes at 04:00 and sleeps at 22:30. Five and a half
// hours, rated 3/10, with stress at 8/10 and energy at 4/10. Everything else
// is downstream of that, so the plan is deliberately small. Four short
// sessions, protein, and sleep. Nothing else until those hold.

export const fanta = {
  token: 'fanta-8k4wq2xr',
  name: 'Fanta',
  fullName: 'Fanta',
  email: 'fantafouzia17@gmail.com',
  startedOn: '2026-08-14',

  title: 'FANTA — IDENTITY PHASE',
  subtitle: 'become her first. the body follows.',

  stats: { age: 22, height: "5'1\"", weight: '122 lb', location: 'clinton' },

  objective: {
    primary: 'body recomposition',
    secondary: 'become consistent',
    why: 'i’m trying to change my identity and be the person i want to be.',
    priorities: ['waist', 'glutes', 'strength', 'consistency'],
  },

  // ── week one ───────────────────────────────────────────────────────────────
  week1: {
    mission: 'four sessions. protein. sleep.',
    note: 'you picked every reason people fall off — busy, overwhelmed, food, '
        + 'missing one day, not seeing results fast enough. that isn’t a character '
        + 'flaw, it’s what happens without a structure. so this week is small on '
        + 'purpose. three things. nothing else counts.',
    targets: [
      'train 4 times — tue, fri, sat, sun',
      'eat protein at every meal, no counting yet',
      'lights out by 22:00 — that is the real target',
      'eat before work, even if it’s two eggs',
      'message me each night, two lines',
      'weigh in once, first thing, then leave the scale alone',
    ],
  },

  // ── training ───────────────────────────────────────────────────────────────
  // Her available windows are exactly four: tue am, fri am, sat pm, sun pm.
  // She works 7–5:30 Mon/Wed/Thu, so those are the only real options and the
  // split is built to fit them rather than the other way round.
  training: {
    structure: 'upper / lower · 4 days',
    rule: 'these are 45 minutes, not 90. on 5 hours of sleep a long session '
        + 'costs more than it gives. warm up, work hard on the main lifts, leave.',
    days: [
      {
        day: 'tuesday', label: 'lower a', focus: 'glutes · hinge',
        exercises: [
          { name: 'barbell or machine hip thrust', sets: 3, reps: '8–10', cue: 'your favourite, so it leads. squeeze at the top, don’t arch your back.' },
          { name: 'romanian deadlift',             sets: 3, reps: '8–10', cue: 'hips back, soft knees. feel the hamstrings, not the lower back.' },
          { name: 'leg press',                     sets: 2, reps: '10–12', cue: '' },
          { name: 'seated leg curl',               sets: 2, reps: '10–12', cue: '' },
          { name: 'cable crunch',                  sets: 3, reps: '10–15', cue: 'the waist work is here. it will not spot-reduce anything — it builds the muscle underneath.' },
        ],
        note: 'no bulgarian split squats. you said you don’t love them and there is nothing here they do that this doesn’t.',
      },
      {
        day: 'friday', label: 'upper a', focus: 'pull · pull-up work',
        exercises: [
          { name: 'assisted pull-up or lat pulldown', sets: 3, reps: '6–10', cue: 'this is the pull-up project. lower yourself slowly — that’s what builds it.' },
          { name: 'chest-supported row',              sets: 3, reps: '8–10', cue: '' },
          { name: 'dumbbell shoulder press',          sets: 2, reps: '8–12', cue: '' },
          { name: 'lateral raise',                    sets: 2, reps: '12–15', cue: 'light. slow.' },
          { name: 'bicep curl',                       sets: 2, reps: '10–12', cue: '' },
          { name: 'hanging or lying leg raise',       sets: 3, reps: '10–15', cue: '' },
        ],
        note: 'you said you want to learn a pull-up. we are actually training for it, not hoping for it.',
      },
      {
        day: 'saturday', label: 'lower b', focus: 'quads · glutes',
        exercises: [
          { name: 'goblet or hack squat',   sets: 3, reps: '8–10', cue: 'as deep as you can control.' },
          { name: 'hip thrust',             sets: 3, reps: '10–12', cue: 'lighter than tuesday, more reps.' },
          { name: 'walking lunge or step-up', sets: 2, reps: '10 each', cue: '' },
          { name: 'leg extension',          sets: 2, reps: '12–15', cue: '' },
          { name: 'calf raise',             sets: 2, reps: '12–15', cue: '' },
        ],
      },
      {
        day: 'sunday', label: 'upper b', focus: 'push · arms · core',
        exercises: [
          { name: 'dumbbell or machine chest press', sets: 3, reps: '8–10', cue: '' },
          { name: 'lat pulldown',                    sets: 3, reps: '8–12', cue: 'more pull-up volume.' },
          { name: 'cable row',                       sets: 2, reps: '10–12', cue: '' },
          { name: 'rear delt fly',                   sets: 2, reps: '12–15', cue: '' },
          { name: 'tricep pressdown',                sets: 2, reps: '10–12', cue: '' },
          { name: 'plank or ab wheel',               sets: 3, reps: '30–45s', cue: '' },
        ],
        note: 'if you work this weekend, move this to monday evening and tell me. moving a session is fine. skipping it silently is not.',
      },
    ],
    progression: {
      rule: 'add reps first, then weight.',
      explain: 'stay at the same weight until you hit the top of the rep range on '
             + 'every set. then go up the smallest amount available and start again '
             + 'at the bottom. that’s it — that is the whole system.',
      example: '3 × 8 at 95 lb → 3 × 10 at 95 lb → 3 × 8 at 105 lb.',
    },
    cardio: {
      headline: 'walk. that’s all.',
      note: 'no cardio sessions programmed. you’re on 5 hours of sleep and 8/10 '
          + 'stress — adding cardio to that buys nothing and costs recovery. walk '
          + 'when you can, and that counts.',
    },
  },

  // ── nutrition ──────────────────────────────────────────────────────────────
  // She said "you decide for me", skips meals, has no grocery routine, and named
  // exactly one food she enjoys: eggs. So the plan is eggs-forward, cheap, and
  // has no counting in it — because she also said money might be what ends this.
  nutrition: {
    headline: 'protein at every meal. stop skipping.',
    note: 'no calorie counting, no tracking app, no weighing food. you skip meals '
        + 'and don’t get enough protein — fixing only that will change how you look '
        + 'and feel more than any macro split i could hand you.',
    protein: { target: 110, min: 100, max: 130, unit: 'g' },
    proteinNote: 'you don’t need to count this. hit protein at each of three meals and '
               + 'you land here on your own. i’ll tell you if we need to be precise later.',
    workDays: {
      label: 'monday · wednesday · thursday — 7 to 5:30',
      note: 'up at 4, out the door early, long shift. these are the days you skip '
          + 'meals, so these are the days we fix first.',
      meals: [
        { slot: 'before work — non-negotiable', protein: '20–30 g',
          options: ['2–3 eggs', 'greek yogurt', 'cottage cheese', 'fruit'],
          note: 'even if it’s two boiled eggs standing up. eating something beats eating well.' },
        { slot: 'work meal — packed the night before', protein: '30 g+',
          options: ['pre-cooked chicken or ground turkey', 'boiled eggs', 'greek yogurt',
                    'cheese', 'rice or potatoes', 'fruit'] },
        { slot: 'dinner', protein: '30–40 g',
          options: ['chicken', 'ground beef or turkey', 'eggs', 'rice or potatoes', 'whatever veg you like'] },
      ],
    },
    offDays: {
      label: 'tuesday · friday · weekend — training days',
      note: 'you’re home and you can actually cook. eat a bit more on these days, '
          + 'especially after you train.',
      meals: [
        { slot: 'breakfast', protein: '30 g+', options: ['eggs — 3 or 4', 'toast or potatoes', 'fruit', 'coffee'] },
        { slot: 'lunch', protein: '30 g+', options: ['chicken', 'ground beef', 'rice', 'eggs', 'fruit'] },
        { slot: 'post-workout dinner', protein: '30–40 g', options: ['protein source', 'rice or potatoes', 'greek yogurt', 'fruit'] },
      ],
    },
    preWorkout: 'something small an hour before — fruit, yogurt, or coffee. don’t train on nothing.',
    rhythm: 'three meals with protein in each. that’s the whole structure.',
  },

  // Cheap on purpose. She said money running out is what could end this, so the
  // list is built from the least expensive protein there is — which happens to
  // be the one food she named.
  grocery: [
    { group: 'protein — the cheap stuff', items: ['eggs (buy the big box)', 'chicken thighs', 'ground turkey',
                                                  'ground beef', 'greek yogurt', 'cottage cheese', 'canned tuna', 'milk'] },
    { group: 'carbs + fruit', items: ['rice', 'potatoes', 'oats', 'bananas', 'apples', 'frozen fruit', 'bread'] },
    { group: 'grab and go for work', items: ['boiled eggs', 'yogurt cups', 'cheese sticks', 'fruit', 'nuts'],
      note: 'sunday night: boil a dozen eggs and portion them. that one habit is most of your work-day nutrition.' },
  ],

  daily: [
    'train if it’s a training day',
    'protein at every meal',
    'eat before work',
    'lights out by 22:00',
    'message me at night',
  ],

  // She answered "idk yet" when asked for a standard to be held to. That is a
  // fair answer at week one, so it gets set for her rather than left blank.
  standard: {
    label: 'the one you didn’t have yet',
    quote: 'idk yet',
    note: 'you said you didn’t have one, so here’s mine until you find yours: you '
        + 'eat before work, every work day. no exceptions. it’s the smallest thing '
        + 'on this page and it’s the one everything else depends on.',
  },

  followUp: 'you wake at 4:00 and sleep at 22:30 — that’s five and a half hours, and '
          + 'you rated your sleep 3 out of 10 with stress at 8. that’s the real '
          + 'limiter here, not training. what time do you actually get home, and what '
          + 'is stopping lights out at 22:00? answer that and we build around it.',
}

export default fanta
