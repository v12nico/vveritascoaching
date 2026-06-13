'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Back from '../../components/Back';
import Footer from '../../components/Footer';

// stripe payment links per product — swap in real links
const STRIPE_LINKS = {
  'the blueprint': process.env.NEXT_PUBLIC_STRIPE_BLUEPRINT || '',
  'the mentorship': process.env.NEXT_PUBLIC_STRIPE_MENTORSHIP || '',
  'the competitor': process.env.NEXT_PUBLIC_STRIPE_COMPETITOR || '',
  'custom meal plan': process.env.NEXT_PUBLIC_STRIPE_MEALPLAN || '',
  'custom workout': process.env.NEXT_PUBLIC_STRIPE_WORKOUT || '',
  'meal + workout bundle': process.env.NEXT_PUBLIC_STRIPE_BUNDLE || '',
};

function ReadyForm() {
  const params = useSearchParams();
  const from = params.get('from') || 'general';
  const [form, setForm] = useState({ name: '', email: '', looking: '', discord: '' });
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);

    // open stripe BEFORE any await so the popup isn't blocked
    const stripeLink = STRIPE_LINKS[from];
    if (stripeLink) {
      window.open(stripeLink, '_blank', 'noopener');
    }

    try {
      await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, product: from }),
      });
    } catch {
      // email failed silently — stripe already opened, don't block the user
    }

    setDone(true);
    setSending(false);
  };

  if (done) {
    return <div className="confirm">got it. let&apos;s get right.</div>;
  }

  return (
    <>
      <h1>ready</h1>
      <div className="price-line">{from}</div>
      <form className="form" onSubmit={submit}>
        <div className="field">
          <label htmlFor="name">name</label>
          <input
            id="name"
            type="text"
            required
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="email">email</label>
          <input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="looking">what you&apos;re looking for</label>
          <textarea
            id="looking"
            required
            placeholder="be specific. where you're at, where you're trying to go."
            value={form.looking}
            onChange={(e) => update('looking', e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="discord">discord (optional)</label>
          <input
            id="discord"
            type="text"
            placeholder="username"
            value={form.discord}
            onChange={(e) => update('discord', e.target.value)}
          />
        </div>
        <button type="submit" className="submit-btn" disabled={sending}>
          {sending ? 'sending…' : 'send'}
        </button>
      </form>
    </>
  );
}

export default function Ready() {
  return (
    <main className="page">
      <Back />
      <div className="offer">
        <Suspense fallback={null}>
          <ReadyForm />
        </Suspense>
      </div>
      <Footer />
    </main>
  );
}
