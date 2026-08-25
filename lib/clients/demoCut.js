// ─── SAMPLE PROGRAM — CUT ────────────────────────────────────────────────────
// Second demo portal, deliberately the opposite shape to lib/clients/demo.js:
// fat loss instead of gaining, 3 days instead of 4, full body instead of
// upper/lower, and a calorie-deficit structure instead of an eat-more one.
//
// Not a real client. No real name, email or body data. Shown on sales calls so
// a prospect whose goal is losing fat sees their own situation, not someone
// else's bulk.

export const demoCut = {
  token: 'sample-cut8',
  name: 'Sample',
  fullName: 'Sample Program — Cut',
  email: '',
  startedOn: '2026-08-25',

  title: 'SAMPLE — 8 WEEK CUT',
  subtitle: 'lose the fat. keep every pound of muscle you built.',

  stats: { age: 31, height: "5'11\"", weight: '205 lb', location: '—' },

  objective: {
    primary: 'fat loss',
    secondary: 'keep strength while losing',
    why: 'example: desk job, two kids, i have been "starting monday" for two years.',
    priorities: ['waist', 'keep strength', 'energy', 'consistency'],
  },

  arc: {
    label: '8 weeks · 8 calls',
    note: 'the deficit does not get deeper every week — that is how people crash. '
        + 'it gets held, and we change what surrounds it. every adjustment comes off '
        + 'your weigh-ins and your logs, not off a calendar.',
    phases: [
      { weeks: '1–2', name: 'set the deficit', goal: 'find the intake that actually moves the scale, and eat it every day.',
        marker: 'weigh in daily. the 7-day average is the only number we read.' },
      { weeks: '3–5', name: 'hold',           goal: 'same deficit, same lifts. the job is to not lose strength.',
        marker: 'if a main lift drops two weeks running, food goes up, not down.' },
      { weeks: '6–7', name: 'push',           goal: 'steps up, one refeed a week, training stays heavy.',
        marker: 'the hardest two weeks. this is where the visible change happens.' },
      { weeks: '8',   name: 'reassess',       goal: 'pull the deficit back, let the scale settle, decide what comes next.',
        marker: 'full review on the call — keep cutting, or move to maintenance.' },
    ],
  },

  week1: {
    mission: 'weigh in every morning. train three times. that is it.',
    note: 'i am not touching your food this week. i need to see what you actually eat '
        + 'and what your weight actually does before i change anything. week one is '
        + 'measurement, not restriction — the restriction comes when i know what to restrict.',
    targets: [
      'weigh in every morning, first thing, before eating',
      'three sessions — mon, wed, fri or whatever fits',
      'log every set',
      'hit the protein number, ignore everything else for now',
      'walk. aim for 8k steps a day.',
      'check in each night, two lines',
    ],
  },

  training: {
    structure: 'full body · 3 days',
    rule: 'in a deficit, training is there to KEEP muscle, not to build more. that means '
        + 'heavy and short. you are not chasing a pump or a sweat — you are giving your '
        + 'body a reason to hold onto what it has.',
    days: [
      { day: 'monday', label: 'full body a', focus: 'squat + press',
        exercises: [
          { name: 'goblet or hack squat',       sets: 3, reps: '6–8',  cue: 'heaviest lower movement of the week.' },
          { name: 'flat dumbbell press',        sets: 3, reps: '6–8',  cue: 'keep the weight up. this is the one that tells us if the deficit is too hard.' },
          { name: 'chest-supported row',        sets: 3, reps: '8–10', cue: '' },
          { name: 'seated leg curl',            sets: 2, reps: '10–12', cue: '' },
          { name: 'lateral raise',              sets: 2, reps: '12–15', cue: '' },
          { name: 'plank',                      sets: 2, reps: '45s',  cue: '' },
        ] },
      { day: 'wednesday', label: 'full body b', focus: 'hinge + pull',
        exercises: [
          { name: 'romanian deadlift',   sets: 3, reps: '6–8',  cue: 'hips back, soft knees. hamstrings, not lower back.' },
          { name: 'lat pulldown',        sets: 3, reps: '8–10', cue: '' },
          { name: 'incline dumbbell press', sets: 3, reps: '8–10', cue: '' },
          { name: 'leg press',           sets: 2, reps: '10–12', cue: '' },
          { name: 'face pull',           sets: 2, reps: '12–15', cue: '' },
          { name: 'hanging knee raise',  sets: 2, reps: '10–15', cue: '' },
        ] },
      { day: 'friday', label: 'full body c', focus: 'whatever is lagging',
        exercises: [
          { name: 'leg press or split squat', sets: 3, reps: '8–10', cue: '' },
          { name: 'seated shoulder press',    sets: 3, reps: '6–10', cue: '' },
          { name: 'cable row',                sets: 3, reps: '8–10', cue: '' },
          { name: 'leg extension',            sets: 2, reps: '12–15', cue: '' },
          { name: 'bicep curl',               sets: 2, reps: '10–12', cue: '' },
          { name: 'triceps pressdown',        sets: 2, reps: '10–12', cue: '' },
        ],
        note: 'if the week went badly and you only get two sessions in, drop this one — '
            + 'never monday. the heavy day is the one that protects your muscle.' },
    ],
    progression: {
      rule: 'hold the weight. that is the win.',
      explain: 'in a deficit you are not going to add weight every week and you should not '
             + 'expect to. if you keep the same load for the same reps while getting lighter, '
             + 'you are getting stronger relative to your bodyweight. that is the whole goal.',
      example: '185 × 8 at 205 lb → 185 × 8 at 195 lb. same number on the bar, ten pounds gone.',
    },
    sleep: {
      headline: '7+ hours, non-negotiable in a deficit.',
      note: 'under-slept and under-fed is how you end up eating the kitchen on a wednesday '
          + 'night. sleep is the appetite control you are not using.',
    },
    cardio: {
      headline: 'steps, not cardio. 8k building to 12k.',
      note: 'we raise steps before we lower food. it is easier to hold, it does not wreck '
          + 'recovery, and it leaves somewhere to go when the scale stalls in week five.',
    },
  },

  nutrition: {
    headline: 'high protein. real deficit. no gimmicks.',
    note: 'no shakes to replace meals, no cutting carbs out, no 16:8 unless you already '
        + 'like eating that way. a deficit you can hold for eight weeks beats an aggressive '
        + 'one you hold for nine days.',
    protein: { target: 190, min: 175, max: 210, unit: 'g' },
    proteinNote: 'protein stays high the whole way down. it keeps you full and it is the '
               + 'single biggest reason you will lose fat instead of muscle. four meals, '
               + 'about 48g each.',
    workDays: {
      label: 'work days · desk job',
      note: 'sitting all day means low burn, so the food has to be tight and the steps '
          + 'have to happen. every meal here is high volume for the calories.',
      meals: [
        { slot: 'breakfast', protein: '45 g',
          options: ['5 egg whites + 2 whole eggs', 'greek yogurt, 0%', 'berries'],
          note: 'volume matters more than variety right now. eat something that fills you.' },
        { slot: 'lunch — packed', protein: '50 g',
          options: ['chicken breast, 6 oz', 'rice or potatoes, measured', 'a large salad or veg'] },
        { slot: 'snack', protein: '30 g',
          options: ['protein shake', 'cottage cheese', 'a piece of fruit'] },
        { slot: 'dinner', protein: '50 g',
          options: ['lean beef, fish or chicken', 'potatoes', 'as much veg as you want'],
          note: 'this is the biggest meal on purpose. evening is when people break.' },
      ],
    },
    offDays: {
      label: 'weekends · where cuts actually die',
      note: 'nobody blows a diet on a tuesday. it goes on saturday, and it goes without '
          + 'being noticed. same protein, same structure, one meal out planned in advance.',
      meals: [
        { slot: 'breakfast — later is fine', protein: '45 g', options: ['eggs', 'yogurt', 'fruit', 'coffee'] },
        { slot: 'lunch', protein: '50 g', options: ['lean protein', 'carb source', 'veg'] },
        { slot: 'the meal out', protein: '50 g+',
          options: ['pick the protein and the carb, skip the appetiser and the drink'],
          note: 'planned, once a week, and you tell me about it beforehand — not after.' },
        { slot: 'evening', protein: '40 g', options: ['greek yogurt', 'cottage cheese'] },
      ],
    },
    preWorkout: 'a coffee and something small. training fasted in a deficit is how the heavy day gets soft.',
    rhythm: '4 meals. protein in all four. the deficit lives in the carbs and fats, never the protein.',
  },

  grocery: [
    { group: 'protein — lean', items: ['chicken breast', 'lean ground beef 93/7', 'white fish',
                                       'salmon', 'egg whites', 'whole eggs', '0% greek yogurt',
                                       'cottage cheese', 'whey isolate'] },
    { group: 'carbs — measured', items: ['potatoes', 'rice', 'oats', 'sourdough', 'bananas', 'berries'] },
    { group: 'volume — eat freely', items: ['broccoli', 'peppers', 'cucumber', 'salad greens',
                                            'zucchini', 'pickles', 'diet soda', 'sugar-free jelly'],
      note: 'this shelf is the whole trick. it is what you reach for at 9pm instead of quitting.' },
  ],

  daily: [
    'weigh in first thing',
    'hit your protein',
    'get your steps',
    'train if it’s a training day',
    'check in at night',
  ],

  standard: {
    label: 'the standard you get held to',
    quote: 'set on your first call.',
    note: 'on a cut it is almost always the same one: you weigh in every single morning, '
        + 'including the mornings you do not want to. the scale is not a judgement, it is '
        + 'the instrument. skipping it is how we go blind.',
  },

  followUp: 'this is the sample. yours gets built from your intake — your calories, your '
          + 'schedule, your food, your lifts. same structure, none of the same content.',
}

export default demoCut
