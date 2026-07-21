'use client';
import { useState, useEffect, useCallback } from 'react';
import { generateProgram, getCheckInQuestions } from '@/lib/program';

const GREEN  = '#4a8c6a';
const AMBER  = '#8c7a3a';
const RED    = '#8c3a3a';
const GHOST  = '#3A3A3A';
const DIM    = '#5A5A5A';
const BORDER = '#141414';
const SLUG   = 'christian';

const mono = { fontFamily: 'ui-monospace, monospace' };
const sLabel = (t) => <div style={{ ...mono, fontSize: '0.44rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: GHOST, marginBottom: '0.8rem' }}>{t}</div>;

const inputSt = {
  width: '100%', background: 'transparent', border: `1px solid ${BORDER}`,
  color: '#EDEDE8', fontFamily: 'Inter, sans-serif', fontSize: 'clamp(0.78rem, 1.1vw, 0.88rem)',
  fontWeight: 300, padding: '0.65rem 0.75rem', outline: 'none',
  boxSizing: 'border-box', borderRadius: 0,
};

const ALL_EXERCISES = [
  'squat','bench press','deadlift','overhead press','barbell row',
  'incline press','lat pulldown','seated cable row','hip thrust',
  'leg press','romanian deadlift','leg extension','leg curl',
  'cable lateral raise','face pull','barbell curl','hammer curl',
  'tricep pushdown','calf raise','dumbbell press','dumbbell row',
];

// ── SVG line chart ─────────────────────────────────────────────────────────────
function LineChart({ data, color = GREEN, unit = '' }) {
  if (!data || data.length < 2) return (
    <div style={{ height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ ...mono, fontSize: '0.4rem', color: GHOST }}>log more entries to see trend</span>
    </div>
  );
  const vals  = data.map(d => d.y);
  const min   = Math.min(...vals);
  const max   = Math.max(...vals);
  const range = max - min || 1;
  const W = 400, H = 72, PAD = 8;
  const xStep = (W - PAD * 2) / (vals.length - 1);
  const pts = vals.map((v, i) => [PAD + i * xStep, H - PAD - ((v - min) / range) * (H - PAD * 2)]);
  const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
  const diff = vals[vals.length - 1] - vals[0];
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.3rem' }}>
        <span style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 200, color: '#EDEDE8', letterSpacing: '-0.03em' }}>{vals[vals.length - 1]}{unit}</span>
        <span style={{ ...mono, fontSize: '0.4rem', color: diff > 0 ? AMBER : GREEN }}>{diff > 0 ? '+' : ''}{diff.toFixed(1)}{unit}</span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: '52px' }}>
        <path d={d} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
        {pts.map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r="2.5" fill={color} />)}
      </svg>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ ...mono, fontSize: '0.36rem', color: GHOST }}>{data[0]?.label}</span>
        <span style={{ ...mono, fontSize: '0.36rem', color: GHOST }}>{data[data.length - 1]?.label}</span>
      </div>
    </div>
  );
}

