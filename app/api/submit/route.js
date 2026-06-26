import { Resend } from 'resend';

export async function POST(req) {
  try {
    const { name, email, age, gender, height, weight, looking, discord, product } = await req.json();

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: 'vveritas <onboarding@resend.dev>',
      to: 'ncortezwilliams@gmail.com',
      subject: `[vveritas*] ready — ${product} — ${name}`,
      text: [
        `product:  ${product}`,
        `name:     ${name}`,
        `email:    ${email}`,
        `age:      ${age || '—'}`,
        `gender:   ${gender || '—'}`,
        `height:   ${height || '—'}`,
        `weight:   ${weight || '—'}`,
        `discord:  ${discord || '—'}`,
        '',
        'what they\'re looking for:',
        looking,
      ].join('\n'),
    });

    // forward the intake to the fulfillment backend so the program is built and
    // emailed automatically once stripe confirms payment. a failure here must not
    // block the inquiry — stripe already opened on the client.
    if (process.env.BACKEND_URL) {
      try {
        await fetch(`${process.env.BACKEND_URL}/intake`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Intake-Token': process.env.INTAKE_SHARED_SECRET || '',
          },
          body: JSON.stringify({
            name, email, age, gender, height, weight, looking, discord, product,
          }),
        });
      } catch (e) {
        console.error('intake push failed:', e);
      }
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error('submit error:', err);
    return Response.json({ error: 'failed' }, { status: 500 });
  }
}
