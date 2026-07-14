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
    name: 'push pull legs — volume phase',
    type: 'strength',
    weeks: 8,
    daysPerWeek: 6,
    assignedTo: ['c1'],
    workouts: [
      {
        id: 'w1',
        day: 'push',
        exercises: [
          { name: 'barbell bench press', sets: 4, reps: '6–8', rest: '3 min' },
          { name: 'incline dumbbell press', sets: 3, reps: '10–12', rest: '2 min' },
          { name: 'cable lateral raise', sets: 4, reps: '15–20', rest: '90 sec' },
          { name: 'overhead press', sets: 3, reps: '8–10', rest: '2 min' },
          { name: 'tricep pushdown', sets: 3, reps: '12–15', rest: '90 sec' },
          { name: 'overhead tricep extension', sets: 3, reps: '12–15', rest: '90 sec' },
        ],
      },
      {
        id: 'w2',
        day: 'pull',
        exercises: [
          { name: 'pull-ups', sets: 4, reps: 'max', rest: '3 min' },
          { name: 'barbell row', sets: 4, reps: '6–8', rest: '3 min' },
          { name: 'cable row', sets: 3, reps: '10–12', rest: '2 min' },
          { name: 'face pull', sets: 4, reps: '15–20', rest: '90 sec' },
          { name: 'barbell curl', sets: 3, reps: '10–12', rest: '90 sec' },
          { name: 'hammer curl', sets: 3, reps: '12–15', rest: '90 sec' },
        ],
      },
      {
        id: 'w3',
        day: 'legs',
        exercises: [
          { name: 'barbell squat', sets: 4, reps: '6–8', rest: '3 min' },
          { name: 'romanian deadlift', sets: 3, reps: '10–12', rest: '2 min' },
          { name: 'leg press', sets: 3, reps: '12–15', rest: '2 min' },
          { name: 'leg curl', sets: 4, reps: '10–12', rest: '90 sec' },
          { name: 'calf raise', sets: 4, reps: '15–20', rest: '60 sec' },
        ],
      },
    ],
  },
  {
    id: 'p2',
    name: 'strength foundation — week 6',
    type: 'strength',
    weeks: 12,
    daysPerWeek: 4,
    assignedTo: ['c2'],
    workouts: [
      {
        id: 'w4',
        day: 'upper a',
        exercises: [
          { name: 'bench press', sets: 5, reps: '5', rest: '3 min' },
          { name: 'pendlay row', sets: 5, reps: '5', rest: '3 min' },
          { name: 'overhead press', sets: 3, reps: '8', rest: '2 min' },
          { name: 'pull-ups', sets: 3, reps: '8', rest: '2 min' },
        ],
      },
      {
        id: 'w5',
        day: 'lower a',
        exercises: [
          { name: 'squat', sets: 5, reps: '5', rest: '3 min' },
          { name: 'deadlift', sets: 3, reps: '5', rest: '4 min' },
          { name: 'leg press', sets: 3, reps: '10', rest: '2 min' },
        ],
      },
    ],
  },
  {
    id: 'p3',
    name: 'hypertrophy block — month 1',
    type: 'hypertrophy',
    weeks: 4,
    daysPerWeek: 4,
    assignedTo: ['c3'],
    workouts: [],
  },
  {
    id: 'p4',
    name: 'cut phase — deficit protocol',
    type: 'fat loss',
    weeks: 6,
    daysPerWeek: 5,
    assignedTo: ['c4'],
    workouts: [],
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
      { id: 'q1', type: 'yesno', text: 'did you complete your trading journal every day?' },
      { id: 'q2', type: 'yesno', text: 'did you post content at least 3x this week?' },
      { id: 'q3', type: 'slider', text: 'deep work quality this week (1–10)' },
      { id: 'q4', type: 'yesno', text: 'did you avoid impulsive trades?' },
    ],
  },
  {
    clientId: 'c2',
    questions: [
      { id: 'q1', type: 'number', text: 'how many sales calls did you make?', max: 20 },
      { id: 'q2', type: 'number', text: 'days you hit protein target (out of 7)', max: 7 },
      { id: 'q3', type: 'yesno', text: 'did you go to bed before midnight every night?' },
    ],
  },
  {
    clientId: 'c3',
    questions: [
      { id: 'q1', type: 'number', text: 'workouts completed this week', max: 7 },
      { id: 'q2', type: 'yesno', text: 'did you track your meals?' },
      { id: 'q3', type: 'number', text: 'hours of study this week', max: 40 },
    ],
  },
  {
    clientId: 'c4',
    questions: [
      { id: 'q1', type: 'number', text: 'workouts completed this week', max: 7 },
      { id: 'q2', type: 'yesno', text: 'did you log your meals every day?' },
      { id: 'q3', type: 'text', text: 'biggest obstacle this week — be honest' },
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
    targets: { calories: 2800, protein: 210, carbs: 320, fat: 80 },
    log: [
      { date: '2026-07-12', calories: 2750, protein: 205, carbs: 310, fat: 78 },
      { date: '2026-07-11', calories: 2900, protein: 215, carbs: 335, fat: 82 },
      { date: '2026-07-10', calories: 2650, protein: 198, carbs: 295, fat: 76 },
    ],
  },
  {
    clientId: 'c2',
    targets: { calories: 2400, protein: 180, carbs: 260, fat: 75 },
    log: [
      { date: '2026-07-12', calories: 2350, protein: 175, carbs: 250, fat: 72 },
      { date: '2026-07-11', calories: 2500, protein: 185, carbs: 275, fat: 78 },
    ],
  },
];
