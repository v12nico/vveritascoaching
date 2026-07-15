import OfferPage from '../../components/OfferPage';

export const metadata = { title: 'remote coaching — vveritas*' };

export default function Remote() {
  return (
    <OfferPage
      title="remote coaching"
      priceLine="from $600 — fully online"
      ctaHref="/enroll"
      ctaLabel="enroll →"
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
      <p className="muted">4 weeks — $600 &nbsp;·&nbsp; 8 weeks — $1,100 &nbsp;·&nbsp; 12 weeks — $1,500</p>
      <p className="muted">
        includes: personalized fitness program, nutrition framework, grocery lists,
        vveritas* dashboard, weekly accountability call, unlimited messaging,
        video form review, and progress tracking.
      </p>
    </OfferPage>
  );
}
