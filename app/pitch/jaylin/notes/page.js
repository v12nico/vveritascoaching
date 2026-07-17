'use client';
import { useState } from 'react';

const NOTES = [
  { n: 1,  title: `built for Jaylin.`,
    note: `This is on screen when the call opens. Let Jaylin see his name. Say nothing immediately. When he acknowledges it, begin: "Jaylin, I went through your page before this call, and from what I can see, you are not somebody starting from nothing. You already have a foundation. What I want to figure out today is where you are trying to go, what is currently slowing you down, and whether my system actually fits that. I am not going to assume I know your goals just from Instagram, so I want you doing most of the talking first." Then ask: "What made you take this call now?"` },

  { n: 2,  title: `this is an assessment.`,
    note: `Set the tone clearly before any questions. Say: "This is not a standard pitch. I'm going to ask you questions and listen. I want to understand your situation before I prescribe anything." Pause. "Based on what I have seen so far, I believe you have real potential to be optimized — not rebuilt from scratch. But I want to confirm that with you." Pause. "So let's figure out where you actually are, where you want to go, and whether this makes sense." Ask: "Sound fair?" Wait for him to agree.` },

  { n: 3,  title: `where you are trying to go.`,
    note: `These three questions set the target. Do not lead him toward an answer — let him define what he actually wants. After each answer, follow up: "tell me more." or "what makes that the priority?" If he mentions a body part, strength goal, or performance target — that becomes the anchor for the rest of the call. Write down the exact words he uses. You will reflect them back in the reflection slide. Do not rush this section.` },

  { n: 4,  title: `where you are right now.`,
    note: `You are mapping the current state. Listen for frequency, consistency, and structure in his training. A strong trainer with inconsistent nutrition is a different prescription than someone whose training is the problem. If he describes a good training schedule, ask: "how consistent is that really week to week?" That usually reveals the actual gap. The sleep, energy, digestion question often uncovers recovery issues he hasn't named yet. Ask for specifics.` },

  { n: 5,  title: `what is actually in the way.`,
    note: `The bottleneck question is critical. Let him identify it himself — do not name it for him. The "what have you tried" question reveals his history and helps you avoid pitching him something he already dismissed. The accountability question tells you how hands-on to make the prescription. The last question — "what would make this feel completely worth it" — is your close seed. Write down his exact phrase. You will use it when you reveal the investment.` },

  { n: 6,  title: `what i'm hearing.`,
    note: `Say: "Let me make sure I understand you correctly before I show you anything." Summarize back everything he said using his exact words — not your interpretation. Type into each field on screen and confirm after each one: "Is that accurate?" or "Am I understanding that right?" This step is rare in fitness calls. It signals that you actually listened, which builds more trust than any slide. Pause here. Do not rush into the philosophy.` },

  { n: 7,  title: `your body does not respond to training in isolation.`,
    note: `Say: "I want to explain how I look at this before I show you the system." Pause. "I take a holistic approach — but I do not mean vague wellness advice." Go through the factors on screen one by one. Say: "I am not only looking at what happens during the workout. I am looking at whether the rest of your week supports the result." Then: "A lot of highly processed foods are easy to overconsume and may not support your digestion, appetite, energy, or performance as well as a simpler whole-food structure. We identify which foods actually work well for your body rather than following random internet rules." Pause. "That is why the system covers more than just what you do in the gym."` },

  { n: 8,  title: `simple food. clear purpose.`,
    note: `Say: "My nutrition philosophy is simple. Not restrictive — simple." Walk through each principle on screen at a steady pace. Say: "We may use calorie or macro ranges when they help, but numbers are tools — not the entire philosophy." Then: "The default goal is to build a repeatable way of eating that supports your body composition, strength, energy, and recovery. Something you can sustain." Ask: "Does that approach feel manageable to you?" Let him respond before moving on.` },

  { n: 9,  title: `why i coach this way.`,
    note: `Keep this brief — it is a personal note, not a feature list. Say: "I coach this way because of what I personally experienced when I simplified my own approach." Read the slide. Then: "That experience shaped my philosophy. But your plan will still be built around how your body actually responds — not how mine did." Pause. "Now let me show you what the system actually looks like in practice." Advance to the portal.` },

  { n: 10, title: `the result is bigger than a workout.`,
    note: `Walk through both columns. On Tina, say carefully: "One client, Tina, improved her physical habits and her mind-body connection while also building a successful nail business. She later reached six figures and personally credits part of her growth to the discipline and confidence she built through the coaching." Then add: "I am not claiming fitness made her money. I am saying the discipline carried over." Let the point land. Then advance to the portal.` },

  { n: 11, title: `your system.`,
    note: `Open /portal/jaylin-demo. Walk through each tab at your own pace — do not rush. Show: Today tab (point to each task, read the focus note aloud), Fitness tab (walk through Workout A, name one exercise and its form note), Nutrition tab (show the protein target field, food checklist, and grocery list briefly), Mindset tab (read the weekly standard aloud, point to the coach message), Progress tab (point to baseline tracking and progress photo slots), Check-In tab (walk through the daily questions), Messages tab (read the coach message slowly). After the final tab, ask: "Have you ever seen a fitness system that covers all of these areas in one place?" Stop. Let him answer.` },

  { n: 12, title: `what is included every month.`,
    note: `Walk through the list steadily. Say: "Not random information. One clear system built around your body, goals, and life." Then: "Every single thing on this list is active every month. It is not a PDF package. It is live coaching that adjusts based on how you respond." Then advance to the fit positioning.` },

  { n: 13, title: `you already have the foundation.`,
    note: `Say: "From what I saw before the call, I already believed you had a foundation." Pause. "After hearing your goals, I think the opportunity is not to start you over. It is to organize and optimize what you are already capable of." Pause. "I think you could be a strong fit because you are not asking me to manufacture ambition. The ambition already appears to be there." Pause. "The real question is whether you are willing to follow one precise system long enough to see what it can produce." Let him respond. This is a confident, selective framing — not a manipulation.` },

  { n: 14, title: `does this feel like the structure you were actually looking for?`,
    note: `Ask the question calmly and then stop. Do not add to it. Do not soften it. Do not explain it further. Let him sit with it. If he says yes — advance to the investment. If he says he is unsure — go back to any slide and address what is unclear. Do not reveal the investment until he confirms the system feels right for him.` },

  { n: 15, title: `$497 / month.`,
    note: `Say: "Based on what you told me, I do not think you need more random fitness information." Pause. "You need one personalized system that connects your training, nutrition, recovery, mindset, and accountability." Pause. "The investment for that level of coaching is $497 per month." Pause. Let it land for at least three seconds. Then: "That includes the dashboard, personalized training and nutrition structure, direct communication, check-ins, reviews, form feedback, and ongoing adjustments every month." Then ask: "Does that structure match the level of support you told me you are looking for?" Stop talking.` },

  { n: 16, title: `are you willing to follow one precise system long enough?`,
    note: `Deliver this with complete calm. After the question — stop talking. Whatever he says next is the close. If he says yes: "Good. Let me pull up your enrollment page." Open /enroll/jaylin. Confirm start date. If he hesitates, ask: "What is making you hesitate?" Let him name it. Address it from that point. Do not bring out objections you invented. Address only what he actually raises.` },

  { n: 17, title: `you do not need to start over.`,
    note: `Do not pitch. Do not oversell. Ask: "What questions do you have before we move forward?" Go completely silent. Let him talk. Whatever he says next is your close. Open the enrollment page. Confirm his start date. Confirm onboarding timeline.` },
];

