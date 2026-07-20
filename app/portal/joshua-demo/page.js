'use client';
import { useState } from 'react';

const GREEN  = '#4a8c6a';
const AMBER  = '#8c7a3a';
const DIM    = '#5A5A5A';
const GHOST  = '#3A3A3A';
const BORDER = '#141414';

// ── DATA ──────────────────────────────────────────────────────────────────────
const client = {
  name: 'Joshua',
  goal: 'build muscle. lose body fat. stop overthinking.',
};

const pillars = [
  { name: 'training',     score: 62 },
  { name: 'nutrition',    score: 48 },
  { name: 'recovery',     score: 55 },
  { name: 'consistency',  score: 41 },
];

const todayTasks = [
  { id: 't1', text: 'complete workout a — recomposition foundation', pillar: 'training',    done: false },
  { id: 't2', text: 'reach daily protein target',                    pillar: 'nutrition',   done: false },
  { id: 't3', text: 'follow planned meals — no deviation today',     pillar: 'nutrition',   done: false },
  { id: 't4', text: 'recovery — 7–9 hrs sleep tonight',             pillar: 'recovery',    done: false },
  { id: 't5', text: 'submit evening check-in',                       pillar: 'consistency', done: false },
];

const todayFocus = `do not search for a better plan today. follow the one built for you. the biggest mistake right now would be switching routines after one week. stay on the program. log the numbers. give the coach something to work with.`;

const program = {
  name: 'recomposition foundation',
  split: '3 days / week — push · pull · legs',
  phase: 'phase 1 — weeks 1–4',
  note: 'minimal effective volume. two hard working sets where applicable. progressive overload is the only variable that matters long term. exercise selection reflects your proportion goals — not a random template.',
  focusAreas: ['shoulders', 'upper chest', 'back width', 'arms', 'glutes', 'posture'],
  days: [
    {
      label: 'push — upper',
      emphasis: 'upper chest · shoulders · triceps',
      exercises: [
        { name: 'incline barbell press',  sets: 2, reps: '5–7',   note: 'upper chest emphasis, controlled descent, elbows at 60°, pause at chest' },
        { name: 'seated dumbbell press',  sets: 2, reps: '8–10',  note: 'shoulder emphasis, press vertical, controlled top and bottom' },
        { name: 'cable lateral raise',    sets: 2, reps: '10–12', note: 'lead with elbows, slight forward lean, control the drop — do not swing' },
        { name: 'incline dumbbell fly',   sets: 2, reps: '10–12', note: 'stretch at bottom, squeeze at top, elbows slightly bent throughout' },
        { name: 'tricep pushdown',        sets: 2, reps: '10–12', note: 'elbows stay at sides, full extension at bottom, squeeze' },
      ],
    },
    {
      label: 'pull — upper',
      emphasis: 'back width · rear delts · biceps',
      exercises: [
        { name: 'lat pulldown',           sets: 2, reps: '6–8',   note: 'wide grip, pull to upper chest, elbows drive down, squeeze lats at bottom' },
        { name: 'seated cable row',       sets: 2, reps: '8–10',  note: 'neutral grip, chest tall, pull to lower sternum, retract shoulder blades' },
        { name: 'face pull',              sets: 2, reps: '12–15', note: 'rope at eye level, pull to forehead, elbows high — rear delt and posture focus' },
        { name: 'barbell curl',           sets: 2, reps: '8–10',  note: 'full range, do not swing, controlled negative, squeeze at top' },
        { name: 'hammer curl',            sets: 2, reps: '10–12', note: 'neutral grip, elbows stay back, slow controlled movement' },
      ],
    },
    {
      label: 'legs + glutes',
      emphasis: 'quads · glutes · hamstrings',
      exercises: [
        { name: 'barbell squat',          sets: 2, reps: '5–7',   note: 'controlled descent, full depth, drive through heels, stay upright' },
        { name: 'hip thrust',             sets: 2, reps: '10–12', note: 'glute emphasis, full extension at top, controlled descent, no lower-back rounding' },
        { name: 'leg extension',          sets: 2, reps: '12–15', note: 'slow controlled reps, squeeze at top, quad isolation' },
        { name: 'romanian deadlift',      sets: 2, reps: '8–10',  note: 'hinge not squat, feel hamstring stretch, control the descent, keep bar close' },
        { name: 'calf raise',             sets: 2, reps: '15–20', note: 'full range of motion, pause at bottom stretch, squeeze at top' },
      ],
    },
  ],
};

