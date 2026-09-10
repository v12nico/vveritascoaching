'use client';

// Private. Not linked from anywhere Anthony will see.

const REMINDER = 'let him talk. do not oversell. hybrid is the recommendation, not the upsell.';

const RULES = [
  'he talks 80% of the call. you ask, he answers.',
  'do not overwhelm him with features — nine bullet points read aloud kills a call.',
  'do not promise a number of pounds in eight weeks.',
  'ask about injuries directly, not in passing.',
  'confirm gym access in parkville / towson and how he gets there.',
  'the dashboard and nutrition are tools that make the training easier to follow — not separate products.',
  'do not apologise for the price. do not fill the silence after it.',
  'hybrid is fewer sessions than he might expect. say why before he asks.',
];

const NOTES = [
  { n: 1, title: 'built for you.',
    note: `Let him see it before you speak. Then: "You reached out because you want a trainer — I want to understand where you're actually at first, then I'll show you what I'd build." No features, no price yet.` },

  { n: 2, title: 'tell me where you are.',
    note: `Most of the call lives here. He trained consistently January to June then stopped — find out what actually broke. Life change, boredom, no plan, injury? His answer is what makes the hybrid framing land or not. If he stopped because he had no structure, hybrid is obviously right. If he stopped because he lost accountability, lean harder on the check-ins and messaging. Ask about injuries directly. Confirm realistic training days before you promise a schedule. After every answer: "tell me more."` },

  { n: 3, title: "what i'm hearing.",
    note: `Read each item out loud, slowly. Then "Does that sound right?" and WAIT for the yes. This is the moment he feels heard and it does more than any slide that follows. Land the closing line deliberately: "This isn't about motivation. It's about creating a system you can actually stick to." Then stop talking.` },

  { n: 4, title: 'the first eight weeks.',
    note: `Weeks 1–2 are about completion, not intensity — say it out loud. He already knows how to train hard; training hard is not what failed in June. If he pushes for a scale number: "I could give you one, but I'd be guessing. What I'll promise is in eight weeks you're stronger, in a routine, and we have real measurements to build from." Never attach pounds to eight weeks.` },

  { n: 5, title: "so you're not guessing between sessions.",
    note: `Open /portal/anthony-demo. Two minutes maximum. Today: "One list. No decisions." Fitness: "Written before you get there — including the days I'm not with you." Nutrition: "Protein target and a grocery list. No calorie app unless you want one." Read one coach message aloud. Then close the tab. Lingering here makes the dashboard look like the product.` },

  { n: 6, title: 'why i recommended hybrid.',
    note: `THE slide. Say: "Since you've already spent months in the gym, I don't think you need someone standing beside you every workout. I think you'd benefit more from learning how to train confidently on your own while still having me there to guide you. That's exactly why I recommend the hybrid." Pause and let him react. If he asks for more in-person, that's fine — but make him say why. If it's accountability, good. If it's because he doesn't trust himself, that's a different conversation and worth having honestly.` },

  { n: 7, title: "what's included.",
    note: `Do NOT read all nine aloud. Point at the list and say: "The sessions are the service. Everything else exists so the days I'm not there still count." Then move on. This slide is there to be seen, not narrated.` },

  { n: 8, title: 'hybrid transformation.',
    note: `First time price appears. "Eight weeks, sixteen in-person sessions, everything around it — $997, or two payments of $499." Then WAIT. Do not fill the silence, do not justify, do not discount. When he responds: "I intentionally designed this so you don't have to keep paying for a trainer forever. My goal isn't to create dependency — it's to give you the structure and confidence to eventually handle this on your own." That line is why the price is fair and why hybrid is the honest recommendation.` },

  { n: 9, title: 'the training is still the point.',
    note: `Close: "You originally reached out because you wanted a trainer. That's still exactly what this is. I just built a system around the training so you have support even when we're not together. That's what helps people stay consistent." Then ask if he wants to start and send /enroll/anthony. If he needs to think, agree a specific day — never "let me know."` },
];

const mono = { fontFamily: 'ui-monospace, monospace', letterSpacing: '0.22em', textTransform: 'uppercase' };
const ACCENT = '#6a8fb0';

export default function Notes() {
  return (
    <div style={{ background: '#000', minHeight: '100dvh', color: '#EDEDE8',
                  fontFamily: 'Inter, -apple-system, sans-serif', fontWeight: 300, padding: '2.5rem 1.5rem' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ ...mono, fontSize: '0.44rem', color: '#3A3A3A' }}>vveritas* — private speaker notes</div>

        <h1 style={{ fontSize: 'clamp(1.3rem, 4.2vw, 1.85rem)', fontWeight: 200, lineHeight: 1.3,
                     marginTop: '1rem', color: ACCENT }}>
          {REMINDER}
        </h1>

        <div style={{ border: '1px solid #141414', padding: '1.2rem', marginTop: '2rem' }}>
          <div style={{ ...mono, fontSize: '0.44rem', color: '#3A3A3A', marginBottom: '0.8rem' }}>hold these</div>
          {RULES.map((r, i) => (
            <div key={i} style={{ fontSize: '0.88rem', color: '#B5B5B0', lineHeight: 1.6, padding: '0.3rem 0' }}>
              — {r}
            </div>
          ))}
        </div>

        <div style={{ marginTop: '2.5rem' }}>
          {NOTES.map(n => (
            <div key={n.n} style={{ borderTop: '1px solid #0f0f0f', padding: '1.4rem 0' }}>
              <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'baseline' }}>
                <span style={{ ...mono, fontSize: '0.5rem', color: ACCENT }}>{String(n.n).padStart(2, '0')}</span>
                <span style={{ fontSize: '1rem', fontWeight: 300 }}>{n.title}</span>
              </div>
              <p style={{ fontSize: '0.9rem', color: '#8A8A8A', lineHeight: 1.75, marginTop: '0.7rem' }}>{n.note}</p>
            </div>
          ))}
        </div>

        <div style={{ ...mono, fontSize: '0.44rem', color: '#2A2A2A', marginTop: '3rem' }}>
          he can already train. sell him the structure, not the supervision.
        </div>
      </div>
    </div>
  );
}
