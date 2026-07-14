import Link from 'next/link';
import { clients, payments, messages, pillars } from '../../lib/mockData';

function getSMS(clientId) {
  const p = pillars.find(p => p.clientId === clientId);
  if (!p) return null;
  return Math.round(p.data.reduce((s, x) => s + x.score, 0) / p.data.length);
}

function Stat({ label, value, sub }) {
  return (
    <div className="coach-stat">
      <div className="coach-stat-value">{value}</div>
      <div className="coach-stat-label">{label}</div>
      {sub && <div className="coach-stat-sub">{sub}</div>}
    </div>
  );
}

export default function CoachDashboard() {
  const activeClients = clients.filter(c => c.status === 'active').length;
  const monthlyRevenue = payments
    .filter(p => p.date.startsWith('2026-07'))
    .reduce((sum, p) => sum + p.amount, 0);
  const totalUnread = clients.reduce((sum, c) => sum + (c.unread || 0), 0);
  const needsAttention = clients.filter(c => c.status === 'stuck' || c.unread > 0);

  const smsScores = clients.map(c => getSMS(c.id)).filter(Boolean);
  const avgSMS = smsScores.length
    ? Math.round(smsScores.reduce((a, b) => a + b, 0) / smsScores.length)
    : null;

  return (
    <div className="coach-page">
      <div className="coach-page-header">
        <h1 className="coach-page-title">overview</h1>
        <span className="coach-page-date">july 14, 2026</span>
      </div>

      <div className="coach-stats-row">
        <Stat label="active clients" value={activeClients} />
        <Stat label="this month" value={`$${monthlyRevenue.toLocaleString()}`} />
        <Stat label="avg self-mastery" value={avgSMS ?? '—'} />
        <Stat label="unread" value={totalUnread} />
      </div>

      <section className="coach-section">
        <div className="coach-section-label">needs attention</div>
        {needsAttention.length === 0 ? (
          <div className="coach-empty">all clear.</div>
        ) : (
          needsAttention.map(c => (
            <Link key={c.id} href={`/coach/clients/${c.id}`} className="coach-alert-row" style={{ display: 'flex', textDecoration: 'none' }}>
              <div className="coach-alert-name">{c.name}</div>
              <div className="coach-alert-detail">
                {c.status === 'stuck' && <span className="badge-stuck">no check-in</span>}
                {c.unread > 0 && <span className="badge-unread">{c.unread} unread</span>}
              </div>
              <div className="coach-alert-tier">{c.tier}</div>
            </Link>
          ))
        )}
      </section>

      <section className="coach-section">
        <div className="coach-section-label">all clients</div>
        {clients.map(c => {
          const sms = getSMS(c.id);
          const smsColor = sms >= 70 ? '#4a8c6a' : sms >= 40 ? '#8c7a3a' : '#5C1A1A';
          return (
            <Link key={c.id} href={`/coach/clients/${c.id}`} className="coach-client-row" style={{ textDecoration: 'none' }}>
              <div className="coach-client-info">
                <span className="coach-client-name">{c.name}</span>
                <span className="coach-client-tier">{c.tier}</span>
              </div>
              <div className="coach-client-meta">
                {sms && (
                  <span className="coach-sms-chip" style={{ color: smsColor }}>
                    {sms} sms
                  </span>
                )}
                <span className={`coach-client-status ${c.status}`}>{c.status}</span>
              </div>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
