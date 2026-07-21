'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const GHOST  = '#3A3A3A';
const DIM    = '#5A5A5A';
const BORDER = '#141414';
const GREEN  = '#4a8c6a';

const fieldLabel = (txt) => (
  <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.4rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: GHOST, marginBottom: '0.4rem' }}>{txt}</div>
);

const input = {
  width: '100%', background: 'transparent', border: `1px solid ${BORDER}`,
  color: '#EDEDE8', fontFamily: 'Inter, sans-serif', fontSize: 'clamp(0.78rem, 1.1vw, 0.88rem)',
  fontWeight: 300, padding: '0.75rem 0.8rem', outline: 'none',
  boxSizing: 'border-box', appearance: 'none', WebkitAppearance: 'none', borderRadius: 0,
};

const select = {
  ...input,
  cursor: 'pointer',
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%233A3A3A'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 0.8rem center',
  paddingRight: '2rem',
  colorScheme: 'dark',
};

const SECTIONS = [
  { id: 'basics',   label: 'about you' },
  { id: 'training', label: 'training' },
  { id: 'lifts',    label: 'starting lifts' },
  { id: 'notes',    label: 'anything else' },
];

const empty = {
  age: '', height: '', weight_lbs: '', goal: '', experience: '',
  days_per_week: '', current_program: '',
  starting_lifts: { squat: '', bench: '', deadlift: '', ohp: '', row: '' },
  injuries: '', notes: '',
};

