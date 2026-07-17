'use client';
import { useState } from 'react';

const NOTES = [
  { n: 1,  title: `built for Iinn.`,
    note: `This is on screen when the call starts. Let Iinn see his name. Say nothing. Let the moment land. When he reacts, begin.` },

  { n: 2,  title: `this is not a traditional sales call.`,
    note: `Say: "Bro, I want this call to be different from someone just pitching you." Pause. "You already told me the real problem — you've never committed to something in your life. You've always stopped. You said you don't have structure to follow." Pause. "So before I show you anything, I want to understand why that pattern keeps happening — and whether you're genuinely ready to build a different one." Then: "I'm going to ask questions, listen, and tell you exactly what I think. This is not about convincing you. It's about seeing whether this system actually fits you." Ask: "Fair?" Wait for him to agree before going anywhere.` },

  { n: 3,  title: `you've never committed to something.`,
    note: `Let it sit. He said it himself. You're not judging him — you're naming it accurately. The moment he sees it framed as a structural problem rather than a character flaw, the entire conversation shifts. Don't add anything. Let him sit with it.` },

  { n: 4,  title: `your history.`,
    note: `These questions reveal the emotional pattern. Listen for what triggers the fall-off. Is it a missed day? A hard week at work? An obstacle? Use follow-ups freely: "tell me more." / "give me a real example." / "what does that cost you?" Do not judge anything. The goal is for him to understand his own pattern — not for you to tell him.` },

  { n: 5,  title: `what changed.`,
    note: `The last question is critical. He mentioned wanting to be present with friends and family. When he names the people who would benefit — he's connecting this to something bigger than the gym. Reflect it back: "so this is also about being the person they can count on." Let him confirm.` },

  { n: 6,  title: `where things stand today.`,
    note: `You are mapping the territory. Ask specifically about work — because if he wants to train at 5am, you need to know what his day looks like. The energy question often reveals sleep and food quality issues without asking directly. Ask for specifics. Numbers where possible. Let him lead.` },

  { n: 7,  title: `what you bring.`,
    note: `This section is not flattery. It is finding real evidence. He already demonstrated something: he scheduled this call at 6am Eastern and committed to training before it. When he says things like "I'm reliable at work when I care" — use that as proof that the consistency muscle exists. Point that out: "you already know how to follow through. you've just never had a structure that held you accountable to yourself."` },

  { n: 8,  title: `five questions.`,
    note: `These are real commitment questions — not motivation questions. If he hesitates on any of them, explore it: "what makes that one harder than the others?" The last question is the most revealing. What he's willing to reorganize tells you how serious he actually is. Listen for specifics. A vague answer means he hasn't thought it through. Don't pressure. Just observe.` },

  { n: 9,  title: `what i'm actually hearing.`,
    note: `Read the observations one by one. Slowly. Leave space after each one. When you reach the script — pause before reading it. Read it deliberately. After the last line, pause for at least three seconds. Let him sit in it. He has probably never heard someone frame his own pattern this way without judgment. The silence is valuable — don't fill it.` },

  { n: 10, title: `you are not missing information.`,
    note: `Simple. Clean. Ask: "Does that feel accurate?" He will say yes. That yes is important — it means he owns the diagnosis. From here, the program becomes the solution to his stated problem, not a product you're pitching.` },

  { n: 11, title: `your current identity is not permanent.`,
    note: `Walk through both columns slowly. After the highlight line — stop. Let him read it. Ask: "Which column does the person you want to be live in?" He will point to the right. "Good. That's what the next eight weeks are for. Not proving you're perfect. Proving you don't disappear."` },

  { n: 12, title: `i already see something in you.`,
    note: `Say it with conviction — because you mean it. He has already demonstrated something by being on this call at this hour. Name that explicitly. Then shift: "But I'm not asking for motivation right now. I'm asking for a commitment to a standard." Pause. "There's a difference."` },

  { n: 13, title: `you asked for a workout plan.`,
    note: `Say: "And bro — I heard you when you said you mainly wanted a workout plan. You are absolutely getting that. Your actual training program is still the foundation of everything." Pause. "But based on what you told me, I would be doing you a disservice if I just sent you a list of exercises and disappeared." Pause. "Because you already said the real issue is not knowing that you should work out. The issue is sticking to something after the motivation wears off." Pause. "So yes, this is more than a workout PDF — but it is not me trying to pile random extras onto you. Everything I added exists to help the actual workout plan succeed." Walk through the feature connections on screen. Then: "I built the offer this way because I want to see you actually finish something — not just receive another document." Then: "I know there are simpler coaching offers at similar or even higher price points. I intentionally built more support into mine because I care about whether you actually follow through." Let the core line land.` },

  { n: 14, title: `training vs. the rest of the week.`,
    note: `Say: "And this is the part most people miss." Pause. "The workout matters, obviously. But the workout is not even the tip of the iceberg when it comes to your actual result." Pause. "You might train for three or four hours total in a week." "The rest of the week is where everything either gets supported or gets destroyed." Go through the list on screen. Then: "Those hours matter way more than the hour you spend lifting." Then advance to the iceberg slide.` },

  { n: 15, title: `the session is where we train.`,
    note: `Say: "This is what I mean when I say it's more than a workout plan." "The part you see is the training." "But underneath that is everything that determines whether you actually keep showing up long enough for the training to work." "If I gave you only the top of the iceberg, I would be ignoring the exact reason you told me you have struggled before." "So no, I'm not trying to upsell you." "I'm trying to make sure the plan survives after the excitement wears off." Then: "You are not paying me to tell you to work out. You are paying for a system that keeps the rest of your life from pulling you away from the result." Advance to the value stack.` },

  { n: 16, title: `everything inside the eight weeks.`,
    note: `Walk through the list. Don't rush. Name the ones that stand out for him specifically: "work-accountability structure" and "presence goals for friends and family." Say: "You'll notice some of these have nothing to do with the gym. That's intentional. You told me you wanted consistency in your work, with your friends, with your family. That's what this is built to support." Let the bottom line land before advancing.` },

  { n: 17, title: `your dashboard.`,
    note: `Open /portal/iinn-demo. Walk through each tab at your own pace — no need to follow slides. Show: Missions (point to the work block and presence task), Pillars (expand one — show score, what's helping, what's holding it back), Fitness (Workout A, read the program note), Nutrition (grocery list, daily checklist), Schedule (week structure), Check-In (point to the "where did you almost fall back" question), Progress (point to Recovery Wins specifically), Messages (read the coach message out loud slowly). Take your time. Let him react. Ask: "Have you ever seen a coaching dashboard that covers all of this?"` },

  { n: 18, title: `8 weeks.`,
    note: `Walk through each phase one at a time. After Weeks 1–2, ask: "Does this make sense? No proving anything. No intensity. Just evidence that you can return." After Weeks 3–4: "This is when you'll start to feel it — not because you're motivated, because you have data." After Weeks 5–6: "This is usually where programs fall apart. We're building you for this phase." After Weeks 7–8: "You'll have a record. Not a feeling. A record."` },

  { n: 19, title: `the right fit.`,
    note: `Say: "I want to be honest about who this program is built for — and who it isn't." Let him read both columns. Then ask: "Based on what you know about yourself right now — where do you land?" Let him answer. If he says he belongs in the left column — he's ready. If he hedges — explore that before moving forward.` },

  { n: 20, title: `does this feel like what you were missing?`,
    note: `Ask calmly: "Based on everything I showed you — the system, the portal, the roadmap, the structure around your gym, your work, and your relationships — does this feel like the kind of structure you were actually missing?" Stop. Wait for his answer. Don't fill the silence. If he says yes: "Good. Then let me show you what the eight-week investment looks like." Advance. If he's unsure: go back to any slide and address what's unclear before revealing the price.` },

  { n: 21, title: `$997.`,
    note: `Say: "The full investment for the eight-week program is $997." Pause. "That includes the personalized plan, the full dashboard, daily accountability, weekly reviews, direct access to me, program adjustments, and the entire consistency system we just walked through." Pause. "And I want to be clear — I did not build all of this just to make the offer sound bigger. I built it because you told me you are tired of starting and stopping, and I want to give you the best possible structure to finally break that pattern." Pause. "You can handle it in full, split it into two payments, or divide it into four monthly payments." Then ask: "Does that investment make sense for the level of support we just walked through?" Stop. Let him respond.` },

  { n: 22, title: `are you ready to commit to that standard?`,
    note: `Deliver this with complete calm. No urgency. No fake scarcity. After the question — stop talking. Whatever he says next is the close. If he says yes: "Tell me exactly what you're committing to." Let him speak. Then: "Good. Based on that, I'm comfortable moving forward with you." Open /enroll/iinn. If he hesitates — move to objections.` },

  { n: 23, title: `whatever is holding you back.`,
    note: `Do not bring this slide up unprompted. If he raises an objection, navigate here and click the matching one. These are frameworks — not scripts. Let the conversation lead.` },

  { n: 24, title: `your follow-through starts when you decide.`,
    note: `Do not pitch. Do not oversell. Ask "what questions do you have before we move forward?" and go silent. Let him talk. Open the enrollment page. Confirm his start date.` },
];

