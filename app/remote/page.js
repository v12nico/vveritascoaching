import OfferPage from '../../components/OfferPage';

export const metadata = { title: 'remote coaching — vveritas*' };

export default function Remote() {
  return (
    <OfferPage
      title="remote coaching"
      priceLine="fully online"
      from="remote coaching"
      ctaLabel="apply →"
    >
      <p>
        the complete vveritas* system delivered remotely. personalized training,
        structured nutrition, grocery lists, daily accountability, and a coach
        who stays on top of you between sessions — all online.
      </p>
      <p>
        train at your gym, on your schedule. no location required.
        this is how most clients work with me and it works.
      </p>
      <p className="muted">
        includes: personalized fitness program, nutrition framework, grocery lists,
        vveritas* dashboard, weekly accountability call, unlimited messaging,
        video form review, and progress tracking.
      </p>
    </OfferPage>
  );
}
