import { getCoachingDb } from '@/lib/db'
import olaf from '@/lib/clients/olaf'
import fanta from '@/lib/clients/fanta'

const CLIENTS = { [olaf.token]: olaf, [fanta.token]: fanta }

const num = (v) => {
  const n = Number(v)
  return Number.isFinite(n) && n >= 0 ? n : null
}

// ─── LOG A SET ───────────────────────────────────────────────────────────────
// Saves one set at a time rather than a whole session. She logs between sets,
// on a gym wifi that drops — a single save that carries the entire workout is a
// single save that can lose the entire workout.
export async function POST(req) {
  const b = await req.json()
  if (!CLIENTS[b.token]) return Response.json({ error: 'unknown client' }, { status: 404 })
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(b.localDate || ''))) {
    return Response.json({ error: 'bad date' }, { status: 400 })
  }
  if (!b.exercise || !b.setIndex) return Response.json({ error: 'missing set' }, { status: 400 })

  const weight = num(b.weight)
  const reps = num(b.reps)

  try {
    const sql = getCoachingDb()
    // An emptied set is a deletion, not a row of nulls — otherwise a mis-tap
    // leaves a phantom set in her history forever.
    if (weight === null && reps === null) {
      await sql`DELETE FROM client_lifts
                WHERE client_token = ${b.token} AND local_date = ${b.localDate}
                  AND exercise = ${b.exercise} AND set_index = ${b.setIndex}`
      return Response.json({ ok: true, deleted: true })
    }

    await sql`
      INSERT INTO client_lifts (client_token, local_date, day_key, exercise, set_index, weight, reps)
      VALUES (${b.token}, ${b.localDate}, ${b.dayKey ?? ''}, ${b.exercise}, ${b.setIndex}, ${weight}, ${reps})
      ON CONFLICT (client_token, local_date, exercise, set_index) DO UPDATE SET
        weight = EXCLUDED.weight, reps = EXCLUDED.reps,
        day_key = EXCLUDED.day_key, updated_at = now()`
    return Response.json({ ok: true })
  } catch (err) {
    console.error('lift save error:', err)
    return Response.json({ error: 'could not save that set' }, { status: 500 })
  }
}

// ─── READ ────────────────────────────────────────────────────────────────────
// ?token=&date=        → today's sets, plus the last session for each exercise
// ?token=&progress=1   → every exercise she has ever logged, first vs best
export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const token = searchParams.get('token')
  if (!CLIENTS[token]) return Response.json({ error: 'unknown client' }, { status: 404 })

  const sql = getCoachingDb()

  try {
    if (searchParams.get('progress')) {
      // Best set is ordered by weight then reps: 100×5 beats 95×8 here, which
      // is the comparison she actually cares about when asking "am I stronger".
      const rows = await sql`
        SELECT DISTINCT ON (exercise) exercise, weight, reps, local_date
        FROM client_lifts
        WHERE client_token = ${token} AND weight IS NOT NULL
        ORDER BY exercise, weight DESC NULLS LAST, reps DESC NULLS LAST`
      const first = await sql`
        SELECT DISTINCT ON (exercise) exercise, weight, reps, local_date
        FROM client_lifts
        WHERE client_token = ${token} AND weight IS NOT NULL
        ORDER BY exercise, local_date ASC, set_index ASC`
      const sessions = await sql`
        SELECT local_date, day_key, count(*)::int sets
        FROM client_lifts WHERE client_token = ${token}
        GROUP BY local_date, day_key ORDER BY local_date DESC LIMIT 30`
      return Response.json({ best: rows, first, sessions })
    }

    if (searchParams.get('history')) {
      // Every set she has ever logged, newest first. Grouped client-side so one
      // request covers the whole history rather than one per session.
      const rows = await sql`
        SELECT local_date, day_key, exercise, set_index, weight, reps
        FROM client_lifts WHERE client_token = ${token}
        ORDER BY local_date DESC, exercise, set_index`
      return Response.json({ rows })
    }

    const date = searchParams.get('date')
    if (!date) return Response.json({ today: [], previous: [] })

    const today = await sql`
      SELECT exercise, set_index, weight, reps FROM client_lifts
      WHERE client_token = ${token} AND local_date = ${date}
      ORDER BY exercise, set_index`

    // The last time she did each movement — the number she is trying to beat.
    // Without it there is no progression, just a diary.
    const previous = await sql`
      SELECT DISTINCT ON (exercise, set_index) exercise, set_index, weight, reps, local_date
      FROM client_lifts
      WHERE client_token = ${token} AND local_date < ${date}
      ORDER BY exercise, set_index, local_date DESC`

    return Response.json({ today, previous })
  } catch (err) {
    console.error('lift read error:', err)
    return Response.json({ today: [], previous: [] })
  }
}
