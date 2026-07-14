'use client';
import { useState } from 'react';

const SECTIONS = [
  {
    label: '01 — about you',
    fields: [
      { id: 'name',       q: 'full name',                           type: 'text',     ph: 'your name' },
      { id: 'age',        q: 'age',                                  type: 'number',   ph: '—' },
      { id: 'weight',     q: 'current weight (lbs)',                  type: 'number',   ph: '221' },
      { id: 'height',     q: 'height',                               type: 'text',     ph: '5\'11"' },
      { id: 'goalWeight', q: 'goal weight (lbs)',                     type: 'number',   ph: '195', optional: true },
    ],
  },
  {
    label: '02 — goals',
    fields: [
      { id: 'mainGoal',   q: 'main goal right now',                  type: 'select',   opts: ['build muscle', 'lose body fat', 'reduce waist size', 'improve strength', 'improve overall health', 'build consistency'] },
      { id: 'focusArea',  q: 'where do you most want to see change?', type: 'text',     ph: 'stomach, arms, overall...' },
      { id: 'blockers',   q: 'what has stopped you before?',          type: 'textarea', ph: 'be honest.' },
    ],
  },
  {
    label: '03 — training',
    fields: [
      { id: 'trainingDays',  q: 'how many days per week can you train?',         type: 'select',   opts: ['2 days', '3 days', '4 days', '5 days', '6 days'] },
      { id: 'experience',    q: 'experience level',                               type: 'select',   opts: ['beginner', 'some experience', 'experienced', 'very experienced'] },
      { id: 'inPersonTime',  q: 'best day and time for in-person session',         type: 'text',     ph: 'wednesday at 6pm' },
      { id: 'backupTime',    q: 'backup day and time',                             type: 'text',     ph: 'thursday evening' },
      { id: 'injuries',      q: 'any injuries, pain, or limitations?',             type: 'textarea', ph: 'none / describe...' },
    ],
  },
  {
    label: '04 — nutrition',
    fields: [
      { id: 'typicalDay',       q: 'describe what you normally eat on a typical day', type: 'textarea', ph: 'breakfast, lunch, dinner, snacks...' },
      { id: 'nutritionStruggle', q: 'biggest nutrition struggle',                     type: 'select',   opts: ['skipping meals', 'not enough protein', 'eating out too often', 'snacking / cravings', 'late-night eating', 'inconsistent groceries', 'overeating', 'other'] },
      { id: 'restrictions',     q: 'allergies or foods you won\'t eat',              type: 'text',     ph: 'none / list them...' },
    ],
  },
  {
    label: '05 — schedule and life',
    fields: [
      { id: 'workSchedule', q: 'typical work schedule',                        type: 'text',   ph: '9–5 mon–fri / shift work / variable...' },
      { id: 'sleep',        q: 'average sleep per night',                       type: 'select', opts: ['less than 5 hours', '5–6 hours', '6–7 hours', '7–8 hours', '8+ hours'] },
      { id: 'stress',       q: 'current stress level (1–10)',                   type: 'select', opts: ['1 — very low', '2', '3', '4', '5 — moderate', '6', '7', '8', '9', '10 — very high'] },
      { id: 'obligations',  q: 'anything that may affect your consistency?',    type: 'text',   ph: 'travel, family, irregular schedule...' },
    ],
  },
  {
    label: '06 — accountability',
    fields: [
      { id: 'coachingStyle', q: 'coaching style that works best for you', type: 'select',   opts: ['direct and firm', 'encouraging', 'balanced', 'highly structured'] },
      { id: 'fallOff',       q: 'what usually makes you fall off track?',  type: 'textarea', ph: 'busy schedule, low motivation, travel...' },
    ],
  },
];

