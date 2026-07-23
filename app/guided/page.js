'use client';
import { useState } from 'react';

const STRIPE = 'https://buy.stripe.com/3cI9AT4ea72y9y25mp6wE0q';

const GREEN  = '#4a8c6a';
const GHOST  = '#3A3A3A';
const DIM    = '#5A5A5A';
const BORDER = '#141414';

const included = [
  'custom 8-week training program — split, exercises, sets, reps, rest',
  'coaching notes on every movement',
  'personalized nutrition framework built around your schedule and goal',
  'weekly grocery lists — all 8 weeks built in advance',
  'meal structure — what to eat, when, and how much',
  'recovery protocol',
  'delivered within 5 days of intake',
];

const mono = (size = '0.44rem', color = GHOST) => ({
  fontFamily: 'ui-monospace, monospace',
  fontSize: size,
  letterSpacing: '0.25em',
  textTransform: 'uppercase',
  color,
});

const inputStyle = {
  width: '100%',
  background: 'transparent',
  border: `1px solid ${BORDER}`,
  color: '#EDEDE8',
  fontFamily: 'Inter, -apple-system, sans-serif',
  fontSize: 'clamp(0.78rem, 1.1vw, 0.88rem)',
  fontWeight: 300,
  padding: '0.75rem 0.8rem',
  outline: 'none',
  boxSizing: 'border-box',
  borderRadius: 0,
  appearance: 'none',
  WebkitAppearance: 'none',
};

const selectStyle = {
  ...inputStyle,
  cursor: 'pointer',
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%233A3A3A' stroke-width='1.2'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 0.8rem center',
  paddingRight: '2rem',
};

const textareaStyle = {
  ...inputStyle,
  resize: 'vertical',
  minHeight: '72px',
  lineHeight: 1.6,
};

function FieldLabel({ text }) {
  return (
    <div style={{ ...mono('0.4rem'), marginBottom: '0.4rem' }}>{text}</div>
  );
}

