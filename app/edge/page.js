import OfferPage from '../../components/OfferPage';

export const metadata = { title: 'the edge — vveritas*' };

export default function Edge() {
  return (
    <OfferPage
      title="the edge"
      priceLine="$— / month — opening soon"
      from="the edge"
    >
      <p>
        the top tier. elite athlete identity, trading discipline, content
        strategy — the full operating system, not just the body.
      </p>
      <p className="muted">not open yet. hit ready and you&apos;ll be first to know.</p>
    </OfferPage>
  );
}