const nutritionData = {
  proteinTarget: '[ personalized after intake ]',
  proteinPlaceholder: true,
  checklist: [
    { id: 'n1', text: 'protein source at every meal',            done: false },
    { id: 'n2', text: 'whole-food meals — minimize processed',  done: false },
    { id: 'n3', text: 'quality carb source included today',     done: false },
    { id: 'n4', text: 'hydration — minimum 1 gallon water',     done: false },
    { id: 'n5', text: 'last meal before 9pm',                   done: false },
  ],
  mealStructure: [
    { meal: 'morning',      content: 'eggs + ground beef or salmon / fruit / water — high protein start' },
    { meal: 'midday',       content: 'ground beef or chicken / rice or potatoes / avocado or olive oil' },
    { meal: 'pre-training', content: 'greek yogurt + honey / banana / optional rice cake — light and fast' },
    { meal: 'evening',      content: 'protein source / vegetables / healthy fat — no heavy carb at night' },
  ],
  grocery: [
    { category: 'protein',  name: 'grass-fed ground beef (80/20)', qty: '2 lbs' },
    { category: 'protein',  name: 'pasture-raised eggs',           qty: '2 dozen' },
    { category: 'protein',  name: 'wild-caught salmon',            qty: '1 lb' },
    { category: 'protein',  name: 'greek yogurt (full fat)',       qty: '32 oz' },
    { category: 'protein',  name: 'chicken thighs or breasts',     qty: '2 lbs' },
    { category: 'produce',  name: 'bananas',                       qty: '1 bunch' },
    { category: 'produce',  name: 'blueberries',                   qty: '1 pint' },
    { category: 'produce',  name: 'sweet potatoes',                qty: '3 lbs' },
    { category: 'produce',  name: 'avocados',                      qty: '4' },
    { category: 'fat',      name: 'grass-fed butter',              qty: '1 lb' },
    { category: 'fat',      name: 'coconut oil',                   qty: '16 oz' },
    { category: 'staple',   name: 'white rice',                    qty: '5 lbs' },
    { category: 'staple',   name: 'raw honey',                     qty: '1 jar' },
  ],
  coachFocus: `this week, do not try to eat perfectly. hit the protein target, follow the planned meals, and give me feedback on hunger and energy. one metric at a time.`,
};

const progressStats = [
  { label: 'training adherence', val: '—',  sub: 'baseline — week 1' },
  { label: 'nutrition adherence', val: '—', sub: 'baseline — week 1' },
  { label: 'consistency score',  val: '—',  sub: 'builds over weeks 1–4' },
  { label: 'strength trend',     val: '—',  sub: 'logged after first session' },
  { label: 'waist measurement',  val: '—',  sub: 'baseline set at onboarding' },
  { label: 'energy trend',       val: '—',  sub: 'tracked via daily check-in' },
];

const checkInQuestions = {
  daily: [
    { id: 'd1', type: 'yesno',  text: 'did you complete today\'s assigned training?' },
    { id: 'd2', type: 'yesno',  text: 'did you reach your protein target?' },
    { id: 'd3', type: 'yesno',  text: 'did you follow the meal structure?' },
    { id: 'd4', type: 'slider', text: 'energy level today (1–10)' },
    { id: 'd5', type: 'yesno',  text: 'did you spend time overthinking or changing the plan today?' },
    { id: 'd6', type: 'text',   text: 'what needs adjustment tomorrow?' },
  ],
  weekly: [
    { id: 'w1', type: 'text', text: 'which lifts improved this week?' },
    { id: 'w2', type: 'text', text: 'how did your body feel across the week?' },
    { id: 'w3', type: 'text', text: 'how was hunger and digestion?' },
    { id: 'w4', type: 'text', text: 'where did you overcomplicate the process?' },
    { id: 'w5', type: 'text', text: 'what made consistency easier this week?' },
    { id: 'w6', type: 'text', text: 'what should the coach adjust next week?' },
  ],
};

