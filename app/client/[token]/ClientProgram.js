'use client'
import { useState } from 'react'
import CheckIn from './CheckIn'

// Mobile-first: he will open this on his phone, in a gym, between sets. Tabs
// rather than one long scroll so the day's exercises are never more than a tap
// away, and nothing he needs mid-set is below the fold.

const TABS = [
  { key: 'today',     label: 'start here' },
  { key: 'training',  label: 'training' },
  { key: 'nutrition', label: 'food' },
  { key: 'grocery',   label: 'grocery' },
  { key: 'checkin',   label: 'check in' },
]

export default function ClientProgram({ c }) {
  const [tab, setTab] = useState('today')

  return (
    <div className="cp">
      <header className="cp-head">
        <div className="cp-eyebrow">vveritas* coaching</div>
        <h1 className="cp-title">{c.title.toLowerCase()}</h1>
        <p className="cp-sub">{c.subtitle}</p>
        <div className="cp-stats">
          <span>{c.stats.age}</span><i />
          <span>{c.stats.height}</span><i />
          <span>{c.stats.weight}</span><i />
          <span>{c.objective.primary}</span>
        </div>
      </header>

      <nav className="cp-tabs">
        {TABS.map(t => (
          <button key={t.key}
            className={`cp-tab${tab === t.key ? ' on' : ''}`}
            onClick={() => setTab(t.key)}>
            {t.label}
          </button>
        ))}
      </nav>

      <main className="cp-main">
        {tab === 'today'     && <Today c={c} />}
        {tab === 'training'  && <Training c={c} />}
        {tab === 'nutrition' && <Nutrition c={c} />}
        {tab === 'grocery'   && <Grocery c={c} />}
        {tab === 'checkin'   && <CheckIn c={c} />}
      </main>

      <footer className="cp-foot">
        vveritas* — built for {c.name.toLowerCase()}, {c.startedOn}
      </footer>
    </div>
  )
}

function Today({ c }) {
  return (
    <>
      <Section label="week one">
        <h2 className="cp-h2">{c.week1.mission}</h2>
        <ul className="cp-list">
          {c.week1.targets.map(t => <li key={t}>{t}</li>)}
        </ul>
        <p className="cp-quote">{c.week1.note}</p>
      </Section>

      <Section label="every day">
        <ul className="cp-list numbered">
          {c.daily.map(d => <li key={d}>{d}</li>)}
        </ul>
      </Section>

      <Section label="the standard you set">
        <div className="cp-standard">
          <div className="cp-standard-label">{c.standard.label}</div>
          <p className="cp-standard-quote">“{c.standard.quote}”</p>
          <p className="cp-note">{c.standard.note}</p>
        </div>
      </Section>

      <Section label="i need an answer on this">
        <p className="cp-note strong">{c.followUp}</p>
      </Section>
    </>
  )
}

function Training({ c }) {
  return (
    <>
      <Section label="structure">
        <h2 className="cp-h2">{c.training.structure}</h2>
        <p className="cp-note">{c.training.rule}</p>
      </Section>

      {c.training.days.map(d => (
        <Section key={d.day} label={`${d.day} · ${d.focus}`}>
          <h2 className="cp-h2">{d.label}</h2>
          <div className="cp-ex">
            {d.exercises.map((e, i) => (
              <div className="cp-ex-row" key={e.name}>
                <span className="cp-ex-n">{String(i + 1).padStart(2, '0')}</span>
                <div className="cp-ex-body">
                  <div className="cp-ex-name">{e.name}</div>
                  {e.cue && <div className="cp-ex-cue">{e.cue}</div>}
                </div>
                <span className="cp-ex-sets">{e.sets} × {e.reps}</span>
              </div>
            ))}
          </div>
          {d.note && <p className="cp-note">{d.note}</p>}
        </Section>
      ))}

      <Section label="how you add weight">
        <h2 className="cp-h2">{c.training.progression.rule}</h2>
        <p className="cp-note">{c.training.progression.explain}</p>
        <p className="cp-mono">{c.training.progression.example}</p>
      </Section>

      <Section label="cardio">
        <h2 className="cp-h2">{c.training.cardio.headline}</h2>
        <p className="cp-note">{c.training.cardio.note}</p>
      </Section>
    </>
  )
}

function Nutrition({ c }) {
  const p = c.nutrition.protein
  return (
    <>
      <Section label="the whole idea">
        <h2 className="cp-h2">{c.nutrition.headline}</h2>
        <p className="cp-note">{c.nutrition.note}</p>
      </Section>

      <Section label="protein">
        <div className="cp-protein">
          <span className="cp-protein-n">{p.target}</span>
          <span className="cp-protein-u">{p.unit} / day</span>
        </div>
        <div className="cp-range">anywhere from {p.min} to {p.max}{p.unit} counts</div>
        <p className="cp-note">{c.nutrition.proteinNote}</p>
      </Section>

      <DaySchedule d={c.nutrition.workDays} />
      <DaySchedule d={c.nutrition.offDays} />

      <Section label="around training">
        <p className="cp-note">pre-workout — {c.nutrition.preWorkout}</p>
        <p className="cp-note">{c.nutrition.rhythm}</p>
      </Section>
    </>
  )
}

function DaySchedule({ d }) {
  return (
    <Section label={d.label}>
      <p className="cp-note tight">{d.note}</p>
      {d.meals.map(m => (
        <div className="cp-meal" key={m.slot}>
          <div className="cp-meal-head">
            <span className="cp-meal-slot">{m.slot}</span>
            <span className="cp-meal-p">{m.protein}</span>
          </div>
          <div className="cp-chips">
            {m.options.map(o => <span className="cp-chip" key={o}>{o}</span>)}
          </div>
          {m.note && <p className="cp-note tight">{m.note}</p>}
        </div>
      ))}
    </Section>
  )
}

function Grocery({ c }) {
  return (
    <>
      {c.grocery.map(g => (
        <Section key={g.group} label={g.group}>
          <div className="cp-chips">
            {g.items.map(i => <span className="cp-chip" key={i}>{i}</span>)}
          </div>
          {g.note && <p className="cp-note">{g.note}</p>}
        </Section>
      ))}
    </>
  )
}

function Section({ label, children }) {
  return (
    <section className="cp-section">
      <div className="cp-label">{label}</div>
      {children}
    </section>
  )
}
