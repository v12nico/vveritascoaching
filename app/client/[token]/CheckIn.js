'use client'
import { useState, useEffect } from 'react'

// Under two minutes, on a phone, at midnight, tired. Every answer is a tap
// except the last one — the moment this needs typing it stops happening daily.

const localDate = () => {
  const d = new Date()
  const z = new Date(d.getTime() - d.getTimezoneOffset() * 60000)
  return z.toISOString().slice(0, 10)
}

// Two sentences, meaning two real ones. Splitting on punctuation alone lets
// "ok. fine." through, which is not a reflection — so it also has to clear a
// length floor. The counter is shown live so he is never guessing why the
// button is locked.
const MIN_SENTENCES = 2
const MIN_CHARS = 60

export function countSentences(text = '') {
  return String(text)
    .split(/[.!?\n]+/)
    .map(s => s.trim())
    .filter(s => s.length >= 8)      // fragments and stray punctuation don't count
    .length
}

const QUESTIONS = [
  { id: 'trained', q: 'did you train today?',
    options: [['yes', 'yes'], ['rest', 'rest day'], ['no', 'no']] },
  { id: 'protein', q: 'protein?',
    options: [['hit', 'hit the range'], ['close', 'close'], ['under', 'under']] },
  { id: 'atePlanned', q: 'did you eat the way we planned?',
    options: [['yes', 'yes'], ['mostly', 'mostly'], ['no', 'no']] },
]

const SLIDERS = [
  { id: 'energy',    q: 'energy',    low: 'flat',  high: 'sharp' },
  { id: 'digestion', q: 'digestion', low: 'rough', high: 'good'  },
]

export default function CheckIn({ c }) {
  const [date] = useState(localDate)
  const [f, setF] = useState({ energy: 5, digestion: 5, note: '' })
  const [state, setState] = useState('loading')  // loading | form | saving | done | error
  const [existing, setExisting] = useState(null)

  const set = (k, v) => setF(p => ({ ...p, [k]: v }))

  useEffect(() => {
    fetch(`/api/checkin?token=${encodeURIComponent(c.token)}&date=${date}`)
      .then(r => r.json())
      .then(d => {
        if (d.found && d.checkin) {
          setExisting(d.checkin)
          setF(p => ({
            ...p,
            trained: d.checkin.trained, protein: d.checkin.protein,
            atePlanned: d.checkin.ate_planned,
            energy: d.checkin.energy ?? 5, digestion: d.checkin.digestion ?? 5,
            note: d.checkin.note ?? '',
          }))
        }
        setState('form')
      })
      .catch(() => setState('form'))
  }, [c.token, date])

  const sentences = countSentences(f.note)
  const longEnough = f.note.trim().length >= MIN_CHARS
  const reflectionOk = sentences >= MIN_SENTENCES && longEnough
  const ready = QUESTIONS.every(q => f[q.id]) && reflectionOk

  async function submit() {
    setState('saving')
    try {
      const res = await fetch('/api/checkin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...f, token: c.token, localDate: date }),
      })
      if (!res.ok) throw new Error()
      setState('done')
    } catch {
      setState('error')
    }
  }

  if (state === 'loading') return <div className="cp-label">loading…</div>

  if (state === 'done') {
    return (
      <section className="cp-section">
        <div className="cp-label">{date}</div>
        <h2 className="cp-h2">logged. that’s the day closed.</h2>
        <p className="cp-note">
          nico has it. if something needs a reply you’ll hear from him — otherwise
          go to sleep and do it again tomorrow.
        </p>
        <button className="cp-ghost" onClick={() => setState('form')}>change my answers</button>
      </section>
    )
  }

  return (
    <>
      <section className="cp-section">
        <div className="cp-label">end of day · {date}</div>
        <h2 className="cp-h2">
          {existing ? 'you already checked in today.' : 'two minutes. be honest.'}
        </h2>
        {existing && <p className="cp-note">changing an answer just corrects it — it doesn’t log twice.</p>}
      </section>

      {QUESTIONS.map(q => (
        <section className="cp-section" key={q.id}>
          <div className="cp-q">{q.q}</div>
          <div className="cp-opts">
            {q.options.map(([val, label]) => (
              <button key={val}
                className={`cp-opt${f[q.id] === val ? ' on' : ''}`}
                onClick={() => set(q.id, val)}>
                {label}
              </button>
            ))}
          </div>
        </section>
      ))}

      {SLIDERS.map(s => (
        <section className="cp-section" key={s.id}>
          <div className="cp-slider-head">
            <span className="cp-q">{s.q}</span>
            <span className="cp-slider-val">{f[s.id]}</span>
          </div>
          <input className="cp-slider" type="range" min="1" max="10"
            value={f[s.id]} onChange={e => set(s.id, Number(e.target.value))} />
          <div className="cp-slider-ends"><span>{s.low}</span><span>{s.high}</span></div>
        </section>
      ))}

      <section className="cp-section">
        <div className="cp-q">how was today?</div>
        <p className="cp-note tight">
          two sentences minimum. training, food, energy, what got in the way — whatever
          actually happened. this is the part i read first.
        </p>
        <textarea className="cp-area" rows={5} value={f.note}
          placeholder="what happened today?"
          onChange={e => set('note', e.target.value)} />
        <div className="cp-count">
          <span className={reflectionOk ? 'ok' : ''}>
            {sentences} {sentences === 1 ? 'sentence' : 'sentences'}
          </span>
          {!reflectionOk && <span className="cp-count-hint">need {MIN_SENTENCES}</span>}
        </div>
      </section>

      {state === 'error' && (
        <p className="cp-note strong">that didn’t send. check your connection and hit it again — nothing was lost.</p>
      )}

      <button className="cp-submit" onClick={submit} disabled={!ready || state === 'saving'}>
        {state === 'saving' ? 'sending…' : existing ? 'update check-in' : 'send check-in'}
      </button>
      {!ready && (
        <p className="cp-note">
          {QUESTIONS.every(q => f[q.id])
            ? 'write two sentences about your day and this unlocks.'
            : 'answer the first three and write your reflection.'}
        </p>
      )}
    </>
  )
}
