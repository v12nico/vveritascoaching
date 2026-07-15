'use client';
import { useState } from 'react';

export default function LeadForm() {
  const [form, setForm] = useState({ name: '', email: '', goal: '' });
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  async function submit(e) {
    e.preventDefault();
    setSending(true);
    try {
      await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, looking: form.goal, product: 'general inquiry' }),
      });
    } catch { /* silent */ }
    setDone(true);
    setSending(false);
  }

  if (done) {
    return (
      <div className="lead-done">
        <p>got it. let&apos;s talk.</p>
        <a
          href="https://calendly.com/vveritascoaching/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="lead-cta"
        >
          book your call →
        </a>
      </div>
    );
  }

  return (
    <form className="lead-form" onSubmit={submit}>
      <div className="lead-field">
        <label>name</label>
        <input type="text" required placeholder="your name" value={form.name} onChange={e => set('name', e.target.value)} />
      </div>
      <div className="lead-field">
        <label>email</label>
        <input type="email" required placeholder="your email" value={form.email} onChange={e => set('email', e.target.value)} />
      </div>
      <div className="lead-field">
        <label>what&apos;s your main goal right now?</label>
        <textarea required placeholder="be specific — where you are, where you want to be." rows={3} value={form.goal} onChange={e => set('goal', e.target.value)} />
      </div>
      <button type="submit" className="lead-cta" disabled={sending}>
        {sending ? 'sending…' : 'book a call →'}
      </button>
    </form>
  );
}
