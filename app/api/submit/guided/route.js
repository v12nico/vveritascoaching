import { Resend } from 'resend';

export async function POST(req) {
  const body = await req.json();
  const { name, email, goal, trainingDays, trainingTime, experience, block, equipment } = body;

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: 'vveritas <onboarding@resend.dev>',
      to: 'vveritascoaching@gmail.com',
      subject: `new guided intake — ${name}`,
      html: `
<div style="background:#000;padding:40px 32px;font-family:monospace;color:#EDEDE8;max-width:560px">

  <div style="font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:#3A3A3A;margin-bottom:32px">vveritas* — guided intake</div>

  <div style="font-size:22px;font-weight:200;letter-spacing:-0.02em;margin-bottom:24px">${name}</div>

  <table style="width:100%;border-collapse:collapse;margin-bottom:32px">
    <tr><td style="font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#3A3A3A;padding:10px 0;border-bottom:1px solid #141414;width:40%">email</td><td style="font-size:13px;color:#EDEDE8;padding:10px 0;border-bottom:1px solid #141414"><a href="mailto:${email}" style="color:#EDEDE8;text-decoration:none">${email}</a></td></tr>
    <tr><td style="font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#3A3A3A;padding:10px 0;border-bottom:1px solid #141414">training days</td><td style="font-size:13px;color:#EDEDE8;padding:10px 0;border-bottom:1px solid #141414">${trainingDays}</td></tr>
    <tr><td style="font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#3A3A3A;padding:10px 0;border-bottom:1px solid #141414">trains</td><td style="font-size:13px;color:#EDEDE8;padding:10px 0;border-bottom:1px solid #141414">${trainingTime}</td></tr>
    <tr><td style="font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#3A3A3A;padding:10px 0;border-bottom:1px solid #141414">experience</td><td style="font-size:13px;color:#EDEDE8;padding:10px 0;border-bottom:1px solid #141414">${experience}</td></tr>
    <tr><td style="font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#3A3A3A;padding:10px 0">equipment</td><td style="font-size:13px;color:#EDEDE8;padding:10px 0">${equipment}</td></tr>
  </table>

  <div style="margin-bottom:24px">
    <div style="font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#3A3A3A;margin-bottom:10px">goal</div>
    <div style="font-size:13px;color:#EDEDE8;line-height:1.7;border-left:2px solid #1a1a1a;padding-left:14px">${goal || '—'}</div>
  </div>

  <div>
    <div style="font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#3A3A3A;margin-bottom:10px">biggest block</div>
    <div style="font-size:13px;color:#EDEDE8;line-height:1.7;border-left:2px solid #1a1a1a;padding-left:14px">${block || '—'}</div>
  </div>

</div>
      `.trim(),
    });
  } catch (err) {
    console.error('guided submit error:', err);
    return Response.json({ error: 'failed' }, { status: 500 });
  }

  return Response.json({ ok: true });
}
