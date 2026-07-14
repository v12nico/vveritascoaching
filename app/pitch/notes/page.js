'use client';
import { useState } from 'react';

const NOTES = [
  { n: 1, title: 'built for Ron Blake.', note: "Open with this on screen before the call starts. Let Ron see his name. That alone tells him this isn't a generic pitch — it was made for him. Don't say anything until he reacts." },
  { n: 2, title: "most people don't fail because they don't try.", note: "Pause here. Let that land. This is Ron's reality — he's tried before. He knows this feeling. You're naming it without making him feel judged." },
  { n: 3, title: 'this is not a workout plan.', note: 'The shift from "workout plan" to "operating system" is the key reframe. You\'re not selling sessions. You\'re selling a system that runs his health.' },
  { n: 4, title: 'what you told me.', note: 'Read these back to him slowly. Every person wants to feel heard. This moment — seeing his own words on the screen — is what makes this feel personal. Let him say "yes, that\'s me."' },
  { n: 5, title: 'everything lives in one place.', note: 'Transition to screen sharing the portal now. Say: "let me show you what that actually looks like."' },
  { n: 6, title: "today's mission.", note: 'Show the mission tab. Click through the tasks. Point out the streak counter and the self-mastery score. Ask him: "can you see yourself checking these off?" Let him interact mentally with it.' },
  { n: 7, title: 'one number. five pillars.', note: 'This is powerful. Most trainers only track workouts. You\'re tracking the whole person. Say: "your score right now is 62. over the next 12 weeks, we\'re going to move this number. every pillar goes up together."' },
  { n: 8, title: 'foundation phase.', note: 'Show the fitness tab. Walk through Workout A. Read one of the exercise coaching notes out loud — "control the lowering phase — 2 seconds down." That detail tells him you\'re paying attention to HOW he trains, not just what he does.' },
  { n: 9, title: 'quality over volume.', note: "This is where you differentiate yourself from every trainer who just destroyed someone in their first session. You're building a foundation. That's what he needs — and it's what will actually get him results." },
  { n: 10, title: "today's standards.", note: "Show the nutrition tab. Point out the checklist with progress numbers (130/150g protein, 2/3 meals, 70/90oz water). Say: \"this week we're not chasing perfect numbers. we're building the habit of showing up.\" Read the coach's focus note." },
  { n: 11, title: 'your list. every week.', note: "This one always gets a reaction. People don't expect the grocery list. Say: \"you never have to think about what to buy. it's already done.\" Tap a few items so he sees they can be checked off." },
  { n: 12, title: '221 lbs. goal: 195.', note: 'Show the progress tab. Point to the weight goal bar. Show the photo placeholders — say: "week 1 we take your baseline photo. week 12 we look at it side by side. that transformation is yours." Let that visual land.' },
  { n: 13, title: 'daily accountability.', note: "Show the check-in tab. Walk through the questions: did you complete your workout? hit your protein? complete your walk? Then the sliders for energy and confidence. Say: \"this is how I stay ahead of problems — I'm not waiting for you to tell me something is off.\"" },
  { n: 14, title: 'this is what real coaching looks like.', note: "This is the moment. Read the final message out loud — slowly. Let him feel what it would be like to receive that. Most people have never had a coach who checks in like this. This is unlimited messaging. Real communication." },
  { n: 15, title: 'wednesday. 6:00 pm.', note: "This is the premium experience. You're not just showing up to count reps — you're building the entire system around him. The in-person sessions are supported by everything else. That's what makes this different." },
  { n: 16, title: 'choose your level of access.', note: "Reframe before you show the packages. You're not selling three different products. You're selling three levels of access to the same system. Say: \"the real question isn't which package — it's how much in-person coaching you want each week.\"" },
  { n: 17, title: 'elite transformation — maximum hands-on coaching.', note: "Don't rush past this slide. Let him see the full scope of what \"elite\" means. Say: \"this is what it looks like when I'm with you three times a week. everything tracked, everything personalized, no guessing.\" Show price after the features land." },
  { n: 18, title: 'hybrid coaching — the ideal balance.', note: "One session a week is enough to correct form, push performance, and stay accountable — with the full system running every other day. Say: \"one day a week I'm with you. every other day, the system has you covered.\"" },
  { n: 19, title: 'remote coaching — complete coaching, full flexibility.', note: "Present this as a continuation option, not a downgrade. Say: \"if your schedule changes, you move, or you prefer training on your own — you don't lose the system. everything stays the same except we meet virtually. the quality of coaching doesn't change. the access does.\"" },
  { n: 20, title: 'every level. same system.', note: "This is the most important slide in the package section. Every row with three checkmarks reinforces that coaching quality doesn't change — only the access does. Let him scan the whole table. Then point to the in-person row and say: \"that's the only real difference.\"" },
  { n: 21, title: '8 weeks.', note: "Don't promise specific results. Just explain the logic. Four weeks is a sprint. Eight weeks is where real change sets in. Twelve is for someone who wants to do it right the first time. Ask him: \"what timeline feels right to you?\" Then let him answer." },
  { n: 22, title: 'flexible payment options.', note: "Bring this up naturally. Say: \"I want to make this as easy as possible, so we can structure the payment however works best for you.\" This removes the last barrier. You're not financing anything — just giving people options." },
  { n: 23, title: 'choose your coaching experience.', note: "This is the close. Show this slide, ask \"what questions do you have before we move forward?\" — then go silent. Let Ron talk. If he selects a package, walk through it together. If he hesitates, ask \"what's holding you back?\" Then address it directly." },
  { n: 24, title: 'the only thing left is the decision.', note: "Do not pitch. Do not oversell. Ask that question and then go silent. Let Ron talk. Whatever he says next is your close. If he asks about price — you're ready. If he has objections — address them. If he says \"let's do it\" — great." },
];

