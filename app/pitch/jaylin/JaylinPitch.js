'use client';
import { useState, useEffect } from 'react';

const prospectName = 'Jaylin';
const PRICE_MO = 497;

const fmt = n => n ? `$${Number(n).toLocaleString()}` : '[ set before call ]';
const GREEN = '#4a8c6a';

// ── SLIDES ────────────────────────────────────────────────────────────────────
const SLIDES = [
  // 1
  {
    type: 'hero',
    headline: `built for ${prospectName}.`,
    sub: 'you have the foundation. now we optimize the system.',
    body: 'personalized fitness, nutrition, recovery, mindset, and accountability — all working together.',
    notes: `This is on screen when the call opens. Let Jaylin see his name. Say nothing immediately. When he acknowledges it, begin: "Jaylin, I went through your page before this call, and from what I can see, you are not somebody starting from nothing. You already have a foundation. What I want to figure out today is where you are trying to go, what is currently slowing you down, and whether my system actually fits that. I am not going to assume I know your goals just from Instagram, so I want you doing most of the talking first." Then ask: "What made you take this call now?"`,
  },
  // 2
  {
    type: 'fit-frame',
    notes: `Set the tone clearly. Say: "This is not a standard pitch. I'm going to ask you questions and listen. I want to understand your situation before I prescribe anything." Pause. "Based on what I have seen so far, I believe you have real potential to be optimized — not rebuilt from scratch. But I want to confirm that with you." Pause. "So let's figure out where you actually are, where you want to go, and whether this makes sense." Ask: "Sound fair?" Wait for him to agree.`,
  },
  // 3
  {
    type: 'discovery',
    label: 'part 1 — goals',
    headline: 'where you are trying to go.',
    questions: [
      `"what is the main result you want physically right now?"`,
      `"what would you want to look, feel, or perform like three months from now?"`,
      `"what part of your current physique or performance are you least satisfied with?"`,
    ],
    notes: `These three questions set the target. Don't lead him toward an answer — let him define what he actually wants. After each answer, follow up: "tell me more." or "what makes that the priority?" If he mentions a body part, strength goal, or performance target — that becomes the anchor for the rest of the call. Write down the exact words he uses. You will reflect them back in the reflection slide.`,
  },
  // 4
  {
    type: 'discovery',
    label: 'part 2 — current approach',
    headline: 'where you are right now.',
    questions: [
      `"what does your current training week look like?"`,
      `"what does a normal day of eating look like?"`,
      `"how are your sleep, energy, digestion, and recovery right now?"`,
    ],
    notes: `You are mapping the current state. Listen for: frequency, consistency, structure. A strong trainer with inconsistent nutrition is a different prescription than someone whose training is the problem. If he describes a good training schedule, ask: "how consistent is that really week to week?" That usually reveals the actual gap. The sleep/energy/digestion question often uncovers recovery issues he hasn't named yet.`,
  },
  // 5
  {
    type: 'discovery',
    label: 'part 3 — bottleneck + readiness',
    headline: 'what is actually in the way.',
    questions: [
      `"what do you believe is holding you back most — training, nutrition, consistency, recovery, or not having a clear structure?"`,
      `"what have you tried before that did not give you the result you expected?"`,
      `"how much structure and accountability do you realistically want from a coach?"`,
      `"what would make this coaching experience feel completely worth it to you?"`,
    ],
    notes: `The bottleneck question is critical. Let him identify it himself — do not name it for him. The "what have you tried" question reveals his history and helps you avoid pitching him something he already dismissed. The accountability question tells you how hands-on to make the prescription. The last question is the close seed — his answer becomes your close. Write down the exact phrase. You will use it when revealing the investment.`,
  },
  // 6
  {
    type: 'reflection',
    notes: `Say: "Let me make sure I understand you correctly before I show you anything." Summarize back everything he said using his exact words — not your interpretation. Go through each category on screen and fill in what he told you. After each one, confirm: "Is that accurate?" or "Am I understanding that right?" This step is rare in fitness calls. It signals that you actually listened, which builds more trust than any slide you could show him.`,
  },
  // 7
  {
    type: 'holistic',
    notes: `Say: "I want to explain how I look at this before I show you the system." Pause. "I take a holistic approach — but I do not mean vague wellness advice." Go through the factors on screen one by one. Say: "I am not only looking at what happens during the workout. I am looking at whether the rest of your week supports the result." Then: "A lot of highly processed foods are easy to overconsume and may not support your digestion, appetite, energy, or performance as well as a simpler whole-food structure. We identify which foods actually work well for your body rather than following random internet rules." Pause. "That is why the system covers more than just what you do in the gym."`,
  },
  // 8
  {
    type: 'nutrition-phil',
    notes: `Say: "My nutrition philosophy is simple. Not restrictive — simple." Walk through each principle on screen. Say: "We may use calorie or macro ranges when they help, but numbers are tools — not the entire philosophy." Then: "The default goal is to build a repeatable way of eating that supports your body composition, strength, energy, and recovery. Something you can sustain." Ask: "Does that approach feel manageable to you?"`,
  },
  // 9
  {
    type: 'why-coach',
    notes: `Keep this brief. Say: "I coach this way because of what I personally experienced when I simplified my approach." Read the slide. Then: "That experience shaped my philosophy. But your plan will still be built around how your body actually responds — not how mine did." Pause. "Now let me show you what the system actually looks like in practice."`,
  },
  // 10
  {
    type: 'social-proof',
    notes: `Walk through each category. On Tina, say carefully: "One client, Tina, improved her physical habits and her mind-body connection while also building a successful nail business. She later reached six figures and personally credits part of her growth to the discipline and confidence she built through the coaching." Then add: "I'm not claiming fitness made her money. I'm saying the discipline carried over." Let the point land. Individual outcomes vary — don't over-promise.`,
  },
  // 11
  {
    type: 'demo',
    notes: `Open /portal/jaylin-demo. Walk through each tab at your own pace. Show: Today (point to each task and the coach focus note), Fitness (walk through the training split, point to one exercise and its rep range and form note), Nutrition (show the protein target, food checklist, meal structure), Mindset (read the weekly standard aloud, point to the coach message), Progress (point to the baseline tracking), Check-In (walk through the daily questions), Messages (read the coach message slowly and deliberately). After the last tab, ask: "Have you ever seen a fitness system that covers all of these areas in one place?" Stop. Let him answer.`,
  },
  // 12
  {
    type: 'included',
    notes: `Walk through the list. Don't rush. Say: "Not random information. One clear system built around your body, goals, and life." Then: "Every single thing on this list is active every month. It is not a PDF package. It is live coaching that adjusts based on how you respond." Then advance to fit positioning.`,
  },
  // 13
  {
    type: 'fit-who',
    notes: `Say: "From what I saw before the call, I already believed you had a foundation." Pause. "After hearing your goals, I think the opportunity is not to start you over. It is to organize and optimize what you are already capable of." Pause. "I think you could be a strong fit because you are not asking me to manufacture ambition. The ambition already appears to be there." Pause. "The real question is whether you are willing to follow one precise system long enough to see what it can produce." Let him respond.`,
  },
  // 14
  {
    type: 'pre-price',
    notes: `Ask: "Based on everything I showed you — the system, the portal, the approach to training, nutrition, mindset, and recovery — does this feel like the structure you were actually looking for?" Stop. Let him answer. If yes, advance. If unsure, go back and address what is unclear. Do not reveal the investment until he confirms the system feels right.`,
  },
  // 15
  {
    type: 'investment',
    notes: `Say: "Based on what you told me, I do not think you need more random fitness information." Pause. "You need one personalized system that connects your training, nutrition, recovery, mindset, and accountability." Pause. "The investment for that level of coaching is $497 per month." Pause. Let it land. Then: "That includes the dashboard, personalized training and nutrition structure, direct communication, check-ins, reviews, form feedback, and ongoing adjustments every month." Then ask: "Does that structure match the level of support you told me you are looking for?" Stop talking.`,
  },
  // 16
  {
    type: 'close',
    notes: `Deliver this with complete calm. After the question — stop talking. Whatever he says next is the close. If yes: "Good. Let me pull up your enrollment page." Open /enroll/jaylin. Confirm start date. If he hesitates, go to objections and ask: "What is making you hesitate?" Let him name it. Address it from that point.`,
  },
  // 17
  {
    type: 'cta',
    headline: 'you do not need to start over.',
    sub: 'you need to turn your foundation into a system.',
    body: 'vveritascoaching.com/enroll/jaylin',
    notes: `Do not pitch. Do not oversell. Ask: "What questions do you have before we move forward?" Go silent. Let him talk. Whatever he says next is your close. Open the enrollment page. Confirm his start date.`,
  },
];

