import OfferPage from '../../components/OfferPage';

export const metadata = { title: 'elite transformation — vveritas*' };

export default function Elite() {
  return (
    <OfferPage
      title="elite transformation"
      priceLine="from $2,400 — 3 in-person sessions / week"
      ctaHref="/enroll"
      ctaLabel="enroll →"
    >
      <p>
        maximum hands-on coaching. three sessions a week with me, the full vveritas*
        dashboard, personalized nutrition, grocery structure, and daily accountability.
        the highest level of access i offer.
      </p>
      <p>
        every rep coached in person. every meal structured. every week reviewed.
        nothing slips through.
      </p>
      <p className="muted">4 weeks — $2,400 &nbsp;·&nbsp; 8 weeks — $4,600 &nbsp;·&nbsp; 12 weeks — $6,600</p>
      <p className="muted">
        includes: personalized training program, nutrition framework, grocery lists,
        vveritas* dashboard, progress tracking, habit coaching, unlimited messaging,
        priority scheduling, and recovery guidance.
      </p>
      <p className="muted">
        in-person sessions available in the baltimore / prince george's county area only.
      </p>
    </OfferPage>
  );
}
