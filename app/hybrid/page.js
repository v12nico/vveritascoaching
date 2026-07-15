import OfferPage from '../../components/OfferPage';

export const metadata = { title: 'hybrid coaching — vveritas*' };

export default function Hybrid() {
  return (
    <OfferPage
      title="hybrid coaching"
      priceLine="from $1,200 — 1 in-person session / week"
      ctaHref="/enroll"
      ctaLabel="enroll →"
    >
      <p>
        one in-person session every week — to coach your form, push your performance,
        and hold the standard. the full vveritas* system runs every other day so
        you're not on your own between sessions.
      </p>
      <p>
        this is what most people actually need. not more time with a trainer.
        a system that works the other 167 hours of the week.
      </p>
      <p className="muted">4 weeks — $1,200 &nbsp;·&nbsp; 8 weeks — $2,300 &nbsp;·&nbsp; 12 weeks — $3,300</p>
      <p className="muted">
        includes: 1 in-person session/week, personalized training for independent days,
        nutrition framework, grocery lists, vveritas* dashboard, weekly accountability,
        unlimited messaging, video form review, and progress tracking.
      </p>
      <p className="muted">
        in-person sessions available in the baltimore / prince george's county area only.
      </p>
    </OfferPage>
  );
}
