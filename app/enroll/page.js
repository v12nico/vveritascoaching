'use client';
import { useState } from 'react';

const STRIPE = {
  elite:  { 4: process.env.NEXT_PUBLIC_STRIPE_ELITE_4W,  8: process.env.NEXT_PUBLIC_STRIPE_ELITE_8W,  12: process.env.NEXT_PUBLIC_STRIPE_ELITE_12W  },
  hybrid: { 4: process.env.NEXT_PUBLIC_STRIPE_HYBRID_4W, 8: process.env.NEXT_PUBLIC_STRIPE_HYBRID_8W, 12: process.env.NEXT_PUBLIC_STRIPE_HYBRID_12W },
  remote: { 4: process.env.NEXT_PUBLIC_STRIPE_REMOTE_4W, 8: process.env.NEXT_PUBLIC_STRIPE_REMOTE_8W, 12: process.env.NEXT_PUBLIC_STRIPE_REMOTE_12W },
};

const PACKAGES = [
  {
    id: 'elite',
    name: 'elite transformation',
    sub: '3 in-person sessions / week',
    desc: 'maximum hands-on coaching. highest level of support, accountability, and access.',
    durations: [
      { weeks: 4,  price: 2400, sessions: '12 sessions' },
      { weeks: 8,  price: 4600, sessions: '24 sessions', savings: 'save $200', popular: true },
      { weeks: 12, price: 6600, sessions: '36 sessions', savings: 'save $600', best: true },
    ],
  },
  {
    id: 'hybrid',
    name: 'hybrid coaching',
    sub: '1 in-person session / week',
    desc: 'hands-on guidance once a week with the full vveritas* system running every other day.',
    durations: [
      { weeks: 4,  price: 1200, sessions: '4 sessions' },
      { weeks: 8,  price: 2300, sessions: '8 sessions',  savings: 'save $100', popular: true },
      { weeks: 12, price: 3300, sessions: '12 sessions', savings: 'save $300', best: true },
    ],
  },
  {
    id: 'remote',
    name: 'remote coaching',
    sub: 'fully online',
    desc: 'the complete vveritas* system delivered remotely. same coaching philosophy. same accountability.',
    durations: [
      { weeks: 4,  price: 600 },
      { weeks: 8,  price: 1100, savings: 'save $100', popular: true },
      { weeks: 12, price: 1500, savings: 'save $300', best: true },
    ],
  },
];

