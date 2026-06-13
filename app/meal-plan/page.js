import Link from 'next/link';
import OfferPage from '../../components/OfferPage';

export const metadata = { title: 'custom meal plan — vveritas*' };

export default function MealPlan() {
  return (
    <OfferPage
      title="custom meal plan"
      priceLine="$50 — one-time"
      from="custom meal plan"
      secondary={
        <Link href="/meal-plan/build" className="secondary-link">
          already purchased? build your plan →
        </Link>
      }
    >
      <p>
        primal, ancestral nutrition built around the way your body actually
        works. real food. grass-fed, pasture-raised, nothing from a lab.
      </p>
      <p>
        built for your goal, your eating window, your budget. no seed oils, no
        guesswork, no 40-page pdf you&apos;ll never read.
      </p>
      <p className="muted">one plan. clear. yours.</p>
    </OfferPage>
  );
}
