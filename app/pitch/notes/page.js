'use client';
import { useState } from 'react';

const NOTES = [
  {
    n: 1,
    title: 'built for Ron Blake.',
    note: 'Open with this on screen before the call starts. Let Ron see his name. That alone tells him this isn\'t a generic pitch — it was made for him. Don\'t say anything until he reacts.',
  },
  {
    n: 2,
    title: 'most people don\'t fail because they don\'t try.',
    note: 'Pause here. Let that land. This is Ron\'s reality — he\'s tried before. He knows this feeling. You\'re naming it without making him feel judged.',
  },
  {
    n: 3,
    title: 'this is not a workout plan.',
    note: 'The shift from "workout plan" to "operating system" is the key reframe. You\'re not selling sessions. You\'re selling a system that runs his health.',
  },
  {
    n: 4,
    title: 'what you told me.',
    note: 'Read these back to him slowly. Every person wants to feel heard. This moment — seeing his own words on the screen — is what makes this feel personal. Let him say "yes, that\'s me."',
  },
  {
    n: 5,
    title: 'everything lives in one place.',
    note: 'Transition to screen sharing the portal now. Say: "let me show you what that actually looks like."',
  },
  {
    n: 6,
    title: 'today\'s mission.',
    note: 'Show the mission tab. Click through the tasks. Point out the streak counter and the self-mastery score. Ask him: "can you see yourself checking these off?" Let him interact mentally with it.',
  },
  {
    n: 7,
    title: 'one number. five pillars.',
    note: 'This is powerful. Most trainers only track workouts. You\'re tracking the whole person. Say: "your score right now is 62. over the next 12 weeks, we\'re going to move this number. every pillar goes up together."',
  },
  {
    n: 8,
    title: 'foundation phase.',
    note: 'Show the fitness tab. Walk through Workout A. Read one of the exercise coaching notes out loud — "control the lowering phase — 2 seconds down." That detail tells him you\'re paying attention to HOW he trains, not just what he does.',
  },
  {
    n: 9,
    title: 'quality over volume.',
    note: 'This is where you differentiate yourself from every trainer who just destroyed someone in their first session. You\'re building a foundation. That\'s what he needs — and it\'s what will actually get him results.',
  },
  {
    n: 10,
    title: 'today\'s standards.',
    note: 'Show the nutrition tab. Point out the checklist with progress numbers (130/150g protein, 2/3 meals, 70/90oz water). Say: "this week we\'re not chasing perfect numbers. we\'re building the habit of showing up." Read the coach\'s focus note.',
  },
  {
    n: 11,
    title: 'your list. every week.',
    note: 'This one always gets a reaction. People don\'t expect the grocery list. Say: "you never have to think about what to buy. it\'s already done." Tap a few items so he sees they can be checked off.',
  },
  {
    n: 12,
    title: '221 lbs. goal: 195.',
    note: 'Show the progress tab. Point to the weight goal bar. Show the photo placeholders — say: "week 1 we take your baseline photo. week 12 we look at it side by side. that transformation is yours." Let that visual land.',
  },
  {
    n: 13,
    title: 'daily accountability.',
    note: 'Show the check-in tab. Walk through the questions: did you complete your workout? hit your protein? complete your walk? Then the sliders for energy and confidence. Say: "this is how I stay ahead of problems — I\'m not waiting for you to tell me something is off."',
  },
  {
    n: 14,
    title: 'this is what real coaching looks like.',
    note: 'This is the moment. Read the final message out loud — slowly. Let him feel what it would be like to receive that. Most people have never had a coach who checks in like this. This is unlimited messaging. Real communication.',
  },
  {
    n: 15,
    title: 'wednesday. 6:00 pm.',
    note: 'This is the premium experience. You\'re not just showing up to count reps — you\'re building the entire system around him. The in-person sessions are supported by everything else. That\'s what makes this different.',
  },
  {
    n: 16,
    title: 'choose your level of coaching.',
    note: 'This is the transition from "here\'s what the system looks like" to "here\'s how you invest in yourself." Let the portal demo land first — then come back here. Don\'t rush.',
  },
  {
    n: 17,
    title: 'elite transformation.',
    note: 'Lead with this. Let him see the top of the range first. Don\'t explain it away — just let it land. Some clients want full immersion. If he reacts to the price, that\'s when you transition to hybrid.',
  },
  {
    n: 18,
    title: 'hybrid coaching. (recommended)',
    note: 'This is Ron\'s package. Point to it. Say: "this is what we\'ve been looking at today — and honestly, this is what I\'d recommend for where you are right now." One session a week in person plus everything else in the system.',
  },
  {
    n: 19,
    title: 'remote coaching.',
    note: 'This is the entry point. Show it last so it feels accessible by comparison. Don\'t undersell it — it\'s still a complete system. But for someone who came in wanting in-person, this is the "if budget is a constraint" option.',
  },
  {
    n: 20,
    title: 'this is not personal training.',
    note: 'Don\'t say anything negative about other trainers. Just let the contrast speak. Two items vs eleven. They\'ll do the math. Say: "you\'re not paying for time in the gym. you\'re investing in a complete system."',
  },
  {
    n: 21,
    title: 'flexible payment options.',
    note: 'Price is not the obstacle — uncertainty is. When you give them payment options, you remove the last reason to say "let me think about it." Say: "whatever structure works best for you, we can make it work."',
  },
  {
    n: 22,
    title: 'the only thing left is the decision.',
    note: 'Do not pitch. Do not oversell. Ask that question and then go silent. Let Ron talk. Whatever he says next is your close. If he asks about price — you\'re ready. If he has objections — address them. If he says "let\'s do it" — great.',
  },
];

