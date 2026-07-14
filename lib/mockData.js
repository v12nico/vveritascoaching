export const clients = [
  {
    id: 'c1',
    token: 'xK9mP2qLnR8v',
    name: 'alex thompson',
    tier: 'sovereign',
    price: 5000,
    status: 'active',
    startDate: '2026-05-01',
    blockStart: '2026-06-02',
    nextCheckIn: '2026-07-15',
    program: 'push pull legs — volume phase',
    lastWorkout: '2026-07-12',
    weeklyCheckIns: 3,
    momentum: 82,
    goal: 'body recomposition + trading discipline',
    weight: { current: 182, start: 195 },
    unread: 2,
  },
  {
    id: 'c2',
    token: 'tY4wJ7dFcM3b',
    name: 'marcus reid',
    tier: 'operator',
    price: 2750,
    status: 'active',
    startDate: '2026-06-01',
    blockStart: '2026-06-09',
    nextCheckIn: '2026-07-14',
    program: 'strength foundation — week 6',
    lastWorkout: '2026-07-11',
    weeklyCheckIns: 2,
    momentum: 64,
    goal: 'build muscle, lose fat',
    weight: { current: 210, start: 225 },
    unread: 0,
  },
  {
    id: 'c3',
    token: 'pQ6hN1sFgW5c',
    name: 'jordan silva',
    tier: 'foundation',
    price: 997,
    status: 'active',
    startDate: '2026-06-15',
    blockStart: '2026-06-23',
    nextCheckIn: '2026-07-16',
    program: 'hypertrophy block — month 1',
    lastWorkout: '2026-07-10',
    weeklyCheckIns: 1,
    momentum: 41,
    goal: 'first time lifting seriously',
    weight: { current: 165, start: 165 },
    unread: 1,
  },
  {
    id: 'c4',
    token: 'rB8xT3kYmZ2d',
    name: 'dante wells',
    tier: 'sovereign',
    price: 5000,
    status: 'stuck',
    startDate: '2026-04-01',
    blockStart: '2026-06-02',
    nextCheckIn: '2026-07-13',
    program: 'cut phase — deficit protocol',
    lastWorkout: '2026-07-08',
    weeklyCheckIns: 0,
    momentum: 18,
    goal: 'prep for summer, maintain strength',
    weight: { current: 178, start: 190 },
    unread: 0,
  },
];

