// ─── MONTY KIM — THE 8 WEEK BUILD (guided) ──────────────────────────────────
// Built from his intake (client_intakes row 8, submitted 2026-09-18 15:53Z)
// plus one thing he said in DMs that the form never asked: he averages ~20k
// steps a day. That is the single biggest input here and it is why the calorie
// number looks high for a 158 lb man.
//
// Guided = the 1:1 program without the weekly call. Same dashboard, same
// program, same food, same logging. So the arc below has no call in it.
//
// THREE THINGS THE PITCH DECK GOT WRONG, corrected here from the intake:
//   - he is NOT untrained. "experienced", lifted on and off, currently 3x/week.
//   - he is 158 lb, not 161.
//   - the deck turns on pre-diabetes. His intake says no medication and no
//     medical restriction and never mentions it. NOTHING in this file asserts a
//     diagnosis he did not disclose. It costs nothing: heavy lifting, high
//     protein and carbs around training is the same plan either way.
//
// ASSUMPTION, flagged: full commercial gym. He did not get asked (the equipment
// question went live after he submitted). If he is home-only, every barbell
// movement below has a machine substitution already written in its cue.

export const monty = {
  token: 'monty-145ec2fe',           // the URL he gets; not guessable, not his name
  name: 'Monty',
  fullName: 'Monty Kim',
  email: 'mkimpersonalmail007@gmail.com',
  startedOn: '2026-09-18',

  title: 'MONTY — THE 8 WEEK BUILD',
  subtitle: 'eat on a schedule. lift heavy. get explosive again.',

  stats: { age: 19, height: "5'8\"", weight: '158 lb', location: 'tracy, ca' },

  objective: {
    primary: 'build muscle',
    secondary: 'lose body fat and get explosive again',
    // His words, from the intake. Kept verbatim.
    why: 'used to play football in high school and could move my body fairly well, then after '
       + 'graduating and stopping sports i let myself go. also from a religious aspect, to honor my temple.',
    priorities: ['back', 'shoulders', 'chest', 'stomach / waist', 'arms', 'legs'],
  },

  week1: {
    label: 'week one',
    mission: 'eat before you leave the house.',
    note: 'your first meal is at 2pm and your last is at 8. that is a five hour window to feed a '
        + 'body walking twenty thousand steps a day and training four times a week — and you rated '
        + 'your energy a 4 out of 10. those two facts are the same fact. we are not fixing your '
        + 'training this week. we are fixing when you eat.',
    targets: [
      'eat before 7:30am on work days — this is the whole week',
      'four sessions: tuesday, thursday, friday, saturday',
      'hit 170g protein every day',
      'log every set. weight and reps, no exceptions',
      'keep the steps. do not add more',
      'message me each night — two lines is enough',
    ],
  },

  // No call in here on purpose — guided is the 1:1 minus the call, and writing
  // one in would promise something he did not buy.
  arc: {
    label: '8 weeks · no calls · everything else',
    note: 'you said you fall off when you do not see progress fast enough. so here is what moves and '
        + 'when, in order. weeks one and two will not show in the mirror — they show in the log, and '
        + 'that is what you watch until the mirror catches up.',
    phases: [
      { weeks: '1–2', name: 'the window',
        goal: 'move your first meal to the morning and get four sessions logged every week.',
        marker: 'energy off the floor. every set on the board.' },
      { weeks: '3–5', name: 'load',
        goal: 'add weight to the main lifts on double progression.',
        marker: 'you are beating week one on squat, press, row and hinge.' },
      { weeks: '6–7', name: 'push',
        goal: 'the hardest two weeks. peak volume, jumps get heavier.',
        marker: 'visible change in the shoulders and back. clothes fit differently.' },
      { weeks: '8', name: 'consolidate',
        goal: 'pull back, let it catch up, and write the next block off your own numbers.',
        marker: 'you can read your own log and know what to add. that was the point.' },
    ],
  },

  // "i don't see progress fast enough" is what he said ends it. This is the
  // thing he reads on the day he decides it is not working.
  reminder: {
    label: 'when it feels like nothing is happening',
    text: 'you have been dieting five months and you are down twelve pounds with your energy at a 4. '
        + 'so of course it feels slow — you have been running on a five hour eating window and twenty '
        + 'thousand steps. the first thing that changes is not your body, it is how you feel at 3pm. '
        + 'then the numbers in your log. the mirror is third, and it is always third. check the log.',
  },

  training: {
    structure: 'upper / lower · 4 days · evenings',
    rule: '2 working sets per movement. warm up first. last set should be hard — 1–2 reps left, '
        + 'not failure with sloppy form. jumps come first on lower days, when you are fresh.',
    days: [
      {
        day: 'tuesday', label: 'upper a', focus: 'chest emphasis',
        exercises: [
          { name: 'incline barbell press', sets: 2, reps: '5–7', cue: 'no machine? incline dumbbell press, same range.' },
          { name: 'flat dumbbell press', sets: 2, reps: '6–10', cue: 'control the way down. stretch at the bottom.' },
          { name: 'chest-supported row', sets: 2, reps: '6–10', cue: 'chest stays on the pad. pull with the back, not the arms.' },
          { name: 'lat pulldown', sets: 2, reps: '8–10', cue: 'elbows down and in. no leaning back for momentum.' },
          { name: 'lateral raise', sets: 2, reps: '10–15', cue: 'light. this is the one you go slow on.' },
          { name: 'cable triceps pressdown', sets: 2, reps: '8–12', cue: '' },
        ],
      },
      {
        day: 'thursday', label: 'lower a', focus: 'quads + jumps',
        exercises: [
          { name: 'box jump', sets: 3, reps: '3', cue: 'step down, never jump down. quality over height — this is the athletic work.' },
          { name: 'back squat', sets: 2, reps: '5–7', cue: 'no rack? leg press or hack squat, 8–10.' },
          { name: 'leg press', sets: 2, reps: '8–10', cue: 'full range you can control. knees track over toes.' },
          { name: 'leg extension', sets: 2, reps: '8–12', cue: 'pause a beat at the top.' },
          { name: 'seated leg curl', sets: 2, reps: '8–12', cue: '' },
          { name: 'calf raise', sets: 2, reps: '8–12', cue: 'full stretch at the bottom.' },
        ],
        note: 'thursday is free all day for you. this is the session that should never get moved.',
      },
      {
        day: 'friday', label: 'upper b', focus: 'back + shoulders',
        exercises: [
          { name: 'weighted pull-up or lat pulldown', sets: 2, reps: '6–8', cue: 'heaviest pull of the week. earn it.' },
          { name: 'barbell row', sets: 2, reps: '6–8', cue: 'no barbell? chest-supported row, same range.' },
          { name: 'overhead press', sets: 2, reps: '5–7', cue: 'ribs down. do not lean back to finish the rep.' },
          { name: 'rear delt machine or cable', sets: 2, reps: '12–15', cue: '' },
          { name: 'lateral raise', sets: 2, reps: '10–15', cue: '' },
          { name: 'barbell or cable curl', sets: 2, reps: '6–10', cue: '' },
        ],
      },
      {
        day: 'saturday', label: 'lower b', focus: 'posterior chain',
        exercises: [
          { name: 'broad jump', sets: 3, reps: '3', cue: 'stick the landing. reset between every rep.' },
          { name: 'romanian deadlift', sets: 2, reps: '6–8', cue: 'hinge, do not squat it. stop when your hamstrings stop, not when the bar hits the floor.' },
          { name: 'hip thrust', sets: 2, reps: '8–10', cue: 'chin tucked. squeeze at the top.' },
          { name: 'lying leg curl', sets: 2, reps: '8–12', cue: '' },
          { name: 'walking lunge', sets: 2, reps: '10–12 each leg', cue: '' },
          { name: 'cable crunch', sets: 2, reps: '10–15', cue: '' },
        ],
      },
    ],
    progression: {
      rule: 'double progression.',
      explain: 'stay at the same weight until you hit the TOP of the rep range on both working sets. '
             + 'then add the smallest jump available and start again at the bottom.',
      example: '185 × 6 and 185 × 5 → keep 185.  185 × 7 and 185 × 7 → go to 195.',
    },
    sleep: {
      headline: '6:45 up, 10:40 down. that is already eight hours.',
      note: 'you rated sleep a 6, not a 3 — the hours are there, so this is not the problem to solve '
          + 'first. fix the eating window and see where the 6 goes before we touch anything else.',
    },
    cardio: {
      headline: 'twenty thousand steps. do not add a single one.',
      note: 'you are already doing more daily movement than almost anyone i work with, and it is why '
          + 'your body fat is coming down while you barely eat. that lever is pulled all the way. '
          + 'adding cardio on top of this would just be more food you have to eat back. if anything '
          + 'gets cut later, it is the steps — not the training.',
    },
  },

  // He said "you decide for me" and "i don't know what to eat", with no
  // restrictions and no dislikes. So this is prescriptive on purpose.
  nutrition: {
    headline: 'eat earlier. eat more. that is the plan.',
    note: 'twenty thousand steps a day plus four sessions a week is a lot of output for a five hour '
        + 'eating window. you are not under-eating because you lack discipline — you are under-eating '
        + 'because you start at 2pm and run out of day.',
    protein: { target: 170, min: 160, max: 185, unit: 'g' },
    proteinNote: 'anywhere in 160–185 is a win. this is the one number that decides whether what you '
               + 'gain is muscle.',
    calories: {
      target: 3000,
      range: 'the floor is 2,850. under that is a deficit day, not a build day.',
      note: 'this looks high for 158 lb and it is not. twenty thousand steps is six to eight hundred '
          + 'calories on its own before you train. eat it across four feedings and it is much less '
          + 'food than it sounds like.',
    },
    workDays: {
      label: 'sunday – wednesday · work 7:30am–6pm',
      note: 'this is where the whole thing is won or lost. you are out of the house eleven hours — '
          + 'if food is not packed the night before, it does not happen.',
      meals: [
        { slot: 'meal 1 — before 7:30am', protein: '40–50 g',
          options: ['4 whole eggs', 'greek yogurt or cottage cheese', 'potatoes or rice', 'fruit', 'whole milk'],
          note: 'this is the meal that has never happened. it is also the entire assignment for week one.' },
        { slot: 'work meal — portable', protein: '40 g',
          options: ['pre-cooked ground beef', 'canned fish', 'boiled eggs', 'aged cheese', 'rice you cooked last night', 'fruit'],
          note: 'packed the night before or it does not exist.' },
        { slot: 'post-work — around training', protein: '40–50 g',
          options: ['beef or chicken', 'white rice or potatoes', 'fruit'],
          note: 'carbs go here on training days. this is when your muscle actually takes them up.' },
        { slot: 'before bed', protein: '40 g',
          options: ['greek yogurt', 'cottage cheese', 'whole milk', 'honey', 'fruit'] },
      ],
    },
    offDays: {
      label: 'thursday – saturday · open',
      note: 'you are home and you can cook. these are also three of your four training days, so this '
          + 'is where the most food goes.',
      meals: [
        { slot: 'breakfast — within an hour of waking', protein: '45 g',
          options: ['eggs', 'ground beef or steak', 'potatoes', 'fruit', 'whole milk'] },
        { slot: 'lunch', protein: '45 g',
          options: ['red meat', 'fish', 'rice or potatoes', 'aged cheese', 'fruit'] },
        { slot: 'pre-training', protein: 'light',
          options: ['fruit', 'orange juice', 'honey', 'water and salt'] },
        { slot: 'post-training dinner', protein: '50 g+',
          options: ['beef or steak', 'white rice or potatoes', 'greek yogurt', 'fruit', 'honey'] },
      ],
    },
    preWorkout: 'fruit or juice and water, 30–45 minutes out. keep it simple.',
    rhythm: '4 real feedings. not six. you do not have time for six and you do not need them.',
  },

  grocery: [
    { group: 'protein', items: ['eggs', 'ground beef', 'steak', 'chicken thighs', 'greek yogurt',
                                'cottage cheese', 'whole milk', 'aged cheese', 'canned fish', 'whey protein'] },
    { group: 'carbs + fruit', items: ['white rice', 'potatoes', 'sweet potatoes', 'bananas', 'oranges',
                                      'berries', 'mango', 'orange juice', 'honey'] },
    { group: 'the work bag', items: ['pre-cooked ground beef', 'boiled eggs', 'yogurt cups', 'cheese portions',
                                     'canned fish', 'fruit you can carry', 'rice in a container'],
      note: 'the point of this shelf is deleting the sentence "i did not have time to eat."' },
    { group: 'cook with', items: ['butter', 'ghee', 'tallow', 'olive oil'],
      note: 'no seed oils. canola, sunflower, vegetable, soybean — none of it.' },
  ],

  daily: [
    'eat before you leave the house',
    'train if it is a training day',
    'hit 170g protein and 3,000 calories',
    'eat 4 real feedings',
    'log every set — weight and reps',
    'message me at night',
  ],

  // His own words for what he needs to hold. He asked to be called out
  // immediately, so this is stated as a standard rather than a suggestion.
  standard: {
    label: 'the one you set',
    quote: 'finding a way to execute rather than find excuses.',
    note: 'you also told me social media is what pulls you off. so the standard is not "try harder" — '
        + 'it is that the food is packed the night before and the session is in your calendar. you do '
        + 'not need more discipline. you need fewer decisions at 7am.',
  },

  followUp: 'your first meal is at 2pm and your energy is a 4. move the first meal to before 7:30 and '
          + 'tell me what happens to that number by friday. that is the only thing i want from week one.',
}

export default monty
