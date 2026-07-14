'use client';
import Link from 'next/link';
import { useState } from 'react';

function PillarGrid({ pillarData, pillarDetailsData }) {
  const [selected, setSelected] = useState(null);

  if (!pillarData) return <div className="coach-empty">no pillar data.</div>;

  if (selected) {
    const d = pillarDetailsData?.pillars?.[selected];
    if (d) {
      const color = d.score >= 70 ? '#4a8c6a' : d.score >= 40 ? '#8c7a3a' : '#5C1A1A';
      const trendColor = d.trend === 'up' ? '#4a8c6a' : d.trend === 'down' ? '#5C1A1A' : '#5A5A5A';
      return (
        <div className="coach-pd">
          <button className="coach-pd-back" onClick={() => setSelected(null)}>← pillars</button>
          <div className="coach-pd-header">
            <span className="coach-pd-name">{selected}</span>
            <span className="coach-pd-score" style={{ color }}>{d.score}</span>
          </div>
          <div className="coach-pd-meta">
            <span style={{ color: trendColor, fontSize: '0.78rem' }}>
              {d.trend === 'up' ? '↑' : d.trend === 'down' ? '↓' : '→'} {d.trend}
            </span>
            {d.streakDays > 0 && (
              <span className="coach-pd-streak">{d.streakDays} day streak</span>
            )}
          </div>
          <div className="coach-pd-next-label">
            <span>toward {d.nextScore}</span>
            <span>{d.progressToNext}%</span>
          </div>
          <div className="coach-pd-next-track">
            <div className="coach-pd-next-fill" style={{ width: `${d.progressToNext}%` }} />
          </div>
          {d.helping.length > 0 && (
            <div className="coach-pd-section">
              <div className="coach-pd-section-label" style={{ color: '#4a8c6a' }}>raising score</div>
              {d.helping.map((h, i) => (
                <div key={i} className="coach-pd-item">
                  <span className="coach-pd-dot" style={{ color: '#4a8c6a' }}>+</span>
                  <span>{h}</span>
                </div>
              ))}
            </div>
          )}
          {d.holding.length > 0 && (
            <div className="coach-pd-section">
              <div className="coach-pd-section-label" style={{ color: '#5C1A1A' }}>limiting score</div>
              {d.holding.map((h, i) => (
                <div key={i} className="coach-pd-item">
                  <span className="coach-pd-dot" style={{ color: '#5C1A1A' }}>−</span>
                  <span>{h}</span>
                </div>
              ))}
            </div>
          )}
          <div className="coach-pd-section">
            <div className="coach-pd-section-label">how to reach {d.nextScore}</div>
            {d.toImprove.map((t, i) => (
              <div key={i} className="coach-pd-item">
                <span className="coach-pd-dot">→</span>
                <span>{t}</span>
              </div>
            ))}
          </div>
          {d.note && <div className="coach-pd-note">"{d.note}"</div>}
        </div>
      );
    }
  }

  const avg = Math.round(pillarData.data.reduce((s, p) => s + p.score, 0) / pillarData.data.length);
  const avgColor = avg >= 70 ? '#4a8c6a' : avg >= 40 ? '#8c7a3a' : '#5C1A1A';

  return (
    <div>
      <div className="coach-pillars-avg">
        <span className="coach-section-label" style={{ marginBottom: 0 }}>self-mastery score</span>
        <span className="coach-pillars-avg-val" style={{ color: avgColor }}>{avg}</span>
      </div>
      <div className="coach-pillar-grid">
        {pillarData.data.map((p, i) => {
          const c = p.score >= 70 ? '#4a8c6a' : p.score >= 40 ? '#8c7a3a' : '#5C1A1A';
          const hasDetail = !!pillarDetailsData?.pillars?.[p.name];
          return (
            <button
              key={i}
              className={`coach-pillar-card${hasDetail ? ' clickable' : ''}`}
              onClick={() => hasDetail && setSelected(p.name)}
            >
              <div className="coach-pillar-name">{p.name}</div>
              <div className="coach-pillar-track">
                <div className="coach-pillar-fill" style={{ width: `${p.score}%`, background: c }} />
              </div>
              <div className="coach-pillar-bottom">
                <span className="coach-pillar-score" style={{ color: c }}>{p.score}</span>
                {hasDetail && <span className="coach-pillar-tap">drill down →</span>}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function ClientDetailClient({
  client, program, thread, nutri,
  pillarData, pillarDetailsData, mission, objectiveData,
}) {
  const [tab, setTab] = useState('pillars');
  const [msg, setMsg] = useState('');

  const firstName = client.name.split(' ')[0];
  const weightLost = client.weight.start - client.weight.current;
  const tabs = ['pillars', 'fitness', 'nutrition', 'mission', 'messages'];

  return (
    <div className="coach-page">
      <div className="coach-page-header">
        <Link href="/coach/clients" className="coach-back">← clients</Link>
      </div>

      {/* header */}
      <div className="coach-client-detail-header">
        <div>
          <h1 className="coach-page-title">{client.name}</h1>
          <div className="coach-client-detail-meta">
            {client.tier} · ${client.price}/mo · started {client.startDate}
          </div>
          <div className="coach-client-goal">"{client.goal}"</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
          <span className={`coach-client-status large ${client.status}`}>{client.status}</span>
          <div className="coach-weight-row" style={{ gap: '0.8rem' }}>
            <div className="coach-weight-stat">
              <div className="coach-weight-val">{client.weight.start}</div>
              <div className="coach-weight-lab">start</div>
            </div>
            <div className="coach-weight-arrow">→</div>
            <div className="coach-weight-stat">
              <div className="coach-weight-val">{client.weight.current}</div>
              <div className="coach-weight-lab">now</div>
            </div>
            {weightLost !== 0 && (
              <div className="coach-weight-stat accent">
                <div className="coach-weight-val">
                  {weightLost > 0 ? `−${weightLost}` : `+${Math.abs(weightLost)}`}
                </div>
                <div className="coach-weight-lab">lbs</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* tabs */}
      <nav className="coach-tabs">
        {tabs.map(t => (
          <button
            key={t}
            className={`coach-tab${tab === t ? ' active' : ''}`}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </nav>

      {/* pillars */}
      {tab === 'pillars' && (
        <section className="coach-section">
          <PillarGrid pillarData={pillarData} pillarDetailsData={pillarDetailsData} />
        </section>
      )}

      {/* fitness */}
      {tab === 'fitness' && (
        <section className="coach-section">
          {program ? (
            <>
              <div className="coach-program-name">{program.name}</div>
              <div className="coach-program-meta">
                {program.daysPerWeek}x/week · {program.weeks} weeks · {program.experienceLevel || program.type}
              </div>
              {program.note && (
                <div className="coach-program-philosophy">{program.note}</div>
              )}
              <div className="coach-workout-list">
                {program.workouts.map(w => (
                  <div key={w.id} className="coach-workout-block">
                    <div className="coach-workout-day">{w.day}</div>
                    <div className="coach-exercise-list">
                      {w.exercises.map((ex, i) => (
                        <div key={i} className="coach-exercise-item">
                          <div className="coach-exercise-row">
                            <span className="coach-exercise-name">{ex.name}</span>
                            <span className="coach-exercise-detail">{ex.sets}×{ex.reps} · {ex.rest}</span>
                          </div>
                          {ex.note && (
                            <div className="coach-exercise-note">{ex.note}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="coach-empty">no program assigned.</div>
          )}
        </section>
      )}

      {/* nutrition */}
      {tab === 'nutrition' && (
        <section className="coach-section">
          {nutri ? (
            <>
              {nutri.proteinTarget && (
                <div className="coach-protein-target">
                  <span className="coach-section-label" style={{ marginBottom: 0 }}>daily protein target</span>
                  <span className="coach-protein-val">{nutri.proteinTarget}g</span>
                </div>
              )}
              {nutri.foodQuality && (
                <>
                  <div className="coach-section-label" style={{ marginTop: '1.8rem' }}>recent food quality</div>
                  {nutri.foodQuality.recentScores.map((r, i) => {
                    const c = r.score >= 80 ? '#4a8c6a' : r.score >= 60 ? '#8c7a3a' : '#5C1A1A';
                    return (
                      <div key={i} className="coach-fq-row">
                        <span className="coach-fq-date">{r.date}</span>
                        <div className="coach-fq-bar-track">
                          <div className="coach-fq-bar" style={{ width: `${r.score}%`, background: c }} />
                        </div>
                        <span className="coach-fq-score" style={{ color: c }}>{r.score}%</span>
                        {r.protein && <span className="coach-fq-protein-badge">✓ protein</span>}
                      </div>
                    );
                  })}
                </>
              )}
              <div className="coach-section-label" style={{ marginTop: '1.8rem' }}>macro targets</div>
              <div className="coach-macro-targets">
                <div className="coach-macro"><span>{nutri.targets.calories}</span><label>kcal</label></div>
                <div className="coach-macro"><span>{nutri.targets.protein}g</span><label>protein</label></div>
                <div className="coach-macro"><span>{nutri.targets.carbs}g</span><label>carbs</label></div>
                <div className="coach-macro"><span>{nutri.targets.fat}g</span><label>fat</label></div>
              </div>
              {nutri.log.length > 0 && (
                <>
                  <div className="coach-section-label" style={{ marginTop: '1.5rem' }}>recent logs</div>
                  {nutri.log.map(day => (
                    <div key={day.date} className="coach-nutrition-log-row">
                      <span className="coach-log-date">{day.date}</span>
                      <span>{day.calories} kcal</span>
                      <span>{day.protein}g P</span>
                      <span>{day.carbs}g C</span>
                      <span>{day.fat}g F</span>
                    </div>
                  ))}
                </>
              )}
            </>
          ) : (
            <div className="coach-empty">no nutrition data.</div>
          )}
        </section>
      )}

      {/* mission */}
      {tab === 'mission' && (
        <section className="coach-section">
          {mission ? (
            <>
              <div className="coach-section-label" style={{ marginBottom: '1rem' }}>today's tasks</div>
              {mission.tasks.map((t, i) => (
                <div key={i} className="coach-mission-row">
                  <span className={`coach-mission-check${t.done ? ' done' : ''}`}>
                    {t.done ? '✓' : '○'}
                  </span>
                  <span className="coach-mission-text">{t.text}</span>
                  <span className="coach-mission-pillar">{t.pillar}</span>
                </div>
              ))}
            </>
          ) : (
            <div className="coach-empty">no mission set for today.</div>
          )}
          {objectiveData && (
            <>
              <div className="coach-section-label" style={{ marginTop: '2rem', marginBottom: '1rem' }}>objectives</div>
              {objectiveData.items.map((obj, i) => (
                <div key={i} className="coach-objective-card">
                  <div className="coach-objective-top">
                    <span className="coach-objective-title">{obj.title}</span>
                    <span className="coach-objective-pct">{obj.progress}%</span>
                  </div>
                  <div className="coach-obj-track">
                    <div className="coach-obj-fill" style={{ width: `${obj.progress}%` }} />
                  </div>
                  <div className="coach-objective-milestone">{obj.milestone}</div>
                </div>
              ))}
            </>
          )}
        </section>
      )}

      {/* messages */}
      {tab === 'messages' && (
        <section className="coach-section">
          {thread ? (
            <div className="coach-thread">
              {thread.thread.map((m, i) => (
                <div key={i} className={`coach-msg ${m.from}`}>
                  <div className="coach-msg-text">{m.text}</div>
                  <div className="coach-msg-time">{m.time}</div>
                </div>
              ))}
              <div className="coach-msg-input-row">
                <input
                  type="text"
                  placeholder={`reply to ${firstName}...`}
                  className="coach-msg-input"
                  value={msg}
                  onChange={e => setMsg(e.target.value)}
                />
                <button className="coach-msg-send" onClick={() => setMsg('')}>send</button>
              </div>
            </div>
          ) : (
            <div className="coach-empty">no messages yet.</div>
          )}
        </section>
      )}
    </div>
  );
}
