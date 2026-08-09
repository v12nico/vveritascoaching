// ─── CLIENT INTAKE SPEC ──────────────────────────────────────────────────────
// Every question, option list, limit and conditional lives here, apart from the
// components, so the shape of a submission is one file you can read top to
// bottom. Change behaviour here, not in the wizard.
//
// A field is answered when it has a value. A field is skippable when it is
// `optional`, or when its `when` guard is false — a hidden question must never
// block Continue, which is the bug that makes conditional forms feel broken.

export const DAYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
export const TIMES = ['morning', 'midday', 'evening'];

export const LIMITS = {
  short: 200,
  long: 600,
};

export const SECTIONS = [
  {
    key: 'basics',
    num: '01',
    label: 'the basics',
    headline: 'the basics.',
    sub: 'quick. thirty seconds.',
    screens: [
      {
        fields: [
          { id: 'fullName', q: 'full name', type: 'text', ph: 'your name' },
          { id: 'age', q: 'age', type: 'number', ph: '—' },
          { id: 'height', q: 'height', type: 'text', ph: "5'11\"" },
          { id: 'weight', q: 'current body weight (lbs)', type: 'number', ph: '185' },
        ],
      },
      {
        fields: [
          { id: 'phone', q: 'best phone number', type: 'tel', ph: '(000) 000-0000' },
          { id: 'email', q: 'email', type: 'email', ph: 'you@email.com' },
          { id: 'occupation', q: 'occupation', type: 'text', ph: 'optional', optional: true },
          { id: 'location', q: 'city', type: 'text', ph: 'optional', optional: true },
        ],
      },
    ],
  },

  {
    key: 'goal',
    num: '02',
    label: 'your goal',
    headline: 'what are we building?',
    screens: [
      {
        fields: [
          {
            id: 'primaryGoal',
            q: 'primary goal',
            type: 'single',
            opts: [
              'lose body fat', 'build muscle', 'body recomposition', 'get stronger',
              'improve health', 'become more consistent', 'improve athletic performance', 'other',
            ],
          },
        ],
      },
      {
        fields: [
          {
            id: 'secondaryGoals',
            q: 'secondary goals',
            hint: 'pick as many as apply',
            type: 'multi',
            opts: [
              'lose body fat', 'build muscle', 'get stronger', 'improve health',
              'become more consistent', 'improve athletic performance',
              'better sleep', 'more energy', 'more discipline', 'look better in clothes',
            ],
          },
        ],
      },
      {
        fields: [
          {
            id: 'focusAreas',
            q: 'areas you most want to improve',
            hint: 'pick as many as apply',
            type: 'multi',
            opts: [
              'stomach / waist', 'chest', 'shoulders', 'back', 'arms',
              'glutes', 'legs', 'core', 'overall proportions', 'other',
            ],
          },
        ],
      },
      {
        fields: [
          {
            id: 'worthIt',
            q: 'what would make this coaching completely worth it to you?',
            type: 'textarea',
            max: LIMITS.long,
            ph: 'be specific. this is the target i coach you toward.',
          },
        ],
      },
      {
        fields: [
          {
            id: 'whyNow',
            q: 'why does this matter to you right now?',
            type: 'textarea',
            max: LIMITS.short,
            ph: 'what changed?',
          },
        ],
      },
    ],
  },

  {
    key: 'training',
    num: '03',
    label: 'training',
    headline: 'where are you starting?',
    screens: [
      {
        fields: [
          {
            id: 'experience',
            q: 'how experienced are you in the gym?',
            type: 'single',
            opts: ['brand new', 'beginner', 'some experience', 'experienced', 'very experienced'],
          },
        ],
      },
      {
        fields: [
          {
            id: 'trainingDays',
            q: 'how many days per week can you realistically train?',
            hint: 'realistically. not ideally.',
            type: 'single',
            opts: ['2', '3', '4', '5+'],
          },
        ],
      },
      {
        fields: [
          {
            id: 'currentTraining',
            q: 'what does your training look like right now?',
            type: 'textarea',
            max: LIMITS.short,
            ph: 'describe it, or use the button below',
            quick: "i'm not training right now",
          },
        ],
      },
      {
        fields: [
          {
            id: 'exercisePrefs',
            q: 'any exercises you love, hate, or feel uncomfortable doing?',
            type: 'textarea',
            max: LIMITS.short,
            ph: 'none / list them',
            optional: true,
          },
        ],
      },
      {
        fields: [
          {
            id: 'consistencyBlocker',
            q: 'what usually causes you to stop being consistent?',
            hint: 'pick as many as are true',
            type: 'multi',
            opts: [
              'motivation drops', 'work gets busy', 'school gets busy',
              "i don't know what to do", "i don't see progress fast enough",
              'i get overwhelmed', 'i miss one day and fall off',
              "i'm inconsistent with food", 'other',
            ],
          },
        ],
      },
    ],
  },

  {
    key: 'health',
    num: '04',
    label: 'health',
    headline: 'anything i need to know before we train?',
    sub: 'short, but do not skip it.',
    screens: [
      {
        fields: [
          { id: 'hasInjury', q: 'any current injuries, pain, or physical limitations?', type: 'yesno' },
          {
            id: 'injuryDetail',
            q: 'where, and what movements bother it?',
            type: 'textarea',
            max: LIMITS.short,
            when: (f) => f.hasInjury === 'yes',
          },
        ],
      },
      {
        fields: [
          { id: 'hasSurgery', q: 'any major injuries or surgeries that could affect training?', type: 'yesno' },
          {
            id: 'surgeryDetail',
            q: 'tell me what and when',
            type: 'textarea',
            max: LIMITS.short,
            when: (f) => f.hasSurgery === 'yes',
          },
        ],
      },
      {
        fields: [
          { id: 'medicalRestriction', q: 'has a medical professional told you to restrict exercise?', type: 'yesno' },
          {
            id: 'restrictionDetail',
            q: 'what were you told?',
            type: 'textarea',
            max: LIMITS.short,
            when: (f) => f.medicalRestriction === 'yes',
          },
        ],
      },
      {
        fields: [
          {
            id: 'medication',
            q: 'any medication or health condition that may affect exercise, appetite, hydration, heart rate, or recovery?',
            type: 'yesno',
          },
          {
            id: 'medicationDetail',
            q: 'anything you want me to know',
            type: 'textarea',
            max: LIMITS.short,
            optional: true,
            when: (f) => f.medication === 'yes',
          },
        ],
      },
      {
        fields: [
          {
            id: 'safetyOther',
            q: 'anything else i should know to coach you safely?',
            type: 'textarea',
            max: LIMITS.short,
            ph: 'optional',
            optional: true,
          },
        ],
      },
    ],
  },

  {
    key: 'nutrition',
    num: '05',
    label: 'nutrition',
    headline: 'how do you actually eat?',
    sub: 'honest, not ideal.',
    screens: [
      {
        fields: [
          {
            id: 'typicalDay',
            q: 'describe a normal day of eating',
            type: 'textarea',
            max: LIMITS.long,
            ph: 'breakfast, lunch, dinner, snacks, drinks',
          },
        ],
      },
      {
        fields: [
          {
            id: 'nutritionStruggle',
            q: 'biggest nutrition struggle',
            hint: 'pick as many as are true',
            type: 'multi',
            opts: [
              'not enough protein', 'eating out too much', 'junk / processed food',
              'snacking', 'skipping meals', 'overeating', 'late-night eating',
              'no grocery routine', "don't know what to eat", 'inconsistent meals', 'other',
            ],
          },
        ],
      },
      {
        fields: [
          {
            id: 'foodsEnjoyed',
            q: 'what foods do you genuinely enjoy eating?',
            hint: 'the plan gets built out of these.',
            type: 'textarea',
            max: LIMITS.short,
          },
        ],
      },
      {
        fields: [
          {
            id: 'foodRestrictions',
            q: 'allergies, intolerances, restrictions, or foods you refuse to eat?',
            type: 'textarea',
            max: LIMITS.short,
            ph: 'none / list them',
            quick: 'none',
          },
        ],
      },
      {
        fields: [
          {
            id: 'nutritionApproach',
            q: 'which approach sounds easiest for you?',
            type: 'single',
            opts: [
              'simple meal structure', 'protein target + food quality', 'portion guidance',
              'calorie range', 'full tracking', 'you decide for me',
            ],
          },
        ],
      },
    ],
  },

  {
    key: 'life',
    num: '06',
    label: 'your life',
    headline: 'the plan has to fit your life.',
    screens: [
      {
        fields: [
          {
            id: 'workSchedule',
            q: 'what does your normal work or school schedule look like?',
            type: 'textarea',
            max: LIMITS.short,
            ph: '9–5 mon–fri / shift work / variable',
          },
        ],
      },
      {
        fields: [
          { id: 'wakeTime', q: 'normal wake time', type: 'time' },
          { id: 'sleepTime', q: 'normal sleep time', type: 'time' },
        ],
      },
      {
        fields: [
          {
            id: 'availability',
            q: 'which days and times are easiest to train?',
            hint: 'tap every slot that works',
            type: 'avail',
          },
        ],
      },
      {
        fields: [
          { id: 'ratingEnergy', q: 'energy', type: 'slider', low: 'drained', high: 'sharp' },
          { id: 'ratingSleep', q: 'sleep', type: 'slider', low: 'poor', high: 'excellent' },
          { id: 'ratingStress', q: 'stress', type: 'slider', low: 'calm', high: 'maxed' },
          { id: 'ratingConsistency', q: 'consistency', type: 'slider', low: 'none', high: 'locked in' },
        ],
      },
      {
        fields: [
          {
            id: 'competingTime',
            q: 'biggest thing competing for your time right now?',
            type: 'textarea',
            max: LIMITS.short,
          },
        ],
      },
    ],
  },

  {
    key: 'accountability',
    num: '07',
    label: 'accountability',
    headline: 'how should i coach you?',
    screens: [
      {
        fields: [
          {
            id: 'coachingStyle',
            q: 'what coaching style works best for you?',
            type: 'single',
            opts: ['direct / firm', 'encouraging', 'balanced', 'very structured'],
          },
        ],
      },
      {
        fields: [
          {
            id: 'missPattern',
            q: 'if you miss a workout, what usually happens next?',
            type: 'single',
            opts: [
              'i get right back to it', 'i struggle for a few days',
              'i usually fall off completely', 'depends',
            ],
          },
        ],
      },
      {
        fields: [
          {
            id: 'interventionPref',
            q: 'how should i respond when you start slipping?',
            type: 'single',
            opts: [
              'call it out immediately', 'ask me what happened first',
              'give me a reset plan', 'be very direct', 'combination',
            ],
          },
        ],
      },
      {
        fields: [
          {
            id: 'honestCheckin',
            q: 'are you willing to check in honestly even on bad days?',
            type: 'yesno',
          },
        ],
      },
      {
        fields: [
          {
            id: 'oneStandard',
            q: 'one standard you want me to hold you to',
            type: 'textarea',
            max: LIMITS.long,
            ph: 'the thing you never want to let slide',
          },
        ],
      },
    ],
  },

  {
    key: 'commitment',
    num: '08',
    label: 'the commitment',
    headline: 'last thing.',
    screens: [
      {
        fields: [
          {
            id: 'stoppedBefore',
            q: 'what has stopped you from succeeding before?',
            type: 'textarea',
            max: LIMITS.short,
          },
        ],
      },
      {
        fields: [
          {
            id: 'doingDifferent',
            q: 'what are you willing to do differently this time?',
            type: 'textarea',
            max: LIMITS.short,
          },
        ],
      },
      {
        fields: [
          {
            id: 'couldFallOff',
            q: 'what could realistically cause you to fall off again?',
            type: 'textarea',
            max: LIMITS.short,
          },
          {
            id: 'remindMe',
            q: 'what should i remind you of when that happens?',
            type: 'textarea',
            max: LIMITS.short,
          },
        ],
      },
      {
        fields: [
          {
            id: 'becomeSomeone',
            q: 'finish this sentence',
            hint: 'at the end of this program, i want to be someone who…',
            type: 'textarea',
            max: LIMITS.long,
          },
        ],
      },
      {
        fields: [
          {
            id: 'agreement',
            q: 'i understand that my coach provides the plan, structure, support, adjustments, and accountability. my responsibility is to communicate honestly and execute.',
            type: 'checkbox',
          },
        ],
      },
    ],
  },
];

