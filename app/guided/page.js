import OfferPage from '../../components/OfferPage';

export const metadata = {
  title: 'guided — vveritas*',
  description: 'the full system built for you. 8 weeks of custom training, nutrition, and structure. no coaching. you execute alone.',
};

export default function Guided() {
  return (
    <OfferPage
      title="guided"
      priceLine="$497 — one-time"
      from="guided"
    >
      <p>
        you don't need someone checking on you every day. you need the system
        built correctly the first time — and then you run it.
      </p>
      <p>
        this is the full vveritas* framework built around your body, your schedule,
        and your goal. custom. not a template. handed off once. yours to execute.
      </p>

      <p className="muted" style={{ marginTop: '1.5rem' }}>what you get:</p>
      <ul className="blueprint-list">
        <li>custom 8-week training program — split, exercises, sets, reps, rest</li>
        <li>coaching notes on every movement</li>
        <li>personalized nutrition framework built around your goal and schedule</li>
        <li>weekly grocery lists — all 8 weeks built in advance</li>
        <li>meal structure — what to eat, when, and how much</li>
        <li>recovery protocol</li>
        <li>delivered within 5 days of intake</li>
      </ul>

      <p className="muted" style={{ marginTop: '1.5rem' }}>what's not included:</p>
      <ul className="blueprint-list">
        <li>direct coach messaging</li>
        <li>weekly reviews or adjustments</li>
        <li>daily check-ins</li>
      </ul>

      <p className="muted" style={{ marginTop: '1.5rem' }}>
        if you need the accountability layer on top of this — that's full coaching.
        this is for people who are ready to execute. they just need the structure.
      </p>
    </OfferPage>
  );
}
