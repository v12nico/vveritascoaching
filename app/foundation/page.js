import OfferPage from '../../components/OfferPage';

export const metadata = { title: 'foundation — vveritas*' };

export default function Foundation() {
  return (
    <OfferPage
      title="foundation"
      priceLine="$997 — 8 weeks"
      from="foundation"
    >
      <p>
        the framework. built around all three pillars — training and nutrition,
        mindset non-negotiables, truth-seeking practice. custom to you, not
        a template.
      </p>
      <p>
        you get access to the standard dashboard. you track your own compliance.
        bi-weekly 30-minute call to review what's actually happening. async
        access with a 48-hour response window.
      </p>
      <p>
        this tier is not passive. the structure is here. the question is whether
        you'll hold it.
      </p>
      <p className="muted">
        8 weeks. no daily coaching. this is accountability, not hand-holding.
        for people who need the framework and are willing to do the work alone.
      </p>
    </OfferPage>
  );
}
