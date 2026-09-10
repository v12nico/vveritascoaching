'use client';
import { useState } from 'react';

// ─── ENROLLMENT ──────────────────────────────────────────────────────────────
// NO PAYMENT PROCESSOR IS CONNECTED. This form captures her chosen schedule and
// details and hands them to the coach — it does not and must not charge a card.
// If Stripe is wired up later, the charge has to be an explicit, clearly
// labelled action she takes knowingly, not a side effect of submitting a form.

const ACCENT = '#b08a7d';
const DIM = '#5A5A5A';
const GHOST = '#3A3A3A';
const BORDER = '#141414';

const sessionRate = 50;
const regularRate = 100;
const weeks = 8;

const PLANS = [2, 3, 4].map(perWeek => {
  const sessions = perWeek * weeks;
  const total = sessions * sessionRate;
  return {
    id: `${perWeek}x`, perWeek, sessions, total, monthly: total / 2,
    tag: perWeek === 4 ? 'your requested schedule' : perWeek === 3 ? 'recommended starting point' : null,
  };
});

const mono = (sz = '0.44rem', col = GHOST) => ({
  fontFamily: 'ui-monospace, monospace', fontSize: sz,
  letterSpacing: '0.24em', textTransform: 'uppercase', color: col,
});
const field = {
  width: '100%', background: '#050505', border: `1px solid ${BORDER}`,
  color: '#EDEDE8', padding: '0.85rem 0.9rem', fontSize: '16px',
  fontFamily: 'inherit', fontWeight: 300, outline: 'none', marginTop: '0.4rem',
};
const label = { ...mono('0.44rem', GHOST), display: 'block', marginTop: '1.1rem' };

