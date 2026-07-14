'use client';
import { useState } from 'react';

const NOTES = [
  { n: 1, title: 'built for Ron Blake.', note: "Open with this on screen before the call starts. Let Ron see his name. That alone tells him this isn't a generic pitch — it was made for him. Don't say anything until he reacts." },
  { n: 2, title: "most people don't fail because they don't try.", note: "Pause here. Let that land. This is Ron's reality — he's tried before. He knows this feeling. You're naming it without making him feel judged." },
  { n: 3, title: 'this is not a workout plan.', note: 'The shift from "workout plan" to "operating system" is the key reframe. You\'re not selling sessions. You\'re selling a system that runs his health.' },
  { n: 4, title: 'what you told me.', note: 'Read these back to him slowly. Every person wants to feel heard. This moment — seeing his own words on the screen — is what makes this feel personal. Let him say "yes, that\'s me."' },
  { n: 5, title: 'everything lives in one place.', note: "Don't open the portal yet. Say: \"before I show you this, I want to address something.\" Then advance to the next slide." },
  { n: 6, title: 'the hour we spend together isn\'t what determines your results.', note: "Say this slowly. Full delivery: \"You reached out because you wanted a personal trainer. And looking at what I'm about to show you, you might be thinking — man, this is way more than I asked for. And honestly? You're right.\" Pause. \"I've worked as a personal trainer. And what I realized is that the hour we spend together each week isn't what determines your results.\" Pause. \"Your results come from the other 167 hours of the week.\" Pause. \"So I built a system that coaches you there too. Not because I'm trying to sell you more. Because I genuinely believe it gives you a better chance of reaching the goals you told me about.\" Now open the portal." },
  { n: 7, title: "today's mission.", note: 'Show the mission tab. Click through the tasks. Point out the streak counter and the self-mastery score. Ask him: "can you see yourself checking these off?" Let him interact mentally with it.' },
  { n: 8, title: 'one number. five pillars.', note: 'This is powerful. Most trainers only track workouts. You\'re tracking the whole person. Say: "your score right now is 62. over the next 12 weeks, we\'re going to move this number. every pillar goes up together."' },
  { n: 9, title: 'foundation phase.', note: 'Show the fitness tab. Walk through Workout A. Read one of the exercise coaching notes out loud — "control the lowering phase — 2 seconds down." That detail tells him you\'re paying attention to HOW he trains, not just what he does.' },
  { n: 10, title: 'quality over volume.', note: "This is where you differentiate yourself from every trainer who just destroyed someone in their first session. You're building a foundation. That's what he needs — and it's what will actually get him results." },
  { n: 11, title: "today's standards.", note: "Show the nutrition tab. Point out the checklist with progress numbers (130/150g protein, 2/3 meals, 70/90oz water). Say: \"this week we're not chasing perfect numbers. we're building the habit of showing up.\" Read the coach's focus note." },
  { n: 12, title: 'your list. every week.', note: "This one always gets a reaction. People don't expect the grocery list. Say: \"you never have to think about what to buy. it's already done.\" Tap a few items so he sees they can be checked off." },
  { n: 13, title: '221 lbs. goal: 195.', note: 'Show the progress tab. Point to the weight goal bar. Show the photo placeholders — say: "week 1 we take your baseline photo. week 12 we look at it side by side. that transformation is yours." Let that visual land.' },
  { n: 14, title: 'daily accountability.', note: "Show the check-in tab. Walk through the questions: did you complete your workout? hit your protein? complete your walk? Then the sliders for energy and confidence. Say: \"this is how I stay ahead of problems — I'm not waiting for you to tell me something is off.\"" },
  { n: 15, title: 'this is what real coaching looks like.', note: "This is the moment. Read the final message out loud — slowly. Let him feel what it would be like to receive that. Most people have never had a coach who checks in like this. This is unlimited messaging. Real communication." },
  { n: 16, title: 'wednesday. 6:00 pm.', note: "This is the premium experience. You're not just showing up to count reps — you're building the entire system around him. The in-person sessions are supported by everything else. That's what makes this different." },
  { n: 17, title: "let me tell you what i honestly think.", note: "Say with conviction: \"Before I show you the options, I want to be straight with you. Based on your goals and where you are right now, I don't automatically think you need the most expensive package. I'd rather recommend the right level of support than put you in something bigger than your situation calls for.\" Then advance to Elite so he sees the full range first." },
  { n: 18, title: 'elite transformation — maximum hands-on coaching.', note: "Show Elite first so he sees the full scope. Walk through the features. Let the price land. Then say: \"This is the highest level. Three sessions a week with me. If you need that level of hands-on support, this is it.\" Then advance to Hybrid — which is your actual recommendation." },
  { n: 19, title: 'hybrid coaching — the ideal balance.', note: "Say: \"Now — this is the one I'd actually recommend for you.\" Pause. \"One session a week is enough to correct your form, push your performance, and hold you accountable. And the full system runs every other day — so you're not on your own between sessions.\" Then: \"I'm not recommending this because it's cheaper. I'm recommending it because I don't think you need to train with me three times a week to get the result you described. One strong session plus the system may be enough.\" Let that land." },
  { n: 20, title: 'remote coaching — complete coaching, full flexibility.', note: "Present this as a continuation option, not a downgrade. Say: \"And if your schedule ever changes — you travel, you move, whatever — you don't lose the coaching. Same system, same accountability, just done virtually. The quality doesn't change. The access does.\"" },
  { n: 21, title: 'every level. same system.', note: "Let him scan the whole table. Then point to the in-person coaching row and say: \"that's the only real difference. everything else — the program, the nutrition, the dashboard, the messaging — you get all of that regardless of which level you choose.\"" },
  { n: 22, title: 'hybrid coaching. 8 weeks. (my recommendation)', note: "Read the reasons out loud — slowly. Then say: \"And here's what I don't think you need right now.\" Read those too. \"I'm not removing these things to give you less. I'm removing them because they're not necessary for your situation.\" Pause. \"One strong session a week, the full system running between sessions — I believe that gives you a real shot at everything you described.\" This should feel like a doctor reading a diagnosis, not a salesperson showing a menu." },
  { n: 23, title: '8 weeks.', note: "Don't promise specific results. Just explain the logic. Four weeks is a sprint. Eight weeks is where real change sets in. Twelve is for someone who wants to do it right the first time. Ask him: \"what timeline feels right to you?\" Then let him answer." },
  { n: 24, title: 'flexible payment options.', note: "Bring this up naturally. Say: \"I want to make this as easy as possible, so we can structure the payment however works best for you.\" This removes the last barrier. You're not financing anything — just giving people options." },
  { n: 25, title: 'choose your coaching experience.', note: "Don't say \"which one feels right?\" Say: \"Based on everything you told me, I'd recommend the 8-week Hybrid. You'll have me in person every week, and the system runs every other day. The investment is $2,300 — and we can structure the payment however works for you.\" Pause. \"Does that structure make sense for what you described?\" Let him answer. If budget is the issue: \"Would it help if I walked you through which parts are most essential for your situation?\" Never push. Never invent urgency." },
  { n: 26, title: 'the only thing left is the decision.', note: "Do not pitch. Do not oversell. Ask that question and then go silent. Let Ron talk. Whatever he says next is your close. If he asks about price — you're ready. If he has objections — address them. If he says \"let's do it\" — great." },
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
          <button key={i} onClick={() => setActive(i)} style={{ width: '20px', height: '20px', borderRadius: '2px', border: '1px solid', borderColor: i === active ? '#EDEDE8' : '#1a1a1a', background: i === active ? '#EDEDE8' : 'transparent', color: i === active ? '#000' : '#3A3A3A', fontFamily: 'ui-monospace, monospace', fontSize: '0.42rem', cursor: 'pointer', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
