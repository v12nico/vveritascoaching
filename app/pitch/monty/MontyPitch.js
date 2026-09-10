'use client';
import { useState, useEffect } from 'react';

// ─── BUILT FOR MONTY ────────────────────────────────────────────────────────
// 19, 5'8", 161 lb — BMI 24.5, which is normal. So "skinny fat" is an accurate
// self-diagnosis, not insecurity: normal on the scale, low muscle, high body
// fat. He also came in with pre-diabetes.
//
// THE WHOLE DECK TURNS ON ONE FACT: skeletal muscle is the body's largest
// glucose sink. Building muscle IS the metabolic intervention. So the physique
// he wants and the diagnosis he wants gone are the same project — he does not
// have to pick, and he does not have to cut.
//
// His instinct (and the shorthand he was probably given) is "pre-diabetic, so
// lose weight". At 161 lb that strips the exact tissue that would fix his
// glucose. Nothing in this deck may drift toward a deficit.
//
// SCOPE IS A SLIDE, NOT A DISCLAIMER. A 19-year-old with a metabolic diagnosis
// is precisely the client where the boundary gets said out loud, on screen,
// before money is discussed. It reads as professional, not defensive.

const prospectName = 'Monty';
const ACCENT = '#3c9c94';          // teal — clinical, athletic, distinct from the other builds

