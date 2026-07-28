import { getCoachingDb } from '@/lib/db';
import Anthropic from '@anthropic-ai/sdk';
import { Resend } from 'resend';

const SYSTEM = `
You are building a custom workout program using the vveritas* training system by Nico. Exact methodology:

- two sets to failure per movement. heavy. that's the whole system.
- rep range sweet spot: 3–7 reps. heavy enough that you're grinding, light enough that form is locked. never sacrifice form.
- beginners: slightly higher reps (8–12), form mastery before load.
- progressive overload is the only variable that matters long term.

splits (match to available days + experience):
- push / pull / legs (PPL): 3x/week or 6x/week
- upper / lower: 4x/week
- full body: 3x/week (beginners / limited schedule)

push: flat press, incline press, fly, lateral raise, overhead press, tricep pushdown (6–7 movements)
pull: lat pulldown/pullover, seated row, upper-back row, face pull, standard curl, hammer curl (5–6 movements)
legs: squat, hip thrust, leg extension, leg curl or RDL, calf raise, adductor/abductor (6–7 movements)

format: plain text only. no markdown, no asterisks, no bold. lowercase section labels.
every exercise as "movement — 2 sets to failure (3–7 reps)" with a brief coaching note where useful.
voice: direct, real, lowercase. like nico telling you in person. not a template.
`.trim();

const FULL_PROMPT = (c) => `
${SYSTEM}

CLIENT INTAKE:
- name: ${c.name}
- age: ${c.age || '—'}
- height: ${c.height || '—'}
- current weight: ${c.weight_lbs ? c.weight_lbs + ' lbs' : '—'}
- primary goal: ${c.goal || '—'}
- experience: ${c.experience || '—'}
- training days/week: ${c.days_per_week || '—'}
- current program: ${c.current_program || 'nothing yet'}
- starting lifts (best set of 5): squat ${c.lifts.squat || '—'}, bench ${c.lifts.bench || '—'}, deadlift ${c.lifts.deadlift || '—'}, ohp ${c.lifts.ohp || '—'}, row ${c.lifts.row || '—'}
- injuries / limitations: ${c.injuries || 'none'}
- notes: ${c.notes || 'none'}

build a complete custom workout program for this client. include:
1. short intro to ${c.name} by name — what you built and why, based on their intake.
2. their split laid out by day (match their days/week and experience).
3. every training day written in full — every exercise, sets x reps, brief coaching note.
4. progressive overload: how they add weight over time, anchored to their starting lifts.
5. 3 non-negotiable rules in the gym.

plain text only. lowercase. direct voice. complete but tight — no filler.
`.trim();

export async function POST(req) {
  try {
    const sql = getCoachingDb();
    const body = await req.json();
    const {
      slug, name, email, age, height, weight_lbs, goal, experience,
      days_per_week, current_program, starting_lifts, injuries, notes,
    } = body;

    // create-or-get: a client filling out their own intake must never hit a 404
    let [client] = await sql`SELECT id FROM clients WHERE slug = ${slug} LIMIT 1`;
    if (!client) {
      [client] = await sql`
        INSERT INTO clients (slug, name, email)
        VALUES (${slug}, ${name || slug}, ${email || null})
        RETURNING id
      `;
    }
    const clientEmail = email || null;
    const clientName  = name || slug;

    await sql`
      INSERT INTO intake (
        client_id, age, height, weight_lbs, goal, experience,
        days_per_week, current_program, starting_lifts, injuries, notes
      ) VALUES (
        ${client.id}, ${age || null}, ${height || null}, ${weight_lbs || null},
        ${goal || null}, ${experience || null}, ${days_per_week || null},
        ${current_program || null}, ${JSON.stringify(starting_lifts || {})},
        ${injuries || null}, ${notes || null}
      )
    `;

    // generation / email failures must NOT lose the saved intake — isolate each
    let plan = '';
    try {
      if (process.env.ANTHROPIC_API_KEY) {
        const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
        const msg = await anthropic.messages.create({
          model: 'claude-sonnet-4-6',
          max_tokens: 3500,
          messages: [{ role: 'user', content: FULL_PROMPT({
            name: clientName, age, height, weight_lbs, goal, experience,
            days_per_week, current_program, injuries, notes,
            lifts: starting_lifts || {},
          }) }],
        });
        plan = msg.content.filter(b => b.type === 'text').map(b => b.text).join('\n');
      }
    } catch (e) {
      console.error('intake program generation error:', e);
    }

    if (plan) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const to = ['vveritascoaching@gmail.com'];
        if (clientEmail) to.unshift(clientEmail);
        await resend.emails.send({
          from: 'vveritas <onboarding@resend.dev>',
          to,
          subject: `your vveritas* program — ${clientName}`,
          text: `${clientName},\n\nyour custom program from vveritas*. it's also waiting in your portal.\n\n---\n\n${plan}\n\n---\n\nvveritas* coaching\ninstagram.com/_v12nico`,
        });
      } catch (e) {
        console.error('intake email error:', e);
      }
    }

    return Response.json({ ok: true, emailed: Boolean(plan && clientEmail) });
  } catch (err) {
    console.error(err);
    return Response.json({ error: 'server error' }, { status: 500 });
  }
}