export default function EnrollPage() {
  const [step, setStep] = useState(0);
  const [selPkg, setSelPkg] = useState(null);
  const [selDur, setSelDur] = useState(null);

  const pkg = selPkg !== null ? PACKAGES[selPkg] : null;
  const dur = selDur !== null && pkg ? pkg.durations[selDur] : null;
  const stripeUrl = pkg && dur ? STRIPE[pkg.id]?.[dur.weeks] : null;

  function reset() { setStep(0); setSelPkg(null); setSelDur(null); }

  const s = {
    page: {
      background: '#000',
      minHeight: '100dvh',
      fontFamily: 'Inter, -apple-system, sans-serif',
      fontWeight: 300,
      color: '#EDEDE8',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    inner: {
      width: '100%',
      maxWidth: '520px',
      padding: '0 1.4rem 4rem',
      display: 'flex',
      flexDirection: 'column',
    },
    header: {
      padding: '2rem 0 2.5rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.3rem',
    },
    mark: {
      fontFamily: 'ui-monospace, monospace',
      fontSize: '0.55rem',
      letterSpacing: '0.3em',
      textTransform: 'uppercase',
      color: '#3A3A3A',
    },
    headline: {
      fontSize: 'clamp(1.4rem, 5vw, 2rem)',
      fontWeight: 200,
      letterSpacing: '-0.03em',
      lineHeight: 1.15,
      color: '#EDEDE8',
    },
    sub: {
      fontSize: '0.82rem',
      color: '#5A5A5A',
      marginTop: '0.3rem',
    },
    label: {
      fontFamily: 'ui-monospace, monospace',
      fontSize: '0.48rem',
      letterSpacing: '0.25em',
      textTransform: 'uppercase',
      color: '#3A3A3A',
      marginBottom: '1.2rem',
    },
    card: (active) => ({
      background: 'none',
      border: `1px solid ${active ? '#EDEDE8' : '#1a1a1a'}`,
      borderRadius: '2px',
      padding: '1.2rem 1.3rem',
      cursor: 'pointer',
      textAlign: 'left',
      width: '100%',
      fontFamily: 'Inter, -apple-system, sans-serif',
      color: '#EDEDE8',
      marginBottom: '0.7rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.25rem',
    }),
    back: {
      background: 'none',
      border: 'none',
      color: '#3A3A3A',
      fontFamily: 'Inter, -apple-system, sans-serif',
      fontWeight: 300,
      fontSize: '0.8rem',
      cursor: 'pointer',
      padding: '0',
      marginBottom: '2rem',
      textAlign: 'left',
    },
  };

  // ── step 0: choose package ──────────────────────────────────────────────
  if (step === 0) {
    return (
      <div style={s.page}>
        <div style={s.inner}>
          <div style={s.header}>
            <span style={s.mark}>vveritas* coaching</span>
            <h1 style={s.headline}>choose your<br />coaching experience.</h1>
            <p style={s.sub}>select a package to see your commitment options.</p>
          </div>

          <div style={s.label}>coaching packages</div>

          {PACKAGES.map((p, i) => (
            <button key={i} style={s.card(false)} onClick={() => { setSelPkg(i); setStep(1); }}>
              <div style={{ fontSize: 'clamp(0.9rem, 3vw, 1.05rem)', fontWeight: 300, marginBottom: '0.1rem' }}>{p.name}</div>
              <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.48rem', letterSpacing: '0.15em', color: '#5A5A5A', marginBottom: '0.5rem' }}>{p.sub}</div>
              <div style={{ fontSize: '0.78rem', color: '#5A5A5A', lineHeight: 1.5 }}>{p.desc}</div>
              <div style={{ marginTop: '0.8rem', fontFamily: 'ui-monospace, monospace', fontSize: '0.44rem', letterSpacing: '0.2em', color: '#3A3A3A' }}>
                from ${p.durations[0].price.toLocaleString()} → select →
              </div>
            </button>
          ))}

          <p style={{ fontSize: '0.68rem', color: '#3A3A3A', marginTop: '1.5rem', lineHeight: 1.6 }}>
            every package includes the full vveritas* dashboard, personalized nutrition, grocery lists, unlimited messaging, and habit accountability. the only difference is how much in-person coaching you receive.
          </p>
        </div>
      </div>
    );
  }

  // ── step 1: choose duration ─────────────────────────────────────────────
  if (step === 1 && pkg) {
    return (
      <div style={s.page}>
        <div style={s.inner}>
          <div style={s.header}>
            <span style={s.mark}>vveritas* coaching</span>
            <h1 style={s.headline}>{pkg.name}.</h1>
            <p style={s.sub}>{pkg.sub}</p>
          </div>

          <button style={s.back} onClick={() => { setStep(0); setSelDur(null); }}>← back</button>

          <div style={s.label}>choose your commitment</div>

          {pkg.durations.map((d, i) => (
            <button key={i} style={s.card(false)} onClick={() => { setSelDur(i); setStep(2); }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.5rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#5A5A5A' }}>{d.weeks} weeks</span>
                {d.popular && <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.4rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#4a8c6a', border: '1px solid #4a8c6a', padding: '0.15em 0.5em' }}>most popular</span>}
                {d.best && <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.4rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8c7a3a', border: '1px solid #8c7a3a', padding: '0.15em 0.5em' }}>best value</span>}
              </div>
              <div style={{ fontSize: 'clamp(1.4rem, 5vw, 1.8rem)', fontWeight: 200, letterSpacing: '-0.03em' }}>${d.price.toLocaleString()}</div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.3rem' }}>
                {d.sessions && <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.46rem', letterSpacing: '0.1em', color: '#5A5A5A' }}>{d.sessions}</span>}
                {d.savings && <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.46rem', letterSpacing: '0.1em', color: '#4a8c6a' }}>{d.savings}</span>}
              </div>
            </button>
          ))}

          <p style={{ fontSize: '0.65rem', color: '#3A3A3A', marginTop: '1.2rem', lineHeight: 1.6 }}>
            flexible payment options available. pay in full, split payment, or monthly installments. your start date is confirmed once the first payment is received.
          </p>
        </div>
      </div>
    );
  }

  // ── step 2: confirmation ────────────────────────────────────────────────
  if (step === 2 && pkg && dur) {
    return (
      <div style={s.page}>
        <div style={s.inner}>
          <div style={s.header}>
            <span style={s.mark}>vveritas* coaching</span>
            <h1 style={s.headline}>your plan.</h1>
            <p style={s.sub}>review your selection before continuing to payment.</p>
          </div>

          <button style={s.back} onClick={() => { setStep(1); setSelDur(null); }}>← back</button>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0', marginBottom: '2rem', border: '1px solid #141414', borderRadius: '2px' }}>
            {[
              { label: 'package', val: pkg.name },
              { label: 'coaching', val: pkg.sub },
              { label: 'length', val: `${dur.weeks} weeks` },
              { label: 'investment', val: `$${dur.price.toLocaleString()}` },
              ...(dur.sessions ? [{ label: 'sessions', val: dur.sessions }] : []),
            ].map(({ label, val }, i, arr) => (
              <div key={label} style={{ display: 'grid', gridTemplateColumns: '7rem 1fr', alignItems: 'baseline', padding: '1rem 1.2rem', borderBottom: i < arr.length - 1 ? '1px solid #0f0f0f' : 'none' }}>
                <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.46rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#3A3A3A' }}>{label}</span>
                <span style={{ fontSize: '0.92rem', fontWeight: 300 }}>{val}</span>
              </div>
            ))}
          </div>

          {stripeUrl ? (
            <button
              onClick={() => window.open(stripeUrl, '_blank')}
              style={{ background: '#EDEDE8', border: 'none', borderRadius: '2px', padding: '1.1rem', width: '100%', fontFamily: 'Inter, -apple-system, sans-serif', fontWeight: 300, fontSize: '0.9rem', color: '#000', cursor: 'pointer', letterSpacing: '0.01em', marginBottom: '0.8rem' }}
            >
              continue to payment →
            </button>
          ) : (
            <div style={{ padding: '1.1rem', border: '1px solid #1a1a1a', borderRadius: '2px', fontFamily: 'ui-monospace, monospace', fontSize: '0.5rem', letterSpacing: '0.15em', color: '#3A3A3A', textAlign: 'center', marginBottom: '0.8rem' }}>
              payment link not configured
            </div>
          )}

          <button onClick={reset} style={{ ...s.back, color: '#3A3A3A', fontSize: '0.75rem' }}>
            ← start over
          </button>

          <p style={{ fontSize: '0.65rem', color: '#3A3A3A', marginTop: '1.5rem', lineHeight: 1.6 }}>
            questions before enrolling? message nico directly at iamnicofresh@gmail.com
          </p>
        </div>
      </div>
    );
  }

  return null;
}
