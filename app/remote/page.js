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
        the complete vveritas* system delivered remotely. same coaching philosophy,
        same accountability structure, same personalized programming —
        no in-person requirement.
      </p>
      <p>
        built for people who travel, prefer their own gym, or want a serious
        coaching system without a location constraint. the quality doesn't change.
        the access does.
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
