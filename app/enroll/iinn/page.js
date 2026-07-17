export const metadata = { title: 'vveritas* — enroll' };

const STRIPE = null; // set before enrollment

const items = [
  'personalized 8-week training plan',
  'three weekly workouts',
  'nutrition structure and grocery list',
  'daily missions and accountability dashboard',
  'five life pillars — scored and tracked',
  'daily check-ins',
  'weekly reviews and program adjustments',
  'unlimited coach messaging',
  'form-video review',
  'work-accountability structure',
  'presence goals for friends and family',
  'recovery guidance',
  'recovery wins tracking',
  'end-of-program continuation plan',
];

const totalPrice = 997;
const plans = [
  { label: 'pay in full',   amount: `$${totalPrice}`,          note: 'one payment. immediate start.',  primary: true,  href: STRIPE },
  { label: 'two payments',  amount: '$499 / payment',           note: 'installment — not a discount.',  primary: false, href: null },
  { label: 'four payments', amount: '$250 / mo',                note: 'four monthly payments.',         primary: false, href: null },
];

const GREEN = '#4a8c6a';

export default function IinnEnroll() {
  return (
    <main style={{ background: '#000', minHeight: '100dvh', fontFamily: 'Inter, -apple-system, sans-serif', fontWeight: 300, color: '#EDEDE8', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 2rem' }}>
      <div style={{ maxWidth: '540px', width: '100%' }}>

        <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.48rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#3A3A3A', marginBottom: '2.5rem' }}>
          vveritas* coaching
        </div>

        <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 200, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '0.4rem' }}>
          8-week consistency rebuild.
        </h1>
        <p style={{ fontSize: 'clamp(0.72rem, 1.1vw, 0.86rem)', color: '#5A5A5A', marginBottom: '0.3rem' }}>
          built for iinn.
        </p>
        <p style={{ fontSize: 'clamp(0.68rem, 1vw, 0.8rem)', color: '#3A3A3A', marginBottom: '3rem' }}>
          fully remote. fully personalized.
        </p>

        <div style={{ borderTop: '1px solid #141414', paddingTop: '2rem', marginBottom: '2.5rem' }}>
          <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.46rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#3A3A3A', marginBottom: '1.2rem' }}>
            what&apos;s included
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem 2rem' }}>
            {items.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.6rem', alignItems: 'baseline' }}>
                <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.5rem', color: GREEN, flexShrink: 0 }}>✓</span>
                <span style={{ fontSize: 'clamp(0.62rem, 0.9vw, 0.74rem)', color: '#EDEDE8', lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ borderTop: '1px solid #141414', paddingTop: '2rem', marginBottom: '2.5rem' }}>
          <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.46rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#3A3A3A', marginBottom: '1.2rem' }}>
            investment
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {plans.map((plan, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '7rem 1fr auto', alignItems: 'center', gap: '1rem', padding: '0.9rem 0', borderBottom: '1px solid #0d0d0d' }}>
                <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.46rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: plan.primary ? '#EDEDE8' : '#3A3A3A' }}>
                  {plan.label}
                </span>
                <div>
                  <span style={{ fontSize: plan.primary ? 'clamp(1.1rem, 1.8vw, 1.4rem)' : 'clamp(0.88rem, 1.3vw, 1rem)', fontWeight: 200, color: plan.primary ? '#EDEDE8' : '#5A5A5A' }}>
                    {plan.amount}
                  </span>
                  <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.44rem', color: '#3A3A3A', marginLeft: '0.8rem' }}>
                    {plan.note}
                  </span>
                </div>
                {plan.href && (
                  <a href={plan.href} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.5rem', letterSpacing: '0.15em', color: GREEN, textDecoration: 'none', whiteSpace: 'nowrap' }}>
                    pay now →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        <p style={{ fontSize: 'clamp(0.7rem, 1vw, 0.82rem)', color: '#5A5A5A', lineHeight: 1.75, marginBottom: '2rem', borderLeft: '1px solid #1a1a1a', paddingLeft: '1rem' }}>
          i understand that vveritas* provides the structure, programming, coaching, and accountability, while i am responsible for honest communication and execution.
        </p>

        {STRIPE ? (
          <a href={STRIPE} target="_blank" rel="noopener noreferrer" style={{ display: 'block', padding: '1.1rem 1.5rem', border: '1px solid #EDEDE8', color: '#EDEDE8', textDecoration: 'none', fontSize: 'clamp(0.85rem, 1.3vw, 1rem)', textAlign: 'center', letterSpacing: '0.01em', marginBottom: '1.5rem' }}>
            start my eight-week rebuild →
          </a>
        ) : (
          <div style={{ padding: '1.1rem 1.5rem', border: '1px solid #1a1a1a', color: '#3A3A3A', fontSize: 'clamp(0.85rem, 1.3vw, 1rem)', textAlign: 'center', letterSpacing: '0.01em', marginBottom: '1.5rem', fontFamily: 'ui-monospace, monospace', fontSize: '0.52rem' }}>
            payment link — set before enrollment
          </div>
        )}

        <p style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.44rem', letterSpacing: '0.1em', color: '#2a2a2a', textAlign: 'center' }}>
          for installment plans — message directly to set up. start date confirmed once first payment is received.
        </p>

      </div>
    </main>
  );
}
