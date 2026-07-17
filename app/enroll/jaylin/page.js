export const metadata = { title: 'vveritas* — enroll' };

const STRIPE = 'https://buy.stripe.com/8x214n5ie86C9y2dSV6wE0p';
const GREEN  = '#4a8c6a';

const items = [
  'personalized 8-week training plan',
  'personalized nutrition structure',
  'vveritas* dashboard',
  'daily accountability check-ins',
  'weekly review and program adjustments',
  'direct coach messaging',
  'form-video feedback',
  'recovery guidance',
  'mindset and consistency coaching',
  'grocery framework',
  'progress tracking',
];

const payments = [
  { n: 1, label: 'payment 1', amount: '$150', when: 'today — activates onboarding' },
  { n: 2, label: 'payment 2', amount: '$150', when: 'week 2' },
  { n: 3, label: 'payment 3', amount: '$150', when: 'week 4' },
  { n: 4, label: 'payment 4', amount: '$150', when: 'week 6' },
];

export default function JaylinEnroll() {
  return (
    <main style={{ background: '#000', minHeight: '100dvh', fontFamily: 'Inter, -apple-system, sans-serif', fontWeight: 300, color: '#EDEDE8', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 2rem' }}>
      <div style={{ maxWidth: '540px', width: '100%' }}>

        <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.48rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#3A3A3A', marginBottom: '2.5rem' }}>
          vveritas* coaching
        </div>

        <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 200, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '0.4rem' }}>
          8-week program.
        </h1>
        <p style={{ fontSize: 'clamp(0.72rem, 1.1vw, 0.86rem)', color: '#5A5A5A', marginBottom: '0.3rem' }}>
          built for jaylin.
        </p>
        <p style={{ fontSize: 'clamp(0.68rem, 1vw, 0.8rem)', color: '#3A3A3A', marginBottom: '3rem' }}>
          fully remote. fully personalized. four payments of $150.
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
            payment schedule
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {payments.map((p, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '6rem 4rem 1fr', alignItems: 'center', gap: '1rem', padding: '0.85rem 0', borderBottom: '1px solid #0d0d0d' }}>
                <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.44rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: i === 0 ? '#EDEDE8' : '#3A3A3A' }}>{p.label}</span>
                <span style={{ fontSize: i === 0 ? 'clamp(1rem, 1.6vw, 1.25rem)' : 'clamp(0.85rem, 1.2vw, 1rem)', fontWeight: 200, color: i === 0 ? '#EDEDE8' : '#5A5A5A' }}>{p.amount}</span>
                <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.42rem', color: '#3A3A3A', letterSpacing: '0.06em' }}>{p.when}</span>
              </div>
            ))}
            <div style={{ display: 'grid', gridTemplateColumns: '6rem 4rem 1fr', alignItems: 'center', gap: '1rem', padding: '0.85rem 0' }}>
              <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.44rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#3A3A3A' }}>total</span>
              <span style={{ fontSize: 'clamp(0.85rem, 1.2vw, 1rem)', fontWeight: 200, color: '#EDEDE8' }}>$600</span>
              <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.42rem', color: '#3A3A3A' }}>8 weeks</span>
            </div>
          </div>
        </div>

        <p style={{ fontSize: 'clamp(0.7rem, 1vw, 0.82rem)', color: '#5A5A5A', lineHeight: 1.75, marginBottom: '2rem', borderLeft: '1px solid #1a1a1a', paddingLeft: '1rem' }}>
          i understand that vveritas* provides the structure, programming, coaching, and accountability, while i am responsible for honest communication and execution. individual results depend on personal effort and consistency.
        </p>

        <a href={STRIPE} target="_blank" rel="noopener noreferrer" style={{ display: 'block', padding: '1.1rem 1.5rem', border: '1px solid #EDEDE8', color: '#EDEDE8', textDecoration: 'none', fontSize: 'clamp(0.85rem, 1.3vw, 1rem)', textAlign: 'center', letterSpacing: '0.01em', marginBottom: '1.5rem' }}>
          start my 8-week program →
        </a>

        <p style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.44rem', letterSpacing: '0.1em', color: '#2a2a2a', textAlign: 'center' }}>
          first payment of $150 due today. remaining payments every 2 weeks.
        </p>

      </div>
    </main>
  );
}
