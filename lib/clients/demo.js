// ─── SAMPLE PROGRAM ──────────────────────────────────────────────────────────
// This is the demo dashboard shown on sales calls. It is deliberately NOT a real
// client: no real name, no real email, no real body data. Everything here is a
// worked example of the structure a real intake produces.
//
// If you are reading this because you are about to add a real client: copy the
// shape, not the content. Real content comes from their intake, every time.

export const demo = {
  token: 'sample-8week',
  name: 'Sample',
  fullName: 'Sample Program',
  email: '',
  startedOn: '2026-08-25',

  title: 'SAMPLE — 8 WEEK BUILD',
  subtitle: 'this is the shell. yours gets built from your intake.',

  stats: { age: 24, height: "5'10\"", weight: '175 lb', location: '—' },

  objective: {
    primary: 'build muscle',
    secondary: 'get strong on the main lifts',
    why: 'example: i want to look like i lift with my shirt on, and stop restarting every few weeks.',
    priorities: ['chest', 'back', 'arms', 'consistency'],
  },

  // The 8-week arc. This is the thing being bought — not a workout, a direction
  // that changes on purpose every couple of weeks, reviewed on a call each week.
  arc: {
    label: '8 weeks · 8 calls',
    note: 'one call a week to set the direction. the dashboard runs the other six days. '
        + 'nothing here is guessed — every change comes off what you actually logged.',
    phases: [
      { weeks: '1–2', name: 'baseline',    goal: 'establish the routine and get real numbers on the board.',
        marker: 'four sessions a week, every session logged.' },
      { weeks: '3–5', name: 'load',        goal: 'add weight to the main lifts on double progression.',
        marker: 'top of the rep range on every working set before the weight moves.' },
      { weeks: '6–7', name: 'push',        goal: 'peak volume — the hardest two weeks of the block.',
        marker: 'you should be beating week 3 on every main movement.' },
      { weeks: '8',   name: 'consolidate', goal: 'pull back, let it catch up, reassess and write the next block.',
        marker: 'full progress review on the call. we decide what phase two is.' },
    ],
  },

  week1: {
    mission: 'prove consistency.',
    note: 'week one is not about doing everything perfectly. i need data. train, eat, '
        + 'check in at night, and let me see how your body and schedule actually respond. '
        + 'the plan gets more precise once i can see you.',
    targets: [
      'complete 4 / 4 sessions',
      'log every set — that is what the calls are built on',
      'hit your protein range at least 5 of 7 days',
      'check in every night, two lines is enough',
      'weigh in each morning before eating',
    ],
  },

  training: {
    structure: 'upper / lower · 4 days',
    rule: '2 hard working sets per movement. warm up properly. the last set should have '
        + '1–2 reps left in it — not failure with sloppy form.',
    days: [
      { day: 'monday', label: 'upper a', focus: 'chest emphasis',
        exercises: [
          { name: 'incline dumbbell press',    sets: 2, reps: '6–8',  cue: 'control the way down. drive through the chest.' },
          { name: 'flat machine chest press',  sets: 2, reps: '8–10', cue: '' },
          { name: 'chest-supported row',       sets: 2, reps: '6–10', cue: 'chest stays on the pad. pull with the back.' },
          { name: 'lat pulldown',              sets: 2, reps: '8–10', cue: 'elbows down and in. no leaning back.' },
          { name: 'lateral raise',             sets: 2, reps: '10–12', cue: 'light. slow. this is not an ego lift.' },
          { name: 'cable triceps pressdown',   sets: 2, reps: '8–10', cue: '' },
        ] },
      { day: 'tuesday', label: 'lower a', focus: 'quad emphasis',
        exercises: [
          { name: 'leg press',        sets: 2, reps: '8–10', cue: 'full range you can control.' },
          { name: 'leg extension',    sets: 2, reps: '10–12', cue: 'pause a beat at the top.' },
          { name: 'seated leg curl',  sets: 2, reps: '8–10', cue: '' },
          { name: 'calf raise',       sets: 2, reps: '10–12', cue: 'full stretch at the bottom.' },
          { name: 'cable crunch',     sets: 2, reps: '10–15', cue: '' },
        ] },
      { day: 'thursday', label: 'upper b', focus: 'back + shoulders',
        exercises: [
          { name: 'barbell or machine row',   sets: 2, reps: '6–8',  cue: 'heaviest back movement of the week.' },
          { name: 'neutral-grip pulldown',    sets: 2, reps: '8–10', cue: '' },
          { name: 'seated shoulder press',    sets: 2, reps: '6–10', cue: '' },
          { name: 'rear delt fly',            sets: 2, reps: '12–15', cue: '' },
          { name: 'incline dumbbell curl',    sets: 2, reps: '8–10', cue: '' },
          { name: 'overhead triceps extension', sets: 2, reps: '8–12', cue: '' },
        ] },
      { day: 'saturday', label: 'lower b', focus: 'posterior chain',
        exercises: [
          { name: 'romanian deadlift',   sets: 2, reps: '6–10', cue: 'hips back, soft knees. hamstrings, not lower back.' },
          { name: 'hack or goblet squat', sets: 2, reps: '8–10', cue: '' },
          { name: 'lying leg curl',      sets: 2, reps: '8–12', cue: '' },
          { name: 'hip thrust',          sets: 2, reps: '8–12', cue: '' },
          { name: 'calf raise',          sets: 2, reps: '10–15', cue: '' },
        ] },
    ],
    progression: {
      rule: 'double progression.',
      explain: 'stay at the same weight until you hit the TOP of the rep range on both '
             + 'working sets. then add the smallest jump available and start again at the bottom.',
      example: '80 × 7 and 80 × 6 → keep 80.  80 × 8 and 80 × 8 → go to 85.',
    },
    sleep: {
      headline: '7–9 hours, consistent bed time.',
      note: 'this gets set from your intake. if sleep is the limiter we build the whole '
          + 'block around fixing it first, because nothing else works until it is.',
    },
    cardio: {
      headline: '2 incline walks a week · 15–20 min',
      note: 'walking, not intervals. the point is recovery and appetite, not burning calories.',
    },
  },

  nutrition: {
    headline: 'eat enough. eat consistently.',
    note: 'your real numbers come from your intake — bodyweight, schedule, what you '
        + 'actually like eating. this is the structure they get poured into.',
    protein: { target: 175, min: 160, max: 190, unit: 'g' },
    proteinNote: 'four feedings, roughly 45g of protein in each. hit that and the day is done — '
               + 'you do not need to weigh anything else.',
    workDays: {
      label: 'work days',
      note: 'built around your actual shift, so it survives a bag and a commute.',
      meals: [
        { slot: 'breakfast — before you leave', protein: '45 g',
          options: ['4 eggs + greek yogurt', 'cottage cheese and fruit', 'oats and whey'],
          note: 'the meal people skip. it is the one that decides whether you gain.' },
        { slot: 'portable work meal', protein: '45 g',
          options: ['pre-cooked ground beef and rice', 'chicken and potatoes', 'tuna, yogurt, cheese'] },
        { slot: 'post-training', protein: '45 g',
          options: ['red meat or chicken', 'rice or potatoes', 'fruit'] },
        { slot: 'evening', protein: '40 g',
          options: ['greek yogurt', 'cottage cheese', 'whatever fits the day'] },
      ],
    },
    offDays: {
      label: 'off days',
      note: 'you are home and can cook. this is where you make up ground.',
      meals: [
        { slot: 'breakfast', protein: '45 g', options: ['eggs and potatoes', 'steak', 'fruit', 'coffee'] },
        { slot: 'lunch',     protein: '45 g', options: ['red meat or fish', 'rice', 'fruit'] },
        { slot: 'dinner',    protein: '45 g', options: ['protein source', 'carb source', 'whatever veg you like'] },
        { slot: 'evening',   protein: '40 g', options: ['yogurt', 'milk', 'honey'] },
      ],
    },
    preWorkout: 'fruit or juice about an hour out, and water. keep it simple.',
    rhythm: '4 real feedings. not six. you do not have time for six and you do not need them.',
  },

  grocery: [
    { group: 'protein', items: ['eggs', 'ground beef', 'steak', 'chicken thighs', 'greek yogurt',
                                'cottage cheese', 'whole milk', 'aged cheese', 'canned fish', 'whey'] },
    { group: 'carbs + fruit', items: ['potatoes', 'white rice', 'oats', 'bananas', 'oranges',
                                      'apples', 'frozen fruit', 'honey', 'sourdough'] },
    { group: 'portable', items: ['ready-to-drink protein', 'yogurt cups', 'cheese portions',
                                 'boiled eggs', 'fruit you can carry'],
      note: 'the entire point of this shelf is deleting the sentence "i didn’t have time to eat."' },
  ],

  daily: [
    'train if it’s a training day',
    'hit your protein range',
    'log every set as you go',
    'weigh in first thing',
    'check in at night',
  ],

  standard: {
    label: 'the standard you get held to',
    quote: 'set on your first call.',
    note: 'every client picks one non-negotiable in week one. it is small on purpose, and '
        + 'it is the thing i will not let you quietly drop.',
  },

  followUp: 'this is the sample. yours is built from your intake — your schedule, your gym, '
          + 'your lifts, your food. same structure, none of the same content.',
}

export default demo