export const programs = [
  {
    id: 'p1',
    name: 'high-intensity strength block',
    type: 'strength',
    weeks: 8,
    daysPerWeek: 6,
    experienceLevel: 'experienced',
    note: '1–2 hard working sets per movement. warm-up sets are not counted. train to technical failure on the final working set.',
    assignedTo: ['c1'],
    workouts: [
      {
        id: 'w1',
        day: 'push',
        exercises: [
          { name: 'barbell bench press', sets: 2, reps: '3–5', rest: '3–4 min', note: 'add weight when you hit 5 clean reps' },
          { name: 'incline dumbbell press', sets: 2, reps: '5–8', rest: '2–3 min' },
          { name: 'overhead press', sets: 2, reps: '4–6', rest: '2–3 min' },
          { name: 'cable lateral raise', sets: 1, reps: '10–15', rest: '90 sec', note: 'slow eccentric — shoulder health priority' },
          { name: 'tricep pushdown', sets: 1, reps: '8–12', rest: '90 sec' },
        ],
      },
      {
        id: 'w2',
        day: 'pull',
        exercises: [
          { name: 'weighted pull-up', sets: 2, reps: '3–6', rest: '3–4 min', note: 'add weight when you hit 6 reps' },
          { name: 'barbell row', sets: 2, reps: '4–6', rest: '3 min' },
          { name: 'cable row', sets: 1, reps: '8–12', rest: '2 min' },
          { name: 'face pull', sets: 1, reps: '12–15', rest: '90 sec', note: 'do not skip — shoulder health' },
          { name: 'barbell curl', sets: 2, reps: '5–8', rest: '2 min' },
        ],
      },
      {
        id: 'w3',
        day: 'legs',
        exercises: [
          { name: 'barbell squat', sets: 2, reps: '3–5', rest: '3–4 min', note: 'primary strength movement — progressive overload every session' },
          { name: 'romanian deadlift', sets: 2, reps: '5–8', rest: '3 min' },
          { name: 'leg press', sets: 1, reps: '8–12', rest: '2 min' },
          { name: 'leg curl', sets: 2, reps: '6–10', rest: '2 min' },
          { name: 'standing calf raise', sets: 2, reps: '8–12', rest: '90 sec' },
        ],
      },
    ],
  },
  {
    id: 'p2',
    name: 'strength foundation block',
    type: 'strength',
    weeks: 12,
    daysPerWeek: 4,
    experienceLevel: 'intermediate',
    note: '2 hard working sets on main lifts. upper/lower split. add weight each session — even 2.5 lbs counts.',
    assignedTo: ['c2'],
    workouts: [
      {
        id: 'w4',
        day: 'upper',
        exercises: [
          { name: 'barbell bench press', sets: 2, reps: '3–5', rest: '3 min', note: 'primary push — load week over week' },
          { name: 'barbell row', sets: 2, reps: '4–6', rest: '3 min' },
          { name: 'overhead press', sets: 2, reps: '5–7', rest: '2–3 min' },
          { name: 'pull-ups', sets: 2, reps: '4–8', rest: '2–3 min' },
          { name: 'dumbbell curl', sets: 1, reps: '8–10', rest: '90 sec' },
        ],
      },
      {
        id: 'w5',
        day: 'lower',
        exercises: [
          { name: 'barbell squat', sets: 2, reps: '3–5', rest: '3–4 min', note: 'add weight each session' },
          { name: 'romanian deadlift', sets: 2, reps: '5–8', rest: '3 min' },
          { name: 'leg press', sets: 1, reps: '10–12', rest: '2 min' },
          { name: 'leg curl', sets: 2, reps: '8–10', rest: '2 min' },
        ],
      },
    ],
  },
  {
    id: 'p3',
    name: 'foundation block',
    type: 'foundation',
    weeks: 8,
    daysPerWeek: 3,
    experienceLevel: 'beginner',
    note: 'full-body 3x/week. focus on learning movement patterns with controlled loads. technique first, weight second. no grinding to failure yet.',
    assignedTo: ['c3'],
    workouts: [
      {
        id: 'w6',
        day: 'full body',
        exercises: [
          { name: 'goblet squat', sets: 3, reps: '8–10', rest: '2 min', note: 'depth and control over weight. learn the pattern.' },
          { name: 'dumbbell bench press', sets: 3, reps: '8–12', rest: '2 min' },
          { name: 'lat pulldown', sets: 3, reps: '10–12', rest: '2 min', note: 'pull with elbows, not hands' },
          { name: 'dumbbell shoulder press', sets: 2, reps: '10–12', rest: '90 sec' },
          { name: 'dumbbell romanian deadlift', sets: 2, reps: '10–12', rest: '2 min', note: 'hip hinge pattern — feel the hamstrings' },
          { name: 'plank', sets: 3, reps: '30–45 sec', rest: '60 sec' },
        ],
      },
    ],
  },
  {
    id: 'p4',
    name: 'recomposition block',
    type: 'recomposition',
    weeks: 6,
    daysPerWeek: 4,
    experienceLevel: 'intermediate',
    note: 'maintain strength while in a calorie deficit. 2 working sets — do not sacrifice intensity trying to add volume during a cut.',
    assignedTo: ['c4'],
    workouts: [
      {
        id: 'w7',
        day: 'upper',
        exercises: [
          { name: 'barbell bench press', sets: 2, reps: '4–6', rest: '3 min', note: 'maintain — do not lose this strength' },
          { name: 'pull-ups', sets: 2, reps: '4–8', rest: '3 min' },
          { name: 'overhead press', sets: 2, reps: '5–7', rest: '2 min' },
          { name: 'barbell curl', sets: 1, reps: '8–10', rest: '90 sec' },
        ],
      },
      {
        id: 'w8',
        day: 'lower',
        exercises: [
          { name: 'barbell squat', sets: 2, reps: '4–6', rest: '3 min', note: 'protect the legs — strength retention is the goal' },
          { name: 'romanian deadlift', sets: 2, reps: '6–8', rest: '3 min' },
          { name: 'leg curl', sets: 2, reps: '8–10', rest: '2 min' },
          { name: 'calf raise', sets: 2, reps: '10–15', rest: '90 sec' },
        ],
      },
    ],
  },
];

export const messages = [
  {
    id: 'm1',
    clientId: 'c1',
    thread: [
      { from: 'client', text: 'finished today\'s push session. bench went up 5lbs. felt strong.', time: '2026-07-12 09:14' },
      { from: 'coach', text: 'that\'s what i want to see. keep the form tight on the incline. video next session.', time: '2026-07-12 10:30' },
      { from: 'client', text: 'will do. nutrition has been clean this week too', time: '2026-07-12 11:02' },
      { from: 'client', text: 'also wanted to ask about adding more cardio. thoughts?', time: '2026-07-13 08:45' },
      { from: 'coach', text: 'Good work this week, Alex. Your training and nutrition have been consistent, and that is becoming one of your strongest foundations. The next area we need to tighten up is execution around your business and content. You have the ideas, but the score will not move until the actions become consistent. This week, I want four focused business sessions, three published pieces of content, and every active lead followed up with. Keep the fitness standard where it is and bring the rest of your life up to match it. Message me after your first deep-work session tomorrow.', time: '2026-07-14 08:30' },
    ],
  },
  {
    id: 'm2',
    clientId: 'c2',
    thread: [
      { from: 'coach', text: 'how did the lower body session go yesterday?', time: '2026-07-11 14:00' },
      { from: 'client', text: 'squats felt heavy but i got all 5 sets. deadlift was solid.', time: '2026-07-11 17:30' },
    ],
  },
  {
    id: 'm3',
    clientId: 'c3',
    thread: [
      { from: 'client', text: 'hey nico, quick question on the meal plan — can i swap rice for potatoes?', time: '2026-07-13 07:20' },
    ],
  },
  {
    id: 'm4',
    clientId: 'c4',
    thread: [
      { from: 'coach', text: 'dante, haven\'t seen a check-in this week. what\'s going on?', time: '2026-07-11 10:00' },
    ],
  },
];

