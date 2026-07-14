'use client';
import { useState } from 'react';
import { clients, messages } from '../../../lib/mockData';

export default function MessagesPage() {
  const [active, setActive] = useState(clients[0].id);

  const activeClient = clients.find(c => c.id === active);
  const thread = messages.find(m => m.clientId === active);

  return (
    <div className="coach-page coach-messages-layout">
      <aside className="coach-thread-list">
        <div className="coach-section-label" style={{padding:'0 0 1rem'}}>conversations</div>
        {clients.map(c => {
          const t = messages.find(m => m.clientId === c.id);
          const last = t?.thread[t.thread.length - 1];
          return (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className={`coach-thread-item${active === c.id ? ' active' : ''}`}
            >
              <div className="coach-thread-item-top">
                <span className="coach-thread-name">{c.name}</span>
                {c.unread > 0 && <span className="badge-unread">{c.unread}</span>}
              </div>
              <div className="coach-thread-preview">
                {last ? last.text.slice(0, 48) + (last.text.length > 48 ? '…' : '') : 'no messages'}
              </div>
            </button>
          );
        })}
      </aside>

      <div className="coach-thread-main">
        <div className="coach-thread-header">
          <span className="coach-thread-header-name">{activeClient?.name}</span>
          <span className="coach-thread-header-tier">{activeClient?.tier}</span>
        </div>

        <div className="coach-thread-body">
          {thread ? thread.thread.map((msg, i) => (
            <div key={i} className={`coach-msg ${msg.from}`}>
              <div className="coach-msg-text">{msg.text}</div>
              <div className="coach-msg-time">{msg.time}</div>
            </div>
          )) : (
            <div className="coach-empty">no messages yet.</div>
          )}
        </div>

        <div className="coach-msg-input-row">
          <input type="text" placeholder={`message ${activeClient?.name}...`} className="coach-msg-input" />
          <button className="coach-btn">send</button>
        </div>
      </div>
    </div>
  );
}
