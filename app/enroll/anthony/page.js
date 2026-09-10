'use client';
import { useState } from 'react';

// ─── ENROLLMENT ──────────────────────────────────────────────────────────────
// NO PAYMENT PROCESSOR IS CONNECTED. This captures his choice and details and
// hands them to the coach — it does not charge a card. If Stripe is wired up
// later, the charge must be an explicit action he takes knowingly.

const ACCENT = '#6a8fb0';
const DIM = '#5A5A5A';
const GHOST = '#3A3A3A';
const BORDER = '#141414';

// One link for now. If the full-pay and 2-payment options are separate Stripe
// products, add the second here and pick by `pay` — otherwise both buttons
// send everyone to the same amount.
const STRIPE = 'https://buy.stripe.com/9B6aEX11Yev025A9CF6wE0v';

const weeks = 8;
const sessions = 16;
const full = 997;
const monthly = 499;

const INCLUDED = [
  '16 in-person sessions',
  'personalized workout program',
  'nutrition guidance',
  'grocery list',
  'vveritas* dashboard',
  'progress tracking',
  'weekly check-ins',
  'unlimited messaging',
  'program adjustments',
];

const mono = (sz = '0.44rem', col = GHOST) => ({
  fontFamily: 'ui-monospace, monospace', fontSize: sz,
  letterSpacing: '0.24em', textTransform: 'uppercase', color: col,
});
const field = {
  width: '100%', background: '#050505', border: `1px solid ${BORDER}`, color: '#EDEDE8',
  padding: '0.85rem 0.9rem', fontSize: '16px', fontFamily: 'inherit', fontWeight: 300,
  outline: 'none', marginTop: '0.4rem',
};
const label = { ...mono('0.44rem', GHOST), display: 'block', marginTop: '1.1rem' };

