'use client';
import { useState, useEffect } from 'react';

const prospectName = 'Joshua';
const PRICE_MO = 497;
const GREEN = '#4a8c6a';

const fmt = n => n ? `$${Number(n).toLocaleString()}` : '[ set before call ]';

// ── SLIDES ────────────────────────────────────────────────────────────────────
const SLIDES = [
  // 1
  {
    type: 'hero',
    headline: 'built for joshua.',
    sub: 'build muscle. lose body fat. stop guessing.',
    body: 'a personalized system for training, nutrition, recovery, and consistency.',
    notes: `This is on screen when the call opens. Let Joshua see his name. Say nothing immediately. When he acknowledges it, begin: "Joshua, before I show you anything, I want to hear from you directly — because the messages gave me a sense of where you are, but I don't want to assume I have the full picture. You mentioned you've been overcomplicating things and feeling stressed about where to start. I want to understand that before I prescribe anything." Then ask: "How was the vacation? And what made you decide this was the right time to make a change?"`,
  },
  // 2
  {
    type: 'fit-frame',
    headline: 'this is an assessment.',
    points: [
      'i am going to ask you questions and listen.',
      'i want to understand your body and your situation before i show you anything.',
      'you do most of the talking.',
      'i will reflect it back — and then give you the structure i think fits.',
    ],
    notes: `Set the tone early. Say: "This is not a standard pitch call. I'm going to ask you questions, listen to what you tell me, and then show you what I would actually build for you based on that." Pause. "You said you've been stressed about where to start and you feel like you're overcomplicating everything. That tells me something important already. So let's figure out exactly where you are, what you want to look like, and what's been getting in the way." Ask: "Sound fair?" Wait for him to agree before advancing.`,
  },
  // 3
  {
    type: 'discovery',
    label: 'part 1 — physique goals',
    headline: 'where you are trying to go.',
    questions: [
      `"when you say your body feels unproportioned — what areas bother you most?"`,
      `"where do you most want to build muscle?"`,
      `"where do you most want to reduce body fat?"`,
      `"what would you want to look and feel like three months from now?"`,
    ],
    notes: `These questions set the target. Do not lead him — let him define it. If he mentions a body part, write down his exact words. That becomes the anchor for the program framing. After each answer: "tell me more." or "what makes that the priority?" The body recomposition explanation later will map directly to what he says here. Do not rush this section.`,
  },
  // 4
  {
    type: 'discovery',
    label: 'part 2 — current routine',
    headline: 'where you are right now.',
    questions: [
      `"what does your current training look like — how often, and what are you doing?"`,
      `"what does a normal day of eating look like for you?"`,
      `"how are your sleep, energy, and recovery right now?"`,
      `"what have you tried before — workouts, diets, anything — that didn't give you the result you expected?"`,
    ],
    notes: `You are mapping the current state. Listen for: frequency, structure, and consistency. If he describes a decent routine, ask: "how consistent is that really week to week?" That usually reveals the actual gap. The eating question will likely confirm the pattern you are already seeing. The "what have you tried" question is critical — it tells you what not to pitch him and what he has already dismissed.`,
  },
  // 5
  {
    type: 'discovery',
    label: 'part 3 — confusion + consistency',
    headline: 'what is actually in the way.',
    questions: [
      `"what part feels most confusing — training, food, how much to eat, or just staying consistent?"`,
      `"what normally causes you to stop following a plan?"`,
    ],
    notes: `The confusion question is critical for Joshua. His exact words were "overcomplicating everything" and "stressed about what to do and where to start." Let him identify the source himself — do not name it for him. The second question reveals the real pattern. Whatever causes him to stop is the main coaching design constraint — the program needs to be simple enough that there is no logical exit. Follow-ups: "tell me more." / "what makes you say that?" / "how long has that been bothering you?" / "what would make this feel simple?"`,
  },
  // 6
  {
    type: 'reflection',
    notes: `Say: "Before I show you anything, let me make sure I actually understood you." Summarize everything back using his exact words — not your interpretation. Go through each category. After each one: "is that accurate?" or "am I understanding that right?" This step is rare in fitness calls. It signals that you listened, which builds more trust than any slide. Do not rush forward until he confirms you got it right.`,
  },
  // 7
  {
    type: 'recompo',
    notes: `Say: "I want to be direct about what we are actually going to do — because the term 'body recomposition' gets overcomplicated." Walk through each point on screen at a steady pace. Then say: "What most people call toning is really two things happening together — building muscle where your body needs more structure, and reducing fat over time to reveal it." Then: "You are not trying to become smaller everywhere. You are trying to build the right places and gradually bring the fat down. That is what we are going to do." Do not promise rapid or simultaneous fat loss and muscle gain. Use: "The exact rate will depend on your training history, nutrition, recovery, and consistency — but the direction is clear."`,
  },
  // 8
  {
    type: 'overthink',
    notes: `This is the emotional center of the presentation for Joshua specifically. Say: "The problem I see most with people in your situation is not lack of effort." Pause. "It is that the effort goes into figuring out the plan instead of executing the plan." Walk through the overthinking column. Then reveal the solution column. Then say: "You do not need to know everything. You need to know what to do next." Pause and let that land. Do not rush past this slide — this is his core pain point.`,
  },
  // 9
  {
    type: 'holistic',
    notes: `Say: "The training plan is not the whole system." Walk through each factor. Say: "The workout creates the stimulus. Everything else in your week determines whether your body actually responds to it." Then: "This is why I am not going to hand you a workout file and leave everything else up to you — because that is what creates the confusion you already described." Then: "The nutrition, the recovery, the structure — it all has to be connected."`,
  },
  // 10
  {
    type: 'nutrition-phil',
    notes: `Say: "My nutrition approach is not restrictive. It is simple." Walk through each principle. Say: "We may use a calorie range to manage body composition, but the plan will not require you to obsess over every gram." Then: "The goal is to eat in a way that supports muscle growth, fat loss, energy, digestion, and consistency — not in a way that adds stress to your life." Ask: "Does that feel manageable?" Wait for his answer before advancing.`,
  },
  // 11
  {
    type: 'why-coach',
    notes: `Keep this brief. Say: "I coach this way because of what I personally experienced when I simplified my own approach." Read the slide. Then: "That experience shaped my philosophy. But your plan will be built around how your body responds — not how mine did." Pause. "Now let me show you what the actual system looks like."`,
  },
  // 12
  {
    type: 'demo',
    notes: `Open /portal/joshua-demo. Walk through each tab. Today tab: point to each task and read the focus note aloud. Fitness tab: walk through the training plan, name one exercise, read its form note. Nutrition tab: show the protein target, food checklist, and grocery list. Progress tab: point to the recomposition score and what drives it. Check-In tab: walk through the questions — point to question 5 (the overthinking check). Weekly Review tab: walk through the questions. Messages tab: read the coach message slowly and deliberately. After the last tab, ask: "Have you ever seen a fitness system this clear and this complete in one place?" Stop. Let him answer.`,
  },
  // 13
  {
    type: 'included',
    notes: `Walk through the list steadily. Do not rush. Say: "Not random information. One clear system built around your body, your goals, and your current situation." Then: "Everything on this list is active every month. It is not a PDF you buy and figure out alone. It is live coaching that adjusts based on how you respond." Then advance to fit positioning.`,
  },
  // 14
  {
    type: 'fit-who',
    notes: `Say: "Based on what you told me, I think you are a good fit for this." Pause. "Not because you have a perfect training history. But because you already know what you want — you just have not had one clear system telling you exactly how to build it." Pause. "I do not think you need more motivation. I think you need less confusion." Pause. "The real question is whether you are willing to follow one precise system long enough for your body to respond." Let him answer.`,
  },
  // 15
  {
    type: 'pre-price',
    notes: `Ask this exact question and then stop talking. Do not add to it. Do not soften it. Let him sit with it. If he says yes — advance to the investment. If he is unsure — go back to whatever is unclear. Do not reveal the price until he confirms the system is what he has been missing.`,
  },
  // 16
  {
    type: 'investment',
    notes: `Say: "Based on what you told me, I do not think you need more random fitness information." Pause. "You need one clear system that connects training, nutrition, recovery, and accountability — built around your body and your goal." Pause. "The investment for that level of coaching is $497 per month." Pause. Let it land for at least three seconds. Then: "That includes the dashboard, personalized training and nutrition, daily check-ins, weekly reviews, direct messaging, form feedback, and ongoing adjustments." Then ask: "Does that level of support match what you told me you need?" Stop talking.`,
  },
  // 17
  {
    type: 'close',
    notes: `Deliver this with complete calm. After the question — stop talking. Whatever he says next is the close. If yes: "Good. Let me pull up your enrollment page." Open /enroll/joshua. Confirm start date. If he hesitates: ask "what is making you hesitate?" Let him name it. Address only what he actually raises — do not invent objections.`,
  },
  // 18
  {
    type: 'cta',
    headline: 'stop trying to figure out everything.',
    sub: 'follow one system long enough to change.',
    body: 'vveritascoaching.com/enroll/joshua',
    notes: `Do not pitch. Do not oversell. Ask: "What questions do you have before we move forward?" Go completely silent. Let him talk. Whatever he says next is your close. Open the enrollment page. Confirm start date. Confirm onboarding timeline.`,
  },
];

