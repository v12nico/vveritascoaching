'use client';
import { useState } from 'react';

const GREEN  = '#4a8c6a';
const AMBER  = '#8c7a3a';
const DIM    = '#5A5A5A';
const GHOST  = '#3A3A3A';
const BORDER = '#141414';

// ── DATA ──────────────────────────────────────────────────────────────────────
const client = {
  name: 'John',
  goal: 'build the body, sharpen the mind, and run the business — all at the same time.',
  tier: 'remote',
  momentum: 72,
};

const pillars = [
  { name: 'fitness',     score: 78 },
  { name: 'nutrition',   score: 64 },
  { name: 'business',    score: 61 },
  { name: 'mindset',     score: 74 },
  { name: 'consistency', score: 55 },
];

const todayTasks = [
  { id: 't1', text: 'complete workout a — upper body push',    pillar: 'fitness',     done: true  },
  { id: 't2', text: 'hit 185g protein target',                 pillar: 'nutrition',   done: true  },
  { id: 't3', text: 'complete 2-hour deep work block',         pillar: 'business',    done: false },
  { id: 't4', text: 'review and log daily revenue metrics',    pillar: 'business',    done: false },
  { id: 't5', text: '8hrs sleep — in bed by 10:30pm',         pillar: 'recovery',    done: false },
  { id: 't6', text: 'complete evening check-in',               pillar: 'consistency', done: false },
];

const todayFocus = `your body and your business run on the same fuel — energy, discipline, and execution. this week: do not let a hard business day become an excuse to skip the training. and do not let a missed workout spiral into a lost work day. one standard. both areas.`;

const program = {
  name: `john's personalized program`,
  split: '3 days / week — full body',
  note: 'minimal effective volume. high-quality working sets. controlled execution. progressive overload is the only variable that matters long term.',
  days: [
    {
      label: 'workout a',
      exercises: [
        { name: 'barbell squat',      sets: 2, reps: '4–6', note: 'controlled descent, full depth, drive through heels' },
        { name: 'flat barbell press', sets: 2, reps: '4–6', note: 'scapulae retracted, elbows at 75°, pause at chest' },
        { name: 'bent-over row',      sets: 2, reps: '5–7', note: 'hinge at hip, pull to lower sternum, control the negative' },
        { name: 'overhead press',     sets: 2, reps: '5–7', note: 'brace core, press vertical, lockout at top' },
        { name: 'romanian deadlift',  sets: 2, reps: '6–8', note: 'hinge not squat, feel the hamstring stretch, control down' },
      ],
    },
    {
      label: 'workout b',
      exercises: [
        { name: 'incline dumbbell press', sets: 2, reps: '5–7', note: 'upper chest emphasis, elbows at 60°, full range' },
        { name: 'lat pulldown',           sets: 2, reps: '6–8', note: 'pull to upper chest, elbows drive down, squeeze lats' },
        { name: 'goblet squat',           sets: 2, reps: '8–10', note: 'upright torso, elbows inside knees, drive up' },
        { name: 'cable row',              sets: 2, reps: '6–8', note: 'neutral grip, chest tall, squeeze shoulder blades' },
        { name: 'lateral raise',          sets: 2, reps: '10–12', note: 'slight forward lean, lead with elbows, controlled drop' },
      ],
    },
  ],
};

