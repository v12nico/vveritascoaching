'use client';
import { useState, useEffect } from 'react';

// ─── BUILT FOR PHYLLIS ───────────────────────────────────────────────────────
// She asked for a personal trainer. Not a life system. Every slide here stays
// on training; the dashboard is framed as support around the sessions, never as
// the product. Deliberately shorter than the other decks.

const prospectName = 'Phyllis';
const ACCENT = '#b08a7d';          // warm clay — feminine-neutral, not pink
const sessionRate = 50;            // editable: drives every total below
const regularRate = 100;           // the rate after summer — must be the real
                                   // going-forward price, not an invented anchor

const weeks = 8;
const opts = [2, 3, 4].map(perWeek => {
  const sessions = perWeek * weeks;
  const total = sessions * sessionRate;
  return { perWeek, sessions, total, monthly: total / 2 };
});

const SLIDES = [
  {
    type: 'hero',
    headline: 'built for phyllis.',
    sub: 'lose weight. rebuild strength. get back into a routine that lasts.',
    body: 'you do not need to start over alone.',
    cta: 'view your plan',
    notes: `On screen when the call opens. Let her see her name. Say: "Phyllis, I kept this simple because you reached out for personal training." Pause. "I want to understand your schedule, your starting point, and what made it difficult to stay consistent before." Then: "Then I'll show you the training options and recommend the one I think fits best." Do not open with features.`,
  },
  {
    type: 'frame',
    headline: 'first, i want to listen.',
    points: [
      'you reached out for personal training. that is still the center of this.',
      'i am going to ask a few questions before i show you anything.',
      'then i will show you the training options and recommend one.',
      'you choose the schedule that actually fits your life.',
    ],
    notes: `Set the frame so she knows she is not about to be sold a bundle. Say: "This isn't a pitch. I ask, you talk, then I recommend." Ask "sound fair?" and wait for a yes before moving on.`,
  },
  {
    type: 'discovery',
    headline: 'tell me where you are right now.',
    questions: [
      'what made you stop working out before?',
      'what feels hardest about getting back into the gym?',
      'are there any injuries, pain, or movements we need to be careful with?',
      'what days and times can you train consistently?',
      'what would make the first eight weeks feel successful to you?',
      'what does a normal day of eating look like?',
      'how is your sleep and energy?',
      'do you prefer a coach who is more encouraging, more direct, or balanced?',
    ],
    notes: `The most important slide. Let her answer in her own words — her language becomes the anchor for everything after. Question 3 is not optional: ask directly about injuries, pain, medications and anything a doctor has told her to avoid. Confirm gym access near Morgan State and how she is getting there. After each answer: "tell me more." Do not fill silences.`,
  },
  {
    type: 'reflection',
    headline: "what i'm hearing.",
    left: {
      label: 'where you want to go',
      items: [
        'lose around 50 pounds over time',
        'tighten the stomach',
        'stronger core, back, and arms',
        'feel comfortable in the gym again',
      ],
    },
    right: {
      label: 'what has made it hard',
      items: [
        'you were consistent before — then it stopped',
        'restarting alone is the hard part',
        'no set schedule holding it in place',
        'no one tracking whether it is working',
      ],
    },
    footer: 'the plan: regular in-person sessions, a simple nutrition structure, and progress you can actually see.',
    notes: `Read each item out loud, slowly. Then say: "Does that sound right?" Wait. This is the moment she feels heard — do not rush it. Then set the honest expectation: "The full 50-pound goal is bigger than eight weeks. But eight weeks is enough to rebuild your routine, get stronger, start changing your measurements, and build real momentum." Never promise 50 pounds in eight weeks.`,
  },
  {
    type: 'roadmap',
    headline: 'the first eight weeks.',
    sub: 'the goal is not to rush the whole transformation. it is to build something that holds.',
    phases: [
      { weeks: 'weeks 1–2', title: 'get comfortable again', items: [
        'learn or relearn the movements',
        'lock in your scheduled sessions',
        'set simple nutrition targets',
        'record baseline weight and measurements',
        'win the week by completing it',
      ]},
      { weeks: 'weeks 3–4', title: 'build strength', items: [
        'progress the exercises gradually',
        'core and back strength come first',
        'get confident with machines and weights',
        'review how the nutrition is going',
      ]},
      { weeks: 'weeks 5–6', title: 'create momentum', items: [
        'keep adding weight and reps',
        'improve conditioning',
        'track waist, strength, and attendance',
        'adjust around how you are recovering',
      ]},
      { weeks: 'weeks 7–8', title: 'lock in the routine', items: [
        'compare week one to week eight',
        'review strength and measurement changes',
        'identify what actually worked for you',
        'build the next phase toward the bigger goal',
      ]},
    ],
    notes: `Walk each phase slowly. The point of weeks 1–2 is completion, not intensity — say that out loud. If she pushes for faster results, hold the line: "I could give you a number, but I would be guessing. What I can promise is that in eight weeks you will be stronger, in a routine, and we will have real measurements to build from."`,
  },
  {
    type: 'portal',
    headline: 'so you are not guessing between sessions.',
    tabs: ['today', 'workouts', 'nutrition', 'progress', 'check-in', 'messages'],
    note: 'open /portal/phyllis-demo and walk it.',
    notes: `Open /portal/phyllis-demo in another tab. Keep it short — two minutes maximum. Today: "One short list. No decisions." Workouts: "The session is already written before you arrive." Nutrition: "A protein target and a grocery list. No calorie app unless you want one." Progress: "Weight, waist, attendance, and what you lifted." Check-In: read the questions. Messages: read the coach message out loud. Then close the tab. Do not linger — this is support, not the product.`,
  },
  {
    type: 'support',
    headline: 'personal training, with the support around it.',
    lead: 'the in-person sessions are the main service.',
    items: [
      'in-person training',
      'simple workout tracking',
      'basic nutrition guidance',
      'progress tracking',
      'check-ins',
      'direct messaging',
    ],
    footer: 'it is not extra work for you. it is extra structure around the work we are already doing.',
    notes: `Say: "The workout tracking, nutrition structure, check-ins and messaging are included so you do not have to figure everything out alone between sessions." Then: "It is not extra work for you. It is extra structure around the work we are already doing." Do not list anything beyond these six. No mindset, business, spirituality, or self-mastery language.`,
  },
  {
    type: 'investment',
    headline: 'fifty dollars a session.',
    sub: 'end of summer rate — half the regular rate. you are choosing how often you train, not picking a package.',
    opts,
    footer: 'tracking, nutrition guidance, check-ins, progress and messaging are included at no separate charge.',
    notes: `Lead with the RATE, not the total. Say: "My rate is a hundred a session. Through the end of summer I am running it at fifty." Pause — let the gap land. Then: "Same fifty whichever schedule you pick." State it once and move on; do not oversell the discount or explain that you want the reps. Pause before any total appears. Then: "You asked for four a week. Over eight weeks that's 32 sessions." Only then: "So it works out to $1,600, or $800 a month." Do not rush to the total and do not hide it — she is committing to eight weeks and she will see the number eventually. Better she hears it from you calmly than discovers it at checkout. Then: "I also put two and three day options in, in case a different frequency fits your schedule or recovery better." Then ask: "Which schedule feels realistic for you to maintain?" and WAIT. Do not fill the silence. Do not apologise for the price.`,
  },
  {
    type: 'close',
    headline: 'the training is the center.',
    sub: 'everything else is there to help you stick with it.',
    body: 'you do not need to start over alone.',
    notes: `Final slide. Say: "You reached out for personal training, and that is still exactly what this is." Pause. "The rest is there so the week between our sessions isn't guesswork." Then ask which schedule she wants and send /enroll/phyllis. Do not pressure. If she needs to think, agree a specific day to follow up.`,
  },
];

