import { Resend } from 'resend';

export async function POST(req) {
  try {
    const { name, email, plan } = await req.json();
    if (!email || !plan) return Response.json({ ok: false });

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: 'vveritas <onboarding@resend.dev>',
      to: [email, 'ncortezwilliams@gmail.com'],
      subject: `your vveritas* workout program — ${name || 'client'}`,
      text: `${name ? `${name},\n\n` : ''}your custom workout program from vveritas*.\n\n---\n\n${plan}\n\n---\n\nvveritas* coaching\ninstagram.com/_v12nico`,
    });

    return Response.json({ ok: true });
  } catch (err) {
    console.error('workout email error:', err);
    return Response.json({ ok: false });
  }
}
