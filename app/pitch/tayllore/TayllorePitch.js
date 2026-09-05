'use client';
import { useState, useEffect } from 'react';

const prospectName = 'Tayllore';
const GREEN = '#4a8c6a';

const SLIDES = [
  // 1
  {
    type: 'hero',
    headline: 'built for tayllore.',
    sub: 'sunday mornings. columbia. twelve weeks.',
    body: "you lost forty pounds on your own. this is the part that comes after — and it is a different job than the one you just finished.",
    notes: `...`,
  },
  // 2
  {
    type: 'fit-frame',
    headline: 'this is an assessment.',
    points: [
      "i am going to ask questions first. you do most of the talking.",
      "you said you want to learn form and be sent on your way. i take that seriously — the goal is you not needing me.",
      "i will tell you what i actually think, even where it is not what you expect.",
      "then i show you what the twelve weeks look like.",
    ],
    notes: `...`,
  },
  // 3
  {
    type: 'discovery',
    headline: 'tell me what the forty pounds cost you.',
    questions: [
      'how did you lose it — what were you actually doing?',
      'how long were you doing that for?',
      'what does a normal day of eating look like now?',
      'when did the scale stop moving?',
      'have you lifted before, or has it mostly been cardio?',
      'what does "still not there" look like to you — be specific.',
    ],
    notes: `...`,
  },
  // 4
  {
    type: 'reflection',
    headline: "what i'm hearing.",
    left: {
      label: 'what you did',
      items: [
        'lost 40 lb, on your own',
        'stayed with it long enough to work',
        'know how to be disciplined',
        'want to learn, not be babysat',
        'gave yourself a deadline',
      ],
    },
    right: {
      label: 'what it left you with',
      items: [
        'a body that adapted to eating less',
        'no strength base underneath',
        'nothing to shape, only less of you',
        'no idea what correct form feels like',
        'the scale as your only feedback',
      ],
    },
    notes: `...`,
  },
  // 5
  {
    type: 'problem',
    headline: 'the thing that got you here will not get you there.',
    chain: [
      'eat less',
      'move more',
      'lose 40 lb',
      'still not happy with what you see',
      'so — eat less again',
      'body adapts, slows down',
      'scale stops',
      '"my metabolism is broken."',
    ],
    body: "your metabolism is not broken. it did exactly what it is supposed to do when you eat less for a long time. the answer is not another deficit — it is building something for the first time.",
    notes: `...`,
  },
  // 6
  {
    type: 'system',
    headline: 'what twelve weeks looks like.',
    items: [
      { icon: '01', text: 'sunday morning, anytime fitness columbia — one hour, hands on' },
      { icon: '02', text: 'we drill form until it is yours, not until i say so' },
      { icon: '03', text: 'you train two more times that week on your own' },
      { icon: '04', text: 'every set goes in the app — last week’s numbers next to today’s' },
      { icon: '05', text: 'i read it before sunday, so we never start from memory' },
      { icon: '06', text: 'week twelve you can write your own program. that is the point.' },
    ],
    footer: 'the sunday hour teaches it. the other six days are where it becomes yours.',
    notes: `...`,
  },
  // 7
  {
    type: 'training',
    headline: 'glutes are built, not revealed.',
    pillars: [
      { label: 'hip thrust, rdl, split squat', sub: 'the three that actually build a backside.' },
      { label: 'form first, load second', sub: 'you cannot grow what you cannot feel working.' },
      { label: 'progressive overload', sub: 'the only variable that matters long term. i will teach you it.' },
      { label: 'three sessions a week', sub: 'not six. you have a life and it has to survive this.' },
      { label: 'cardio comes down, not up', sub: 'you have done enough of it.' },
    ],
    footer: 'twelve weeks of this and you will know how to program for yourself.',
    notes: `...`,
  },
  // 8
  {
    type: 'nutrition',
    headline: 'you are probably going to eat more.',
    pillars: [
      { label: 'protein first, and more of it', sub: 'this is what keeps the 40 lb off while you build.' },
      { label: 'eating more, on purpose', sub: 'the scale may not move. that is the plan, not a failure.' },
      { label: 'no tracking app', sub: 'you have counted enough. we use structure instead.' },
      { label: 'built from what you already eat', sub: 'i ask. i do not hand you a meal plan you will not follow.' },
      { label: 'the mirror over the scale', sub: 'recomposition does not show up on a scale. it shows up in a photo.' },
    ],
    footer: 'this will feel wrong for about three weeks. then it will feel obvious.',
    notes: `...`,
  },
  // 9
  {
    type: 'portal',
    headline: 'the six days i am not there.',
    sub: 'your own dashboard. open it at the gym.',
    url: '/client/sample-cut8',
    tabs: ['start here', 'training', 'food', 'grocery', 'log', 'progress', 'weight', 'check in'],
    notes: `...`,
  },
  // 10
  {
    type: 'value',
    headline: "what's included.",
    items: [
      '12 in-person sessions — one every sunday',
      'your own dashboard, built from your intake',
      'a 12-week program in three phases',
      'set-by-set logging so you can see it move',
      'nightly check-ins i actually read',
      'nutrition structure + protein target',
      'grocery list',
      'form video review any time you send one',
      'the program rewritten every week off your logs',
    ],
    footer: 'you are paying to not need me in twelve weeks.',
    notes: `...`,
  },
  // 11
  {
    type: 'fit',
    headline: "you already proved the hard part.",
    sub: 'forty pounds is the part most people never do.',
    body: "you do not have a discipline problem. you have a direction problem — everything you know how to do is subtraction, and what you want now requires building. that is a two-week learning curve, not a character change.",
    notes: `...`,
  },
  // 12
  {
    type: 'bridge',
    headline: 'does that sound like what has actually been happening?',
    notes: `...`,
  },
  // 13
  {
    type: 'investment',
    headline: '$250 a week. 12 weeks.',
    items: [
      'personal training in baltimore runs $75\u2013150 a session on its own',
      '12 sessions at the middle of that = $1,500 \u2014 just the hours',
      'the program, app, check-ins and weekly rewrites = $1,500',
      'together: $3,000. which is $250 a week.',
      'you pay nothing extra for the two being one thing',
    ],
    body: "that is not a bundle discount, it is just what the pieces cost. the difference is that most trainers hand you an hour and a wave goodbye, and most apps hand you a program nobody watches you run. you are getting the hour AND the six days after it \u2014 and in twelve weeks you can program for yourself.",
    notes: `...`,
  },
  // 14
  {
    type: 'close',
    headline: 'twelve weeks to not need a trainer.',
    sub: 'you already did the hard part alone. this part you should not have to.',
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
export default function TayllorePitch() {
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
          vveritas* — tayllore
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <a href="/pitch/tayllore/notes" target="_blank" rel="noreferrer"
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