export const TOTAL = SECTIONS.length;

// ─── FORM STATE ──────────────────────────────────────────────────────────────

export const emptyForm = () => {
  const f = {};
  for (const s of SECTIONS) {
    for (const scr of s.screens) {
      for (const fld of scr.fields) {
        if (fld.type === 'multi' || fld.type === 'avail') f[fld.id] = [];
        else if (fld.type === 'slider') f[fld.id] = 5;
        else if (fld.type === 'checkbox') f[fld.id] = false;
        else f[fld.id] = '';
      }
    }
  }
  return f;
};

// ─── VISIBILITY + VALIDATION ─────────────────────────────────────────────────

export const isVisible = (field, form) => (field.when ? !!field.when(form) : true);

export function isAnswered(field, form) {
  const v = form[field.id];
  if (field.type === 'multi' || field.type === 'avail') return Array.isArray(v) && v.length > 0;
  if (field.type === 'checkbox') return v === true;
  if (field.type === 'slider') return typeof v === 'number';
  return String(v ?? '').trim().length > 0;
}

/** A screen is complete when every visible, non-optional field is answered. */
export function screenComplete(screen, form) {
  return screen.fields
    .filter((f) => isVisible(f, form) && !f.optional)
    .every((f) => isAnswered(f, form));
}

