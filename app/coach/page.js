import { clients, payments, messages } from '../../lib/mockData';

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
  const stuckClients = clients.filter(c => c.status === 'stuck').length;
  const monthlyRevenue = payments
    .filter(p => p.date.startsWith('2026-07'))
    .reduce((sum, p) => sum + p.amount, 0);
  const totalUnread = clients.reduce((sum, c) => sum + (c.unread || 0), 0);

  const needsAttention = clients.filter(c => c.status === 'stuck' || c.unread > 0);

  return (
    <div className="coach-page">
      <div className="coach-page-header">
        <h1 className="coach-page-title">overview</h1>
        <span className="coach-page-date">july 13, 2026</span>
      </div>

      <div className="coach-stats-row">
        <Stat label="active clients" value={activeClients} />
        <Stat label="this month" value={`$${monthlyRevenue.toLocaleString()}`} />
        <Stat label="unread" value={totalUnread} />
        <Stat label="need attention" value={stuckClients} sub="no check-in" />
      </div>

      <section className="coach-section">
        <div className="coach-section-label">needs attention</div>
        {needsAttention.length === 0 ? (
          <div className="coach-empty">all clear.</div>
        ) : (
          needsAttention.map(c => (
            <div key={c.id} className="coach-alert-row">
              <div className="coach-alert-name">{c.name}</div>
              <div className="coach-alert-detail">
                {c.status === 'stuck' && <span className="badge-stuck">no check-in</span>}
                {c.unread > 0 && <span className="badge-unread">{c.unread} unread</span>}
              </div>
              <div className="coach-alert-tier">{c.tier}</div>
            </div>
          ))
        )}
      </section>

      <section className="coach-section">
        <div className="coach-section-label">all clients</div>
        {clients.map(c => (
          <div key={c.id} className="coach-client-row">
            <div className="coach-client-info">
              <span className="coach-client-name">{c.name}</span>
              <span className="coach-client-tier">{c.tier}</span>
            </div>
            <div className="coach-client-meta">
              <span className="coach-client-program">{c.program}</span>
              <span className={`coach-client-status ${c.status}`}>{c.status}</span>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
