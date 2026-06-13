import Link from 'next/link';
import Back from './Back';
import Footer from './Footer';

export default function OfferPage({ title, priceLine, children, from, secondary }) {
  return (
    <main className="page">
      <Back />
      <div className="offer">
        <h1>{title}</h1>
        <div className="price-line">{priceLine}</div>
        {children}
        <div>
          <Link href={`/ready?from=${encodeURIComponent(from)}`} className="ready-cta">
            ready
          </Link>
        </div>
        {secondary}
      </div>
      <Footer />
    </main>
  );
}
