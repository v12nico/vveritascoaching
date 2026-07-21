const SPLITS = {
  full_body: {
    name: 'full body',
    days: [
      {
        label: 'day a',
        focus: 'squat · press · row',
        exercises: ['squat', 'bench press', 'barbell row', 'overhead press', 'romanian deadlift', 'barbell curl', 'tricep pushdown'],
      },
      {
        label: 'day b',
        focus: 'hinge · pull · accessory',
        exercises: ['deadlift', 'incline press', 'lat pulldown', 'hip thrust', 'leg extension', 'hammer curl', 'face pull'],
      },
    ],
  },
  upper_lower: {
    name: 'upper / lower',
    days: [
      {
        label: 'upper a — push',
        focus: 'chest · shoulders · triceps',
        exercises: ['bench press', 'incline press', 'overhead press', 'cable lateral raise', 'tricep pushdown', 'barbell curl'],
      },
      {
        label: 'lower a — quad',
        focus: 'quads · glutes · calves',
        exercises: ['squat', 'leg press', 'leg extension', 'romanian deadlift', 'calf raise'],
      },
      {
        label: 'upper b — pull',
        focus: 'back · biceps · rear delt',
        exercises: ['barbell row', 'lat pulldown', 'seated cable row', 'face pull', 'hammer curl', 'barbell curl'],
      },
      {
        label: 'lower b — posterior',
        focus: 'hamstrings · glutes · hips',
        exercises: ['deadlift', 'hip thrust', 'leg curl', 'leg extension', 'calf raise'],
      },
    ],
  },
  ppl: {
    name: 'push / pull / legs',
    days: [
      {
        label: 'push',
        focus: 'chest · shoulders · triceps',
        exercises: ['bench press', 'incline press', 'overhead press', 'cable lateral raise', 'tricep pushdown'],
      },
      {
        label: 'pull',
        focus: 'back · biceps · rear delt',
        exercises: ['deadlift', 'barbell row', 'lat pulldown', 'seated cable row', 'face pull', 'barbell curl', 'hammer curl'],
      },
      {
        label: 'legs',
        focus: 'quads · hamstrings · glutes',
        exercises: ['squat', 'leg press', 'romanian deadlift', 'hip thrust', 'leg extension', 'leg curl', 'calf raise'],
      },
    ],
  },
};

const SCHEMES = {
  'muscle gain':     { sets: 3, reps: '8–12' },
  'fat loss':        { sets: 3, reps: '12–15' },
  'recomposition':   { sets: 3, reps: '8–12' },
  'strength':        { sets: 5, reps: '3–5'  },
  'general fitness': { sets: 3, reps: '10–12' },
};

// simple injury keyword → flag exercises that overlap
const INJURY_FLAGS = {
  shoulder: ['overhead press', 'cable lateral raise', 'face pull', 'incline press'],
  knee:     ['squat', 'leg press', 'leg extension', 'leg curl'],
  back:     ['deadlift', 'barbell row', 'romanian deadlift'],
  wrist:    ['barbell curl', 'bench press', 'overhead press'],
  hip:      ['hip thrust', 'squat', 'leg press'],
};

export function generateProgram(intake) {
  if (!intake) return null;

  const days       = parseInt(intake.days_per_week) || 3;
  const goal       = intake.goal       || 'muscle gain';
  const experience = intake.experience || 'intermediate';
  const injuries   = (intake.injuries || '').toLowerCase();

  const splitKey = days >= 5 ? 'ppl' : days === 4 ? 'upper_lower' : 'full_body';
  const base     = SPLITS[splitKey];
  const scheme   = SCHEMES[goal] || SCHEMES['muscle gain'];
  const maxEx    = experience === 'beginner' ? 4 : 7;

  // flag exercises near injuries
  const flagged = new Set();
  for (const [keyword, exList] of Object.entries(INJURY_FLAGS)) {
    if (injuries.includes(keyword)) exList.forEach(e => flagged.add(e));
  }

  const programDays = base.days.map(d => ({
    ...d,
    exercises: d.exercises.slice(0, maxEx).map(name => ({
      name,
      sets:    scheme.sets,
      reps:    scheme.reps,
      flagged: flagged.has(name),
    })),
  }));

  return {
    name:   base.name,
    split:  `${days} days / week`,
    goal,
    scheme,
    days:   programDays,
    flagged: [...flagged],
  };
}

export function getCheckInQuestions(goal) {
  const base = [
    { id: 'q1', type: 'yesno',  text: 'did you complete your assigned training today?' },
    { id: 'q2', type: 'slider', text: 'energy level today (1–10)' },
    { id: 'q3', type: 'slider', text: 'sleep quality last night (1–10)' },
  ];

  const extra = {
    'muscle gain':     [{ id: 'q4', type: 'yesno', text: 'did you hit your protein target?' },
                        { id: 'q5', type: 'text',  text: 'any soreness or recovery issues to flag?' }],
    'fat loss':        [{ id: 'q4', type: 'yesno',  text: 'did you stay in your calorie range?' },
                        { id: 'q5', type: 'slider', text: 'hunger level today (1–10)' }],
    'recomposition':   [{ id: 'q4', type: 'yesno',  text: 'did you hit your protein target?' },
                        { id: 'q5', type: 'slider', text: 'hunger level today (1–10)' }],
    'strength':        [{ id: 'q4', type: 'yesno', text: 'did you hit your planned weights today?' },
                        { id: 'q5', type: 'text',  text: 'how did the main lifts feel?' }],
    'general fitness': [{ id: 'q4', type: 'yesno', text: 'did you stay active today?' },
                        { id: 'q5', type: 'text',  text: 'how are you feeling overall?' }],
  };

  return [...base, ...(extra[goal] || extra['muscle gain'])];
}