export default function EnrollPhyllis() {
  const [plan, setPlan] = useState('4x');
  const [pay, setPay] = useState('monthly');
  const [f, setF] = useState({
    name: '', email: '', phone: '', start: '', days: '', times: '',
    emergency: '', health: false, agreement: false,
  });
  const [sent, setSent] = useState(false);

  const set = (k, v) => setF(p => ({ ...p, [k]: v }));
  const chosen = PLANS.find(p => p.id === plan);
  const ready = f.name.trim() && f.email.trim() && f.phone.trim() && f.health && f.agreement;

  if (sent) {
    return (
      <div style={{ background: '#000', minHeight: '100dvh', color: '#EDEDE8', fontFamily: 'Inter, -apple-system, sans-serif', fontWeight: 300, display: 'grid', placeItems: 'center', padding: '2rem' }}>
        <div style={{ maxWidth: '440px', textAlign: 'center' }}>
          <div style={mono('0.44rem', ACCENT)}>received</div>
          <h1 style={{ fontSize: '1.7rem', fontWeight: 200, marginTop: '1rem', lineHeight: 1.3 }}>
            your schedule request is in.
          </h1>
          <p style={{ fontSize: '0.95rem', color: DIM, lineHeight: 1.7, marginTop: '1.2rem' }}>
            {chosen.perWeek} sessions per week · {chosen.sessions} sessions over {weeks} weeks.
            i will confirm your days and times, then send the payment link and onboarding.
          </p>
          <p style={{ fontSize: '0.85rem', color: GHOST, lineHeight: 1.7, marginTop: '1.2rem' }}>
            nothing has been charged.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: '#000', minHeight: '100dvh', color: '#EDEDE8', fontFamily: 'Inter, -apple-system, sans-serif', fontWeight: 300 }}>
      <div style={{ maxWidth: '620px', margin: '0 auto', padding: '2.5rem 1.2rem 5rem' }}>

        <div style={mono()}>vveritas* — personal training</div>
        <h1 style={{ fontSize: 'clamp(1.5rem, 5vw, 2.1rem)', fontWeight: 200, marginTop: '0.8rem', lineHeight: 1.2 }}>
          reserve your training schedule.
        </h1>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.7rem', marginTop: '1.4rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '3rem', fontWeight: 200, color: ACCENT, lineHeight: 1 }}>${sessionRate}</span>
          <span style={{ fontSize: '1.3rem', fontWeight: 200, color: GHOST, textDecoration: 'line-through' }}>
            ${regularRate}
          </span>
          <span style={mono('0.44rem', GHOST)}>per session</span>
        </div>
        <div style={{ display: 'inline-flex', gap: '0.5rem', alignItems: 'center', marginTop: '0.8rem',
                      border: `1px solid ${ACCENT}`, padding: '0.45rem 0.7rem' }}>
          <span style={mono('0.42rem', ACCENT)}>end of summer</span>
          <span style={{ fontSize: '0.8rem', color: DIM }}>half the regular rate</span>
        </div>
        <p style={{ fontSize: '0.95rem', color: DIM, marginTop: '0.9rem', lineHeight: 1.7 }}>
          same rate whichever schedule you choose. eight weeks of in-person training —
          tracking, nutrition guidance, check-ins and messaging included at no separate charge.
        </p>

        {/* plans */}
        <div style={{ display: 'grid', gap: '0.7rem', marginTop: '2rem' }}>
          {PLANS.map(p => {
            const on = plan === p.id;
            return (
              <button key={p.id} onClick={() => setPlan(p.id)}
                style={{
                  textAlign: 'left', cursor: 'pointer', padding: '1.1rem',
                  background: on ? 'rgba(176,138,125,0.07)' : 'none',
                  border: `1px solid ${on ? ACCENT : BORDER}`, color: 'inherit', fontFamily: 'inherit',
                }}>
                {p.tag && <div style={mono('0.42rem', on ? ACCENT : DIM)}>{p.tag}</div>}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '1rem', marginTop: p.tag ? '0.5rem' : 0 }}>
                  <div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 200 }}>{p.perWeek} sessions per week</div>
                    <div style={{ fontSize: '0.8rem', color: GHOST, marginTop: '0.25rem' }}>
                      {weeks} weeks · {p.sessions} sessions
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                    <div style={{ fontSize: '0.95rem', color: on ? '#EDEDE8' : DIM }}>
                      {p.sessions} × ${sessionRate}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: GHOST, marginTop: '0.2rem' }}>
                      ${p.total.toLocaleString()} total · 2 × ${p.monthly.toLocaleString()}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* payment preference */}
        <label style={label}>payment</label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: '0.4rem' }}>
          {[
            { k: 'full',    t: `pay in full — $${chosen.total.toLocaleString()}` },
            { k: 'monthly', t: `two payments — $${chosen.monthly.toLocaleString()} each` },
          ].map(o => (
            <button key={o.k} onClick={() => setPay(o.k)}
              style={{
                padding: '0.85rem', cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.82rem',
                background: pay === o.k ? 'rgba(176,138,125,0.07)' : 'none',
                border: `1px solid ${pay === o.k ? ACCENT : BORDER}`,
                color: pay === o.k ? '#EDEDE8' : DIM, minHeight: '48px',
              }}>
              {o.t}
            </button>
          ))}
        </div>

        {/* details */}
        <label style={label}>full name</label>
        <input style={field} value={f.name} onChange={e => set('name', e.target.value)} />

        <label style={label}>email</label>
        <input style={field} type="email" value={f.email} onChange={e => set('email', e.target.value)} />

        <label style={label}>phone</label>
        <input style={field} type="tel" value={f.phone} onChange={e => set('phone', e.target.value)} />

        <label style={label}>preferred start date</label>
        <input style={field} type="date" value={f.start} onChange={e => set('start', e.target.value)} />

        <label style={label}>preferred training days</label>
        <input style={field} placeholder="mon / tue / thu / sat" value={f.days} onChange={e => set('days', e.target.value)} />

        <label style={label}>preferred training times</label>
        <input style={field} placeholder="evenings after 5pm" value={f.times} onChange={e => set('times', e.target.value)} />

        <label style={label}>emergency contact — name and number</label>
        <input style={field} value={f.emergency} onChange={e => set('emergency', e.target.value)} />

        {/* acknowledgements — separate, never bundled */}
        <div style={{ marginTop: '1.8rem', display: 'grid', gap: '0.9rem' }}>
          {[
            { k: 'health', t: 'i have shared any injuries, pain, medical conditions or medications that could affect training, and i will tell my coach if anything changes.' },
            { k: 'agreement', t: 'i understand this is an eight-week personal training agreement at the schedule and rate shown above.' },
          ].map(c => (
            <div key={c.k} onClick={() => set(c.k, !f[c.k])}
              style={{ display: 'flex', gap: '0.75rem', cursor: 'pointer', alignItems: 'flex-start' }}>
              <span style={{ width: 18, height: 18, flexShrink: 0, marginTop: '2px', border: `1px solid ${f[c.k] ? ACCENT : '#2a2a2a'}`, background: f[c.k] ? ACCENT : 'transparent' }} />
              <span style={{ fontSize: '0.82rem', color: DIM, lineHeight: 1.6 }}>{c.t}</span>
            </div>
          ))}
        </div>

        <button
          onClick={() => ready && setSent(true)}
          disabled={!ready}
          style={{
            width: '100%', marginTop: '2rem', padding: '1.2rem', minHeight: '58px',
            ...mono('0.6rem', ready ? '#EDEDE8' : '#2a2a2a'),
            background: ready ? 'rgba(176,138,125,0.12)' : 'none',
            border: `1px solid ${ready ? ACCENT : BORDER}`,
            cursor: ready ? 'pointer' : 'not-allowed',
          }}>
          reserve my training schedule
        </button>

        <p style={{ fontSize: '0.82rem', color: GHOST, lineHeight: 1.7, marginTop: '1.1rem', textAlign: 'center' }}>
          this reserves your schedule and starts onboarding. nothing is charged here —
          your coach will confirm your times and send the payment link.
        </p>
      </div>
    </div>
  );
}
