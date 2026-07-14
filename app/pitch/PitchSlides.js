'use client';
import { useState, useEffect } from 'react';

const STRIPE_LINKS = {
  elite:  { 4: process.env.NEXT_PUBLIC_STRIPE_ELITE_4W,  8: process.env.NEXT_PUBLIC_STRIPE_ELITE_8W,  12: process.env.NEXT_PUBLIC_STRIPE_ELITE_12W  },
  hybrid: { 4: process.env.NEXT_PUBLIC_STRIPE_HYBRID_4W, 8: process.env.NEXT_PUBLIC_STRIPE_HYBRID_8W, 12: process.env.NEXT_PUBLIC_STRIPE_HYBRID_12W },
  remote: { 4: process.env.NEXT_PUBLIC_STRIPE_REMOTE_4W, 8: process.env.NEXT_PUBLIC_STRIPE_REMOTE_8W, 12: process.env.NEXT_PUBLIC_STRIPE_REMOTE_12W },
};

const SLIDES = [
  {
    type: 'hero',
    label: 'vveritas* coaching',
    headline: 'built for\nRon Blake.',
    body: 'this is what your life inside vveritas looks like.',
    notes: "Open with this on screen before the call starts. Let Ron see his name. That alone tells him this isn't a generic pitch — it was made for him. Don't say anything until he reacts.",
  },
  {
    type: 'statement',
    headline: "most people don't fail because they don't try.",
    body: "they fail because nothing is organized, nothing is tracked, and there's nobody holding them accountable.",
    notes: "Pause here. Let that land. This is Ron's reality — he's tried before. He knows this feeling. You're naming it without making him feel judged.",
  },
  {
    type: 'statement',
    headline: 'this is not a workout plan.',
    body: 'this is an operating system built around your specific goals — built around you.',
    notes: 'The shift from "workout plan" to "operating system" is the key reframe. You\'re not selling sessions. You\'re selling a system that runs his health.',
  },
  {
    type: 'goals',
    label: 'your goals',
    headline: 'what you told me.',
    items: [
      'build muscle.',
      'lose the stomach.',
      'improve your overall health.',
      'become more consistent.',
      'have real accountability.',
    ],
    notes: "Read these back to him slowly. Every person wants to feel heard. This moment — seeing his own words on the screen — is what makes this feel personal. Let him say \"yes, that's me.\"",
  },
  {
    type: 'statement',
    label: 'the system',
    headline: 'everything lives in one place.',
    body: 'your workouts. your nutrition. your daily mission. your check-ins. your progress. all organized. all connected. all built for you.',
    notes: "Don't open the portal yet. Say: \"before I show you this, I want to address something.\" Then advance to the next slide.",
  },
  {
    type: 'statement',
    label: 'the reason',
    headline: 'the hour we spend together\nisn\'t what determines your results.',
    body: 'your results come from the other 167 hours of the week.\nso i built a system that coaches you there too.',
    notes: "Say this slowly. Full delivery: \"You reached out because you wanted a personal trainer. And looking at what I'm about to show you, you might be thinking — man, this is way more than I asked for. And honestly? You're right.\" Pause. \"I've worked as a personal trainer. And what I realized is that the hour we spend together each week isn't what determines your results.\" Pause. \"Your results come from the other 167 hours of the week.\" Pause. \"So I built a system that coaches you there too. Not because I'm trying to sell you more. Because I genuinely believe it gives you a better chance of reaching the goals you told me about.\" Now open the portal.",
  },
  {
    type: 'demo',
    label: '01 — dashboard',
    headline: "today's mission.",
    body: 'every morning you open this and you know exactly what you need to do.',
    sub: 'no guessing. no figuring it out yourself. just execute.',
    notes: 'Show the mission tab. Click through the tasks. Point out the streak counter and the self-mastery score. Ask him: "can you see yourself checking these off?" Let him interact mentally with it.',
  },
  {
    type: 'score',
    label: '02 — self-mastery score',
    headline: 'one number.\nfive pillars.',
    pillars: [
      { name: 'fitness', score: 71 },
      { name: 'nutrition', score: 68 },
      { name: 'discipline', score: 60 },
      { name: 'recovery', score: 58 },
      { name: 'consistency', score: 64 },
    ],
    body: "this score reflects how you're actually living — not just how hard you trained.",
    notes: 'This is powerful. Most trainers only track workouts. You\'re tracking the whole person. Say: "your score right now is 62. over the next 12 weeks, we\'re going to move this number. every pillar goes up together."',
  },
  {
    type: 'demo',
    label: '03 — fitness',
    headline: 'foundation phase.',
    body: 'built for where you are right now. not where someone else is.',
    sub: 'technique first. progressive overload. every rep has a reason.',
    notes: 'Show the fitness tab. Walk through Workout A. Read one of the exercise coaching notes out loud — "control the lowering phase — 2 seconds down." That detail tells him you\'re paying attention to HOW he trains, not just what he does.',
  },
  {
    type: 'philosophy',
    label: 'the philosophy',
    headline: 'quality over volume.',
    lines: [
      '2 working sets per movement.',
      'control every rep.',
      'leave stronger than last week — not more tired.',
      'technique before weight. always.',
    ],
    notes: "This is where you differentiate yourself from every trainer who just destroyed someone in their first session. You're building a foundation. That's what he needs — and it's what will actually get him results.",
  },
  {
    type: 'demo',
    label: '04 — nutrition',
    headline: "today's standards.",
    body: "not counting every calorie. building habits that actually stick.",
    sub: 'protein. whole food meals. water. fruit. food quality.',
    notes: "Show the nutrition tab. Point out the \"today's standards\" checklist with the progress numbers (130/150g protein, 2/3 meals, 70/90oz water). Say: \"this week we're not chasing perfect numbers. we're building the habit of showing up.\" Read the coach's focus note.",
  },
  {
    type: 'split-list',
    label: '05 — grocery list',
    headline: 'your list. every week.',
    col1: { label: 'protein', items: ['ground beef', 'chicken breast', 'greek yogurt', 'eggs'] },
    col2: { label: 'everything else', items: ['apples · bananas · blueberries', 'rice · potatoes · oats', 'spinach · broccoli · peppers', 'butter · olive oil'] },
    notes: "This one always gets a reaction. People don't expect the grocery list. Say: \"you never have to think about what to buy. it's already done.\" Tap a few items so he sees they can be checked off.",
  },
  {
    type: 'demo',
    label: '06 — progress',
    headline: '221 lbs.\ngoal: 195.',
    body: 'every metric tracked. every week moving in the right direction.',
    sub: 'body fat trending down. strength trending up. 88% workout completion.',
    notes: 'Show the progress tab. Point to the weight goal bar. Show the photo placeholders — say: "week 1 we take your baseline photo. week 12 we look at it side by side. that transformation is yours." Let that visual land.',
  },
  {
    type: 'demo',
    label: '07 — check in',
    headline: 'daily accountability.',
    body: 'six questions. two minutes. every day.',
    sub: "i see exactly how you're doing before you even message me.",
    notes: "Show the check-in tab. Walk through the questions: did you complete your workout? hit your protein? complete your walk? Then the sliders for energy and confidence. Say: \"this is how I stay ahead of problems — I'm not waiting for you to tell me something is off.\"",
  },
  {
    type: 'messages',
    label: '08 — messages',
    headline: 'this is what real coaching looks like.',
    preview: [
      { from: 'coach', text: "morning Ron. big focus today: get your workout done. don't skip breakfast. protein at every meal." },
      { from: 'client', text: 'got it.' },
      { from: 'coach', text: "you're doing exactly what I want to see. keep showing up, follow the plan, and trust the process." },
    ],
    notes: "This is the moment. Read the final message out loud — slowly. Let him feel what it would be like to receive that. Most people have never had a coach who checks in like this. This is unlimited messaging. Real communication.",
  },
  {
    type: 'inperson',
    label: '09 — in-person training',
    headline: 'wednesday. 6:00 pm.\nmerritt clubs.',
    items: [
      'technique coaching — every rep, every session.',
      'real-time form corrections.',
      'progressive overload tracked.',
      'motivation and accountability in person.',
    ],
    between: [
      'workout plan between sessions.',
      'nutrition guidance.',
      'unlimited messaging.',
      'weekly check-ins.',
    ],
    notes: "This is the premium experience. You're not just showing up to count reps — you're building the entire system around him. The in-person sessions are supported by everything else. That's what makes this different.",
  },
  {
    type: 'packages-intro',
    label: 'my recommendation',
    headline: "let me tell you\nwhat i honestly think.",
    body: "based on what you told me, i'm not going to show you a menu and ask you to pick. i'm going to tell you what i'd actually recommend — and what i don't think you need right now.",
    notes: "Say this with conviction. \"Before I show you the options, I want to be straight with you. Based on your goals and where you are right now, I don't automatically think you need the most expensive package. I'd rather recommend the right level of support than put you in something bigger than your situation calls for.\" Then advance to Elite first so he sees the full range — then you'll land on your recommendation.",
  },
  {
    type: 'package',
    tier: '01 — elite transformation',
    headline: 'maximum\nhands-on coaching.',
    subtitle: 'three in-person sessions per week + complete vveritas* coaching',
    for: 'highest level of support. highest accountability. highest access.',
    items: [
      '3 in-person sessions every week',
      'personalized resistance-training program',
      'complete vveritas* dashboard',
      'personalized nutrition framework',
      'grocery lists and meal structure',
      'weekly progress reviews',
      'body measurements + progress tracking',
      'habit and lifestyle accountability',
      'unlimited coach messaging',
      'real-time form correction every session',
      'strength and performance tracking',
      'recovery guidance',
      'priority scheduling and support',
    ],
    durations: [
      { weeks: 4, price: 2400, sessions: 12, savings: null, label: null, tagline: 'build the foundation' },
      { weeks: 8, price: 4600, sessions: 24, savings: 200, label: 'most popular', tagline: 'the flagship timeline' },
      { weeks: 12, price: 6600, sessions: 36, savings: 600, label: 'best value', tagline: 'strongest foundation' },
    ],
    notes: "Don't rush past this slide. Let him see the full scope of what \"elite\" means. Say: \"this is what it looks like when I'm with you three times a week. everything tracked, everything personalized, no guessing.\" Show price after the features land.",
  },
  {
    type: 'package',
    tier: '02 — hybrid coaching',
    headline: 'the ideal\nbalance.',
    subtitle: 'one in-person session per week + complete online coaching',
    for: 'hands-on guidance once a week, with the full system supporting every other day.',
    items: [
      '1 in-person training session per week',
      'personalized workouts for independent training days',
      'complete vveritas* dashboard',
      'personalized nutrition framework',
      'grocery lists and meal structure',
      'weekly accountability call',
      'unlimited coach messaging',
      'form review via submitted video',
      'progress tracking',
      'habit and lifestyle accountability',
      'program adjustments',
      'strength and performance tracking',
      'recovery guidance',
    ],
    durations: [
      { weeks: 4, price: 1200, sessions: 4, savings: null, label: null, tagline: 'build the foundation' },
      { weeks: 8, price: 2300, sessions: 8, savings: 100, label: 'most popular', tagline: 'the flagship timeline' },
      { weeks: 12, price: 3300, sessions: 12, savings: 300, label: 'best value', tagline: 'strongest foundation' },
    ],
    notes: "This is your recommendation for Ron. After showing Elite, say: \"Now — this is the one I'd actually recommend for you.\" Pause. \"One session a week is enough to correct your form, push your performance, and hold you accountable. And the full system runs every other day — so you're not on your own between sessions.\" Then say: \"I'm not recommending this because it's cheaper. I'm recommending it because I don't think you need to train with me three times a week to get the result you described. One strong session plus the system may be enough.\" Let that land.",
  },
  {
    type: 'package',
    tier: '03 — remote coaching',
    headline: 'complete coaching.\nfull flexibility.',
    subtitle: 'the complete vveritas* system — fully online',
    for: "travel often? prefer your own schedule? same coaching philosophy. same system. fully remote.",
    items: [
      'personalized fitness program',
      'complete vveritas* dashboard',
      'personalized nutrition framework',
      'grocery lists and meal structure',
      'weekly accountability call',
      'unlimited coach messaging',
      'exercise video library',
      'form review via submitted video',
      'progress tracking',
      'habit and lifestyle accountability',
      'program adjustments',
      'strength and performance tracking',
      'recovery guidance',
    ],
    durations: [
      { weeks: 4, price: 600, sessions: null, savings: null, label: null, tagline: 'build the foundation' },
      { weeks: 8, price: 1100, sessions: null, savings: 100, label: 'most popular', tagline: 'the flagship timeline' },
      { weeks: 12, price: 1500, sessions: null, savings: 300, label: 'best value', tagline: 'strongest foundation' },
    ],
    notes: "Present this as a continuation option, not a downgrade. Say: \"if your schedule changes, you move, or you prefer training on your own — you don't lose the system. everything stays the same except we meet virtually instead of in person. the quality of coaching doesn't change. the access does.\"",
  },
  {
    type: 'comparison-table',
    label: 'what is included',
    headline: 'every level.\nsame system.',
    rows: [
      { feature: 'personalized training program', elite: true, hybrid: true, remote: true },
      { feature: 'personalized nutrition', elite: true, hybrid: true, remote: true },
      { feature: 'vveritas* dashboard', elite: true, hybrid: true, remote: true },
      { feature: 'weekly accountability', elite: true, hybrid: true, remote: true },
      { feature: 'unlimited messaging', elite: true, hybrid: true, remote: true },
      { feature: 'grocery planning', elite: true, hybrid: true, remote: true },
      { feature: 'progress tracking', elite: true, hybrid: true, remote: true },
      { feature: 'habit coaching', elite: true, hybrid: true, remote: true },
      { feature: 'in-person coaching', elite: '3x / week', hybrid: '1x / week', remote: false },
      { feature: 'technique coaching', elite: true, hybrid: true, remote: 'video review' },
      { feature: 'priority support', elite: true, hybrid: false, remote: false },
    ],
    notes: "This is the most important slide in the package section. Every row with three checkmarks reinforces that coaching quality doesn't change — only the access does. Let him scan the whole table. Then point to the in-person row and say: \"that's the only real difference.\"",
  },
  {
    type: 'recommendation',
    label: 'my recommendation for you',
    headline: 'hybrid coaching.\n8 weeks.',
    reasons: [
      'you want hands-on training and real accountability',
      'one coached session each week sets the standard and builds your confidence',
      'independent workouts between sessions teach you to execute on your own',
      'the full vveritas* system supports you every day — not just on session days',
      '8 weeks is enough time to build consistency and measure real progress',
    ],
    notNeeded: [
      'three in-person sessions per week — unless you need maximum hands-on support',
      'complicated calorie or macro tracking',
      'excessive training volume or frequency',
      'a long-term commitment before we see how you respond',
    ],
    notes: "Read the reasons out loud — slowly. Then say: \"And here's what I don't think you need right now.\" Read those too. \"I'm not removing these things to give you less. I'm removing them because they're not necessary for your situation.\" Pause. \"One strong session a week, the full system running between sessions — I believe that gives you a real shot at everything you described.\" This slide should feel like a doctor reading you a diagnosis, not a salesperson showing you a menu.",
  },
  {
    type: 'eight-week',
    label: 'recommended starting point',
    headline: '8 weeks.',
    lines: [
      '4 weeks builds momentum.',
      '8 weeks builds consistency, real strength, and visible progress.',
      '12 weeks builds the strongest foundation for a long-term transformation.',
    ],
    body: "you're not investing in sessions. you're investing in the version of yourself that shows up every day — especially between sessions.",
    notes: "Don't promise specific results. Just explain the logic. Four weeks is a sprint. Eight weeks is where real change sets in. Twelve is for someone who wants to do it right the first time. Ask him: \"what timeline feels right to you?\" Then let him answer.",
  },
  {
    type: 'payment',
    label: 'payment options',
    headline: 'flexible payment options.',
    items: [
      { label: 'pay in full', desc: 'one payment. no recurring charges.' },
      { label: 'split payment', desc: 'two equal payments over the program length.' },
      { label: 'monthly installments', desc: 'automatic monthly payments.' },
      { label: 'deposit + scheduled', desc: 'initial deposit followed by a payment plan.' },
    ],
    examples: [
      { label: 'elite — 8 weeks', options: ['pay in full: $4,600', 'two payments: $2,300 each', 'four payments: $1,150 each'] },
      { label: 'hybrid — 8 weeks', options: ['pay in full: $2,300', 'two payments: $1,150 each', 'four payments: $575 each'] },
      { label: 'remote — 8 weeks', options: ['pay in full: $1,100', 'two payments: $550 each', 'four payments: $275 each'] },
    ],
    body: "the total investment stays the same regardless of which schedule you choose. your start date is secured once the first payment or deposit is received.",
    notes: "Bring this up naturally. Say: \"I want to make this as easy as possible, so we can structure the payment however works best for you.\" This removes the last barrier. You're not financing anything — just giving people options.",
  },
  {
    type: 'enrollment',
    label: 'the decision',
    headline: 'choose your\ncoaching experience.',
    packages: [
      {
        id: 'elite',
        name: 'elite transformation',
        sub: '3 in-person sessions / week',
        durations: [
          { weeks: 4, price: 2400, sessions: '12 sessions' },
          { weeks: 8, price: 4600, sessions: '24 sessions', savings: 'save $200' },
          { weeks: 12, price: 6600, sessions: '36 sessions', savings: 'save $600' },
        ],
      },
      {
        id: 'hybrid',
        name: 'hybrid coaching',
        sub: '1 in-person session / week',
        recommended: true,
        durations: [
          { weeks: 4, price: 1200, sessions: '4 sessions' },
          { weeks: 8, price: 2300, sessions: '8 sessions', savings: 'save $100' },
          { weeks: 12, price: 3300, sessions: '12 sessions', savings: 'save $300' },
        ],
      },
      {
        id: 'remote',
        name: 'remote coaching',
        sub: 'fully online',
        durations: [
          { weeks: 4, price: 600 },
          { weeks: 8, price: 1100, savings: 'save $100' },
          { weeks: 12, price: 1500, savings: 'save $300' },
        ],
      },
    ],
    notes: "Don't say \"which one feels right?\" Say: \"Based on everything you told me, I'd recommend the 8-week Hybrid. You'll have me in person every week, and the system runs every other day. The investment is $2,300 — and we can structure the payment however works for you.\" Pause. \"Does that structure make sense for what you described?\" Let him answer. If yes: \"Good. Let me walk you through it and we'll lock in your start date.\" If budget is the issue: \"Would it help if I walked you through which parts are most essential for your situation?\" Never push. Never invent urgency. If he needs time — give him the enroll link and follow up same day.",
  },
  {
    type: 'cta',
    label: 'the decision',
    headline: 'the only thing left\nis the decision.',
    body: 'your goals are clear. the system is built. the results come from starting.',
    sub: 'what questions do you have before we move forward?',
    notes: "Do not pitch. Do not oversell. Ask that question and then go silent. Let Ron talk. Whatever he says next is your close. If he asks about price — you're ready. If he has objections — address them. If he says \"let's do it\" — great.",
  },
];

