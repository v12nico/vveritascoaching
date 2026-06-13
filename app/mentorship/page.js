import OfferPage from '../../components/OfferPage';

export const metadata = { title: 'the mentorship — vveritas*' };

export default function Mentorship() {
  return (
    <OfferPage
      title="the mentorship"
      priceLine="$500 — or 8 × $62.50 / week"
      from="the mentorship"
    >
      <p>
        everything in the blueprint, plus me in your corner. weekly check-ins,
        form review on video, a direct line when you need it.
      </p>
      <p>
        60 days of programming that adjusts as you move. we track everything.
        when something stalls, we fix it that week — not next month.
      </p>
      <p className="muted">
        for people who want the system and the accountability behind it.
      </p>
    </OfferPage>
  );
}