const coachMessage = `joshua — the biggest thing i need from you this week is to stop trying to solve the entire transformation at once.\n\nfollow the assigned workouts. hit the nutrition standards. log your numbers. let the data tell us what to adjust.\n\ndo not switch the program. do not add extra workouts. do not look for a better plan.\n\nsimplicity is going to be one of your biggest advantages. trust the system long enough for it to show you something.`;

// ── SHARED STYLES ─────────────────────────────────────────────────────────────
const label = { fontFamily: 'ui-monospace, monospace', fontSize: '0.46rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: GHOST, display: 'block', marginBottom: '0.8rem' };
const sectionWrap = { marginBottom: '2.5rem' };

// ── TAB COMPONENTS ────────────────────────────────────────────────────────────
function TodayTab() {
  const [tasks, setTasks] = useState(todayTasks);
  const done = tasks.filter(t => t.done).length;
  const pct  = Math.round((done / tasks.length) * 100);
  const color = pct >= 80 ? GREEN : pct >= 50 ? AMBER : '#5C1A1A';

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
        <span style={label}>today&apos;s mission</span>
        <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: 'clamp(0.7rem, 1.1vw, 0.85rem)', color, fontWeight: 300 }}>{pct}% complete</span>
      </div>
      <div style={{ height: '2px', background: BORDER, marginBottom: '1.5rem', borderRadius: '1px' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: color, transition: 'width 0.3s', borderRadius: '1px' }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.4rem', marginBottom: '2rem' }}>
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
        <button key={task.id}
          onClick={() => setTasks(prev => prev.map(t => t.id === task.id ? { ...t, done: !t.done } : t))}
          style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', width: '100%', background: 'none', border: 'none', padding: '0.85rem 0', borderBottom: `1px solid ${BORDER}`, cursor: 'pointer', textAlign: 'left' }}>
          <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.65rem', color: task.done ? GREEN : GHOST, flexShrink: 0 }}>{task.done ? '✓' : '○'}</span>
          <span style={{ fontSize: 'clamp(0.78rem, 1.2vw, 0.92rem)', color: task.done ? DIM : '#EDEDE8', fontFamily: 'Inter, sans-serif', fontWeight: 300, textDecoration: task.done ? 'line-through' : 'none' }}>{task.text}</span>
          <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.4rem', color: GHOST, marginLeft: 'auto', flexShrink: 0 }}>{task.pillar}</span>
        </button>
      ))}

      <div style={{ marginTop: '2rem', padding: '1.2rem', border: `1px solid ${BORDER}` }}>
        <span style={{ ...label, marginBottom: '0.6rem' }}>today&apos;s focus</span>
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
      <div style={sectionWrap}>
        <span style={label}>{program.phase}</span>
        <h2 style={{ fontSize: 'clamp(1rem, 1.8vw, 1.4rem)', fontWeight: 200, letterSpacing: '-0.02em', marginBottom: '0.4rem', color: '#EDEDE8' }}>{program.name}</h2>
        <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.44rem', letterSpacing: '0.15em', color: GHOST, display: 'block', marginBottom: '1rem' }}>{program.split}</span>
        <p style={{ fontSize: 'clamp(0.68rem, 1vw, 0.8rem)', color: GHOST, lineHeight: 1.7, fontStyle: 'italic', borderLeft: `1px solid ${BORDER}`, paddingLeft: '0.8rem' }}>{program.note}</p>
      </div>

      <div style={{ ...sectionWrap }}>
        <span style={label}>proportion focus</span>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
          {program.focusAreas.map((a, i) => (
            <span key={i} style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.42rem', letterSpacing: '0.1em', color: GHOST, border: `1px solid ${BORDER}`, padding: '0.3rem 0.6rem' }}>{a}</span>
          ))}
        </div>
        <p style={{ fontSize: 'clamp(0.62rem, 0.9vw, 0.74rem)', color: GHOST, lineHeight: 1.6, marginTop: '0.8rem', fontStyle: 'italic' }}>
          exercise selection reflects these areas. your program is not generic.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
        {program.days.map((d, i) => (
          <button key={i} onClick={() => setActiveDay(i)}
            style={{ flex: 1, padding: '0.6rem', background: i === activeDay ? '#EDEDE8' : 'transparent', border: `1px solid ${i === activeDay ? '#EDEDE8' : BORDER}`, color: i === activeDay ? '#000' : GHOST, fontFamily: 'ui-monospace, monospace', fontSize: '0.44rem', letterSpacing: '0.1em', cursor: 'pointer', transition: 'all 0.15s' }}>
            {d.label}
          </button>
        ))}
      </div>

      <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.42rem', letterSpacing: '0.15em', color: GREEN, textTransform: 'uppercase', marginBottom: '1rem' }}>{day.emphasis}</div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
        {day.exercises.map((ex, i) => (
          <div key={i} style={{ padding: '1rem 0', borderBottom: `1px solid ${BORDER}` }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '0.3rem' }}>
              <span style={{ fontSize: 'clamp(0.82rem, 1.2vw, 0.95rem)', color: '#EDEDE8', fontWeight: 300, flex: 1 }}>{ex.name}</span>
              <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.44rem', color: GREEN }}>{ex.sets} × {ex.reps}</span>
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
  const done  = checklist.filter(c => c.done).length;
  const score = Math.round((done / checklist.length) * 100);
  const color = score >= 80 ? GREEN : score >= 60 ? AMBER : '#5C1A1A';

  return (
    <div>
      <div style={sectionWrap}>
        <span style={label}>daily protein target</span>
        <div style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 200, letterSpacing: '-0.04em', color: nutritionData.proteinPlaceholder ? GHOST : '#EDEDE8', lineHeight: 1 }}>
          {nutritionData.proteinTarget}
        </div>
        {nutritionData.proteinPlaceholder && (
          <p style={{ fontSize: 'clamp(0.6rem, 0.85vw, 0.72rem)', color: GHOST, lineHeight: 1.5, marginTop: '0.4rem', fontStyle: 'italic' }}>set after onboarding intake call.</p>
        )}
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
          <button key={item.id}
            onClick={() => setChecklist(prev => prev.map(c => c.id === item.id ? { ...c, done: !c.done } : c))}
            style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', width: '100%', background: 'none', border: 'none', padding: '0.75rem 0', borderBottom: `1px solid ${BORDER}`, cursor: 'pointer', textAlign: 'left' }}>
            <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.65rem', color: item.done ? GREEN : GHOST, flexShrink: 0 }}>{item.done ? '✓' : '○'}</span>
            <span style={{ fontSize: 'clamp(0.72rem, 1.05vw, 0.85rem)', color: item.done ? DIM : '#EDEDE8', fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>{item.text}</span>
          </button>
        ))}
      </div>

      <div style={sectionWrap}>
        <span style={label}>meal structure</span>
        {nutritionData.mealStructure.map((m, i) => (
          <div key={i} style={{ padding: '0.8rem 0', borderBottom: `1px solid ${BORDER}`, display: 'grid', gridTemplateColumns: '6.5rem 1fr', gap: '0.8rem', alignItems: 'start' }}>
            <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.44rem', color: GHOST, letterSpacing: '0.1em', textTransform: 'uppercase', paddingTop: '0.1rem' }}>{m.meal}</span>
            <span style={{ fontSize: 'clamp(0.65rem, 0.95vw, 0.78rem)', color: '#EDEDE8', lineHeight: 1.5 }}>{m.content}</span>
          </div>
        ))}
      </div>

      <div style={{ ...sectionWrap, padding: '1.1rem', border: `1px solid ${BORDER}` }}>
        <span style={{ ...label, marginBottom: '0.5rem' }}>coach&apos;s weekly focus</span>
        <p style={{ fontSize: 'clamp(0.72rem, 1.05vw, 0.85rem)', color: DIM, lineHeight: 1.75, margin: 0, fontStyle: 'italic' }}>{nutritionData.coachFocus}</p>
      </div>

      <div style={sectionWrap}>
        <span style={label}>weekly grocery list</span>
        {['protein', 'produce', 'fat', 'staple'].map(cat => {
          const items = nutritionData.grocery.filter(g => g.category === cat);
          return (
            <div key={cat} style={{ marginBottom: '1.2rem' }}>
              <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.4rem', letterSpacing: '0.2em', color: GHOST, textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>{cat}</span>
              {items.map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0', borderBottom: '1px solid #0a0a0a' }}>
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

function ProgressTab() {
  return (
    <div>
      <div style={{ ...sectionWrap, padding: '1.1rem', border: `1px solid ${BORDER}` }}>
        <span style={{ ...label, marginBottom: '0.5rem' }}>recomposition score</span>
        <div style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 200, color: GHOST, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: '0.4rem' }}>—</div>
        <p style={{ fontSize: 'clamp(0.62rem, 0.9vw, 0.74rem)', color: GHOST, lineHeight: 1.6, margin: 0, fontStyle: 'italic' }}>
          score builds after week 2. based on: strength trend, waist trend, adherence, visual progress, recovery, and performance.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2.5rem' }}>
        {progressStats.map((stat, i) => (
          <div key={i} style={{ padding: '1.1rem', border: `1px solid ${BORDER}` }}>
            <span style={{ ...label, marginBottom: '0.5rem' }}>{stat.label}</span>
            <div style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 200, color: GHOST, letterSpacing: '-0.03em', lineHeight: 1 }}>{stat.val}</div>
            <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 'clamp(0.52rem, 0.8vw, 0.62rem)', color: GHOST, marginTop: '0.3rem' }}>{stat.sub}</div>
          </div>
        ))}
      </div>

      <div style={sectionWrap}>
        <span style={label}>progress photos</span>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.8rem' }}>
          {['baseline', 'week 4', 'week 8'].map((wk, i) => (
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
          we do not measure success by the scale alone. strength progression, waist trend, how your clothes fit, how you feel in the gym, and adherence — these are all tracked. the body changes when the inputs are consistent. stay on the system.
        </p>
      </div>
    </div>
  );
}

function CheckInTab() {
  const [mode, setMode]     = useState('daily');
  const [answers, setAnswers] = useState({});
  const [sent, setSent]     = useState(false);
  const questions = checkInQuestions[mode];

  function handleChange(id, val) {
    setAnswers(prev => ({ ...prev, [id]: val }));
  }

  if (sent) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '30vh', gap: '1rem' }}>
        <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.52rem', letterSpacing: '0.3em', color: GREEN }}>submitted.</span>
        <p style={{ fontSize: 'clamp(0.72rem, 1.05vw, 0.85rem)', color: DIM, textAlign: 'center', maxWidth: '320px', lineHeight: 1.7 }}>check-in logged. the coach can see your response.</p>
        <button onClick={() => { setSent(false); setAnswers({}); }}
          style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.44rem', color: GHOST, background: 'none', border: `1px solid ${BORDER}`, padding: '0.6rem 1rem', cursor: 'pointer', letterSpacing: '0.1em' }}>reset</button>
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

function WeeklyReviewTab() {
  const questions = checkInQuestions.weekly;
  const [answers, setAnswers] = useState({});
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '30vh', gap: '1rem' }}>
        <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.52rem', letterSpacing: '0.3em', color: GREEN }}>submitted.</span>
        <p style={{ fontSize: 'clamp(0.72rem, 1.05vw, 0.85rem)', color: DIM, textAlign: 'center', maxWidth: '320px', lineHeight: 1.7 }}>weekly review logged. the coach will adjust your program accordingly.</p>
        <button onClick={() => { setSent(false); setAnswers({}); }}
          style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.44rem', color: GHOST, background: 'none', border: `1px solid ${BORDER}`, padding: '0.6rem 1rem', cursor: 'pointer', letterSpacing: '0.1em' }}>reset</button>
      </div>
    );
  }

  return (
    <div>
      <p style={{ fontSize: 'clamp(0.68rem, 1vw, 0.8rem)', color: GHOST, lineHeight: 1.7, marginBottom: '1.5rem', borderLeft: `1px solid ${BORDER}`, paddingLeft: '0.8rem', fontStyle: 'italic' }}>
        complete this every sunday. honest answers allow the coach to make real adjustments to your program.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '2rem' }}>
        {questions.map(q => (
          <div key={q.id} style={{ borderBottom: `1px solid ${BORDER}`, paddingBottom: '1rem' }}>
            <p style={{ fontSize: 'clamp(0.72rem, 1.05vw, 0.85rem)', color: '#EDEDE8', lineHeight: 1.6, marginBottom: '0.7rem' }}>{q.text}</p>
            <textarea value={answers[q.id] || ''} onChange={e => setAnswers(prev => ({ ...prev, [q.id]: e.target.value }))} rows={2}
              placeholder="type here…"
              style={{ width: '100%', background: 'transparent', border: `1px solid ${BORDER}`, color: '#EDEDE8', fontFamily: 'Inter, sans-serif', fontSize: 'clamp(0.7rem, 1.05vw, 0.82rem)', fontWeight: 300, padding: '0.6rem', lineHeight: 1.6, resize: 'vertical', outline: 'none', boxSizing: 'border-box' }} />
          </div>
        ))}
      </div>
      <button onClick={() => setSent(true)}
        style={{ width: '100%', padding: '1rem', background: 'none', border: `1px solid #EDEDE8`, color: '#EDEDE8', fontFamily: 'Inter, sans-serif', fontWeight: 300, fontSize: 'clamp(0.8rem, 1.2vw, 0.92rem)', cursor: 'pointer', letterSpacing: '0.01em' }}>
        submit weekly review →
      </button>
    </div>
  );
}

