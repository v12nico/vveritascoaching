'use client';
import { useState, useEffect } from 'react';

// ── EDITABLE BEFORE CALL ─────────────────────────────────────────────────────
const prospectName = 'Ejbert';

// Set prices before the call (numbers only — no $ sign)
const PRICE_4W  = null;   // 4-week total
const PRICE_8W  = null;   // 8-week total ← recommended
const PRICE_12W = null;   // 12-week total

// ── HELPERS ───────────────────────────────────────────────────────────────────
const fmt  = n => n ? `$${Number(n).toLocaleString()}` : '[ set before call ]';
const div2 = n => n ? `$${(n / 2).toLocaleString()}` : '[ ÷ 2 ]';
const div4 = n => n ? `$${(n / 4).toLocaleString()}` : '[ ÷ 4 ]';

const GREEN = '#4a8c6a';
const AMBER = '#8c7a3a';

// ── SLIDES ────────────────────────────────────────────────────────────────────
const SLIDES = [
  {
    type: 'hero',
    label: 'vveritas* coaching',
    headline: 'your rebuild\nstarts here.',
    body: 'eight weeks. one clear system. no gambling on your health.',
    sub: `built around your current body, your training history, and the strength you want to get back.`,
    notes: `This is on screen when the call starts. Let ${prospectName} see his name and the headline. Say nothing until he reacts. Let the moment land.`,
  },
  {
    type: 'fit-frame',
    notes: `Say: "Before I walk you through what I built, I want to set the expectation for this call. I'm not going to talk at you for 30 minutes. I built something based on what you told me — but before I show you any of it, I need to understand what's actually happening in your life right now." Pause. "I'm going to ask questions, listen, and then tell you honestly whether I believe this structure fits you. I'm not here to diagnose you. I'm not here to promise a transformation. I'm here to figure out whether we can rebuild you properly." Then ask: "Fair?" Wait for him to agree before moving forward.`,
  },
  {
    type: 'fit-standard',
    notes: `Let him read the screen. Don't rush. Then say: "Perfection isn't required. Participation is. A missed workout doesn't disqualify you. Disappearing, refusing to communicate, changing the plan every week — those are what make coaching fail." Then ask the discovery questions from your phone. Listen for patterns, not promises. Ask for specifics. Do not reward answers that just sound motivated.`,
  },
  {
    type: 'fit-commitment',
    notes: `Say: "Before I show you what I've built, I want to be clear about what this looks like from both sides." Read the left column slowly. "And here's what I'd need from you." Read the right. Then: "I don't expect perfection. I expect honesty and effort. If you give me those, I can coach you." Ask: "Does that feel like something you can genuinely commit to?" Wait. Don't fill the silence.`,
  },
  {
    type: 'statement',
    headline: "most people don't fail because they don't try.",
    body: "they fail because nothing is organized, nothing is tracked, and nobody is holding them accountable.",
    notes: `Pause here. Let that land. He's tried before — and stopped. He knows this feeling. You're naming it without making him feel judged. Don't add anything. Just let him sit with it.`,
  },
  {
    type: 'statement',
    label: 'the reframe',
    headline: 'this is not a workout plan.',
    body: 'this is a structured rebuild — designed around your specific situation. your history, your schedule, and the strength you want to get back.',
    notes: `The shift from "workout plan" to "structured rebuild" is the key reframe. You're not selling sessions. You're selling a system that rebuilds him completely — not just in the gym. His problem isn't that he doesn't know what exercises to do. His problem is that nothing is organized.`,
  },
  {
    type: 'goals',
    label: 'your goals',
    headline: 'what you told me.',
    items: [
      'regain the strength you had at 18.',
      'rebuild muscle and physical confidence.',
      'stop comparing yourself to everyone else.',
      'build a real structure — not another failed attempt.',
      'feel like yourself again.',
    ],
    notes: `Read these back to him slowly. Every person wants to feel heard. Seeing his own words on the screen is what makes this personal. Let him confirm each one. Let him say "yes, that's me." Don't rush past this slide.`,
  },
  {
    type: 'reality-check',
    label: 'what is actually happening',
    headline: 'what i hear.',
    items: [
      'you have been away from consistent training for approximately three years.',
      'your current strength is not proof that you are permanently weak — it is a detrained baseline.',
      'you are comparing your current, detrained body to other people\'s current peak performance.',
      'you are looking for a fast external solution because you are frustrated.',
      'you built real strength before — which means we already have evidence you can progress.',
      'your immediate need is structure, consistency, recovery, and measurable progression.',
      'medical concerns require medical evaluation — not assumptions from appearance or social media.',
    ],
    script: [
      `"What I'm hearing is not that you have zero potential."`,
      `"What I'm hearing is that you've been out of rhythm for three years — and you're judging yourself like you should still perform at your old level."`,
      `"You don't need to prove yourself against anyone online. Your job is to beat the version of you from last week."`,
    ],
    notes: `Read the observations one by one. When you get to the medical line, be direct but calm: "You cannot diagnose testosterone levels from how you look or how much you can lift. If you have real symptoms that concern you, that requires lab work and a qualified clinician — not assumptions and a supplement stack." Then read the coach script slowly. Let it land before you move on.`,
  },
  {
    type: 'financial-reframe',
    label: 'the real investment',
    headline: 'invest in evidence\nbefore speculation.',
    lines: [
      'you told me you were considering putting money into a speculative coin — hoping it would multiply enough to pay for TRT.',
      'that is a gamble stacked on top of a decision you have not medically verified.',
      'before you spend money trying to force an outcome, invest in the behaviors you haven\'t consistently applied yet.',
      'structured training. real nutrition. sleep. accountability. time.',
      'if after rebuilding your habits you still have symptoms that concern you — then speak with a qualified clinician and get evaluated properly.',
    ],
    highlight: 'you cannot fix a consistency problem with an injection.',
    notes: `Don't shame him for thinking about the coin or TRT. Reframe it calmly. Say: "That's a gamble stacked on top of another decision you haven't verified. Before you spend money trying to force an outcome — let's invest in the behaviors we know you haven't consistently applied yet. If after eight weeks of real training and real nutrition you still feel off — get evaluated. But right now, we don't have enough evidence to know what the problem actually is."`,
  },
  {
    type: 'statement',
    label: 'the system',
    headline: 'everything lives in one place.',
    body: 'your workouts. your nutrition. your daily mission. your check-ins. your progress. all organized. all connected. all built for you.',
    notes: `Don't open the portal yet. Say: "Before I show you this, let me explain why remote coaching actually works for your situation." Then advance to the next slide.`,
  },
  {
    type: 'statement',
    label: 'why remote works',
    headline: "your results don't come from the hour you train.",
    body: "they come from the other 167 hours of the week.\nso i built a system that coaches you there too.",
    notes: `Say: "You might be thinking — can remote coaching actually hold me accountable? That's a fair question." Pause. "But think about what actually determines your results. It's not the workout itself. It's what you eat at 9pm. Whether you sleep 6 hours or 8. The check-in you fill out when you feel like quitting." Pause. "That's where I coach you. None of that requires me to be physically in the room with you." Now open the portal.`,
  },
  {
    type: 'demo',
    label: '01 — daily mission',
    headline: "today's mission.",
    body: 'every morning you open this and you know exactly what you need to do.',
    sub: 'no guessing. no figuring it out yourself. just execute.',
    notes: `Show the mission tab. Walk through the daily tasks. Point out the streak counter and the self-mastery score. Say: "One of the daily tasks is no comparison-based scrolling in the first hour after waking. That's in here intentionally based on what you told me." Let that land. Ask: "Can you see yourself checking these off?"`,
  },
  {
    type: 'score',
    label: '02 — self-mastery score',
    headline: 'one number.\nfive pillars.',
    pillars: [
      { name: 'strength',   score: 52 },
      { name: 'nutrition',  score: 45 },
      { name: 'discipline', score: 48 },
      { name: 'recovery',   score: 55 },
      { name: 'confidence', score: 38 },
    ],
    body: "this score reflects how you're actually living — not just how hard you trained.",
    notes: `Most coaches only track workouts. You're tracking the whole person. Say: "Your confidence score is the lowest right now — which makes complete sense. We're going to move all five of these numbers over eight weeks. Confidence goes up when the other four go up. It's a byproduct of execution — not motivation." Let him look at the numbers. Don't rush past this.`,
  },
  {
    type: 'demo',
    label: '03 — fitness',
    headline: 'strength rebuild phase.',
    body: 'built for where you are right now — not where you were at 18, and not where you want to be yet.',
    sub: 'technique first. progressive overload. every rep has a reason.',
    notes: `Show the fitness tab. Walk through Workout A. Read one coaching note out loud — "control the lowering phase — 3 seconds down." Say: "The first two weeks aren't about proving anything. They're about relearning how to move, establishing your real baseline, and building from evidence." Pause. "You will not be testing your max bench in week one."`,
  },
  {
    type: 'philosophy',
    label: 'the philosophy',
    headline: 'quality over volume.',
    lines: [
      '1–2 hard working sets per movement.',
      'controlled reps — every single one.',
      'leave stronger than last week — not more destroyed.',
      'no max attempts during the reset phase.',
    ],
    notes: `This is how you differentiate from every trainer who wrecked someone in their first session. Say: "I'm not going to impress you with volume or intensity in week one. I'm going to build you a foundation that actually holds. The numbers go up when the structure is right. They can't go up if you're injured or burned out from week two."`,
  },
  {
    type: 'demo',
    label: '04 — nutrition',
    headline: "today's standards.",
    body: "not counting every calorie. building habits that actually stick.",
    sub: 'protein. whole food meals. water. grocery compliance. food quality.',
    notes: `Show the nutrition tab. Point out the daily checklist: protein target, three planned meals, water, food quality score. Say: "This is performance nutrition — built to support your training and recovery. It's not a TRT protocol. It's real food, consistently applied." Then: "This week we're not chasing perfect. We're building the habit of showing up."`,
  },
  {
    type: 'split-list',
    label: '05 — grocery list',
    headline: 'your list. every week.',
    col1: { label: 'protein', items: ['ground beef (80/20)', 'pasture-raised eggs', 'chicken breast', 'canned wild salmon'] },
    col2: { label: 'everything else', items: ['apples · bananas · blueberries', 'sweet potato · oats · rice', 'butter · coconut oil · tallow', 'whole milk · greek yogurt'] },
    notes: `This one always gets a reaction. People don't expect the grocery list. Say: "You never have to think about what to buy. I've already decided. If you follow this list, you don't need to count a single calorie — just hit your meals."`,
  },
  {
    type: 'demo',
    label: '06 — daily check-in',
    headline: 'daily accountability.',
    body: 'seven questions. two minutes. every day.',
    sub: "i see exactly where you are before you even message me.",
    notes: `Show the check-in tab. Walk through the questions: workout completed? meals followed? protein hit? Did you compare yourself to anyone else today? What did you do better than yesterday? Say: "The comparison question is in here intentionally. Over eight weeks, I want to watch that answer trend — from 'yes I compared' toward 'I didn't even think about it.'"`,
  },
  {
    type: 'messages',
    label: '07 — messages',
    headline: 'this is what real coaching looks like.',
    preview: [
      { from: 'coach', text: `your job this week is not to prove you're still the person who benched 225 at 18. your job is to complete every assigned session, log your numbers honestly, eat according to the structure, and recover. we're building evidence again. stop measuring yourself against people online. start measuring yourself against last week.` },
      { from: 'client', text: 'i got you.' },
      { from: 'coach', text: `good. that's the mindset. now go execute.` },
    ],
    clientName: prospectName.toLowerCase(),
    notes: `Read the first message out loud — slowly. Let him feel what it would be like to receive that. It's not generic. It's written for his exact situation. Most people have never had a coach send a message like that. Let it land. Then say: "That's what this looks like every week."`,
  },
  {
    type: 'fit-who',
    notes: `Say: "I want to be honest about who this program is built for — and who it isn't." Let him read both columns. Then: "This isn't about being perfect. It's about being honest, coachable, and willing to keep showing up — especially when it gets hard." Ask: "Based on what you know about yourself right now — where do you land?" Let him answer. That answer tells you everything.`,
  },
  {
    type: 'packages-intro',
    label: 'my recommendation',
    headline: "let me tell you\nwhat i actually think.",
    body: "based on what you told me, i'm not going to ask you to pick from a menu. i'm going to tell you exactly what i'd recommend — and why.",
    notes: `Say: "I've walked you through the full system. Now I want to be direct with you." Pause. "Based on your situation — three years away from training, clear goals, high frustration, and a pattern of looking for external solutions — I don't think you need the most complicated approach. I think you need the most consistent one." Then advance to the roadmap.`,
  },
  {
    type: 'roadmap',
    label: 'the 8-week timeline',
    headline: '8 weeks.',
    notes: `Walk him through each phase one at a time. Don't rush. After Week 1–2, ask: "Based on where you are right now, does this make sense? No maxing out. No proving anything. Just rebuilding." Let him respond. The goal is for him to see himself inside the process — not just hear about it.`,
  },
  {
    type: 'remote-package',
    label: 'the offer',
    headline: 'vveritas 8-week\nremote rebuild.',
    sub: 'fully online. completely personalized.',
    for: `for men who are ready to rebuild from where they actually are.`,
    notes: `Walk through the feature list first. Let it land. Then show the investment. Say: "You're not buying a list of exercises. You're entering a system that tells you exactly what to do, tracks whether you did it, and adjusts when needed." Then show the pricing options.`,
  },
  {
    type: 'payment',
    label: 'investment',
    headline: 'flexible payment options.',
    notes: `Say: "The total investment stays the same regardless of how you structure it. We can do one payment, two, or four monthly. Your start date is locked in once the first payment is received." Ask: "Which schedule makes the most sense for where you are right now?" Don't suggest one. Let him choose.`,
  },
  {
    type: 'recommendation',
    label: 'why 8 weeks',
    headline: '8-week remote rebuild.\nmy recommendation.',
    reasons: [
      'you need time to rebuild the habit of showing up — not just a short sprint',
      '8 weeks gives enough time to measure real strength progress from your actual baseline',
      'four weeks is a beginning. eight is where real change shows up in the mirror and in the numbers',
      'remote coaching gives you full structure with full scheduling flexibility',
      'the skills you build here are ones you own — you won\'t be dependent on gym access or my presence',
    ],
    notNeeded: [
      'in-person sessions — your situation doesn\'t require physical presence to get results',
      'a 12-week commitment before we establish trust and baseline data',
      'complex macro tracking or calorie counting',
      'external medical interventions before we see what consistent training actually does',
    ],
    notes: `Read the reasons out loud slowly. Then: "And here's what I don't think you need right now." Read those too. Then say: "I'm not recommending remote to give you less. I'm recommending it because disciplined remote execution is the exact skill you need to build — because I can't show up at your gym for you. You have to."`,
  },
  {
    type: 'close',
    label: 'the prescription',
    headline: 'this is what i recommend.',
    notes: `Deliver this calmly. No urgency. No pressure. Just the prescription. Pause between each line. When you ask the final question — stop talking. Whatever he says next is the close. If he says yes: "Tell me what you're committing to." Let him answer in his own words. Then: "Good. Based on that, I'm comfortable moving forward with you."`,
  },
  {
    type: 'objections',
    label: 'common questions',
    headline: "let's address it.",
    notes: `Don't bring this slide up unprompted. If he raises an objection, navigate here and click the matching one. Go through it together. These are not scripts to recite — they're frameworks. Let the conversation lead.`,
  },
  {
    type: 'cta',
    label: 'the decision',
    headline: "your rebuild starts\nwhen you decide.",
    body: 'your goals are clear. the system is built. the only variable is your commitment.',
    sub: 'what questions do you have before we move forward?',
    notes: `Do not pitch. Do not oversell. Ask that one question and go silent. Let him talk. Whatever he says next is your close. If he asks about price — you're ready. If he has objections — go to the objections slide. If he says "let's do it" — great. Never invent urgency.`,
  },
];

