'use client';
import { useState, useEffect } from 'react';

const prospectName = 'Xavior';
const GREEN = '#4a8c6a';

const SLIDES = [
  // 1
  {
    type: 'hero',
    headline: 'built for xavior.',
    sub: 'one call a week. one dashboard every night.',
    body: "most coaching hands you a plan. this hands you a loop — we talk once a week, you log every day, and next week gets built off what actually happened.",
    notes: `...`,
  },
  // 2
  {
    type: 'fit-frame',
    headline: 'this part is short.',
    points: [
      "you already know the brand, so i'm not going to sell you on me.",
      "i want maybe ten minutes on your situation — enough to know what we're building.",
      "the deep version is the intake form you fill out after this call.",
      "then i show you the dashboard, and you decide.",
    ],
    notes: `...`,
  },
  // 3
  {
    type: 'discovery',
    headline: 'tell me where you actually are.',
    questions: [
      'what do you want to look like in 8 weeks — be specific.',
      'what does your training week look like right now, honestly?',
      "what's the longest you've stayed consistent, and what ended it?",
      'what does your schedule actually allow — days and times?',
      "what part do you already know you're bad at? food, sleep, or showing up?",
    ],
    notes: `...`,
  },
  // 4
  {
    type: 'reflection',
    headline: "what i'm hearing.",
    left: {
      label: 'where you are',
      items: [
        'trains, but in bursts',
        'knows enough theory to be dangerous',
        'wants a visible change in 8 weeks',
        'has the schedule for it',
        'wants someone actually watching',
      ],
    },
    right: {
      label: "what's missing",
      items: [
        'no record of what you lifted last week',
        'nobody reviewing anything',
        'every week starts from memory',
        'no standard you get held to',
        'progress you cannot see, so you quit',
      ],
    },
    notes: `...`,
  },
  // 5
  {
    type: 'problem',
    headline: "your week has no feedback loop.",
    chain: [
      'get a program',
      'train hard week one',
      'forget what you lifted',
      'guess the next week',
      'guess again',
      'stall',
      'lose interest',
      'restart in january.',
    ],
    body: "this is not a discipline problem. you cannot progressively overload something you never wrote down. without a record there is nothing to beat, and without something to beat there is no progress.",
    notes: `...`,
  },
  // 6
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
    notes: `...`,
  },
  // 7
  {
    type: 'training',
    headline: 'training built around your week.',
    pillars: [
      { label: 'four sessions, upper / lower', sub: 'placed on the days you told me you have.' },
      { label: 'two hard working sets', sub: 'enough stimulus. nothing wasted.' },
      { label: 'double progression', sub: 'top of the rep range on both sets, then the weight moves.' },
      { label: 'every set logged in the app', sub: 'so next week has a number to beat.' },
      { label: 'the plan changes every 2 weeks', sub: 'baseline, load, push, consolidate.' },
    ],
    footer: 'eight weeks is four phases, not one workout repeated.',
    notes: `...`,
  },
  // 8
  {
    type: 'nutrition',
    headline: 'food you will actually eat.',
    pillars: [
      { label: 'protein first', sub: 'the one number that matters most.' },
      { label: 'built from what you already like', sub: 'the intake asks. i do not guess.' },
      { label: 'repeatable meals', sub: 'same few most of the week. no decision fatigue.' },
      { label: 'grocery list in the app', sub: 'one shop a week, already written.' },
      { label: 'no weighing, no tracking app', sub: 'hit the protein and the day is done.' },
    ],
    footer: 'if the plan needs you to be a different person to follow it, it is a bad plan.',
    notes: `...`,
  },
  // 9
  {
    type: 'portal',
    headline: 'this is what you get monday.',
    sub: 'the dashboard. open it on your phone at the gym.',
    url: '/client/sample-8week',
    tabs: ['start here', 'training', 'food', 'grocery', 'log', 'progress', 'weight', 'check in'],
    notes: `...`,
  },
  // 10
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
      'nutrition structure + protein target',
      'grocery list',
      'the week rewritten every week off your data',
      'a standard you get held to',
    ],
    footer: 'not a pdf. a system that updates because someone is looking at it.',
    notes: `...`,
  },
  // 11
  {
    type: 'fit',
    headline: "you don't need more information.",
    sub: 'you need a record and someone reading it.',
    body: "based on what you told me, i think you're a strong fit. not because you've been consistent — you said yourself you go in bursts. because you already know what you're bad at. most people can't tell me that, and it's the whole reason this works.",
    notes: `...`,
  },
  // 12
  {
    type: 'bridge',
    headline: 'is that the part you’ve been missing?',
    notes: `...`,
  },
  // 13
  {
    type: 'investment',
    headline: '$125 a week. 8 weeks.',
    items: [
      'a 1:1 call every week',
      'your dashboard, live from day one',
      'the program rewritten weekly off your logs',
      'nightly check-ins reviewed before every call',
      'nutrition, grocery list, progress tracking',
      'form feedback whenever you send it',
    ],
    body: "it's priced by the week because it's delivered every week. you're not buying a document — you're buying eight calls and eight weeks of someone actually watching. $1,000 across the block.",
    notes: `...`,
  },
  // 14
  {
    type: 'close',
    headline: 'eight weeks of being watched.',
    sub: "you've done the version where nobody's looking. you know how that ends.",
    notes: `...`,
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
};

