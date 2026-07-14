'use client';
import { useState } from 'react';

export default function PortalClient({ client, program, thread, nutri }) {
  const [tab, setTab] = useState('program');
  const [checkInSent, setCheckInSent] = useState(false);
  const [checkIn, setCheckIn] = useState({ weight: '', energy: '5', sleep: '5', notes: '' });
  const [macroLog, setMacroLog] = useState({ calories: '', protein: '', carbs: '', fat: '' });
  const [macroSent, setMacroSent] = useState(false);
  const [msg, setMsg] = useState('');

  const firstName = client.name.split(' ')[0];
  const weightDelta = client.weight.start - client.weight.current;

  return (
    <div className="portal-page">

      <header className="portal-header">
        <div className="portal-brand">vveritas*</div>
        <div className="portal-header-right">
          <span className="portal-tier">{client.tier}</span>
        </div>
      </header>

      <div className="portal-hero">
        <h1 className="portal-greeting">hey {firstName}.</h1>
        <div className="portal-goal">"{client.goal}"</div>
        <div className="portal-weight-row">
          <div className="portal-weight-stat">
            <span className="portal-weight-val">{client.weight.start}</span>
            <span className="portal-weight-lab">start</span>
          </div>
          <span className="portal-weight-arrow">→</span>
          <div className="portal-weight-stat">
            <span className="portal-weight-val">{client.weight.current}</span>
            <span className="portal-weight-lab">now</span>
          </div>
          {weightDelta !== 0 && (
            <div className="portal-weight-stat accent">
              <span className="portal-weight-val">
                {weightDelta > 0 ? `−${weightDelta}` : `+${Math.abs(weightDelta)}`} lbs
              </span>
              <span className="portal-weight-lab">total</span>
            </div>
          )}
        </div>
      </div>

      <nav className="portal-tabs">
        {['program', 'check in', 'nutrition', 'messages'].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`portal-tab${tab === t ? ' active' : ''}`}
          >
            {t}
          </button>
        ))}
      </nav>

      <div className="portal-content">

        {tab === 'program' && (
          <div className="portal-program">
            {program ? (
              <>
                <div className="portal-program-name">{program.name}</div>
                <div className="portal-program-meta">{program.daysPerWeek}x/week · {program.weeks} weeks</div>
                {program.workouts.length > 0 ? (
                  <div className="portal-workout-list">
                    {program.workouts.map(w => (
                      <div key={w.id} className="portal-workout-block">
                        <div className="portal-workout-day">{w.day}</div>
                        {w.exercises.map((ex, i) => (
                          <div key={i} className="portal-exercise-row">
                            <span className="portal-exercise-name">{ex.name}</span>
                            <span className="portal-exercise-detail">{ex.sets}×{ex.reps} · {ex.rest}</span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="portal-empty">program being built. check back soon.</div>
                )}
              </>
            ) : (
              <div className="portal-empty">no program assigned yet.</div>
            )}
          </div>
        )}

        {tab === 'check in' && (
          <div className="portal-checkin">
            {checkInSent ? (
              <div className="portal-sent">
                <div className="portal-sent-title">check in received.</div>
                <div className="portal-sent-sub">nico will review it shortly.</div>
              </div>
            ) : (
              <form className="portal-form" onSubmit={e => { e.preventDefault(); setCheckInSent(true); }}>
                <div className="portal-field">
                  <label>current weight (lbs)</label>
                  <input
                    type="number"
                    placeholder={client.weight.current}
                    value={checkIn.weight}
                    onChange={e => setCheckIn({ ...checkIn, weight: e.target.value })}
                  />
                </div>
                <div className="portal-field">
                  <label>energy this week (1–10)</label>
                  <div className="portal-slider-row">
                    <input
                      type="range" min="1" max="10"
                      value={checkIn.energy}
                      onChange={e => setCheckIn({ ...checkIn, energy: e.target.value })}
                    />
                    <span className="portal-slider-val">{checkIn.energy}</span>
                  </div>
                </div>
                <div className="portal-field">
                  <label>sleep quality this week (1–10)</label>
                  <div className="portal-slider-row">
                    <input
                      type="range" min="1" max="10"
                      value={checkIn.sleep}
                      onChange={e => setCheckIn({ ...checkIn, sleep: e.target.value })}
                    />
                    <span className="portal-slider-val">{checkIn.sleep}</span>
                  </div>
                </div>
                <div className="portal-field">
                  <label>notes for nico</label>
                  <textarea
                    placeholder="how did training feel? anything off? wins this week?"
                    value={checkIn.notes}
                    onChange={e => setCheckIn({ ...checkIn, notes: e.target.value })}
                    rows={4}
                  />
                </div>
                <button type="submit" className="portal-submit">submit check in →</button>
              </form>
            )}
          </div>
        )}

        {tab === 'nutrition' && (
          <div className="portal-nutrition">
            {nutri ? (
              <>
                <div className="portal-section-label">your targets</div>
                <div className="portal-macros">
                  <div className="portal-macro">
                    <span>{nutri.targets.calories}</span><label>kcal</label>
                  </div>
                  <div className="portal-macro">
                    <span>{nutri.targets.protein}g</span><label>protein</label>
                  </div>
                  <div className="portal-macro">
                    <span>{nutri.targets.carbs}g</span><label>carbs</label>
                  </div>
                  <div className="portal-macro">
                    <span>{nutri.targets.fat}g</span><label>fat</label>
                  </div>
                </div>

                <div className="portal-section-label" style={{marginTop:'2.5rem'}}>log today</div>
                {macroSent ? (
                  <div className="portal-sent">
                    <div className="portal-sent-title">logged.</div>
                    <div className="portal-sent-sub">nico can see today's numbers.</div>
                  </div>
                ) : (
                  <form className="portal-macro-form" onSubmit={e => { e.preventDefault(); setMacroSent(true); }}>
                    {['calories', 'protein', 'carbs', 'fat'].map(k => (
                      <div key={k} className="portal-field">
                        <label>{k}{k !== 'calories' ? ' (g)' : ' (kcal)'}</label>
                        <input
                          type="number"
                          placeholder={nutri.targets[k]}
                          value={macroLog[k]}
                          onChange={e => setMacroLog({ ...macroLog, [k]: e.target.value })}
                        />
                      </div>
                    ))}
                    <button type="submit" className="portal-submit">log it →</button>
                  </form>
                )}

                <div className="portal-section-label" style={{marginTop:'2.5rem'}}>recent</div>
                {nutri.log.map(day => (
                  <div key={day.date} className="portal-log-row">
                    <span className="portal-log-date">{day.date}</span>
                    <span>{day.calories} kcal</span>
                    <span>{day.protein}g P</span>
                    <span>{day.carbs}g C</span>
                    <span>{day.fat}g F</span>
                  </div>
                ))}
              </>
            ) : (
              <div className="portal-empty">nutrition targets coming soon.</div>
            )}
          </div>
        )}

        {tab === 'messages' && (
          <div className="portal-messages">
            <div className="portal-thread">
              {thread ? thread.thread.map((m, i) => (
                <div key={i} className={`portal-msg ${m.from}`}>
                  <div className="portal-msg-text">{m.text}</div>
                  <div className="portal-msg-time">{m.time}</div>
                </div>
              )) : (
                <div className="portal-empty">no messages yet.</div>
              )}
            </div>
            <div className="portal-msg-input-row">
              <input
                type="text"
                className="portal-msg-input"
                placeholder="message nico..."
                value={msg}
                onChange={e => setMsg(e.target.value)}
              />
              <button
                className="portal-submit-inline"
                onClick={() => setMsg('')}
              >send</button>
            </div>
          </div>
        )}

      </div>

      <footer className="portal-footer">vveritas* coaching</footer>
    </div>
  );
}
