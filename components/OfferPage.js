import Link from 'next/link';
import Back from './Back';
import Footer from './Footer';

export default function OfferPage({ title, priceLine, children, from, secondary, ctaHref, ctaLabel }) {
  const href = ctaHref || `/ready?from=${encodeURIComponent(from)}`;
  const label = ctaLabel || 'ready';
  return (
    <main className="page">
      <Back />
      <div className="offer">
        <h1>{title}</h1>
        {priceLine && <div className="price-line">{priceLine}</div>}
        {children}
        <div>
          <Link href={href} className="ready-cta">
            {label}
          </Link>
        </div>
        {secondary}
      </div>
      <Footer />
    </main>
  );
}