const SLIDES = [
  // 1
  {
    type: 'hero',
    headline: 'built for monty.',
    sub: 'athletic, lean, and off the pre-diabetes track.',
    body: "you came in with two goals and you think they're a trade-off. they're not. they're the same project, and the next fifteen minutes are me showing you why.",
  },
  // 2
  {
    type: 'fit-frame',
    headline: 'this part is short.',
    points: [
      "i want ten minutes on where you actually are — including the numbers.",
      "the deep version is the intake form you fill out after this call.",
      "then i show you the dashboard you'd be using every day.",
      "then you decide. i'm not going to chase you.",
    ],
  },
  // 3
  {
    type: 'discovery',
    headline: 'tell me where you actually are.',
    questions: [
      "what's the actual number — a1c, or fasting glucose?",
      'who told you, and are you still seeing them?',
      'are you on anything for it — metformin, anything else?',
      'anyone in your family with type 2?',
      'what does your training week honestly look like right now?',
      'walk me through a normal day of eating.',
      "how much sleep are you actually getting — not aiming for?",
    ],
  },
  // 4
  {
    type: 'reflection',
    headline: "what i'm hearing.",
    left: {
      label: 'where you are',
      items: [
        "5'8\", 161 — normal on the scale",
        'low muscle, higher body fat',
        'a diagnosis at 19 that got your attention',
        'wants athletic, not just skinny',
        'no structured lifting behind you',
      ],
    },
    right: {
      label: "what's missing",
      items: [
        'muscle — the thing that fixes both goals',
        'protein anywhere near where it needs to be',
        'carbs placed where they actually get used',
        'a record of what you lifted last week',
        'anyone checking whether it is working',
      ],
    },
  },
  // 5 — the slide the whole call is built on
  {
    type: 'problem',
    headline: 'the advice you got makes it worse.',
    chain: [
      'told you are pre-diabetic',
      'told to lose weight',
      'eat less, do more cardio',
      'you lose muscle, not just fat',
      'less muscle, fewer places for glucose to go',
      'insulin sensitivity gets worse',
      'still skinny fat. still pre-diabetic.',
    ],
    body: "muscle is the largest glucose sink in your body — it is where sugar goes to be used instead of stored. every diet that costs you muscle makes the metabolic problem harder, not easier. at 161 pounds and 5'8\" you do not have weight to lose. you have muscle to build.",
  },
  // 6
  {
    type: 'fit',
    headline: "you don't have to pick one.",
    sub: 'the lean athletic build and the blood sugar are the same intervention.',
    body: "this is the part nobody told you. heavy lifting, high protein, and carbs timed around training is the physique protocol AND it is the insulin sensitivity protocol. they are not two plans competing for your time. it is one plan, and the reason you have been stuck is that you have been given the wrong one for both.",
  },
  // 7 — said before money, on purpose
  {
    type: 'scope',
    headline: 'what i am, and what i am not.',
    left: {
      label: 'what i coach',
      items: [
        'the training',
        'the food and the protein target',
        'sleep and daily structure',
        'the record, and whether it is working',
      ],
    },
    right: {
      label: 'what i do not do',
      items: [
        'diagnose anything',
        'manage medication',
        'replace your doctor',
        'promise you a number on a lab result',
      ],
    },
    body: "you keep seeing whoever diagnosed you — they track the bloodwork. i build the training and the food that move it, and those happen to be the same ones that make you athletic. if you are not under anyone's care right now, that is the one thing i want sorted before we start.",
  },
  // 8
  {
    type: 'system',
    headline: 'the loop.',
    items: [
      { icon: '01', text: 'we talk once a week — 30 to 45 minutes, same slot' },
      { icon: '02', text: 'i rewrite the week off your actual numbers, not your memory' },
      { icon: '03', text: 'you open the dashboard at the gym and log every set' },
      { icon: '04', text: 'you check in at night — two lines, takes 30 seconds' },
      { icon: '05', text: 'i read every check-in before your next call' },
      { icon: '06', text: 'next call starts with your data already on the table' },
    ],
    footer: 'the call sets the direction. the dashboard runs the other six days.',
  },
  // 9
  {
    type: 'training',
    headline: 'built to put muscle on you.',
    pillars: [
      { label: 'four sessions, upper / lower', sub: 'placed on the days you actually have.' },
      { label: 'heavy compounds first', sub: 'squat, hinge, press, pull. the ones that build the most tissue.' },
      { label: 'two hard working sets', sub: 'enough stimulus. nothing wasted.' },
      { label: 'double progression, every set logged', sub: 'top of the rep range on both sets, then the weight moves.' },
      { label: 'one athletic day', sub: 'jumps and short sprints. you said athletic — that is trained, not hoped for.' },
    ],
    footer: 'you are 19 with no training history. that is the best position anyone can be in.',
  },
  // 10
  {
    type: 'nutrition',
    headline: 'you are going to eat more.',
    pillars: [
      { label: 'protein first — around 160g', sub: 'the one number that matters. it is what makes the gain muscle.' },
      { label: 'carbs around training', sub: 'when your muscle is most insulin-sensitive and actually takes them up.' },
      { label: 'whole food, no seed oils', sub: 'built from what you already eat. the intake asks — i do not guess.' },
      { label: 'the scale goes up slowly', sub: 'on purpose. that is the plan working, not the plan failing.' },
      { label: 'no weighing, no tracking app', sub: 'hit the protein and the day is done.' },
    ],
    footer: 'cutting at 161 costs you the tissue that fixes your glucose. we are not doing it.',
  },
  // 11 — given away free, before price
  {
    type: 'recovery',
    headline: 'the one you start tonight.',
    items: [
      '10 to 15 minutes after you eat',
      'a walk, not a workout',
      'it blunts the glucose spike directly',
      'works even if nothing else changes yet',
      'three short walks beat one gym session for this',
      'free, and you can do it tonight',
    ],
    body: "i am giving you this before you have paid me anything. do it for a week. if nothing else on this call lands, that one is still worth the time you spent here.",
  },
  // 12
  {
    type: 'portal',
    headline: 'this is what you get monday.',
    sub: 'the dashboard. open it on your phone at the gym.',
    url: '/client/sample-8week',
    tabs: ['start here', 'training', 'food', 'grocery', 'log', 'progress', 'weight', 'check in'],
  },
  // 13
  {
    type: 'value',
    headline: "what's actually included.",
    items: [
      'a weekly 1:1 call — 8 of them',
      'your own dashboard, built from your intake',
      '8-week program in four phases',
      'set-by-set lift logging',
      'nightly check-ins i actually read',
      'progress + bodyweight tracking',
      'protein target and meal structure',
      'grocery list',
      'the week rewritten every week off your data',
      'form feedback whenever you send it',
    ],
    footer: 'not a pdf. a system that updates because someone is actually looking at it.',
  },
  // 14
  {
    type: 'bridge',
    headline: 'is that the part nobody has given you?',
  },
  // 15
  {
    type: 'investment',
    headline: '$125 a week. 8 weeks.',
    items: [
      'a 1:1 call every week',
      'your dashboard, live from day one',
      'the program rewritten weekly off your logs',
      'nightly check-ins reviewed before every call',
      'protein structure, grocery list, progress tracking',
      'form feedback whenever you send it',
    ],
    body: "it's priced by the week because it's delivered every week. you're not buying a document — you're buying eight calls and eight weeks of someone actually watching. $1,000 across the block.",
  },
  // 16
  {
    type: 'close',
    headline: 'nineteen is the best possible time to find this out.',
    sub: "most people get this news at forty, with twenty years of habits behind it. you get to fix it before it's a story about your life.",
  },
];

