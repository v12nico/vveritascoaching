import OfferPage from '../../components/OfferPage';

export const metadata = { title: 'sovereign — vveritas*' };

export default function Sovereign() {
  return (
    <OfferPage
      title="sovereign"
      priceLine="$5,000 — 12 weeks"
      from="sovereign"
    >
      <p>
        everything in operator. twice-weekly calls. daily async check-ins.
        same-day response. i review your compliance log personally — not
        automated data, your actual behavior.
      </p>
      <p>
        high-frequency access means high-frequency accountability. the
        standard doesn't move. but i'm there with you every step.
      </p>
      <p className="muted">
        capped at 3 to 5 people at a time. the scarcity is real —
        bandwidth is the actual constraint. apply and we'll talk.
      </p>
    </OfferPage>
  );
}