// ── sub-components for stateful slides ─────────────────────────────────────

function PackageSlide({ slide }) {
  const [sel, setSel] = useState(1);
  const chosen = slide.durations[sel];
  const GREEN = '#4a8c6a';
  const AMBER = '#8c7a3a';

  return (
    <div className="ws-slide" style={{ gap: '0.5rem' }}>
      <div className="ws-label" style={{ margin: 0 }}>{slide.tier}</div>
      <h1 className="ws-headline ws-headline-sm" style={{ whiteSpace: 'pre-line', marginBottom: '0.2rem' }}>{slide.headline}</h1>
      <p style={{ fontSize: 'clamp(0.66rem, 0.95vw, 0.8rem)', color: '#5A5A5A', marginBottom: '0.2rem' }}>{slide.subtitle}</p>
      <p style={{ fontSize: 'clamp(0.62rem, 0.85vw, 0.72rem)', color: '#3A3A3A', fontStyle: 'italic', marginBottom: '1rem' }}>{slide.for}</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.3rem 3vw', maxWidth: '580px', marginBottom: '1.2rem' }}>
        {slide.items.map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: '0.55rem', alignItems: 'baseline' }}>
            <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.52rem', color: GREEN, flexShrink: 0 }}>✓</span>
            <span style={{ fontSize: 'clamp(0.65rem, 0.95vw, 0.78rem)', color: '#EDEDE8', lineHeight: 1.4 }}>{item}</span>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.7rem', maxWidth: '580px' }}>
        {slide.durations.map((d, i) => (
          <button
            key={i}
            onClick={() => setSel(i)}
            style={{
              background: 'none',
              border: `1px solid ${sel === i ? '#EDEDE8' : '#1a1a1a'}`,
              padding: '0.9rem 1rem',
              cursor: 'pointer',
              textAlign: 'left',
              borderRadius: '2px',
            }}
          >
            {d.label && (
              <div style={{
                fontFamily: 'ui-monospace, monospace',
                fontSize: '0.4rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: d.label === 'most popular' ? GREEN : AMBER,
                marginBottom: '0.35rem',
              }}>
                {d.label}
              </div>
            )}
            <div style={{
              fontFamily: 'ui-monospace, monospace',
              fontSize: '0.48rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: sel === i ? '#EDEDE8' : '#5A5A5A',
              marginBottom: '0.4rem',
            }}>
              {d.weeks} weeks
            </div>
            <div style={{
              fontSize: 'clamp(1.1rem, 1.9vw, 1.5rem)',
              fontWeight: 200,
              letterSpacing: '-0.03em',
              color: sel === i ? '#EDEDE8' : '#5A5A5A',
              marginBottom: d.sessions || d.savings ? '0.3rem' : 0,
            }}>
              ${d.price.toLocaleString()}
            </div>
            {d.sessions && (
              <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.44rem', letterSpacing: '0.08em', color: sel === i ? '#5A5A5A' : '#3A3A3A', marginBottom: '0.15rem' }}>
                {d.sessions} sessions
              </div>
            )}
            {d.savings && (
              <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.42rem', letterSpacing: '0.05em', color: GREEN }}>
                save ${d.savings}
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

function ComparisonTable({ slide }) {
  const CHECK = () => <span style={{ color: '#4a8c6a', fontFamily: 'ui-monospace, monospace', fontSize: '0.7rem' }}>✓</span>;
  const DASH = () => <span style={{ color: '#2a2a2a', fontFamily: 'ui-monospace, monospace', fontSize: '0.7rem' }}>—</span>;

  function Cell({ val }) {
    if (val === true) return <CHECK />;
    if (val === false) return <DASH />;
    return <span style={{ fontSize: 'clamp(0.55rem, 0.85vw, 0.68rem)', color: '#5A5A5A', textAlign: 'center' }}>{val}</span>;
  }

  const colStyle = { fontFamily: 'ui-monospace, monospace', fontSize: '0.48rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#3A3A3A', textAlign: 'center', paddingBottom: '0.8rem', borderBottom: '1px solid #141414' };
  const cellStyle = { display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.45rem 0', borderBottom: '1px solid #0d0d0d' };
  const featStyle = { fontSize: 'clamp(0.62rem, 0.9vw, 0.75rem)', color: '#5A5A5A', padding: '0.45rem 0', borderBottom: '1px solid #0d0d0d', display: 'flex', alignItems: 'center' };

  return (
    <div className="ws-slide">
      <div className="ws-label">{slide.label}</div>
      <h1 className="ws-headline ws-headline-sm" style={{ whiteSpace: 'pre-line', marginBottom: '1.5rem' }}>{slide.headline}</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px 80px 80px', gap: '0 0.5rem', maxWidth: '600px' }}>
        <div />
        {['elite', 'hybrid', 'remote'].map(col => <div key={col} style={colStyle}>{col}</div>)}
        {slide.rows.flatMap((row, i) => [
          <div key={`f${i}`} style={featStyle}>{row.feature}</div>,
          <div key={`e${i}`} style={cellStyle}><Cell val={row.elite} /></div>,
          <div key={`h${i}`} style={cellStyle}><Cell val={row.hybrid} /></div>,
          <div key={`r${i}`} style={cellStyle}><Cell val={row.remote} /></div>,
        ])}
      </div>
    </div>
  );
}

function EnrollmentSlide({ slide }) {
  const [step, setStep] = useState(0);
  const [selPkg, setSelPkg] = useState(null);
  const [selDur, setSelDur] = useState(null);

  const pkg = selPkg !== null ? slide.packages[selPkg] : null;
  const dur = selDur !== null && pkg ? pkg.durations[selDur] : null;

  const btnBase = {
    background: 'none',
    border: '1px solid #1a1a1a',
    cursor: 'pointer',
    textAlign: 'left',
    borderRadius: '2px',
    fontFamily: 'Inter, -apple-system, sans-serif',
    color: '#EDEDE8',
    transition: 'border-color 0.15s',
  };

  if (step === 2 && pkg && dur) {
    const stripeUrl = STRIPE_LINKS[pkg.id]?.[dur.weeks];

    return (
      <div className="ws-slide ws-cta-slide">
        <div className="ws-label">your transformation plan</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', maxWidth: '480px', marginBottom: '2rem' }}>
          {[
            { label: 'package', val: pkg.name },
            { label: 'length', val: `${dur.weeks} weeks` },
            { label: 'investment', val: `$${dur.price.toLocaleString()}` },
            ...(dur.sessions ? [{ label: 'sessions', val: dur.sessions }] : []),
          ].map(({ label, val }) => (
            <div key={label} style={{ display: 'grid', gridTemplateColumns: '10rem 1fr', alignItems: 'baseline', borderBottom: '1px solid #0f0f0f', paddingBottom: '0.8rem' }}>
              <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.5rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#3A3A3A' }}>{label}</span>
              <span style={{ fontSize: 'clamp(0.85rem, 1.4vw, 1.1rem)', fontWeight: 200 }}>{val}</span>
            </div>
          ))}
        </div>

        {stripeUrl ? (
          <button
            onClick={() => window.open(stripeUrl, '_blank')}
            style={{ ...btnBase, padding: '1rem 2rem', fontSize: 'clamp(0.82rem, 1.2vw, 1rem)', border: '1px solid #EDEDE8', color: '#EDEDE8', marginBottom: '1rem', letterSpacing: '0.01em' }}
          >
            continue to payment →
          </button>
        ) : (
          <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.52rem', letterSpacing: '0.15em', color: '#3A3A3A', marginBottom: '1rem' }}>
            payment link not yet configured
          </div>
        )}

        <button
          onClick={() => { setStep(0); setSelPkg(null); setSelDur(null); }}
          style={{ ...btnBase, padding: '0.7rem 1.2rem', fontSize: 'clamp(0.68rem, 0.9vw, 0.8rem)', border: '1px solid #1a1a1a', color: '#5A5A5A', display: 'block' }}
        >
          ← start over
        </button>
      </div>
    );
  }

  if (step === 1 && pkg) {
    return (
      <div className="ws-slide">
        <div className="ws-label">step 2 of 2 — choose your commitment</div>
        <h1 className="ws-headline ws-headline-sm" style={{ marginBottom: '0.4rem' }}>{pkg.name}</h1>
        <p style={{ fontSize: 'clamp(0.68rem, 1vw, 0.82rem)', color: '#5A5A5A', marginBottom: '2rem' }}>{pkg.sub}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.8rem', maxWidth: '580px', marginBottom: '2rem' }}>
          {pkg.durations.map((d, i) => (
            <button
              key={i}
              onClick={() => { setSelDur(i); setStep(2); }}
              style={{ ...btnBase, padding: '1.2rem 1.1rem', border: '1px solid #1a1a1a' }}
            >
              <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.5rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#5A5A5A', marginBottom: '0.5rem' }}>
                {d.weeks} weeks
              </div>
              <div style={{ fontSize: 'clamp(1.2rem, 2vw, 1.6rem)', fontWeight: 200, letterSpacing: '-0.03em', marginBottom: '0.3rem' }}>
                ${d.price.toLocaleString()}
              </div>
              {d.sessions && (
                <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.45rem', letterSpacing: '0.08em', color: '#3A3A3A', marginBottom: '0.15rem' }}>{d.sessions}</div>
              )}
              {d.savings && (
                <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.43rem', color: '#4a8c6a' }}>{d.savings}</div>
              )}
            </button>
          ))}
        </div>
        <button
          onClick={() => setStep(0)}
          style={{ ...btnBase, padding: '0.7rem 1.2rem', fontSize: 'clamp(0.7rem, 1vw, 0.82rem)', border: '1px solid #1a1a1a', color: '#5A5A5A' }}
        >
          ← back
        </button>
      </div>
    );
  }

  return (
    <div className="ws-slide">
      <div className="ws-label">{slide.label}</div>
      <h1 className="ws-headline ws-headline-sm" style={{ whiteSpace: 'pre-line', marginBottom: '2rem' }}>{slide.headline}</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', maxWidth: '520px' }}>
        {slide.packages.map((p, i) => (
          <button
            key={i}
            onClick={() => { setSelPkg(i); setStep(1); }}
            style={{
              ...btnBase,
              padding: '1.1rem 1.3rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              border: `1px solid ${p.recommended ? '#EDEDE8' : '#1a1a1a'}`,
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: '0.2rem' }}>
                <span style={{ fontSize: 'clamp(0.82rem, 1.3vw, 1rem)', fontWeight: 300 }}>{p.name}</span>
                {p.recommended && (
                  <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.4rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#4a8c6a', border: '1px solid #4a8c6a', padding: '0.15em 0.5em' }}>recommended</span>
                )}
              </div>
              <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.48rem', letterSpacing: '0.15em', color: '#5A5A5A' }}>{p.sub}</div>
            </div>
            <span style={{ color: '#3A3A3A', fontSize: '0.8rem' }}>→</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ── main Slide dispatcher ───────────────────────────────────────────────────

function Slide({ slide }) {
  if (slide.type === 'hero') {
    return (
      <div className="ws-slide ws-hero">
        <div className="ws-hero-inner">
          <div className="ws-mark">{slide.label}</div>
          <h1 className="ws-headline" style={{ textAlign: 'center' }}>{slide.headline}</h1>
          <p className="ws-body" style={{ textAlign: 'center', marginTop: '0.5rem' }}>{slide.body}</p>
        </div>
      </div>
    );
  }

  if (slide.type === 'statement') {
    return (
      <div className="ws-slide" style={{ justifyContent: 'center', maxWidth: '70vw', margin: '0 auto', padding: '5vw 8vw' }}>
        {slide.label && <div className="ws-label">{slide.label}</div>}
        <h1 className="ws-headline ws-headline-sm">{slide.headline}</h1>
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

  if (slide.type === 'score') {
    const avg = Math.round(slide.pillars.reduce((s, p) => s + p.score, 0) / slide.pillars.length);
    const avgColor = avg >= 70 ? '#4a8c6a' : avg >= 50 ? '#8c7a3a' : '#5C1A1A';
    return (
      <div className="ws-slide">
        <div className="ws-label">{slide.label}</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.5rem', marginBottom: '2rem' }}>
          <h1 className="ws-headline ws-headline-sm" style={{ marginBottom: 0 }}>{slide.headline}</h1>
          <span style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 200, letterSpacing: '-0.04em', color: avgColor, lineHeight: 1 }}>{avg}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', maxWidth: '480px', marginBottom: '2rem' }}>
          {slide.pillars.map((p, i) => {
            const c = p.score >= 70 ? '#4a8c6a' : p.score >= 50 ? '#8c7a3a' : '#5C1A1A';
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
        {slide.sub && (
          <p className="ws-body" style={{ marginTop: '1rem', color: '#3A3A3A', fontStyle: 'italic' }}>{slide.sub}</p>
        )}
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
            <div key={i} style={{ alignSelf: m.from === 'coach' ? 'flex-start' : 'flex-end', maxWidth: '80%' }}>
              <div style={{
                fontSize: 'clamp(0.78rem, 1.3vw, 1rem)',
                lineHeight: 1.6,
                color: '#EDEDE8',
                padding: '0.8rem 1.1rem',
                border: '1px solid',
                borderColor: m.from === 'coach' ? '#1a1a1a' : '#2a2a2a',
                background: m.from === 'client' ? '#080808' : 'transparent',
                borderRadius: '2px',
              }}>
                {m.text}
              </div>
              <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.5rem', letterSpacing: '0.1em', color: '#3A3A3A', marginTop: '0.3rem', textAlign: m.from === 'client' ? 'right' : 'left' }}>
                {m.from === 'coach' ? 'nico' : 'ron'}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (slide.type === 'inperson') {
    return (
      <div className="ws-slide">
        <div className="ws-label">{slide.label}</div>
        <h1 className="ws-headline ws-headline-sm" style={{ whiteSpace: 'pre-line', marginBottom: '2rem' }}>{slide.headline}</h1>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4vw' }}>
          <div>
            <div className="ws-mini-label" style={{ marginBottom: '1rem' }}>during sessions</div>
            <ul className="ws-bullets">
              {slide.items.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
          <div>
            <div className="ws-mini-label" style={{ marginBottom: '1rem' }}>between sessions</div>
            <ul className="ws-bullets ws-bullets-dim">
              {slide.between.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
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

  if (slide.type === 'package') return <PackageSlide slide={slide} />;
  if (slide.type === 'comparison-table') return <ComparisonTable slide={slide} />;

  if (slide.type === 'recommendation') {
    return (
      <div className="ws-slide">
        <div className="ws-label">{slide.label}</div>
        <h1 className="ws-headline ws-headline-sm" style={{ whiteSpace: 'pre-line', marginBottom: '2rem' }}>{slide.headline}</h1>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 4vw', maxWidth: '700px' }}>
          <div>
            <div className="ws-mini-label" style={{ marginBottom: '1rem', color: '#4a8c6a' }}>why i'm recommending this</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {slide.reasons.map((r, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.7rem', alignItems: 'baseline' }}>
                  <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.55rem', color: '#4a8c6a', flexShrink: 0 }}>✓</span>
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

  if (slide.type === 'eight-week') {
    return (
      <div className="ws-slide">
        <div className="ws-label">{slide.label}</div>
        <h1 className="ws-headline" style={{ marginBottom: '2rem' }}>{slide.headline}</h1>
        <div className="ws-steps" style={{ marginBottom: '2.5rem' }}>
          {slide.lines.map((line, i) => (
            <div key={i} className="ws-step">
              <span className="ws-step-n">0{i + 1}</span>
              <span className="ws-step-text">{line}</span>
            </div>
          ))}
        </div>
        <p className="ws-body" style={{ color: '#5A5A5A', fontStyle: 'italic', maxWidth: '520px' }}>{slide.body}</p>
      </div>
    );
  }

  if (slide.type === 'payment') {
    return (
      <div className="ws-slide">
        <div className="ws-label">{slide.label}</div>
        <h1 className="ws-headline ws-headline-sm" style={{ marginBottom: '1.5rem' }}>{slide.headline}</h1>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem 4vw', maxWidth: '640px', marginBottom: '2rem' }}>
          {slide.items.map((item, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '2rem 1fr', gap: '0.8rem', alignItems: 'start' }}>
              <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.5rem', letterSpacing: '0.2em', color: '#3A3A3A', paddingTop: '0.12rem' }}>0{i + 1}</span>
              <div>
                <div style={{ fontSize: 'clamp(0.8rem, 1.2vw, 0.95rem)', color: '#EDEDE8', marginBottom: '0.15rem' }}>{item.label}</div>
                <div style={{ fontSize: 'clamp(0.65rem, 0.9vw, 0.78rem)', color: '#5A5A5A' }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid #0f0f0f', paddingTop: '1.5rem' }}>
          <div className="ws-mini-label" style={{ marginBottom: '0.8rem' }}>example schedules (8 weeks)</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.6rem 2vw', maxWidth: '640px' }}>
            {slide.examples.map((ex, i) => (
              <div key={i}>
                <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.44rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#3A3A3A', marginBottom: '0.5rem' }}>{ex.label}</div>
                {ex.options.map((opt, j) => (
                  <div key={j} style={{ fontSize: 'clamp(0.6rem, 0.85vw, 0.72rem)', color: j === 0 ? '#EDEDE8' : '#5A5A5A', marginBottom: '0.2rem' }}>{opt}</div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <p style={{ fontSize: 'clamp(0.62rem, 0.85vw, 0.72rem)', color: '#3A3A3A', fontStyle: 'italic', marginTop: '1.2rem' }}>{slide.body}</p>
      </div>
    );
  }

  if (slide.type === 'enrollment') return <EnrollmentSlide slide={slide} />;

  if (slide.type === 'cta') {
    return (
      <div className="ws-slide ws-cta-slide">
        {slide.label && <div className="ws-label">{slide.label}</div>}
        <h1 className="ws-headline" style={{ whiteSpace: 'pre-line' }}>{slide.headline}</h1>
        <p className="ws-body ws-body-spaced">{slide.body}</p>
        <p className="ws-cta-sub">{slide.sub}</p>
        <div className="ws-cta-mark">vveritas* — built for Ron Blake</div>
      </div>
    );
  }

  return null;
}

// ── main shell ──────────────────────────────────────────────────────────────

export default function PitchSlides() {
  const [idx, setIdx] = useState(0);
  const [showNotes, setShowNotes] = useState(false);
  const [entered, setEntered] = useState(false);

  const total = SLIDES.length;
  const slide = SLIDES[idx];
  const pct = ((idx + 1) / total) * 100;

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'ArrowRight' || e.key === ' ') setIdx(i => Math.min(i + 1, total - 1));
      if (e.key === 'ArrowLeft') setIdx(i => Math.max(i - 1, 0));
      if (e.key === 'n' || e.key === 'N') setShowNotes(s => !s);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [total]);

  if (!entered) {
    return (
      <div className="ws-enter">
        <div className="ws-enter-inner">
          <div className="ws-enter-title">{'vveritas*\nbuilt for Ron Blake.'}</div>
          <div className="ws-enter-sub">in-person coaching — sales consultation</div>
          <button className="ws-enter-btn" onClick={() => setEntered(true)}>begin →</button>
        </div>
      </div>
    );
  }

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
