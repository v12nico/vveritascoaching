import OfferPage from '../../components/OfferPage';

export const metadata = { title: 'the blueprint — vveritas*' };

export default function Blueprint() {
  return (
    <OfferPage
      title="the blueprint"
      priceLine="$250 — one-time"
      from="the blueprint"
    >
      <p>
        a custom workout and nutrition blueprint, built around your body, your
        schedule, and your goal. 30 days of programming. nothing generic.
      </p>
      <p>
        you fill out the intake, i build the system. primal nutrition,
        structured training, clear sequencing. you stop guessing.
      </p>
      <p className="muted">
        delivered within 5 days of intake. yours to run forever.
      </p>
    </OfferPage>
  );
}
