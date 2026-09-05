'use client';
import { useState } from 'react';

const NOTES = [
  { n: 1, title: `built for tayllore.`,
    note: `On screen when she joins. Let her see her name. Open with: "Before anything — you lost forty pounds. On your own. Most people never get there, so I'm not going to skip past it." Then straight in: "But I want to understand what actually happened, because I think you're being sold the wrong next step by everyone including yourself." Don't explain that yet. Ask: "How did you lose it?"` },

  { n: 2, title: `this is an assessment.`,
    note: `Set the frame in twenty seconds — it's a 30 minute call, don't burn it. "I'm going to ask questions, then tell you what I actually think, then show you the eight weeks. Some of what I say won't be what you expect." Get a yes and move.` },

  { n: 3, title: `tell me what the forty pounds cost you.`,
    note: `THE MOST IMPORTANT SECTION. You are listening for one thing: how long has she been in a deficit and how little is she eating now. The questions that matter: "what does a normal day of eating look like NOW" and "when did the scale stop." If she says something like 1,200-1,400 calories, or "I barely eat and nothing happens" — that's your whole diagnosis and slide 5 lands like a truck. Also find out: has she ever lifted, or has it all been cardio? Write down her exact words for "still not there" — do NOT repeat "still fat" back to her.` },

  { n: 4, title: `what i'm hearing.`,
    note: `EDIT LIVE if her answers differ. Read the left column slowly — that's the credit she's owed and probably hasn't been given. Then the right. Then: "Did I get that right?" Wait. The left column matters more than the right here; she's been beating herself up and the reframe is that she succeeded at something hard and is now being punished for it by bad advice.` },

  { n: 5, title: `the thing that got you here will not get you there.`,
    note: `THE PIVOT OF THE WHOLE CALL. Walk the chain one line at a time. Slowly. She will recognise herself around line four. Then land it: "Your metabolism is not broken. It did exactly what it's supposed to do when you eat less for a long time." Pause. "Everything you know how to do is subtraction. What you want now — glutes, shape, a body you like — is addition. That's why nothing's working. You're using the right tool for the wrong job." Then stop and let her react. This is where she either gets it or doesn't, and everything after depends on it.` },

  { n: 6, title: `what eight weeks looks like.`,
    note: `Now the mechanics. "Sunday morning, Anytime Fitness in Columbia, one hour, hands on. You train twice more that week on your own. Everything goes in the app. I read it before Sunday." Then the line that matters to her specifically: "Week eight, you can write your own program. That is the actual goal. You told me you want to be sent on your way — I'm building that in from day one, not pretending you'll stay forever."` },

  { n: 7, title: `glutes are built, not revealed.`,
    note: `She asked for glutes. Be direct: "You can't reveal a muscle that isn't there. Glutes are built, and building takes food and load — which is the opposite of what you've been doing for however long." Name the three lifts. Then: "You'll learn these properly. Not off a video — properly, with me watching, until you can feel the right thing working." That's the in-person value proposition in one sentence.` },

  { n: 8, title: `you are probably going to eat more.`,
    note: `THE HARDEST SELL. Say it plainly and then be quiet. "You're probably going to eat more than you're eating now." Let her react — she may push back hard, and that's fine. Then: "The scale might not move for a few weeks. That is the plan, not a failure." And: "Recomposition doesn't show up on a scale. It shows up in a photo and in your clothes." If she's scared of regaining: "You kept forty pounds off. You know how to do that. This is not that." Do NOT skip past her fear here — it's real and it's earned.` },

  { n: 9, title: `the six days i am not there.`,
    note: `Screen share the dashboard. Walk it fast, this is a 30 min call. START HERE — the week's mission and the 8-week arc. TRAINING — every session written with cues. LOG — "this is the one. You log every set, and last week's numbers sit next to today's. That's how you learn progressive overload — by doing it, not by me explaining it." PROGRESS — first vs best on every lift. CHECK IN — two lines a night, I read every one. Then: "Have you ever had anything like this?" Stop.` },

  { n: 10, title: `what's included.`,
    note: `Read the list at pace. Land on the footer and let it sit: "You are paying to not need me in eight weeks." That's the whole differentiator. Every other trainer she's talked to is selling forever.` },

  { n: 11, title: `you already proved the hard part.`,
    note: `"You don't have a discipline problem — forty pounds proves that. You have a direction problem. Everything you know is subtraction and what you want requires building. That's a two-week learning curve, not a character change." Pause. This is the line she'll remember from the call.` },

  { n: 12, title: `does that sound like what has actually been happening?`,
    note: `Ask exactly as written. STOP TALKING. Count to ten. If yes — go to price. If she hesitates — "what part doesn't land?" and address only what she raises. Do not invent objections for her.` },

  { n: 13, title: `$250 a week. 8 weeks.`,
    note: `DO NOT say the number first. Walk the arithmetic and let her do the adding. "Personal training around here runs seventy-five to a hundred fifty a session. Eight sessions at the middle of that is a thousand — that's just the hours, no programming, no app, nobody checking on you." Pause. "The program, the app, the check-ins, the weekly rewrites — that's another thousand on its own." Pause. "Together it's two thousand. Which is two-fifty a week." THREE SECONDS OF SILENCE. Then: "That's not a bundle discount. That's just what the pieces cost. What you're actually getting that nobody else gives you is the hour AND the six days after it." Then: "Does that match what you said you needed?" STOP TALKING. — IF PRICE OBJECTION: ask "is it the number or the timing?" If timing, offer a start date, not a discount. If it's genuinely the number, the ONLY move is fewer in-person sessions: every other Sunday at $175/wk, app running all eight weeks either way. NEVER cut the weekly rate for the same service — it sets your floor for every in-person client after her, and she is the first.` },

  { n: 14, title: `eight weeks to not need a trainer.`,
    note: `Deliver calm. "What questions do you have?" Go silent. IF YES: "I'm sending the intake now — fill it tonight, ten minutes. Your dashboard is live tomorrow and we start Sunday at [time]." GET THE SUNDAY TIME ON THE CALENDAR BEFORE YOU HANG UP. Send the intake link while she's still on. IF NOT NOW: "What would need to be true for this to be a yes?" Listen, set a follow-up.` },
];

