'use client';
import { useState } from 'react';

const NOTES = [
  { n: 1,  title: `built for Joshua.`,
    note: `This is on screen when the call opens. Let Joshua see his name. Say nothing immediately. When he acknowledges it, begin: "Joshua, before I show you anything, I want to hear from you directly. You mentioned you've been overcomplicating things and feeling stressed about where to start. I want to understand that before I prescribe anything." Then ask: "How was the vacation? And what made you decide now was the right time to make a change?"` },

  { n: 2,  title: `this is an assessment.`,
    note: `Set the tone early. Say: "This is not a standard pitch call. I'm going to ask you questions, listen to what you tell me, and then show you what I would actually build for you based on that." Pause. "You said you've been stressed about where to start and feel like you're overcomplicating everything. That tells me something important already. So let's figure out where you are, what you want, and what's been getting in the way." Ask: "Sound fair?" Wait for agreement before advancing.` },

  { n: 3,  title: `where you are trying to go.`,
    note: `These questions set the target. Do not lead him — let him define it in his own words. If he mentions a body part, write down his exact words. That becomes the anchor for the program framing. After each answer: "tell me more." or "what makes that the priority?" The body recomposition slide will map directly to what he says here. Do not rush this section. Do not shame his use of the term "skinny fat" — treat it as a starting point, not a problem.` },

  { n: 4,  title: `where you are right now.`,
    note: `You are mapping the current state. Listen for: frequency, structure, and consistency. If he describes a decent routine, ask: "how consistent is that really week to week?" That usually reveals the actual gap. The eating question will likely confirm the pattern you are seeing. The "what have you tried" question is critical — it tells you what not to pitch him and what he has already dismissed.` },

  { n: 5,  title: `what is actually in the way.`,
    note: `This is the most important discovery section for Joshua. His exact words: "overcomplicating everything" and "stressed about what to do and where to start." Let him identify the source himself — do not name it for him. The second question reveals the real pattern. Whatever causes him to stop is the main coaching design constraint. Follow-ups: "tell me more." / "what makes you say that?" / "how long has that been bothering you?" / "what would make this feel simple?"` },

  { n: 6,  title: `what i'm hearing.`,
    note: `Say: "Before I show you anything, let me make sure I actually understood you." Summarize everything back using his exact words — not your interpretation. Go through each field and confirm: "is that accurate?" or "am I understanding that right?" This step signals that you listened, which builds more trust than any slide. Do not rush forward until he confirms you got it right.` },

  { n: 7,  title: `build the frame. reduce the excess.`,
    note: `Say: "I want to be direct about what we are actually going to do." Walk through each point on screen at a steady pace. Then say: "What most people call toning is really two things happening together — building muscle where your body needs more structure, and reducing fat over time to reveal it." Do not promise rapid or simultaneous fat loss and muscle gain. Use: "The exact rate will depend on your training history, nutrition, recovery, and consistency — but the direction is clear."` },

  { n: 8,  title: `overthinking is stealing your execution.`,
    note: `This is the emotional center of the presentation for Joshua. Say: "The problem I see most with people in your situation is not lack of effort." Pause. "It is that the effort goes into figuring out the plan instead of executing the plan." Walk through the overthinking column. Then reveal the solution column. Then say: "You do not need to know everything. You need to know what to do next." Pause and let that land. Do not rush past this slide.` },

  { n: 9,  title: `the workout is only one part.`,
    note: `Say: "The training plan is not the whole system." Walk through each factor. Say: "The workout creates the stimulus. Everything else in your week determines whether your body actually responds to it." Then: "This is why I am not going to hand you a workout file and leave everything else up to you — because that is what creates the confusion you already described." Then: "The nutrition, the recovery, the structure — it all has to be connected."` },

  { n: 10, title: `simple nutrition for muscle and body composition.`,
    note: `Say: "My nutrition approach is not restrictive. It is simple." Walk through each principle. Say: "We may use a calorie range to manage body composition, but the plan will not require you to obsess over every gram." Then: "The goal is to eat in a way that supports muscle growth, fat loss, energy, digestion, and consistency — not in a way that adds stress to your life." Ask: "Does that feel manageable?" Wait for his answer before advancing.` },

  { n: 11, title: `why i coach this way.`,
    note: `Keep this brief. Say: "I coach this way because of what I personally experienced when I simplified my own approach." Read the slide. Then: "That experience shaped my philosophy. But your plan will be built around how your body responds — not how mine did." Pause. "Now let me show you what the actual system looks like."` },

  { n: 12, title: `your system.`,
    note: `Open /portal/joshua-demo. Walk through each tab. Today: point to each task, read the focus note aloud. Fitness: walk through the training plan, name one exercise, read its form note. Nutrition: show the protein target, food checklist, grocery list. Progress: point to the recomposition score and what drives it. Check-In: walk through the questions — specifically point to question 5 (the overthinking check). Weekly Review: walk through the questions. Messages: read the coach message slowly. After the last tab, ask: "Have you ever seen a fitness system this clear and this complete in one place?" Stop. Let him answer.` },

  { n: 13, title: `everything you need. nothing random.`,
    note: `Walk through the list steadily. Do not rush. Say: "Not random information. One clear system built around your body, your goals, and your current situation." Then: "Everything on this list is active every month. It is not a PDF you buy and figure out alone. It is live coaching that adjusts based on how you respond." Then advance to fit positioning.` },

  { n: 14, title: `you do not need more information.`,
    note: `Say: "Based on what you told me, I think you are a good fit for this." Pause. "Not because you have a perfect training history. But because you already know what you want — you just have not had one clear system telling you exactly how to build it." Pause. "I do not think you need more motivation. I think you need less confusion." Pause. "The real question is whether you are willing to follow one precise system long enough for your body to respond." Let him answer.` },

  { n: 15, title: `does this feel like the structure you've been missing?`,
    note: `Ask this exact question and then stop talking. Do not add to it. Do not soften it. Do not explain it further. Let him sit with it. If he says yes — advance to the investment. If he is unsure — go back to whatever is unclear. Do not reveal the price until he confirms the system is what he has been missing.` },

  { n: 16, title: `$497 / month.`,
    note: `Say: "Based on what you told me, I do not think you need more random fitness information." Pause. "You need one clear system that connects training, nutrition, recovery, and accountability — built around your body and your goal." Pause. "The investment for that level of coaching is $497 per month." Pause. Let it land for at least three seconds. Then: "That includes the dashboard, personalized training and nutrition, daily check-ins, weekly reviews, direct messaging, form feedback, and ongoing adjustments." Then ask: "Does that level of support match what you told me you need?" Stop talking.` },

  { n: 17, title: `are you willing to follow one precise system long enough to change?`,
    note: `Deliver this with complete calm. After the question — stop talking. Whatever he says next is the close. If yes: "Good. Let me pull up your enrollment page." Open /enroll/joshua. Confirm start date. If he hesitates: ask "what is making you hesitate?" Let him name it. Address only what he actually raises — do not invent objections. Do not sound desperate. Silence is your advantage here.` },

  { n: 18, title: `stop trying to figure out everything.`,
    note: `Do not pitch. Do not oversell. Ask: "What questions do you have before we move forward?" Go completely silent. Let him talk. Whatever he says next is your close. Open the enrollment page. Confirm start date. Confirm onboarding timeline.` },
];

