'use client';
import { useState } from 'react';

const NOTES = [
  { n: 1, title: `built for monty.`,
    note: `On screen before he joins. Let him see his name. When he reacts, open with: "Monty — you told me two things. Athletic and lean, and reverse the pre-diabetes. Most people would tell you to pick one and do it first." Pause. "I'm going to show you why they're the same thing." That's the hook for the whole call. Then: "Ten minutes on where you are, then I show you what you'd actually be using. Cool?" Wait for a yes.` },

  { n: 2, title: `this part is short.`,
    note: `Set the frame fast. The line that matters is the last one: "then you decide. I'm not going to chase you." He's 19 — he is braced for a hard sell because everything aimed at him online is one. Taking the pressure out early is what makes him relax and tell you the truth in the next slide. Do not linger here. Move.` },

  { n: 3, title: `tell me where you actually are.`,
    note: `THE FIRST FOUR ARE THE ONES THAT MATTER — they're highlighted for a reason. Ask them one at a time and SHUT UP after each. "What's the actual number?" is first on purpose: pre-diabetic spans a wide range, and if he doesn't know his A1c, that itself is information — it means nobody sat him down properly. IF HE'S NOT UNDER ANY MEDICAL CARE: note it, don't make it a big moment now. You handle it on the scope slide. Write his exact words down — you're using them on the next slide.` },

  { n: 4, title: `what i'm hearing.`,
    note: `EDIT THIS LIVE if his answers were different — the columns are a starting guess. Read the left slowly, then the right. Then: "Did I get that right?" Wait. The one line to land hard is "5'8", 161 — normal on the scale." Say it and then say: "You don't have a weight problem. Nobody's told you that, have they?" That single sentence does more than the rest of the deck. Do not advance until he confirms.` },

  { n: 5, title: `the advice you got makes it worse.`,
    note: `THE CENTRE OF THE CALL. Slow all the way down. Walk the chain one line at a time, out loud. Let him recognise every step. Then land the body: "Muscle is the largest glucose sink in your body — it's where sugar goes to be used instead of stored." Pause hard. Then: "So every diet that costs you muscle makes the metabolic problem harder. Not easier. Harder." Longest pause of the call. Then quietly: "That's why eating less hasn't fixed it."` },

  { n: 6, title: `you don't have to pick one.`,
    note: `This is the relief slide — he's just been shown the trap, now show the way out. "Heavy lifting, high protein, carbs around training. That's the physique protocol AND the insulin sensitivity protocol. Same plan." Then: "You haven't been failing. You've been given the wrong plan for both goals at once." Say that last line gently. He's 19 and he's probably been blaming himself.` },

  { n: 7, title: `what i am, and what i am not.`,
    note: `DO NOT SKIP THIS AND DO NOT RUSH IT. Read the right column out loud — the things you DON'T do. Then the body: "You keep seeing whoever diagnosed you. They track the bloodwork. I build the training and the food." IF HE SAID HE'S NOT UNDER ANYONE'S CARE: this is where you handle it. "Before we start I want you to get seen and get a current number. Not because I'm covering myself — because without a baseline neither of us can tell if this is working." Saying this before price makes you sound like a professional. Skipping it makes you sound like every online coach he's scrolled past.` },

  { n: 8, title: `the loop.`,
    note: `This is the product. Walk all six. Then: "The call sets the direction. The dashboard runs the other six days." Then the line for him specifically: "You're 19 and you've never trained properly. That's not a disadvantage — it means everything works. But only if it's written down, because beginner progress is fast and you'll forget what you lifted two weeks ago."` },

  { n: 9, title: `built to put muscle on you.`,
    note: `Keep it moving — don't teach him programming, he has no reference for it. Two lines matter. The athletic day: "You said athletic. Athletic is trained, it's not a side effect — so there's a day for jumps and short sprints." And the footer: "You're 19 with no training history. That is the single best position anybody can be in. Everything works right now." Let him feel that.` },

  { n: 10, title: `you are going to eat more.`,
    note: `HE WILL PUSH BACK HERE. Expect it. He's been told pre-diabetic means eat less. Say: "I know. It sounds backwards." Then: "You're 161 at 5'8". If we cut, you lose the muscle that's supposed to be soaking up your glucose, and you end up smaller with the same problem." Then the carbs line: "We're not cutting carbs out — we're putting them around training, when your muscle actually takes them up." IF HE'S SCARED OF THE SCALE GOING UP: "It will. Slowly. That's the plan working." Don't over-argue. Say it once, clearly, and move.` },

  { n: 11, title: `the one you start tonight.`,
    note: `GIVE THIS AWAY PROPERLY. Don't hedge it, don't tie it to buying. "Ten to fifteen minutes of walking after you eat. Not a workout. A walk." Then: "It blunts the glucose spike directly. Three short walks after meals do more for this than one gym session." Then the body line, and mean it: "I'm giving you that before you've paid me anything. Do it for a week." This is the slide that earns the sale, precisely because it isn't selling. Do not rush past it to get to price.` },

  { n: 12, title: `this is what you get monday.`,
    note: `Share screen, open /client/sample-8week. Walk the tabs: START HERE — "the mission for the week, one screen." TRAINING — "every session, every cue, already written — you never walk in wondering." LOG — "the one that matters. You log every set and it shows last week's numbers next to today's." PROGRESS — "first lift versus best lift, what you've added." CHECK IN — "two lines at night. I read every one." Then stop: "Have you ever had anything like this?" SILENCE.` },

  { n: 13, title: `what's actually included.`,
    note: `Read the list at a measured pace — the length is the point. Then the footer: "Not a PDF. A system that updates because someone is actually looking at it." Nothing else. Advance.` },

  { n: 14, title: `is that the part nobody has given you?`,
    note: `Ask it exactly as written. Then STOP TALKING. Do not soften it, do not explain, do not fill the silence. Count to ten. If he says yes — go to price. If he hesitates — "what's making you hesitate?" and let him name it. Address only what he actually raises. Never invent an objection for him.` },

  { n: 15, title: `$125 a week. 8 weeks.`,
    note: `Say it plainly, then three full seconds of silence. "$125 a week, eight weeks — a thousand across the block." — HE IS 19. EXPECT THE PRICE OBJECTION. Do not discount first. Ask: "is it the number, or the timing?" IF TIMING: offer a start date, not a lower price. IF GENUINELY THE NUMBER: the only move is 4 weeks at $125 to start, then continue — do NOT cut the weekly rate. It sets the floor for everyone after him, and a 19-year-old telling his friends he got it for $60 is a pricing problem you'll be living with for a year. IF HE TRULY CAN'T: the honest answer is "not yet." Give him the walk, tell him to come back. That's a better outcome than a resentful client at half price.` },

  { n: 16, title: `nineteen is the best possible time to find this out.`,
    note: `Deliver this calm and let it sit. "Most people get this news at forty with twenty years of habits behind it. You get to fix it before it's a story about your life." Then: "What questions do you have before we start?" Go silent. IF YES: "Good. I'm sending the intake now — fill it tonight, ten minutes. Dashboard's live tomorrow and call one is ___." Get the day and time BEFORE you hang up, and send the intake link while he's still on the call. IF NOT NOW: "No problem — what would need to be true for this to be a yes?" Listen, don't argue, set a follow-up date.` },
];

