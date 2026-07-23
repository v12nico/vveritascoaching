'use client';
import { useState, useEffect } from 'react';

const prospectName = 'Zack';
const GREEN = '#4a8c6a';

const SLIDES = [
  // 1
  {
    type: 'hero',
    headline: 'built for zack.',
    sub: 'a system that still works after a long day.',
    body: 'training. nutrition. accountability. structure. — built around your schedule, not against it.',
    notes: `On screen when the call opens. Let Zack see his name. Say nothing immediately. When he acknowledges it, begin: "Zack, before I show you anything — I actually don't think motivation is your problem. I want to understand what's really going on first. You mentioned you've been working a 9–5 all summer and just don't have anything left after work. I want to hear more about that before I show you anything." Then: "Walk me through a typical day."`,
  },
  // 2
  {
    type: 'fit-frame',
    headline: 'this is an assessment.',
    points: [
      'i am going to ask you questions first.',
      'i want to understand your schedule, your energy, and your life — before i show you anything.',
      'you do most of the talking.',
      'i will reflect it back — then show you the system i would build around it.',
    ],
    notes: `Set the frame. Say: "This isn't a pitch call. I'm going to ask you questions, listen to what you tell me, and then show you what I'd build specifically for your situation." Pause. "You said your motivation has been terrible and you've been lazy after work. I don't actually believe that's the real problem. But let me hear more before I tell you what I think." Ask: "Sound fair?" Wait for agreement before moving forward.`,
  },
  // 3
  {
    type: 'discovery',
    headline: 'tell me about your situation.',
    questions: [
      'what would you want your physique to look like in 6 months?',
      'walk me through a typical workday.',
      'what time do you get home?',
      'what usually happens the moment you walk in the door?',
      'do you cook? or does that feel like another thing to figure out?',
      'have you ever been consistent with training before? what changed?',
      'what\'s actually stopping you from walking into the gym after work?',
      'if this worked — what would your life look like?',
    ],
    notes: `This is the most important section. Let Zack describe his day in his own words. The goal is to hear exactly where the breakdown happens: is it the decision to go, the lack of a plan, the exhaustion, the food, all of it? Take notes on his exact language. Whatever he says here becomes the anchor for every slide going forward. After each answer: "tell me more." or "what makes it hardest in that moment?" Do not rush. Do not fill silences.`,
  },
  // 4
  {
    type: 'reflection',
    headline: "what i'm hearing.",
    left: {
      label: 'current reality',
      items: [
        'working full-time all summer',
        'mentally drained by end of day',
        'wants consistency',
        'wants a better physique',
        'wants direction',
      ],
    },
    right: {
      label: 'current bottleneck',
      items: [
        'too many decisions after work',
        'low energy = no execution',
        'no structure waiting at home',
        'no accountability',
        'relying on motivation that isn\'t there',
      ],
    },
    notes: `Say: "Before I show you anything — let me make sure I actually understood you." Read each item out loud. After the bottleneck column: "Does that sound right?" Wait. If he confirms: "Good. Because that tells me exactly what we need to build." Do not rush past this. This is the moment he feels heard — that moment is more powerful than any slide.`,
  },
  // 5
  {
    type: 'problem',
    headline: 'your brain is making too many decisions.',
    chain: [
      'wake up',
      'work',
      'commute',
      'dinner?',
      'workout?',
      'what workout?',
      'what should i eat?',
      'too tired.',
      'tomorrow.',
    ],
    body: 'every decision costs energy. by the time work is over, most of yours is already gone.',
    notes: `Say: "I don't think you're lazy, Zack." Pause. "I think you've been relying on motivation to replace structure. And motivation requires energy you don't have left at 6pm." Walk down the decision chain slowly. "Every one of these is a micro-decision that drains you. By the time you get to the gym question — your brain has already spent hours making calls at work." Pause. "My job is to remove almost every decision from your evening."`,
  },
  // 6
  {
    type: 'system',
    headline: 'remove the guesswork.',
    items: [
      { icon: '✓', text: 'workout already planned — you just show up' },
      { icon: '✓', text: 'meals already structured — no figuring out dinner' },
      { icon: '✓', text: 'grocery list already built — one shopping run' },
      { icon: '✓', text: 'dashboard tells you today\'s mission — one glance' },
      { icon: '✓', text: 'check-ins keep you accountable — even tired days' },
      { icon: '✓', text: 'direct messaging if you\'re slipping — no gaps' },
    ],
    footer: 'the less you have to think — the easier it becomes to execute.',
    notes: `Say: "Here's what changes when you have a system." Walk through each item. After each one, let it land. Then say: "You don't have to decide what to eat. You don't have to decide what workout to do. You don't have to decide if you feel like going." Pause. "The system decided for you — days ago. All you do is execute." Then: "That's the difference between motivation-based fitness and system-based fitness."`,
  },
  // 7
  {
    type: 'training',
    headline: 'training built around your schedule.',
    pillars: [
      { label: 'three to four sessions per week', sub: 'not six. not every day. realistic.' },
      { label: 'minimal effective volume', sub: 'enough stimulus. nothing wasted.' },
      { label: 'progressive overload', sub: 'the only variable that drives progress long term.' },
      { label: 'no junk volume', sub: 'every set has a purpose.' },
      { label: 'built around your work schedule', sub: 'not a generic template. your week.' },
    ],
    footer: 'maximum progress. minimum unnecessary fatigue.',
    notes: `Say: "The training plan will not ask you to be in the gym every day." Pause. "It will ask you to show up three or four times per week and execute with precision." Then: "Short, focused sessions. Every exercise is there for a reason. No wasted time." Then: "And because I know what your week looks like — the training days will be placed around your schedule, not the other way around."`,
  },
  // 8
  {
    type: 'nutrition',
    headline: 'nutrition that works after a long day.',
    pillars: [
      { label: 'protein first', sub: 'the one rule that matters most.' },
      { label: 'whole foods', sub: 'nothing complicated.' },
      { label: 'repeatable meals', sub: 'same meals most of the week. no decision fatigue.' },
      { label: 'easy grocery list', sub: 'built for you. one run per week.' },
      { label: 'simple structure', sub: 'you don\'t need to track every gram.' },
      { label: 'recovery-focused', sub: 'food that helps you recover — not just aesthetics.' },
    ],
    footer: 'the goal is making nutrition easy after work — not adding another thing to figure out.',
    notes: `Say: "Nutrition is where most people create the most complexity." Pause. "We are not doing that." Walk through each item. Then: "You'll have a grocery list. You'll have a set of repeatable meals. Most nights you'll already know what you're eating before you get home." Pause. "That eliminates one entire category of after-work decision-making."`,
  },
  // 9
  {
    type: 'recovery',
    headline: 'your recovery starts before the gym.',
    items: [
      'sleep — 7–9 hours',
      'stress management',
      'hydration',
      'meal timing',
      'daily movement — a 10-minute walk matters',
      'deload when needed',
    ],
    body: 'your workout is one hour. the other 167 hours determine whether it works.',
    notes: `Say: "This is the part nobody talks about." Pause. "Working a 9–5 is a recovery problem as much as it's a scheduling problem. You're not just physically tired — you're neurologically drained. We have to account for that in your plan." Then: "The workout creates the stimulus. Sleep, food, hydration, and stress determine whether your body responds to it." Then: "So your program will include recovery guidance — not just training and nutrition."`,
  },
  // 10
  {
    type: 'portal',
    headline: 'let me show you the system.',
    sub: 'opening your dashboard now.',
    url: '/portal/zack-demo',
    tabs: ['today', 'fitness', 'nutrition', 'progress', 'check-in', 'messages'],
    notes: `Open /portal/zack-demo. Walk through each tab deliberately. Today: "This is the first thing you see when you open the app. One mission. No decisions." Read each task aloud. Fitness: "The workout is already built. You don't choose what to do — you just execute." Nutrition: "Your protein target is set. Your meals are listed. Your grocery list is already there." Progress: "Everything you do updates this." Check-In: "This is how I know how you're doing every single day." Messages: Read the coach message slowly. Then: "Have you ever had this level of structure around your fitness?" Stop and let him answer.`,
  },
  // 11
  {
    type: 'value',
    headline: 'everything in one place.',
    items: [
      'personalized training plan',
      'nutrition structure',
      'grocery lists',
      'progress tracking',
      'daily check-ins',
      'weekly reviews',
      'coach messaging',
      'form feedback',
      'program adjustments',
      'personal dashboard',
      'recovery guidance',
    ],
    footer: 'the goal isn\'t making fitness harder. it\'s making consistency easier.',
    notes: `Walk through the list at a measured pace. Then: "Not a generic PDF. Not a random program. One connected system — built around your body, your goal, and your schedule." Pause. "Every item on this list is active every month. It adjusts based on how you respond." Then move to the fit question.`,
  },
  // 12
  {
    type: 'fit',
    headline: 'you don\'t need more motivation.',
    sub: 'you need a system that still works after a long day.',
    body: 'based on what you\'ve told me — i think you\'re a strong fit for this. not because your situation is perfect. because you already know what\'s missing. you just haven\'t had anything fill that gap yet.',
    notes: `Say: "Based on everything you told me — I think you're a strong fit." Pause. "Not because you've been consistent. You haven't been. But because you understand your own problem clearly." Pause. "You said you get home and have nothing left. That's an energy and structure problem — not a character problem. You're not lazy. You've been running on empty with no system waiting for you." Then: "The real question is whether you're ready to stop relying on motivation and follow one system instead."`,
  },
  // 13
  {
    type: 'bridge',
    headline: 'does this feel like the structure you\'ve been missing?',
    notes: `Ask this question exactly as written. Then stop talking completely. Do not add to it. Do not soften it. Do not explain it further. Let Zack sit with it. If he says yes — advance to investment. If he hesitates — ask "what's making you hesitate?" Let him name it. Address only what he raises.`,
  },
  // 14
  {
    type: 'investment',
    headline: '$997 / 8 weeks.',
    items: [
      'personalized training + nutrition',
      'client dashboard — always updated',
      'daily accountability check-ins',
      'weekly reviews + adjustments',
      'direct coach messaging',
      'grocery lists + meal structure',
      'form feedback',
      'recovery guidance',
    ],
    body: 'this isn\'t paying for information. it\'s paying for a system that removes the friction between getting off work and actually following through.',
    notes: `Say: "Based on what you told me — I don't think you need more fitness information." Pause. "You need one clear system that removes almost every decision between getting off work and actually showing up." Pause. "The investment is $997 — that covers the full 8 weeks. One payment. No recurring charges." Pause. Let it land for at least three seconds. "That includes everything on that list — the dashboard, training, nutrition, check-ins, messaging, adjustments. All of it." Then: "Does that level of support match what you described needing?" Stop talking. (If budget is a concern: "There's also a hands-off version at $497 — same system, less direct coaching. But based on what you described, I'd recommend the full version.")`,
  },
  // 15
  {
    type: 'close',
    headline: 'stop depending on motivation.',
    sub: 'build a system that works even on the days you don\'t feel like it.',
    notes: `Deliver this with complete calm. Then ask: "What questions do you have before we move forward?" Go completely silent. Whatever he says next is your close. If ready: "Good. Let me pull up your enrollment page." Open /enroll/zack. Confirm start date. Walk through what onboarding looks like. If he hesitates: "What's making you hesitate?" Let him name it. Do not invent objections.`,
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
export default function ZackPitch() {
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
