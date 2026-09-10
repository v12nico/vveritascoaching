'use client';
import { useState } from 'react';

// Demo portal walked during the call. Hybrid means most weeks he trains alone,
// so the dashboard has to carry the days the coach is not there — that is the
// argument the portal is making, not "look how many features".

const ACCENT = '#6a8fb0';
const DIM = '#5A5A5A';
const GHOST = '#3A3A3A';
const BORDER = '#141414';

const client = { name: 'Anthony', goal: 'lose fat, build muscle, keep the routine this time.' };
const TABS = ['today', 'fitness', 'nutrition', 'progress', 'check-in', 'messages'];

const todayTasks = [
  { id: 1, text: "today's workout — upper a", done: true },
  { id: 2, text: 'protein goal — 165g', done: false },
  { id: 3, text: 'water — 3 litres', done: false },
  { id: 4, text: 'daily mission — no food after 9pm', done: false },
  { id: 5, text: 'evening check-in', done: false },
];

const fitness = {
  schedule: ['mon — in person 6:00pm', 'tue — solo', 'thu — in person 6:00pm', 'sat — solo'],
  today: [
    { name: 'incline dumbbell press', sets: '4 × 8–10', note: 'last week 55s × 9 — beat one rep' },
    { name: 'chest-supported row',    sets: '4 × 10–12', note: 'squeeze, no momentum' },
    { name: 'seated shoulder press',  sets: '3 × 8–10',  note: 'stop 2 shy of failure' },
    { name: 'lat pulldown',           sets: '3 × 10–12', note: 'full stretch at the top' },
    { name: 'cable lateral raise',    sets: '3 × 12–15', note: 'light, controlled' },
    { name: 'rope pushdown',          sets: '3 × 12–15', note: 'finisher' },
  ],
  completed: 14,
};

const nutrition = {
  protein: '165g', water: '3 litres',
  structure: ['protein at every meal', 'vegetable at two meals', 'carbs around training', 'no food after 9pm'],
  grocery: ['chicken breast', 'ground beef 90/10', 'eggs', 'greek yogurt', 'rice', 'potatoes',
            'broccoli', 'spinach', 'berries', 'olive oil'],
  coachNote: 'no calorie counting this block. hit the protein, keep the structure, we adjust from the data.',
};

const progress = [
  { label: 'weight',            value: '—',      note: 'baseline week 1' },
  { label: 'measurements',      value: '—',      note: 'waist + arms every 2 weeks' },
  { label: 'strength',          value: '↑',      note: 'press and row both up since week 1' },
  { label: 'workout consistency', value: '14 / 16', note: 'the number that actually matters' },
  { label: 'progress photos',   value: 'optional', note: 'only if you want them' },
];

const checkIn = ['how was training?', 'nutrition?', 'energy?', 'recovery?', 'anything hurting?'];

const message = "every workout doesn't need to be perfect. it just needs to be completed. consistency beats intensity.";

const mono = (sz = '0.44rem', col = GHOST) => ({
  fontFamily: 'ui-monospace, monospace', fontSize: sz,
  letterSpacing: '0.24em', textTransform: 'uppercase', color: col,
});
const card = { border: `1px solid ${BORDER}`, padding: '1.1rem' };
const row = { fontSize: '0.9rem', color: '#B5B5B0', lineHeight: 1.6, padding: '0.45rem 0' };

