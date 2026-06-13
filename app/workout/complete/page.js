'use client';

import { useState, useEffect, useRef } from 'react';
import Back from '../../../components/Back';
import Footer from '../../../components/Footer';

const FORM_KEY = 'vveritas_wo_form';

export default function WorkoutComplete() {
  const [status, setStatus] = useState('generating');
  const [plan, setPlan]     = useState(null);
  const planRef             = useRef(null);

  useEffect(() => {
    const raw = sessionStorage.getItem(FORM_KEY);
    if (!raw) { setStatus('nodata'); return; }

    let intake;
    try { intake = JSON.parse(raw); } catch { setStatus('nodata'); return; }

    fetch('/api/generate/workout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...intake, preview: false }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (!data.plan) throw new Error();
        setPlan(data.plan);
        setStatus('done');
        sessionStorage.removeItem(FORM_KEY);
        setTimeout(() => planRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
        return fetch('/api/submit/workout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...intake, plan: data.plan }),
        });
      })
      .catch(() => setStatus('error'));
  }, []);

  return (
    <main className="page">
      <Back href="/workout" />
      <div className="offer">
        {status === 'generating' && (
          <>
            <h1>building your program</h1>
            <div className="generating" style={{ marginTop: '2rem' }}>
              putting everything together. give it about 20 seconds.
            </div>
          </>
        )}
        {status === 'error' && (
          <>
            <h1>something went wrong</h1>
            <p style={{ marginTop: '1.5rem', color: 'var(--dim)', fontSize: '0.95rem' }}>
              your payment went through. message nico on instagram and he&apos;ll sort it out.
            </p>
          </>
        )}
        {status === 'nodata' && (
          <>
            <h1>session expired</h1>
            <p style={{ marginTop: '1.5rem', color: 'var(--dim)', fontSize: '0.95rem' }}>
              fill out the intake again and your program will generate.
            </p>
            <a href="/workout/build" className="ready-cta" style={{ marginTop: '2rem', display: 'inline-block' }}>
              go back →
            </a>
          </>
        )}
        {status === 'done' && plan && (
          <>
            <h1>your program</h1>
            <div className="price-line">sent to your email. this page is yours until you close it.</div>
            <div ref={planRef} className="plan-output">{plan}</div>
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}
