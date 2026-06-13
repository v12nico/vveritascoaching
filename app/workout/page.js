import Link from 'next/link';
import OfferPage from '../../components/OfferPage';

export const metadata = { title: 'custom workout — vveritas*' };

export default function Workout() {
  return (
    <OfferPage
      title="custom workout"
      priceLine="$50 — one-time"
      from="custom workout"
      secondary={
        <Link href="/workout/build" className="secondary-link">
          already purchased? build your program →
        </Link>
      }
    >
      <p>
        a training program built for your level, your equipment, and your goal.
        progressive overload, clear structure, no junk volume.
      </p>
      <p>
        2 sets to failure. heavy. every movement has a reason.
        whether it&apos;s push/pull/legs or upper/lower — the split fits your schedule.
      </p>
      <p className="muted">delivered to your email after intake.</p>
    </OfferPage>
  );
}
