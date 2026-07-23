'use client';
import { useState } from 'react';

const GREEN  = '#4a8c6a';
const AMBER  = '#8c7a3a';
const DIM    = '#5A5A5A';
const GHOST  = '#3A3A3A';
const BORDER = '#141414';

const client = {
  name: 'Zack',
  goal: 'build a system that works after a long day.',
};

const pillars = [
  { name: 'training',     score: 38 },
  { name: 'nutrition',    score: 31 },
  { name: 'recovery',     score: 44 },
  { name: 'consistency',  score: 22 },
];

const todayTasks = [
  { id: 't1', text: 'complete workout — push day a',          pillar: 'training',    done: false },
  { id: 't2', text: 'hit daily protein target (180g)',         pillar: 'nutrition',   done: false },
  { id: 't3', text: 'drink water — at least 3 liters',        pillar: 'recovery',    done: false },
  { id: 't4', text: '10-minute walk — before or after work',  pillar: 'training',    done: false },
  { id: 't5', text: 'submit evening check-in',                pillar: 'consistency', done: false },
];

const todayFocus = `no decisions tonight. the workout is planned. the meals are set. walk in, execute, walk out. that is the entire job. one completed day is all that is required.`;

const program = {
  name: 'work-life strength foundation',
  split: '3–4 days / week — push · pull · legs · optional full body',
  phase: 'phase 1 — weeks 1–4',
  note: 'three to four short sessions per week. every exercise is placed intentionally. no junk volume. sessions are designed to be completed in 45–55 minutes so you get in and get out without losing the rest of your evening.',
  focusAreas: ['chest', 'shoulders', 'back', 'arms', 'legs', 'core'],
  days: [
    {
      label: 'push — upper',
      emphasis: 'chest · shoulders · triceps',
      exercises: [
        { name: 'incline dumbbell press', sets: '3', reps: '8–10', note: 'control the descent. 3s down.' },
        { name: 'seated dumbbell shoulder press', sets: '3', reps: '10–12', note: 'elbows slightly in front.' },
        { name: 'cable lateral raise', sets: '3', reps: '12–15', note: 'no swinging. light weight.' },
        { name: 'tricep rope pushdown', sets: '3', reps: '12–15', note: 'elbows stay fixed.' },
        { name: 'overhead tricep extension', sets: '2', reps: '12', note: 'full stretch at the top.' },
      ],
    },
    {
      label: 'pull — upper',
      emphasis: 'back · biceps · rear delts',
      exercises: [
        { name: 'lat pulldown', sets: '3', reps: '10–12', note: 'pull to upper chest. full stretch.' },
        { name: 'seated cable row', sets: '3', reps: '10–12', note: 'squeeze at the end of each rep.' },
        { name: 'dumbbell rear delt fly', sets: '3', reps: '12–15', note: 'slow and controlled.' },
        { name: 'dumbbell curl', sets: '3', reps: '10–12', note: 'supinate at the top.' },
        { name: 'face pull', sets: '3', reps: '15', note: 'external rotation. posture work.' },
      ],
    },
    {
      label: 'legs — compound',
      emphasis: 'quads · hamstrings · glutes',
      exercises: [
        { name: 'goblet squat or leg press', sets: '3', reps: '10–12', note: 'knee tracking over toe.' },
        { name: 'romanian deadlift', sets: '3', reps: '10', note: 'hip hinge. feel the hamstrings load.' },
        { name: 'leg extension', sets: '3', reps: '12–15', note: 'isolate the quad at the top.' },
        { name: 'leg curl', sets: '3', reps: '12–15', note: 'slow negative. full range.' },
        { name: 'standing calf raise', sets: '3', reps: '15', note: 'pause at the top.' },
      ],
    },
    {
      label: 'optional — full body (if energy allows)',
      emphasis: 'total body · active recovery',
      exercises: [
        { name: 'dumbbell row', sets: '3', reps: '10–12', note: 'one arm at a time. row to hip.' },
        { name: 'dumbbell bench press', sets: '3', reps: '10', note: 'moderate load. control.' },
        { name: 'goblet squat', sets: '3', reps: '12', note: 'full depth. upright torso.' },
        { name: 'dumbbell lateral raise', sets: '2', reps: '15', note: 'light. shoulder health.' },
        { name: 'plank hold', sets: '3', reps: '30–45s', note: 'brace the entire core.' },
      ],
    },
  ],
};