// ── OVERVIEW ──────────────────────────────────────────────────────────────────
function OverviewTab({ intake, workouts, metrics, program }) {
  const lastWorkout = workouts[0];
  const lastMetric  = metrics[0];
  const streak = (() => {
    if (!workouts.length) return 0;
    let s = 0, prev = null;
    for (const w of [...workouts].reverse()) {
      const d = new Date(w.logged_at).toDateString();
      if (d !== prev) { s++; prev = d; }
    }
    return s;
  })();

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.8rem', marginBottom: '2rem' }}>
        {[
          { label: 'workouts logged', val: workouts.length },
          { label: 'session streak',  val: streak },
          { label: 'current weight',  val: lastMetric?.body_weight ? `${lastMetric.body_weight} lbs` : '—' },
        ].map((s, i) => (
          <div key={i} style={{ padding: '1rem', border: `1px solid ${BORDER}` }}>
            {sLabel(s.label)}
            <div style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 200, color: '#EDEDE8', letterSpacing: '-0.03em', lineHeight: 1 }}>{s.val}</div>
          </div>
        ))}
      </div>

      {program && (
        <div style={{ marginBottom: '2rem', padding: '1.2rem', border: `1px solid ${BORDER}` }}>
          {sLabel('your program')}
          <div style={{ fontSize: 'clamp(1rem, 1.8vw, 1.4rem)', fontWeight: 200, letterSpacing: '-0.02em', marginBottom: '0.3rem' }}>{program.name}</div>
          <div style={{ ...mono, fontSize: '0.42rem', color: GHOST, marginBottom: '0.8rem' }}>{program.split} · {program.goal} · {program.scheme.sets} sets × {program.scheme.reps} reps</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {program.days.map((d, i) => (
              <div key={i} style={{ padding: '0.6rem 0', borderTop: `1px solid ${BORDER}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ ...mono, fontSize: '0.4rem', color: '#EDEDE8', letterSpacing: '0.08em' }}>{d.label}</span>
                  <span style={{ ...mono, fontSize: '0.38rem', color: GHOST, marginLeft: '0.8rem' }}>{d.focus}</span>
                </div>
                <span style={{ ...mono, fontSize: '0.36rem', color: GHOST }}>{d.exercises.length} exercises</span>
              </div>
            ))}
          </div>
          {program.flagged.length > 0 && (
            <div style={{ marginTop: '1rem', padding: '0.7rem', border: `1px solid ${RED}`, display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
              <span style={{ ...mono, fontSize: '0.44rem', color: RED, flexShrink: 0 }}>⚠</span>
              <span style={{ fontSize: 'clamp(0.62rem, 0.88vw, 0.74rem)', color: DIM, lineHeight: 1.6 }}>
                flagged based on injury notes: <span style={{ color: RED }}>{program.flagged.join(', ')}</span>. modify or skip as needed.
              </span>
            </div>
          )}
        </div>
      )}

      {intake && (
        <div style={{ marginBottom: '2rem' }}>
          {sLabel('your baseline')}
          {[
            ['goal',         intake.goal],
            ['experience',   intake.experience],
            ['days / week',  intake.days_per_week],
            ['start weight', intake.weight_lbs ? `${intake.weight_lbs} lbs` : '—'],
            ['injuries',     intake.injuries || 'none noted'],
          ].map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.65rem 0', borderBottom: `1px solid ${BORDER}` }}>
              <span style={{ ...mono, fontSize: '0.42rem', color: GHOST }}>{k}</span>
              <span style={{ fontSize: 'clamp(0.7rem, 1vw, 0.82rem)', color: '#EDEDE8' }}>{v || '—'}</span>
            </div>
          ))}
        </div>
      )}

      {lastWorkout && (
        <div>
          {sLabel('last session')}
          <div style={{ padding: '1rem', border: `1px solid ${BORDER}` }}>
            <div style={{ ...mono, fontSize: '0.38rem', color: GHOST, marginBottom: '0.7rem' }}>
              {new Date(lastWorkout.logged_at).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            </div>
            {lastWorkout.exercises.map((ex, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0', borderBottom: '1px solid #0a0a0a' }}>
                <span style={{ fontSize: 'clamp(0.7rem, 1vw, 0.82rem)', color: '#EDEDE8' }}>{ex.name}</span>
                <span style={{ ...mono, fontSize: '0.4rem', color: DIM }}>{ex.sets.length} × {ex.sets[0]?.reps} reps</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── LOG WORKOUT ────────────────────────────────────────────────────────────────
function LogTab({ program, onSaved }) {
  const [selectedDay, setSelectedDay] = useState(null);
  const [exercises, setExercises]     = useState([]);
  const [search, setSearch]           = useState('');
  const [notes, setNotes]             = useState('');
  const [saving, setSaving]           = useState(false);
  const [saved, setSaved]             = useState(false);

  function loadDay(day) {
    setSelectedDay(day.label);
    setExercises(day.exercises.map(ex => ({
      name: ex.name,
      flagged: ex.flagged,
      sets: Array.from({ length: ex.sets }, () => ({ weight: '', reps: ex.reps.split('–')[0] })),
    })));
  }

  function addCustomExercise(name) {
    if (exercises.find(e => e.name === name)) return;
    setExercises(prev => [...prev, { name, flagged: false, sets: [{ weight: '', reps: '' }] }]);
    setSearch('');
  }

  function addSet(ei) {
    setExercises(prev => prev.map((ex, i) =>
      i === ei ? { ...ex, sets: [...ex.sets, { weight: '', reps: ex.sets[0]?.reps || '' }] } : ex
    ));
  }

  function removeSet(ei, si) {
    setExercises(prev => prev.map((ex, i) =>
      i === ei ? { ...ex, sets: ex.sets.filter((_, j) => j !== si) } : ex
    ));
  }

  function updateSet(ei, si, key, val) {
    setExercises(prev => prev.map((ex, i) =>
      i === ei ? { ...ex, sets: ex.sets.map((s, j) => j === si ? { ...s, [key]: val } : s) } : ex
    ));
  }

  function removeExercise(ei) {
    setExercises(prev => prev.filter((_, i) => i !== ei));
  }

  async function save() {
    if (!exercises.length) return;
    setSaving(true);
    try {
      const payload = exercises.map(ex => ({
        name: ex.name,
        sets: ex.sets.filter(s => s.weight || s.reps).map(s => ({
          weight: parseFloat(s.weight) || 0,
          reps:   parseInt(s.reps)    || 0,
        })),
      })).filter(ex => ex.sets.length);

      await fetch('/api/coaching/workouts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: SLUG, exercises: payload, notes }),
      });
      setSaved(true);
      setExercises([]);
      setSelectedDay(null);
      setNotes('');
      onSaved();
      setTimeout(() => setSaved(false), 3000);
    } catch (e) { console.error(e); }
    setSaving(false);
  }

  const filtered = search.length > 0
    ? ALL_EXERCISES.filter(e => e.includes(search.toLowerCase()) && !exercises.find(ex => ex.name === e))
    : [];

  return (
    <div>
      {saved && (
        <div style={{ padding: '0.8rem', border: `1px solid ${GREEN}`, marginBottom: '1.5rem', ...mono, fontSize: '0.44rem', color: GREEN }}>
          workout saved.
        </div>
      )}

      {program && !selectedDay && (
        <div style={{ marginBottom: '2rem' }}>
          {sLabel('start from your program')}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {program.days.map((d, i) => (
              <button key={i} onClick={() => loadDay(d)}
                style={{ padding: '0.9rem 1rem', background: 'none', border: `1px solid ${BORDER}`, cursor: 'pointer', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ ...mono, fontSize: '0.44rem', color: '#EDEDE8', letterSpacing: '0.08em', marginBottom: '0.2rem' }}>{d.label}</div>
                  <div style={{ ...mono, fontSize: '0.38rem', color: GHOST }}>{d.focus}</div>
                </div>
                <span style={{ ...mono, fontSize: '0.38rem', color: GHOST }}>{d.exercises.length} exercises →</span>
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1.2rem 0' }}>
            <div style={{ flex: 1, height: '1px', background: BORDER }} />
            <span style={{ ...mono, fontSize: '0.38rem', color: GHOST }}>or start blank</span>
            <div style={{ flex: 1, height: '1px', background: BORDER }} />
          </div>
        </div>
      )}

      {selectedDay && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.2rem' }}>
          <span style={{ ...mono, fontSize: '0.44rem', color: GREEN }}>{selectedDay}</span>
          <button onClick={() => { setSelectedDay(null); setExercises([]); }}
            style={{ ...mono, fontSize: '0.38rem', color: GHOST, background: 'none', border: 'none', cursor: 'pointer' }}>
            clear ✕
          </button>
        </div>
      )}

      {exercises.map((ex, ei) => (
        <div key={ei} style={{ marginBottom: '1rem', border: `1px solid ${ex.flagged ? RED : BORDER}`, padding: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.7rem' }}>
            <div>
              <span style={{ fontSize: 'clamp(0.78rem, 1.1vw, 0.9rem)', color: '#EDEDE8' }}>{ex.name}</span>
              {ex.flagged && <span style={{ ...mono, fontSize: '0.36rem', color: RED, marginLeft: '0.6rem' }}>⚠ check injury</span>}
            </div>
            <button onClick={() => removeExercise(ei)} style={{ background: 'none', border: 'none', color: GHOST, cursor: 'pointer', ...mono, fontSize: '0.5rem' }}>✕</button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2rem 1fr 1fr 1.5rem', gap: '0.35rem', marginBottom: '0.4rem' }}>
            <span style={{ ...mono, fontSize: '0.36rem', color: GHOST }}>set</span>
            <span style={{ ...mono, fontSize: '0.36rem', color: GHOST }}>lbs</span>
            <span style={{ ...mono, fontSize: '0.36rem', color: GHOST }}>reps</span>
            <span />
          </div>

          {ex.sets.map((s, si) => (
            <div key={si} style={{ display: 'grid', gridTemplateColumns: '2rem 1fr 1fr 1.5rem', gap: '0.35rem', marginBottom: '0.25rem', alignItems: 'center' }}>
              <span style={{ ...mono, fontSize: '0.42rem', color: GHOST, textAlign: 'center' }}>{si + 1}</span>
              <input type="number" placeholder="135" value={s.weight} onChange={e => updateSet(ei, si, 'weight', e.target.value)} style={{ ...inputSt, padding: '0.45rem 0.6rem' }} />
              <input type="number" placeholder={s.reps || '8'} value={s.reps} onChange={e => updateSet(ei, si, 'reps', e.target.value)} style={{ ...inputSt, padding: '0.45rem 0.6rem' }} />
              <button onClick={() => removeSet(ei, si)} style={{ background: 'none', border: 'none', color: GHOST, cursor: 'pointer', ...mono, fontSize: '0.48rem', textAlign: 'center' }}>✕</button>
            </div>
          ))}
          <button onClick={() => addSet(ei)} style={{ marginTop: '0.4rem', background: 'none', border: `1px solid ${BORDER}`, color: GHOST, ...mono, fontSize: '0.38rem', letterSpacing: '0.1em', padding: '0.35rem 0.7rem', cursor: 'pointer' }}>
            + set
          </button>
        </div>
      ))}

      <div style={{ marginBottom: exercises.length > 0 ? '1rem' : 0 }}>
        {sLabel('add exercise')}
        <input style={inputSt} placeholder="search exercises..." value={search} onChange={e => setSearch(e.target.value)} />
        {filtered.length > 0 && (
          <div style={{ border: `1px solid ${BORDER}`, borderTop: 'none' }}>
            {filtered.slice(0, 5).map(ex => (
              <button key={ex} onClick={() => addCustomExercise(ex)}
                style={{ display: 'block', width: '100%', background: 'none', border: 'none', borderBottom: `1px solid ${BORDER}`, padding: '0.6rem 0.75rem', color: '#EDEDE8', fontFamily: 'Inter, sans-serif', fontSize: 'clamp(0.7rem, 1vw, 0.82rem)', fontWeight: 300, textAlign: 'left', cursor: 'pointer' }}>
                {ex}
              </button>
            ))}
          </div>
        )}
      </div>

      {exercises.length > 0 && (
        <>
          <div style={{ marginBottom: '1rem', marginTop: '0.5rem' }}>
            {sLabel('session notes')}
            <textarea style={{ ...inputSt, resize: 'vertical' }} rows={2} placeholder="felt strong, PR, etc." value={notes} onChange={e => setNotes(e.target.value)} />
          </div>
          <button onClick={save} disabled={saving}
            style={{ width: '100%', padding: '1rem', background: 'none', border: '1px solid #EDEDE8', color: '#EDEDE8', fontFamily: 'Inter, sans-serif', fontSize: 'clamp(0.8rem, 1.2vw, 0.92rem)', fontWeight: 300, cursor: saving ? 'default' : 'pointer', opacity: saving ? 0.5 : 1 }}>
            {saving ? 'saving...' : 'save workout →'}
          </button>
        </>
      )}
    </div>
  );
}

// ── PROGRESS ──────────────────────────────────────────────────────────────────
function ProgressTab({ intake, workouts, metrics }) {
  const weightData = [...metrics].reverse().slice(-20).map(m => ({
    y: parseFloat(m.body_weight), label: new Date(m.logged_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
  })).filter(d => !isNaN(d.y));

  // seed starting lifts from intake as baseline if exists
  const intakeLifts = intake?.starting_lifts || {};

  const prs = { ...Object.fromEntries(Object.entries(intakeLifts).filter(([,v]) => v).map(([k, v]) => [
    k === 'ohp' ? 'overhead press' : k === 'row' ? 'barbell row' : k === 'bench' ? 'bench press' : k,
    { weight: parseFloat(v), reps: 5, date: intake?.submitted_at, isBaseline: true },
  ])) };

  for (const w of workouts) {
    for (const ex of w.exercises) {
      for (const s of ex.sets) {
        if (!prs[ex.name] || s.weight > prs[ex.name].weight) {
          prs[ex.name] = { weight: s.weight, reps: s.reps, date: w.logged_at, isBaseline: false };
        }
      }
    }
  }

  const liftHistory = (name) => {
    const data = [];
    const intakeKey = { 'overhead press': 'ohp', 'barbell row': 'row', 'bench press': 'bench' }[name] || name;
    if (intakeLifts[intakeKey]) data.push({
      y: parseFloat(intakeLifts[intakeKey]),
      label: 'baseline',
    });
    for (const w of [...workouts].reverse()) {
      const ex = w.exercises.find(e => e.name === name);
      if (!ex) continue;
      const best = ex.sets.reduce((b, s) => s.weight > b ? s.weight : b, 0);
      if (best > 0) data.push({ y: best, label: new Date(w.logged_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) });
    }
    return data;
  };

  const mainLifts = ['squat', 'bench press', 'deadlift', 'overhead press'];

  return (
    <div>
      <div style={{ marginBottom: '2.5rem', padding: '1.2rem', border: `1px solid ${BORDER}` }}>
        {sLabel('body weight')}
        <LineChart data={weightData} color={AMBER} unit=" lbs" />
      </div>

      {sLabel('pr board')}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', marginBottom: '2rem' }}>
        {mainLifts.map(name => {
          const pr = prs[name];
          return (
            <div key={name} style={{ padding: '1rem', border: `1px solid ${BORDER}` }}>
              <div style={{ ...mono, fontSize: '0.36rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: GHOST, marginBottom: '0.4rem' }}>{name}</div>
              {pr ? (
                <>
                  <div style={{ fontSize: 'clamp(1.2rem, 2vw, 1.6rem)', fontWeight: 200, color: '#EDEDE8', letterSpacing: '-0.02em', lineHeight: 1 }}>{pr.weight} lbs</div>
                  <div style={{ ...mono, fontSize: '0.36rem', color: GHOST, marginTop: '0.25rem' }}>
                    {pr.reps} reps · {pr.isBaseline ? 'intake baseline' : new Date(pr.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                </>
              ) : (
                <div style={{ ...mono, fontSize: '0.4rem', color: GHOST }}>not logged</div>
              )}
            </div>
          );
        })}
      </div>

      {sLabel('strength trends')}
      {mainLifts.map(name => {
        const data = liftHistory(name);
        if (data.length < 2) return null;
        return (
          <div key={name} style={{ padding: '1.2rem', border: `1px solid ${BORDER}`, marginBottom: '0.8rem' }}>
            <div style={{ ...mono, fontSize: '0.36rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: GHOST, marginBottom: '0.6rem' }}>{name}</div>
            <LineChart data={data} color={GREEN} unit=" lbs" />
          </div>
        );
      })}
    </div>
  );
}

// ── HISTORY ───────────────────────────────────────────────────────────────────
function HistoryTab({ workouts }) {
  const [expanded, setExpanded] = useState(null);
  if (!workouts.length) return (
    <div style={{ padding: '2rem', border: `1px solid ${BORDER}`, textAlign: 'center' }}>
      <span style={{ ...mono, fontSize: '0.44rem', color: GHOST }}>no workouts logged yet.</span>
    </div>
  );
  return (
    <div>
      {workouts.map((w, i) => (
        <div key={w.id} style={{ borderBottom: `1px solid ${BORDER}` }}>
          <button onClick={() => setExpanded(expanded === i ? null : i)}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', background: 'none', border: 'none', padding: '0.9rem 0', cursor: 'pointer', textAlign: 'left' }}>
            <div>
              <div style={{ fontSize: 'clamp(0.72rem, 1.05vw, 0.85rem)', color: '#EDEDE8', fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
                {new Date(w.logged_at).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
              </div>
              <div style={{ ...mono, fontSize: '0.36rem', color: GHOST, marginTop: '0.2rem' }}>{w.exercises.map(e => e.name).join(' · ')}</div>
            </div>
            <span style={{ ...mono, fontSize: '0.5rem', color: GHOST }}>{expanded === i ? '↑' : '↓'}</span>
          </button>
          {expanded === i && (
            <div style={{ paddingBottom: '1rem' }}>
              {w.exercises.map((ex, ei) => (
                <div key={ei} style={{ marginBottom: '0.8rem' }}>
                  <div style={{ ...mono, fontSize: '0.38rem', color: GREEN, letterSpacing: '0.1em', marginBottom: '0.3rem' }}>{ex.name}</div>
                  {ex.sets.map((s, si) => (
                    <div key={si} style={{ display: 'flex', gap: '1rem', padding: '0.2rem 0', borderBottom: '1px solid #0a0a0a' }}>
                      <span style={{ ...mono, fontSize: '0.36rem', color: GHOST, width: '2rem' }}>s{si + 1}</span>
                      <span style={{ fontSize: 'clamp(0.68rem, 0.95vw, 0.78rem)', color: '#EDEDE8' }}>{s.weight} lbs × {s.reps} reps</span>
                    </div>
                  ))}
                </div>
              ))}
              {w.notes && <p style={{ fontSize: 'clamp(0.64rem, 0.9vw, 0.74rem)', color: GHOST, fontStyle: 'italic', marginTop: '0.5rem' }}>{w.notes}</p>}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ── CHECK-IN ──────────────────────────────────────────────────────────────────
function CheckInTab({ intake, metrics, onSaved }) {
  const questions = getCheckInQuestions(intake?.goal || 'muscle gain');
  const [answers, setAnswers]   = useState({});
  const [weight, setWeight]     = useState('');
  const [waist, setWaist]       = useState('');
  const [saving, setSaving]     = useState(false);
  const [saved, setSaved]       = useState(false);

  const lastMetric = metrics[0];

  async function save() {
    setSaving(true);
    try {
      if (weight || waist) {
        await fetch('/api/coaching/metrics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            slug: SLUG,
            body_weight: parseFloat(weight) || null,
            waist: parseFloat(waist) || null,
            notes: Object.entries(answers).map(([id, v]) => {
              const q = questions.find(q => q.id === id);
              return q ? `${q.text}: ${v}` : '';
            }).filter(Boolean).join('\n'),
          }),
        });
      }
      setSaved(true);
      setAnswers({});
      setWeight('');
      setWaist('');
      onSaved();
      setTimeout(() => setSaved(false), 3000);
    } catch (e) { console.error(e); }
    setSaving(false);
  }

  return (
    <div>
      {saved && (
        <div style={{ padding: '0.8rem', border: `1px solid ${GREEN}`, marginBottom: '1.5rem', ...mono, fontSize: '0.44rem', color: GREEN }}>logged.</div>
      )}

      {lastMetric && (
        <div style={{ padding: '0.8rem 1rem', border: `1px solid ${BORDER}`, marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ ...mono, fontSize: '0.4rem', color: GHOST }}>last logged</span>
          <span style={{ fontSize: 'clamp(0.7rem, 1vw, 0.82rem)', color: '#EDEDE8' }}>
            {lastMetric.body_weight} lbs · {new Date(lastMetric.logged_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </span>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', marginBottom: '1.5rem' }}>
        <div>
          {sLabel('body weight (lbs)')}
          <input style={inputSt} type="number" placeholder={lastMetric?.body_weight || '175'} value={weight} onChange={e => setWeight(e.target.value)} />
        </div>
        <div>
          {sLabel('waist (in)')}
          <input style={inputSt} type="number" placeholder={lastMetric?.waist || '32'} value={waist} onChange={e => setWaist(e.target.value)} />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '1.5rem' }}>
        {questions.map(q => (
          <div key={q.id} style={{ borderBottom: `1px solid ${BORDER}`, paddingBottom: '1rem' }}>
            <p style={{ fontSize: 'clamp(0.72rem, 1.05vw, 0.85rem)', color: '#EDEDE8', lineHeight: 1.6, marginBottom: '0.6rem' }}>{q.text}</p>
            {q.type === 'yesno' && (
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {['yes', 'no'].map(opt => (
                  <button key={opt} onClick={() => setAnswers(p => ({ ...p, [q.id]: opt }))}
                    style={{ padding: '0.4rem 1rem', background: answers[q.id] === opt ? '#EDEDE8' : 'transparent', border: `1px solid ${answers[q.id] === opt ? '#EDEDE8' : BORDER}`, color: answers[q.id] === opt ? '#000' : GHOST, ...mono, fontSize: '0.42rem', cursor: 'pointer' }}>
                    {opt}
                  </button>
                ))}
              </div>
            )}
            {q.type === 'slider' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <input type="range" min="1" max="10" value={answers[q.id] || 5} onChange={e => setAnswers(p => ({ ...p, [q.id]: e.target.value }))} style={{ flex: 1, accentColor: GREEN }} />
                <span style={{ ...mono, fontSize: '0.5rem', color: '#EDEDE8', minWidth: '1.2rem' }}>{answers[q.id] || 5}</span>
              </div>
            )}
            {q.type === 'text' && (
              <textarea rows={2} value={answers[q.id] || ''} onChange={e => setAnswers(p => ({ ...p, [q.id]: e.target.value }))}
                placeholder="type here..."
                style={{ ...inputSt, resize: 'vertical' }} />
            )}
          </div>
        ))}
      </div>

      <button onClick={save} disabled={saving}
        style={{ width: '100%', padding: '1rem', background: 'none', border: '1px solid #EDEDE8', color: '#EDEDE8', fontFamily: 'Inter, sans-serif', fontSize: 'clamp(0.8rem, 1.2vw, 0.92rem)', fontWeight: 300, cursor: saving ? 'default' : 'pointer', opacity: saving ? 0.5 : 1 }}>
        {saving ? 'saving...' : 'log check-in →'}
      </button>
    </div>
  );
}

// ── PAGE ──────────────────────────────────────────────────────────────────────
const TABS = ['overview', 'log workout', 'progress', 'history', 'check-in'];

export default function ChristianPortal() {
  const [tab,      setTab]      = useState('overview');
  const [intake,   setIntake]   = useState(null);
  const [workouts, setWorkouts] = useState([]);
  const [metrics,  setMetrics]  = useState([]);
  const [loading,  setLoading]  = useState(true);

  const fetchAll = useCallback(async () => {
    const [clientRes, wRes, mRes] = await Promise.all([
      fetch(`/api/coaching/client/${SLUG}`),
      fetch(`/api/coaching/workouts/${SLUG}`),
      fetch(`/api/coaching/metrics/${SLUG}`),
    ]);
    const { intake: i }    = await clientRes.json();
    const { workouts: w }  = await wRes.json();
    const { metrics: m }   = await mRes.json();
    setIntake(i || null);
    setWorkouts(w || []);
    setMetrics(m || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const program = generateProgram(intake);

  if (loading) return (
    <div style={{ background: '#000', minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ ...mono, fontSize: '0.44rem', color: GHOST, letterSpacing: '0.2em' }}>loading...</span>
    </div>
  );

  return (
    <div style={{ background: '#000', minHeight: '100dvh', fontFamily: 'Inter, sans-serif', fontWeight: 300, color: '#EDEDE8', maxWidth: '640px', margin: '0 auto', paddingBottom: '4rem' }}>
      <header style={{ padding: '1.1rem 1.4rem', borderBottom: `1px solid ${BORDER}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, background: '#000', zIndex: 10 }}>
        <span style={{ ...mono, fontSize: '0.52rem', letterSpacing: '0.3em', color: GHOST }}>vveritas*</span>
        <span style={{ ...mono, fontSize: '0.44rem', color: GHOST }}>christian</span>
      </header>

      <div style={{ padding: '2rem 1.4rem 1.2rem' }}>
        <h1 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 200, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '0.3rem' }}>your portal.</h1>
        <p style={{ fontSize: 'clamp(0.66rem, 0.95vw, 0.78rem)', color: GHOST }}>
          {program ? `${program.name} · ${program.goal}` : 'complete intake to generate your program'} · {workouts.length} sessions
        </p>
      </div>

      <nav style={{ display: 'flex', overflowX: 'auto', scrollbarWidth: 'none', borderBottom: `1px solid ${BORDER}`, padding: '0 1rem', position: 'sticky', top: '46px', background: '#000', zIndex: 9 }}>
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)}
            style={{ padding: '0.75rem 0.9rem', background: 'none', border: 'none', borderBottom: `2px solid ${t === tab ? '#EDEDE8' : 'transparent'}`, color: t === tab ? '#EDEDE8' : GHOST, ...mono, fontSize: '0.44rem', letterSpacing: '0.1em', cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0, transition: 'color 0.15s' }}>
            {t}
          </button>
        ))}
      </nav>

      <div style={{ padding: '1.5rem 1.4rem' }}>
        {tab === 'overview'    && <OverviewTab intake={intake} workouts={workouts} metrics={metrics} program={program} />}
        {tab === 'log workout' && <LogTab program={program} onSaved={fetchAll} />}
        {tab === 'progress'    && <ProgressTab intake={intake} workouts={workouts} metrics={metrics} />}
        {tab === 'history'     && <HistoryTab workouts={workouts} />}
        {tab === 'check-in'    && <CheckInTab intake={intake} metrics={metrics} onSaved={fetchAll} />}
      </div>
    </div>
  );
}
