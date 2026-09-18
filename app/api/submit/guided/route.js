import { Resend } from 'resend';
import { getCoachingDb } from '@/lib/db';

// This route used to ONLY send an email, and from Resend's sandbox sender. When
// that send failed there was no second copy — the answers were gone, and the
// page showed the client a success screen anyway. That is how Monty's intake was
// lost. The rule now matches /api/intake: the database write and the email are
// independent, and the request only fails if BOTH failed.

export async function POST(req) {
  const a = await req.json();

  const name = String(a.name || '').trim();
  const email = String(a.email || '').trim();
  if (!name || !email) {
    return Response.json({ error: 'name and email are required' }, { status: 400 });
  }

  let stored = false;
  let emailed = false;

  try {
    const sql = getCoachingDb();
    await sql`
      INSERT INTO client_intakes (slug, full_name, email, package, answers)
      VALUES (
        ${String(name).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')},
        ${name}, ${email}, 'guided', ${JSON.stringify(a)}
      )
    `;
    stored = true;
  } catch (err) {
    console.error('guided db error:', err);
  }

  const lines = [
    `name:            ${name}`,
    `email:           ${email}`,
    ``,
    `goal:`,
    a.goal || '—',
    ``,
    `training days:   ${a.trainingDays || '—'}`,
    `training time:   ${a.trainingTime || '—'}`,
    `experience:      ${a.experience || '—'}`,
    `equipment:       ${a.equipment || '—'}`,
    ``,
    `biggest block:`,
    a.block || '—',
    ``,
    stored ? '' : 'WARNING: database write failed — this email is the only copy.',
  ].join('\n');

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    // Verified domain, not onboarding@resend.dev — the sandbox sender can only
    // deliver to the Resend account owner, which is why these never arrived.
    await resend.emails.send({
      from: 'vveritas <hello@vveritascoaching.com>',
      to: ['ncortezwilliams@gmail.com', 'iamnicofresh@gmail.com', 'vveritascoaching@gmail.com'],
      subject: `[guided] new intake — ${name}`,
      text: lines,
    });
    emailed = true;
  } catch (err) {
    console.error('guided email error:', err);
  }

  // Nobody should have to DM to find out what happens next. This goes out the
  // moment the form lands, so the client has a receipt and a timeline.
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: 'vveritas <hello@vveritascoaching.com>',
      to: email,
      subject: 'got it — your 8 week build',
      text: [
        `${name.split(' ')[0].toLowerCase()},`,
        ``,
        `got your intake. nothing else for you to do right now.`,
        ``,
        `what happens next:`,
        `  — i read it tonight and build your program off it`,
        `  — your dashboard goes live within 24 hours and i send you the link`,
        `  — training, food, and your log all live on that one page`,
        ``,
        `if anything changed since you filled this out, reply here and tell me.`,
        ``,
        `— nico`,
        `vveritas*`,
      ].join('\n'),
    });
  } catch (err) {
    console.error('guided client receipt error:', err);
  }

  if (!stored && !emailed) {
    return Response.json({ error: 'failed' }, { status: 500 });
  }
  return Response.json({ ok: true, stored, emailed });
}
