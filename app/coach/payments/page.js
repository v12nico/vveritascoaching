import { clients, payments } from '../../../lib/mockData';

export default function PaymentsPage() {
  const thisMonth = payments.filter(p => p.date.startsWith('2026-07'));
  const lastMonth = payments.filter(p => p.date.startsWith('2026-06'));
  const thisMonthRevenue = thisMonth.reduce((s, p) => s + p.amount, 0);
  const lastMonthRevenue = lastMonth.reduce((s, p) => s + p.amount, 0);
  const delta = thisMonthRevenue - lastMonthRevenue;

  const allSorted = [...payments].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="coach-page">
      <div className="coach-page-header">
        <h1 className="coach-page-title">payments</h1>
      </div>

      <div className="coach-stats-row">
        <div className="coach-stat">
          <div className="coach-stat-value">${thisMonthRevenue.toLocaleString()}</div>
          <div className="coach-stat-label">july 2026</div>
        </div>
        <div className="coach-stat">
          <div className="coach-stat-value">${lastMonthRevenue.toLocaleString()}</div>
          <div className="coach-stat-label">june 2026</div>
        </div>
        <div className="coach-stat">
          <div className={`coach-stat-value ${delta >= 0 ? 'positive' : 'negative'}`}>
            {delta >= 0 ? '+' : ''}${delta.toLocaleString()}
          </div>
          <div className="coach-stat-label">mom change</div>
        </div>
        <div className="coach-stat">
          <div className="coach-stat-value">{clients.length}</div>
          <div className="coach-stat-label">active clients</div>
        </div>
      </div>

      <section className="coach-section">
        <div className="coach-section-label">client mrr</div>
        {clients.map(c => (
          <div key={c.id} className="coach-payment-row">
            <span className="coach-payment-name">{c.name}</span>
            <span className="coach-payment-tier">{c.tier}</span>
            <span className="coach-payment-amount">${c.price}/mo</span>
            <span className={`coach-client-status ${c.status}`}>{c.status}</span>
          </div>
        ))}
      </section>

      <section className="coach-section">
        <div className="coach-section-label">payment history</div>
        <div className="coach-payment-table">
          <div className="coach-payment-table-head">
            <span>client</span>
            <span>tier</span>
            <span>amount</span>
            <span>date</span>
            <span>status</span>
          </div>
          {allSorted.map((p, i) => {
            const c = clients.find(cl => cl.id === p.clientId);
            return (
              <div key={i} className="coach-payment-table-row">
                <span>{c?.name || '—'}</span>
                <span>{p.tier}</span>
                <span>${p.amount.toLocaleString()}</span>
                <span>{p.date}</span>
                <span className={`payment-status ${p.status}`}>{p.status}</span>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
