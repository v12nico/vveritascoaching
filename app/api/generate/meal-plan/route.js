import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const BASE_CONTEXT = (intake) => `
CLIENT INTAKE:
- name: ${intake.name}
- age: ${intake.age}
- weight: ${intake.weight} lbs
- goal: ${intake.goal}
- training days/week: ${intake.training}
- eating window: ${intake.window}
- restrictions: ${intake.restrictions || 'none'}
- budget: ${intake.budget}
- notes: ${intake.notes || 'none'}
`.trim();

const PREVIEW_PROMPT = (intake) => `
You are a vveritas* nutrition coach. Primal/ancestral philosophy: grass-fed beef, pasture-raised eggs, raw dairy, wild-caught fish, fruit, raw honey. NO seed oils ever.

${BASE_CONTEXT(intake)}

Write a SHORT personalized preview — not the full plan. Include:
1. Two sentences addressed to ${intake.name || 'the client'} by name about what you see in their intake and what the plan will focus on.
2. Their daily protein target (calculated from their weight and goal).
3. Their eating window structure (first meal time, last meal time based on "${intake.window}").
4. One sample first meal — specific, with prep note.

Plain text only. No markdown. Lowercase labels. Direct voice. Stop after the sample meal — do not continue into the rest of the plan. This is a teaser.
`.trim();

const FULL_PROMPT = (intake) => `
You are building a personalized meal plan for a vveritas* coaching client. Primal/ancestral nutrition: grass-fed beef, pasture-raised eggs, raw dairy where appropriate, wild-caught fish, fruit, raw honey, NO seed oils ever (tallow/ghee/coconut oil only), mineral-rich whole foods, circadian-aligned eating.

${BASE_CONTEXT(intake)}

Build a complete 7-day meal plan. Format requirements:
- Plain text only. No markdown headers, no asterisks, no bold. Lowercase section labels.
- Structure: short intro line to ${intake.name || 'the client'} by name, daily protein target, weekly structure note, each meal with prep notes, full grocery list by section, 3 rules to follow.
- Respect their eating window exactly. Sequence post-workout meals correctly if fasted training is implied.
- Stay inside their budget tier. Tight = ground beef, eggs, canned fish, frozen fruit. Open = raw dairy, wild salmon, bison.
- Voice: direct, lowercase, no hype, no exclamation points. Like a knowledgeable friend, not a meal-prep company.
- Length: complete but tight. No filler.
`.trim();

export async function POST(req) {
  try {
    const intake = await req.json();

    if (!process.env.ANTHROPIC_API_KEY) {
      return Response.json({ error: 'API key not configured' }, { status: 500 });
    }

    const isPreview = intake.preview === true;
    const prompt = isPreview ? PREVIEW_PROMPT(intake) : FULL_PROMPT(intake);
    const maxTokens = isPreview ? 500 : 3000;

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: maxTokens,
      messages: [{ role: 'user', content: prompt }],
    });

    const plan = message.content
      .filter((b) => b.type === 'text')
      .map((b) => b.text)
      .join('\n');

    return Response.json({ plan });
  } catch (err) {
    console.error('meal plan generation error:', err);
    return Response.json({ error: 'generation failed' }, { status: 500 });
  }
}