// ── RENDER HELPERS ────────────────────────────────────────────────────────────
const S = {
  page: {
    background: '#000',
    minHeight: '100dvh',
    fontFamily: 'Inter, -apple-system, sans-serif',
    fontWeight: 300,
    color: '#EDEDE8',
    display: 'flex',
    flexDirection: 'column',
  },
  mono: (sz = '0.5rem', col = '#3A3A3A') => ({
    fontFamily: 'ui-monospace, monospace',
    fontSize: sz,
    letterSpacing: '0.25em',
    textTransform: 'uppercase',
    color: col,
  }),
  label: {
    fontFamily: 'ui-monospace, monospace',
    fontSize: '0.44rem',
    letterSpacing: '0.25em',
    textTransform: 'uppercase',
    color: '#3A3A3A',
    marginBottom: '0.6rem',
  },
  pad: 'clamp(2rem,5vw,4rem) clamp(1.5rem,5vw,4rem)',
};

const frame = { flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: S.pad };

function SlideHero({ slide }) {
  return (
    <div style={frame}>
      <div style={{ ...S.mono(), marginBottom: '1.8rem' }}>vveritas* coaching</div>
      <h1 style={{ fontSize: 'clamp(2.6rem,7vw,6rem)', fontWeight: 200, letterSpacing: '-0.04em', lineHeight: 1.0, marginBottom: '1.2rem' }}>
        {slide.headline}
      </h1>
      <p style={{ fontSize: 'clamp(0.9rem,1.6vw,1.3rem)', color: '#5A5A5A', letterSpacing: '-0.01em', marginBottom: '1rem', maxWidth: '560px' }}>
        {slide.sub}
      </p>
      <p style={{ fontSize: 'clamp(0.72rem,1.1vw,0.88rem)', color: '#3A3A3A', lineHeight: 1.7, maxWidth: '480px' }}>
        {slide.body}
      </p>
    </div>
  );
}

