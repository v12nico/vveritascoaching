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
        not ready for full coaching? just want the system handed to you?
        the blueprint is a custom training and nutrition plan built specifically
        around your body, your schedule, and your goal. no templates. no guesswork.
      </p>
      <p>you fill out the intake. i build everything. you run it.</p>

      <p className="muted" style={{ marginTop: '1.5rem' }}>what&apos;s included:</p>
      <ul className="blueprint-list">
        <li>custom 30-day training program — split, exercises, sets, reps, rest</li>
        <li>coaching notes on every movement</li>
        <li>personalized nutrition framework built around your goal</li>
        <li>weekly grocery list</li>
        <li>meal structure — what to eat, when, and how much</li>
        <li>supplement recommendations if applicable</li>
        <li>delivered within 5 days of intake</li>
        <li>yours to run forever</li>
      </ul>
    </OfferPage>
  );
}
