import OfferPage from '../../components/OfferPage';

export const metadata = { title: 'the system — vveritas*' };

export default function System() {
  return (
    <OfferPage
      title="the system"
      priceLine="$— — opening soon"
      from="the system"
    >
      <p>
        meal plans and workouts as one complete physical system. you follow it,
        you stop guessing, you build the body that lets you do everything else.
      </p>
      <p className="muted">not open yet. hit ready and you&apos;ll be first to know.</p>
    </OfferPage>
  );
}