/** Flat list of every screen with its section, so the wizard walks one array. */
export function flatScreens() {
  const out = [];
  SECTIONS.forEach((section, si) => {
    section.screens.forEach((screen, idx) => {
      out.push({ section, sectionIndex: si, screen, firstOfSection: idx === 0 });
    });
  });
  return out;
}

/** Sections the client left incomplete — drives the review screen's jump links. */
export function missingBySection(form) {
  return SECTIONS.map((section, i) => {
    const missing = section.screens
      .flatMap((s) => s.fields)
      .filter((f) => isVisible(f, form) && !f.optional && !isAnswered(f, form));
    return { section, index: i, missing };
  }).filter((s) => s.missing.length > 0);
}

// ─── MEDICAL REVIEW FLAG ─────────────────────────────────────────────────────
// Deterministic. This flags an intake for the coach to read — it does not
// diagnose, score, or restrict anything, and no model is involved in the
// decision. A yes anywhere here means a human looks before programming.

export function reviewFlags(form) {
  const flags = [];
  if (form.hasInjury === 'yes') flags.push('current injury or pain');
  if (form.hasSurgery === 'yes') flags.push('past injury or surgery');
  if (form.medicalRestriction === 'yes') flags.push('medically advised to restrict exercise');
  if (form.medication === 'yes') flags.push('medication or health condition');
  return flags;
}

export const needsReview = (form) => reviewFlags(form).length > 0;
