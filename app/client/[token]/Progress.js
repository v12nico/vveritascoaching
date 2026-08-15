'use client'
import { useState, useEffect } from 'react'

// ─── PROGRESS ────────────────────────────────────────────────────────────────
// She said she wants results she can see. The honest version of that is not a
// weight graph — bodyweight barely moves in a recomposition and watching it is
// how people quit. What does move, weekly and undeniably, is the load on the
// bar and the number of sessions completed. So that is what this page shows.

export default function Progress({ c }) {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch(`/api/lift?token=${encodeURIComponent(c.token)}&progress=1`)
      .then(r => r.json()).then(setData).catch(() => setData({ best: [], first: [], sessions: [] }))
  }, [c.token])

  if (!data) return <div className="cp-label">loading…</div>

  const best = data.best ?? []
  const firstBy = Object.fromEntries((data.first ?? []).map(r => [r.exercise, r]))
  const sessions = data.sessions ?? []

  if (!best.length) {
    return (
      <section className="cp-section">
        <div className="cp-label">progress</div>
        <h2 className="cp-h2">nothing here yet.</h2>
        <p className="cp-note">
          log your sets in the <b>log</b> tab and this fills in on its own. after two
          sessions of the same movement you’ll see what you’ve added.
        </p>
      </section>
    )
  }

  // Only count it as gained once there is a real comparison — showing "+0 lb"
  // on the first session reads as failure when it just means she started.
  const gains = best
    .map(b => {
      const f = firstBy[b.exercise]
      const delta = f ? Number(b.weight) - Number(f.weight) : 0
      return { ...b, first: f, delta }
    })
    .sort((a, b) => b.delta - a.delta)

  const totalGained = gains.reduce((s, g) => s + Math.max(0, g.delta), 0)

  return (
    <>
      <section className="cp-section">
        <div className="cp-label">sessions completed</div>
        <div className="cp-big">{sessions.length}</div>
        {totalGained > 0 && (
          <p className="cp-note">
            you’ve added <b className="cp-beat">{totalGained} lb</b> across your lifts since you started.
          </p>
        )}
      </section>

      <section className="cp-section">
        <div className="cp-label">your best on every lift</div>
        {gains.map(g => (
          <div className="cp-prog" key={g.exercise}>
            <div className="cp-prog-top">
              <span className="cp-prog-name">{g.exercise}</span>
              <span className="cp-prog-best">{g.weight} × {g.reps}</span>
            </div>
            <div className="cp-prog-sub">
              {g.first && g.delta > 0
                ? <>started at {g.first.weight} × {g.first.reps} · <b className="cp-beat">+{g.delta} lb</b></>
                : g.first
                  ? <>started at {g.first.weight} × {g.first.reps}</>
                  : 'first session'}
            </div>
          </div>
        ))}
      </section>

      <section className="cp-section">
        <div className="cp-label">every session you’ve done</div>
        <div className="cp-sessions">
          {sessions.map(s => (
            <div className="cp-session" key={`${s.local_date}-${s.day_key}`}>
              <span>{String(s.local_date).slice(0, 10)}</span>
              <span className="cp-session-day">{s.day_key || '—'}</span>
              <span className="cp-session-sets">{s.sets} sets</span>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
