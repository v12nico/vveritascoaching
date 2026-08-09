import { Resend } from 'resend';
import { getCoachingDb } from '@/lib/db';
import { reviewFlags, needsReview } from '@/lib/intakeSpec';
import { intakeText, deriveSummary } from '@/lib/intakeSummary';

// A client only fills this out once, and they will not do it twice. So the two
// delivery paths are independent: the database write and the email each run in
// their own try, and a failure in one never discards the other. The request
// only fails if BOTH failed — that is the single case where the client genuinely
// needs to press send again.

export async function POST(req) {
  const a = await req.json();

  if (!String(a.fullName || '').trim() || !String(a.email || '').trim()) {
    return Response.json({ error: 'name and email are required' }, { status: 400 });
  }

  const flags = reviewFlags(a);
  let stored = false;
  let emailed = false;

  try {
    const sql = getCoachingDb();
    await sql`
      INSERT INTO client_intakes (
        slug, full_name, email, phone, package, start_date,
        needs_review, review_flags, answers
      ) VALUES (
        ${a.slug || null}, ${a.fullName.trim()}, ${a.email.trim()}, ${a.phone || null},
        ${a.package || null}, ${a.startDate || null},
        ${needsReview(a)}, ${flags}, ${JSON.stringify(a)}
      )
    `;
    stored = true;
  } catch (err) {
    console.error('intake db error:', err);
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: 'vveritas <hello@vveritascoaching.com>',
      to: ['ncortezwilliams@gmail.com', 'iamnicofresh@gmail.com', 'vveritascoaching@gmail.com'],
      subject: flags.length
        ? `intake (review required): ${a.fullName}`
        : `new client intake: ${a.fullName}`,
      text: intakeText(a),
    });
    emailed = true;
  } catch (err) {
    console.error('intake email error:', err);
  }

  if (!stored && !emailed) {
    return Response.json({ error: 'could not save your intake' }, { status: 500 });
  }

  return Response.json({ ok: true, stored, emailed, summary: deriveSummary(a) });
}
