'use client';
import { useState, useEffect } from 'react';

// ─── BUILT FOR ANTHONY ──────────────────────────────────────────────────────
// He trained consistently Jan–June, so he already knows how to show up. The
// whole pitch turns on that: he does not need someone beside him every session,
// he needs structure and someone holding him to it. Hybrid, not four-a-week.

const ACCENT = '#6a8fb0';          // cool steel — distinct from the other builds
const price = 997;
const monthly = 499;
const weeks = 8;
const sessionsPerWeek = 2;
const totalSessions = weeks * sessionsPerWeek;

const SLIDES = [
  {
    type: 'hero',
    headline: 'built for you.',
    sub: 'lose fat. build muscle. build habits that actually last.',
    body: 'you already know how to train. you need a system that holds.',
    cta: 'view your transformation',
    notes: `On screen as the call opens. Let him see it before you speak. Then: "You reached out because you want a trainer — I want to understand where you're actually at first, then I'll show you what I'd build." Do not open with features. Do not mention price.`,
  },
  {
    type: 'discovery',
    headline: 'tell me where you are.',
    questions: [
      'what made you stop going consistently?',
      'what has been the hardest part about getting back?',
      'what would success look like after these eight weeks?',
      'how many days can you realistically train?',
      'any injuries?',
      'how does your nutrition currently look?',
    ],
    notes: `He should be talking 80% of this call and most of it happens here. He went Jan–June then stopped — find out what actually broke. Life change? Boredom? No plan? His answer decides whether the hybrid framing lands. Ask about injuries directly, not in passing. After each answer: "tell me more." Do not fill silences and do not rush to the next question.`,
  },
  {
    type: 'reflection',
    headline: "what i'm hearing.",
    left: {
      label: 'current goal',
      items: ['lose body fat', 'build muscle', 'improve eating habits', 'stay consistent'],
    },
    right: {
      label: 'current bottleneck',
      items: ['lost the routine', 'needs accountability', 'wants structure'],
    },
    footer: "this isn't about motivation. it's about creating a system you can actually stick to.",
    notes: `Read each item out loud, slowly. Then: "Does that sound right?" and wait for a yes before moving. This is where he feels heard and it matters more than any slide after it. The footer line is the thesis of the whole pitch — say it, then stop talking.`,
  },
  {
    type: 'roadmap',
    headline: 'the first eight weeks.',
    sub: 'not a rush. a routine that survives past week three.',
    phases: [
      { weeks: 'weeks 1–2', title: 'rebuild consistency', items: ['get the routine back', 'clean up movement quality', 'nutrition foundation'] },
      { weeks: 'weeks 3–4', title: 'build strength',      items: ['progressive overload', 'strength goes up', 'confidence in the lifts'] },
      { weeks: 'weeks 5–6', title: 'change the composition', items: ['intensity increases', 'body recomposition', 'eating habits hold under pressure'] },
      { weeks: 'weeks 7–8', title: 'make it yours',       items: ['solidify the routine', 'compare week 1 to week 8', 'build the long-term plan'] },
    ],
    notes: `Walk each phase slowly. Weeks 1–2 are about completion, not intensity — say that out loud, because he already knows how to train hard and that is not what failed last time. If he pushes for a number on the scale: "I could give you one, but I'd be guessing. What I'll promise is that in eight weeks you'll be stronger, in a routine, and we'll have real measurements to build from." Never attach pounds to eight weeks.`,
  },
  {
    type: 'portal',
    headline: "so you're not guessing between sessions.",
    tabs: ['today', 'fitness', 'nutrition', 'progress', 'check-in', 'messages'],
    note: 'open /portal/anthony-demo and walk it.',
    notes: `Open the portal in another tab. Two minutes maximum. Today: "One list. No decisions." Fitness: "The session is written before you get there — including the weeks I'm not standing next to you." Nutrition: "A protein target and a grocery list. No calorie app unless you want one." Progress, Check-In, Messages: read one message aloud. Then close the tab. Do not linger — lingering makes the dashboard look like the product.`,
  },
  {
    type: 'why',
    headline: 'why i recommended hybrid.',
    lead: "you already know how to show up. you don't need someone babysitting every workout.",
    points: [
      "we meet twice a week — technique stays sharp, the program keeps moving, adjustments happen in person.",
      "the rest of the week you run the plan i built for you.",
      "you get the results and you learn to do it without me.",
    ],
    footer: "i'm not trying to build someone who needs a trainer forever.",
    notes: `The most important slide. Say: "Since you've already spent months in the gym, I don't think you need someone standing beside you every workout. I think you'd benefit more from learning how to train confidently on your own while still having me there to guide you. That's exactly why I recommend the hybrid." Pause. Let him react. If he pushes for more in-person, that is fine — but make him say why, and make sure it's about accountability rather than uncertainty.`,
  },
  {
    type: 'included',
    headline: "what's included.",
    items: [
      `${sessionsPerWeek} in-person sessions per week`,
      'personalized workout program',
      'nutrition guidance',
      'grocery list',
      'vveritas* dashboard',
      'progress tracking',
      'weekly check-ins',
      'unlimited messaging',
      'program adjustments',
    ],
    notes: `Do not read all nine out loud — it turns into a feature dump and he stops listening. Point at the list, then say: "The sessions are the service. Everything else exists so the days I'm not there still count." Move on quickly.`,
  },
  {
    type: 'investment',
    headline: 'hybrid transformation.',
    weeks, totalSessions, price, monthly,
    includes: ['16 in-person sessions', 'full training program', 'nutrition', 'dashboard', 'accountability', 'messaging'],
    notes: `First time price appears. Say it plainly then stop talking. "Eight weeks, sixteen in-person sessions, everything around it — $997, or two payments of $499." Then WAIT. Do not fill the silence, do not justify, do not apologise. When he responds, this is the line that matters: "I intentionally designed this so you don't have to keep paying for a trainer forever. My goal isn't to create dependency — it's to give you the structure and confidence to eventually handle this on your own."`,
  },
  {
    type: 'close',
    headline: 'the training is still the point.',
    sub: 'everything else is there so the days between sessions still count.',
    body: "you originally reached out because you wanted a trainer. that's still exactly what this is.",
    notes: `Close with: "You originally reached out because you wanted a trainer. That's still exactly what this is. I just built a system around the training so you have support even when we're not together. That's what helps people stay consistent." Then ask if he wants to start, and send /enroll/anthony. If he needs to think, agree a specific day to follow up — not "let me know."`,
  },
];

