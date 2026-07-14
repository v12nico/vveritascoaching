import { Resend } from 'resend';

export async function POST(req) {
  const d = await req.json();

  const lines = [
    `VVERITAS* CLIENT INTAKE — ${d.name || 'unknown'} — ${new Date().toLocaleDateString('en-US')}`,
    '',
    '— ABOUT YOU —',
    `name:          ${d.name || '—'}`,
    `age:           ${d.age || '—'}`,
    `current weight: ${d.weight ? d.weight + ' lbs' : '—'}`,
    `height:        ${d.height || '—'}`,
    `goal weight:   ${d.goalWeight ? d.goalWeight + ' lbs' : '—'}`,
    '',
    '— GOALS —',
    `main goal:     ${d.mainGoal || '—'}`,
    `focus area:    ${d.focusArea || '—'}`,
    `what stopped them before:`,
    `  ${d.blockers || '—'}`,
    '',
    '— TRAINING —',
    `training days: ${d.trainingDays || '—'}`,
    `experience:    ${d.experience || '—'}`,
    `in-person time: ${d.inPersonTime || '—'}`,
    `backup time:   ${d.backupTime || '—'}`,
    `injuries/limits:`,
    `  ${d.injuries || '—'}`,
    '',
    '— NUTRITION —',
    `typical day:`,
    `  ${d.typicalDay || '—'}`,
    `biggest struggle: ${d.nutritionStruggle || '—'}`,
    `restrictions:  ${d.restrictions || '—'}`,
    '',
    '— SCHEDULE AND LIFE —',
    `work schedule: ${d.workSchedule || '—'}`,
    `sleep:         ${d.sleep || '—'}`,
    `stress:        ${d.stress || '—'}`,
    `obligations:   ${d.obligations || '—'}`,
    '',
    '— ACCOUNTABILITY —',
    `coaching style: ${d.coachingStyle || '—'}`,
    `what makes them fall off:`,
    `  ${d.fallOff || '—'}`,
  ];

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: 'vveritas <onboarding@resend.dev>',
      to: 'ncortezwilliams@gmail.com',
      subject: `[vveritas*] intake — ${d.name || 'new client'}`,
      text: lines.join('\n'),
    });
  } catch (err) {
    console.error('intake email error:', err);
    return Response.json({ error: 'failed' }, { status: 500 });
  }

  return Response.json({ ok: true });
}