export default function AnthonyPortal() {
  const [tab, setTab] = useState('today');
  const [tasks, setTasks] = useState(todayTasks);
  const toggle = (id) => setTasks(t => t.map(x => (x.id === id ? { ...x, done: !x.done } : x)));
  const doneCount = tasks.filter(t => t.done).length;

  return (
    <div style={{ background: '#000', minHeight: '100dvh', color: '#EDEDE8',
                  fontFamily: 'Inter, -apple-system, sans-serif', fontWeight: 300 }}>
      <div style={{ maxWidth: '620px', margin: '0 auto', padding: '2rem 1.2rem 4rem' }}>

        <div style={mono()}>vveritas* — your portal</div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 200, marginTop: '0.7rem' }}>{client.name.toLowerCase()}</h1>
        <p style={{ fontSize: '0.9rem', color: DIM, marginTop: '0.4rem', lineHeight: 1.6 }}>{client.goal}</p>

        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '1.8rem' }}>
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)}
              style={{ ...mono('0.44rem', tab === t ? '#EDEDE8' : GHOST),
                       background: tab === t ? 'rgba(106,143,176,0.12)' : 'none',
                       border: `1px solid ${tab === t ? ACCENT : BORDER}`,
                       padding: '0.6rem 0.75rem', cursor: 'pointer', minHeight: '38px' }}>
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
                    style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', padding: '0.6rem 0',
                             borderTop: '1px solid #0d0d0d', cursor: 'pointer' }}>
                    <span style={{ width: 14, height: 14, flexShrink: 0,
                                   border: `1px solid ${t.done ? ACCENT : '#2a2a2a'}`,
                                   background: t.done ? ACCENT : 'transparent' }} />
                    <span style={{ ...row, padding: 0, color: t.done ? DIM : '#B5B5B0',
                                   textDecoration: t.done ? 'line-through' : 'none' }}>{t.text}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'fitness' && (
            <div style={{ display: 'grid', gap: '0.8rem' }}>
              <div style={card}>
                <div style={mono()}>your week</div>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '0.7rem' }}>
                  {fitness.schedule.map(s => (
                    <span key={s} style={{ ...mono('0.42rem', s.includes('in person') ? ACCENT : DIM),
                                           border: `1px solid ${s.includes('in person') ? ACCENT : BORDER}`,
                                           padding: '0.45rem 0.6rem' }}>{s}</span>
                  ))}
                </div>
                <div style={{ ...mono('0.4rem', '#2A2A2A'), marginTop: '0.8rem' }}>
                  two with me. two on your own — same program either way.
                </div>
              </div>
              <div style={card}>
                <div style={mono()}>today's session</div>
                {fitness.today.map((w, i) => (
                  <div key={i} style={{ padding: '0.6rem 0', borderTop: i ? '1px solid #0d0d0d' : 'none' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                      <span style={{ fontSize: '0.9rem' }}>{w.name}</span>
                      <span style={{ fontSize: '0.82rem', color: ACCENT, whiteSpace: 'nowrap' }}>{w.sets}</span>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: GHOST, marginTop: '0.2rem' }}>{w.note}</div>
                  </div>
                ))}
                <div style={{ ...mono('0.4rem', '#2A2A2A'), marginTop: '0.9rem' }}>
                  weights logged here · exercise videos on every movement
                </div>
              </div>
              <div style={{ ...card, ...mono('0.44rem', DIM) }}>workouts completed — {fitness.completed}</div>
            </div>
          )}

          {tab === 'nutrition' && (
            <div style={{ display: 'grid', gap: '0.8rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                <div style={card}>
                  <div style={mono()}>protein</div>
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
                    <span key={g} style={{ fontSize: '0.8rem', color: DIM, border: `1px solid ${BORDER}`,
                                           padding: '0.35rem 0.55rem' }}>{g}</span>
                  ))}
                </div>
              </div>
              <div style={{ ...card, borderColor: '#18202a' }}>
                <div style={mono('0.44rem', ACCENT)}>coach note</div>
                <p style={{ fontSize: '0.88rem', color: '#B5B5B0', lineHeight: 1.65, marginTop: '0.5rem' }}>
                  {nutrition.coachNote}
                </p>
              </div>
            </div>
          )}

          {tab === 'progress' && (
            <div style={card}>
              <div style={mono()}>progress</div>
              {progress.map((p, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                                      gap: '1rem', padding: '0.7rem 0',
                                      borderTop: i ? '1px solid #0d0d0d' : 'none' }}>
                  <div>
                    <div style={{ fontSize: '0.9rem' }}>{p.label}</div>
                    <div style={{ fontSize: '0.75rem', color: GHOST, marginTop: '0.15rem' }}>{p.note}</div>
                  </div>
                  <div style={{ fontSize: '1.05rem', color: ACCENT, whiteSpace: 'nowrap' }}>{p.value}</div>
                </div>
              ))}
            </div>
          )}

          {tab === 'check-in' && (
            <div style={card}>
              <div style={mono()}>weekly check-in</div>
              {checkIn.map((q, i) => (
                <div key={i} style={{ padding: '0.7rem 0', borderTop: i ? '1px solid #0d0d0d' : 'none' }}>
                  <div style={{ ...row, padding: 0 }}>{q}</div>
                  <div style={{ height: '1px', background: '#0f0f0f', marginTop: '0.6rem' }} />
                </div>
              ))}
            </div>
          )}

          {tab === 'messages' && (
            <div style={{ ...card, borderColor: '#18202a' }}>
              <div style={mono('0.44rem', ACCENT)}>from your coach</div>
              <p style={{ fontSize: '0.95rem', color: '#B5B5B0', lineHeight: 1.75, marginTop: '0.7rem' }}>
                {message}
              </p>
              <div style={{ ...mono('0.4rem', '#2A2A2A'), marginTop: '1rem' }}>unlimited messaging — reply any time</div>
            </div>
          )}
        </div>

        <div style={{ ...mono('0.4rem', '#222'), marginTop: '2.5rem' }}>preview — sample data</div>
      </div>
    </div>
  );
}