export default function MontyNotesPage() {
  const [active, setActive] = useState(0);
  const current = NOTES[active];

  return (
    <div style={{ background: '#000', minHeight: '100dvh', fontFamily: 'Inter, -apple-system, sans-serif', fontWeight: 300, color: '#EDEDE8', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '1.2rem 1.4rem 0.8rem', borderBottom: '1px solid #141414', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '0.78rem', color: '#3A3A3A', letterSpacing: '0.02em' }}>vveritas* notes — monty</span>
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
          muscle is the treatment. say the scope out loud. give the walk away free.
        </div>
        <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.44rem', letterSpacing: '0.1em', color: '#141414', textAlign: 'center' }}>
          he does not have weight to lose. nobody has told him that yet.
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderTop: '1px solid #141414' }}>
        <button onClick={() => setActive(i => Math.max(i - 1, 0))} disabled={active === 0} style={{ padding: '1.1rem', background: 'none', border: 'none', borderRight: '1px solid #141414', color: active === 0 ? '#1a1a1a' : '#5A5A5A', fontFamily: 'inherit', fontSize: '0.85rem', cursor: active === 0 ? 'default' : 'pointer' }}>← prev</button>
        <button onClick={() => setActive(i => Math.min(i + 1, NOTES.length - 1))} disabled={active === NOTES.length - 1} style={{ padding: '1.1rem', background: 'none', border: 'none', color: active === NOTES.length - 1 ? '#1a1a1a' : '#EDEDE8', fontFamily: 'inherit', fontSize: '0.85rem', cursor: active === NOTES.length - 1 ? 'default' : 'pointer' }}>next →</button>
      </div>
    </div>
  );
}
