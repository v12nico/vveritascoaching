import OfferPage from '../../components/OfferPage';

export const metadata = { title: 'meal + workout bundle — vveritas*' };

export default function Bundle() {
  return (
    <OfferPage
      title="meal + workout bundle"
      priceLine="$100 — one-time, saves $50"
      from="meal + workout bundle"
    >
      <p>
        the meal plan and the workout, built around each other. food fuels the
        training, training shapes the food. one system instead of two pieces.
      </p>
      <p>
        this is the right call if you&apos;re starting from scratch or
        rebuilding after time off — everything aligned from day one.
      </p>
      <p className="muted">both delivered together within 5 days of intake.</p>
    </OfferPage>
  );
}
