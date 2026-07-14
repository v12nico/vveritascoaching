import OfferPage from '../../components/OfferPage';

export const metadata = { title: 'operator — vveritas*' };

export default function Operator() {
  return (
    <OfferPage
      title="operator"
      priceLine="$2,750 — 8 to 12 weeks"
      from="operator"
    >
      <p>
        everything in foundation, plus weekly 45-minute calls. direct access
        with a 24-hour response window. monthly protocol revisions based on
        your actual compliance data — not guesswork.
      </p>
      <p>
        this is real coaching. not just tracking. your numbers get reviewed,
        your protocol gets adjusted, your reasoning gets challenged.
      </p>
      <p>
        for people whose discipline also extends into how they think and make
        decisions — we can layer in the mental side too. it fits naturally
        or we don't force it.
      </p>
      <p className="muted">
        most people land here. it's priced that way on purpose — the gap
        from foundation should feel obvious once you've seen both.
      </p>
    </OfferPage>
  );
}