export const groceryLists = [
  {
    clientId: 'c1',
    week: '2026-07-14',
    note: 'high protein recomp. heavy beef, eggs, raw dairy. fruit for carbs around training.',
    items: [
      { category: 'protein', name: 'grass-fed ground beef (80/20)', qty: '3 lbs' },
      { category: 'protein', name: 'pasture-raised eggs', qty: '2 dozen' },
      { category: 'protein', name: 'wild-caught salmon', qty: '1.5 lbs' },
      { category: 'protein', name: 'grass-fed bison', qty: '1 lb' },
      { category: 'protein', name: 'beef liver', qty: '½ lb' },
      { category: 'dairy', name: 'raw whole milk', qty: '½ gallon' },
      { category: 'dairy', name: 'grass-fed butter', qty: '1 block' },
      { category: 'dairy', name: 'raw cheddar cheese', qty: '½ lb' },
      { category: 'fat', name: 'ghee', qty: '1 jar' },
      { category: 'fat', name: 'coconut oil', qty: '1 jar' },
      { category: 'carbs', name: 'sweet potato', qty: '4 medium' },
      { category: 'carbs', name: 'bananas', qty: '6' },
      { category: 'carbs', name: 'blueberries', qty: '2 pints' },
      { category: 'carbs', name: 'mango', qty: '3' },
      { category: 'carbs', name: 'raw honey', qty: '1 jar' },
      { category: 'other', name: 'sea salt', qty: 'as needed' },
      { category: 'other', name: 'mineral water', qty: '1 case' },
    ],
  },
  {
    clientId: 'c2',
    week: '2026-07-14',
    note: 'strength phase. caloric deficit starting next week — keep beef and eggs high, pull back on dairy.',
    items: [
      { category: 'protein', name: 'grass-fed ground beef (80/20)', qty: '2.5 lbs' },
      { category: 'protein', name: 'pasture-raised eggs', qty: '18 eggs' },
      { category: 'protein', name: 'wild-caught sardines', qty: '4 cans' },
      { category: 'protein', name: 'grass-fed ribeye', qty: '1 lb' },
      { category: 'dairy', name: 'raw whole milk', qty: '1 quart' },
      { category: 'dairy', name: 'grass-fed butter', qty: '1 block' },
      { category: 'fat', name: 'tallow', qty: '1 jar' },
      { category: 'fat', name: 'coconut oil', qty: '1 jar' },
      { category: 'carbs', name: 'sweet potato', qty: '3 medium' },
      { category: 'carbs', name: 'bananas', qty: '5' },
      { category: 'carbs', name: 'strawberries', qty: '1 lb' },
      { category: 'carbs', name: 'raw honey', qty: '1 jar' },
      { category: 'other', name: 'sea salt', qty: 'as needed' },
    ],
  },
];

export const missions = [
  {
    clientId: 'c1',
    date: '2026-07-14',
    tasks: [
      { id: 't1', text: 'complete push session', pillar: 'fitness', done: false },
      { id: 't2', text: 'hit 210g protein', pillar: 'nutrition', done: false },
      { id: 't3', text: 'complete trading journal', pillar: 'business', done: false },
      { id: 't4', text: 'publish instagram post', pillar: 'content', done: false },
      { id: 't5', text: 'morning walk — 20 min', pillar: 'fitness', done: true },
      { id: 't6', text: '10 min meditation', pillar: 'mindset', done: true },
      { id: 't7', text: 'read 15 pages', pillar: 'learning', done: false },
      { id: 't8', text: 'no phone before 9am', pillar: 'discipline', done: true },
    ],
  },
  {
    clientId: 'c2',
    date: '2026-07-14',
    tasks: [
      { id: 't1', text: 'complete upper body session', pillar: 'fitness', done: false },
      { id: 't2', text: 'hit 180g protein', pillar: 'nutrition', done: false },
      { id: 't3', text: '3 outbound sales calls', pillar: 'business', done: false },
      { id: 't4', text: 'journal entry', pillar: 'mindset', done: true },
      { id: 't5', text: 'lights out by midnight', pillar: 'sleep', done: false },
      { id: 't6', text: 'no takeout — cook at home', pillar: 'discipline', done: true },
    ],
  },
  {
    clientId: 'c3',
    date: '2026-07-14',
    tasks: [
      { id: 't1', text: 'complete today\'s workout', pillar: 'fitness', done: false },
      { id: 't2', text: 'track all meals', pillar: 'nutrition', done: false },
      { id: 't3', text: 'study block — 2 hours', pillar: 'learning', done: false },
      { id: 't4', text: 'journal entry', pillar: 'mindset', done: false },
      { id: 't5', text: 'phone off by 8pm', pillar: 'discipline', done: true },
    ],
  },
  {
    clientId: 'c4',
    date: '2026-07-14',
    tasks: [
      { id: 't1', text: 'complete cardio session', pillar: 'fitness', done: false },
      { id: 't2', text: 'log every meal', pillar: 'nutrition', done: false },
      { id: 't3', text: '90 min deep work block', pillar: 'business', done: false },
      { id: 't4', text: 'morning meditation', pillar: 'mindset', done: false },
      { id: 't5', text: 'in bed by 11pm', pillar: 'sleep', done: false },
    ],
  },
];