const nutrition = {
  proteinTarget: 180,
  cals: '2,400–2,600',
  carbs: '250–290g',
  fats: '65–80g',
  meals: [
    { label: 'breakfast', items: ['4 eggs scrambled', '2 pieces whole grain toast', 'greek yogurt (1 cup)', 'black coffee or water'] },
    { label: 'lunch', items: ['ground turkey (6oz)', 'white rice (1 cup cooked)', 'roasted broccoli', 'olive oil drizzle'] },
    { label: 'pre-workout snack', items: ['protein shake (40g protein)', 'banana or apple', 'handful of almonds'] },
    { label: 'dinner', items: ['chicken breast (7oz)', 'sweet potato or rice', 'mixed vegetables', 'hot sauce or seasoning'] },
    { label: 'before bed', items: ['cottage cheese (1 cup)', 'or casein protein shake'] },
  ],
  groceryList: [
    'eggs (2 dozen)',
    'ground turkey (2 lbs)',
    'chicken breast (3 lbs)',
    'greek yogurt (32oz)',
    'cottage cheese (32oz)',
    'protein powder (whey or blend)',
    'white rice (5 lb bag)',
    'sweet potatoes (4–5)',
    'whole grain bread',
    'broccoli (2 heads or frozen)',
    'mixed vegetables (frozen bag)',
    'bananas',
    'apples',
    'almonds (1 bag)',
    'olive oil',
    'hot sauce / seasoning',
  ],
};

const checkInQuestions = [
  { q: 'did you complete today\'s workout?', type: 'yn' },
  { q: 'did you hit your protein target?', type: 'yn' },
  { q: 'how was your energy today after work? (1–10)', type: 'scale' },
  { q: 'what time did you get home from work?', type: 'text' },
  { q: 'did anything stop you from executing today?', type: 'text' },
  { q: 'sleep last night — hours and quality (1–10)', type: 'text' },
  { q: 'how are you feeling about the program so far?', type: 'text' },
];

const coachMessage = {
  from: 'coach',
  time: 'today',
  text: `remember:\n\nyou don't need another perfect week.\n\nyou just need another completed day.\n\nstop worrying about next month.\n\nwin today.`,
};

const tabs = ['today', 'fitness', 'nutrition', 'progress', 'check-in', 'messages'];

