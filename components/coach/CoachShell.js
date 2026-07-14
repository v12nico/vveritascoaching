'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const nav = [
  { label: 'overview',  href: '/coach' },
  { label: 'clients',   href: '/coach/clients' },
  { label: 'programs',  href: '/coach/programs' },
  { label: 'messages',  href: '/coach/messages' },
  { label: 'payments',  href: '/coach/payments' },
  { label: 'nutrition', href: '/coach/nutrition' },
];

export default function CoachShell({ children }) {
  const path = usePathname();

  return (
    <div className="coach-shell">
      <aside className="coach-sidebar">
        <div className="coach-brand">
          <span className="coach-brand-name">vveritas*</span>
          <span className="coach-brand-sub">coaching</span>
        </div>
        <nav className="coach-nav">
          {nav.map(({ label, href }) => {
            const active = path === href || (href !== '/coach' && path.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={`coach-nav-item${active ? ' active' : ''}`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="coach-sidebar-footer">
          <Link href="/" className="coach-nav-item dim">← site</Link>
        </div>
      </aside>
      <main className="coach-main">
        {children}
      </main>
    </div>
  );
}
