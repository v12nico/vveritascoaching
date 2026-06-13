import OfferPage from '../../components/OfferPage';

export const metadata = { title: 'the competitor — vveritas*' };

export default function Competitor() {
  return (
    <OfferPage
      title="the competitor"
      priceLine="$1,000 — or 4 × $250"
      from="the competitor"
    >
      <p>
        the highest tier. daily access, full system, competition prep, custom
        macros, 90 days of programming built for one outcome — you at your peak.
      </p>
      <p>
        this is for people stepping on stage, into a meet, or into a season
        where second place isn&apos;t the plan. everything is dialed: training,
        nutrition, recovery, timing.
      </p>
      <p className="muted">
        application-based. i don&apos;t take everyone. apply, we talk, we decide
        together.
      </p>
    </OfferPage>
  );
}
