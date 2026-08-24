import { getCoachingDb } from '@/lib/db'
import olaf from '@/lib/clients/olaf'
import fanta from '@/lib/clients/fanta'

const CLIENTS = { [olaf.token]: olaf, [fanta.token]: fanta }

export async function POST(req) {
  const b = await req.json()
  if (!CLIENTS[b.token]) return Response.json({ error: 'unknown client' }, { status: 404 })
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(b.localDate || ''))) {
    return Response.json({ error: 'bad date' }, { status: 400 })
  }
  const lbs = Number(b.lbs)
  // A plausibility band, because a fat-fingered 1460 would wreck the trend line
  // and there is no telling it from a real reading after the fact.
  if (!Number.isFinite(lbs) || lbs < 60 || lbs > 500) {
    return Response.json({ error: 'that weight looks wrong' }, { status: 400 })
  }

  try {
    const sql = getCoachingDb()
    await sql`
      INSERT INTO client_weight (client_token, local_date, lbs)
      VALUES (${b.token}, ${b.localDate}, ${lbs})
      ON CONFLICT (client_token, local_date) DO UPDATE
        SET lbs = EXCLUDED.lbs, updated_at = now()`
    return Response.json({ ok: true })
  } catch (err) {
    console.error('weight save error:', err)
    return Response.json({ error: 'could not save that' }, { status: 500 })
  }
}

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const token = searchParams.get('token')
  if (!CLIENTS[token]) return Response.json({ error: 'unknown client' }, { status: 404 })
  try {
    const sql = getCoachingDb()
    const rows = await sql`
      SELECT local_date, lbs FROM client_weight
      WHERE client_token = ${token} ORDER BY local_date ASC`
    return Response.json({ rows })
  } catch {
    return Response.json({ rows: [] })
  }
}
