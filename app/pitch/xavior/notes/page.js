'use client';
import { useState } from 'react';

const NOTES = [
  { n: 1, title: `built for xavior.`,
    note: `On screen before he joins. Let him see his name and sit in it. Don't fill the silence. When he reacts, open with: "Xavior — you already know what I'm about, so I'm not going to do the whole pitch thing." Then: "I want about ten minutes on where you actually are, then I'll show you the thing you'd be using every day. Cool?" Wait for a yes.` },

  { n: 2, title: `this part is short.`,
    note: `Set the frame fast — he follows you, he's warm, don't over-sell. Say: "The deep questions are in the intake form you'll fill out after, so I'm not going to interrogate you now." Then: "I just need enough to know what we're building." The point of this slide is permission to be brief. Do not linger. Move.` },

  { n: 3, title: `tell me where you actually are.`,
    note: `Five questions. Ask them one at a time and SHUT UP after each. The two that matter most: "what's the longest you've stayed consistent, and what ended it?" and "what part do you already know you're bad at?" Write down his exact words — you're using them on the next slide. If he gives you a short answer, say "tell me more" once and then wait. Do not rescue him from silence. Ten minutes max, then move.` },

  { n: 4, title: `what i'm hearing.`,
    note: `EDIT THIS LIVE if his answers were different — the columns are a starting guess, not gospel. Read the left column out loud slowly, then the right. Then ask: "Did I get that right?" Wait for confirmation. This is the moment he feels understood and it does more work than any other slide. Do not advance until he confirms. If he corrects you, say "good — that's more useful" and use HIS version for the rest of the call.` },

  { n: 5, title: `your week has no feedback loop.`,
    note: `Walk down the chain one line at a time. Slowly. Let him recognise himself in it. Then land the body line: "This isn't a discipline problem. You can't progressively overload something you never wrote down." Pause hard. Then: "You've probably trained hard for years. Do you know what you benched eight weeks ago?" Let him answer. He won't. That's the whole pitch in one question.` },

  { n: 6, title: `the loop.`,
    note: `This is the product. Slow down. Walk all six numbered items. Then say: "The call sets the direction. The dashboard runs the other six days." Pause. "Most coaches send you a program and check in when they remember. This is one call a week, same slot, and I've already read your week before you get on it." Then: "You never show up to a call and have to explain what happened. I already know."` },

  { n: 7, title: `training built around your week.`,
    note: `Keep it quick — he knows how to train, don't teach him. The line that matters is the last pillar: "The plan changes every two weeks." Say: "Eight weeks is four phases, not one workout repeated eight times. Baseline, load, push, consolidate." Then: "Most programs are one block copy-pasted. That's why people stall at week four."` },

  { n: 8, title: `food you will actually eat.`,
    note: `Fast. Do not over-explain nutrition to a guy who follows fitness content. The only lines that matter: "It's built from what you already eat — the intake asks, I don't guess." And: "No weighing, no tracking app. Hit the protein number and the day is done." Then the footer: "If a plan needs you to be a different person to follow it, it's a bad plan." Move on.` },

  { n: 9, title: `this is what you get monday.`,
    note: `THE CLOSE STARTS HERE. Share screen, open /client/sample-8week. Walk the tabs deliberately, don't rush: START HERE — "one screen, the mission for the week and the 8-week arc." TRAINING — "every session, every cue, already written." LOG — "this is the one that matters. You log every set at the gym and it shows you last week's numbers next to today's." PROGRESS — "every lift, first vs best, what you've added." CHECK IN — "two lines at night. I read every one before your call." Then stop and ask: "Have you ever had anything like this?" SILENCE. Let him answer.` },

  { n: 10, title: `what's actually included.`,
    note: `Read the list at a measured pace — the length is the point. Then the footer: "Not a PDF. A system that updates because someone is actually looking at it." Don't add anything. Advance.` },

  { n: 11, title: `you don't need more information.`,
    note: `Say: "Based on what you told me, I think you're a strong fit." Pause. Then use HIS words from slide 3 about what he's bad at: "You told me you're bad at ___. Most people can't tell me that. That's the whole reason this works — I don't have to spend three weeks finding it." Let it land.` },

  { n: 12, title: `is that the part you've been missing?`,
    note: `Ask it exactly as written. Then STOP TALKING COMPLETELY. Do not soften it, do not explain it, do not fill the gap. Count to ten in your head if you have to. If he says yes — go to price. If he hesitates — "what's making you hesitate?" and let him name it. Address only what he actually raises. Never invent an objection for him.` },

  { n: 13, title: `$125 a week. 8 weeks.`,
    note: `Say the number plainly and then be quiet for three full seconds. "It's $125 a week, eight weeks, so a thousand across the block." Pause. Then: "It's priced weekly because it's delivered weekly — you're buying eight calls and eight weeks of someone watching, not a document." Then: "Does that match the level of support you said you needed?" STOP. — IF PRICE OBJECTION: do not discount first. Ask "is it the number or the timing?" If timing, offer the start date, not a lower price. If genuinely the number, the only move is 4 weeks at $125 to start, then continue — do NOT cut the weekly rate, it sets the floor for everyone after him.` },

  { n: 14, title: `eight weeks of being watched.`,
    note: `Deliver calm. Then: "What questions do you have before we start?" Go silent. Whatever he says next is the close. IF YES: "Good. I'm sending you the intake form now — fill it tonight, it takes about ten minutes. Your dashboard is live tomorrow and we do call one on ___." Get the day and time on the calendar BEFORE you hang up. Send the intake link while he's still on the call. IF NOT NOW: "No problem — what would need to be true for this to be a yes?" Listen, don't argue, and set a follow-up date.` },
];

export default function XaviorNotesPage() {
  const [active, setActive] = useState(0);
  const current = NOTES[active];

  return (
    <div style={{ background: '#000', minHeight: '100dvh', fontFamily: 'Inter, -apple-system, sans-serif', fontWeight: 300, color: '#EDEDE8', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '1.2rem 1.4rem 0.8rem', borderBottom: '1px solid #141414', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '0.78rem', color: '#3A3A3A', letterSpacing: '0.02em' }}>vveritas* notes — xavior</span>
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
          short discovery. show the loop. name the price. go quiet.
        </div>
        <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.44rem', letterSpacing: '0.1em', color: '#141414', textAlign: 'center' }}>
          he knows enough already. he has never had a record, or anyone reading it.
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderTop: '1px solid #141414' }}>
        <button onClick={() => setActive(i => Math.max(i - 1, 0))} disabled={active === 0} style={{ padding: '1.1rem', background: 'none', border: 'none', borderRight: '1px solid #141414', color: active === 0 ? '#1a1a1a' : '#5A5A5A', fontFamily: 'inherit', fontSize: '0.85rem', cursor: active === 0 ? 'default' : 'pointer' }}>← prev</button>
        <button onClick={() => setActive(i => Math.min(i + 1, NOTES.length - 1))} disabled={active === NOTES.length - 1} style={{ padding: '1.1rem', background: 'none', border: 'none', color: active === NOTES.length - 1 ? '#1a1a1a' : '#EDEDE8', fontFamily: 'inherit', fontSize: '0.85rem', cursor: active === NOTES.length - 1 ? 'default' : 'pointer' }}>next →</button>
      </div>
    </div>
  );
}
