export const metadata = { title: 'vveritas* — enroll' };

const GREEN = '#4a8c6a';

const items = [
  'personalized training plan',
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

export default function JaylinEnroll() {
  return (
    <main style={{ background: '#000', minHeight: '100dvh', fontFamily: 'Inter, -apple-system, sans-serif', fontWeight: 300, color: '#EDEDE8', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 2rem' }}>
      <div style={{ maxWidth: '540px', width: '100%' }}>

        <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.48rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#3A3A3A', marginBottom: '2.5rem' }}>
          vveritas* coaching
        </div>

        <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 200, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '0.4rem' }}>
          personalized coaching.
        </h1>
        <p style={{ fontSize: 'clamp(0.72rem, 1.1vw, 0.86rem)', color: '#5A5A5A', marginBottom: '0.3rem' }}>
          built for jaylin.
        </p>
        <p style={{ fontSize: 'clamp(0.68rem, 1vw, 0.8rem)', color: '#3A3A3A', marginBottom: '3rem' }}>
          fully remote. fully personalized. month to month.
        </p>

        <div style={{ borderTop: '1px solid #141414', paddingTop: '2rem', marginBottom: '2.5rem' }}>
          <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.46rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#3A3A3A', marginBottom: '1.2rem' }}>
            what&apos;s included every month
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
          <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.46rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#3A3A3A', marginBottom: '0.6rem' }}>
            monthly investment
          </div>
          <div style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 200, letterSpacing: '-0.05em', color: '#EDEDE8', lineHeight: 1, marginBottom: '0.5rem' }}>
            $497
          </div>
          <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.44rem', color: '#3A3A3A', letterSpacing: '0.1em' }}>
            per month — billed monthly
          </div>
        </div>

        <div style={{ borderTop: '1px solid #141414', paddingTop: '2rem', marginBottom: '2.5rem' }}>
          <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.46rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#3A3A3A', marginBottom: '1.2rem' }}>
            enrollment details
          </div>
          {[
            { label: 'full name',         placeholder: 'jaylin' },
            { label: 'email',             placeholder: 'your email address' },
            { label: 'phone',             placeholder: 'your phone number' },
            { label: 'preferred start',   placeholder: 'preferred start date' },
          ].map((field, i) => (
            <div key={i} style={{ marginBottom: '1rem' }}>
              <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.42rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#3A3A3A', marginBottom: '0.3rem' }}>{field.label}</div>
              <input type="text" placeholder={field.placeholder}
                style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid #141414', color: '#EDEDE8', fontFamily: 'Inter, sans-serif', fontSize: 'clamp(0.78rem, 1.15vw, 0.9rem)', fontWeight: 300, padding: '0.5rem 0', outline: 'none', boxSizing: 'border-box' }} />
            </div>
          ))}
        </div>

        <p style={{ fontSize: 'clamp(0.7rem, 1vw, 0.82rem)', color: '#5A5A5A', lineHeight: 1.75, marginBottom: '2rem', borderLeft: '1px solid #1a1a1a', paddingLeft: '1rem' }}>
          i understand that vveritas* provides the structure, programming, coaching, and accountability, while i am responsible for honest communication and execution. i acknowledge that individual results depend on personal effort and consistency.
        </p>

        <p style={{ fontSize: 'clamp(0.68rem, 0.95vw, 0.78rem)', color: '#3A3A3A', lineHeight: 1.75, marginBottom: '1.5rem' }}>
          your first payment activates onboarding and plan development. billing begins on your confirmed start date. cancellation policy confirmed directly with your coach.
        </p>

        <div style={{ padding: '1.1rem 1.5rem', border: '1px solid #3A3A3A', color: '#3A3A3A', fontSize: 'clamp(0.82rem, 1.2vw, 0.92rem)', textAlign: 'center', letterSpacing: '0.01em', marginBottom: '1.5rem', fontFamily: 'ui-monospace, monospace', fontSize: '0.52rem' }}>
          payment link — to be sent directly
        </div>

        <p style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.44rem', letterSpacing: '0.1em', color: '#2a2a2a', textAlign: 'center' }}>
          message your coach directly to confirm enrollment and payment setup.
        </p>

      </div>
    </main>
  );
}