const S = {
  page: {
    background: '#000', minHeight: '100dvh',
    fontFamily: 'Inter, -apple-system, sans-serif', fontWeight: 300,
    color: '#EDEDE8', display: 'flex', flexDirection: 'column',
  },
  body: {
    flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
    padding: '2.5rem 1.5rem', maxWidth: '780px', width: '100%', margin: '0 auto',
  },
  label: {
    fontFamily: 'ui-monospace, monospace', fontSize: '0.44rem', letterSpacing: '0.25em',
    textTransform: 'uppercase', color: '#3A3A3A', marginBottom: '0.7rem',
  },
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

    case 'frame':
      return (
        <div style={S.body}>
          <h2 style={S.h}>{s.headline}</h2>
          <div style={{ marginTop: '2rem' }}>
            {s.points.map((p, i) => (
              <div key={i} style={{ ...S.li, borderTop: i ? '1px solid #0f0f0f' : 'none' }}>{p}</div>
            ))}
          </div>
        </div>
      );

    case 'discovery':
      return (
        <div style={S.body}>
          <div style={S.label}>a few questions</div>
          <h2 style={S.h}>{s.headline}</h2>
          <div style={{ marginTop: '1.8rem' }}>
            {s.questions.map((q, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.9rem', padding: '0.55rem 0', borderTop: i ? '1px solid #0f0f0f' : 'none' }}>
                <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.55rem', color: ACCENT, paddingTop: '0.35rem' }}>
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginTop: '1.8rem' }}>
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.8rem', marginTop: '1.8rem' }}>
            {s.phases.map((p, i) => (
              <div key={i} style={S.card}>
                <div style={{ ...S.label, color: ACCENT }}>{p.weeks}</div>
                <div style={{ fontSize: '1rem', marginBottom: '0.7rem', fontWeight: 300 }}>{p.title}</div>
                {p.items.map((it, j) => (
                  <div key={j} style={{ fontSize: '0.82rem', color: '#8A8A8A', lineHeight: 1.6, padding: '0.18rem 0' }}>— {it}</div>
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
              <span key={t} style={{ ...S.label, marginBottom: 0, border: '1px solid #141414', padding: '0.6rem 0.9rem', color: '#6A6A6A' }}>{t}</span>
            ))}
          </div>
          <p style={{ ...S.sub, fontSize: '0.85rem', color: '#3A3A3A', marginTop: '1.6rem' }}>{s.note}</p>
        </div>
      );

    case 'support':
      return (
        <div style={S.body}>
          <h2 style={S.h}>{s.headline}</h2>
          <p style={{ ...S.sub, color: ACCENT }}>{s.lead}</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '0.5rem', marginTop: '1.6rem' }}>
            {s.items.map((it, i) => (
              <div key={i} style={{ ...S.card, padding: '0.85rem 1rem', fontSize: '0.88rem', color: '#B5B5B0' }}>{it}</div>
            ))}
          </div>
          <p style={{ ...S.sub, marginTop: '1.6rem', fontSize: '0.92rem' }}>{s.footer}</p>
        </div>
      );

    case 'investment':
      return (
        <div style={S.body}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.8rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: 'clamp(3rem, 13vw, 5rem)', fontWeight: 200, color: ACCENT, lineHeight: 1 }}>
              ${sessionRate}
            </span>
            <span style={{ fontSize: 'clamp(1.4rem, 5vw, 2rem)', fontWeight: 200, color: '#3A3A3A',
                           textDecoration: 'line-through', textDecorationThickness: '1px' }}>
              ${regularRate}
            </span>
            <span style={{ ...S.label, marginBottom: 0 }}>per session</span>
          </div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.6rem', marginTop: '1rem',
            border: '1px solid ' + ACCENT, padding: '0.5rem 0.8rem', alignSelf: 'flex-start',
          }}>
            <span style={{ ...S.label, marginBottom: 0, color: ACCENT }}>end of summer</span>
            <span style={{ fontSize: '0.85rem', color: '#B5B5B0' }}>half the regular rate</span>
          </div>
          <p style={{ ...S.sub, marginTop: '1.2rem' }}>{s.sub}</p>

          <div style={{ marginTop: '2rem' }}>
            {s.opts.map(o => {
              const requested = o.perWeek === 4;
              return (
                <div key={o.perWeek} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                  gap: '1rem', padding: '0.9rem 0',
                  borderTop: '1px solid #0f0f0f',
                }}>
                  <div>
                    <div style={{ fontSize: '1rem', color: requested ? '#EDEDE8' : '#8A8A8A' }}>
                      {o.perWeek} sessions per week
                    </div>
                    {requested && (
                      <div style={{ ...S.label, color: ACCENT, marginBottom: 0, marginTop: '0.3rem' }}>
                        the schedule you asked for
                      </div>
                    )}
                  </div>
                  <div style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                    <div style={{ fontSize: '0.82rem', color: '#5A5A5A' }}>
                      {o.sessions} sessions
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#5A5A5A' }}>
                      ${o.total.toLocaleString()} · ${o.monthly.toLocaleString()}/mo
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <p style={{ ...S.sub, fontSize: '0.88rem', marginTop: '1.5rem' }}>{s.footer}</p>
        </div>
      );

    case 'close':
      return (
        <div style={S.body}>
          <h2 style={S.h}>{s.headline}</h2>
          <p style={{ ...S.sub, fontSize: '1.1rem' }}>{s.sub}</p>
          <p style={{ ...S.sub, color: ACCENT, marginTop: '2.2rem' }}>{s.body}</p>
        </div>
      );

    default:
      return <div style={S.body}><h2 style={S.h}>{s.headline}</h2></div>;
  }
}