function SlideFrame({ slide }) {
  return (
    <div style={frame}>
      <div style={S.label}>assessment</div>
      <h2 style={{ fontSize: 'clamp(1.6rem,4vw,3rem)', fontWeight: 200, letterSpacing: '-0.03em', marginBottom: '2rem', lineHeight: 1.1 }}>
        {slide.headline}
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', maxWidth: '560px' }}>
        {slide.points.map((p, i) => (
          <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.5rem', color: ACCENT, marginTop: '0.25rem', flexShrink: 0 }}>—</span>
            <span style={{ fontSize: 'clamp(0.85rem,1.3vw,1.05rem)', color: '#EDEDE8', lineHeight: 1.6 }}>{p}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SlideDiscovery({ slide }) {
  return (
    <div style={frame}>
      <div style={S.label}>discovery</div>
      <h2 style={{ fontSize: 'clamp(1.4rem,3.5vw,2.6rem)', fontWeight: 200, letterSpacing: '-0.03em', marginBottom: '2rem', lineHeight: 1.1 }}>
        {slide.headline}
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '640px' }}>
        {slide.questions.map((q, i) => (
          <div key={i} style={{ display: 'flex', gap: '1.2rem', alignItems: 'flex-start', paddingBottom: '0.9rem', borderBottom: '1px solid #0d0d0d' }}>
            <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.42rem', color: i < 4 ? ACCENT : '#2A2A2A', marginTop: '0.3rem', flexShrink: 0, minWidth: '1rem' }}>{i + 1}</span>
            <span style={{ fontSize: 'clamp(0.8rem,1.2vw,1rem)', color: '#EDEDE8', lineHeight: 1.6 }}>{q}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Two labelled columns. Used for the reflection and, with a body, the scope slide. */
function TwoColumn({ slide, sectionLabel, rightColor = '#8c3a3a' }) {
  return (
    <div style={frame}>
      <div style={S.label}>{sectionLabel}</div>
      <h2 style={{ fontSize: 'clamp(1.6rem,4vw,3rem)', fontWeight: 200, letterSpacing: '-0.03em', marginBottom: '2.5rem', lineHeight: 1.1 }}>
        {slide.headline}
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', maxWidth: '640px', marginBottom: slide.body ? '2rem' : 0 }}>
        {[slide.left, slide.right].map((col, ci) => (
          <div key={ci}>
            <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.4rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: ci === 0 ? ACCENT : rightColor, marginBottom: '0.8rem' }}>
              {col.label}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {col.items.map((item, j) => (
                <div key={j} style={{ display: 'flex', gap: '0.7rem', alignItems: 'flex-start' }}>
                  <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.42rem', color: ci === 0 ? ACCENT : rightColor, marginTop: '0.22rem', flexShrink: 0 }}>—</span>
                  <span style={{ fontSize: 'clamp(0.72rem,1.05vw,0.85rem)', color: '#EDEDE8', lineHeight: 1.55 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {slide.body && (
        <p style={{ fontSize: 'clamp(0.72rem,1.05vw,0.85rem)', color: '#5A5A5A', lineHeight: 1.75, maxWidth: '560px', borderLeft: '1px solid #1a1a1a', paddingLeft: '1rem' }}>
          {slide.body}
        </p>
      )}
    </div>
  );
}

function SlideProblem({ slide }) {
  const last = slide.chain.length - 1;
  return (
    <div style={frame}>
      <div style={S.label}>the problem</div>
      <h2 style={{ fontSize: 'clamp(1.4rem,3.5vw,2.6rem)', fontWeight: 200, letterSpacing: '-0.03em', marginBottom: '2rem', lineHeight: 1.1 }}>
        {slide.headline}
      </h2>
      <div style={{ display: 'flex', gap: 'clamp(2rem,6vw,6rem)', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {slide.chain.map((step, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.2rem' }}>
              <span style={{
                fontSize: 'clamp(0.78rem,1.15vw,0.9rem)',
                color: i >= last - 1 ? '#8c3a3a' : '#EDEDE8',
                fontWeight: i === last ? 400 : 300,
                letterSpacing: i === last ? '0.02em' : 'normal',
              }}>{step}</span>
              {i < last && (
                <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.4rem', color: '#2A2A2A', paddingLeft: '0.1rem' }}>↓</span>
              )}
            </div>
          ))}
        </div>
        <div style={{ maxWidth: '320px', paddingTop: '0.5rem' }}>
          <p style={{ fontSize: 'clamp(0.72rem,1.05vw,0.85rem)', color: '#5A5A5A', lineHeight: 1.8, borderLeft: `1px solid ${ACCENT}`, paddingLeft: '1rem' }}>
            {slide.body}
          </p>
        </div>
      </div>
    </div>
  );
}

function SlideSystem({ slide }) {
  return (
    <div style={frame}>
      <div style={S.label}>the solution</div>
      <h2 style={{ fontSize: 'clamp(1.6rem,4vw,3rem)', fontWeight: 200, letterSpacing: '-0.03em', marginBottom: '2rem', lineHeight: 1.1 }}>
        {slide.headline}
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', maxWidth: '580px', marginBottom: '2rem' }}>
        {slide.items.map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.5rem', color: ACCENT, marginTop: '0.22rem', flexShrink: 0 }}>{item.icon}</span>
            <span style={{ fontSize: 'clamp(0.82rem,1.25vw,1rem)', color: '#EDEDE8', lineHeight: 1.6 }}>{item.text}</span>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 'clamp(0.7rem,1vw,0.85rem)', color: '#3A3A3A', fontStyle: 'italic', paddingTop: '1rem', borderTop: '1px solid #0d0d0d', maxWidth: '480px' }}>
        {slide.footer}
      </p>
    </div>
  );
}

function SlidePillars({ slide, sectionLabel }) {
  return (
    <div style={frame}>
      <div style={S.label}>{sectionLabel}</div>
      <h2 style={{ fontSize: 'clamp(1.4rem,3.5vw,2.6rem)', fontWeight: 200, letterSpacing: '-0.03em', marginBottom: '2rem', lineHeight: 1.1 }}>
        {slide.headline}
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0, maxWidth: '580px', marginBottom: '1.5rem' }}>
        {slide.pillars.map((p, i) => (
          <div key={i} style={{ padding: '0.9rem 0', borderBottom: '1px solid #0d0d0d', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <span style={{ fontSize: 'clamp(0.82rem,1.25vw,1rem)', color: '#EDEDE8', lineHeight: 1.4 }}>{p.label}</span>
            <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.42rem', color: '#3A3A3A', letterSpacing: '0.06em' }}>{p.sub}</span>
          </div>
        ))}
      </div>
      <p style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.46rem', letterSpacing: '0.06em', color: ACCENT, textTransform: 'uppercase' }}>
        {slide.footer}
      </p>
    </div>
  );
}

function SlideRecovery({ slide }) {
  return (
    <div style={frame}>
      <div style={S.label}>start tonight</div>
      <h2 style={{ fontSize: 'clamp(1.4rem,3.5vw,2.6rem)', fontWeight: 200, letterSpacing: '-0.03em', marginBottom: '2rem', lineHeight: 1.1 }}>
        {slide.headline}
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '0.6rem 3rem', maxWidth: '540px', marginBottom: '2rem' }}>
        {slide.items.map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: '0.7rem', alignItems: 'flex-start', padding: '0.5rem 0', borderBottom: '1px solid #0d0d0d' }}>
            <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.42rem', color: ACCENT, marginTop: '0.2rem', flexShrink: 0 }}>—</span>
            <span style={{ fontSize: 'clamp(0.72rem,1.05vw,0.85rem)', color: '#EDEDE8', lineHeight: 1.5 }}>{item}</span>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 'clamp(0.72rem,1.05vw,0.85rem)', color: '#5A5A5A', lineHeight: 1.7, maxWidth: '480px', borderLeft: `1px solid ${ACCENT}`, paddingLeft: '1rem' }}>
        {slide.body}
      </p>
    </div>
  );
}

function SlidePortal({ slide }) {
  return (
    <div style={frame}>
      <div style={S.label}>demo</div>
      <h2 style={{ fontSize: 'clamp(1.6rem,4vw,3rem)', fontWeight: 200, letterSpacing: '-0.03em', marginBottom: '0.8rem', lineHeight: 1.1 }}>
        {slide.headline}
      </h2>
      <p style={{ fontSize: 'clamp(0.72rem,1.05vw,0.85rem)', color: '#5A5A5A', marginBottom: '2rem' }}>{slide.sub}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
        {slide.tabs.map((tab, i) => (
          <div key={i} style={{ padding: '0.4rem 0.8rem', border: '1px solid #1a1a1a', fontFamily: 'ui-monospace, monospace', fontSize: '0.44rem', letterSpacing: '0.1em', color: '#3A3A3A' }}>
            {tab}
          </div>
        ))}
      </div>
      <a href={slide.url} target="_blank" rel="noreferrer"
        style={{ display: 'inline-block', padding: '0.8rem 1.4rem', border: '1px solid #EDEDE8', color: '#EDEDE8', fontFamily: 'Inter, -apple-system, sans-serif', fontWeight: 300, fontSize: 'clamp(0.78rem,1.1vw,0.9rem)', textDecoration: 'none', width: 'fit-content' }}>
        open portal →
      </a>
    </div>
  );
}

function SlideValue({ slide }) {
  return (
    <div style={frame}>
      <div style={S.label}>what you get</div>
      <h2 style={{ fontSize: 'clamp(1.6rem,4vw,3rem)', fontWeight: 200, letterSpacing: '-0.03em', marginBottom: '2rem', lineHeight: 1.1 }}>
        {slide.headline}
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '0.5rem 3rem', maxWidth: '560px', marginBottom: '2rem' }}>
        {slide.items.map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: '0.7rem', alignItems: 'baseline' }}>
            <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.5rem', color: ACCENT, flexShrink: 0 }}>✓</span>
            <span style={{ fontSize: 'clamp(0.72rem,1.05vw,0.85rem)', color: '#EDEDE8', lineHeight: 1.55 }}>{item}</span>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 'clamp(0.7rem,1vw,0.85rem)', color: '#3A3A3A', fontStyle: 'italic', paddingTop: '1rem', borderTop: '1px solid #0d0d0d', maxWidth: '460px' }}>
        {slide.footer}
      </p>
    </div>
  );
}

function SlideFit({ slide }) {
  return (
    <div style={frame}>
      <div style={S.label}>the reframe</div>
      <h2 style={{ fontSize: 'clamp(1.6rem,4vw,3rem)', fontWeight: 200, letterSpacing: '-0.03em', marginBottom: '0.8rem', lineHeight: 1.1 }}>
        {slide.headline}
      </h2>
      <p style={{ fontSize: 'clamp(0.9rem,1.4vw,1.1rem)', color: ACCENT, marginBottom: '1.5rem', maxWidth: '520px', lineHeight: 1.5 }}>{slide.sub}</p>
      <p style={{ fontSize: 'clamp(0.78rem,1.15vw,0.9rem)', color: '#EDEDE8', lineHeight: 1.8, maxWidth: '520px', borderLeft: '1px solid #1a1a1a', paddingLeft: '1rem' }}>
        {slide.body}
      </p>
    </div>
  );
}

function SlideBridge({ slide }) {
  return (
    <div style={{ ...frame, alignItems: 'center', textAlign: 'center' }}>
      <div style={S.label}>question</div>
      <h2 style={{ fontSize: 'clamp(1.6rem,4vw,3rem)', fontWeight: 200, letterSpacing: '-0.03em', lineHeight: 1.2, maxWidth: '600px' }}>
        {slide.headline}
      </h2>
    </div>
  );
}

function SlideInvestment({ slide }) {
  return (
    <div style={frame}>
      <div style={S.label}>investment</div>
      <h2 style={{ fontSize: 'clamp(2.4rem,6vw,5rem)', fontWeight: 200, letterSpacing: '-0.04em', lineHeight: 1.0, marginBottom: '1.5rem' }}>
        {slide.headline}
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '0.4rem 2.5rem', maxWidth: '500px', marginBottom: '2rem' }}>
        {slide.items.map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: '0.7rem', alignItems: 'baseline' }}>
            <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.48rem', color: ACCENT, flexShrink: 0 }}>✓</span>
            <span style={{ fontSize: 'clamp(0.7rem,1vw,0.82rem)', color: '#EDEDE8', lineHeight: 1.5 }}>{item}</span>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 'clamp(0.72rem,1.05vw,0.86rem)', color: '#5A5A5A', lineHeight: 1.75, maxWidth: '480px', borderLeft: '1px solid #1a1a1a', paddingLeft: '1rem' }}>
        {slide.body}
      </p>
    </div>
  );
}