export default function NotesPage() {
  const [active, setActive] = useState(0);
  const current = NOTES[active];

  return (
    <div style={{ background: '#000', minHeight: '100dvh', fontFamily: 'Inter, -apple-system, sans-serif', fontWeight: 300, color: '#EDEDE8', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '1.2rem 1.4rem 0.8rem', borderBottom: '1px solid #141414', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '0.78rem', color: '#3A3A3A', letterSpacing: '0.02em' }}>vveritas* notes</span>
        <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.6rem', letterSpacing: '0.2em', color: '#3A3A3A' }}>{active + 1} / {NOTES.length}</span>
      </div>

      <div style={{ display: 'flex', gap: '4px', padding: '0.8rem 1.4rem', overflowX: 'auto', scrollbarWidth: 'none', borderBottom: '1px solid #0f0f0f' }}>
        {NOTES.map((_, i) => (
          <button key={i} onClick={() => setActive(i)} style={{ width: '20px', height: '20px', borderRadius: '2px', border: '1px solid', borderColor: i === active ? '#EDEDE8' : '#1a1a1a', background: i === active ? '#EDEDE8' : 'transparent', color: i === active ? '#000' : '#3A3A3A', fontFamily: 'ui-monospace, monospace', fontSize: '0.45rem', cursor: 'pointer', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {i + 1}
          </button>
        ))}
      </div>

      <div style={{ flex: 1, padding: '1.5rem 1.4rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.52rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#3A3A3A' }}>slide {current.n}</div>
        <div style={{ fontSize: '0.82rem', color: '#5A5A5A', letterSpacing: '-0.01em', lineHeight: 1.4 }}>"{current.title}"</div>
        <div style={{ fontSize: '1rem', lineHeight: 1.75, color: '#EDEDE8', flex: 1 }}>{current.note}</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderTop: '1px solid #141414' }}>
        <button onClick={() => setActive(i => Math.max(i - 1, 0))} disabled={active === 0} style={{ padding: '1.1rem', background: 'none', border: 'none', borderRight: '1px solid #141414', color: active === 0 ? '#1a1a1a' : '#5A5A5A', fontFamily: 'inherit', fontSize: '0.85rem', cursor: active === 0 ? 'default' : 'pointer' }}>← prev</button>
        <button onClick={() => setActive(i => Math.min(i + 1, NOTES.length - 1))} disabled={active === NOTES.length - 1} style={{ padding: '1.1rem', background: 'none', border: 'none', color: active === NOTES.length - 1 ? '#1a1a1a' : '#EDEDE8', fontFamily: 'inherit', fontSize: '0.85rem', cursor: active === NOTES.length - 1 ? 'default' : 'pointer' }}>next →</button>
      </div>
    </div>
  );
}
