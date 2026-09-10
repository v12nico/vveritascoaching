'use client';

// Private. Not linked from anywhere Phyllis will see.

const REMINDER = 'listen. keep it simple. recommend the realistic frequency.';

const RULES = [
  'do not overwhelm her with features.',
  'do not promise 50 pounds in eight weeks.',
  'ask about injuries and medical limitations — directly, not in passing.',
  'confirm gym access near morgan state.',
  'confirm transportation and how she is getting there.',
  'explain that four sessions a week needs adequate recovery.',
  'let her choose after hearing your recommendation.',
  'keep the focus on personal training.',
  'present the dashboard as support, not the product.',
  'do not apologize for the price.',
  'do not pressure her financially.',
];

const NOTES = [
  { n: 1, title: 'built for phyllis.',
    note: `Let her see her name before you talk. Then: "Phyllis, I kept this simple because you reached out for personal training." Pause. "I want to understand your schedule, your starting point, and what made it difficult to stay consistent before. Then I'll show you the training options and recommend the one I think fits best." Do not open with features.` },

  { n: 2, title: 'first, i want to listen.',
    note: `Set the frame so she knows a bundle is not coming. "This isn't a pitch. I ask, you talk, then I recommend." Ask "sound fair?" and wait for a yes.` },

  { n: 3, title: 'tell me where you are right now.',
    note: `The most important slide — she should be talking most of the call here. Her exact words become the language you use for the rest of it. Question 3 is not optional: injuries, pain, anything a doctor has told her to avoid, any medication that affects exercise. If anything is unclear, the honest answer is "let's get that cleared before we load it." Also confirm: gym access near Morgan State, how she is getting there, and which days are genuinely repeatable. After each answer: "tell me more." Do not fill silences.` },

  { n: 4, title: "what i'm hearing.",
    note: `Read each item out loud, slowly. Then: "Does that sound right?" Wait for confirmation before moving. This is the moment she feels heard and it matters more than any slide. Then set the expectation honestly: "The full 50-pound goal is bigger than eight weeks. But eight weeks is enough to rebuild the routine, get stronger, start changing measurements, and build momentum you can keep." Never attach a pound number to eight weeks.` },

  { n: 5, title: 'the first eight weeks.',
    note: `Walk the phases slowly. Say out loud that weeks 1–2 are about completion, not intensity — that is what gets someone back in the gym. If she pushes for a number: "I could give you one, but I'd be guessing. What I can promise is that in eight weeks you'll be stronger, in a routine, and we'll have real measurements to build the next phase from."` },

  { n: 6, title: 'so you are not guessing between sessions.',
    note: `Open /portal/phyllis-demo. Two minutes maximum. Today: "One short list. No decisions." Workouts: "Already written before you arrive." Nutrition: "A protein target and a grocery list — no calorie app unless you want one." Progress: "Weight, waist, attendance, what you lifted." Check-In and Messages: read one aloud. Then close the tab. Do not linger — lingering makes the dashboard look like the product.` },

  { n: 7, title: 'personal training, with the support around it.',
    note: `"The in-person sessions are the main service. The tracking, nutrition structure, check-ins and messaging are included so you're not figuring it out alone between sessions." Then: "It is not extra work for you. It is extra structure around the work we're already doing." Say nothing about mindset, business, spirituality or self-mastery. If she asks whether it costs more: "No. Same session rate either way."` },

  { n: 8, title: 'your options.',
    note: `First time price appears. Say it plainly and then stop. "You originally asked for four sessions a week, so that's 32 sessions over eight weeks. At $50 a session, that's $1,600 total, or $800 a month." Then: "I also put two and three day options in, in case a different frequency fits your schedule or recovery better." Then: "Which schedule feels realistic for you to maintain?" — and WAIT. Do not fill the silence. Do not apologize for the price. If the health screening or her schedule says four is too much, say so plainly. Recommending three is not a downsell, it's the honest call, and she will trust you more for it.` },

  { n: 9, title: 'the training is the center.',
    note: `"You reached out for personal training, and that's still exactly what this is. The rest is there so the week between our sessions isn't guesswork." Then ask which schedule she wants and send /enroll/phyllis. If she needs to think, agree a specific day to follow up — not "let me know."` },
];

const mono = { fontFamily: 'ui-monospace, monospace', letterSpacing: '0.22em', textTransform: 'uppercase' };

export default function Notes() {
  return (
    <div style={{ background: '#000', minHeight: '100dvh', color: '#EDEDE8', fontFamily: 'Inter, -apple-system, sans-serif', fontWeight: 300, padding: '2.5rem 1.5rem' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ ...mono, fontSize: '0.44rem', color: '#3A3A3A' }}>vveritas* — private speaker notes</div>

        <h1 style={{ fontSize: 'clamp(1.4rem, 4.5vw, 2rem)', fontWeight: 200, lineHeight: 1.25, marginTop: '1rem', color: '#b08a7d' }}>
          {REMINDER}
        </h1>

        <div style={{ border: '1px solid #141414', padding: '1.2rem', marginTop: '2rem' }}>
          <div style={{ ...mono, fontSize: '0.44rem', color: '#3A3A3A', marginBottom: '0.8rem' }}>hold these</div>
          {RULES.map((r, i) => (
            <div key={i} style={{ fontSize: '0.88rem', color: '#B5B5B0', lineHeight: 1.6, padding: '0.3rem 0' }}>— {r}</div>
          ))}
        </div>

        <div style={{ marginTop: '2.5rem' }}>
          {NOTES.map(n => (
            <div key={n.n} style={{ borderTop: '1px solid #0f0f0f', padding: '1.4rem 0' }}>
              <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'baseline' }}>
                <span style={{ ...mono, fontSize: '0.5rem', color: '#b08a7d' }}>{String(n.n).padStart(2, '0')}</span>
                <span style={{ fontSize: '1rem', fontWeight: 300 }}>{n.title}</span>
              </div>
              <p style={{ fontSize: '0.9rem', color: '#8A8A8A', lineHeight: 1.75, marginTop: '0.7rem' }}>{n.note}</p>
            </div>
          ))}
        </div>

        <div style={{ ...mono, fontSize: '0.44rem', color: '#2A2A2A', marginTop: '3rem' }}>
          she asked for a trainer. give her a trainer.
        </div>
      </div>
    </div>
  );
}