export default function JaylinNotesPage() {
  const [active, setActive] = useState(0);
  const current = NOTES[active];

  return (
    <div style={{ background: '#000', minHeight: '100dvh', fontFamily: 'Inter, -apple-system, sans-serif', fontWeight: 300, color: '#EDEDE8', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '1.2rem 1.4rem 0.8rem', borderBottom: '1px solid #141414', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '0.78rem', color: '#3A3A3A', letterSpacing: '0.02em' }}>vveritas* notes — jaylin</span>
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

      <div style={{ padding: '1rem 1.4rem', borderTop: '1px solid #141414', background: '#000' }}>
        <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.5rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#1a1a1a', marginBottom: '0.6rem', textAlign: 'center' }}>
          listen. diagnose. reflect. prescribe.
        </div>
        <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.44rem', letterSpacing: '0.1em', color: '#141414', textAlign: 'center' }}>
          he does not need a pitch. he needs to see that you understood him.
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderTop: '1px solid #141414' }}>
        <button onClick={() => setActive(i => Math.max(i - 1, 0))} disabled={active === 0} style={{ padding: '1.1rem', background: 'none', border: 'none', borderRight: '1px solid #141414', color: active === 0 ? '#1a1a1a' : '#5A5A5A', fontFamily: 'inherit', fontSize: '0.85rem', cursor: active === 0 ? 'default' : 'pointer' }}>← prev</button>
        <button onClick={() => setActive(i => Math.min(i + 1, NOTES.length - 1))} disabled={active === NOTES.length - 1} style={{ padding: '1.1rem', background: 'none', border: 'none', color: active === NOTES.length - 1 ? '#1a1a1a' : '#EDEDE8', fontFamily: 'inherit', fontSize: '0.85rem', cursor: active === NOTES.length - 1 ? 'default' : 'pointer' }}>next →</button>
      </div>
    </div>
  );
}
