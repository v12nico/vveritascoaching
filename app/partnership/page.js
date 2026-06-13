import OfferPage from '../../components/OfferPage';

export const metadata = { title: 'the partnership — vveritas*' };

export default function Partnership() {
  return (
    <OfferPage
      title="the partnership"
      priceLine="$— / month — minimum 90 days"
      from="the partnership"
    >
      <p>
        the real one. body, mind, money, mission — all of it on the table.
        full system access, daily line to me, everything tracked.
      </p>
      <p className="muted">
        application-based. not open yet. hit ready and you&apos;ll be first to
        know.
      </p>
    </OfferPage>
  );
}
