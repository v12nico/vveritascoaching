'use client';
import { useState } from 'react';

const STRIPE = 'https://buy.stripe.com/3cI3cveSOdqW25A0256wE0n';

const GREEN  = '#4a8c6a';
const GHOST  = '#3A3A3A';
const DIM    = '#5A5A5A';
const BORDER = '#141414';

const items = [
  'personalized recomposition training plan',
  'daily nutrition structure + protein targets',
  'vveritas* client dashboard',
  'proportion-focused exercise selection',
  'daily accountability check-ins',
  'weekly review and program adjustments',
  'direct coach messaging',
  'form-video feedback',
  'recovery and sleep guidance',
  'grocery framework',
  'progress tracking and recomposition score',
];

const klarnaExamples = [
  { label: '4 payments', amount: '$249.25 / 2 weeks', note: 'most popular' },
  { label: '3 payments', amount: '$332.33 / month',   note: '' },
  { label: '2 payments', amount: '$498.50 / month',   note: '' },
  { label: 'pay in full', amount: '$997',              note: 'no split needed' },
];

const label = (txt) => (
  <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.44rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: GHOST, marginBottom: '0.5rem' }}>{txt}</div>
);

const inputStyle = {
  width: '100%',
  background: 'transparent',
  border: `1px solid ${BORDER}`,
  borderRadius: 0,
  color: '#EDEDE8',
  fontFamily: 'Inter, -apple-system, sans-serif',
  fontSize: 'clamp(0.78rem, 1.1vw, 0.88rem)',
  fontWeight: 300,
  padding: '0.75rem 0.8rem',
  outline: 'none',
  boxSizing: 'border-box',
  appearance: 'none',
  WebkitAppearance: 'none',
};

