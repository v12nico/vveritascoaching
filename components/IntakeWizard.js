'use client';
import { useState, useEffect, useMemo, useRef } from 'react';
import {
  SECTIONS, TOTAL, DAYS, TIMES,
  emptyForm, flatScreens, isVisible, screenComplete, missingBySection,
} from '@/lib/intakeSpec';

// Answers are held in the visitor's own browser until they submit, so a closed
// tab or a dead battery doesn't cost them ten minutes of honest answers.
const storageKey = (slug) => `vv-intake-${slug || 'default'}`;

export default function IntakeWizard({ slug = '', clientName = '' }) {
  const screens = useMemo(() => flatScreens(), []);

  const [form, setForm] = useState(emptyForm);
  const [phase, setPhase] = useState('start');   // start | form | review | done
  const [step, setStep] = useState(0);
  const [restored, setRestored] = useState(false);
  const [saved, setSaved] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [link, setLink] = useState({ pkg: '', startDate: '' });
  const top = useRef(null);

  const set = (id, value) => setForm((f) => ({ ...f, [id]: value }));

  // ── prefill + restore ──────────────────────────────────────────────────────
  // Order matters: saved answers win over query params, because a client who
  // already typed something should never watch it get overwritten by a link.
  // Query params are read here rather than through useSearchParams, which would
  // opt this whole subtree out of prerendering and hand the client a blank
  // screen until hydration. Nothing needs them before mount.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = (k) => params.get(k) || '';
    setLink({ pkg: q('package') || q('plan'), startDate: q('start') });

    const prefill = {};
    if (q('name') || clientName) prefill.fullName = q('name') || clientName;
    if (q('email')) prefill.email = q('email');
    if (q('phone')) prefill.phone = q('phone');

    let stored = null;
    try {
      const raw = window.localStorage.getItem(storageKey(slug));
      if (raw) stored = JSON.parse(raw);
    } catch {
      stored = null;
    }

    setForm((f) => ({ ...f, ...prefill, ...(stored?.form || {}) }));
    if (stored?.form) setRestored(true);
    if (typeof stored?.step === 'number') setStep(stored.step);
  }, [slug, clientName]);

  useEffect(() => {
    if (phase === 'start') return;
    try {
      window.localStorage.setItem(storageKey(slug), JSON.stringify({ form, step }));
    } catch {
      // a full or blocked localStorage must not break the form
    }
  }, [form, step, phase, slug]);

  useEffect(() => {
    top.current?.scrollIntoView({ block: 'start' });
  }, [step, phase]);

  const current = screens[step];
  const canContinue = current ? screenComplete(current.screen, form) : false;

  const next = () => (step + 1 < screens.length ? setStep(step + 1) : setPhase('review'));
  const back = () => (step === 0 ? setPhase('start') : setStep(step - 1));

  const jumpToSection = (sectionIndex) => {
    const i = screens.findIndex((s) => s.sectionIndex === sectionIndex);
    if (i >= 0) { setStep(i); setPhase('form'); }
  };

  async function submit() {
    setSending(true);
    setError('');
    try {
      const res = await fetch('/api/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, slug, package: link.pkg, startDate: link.startDate }),
      });
      if (!res.ok) throw new Error((await res.json().catch(() => ({})))?.error || 'failed');
      try { window.localStorage.removeItem(storageKey(slug)); } catch {}
      setPhase('done');
    } catch (e) {
      setError('that did not send. check your connection and try again — nothing was lost.');
    } finally {
      setSending(false);
    }
  }

  // ── screens ────────────────────────────────────────────────────────────────

  if (phase === 'start') {
    return (
      <div className="ik-wrap" ref={top}>
        <div className="ik-screen ik-open">
          <h1 className="ik-open-title">let&apos;s build your system.</h1>
          <p className="ik-open-body">
            i already know how to coach you. now i need the information that lets me build
            everything around your body, schedule, goals, and real life.
          </p>
          <div className="ik-open-meta">8–10 minutes</div>
          <p className="ik-open-note">
            be honest. there are no good answers. the more accurate this is, the more
            personalized your plan becomes.
          </p>
          {restored && <p className="ik-restored">your previous answers are still here.</p>}
          <button className="ik-primary" onClick={() => setPhase('form')}>
            {restored ? 'continue my intake' : 'start my intake'}
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'done') {
    return (
      <div className="ik-wrap" ref={top}>
        <div className="ik-screen ik-open">
          <h1 className="ik-open-title">i have what i need.</h1>
          <p className="ik-open-body">
            your intake is complete. i&apos;ll review everything and use it to build your
            training, nutrition, accountability, and progress system.
          </p>
          <div className="ik-next-label">what happens next</div>
          <ol className="ik-next">
            <li>intake reviewed</li>
            <li>personalized plan built</li>
            <li>dashboard activated</li>
            <li>first session confirmed</li>
            <li>we start</li>
          </ol>
          <a className="ik-primary" href="/work">view next steps</a>
          <p className="ik-open-note">
            no generic templates. your plan starts with what you just told me.
          </p>
        </div>
      </div>
    );
  }

  if (phase === 'review') {
    const gaps = missingBySection(form);
    return (
      <div className="ik-wrap" ref={top}>
        <div className="ik-bar"><div className="ik-bar-fill" style={{ width: '100%' }} /></div>
        <div className="ik-step">review — before you send it</div>
        <div className="ik-screen">
          <h2 className="ik-q">last look.</h2>
          <p className="ik-hint">tap any section to go back and change an answer.</p>

          <div className="ik-review">
            {SECTIONS.map((s, i) => {
              const gap = gaps.find((g) => g.index === i);
              return (
                <button key={s.key} className="ik-review-row" onClick={() => jumpToSection(i)}>
                  <span className="ik-review-num">{s.num}</span>
                  <span className="ik-review-label">{s.label}</span>
                  <span className={`ik-review-state${gap ? ' incomplete' : ''}`}>
                    {gap ? `${gap.missing.length} left` : 'complete'}
                  </span>
                </button>
              );
            })}
          </div>

          {gaps.length > 0 && (
            <p className="ik-warn">
              a few answers are still empty. finish those and i can build from the whole picture.
            </p>
          )}
          {error && <p className="ik-warn">{error}</p>}

          <div className="ik-actions">
            <button className="ik-back" onClick={() => { setPhase('form'); setStep(screens.length - 1); }}>
              ← back
            </button>
            <button className="ik-primary" onClick={submit} disabled={gaps.length > 0 || sending}>
              {sending ? 'sending…' : 'send my intake'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const { section, screen } = current;
  const pct = ((step + 1) / screens.length) * 100;

  return (
    <div className="ik-wrap" ref={top}>
      <div className="ik-bar"><div className="ik-bar-fill" style={{ width: `${pct}%` }} /></div>
      <div className="ik-step">{section.num} / {String(TOTAL).padStart(2, '0')} — {section.label}</div>

      <div className="ik-screen" key={step}>
        {current.firstOfSection && (
          <div className="ik-section-head">
            <h2 className="ik-section-title">{section.headline}</h2>
            {section.sub && <p className="ik-hint">{section.sub}</p>}
          </div>
        )}

        {screen.fields.filter((f) => isVisible(f, form)).map((f) => (
          <Field key={f.id} f={f} value={form[f.id]} onChange={(v) => set(f.id, v)} />
        ))}

        <div className="ik-actions">
          <button className="ik-back" onClick={back}>← back</button>
          <button className="ik-primary" onClick={next} disabled={!canContinue}>continue</button>
        </div>

        <button
          className="ik-later"
          onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2600); }}
        >
          {saved ? 'saved — come back to this link anytime' : 'save and finish later'}
        </button>
      </div>
    </div>
  );
}