// ── ROADMAP COMPONENT ─────────────────────────────────────────────────────────
function RoadmapSlide({ slide }) {
  const [active, setActive] = useState(0);

  const phases = [
    {
      weeks: '1–2', name: 'reset', theme: 'establish the baseline.',
      color: '#3A3A3A',
      focus: [
        'establish three consistent training days per week',
        'relearn movement patterns — no testing max strength',
        'set initial baselines on all key lifts',
        'build a consistent sleep target and wake time',
        'establish simple meal structure — three planned meals',
        'complete daily check-ins without exception',
      ],
      note: '"We are not proving anything in Week One. We are rebuilding your ability to show up."',
    },
    {
      weeks: '3–4', name: 'rebuild', theme: 'controlled progression begins.',
      color: '#5A5A5A',
      focus: [
        'progressive overload begins — add weight when technique is solid',
        'improved movement confidence across all three days',
        'more consistent protein intake tracked in check-ins',
        'better recovery — sleep and rest day quality reviewed',
        'first mid-point performance review with coach',
        'comparison behavior tracked and reviewed weekly',
      ],
      note: '"The target is controlled progress — not chasing your old numbers overnight."',
    },
    {
      weeks: '5–6', name: 'momentum', theme: 'strength starts moving.',
      color: AMBER,
      focus: [
        'increase loads where earned and technique holds',
        'improved execution near technical failure',
        'track key lifts against Week 1 baseline',
        'continue muscle-building nutrition structure',
        'review body weight and measurements',
        'coach adjusts programming based on recovery and progress data',
      ],
      note: '"Your old numbers are not the target. Your Week 1 numbers are. Beat those."',
    },
    {
      weeks: '7–8', name: 'new baseline', theme: 'compare who you were to who you are.',
      color: GREEN,
      focus: [
        'compare Week 1 and Week 8 performance side by side',
        'review photos and measurements against Week 1 baseline',
        'identify exactly how much strength was rebuilt',
        'establish the next phase of training',
        'build a continuation plan you can run independently',
        'final 8-week progress review with full coach summary',
      ],
      note: '"This is the evidence. Not the coin. Not the injection. What you actually built."',
    },
  ];

  const phase = phases[active];

  return (
    <div className="ws-slide">
      <div className="ws-label">{slide.label}</div>
      <h1 className="ws-headline" style={{ marginBottom: '1.5rem' }}>{slide.headline}</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', maxWidth: '640px', marginBottom: '2rem' }}>
        {phases.map((p, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{
              background: 'none',
              border: `1px solid ${i === active ? (p.color || '#EDEDE8') : '#1a1a1a'}`,
              padding: '0.9rem 0.6rem',
              cursor: 'pointer',
              textAlign: 'left',
              borderRadius: '2px',
              transition: 'border-color 0.15s',
            }}
          >
            <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.4rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: i === active ? (p.color || '#EDEDE8') : '#3A3A3A', marginBottom: '0.3rem' }}>
              wks {p.weeks}
            </div>
            <div style={{ fontSize: 'clamp(0.62rem, 0.9vw, 0.72rem)', color: i === active ? '#EDEDE8' : '#5A5A5A' }}>{p.name}</div>
          </button>
        ))}
      </div>

      <div style={{ maxWidth: '520px' }}>
        <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.48rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#3A3A3A', marginBottom: '1rem' }}>
          {phase.theme}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem' }}>
          {phase.focus.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.65rem', alignItems: 'baseline' }}>
              <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.52rem', color: phase.color, flexShrink: 0 }}>—</span>
              <span style={{ fontSize: 'clamp(0.68rem, 1.05vw, 0.82rem)', color: '#EDEDE8', lineHeight: 1.5 }}>{item}</span>
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid #141414', paddingTop: '1rem' }}>
          <p style={{ fontSize: 'clamp(0.72rem, 1.1vw, 0.85rem)', color: '#5A5A5A', fontStyle: 'italic', lineHeight: 1.6 }}>{phase.note}</p>
        </div>
      </div>
    </div>
  );
}

