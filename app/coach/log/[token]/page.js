import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getCoachingDb } from '@/lib/db'
import { CLIENTS } from '@/lib/clients'

// ─── ONE CLIENT, EVERYTHING THEY HAVE LOGGED ─────────────────────────────────
// Built for the twenty minutes before a call. Ordered the way the call goes:
// what happened since we last spoke, then what moved, then what is missing.
//
// Server component reading Postgres directly — no API round trip, and nothing
// here is ever exposed on the client's own token.

export const dynamic = 'force-dynamic'

const day = (d) => String(d).slice(0, 10)
const num = (v) => (v === null || v === undefined ? '—' : Number(v))

export async function generateMetadata({ params }) {
  const { token } = await params
  const c = CLIENTS[token]
  return { title: c ? `${c.name.toLowerCase()} — logs` : 'logs' }
}

export default async function ClientLog({ params, searchParams }) {
  const { token } = await params
  const sp = await searchParams
  const client = CLIENTS[token]
  if (!client) notFound()

  // Default to the last 14 days — a call covers the week since the last one,
  // and the full history is one click away rather than the default wall of rows.
  const days = Number(sp?.days) || 14
  const from = new Date(Date.now() - days * 86400000).toISOString().slice(0, 10)

  const sql = getCoachingDb()
  const [checkins, sets, sessions, weights, best, first] = await Promise.all([
    sql`SELECT * FROM client_checkins WHERE client_token = ${token} AND local_date >= ${from}
        ORDER BY local_date DESC`,
    sql`SELECT local_date, day_key, exercise, set_index, weight, reps FROM client_lifts
        WHERE client_token = ${token} AND local_date >= ${from}
        ORDER BY local_date DESC, exercise, set_index`,
    sql`SELECT local_date, day_key, count(*)::int sets FROM client_lifts
        WHERE client_token = ${token} GROUP BY local_date, day_key ORDER BY local_date DESC`,
    sql`SELECT local_date, lbs FROM client_weight WHERE client_token = ${token}
        ORDER BY local_date DESC LIMIT 30`,
    sql`SELECT DISTINCT ON (exercise) exercise, weight, reps FROM client_lifts
        WHERE client_token = ${token} AND weight IS NOT NULL
        ORDER BY exercise, weight DESC NULLS LAST, reps DESC NULLS LAST`,
    sql`SELECT DISTINCT ON (exercise) exercise, weight, reps FROM client_lifts
        WHERE client_token = ${token} AND weight IS NOT NULL
        ORDER BY exercise, local_date ASC, set_index ASC`,
  ])

  const firstBy = Object.fromEntries(first.map(r => [r.exercise, r]))
  const gains = best
    .map(b => ({ ...b, first: firstBy[b.exercise], delta: firstBy[b.exercise]
      ? Number(b.weight) - Number(firstBy[b.exercise].weight) : 0 }))
    .sort((a, b) => b.delta - a.delta)

  // Sets grouped by day, so a session reads as a session.
  const byDay = sets.reduce((acc, r) => {
    const k = day(r.local_date)
    ;(acc[k] ??= { dayKey: r.day_key, rows: [] }).rows.push(r)
    return acc
  }, {})

  const proteinHits = checkins.filter(c => c.protein === 'hit').length
  const trained = checkins.filter(c => c.trained === 'yes').length

  return (
    <main className="cl-wrap">
      <div className="cl-head">
        <div className="cl-label">
          <Link href="/coach/log" className="cl-back">← all clients</Link>
        </div>
        <h1 className="cl-h1">{client.name.toLowerCase()}</h1>
        <p className="cl-sub">{client.title} · {client.stats.height} · {client.stats.weight} · {client.objective.primary}</p>
        <div className="cl-range">
          {[7, 14, 30, 999].map(d => (
            <Link key={d} href={`?days=${d}`} className={`cl-pill${days === d ? ' on' : ''}`}>
              {d === 999 ? 'all' : `${d}d`}
            </Link>
          ))}
          <a className="cl-pill" href={`/client/${token}`} target="_blank" rel="noreferrer">their view ↗</a>
        </div>
      </div>

      {/* ── the numbers you open the call with ── */}
      <section className="cl-sec">
        <div className="cl-stats">
          <div><b>{checkins.length}</b><span>check-ins</span></div>
          <div><b>{trained}</b><span>trained</span></div>
          <div><b>{proteinHits}/{checkins.length || 0}</b><span>protein hit</span></div>
          <div><b>{Object.keys(byDay).length}</b><span>sessions</span></div>
          <div className={weights.length ? '' : 'cl-flag'}><b>{weights.length}</b><span>weigh-ins</span></div>
        </div>
      </section>

      {/* ── check-ins, newest first, with their own words ── */}
      <section className="cl-sec">
        <div className="cl-label">check-ins</div>
        {!checkins.length && <p className="cl-note">nothing in this window.</p>}
        {checkins.map(c => {
          const flags = [
            c.trained === 'no' && 'no training',
            c.protein === 'under' && 'under protein',
            c.ate_planned === 'no' && 'off plan',
            c.energy <= 4 && `energy ${c.energy}`,
            c.digestion <= 4 && `digestion ${c.digestion}`,
          ].filter(Boolean)
          return (
            <div className="cl-ci" key={c.id}>
              <div className="cl-ci-top">
                <span className="cl-ci-date">{day(c.local_date)}</span>
                <span className="cl-ci-tags">
                  <i>trained {c.trained}</i>
                  <i>protein {c.protein}</i>
                  <i>plan {c.ate_planned}</i>
                  <i>e{c.energy} · d{c.digestion}</i>
                </span>
              </div>
              {flags.length > 0 && <div className="cl-ci-flags">{flags.join(' · ')}</div>}
              {c.note && <p className="cl-ci-note">{c.note}</p>}
            </div>
          )
        })}
      </section>

      {/* ── every set, grouped into sessions ── */}
      <section className="cl-sec">
        <div className="cl-label">sessions in this window</div>
        {!Object.keys(byDay).length && <p className="cl-note">no sets logged.</p>}
        {Object.entries(byDay).map(([d, { dayKey, rows }]) => (
          <div className="cl-sess" key={d}>
            <div className="cl-sess-top">
              <span>{d}</span>
              <span className="cl-sess-key">{dayKey || '—'}</span>
              <span className="cl-sess-n">{rows.length} sets</span>
            </div>
            <div className="cl-sets">
              {Object.entries(rows.reduce((a, r) => { (a[r.exercise] ??= []).push(r); return a }, {}))
                .map(([ex, rs]) => (
                  <div className="cl-set-row" key={ex}>
                    <span className="cl-set-ex">{ex}</span>
                    <span className="cl-set-vals">
                      {rs.map(r => `${num(r.weight)}×${num(r.reps)}`).join('   ')}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </section>

      {/* ── progression across the whole program, not the window ── */}
      <section className="cl-sec">
        <div className="cl-label">progression · all time</div>
        {gains.map(g => (
          <div className="cl-prog" key={g.exercise}>
            <span className="cl-prog-ex">{g.exercise}</span>
            <span className="cl-prog-nums">
              {g.first ? `${g.first.weight}×${g.first.reps}` : '—'} → {g.weight}×{g.reps}
            </span>
            <span className={`cl-prog-delta${g.delta > 0 ? ' up' : ''}`}>
              {g.delta > 0 ? `+${g.delta} lb` : g.delta < 0 ? `${g.delta} lb` : '—'}
            </span>
          </div>
        ))}
      </section>

      {/* ── weight ── */}
      <section className="cl-sec">
        <div className="cl-label">bodyweight</div>
        {!weights.length
          ? <p className="cl-note cl-flag">
              no weigh-ins logged, ever. the objective is {client.objective.primary} and
              there is no bodyweight data to say whether it is working.
            </p>
          : <div className="cl-w">
              {weights.map(w => (
                <span key={day(w.local_date)}><i>{day(w.local_date)}</i>{Number(w.lbs)}</span>
              ))}
            </div>}
      </section>

      <p className="cl-foot">contains client health data · {client.email}</p>
    </main>
  )
}
