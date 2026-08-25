// Generic default only. Each pitch page exports its own metadata; a hardcoded
// prospect name here leaks onto every sub-route that doesn't (e.g. /notes).
export const metadata = { title: 'vveritas*' };
export default function PitchLayout({ children }) {
  return <div style={{ background: '#000', minHeight: '100vh' }}>{children}</div>;
}