const nutritionData = {
  proteinTarget: '185g',
  checklist: [
    { id: 'n1', text: 'protein at every meal',              done: false },
    { id: 'n2', text: 'whole-food meals — minimize processed', done: false },
    { id: 'n3', text: 'hydration — minimum 1 gallon',       done: false },
    { id: 'n4', text: 'quality carb source included',       done: false },
    { id: 'n5', text: 'final meal before 9pm',              done: false },
  ],
  grocery: [
    { category: 'protein',  name: 'grass-fed ground beef (80/20)', qty: '2 lbs' },
    { category: 'protein',  name: 'pasture-raised eggs',           qty: '2 dozen' },
    { category: 'protein',  name: 'wild-caught salmon',            qty: '1 lb' },
    { category: 'protein',  name: 'greek yogurt (full fat)',       qty: '32 oz' },
    { category: 'produce',  name: 'bananas',                       qty: '1 bunch' },
    { category: 'produce',  name: 'blueberries',                   qty: '1 pint' },
    { category: 'produce',  name: 'sweet potatoes',                qty: '3 lbs' },
    { category: 'produce',  name: 'avocados',                      qty: '4' },
    { category: 'fat',      name: 'grass-fed butter',              qty: '1 lb' },
    { category: 'fat',      name: 'coconut oil',                   qty: '16 oz' },
    { category: 'staple',   name: 'white rice',                    qty: '5 lbs' },
    { category: 'staple',   name: 'raw honey',                     qty: '1 jar' },
  ],
  mealStructure: [
    { meal: 'morning',   content: 'eggs + ground beef or salmon / fruit or sweet potato / water' },
    { meal: 'midday',    content: 'ground beef or chicken / rice or potatoes / avocado' },
    { meal: 'pre-training', content: 'greek yogurt + honey / banana / optional rice cake' },
    { meal: 'evening',   content: 'protein source / vegetables / healthy fat source' },
  ],
};

const mindsetData = {
  weeklyStandard: 'the version of you running a business and building the body at the same time does not skip things because the day was hard. he executes because the standard is the standard.',
  currentObstacle: 'splitting focus between business execution and training consistency — trying to be on point in both without a system that connects them.',
  focus: 'the deep work block and the workout are not competing priorities. one fuels the other. execute both this week.',
  reflection: 'what did you do today — in the gym or in the business — that required you to be more disciplined than you felt like being?',
  streak: 3,
  coachMessage: `john — you are not someone who needs to be sold on why this matters. you already know.\n\nthis week i need you to treat the deep work block and the training session with equal weight. missing one is missing both — they run on the same discipline.\n\nhit the 185g. complete the workout. close your revenue task list before 6pm. check in honest.\n\nwe build from what you actually do, not what you intended.`,
};

const checkInQuestions = {
  daily: [
    { id: 'd1', type: 'yesno',  text: 'did you complete the assigned training?' },
    { id: 'd2', type: 'yesno',  text: 'did you complete your deep work block?' },
    { id: 'd3', type: 'yesno',  text: 'did you hit the nutrition structure?' },
    { id: 'd4', type: 'slider', text: 'overall energy and focus today (1–10)' },
    { id: 'd5', type: 'text',   text: 'what did you execute on that mattered?' },
    { id: 'd6', type: 'text',   text: 'what needs to be sharper tomorrow?' },
  ],
  weekly: [
    { id: 'w1', type: 'text', text: 'what improved this week in training?' },
    { id: 'w2', type: 'text', text: 'what improved this week in business execution?' },
    { id: 'w3', type: 'text', text: 'where did discipline break down and why?' },
    { id: 'w4', type: 'text', text: 'how were energy, recovery, and focus across the week?' },
    { id: 'w5', type: 'text', text: 'what one adjustment would make next week more productive?' },
  ],
};

const coachMessage = `john — you are not someone who needs to be sold on why this matters. you already know.\n\nthis week i need you to treat the deep work block and the training session with equal weight. missing one is missing both — they run on the same discipline.\n\nhit the 185g. complete the workout. close your revenue task list before 6pm. check in honest.\n\nwe build from what you actually do, not what you intended.`;

