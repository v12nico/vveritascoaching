import Link from 'next/link';
import Image from 'next/image';
import Back from '../../components/Back';
import Footer from '../../components/Footer';

const coaching = [
  { name: 'foundation', href: '/foundation', price: '$997' },
  { name: 'operator', href: '/operator', price: '$2,750' },
  { name: 'sovereign', href: '/sovereign', price: '$5,000' },
];

const programs = [
  { name: 'custom meal plan', href: '/meal-plan', price: '$50' },
  { name: 'custom workout', href: '/workout', price: '$50' },
  { name: 'meal + workout bundle', href: '/bundle', price: '$100' },
];

function MenuRow({ item }) {
  return (
    <Link href={item.href} className="menu-row">
      <span className="name">
        {item.name} <span className="arrow">↗</span>
      </span>
      <span className="price">{item.price}</span>
    </Link>
  );
}

export default function Work() {
  return (
    <main className="page">
      <Back href="/" />
      <div className="work-grid">
        <div>
          <section className="menu-section">
            <div className="menu-label">coaching</div>
            {coaching.map((item) => (
              <MenuRow key={item.href} item={item} />
            ))}
          </section>
          <section className="menu-section">
            <div className="menu-label">programs</div>
            {programs.map((item) => (
              <MenuRow key={item.href} item={item} />
            ))}
          </section>
        </div>
        <aside className="photo-col">
          <div className="photo-frame">
            <div className="inner">
              <Image
                src="/nico.jpg"
                alt="nico — vveritas*"
                fill
                sizes="(max-width: 820px) 100vw, 360px"
                priority
              />
            </div>
          </div>
          <div className="photo-frame" style={{ marginTop: '14px' }}>
            <div className="inner">
              <Image
                src="/nico2.jpg"
                alt="nico — vveritas*"
                fill
                sizes="(max-width: 820px) 100vw, 360px"
              />
            </div>
          </div>
          <div className="photo-caption">nico — vveritas*</div>
        </aside>
      </div>
      <Footer />
    </main>
  );
}
