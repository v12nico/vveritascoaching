'use client';
import Link from 'next/link';
import { useState } from 'react';
import { clients, pillars } from '../../../lib/mockData';

function getSMS(clientId) {
  const p = pillars.find(p => p.clientId === clientId);
  if (!p) return null;
  return Math.round(p.data.reduce((s, x) => s + x.score, 0) / p.data.length);
}

function getPillars(clientId) {
  const p = pillars.find(p => p.clientId === clientId);
  return p ? p.data : [];
}

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
        {clients.map(c => {
          const sms = getSMS(c.id);
          const smsColor = sms >= 70 ? '#4a8c6a' : sms >= 40 ? '#8c7a3a' : '#5C1A1A';
          const clientPillars = getPillars(c.id);
          return (
            <div key={c.id} className="coach-client-card-wrap">
              <Link href={`/coach/clients/${c.id}`} className="coach-client-card">
                <div className="coach-client-card-top">
                  <div className="coach-client-card-name">{c.name}</div>
                  <span className={`coach-client-status ${c.status}`}>{c.status}</span>
                </div>
                <div className="coach-client-card-tier">{c.tier} · ${c.price}/mo</div>

                {sms && (
                  <div className="coach-card-sms">
                    <span className="coach-card-sms-label">self-mastery</span>
                    <span className="coach-card-sms-val" style={{ color: smsColor }}>{sms}</span>
                  </div>
                )}

                {clientPillars.length > 0 && (
                  <div className="coach-card-pillars">
                    {clientPillars.map((p, i) => {
                      const c = p.score >= 70 ? '#4a8c6a' : p.score >= 40 ? '#8c7a3a' : '#5C1A1A';
                      return (
                        <div key={i} className="coach-card-pillar">
                          <div className="coach-card-pillar-name">{p.name.slice(0, 4)}</div>
                          <div className="coach-card-pillar-track">
                            <div className="coach-card-pillar-fill" style={{ width: `${p.score}%`, background: c }} />
                          </div>
                          <div className="coach-card-pillar-score" style={{ color: c }}>{p.score}</div>
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="coach-client-card-footer">
                  <span>started {c.startDate}</span>
                  {c.unread > 0 && <span className="badge-unread">{c.unread} new</span>}
                </div>
                <div className="coach-client-card-goal">"{c.goal}"</div>
              </Link>
              <CopyLinkBtn token={c.token} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
