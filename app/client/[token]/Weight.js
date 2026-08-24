'use client'
import { useState, useEffect } from 'react'

// Bodyweight is the whole objective for a gaining phase and it was the one
// thing nowhere in the app. Deliberately shows a 7-day average as the headline:
// day-to-day weight swings several pounds on food and water, and reacting to a
// single reading is how someone decides a working plan isn't working.

const localDate = () => {
  const d = new Date()
  const z = new Date(d.getTime() - d.getTimezoneOffset() * 60000)
  return z.toISOString().slice(0, 10)
}
const avg = (xs) => xs.reduce((a, b) => a + b, 0) / xs.length

export default function Weight({ c }) {
  const [date] = useState(localDate)
  const [rows, setRows] = useState(null)
  const [val, setVal] = useState('')
  const [state, setState] = useState('idle')

  const load = () =>
    fetch(`/api/weight?token=${encodeURIComponent(c.token)}`)
      .then(r => r.json()).then(d => setRows(d.rows ?? [])).catch(() => setRows([]))

  useEffect(() => { load() }, [c.token])

  async function save() {
    setState('saving')
    const res = await fetch('/api/weight', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: c.token, localDate: date, lbs: Number(val) }),
    })
    if (!res.ok) { setState('error'); return }
    setVal(''); setState('saved'); load()
  }

  if (!rows) return <div className="cp-label">loading…</div>

  const nums = rows.map(r => Number(r.lbs))
  const start = nums[0]
  const latest = nums[nums.length - 1]
  const recent = nums.slice(-7)
  const prior = nums.slice(-14, -7)
  const trend = recent.length && prior.length ? avg(recent) - avg(prior) : null
  const today = rows.find(r => String(r.local_date).slice(0, 10) === date)

  return (
    <>
      <section className="cp-section">
        <div className="cp-label">weigh in · {date}</div>
        <p className="cp-note tight">
          first thing, after the bathroom, before you eat or drink. same conditions
          every time or the number means nothing.
        </p>
        <div className="cp-weigh">
          <input className="cp-set-in wide" type="number" step="0.1" inputMode="decimal"
            placeholder={today ? String(today.lbs) : 'lbs'}
            value={val} onChange={e => { setVal(e.target.value); setState('idle') }} />
          <button className="cp-submit inline" onClick={save} disabled={!val || state === 'saving'}>
            {state === 'saving' ? 'saving…' : today ? 'update' : 'log it'}
          </button>
        </div>
        {today && <p className="cp-note tight">logged today: {today.lbs} lb</p>}
        {state === 'error' && <p className="cp-note strong">that didn’t save. check the number and try again.</p>}
      </section>

      {nums.length > 0 && (
        <section className="cp-section">
          <div className="cp-label">where you are</div>
          <div className="cp-weight-row">
            <div><div className="cp-big">{latest}</div><div className="cp-label">latest</div></div>
            <div><div className="cp-big">{start}</div><div className="cp-label">started</div></div>
            <div>
              <div className="cp-big">{latest > start ? '+' : ''}{(latest - start).toFixed(1)}</div>
              <div className="cp-label">change</div>
            </div>
          </div>
          {trend !== null ? (
            <p className="cp-note">
              7-day average is <b>{trend > 0 ? '+' : ''}{trend.toFixed(1)} lb</b> on the week before.
              {trend > 0 ? ' that’s the direction we want.' : ' we need more food, not more training.'}
            </p>
          ) : (
            <p className="cp-note">
              {nums.length < 8
                ? `${8 - nums.length} more daily weigh-ins and this starts showing a trend instead of noise.`
                : ''}
            </p>
          )}
        </section>
      )}

      {rows.length > 1 && (
        <section className="cp-section">
          <div className="cp-label">every weigh-in</div>
          <div className="cp-sessions">
            {[...rows].reverse().map(r => (
              <div className="cp-session" key={String(r.local_date)}>
                <span>{String(r.local_date).slice(0, 10)}</span>
                <span className="cp-session-day">{r.lbs} lb</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  )
}