export default function PhyllisPitch() {
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
      <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #0f0f0f', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.5rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#3A3A3A' }}>
          vveritas* — phyllis
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <a href="/pitch/phyllis/notes" target="_blank" rel="noreferrer"
            style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.42rem', letterSpacing: '0.1em', color: '#5A5A5A', textDecoration: 'none' }}>
            notes ↗
          </a>
          <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.5rem', color: '#5A5A5A', letterSpacing: '0.1em' }}>
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
          style={{ padding: '1.1rem', background: 'none', border: 'none', borderRight: '1px solid #0f0f0f', color: idx === 0 ? '#1a1a1a' : '#5A5A5A', fontFamily: 'inherit', fontSize: '0.85rem', cursor: idx === 0 ? 'default' : 'pointer', minHeight: '54px' }}>
          ← prev
        </button>
        <button onClick={() => setIdx(i => Math.min(i + 1, SLIDES.length - 1))} disabled={idx === SLIDES.length - 1}
          style={{ padding: '1.1rem', background: 'none', border: 'none', color: idx === SLIDES.length - 1 ? '#1a1a1a' : '#EDEDE8', fontFamily: 'inherit', fontSize: '0.85rem', cursor: idx === SLIDES.length - 1 ? 'default' : 'pointer', minHeight: '54px' }}>
          next →
        </button>
      </div>
    </div>
  );
}