function SlideClose({ slide }) {
  return (
    <div style={frame}>
      <h2 style={{ fontSize: 'clamp(1.8rem,5vw,4.2rem)', fontWeight: 200, letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: '1rem', maxWidth: '680px' }}>
        {slide.headline}
      </h2>
      <p style={{ fontSize: 'clamp(0.9rem,1.5vw,1.2rem)', color: ACCENT, letterSpacing: '-0.01em', maxWidth: '560px', lineHeight: 1.5 }}>
        {slide.sub}
      </p>
    </div>
  );
}

function renderSlide(slide) {
  switch (slide.type) {
    case 'hero':        return <SlideHero slide={slide} />;
    case 'fit-frame':   return <SlideFrame slide={slide} />;
    case 'discovery':   return <SlideDiscovery slide={slide} />;
    case 'reflection':  return <TwoColumn slide={slide} sectionLabel="reflection" />;
    case 'scope':       return <TwoColumn slide={slide} sectionLabel="scope" rightColor="#5A5A5A" />;
    case 'problem':     return <SlideProblem slide={slide} />;
    case 'system':      return <SlideSystem slide={slide} />;
    case 'training':    return <SlidePillars slide={slide} sectionLabel="training" />;
    case 'nutrition':   return <SlidePillars slide={slide} sectionLabel="nutrition" />;
    case 'recovery':    return <SlideRecovery slide={slide} />;
    case 'portal':      return <SlidePortal slide={slide} />;
    case 'value':       return <SlideValue slide={slide} />;
    case 'fit':         return <SlideFit slide={slide} />;
    case 'bridge':      return <SlideBridge slide={slide} />;
    case 'investment':  return <SlideInvestment slide={slide} />;
    case 'close':       return <SlideClose slide={slide} />;
    default:            return null;
  }
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function MontyPitch() {
  const [idx, setIdx] = useState(0);
  const slide = SLIDES[idx];
  const pct   = Math.round(((idx + 1) / SLIDES.length) * 100);

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'ArrowRight' || e.key === ' ') setIdx(i => Math.min(i + 1, SLIDES.length - 1));
      if (e.key === 'ArrowLeft')                    setIdx(i => Math.max(i - 1, 0));
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div style={S.page}>
      {/* top bar */}
      <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #0f0f0f', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.5rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#3A3A3A' }}>
          vveritas* — {prospectName.toLowerCase()}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <a href="/pitch/monty/notes" target="_blank" rel="noreferrer"
            style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.42rem', letterSpacing: '0.1em', color: '#5A5A5A', textDecoration: 'none' }}>
            notes ↗
          </a>
          <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.5rem', color: '#5A5A5A', letterSpacing: '0.1em' }}>
            {idx + 1} / {SLIDES.length}
          </span>
        </div>
      </div>

      {/* progress */}
      <div style={{ height: '1px', background: '#0a0a0a', flexShrink: 0 }}>
        <div style={{ height: '1px', background: ACCENT, width: `${pct}%`, transition: 'width 0.3s ease' }} />
      </div>

      {/* slide */}
      {renderSlide(slide)}

      {/* nav */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderTop: '1px solid #0f0f0f', flexShrink: 0 }}>
        <button onClick={() => setIdx(i => Math.max(i - 1, 0))} disabled={idx === 0}
          style={{ padding: '1.1rem', background: 'none', border: 'none', borderRight: '1px solid #0f0f0f', color: idx === 0 ? '#1a1a1a' : '#5A5A5A', fontFamily: 'inherit', fontSize: '0.85rem', cursor: idx === 0 ? 'default' : 'pointer' }}>
          ← prev
        </button>
        <button onClick={() => setIdx(i => Math.min(i + 1, SLIDES.length - 1))} disabled={idx === SLIDES.length - 1}
          style={{ padding: '1.1rem', background: 'none', border: 'none', color: idx === SLIDES.length - 1 ? '#1a1a1a' : '#EDEDE8', fontFamily: 'inherit', fontSize: '0.85rem', cursor: idx === SLIDES.length - 1 ? 'default' : 'pointer' }}>
          next →
        </button>
      </div>
    </div>
  );
}