export default function JoshuaEnroll() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    startDate: '',
    billingAuth: false,
    coachingAgreement: false,
    healthAcknowledgment: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  function update(key, val) {
    setForm(prev => ({ ...prev, [key]: val }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.fullName.trim() || !form.email.trim()) {
      setError('name and email are required.');
      return;
    }
    if (!form.billingAuth || !form.coachingAgreement || !form.healthAcknowledgment) {
      setError('all three acknowledgments are required to proceed.');
      return;
    }
    setError('');
    window.open(STRIPE, '_blank');
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <main style={{ background: '#000', minHeight: '100dvh', fontFamily: 'Inter, -apple-system, sans-serif', fontWeight: 300, color: '#EDEDE8', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 2rem' }}>
        <div style={{ maxWidth: '540px', width: '100%', textAlign: 'center' }}>
          <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.52rem', letterSpacing: '0.3em', color: GREEN, marginBottom: '2rem' }}>enrollment received.</div>
          <h1 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 200, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '1.2rem' }}>
            welcome, {form.fullName.split(' ')[0].toLowerCase()}.
          </h1>
          <p style={{ fontSize: 'clamp(0.72rem, 1.05vw, 0.85rem)', color: DIM, lineHeight: 1.8, maxWidth: '380px', margin: '0 auto 2rem', borderLeft: `1px solid ${BORDER}`, paddingLeft: '0.9rem', textAlign: 'left' }}>
            your onboarding is in motion. the coach will confirm your start date and send your intake questionnaire within 24 hours.
          </p>
          <p style={{ fontSize: 'clamp(0.66rem, 0.95vw, 0.78rem)', color: GHOST, lineHeight: 1.7 }}>
            stop trying to figure out everything. follow one system long enough to change.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main style={{ background: '#000', minHeight: '100dvh', fontFamily: 'Inter, -apple-system, sans-serif', fontWeight: 300, color: '#EDEDE8', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 2rem' }}>
      <div style={{ maxWidth: '540px', width: '100%' }}>

        <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.48rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: GHOST, marginBottom: '2.5rem' }}>
          vveritas* coaching
        </div>

        <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 200, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '0.4rem' }}>
          recomposition coaching.
        </h1>
        <p style={{ fontSize: 'clamp(0.72rem, 1.1vw, 0.86rem)', color: DIM, marginBottom: '0.3rem' }}>
          built for joshua.
        </p>
        <p style={{ fontSize: 'clamp(0.68rem, 1vw, 0.8rem)', color: GHOST, marginBottom: '3rem' }}>
          fully remote. fully personalized. split however you want via klarna.
        </p>

        <div style={{ padding: '1rem', border: `1px solid ${BORDER}`, marginBottom: '2rem' }}>
          <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.4rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: GREEN, marginBottom: '0.5rem' }}>lifetime access — 8-week coaching window</div>
          <p style={{ fontSize: 'clamp(0.64rem, 0.92vw, 0.76rem)', color: DIM, lineHeight: 1.7, margin: 0 }}>
            everything you receive — the training plan, nutrition structure, dashboard, and programming — is yours to keep permanently. the 8-week window gives you direct access to the coach: check-ins, messaging, form feedback, and weekly adjustments. this is a one-time offer at this investment level.
          </p>
        </div>

        <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: '2rem', marginBottom: '2.5rem' }}>
          {label("what's included")}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem 2rem', marginTop: '0.4rem' }}>
            {items.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.6rem', alignItems: 'baseline' }}>
                <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.5rem', color: GREEN, flexShrink: 0 }}>✓</span>
                <span style={{ fontSize: 'clamp(0.62rem, 0.9vw, 0.74rem)', color: '#EDEDE8', lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: '2rem', marginBottom: '2.5rem' }}>
          {label('investment')}
          <div style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 200, letterSpacing: '-0.04em', color: '#EDEDE8', lineHeight: 1, marginBottom: '0.5rem', marginTop: '0.3rem' }}>$997</div>
          <p style={{ fontSize: 'clamp(0.64rem, 0.92vw, 0.76rem)', color: DIM, lineHeight: 1.6, marginBottom: '1.4rem' }}>
            split it any way you want via klarna at checkout — no interest, no pressure.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {klarnaExamples.map((k, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '5.5rem 1fr auto', alignItems: 'center', gap: '1rem', padding: '0.7rem 0', borderBottom: `1px solid #0d0d0d` }}>
                <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.42rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: GHOST }}>{k.label}</span>
                <span style={{ fontSize: 'clamp(0.72rem, 1.05vw, 0.85rem)', color: '#EDEDE8', fontWeight: 300 }}>{k.amount}</span>
                {k.note ? <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.38rem', letterSpacing: '0.08em', color: GREEN }}>{k.note}</span> : <span />}
              </div>
            ))}
          </div>
          <p style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.4rem', color: GHOST, letterSpacing: '0.06em', marginTop: '0.8rem' }}>
            klarna handles the split — you choose at checkout.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem', borderTop: `1px solid ${BORDER}`, paddingTop: '2rem', marginBottom: '2rem' }}>
          {label('your information')}

          <div>
            <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.4rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: GHOST, marginBottom: '0.4rem' }}>full name</div>
            <input value={form.fullName} onChange={e => update('fullName', e.target.value)} placeholder="first and last name" style={inputStyle} />
          </div>

          <div>
            <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.4rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: GHOST, marginBottom: '0.4rem' }}>email address</div>
            <input type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="your@email.com" style={inputStyle} />
          </div>

          <div>
            <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.4rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: GHOST, marginBottom: '0.4rem' }}>phone number</div>
            <input type="tel" value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="+1 (000) 000-0000" style={inputStyle} />
          </div>

          <div>
            <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.4rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: GHOST, marginBottom: '0.4rem' }}>preferred start date</div>
            <input type="date" value={form.startDate} onChange={e => update('startDate', e.target.value)} style={{ ...inputStyle, colorScheme: 'dark' }} />
          </div>

          <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {label('acknowledgments')}

            {[
              {
                key: 'billingAuth',
                text: 'i understand the total investment is $997. i may choose to split this via klarna at checkout in any configuration i prefer. my first payment begins onboarding and plan development. this is a one-time investment that includes lifetime access to my program assets and 8 weeks of direct coach access.',
              },
              {
                key: 'coachingAgreement',
                text: 'i understand that vveritas* provides the structure, programming, coaching, and accountability. i am responsible for honest communication and consistent execution. individual results depend on personal effort.',
              },
              {
                key: 'healthAcknowledgment',
                text: 'i acknowledge that this is a fitness coaching program, not medical advice. i am in sufficient health to participate in an exercise program and will consult a physician if i have any concerns.',
              },
            ].map(({ key, text }) => (
              <label key={key} style={{ display: 'flex', gap: '0.8rem', cursor: 'pointer', alignItems: 'flex-start' }}>
                <div
                  onClick={() => update(key, !form[key])}
                  style={{ width: '14px', height: '14px', border: `1px solid ${form[key] ? GREEN : BORDER}`, background: form[key] ? GREEN : 'transparent', flexShrink: 0, marginTop: '2px', cursor: 'pointer', transition: 'all 0.15s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {form[key] && <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.45rem', color: '#000', lineHeight: 1 }}>✓</span>}
                </div>
                <span style={{ fontSize: 'clamp(0.62rem, 0.9vw, 0.74rem)', color: DIM, lineHeight: 1.65 }}>{text}</span>
              </label>
            ))}
          </div>

          {error && (
            <p style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.44rem', color: '#8c3a3a', letterSpacing: '0.05em' }}>{error}</p>
          )}

          <button type="submit"
            style={{ width: '100%', padding: '1.1rem 1.5rem', border: '1px solid #EDEDE8', color: '#EDEDE8', background: 'none', fontFamily: 'Inter, -apple-system, sans-serif', fontWeight: 300, fontSize: 'clamp(0.85rem, 1.3vw, 1rem)', textAlign: 'center', letterSpacing: '0.01em', cursor: 'pointer', marginTop: '0.5rem' }}>
            begin my coaching →
          </button>
        </form>

        <p style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.44rem', letterSpacing: '0.1em', color: '#2a2a2a', textAlign: 'center' }}>
          $997 total — split via klarna — lifetime assets — 8 weeks of direct coach access.
        </p>

      </div>
    </main>
  );
}
