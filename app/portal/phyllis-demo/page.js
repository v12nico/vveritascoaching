'use client';
import { useState } from 'react';

// Demo portal shown during the call. Deliberately narrow: training, food,
// progress. Nothing about mindset, business or "life systems" — she asked for
// a trainer. Programming stays editable until her health history is confirmed.

const ACCENT = '#b08a7d';
const DIM = '#5A5A5A';
const GHOST = '#3A3A3A';
const BORDER = '#141414';

const client = { name: 'Phyllis', goal: 'rebuild the routine. get stronger. lose the weight steadily.' };

const TABS = ['today', 'workouts', 'nutrition', 'progress', 'check-in', 'messages'];

const todayTasks = [
  { id: 1, text: 'attend scheduled session — 5:30pm', done: true },
  { id: 2, text: "follow today's meal structure", done: true },
  { id: 3, text: 'reach protein goal', done: false },
  { id: 4, text: 'drink water — 2.5 litres', done: false },
  { id: 5, text: 'complete evening check-in', done: false },
];

const workouts = {
  scheduled: ['mon 5:30pm', 'tue 5:30pm', 'thu 5:30pm', 'sat 10:00am'],
  today: [
    { name: 'goblet squat',            sets: '3 × 8–10',  note: 'sit back, heels down' },
    { name: 'chest-supported row',     sets: '3 × 10–12', note: 'back focus — squeeze' },
    { name: 'dumbbell romanian deadlift', sets: '3 × 8–10', note: 'hinge, soft knees' },
    { name: 'seated shoulder press',   sets: '3 × 8–10',  note: 'arms + shoulders' },
    { name: 'dead bug',                sets: '3 × 8 each', note: 'core — slow and controlled' },
    { name: 'incline walk',            sets: '10 min',    note: 'easy pace, cool down' },
  ],
  completed: 11,
};

const nutrition = {
  protein: '110g',
  water: '2.5 litres',
  structure: ['protein at every meal', 'a vegetable at two meals', 'fruit instead of a sweet snack', 'eat before the session, not after'],
  grocery: ['chicken thighs', 'ground turkey', 'eggs', 'greek yogurt', 'rice', 'potatoes', 'broccoli', 'peppers', 'berries', 'olive oil'],
  coachNote: 'no calorie counting this week. just hit the protein and keep the structure.',
};

const progress = [
  { label: 'weight',            value: '—',   note: 'baseline taken week 1' },
  { label: 'waist',             value: '—',   note: 'measured every 2 weeks' },
  { label: 'sessions attended', value: '11 / 12', note: 'this is the number that matters' },
  { label: 'strength',          value: '↑',   note: 'squat + row both up since week 1' },
  { label: 'energy',            value: 'better', note: 'from your check-ins' },
];

const checkIn = [
  "did you attend today's session?",
  'did you follow the meal structure?',
  'how was your energy?',
  'did anything hurt or feel uncomfortable?',
  'what went well today?',
  'what support do you need tomorrow?',
];

const message = 'the goal right now is not to do everything perfectly. it is to keep showing up, get stronger, and rebuild the routine. we will make adjustments as your body responds.';

const mono = (sz = '0.44rem', col = GHOST) => ({
  fontFamily: 'ui-monospace, monospace', fontSize: sz,
  letterSpacing: '0.24em', textTransform: 'uppercase', color: col,
});
const card = { border: `1px solid ${BORDER}`, padding: '1.1rem' };
const row = { fontSize: '0.9rem', color: '#B5B5B0', lineHeight: 1.6, padding: '0.45rem 0' };