function MessagesTab() {
  const [msg, setMsg]   = useState('');
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
        <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.4rem', color: GHOST, marginTop: '0.8rem', display: 'block' }}>vveritas* — week 1</span>
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
const TABS = ['today', 'fitness', 'nutrition', 'progress', 'check-in', 'weekly review', 'messages'];

export default function JoshuaDemoPortal() {
  const [tab, setTab] = useState('today');

  return (
    <div style={{ background: '#000', minHeight: '100dvh', fontFamily: 'Inter, -apple-system, sans-serif', fontWeight: 300, color: '#EDEDE8', maxWidth: '640px', margin: '0 auto', padding: '0 0 4rem' }}>
      <header style={{ padding: '1.1rem 1.4rem', borderBottom: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, background: '#000', zIndex: 10 }}>
        <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.52rem', letterSpacing: '0.3em', color: GHOST }}>vveritas*</span>
        <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.44rem', letterSpacing: '0.2em', color: GHOST }}>remote</span>
      </header>

      <div style={{ padding: '2rem 1.4rem 1.5rem' }}>
        <h1 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 200, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '0.5rem' }}>hey joshua.</h1>
        <p style={{ fontSize: 'clamp(0.68rem, 1vw, 0.8rem)', color: GHOST, lineHeight: 1.6, borderLeft: `1px solid ${BORDER}`, paddingLeft: '0.8rem', maxWidth: '420px' }}>&ldquo;{client.goal}&rdquo;</p>
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
        {tab === 'today'         && <TodayTab />}
        {tab === 'fitness'       && <FitnessTab />}
        {tab === 'nutrition'     && <NutritionTab />}
        {tab === 'progress'      && <ProgressTab />}
        {tab === 'check-in'      && <CheckInTab />}
        {tab === 'weekly review' && <WeeklyReviewTab />}
        {tab === 'messages'      && <MessagesTab />}
      </div>
    </div>
  );
}
