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
  const [form, setForm] = useState({
    name: '',
    email: '',
    age: '',
    gender: '',
    heightFt: '',
    heightIn: '',
    weight: '',
    looking: '',
    discord: '',
  });
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

    const height = form.heightFt
      ? `${form.heightFt}ft ${form.heightIn || '0'}in`
      : '';

    try {
      await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          age: form.age,
          gender: form.gender,
          height,
          weight: form.weight ? `${form.weight} lbs` : '',
          looking: form.looking,
          discord: form.discord,
          product: from,
        }),
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
          <label htmlFor="age">age</label>
          <input
            id="age"
            type="number"
            required
            min="13"
            max="99"
            placeholder="25"
            value={form.age}
            onChange={(e) => update('age', e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="gender">gender</label>
          <select
            id="gender"
            required
            value={form.gender}
            onChange={(e) => update('gender', e.target.value)}
          >
            <option value="" disabled>select</option>
            <option value="male">male</option>
            <option value="female">female</option>
            <option value="other">other</option>
          </select>
        </div>

        <div className="field">
          <label>height</label>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end' }}>
            <div style={{ flex: 1 }}>
              <input
                type="number"
                required
                min="4"
                max="7"
                placeholder="5"
                value={form.heightFt}
                onChange={(e) => update('heightFt', e.target.value)}
                aria-label="feet"
                style={{ width: '100%' }}
              />
              <span style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--dim)', marginTop: '4px', display: 'block' }}>ft</span>
            </div>
            <div style={{ flex: 1 }}>
              <input
                type="number"
                min="0"
                max="11"
                placeholder="10"
                value={form.heightIn}
                onChange={(e) => update('heightIn', e.target.value)}
                aria-label="inches"
                style={{ width: '100%' }}
              />
              <span style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--dim)', marginTop: '4px', display: 'block' }}>in</span>
            </div>
          </div>
        </div>

        <div className="field">
          <label htmlFor="weight">weight (lbs)</label>
          <input
            id="weight"
            type="number"
            required
            min="80"
            max="500"
            placeholder="175"
            value={form.weight}
            onChange={(e) => update('weight', e.target.value)}
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
