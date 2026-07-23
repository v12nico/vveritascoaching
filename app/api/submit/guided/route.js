import { Resend } from 'resend';

export async function POST(req) {
  const body = await req.json();
  const { name, email, goal, trainingDays, trainingTime, experience, block, equipment } = body;

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: 'vveritas <onboarding@resend.dev>',
      to: 'vveritascoaching@gmail.com',
      subject: `[guided] new intake — ${name}`,
      text: [
        `name:            ${name}`,
        `email:           ${email}`,
        ``,
        `goal:`,
        goal,
        ``,
        `training days:   ${trainingDays}`,
        `training time:   ${trainingTime}`,
        `experience:      ${experience}`,
        `equipment:       ${equipment}`,
        ``,
        `biggest block:`,
        block,
      ].join('\n'),
    });
  } catch (err) {
    console.error('guided submit error:', err);
    return Response.json({ error: 'failed' }, { status: 500 });
  }

  return Response.json({ ok: true });
}