export default function ZackDemo() {
  const [tab, setTab]       = useState('today');
  const [tasks, setTasks]   = useState(todayTasks);
  const [dayIdx, setDayIdx] = useState(0);
  const [mealIdx, setMealIdx] = useState(0);
  const [ciAnswers, setCiAnswers] = useState({});
  const [ciDone, setCiDone] = useState(false);

  function toggleTask(id) {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  }

  const totalScore = Math.round(pillars.reduce((s, p) => s + p.score, 0) / pillars.length);

  const mono = (sz = '0.44rem', col = GHOST) => ({
    fontFamily: 'ui-monospace, monospace',
    fontSize: sz,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: col,
  });

  const sectionLabel = (txt) => (
    <div style={{ ...mono('0.4rem', GHOST), marginBottom: '0.7rem' }}>{txt}</div>
  );

  return (
    <div style={{ background: '#000', minHeight: '100dvh', fontFamily: 'Inter, -apple-system, sans-serif', fontWeight: 300, color: '#EDEDE8', display: 'flex', flexDirection: 'column', maxWidth: '480px', margin: '0 auto' }}>

      {/* header */}
      <div style={{ padding: '1.2rem 1.4rem 0', borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.6rem' }}>
          <div>
            <div style={mono('0.38rem', GHOST)}>vveritas* dashboard</div>
            <div style={{ fontSize: '1.05rem', letterSpacing: '-0.01em', marginTop: '0.3rem' }}>
              {client.name.toLowerCase()}.
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ ...mono('0.38rem'), color: GREEN }}>active</div>
            <div style={{ fontSize: '0.65rem', color: GHOST, marginTop: '0.2rem' }}>week 1</div>
          </div>
        </div>
        <p style={{ fontSize: '0.7rem', color: GHOST, marginBottom: '0.9rem', lineHeight: 1.5 }}>{client.goal}</p>

        {/* tabs */}
        <div style={{ display: 'flex', gap: 0, overflowX: 'auto', scrollbarWidth: 'none', marginLeft: '-1.4rem', marginRight: '-1.4rem', paddingLeft: '1.4rem' }}>
          {tabs.map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ padding: '0.55rem 0.9rem', background: 'none', border: 'none', borderBottom: `1px solid ${t === tab ? GREEN : BORDER}`, color: t === tab ? '#EDEDE8' : GHOST, fontFamily: 'ui-monospace, monospace', fontSize: '0.4rem', letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer', flexShrink: 0, transition: 'all 0.15s' }}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '1.4rem' }}>

        {/* ── TODAY ─────────────────────────────────────────────────────────── */}
        {tab === 'today' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem' }}>
            {sectionLabel("today's mission")}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {tasks.map(task => (
                <div key={task.id} onClick={() => toggleTask(task.id)}
                  style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start', padding: '0.8rem', border: `1px solid ${task.done ? GREEN : BORDER}`, cursor: 'pointer', transition: 'border-color 0.15s', background: task.done ? 'rgba(74,140,106,0.04)' : 'transparent' }}>
                  <div style={{ width: '14px', height: '14px', border: `1px solid ${task.done ? GREEN : BORDER}`, background: task.done ? GREEN : 'transparent', flexShrink: 0, marginTop: '1px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s' }}>
                    {task.done && <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.45rem', color: '#000' }}>✓</span>}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.82rem', color: task.done ? DIM : '#EDEDE8', textDecoration: task.done ? 'line-through' : 'none', lineHeight: 1.4 }}>{task.text}</div>
                    <div style={{ ...mono('0.34rem', GHOST), marginTop: '0.25rem' }}>{task.pillar}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ padding: '1rem', border: `1px solid ${BORDER}`, background: '#050505' }}>
              <div style={{ ...mono('0.38rem', GHOST), marginBottom: '0.5rem' }}>focus note</div>
              <p style={{ fontSize: '0.78rem', color: DIM, lineHeight: 1.75, margin: 0 }}>{todayFocus}</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '0.5rem' }}>
              {pillars.map(p => (
                <div key={p.name} style={{ padding: '0.7rem 0.5rem', border: `1px solid ${BORDER}`, textAlign: 'center' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 200, color: p.score >= 60 ? GREEN : p.score >= 40 ? AMBER : '#5A5A5A' }}>{p.score}</div>
                  <div style={{ ...mono('0.3rem', GHOST), marginTop: '0.3rem' }}>{p.name}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── FITNESS ───────────────────────────────────────────────────────── */}
        {tab === 'fitness' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
            {sectionLabel('training plan')}
            <div style={{ padding: '1rem', border: `1px solid ${BORDER}` }}>
              <div style={{ fontSize: '0.88rem', marginBottom: '0.2rem' }}>{program.name}</div>
              <div style={{ ...mono('0.36rem', GREEN), marginBottom: '0.4rem' }}>{program.split}</div>
              <div style={{ ...mono('0.34rem', GHOST), marginBottom: '0.6rem' }}>{program.phase}</div>
              <p style={{ fontSize: '0.7rem', color: DIM, lineHeight: 1.7, margin: 0 }}>{program.note}</p>
            </div>

            <div style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto', scrollbarWidth: 'none' }}>
              {program.days.map((d, i) => (
                <button key={i} onClick={() => setDayIdx(i)}
                  style={{ padding: '0.4rem 0.7rem', border: `1px solid ${i === dayIdx ? GREEN : BORDER}`, background: 'none', color: i === dayIdx ? '#EDEDE8' : GHOST, fontFamily: 'ui-monospace, monospace', fontSize: '0.36rem', letterSpacing: '0.08em', cursor: 'pointer', flexShrink: 0 }}>
                  {d.label.split(' — ')[0]}
                </button>
              ))}
            </div>

            <div>
              <div style={{ fontSize: '0.82rem', marginBottom: '0.2rem' }}>{program.days[dayIdx].label}</div>
              <div style={{ ...mono('0.36rem', GREEN), marginBottom: '1rem' }}>{program.days[dayIdx].emphasis}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {program.days[dayIdx].exercises.map((ex, i) => (
                  <div key={i} style={{ padding: '0.75rem 0', borderBottom: `1px solid ${BORDER}` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.2rem' }}>
                      <span style={{ fontSize: '0.8rem', color: '#EDEDE8' }}>{ex.name}</span>
                      <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.36rem', color: GHOST }}>{ex.sets} × {ex.reps}</span>
                    </div>
                    <div style={{ fontSize: '0.64rem', color: GHOST, lineHeight: 1.5 }}>{ex.note}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── NUTRITION ─────────────────────────────────────────────────────── */}
        {tab === 'nutrition' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
            {sectionLabel('nutrition plan')}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '0.5rem' }}>
              {[
                { label: 'protein', val: `${nutrition.proteinTarget}g` },
                { label: 'calories', val: nutrition.cals },
                { label: 'carbs', val: nutrition.carbs },
                { label: 'fats', val: nutrition.fats },
              ].map(m => (
                <div key={m.label} style={{ padding: '0.8rem', border: `1px solid ${BORDER}`, textAlign: 'center' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 200, color: '#EDEDE8' }}>{m.val}</div>
                  <div style={{ ...mono('0.32rem', GHOST), marginTop: '0.3rem' }}>{m.label}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto', scrollbarWidth: 'none' }}>
              {nutrition.meals.map((m, i) => (
                <button key={i} onClick={() => setMealIdx(i)}
                  style={{ padding: '0.4rem 0.7rem', border: `1px solid ${i === mealIdx ? GREEN : BORDER}`, background: 'none', color: i === mealIdx ? '#EDEDE8' : GHOST, fontFamily: 'ui-monospace, monospace', fontSize: '0.34rem', letterSpacing: '0.07em', cursor: 'pointer', flexShrink: 0, whiteSpace: 'nowrap' }}>
                  {m.label}
                </button>
              ))}
            </div>

            <div style={{ padding: '1rem', border: `1px solid ${BORDER}` }}>
              <div style={{ ...mono('0.38rem', GREEN), marginBottom: '0.7rem' }}>{nutrition.meals[mealIdx].label}</div>
              {nutrition.meals[mealIdx].items.map((item, j) => (
                <div key={j} style={{ display: 'flex', gap: '0.6rem', padding: '0.45rem 0', borderBottom: `1px solid #0d0d0d` }}>
                  <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.4rem', color: GREEN, marginTop: '0.15rem', flexShrink: 0 }}>—</span>
                  <span style={{ fontSize: '0.78rem', color: '#EDEDE8', lineHeight: 1.4 }}>{item}</span>
                </div>
              ))}
            </div>

            <div>
              <div style={{ ...mono('0.38rem', GHOST), marginBottom: '0.6rem' }}>weekly grocery list</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.3rem' }}>
                {nutrition.groceryList.map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', padding: '0.35rem 0', borderBottom: `1px solid #0a0a0a` }}>
                    <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.38rem', color: GREEN, flexShrink: 0, marginTop: '0.12rem' }}>✓</span>
                    <span style={{ fontSize: '0.65rem', color: DIM, lineHeight: 1.4 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── PROGRESS ──────────────────────────────────────────────────────── */}
        {tab === 'progress' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
            {sectionLabel('progress overview')}
            <div style={{ padding: '1.2rem', border: `1px solid ${BORDER}`, textAlign: 'center' }}>
              <div style={{ ...mono('0.38rem', GHOST), marginBottom: '0.5rem' }}>overall score</div>
              <div style={{ fontSize: '3rem', fontWeight: 200, color: '#EDEDE8', lineHeight: 1 }}>{totalScore}</div>
              <div style={{ ...mono('0.34rem', GHOST), marginTop: '0.4rem' }}>/ 100</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              {pillars.map(p => (
                <div key={p.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                    <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.38rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: GHOST }}>{p.name}</span>
                    <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.38rem', color: p.score >= 60 ? GREEN : p.score >= 40 ? AMBER : DIM }}>{p.score}</span>
                  </div>
                  <div style={{ height: '2px', background: BORDER, borderRadius: '1px' }}>
                    <div style={{ height: '2px', background: p.score >= 60 ? GREEN : p.score >= 40 ? AMBER : '#3A3A3A', width: `${p.score}%`, transition: 'width 0.5s ease', borderRadius: '1px' }} />
                  </div>
                </div>
              ))}
            </div>

            <div style={{ padding: '1rem', border: `1px solid ${BORDER}`, background: '#050505' }}>
              <div style={{ ...mono('0.36rem', GHOST), marginBottom: '0.5rem' }}>what moves the score</div>
              {['completing daily workouts', 'hitting protein target daily', 'submitting check-ins', 'sleep quality and recovery', 'coach-assessed consistency'].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.6rem', padding: '0.4rem 0', borderBottom: `1px solid #0a0a0a` }}>
                  <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.38rem', color: GREEN, flexShrink: 0, marginTop: '0.1rem' }}>—</span>
                  <span style={{ fontSize: '0.72rem', color: DIM, lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── CHECK-IN ──────────────────────────────────────────────────────── */}
        {tab === 'check-in' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
            {sectionLabel('evening check-in')}
            {!ciDone ? (
              <>
                <p style={{ fontSize: '0.72rem', color: GHOST, lineHeight: 1.7 }}>takes two minutes. keeps the coach informed. this is how progress gets managed daily.</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {checkInQuestions.map((item, i) => (
                    <div key={i} style={{ borderBottom: `1px solid ${BORDER}`, paddingBottom: '1rem' }}>
                      <div style={{ fontSize: '0.8rem', color: '#EDEDE8', marginBottom: '0.5rem', lineHeight: 1.4 }}>{item.q}</div>
                      {item.type === 'yn' ? (
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          {['yes', 'no'].map(opt => (
                            <button key={opt} onClick={() => setCiAnswers(prev => ({ ...prev, [i]: opt }))}
                              style={{ padding: '0.4rem 1rem', border: `1px solid ${ciAnswers[i] === opt ? GREEN : BORDER}`, background: ciAnswers[i] === opt ? 'rgba(74,140,106,0.1)' : 'none', color: ciAnswers[i] === opt ? '#EDEDE8' : GHOST, fontFamily: 'ui-monospace, monospace', fontSize: '0.4rem', letterSpacing: '0.1em', cursor: 'pointer' }}>
                              {opt}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <input placeholder="your response..." value={ciAnswers[i] || ''} onChange={e => setCiAnswers(prev => ({ ...prev, [i]: e.target.value }))}
                          style={{ width: '100%', background: 'transparent', border: `1px solid ${BORDER}`, color: '#EDEDE8', fontFamily: 'Inter, -apple-system, sans-serif', fontSize: '0.8rem', fontWeight: 300, padding: '0.55rem 0.7rem', outline: 'none', boxSizing: 'border-box', borderRadius: 0 }} />
                      )}
                    </div>
                  ))}
                  <button onClick={() => setCiDone(true)}
                    style={{ padding: '0.85rem', border: `1px solid #EDEDE8`, background: 'none', color: '#EDEDE8', fontFamily: 'inherit', fontSize: '0.82rem', cursor: 'pointer' }}>
                    submit check-in →
                  </button>
                </div>
              </>
            ) : (
              <div style={{ padding: '2rem 1rem', textAlign: 'center' }}>
                <div style={{ ...mono('0.4rem', GREEN), marginBottom: '1rem' }}>check-in received.</div>
                <p style={{ fontSize: '0.78rem', color: DIM, lineHeight: 1.8 }}>the coach will review this tonight and respond if adjustments are needed. show up tomorrow and do it again.</p>
              </div>
            )}
          </div>
        )}

        {/* ── MESSAGES ──────────────────────────────────────────────────────── */}
        {tab === 'messages' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
            {sectionLabel('coach messages')}
            <div style={{ padding: '1rem', border: `1px solid ${BORDER}`, background: '#050505' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
                <span style={{ ...mono('0.38rem', GREEN) }}>{coachMessage.from}</span>
                <span style={{ ...mono('0.34rem', GHOST) }}>{coachMessage.time}</span>
              </div>
              <p style={{ fontSize: '0.84rem', color: '#EDEDE8', lineHeight: 2, margin: 0, whiteSpace: 'pre-line' }}>
                {coachMessage.text}
              </p>
            </div>
            <div style={{ padding: '0.7rem', border: `1px solid ${BORDER}`, display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
              <input placeholder="message your coach..." style={{ flex: 1, background: 'transparent', border: 'none', color: '#EDEDE8', fontFamily: 'Inter, -apple-system, sans-serif', fontSize: '0.8rem', fontWeight: 300, outline: 'none' }} />
              <button style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.4rem', color: GREEN, background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.1em' }}>send →</button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
