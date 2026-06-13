'use client';

import { useState, useEffect, useRef } from 'react';
import Back from '../../../components/Back';
import Footer from '../../../components/Footer';

const fields = [
  { id: 'name',         label: 'name',                  type: 'text',     placeholder: 'your name' },
  { id: 'email',        label: 'email',                  type: 'email',    placeholder: 'your@email.com' },
  { id: 'age',          label: 'age',                    type: 'number',   placeholder: '21' },
  { id: 'weight',       label: 'weight (lbs)',            type: 'number',   placeholder: '175' },
  { id: 'goal',         label: 'goal',                   type: 'select',   options: ['build muscle', 'cut fat', 'recomp', 'maintain', 'performance'] },
  { id: 'training',     label: 'training days / week',   type: 'select',   options: ['2', '3', '4', '5', '6'] },
  { id: 'window',       label: 'eating window',          type: 'select',   options: [
    'noon – 8pm',
    '1pm – 7pm',
    '2pm – 8pm',
    'morning – afternoon (no strict window)',
    'no fasting / eat throughout the day',
  ]},
  { id: 'restrictions', label: 'restrictions / allergies', type: 'text',   placeholder: 'none' },
  { id: 'budget',       label: 'weekly food budget',     type: 'select',   options: ['tight (<$75)', 'normal ($75–150)', 'open ($150+)'] },
  { id: 'notes',        label: 'anything else',          type: 'textarea', placeholder: 'foods you hate, schedule quirks, whatever matters' },
];

const FORM_KEY    = 'vveritas_mp_form';
const PREVIEW_KEY = 'vveritas_mp_preview';

export default function Build() {
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
      const res = await fetch('/api/generate/meal-plan', {
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

  const stripeLink = process.env.NEXT_PUBLIC_STRIPE_MEALPLAN || '';

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
      <Back href="/meal-plan" />
      <div className="offer">
        <h1>build your plan</h1>
        <div className="price-line">answer honest. the plan is only as real as the intake.</div>

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
                    required={f.id !== 'restrictions' && f.id !== 'notes'}
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

        {loading && <div className="generating">pulling your numbers. one second.</div>}
        {error && <div className="confirm">{error}</div>}

        {preview && (
          <div ref={previewRef} style={{ marginTop: '2.5rem' }}>

            {/* preview section */}
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
                {`training days\n\nnoon — first meal\n3 pasture-raised eggs scrambled in tallow\n4 oz ground beef cooked in the same pan\n1 cup white rice or roasted sweet potato\npiece of fruit\n\nprep note: cook the beef first, set aside, scramble eggs in the fat. batch the rice sunday.\n\n3pm — midday meal\n6 oz grass-fed ground beef patties pan-seared in tallow\nroasted root vegetables with ghee and sea salt\nraw cheese if tolerated\n\n6pm — final meal\n6 oz wild-caught salmon or sardines in water\n2 whole eggs pan-fried in ghee\nraw vegetables\n\ngrocery list\n\nmeat and fish:\nground beef 80/20 grass-fed — 3 lbs\ncanned wild salmon — 3 cans\nsardines in water — 4 cans\npasture-raised eggs — 2 dozen\n\n3 rules to follow\none: never use seed oils.\ntwo: eat your first meal within 30 min of your window opening.\nthree: cook in bulk twice a week.`}
              </div>

              {/* gate overlay */}
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
                  your full 7-day plan is ready.
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