// ── SHARED STYLES ─────────────────────────────────────────────────────────────
const label = { fontFamily: 'ui-monospace, monospace', fontSize: '0.46rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: GHOST, display: 'block', marginBottom: '0.8rem' };
const sectionWrap = { marginBottom: '2.5rem' };

// ── TAB COMPONENTS ────────────────────────────────────────────────────────────
function TodayTab() {
  const [tasks, setTasks] = useState(todayTasks);
  const done = tasks.filter(t => t.done).length;
  const pct = Math.round((done / tasks.length) * 100);
  const color = pct >= 80 ? GREEN : pct >= 50 ? AMBER : '#5C1A1A';

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
        <span style={label}>today's mission</span>
        <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: 'clamp(0.7rem, 1.1vw, 0.85rem)', color, fontWeight: 300 }}>{pct}% complete</span>
      </div>
      <div style={{ height: '2px', background: BORDER, marginBottom: '1.5rem', borderRadius: '1px' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: color, transition: 'width 0.3s', borderRadius: '1px' }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.4rem', marginBottom: '2rem' }}>
        {pillars.map(p => {
          const pc = p.score >= 75 ? GREEN : p.score >= 55 ? AMBER : '#5C1A1A';
          return (
            <div key={p.name} style={{ display: 'flex', flexDirection: 'column', border: `1px solid ${BORDER}`, padding: '0.7rem 0.5rem 0.5rem', gap: '0.5rem', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: `${p.score}%`, background: pc, opacity: 0.08 }} />
              <span style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)', fontWeight: 200, color: pc, letterSpacing: '-0.03em', lineHeight: 1, textAlign: 'center' }}>{p.score}</span>
              <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)', color: GHOST, letterSpacing: '0.08em', textAlign: 'center', textTransform: 'uppercase' }}>{p.name}</span>
              <div style={{ height: '2px', background: BORDER, borderRadius: '1px' }}>
                <div style={{ height: '100%', width: `${p.score}%`, background: pc, borderRadius: '1px' }} />
              </div>
            </div>
          );
        })}
      </div>

      {tasks.map(task => (
        <button key={task.id} onClick={() => setTasks(prev => prev.map(t => t.id === task.id ? { ...t, done: !t.done } : t))}
          style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', width: '100%', background: 'none', border: 'none', padding: '0.85rem 0', borderBottom: `1px solid ${BORDER}`, cursor: 'pointer', textAlign: 'left' }}>
          <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.65rem', color: task.done ? GREEN : GHOST, flexShrink: 0 }}>{task.done ? '✓' : '○'}</span>
          <span style={{ fontSize: 'clamp(0.78rem, 1.2vw, 0.92rem)', color: task.done ? DIM : '#EDEDE8', fontFamily: 'Inter, sans-serif', fontWeight: 300, textDecoration: task.done ? 'line-through' : 'none' }}>{task.text}</span>
          <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.4rem', color: GHOST, marginLeft: 'auto', flexShrink: 0 }}>{task.pillar}</span>
        </button>
      ))}
      <div style={{ marginTop: '2rem', padding: '1.2rem', border: `1px solid ${BORDER}` }}>
        <span style={{ ...label, marginBottom: '0.6rem' }}>today's focus</span>
        <p style={{ fontSize: 'clamp(0.72rem, 1.05vw, 0.85rem)', color: DIM, lineHeight: 1.75, margin: 0 }}>{todayFocus}</p>
      </div>
    </div>
  );
}

