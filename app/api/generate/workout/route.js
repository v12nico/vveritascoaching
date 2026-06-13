import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const BASE_CONTEXT = (intake) => `
CLIENT INTAKE:
- name: ${intake.name}
- age: ${intake.age}
- experience: ${intake.experience}
- training days/week: ${intake.days}
- split preference: ${intake.split}
- primary goal: ${intake.goal}
- equipment: ${intake.equipment}
- injuries / limitations: ${intake.injuries || 'none'}
- notes: ${intake.notes || 'none'}
`.trim();

const SYSTEM = `
You are building a custom workout program using the vveritas* training system by Nico. This is the exact methodology:

TRAINING PHILOSOPHY:
- Two sets to failure per movement. Heavy. That's the whole system.
- Rep range sweet spot: 3–7 reps. Heavy enough that you're grinding, light enough that form is still locked in. You don't sacrifice form — ever.
- Beginners: slightly higher reps (8–12), focus on form mastery before adding load. Don't make it easy, just make it correct.
- Progressive overload is the only variable that matters long term.

SPLITS:
- Push / Pull / Legs (PPL): 3x/week OR 6x/week (push×2, pull×2, legs×2)
- Upper / Lower: 4x/week
- Full Body: 3x/week (for beginners or limited schedules)
- Match the split to the client's available days and experience.

PUSH (chest, shoulders, triceps):
- Chest: 3 movements — flat press (primary), incline press, cable or dumbbell fly
- Shoulders: 2 movements — lateral raise, overhead press
- Triceps: 1–2 movements — tricep pushdown is the foundation; add overhead extension or dips if wanted
- Total: 6–7 movements

PULL (back, rear delts, biceps):
- Back: 2–3 movements — lat pulldown or pullover, seated cable row, upper back row (t-bar, chest-supported, or barbell)
- Rear delts: 1 movement — face pull, reverse fly, or band pull-apart
- Biceps: 2 movements — standard curl (barbell or dumbbell), hammer curl or reverse curl
- Total: 5–6 movements

LEGS (quads, hamstrings, glutes, calves, adductors):
- Squat movement — barbell squat, hack squat, or goblet squat depending on equipment
- Hip thrust — glute focus, loaded
- Quad extension — leg extension machine or sissy squat
- Hamstrings: leg curl machine OR Romanian deadlift (RDL) — can alternate or do both
- Calves: standing or seated calf raise
- Hip adductors / abductors: machine or banded
- Total: 6–7 movements

UPPER BODY (when using upper/lower split):
- Combines push and pull movements: press, row, pull, raise, curl
- 8–10 movements total, balanced across chest/back/shoulders/arms

FORMAT RULES:
- Plain text only. No markdown, no asterisks, no bold. Lowercase section labels.
- Sets x reps format for every exercise. E.g.: "flat barbell press — 2 sets to failure (3–7 reps)"
- Include brief coaching note per exercise where useful (e.g., "control the negative, drive through the full range")
- Voice: direct, real, lowercase. Like Nico telling you in person. Not a fitness app template.
`.trim();

const PREVIEW_PROMPT = (intake) => `
${SYSTEM}

${BASE_CONTEXT(intake)}

Write a SHORT personalized preview — not the full program. Include:
1. Two sentences to ${intake.name || 'the client'} by name about their specific intake and what the program is going to do for them.
2. Their recommended split (with reasoning based on their days and experience).
3. One complete training day written out in full (push day, pull day, or legs — pick the most relevant to their goal).

Stop after the one day. Do not write the full program. This is a teaser.
Plain text only. Lowercase. Direct voice.
`.trim();

const FULL_PROMPT = (intake) => `
${SYSTEM}

${BASE_CONTEXT(intake)}

Build a complete custom workout program for this client. Include:
1. Short intro to ${intake.name || 'the client'} by name — what you built and why based on their intake.
2. Their split laid out by day (e.g., Day 1: Push, Day 2: Pull, Day 3: Legs, Day 4: rest...).
3. Every training day written in full — every exercise, sets x reps, brief coaching note.
4. A short section on progressive overload: how they should be adding weight over time.
5. 3 rules to follow in the gym — non-negotiable.

Plain text only. Lowercase. Direct voice. Complete but tight — no filler.
`.trim();

export async function POST(req) {
  try {
    const intake = await req.json();
    if (!process.env.ANTHROPIC_API_KEY) {
      return Response.json({ error: 'API key not configured' }, { status: 500 });
    }

    const isPreview = intake.preview === true;
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: isPreview ? 600 : 3500,
      messages: [{ role: 'user', content: isPreview ? PREVIEW_PROMPT(intake) : FULL_PROMPT(intake) }],
    });

    const plan = message.content.filter((b) => b.type === 'text').map((b) => b.text).join('\n');
    return Response.json({ plan });
  } catch (err) {
    console.error('workout generation error:', err);
    return Response.json({ error: 'generation failed' }, { status: 500 });
  }
}