export default function GuidedPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    goal: '',
    trainingDays: '',
    trainingTime: '',
    experience: '',
    block: '',
    equipment: '',
  });
  const [status, setStatus] = useState('idle'); // idle | loading | done | error

  function update(key, val) {
    setForm(prev => ({ ...prev, [key]: val }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;

    window.open(STRIPE, '_blank');
    setStatus('loading');

    try {
      await fetch('/api/submit/guided', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setStatus('done');
    } catch {
      setStatus('done');
    }
  }

  if (status === 'done') {
    return (
      <main style={{ background: '#000', minHeight: '100dvh', fontFamily: 'Inter, -apple-system, sans-serif', fontWeight: 300, color: '#EDEDE8', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 2rem' }}>
        <div style={{ maxWidth: '480px', width: '100%' }}>
          <div style={{ ...mono('0.48rem', GREEN), marginBottom: '2rem' }}>intake received.</div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 200, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '1.2rem' }}>
            welcome, {form.name.split(' ')[0].toLowerCase()}.
          </h1>
          <p style={{ fontSize: 'clamp(0.72rem, 1.05vw, 0.85rem)', color: DIM, lineHeight: 1.8, marginBottom: '1.5rem' }}>
            your 8-week system is being built. you'll receive it within 5 days — training program, nutrition framework, grocery lists, recovery protocol. all of it.
          </p>
          <p style={{ fontSize: 'clamp(0.68rem, 0.95vw, 0.78rem)', color: GHOST, lineHeight: 1.7 }}>
            check your payment confirmation for the receipt. if you have any questions in the meantime, reach out at vveritascoaching@gmail.com.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main style={{ background: '#000', minHeight: '100dvh', fontFamily: 'Inter, -apple-system, sans-serif', fontWeight: 300, color: '#EDEDE8' }}>
      <div style={{ maxWidth: '580px', margin: '0 auto', padding: 'clamp(3rem, 6vw, 5rem) 1.5rem 5rem' }}>

        {/* header */}
        <div style={{ marginBottom: '3rem' }}>
          <div style={{ ...mono('0.44rem'), marginBottom: '2rem' }}>vveritas* coaching</div>
          <h1 style={{ fontSize: 'clamp(2.4rem, 7vw, 4.5rem)', fontWeight: 200, letterSpacing: '-0.04em', lineHeight: 1.0, marginBottom: '1rem' }}>
            guided.
          </h1>
          <p style={{ fontSize: 'clamp(0.85rem, 1.4vw, 1.05rem)', color: DIM, lineHeight: 1.7, maxWidth: '440px', marginBottom: '0.5rem' }}>
            you're not the problem. you know what needs to happen. you've just been doing it without a clear system behind you.
          </p>
          <p style={{ fontSize: 'clamp(0.78rem, 1.1vw, 0.9rem)', color: GHOST, lineHeight: 1.7, maxWidth: '440px' }}>
            this is 8 weeks of training, nutrition, and structure — built around your schedule and your goal. handed off once. you run it.
          </p>
        </div>

        {/* included */}
        <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: '2rem', marginBottom: '2.5rem' }}>
          <div style={{ ...mono(), marginBottom: '1rem' }}>what's included</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
            {included.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
                <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.48rem', color: GREEN, flexShrink: 0, marginTop: '0.28rem' }}>✓</span>
                <span style={{ fontSize: 'clamp(0.72rem, 1.05vw, 0.85rem)', color: '#EDEDE8', lineHeight: 1.6 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* not included */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ ...mono(), marginBottom: '1rem' }}>not included</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
            {['direct coach messaging', 'weekly reviews or adjustments', 'daily check-ins'].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
                <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.46rem', color: GHOST, flexShrink: 0, marginTop: '0.28rem' }}>—</span>
                <span style={{ fontSize: 'clamp(0.7rem, 1vw, 0.82rem)', color: DIM, lineHeight: 1.6 }}>{item}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 'clamp(0.66rem, 0.95vw, 0.78rem)', color: GHOST, lineHeight: 1.7, marginTop: '1rem', borderLeft: `1px solid ${BORDER}`, paddingLeft: '0.8rem' }}>
            if you need the accountability layer — that's full coaching. this is for people who are ready to execute. they just need the weeks mapped out.
          </p>
        </div>

        {/* price */}
        <div style={{ borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`, padding: '1.8rem 0', marginBottom: '3rem', display: 'flex', alignItems: 'baseline', gap: '1.2rem' }}>
          <span style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 200, letterSpacing: '-0.04em', lineHeight: 1 }}>$497</span>
          <span style={{ ...mono('0.42rem', DIM) }}>one-time · 8 weeks</span>
        </div>

        {/* form */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ ...mono(), marginBottom: '0.4rem' }}>intake</div>
          <p style={{ fontSize: 'clamp(0.68rem, 0.95vw, 0.78rem)', color: DIM, marginBottom: '2rem', lineHeight: 1.6 }}>
            fill this out. i'll build your 8 weeks around it.
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <FieldLabel text="full name" />
                <input
                  value={form.name}
                  onChange={e => update('name', e.target.value)}
                  placeholder="first and last"
                  required
                  style={inputStyle}
                />
              </div>
              <div>
                <FieldLabel text="email" />
                <input
                  type="email"
                  value={form.email}
                  onChange={e => update('email', e.target.value)}
                  placeholder="your@email.com"
                  required
                  style={inputStyle}
                />
              </div>
            </div>

            <div>
              <FieldLabel text="what do you want to look and feel like in 8 weeks?" />
              <textarea
                value={form.goal}
                onChange={e => update('goal', e.target.value)}
                placeholder="be specific. physique, energy, confidence — whatever's real for you."
                style={textareaStyle}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <FieldLabel text="training days per week" />
                <select value={form.trainingDays} onChange={e => update('trainingDays', e.target.value)} style={selectStyle}>
                  <option value="">select</option>
                  <option>3 days</option>
                  <option>4 days</option>
                  <option>5 days</option>
                </select>
              </div>
              <div>
                <FieldLabel text="when do you train?" />
                <select value={form.trainingTime} onChange={e => update('trainingTime', e.target.value)} style={selectStyle}>
                  <option value="">select</option>
                  <option>morning</option>
                  <option>lunch break</option>
                  <option>after work</option>
                  <option>varies</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <FieldLabel text="experience level" />
                <select value={form.experience} onChange={e => update('experience', e.target.value)} style={selectStyle}>
                  <option value="">select</option>
                  <option>new to training</option>
                  <option>been going but inconsistent</option>
                  <option>trained before, fell off</option>
                  <option>consistent but not progressing</option>
                </select>
              </div>
              <div>
                <FieldLabel text="where do you train?" />
                <select value={form.equipment} onChange={e => update('equipment', e.target.value)} style={selectStyle}>
                  <option value="">select</option>
                  <option>commercial gym</option>
                  <option>home gym</option>
                  <option>both</option>
                </select>
              </div>
            </div>

            <div>
              <FieldLabel text="what's actually been stopping you?" />
              <textarea
                value={form.block}
                onChange={e => update('block', e.target.value)}
                placeholder="no filter. just say what it is."
                style={textareaStyle}
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              style={{
                width: '100%',
                padding: '1.1rem 1.5rem',
                border: '1px solid #EDEDE8',
                color: '#EDEDE8',
                background: 'none',
                fontFamily: 'Inter, -apple-system, sans-serif',
                fontWeight: 300,
                fontSize: 'clamp(0.85rem, 1.3vw, 1rem)',
                letterSpacing: '0.01em',
                cursor: status === 'loading' ? 'default' : 'pointer',
                opacity: status === 'loading' ? 0.5 : 1,
                marginTop: '0.5rem',
              }}
            >
              {status === 'loading' ? 'sending...' : 'get the system — $497 →'}
            </button>

          </form>
        </div>

        <p style={{ ...mono('0.4rem', '#1f1f1f'), textAlign: 'center', lineHeight: 1.8 }}>
          no subscription. no recurring charges. one payment, 8 weeks built.
        </p>

      </div>
    </main>
  );
}
