import { Resend } from 'resend'
import { getCoachingDb } from '@/lib/db'
import olaf from '@/lib/clients/olaf'

// Same rule as the intake: a client fills this in once and will not do it twice.
// The database write and the email run independently, and only a failure of BOTH
// is reported as a failure — otherwise a broken notifier looks like a lost
// check-in and he re-types it.

const CLIENTS = { [olaf.token]: olaf }

export async function POST(req) {
  const b = await req.json()
  const client = CLIENTS[b.token]

  // An unknown token is the only hard stop. Everything else is his honest answer,
  // including a blank one.
  if (!client) return Response.json({ error: 'unknown client' }, { status: 404 })
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(b.localDate || ''))) {
    return Response.json({ error: 'bad date' }, { status: 400 })
  }

  const energy = Number.isFinite(+b.energy) ? Math.min(10, Math.max(1, +b.energy)) : null
  const digestion = Number.isFinite(+b.digestion) ? Math.min(10, Math.max(1, +b.digestion)) : null

  let stored = false, emailed = false

  try {
    const sql = getCoachingDb()
    await sql`
      INSERT INTO client_checkins
        (client_token, client_name, local_date, trained, protein, ate_planned, energy, digestion, note, answers)
      VALUES
        (${client.token}, ${client.fullName}, ${b.localDate}, ${b.trained ?? null},
         ${b.protein ?? null}, ${b.atePlanned ?? null}, ${energy}, ${digestion},
         ${(b.note ?? '').trim() || null}, ${JSON.stringify(b)})
      ON CONFLICT (client_token, local_date) DO UPDATE SET
        trained = EXCLUDED.trained, protein = EXCLUDED.protein,
        ate_planned = EXCLUDED.ate_planned, energy = EXCLUDED.energy,
        digestion = EXCLUDED.digestion, note = EXCLUDED.note,
        answers = EXCLUDED.answers, updated_at = now()`
    stored = true
  } catch (err) {
    console.error('checkin db error:', err)
  }

  // Flag the things worth a reply tonight rather than at the weekly review.
  const flags = []
  if (b.trained === 'no') flags.push('missed training')
  if (b.protein === 'under') flags.push('under protein')
  if (b.atePlanned === 'no') flags.push('ate off plan')
  if (energy !== null && energy <= 4) flags.push(`energy ${energy}/10`)
  if (digestion !== null && digestion <= 4) flags.push(`digestion ${digestion}/10`)

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: 'vveritas <hello@vveritascoaching.com>',
      to: ['ncortezwilliams@gmail.com', 'iamnicofresh@gmail.com', 'vveritascoaching@gmail.com'],
      subject: flags.length
        ? `${client.name} — check-in (${flags.join(', ')})`
        : `${client.name} — check-in`,
      text: [
        `${client.fullName} · ${b.localDate}`,
        flags.length ? `\nflags: ${flags.join(' · ')}` : '',
        '',
        `trained:    ${b.trained ?? '—'}`,
        `protein:    ${b.protein ?? '—'}`,
        `ate planned:${b.atePlanned ?? '—'}`,
        `energy:     ${energy ?? '—'}/10`,
        `digestion:  ${digestion ?? '—'}/10`,
        '',
        'note:',
        (b.note ?? '').trim() || '—',
      ].join('\n'),
    })
    emailed = true
  } catch (err) {
    console.error('checkin email error:', err)
  }

  if (!stored && !emailed) {
    return Response.json({ error: 'could not save your check-in' }, { status: 500 })
  }
  return Response.json({ ok: true, stored, emailed })
}

// Lets the page show "already checked in" instead of a blank form he fills twice.
export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const token = searchParams.get('token')
  const date = searchParams.get('date')
  if (!CLIENTS[token] || !date) return Response.json({ found: false })

  try {
    const sql = getCoachingDb()
    const [row] = await sql`
      SELECT trained, protein, ate_planned, energy, digestion, note, updated_at
      FROM client_checkins WHERE client_token = ${token} AND local_date = ${date} LIMIT 1`
    return Response.json({ found: !!row, checkin: row ?? null })
  } catch {
    return Response.json({ found: false })
  }
}