function Field({ f, value, onChange }) {
  const labelStyle = {
    display: 'block',
    fontFamily: 'ui-monospace, monospace',
    fontSize: '0.52rem',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: '#3A3A3A',
    marginBottom: '0.75rem',
  };
  const sharedInput = {
    background: 'none',
    border: 'none',
    borderBottom: '1px solid #1a1a1a',
    color: '#EDEDE8',
    fontFamily: 'Inter, -apple-system, sans-serif',
    fontWeight: 300,
    fontSize: 'clamp(0.9rem, 1.4vw, 1rem)',
    padding: '0.5rem 0',
    width: '100%',
    outline: 'none',
  };

  if (f.type === 'select') {
    return (
      <div>
        <label style={labelStyle}>{f.q}{f.optional && <span style={{ color: '#2a2a2a', marginLeft: '0.5em' }}>optional</span>}</label>
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          className="vin-select"
          style={{ ...sharedInput, cursor: 'pointer' }}
        >
          <option value="" disabled>—</option>
          {f.opts.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>
    );
  }
  if (f.type === 'textarea') {
    return (
      <div>
        <label style={labelStyle}>{f.q}</label>
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={f.ph}
          rows={3}
          className="vin-input"
          style={{ ...sharedInput, resize: 'vertical', lineHeight: 1.7 }}
        />
      </div>
    );
  }
  return (
    <div>
      <label style={labelStyle}>{f.q}{f.optional && <span style={{ color: '#2a2a2a', marginLeft: '0.5em' }}>optional</span>}</label>
      <input
        type={f.type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={f.ph}
        className="vin-input"
        style={sharedInput}
      />
    </div>
  );
}

export default function IntakePage() {
  const [step, setStep] = useState(-1);
  const [form, setForm] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  function set(id, val) { setForm(f => ({ ...f, [id]: val })); }

  async function submit() {
    setSubmitting(true);
    try {
      await fetch('/api/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    } catch (_) {}
    setDone(true);
    setSubmitting(false);
  }

  const section = step >= 0 && step < SECTIONS.length ? SECTIONS[step] : null;
  const pct = step < 0 ? 0 : Math.round(((step + 1) / SECTIONS.length) * 100);

  const page = {
    background: '#000',
    minHeight: '100dvh',
    fontFamily: 'Inter, -apple-system, sans-serif',
    fontWeight: 300,
    color: '#EDEDE8',
    display: 'flex',
    flexDirection: 'column',
  };
  const inner = {
    width: '100%',
    maxWidth: '520px',
    margin: '0 auto',
    padding: '0 1.5rem 5rem',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  };

  // ── welcome ────────────────────────────────────────────────────────────────
  if (step === -1) {
    return (
      <div style={{ ...page, justifyContent: 'center', alignItems: 'center', padding: '3rem 1.5rem' }}>
        <div style={{ maxWidth: '420px', width: '100%' }}>
          <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.52rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#3A3A3A', marginBottom: '2rem' }}>vveritas* coaching</div>
          <h1 style={{ fontSize: 'clamp(2rem, 6vw, 3rem)', fontWeight: 200, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '1.5rem' }}>before we build<br />your plan.</h1>
          <p style={{ fontSize: 'clamp(0.82rem, 1.3vw, 0.95rem)', color: '#5A5A5A', lineHeight: 1.75, marginBottom: '0.8rem' }}>
            this gives me what i need to build your personalized training, nutrition, and accountability system.
          </p>
          <p style={{ fontSize: 'clamp(0.78rem, 1.2vw, 0.88rem)', color: '#3A3A3A', marginBottom: '3rem' }}>be honest and specific. takes about 8–12 minutes.</p>
          <button
            onClick={() => setStep(0)}
            style={{ background: '#EDEDE8', border: 'none', color: '#000', fontFamily: 'Inter, -apple-system, sans-serif', fontWeight: 300, fontSize: '0.95rem', padding: '1rem 2.5rem', cursor: 'pointer', letterSpacing: '0.01em' }}
          >
            build my plan →
          </button>
        </div>
      </div>
    );
  }

  // ── done ──────────────────────────────────────────────────────────────────
  if (done) {
    return (
      <div style={{ ...page, justifyContent: 'center', alignItems: 'center', padding: '3rem 1.5rem' }}>
        <div style={{ maxWidth: '420px', width: '100%' }}>
          <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.52rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#3A3A3A', marginBottom: '2rem' }}>vveritas* coaching</div>
          <h1 style={{ fontSize: 'clamp(2rem, 6vw, 3rem)', fontWeight: 200, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '1.5rem' }}>i have what<br />i need.</h1>
          <p style={{ fontSize: 'clamp(0.82rem, 1.3vw, 0.95rem)', color: '#5A5A5A', lineHeight: 1.75, marginBottom: '0.5rem' }}>
            i'll use your answers to build your training plan, nutrition structure, weekly schedule, and accountability system.
          </p>
          <p style={{ fontSize: 'clamp(0.78rem, 1.2vw, 0.88rem)', color: '#3A3A3A', lineHeight: 1.7 }}>
            your plan is built from your answers — not from a generic template. expect to hear from me shortly.
          </p>
          <div style={{ marginTop: '3rem', fontFamily: 'ui-monospace, monospace', fontSize: '0.5rem', letterSpacing: '0.25em', color: '#2a2a2a' }}>vveritas* — {new Date().getFullYear()}</div>
        </div>
      </div>
    );
  }

  // ── form sections ─────────────────────────────────────────────────────────
  return (
    <div style={page}>
      <div style={{ height: '2px', background: '#0a0a0a', flexShrink: 0 }}>
        <div style={{ height: '100%', width: `${pct}%`, background: '#EDEDE8', transition: 'width 0.4s ease' }} />
      </div>

      <div style={{ padding: '1.2rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
        <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.5rem', letterSpacing: '0.25em', color: '#3A3A3A' }}>vveritas* intake</span>
        <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.5rem', letterSpacing: '0.15em', color: '#3A3A3A' }}>{step + 1} of {SECTIONS.length}</span>
      </div>

      <div style={inner}>
        <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.5rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#3A3A3A', marginBottom: '2.5rem' }}>
          {section.label}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.2rem', flex: 1 }}>
          {section.fields.map(f => (
            <Field key={f.id} f={f} value={form[f.id] || ''} onChange={val => set(f.id, val)} />
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '3.5rem' }}>
          <button
            onClick={() => step > 0 ? setStep(step - 1) : setStep(-1)}
            style={{ background: 'none', border: 'none', color: '#3A3A3A', fontFamily: 'Inter, -apple-system, sans-serif', fontWeight: 300, fontSize: '0.85rem', cursor: 'pointer', padding: 0 }}
          >
            ← back
          </button>
          {step < SECTIONS.length - 1 ? (
            <button
              onClick={() => setStep(step + 1)}
              style={{ background: 'none', border: '1px solid #1a1a1a', color: '#EDEDE8', fontFamily: 'Inter, -apple-system, sans-serif', fontWeight: 300, fontSize: '0.85rem', padding: '0.75rem 1.75rem', cursor: 'pointer' }}
            >
              next →
            </button>
          ) : (
            <button
              onClick={submit}
              disabled={submitting}
              style={{ background: '#EDEDE8', border: 'none', color: '#000', fontFamily: 'Inter, -apple-system, sans-serif', fontWeight: 300, fontSize: '0.85rem', padding: '0.75rem 1.75rem', cursor: submitting ? 'default' : 'pointer', opacity: submitting ? 0.5 : 1 }}
            >
              {submitting ? 'sending...' : 'submit →'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