function SlideHero({ slide }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(2rem,5vw,4rem) clamp(1.5rem,5vw,4rem)' }}>
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
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(2rem,5vw,4rem) clamp(1.5rem,5vw,4rem)' }}>
      <div style={S.label}>assessment</div>
      <h2 style={{ fontSize: 'clamp(1.6rem,4vw,3rem)', fontWeight: 200, letterSpacing: '-0.03em', marginBottom: '2rem', lineHeight: 1.1 }}>
        {slide.headline}
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', maxWidth: '560px' }}>
        {slide.points.map((p, i) => (
          <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.5rem', color: GREEN, marginTop: '0.25rem', flexShrink: 0 }}>—</span>
            <span style={{ fontSize: 'clamp(0.85rem,1.3vw,1.05rem)', color: '#EDEDE8', lineHeight: 1.6 }}>{p}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SlideDiscovery({ slide }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(2rem,5vw,4rem) clamp(1.5rem,5vw,4rem)' }}>
      <div style={S.label}>discovery</div>
      <h2 style={{ fontSize: 'clamp(1.4rem,3.5vw,2.6rem)', fontWeight: 200, letterSpacing: '-0.03em', marginBottom: '2rem', lineHeight: 1.1 }}>
        {slide.headline}
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '640px' }}>
        {slide.questions.map((q, i) => (
          <div key={i} style={{ display: 'flex', gap: '1.2rem', alignItems: 'flex-start', paddingBottom: '0.9rem', borderBottom: '1px solid #0d0d0d' }}>
            <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.42rem', color: '#2A2A2A', marginTop: '0.3rem', flexShrink: 0, minWidth: '1rem' }}>{i + 1}</span>
            <span style={{ fontSize: 'clamp(0.8rem,1.2vw,1rem)', color: '#EDEDE8', lineHeight: 1.6 }}>{q}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SlideReflection({ slide }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(2rem,5vw,4rem) clamp(1.5rem,5vw,4rem)' }}>
      <div style={S.label}>reflection</div>
      <h2 style={{ fontSize: 'clamp(1.6rem,4vw,3rem)', fontWeight: 200, letterSpacing: '-0.03em', marginBottom: '2.5rem', lineHeight: 1.1 }}>
        {slide.headline}
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', maxWidth: '640px' }}>
        {[slide.left, slide.right].map((col, ci) => (
          <div key={ci}>
            <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.4rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: ci === 0 ? GREEN : '#8c3a3a', marginBottom: '0.8rem' }}>
              {col.label}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {col.items.map((item, j) => (
                <div key={j} style={{ display: 'flex', gap: '0.7rem', alignItems: 'flex-start' }}>
                  <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.42rem', color: ci === 0 ? GREEN : '#8c3a3a', marginTop: '0.22rem', flexShrink: 0 }}>—</span>
                  <span style={{ fontSize: 'clamp(0.72rem,1.05vw,0.85rem)', color: '#EDEDE8', lineHeight: 1.55 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SlideProblem({ slide }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(2rem,5vw,4rem) clamp(1.5rem,5vw,4rem)' }}>
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
                color: i >= 6 ? '#8c3a3a' : '#EDEDE8',
                fontWeight: i >= 7 ? 400 : 300,
                letterSpacing: i >= 7 ? '0.02em' : 'normal',
              }}>{step}</span>
              {i < slide.chain.length - 1 && (
                <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.4rem', color: '#2A2A2A', paddingLeft: '0.1rem' }}>↓</span>
              )}
            </div>
          ))}
        </div>
        <div style={{ maxWidth: '300px', paddingTop: '0.5rem' }}>
          <p style={{ fontSize: 'clamp(0.72rem,1.05vw,0.85rem)', color: '#5A5A5A', lineHeight: 1.8, borderLeft: '1px solid #1a1a1a', paddingLeft: '1rem' }}>
            {slide.body}
          </p>
        </div>
      </div>
    </div>
  );
}

function SlideSystem({ slide }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(2rem,5vw,4rem) clamp(1.5rem,5vw,4rem)' }}>
      <div style={S.label}>the solution</div>
      <h2 style={{ fontSize: 'clamp(1.6rem,4vw,3rem)', fontWeight: 200, letterSpacing: '-0.03em', marginBottom: '2rem', lineHeight: 1.1 }}>
        {slide.headline}
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', maxWidth: '580px', marginBottom: '2rem' }}>
        {slide.items.map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.5rem', color: GREEN, marginTop: '0.22rem', flexShrink: 0 }}>{item.icon}</span>
            <span style={{ fontSize: 'clamp(0.82rem,1.25vw,1rem)', color: '#EDEDE8', lineHeight: 1.6 }}>{item.text}</span>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 'clamp(0.7rem,1rem,0.85rem)', color: '#3A3A3A', fontStyle: 'italic', paddingTop: '1rem', borderTop: '1px solid #0d0d0d', maxWidth: '480px' }}>
        {slide.footer}
      </p>
    </div>
  );
}

function SlidePillars({ slide, sectionLabel }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(2rem,5vw,4rem) clamp(1.5rem,5vw,4rem)' }}>
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
      <p style={{ fontSize: 'clamp(0.7rem,1rem,0.85rem)', color: GREEN, fontFamily: 'ui-monospace, monospace', fontSize: '0.46rem', letterSpacing: '0.06em' }}>
        {slide.footer}
      </p>
    </div>
  );
}

function SlideRecovery({ slide }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(2rem,5vw,4rem) clamp(1.5rem,5vw,4rem)' }}>
      <div style={S.label}>recovery</div>
      <h2 style={{ fontSize: 'clamp(1.4rem,3.5vw,2.6rem)', fontWeight: 200, letterSpacing: '-0.03em', marginBottom: '2rem', lineHeight: 1.1 }}>
        {slide.headline}
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '0.6rem 3rem', maxWidth: '540px', marginBottom: '2rem' }}>
        {slide.items.map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: '0.7rem', alignItems: 'flex-start', padding: '0.5rem 0', borderBottom: '1px solid #0d0d0d' }}>
            <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.42rem', color: GREEN, marginTop: '0.2rem', flexShrink: 0 }}>—</span>
            <span style={{ fontSize: 'clamp(0.72rem,1.05vw,0.85rem)', color: '#EDEDE8', lineHeight: 1.5 }}>{item}</span>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 'clamp(0.72rem,1.05vw,0.85rem)', color: '#5A5A5A', lineHeight: 1.7, maxWidth: '480px', borderLeft: '1px solid #1a1a1a', paddingLeft: '1rem' }}>
        {slide.body}
      </p>
    </div>
  );
}