// ── REMOTE PACKAGE COMPONENT ──────────────────────────────────────────────────
function RemotePackageSlide({ slide }) {
  const [sel, setSel] = useState(1);

  const items = [
    'personalized 8-week training plan',
    'three remote workouts per week',
    'personalized nutrition structure',
    'weekly grocery list built around your foods',
    'daily missions and accountability dashboard',
    'five life pillars — scored and tracked',
    'strength and physique progress tracking',
    'daily check-ins',
    'weekly program reviews',
    'unlimited coach messaging',
    'form review via submitted video',
    'program adjustments based on your data',
    'recovery guidance',
    'final 8-week progress review',
    'next-phase roadmap',
  ];

  const durations = [
    { weeks: 4,  price: PRICE_4W,  label: null,          tagline: 'initial foundation' },
    { weeks: 8,  price: PRICE_8W,  label: 'recommended', tagline: 'the rebuild timeline' },
    { weeks: 12, price: PRICE_12W, label: 'best value',  tagline: 'strongest foundation' },
  ];

  return (
    <div className="ws-slide" style={{ gap: '0.5rem' }}>
      <div className="ws-label" style={{ margin: 0 }}>{slide.label}</div>
      <h1 className="ws-headline ws-headline-sm" style={{ whiteSpace: 'pre-line', marginBottom: '0.2rem' }}>{slide.headline}</h1>
      <p style={{ fontSize: 'clamp(0.66rem, 0.95vw, 0.8rem)', color: '#5A5A5A', marginBottom: '0.2rem' }}>{slide.sub}</p>
      <p style={{ fontSize: 'clamp(0.62rem, 0.85vw, 0.72rem)', color: '#3A3A3A', fontStyle: 'italic', marginBottom: '1rem' }}>{slide.for}</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.3rem 3vw', maxWidth: '580px', marginBottom: '1.2rem' }}>
        {items.map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: '0.55rem', alignItems: 'baseline' }}>
            <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.52rem', color: GREEN, flexShrink: 0 }}>✓</span>
            <span style={{ fontSize: 'clamp(0.65rem, 0.95vw, 0.78rem)', color: '#EDEDE8', lineHeight: 1.4 }}>{item}</span>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.7rem', maxWidth: '580px' }}>
        {durations.map((d, i) => (
          <button
            key={i}
            onClick={() => setSel(i)}
            style={{ background: 'none', border: `1px solid ${sel === i ? '#EDEDE8' : '#1a1a1a'}`, padding: '0.9rem 1rem', cursor: 'pointer', textAlign: 'left', borderRadius: '2px' }}
          >
            {d.label && (
              <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.4rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: d.label === 'recommended' ? GREEN : AMBER, marginBottom: '0.35rem' }}>
                {d.label}
              </div>
            )}
            <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.48rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: sel === i ? '#EDEDE8' : '#5A5A5A', marginBottom: '0.4rem' }}>
              {d.weeks} weeks
            </div>
            <div style={{ fontSize: 'clamp(1.1rem, 1.9vw, 1.5rem)', fontWeight: 200, letterSpacing: '-0.03em', color: sel === i ? '#EDEDE8' : '#5A5A5A', marginBottom: '0.3rem' }}>
              {fmt(d.price)}
            </div>
            <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.44rem', letterSpacing: '0.08em', color: sel === i ? '#5A5A5A' : '#3A3A3A' }}>
              {d.tagline}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ── OBJECTIONS COMPONENT ──────────────────────────────────────────────────────
