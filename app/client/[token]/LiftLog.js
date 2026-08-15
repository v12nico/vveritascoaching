'use client'
import { useState, useEffect, useCallback, useRef } from 'react'

// ─── LOG ─────────────────────────────────────────────────────────────────────
// Used standing up, between sets, one-handed, with a phone that may have no
// signal. So: each set saves on its own the moment it's filled, last session's
// numbers sit right beside the inputs, and nothing is ever "submitted".

const localDate = () => {
  const d = new Date()
  const z = new Date(d.getTime() - d.getTimezoneOffset() * 60000)
  return z.toISOString().slice(0, 10)
}
const DOW = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

export default function LiftLog({ c }) {
  const [date] = useState(localDate)
  const [dayKey, setDayKey] = useState(() => {
    const today = DOW[new Date().getDay()]
    return c.training.days.some(d => d.day === today) ? today : c.training.days[0].day
  })
  const [today, setToday] = useState({})       // "exercise|set" → { weight, reps }
  const [previous, setPrevious] = useState({})
  const [saving, setSaving] = useState({})
  const [loaded, setLoaded] = useState(false)

  const load = useCallback(async () => {
    try {
      const r = await fetch(`/api/lift?token=${encodeURIComponent(c.token)}&date=${date}`)
      const d = await r.json()
      const t = {}, p = {}
      for (const row of d.today ?? []) t[`${row.exercise}|${row.set_index}`] = { weight: row.weight ?? '', reps: row.reps ?? '' }
      for (const row of d.previous ?? []) p[`${row.exercise}|${row.set_index}`] = row
      setToday(t); setPrevious(p)
    } catch {}
    setLoaded(true)
  }, [c.token, date])

  useEffect(() => { load() }, [load])

  const session = c.training.days.find(d => d.day === dayKey) ?? c.training.days[0]

  if (!loaded) return <div className="cp-label">loading…</div>

  return (
    <>
      <section className="cp-section">
        <div className="cp-label">log · {date}</div>
        <h2 className="cp-h2">{session.label} — {session.focus}</h2>
        <div className="cp-daypick">
          {c.training.days.map(d => (
            <button key={d.day}
              className={`cp-daybtn${d.day === dayKey ? ' on' : ''}`}
              onClick={() => setDayKey(d.day)}>
              {d.day.slice(0, 3)}
            </button>
          ))}
        </div>
        <p className="cp-note tight">
          type the weight and reps as you go. it saves itself — there’s no button.
        </p>
      </section>

      {session.exercises.map(ex => (
        <ExerciseRows
          key={ex.name}
          ex={ex} c={c} date={date} dayKey={dayKey}
          today={today} setToday={setToday}
          previous={previous}
          saving={saving} setSaving={setSaving}
        />
      ))}
    </>
  )
}

function ExerciseRows({ ex, c, date, dayKey, today, setToday, previous, saving, setSaving }) {
  const timers = useRef({})

  const save = useCallback((setIndex, weight, reps) => {
    const key = `${ex.name}|${setIndex}`
    clearTimeout(timers.current[key])
    // Debounced: she types "1", "10", "105" — that shouldn't be three writes.
    timers.current[key] = setTimeout(async () => {
      setSaving(s => ({ ...s, [key]: 'saving' }))
      try {
        const r = await fetch('/api/lift', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: c.token, localDate: date, dayKey, exercise: ex.name, setIndex, weight, reps }),
        })
        setSaving(s => ({ ...s, [key]: r.ok ? 'saved' : 'error' }))
      } catch {
        setSaving(s => ({ ...s, [key]: 'error' }))
      }
    }, 600)
  }, [ex.name, c.token, date, dayKey, setSaving])

  const update = (setIndex, field, value) => {
    const key = `${ex.name}|${setIndex}`
    const next = { ...(today[key] ?? { weight: '', reps: '' }), [field]: value }
    setToday(t => ({ ...t, [key]: next }))
    save(setIndex, next.weight, next.reps)
  }

  return (
    <section className="cp-section">
      <div className="cp-lift-head">
        <span className="cp-lift-name">{ex.name}</span>
        <span className="cp-lift-target">{ex.sets} × {ex.reps}</span>
      </div>
      {ex.cue && <div className="cp-ex-cue">{ex.cue}</div>}

      {Array.from({ length: ex.sets }, (_, i) => i + 1).map(n => {
        const key = `${ex.name}|${n}`
        const val = today[key] ?? { weight: '', reps: '' }
        const prev = previous[key]
        const state = saving[key]
        // Beating last time is the entire point, so it's called out rather than
        // left for her to work out from two numbers.
        const beat = prev && val.weight !== '' && val.reps !== '' &&
          (Number(val.weight) > Number(prev.weight) ||
           (Number(val.weight) === Number(prev.weight) && Number(val.reps) > Number(prev.reps)))

        return (
          <div className="cp-set" key={n}>
            <span className="cp-set-n">{n}</span>
            <input className="cp-set-in" type="number" inputMode="decimal" placeholder="lb"
              value={val.weight} onChange={e => update(n, 'weight', e.target.value)} />
            <span className="cp-set-x">×</span>
            <input className="cp-set-in" type="number" inputMode="numeric" placeholder="reps"
              value={val.reps} onChange={e => update(n, 'reps', e.target.value)} />
            <span className="cp-set-prev">
              {beat ? <b className="cp-beat">beat it</b>
                    : prev ? `last ${prev.weight ?? '—'}×${prev.reps ?? '—'}` : 'first time'}
            </span>
            <span className={`cp-set-state${state === 'saved' ? ' ok' : state === 'error' ? ' bad' : ''}`}>
              {state === 'saving' ? '·' : state === 'saved' ? '✓' : state === 'error' ? '!' : ''}
            </span>
          </div>
        )
      })}
    </section>
  )
}
