'use client';
import { useState } from 'react';

const NOTES = [
  { n: 1,  title: `built for zack.`,
    note: `On screen when the call opens. Let Zack see his name. Say nothing immediately. When he acknowledges it, begin: "Zack, before I show you anything — I actually don't think motivation is your problem. I want to understand what's really going on first. You mentioned you've been working a 9–5 all summer and just don't have anything left after work. I want to hear more about that before I show you anything." Then: "Walk me through a typical day."` },

  { n: 2,  title: `this is an assessment.`,
    note: `Set the frame. Say: "This isn't a pitch call. I'm going to ask you questions, listen to what you tell me, and then show you what I'd build specifically for your situation." Pause. "You said your motivation has been terrible and you've been lazy after work. I don't actually believe that's the real problem. But let me hear more before I tell you what I think." Ask: "Sound fair?" Wait for agreement before moving forward.` },

  { n: 3,  title: `tell me about your situation.`,
    note: `This is the most important section. Let Zack describe his day in his own words. The goal is to hear exactly where the breakdown happens — is it the decision to go, the lack of a plan, the exhaustion, the food, all of it? Take notes on his exact language. That language becomes the anchor for every slide going forward. After each answer: "tell me more." or "what makes it hardest in that moment?" Do not rush. Do not fill silences. Let him realize his own problem out loud.` },

  { n: 4,  title: `what i'm hearing.`,
    note: `Say: "Before I show you anything — let me make sure I actually understood you." Read each item out loud, slowly. After the bottleneck column: "Does that sound right?" Wait. If he confirms: "Good. Because that tells me exactly what we need to build." Do not rush past this. This is the moment he feels heard. That moment is more powerful than any slide. Do not move forward until he confirms you got it right.` },

  { n: 5,  title: `your brain is making too many decisions.`,
    note: `Say: "I don't think you're lazy, Zack." Pause. "I think you've been relying on motivation to replace structure. And motivation requires energy you don't have left at 6pm." Walk down the decision chain slowly. "Every one of these is a micro-decision that drains you. By the time you get to the gym question — your brain has already spent hours making calls at work." Pause. "My job is to remove almost every decision from your evening." Let that land before advancing.` },

  { n: 6,  title: `remove the guesswork.`,
    note: `Say: "Here's what changes when you have a system." Walk through each item. After each one, let it land. Then say: "You don't have to decide what to eat. You don't have to decide what workout to do. You don't have to decide if you feel like going." Pause. "The system decided for you — days ago. All you do is execute." Then: "That's the difference between motivation-based fitness and system-based fitness."` },

  { n: 7,  title: `training built around your schedule.`,
    note: `Say: "The training plan will not ask you to be in the gym every day." Pause. "It will ask you to show up three or four times per week and execute with precision." Then: "Short, focused sessions. Every exercise is there for a reason. No wasted time." Then: "And because I know what your week looks like — the training days will be placed around your schedule, not the other way around."` },

  { n: 8,  title: `nutrition that works after a long day.`,
    note: `Say: "Nutrition is where most people create the most complexity." Pause. "We are not doing that." Walk through each item. Then: "You'll have a grocery list. You'll have a set of repeatable meals. Most nights you'll already know what you're eating before you get home." Pause. "That eliminates one entire category of after-work decision-making." Ask: "Does that feel manageable?" Wait for his answer before advancing.` },

  { n: 9,  title: `your recovery starts before the gym.`,
    note: `Say: "This is the part nobody talks about." Pause. "Working a 9–5 is a recovery problem as much as it's a scheduling problem. You're not just physically tired — you're neurologically drained. We have to account for that in your plan." Then: "The workout creates the stimulus. Sleep, food, hydration, and stress determine whether your body responds to it." Then: "So your program will include recovery guidance — not just training and nutrition."` },

  { n: 10, title: `let me show you the system.`,
    note: `Open /portal/zack-demo. Walk through each tab deliberately. Today: "This is the first thing you see when you open the app. One mission. No decisions." Read each task aloud. Fitness: "The workout is already built. You don't choose what to do — you just execute." Nutrition: "Your protein target is set. Your meals are listed. Your grocery list is already there." Progress: point to what each metric tracks. Check-In: walk through each question. Messages: read the coach message out loud, slowly. Then: "Have you ever had this level of structure around your fitness?" Stop. Let him answer.` },

  { n: 11, title: `everything in one place.`,
    note: `Walk through the list at a measured pace. Do not rush. Say: "Not a generic PDF. Not a random program. One connected system — built around your body, your goal, and your schedule." Pause. "Every item on this list is active every month. It adjusts based on how you respond." Then move to the fit question.` },

  { n: 12, title: `you don't need more motivation.`,
    note: `Say: "Based on everything you told me — I think you're a strong fit." Pause. "Not because you've been consistent. You haven't been. But because you understand your own problem clearly." Pause. "You said you get home and have nothing left. That's an energy and structure problem — not a character problem. You're not lazy. You've been running on empty with no system waiting for you." Then: "The real question is whether you're ready to stop relying on motivation and follow one system instead."` },

  { n: 13, title: `does this feel like the structure you've been missing?`,
    note: `Ask this question exactly as written. Then stop talking completely. Do not add to it. Do not soften it. Do not explain it further. Let Zack sit with it. If he says yes — advance to investment. If he hesitates — ask "what's making you hesitate?" Let him name it. Address only what he actually raises. Do not invent objections.` },

  { n: 14, title: `$997 / 8 weeks.`,
    note: `Say: "Based on what you told me — I don't think you need more fitness information." Pause. "You need one clear system that removes almost every decision between getting off work and actually showing up." Pause. "The investment is $997 — that covers the full 8 weeks. One payment. No recurring charges." Pause. Let it land for at least three seconds. "That includes everything on that list — the dashboard, training, nutrition, check-ins, messaging, adjustments. All of it." Then: "Does that level of support match what you described needing?" Stop talking. (If he raises budget: "There's also a hands-off version at $497 — same system, less direct coaching. But based on what you told me, I'd recommend the full version.")` },

  { n: 15, title: `stop depending on motivation.`,
    note: `Deliver with complete calm. Then ask: "What questions do you have before we move forward?" Go completely silent. Whatever he says next is your close. If ready: "Good. Let me pull up your enrollment page." Open /enroll/zack. Confirm start date. Walk through onboarding. If he hesitates: "What's making you hesitate?" Let him name it. Do not invent objections. Silence is your advantage.` },
];

