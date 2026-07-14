'use client';
import { useState } from 'react';

function MomentumBar({ score }) {
  const color = score >= 70 ? '#4a8c6a' : score >= 40 ? '#8c7a3a' : '#5C1A1A';
  return (
    <div className="portal-momentum">
      <div className="portal-momentum-top">
        <span className="portal-momentum-label">momentum</span>
        <span className="portal-momentum-score" style={{ color }}>{score}</span>
      </div>
      <div className="portal-momentum-track">
        <div
          className="portal-momentum-fill"
          style={{ width: `${score}%`, background: color }}
        />
      </div>
    </div>
  );
}

function ProgramCalendar({ program, blockStart }) {
  if (!program || !blockStart) return null;

  const totalWeeks = program.weeks;
  const start = new Date(blockStart);
  const today = new Date('2026-07-14');
  const daysPassed = Math.floor((today - start) / (1000 * 60 * 60 * 24));
  const currentWeek = Math.min(Math.floor(daysPassed / 7) + 1, totalWeeks);

  return (
    <div className="portal-calendar">
      <div className="portal-section-label">program timeline — week {currentWeek} of {totalWeeks}</div>
      <div className="portal-calendar-weeks">
        {Array.from({ length: totalWeeks }, (_, i) => {
          const week = i + 1;
          const done = week < currentWeek;
          const active = week === currentWeek;
          return (
            <div
              key={week}
              className={`portal-week-block${done ? ' done' : active ? ' active' : ' upcoming'}`}
            >
              <div className="portal-week-dot" />
              <div className="portal-week-num">{week}</div>
            </div>
          );
        })}
      </div>
      <div className="portal-calendar-legend">
        <span className="legend-done">■ complete</span>
        <span className="legend-active">■ this week</span>
        <span className="legend-upcoming">■ upcoming</span>
      </div>
    </div>
  );
}

function GroceryList({ groceryList }) {
  const categories = ['protein', 'dairy', 'fat', 'carbs', 'other'];
  const labels = { protein: 'protein', dairy: 'dairy', fat: 'fats + oils', carbs: 'carbs + fruit', other: 'other' };

  if (!groceryList) return (
    <div className="portal-empty">grocery list coming this week.</div>
  );

  return (
    <div className="portal-grocery">
      {groceryList.note && (
        <div className="portal-grocery-note">"{groceryList.note}"</div>
      )}
      <div className="portal-grocery-week">week of {groceryList.week}</div>
      {categories.map(cat => {
        const items = groceryList.items.filter(i => i.category === cat);
        if (!items.length) return null;
        return (
          <div key={cat} className="portal-grocery-section">
            <div className="portal-section-label">{labels[cat]}</div>
            {items.map((item, i) => (
              <div key={i} className="portal-grocery-row">
                <span className="portal-grocery-name">{item.name}</span>
                <span className="portal-grocery-qty">{item.qty}</span>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default function PortalClient({ client, program, thread, nutri, groceryList }) {
  const [tab, setTab] = useState('program');
  const [checkInSent, setCheckInSent] = useState(false);
  const [checkIn, setCheckIn] = useState({ weight: '', energy: '5', sleep: '5', notes: '' });
  const [macroLog, setMacroLog] = useState({ calories: '', protein: '', carbs: '', fat: '' });
  const [macroSent, setMacroSent] = useState(false);
  const [msg, setMsg] = useState('');

  const firstName = client.name.split(' ')[0];
  const weightDelta = client.weight.start - client.weight.current;

  const tabs = ['program', 'check in', 'nutrition', 'grocery', 'messages'];

  return (
    <div className="portal-page">

      <header className="portal-header">
        <div className="portal-brand">vveritas*</div>
        <span className="portal-tier">{client.tier}</span>
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
        <MomentumBar score={client.momentum} />
      </div>

      <nav className="portal-tabs">
        {tabs.map(t => (
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
            <ProgramCalendar program={program} blockStart={client.blockStart} />
            {program ? (
              <>
                <div className="portal-program-name" style={{marginTop:'2rem'}}>{program.name}</div>
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
                    <input type="range" min="1" max="10" value={checkIn.energy}
                      onChange={e => setCheckIn({ ...checkIn, energy: e.target.value })} />
                    <span className="portal-slider-val">{checkIn.energy}</span>
                  </div>
                </div>
                <div className="portal-field">
                  <label>sleep quality this week (1–10)</label>
                  <div className="portal-slider-row">
                    <input type="range" min="1" max="10" value={checkIn.sleep}
                      onChange={e => setCheckIn({ ...checkIn, sleep: e.target.value })} />
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
                  <div className="portal-macro"><span>{nutri.targets.calories}</span><label>kcal</label></div>
                  <div className="portal-macro"><span>{nutri.targets.protein}g</span><label>protein</label></div>
                  <div className="portal-macro"><span>{nutri.targets.carbs}g</span><label>carbs</label></div>
                  <div className="portal-macro"><span>{nutri.targets.fat}g</span><label>fat</label></div>
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
                        <input type="number" placeholder={nutri.targets[k]}
                          value={macroLog[k]} onChange={e => setMacroLog({ ...macroLog, [k]: e.target.value })} />
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

        {tab === 'grocery' && <GroceryList groceryList={groceryList} />}

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
              <input type="text" className="portal-msg-input" placeholder="message nico..."
                value={msg} onChange={e => setMsg(e.target.value)} />
              <button className="portal-submit-inline" onClick={() => setMsg('')}>send</button>
            </div>
          </div>
        )}

      </div>

      <footer className="portal-footer">vveritas* coaching</footer>
    </div>
  );
}
