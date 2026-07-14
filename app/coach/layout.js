import CoachShell from '../../components/coach/CoachShell';

export const metadata = {
  title: 'coach — vveritas*',
};

export default function CoachLayout({ children }) {
  return <CoachShell>{children}</CoachShell>;
}
