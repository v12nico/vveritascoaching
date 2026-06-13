'use client';

import { useState, useEffect, useRef } from 'react';
import Back from '../../../components/Back';
import Footer from '../../../components/Footer';

const fields = [
  { id: 'name',       label: 'name',                    type: 'text',   placeholder: 'your name' },
  { id: 'email',      label: 'email',                   type: 'email',  placeholder: 'your@email.com' },
  { id: 'age',        label: 'age',                     type: 'number', placeholder: '21' },
  { id: 'experience', label: 'experience level',        type: 'select', options: [
    'beginner (under 1 year)',
    'intermediate (1–3 years)',
    'advanced (3+ years)',
  ]},
  { id: 'days',       label: 'days you can train / week', type: 'select', options: ['3', '4', '5', '6'] },
  { id: 'split',      label: 'split preference',        type: 'select', options: [
    'push / pull / legs',
    'upper / lower',
    'full body',
    'not sure — build what makes sense',
  ]},
  { id: 'goal',       label: 'primary goal',            type: 'select', options: [
    'build muscle',
    'get stronger',
    'recomp (lose fat, keep muscle)',
    'general fitness',
    'competition prep',
  ]},
  { id: 'equipment',  label: 'equipment available',     type: 'select', options: [
    'full commercial gym',
    'home gym (barbell + rack)',
    'dumbbells only',
    'dumbbells + cables',
    'bodyweight only',
  ]},
  { id: 'injuries',   label: 'injuries / limitations',  type: 'text',   placeholder: 'none' },
  { id: 'notes',      label: 'anything else',           type: 'textarea', placeholder: 'weak points, movements you like or hate, whatever matters' },
];

const FORM_KEY    = 'vveritas_wo_form';
const PREVIEW_KEY = 'vveritas_wo_preview';

export default function WorkoutBuild() {
  const [form, setForm]       = useState({});
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);
  const previewRef            = useRef(null);

  useEffect(() => {
    const saved = sessionStorage.getItem(PREVIEW_KEY);
    if (saved) setPreview(saved);
  }, []);

  const update = (id, value) => setForm((f) => ({ ...f, [id]: value }));

  const getPreview = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPreview(null);
    sessionStorage.removeItem(PREVIEW_KEY);
    try {
      const res = await fetch('/api/generate/workout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, preview: true }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setPreview(data.plan);
      sessionStorage.setItem(PREVIEW_KEY, data.plan);
      sessionStorage.setItem(FORM_KEY, JSON.stringify(form));
      setTimeout(() => previewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    } catch {
      setError('something went wrong. try again.');
    } finally {
      setLoading(false);
    }
  };

  const stripeLink = process.env.NEXT_PUBLIC_STRIPE_WORKOUT || '';

  const unlock = () => {
    if (stripeLink) window.open(stripeLink, '_blank', 'noopener');
  };

  const reset = () => {
    setPreview(null);
    setForm({});
    sessionStorage.removeItem(PREVIEW_KEY);
    sessionStorage.removeItem(FORM_KEY);
  };

  return (
    <main className="page">
      <Back href="/workout" />
      <div className="offer">
        <h1>build your program</h1>
        <div className="price-line">answer real. the program is only as dialed as the intake.</div>

        {!preview && (
          <form className="form" onSubmit={getPreview}>
            {fields.map((f) => (
              <div className="field" key={f.id}>
                <label htmlFor={f.id}>{f.label}</label>
                {f.type === 'select' ? (
                  <select id={f.id} required defaultValue="" onChange={(e) => update(f.id, e.target.value)}>
                    <option value="" disabled>select</option>
                    {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                ) : f.type === 'textarea' ? (
                  <textarea id={f.id} placeholder={f.placeholder} onChange={(e) => update(f.id, e.target.value)} />
                ) : (
                  <input
                    id={f.id}
                    type={f.type}
                    required={f.id !== 'injuries' && f.id !== 'notes'}
                    placeholder={f.placeholder}
                    onChange={(e) => update(f.id, e.target.value)}
                  />
                )}
              </div>
            ))}
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'building preview…' : 'see your preview'}
            </button>
          </form>
        )}

        {loading && <div className="generating">pulling your program. one second.</div>}
        {error && <div className="confirm">{error}</div>}

        {preview && (
          <div ref={previewRef} style={{ marginTop: '2.5rem' }}>
            <div className="plan-output" style={{ borderBottom: 'none', paddingBottom: 0 }}>
              {preview}
            </div>

            {/* locked continuation */}
            <div style={{ position: 'relative', marginTop: '1.5rem' }}>
              <div style={{
                filter: 'blur(4px)',
                opacity: 0.35,
                pointerEvents: 'none',
                userSelect: 'none',
                fontSize: '0.92rem',
                lineHeight: 1.8,
                color: 'var(--text)',
              }}>
                {`pull day\n\nlat pulldown — 2 sets to failure (4–6 reps)\ncontrol the negative all the way down. full stretch at the bottom.\n\nseated cable row — 2 sets to failure (4–6 reps)\nrow to the lower chest. squeeze and hold for a second at the peak.\n\nupper back row — 2 sets to failure (5–7 reps)\nchest supported or t-bar. keep the chest down.\n\nrear delt fly — 2 sets to failure (8–12 reps)\ncables or dumbbells. don't swing.\n\nbarbell curl — 2 sets to failure (5–8 reps)\nno momentum. strict. full range.\n\nhammer curl — 2 sets to failure (6–10 reps)\nneutral grip. full extension at the bottom.\n\nlegs day\n\nbarbell squat — 2 sets to failure (3–6 reps)\nfeet just outside shoulder width. break parallel. brace hard.\n\nhip thrust — 2 sets to failure (6–10 reps)\nload it. full extension at the top, squeeze glutes.\n\nleg extension — 2 sets to failure (8–12 reps)\nslow negative. pause at the top.\n\nRDL — 2 sets to failure (5–8 reps)\nhinge, not squat. feel the hamstrings load.\n\ncalf raise — 2 sets to failure (10–15 reps)\nfull stretch at the bottom every rep.`}
              </div>

              <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1.2rem',
                background: 'linear-gradient(to bottom, transparent 0%, #000 35%)',
              }}>
                <p style={{ color: 'var(--text)', fontSize: '0.95rem', fontWeight: 300, textAlign: 'center' }}>
                  your full program is ready.
                </p>
                <button onClick={unlock} className="ready-cta" style={{ fontSize: '1rem', cursor: 'pointer' }}>
                  unlock it — $50 →
                </button>
                <p style={{ color: 'var(--ghost)', fontSize: '0.75rem', fontFamily: 'ui-monospace, monospace', letterSpacing: '0.1em' }}>
                  delivered to {form.email || 'your email'} after payment
                </p>
              </div>
            </div>

            <button onClick={reset} className="secondary-link" style={{ marginTop: '3rem', display: 'block' }}>
              ← start over
            </button>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
