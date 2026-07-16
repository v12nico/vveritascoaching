'use client';
import { useState } from 'react';

const NOTES = [
  { n: 1, title: 'your rebuild starts here.', note: `This is on screen when the call starts. Let Ejbert see his name and the headline. Say nothing until he reacts. Let the moment land.` },
  { n: 2, title: 'this is not a traditional sales call.', note: `Say: "Before I walk you through what I built, I want to set the expectation for this call. I'm not going to talk at you for 30 minutes. I built something based on what you told me — but before I show you any of it, I need to understand what's actually happening in your life right now." Pause. "I'm going to ask questions, listen, and then tell you honestly whether I believe this structure fits you." Then ask: "Fair?" Wait for him to agree before moving forward.` },
  { n: 3, title: 'the standard.', note: `Let him read. Then say: "Perfection isn't required. Participation is. A missed workout doesn't disqualify you. Disappearing, refusing to communicate, changing the plan every week — those are what make coaching fail." Then ask your discovery questions. Listen for patterns, not promises.` },
  { n: 4, title: 'what this relationship looks like.', note: `Say: "Before I show you what I've built, I want to be clear about what this looks like from both sides." Read left column. Then: "And here's what I'd need from you." Read right. Ask: "Does that feel like something you can genuinely commit to?" Wait. Don't fill the silence.` },
  { n: 5, title: "most people don't fail because they don't try.", note: `Pause. Let that land. He's tried before — and stopped. He knows this feeling. You're naming it without making him feel judged. Don't add anything. Just let him sit with it.` },
  { n: 6, title: 'this is not a workout plan.', note: `The shift from "workout plan" to "structured rebuild" is the key reframe. You're not selling sessions. You're selling a system that rebuilds him completely — not just in the gym. His problem isn't that he doesn't know what exercises to do. His problem is that nothing is organized.` },
  { n: 7, title: 'what you told me.', note: `Read these back to him slowly. Every person wants to feel heard. Seeing his own words on the screen is what makes this personal. Let him confirm each one. Let him say "yes, that's me."` },
  { n: 8, title: 'what i hear.', note: `Read the observations one by one. On the medical line, be direct: "You cannot diagnose testosterone levels from how you look or how much you can lift. If you have real concerns, that requires lab work and a qualified clinician — not assumptions." Then read the coach script slowly. Let it land.` },
  { n: 9, title: 'invest in evidence before speculation.', note: `Don't shame him for thinking about the coin or TRT. Reframe calmly: "That's a gamble stacked on top of a decision you haven't verified. Before you spend money forcing an outcome — invest in the behaviors you haven't consistently applied yet. If after eight weeks you still feel off — get evaluated. But right now, we don't have enough evidence."` },
  { n: 10, title: 'everything lives in one place.', note: `Don't open the portal yet. Say: "Before I show you this, let me explain why remote coaching works for your situation." Then advance to the next slide.` },
  { n: 11, title: "your results don't come from the hour you train.", note: `Say: "You might be thinking — can remote coaching actually hold me accountable? Fair question." Pause. "But think about what actually determines your results. It's not the workout itself. It's what you eat at 9pm. Whether you sleep 6 hours or 8. The check-in you fill out when you feel like quitting." Pause. "That's where I coach you. None of that requires me to be in the room." Now open the portal.` },
  { n: 12, title: "today's mission.", note: `Show the mission tab. Walk through the daily tasks. Point out the streak counter and self-mastery score. Say: "One of the tasks is no comparison-based scrolling in the first hour after waking. That's in here intentionally based on what you told me." Ask: "Can you see yourself checking these off?"` },
  { n: 13, title: 'one number. five pillars.', note: `Most coaches only track workouts. You're tracking the whole person. Say: "Your confidence score is the lowest right now — which makes complete sense. We're going to move all five numbers over eight weeks. Confidence goes up when the other four go up. It's a byproduct of execution — not motivation."` },
  { n: 14, title: 'strength rebuild phase.', note: `Show the fitness tab. Walk through Workout A. Read a coaching note out loud — "control the lowering phase — 3 seconds down." Say: "The first two weeks aren't about proving anything. They're about relearning how to move and establishing your real baseline." Pause. "You will not be testing your max bench in week one."` },
  { n: 15, title: 'quality over volume.', note: `Say: "I'm not going to impress you with volume or intensity in week one. I'm going to build you a foundation that actually holds. The numbers go up when the structure is right. They can't go up if you're injured or burned out from week two."` },
  { n: 16, title: "today's standards.", note: `Show the nutrition tab. Point out the daily checklist: protein target, three planned meals, water, food quality score. Say: "This is performance nutrition — built to support your training and recovery. It's not a TRT protocol. It's real food, consistently applied."` },
  { n: 17, title: 'your list. every week.', note: `This one always gets a reaction. People don't expect the grocery list. Say: "You never have to think about what to buy. I've already decided. If you follow this list, you don't need to count a single calorie — just hit your meals."` },
  { n: 18, title: 'daily accountability.', note: `Show the check-in tab. Walk through the questions. Say: "The comparison question is in here intentionally. Over eight weeks, I want to watch that answer trend — from 'yes I compared' toward 'I didn't even think about it.'"` },
  { n: 19, title: 'this is what real coaching looks like.', note: `Read the first message out loud — slowly. Let him feel what it would be like to receive that. It's not generic. It's written for his exact situation. Most people have never had a coach send a message like that. Let it land. Then say: "That's what this looks like every week."` },
  { n: 20, title: 'the right fit.', note: `Say: "I want to be honest about who this program is built for — and who it isn't." Let him read both columns. Ask: "Based on what you know about yourself right now — where do you land?" Let him answer. That answer tells you everything.` },
  { n: 21, title: "let me tell you what i actually think.", note: `Say: "I've walked you through the full system. Now I want to be direct with you." Pause. "Based on your situation — three years away from training, clear goals, high frustration, and a pattern of looking for external solutions — I don't think you need the most complicated approach. I think you need the most consistent one." Then advance to the roadmap.` },
  { n: 22, title: '8 weeks.', note: `Walk him through each phase one at a time. Don't rush. After Week 1–2, ask: "Based on where you are right now, does this make sense? No maxing out. No proving anything. Just rebuilding." Let him respond. The goal is for him to see himself inside the process.` },
  { n: 23, title: 'vveritas 8-week remote rebuild.', note: `Walk through the feature list first. Let it land. Then show the investment. Say: "You're not buying a list of exercises. You're entering a system that tells you exactly what to do, tracks whether you did it, and adjusts when needed."` },
  { n: 24, title: 'flexible payment options.', note: `Say: "The total investment stays the same regardless of how you structure it. We can do one payment, two, or four monthly. Your start date is locked in once the first payment is received." Ask: "Which schedule makes the most sense for where you are right now?" Don't suggest one. Let him choose.` },
  { n: 25, title: '8-week remote rebuild. my recommendation.', note: `Read the reasons slowly. Then: "And here's what I don't think you need right now." Read those too. Say: "I'm not recommending remote to give you less. I'm recommending it because disciplined remote execution is the exact skill you need to build — because I can't show up at your gym for you. You have to."` },
  { n: 26, title: 'this is what i recommend.', note: `Deliver this calmly. No urgency. No pressure. Just the prescription. Pause between each line. When you ask the final question — stop talking. Whatever he says next is the close. If yes: "Tell me what you're committing to." Let him answer. Then: "Good. Based on that, I'm comfortable moving forward with you."` },
  { n: 27, title: "let's address it.", note: `Don't bring this slide up unprompted. If he raises an objection, navigate here and click the matching one. Go through it together. These are not scripts to recite — they're frameworks. Let the conversation lead.` },
  { n: 28, title: 'your rebuild starts when you decide.', note: `Do not pitch. Do not oversell. Ask "what questions do you have before we move forward?" and go silent. Let him talk. Whatever he says next is your close. Never invent urgency.` },
];

export default function EjbertNotesPage() {
  const [active, setActive] = useState(0);
  const current = NOTES[active];

  return (
    <div style={{ background: '#000', minHeight: '100dvh', fontFamily: 'Inter, -apple-system, sans-serif', fontWeight: 300, color: '#EDEDE8', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '1.2rem 1.4rem 0.8rem', borderBottom: '1px solid #141414', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '0.78rem', color: '#3A3A3A', letterSpacing: '0.02em' }}>vveritas* notes — ejbert</span>
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
