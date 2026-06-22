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

    return Response.json({ ok: true });
  } catch (err) {
    console.error('submit error:', err);
    return Response.json({ error: 'failed' }, { status: 500 });
  }
}
