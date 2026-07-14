'use client';
import Link from 'next/link';
import { useState } from 'react';
import { clients } from '../../../lib/mockData';

function CopyLinkBtn({ token }) {
  const [copied, setCopied] = useState(false);
  function copy(e) {
    e.preventDefault();
    const url = `${window.location.origin}/portal/${token}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }
  return (
    <button className="coach-copy-link" onClick={copy}>
      {copied ? 'copied' : 'copy portal link'}
    </button>
  );
}

export default function ClientsPage() {
  return (
    <div className="coach-page">
      <div className="coach-page-header">
        <h1 className="coach-page-title">clients</h1>
        <span className="coach-count">{clients.length} total</span>
      </div>

      <div className="coach-client-grid">
        {clients.map(c => (
          <div key={c.id} className="coach-client-card-wrap">
            <Link href={`/coach/clients/${c.id}`} className="coach-client-card">
              <div className="coach-client-card-top">
                <div className="coach-client-card-name">{c.name}</div>
                <span className={`coach-client-status ${c.status}`}>{c.status}</span>
              </div>
              <div className="coach-client-card-tier">{c.tier} · ${c.price}/mo</div>
              <div className="coach-client-card-program">{c.program}</div>
              <div className="coach-client-card-footer">
                <span>last workout: {c.lastWorkout}</span>
                {c.unread > 0 && <span className="badge-unread">{c.unread} new</span>}
              </div>
              <div className="coach-client-card-goal">{c.goal}</div>
            </Link>
            <CopyLinkBtn token={c.token} />
          </div>
        ))}
      </div>
    </div>
  );
}