export const pillars = [
  {
    clientId: 'c1',
    data: [
      { name: 'fitness', score: 88 },
      { name: 'nutrition', score: 79 },
      { name: 'mindset', score: 74 },
      { name: 'discipline', score: 82 },
      { name: 'business', score: 61 },
      { name: 'sleep', score: 71 },
      { name: 'content', score: 55 },
    ],
  },
  {
    clientId: 'c2',
    data: [
      { name: 'fitness', score: 72 },
      { name: 'nutrition', score: 68 },
      { name: 'mindset', score: 58 },
      { name: 'discipline', score: 64 },
      { name: 'business', score: 77 },
      { name: 'sleep', score: 62 },
    ],
  },
  {
    clientId: 'c3',
    data: [
      { name: 'fitness', score: 45 },
      { name: 'nutrition', score: 39 },
      { name: 'mindset', score: 52 },
      { name: 'discipline', score: 41 },
      { name: 'sleep', score: 70 },
      { name: 'learning', score: 67 },
    ],
  },
  {
    clientId: 'c4',
    data: [
      { name: 'fitness', score: 22 },
      { name: 'nutrition', score: 18 },
      { name: 'mindset', score: 31 },
      { name: 'discipline', score: 19 },
      { name: 'sleep', score: 44 },
      { name: 'business', score: 35 },
    ],
  },
];

export const objectives = [
  {
    clientId: 'c1',
    items: [
      {
        title: 'body recomposition',
        progress: 65,
        milestone: 'reach 178 lbs by aug 1',
        deadline: '2026-08-01',
        reason: 'want to look and perform at my absolute best',
      },
      {
        title: 'trading discipline',
        progress: 48,
        milestone: 'complete journal 5 days this week',
        deadline: '2026-09-01',
        reason: 'consistent execution is the only edge',
      },
      {
        title: 'grow instagram',
        progress: 30,
        milestone: 'post 4x this week, reach 5k',
        deadline: '2026-10-01',
        reason: 'build the brand while the skills compound',
      },
    ],
  },
  {
    clientId: 'c2',
    items: [
      {
        title: 'lean muscle — 215 to 195',
        progress: 55,
        milestone: 'hit 200 lbs by end of block',
        deadline: '2026-09-01',
        reason: 'want to be strong and lean at the same time',
      },
      {
        title: 'close first $10k month',
        progress: 38,
        milestone: 'book 15 discovery calls this month',
        deadline: '2026-08-31',
        reason: 'proof that the business works',
      },
    ],
  },
  {
    clientId: 'c3',
    items: [
      {
        title: 'build the training habit',
        progress: 35,
        milestone: 'complete 3 full weeks with no skips',
        deadline: '2026-08-14',
        reason: 'never trained seriously — this is the foundation',
      },
      {
        title: 'learn nutrition',
        progress: 28,
        milestone: 'track meals 5x/week for a month',
        deadline: '2026-08-23',
        reason: 'can\'t build a body without understanding fuel',
      },
    ],
  },
  {
    clientId: 'c4',
    items: [
      {
        title: 'summer cut — reach 170',
        progress: 28,
        milestone: 'hit 174 lbs this week',
        deadline: '2026-08-15',
        reason: 'want to feel confident without a shirt on',
      },
      {
        title: 'rebuild consistency',
        progress: 12,
        milestone: '5 check-ins in a row',
        deadline: '2026-08-01',
        reason: 'i keep stopping. this time is different.',
      },
    ],
  },
];