const S = {
  page: { background: '#000', minHeight: '100dvh', fontFamily: 'Inter, -apple-system, sans-serif',
          fontWeight: 300, color: '#EDEDE8', display: 'flex', flexDirection: 'column' },
  body: { flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: '2.5rem 1.5rem', maxWidth: '780px', width: '100%', margin: '0 auto' },
  label: { fontFamily: 'ui-monospace, monospace', fontSize: '0.44rem', letterSpacing: '0.25em',
           textTransform: 'uppercase', color: '#3A3A3A', marginBottom: '0.7rem' },
  h: { fontSize: 'clamp(1.6rem, 5.5vw, 2.6rem)', fontWeight: 200, lineHeight: 1.15, letterSpacing: '-0.01em' },
  sub: { fontSize: '1rem', color: '#8A8A8A', marginTop: '1rem', lineHeight: 1.6, fontWeight: 300 },
  li: { fontSize: '0.95rem', color: '#B5B5B0', lineHeight: 1.65, padding: '0.5rem 0' },
  card: { border: '1px solid #141414', padding: '1.4rem 1.2rem' },
};

function renderSlide(s) {
  switch (s.type) {
    case 'hero':
      return (
        <div style={S.body}>
          <div style={S.label}>vveritas*</div>
          <h1 style={S.h}>{s.headline}</h1>
          <p style={S.sub}>{s.sub}</p>
          <p style={{ ...S.sub, color: ACCENT, marginTop: '2rem', fontSize: '1.05rem' }}>{s.body}</p>
          <div style={{ ...S.label, marginTop: '2.6rem', color: '#2A2A2A' }}>{s.cta} →</div>
        </div>
      );

    case 'discovery':
      return (
        <div style={S.body}>
          <div style={S.label}>a few questions</div>
          <h2 style={S.h}>{s.headline}</h2>
          <div style={{ marginTop: '1.8rem' }}>
            {s.questions.map((q, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.9rem', padding: '0.55rem 0',
                                    borderTop: i ? '1px solid #0f0f0f' : 'none' }}>
                <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.55rem',
                               color: ACCENT, paddingTop: '0.35rem' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span style={{ ...S.li, padding: 0 }}>{q}</span>
              </div>
            ))}
          </div>
        </div>
      );

    case 'reflection':
      return (
        <div style={S.body}>
          <h2 style={S.h}>{s.headline}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                        gap: '1rem', marginTop: '1.8rem' }}>
            {[s.left, s.right].map((col, i) => (
              <div key={i} style={S.card}>
                <div style={S.label}>{col.label}</div>
                {col.items.map((it, j) => (
                  <div key={j} style={{ ...S.li, fontSize: '0.9rem', padding: '0.35rem 0' }}>{it}</div>
                ))}
              </div>
            ))}
          </div>
          <p style={{ ...S.sub, marginTop: '1.6rem', color: ACCENT, fontSize: '0.95rem' }}>{s.footer}</p>
        </div>
      );

    case 'roadmap':
      return (
        <div style={S.body}>
          <h2 style={S.h}>{s.headline}</h2>
          <p style={S.sub}>{s.sub}</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                        gap: '0.8rem', marginTop: '1.8rem' }}>
            {s.phases.map((p, i) => (
              <div key={i} style={S.card}>
                <div style={{ ...S.label, color: ACCENT }}>{p.weeks}</div>
                <div style={{ fontSize: '1rem', marginBottom: '0.7rem', fontWeight: 300 }}>{p.title}</div>
                {p.items.map((it, j) => (
                  <div key={j} style={{ fontSize: '0.82rem', color: '#8A8A8A', lineHeight: 1.6, padding: '0.18rem 0' }}>
                    — {it}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      );

    case 'portal':
      return (
        <div style={S.body}>
          <div style={S.label}>your dashboard</div>
          <h2 style={S.h}>{s.headline}</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1.8rem' }}>
            {s.tabs.map(t => (
              <span key={t} style={{ ...S.label, marginBottom: 0, border: '1px solid #141414',
                                     padding: '0.6rem 0.9rem', color: '#6A6A6A' }}>{t}</span>
            ))}
          </div>
          <p style={{ ...S.sub, fontSize: '0.85rem', color: '#3A3A3A', marginTop: '1.6rem' }}>{s.note}</p>
        </div>
      );

    case 'why':
      return (
        <div style={S.body}>
          <h2 style={S.h}>{s.headline}</h2>
          <p style={{ ...S.sub, color: ACCENT }}>{s.lead}</p>
          <div style={{ marginTop: '1.6rem' }}>
            {s.points.map((p, i) => (
              <div key={i} style={{ ...S.li, borderTop: i ? '1px solid #0f0f0f' : 'none' }}>{p}</div>
            ))}
          </div>
          <p style={{ ...S.sub, marginTop: '1.4rem', fontSize: '0.92rem' }}>{s.footer}</p>
        </div>
      );

    case 'included':
      return (
        <div style={S.body}>
          <h2 style={S.h}>{s.headline}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '0.5rem', marginTop: '1.8rem' }}>
            {s.items.map((it, i) => (
              <div key={i} style={{ ...S.card, padding: '0.8rem 1rem', fontSize: '0.86rem', color: '#B5B5B0' }}>
                {it}
              </div>
            ))}
          </div>
        </div>
      );

    case 'investment':
      return (
        <div style={S.body}>
          <div style={S.label}>hybrid transformation · {s.weeks} weeks</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: 'clamp(3rem, 12vw, 4.6rem)', fontWeight: 200, color: ACCENT, lineHeight: 1 }}>
              ${s.price}
            </span>
            <span style={{ fontSize: '1rem', color: '#5A5A5A' }}>
              or 2 × ${s.monthly}
            </span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                        gap: '0.5rem', marginTop: '2rem' }}>
            {s.includes.map((it, i) => (
              <div key={i} style={{ ...S.card, padding: '0.75rem 0.9rem', fontSize: '0.84rem', color: '#8A8A8A' }}>
                {it}
              </div>
            ))}
          </div>
        </div>
      );

    case 'close':
      return (
        <div style={S.body}>
          <h2 style={S.h}>{s.headline}</h2>
          <p style={{ ...S.sub, fontSize: '1.05rem' }}>{s.sub}</p>
          <p style={{ ...S.sub, color: ACCENT, marginTop: '2rem' }}>{s.body}</p>
        </div>
      );

    default:
      return <div style={S.body}><h2 style={S.h}>{s.headline}</h2></div>;
  }
}

