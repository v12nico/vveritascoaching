import Link from 'next/link'
import { getCoachingDb } from '@/lib/db'
import { ALL } from '@/lib/clients'

// ─── LOG INDEX ───────────────────────────────────────────────────────────────
// The real clients and what they have actually done, as opposed to
// /coach/clients which still runs on mockData.
//
// Every call with Olaf has started with someone querying this by hand. That is
// the whole reason this page exists.

export const dynamic = 'force-dynamic'

const day = (d) => String(d).slice(0, 10)
const since = (d) => {
  if (!d) return null
  const n = Math.floor((Date.now() - new Date(d).getTime()) / 86400000)
  return n <= 0 ? 'today' : n === 1 ? 'yesterday' : `${n} days ago`
}

async function summary() {
  const sql = getCoachingDb()
  const real = ALL.filter(c => c.email)          // skip the sample builds
  const tokens = real.map(c => c.token)
  if (!tokens.length) return []

  const [checkins, lifts, weights] = await Promise.all([
    sql`SELECT client_token, count(*)::int n, max(local_date) last
        FROM client_checkins WHERE client_token = ANY(${tokens}) GROUP BY client_token`,
    sql`SELECT client_token, count(DISTINCT local_date)::int n, max(local_date) last
        FROM client_lifts WHERE client_token = ANY(${tokens}) GROUP BY client_token`,
    sql`SELECT client_token, count(*)::int n, max(local_date) last
        FROM client_weight WHERE client_token = ANY(${tokens}) GROUP BY client_token`,
  ])
  const by = (rows) => Object.fromEntries(rows.map(r => [r.client_token, r]))
  const [C, L, W] = [by(checkins), by(lifts), by(weights)]

  return real.map(c => ({
    token: c.token,
    name: c.name,
    title: c.title,
    checkins: C[c.token]?.n ?? 0,
    lastCheckin: C[c.token]?.last ?? null,
    sessions: L[c.token]?.n ?? 0,
    lastSession: L[c.token]?.last ?? null,
    weights: W[c.token]?.n ?? 0,
  }))
}

export default async function CoachLogIndex() {
  let rows = []
  let error = null
  try { rows = await summary() } catch (e) { error = e.message }

  return (
    <main className="cl-wrap">
      <div className="cl-head">
        <div className="cl-label">coach</div>
        <h1 className="cl-h1">client logs</h1>
        <p className="cl-sub">what they have actually done. live from the database.</p>
      </div>

      {error && <p className="cl-note cl-flag">could not read: {error}</p>}

      <div className="cl-list">
        {rows.map(r => (
          <Link key={r.token} href={`/coach/log/${r.token}`} className="cl-row">
            <div className="cl-row-main">
              <div className="cl-row-name">{r.name.toLowerCase()}</div>
              <div className="cl-row-title">{r.title}</div>
            </div>
            <div className="cl-row-stats">
              <span><b>{r.checkins}</b> check-ins</span>
              <span><b>{r.sessions}</b> sessions</span>
              <span className={r.weights ? '' : 'cl-flag'}><b>{r.weights}</b> weigh-ins</span>
            </div>
            <div className="cl-row-when">
              {r.lastCheckin ? `last check-in ${since(r.lastCheckin)}` : 'no check-ins yet'}
            </div>
          </Link>
        ))}
        {!rows.length && !error && <p className="cl-note">no clients with logs yet.</p>}
      </div>
    </main>
  )
}