export default function IinnNotesPage() {
  const [active, setActive] = useState(0);
  const current = NOTES[active];

  return (
    <div style={{ background: '#000', minHeight: '100dvh', fontFamily: 'Inter, -apple-system, sans-serif', fontWeight: 300, color: '#EDEDE8', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '1.2rem 1.4rem 0.8rem', borderBottom: '1px solid #141414', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '0.78rem', color: '#3A3A3A', letterSpacing: '0.02em' }}>vveritas* notes — iinn</span>
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
          he does not need more hype. he needs to hear his own reasons for changing.
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderTop: '1px solid #141414' }}>
        <button onClick={() => setActive(i => Math.max(i - 1, 0))} disabled={active === 0} style={{ padding: '1.1rem', background: 'none', border: 'none', borderRight: '1px solid #141414', color: active === 0 ? '#1a1a1a' : '#5A5A5A', fontFamily: 'inherit', fontSize: '0.85rem', cursor: active === 0 ? 'default' : 'pointer' }}>← prev</button>
        <button onClick={() => setActive(i => Math.min(i + 1, NOTES.length - 1))} disabled={active === NOTES.length - 1} style={{ padding: '1.1rem', background: 'none', border: 'none', color: active === NOTES.length - 1 ? '#1a1a1a' : '#EDEDE8', fontFamily: 'inherit', fontSize: '0.85rem', cursor: active === NOTES.length - 1 ? 'default' : 'pointer' }}>next →</button>
      </div>
    </div>
  );
}
