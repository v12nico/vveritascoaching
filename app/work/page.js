import Link from 'next/link';
import Image from 'next/image';
import Back from '../../components/Back';
import Footer from '../../components/Footer';
import LeadForm from '../../components/LeadForm';

const coaching = [
  { name: 'remote coaching', href: '/remote', label: 'online' },
  { name: 'hybrid coaching', href: '/hybrid', label: 'hybrid' },
  { name: 'elite transformation', href: '/elite', label: 'in-person' },
];

const programs = [
  { name: 'custom meal plan', href: '/meal-plan', label: '$50' },
  { name: 'custom workout', href: '/workout', label: '$50' },
  { name: 'meal + workout bundle', href: '/bundle', label: '$100' },
];

const screenshots = [
  { src: '/portal-score.png',    label: 'self-mastery score' },
  { src: '/portal-mission.png',  label: 'daily mission' },
  { src: '/portal-fitness.png',  label: 'training program' },
  { src: '/portal-messages.png', label: 'coach messages' },
];

const system = [
  'personalized training program built around your schedule',
  'nutrition framework — no calorie counting, no guesswork',
  'weekly grocery list, built for your goals',
  'daily accountability dashboard',
  'progress tracking — weight, body composition, strength',
  'weekly check-ins and program adjustments',
  'unlimited coach messaging',
];

function MenuRow({ item }) {
  return (
    <Link href={item.href} className="menu-row">
      <span className="name">{item.name} <span className="arrow">↗</span></span>
      <span className="price">{item.label}</span>
    </Link>
  );
}

export default function Work() {
  return (
    <main className="page">
      <Back href="/" />

      <div className="work-menu">
        <section className="menu-section">
          <div className="menu-label">coaching</div>
          {coaching.map(item => <MenuRow key={item.href} item={item} />)}
        </section>
        <section className="menu-section">
          <div className="menu-label">programs</div>
          {programs.map(item => <MenuRow key={item.href} item={item} />)}
        </section>
      </div>

      <div className="work-divider" />

      <div className="screenshots-scroll">
        {screenshots.map(s => (
          <div key={s.src} className="screenshot-card">
            <div className="screenshot-img">
              <Image src={s.src} alt={s.label} fill sizes="220px" style={{ objectFit: 'cover', objectPosition: 'top' }} />
            </div>
            <span className="screenshot-label">{s.label}</span>
          </div>
        ))}
      </div>

      <div className="work-divider" />

      <div className="work-system">
        <div className="menu-label">what&apos;s inside the system</div>
        <ul className="system-list">
          {system.map(item => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="work-cta-block">
        <p className="work-cta-line">
          book a call. i&apos;ll show you exactly how vveritas* coaching gets built around you.
        </p>
        <LeadForm />
      </div>

      <Footer />
    </main>
  );
}