export default function PhyllisPortal() {
  const [tab, setTab] = useState('today');
  const [tasks, setTasks] = useState(todayTasks);

  const toggle = (id) => setTasks(t => t.map(x => (x.id === id ? { ...x, done: !x.done } : x)));
  const doneCount = tasks.filter(t => t.done).length;

  return (
    <div style={{ background: '#000', minHeight: '100dvh', color: '#EDEDE8', fontFamily: 'Inter, -apple-system, sans-serif', fontWeight: 300 }}>
      <div style={{ maxWidth: '620px', margin: '0 auto', padding: '2rem 1.2rem 4rem' }}>

        <div style={mono()}>vveritas* — your portal</div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 200, marginTop: '0.7rem' }}>{client.name.toLowerCase()}</h1>
        <p style={{ fontSize: '0.9rem', color: DIM, marginTop: '0.4rem', lineHeight: 1.6 }}>{client.goal}</p>

        {/* tabs */}
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '1.8rem' }}>
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)}
              style={{
                ...mono('0.44rem', tab === t ? '#EDEDE8' : GHOST),
                background: tab === t ? 'rgba(176,138,125,0.1)' : 'none',
                border: `1px solid ${tab === t ? ACCENT : BORDER}`,
                padding: '0.6rem 0.75rem', cursor: 'pointer', minHeight: '38px',
              }}>
              {t}
            </button>
          ))}
        </div>

        <div style={{ marginTop: '1.6rem' }}>
          {tab === 'today' && (
            <div style={card}>
              <div style={mono()}>today — {doneCount} / {tasks.length}</div>
              <div style={{ marginTop: '0.8rem' }}>
                {tasks.map(t => (
                  <div key={t.id} onClick={() => toggle(t.id)}
                    style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', padding: '0.6rem 0', borderTop: '1px solid #0d0d0d', cursor: 'pointer' }}>
                    <span style={{ width: 14, height: 14, flexShrink: 0, border: `1px solid ${t.done ? ACCENT : '#2a2a2a'}`, background: t.done ? ACCENT : 'transparent' }} />
                    <span style={{ ...row, padding: 0, color: t.done ? DIM : '#B5B5B0', textDecoration: t.done ? 'line-through' : 'none' }}>{t.text}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'workouts' && (
            <div style={{ display: 'grid', gap: '0.8rem' }}>
              <div style={card}>
                <div style={mono()}>your scheduled sessions</div>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '0.7rem' }}>
                  {workouts.scheduled.map(s => (
                    <span key={s} style={{ ...mono('0.44rem', DIM), border: `1px solid ${BORDER}`, padding: '0.45rem 0.6rem' }}>{s}</span>
                  ))}
                </div>
              </div>
              <div style={card}>
                <div style={mono()}>today's session</div>
                {workouts.today.map((w, i) => (
                  <div key={i} style={{ padding: '0.6rem 0', borderTop: i ? '1px solid #0d0d0d' : 'none' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                      <span style={{ fontSize: '0.9rem' }}>{w.name}</span>
                      <span style={{ fontSize: '0.82rem', color: ACCENT, whiteSpace: 'nowrap' }}>{w.sets}</span>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: GHOST, marginTop: '0.2rem' }}>{w.note}</div>
                  </div>
                ))}
                <div style={{ ...mono('0.4rem', '#2A2A2A'), marginTop: '0.9rem' }}>
                  weights and reps logged here after each set
                </div>
              </div>
              <div style={{ ...card, ...mono('0.44rem', DIM) }}>sessions completed — {workouts.completed}</div>
            </div>
          )}

          {tab === 'nutrition' && (
            <div style={{ display: 'grid', gap: '0.8rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                <div style={card}>
                  <div style={mono()}>protein goal</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 200, marginTop: '0.4rem' }}>{nutrition.protein}</div>
                </div>
                <div style={card}>
                  <div style={mono()}>water</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 200, marginTop: '0.4rem' }}>{nutrition.water}</div>
                </div>
              </div>
              <div style={card}>
                <div style={mono()}>meal structure</div>
                {nutrition.structure.map((s, i) => <div key={i} style={row}>— {s}</div>)}
              </div>
              <div style={card}>
                <div style={mono()}>grocery list</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: '0.7rem' }}>
                  {nutrition.grocery.map(g => (
                    <span key={g} style={{ fontSize: '0.8rem', color: DIM, border: `1px solid ${BORDER}`, padding: '0.35rem 0.55rem' }}>{g}</span>
                  ))}
                </div>
              </div>
              <div style={{ ...card, borderColor: '#1e1a18' }}>
                <div style={{ ...mono('0.44rem', ACCENT) }}>coach note</div>
                <p style={{ fontSize: '0.88rem', color: '#B5B5B0', lineHeight: 1.65, marginTop: '0.5rem' }}>{nutrition.coachNote}</p>
              </div>
            </div>
          )}

          {tab === 'progress' && (
            <div style={card}>
              <div style={mono()}>progress</div>
              {progress.map((p, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '1rem', padding: '0.7rem 0', borderTop: i ? '1px solid #0d0d0d' : 'none' }}>
                  <div>
                    <div style={{ fontSize: '0.9rem' }}>{p.label}</div>
                    <div style={{ fontSize: '0.75rem', color: GHOST, marginTop: '0.15rem' }}>{p.note}</div>
                  </div>
                  <div style={{ fontSize: '1.05rem', color: ACCENT, whiteSpace: 'nowrap' }}>{p.value}</div>
                </div>
              ))}
              <div style={{ ...mono('0.4rem', '#2A2A2A'), marginTop: '0.9rem' }}>progress photos optional — only if you want them</div>
            </div>
          )}

          {tab === 'check-in' && (
            <div style={card}>
              <div style={mono()}>evening check-in</div>
              {checkIn.map((q, i) => (
                <div key={i} style={{ padding: '0.7rem 0', borderTop: i ? '1px solid #0d0d0d' : 'none' }}>
                  <div style={{ ...row, padding: 0 }}>{q}</div>
                  <div style={{ height: '1px', background: '#0f0f0f', marginTop: '0.6rem' }} />
                </div>
              ))}
            </div>
          )}

          {tab === 'messages' && (
            <div style={{ ...card, borderColor: '#1e1a18' }}>
              <div style={mono('0.44rem', ACCENT)}>from your coach</div>
              <p style={{ fontSize: '0.95rem', color: '#B5B5B0', lineHeight: 1.75, marginTop: '0.7rem' }}>{message}</p>
            </div>
          )}
        </div>

        <div style={{ ...mono('0.4rem', '#222'), marginTop: '2.5rem' }}>preview — sample data</div>
      </div>
    </div>
  );
}