export default function NotesPage() {
  const [active, setActive] = useState(0);
  const current = NOTES[active];

  return (
    <div style={{
      background: '#000',
      minHeight: '100dvh',
      fontFamily: 'Inter, -apple-system, sans-serif',
      fontWeight: 300,
      color: '#EDEDE8',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* header */}
      <div style={{
        padding: '1.2rem 1.4rem 0.8rem',
        borderBottom: '1px solid #141414',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <span style={{ fontSize: '0.78rem', color: '#3A3A3A', letterSpacing: '0.02em' }}>vveritas* notes</span>
        <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.6rem', letterSpacing: '0.2em', color: '#3A3A3A' }}>
          {active + 1} / {NOTES.length}
        </span>
      </div>

      {/* slide indicator dots */}
      <div style={{
        display: 'flex',
        gap: '4px',
        padding: '0.8rem 1.4rem',
        overflowX: 'auto',
        scrollbarWidth: 'none',
        borderBottom: '1px solid #0f0f0f',
      }}>
        {NOTES.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{
              width: '22px',
              height: '22px',
              borderRadius: '2px',
              border: '1px solid',
              borderColor: i === active ? '#EDEDE8' : '#1a1a1a',
              background: i === active ? '#EDEDE8' : 'transparent',
              color: i === active ? '#000' : '#3A3A3A',
              fontFamily: 'ui-monospace, monospace',
              fontSize: '0.5rem',
              cursor: 'pointer',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* active note */}
      <div style={{ flex: 1, padding: '1.5rem 1.4rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{
          fontFamily: 'ui-monospace, monospace',
          fontSize: '0.52rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: '#3A3A3A',
        }}>
          slide {current.n}
        </div>
        <div style={{
          fontSize: '0.82rem',
          color: '#5A5A5A',
          letterSpacing: '-0.01em',
          lineHeight: 1.4,
        }}>
          "{current.title}"
        </div>
        <div style={{
          fontSize: '1rem',
          lineHeight: 1.75,
          color: '#EDEDE8',
          flex: 1,
        }}>
          {current.note}
        </div>
      </div>

      {/* prev / next */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        borderTop: '1px solid #141414',
      }}>
        <button
          onClick={() => setActive(i => Math.max(i - 1, 0))}
          disabled={active === 0}
          style={{
            padding: '1.1rem',
            background: 'none',
            border: 'none',
            borderRight: '1px solid #141414',
            color: active === 0 ? '#1a1a1a' : '#5A5A5A',
            fontFamily: 'inherit',
            fontSize: '0.85rem',
            cursor: active === 0 ? 'default' : 'pointer',
          }}
        >
          ← prev
        </button>
        <button
          onClick={() => setActive(i => Math.min(i + 1, NOTES.length - 1))}
          disabled={active === NOTES.length - 1}
          style={{
            padding: '1.1rem',
            background: 'none',
            border: 'none',
            color: active === NOTES.length - 1 ? '#1a1a1a' : '#EDEDE8',
            fontFamily: 'inherit',
            fontSize: '0.85rem',
            cursor: active === NOTES.length - 1 ? 'default' : 'pointer',
          }}
        >
          next →
        </button>
      </div>
    </div>
  );
}