function SlidePortal({ slide }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(2rem,5vw,4rem) clamp(1.5rem,5vw,4rem)' }}>
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
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(2rem,5vw,4rem) clamp(1.5rem,5vw,4rem)' }}>
      <div style={S.label}>what you get</div>
      <h2 style={{ fontSize: 'clamp(1.6rem,4vw,3rem)', fontWeight: 200, letterSpacing: '-0.03em', marginBottom: '2rem', lineHeight: 1.1 }}>
        {slide.headline}
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '0.5rem 3rem', maxWidth: '560px', marginBottom: '2rem' }}>
        {slide.items.map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: '0.7rem', alignItems: 'baseline' }}>
            <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.5rem', color: GREEN, flexShrink: 0 }}>✓</span>
            <span style={{ fontSize: 'clamp(0.72rem,1.05vw,0.85rem)', color: '#EDEDE8', lineHeight: 1.55 }}>{item}</span>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 'clamp(0.7rem,1rem,0.85rem)', color: '#3A3A3A', fontStyle: 'italic', paddingTop: '1rem', borderTop: '1px solid #0d0d0d', maxWidth: '460px' }}>
        {slide.footer}
      </p>
    </div>
  );
}

function SlideFit({ slide }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(2rem,5vw,4rem) clamp(1.5rem,5vw,4rem)' }}>
      <div style={S.label}>fit assessment</div>
      <h2 style={{ fontSize: 'clamp(1.6rem,4vw,3rem)', fontWeight: 200, letterSpacing: '-0.03em', marginBottom: '0.8rem', lineHeight: 1.1 }}>
        {slide.headline}
      </h2>
      <p style={{ fontSize: 'clamp(0.9rem,1.4vw,1.1rem)', color: '#5A5A5A', marginBottom: '1.5rem', maxWidth: '480px', lineHeight: 1.5 }}>{slide.sub}</p>
      <p style={{ fontSize: 'clamp(0.78rem,1.15vw,0.9rem)', color: '#EDEDE8', lineHeight: 1.8, maxWidth: '520px', borderLeft: '1px solid #1a1a1a', paddingLeft: '1rem' }}>
        {slide.body}
      </p>
    </div>
  );
}

