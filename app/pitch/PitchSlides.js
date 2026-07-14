'use client';
import { useState, useEffect } from 'react';

const SLIDES = [
  {
    type: 'hero',
    label: 'vveritas* coaching',
    headline: 'built for\nRon Blake.',
    body: 'this is what your life inside vveritas looks like.',
    notes: 'Open with this on screen before the call starts. Let Ron see his name. That alone tells him this isn\'t a generic pitch — it was made for him. Don\'t say anything until he reacts.',
  },
  {
    type: 'statement',
    headline: 'most people don\'t fail because they don\'t try.',
    body: 'they fail because nothing is organized, nothing is tracked, and there\'s nobody holding them accountable.',
    notes: 'Pause here. Let that land. This is Ron\'s reality — he\'s tried before. He knows this feeling. You\'re naming it without making him feel judged.',
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
    notes: 'Read these back to him slowly. Every person wants to feel heard. This moment — seeing his own words on the screen — is what makes this feel personal. Let him say "yes, that\'s me."',
  },
  {
    type: 'statement',
    label: 'the system',
    headline: 'everything lives in one place.',
    body: 'your workouts. your nutrition. your daily mission. your check-ins. your progress. all organized. all connected. all built for you.',
    notes: 'Transition to screen sharing the portal now. Say: "let me show you what that actually looks like."',
  },
  {
    type: 'demo',
    label: '01 — dashboard',
    headline: 'today\'s mission.',
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
    body: 'this score reflects how you\'re actually living — not just how hard you trained.',
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
    notes: 'This is where you differentiate yourself from every trainer who just destroyed someone in their first session. You\'re building a foundation. That\'s what he needs — and it\'s what will actually get him results.',
  },
  {
    type: 'demo',
    label: '04 — nutrition',
    headline: 'today\'s standards.',
    body: 'not counting every calorie. building habits that actually stick.',
    sub: 'protein. whole food meals. water. fruit. food quality.',
    notes: 'Show the nutrition tab. Point out the "today\'s standards" checklist with the progress numbers (130/150g protein, 2/3 meals, 70/90oz water). Say: "this week we\'re not chasing perfect numbers. we\'re building the habit of showing up." Read the coach\'s focus note.',
  },
  {
    type: 'split-list',
    label: '05 — grocery list',
    headline: 'your list. every week.',
    col1: { label: 'protein', items: ['ground beef', 'chicken breast', 'greek yogurt', 'eggs'] },
    col2: { label: 'everything else', items: ['apples · bananas · blueberries', 'rice · potatoes · oats', 'spinach · broccoli · peppers', 'butter · olive oil'] },
    notes: 'This one always gets a reaction. People don\'t expect the grocery list. Say: "you never have to think about what to buy. it\'s already done." Tap a few items so he sees they can be checked off.',
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
    sub: 'i see exactly how you\'re doing before you even message me.',
    notes: 'Show the check-in tab. Walk through the questions: did you complete your workout? hit your protein? complete your walk? Then the sliders for energy and confidence. Say: "this is how I stay ahead of problems — I\'m not waiting for you to tell me something is off."',
  },
  {
    type: 'messages',
    label: '08 — messages',
    headline: 'this is what real coaching looks like.',
    preview: [
      { from: 'coach', text: 'morning Ron. big focus today: get your workout done. don\'t skip breakfast. protein at every meal.' },
      { from: 'client', text: 'got it.' },
      { from: 'coach', text: 'you\'re doing exactly what I want to see. keep showing up, follow the plan, and trust the process.' },
    ],
    notes: 'This is the moment. Read the final message out loud — slowly. Let him feel what it would be like to receive that. Most people have never had a coach who checks in like this. This is unlimited messaging. Real communication.',
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
    notes: 'This is the premium experience. You\'re not just showing up to count reps — you\'re building the entire system around him. The in-person sessions are supported by everything else. That\'s what makes this different.',
  },
  {
    type: 'included',
    label: 'what you get',
    headline: 'everything in one place.',
    items: [
      'in-person sessions at merritt clubs',
      'personalized workout plan — updated as you progress',
      'daily nutrition standards + grocery list',
      'daily mission + task tracking',
      'progress tracking — weight, photos, strength',
      'daily check-ins',
      'unlimited messaging',
      'weekly review calls',
    ],
    notes: 'Let this list breathe. Don\'t rush through it. Every item is something a person would normally pay for separately — or not have at all. The value is obvious when you see it laid out.',
  },
  {
    type: 'cta',
    label: 'the decision',
    headline: 'the only thing left\nis the decision.',
    body: 'your goals are clear. the system is built. the results come from starting.',
    sub: 'what questions do you have before we move forward?',
    notes: 'Do not pitch. Do not oversell. Ask that question and then go silent. Let Ron talk. Whatever he says next is your close. If he asks about price — you\'re ready. If he has objections — address them. If he says "let\'s do it" — great.',
  },
];

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
          {slide.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
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
            <div key={i} style={{
              alignSelf: m.from === 'coach' ? 'flex-start' : 'flex-end',
              maxWidth: '80%',
            }}>
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

  if (slide.type === 'included') {
    return (
      <div className="ws-slide">
        <div className="ws-label">{slide.label}</div>
        <h1 className="ws-headline ws-headline-sm" style={{ marginBottom: '2rem' }}>{slide.headline}</h1>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem 4vw', maxWidth: '680px' }}>
          {slide.items.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.8rem', alignItems: 'baseline' }}>
              <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.6rem', color: '#4a8c6a', flexShrink: 0 }}>✓</span>
              <span style={{ fontSize: 'clamp(0.8rem, 1.3vw, 1rem)', color: '#EDEDE8', lineHeight: 1.5 }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

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