function FitnessTab() {
  const [activeDay, setActiveDay] = useState(0);
  const day = program.days[activeDay];
  return (
    <div>
      <span style={label}>{program.split}</span>
      <p style={{ fontSize: 'clamp(0.68rem, 1vw, 0.8rem)', color: GHOST, lineHeight: 1.7, marginBottom: '1.5rem', fontStyle: 'italic', borderLeft: `1px solid ${BORDER}`, paddingLeft: '0.8rem' }}>{program.note}</p>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
        {program.days.map((d, i) => (
          <button key={i} onClick={() => setActiveDay(i)}
            style={{ flex: 1, padding: '0.6rem', background: i === activeDay ? '#EDEDE8' : 'transparent', border: `1px solid ${i === activeDay ? '#EDEDE8' : BORDER}`, color: i === activeDay ? '#000' : GHOST, fontFamily: 'ui-monospace, monospace', fontSize: '0.44rem', letterSpacing: '0.15em', cursor: 'pointer', transition: 'all 0.15s' }}>
            {d.label}
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
        {day.exercises.map((ex, i) => (
          <div key={i} style={{ padding: '1rem 0', borderBottom: `1px solid ${BORDER}` }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '0.3rem' }}>
              <span style={{ fontSize: 'clamp(0.82rem, 1.2vw, 0.95rem)', color: '#EDEDE8', fontWeight: 300, flex: 1 }}>{ex.name}</span>
              <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.44rem', color: GREEN }}>2 × {ex.reps}</span>
            </div>
            <p style={{ fontSize: 'clamp(0.62rem, 0.9vw, 0.74rem)', color: GHOST, lineHeight: 1.5, margin: 0, fontStyle: 'italic' }}>{ex.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function NutritionTab() {
  const [checklist, setChecklist] = useState(nutritionData.checklist);
  const done = checklist.filter(c => c.done).length;
  const score = Math.round((done / checklist.length) * 100);
  const color = score >= 80 ? GREEN : score >= 60 ? AMBER : '#5C1A1A';

  return (
    <div>
      <div style={sectionWrap}>
        <span style={label}>daily protein target</span>
        <div style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 200, letterSpacing: '-0.04em', color: '#EDEDE8', lineHeight: 1 }}>{nutritionData.proteinTarget}</div>
      </div>

      <div style={sectionWrap}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
          <span style={label}>food quality today</span>
          <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.5rem', color }}>{score}%</span>
        </div>
        <div style={{ height: '2px', background: BORDER, marginBottom: '1.2rem', borderRadius: '1px' }}>
          <div style={{ height: '100%', width: `${score}%`, background: color, transition: 'width 0.3s', borderRadius: '1px' }} />
        </div>
        {checklist.map(item => (
          <button key={item.id} onClick={() => setChecklist(prev => prev.map(c => c.id === item.id ? { ...c, done: !c.done } : c))}
            style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', width: '100%', background: 'none', border: 'none', padding: '0.75rem 0', borderBottom: `1px solid ${BORDER}`, cursor: 'pointer', textAlign: 'left' }}>
            <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.65rem', color: item.done ? GREEN : GHOST, flexShrink: 0 }}>{item.done ? '✓' : '○'}</span>
            <span style={{ fontSize: 'clamp(0.72rem, 1.05vw, 0.85rem)', color: item.done ? DIM : '#EDEDE8', fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>{item.text}</span>
          </button>
        ))}
      </div>

      <div style={sectionWrap}>
        <span style={label}>meal structure</span>
        {nutritionData.mealStructure.map((m, i) => (
          <div key={i} style={{ padding: '0.8rem 0', borderBottom: `1px solid ${BORDER}`, display: 'grid', gridTemplateColumns: '6rem 1fr', gap: '0.8rem', alignItems: 'start' }}>
            <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.44rem', color: GHOST, letterSpacing: '0.1em', textTransform: 'uppercase', paddingTop: '0.1rem' }}>{m.meal}</span>
            <span style={{ fontSize: 'clamp(0.65rem, 0.95vw, 0.78rem)', color: '#EDEDE8', lineHeight: 1.5 }}>{m.content}</span>
          </div>
        ))}
      </div>

      <div style={sectionWrap}>
        <span style={label}>weekly grocery list</span>
        {['protein', 'produce', 'fat', 'staple'].map(cat => {
          const items = nutritionData.grocery.filter(g => g.category === cat);
          return (
            <div key={cat} style={{ marginBottom: '1.2rem' }}>
              <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.4rem', letterSpacing: '0.2em', color: GHOST, textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>{cat}</span>
              {items.map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0', borderBottom: `1px solid #0a0a0a` }}>
                  <span style={{ fontSize: 'clamp(0.65rem, 0.95vw, 0.78rem)', color: '#EDEDE8' }}>{item.name}</span>
                  <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.42rem', color: GHOST }}>{item.qty}</span>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MindsetTab() {
  const [reflection, setReflection] = useState('');
  return (
    <div>
      <div style={{ ...sectionWrap, padding: '1.2rem', border: `1px solid ${BORDER}` }}>
        <span style={label}>weekly standard</span>
        <p style={{ fontSize: 'clamp(0.82rem, 1.3vw, 1rem)', color: '#EDEDE8', lineHeight: 1.7, fontWeight: 200, margin: 0 }}>{mindsetData.weeklyStandard}</p>
      </div>

      <div style={sectionWrap}>
        <span style={label}>current focus</span>
        <p style={{ fontSize: 'clamp(0.78rem, 1.2vw, 0.92rem)', color: DIM, lineHeight: 1.7, margin: 0 }}>{mindsetData.focus}</p>
      </div>

      <div style={sectionWrap}>
        <span style={label}>current obstacle</span>
        <p style={{ fontSize: 'clamp(0.72rem, 1.05vw, 0.85rem)', color: GHOST, lineHeight: 1.7, margin: 0, fontStyle: 'italic' }}>{mindsetData.currentObstacle}</p>
      </div>

      <div style={sectionWrap}>
        <span style={label}>daily reflection</span>
        <p style={{ fontSize: 'clamp(0.72rem, 1.05vw, 0.85rem)', color: DIM, lineHeight: 1.7, marginBottom: '0.8rem', fontStyle: 'italic' }}>{mindsetData.reflection}</p>
        <textarea
          value={reflection}
          onChange={e => setReflection(e.target.value)}
          placeholder="write your answer here…"
          rows={3}
          style={{ width: '100%', background: 'transparent', border: `1px solid ${BORDER}`, color: '#EDEDE8', fontFamily: 'Inter, sans-serif', fontSize: 'clamp(0.72rem, 1.05vw, 0.85rem)', fontWeight: 300, padding: '0.8rem', lineHeight: 1.6, resize: 'vertical', outline: 'none', boxSizing: 'border-box' }}
        />
      </div>

      <div style={sectionWrap}>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <div>
            <span style={label}>commitment streak</span>
            <span style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 200, color: '#EDEDE8', letterSpacing: '-0.04em' }}>{mindsetData.streak}</span>
            <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.44rem', color: GHOST, marginLeft: '0.4rem' }}>days</span>
          </div>
        </div>
      </div>

      <div style={{ padding: '1.2rem', border: `1px solid ${BORDER}` }}>
        <span style={label}>coach message</span>
        <p style={{ fontSize: 'clamp(0.72rem, 1.05vw, 0.85rem)', color: DIM, lineHeight: 1.8, margin: 0, whiteSpace: 'pre-line' }}>{mindsetData.coachMessage}</p>
      </div>
    </div>
  );
}

function ProgressTab() {
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2.5rem' }}>
        {[
          { label: 'training completion', val: '78%',   sub: 'week 3 — above target' },
          { label: 'nutrition adherence', val: '64%',   sub: 'protein consistency improving' },
          { label: 'business execution',  val: '61%',   sub: 'deep work consistency building' },
          { label: 'consistency streak',  val: '3',     sub: 'days — keep going' },
          { label: 'strength trend',      val: '↑',     sub: 'progressive overload confirmed' },
          { label: 'mindset score',       val: '74',    sub: 'focus and clarity trending up' },
        ].map((stat, i) => (
          <div key={i} style={{ padding: '1.1rem', border: `1px solid ${BORDER}` }}>
            <span style={{ ...label, marginBottom: '0.5rem' }}>{stat.label}</span>
            <div style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 200, color: '#EDEDE8', letterSpacing: '-0.03em', lineHeight: 1 }}>{stat.val}</div>
            <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 'clamp(0.52rem, 0.8vw, 0.62rem)', color: GHOST, marginTop: '0.3rem' }}>{stat.sub}</div>
          </div>
        ))}
      </div>
      <div style={sectionWrap}>
        <span style={label}>progress photos</span>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.8rem' }}>
          {['week 1', 'week 4', 'week 8'].map((wk, i) => (
            <div key={i} style={{ aspectRatio: '3/4', border: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '0.4rem' }}>
              <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.42rem', color: GHOST }}>{wk}</span>
              <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.38rem', color: BORDER }}>pending</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: '1rem', border: `1px solid ${BORDER}` }}>
        <span style={{ ...label, marginBottom: '0.4rem' }}>coach note</span>
        <p style={{ fontSize: 'clamp(0.68rem, 1vw, 0.8rem)', color: GHOST, lineHeight: 1.7, margin: 0, fontStyle: 'italic' }}>
          your training and your business execution are both trending in the right direction. the data says the consistency is building — not perfect, but real. that is what compounds. keep the standard.
        </p>
      </div>
    </div>
  );
}

function CheckInTab() {
  const [mode, setMode] = useState('daily');
  const [answers, setAnswers] = useState({});
  const [sent, setSent] = useState(false);
  const questions = checkInQuestions[mode];

  function handleChange(id, val) {
    setAnswers(prev => ({ ...prev, [id]: val }));
  }

  if (sent) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '30vh', gap: '1rem' }}>
        <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.52rem', letterSpacing: '0.3em', color: GREEN }}>submitted.</span>
        <p style={{ fontSize: 'clamp(0.72rem, 1.05vw, 0.85rem)', color: DIM, textAlign: 'center', maxWidth: '320px', lineHeight: 1.7 }}>your check-in has been logged. the coach can see your response.</p>
        <button onClick={() => { setSent(false); setAnswers({}); }} style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.44rem', color: GHOST, background: 'none', border: `1px solid ${BORDER}`, padding: '0.6rem 1rem', cursor: 'pointer', letterSpacing: '0.1em' }}>reset</button>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
        {['daily', 'weekly'].map(m => (
          <button key={m} onClick={() => { setMode(m); setAnswers({}); }}
            style={{ flex: 1, padding: '0.55rem', background: mode === m ? '#EDEDE8' : 'transparent', border: `1px solid ${mode === m ? '#EDEDE8' : BORDER}`, color: mode === m ? '#000' : GHOST, fontFamily: 'ui-monospace, monospace', fontSize: '0.44rem', letterSpacing: '0.15em', cursor: 'pointer', transition: 'all 0.15s' }}>
            {m}
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '2rem' }}>
        {questions.map(q => (
          <div key={q.id} style={{ borderBottom: `1px solid ${BORDER}`, paddingBottom: '1rem' }}>
            <p style={{ fontSize: 'clamp(0.72rem, 1.05vw, 0.85rem)', color: '#EDEDE8', lineHeight: 1.6, marginBottom: '0.7rem' }}>{q.text}</p>
            {q.type === 'yesno' && (
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {['yes', 'no'].map(opt => (
                  <button key={opt} onClick={() => handleChange(q.id, opt)}
                    style={{ padding: '0.45rem 1rem', background: answers[q.id] === opt ? '#EDEDE8' : 'transparent', border: `1px solid ${answers[q.id] === opt ? '#EDEDE8' : BORDER}`, color: answers[q.id] === opt ? '#000' : GHOST, fontFamily: 'ui-monospace, monospace', fontSize: '0.44rem', letterSpacing: '0.12em', cursor: 'pointer' }}>
                    {opt}
                  </button>
                ))}
              </div>
            )}
            {q.type === 'slider' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <input type="range" min="1" max="10" value={answers[q.id] || 5} onChange={e => handleChange(q.id, e.target.value)}
                  style={{ flex: 1, accentColor: GREEN }} />
                <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.52rem', color: '#EDEDE8', minWidth: '1.5rem' }}>{answers[q.id] || 5}</span>
              </div>
            )}
            {q.type === 'text' && (
              <textarea value={answers[q.id] || ''} onChange={e => handleChange(q.id, e.target.value)} rows={2}
                placeholder="type here…"
                style={{ width: '100%', background: 'transparent', border: `1px solid ${BORDER}`, color: '#EDEDE8', fontFamily: 'Inter, sans-serif', fontSize: 'clamp(0.7rem, 1.05vw, 0.82rem)', fontWeight: 300, padding: '0.6rem', lineHeight: 1.6, resize: 'vertical', outline: 'none', boxSizing: 'border-box' }} />
            )}
          </div>
        ))}
      </div>
      <button onClick={() => setSent(true)}
        style={{ width: '100%', padding: '1rem', background: 'none', border: `1px solid #EDEDE8`, color: '#EDEDE8', fontFamily: 'Inter, sans-serif', fontWeight: 300, fontSize: 'clamp(0.8rem, 1.2vw, 0.92rem)', cursor: 'pointer', letterSpacing: '0.01em' }}>
        submit check-in →
      </button>
    </div>
  );
}

function MessagesTab() {
  const [msg, setMsg] = useState('');
  const [sent, setSent] = useState(false);

  function send() {
    if (!msg.trim()) return;
    setSent(true);
    setMsg('');
    setTimeout(() => setSent(false), 3000);
  }

  return (
    <div>
      <div style={{ padding: '1.2rem', border: `1px solid ${BORDER}`, marginBottom: '2rem' }}>
        <span style={label}>from the coach</span>
        <p style={{ fontSize: 'clamp(0.78rem, 1.2vw, 0.92rem)', color: '#EDEDE8', lineHeight: 1.8, whiteSpace: 'pre-line', margin: 0 }}>{coachMessage}</p>
        <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.4rem', color: GHOST, marginTop: '0.8rem', display: 'block' }}>vveritas* — day 1</span>
      </div>
      <div style={{ marginBottom: '0.6rem' }}>
        <span style={label}>send a message</span>
      </div>
      <textarea value={msg} onChange={e => setMsg(e.target.value)} rows={4} placeholder="write your message to the coach…"
        style={{ width: '100%', background: 'transparent', border: `1px solid ${BORDER}`, color: '#EDEDE8', fontFamily: 'Inter, sans-serif', fontSize: 'clamp(0.72rem, 1.05vw, 0.85rem)', fontWeight: 300, padding: '0.8rem', lineHeight: 1.6, resize: 'vertical', outline: 'none', boxSizing: 'border-box', marginBottom: '0.6rem' }} />
      <button onClick={send}
        style={{ padding: '0.8rem 1.5rem', background: 'none', border: `1px solid ${sent ? GREEN : BORDER}`, color: sent ? GREEN : '#EDEDE8', fontFamily: 'ui-monospace, monospace', fontSize: '0.48rem', letterSpacing: '0.12em', cursor: 'pointer', transition: 'all 0.2s' }}>
        {sent ? 'sent.' : 'send →'}
      </button>
    </div>
  );
}

// ── PAGE ──────────────────────────────────────────────────────────────────────
const TABS = ['today', 'fitness', 'nutrition', 'mindset', 'progress', 'check-in', 'messages'];

export default function JaylinDemoPortal() {
  const [tab, setTab] = useState('today');

  return (
    <div style={{ background: '#000', minHeight: '100dvh', fontFamily: 'Inter, -apple-system, sans-serif', fontWeight: 300, color: '#EDEDE8', maxWidth: '640px', margin: '0 auto', padding: '0 0 4rem' }}>
      <header style={{ padding: '1.1rem 1.4rem', borderBottom: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, background: '#000', zIndex: 10 }}>
        <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.52rem', letterSpacing: '0.3em', color: GHOST }}>vveritas*</span>
        <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.44rem', letterSpacing: '0.2em', color: GHOST }}>{client.tier}</span>
      </header>

      <div style={{ padding: '2rem 1.4rem 1.5rem' }}>
        <h1 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 200, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '0.5rem' }}>hey {client.name.toLowerCase()}.</h1>
        <p style={{ fontSize: 'clamp(0.68rem, 1vw, 0.8rem)', color: GHOST, lineHeight: 1.6, borderLeft: `1px solid ${BORDER}`, paddingLeft: '0.8rem', maxWidth: '420px' }}>"{client.goal}"</p>
      </div>

      <nav style={{ display: 'flex', overflowX: 'auto', scrollbarWidth: 'none', borderBottom: `1px solid ${BORDER}`, padding: '0 1rem', gap: '0', position: 'sticky', top: '46px', background: '#000', zIndex: 9 }}>
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)}
            style={{ padding: '0.75rem 0.9rem', background: 'none', border: 'none', borderBottom: `2px solid ${t === tab ? '#EDEDE8' : 'transparent'}`, color: t === tab ? '#EDEDE8' : GHOST, fontFamily: 'ui-monospace, monospace', fontSize: '0.44rem', letterSpacing: '0.1em', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'color 0.15s', flexShrink: 0 }}>
            {t}
          </button>
        ))}
      </nav>

      <div style={{ padding: '1.5rem 1.4rem' }}>
        {tab === 'today'    && <TodayTab />}
        {tab === 'fitness'  && <FitnessTab />}
        {tab === 'nutrition' && <NutritionTab />}
        {tab === 'mindset'  && <MindsetTab />}
        {tab === 'progress' && <ProgressTab />}
        {tab === 'check-in' && <CheckInTab />}
        {tab === 'messages' && <MessagesTab />}
      </div>
    </div>
  );
}
