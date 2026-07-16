export const metadata = { title: 'vveritas* — enroll' };

const STRIPE = 'https://buy.stripe.com/3cI3cveSOdqW25A0256wE0n';

const items = [
  'personalized 8-week training plan',
  'three remote workouts per week',
  'personalized nutrition structure',
  'weekly grocery list',
  'daily missions and accountability dashboard',
  'five life pillars — scored and tracked',
  'strength and physique progress tracking',
  'daily check-ins',
  'weekly program reviews',
  'unlimited coach messaging',
  'form review via submitted video',
  'program adjustments based on your data',
  'recovery guidance',
  'final 8-week progress review',
  'next-phase roadmap',
];

const plans = [
  { label: 'pay in full',   amount: '$997',       note: 'one payment. immediate start.', primary: true,  href: STRIPE },
  { label: 'two payments',  amount: '$499 × 2',   note: 'message to set up.',            primary: false, href: null },
  { label: 'four payments', amount: '$250 × 4 / mo', note: 'message to set up.',         primary: false, href: null },
];

const GREEN = '#4a8c6a';

export default function EjbertEnroll() {
  return (
    <main style={{ background: '#000', minHeight: '100dvh', fontFamily: 'Inter, -apple-system, sans-serif', fontWeight: 300, color: '#EDEDE8', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 2rem' }}>
      <div style={{ maxWidth: '520px', width: '100%' }}>

        <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.48rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#3A3A3A', marginBottom: '2.5rem' }}>
          vveritas* coaching
        </div>

        <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 200, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '0.5rem' }}>
          8-week remote rebuild.
        </h1>
        <p style={{ fontSize: 'clamp(0.78rem, 1.2vw, 0.92rem)', color: '#5A5A5A', marginBottom: '3rem' }}>
          fully online. completely personalized.
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
                  <a
                    href={plan.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.5rem', letterSpacing: '0.15em', color: GREEN, textDecoration: 'none', whiteSpace: 'nowrap' }}
                  >
                    pay now →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        <a
          href={STRIPE}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'block', padding: '1.1rem 1.5rem', border: '1px solid #EDEDE8', color: '#EDEDE8', textDecoration: 'none', fontSize: 'clamp(0.85rem, 1.3vw, 1rem)', textAlign: 'center', letterSpacing: '0.01em', marginBottom: '1.5rem' }}
        >
          continue to payment →
        </a>

        <p style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.44rem', letterSpacing: '0.1em', color: '#2a2a2a', textAlign: 'center' }}>
          for payment plans — message directly to set up. start date confirmed once first payment is received.
        </p>

      </div>
    </main>
  );
}