// ─── FIELDS ──────────────────────────────────────────────────────────────────

function Field({ f, value, onChange }) {
  const label = (
    <>
      <div className="ik-q">{f.q}</div>
      {f.hint && <div className="ik-hint">{f.hint}</div>}
    </>
  );

  if (f.type === 'single' || f.type === 'yesno') {
    const opts = f.type === 'yesno' ? ['yes', 'no'] : f.opts;
    return (
      <div className="ik-field">
        {label}
        <div className={`ik-cards${f.type === 'yesno' ? ' two' : ''}`}>
          {opts.map((o) => (
            <button
              key={o}
              className={`ik-card${value === o ? ' on' : ''}`}
              onClick={() => onChange(o)}
            >
              {o}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (f.type === 'multi') {
    const list = Array.isArray(value) ? value : [];
    const toggle = (o) => onChange(list.includes(o) ? list.filter((x) => x !== o) : [...list, o]);
    return (
      <div className="ik-field">
        {label}
        <div className="ik-cards">
          {f.opts.map((o) => (
            <button key={o} className={`ik-card${list.includes(o) ? ' on' : ''}`} onClick={() => toggle(o)}>
              {o}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (f.type === 'avail') {
    const list = Array.isArray(value) ? value : [];
    const toggle = (k) => onChange(list.includes(k) ? list.filter((x) => x !== k) : [...list, k]);
    return (
      <div className="ik-field">
        {label}
        <div className="ik-avail">
          <div className="ik-avail-row head">
            <span />
            {TIMES.map((t) => <span key={t} className="ik-avail-time">{t}</span>)}
          </div>
          {DAYS.map((d) => (
            <div key={d} className="ik-avail-row">
              <span className="ik-avail-day">{d}</span>
              {TIMES.map((t) => {
                const k = `${d}:${t}`;
                return (
                  <button
                    key={k}
                    className={`ik-slot${list.includes(k) ? ' on' : ''}`}
                    onClick={() => toggle(k)}
                    aria-label={`${d} ${t}`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (f.type === 'slider') {
    return (
      <div className="ik-field ik-slider-field">
        <div className="ik-slider-head">
          <span className="ik-q sm">{f.q}</span>
          <span className="ik-slider-val">{value}</span>
        </div>
        <input
          className="ik-slider"
          type="range"
          min="1"
          max="10"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
        />
        <div className="ik-slider-ends"><span>{f.low}</span><span>{f.high}</span></div>
      </div>
    );
  }

  if (f.type === 'checkbox') {
    return (
      <div className="ik-field">
        <button className={`ik-consent${value ? ' on' : ''}`} onClick={() => onChange(!value)}>
          <span className="ik-consent-box">{value ? '×' : ''}</span>
          <span className="ik-consent-text">{f.q}</span>
        </button>
      </div>
    );
  }

  if (f.type === 'textarea') {
    const len = String(value || '').length;
    return (
      <div className="ik-field">
        {label}
        <textarea
          className="ik-textarea"
          value={value}
          placeholder={f.ph}
          maxLength={f.max}
          rows={4}
          onChange={(e) => onChange(e.target.value)}
        />
        <div className="ik-meta-row">
          {f.quick
            ? <button className="ik-quick" onClick={() => onChange(f.quick)}>{f.quick}</button>
            : <span />}
          {f.max && <span className={`ik-count${len > f.max - 40 ? ' near' : ''}`}>{len}/{f.max}</span>}
        </div>
      </div>
    );
  }

  if (f.type === 'time') {
    return (
      <div className="ik-field">
        {label}
        <input className="ik-input" type="time" value={value} onChange={(e) => onChange(e.target.value)} />
      </div>
    );
  }

  return (
    <div className="ik-field">
      {label}
      <input
        className="ik-input"
        type={f.type}
        inputMode={f.type === 'number' ? 'numeric' : undefined}
        value={value}
        placeholder={f.ph}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