// ── REFLECTION SLIDE ──────────────────────────────────────────────────────────
function ReflectionSlide() {
  const fields = [
    { key: 'physicalGoal',      label: 'primary physical goal' },
    { key: 'trainingPattern',   label: 'current training pattern' },
    { key: 'nutritionPattern',  label: 'current nutrition pattern' },
    { key: 'biggestBottleneck', label: 'biggest bottleneck' },
    { key: 'recoveryConcern',   label: 'recovery concern' },
    { key: 'accountabilityNeed',label: 'accountability need' },
    { key: 'successLooksLike',  label: 'what success looks like to him' },
  ];
  const [data, setData] = useState(Object.fromEntries(fields.map(f => [f.key, ''])));

  return (
    <div className="ws-slide">
      <div className="ws-label">the diagnosis</div>
      <h1 className="ws-headline ws-headline-sm" style={{ marginBottom: '1.8rem' }}>what i'm hearing.</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', maxWidth: '620px' }}>
        {fields.map(f => (
          <div key={f.key} style={{ display: 'grid', gridTemplateColumns: '11rem 1fr', gap: '0.8rem', alignItems: 'center', paddingBottom: '0.6rem', borderBottom: '1px solid #0a0a0a' }}>
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
        summarize his own language back to him — not your interpretation.
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
        <h1 className="ws-headline" style={{ marginBottom: '2.5rem' }}>this is<br />an assessment.</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', maxWidth: '480px', marginBottom: '2.5rem' }}>
          {[
            'i reviewed your page before this call.',
            'from the outside, it looks like you already have a foundation.',
            'i want to confirm that with you before i prescribe anything.',
            'you will do most of the talking.',
          ].map((line, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.8rem', alignItems: 'baseline' }}>
              <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.5rem', color: '#3A3A3A', flexShrink: 0 }}>—</span>
              <p style={{ fontSize: 'clamp(0.8rem, 1.3vw, 1rem)', color: '#5A5A5A', lineHeight: 1.75, margin: 0 }}>{line}</p>
            </div>
          ))}
        </div>
        <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.5rem', letterSpacing: '0.25em', color: '#3A3A3A' }}>listen. diagnose. reflect. prescribe.</div>
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

  if (slide.type === 'holistic') {
    const factors = ['training', 'nutrition', 'sleep', 'digestion', 'recovery', 'stress', 'consistency'];
    return (
      <div className="ws-slide">
        <h1 className="ws-headline ws-headline-sm" style={{ marginBottom: '2rem', maxWidth: '600px' }}>
          your body does not respond<br />to training in isolation.
        </h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem 1.2rem', maxWidth: '560px', marginBottom: '2.5rem' }}>
          {factors.map((f, i) => (
            <span key={i} style={{ fontSize: 'clamp(0.88rem, 1.4vw, 1.1rem)', fontWeight: 200, color: i === 0 ? '#EDEDE8' : `hsl(0,0%,${30 + i * 8}%)`, letterSpacing: '-0.01em' }}>{f}</span>
          ))}
        </div>
        <div style={{ borderTop: '1px solid #141414', paddingTop: '1.5rem', maxWidth: '540px' }}>
          <p style={{ fontSize: 'clamp(0.72rem, 1.1vw, 0.85rem)', color: '#5A5A5A', lineHeight: 1.75, marginBottom: '0.7rem' }}>
            the workout creates the stimulus. the rest of your lifestyle determines how well you recover, adapt, and repeat it.
          </p>
          <p style={{ fontSize: 'clamp(0.68rem, 1vw, 0.8rem)', color: '#3A3A3A', lineHeight: 1.75 }}>
            we identify which foods actually work well for your body rather than following random internet rules.
          </p>
        </div>
      </div>
    );
  }

  if (slide.type === 'nutrition-phil') {
    const principles = [
      'adequate protein',
      'high-quality whole and minimally processed foods',
      'fruit and quality carbohydrate sources',
      'foods you actually digest well',
      'meal timing that supports training and recovery',
      'hydration',
      'repeatable meals',
      'grocery planning',
      'flexible calorie awareness when useful',
    ];
    return (
      <div className="ws-slide">
        <h1 className="ws-headline ws-headline-sm" style={{ marginBottom: '2rem' }}>simple food.<br />clear purpose.</h1>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem 3rem', maxWidth: '580px', marginBottom: '2rem' }}>
          {principles.map((p, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.55rem', alignItems: 'baseline' }}>
              <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.5rem', color: GREEN, flexShrink: 0 }}>✓</span>
              <span style={{ fontSize: 'clamp(0.62rem, 0.9vw, 0.74rem)', color: '#EDEDE8', lineHeight: 1.5 }}>{p}</span>
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid #141414', paddingTop: '1.2rem', maxWidth: '520px' }}>
          <p style={{ fontSize: 'clamp(0.7rem, 1.05vw, 0.82rem)', color: '#5A5A5A', lineHeight: 1.75, fontStyle: 'italic' }}>
            "we may use calorie or macro ranges when they help, but numbers are tools — not the entire philosophy."
          </p>
          <p style={{ fontSize: 'clamp(0.7rem, 1.05vw, 0.82rem)', color: '#3A3A3A', lineHeight: 1.75, marginTop: '0.5rem', fontStyle: 'italic' }}>
            "the default goal is to build a repeatable way of eating that supports body composition, strength, energy, and recovery."
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
            when i simplified my own nutrition, paid closer attention to food quality, trained with more intention, and improved recovery — i personally noticed better strength, body composition, energy, and consistency.
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

  if (slide.type === 'social-proof') {
    return (
      <div className="ws-slide">
        <h1 className="ws-headline ws-headline-sm" style={{ marginBottom: '2.5rem' }}>the result is bigger<br />than a workout.</h1>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3vw', maxWidth: '640px', marginBottom: '2rem' }}>
          <div>
            <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.46rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: GREEN, marginBottom: '1rem' }}>physical progress</div>
            {['improved body composition', 'increased strength', 'better consistency', 'improved confidence', 'more structured routines'].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.55rem', alignItems: 'baseline', marginBottom: '0.5rem' }}>
                <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.5rem', color: GREEN, flexShrink: 0 }}>✓</span>
                <span style={{ fontSize: 'clamp(0.65rem, 1vw, 0.78rem)', color: '#EDEDE8', lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.46rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#3A3A3A', marginBottom: '1rem' }}>life carryover</div>
            {['greater discipline', 'better follow-through', 'more confidence in other areas', 'stronger daily structure'].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.55rem', alignItems: 'baseline', marginBottom: '0.5rem' }}>
                <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.5rem', color: '#3A3A3A', flexShrink: 0 }}>—</span>
                <span style={{ fontSize: 'clamp(0.65rem, 1vw, 0.78rem)', color: '#5A5A5A', lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ borderTop: '1px solid #141414', paddingTop: '1.2rem', maxWidth: '560px' }}>
          <p style={{ fontSize: 'clamp(0.68rem, 1vw, 0.8rem)', color: '#3A3A3A', lineHeight: 1.75, fontStyle: 'italic', marginBottom: '0.4rem' }}>
            one client, Tina, improved her physical habits and mind-body connection while building a successful nail business. she later reached six figures and personally credits part of her growth to the discipline and confidence she developed.
          </p>
          <p style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.4rem', letterSpacing: '0.08em', color: '#1a1a1a' }}>
            individual outcomes vary. business and financial results depend on factors beyond fitness coaching.
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
        <p className="ws-body ws-body-spaced">everything in one place. walk through it now.</p>
        <div className="ws-demo-instruction">→ open /portal/jaylin-demo</div>
      </div>
    );
  }

  if (slide.type === 'included') {
    const items = [
      'personalized training plan',
      'personalized nutrition structure',
      'grocery framework',
      'recovery guidance',
      'mindset and consistency coaching',
      'daily check-ins',
      'weekly reviews',
      'direct messaging',
      'form review',
      'program adjustments',
      'progress tracking',
      'personalized dashboard',
    ];
    return (
      <div className="ws-slide">
        <div className="ws-label">your complete coaching system</div>
        <h1 className="ws-headline ws-headline-sm" style={{ marginBottom: '1.8rem' }}>what is included<br />every month.</h1>
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
            not random information. one clear system built around your body, goals, and life.
          </p>
        </div>
      </div>
    );
  }

  if (slide.type === 'fit-who') {
    return (
      <div className="ws-slide" style={{ justifyContent: 'center', maxWidth: '72vw', margin: '0 auto', padding: '4vw 8vw' }}>
        <div className="ws-label">the read</div>
        <h1 className="ws-headline ws-headline-sm" style={{ marginBottom: '2.5rem' }}>you already have<br />the foundation.</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', maxWidth: '520px' }}>
          {[
            `"based on what i saw before the call, i already believed you had a foundation."`,
            `"after hearing your goals, i think the opportunity is not to start you over."`,
            `"it is to organize and optimize what you are already capable of."`,
            `"i think you could be a strong fit — the ambition already appears to be there."`,
            `"the real question is whether you are willing to follow one precise system long enough to see what it can produce."`,
          ].map((line, i) => (
            <p key={i} style={{ fontSize: 'clamp(0.78rem, 1.2vw, 0.92rem)', color: i < 2 ? '#EDEDE8' : '#5A5A5A', lineHeight: 1.7, fontStyle: 'italic', margin: 0 }}>{line}</p>
          ))}
        </div>
        <div style={{ marginTop: '2rem', borderTop: '1px solid #141414', paddingTop: '1.2rem' }}>
          <p style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.48rem', letterSpacing: '0.12em', color: '#3A3A3A' }}>
            there is always another level of precision, structure, and execution.
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
          does this feel like the structure you were actually looking for?
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
            { label: 'billing', val: 'monthly' },
            { label: 'minimum', val: 'confirm before call' },
            { label: 'start',   val: 'upon enrollment' },
            { label: 'cancel',  val: 'confirm policy before call' },
          ].map((row, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '8rem 1fr', gap: '1rem', alignItems: 'center', padding: '0.65rem 0', borderBottom: '1px solid #0d0d0d' }}>
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
          are you willing to follow one precise system long enough to see what it can produce?
        </h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', maxWidth: '520px' }}>
          {[
            `[pause — wait for his answer. do not fill the silence.]`,
            `if yes → "good. let me pull up your enrollment page."`,
            `[open /enroll/jaylin]`,
            `confirm preferred start date.`,
            `if hesitation → ask: "what is making you hesitate?" let him name it.`,
          ].map((line, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.65rem', alignItems: 'baseline' }}>
              <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.52rem', color: '#2a2a2a', flexShrink: 0 }}>—</span>
              <span style={{ fontSize: 'clamp(0.72rem, 1.1vw, 0.85rem)', color: line.startsWith('[') ? '#2a2a2a' : '#5A5A5A', lineHeight: 1.5, fontFamily: line.startsWith('[') ? 'ui-monospace, monospace' : 'inherit', letterSpacing: line.startsWith('[') ? '0.04em' : 'inherit', fontSize: line.startsWith('[') ? '0.44rem' : undefined }}>
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
export default function JaylinPitch() {
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