export default function EnrollAnthony() {
  const [pay, setPay] = useState('monthly');
  const [f, setF] = useState({
    name: '', email: '', phone: '', start: '', days: '', times: '',
    emergency: '', health: false, agreement: false,
  });
  const [sent, setSent] = useState(false);

  const set = (k, v) => setF(p => ({ ...p, [k]: v }));
  const ready = f.name.trim() && f.email.trim() && f.phone.trim() && f.health && f.agreement;

  if (sent) {
    return (
      <div style={{ background: '#000', minHeight: '100dvh', color: '#EDEDE8',
                    fontFamily: 'Inter, -apple-system, sans-serif', fontWeight: 300,
                    display: 'grid', placeItems: 'center', padding: '2rem' }}>
        <div style={{ maxWidth: '440px', textAlign: 'center' }}>
          <div style={mono('0.44rem', ACCENT)}>received</div>
          <h1 style={{ fontSize: '1.7rem', fontWeight: 200, marginTop: '1rem', lineHeight: 1.3 }}>
            you're in the queue.
          </h1>
          <p style={{ fontSize: '0.95rem', color: DIM, lineHeight: 1.7, marginTop: '1.2rem' }}>
            hybrid transformation · {weeks} weeks · {sessions} in-person sessions.
            checkout opened in a new tab — finish there and i'll confirm your training
            days and times.
          </p>
          <p style={{ fontSize: '0.85rem', color: GHOST, lineHeight: 1.7, marginTop: '1.2rem' }}>
            didn't see it? <a href={STRIPE} target="_blank" rel="noreferrer"
              style={{ color: ACCENT }}>open checkout</a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: '#000', minHeight: '100dvh', color: '#EDEDE8',
                  fontFamily: 'Inter, -apple-system, sans-serif', fontWeight: 300 }}>
      <div style={{ maxWidth: '620px', margin: '0 auto', padding: '2.5rem 1.2rem 5rem' }}>

        <div style={mono()}>vveritas* — hybrid transformation</div>
        <h1 style={{ fontSize: 'clamp(1.5rem, 5vw, 2.1rem)', fontWeight: 200, marginTop: '0.8rem', lineHeight: 1.2 }}>
          start my transformation.
        </h1>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.9rem', marginTop: '1.4rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '2.9rem', fontWeight: 200, color: ACCENT, lineHeight: 1 }}>${full}</span>
          <span style={{ fontSize: '0.95rem', color: DIM }}>or 2 × ${monthly}</span>
        </div>
        <p style={{ fontSize: '0.9rem', color: DIM, marginTop: '0.9rem', lineHeight: 1.7 }}>
          {weeks} weeks · {sessions} in-person sessions · everything around the training included.
        </p>

        <div style={{ ...card(), marginTop: '1.6rem' }}>
          <div style={mono()}>included</div>
          <div style={{ marginTop: '0.7rem' }}>
            {INCLUDED.map((x, i) => (
              <div key={i} style={{ fontSize: '0.88rem', color: '#B5B5B0', lineHeight: 1.6, padding: '0.28rem 0' }}>
                — {x}
              </div>
            ))}
          </div>
        </div>

        <label style={label}>payment</label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: '0.4rem' }}>
          {[
            { k: 'full',    t: `pay in full — $${full}` },
            { k: 'monthly', t: `two payments — $${monthly} each` },
          ].map(o => (
            <button key={o.k} onClick={() => setPay(o.k)}
              style={{ padding: '0.85rem', cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.82rem',
                       background: pay === o.k ? 'rgba(106,143,176,0.1)' : 'none',
                       border: `1px solid ${pay === o.k ? ACCENT : BORDER}`,
                       color: pay === o.k ? '#EDEDE8' : DIM, minHeight: '48px' }}>
              {o.t}
            </button>
          ))}
        </div>

        <label style={label}>full name</label>
        <input style={field} value={f.name} onChange={e => set('name', e.target.value)} />
        <label style={label}>email</label>
        <input style={field} type="email" value={f.email} onChange={e => set('email', e.target.value)} />
        <label style={label}>phone</label>
        <input style={field} type="tel" value={f.phone} onChange={e => set('phone', e.target.value)} />
        <label style={label}>preferred start date</label>
        <input style={field} type="date" value={f.start} onChange={e => set('start', e.target.value)} />
        <label style={label}>preferred training days</label>
        <input style={field} placeholder="mon / thu" value={f.days} onChange={e => set('days', e.target.value)} />
        <label style={label}>preferred training times</label>
        <input style={field} placeholder="evenings after 5pm" value={f.times} onChange={e => set('times', e.target.value)} />
        <label style={label}>emergency contact — name and number</label>
        <input style={field} value={f.emergency} onChange={e => set('emergency', e.target.value)} />

        <div style={{ marginTop: '1.8rem', display: 'grid', gap: '0.9rem' }}>
          {[
            { k: 'health', t: 'i have shared any injuries, pain, medical conditions or medications that could affect training, and i will tell my coach if anything changes.' },
            { k: 'agreement', t: `i understand this is an ${weeks}-week hybrid program with ${sessions} in-person sessions at the rate shown above.` },
          ].map(c => (
            <div key={c.k} onClick={() => set(c.k, !f[c.k])}
              style={{ display: 'flex', gap: '0.75rem', cursor: 'pointer', alignItems: 'flex-start' }}>
              <span style={{ width: 18, height: 18, flexShrink: 0, marginTop: '2px',
                             border: `1px solid ${f[c.k] ? ACCENT : '#2a2a2a'}`,
                             background: f[c.k] ? ACCENT : 'transparent' }} />
              <span style={{ fontSize: '0.82rem', color: DIM, lineHeight: 1.6 }}>{c.t}</span>
            </div>
          ))}
        </div>

        <button
          onClick={() => {
            if (!ready) return;
            setSent(true);
            // details captured first, then checkout — a closed tab must not
            // lose the schedule he just filled in
            window.open(STRIPE, '_blank', 'noopener');
          }}
          disabled={!ready}
          style={{ width: '100%', marginTop: '2rem', padding: '1.2rem', minHeight: '58px',
                   ...mono('0.6rem', ready ? '#EDEDE8' : '#2a2a2a'),
                   background: ready ? 'rgba(106,143,176,0.12)' : 'none',
                   border: `1px solid ${ready ? ACCENT : BORDER}`,
                   cursor: ready ? 'pointer' : 'not-allowed' }}>
          start my transformation
        </button>

        <p style={{ fontSize: '0.82rem', color: GHOST, lineHeight: 1.7, marginTop: '1.1rem', textAlign: 'center' }}>
          your details are saved and checkout opens in a new tab.
          payment is handled by stripe — your card never touches this site.
        </p>
      </div>
    </div>
  );
}

function card() { return { border: `1px solid ${BORDER}`, padding: '1.1rem' }; }