function ObjectionsSlide({ slide }) {
  const [active, setActive] = useState(null);

  const objections = [
    {
      q: '"i need TRT."',
      a: `"You may have a legitimate medical concern — but neither of us can diagnose that through a conversation. Coaching doesn't replace medical evaluation. What we can control right now is rebuilding your training, nutrition, sleep, and consistency — while you speak with a qualified clinician if the symptoms continue. Let's build the evidence first before assuming an external fix is the answer."`,
    },
    {
      q: '"i want to try the coin first."',
      a: `"That's your decision. But I wouldn't build your health plan around an unguaranteed return. The coaching investment purchases an actual service — structure, tracking, and eight weeks of direct support. A speculative asset doesn't guarantee the money or the outcome you're hoping for. These are two unrelated bets."`,
    },
    {
      q: `"i'm too weak right now."`,
      a: `"Current weakness is the starting measurement — not your identity. The plan begins at your actual level and progresses from there. You're not being judged against where you were at 18. You're building from where you are today. That's the only comparison that matters right now."`,
    },
    {
      q: '"other people are past me."',
      a: `"They're not participating in your program. We measure your execution, your strength trend, and your consistency — not anyone else's. Their numbers don't determine your next move. Your current standard does."`,
    },
    {
      q: `"i can't afford it right now."`,
      a: `"I understand. Don't put yourself in an unsafe financial position. We can review the payment schedules, consider a shorter commitment, or decide that now isn't the right timing. I'd rather you come back when you're ready than start a program you can't fully commit to financially."`,
    },
    {
      q: '"will remote actually hold me accountable?"',
      a: `"Accountability doesn't require physical presence. It requires a system you actually use and a coach who follows up when you don't. The daily check-ins, the messaging, the weekly reviews — that's how I stay ahead of problems before you even know to bring them up. The question isn't whether remote coaching works. It's whether you'll use the system."`,
    },
  ];

  return (
    <div className="ws-slide">
      <div className="ws-label">{slide.label}</div>
      <h1 className="ws-headline ws-headline-sm" style={{ marginBottom: '2rem' }}>{slide.headline}</h1>
      <div style={{ display: 'grid', gridTemplateColumns: active !== null ? '1fr 1fr' : '1fr', gap: '0.8rem', maxWidth: '720px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {objections.map((o, i) => (
            <button
              key={i}
              onClick={() => setActive(active === i ? null : i)}
              style={{
                background: 'none',
                border: `1px solid ${active === i ? '#EDEDE8' : '#1a1a1a'}`,
                padding: '0.9rem 1rem',
                cursor: 'pointer',
                textAlign: 'left',
                borderRadius: '2px',
                fontFamily: 'Inter, -apple-system, sans-serif',
                color: active === i ? '#EDEDE8' : '#5A5A5A',
                fontSize: 'clamp(0.7rem, 1.05vw, 0.82rem)',
                fontWeight: 300,
                transition: 'border-color 0.15s, color 0.15s',
              }}
            >
              {o.q}
            </button>
          ))}
        </div>
        {active !== null && (
          <div style={{ padding: '1.2rem', border: '1px solid #1a1a1a', borderRadius: '2px', fontSize: 'clamp(0.72rem, 1.1vw, 0.85rem)', color: '#EDEDE8', lineHeight: 1.8, alignSelf: 'start' }}>
            {objections[active].a}
          </div>
        )}
      </div>
    </div>
  );
}