export default function ChristianIntake() {
  const router  = useRouter();
  const [step, setStep]   = useState(0);
  const [form, setForm]   = useState(empty);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function set(key, val) { setForm(p => ({ ...p, [key]: val })); }
  function setLift(key, val) { setForm(p => ({ ...p, starting_lifts: { ...p.starting_lifts, [key]: val } })); }

  async function submit() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/coaching/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: 'christian', ...form }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'failed');
      router.push('/portal/christian');
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  }

  const section = SECTIONS[step];

  return (
    <div style={{ background: '#000', minHeight: '100dvh', fontFamily: 'Inter, sans-serif', fontWeight: 300, color: '#EDEDE8', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem 1.5rem' }}>
      <div style={{ width: '100%', maxWidth: '500px' }}>

        {/* header */}
        <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.48rem', letterSpacing: '0.3em', color: GHOST, marginBottom: '2.5rem' }}>vveritas*</div>
        <h1 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 200, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '0.4rem' }}>
          let&apos;s get your baseline.
        </h1>
        <p style={{ fontSize: 'clamp(0.68rem, 1vw, 0.8rem)', color: DIM, marginBottom: '2.5rem', lineHeight: 1.6 }}>
          christian. this is your starting point. be honest — the numbers are for tracking, not judging.
        </p>

        {/* progress dots */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
          {SECTIONS.map((s, i) => (
            <div key={s.id} style={{ flex: 1, height: '2px', background: i <= step ? '#EDEDE8' : BORDER, borderRadius: '1px', transition: 'background 0.3s' }} />
          ))}
        </div>

        <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.42rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: GHOST, marginBottom: '1.5rem' }}>
          {step + 1} / {SECTIONS.length} — {section.label}
        </div>

        {/* step 0 — basics */}
        {step === 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
              <div>
                {fieldLabel('age')}
                <input style={input} type="number" placeholder="25" value={form.age} onChange={e => set('age', e.target.value)} />
              </div>
              <div>
                {fieldLabel('height')}
                <input style={input} type="text" placeholder="5'10&quot;" value={form.height} onChange={e => set('height', e.target.value)} />
              </div>
            </div>
            <div>
              {fieldLabel('current weight (lbs)')}
              <input style={input} type="number" placeholder="175" value={form.weight_lbs} onChange={e => set('weight_lbs', e.target.value)} />
            </div>
            <div>
              {fieldLabel('main goal')}
              <select style={select} value={form.goal} onChange={e => set('goal', e.target.value)}>
                <option value="">select</option>
                <option value="muscle gain">build muscle</option>
                <option value="fat loss">lose body fat</option>
                <option value="recomposition">build muscle + lose fat</option>
                <option value="strength">get stronger</option>
                <option value="general fitness">general fitness</option>
              </select>
            </div>
          </div>
        )}

        {/* step 1 — training */}
        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div>
              {fieldLabel('training experience')}
              <select style={select} value={form.experience} onChange={e => set('experience', e.target.value)}>
                <option value="">select</option>
                <option value="beginner">beginner — under 1 year</option>
                <option value="intermediate">intermediate — 1–3 years</option>
                <option value="advanced">advanced — 3+ years</option>
              </select>
            </div>
            <div>
              {fieldLabel('days available per week')}
              <select style={select} value={form.days_per_week} onChange={e => set('days_per_week', e.target.value)}>
                <option value="">select</option>
                {[2,3,4,5,6].map(n => <option key={n} value={n}>{n} days</option>)}
              </select>
            </div>
            <div>
              {fieldLabel('current program (if any)')}
              <input style={input} type="text" placeholder="PPL, 5/3/1, nothing yet, etc." value={form.current_program} onChange={e => set('current_program', e.target.value)} />
            </div>
            <div>
              {fieldLabel('injuries or limitations')}
              <textarea style={{ ...input, resize: 'vertical' }} rows={2} placeholder="bad shoulder, knee issues, none, etc." value={form.injuries} onChange={e => set('injuries', e.target.value)} />
            </div>
          </div>
        )}

        {/* step 2 — starting lifts */}
        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <p style={{ fontSize: 'clamp(0.66rem, 0.95vw, 0.78rem)', color: GHOST, lineHeight: 1.6, borderLeft: `1px solid ${BORDER}`, paddingLeft: '0.8rem', marginBottom: '0.5rem', fontStyle: 'italic' }}>
              best working set weight for a clean set of 5. leave blank if unknown.
            </p>
            {[
              { key: 'squat',     label: 'squat (lbs)' },
              { key: 'bench',     label: 'bench press (lbs)' },
              { key: 'deadlift',  label: 'deadlift (lbs)' },
              { key: 'ohp',       label: 'overhead press (lbs)' },
              { key: 'row',       label: 'barbell row (lbs)' },
            ].map(({ key, label }) => (
              <div key={key}>
                {fieldLabel(label)}
                <input style={input} type="number" placeholder="—" value={form.starting_lifts[key]} onChange={e => setLift(key, e.target.value)} />
              </div>
            ))}
          </div>
        )}

        {/* step 3 — notes */}
        {step === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div>
              {fieldLabel('anything you want the coach to know')}
              <textarea style={{ ...input, resize: 'vertical' }} rows={5} placeholder="schedule, motivation, what hasn't worked before, what you're most focused on..." value={form.notes} onChange={e => set('notes', e.target.value)} />
            </div>
            <div style={{ padding: '1rem', border: `1px solid ${BORDER}` }}>
              <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.4rem', letterSpacing: '0.15em', color: GREEN, marginBottom: '0.5rem' }}>your summary</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                {[
                  ['goal', form.goal],
                  ['weight', form.weight_lbs ? `${form.weight_lbs} lbs` : '—'],
                  ['experience', form.experience],
                  ['days / week', form.days_per_week],
                  ['squat', form.starting_lifts.squat ? `${form.starting_lifts.squat} lbs` : '—'],
                  ['bench', form.starting_lifts.bench ? `${form.starting_lifts.bench} lbs` : '—'],
                  ['deadlift', form.starting_lifts.deadlift ? `${form.starting_lifts.deadlift} lbs` : '—'],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: `1px solid #0a0a0a`, padding: '0.3rem 0' }}>
                    <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.42rem', color: GHOST }}>{k}</span>
                    <span style={{ fontSize: 'clamp(0.66rem, 0.95vw, 0.78rem)', color: v && v !== '—' ? '#EDEDE8' : GHOST }}>{v || '—'}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {error && (
          <p style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.44rem', color: '#8c3a3a', marginTop: '1rem' }}>{error}</p>
        )}

        {/* nav */}
        <div style={{ display: 'grid', gridTemplateColumns: step > 0 ? '1fr 1fr' : '1fr', gap: '0.6rem', marginTop: '2rem' }}>
          {step > 0 && (
            <button onClick={() => setStep(s => s - 1)} style={{ padding: '0.85rem', background: 'none', border: `1px solid ${BORDER}`, color: DIM, fontFamily: 'inherit', fontSize: 'clamp(0.78rem, 1.1vw, 0.88rem)', cursor: 'pointer' }}>
              ← back
            </button>
          )}
          {step < SECTIONS.length - 1 ? (
            <button onClick={() => setStep(s => s + 1)} style={{ padding: '0.85rem', background: 'none', border: '1px solid #EDEDE8', color: '#EDEDE8', fontFamily: 'inherit', fontSize: 'clamp(0.78rem, 1.1vw, 0.88rem)', cursor: 'pointer' }}>
              next →
            </button>
          ) : (
            <button onClick={submit} disabled={loading} style={{ padding: '0.85rem', background: loading ? 'transparent' : 'none', border: '1px solid #EDEDE8', color: '#EDEDE8', fontFamily: 'inherit', fontSize: 'clamp(0.78rem, 1.1vw, 0.88rem)', cursor: loading ? 'default' : 'pointer', opacity: loading ? 0.5 : 1 }}>
              {loading ? 'saving...' : 'submit → go to my portal'}
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