// ── REFLECTION SLIDE ──────────────────────────────────────────────────────────
function ReflectionSlide() {
  const fields = [
    { key: 'physicalGoal',    label: 'primary physical goal' },
    { key: 'proportionConcern', label: 'proportion concern' },
    { key: 'currentRoutine', label: 'current routine' },
    { key: 'currentNutrition', label: 'current nutrition' },
    { key: 'biggestConfusion', label: 'what feels most confusing' },
    { key: 'stopPattern',    label: 'what normally causes him to stop' },
    { key: 'successLooks',   label: 'what success looks like to him' },
  ];
  const [data, setData] = useState(Object.fromEntries(fields.map(f => [f.key, ''])));

  return (
    <div className="ws-slide">
      <div className="ws-label">the diagnosis</div>
      <h1 className="ws-headline ws-headline-sm" style={{ marginBottom: '1.8rem' }}>what i&apos;m hearing.</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', maxWidth: '620px' }}>
        {fields.map(f => (
          <div key={f.key} style={{ display: 'grid', gridTemplateColumns: '12rem 1fr', gap: '0.8rem', alignItems: 'center', paddingBottom: '0.6rem', borderBottom: '1px solid #0a0a0a' }}>
            <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.44rem', letterSpacing: '0.1em', color: '#3A3A3A', textTransform: 'uppercase' }}>{f.label}</span>
            <input
              value={data[f.key]}
              onChange={e => setData(prev => ({ ...prev, [f.key]: e.target.value }))}
              placeholder="fill in during call…"
              style={{ background: 'transparent', border: 'none', borderBottom: '1px solid #1a1a1a', color: '#EDEDE8', fontFamily: 'Inter, sans-serif', fontSize: 'clamp(0.7rem, 1.05vw, 0.82rem)', fontWeight: 300, padding: '0.3rem 0', outline: 'none', width: '100%' }}
            />
          </div>
        ))}
      </div>
      <div style={{ marginTop: '2rem', fontFamily: 'ui-monospace, monospace', fontSize: '0.44rem', letterSpacing: '0.18em', color: '#1a1a1a', textTransform: 'uppercase' }}>
        use his exact words — not your interpretation.
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
          <div className="ws-mark">vveritas* coaching</div>
          <h1 className="ws-headline" style={{ textAlign: 'center' }}>{slide.headline}</h1>
          <p style={{ textAlign: 'center', fontSize: 'clamp(0.92rem, 1.5vw, 1.15rem)', fontWeight: 200, color: '#EDEDE8', margin: '0.4rem 0 1rem', letterSpacing: '-0.01em' }}>{slide.sub}</p>
          <p style={{ textAlign: 'center', fontSize: 'clamp(0.68rem, 1vw, 0.8rem)', color: '#3A3A3A', maxWidth: '400px' }}>{slide.body}</p>
        </div>
      </div>
    );
  }

  if (slide.type === 'fit-frame') {
    return (
      <div className="ws-slide" style={{ justifyContent: 'center', maxWidth: '70vw', margin: '0 auto', padding: '5vw 8vw' }}>
        <div className="ws-label">before we begin</div>
        <h1 className="ws-headline" style={{ marginBottom: '2.5rem' }}>{slide.headline}</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', maxWidth: '480px', marginBottom: '2.5rem' }}>
          {slide.points.map((line, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.8rem', alignItems: 'baseline' }}>
              <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.5rem', color: '#3A3A3A', flexShrink: 0 }}>—</span>
              <p style={{ fontSize: 'clamp(0.8rem, 1.3vw, 1rem)', color: '#5A5A5A', lineHeight: 1.75, margin: 0 }}>{line}</p>
            </div>
          ))}
        </div>
        <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.5rem', letterSpacing: '0.25em', color: '#3A3A3A' }}>listen. simplify. reflect. prescribe.</div>
      </div>
    );
  }

  if (slide.type === 'discovery') {
    return (
      <div className="ws-slide">
        <div className="ws-label">{slide.label}</div>
        <h1 className="ws-headline ws-headline-sm" style={{ marginBottom: '2rem' }}>{slide.headline}</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem', maxWidth: '600px' }}>
          {slide.questions.map((q, i) => (
            <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'baseline' }}>
              <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.5rem', color: '#3A3A3A', flexShrink: 0 }}>0{i + 1}</span>
              <span style={{ fontSize: 'clamp(0.78rem, 1.2vw, 0.92rem)', color: '#EDEDE8', lineHeight: 1.6, fontStyle: 'italic' }}>{q}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '2.5rem', fontFamily: 'ui-monospace, monospace', fontSize: '0.44rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#1a1a1a' }}>
          follow up: "tell me more." / "what makes you say that?" / "how long has that been the case?"
        </div>
      </div>
    );
  }

  if (slide.type === 'reflection') return <ReflectionSlide />;

  if (slide.type === 'recompo') {
    const objectives = [
      'build muscle in the areas that need more shape',
      'reduce body fat over time',
      'improve strength and performance',
      'improve proportions',
      'track progress beyond the scale',
    ];
    return (
      <div className="ws-slide">
        <h1 className="ws-headline ws-headline-sm" style={{ marginBottom: '2rem' }}>
          build the frame.<br />reduce the excess.
        </h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', maxWidth: '540px', marginBottom: '2rem' }}>
          {objectives.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.7rem', alignItems: 'baseline', padding: '0.55rem 0', borderBottom: '1px solid #0d0d0d' }}>
              <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.5rem', color: GREEN, flexShrink: 0 }}>✓</span>
              <span style={{ fontSize: 'clamp(0.78rem, 1.2vw, 0.92rem)', color: '#EDEDE8', lineHeight: 1.5 }}>{item}</span>
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid #141414', paddingTop: '1.5rem', maxWidth: '540px' }}>
          <p style={{ fontSize: 'clamp(0.72rem, 1.1vw, 0.85rem)', color: '#5A5A5A', lineHeight: 1.75, marginBottom: '0.7rem' }}>
            what most people call toning is two things happening together — building muscle where your body needs more shape, and reducing fat over time to reveal it.
          </p>
          <p style={{ fontSize: 'clamp(0.68rem, 1vw, 0.8rem)', color: '#3A3A3A', lineHeight: 1.75, fontStyle: 'italic' }}>
            "the goal is body recomposition. the exact rate will depend on training history, nutrition, recovery, and consistency."
          </p>
        </div>
      </div>
    );
  }

  if (slide.type === 'overthink') {
    const problems = [
      'too many workout options',
      'too many diet opinions',
      'constantly changing the plan',
      'not knowing if progress is happening',
      'feeling behind before starting',
      'stress replacing action',
    ];
    const solutions = [
      'one training plan',
      'one nutrition structure',
      'one weekly focus',
      'one place to track progress',
      'direct feedback from the coach',
    ];
    return (
      <div className="ws-slide">
        <h1 className="ws-headline ws-headline-sm" style={{ marginBottom: '2rem' }}>overthinking is<br />stealing your execution.</h1>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3vw', maxWidth: '660px', marginBottom: '2.5rem' }}>
          <div>
            <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.44rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#3A3A3A', marginBottom: '1rem' }}>the problem</div>
            {problems.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.6rem', alignItems: 'baseline', marginBottom: '0.55rem' }}>
                <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.5rem', color: '#3A3A3A', flexShrink: 0 }}>—</span>
                <span style={{ fontSize: 'clamp(0.65rem, 1vw, 0.78rem)', color: '#5A5A5A', lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.44rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: GREEN, marginBottom: '1rem' }}>the solution</div>
            {solutions.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.6rem', alignItems: 'baseline', marginBottom: '0.55rem' }}>
                <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.5rem', color: GREEN, flexShrink: 0 }}>✓</span>
                <span style={{ fontSize: 'clamp(0.65rem, 1vw, 0.78rem)', color: '#EDEDE8', lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ borderTop: '1px solid #141414', paddingTop: '1.2rem', maxWidth: '540px' }}>
          <p style={{ fontSize: 'clamp(0.82rem, 1.3vw, 1rem)', color: '#EDEDE8', lineHeight: 1.7, fontWeight: 200, fontStyle: 'italic' }}>
            "you do not need to know everything. you need to know what to do next."
          </p>
        </div>
      </div>
    );
  }

  if (slide.type === 'holistic') {
    const factors = ['training', 'nutrition', 'sleep', 'recovery', 'stress', 'digestion', 'consistency'];
    return (
      <div className="ws-slide">
        <h1 className="ws-headline ws-headline-sm" style={{ marginBottom: '2rem', maxWidth: '600px' }}>
          the workout is<br />only one part.
        </h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem 1.2rem', maxWidth: '560px', marginBottom: '2.5rem' }}>
          {factors.map((f, i) => (
            <span key={i} style={{ fontSize: 'clamp(0.88rem, 1.4vw, 1.1rem)', fontWeight: 200, color: i === 0 ? '#EDEDE8' : `hsl(0,0%,${30 + i * 8}%)`, letterSpacing: '-0.01em' }}>{f}</span>
          ))}
        </div>
        <div style={{ borderTop: '1px solid #141414', paddingTop: '1.5rem', maxWidth: '540px' }}>
          <p style={{ fontSize: 'clamp(0.72rem, 1.1vw, 0.85rem)', color: '#5A5A5A', lineHeight: 1.75, marginBottom: '0.7rem' }}>
            the workout creates the stimulus. the rest of your week determines whether your body actually recovers and adapts.
          </p>
          <p style={{ fontSize: 'clamp(0.68rem, 1vw, 0.8rem)', color: '#3A3A3A', lineHeight: 1.75 }}>
            the training plan tells you what to do. the full system helps make sure you keep doing it.
          </p>
        </div>
      </div>
    );
  }

  if (slide.type === 'nutrition-phil') {
    const principles = [
      'adequate protein',
      'whole and minimally processed foods',
      'fruit and quality carbohydrate sources',
      'foods he digests well',
      'meal timing around training',
      'hydration',
      'repeatable meals',
      'grocery planning',
      'appropriate calorie structure when useful',
    ];
    return (
      <div className="ws-slide">
        <h1 className="ws-headline ws-headline-sm" style={{ marginBottom: '2rem' }}>simple nutrition<br />for muscle and body composition.</h1>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem 3rem', maxWidth: '580px', marginBottom: '2rem' }}>
          {principles.map((p, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.55rem', alignItems: 'baseline' }}>
              <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.5rem', color: GREEN, flexShrink: 0 }}>✓</span>
              <span style={{ fontSize: 'clamp(0.62rem, 0.9vw, 0.74rem)', color: '#EDEDE8', lineHeight: 1.5 }}>{p}</span>
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid #141414', paddingTop: '1.2rem', maxWidth: '520px' }}>
          <p style={{ fontSize: 'clamp(0.7rem, 1.05vw, 0.82rem)', color: '#5A5A5A', lineHeight: 1.75, fontStyle: 'italic', marginBottom: '0.5rem' }}>
            "we may use a calorie range if it helps manage body composition, but the plan will not require you to obsess over every gram."
          </p>
          <p style={{ fontSize: 'clamp(0.7rem, 1.05vw, 0.82rem)', color: '#3A3A3A', lineHeight: 1.75, fontStyle: 'italic' }}>
            "the goal is to eat in a way that supports muscle growth, fat loss, energy, digestion, and consistency."
          </p>
        </div>
      </div>
    );
  }

  if (slide.type === 'why-coach') {
    return (
      <div className="ws-slide" style={{ justifyContent: 'center', maxWidth: '70vw', margin: '0 auto', padding: '5vw 8vw' }}>
        <div className="ws-label">the coach</div>
        <h1 className="ws-headline ws-headline-sm" style={{ marginBottom: '2rem' }}>why i coach this way.</h1>
        <div style={{ maxWidth: '520px' }}>
          <p style={{ fontSize: 'clamp(0.8rem, 1.3vw, 1rem)', color: '#EDEDE8', lineHeight: 1.8, marginBottom: '1.2rem' }}>
            when i simplified my approach — removed the noise, trained with intention, and built a nutrition structure that was repeatable — my body actually responded. the confusion was the problem, not the effort.
          </p>
          <p style={{ fontSize: 'clamp(0.8rem, 1.3vw, 1rem)', color: '#5A5A5A', lineHeight: 1.8, marginBottom: '1.2rem' }}>
            that experience shaped my philosophy.
          </p>
          <p style={{ fontSize: 'clamp(0.72rem, 1.1vw, 0.85rem)', color: '#3A3A3A', lineHeight: 1.75 }}>
            but your plan will still be built around how your body responds — not how mine did.
          </p>
        </div>
      </div>
    );
  }

  if (slide.type === 'demo') {
    return (
      <div className="ws-slide ws-demo-slide">
        <div style={{ display: 'inline-block' }}>
          <div className="ws-demo-badge">client portal</div>
        </div>
        <h1 className="ws-headline ws-headline-sm" style={{ marginTop: '1rem' }}>your system.</h1>
        <p className="ws-body ws-body-spaced">everything in one place. no guessing what to do next.</p>
        <div className="ws-demo-instruction">→ open /portal/joshua-demo</div>
      </div>
    );
  }

  if (slide.type === 'included') {
    const items = [
      'personalized training plan',
      'proportion-focused exercise selection',
      'personalized nutrition structure',
      'grocery guidance',
      'daily missions',
      'progress tracking',
      'daily check-ins',
      'weekly reviews',
      'direct messaging',
      'form feedback',
      'program adjustments',
      'recovery guidance',
      'personalized dashboard',
      'end-of-phase roadmap',
    ];
    return (
      <div className="ws-slide">
        <div className="ws-label">your complete coaching system</div>
        <h1 className="ws-headline ws-headline-sm" style={{ marginBottom: '1.8rem' }}>everything you need.<br />nothing random.</h1>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.45rem 3rem', maxWidth: '580px', marginBottom: '1.8rem' }}>
          {items.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.55rem', alignItems: 'baseline' }}>
              <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.5rem', color: GREEN, flexShrink: 0 }}>✓</span>
              <span style={{ fontSize: 'clamp(0.65rem, 1vw, 0.78rem)', color: '#EDEDE8', lineHeight: 1.5 }}>{item}</span>
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid #141414', paddingTop: '1.2rem', maxWidth: '520px' }}>
          <p style={{ fontSize: 'clamp(0.72rem, 1.1vw, 0.85rem)', color: '#5A5A5A', fontStyle: 'italic', lineHeight: 1.7 }}>
            no more trying to piece your transformation together from random information.
          </p>
        </div>
      </div>
    );
  }

  if (slide.type === 'fit-who') {
    return (
      <div className="ws-slide" style={{ justifyContent: 'center', maxWidth: '72vw', margin: '0 auto', padding: '4vw 8vw' }}>
        <div className="ws-label">the read</div>
        <h1 className="ws-headline ws-headline-sm" style={{ marginBottom: '2.5rem' }}>you do not need<br />more information.</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', maxWidth: '520px' }}>
          {[
            `"based on what you told me, i think you are a good fit for this."`,
            `"you already know what you want."`,
            `"the issue is that you have not had one clear system telling you exactly how to build it."`,
            `"i do not think you need more motivation. i think you need less confusion."`,
            `"the real question is whether you are willing to follow one precise system long enough for your body to respond."`,
          ].map((line, i) => (
            <p key={i} style={{ fontSize: 'clamp(0.78rem, 1.2vw, 0.92rem)', color: i < 2 ? '#EDEDE8' : '#5A5A5A', lineHeight: 1.7, fontStyle: 'italic', margin: 0 }}>{line}</p>
          ))}
        </div>
        <div style={{ marginTop: '2rem', borderTop: '1px solid #141414', paddingTop: '1.2rem' }}>
          <p style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.48rem', letterSpacing: '0.12em', color: '#3A3A3A' }}>
            stop trying to figure out everything. follow one system long enough to change.
          </p>
        </div>
      </div>
    );
  }

  if (slide.type === 'pre-price') {
    return (
      <div className="ws-slide" style={{ justifyContent: 'center', maxWidth: '70vw', margin: '0 auto', padding: '5vw 8vw' }}>
        <p style={{ fontSize: 'clamp(0.72rem, 1.05vw, 0.85rem)', color: '#3A3A3A', marginBottom: '2rem' }}>based on everything i showed you —</p>
        <h1 className="ws-headline" style={{ marginBottom: '2.5rem', lineHeight: 1.2 }}>
          does this feel like the kind of structure you have been missing?
        </h1>
        <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.46rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#1a1a1a' }}>
          wait for his answer. if yes — advance. if unsure — go back and clarify.
        </div>
      </div>
    );
  }

  if (slide.type === 'investment') {
    return (
      <div className="ws-slide" style={{ justifyContent: 'center', maxWidth: '70vw', margin: '0 auto', padding: '4vw 8vw' }}>
        <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.52rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#3A3A3A', marginBottom: '0.5rem' }}>vveritas*</div>
        <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.48rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#3A3A3A', marginBottom: '2.5rem' }}>personalized coaching</div>
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.5rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#3A3A3A', marginBottom: '0.8rem' }}>monthly investment</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem' }}>
            <span style={{ fontSize: 'clamp(3.5rem, 7vw, 6rem)', fontWeight: 200, letterSpacing: '-0.05em', color: '#EDEDE8', lineHeight: 1 }}>{fmt(PRICE_MO)}</span>
            <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.5rem', color: '#3A3A3A', letterSpacing: '0.15em' }}>/ month</span>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0', maxWidth: '420px', marginBottom: '2rem' }}>
          {[
            { label: 'billing',  val: 'monthly' },
            { label: 'start',    val: 'upon enrollment' },
            { label: 'includes', val: 'training, nutrition, dashboard, check-ins, messaging, adjustments' },
          ].map((row, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '7rem 1fr', gap: '1rem', alignItems: 'center', padding: '0.65rem 0', borderBottom: '1px solid #0d0d0d' }}>
              <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.44rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#3A3A3A' }}>{row.label}</span>
              <span style={{ fontSize: 'clamp(0.72rem, 1.1vw, 0.85rem)', color: '#EDEDE8', fontWeight: 200 }}>{row.val}</span>
            </div>
          ))}
        </div>
        <p style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.42rem', letterSpacing: '0.08em', color: '#2a2a2a', fontStyle: 'italic' }}>
          first payment activates onboarding and plan development.
        </p>
      </div>
    );
  }

  if (slide.type === 'close') {
    return (
      <div className="ws-slide">
        <h1 className="ws-headline" style={{ marginBottom: '2.5rem', maxWidth: '580px' }}>
          are you willing to follow one precise system long enough to change?
        </h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', maxWidth: '520px' }}>
          {[
            `[pause — wait for his answer. do not fill the silence.]`,
            `if yes → "good. let me pull up your enrollment page."`,
            `[open /enroll/joshua]`,
            `confirm preferred start date.`,
            `if hesitation → ask: "what is making you hesitate?" let him name it.`,
          ].map((line, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.65rem', alignItems: 'baseline' }}>
              <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.52rem', color: '#2a2a2a', flexShrink: 0 }}>—</span>
              <span style={{ fontSize: line.startsWith('[') ? '0.44rem' : 'clamp(0.72rem, 1.1vw, 0.85rem)', color: line.startsWith('[') ? '#2a2a2a' : '#5A5A5A', lineHeight: 1.5, fontFamily: line.startsWith('[') ? 'ui-monospace, monospace' : 'inherit', letterSpacing: line.startsWith('[') ? '0.04em' : 'inherit' }}>
                {line}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (slide.type === 'cta') {
    return (
      <div className="ws-slide" style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <div className="ws-mark" style={{ marginBottom: '2rem' }}>vveritas* coaching</div>
        <h1 className="ws-headline" style={{ marginBottom: '0.6rem', whiteSpace: 'pre-line' }}>{slide.headline}</h1>
        <p style={{ fontSize: 'clamp(1rem, 1.8vw, 1.4rem)', fontWeight: 200, color: '#EDEDE8', marginBottom: '2rem', letterSpacing: '-0.01em' }}>{slide.sub}</p>
        <p style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.52rem', letterSpacing: '0.2em', color: '#3A3A3A' }}>{slide.body}</p>
      </div>
    );
  }

  return null;
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function JoshuaPitch() {
  const [entered, setEntered]     = useState(false);
  const [idx, setIdx]             = useState(0);
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

  if (!entered) {
    return (
      <div className="ws-enter">
        <div className="ws-enter-inner">
          <div className="ws-enter-title">{`vveritas*\nbuilt for ${prospectName}.`}</div>
          <div className="ws-enter-sub">personalized coaching — assessment call</div>
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