export default function TaylloreNotesPage() {
  const [active, setActive] = useState(0);
  const current = NOTES[active];

  return (
    <div style={{ background: '#000', minHeight: '100dvh', fontFamily: 'Inter, -apple-system, sans-serif', fontWeight: 300, color: '#EDEDE8', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '1.2rem 1.4rem 0.8rem', borderBottom: '1px solid #141414', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '0.78rem', color: '#3A3A3A', letterSpacing: '0.02em' }}>vveritas* notes — tayllore</span>
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
          credit the 40 lb. diagnose the deficit. sell the exit.
        </div>
        <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.44rem', letterSpacing: '0.1em', color: '#141414', textAlign: 'center' }}>
          she is not undisciplined. she has been doing subtraction and wants addition. never repeat &ldquo;still fat&rdquo; back to her.
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderTop: '1px solid #141414' }}>
        <button onClick={() => setActive(i => Math.max(i - 1, 0))} disabled={active === 0} style={{ padding: '1.1rem', background: 'none', border: 'none', borderRight: '1px solid #141414', color: active === 0 ? '#1a1a1a' : '#5A5A5A', fontFamily: 'inherit', fontSize: '0.85rem', cursor: active === 0 ? 'default' : 'pointer' }}>← prev</button>
        <button onClick={() => setActive(i => Math.min(i + 1, NOTES.length - 1))} disabled={active === NOTES.length - 1} style={{ padding: '1.1rem', background: 'none', border: 'none', color: active === NOTES.length - 1 ? '#1a1a1a' : '#EDEDE8', fontFamily: 'inherit', fontSize: '0.85rem', cursor: active === NOTES.length - 1 ? 'default' : 'pointer' }}>next →</button>
      </div>
    </div>
  );
}