// ── SLIDE DISPATCHER ──────────────────────────────────────────────────────────
function Slide({ slide }) {
  if (slide.type === 'hero') {
    return (
      <div className="ws-slide ws-hero">
        <div className="ws-hero-inner">
          <div className="ws-mark">{slide.label}</div>
          <h1 className="ws-headline" style={{ textAlign: 'center', whiteSpace: 'pre-line' }}>{slide.headline}</h1>
          <p className="ws-body" style={{ textAlign: 'center', marginTop: '0.5rem' }}>{slide.body}</p>
          {slide.sub && <p style={{ textAlign: 'center', fontSize: 'clamp(0.72rem, 1.05vw, 0.85rem)', color: '#3A3A3A', marginTop: '1rem', maxWidth: '480px' }}>{slide.sub}</p>}
        </div>
      </div>
    );
  }

  if (slide.type === 'statement') {
    return (
      <div className="ws-slide" style={{ justifyContent: 'center', maxWidth: '70vw', margin: '0 auto', padding: '5vw 8vw' }}>
        {slide.label && <div className="ws-label">{slide.label}</div>}
        <h1 className="ws-headline ws-headline-sm" style={{ whiteSpace: 'pre-line' }}>{slide.headline}</h1>
        <p className="ws-body ws-body-spaced">{slide.body}</p>
      </div>
    );
  }

  if (slide.type === 'goals') {
    return (
      <div className="ws-slide">
        <div className="ws-label">{slide.label}</div>
        <h1 className="ws-headline ws-headline-sm" style={{ marginBottom: '2rem' }}>{slide.headline}</h1>
        <ul className="ws-bullets">
          {slide.items.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      </div>
    );
  }

  if (slide.type === 'reality-check') {
    return (
      <div className="ws-slide">
        <div className="ws-label">{slide.label}</div>
        <h1 className="ws-headline ws-headline-sm" style={{ marginBottom: '2rem' }}>{slide.headline}</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', maxWidth: '600px', marginBottom: '2rem' }}>
          {slide.items.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.7rem', alignItems: 'baseline' }}>
              <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.52rem', color: '#3A3A3A', flexShrink: 0 }}>—</span>
              <span style={{ fontSize: 'clamp(0.7rem, 1.05vw, 0.82rem)', color: '#EDEDE8', lineHeight: 1.5 }}>{item}</span>
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid #0f0f0f', paddingTop: '1.5rem', maxWidth: '560px' }}>
          {slide.script.map((line, i) => (
            <p key={i} style={{ fontSize: 'clamp(0.72rem, 1.1vw, 0.85rem)', color: '#5A5A5A', fontStyle: 'italic', lineHeight: 1.8, marginBottom: '0.5rem' }}>{line}</p>
          ))}
        </div>
      </div>
    );
  }

  if (slide.type === 'financial-reframe') {
    return (
      <div className="ws-slide">
        <div className="ws-label">{slide.label}</div>
        <h1 className="ws-headline ws-headline-sm" style={{ whiteSpace: 'pre-line', marginBottom: '2rem' }}>{slide.headline}</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', maxWidth: '560px', marginBottom: '2.5rem' }}>
          {slide.lines.map((line, i) => (
            <p key={i} style={{ fontSize: 'clamp(0.75rem, 1.15vw, 0.9rem)', color: i < 2 ? '#5A5A5A' : '#EDEDE8', lineHeight: 1.75 }}>{line}</p>
          ))}
        </div>
        <div style={{ borderTop: '1px solid #141414', paddingTop: '1.5rem' }}>
          <p style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.15rem)', color: '#EDEDE8', letterSpacing: '-0.01em', fontWeight: 200 }}>{slide.highlight}</p>
        </div>
      </div>
    );
  }

  if (slide.type === 'score') {
    const avg = Math.round(slide.pillars.reduce((s, p) => s + p.score, 0) / slide.pillars.length);
    const avgColor = avg >= 70 ? GREEN : avg >= 50 ? AMBER : '#5C1A1A';
    return (
      <div className="ws-slide">
        <div className="ws-label">{slide.label}</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.5rem', marginBottom: '2rem' }}>
          <h1 className="ws-headline ws-headline-sm" style={{ marginBottom: 0 }}>{slide.headline}</h1>
          <span style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 200, letterSpacing: '-0.04em', color: avgColor, lineHeight: 1 }}>{avg}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', maxWidth: '480px', marginBottom: '2rem' }}>
          {slide.pillars.map((p, i) => {
            const c = p.score >= 70 ? GREEN : p.score >= 50 ? AMBER : '#5C1A1A';
            return (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '7rem 1fr 2.5rem', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: 'clamp(0.48rem, 0.8vw, 0.6rem)', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#3A3A3A' }}>{p.name}</span>
                <div style={{ height: '1px', background: '#1a1a1a' }}>
                  <div style={{ width: `${p.score}%`, height: '100%', background: c }} />
                </div>
                <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: 'clamp(0.6rem, 1vw, 0.75rem)', color: c, textAlign: 'right' }}>{p.score}</span>
              </div>
            );
          })}
        </div>
        <p className="ws-body">{slide.body}</p>
      </div>
    );
  }

  if (slide.type === 'demo') {
    return (
      <div className="ws-slide ws-demo-slide">
        <div style={{ display: 'inline-block' }}>
          <div className="ws-demo-badge">{slide.label}</div>
        </div>
        <h1 className="ws-headline ws-headline-sm" style={{ marginTop: '1rem' }}>{slide.headline}</h1>
        <p className="ws-body ws-body-spaced">{slide.body}</p>
        {slide.sub && <p className="ws-body" style={{ marginTop: '1rem', color: '#3A3A3A', fontStyle: 'italic' }}>{slide.sub}</p>}
        <div className="ws-demo-instruction">→ switch to portal now</div>
      </div>
    );
  }

  if (slide.type === 'philosophy') {
    return (
      <div className="ws-slide">
        <div className="ws-label">{slide.label}</div>
        <h1 className="ws-headline ws-headline-sm" style={{ marginBottom: '2rem' }}>{slide.headline}</h1>
        <div className="ws-steps">
          {slide.lines.map((line, i) => (
            <div key={i} className="ws-step">
              <span className="ws-step-n">0{i + 1}</span>
              <span className="ws-step-text">{line}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (slide.type === 'split-list') {
    return (
      <div className="ws-slide">
        <div className="ws-label">{slide.label}</div>
        <h1 className="ws-headline ws-headline-sm" style={{ marginBottom: '2rem' }}>{slide.headline}</h1>
        <div className="ws-split-lists">
          <div>
            <div className="ws-mini-label">{slide.col1.label}</div>
            <ul className="ws-bullets">
              {slide.col1.items.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
          <div>
            <div className="ws-mini-label">{slide.col2.label}</div>
            <ul className="ws-bullets ws-bullets-dim">
              {slide.col2.items.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  if (slide.type === 'messages') {
    return (
      <div className="ws-slide">
        <div className="ws-label">{slide.label}</div>
        <h1 className="ws-headline ws-headline-sm" style={{ marginBottom: '2rem' }}>{slide.headline}</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '560px' }}>
          {slide.preview.map((m, i) => (
            <div key={i} style={{ alignSelf: m.from === 'coach' ? 'flex-start' : 'flex-end', maxWidth: '85%' }}>
              <div style={{
                fontSize: 'clamp(0.78rem, 1.3vw, 1rem)', lineHeight: 1.65, color: '#EDEDE8',
                padding: '0.8rem 1.1rem', border: '1px solid', borderRadius: '2px',
                borderColor: m.from === 'coach' ? '#1a1a1a' : '#2a2a2a',
                background: m.from === 'client' ? '#080808' : 'transparent',
              }}>
                {m.text}
              </div>
              <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.5rem', letterSpacing: '0.1em', color: '#3A3A3A', marginTop: '0.3rem', textAlign: m.from === 'client' ? 'right' : 'left' }}>
                {m.from === 'coach' ? 'nico' : (slide.clientName || 'client')}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (slide.type === 'fit-frame') {
    return (
      <div className="ws-slide" style={{ justifyContent: 'center', maxWidth: '70vw', margin: '0 auto', padding: '5vw 8vw' }}>
        <div className="ws-label">before we begin</div>
        <h1 className="ws-headline" style={{ marginBottom: '2.5rem' }}>this is not<br />a traditional<br />sales call.</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', maxWidth: '480px', marginBottom: '2.5rem' }}>
          <p style={{ fontSize: 'clamp(0.8rem, 1.3vw, 1rem)', color: '#5A5A5A', lineHeight: 1.75 }}>you are deciding whether vveritas fits you.</p>
          <p style={{ fontSize: 'clamp(0.8rem, 1.3vw, 1rem)', color: '#5A5A5A', lineHeight: 1.75 }}>i am deciding whether i believe the system fits your goals, your schedule, and your willingness to execute.</p>
        </div>
        <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.52rem', letterSpacing: '0.25em', color: '#3A3A3A' }}>the goal is the right fit — not the largest package.</div>
      </div>
    );
  }

  if (slide.type === 'fit-standard') {
    return (
      <div className="ws-slide">
        <div className="ws-label">what the program requires</div>
        <h1 className="ws-headline" style={{ marginBottom: '2.5rem' }}>the standard.</h1>
        <div className="ws-steps" style={{ maxWidth: '520px', marginBottom: '2.5rem' }}>
          {['honest communication', 'consistent execution', 'independent follow-through', 'openness to feedback', 'responsibility for your own results'].map((item, i) => (
            <div key={i} className="ws-step">
              <span className="ws-step-n">0{i + 1}</span>
              <span className="ws-step-text">{item}</span>
            </div>
          ))}
        </div>
        <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.52rem', letterSpacing: '0.25em', color: '#3A3A3A' }}>perfection is not required. participation is.</div>
      </div>
    );
  }

  if (slide.type === 'fit-commitment') {
    return (
      <div className="ws-slide">
        <div className="ws-label">mutual commitment</div>
        <h1 className="ws-headline ws-headline-sm" style={{ marginBottom: '2rem' }}>what this<br />relationship looks like.</h1>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4vw', maxWidth: '680px', marginBottom: '2rem' }}>
          <div>
            <div className="ws-mini-label" style={{ marginBottom: '1rem', color: GREEN }}>what you get from me</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {['personalized structure', 'honest feedback', 'remote coaching — the full vveritas* system', 'nutrition guidance', 'weekly reviews and adjustments', 'accountability every single day'].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.65rem', alignItems: 'baseline' }}>
                  <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.52rem', color: GREEN, flexShrink: 0 }}>✓</span>
                  <span style={{ fontSize: 'clamp(0.7rem, 1.1vw, 0.84rem)', color: '#EDEDE8', lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="ws-mini-label" style={{ marginBottom: '1rem', color: '#3A3A3A' }}>what i need from you</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {['complete the assigned workouts', 'follow the meal structure', 'do the daily check-in', 'communicate when you struggle', 'don\'t disappear when it gets hard'].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.65rem', alignItems: 'baseline' }}>
                  <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.52rem', color: '#2a2a2a', flexShrink: 0 }}>—</span>
                  <span style={{ fontSize: 'clamp(0.7rem, 1.1vw, 0.84rem)', color: '#5A5A5A', lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid #141414', paddingTop: '1.5rem' }}>
          <p style={{ fontSize: 'clamp(0.72rem, 1.1vw, 0.88rem)', color: '#5A5A5A', marginBottom: '0.8rem' }}>if we both uphold our side, the process works.</p>
          <p style={{ fontSize: 'clamp(0.82rem, 1.3vw, 1rem)', color: '#EDEDE8', fontStyle: 'italic' }}>are you ready to be coached at this level?</p>
        </div>
      </div>
    );
  }

  if (slide.type === 'fit-who') {
    return (
      <div className="ws-slide">
        <div className="ws-label">who this is built for</div>
        <h1 className="ws-headline ws-headline-sm" style={{ marginBottom: '2rem' }}>the right fit.</h1>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4vw', maxWidth: '720px' }}>
          <div>
            <div className="ws-mini-label" style={{ marginBottom: '1rem', color: GREEN }}>vveritas is built for</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {['men ready to execute within a clear structure', 'men who value honest coaching over empty motivation', 'men willing to communicate when they struggle', 'men who want to become capable — not dependent on a coach forever', 'men prepared to build consistency — not chase quick fixes', 'men who can train independently with a real plan behind them'].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.65rem', alignItems: 'baseline' }}>
                  <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.52rem', color: GREEN, flexShrink: 0 }}>✓</span>
                  <span style={{ fontSize: 'clamp(0.65rem, 1vw, 0.78rem)', color: '#EDEDE8', lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="ws-mini-label" style={{ marginBottom: '1rem', color: '#3A3A3A' }}>it is not built for</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {['someone who wants motivation without execution', 'someone who disappears when it gets hard', 'someone who expects the plan to work without putting in the effort', 'someone who changes direction every few days', 'someone who wants shortcuts before trying the basics', 'someone not currently able to make room for the process'].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.65rem', alignItems: 'baseline' }}>
                  <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.52rem', color: '#2a2a2a', flexShrink: 0 }}>—</span>
                  <span style={{ fontSize: 'clamp(0.65rem, 1vw, 0.78rem)', color: '#5A5A5A', lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (slide.type === 'packages-intro') {
    return (
      <div className="ws-slide" style={{ justifyContent: 'center', maxWidth: '70vw', margin: '0 auto', padding: '5vw 8vw' }}>
        <div className="ws-label">{slide.label}</div>
        <h1 className="ws-headline" style={{ whiteSpace: 'pre-line', marginBottom: '1.5rem' }}>{slide.headline}</h1>
        <p className="ws-body ws-body-spaced">{slide.body}</p>
      </div>
    );
  }

  if (slide.type === 'roadmap') return <RoadmapSlide slide={slide} />;

  if (slide.type === 'remote-package') return <RemotePackageSlide slide={slide} />;

  if (slide.type === 'payment') {
    const durations = [
      { weeks: 4,  price: PRICE_4W,  label: '4-week foundation' },
      { weeks: 8,  price: PRICE_8W,  label: '8-week rebuild' },
      { weeks: 12, price: PRICE_12W, label: '12-week reconstruction' },
    ];
    return (
      <div className="ws-slide">
        <div className="ws-label">{slide.label}</div>
        <h1 className="ws-headline ws-headline-sm" style={{ marginBottom: '2rem' }}>{slide.headline}</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', maxWidth: '640px', marginBottom: '2rem' }}>
          {durations.map((d, i) => (
            <div key={i} style={{ borderTop: `1px solid ${i === 1 ? '#EDEDE8' : '#1a1a1a'}`, paddingTop: '1rem' }}>
              <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.44rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: i === 1 ? '#EDEDE8' : '#3A3A3A', marginBottom: '0.6rem' }}>
                {d.label}{i === 1 ? ' ← recommended' : ''}
              </div>
              <div style={{ fontSize: 'clamp(1.2rem, 2vw, 1.6rem)', fontWeight: 200, letterSpacing: '-0.03em', color: i === 1 ? '#EDEDE8' : '#5A5A5A', marginBottom: '0.7rem' }}>
                {fmt(d.price)}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.44rem', color: '#5A5A5A' }}>in full: {fmt(d.price)}</div>
                <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.44rem', color: '#3A3A3A' }}>× 2: {div2(d.price)} each</div>
                <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.44rem', color: '#3A3A3A' }}>× 4: {div4(d.price)} / mo</div>
              </div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 'clamp(0.62rem, 0.85vw, 0.72rem)', color: '#3A3A3A', fontStyle: 'italic', maxWidth: '480px' }}>
          the total stays the same regardless of payment schedule. start date is confirmed once the first payment is received.
        </p>
      </div>
    );
  }

  if (slide.type === 'recommendation') {
    return (
      <div className="ws-slide">
        <div className="ws-label">{slide.label}</div>
        <h1 className="ws-headline ws-headline-sm" style={{ whiteSpace: 'pre-line', marginBottom: '2rem' }}>{slide.headline}</h1>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 4vw', maxWidth: '700px' }}>
          <div>
            <div className="ws-mini-label" style={{ marginBottom: '1rem', color: GREEN }}>why i'm recommending this</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {slide.reasons.map((r, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.7rem', alignItems: 'baseline' }}>
                  <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.55rem', color: GREEN, flexShrink: 0 }}>✓</span>
                  <span style={{ fontSize: 'clamp(0.72rem, 1.1vw, 0.85rem)', color: '#EDEDE8', lineHeight: 1.5 }}>{r}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="ws-mini-label" style={{ marginBottom: '1rem', color: '#3A3A3A' }}>what i don't think you need right now</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {slide.notNeeded.map((r, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.7rem', alignItems: 'baseline' }}>
                  <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.55rem', color: '#2a2a2a', flexShrink: 0 }}>—</span>
                  <span style={{ fontSize: 'clamp(0.72rem, 1.1vw, 0.85rem)', color: '#5A5A5A', lineHeight: 1.5 }}>{r}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (slide.type === 'close') {
    const lines = [
      `"based on what you told me, i recommend the 8-week remote rebuild."`,
      `"you don't need to gamble on a coin, assume TRT is the answer, or compare yourself to people online."`,
      `"you need eight weeks of training, eating, recovering, and communicating according to a real structure."`,
      `"i can build that structure and coach you through it. your responsibility is to execute."`,
    ];
    const followUp = [
      `[pause — wait for his answer without filling the silence]`,
      `if yes → "tell me what you're committing to."`,
      `[let him answer in his own words — do not interrupt]`,
      `then → "good. based on that, i'm comfortable moving forward with you."`,
    ];
    return (
      <div className="ws-slide">
        <div className="ws-label">{slide.label}</div>
        <h1 className="ws-headline ws-headline-sm" style={{ marginBottom: '2rem' }}>{slide.headline}</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '560px', marginBottom: '2.5rem' }}>
          {lines.map((line, i) => (
            <p key={i} style={{ fontSize: 'clamp(0.78rem, 1.2vw, 0.95rem)', color: '#EDEDE8', lineHeight: 1.8 }}>{line}</p>
          ))}
        </div>
        <div style={{ borderTop: '1px solid #141414', paddingTop: '1.5rem', maxWidth: '520px' }}>
          <p style={{ fontSize: 'clamp(0.88rem, 1.4vw, 1.1rem)', color: '#EDEDE8', fontStyle: 'italic', marginBottom: '1.8rem', letterSpacing: '-0.01em' }}>
            "are you ready to commit to that process?"
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
            {followUp.map((line, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.65rem', alignItems: 'baseline' }}>
                <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.52rem', color: '#2a2a2a', flexShrink: 0 }}>—</span>
                <span style={{ fontSize: 'clamp(0.65rem, 0.95vw, 0.78rem)', color: line.startsWith('[') ? '#3A3A3A' : '#5A5A5A', lineHeight: 1.5, fontFamily: line.startsWith('[') ? 'ui-monospace, monospace' : 'inherit', letterSpacing: line.startsWith('[') ? '0.04em' : 'inherit' }}>
                  {line}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (slide.type === 'objections') return <ObjectionsSlide slide={slide} />;

  if (slide.type === 'cta') {
    return (
      <div className="ws-slide ws-cta-slide">
        {slide.label && <div className="ws-label">{slide.label}</div>}
        <h1 className="ws-headline" style={{ whiteSpace: 'pre-line' }}>{slide.headline}</h1>
        <p className="ws-body ws-body-spaced">{slide.body}</p>
        <p className="ws-cta-sub">{slide.sub}</p>
        <div className="ws-cta-mark">vveritas* — built for {prospectName}</div>
      </div>
    );
  }

  return null;
}

// ── SAFETY SCREEN ─────────────────────────────────────────────────────────────
function SafetyScreen({ onSafe, onStop }) {
  return (
    <div style={{ background: '#000', minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, -apple-system, sans-serif', fontWeight: 300, color: '#EDEDE8' }}>
      <div style={{ maxWidth: '560px', padding: '4rem 2rem', width: '100%' }}>
        <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.5rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#8c3a3a', marginBottom: '2rem' }}>
          mandatory — before the call begins
        </div>
        <h1 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#EDEDE8', lineHeight: 1.15, marginBottom: '2rem' }}>
          check in before<br />you sell anything.
        </h1>
        <div style={{ borderLeft: '1px solid #5C1A1A', paddingLeft: '1.5rem', marginBottom: '3rem' }}>
          <p style={{ fontSize: 'clamp(0.78rem, 1.2vw, 0.9rem)', color: '#5A5A5A', lineHeight: 1.75, marginBottom: '1rem' }}>
            ask him directly, before you open the presentation:
          </p>
          <p style={{ fontSize: 'clamp(0.82rem, 1.25vw, 0.95rem)', color: '#EDEDE8', lineHeight: 1.8, fontStyle: 'italic' }}>
            "before we talk coaching, i want to check on something you said. when you said you were suicidal — are you currently thinking about hurting yourself, or were you describing how low and frustrated you've been feeling?"
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem' }}>
          <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.46rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#3A3A3A' }}>
            if he confirms he is safe and means he has been feeling very low
          </div>
          <button
            onClick={onSafe}
            style={{
              background: 'none', border: '1px solid #EDEDE8', padding: '1.1rem 1.5rem',
              cursor: 'pointer', color: '#EDEDE8', fontFamily: 'Inter, -apple-system, sans-serif',
              fontWeight: 300, fontSize: 'clamp(0.82rem, 1.2vw, 0.95rem)', textAlign: 'left', borderRadius: '2px',
            }}
          >
            he confirmed he is safe — begin the consultation →
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.46rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8c3a3a' }}>
            if he may hurt himself, has a plan, or cannot guarantee his safety
          </div>
          <button
            onClick={onStop}
            style={{
              background: 'none', border: '1px solid #5C1A1A', padding: '1.1rem 1.5rem',
              cursor: 'pointer', color: '#8c3a3a', fontFamily: 'Inter, -apple-system, sans-serif',
              fontWeight: 300, fontSize: 'clamp(0.82rem, 1.2vw, 0.95rem)', textAlign: 'left', borderRadius: '2px',
            }}
          >
            stop the sales call — he needs support right now
          </button>
        </div>
      </div>
    </div>
  );
}

// ── STOP SCREEN ───────────────────────────────────────────────────────────────
function StopScreen({ onReset }) {
  return (
    <div style={{ background: '#000', minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, -apple-system, sans-serif', fontWeight: 300, color: '#EDEDE8' }}>
      <div style={{ maxWidth: '540px', padding: '4rem 2rem', width: '100%' }}>
        <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.5rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#8c3a3a', marginBottom: '2rem' }}>
          stop — do not pitch
        </div>
        <h1 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#EDEDE8', lineHeight: 1.15, marginBottom: '2rem' }}>
          stop the sales<br />conversation.
        </h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '3rem' }}>
          {[
            { text: 'coaching is not the immediate solution right now.', color: '#EDEDE8' },
            { text: 'tell him directly and calmly that you hear him, and that his safety matters more than this conversation.', color: '#5A5A5A' },
            { text: 'encourage him to reach out to someone physically near him right now — a family member, a friend, anyone who can be with him.', color: '#5A5A5A' },
            { text: null, crisis: true },
            { text: 'let him know the coaching conversation can happen when he is in a safe place. the door stays open. that is all.', color: '#5A5A5A' },
          ].map((item, i) => item.crisis ? (
            <div key={i} style={{ padding: '1rem 1.2rem', border: '1px solid #1a1a1a', borderRadius: '2px' }}>
              <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.46rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#3A3A3A', marginBottom: '0.5rem' }}>988 suicide and crisis lifeline</div>
              <div style={{ fontSize: 'clamp(0.82rem, 1.3vw, 1rem)', color: '#EDEDE8' }}>call or text <strong>988</strong></div>
            </div>
          ) : (
            <p key={i} style={{ fontSize: 'clamp(0.78rem, 1.2vw, 0.92rem)', color: item.color, lineHeight: 1.75 }}>{item.text}</p>
          ))}
        </div>
        <div style={{ borderTop: '1px solid #141414', paddingTop: '1.5rem' }}>
          <button
            onClick={onReset}
            style={{ background: 'none', border: '1px solid #1a1a1a', padding: '0.8rem 1.2rem', cursor: 'pointer', color: '#3A3A3A', fontFamily: 'Inter, -apple-system, sans-serif', fontWeight: 300, fontSize: '0.75rem', borderRadius: '2px' }}
          >
            ← back to safety check
          </button>
        </div>
      </div>
    </div>
  );
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function EjbertPitch() {
  const [safety, setSafety]     = useState(null); // null | 'safe' | 'stop'
  const [entered, setEntered]   = useState(false);
  const [idx, setIdx]           = useState(0);
  const [showNotes, setShowNotes] = useState(false);

  useEffect(() => {
    if (!entered) return;
    function onKey(e) {
      if (e.key === 'ArrowRight' || e.key === ' ') setIdx(i => Math.min(i + 1, SLIDES.length - 1));
      if (e.key === 'ArrowLeft') setIdx(i => Math.max(i - 1, 0));
      if (e.key === 'n' || e.key === 'N') setShowNotes(s => !s);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [entered]);

  if (safety === null) return <SafetyScreen onSafe={() => setSafety('safe')} onStop={() => setSafety('stop')} />;
  if (safety === 'stop') return <StopScreen onReset={() => setSafety(null)} />;

  if (!entered) {
    return (
      <div className="ws-enter">
        <div className="ws-enter-inner">
          <div className="ws-enter-title">{`vveritas*\nbuilt for ${prospectName}.`}</div>
          <div className="ws-enter-sub">remote coaching — 8-week rebuild</div>
          <button className="ws-enter-btn" onClick={() => setEntered(true)}>begin →</button>
        </div>
      </div>
    );
  }

  const total = SLIDES.length;
  const slide = SLIDES[idx];
  const pct   = ((idx + 1) / total) * 100;

  return (
    <div className="ws-root">
      <div className="ws-progress">
        <div className="ws-progress-fill" style={{ width: `${pct}%` }} />
      </div>

      <div className="ws-stage" key={idx}>
        <Slide slide={slide} />
      </div>

      {showNotes && slide.notes && (
        <div className="ws-notes">
          <div className="ws-notes-label">speaker notes</div>
          <div className="ws-notes-text">{slide.notes}</div>
        </div>
      )}

      <nav className="ws-nav">
        <button className="ws-nav-btn" onClick={() => setIdx(i => Math.max(i - 1, 0))} disabled={idx === 0}>←</button>
        <div className="ws-nav-center">
          <span className="ws-counter">{idx + 1} / {total}</span>
          <button className="ws-notes-toggle" onClick={() => setShowNotes(s => !s)}>
            {showNotes ? 'hide notes' : 'notes'}
          </button>
        </div>
        <button className="ws-nav-btn" onClick={() => setIdx(i => Math.min(i + 1, total - 1))} disabled={idx === total - 1}>→</button>
      </nav>
    </div>
  );
}