function SlideBridge({ slide }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 'clamp(2rem,5vw,4rem) clamp(1.5rem,5vw,4rem)', textAlign: 'center' }}>
      <div style={S.label}>question</div>
      <h2 style={{ fontSize: 'clamp(1.6rem,4vw,3rem)', fontWeight: 200, letterSpacing: '-0.03em', lineHeight: 1.2, maxWidth: '600px' }}>
        {slide.headline}
      </h2>
    </div>
  );
}

function SlideInvestment({ slide }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(2rem,5vw,4rem) clamp(1.5rem,5vw,4rem)' }}>
      <div style={S.label}>investment</div>
      <h2 style={{ fontSize: 'clamp(2.4rem,6vw,5rem)', fontWeight: 200, letterSpacing: '-0.04em', lineHeight: 1.0, marginBottom: '1.5rem' }}>
        {slide.headline}
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '0.4rem 2.5rem', maxWidth: '500px', marginBottom: '2rem' }}>
        {slide.items.map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: '0.7rem', alignItems: 'baseline' }}>
            <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.48rem', color: GREEN, flexShrink: 0 }}>✓</span>
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
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(2rem,5vw,4rem) clamp(1.5rem,5vw,4rem)' }}>
      <h2 style={{ fontSize: 'clamp(1.8rem,5vw,4.2rem)', fontWeight: 200, letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: '1rem', maxWidth: '640px' }}>
        {slide.headline}
      </h2>
      <p style={{ fontSize: 'clamp(0.9rem,1.5vw,1.2rem)', color: GREEN, letterSpacing: '-0.01em', maxWidth: '520px', lineHeight: 1.5 }}>
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
    case 'reflection':  return <SlideReflection slide={slide} />;
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
export default function XaviorPitch() {
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
          vveritas* — zack
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <a href="/pitch/zack/notes" target="_blank" rel="noreferrer"
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
        <div style={{ height: '1px', background: GREEN, width: `${pct}%`, transition: 'width 0.3s ease' }} />
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