export const checkInConfig = [
  {
    clientId: 'c1',
    questions: [
      { id: 'q1', type: 'yesno', text: 'did you complete every scheduled training session?' },
      { id: 'q2', type: 'number', text: 'days you hit your protein target', max: 7 },
      { id: 'q3', type: 'yesno', text: 'did you complete your primary business task every day?' },
      { id: 'q4', type: 'yesno', text: 'did you publish content 3+ times this week?' },
      { id: 'q5', type: 'slider', text: 'deep work quality this week (1–10)' },
      { id: 'q6', type: 'yesno', text: 'did you hold your morning standard every day?' },
      { id: 'q7', type: 'text', text: 'where did you fall below your standard this week?' },
      { id: 'q8', type: 'text', text: 'what will you correct next week?' },
    ],
  },
  {
    clientId: 'c2',
    questions: [
      { id: 'q1', type: 'yesno', text: 'did you complete every scheduled training session?' },
      { id: 'q2', type: 'number', text: 'days you hit your protein target', max: 7 },
      { id: 'q3', type: 'number', text: 'outbound sales calls made this week', max: 30 },
      { id: 'q4', type: 'yesno', text: 'did you complete your deep-work block every day?' },
      { id: 'q5', type: 'yesno', text: 'did you go to bed before midnight every night?' },
      { id: 'q6', type: 'text', text: 'one area where you need to raise the standard.' },
    ],
  },
  {
    clientId: 'c3',
    questions: [
      { id: 'q1', type: 'number', text: 'workouts completed this week', max: 3 },
      { id: 'q2', type: 'number', text: 'days you ate quality whole-food meals', max: 7 },
      { id: 'q3', type: 'number', text: 'hours of focused study this week', max: 40 },
      { id: 'q4', type: 'yesno', text: 'did you hold your phone cutoff standard?' },
      { id: 'q5', type: 'text', text: 'what did you do well this week?' },
      { id: 'q6', type: 'text', text: 'where did procrastination cost you?' },
    ],
  },
  {
    clientId: 'c4',
    questions: [
      { id: 'q1', type: 'number', text: 'training sessions completed this week', max: 4 },
      { id: 'q2', type: 'yesno', text: 'did you follow your food plan every day?' },
      { id: 'q3', type: 'yesno', text: 'did you complete your deep-work block?' },
      { id: 'q4', type: 'yesno', text: 'did you go to bed on time every night?' },
      { id: 'q5', type: 'text', text: 'what broke down this week — be specific.' },
      { id: 'q6', type: 'text', text: 'the one commitment you will not miss next week.' },
    ],
  },
];

export const payments = [
  { id: 'pay1', clientId: 'c1', amount: 5000, status: 'paid', date: '2026-05-01', method: 'stripe', tier: 'sovereign' },
  { id: 'pay2', clientId: 'c2', amount: 2750, status: 'paid', date: '2026-06-09', method: 'stripe', tier: 'operator' },
  { id: 'pay3', clientId: 'c3', amount: 997, status: 'paid', date: '2026-06-23', method: 'stripe', tier: 'foundation' },
  { id: 'pay4', clientId: 'c4', amount: 5000, status: 'paid', date: '2026-06-02', method: 'stripe', tier: 'sovereign' },
];

export const nutrition = [
  {
    clientId: 'c1',
    proteinTarget: 210,
    targets: { calories: 2800, protein: 210, carbs: 320, fat: 80 },
    foodQuality: {
      todayScore: 86,
      checklist: [
        { id: 'protein', text: 'protein target — 210g', done: false },
        { id: 'meals', text: 'whole-food meals — all 3 planned', done: false },
        { id: 'hydration', text: 'hydration — 1 gallon', done: false },
        { id: 'timing', text: 'final meal before 8pm', done: false },
        { id: 'quality', text: 'no seed oils or processed food', done: true },
        { id: 'fruit', text: 'quality fruit or carb source included', done: true },
      ],
      recentScores: [
        { date: '2026-07-12', score: 91, protein: true },
        { date: '2026-07-11', score: 78, protein: true },
        { date: '2026-07-10', score: 85, protein: true },
        { date: '2026-07-09', score: 62, protein: false },
        { date: '2026-07-08', score: 88, protein: true },
        { date: '2026-07-07', score: 71, protein: true },
      ],
    },
    log: [
      { date: '2026-07-12', calories: 2750, protein: 205, carbs: 310, fat: 78 },
      { date: '2026-07-11', calories: 2900, protein: 215, carbs: 335, fat: 82 },
      { date: '2026-07-10', calories: 2650, protein: 198, carbs: 295, fat: 76 },
    ],
  },
  {
    clientId: 'c2',
    proteinTarget: 180,
    targets: { calories: 2400, protein: 180, carbs: 260, fat: 75 },
    foodQuality: {
      todayScore: 74,
      checklist: [
        { id: 'protein', text: 'protein target — 180g', done: false },
        { id: 'meals', text: 'home-cooked meals — no takeout', done: true },
        { id: 'hydration', text: 'hydration — 1 gallon', done: false },
        { id: 'timing', text: 'final meal before 8pm', done: true },
        { id: 'quality', text: 'no seed oils or processed food', done: true },
      ],
      recentScores: [
        { date: '2026-07-12', score: 80, protein: true },
        { date: '2026-07-11', score: 68, protein: false },
        { date: '2026-07-10', score: 72, protein: true },
      ],
    },
    log: [
      { date: '2026-07-12', calories: 2350, protein: 175, carbs: 250, fat: 72 },
      { date: '2026-07-11', calories: 2500, protein: 185, carbs: 275, fat: 78 },
    ],
  },
  {
    clientId: 'c3',
    proteinTarget: 140,
    targets: { calories: 2200, protein: 140, carbs: 280, fat: 65 },
    foodQuality: {
      todayScore: 52,
      checklist: [
        { id: 'protein', text: 'protein target — 140g', done: false },
        { id: 'meals', text: 'whole-food meals — eat real food', done: false },
        { id: 'hydration', text: 'hydration — 3 liters', done: false },
        { id: 'quality', text: 'no fast food or seed oils', done: true },
      ],
      recentScores: [
        { date: '2026-07-12', score: 55, protein: false },
        { date: '2026-07-11', score: 48, protein: false },
        { date: '2026-07-10', score: 60, protein: false },
      ],
    },
    log: [],
  },
  {
    clientId: 'c4',
    proteinTarget: 190,
    targets: { calories: 2100, protein: 190, carbs: 180, fat: 65 },
    foodQuality: {
      todayScore: 31,
      checklist: [
        { id: 'protein', text: 'protein target — 190g', done: false },
        { id: 'meals', text: 'follow the meal plan — no improvising', done: false },
        { id: 'hydration', text: 'hydration — 1 gallon', done: false },
        { id: 'timing', text: 'final meal before 7:30pm', done: false },
        { id: 'quality', text: 'no processed food', done: false },
      ],
      recentScores: [
        { date: '2026-07-12', score: 38, protein: false },
        { date: '2026-07-11', score: 22, protein: false },
        { date: '2026-07-10', score: 45, protein: true },
      ],
    },
    log: [],
  },
];