export default function ZackNotesPage() {
  const [active, setActive] = useState(0);
  const current = NOTES[active];

  return (
    <div style={{ background: '#000', minHeight: '100dvh', fontFamily: 'Inter, -apple-system, sans-serif', fontWeight: 300, color: '#EDEDE8', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '1.2rem 1.4rem 0.8rem', borderBottom: '1px solid #141414', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '0.78rem', color: '#3A3A3A', letterSpacing: '0.02em' }}>vveritas* notes — zack</span>
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
        <div style={{ fontSize: '0.82rem', color: '#5A5A5A', letterSpacing: '-0.01em', lineHeight: 1.4 }}>&ldquo;{current.title}&rdquo;</div>
        <div style={{ fontSize: '1rem', lineHeight: 1.75, color: '#EDEDE8', flex: 1 }}>{current.note}</div>
      </div>

      <div style={{ padding: '1rem 1.4rem', borderTop: '1px solid #141414', background: '#000' }}>
        <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.5rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#1a1a1a', marginBottom: '0.6rem', textAlign: 'center' }}>
          listen. remove friction. reflect. prescribe.
        </div>
        <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.44rem', letterSpacing: '0.1em', color: '#141414', textAlign: 'center' }}>
          he is not lazy. he is exhausted. build the system that works anyway.
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderTop: '1px solid #141414' }}>
        <button onClick={() => setActive(i => Math.max(i - 1, 0))} disabled={active === 0} style={{ padding: '1.1rem', background: 'none', border: 'none', borderRight: '1px solid #141414', color: active === 0 ? '#1a1a1a' : '#5A5A5A', fontFamily: 'inherit', fontSize: '0.85rem', cursor: active === 0 ? 'default' : 'pointer' }}>← prev</button>
        <button onClick={() => setActive(i => Math.min(i + 1, NOTES.length - 1))} disabled={active === NOTES.length - 1} style={{ padding: '1.1rem', background: 'none', border: 'none', color: active === NOTES.length - 1 ? '#1a1a1a' : '#EDEDE8', fontFamily: 'inherit', fontSize: '0.85rem', cursor: active === NOTES.length - 1 ? 'default' : 'pointer' }}>next →</button>
      </div>
    </div>
  );
}