export default function AnthonyPitch() {
  const [idx, setIdx] = useState(0);
  const slide = SLIDES[idx];
  const pct = Math.round(((idx + 1) / SLIDES.length) * 100);

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'ArrowRight' || e.key === ' ') setIdx(i => Math.min(i + 1, SLIDES.length - 1));
      if (e.key === 'ArrowLeft') setIdx(i => Math.max(i - 1, 0));
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div style={S.page}>
      <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #0f0f0f', display: 'flex',
                    alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.5rem', letterSpacing: '0.2em',
                       textTransform: 'uppercase', color: '#3A3A3A' }}>
          vveritas* — anthony
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <a href="/pitch/anthony/notes" target="_blank" rel="noreferrer"
            style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.42rem', letterSpacing: '0.1em',
                     color: '#5A5A5A', textDecoration: 'none' }}>
            notes ↗
          </a>
          <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.5rem', color: '#5A5A5A',
                         letterSpacing: '0.1em' }}>
            {idx + 1} / {SLIDES.length}
          </span>
        </div>
      </div>

      <div style={{ height: '1px', background: '#0a0a0a', flexShrink: 0 }}>
        <div style={{ height: '1px', background: ACCENT, width: `${pct}%`, transition: 'width 0.3s ease' }} />
      </div>

      {renderSlide(slide)}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderTop: '1px solid #0f0f0f', flexShrink: 0 }}>
        <button onClick={() => setIdx(i => Math.max(i - 1, 0))} disabled={idx === 0}
          style={{ padding: '1.1rem', background: 'none', border: 'none', borderRight: '1px solid #0f0f0f',
                   color: idx === 0 ? '#1a1a1a' : '#5A5A5A', fontFamily: 'inherit', fontSize: '0.85rem',
                   cursor: idx === 0 ? 'default' : 'pointer', minHeight: '54px' }}>
          ← prev
        </button>
        <button onClick={() => setIdx(i => Math.min(i + 1, SLIDES.length - 1))} disabled={idx === SLIDES.length - 1}
          style={{ padding: '1.1rem', background: 'none', border: 'none',
                   color: idx === SLIDES.length - 1 ? '#1a1a1a' : '#EDEDE8', fontFamily: 'inherit',
                   fontSize: '0.85rem', cursor: idx === SLIDES.length - 1 ? 'default' : 'pointer', minHeight: '54px' }}>
          next →
        </button>
      </div>
    </div>
  );
}