export default function JoshuaNotesPage() {
  const [active, setActive] = useState(0);
  const current = NOTES[active];

  return (
    <div style={{ background: '#000', minHeight: '100dvh', fontFamily: 'Inter, -apple-system, sans-serif', fontWeight: 300, color: '#EDEDE8', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '1.2rem 1.4rem 0.8rem', borderBottom: '1px solid #141414', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '0.78rem', color: '#3A3A3A', letterSpacing: '0.02em' }}>vveritas* notes — joshua</span>
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
          listen. simplify. reflect. prescribe.
        </div>
        <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.44rem', letterSpacing: '0.1em', color: '#141414', textAlign: 'center' }}>
          he does not need more information. he needs one system.
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderTop: '1px solid #141414' }}>
        <button onClick={() => setActive(i => Math.max(i - 1, 0))} disabled={active === 0} style={{ padding: '1.1rem', background: 'none', border: 'none', borderRight: '1px solid #141414', color: active === 0 ? '#1a1a1a' : '#5A5A5A', fontFamily: 'inherit', fontSize: '0.85rem', cursor: active === 0 ? 'default' : 'pointer' }}>← prev</button>
        <button onClick={() => setActive(i => Math.min(i + 1, NOTES.length - 1))} disabled={active === NOTES.length - 1} style={{ padding: '1.1rem', background: 'none', border: 'none', color: active === NOTES.length - 1 ? '#1a1a1a' : '#EDEDE8', fontFamily: 'inherit', fontSize: '0.85rem', cursor: active === NOTES.length - 1 ? 'default' : 'pointer' }}>next →</button>
      </div>
    </div>
  );
}