export const pillarDetails = [
  {
    clientId: 'c1',
    pillars: {
      fitness: {
        score: 88, nextScore: 91, progressToNext: 68, trend: 'stable', streakDays: 14,
        helping: [
          'training 5–6 days consistently for 6+ weeks',
          'progressive overload tracked and applied every session',
          'protein target met 6 of 7 days',
          'adequate rest between sessions maintained',
        ],
        holding: [
          'sleep averaging 6.2 hours — target is 7.5',
          'one missed session this week',
        ],
        toImprove: [
          'consistently hit 7+ hours of sleep every night',
          'complete every scheduled session for 2 straight weeks',
          'add a structured deload at end of current block',
        ],
        note: 'your fitness is your most consistent pillar. sleep is the one thing limiting your recovery and your ceiling.',
      },
      nutrition: {
        score: 79, nextScore: 82, progressToNext: 45, trend: 'up', streakDays: 5,
        helping: [
          'protein target met 6 of last 7 days',
          'home-cooked meals 4–5 days per week',
          'no seed oils or processed food 5+ days',
          'meal timing aligning with training',
        ],
        holding: [
          'weekend eating inconsistent — 2 off-plan meals last week',
          'hydration below target 3 of last 7 days',
          'late-night eating on 2 nights',
        ],
        toImprove: [
          'hold your food standard 7 days straight — weekends included',
          'hit hydration target daily for 2 weeks',
          'final meal before 8pm every night',
        ],
        note: 'weekdays are clean. weekends are where the score is losing ground. fix that one thing.',
      },
      mindset: {
        score: 74, nextScore: 78, progressToNext: 30, trend: 'stable', streakDays: 8,
        helping: [
          'morning meditation 5 of 7 days',
          'journaling 3+ times per week',
          'managing setbacks without derailing the week',
        ],
        holding: [
          'meditation skipped on high-stress days — when it matters most',
          'reactive thinking patterns still present under pressure',
          'gratitude practice inconsistent',
        ],
        toImprove: [
          'meditate every day — especially on the hard days',
          'add one reflection question to end-of-day journal',
          'hold the morning standard 7 days per week for 3 weeks straight',
        ],
        note: 'mindset practices are the first thing you drop when life gets hard. that is backwards. protect them first.',
      },
      discipline: {
        score: 82, nextScore: 85, progressToNext: 55, trend: 'up', streakDays: 11,
        helping: [
          'waking before 7am 6 of 7 days',
          'completing daily mission list 4+ days per week',
          'no phone before 9am — held 5 of 7 days',
          'commitments to self are being honored',
        ],
        holding: [
          'sunday structure inconsistent — tends to drift',
          'task completion drops on weekends',
          'decision fatigue setting in by evening',
        ],
        toImprove: [
          'apply the same morning standard 7 days — sundays are not optional',
          'complete the daily mission list 6 of 7 days for 2 weeks',
          'evening shutdown routine — no new decisions after 9pm',
        ],
        note: 'you are disciplined when structure is in place. build the sunday structure.',
      },
      business: {
        score: 61, nextScore: 65, progressToNext: 40, trend: 'down', streakDays: 0,
        helping: [
          'completed 3 focused work sessions this week',
          'replied to all active leads',
          'current offer is clearly defined',
        ],
        holding: [
          'no new outreach in 4 days',
          'weekly revenue review incomplete',
          'sales follow-up consistency below target',
          'only 1 of 3 planned business development tasks completed',
        ],
        toImprove: [
          'complete 4 deep-work sessions per week',
          '10 qualified outreach attempts per week',
          'complete the weekly revenue review every sunday',
          'follow up with every active lead within 24 hours',
          'sustain these behaviors for at least 2 weeks',
        ],
        note: 'the ideas are there. execution is the only gap between 61 and 70. actions, not plans.',
      },
      sleep: {
        score: 71, nextScore: 75, progressToNext: 20, trend: 'down', streakDays: 2,
        helping: [
          'in bed before midnight 4 of 7 nights',
          'phone-free sleep environment — improving',
        ],
        holding: [
          'averaging 6.2 hours — target is 7.5',
          'inconsistent bed time — varies by 2+ hours each night',
          'blue light exposure late at night on 3 of 7 nights',
        ],
        toImprove: [
          'set a consistent sleep window and hold it every night',
          'no screens 45 minutes before bed',
          'target 7.5 hours per night for 14 consecutive days',
        ],
        note: 'sleep is limiting your recovery, your focus, and your business output. this is not optional to fix.',
      },
      content: {
        score: 55, nextScore: 58, progressToNext: 72, trend: 'up', streakDays: 6,
        helping: [
          'published 2 pieces of content this week',
          'filming sessions becoming more consistent',
          'content ideas being captured regularly',
        ],
        holding: [
          'publishing frequency below the 3x per week standard',
          'no content backlog being maintained',
          'comments and messages not responded to consistently',
          'no weekly content performance review happening',
        ],
        toImprove: [
          'publish 3 pieces of content per week — non-negotiable',
          'complete 2 filming sessions per week',
          'maintain a running content backlog',
          'respond to comments and messages within 24 hours',
          'review content performance every sunday',
          'sustain this standard for 3+ weeks',
        ],
        note: 'your content score is trending up. sustain 5 more days at this pace to reach 58.',
      },
    },
  },
  {
    clientId: 'c2',
    pillars: {
      fitness: {
        score: 72, nextScore: 76, progressToNext: 50, trend: 'up', streakDays: 9,
        helping: ['completing 3 of 4 weekly sessions consistently', 'progressive overload being applied'],
        holding: ['missing one session per week on average', 'sleep affecting recovery'],
        toImprove: ['complete all 4 sessions for 2 consecutive weeks', 'protect sleep to maximize recovery'],
        note: 'training is consistent but not yet complete. close the gap on the missed session.',
      },
      nutrition: {
        score: 68, nextScore: 72, progressToNext: 35, trend: 'stable', streakDays: 4,
        helping: ['hitting protein target 4–5 days per week', 'cooking more meals at home'],
        holding: ['weekends consistently off plan', 'hydration low', 'late meals 3 nights per week'],
        toImprove: ['hold the food standard 7 days straight', 'hydration target daily', 'final meal before 8pm'],
        note: 'nutrition is serviceable but not optimized. the weekends are costing you recovery.',
      },
      mindset: {
        score: 58, nextScore: 62, progressToNext: 25, trend: 'stable', streakDays: 3,
        helping: ['journaling 2x per week', 'starting to manage stress without derailing the week'],
        holding: ['no consistent morning practice', 'reactive to stress rather than managed'],
        toImprove: ['establish a non-negotiable morning routine', 'journal daily for 2 weeks'],
        note: 'mindset is the weakest area right now. a morning routine would change everything else.',
      },
      discipline: {
        score: 64, nextScore: 68, progressToNext: 40, trend: 'up', streakDays: 6,
        helping: ['waking consistently before 7:30am', 'task list being used daily'],
        holding: ['task completion rate around 60%', 'distractions costing 1–2 hours per day'],
        toImprove: ['raise task completion to 80% for 2 weeks', 'eliminate one major daily distraction'],
        note: 'trending up. the task list is working — now raise the completion rate.',
      },
      business: {
        score: 77, nextScore: 80, progressToNext: 60, trend: 'up', streakDays: 12,
        helping: ['consistent outreach activity', 'offer clarity improving', 'follow-up happening within 48 hours'],
        holding: ['revenue not yet reflecting activity', 'close rate needs work', 'scattered priorities some days'],
        toImprove: ['focus on close rate — improve the sales conversation', 'track revenue weekly', 'single priority per deep-work session'],
        note: 'business is your strongest pillar. the activity is there — now improve conversion.',
      },
      sleep: {
        score: 62, nextScore: 66, progressToNext: 30, trend: 'down', streakDays: 1,
        helping: ['trying to get to bed before midnight'],
        holding: ['averaging under 7 hours', 'inconsistent bed time', 'phone in bed most nights'],
        toImprove: ['consistent sleep window — same time every night', 'phone out of the room', 'target 7.5 hours for 2 weeks'],
        note: 'sleep is quietly limiting everything else. fix this and your discipline and business scores will follow.',
      },
    },
  },
  {
    clientId: 'c3',
    pillars: {
      fitness: {
        score: 45, nextScore: 50, progressToNext: 35, trend: 'up', streakDays: 3,
        helping: ['completed 2 of 3 sessions this week', 'showing up consistently for 3 weeks'],
        holding: ['one missed session per week', 'no progressive overload tracked yet'],
        toImprove: ['complete all 3 sessions for 3 consecutive weeks', 'start tracking weight used each session'],
        note: 'you are building the habit. the habit is the goal right now. do not miss another session.',
      },
      nutrition: {
        score: 39, nextScore: 45, progressToNext: 20, trend: 'stable', streakDays: 1,
        helping: ['eating more home-cooked meals this week'],
        holding: ['protein target missed most days', 'eating fast food 2–3 times per week', 'no meal structure'],
        toImprove: ['add a protein source to every meal', 'eliminate fast food for 2 weeks', 'cook 5 meals at home per week'],
        note: 'nutrition is the area most holding your progress back. start with protein at every meal.',
      },
      mindset: {
        score: 52, nextScore: 56, progressToNext: 45, trend: 'up', streakDays: 5,
        helping: ['journaling 3x this week', 'handling setbacks without quitting'],
        holding: ['no morning routine', 'self-doubt still affecting consistency'],
        toImprove: ['establish a simple 10-minute morning practice', 'journal every day for 2 weeks'],
        note: 'mindset is improving. the fact that you are showing up is building confidence.',
      },
      discipline: {
        score: 41, nextScore: 46, progressToNext: 30, trend: 'stable', streakDays: 2,
        helping: ['phone cutoff held 4 of 7 nights', 'starting to build daily structure'],
        holding: ['procrastination costing 2+ hours per day', 'no consistent morning or evening routine'],
        toImprove: ['hold the phone cutoff every night for 2 weeks', 'complete the daily task list 5 of 7 days'],
        note: 'discipline is built one kept promise at a time. start with the phone cutoff — hold it every night.',
      },
      sleep: {
        score: 70, nextScore: 74, progressToNext: 55, trend: 'stable', streakDays: 7,
        helping: ['sleeping 7+ hours most nights', 'consistent bed time developing'],
        holding: ['phone in bed some nights', 'occasional late nights disrupting the pattern'],
        toImprove: ['phone out of the room every night', 'hold the same sleep time 7 days per week'],
        note: 'sleep is your strongest pillar right now. protect it.',
      },
      learning: {
        score: 67, nextScore: 71, progressToNext: 50, trend: 'up', streakDays: 8,
        helping: ['studying 2+ hours per day consistently', 'completing coursework on schedule'],
        holding: ['study sessions interrupted by phone', 'no weekly review of material learned'],
        toImprove: ['study in phone-free sessions', 'add a 15-minute weekly review of key concepts'],
        note: 'learning is your most consistent pillar. protect the study sessions.',
      },
    },
  },
  {
    clientId: 'c4',
    pillars: {
      fitness: {
        score: 22, nextScore: 30, progressToNext: 10, trend: 'down', streakDays: 0,
        helping: ['completed 1 session this week'],
        holding: ['3 missed sessions this week', 'no consistency in the last 3 weeks', 'momentum is gone'],
        toImprove: ['complete every scheduled session for 7 days straight', 'stop negotiating with yourself on training days'],
        note: 'this is the pattern that needs to break. one session does not count. the streak starts now.',
      },
      nutrition: {
        score: 18, nextScore: 28, progressToNext: 5, trend: 'down', streakDays: 0,
        helping: [],
        holding: ['not following the meal plan', 'late-night eating', 'meals being skipped then replaced with poor choices'],
        toImprove: ['follow the meal plan for 7 consecutive days — no exceptions', 'log every meal', 'final meal before 7:30pm'],
        note: 'nutrition is the reason the cut is stalling. the plan works when you follow it.',
      },
      mindset: {
        score: 31, nextScore: 38, progressToNext: 15, trend: 'down', streakDays: 0,
        helping: ['showed up this week despite low motivation'],
        holding: ['no morning practice', 'letting setbacks derail multiple days', 'self-talk is negative under pressure'],
        toImprove: ['5 minutes of journaling every morning', 'write down one thing you will not negotiate on each day'],
        note: 'you know what to do. the issue is the mindset around doing it. one day at a time.',
      },
      discipline: {
        score: 19, nextScore: 28, progressToNext: 8, trend: 'down', streakDays: 0,
        helping: [],
        holding: ['inconsistent wake time — varies by 3+ hours', 'daily commitments not being honored', 'structure completely absent'],
        toImprove: ['one non-negotiable: wake at the same time every day', 'complete the check-in every day for 2 weeks'],
        note: 'this is where we rebuild. one kept promise leads to another. start with waking up on time.',
      },
      sleep: {
        score: 44, nextScore: 50, progressToNext: 30, trend: 'stable', streakDays: 3,
        helping: ['sleeping 6–7 hours most nights'],
        holding: ['inconsistent bed time', 'screen use before sleep', 'no wind-down routine'],
        toImprove: ['consistent sleep window — non-negotiable', 'phone out of the room before 10pm'],
        note: 'sleep is not the biggest problem but fixing it will help everything else.',
      },
      business: {
        score: 35, nextScore: 42, progressToNext: 20, trend: 'down', streakDays: 0,
        helping: ['had one productive deep-work session this week'],
        holding: ['scattered priorities', 'deep-work sessions missed 4 of 5 days', 'no clear daily business task defined'],
        toImprove: ['define one primary business task each morning', 'complete a 90-minute deep-work block daily', 'review business output each sunday'],
        note: 'business output requires personal discipline first. fix the foundations and the business follows.',
      },
    },
  },
];
