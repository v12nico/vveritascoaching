'use client';
import { useState } from 'react';

// ─── self-mastery score ───────────────────────────────────────────
function SelfMasteryScore({ score }) {
  const color = score >= 70 ? '#4a8c6a' : score >= 40 ? '#8c7a3a' : '#5C1A1A';
  return (
    <div className="portal-sms">
      <div className="portal-sms-top">
        <span className="portal-sms-label">self-mastery score</span>
        <span className="portal-sms-score" style={{ color }}>{score}</span>
      </div>
      <div className="portal-sms-track">
        <div className="portal-sms-fill" style={{ width: `${score}%`, background: color }} />
      </div>
    </div>
  );
}

// ─── pillar detail view ───────────────────────────────────────────
function PillarDetail({ name, detail, onBack }) {
  const color = detail.score >= 70 ? '#4a8c6a' : detail.score >= 40 ? '#8c7a3a' : '#5C1A1A';
  const trendLabel = detail.trend === 'up' ? '↑ trending up' : detail.trend === 'down' ? '↓ trending down' : '→ stable';
  const trendColor = detail.trend === 'up' ? '#4a8c6a' : detail.trend === 'down' ? '#5C1A1A' : '#5A5A5A';

  return (
    <div className="portal-pd">
      <button className="portal-pd-back" onClick={onBack}>← pillars</button>

      <div className="portal-pd-header">
        <div className="portal-pd-name">{name}</div>
        <div className="portal-pd-score" style={{ color }}>{detail.score}</div>
      </div>

      <div className="portal-pd-trend-row">
        <span className="portal-pd-trend" style={{ color: trendColor }}>{trendLabel}</span>
        {detail.streakDays > 0 && (
          <span className="portal-pd-streak">{detail.streakDays} day streak</span>
        )}
      </div>

      <div className="portal-pd-next-label">
        <span>toward {detail.nextScore}</span>
        <span>{detail.progressToNext}%</span>
      </div>
      <div className="portal-pd-next-track">
        <div className="portal-pd-next-fill" style={{ width: `${detail.progressToNext}%` }} />
      </div>
      {detail.trend === 'up' && detail.progressToNext > 60 && (
        <div className="portal-pd-almost">
          your {name} score is trending up — sustain your current standard to reach {detail.nextScore}.
        </div>
      )}

      {detail.helping.length > 0 && (
        <div className="portal-pd-section">
          <div className="portal-pd-section-label portal-pd-helping">what is raising your score</div>
          {detail.helping.map((h, i) => (
            <div key={i} className="portal-pd-item portal-pd-item-green">
              <span className="portal-pd-dot">+</span>
              <span>{h}</span>
            </div>
          ))}
        </div>
      )}

      {detail.holding.length > 0 && (
        <div className="portal-pd-section">
          <div className="portal-pd-section-label portal-pd-holding">what is limiting your score</div>
          {detail.holding.map((h, i) => (
            <div key={i} className="portal-pd-item portal-pd-item-red">
              <span className="portal-pd-dot">−</span>
              <span>{h}</span>
            </div>
          ))}
        </div>
      )}

      <div className="portal-pd-section">
        <div className="portal-pd-section-label">how to reach {detail.nextScore}</div>
        {detail.toImprove.map((t, i) => (
          <div key={i} className="portal-pd-item">
            <span className="portal-pd-dot">→</span>
            <span>{t}</span>
          </div>
        ))}
      </div>

      {detail.note && (
        <div className="portal-pd-note">"{detail.note}"</div>
      )}

      <div className="portal-pd-scoring-note">
        scores reflect your behavior over the past 14–30 days — not a single session.
        consistent execution across multiple weeks is what moves the number.
      </div>
    </div>
  );
}

// ─── life pillars tab ─────────────────────────────────────────────
function PillarsTab({ pillarData, pillarDetailsData }) {
  const [selected, setSelected] = useState(null);

  if (!pillarData) return <div className="portal-empty">pillars coming soon.</div>;

  if (selected) {
    const detail = pillarDetailsData?.pillars?.[selected];
    if (detail) return <PillarDetail name={selected} detail={detail} onBack={() => setSelected(null)} />;
  }

  const avg = Math.round(pillarData.data.reduce((s, p) => s + p.score, 0) / pillarData.data.length);
  const avgColor = avg >= 70 ? '#4a8c6a' : avg >= 40 ? '#8c7a3a' : '#5C1A1A';

  return (
    <div className="portal-pillars">
      <div className="portal-pillars-score">
        <span className="portal-pillars-score-label">overall</span>
        <span className="portal-pillars-score-val" style={{ color: avgColor }}>{avg}</span>
      </div>

      <div className="portal-pillar-grid">
        {pillarData.data.map((p, i) => {
          const c = p.score >= 70 ? '#4a8c6a' : p.score >= 40 ? '#8c7a3a' : '#5C1A1A';
          const hasDetail = !!pillarDetailsData?.pillars?.[p.name];
          return (
            <button
              key={i}
              className={`portal-pillar-card${hasDetail ? ' clickable' : ''}`}
              onClick={() => hasDetail && setSelected(p.name)}
            >
              <div className="portal-pillar-name">{p.name}</div>
              <div className="portal-pillar-track">
                <div className="portal-pillar-fill" style={{ width: `${p.score}%`, background: c }} />
              </div>
              <div className="portal-pillar-bottom">
                <div className="portal-pillar-score" style={{ color: c }}>{p.score}</div>
                {hasDetail && <div className="portal-pillar-tap">details →</div>}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── today's mission tab ──────────────────────────────────────────
function MissionTab({ mission, objectiveData }) {
  const [tasks, setTasks] = useState(mission?.tasks || []);

  function toggle(id) {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  }

  const total = tasks.length;
  const done = tasks.filter(t => t.done).length;
  const pct = total ? Math.round((done / total) * 100) : 0;
  const color = pct >= 80 ? '#4a8c6a' : pct >= 50 ? '#8c7a3a' : '#5C1A1A';

  return (
    <div className="portal-mission">
      <div className="portal-mission-header">
        <span className="portal-section-label">today's mission</span>
        <span className="portal-mission-pct" style={{ color }}>{pct}% complete</span>
      </div>
      <div className="portal-mission-bar-track">
        <div className="portal-mission-bar-fill" style={{ width: `${pct}%`, background: color }} />
      </div>

      <div className="portal-task-list">
        {tasks.map(task => (
          <button
            key={task.id}
            className={`portal-task${task.done ? ' done' : ''}`}
            onClick={() => toggle(task.id)}
          >
            <span className="portal-task-check">{task.done ? '✓' : '○'}</span>
            <span className="portal-task-text">{task.text}</span>
            <span className="portal-task-pillar">{task.pillar}</span>
          </button>
        ))}
      </div>

      {objectiveData && (
        <div className="portal-objectives">
          <div className="portal-section-label" style={{ marginTop: '2.5rem', marginBottom: '1rem' }}>
            objectives
          </div>
          {objectiveData.items.map((obj, i) => (
            <div key={i} className="portal-objective-card">
              <div className="portal-objective-top">
                <span className="portal-objective-title">{obj.title}</span>
                <span className="portal-objective-pct">{obj.progress}%</span>
              </div>
              <div className="portal-obj-track">
                <div className="portal-obj-fill" style={{ width: `${obj.progress}%` }} />
              </div>
              <div className="portal-objective-milestone">{obj.milestone}</div>
              <div className="portal-objective-reason">"{obj.reason}"</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── daily food quality score ──────────────────────────────────────
function FoodQualityScore({ nutri }) {
  const [checklist, setChecklist] = useState(
    nutri?.foodQuality?.checklist?.map(c => ({ ...c })) || []
  );

  function toggle(id) {
    setChecklist(prev => prev.map(c => c.id === id ? { ...c, done: !c.done } : c));
  }

  const total = checklist.length;
  const done = checklist.filter(c => c.done).length;
  const score = total ? Math.round((done / total) * 100) : 0;
  const color = score >= 80 ? '#4a8c6a' : score >= 60 ? '#8c7a3a' : '#5C1A1A';

  const recent = nutri?.foodQuality?.recentScores || [];

  return (
    <div className="portal-fq">
      <div className="portal-fq-header">
        <span className="portal-section-label">food quality today</span>
        <span className="portal-fq-score" style={{ color }}>{score}%</span>
      </div>
      <div className="portal-sms-track" style={{ marginBottom: '1.5rem' }}>
        <div className="portal-sms-fill" style={{ width: `${score}%`, background: color }} />
      </div>

      <div className="portal-task-list">
        {checklist.map(item => (
          <button
            key={item.id}
            className={`portal-task${item.done ? ' done' : ''}`}
            onClick={() => toggle(item.id)}
          >
            <span className="portal-task-check">{item.done ? '✓' : '○'}</span>
            <span className="portal-task-text">{item.text}</span>
          </button>
        ))}
      </div>

      {nutri?.proteinTarget && (
        <div className="portal-fq-protein">
          <span className="portal-section-label" style={{ marginBottom: 0 }}>daily protein target</span>
          <span className="portal-fq-protein-val">{nutri.proteinTarget}g</span>
        </div>
      )}

      {recent.length > 0 && (
        <div className="portal-fq-recent">
          <div className="portal-section-label" style={{ marginTop: '2rem', marginBottom: '0.8rem' }}>recent scores</div>
          {recent.map((r, i) => {
            const rc = r.score >= 80 ? '#4a8c6a' : r.score >= 60 ? '#8c7a3a' : '#5C1A1A';
            return (
              <div key={i} className="portal-fq-recent-row">
                <span className="portal-fq-recent-date">{r.date}</span>
                <div className="portal-fq-recent-bar-track">
                  <div className="portal-fq-recent-bar" style={{ width: `${r.score}%`, background: rc }} />
                </div>
                <span className="portal-fq-recent-score" style={{ color: rc }}>{r.score}%</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── program calendar ─────────────────────────────────────────────
function ProgramCalendar({ program, blockStart }) {
  if (!program || !blockStart) return null;
  const totalWeeks = program.weeks;
  const start = new Date(blockStart);
  const today = new Date('2026-07-14');
  const daysPassed = Math.floor((today - start) / (1000 * 60 * 60 * 24));
  const currentWeek = Math.min(Math.floor(daysPassed / 7) + 1, totalWeeks);

  return (
    <div className="portal-calendar">
      <div className="portal-section-label">timeline — week {currentWeek} of {totalWeeks}</div>
      <div className="portal-calendar-weeks">
        {Array.from({ length: totalWeeks }, (_, i) => {
          const week = i + 1;
          const done = week < currentWeek;
          const active = week === currentWeek;
          return (
            <div key={week} className={`portal-week-block${done ? ' done' : active ? ' active' : ' upcoming'}`}>
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

// ─── grocery list ─────────────────────────────────────────────────
function GroceryList({ groceryList }) {
  const [purchased, setPurchased] = useState({});
  const categories = ['protein', 'dairy', 'fat', 'carbs', 'other'];
  const labels = { protein: 'protein', dairy: 'dairy', fat: 'fats + oils', carbs: 'carbs + fruit', other: 'other' };

  if (!groceryList) return <div className="portal-empty">grocery list coming this week.</div>;

  function togglePurchased(name) {
    setPurchased(prev => ({ ...prev, [name]: !prev[name] }));
  }

  return (
    <div className="portal-grocery">
      {groceryList.note && <div className="portal-grocery-note">"{groceryList.note}"</div>}
      <div className="portal-grocery-week">week of {groceryList.week}</div>
      {categories.map(cat => {
        const items = groceryList.items.filter(i => i.category === cat);
        if (!items.length) return null;
        return (
          <div key={cat} className="portal-grocery-section">
            <div className="portal-section-label">{labels[cat]}</div>
            {items.map((item, i) => (
              <button
                key={i}
                className={`portal-grocery-row${purchased[item.name] ? ' purchased' : ''}`}
                onClick={() => togglePurchased(item.name)}
              >
                <span className="portal-grocery-check">{purchased[item.name] ? '✓' : '○'}</span>
                <span className="portal-grocery-name">{item.name}</span>
                <span className="portal-grocery-qty">{item.qty}</span>
              </button>
            ))}
          </div>
        );
      })}
    </div>
  );
}

// ─── daily standards (Ron-style nutrition) ────────────────────────
function DailyStandards({ nutri }) {
  const [standards, setStandards] = useState(
    nutri?.dailyStandards?.map(s => ({ ...s })) || []
  );

  function toggle(id) {
    setStandards(prev => prev.map(s => s.id === id ? { ...s, done: !s.done } : s));
  }

  const score = nutri?.dailyScore || 0;
  const color = score >= 80 ? '#4a8c6a' : score >= 60 ? '#8c7a3a' : '#5C1A1A';

  return (
    <div className="portal-fq">
      <div className="portal-fq-header">
        <span className="portal-section-label">today's standards</span>
        <span className="portal-fq-score" style={{ color }}>{score}</span>
      </div>
      <div className="portal-sms-track" style={{ marginBottom: '1.5rem' }}>
        <div className="portal-sms-fill" style={{ width: `${score}%`, background: color }} />
      </div>

      <div className="portal-task-list">
        {standards.map(item => {
          const hasProgress = item.current !== null && item.target !== null && item.unit !== 'high';
          const progressText = item.unit === 'high'
            ? 'high'
            : hasProgress
              ? `${item.current} / ${item.target}${item.unit}`
              : item.unit !== '' ? `${item.current} ${item.unit}` : '';

          return (
            <button
              key={item.id}
              className={`portal-task${item.done ? ' done' : ''}`}
              onClick={() => toggle(item.id)}
            >
              <span className="portal-task-check">{item.done ? '✓' : '○'}</span>
              <span className="portal-task-text">{item.label}</span>
              {progressText && (
                <span className="portal-ds-progress">{progressText}</span>
              )}
            </button>
          );
        })}
      </div>

      {nutri?.coachFocus && (
        <div className="portal-ds-focus">
          <div className="portal-section-label" style={{ marginTop: '2rem', marginBottom: '0.6rem' }}>coach's focus</div>
          <div className="portal-ds-focus-note">"{nutri.coachFocus}"</div>
        </div>
      )}
    </div>
  );
}

// ─── progress tab ─────────────────────────────────────────────────
function ProgressTab({ progressInfo, client }) {
  if (!progressInfo) return <div className="portal-empty">progress data coming soon.</div>;

  const { weight, bodyFat, strength, workoutCompletion, nutritionAdherence, streak, photos } = progressInfo;
  const weightToGo = weight.current - weight.goal;
  const totalToLose = weight.start - weight.goal;
  const lost = weight.start - weight.current;
  const pct = totalToLose > 0 ? Math.round((lost / totalToLose) * 100) : 0;

  return (
    <div className="portal-progress">
      <div className="portal-prog-weight">
        <div className="portal-prog-weight-row">
          <div className="portal-weight-stat">
            <div className="portal-weight-val">{weight.current}</div>
            <div className="portal-weight-lab">current</div>
          </div>
          <div className="portal-weight-arrow">→</div>
          <div className="portal-weight-stat">
            <div className="portal-weight-val" style={{ color: '#4a8c6a' }}>{weight.goal}</div>
            <div className="portal-weight-lab">goal</div>
          </div>
          {weightToGo > 0 && (
            <div className="portal-weight-stat">
              <div className="portal-weight-val" style={{ color: '#5A5A5A' }}>−{weightToGo} lbs</div>
              <div className="portal-weight-lab">to go</div>
            </div>
          )}
        </div>
        {totalToLose > 0 && (
          <div style={{ marginTop: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
              <span className="portal-section-label" style={{ marginBottom: 0 }}>weight progress</span>
              <span style={{ fontSize: '0.7rem', color: 'var(--dim)' }}>{pct}%</span>
            </div>
            <div className="portal-sms-track">
              <div className="portal-sms-fill" style={{ width: `${pct}%`, background: '#4a8c6a' }} />
            </div>
          </div>
        )}
      </div>

      <div className="portal-prog-stats">
        <div className="portal-prog-stat">
          <div className="portal-prog-stat-label">body fat</div>
          <div className="portal-prog-stat-val" style={{ color: '#4a8c6a' }}>↓ {bodyFat.label}</div>
        </div>
        <div className="portal-prog-stat">
          <div className="portal-prog-stat-label">strength</div>
          <div className="portal-prog-stat-val" style={{ color: '#4a8c6a' }}>↑ {strength.label}</div>
        </div>
        <div className="portal-prog-stat">
          <div className="portal-prog-stat-label">workout completion</div>
          <div className="portal-prog-stat-val">{workoutCompletion}%</div>
        </div>
        <div className="portal-prog-stat">
          <div className="portal-prog-stat-label">nutrition adherence</div>
          <div className="portal-prog-stat-val">{nutritionAdherence}%</div>
        </div>
        <div className="portal-prog-stat">
          <div className="portal-prog-stat-label">current streak</div>
          <div className="portal-prog-stat-val" style={{ color: '#4a8c6a' }}>{streak} days</div>
        </div>
      </div>

      <div className="portal-section-label" style={{ marginTop: '2.5rem', marginBottom: '1rem' }}>progress photos</div>
      <div className="portal-photos-grid">
        {photos.map((p, i) => (
          <div key={i} className="portal-photo-slot">
            {p.src ? (
              <img src={p.src} alt={p.label} className="portal-photo-img" />
            ) : (
              <div className="portal-photo-placeholder">
                <span className="portal-photo-placeholder-label">add photo</span>
              </div>
            )}
            <div className="portal-photo-week">{p.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── in-person training tab ───────────────────────────────────────
function InPersonTab({ inPerson }) {
  if (!inPerson) return <div className="portal-empty">in-person details coming soon.</div>;

  return (
    <div className="portal-inperson">
      <div className="portal-ip-upcoming">
        <div className="portal-section-label">upcoming session</div>
        <div className="portal-ip-session-card">
          <div className="portal-ip-day">{inPerson.upcoming.day}</div>
          <div className="portal-ip-time">{inPerson.upcoming.time}</div>
          <div className="portal-ip-location">{inPerson.upcoming.location}</div>
        </div>
        <div className="portal-ip-tracker">
          <div className="portal-ip-tracker-row">
            <span className="portal-ip-tracker-label">completed sessions</span>
            <span className="portal-ip-tracker-val">{inPerson.completedSessions}</span>
          </div>
          <div className="portal-ip-tracker-row">
            <span className="portal-ip-tracker-label">next goal</span>
            <span className="portal-ip-tracker-goal">{inPerson.nextGoal}</span>
          </div>
        </div>
      </div>

      <div className="portal-section-label" style={{ marginTop: '2.5rem', marginBottom: '1rem' }}>what happens during sessions</div>
      <div className="portal-ip-list">
        {inPerson.duringSession.map((item, i) => (
          <div key={i} className="portal-ip-list-row">
            <span className="portal-ip-dot">—</span>
            <span>{item}</span>
          </div>
        ))}
      </div>

      <div className="portal-section-label" style={{ marginTop: '2.5rem', marginBottom: '1rem' }}>between sessions</div>
      <div className="portal-ip-list">
        {inPerson.betweenSessions.map((item, i) => (
          <div key={i} className="portal-ip-list-row">
            <span className="portal-ip-dot">—</span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── your coach tab ───────────────────────────────────────────────
function CoachTab({ coachData }) {
  if (!coachData) return null;
  return (
    <div className="portal-coach">
      <div className="portal-coach-name">nico cortez</div>
      <div className="portal-coach-title">your coach</div>
      <div className="portal-section-label" style={{ marginTop: '2rem', marginBottom: '1rem' }}>what's included</div>
      <div className="portal-coach-services">
        {coachData.services.map((s, i) => (
          <div key={i} className="portal-coach-service">
            <span className="portal-coach-check">✓</span>
            <span>{s}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── main portal ──────────────────────────────────────────────────
export default function PortalClient({
  client, program, thread, nutri, groceryList,
  mission, pillarData, objectiveData, checkInQ, pillarDetailsData,
  progressInfo, inPerson, coachData,
}) {
  const [tab, setTab] = useState('mission');
  const [checkInSent, setCheckInSent] = useState(false);
  const [checkIn, setCheckIn] = useState({ weight: '', energy: '5', sleep: '5', notes: '' });
  const [customAnswers, setCustomAnswers] = useState({});
  const [showMacros, setShowMacros] = useState(false);
  const [macroLog, setMacroLog] = useState({ calories: '', protein: '', carbs: '', fat: '' });
  const [macroSent, setMacroSent] = useState(false);
  const [msg, setMsg] = useState('');

  const firstName = client.name.split(' ')[0];
  const weightDelta = client.weight.start - client.weight.current;

  const smsScore = pillarData
    ? Math.round(pillarData.data.reduce((s, p) => s + p.score, 0) / pillarData.data.length)
    : client.momentum;

  // build tab list dynamically based on available data
  const tabs = [
    'mission',
    ...(pillarData ? ['pillars'] : []),
    'fitness',
    'nutrition',
    'grocery',
    ...(progressInfo ? ['progress'] : []),
    'check in',
    'messages',
    ...(inPerson ? ['in-person'] : []),
    ...(coachData ? ['coach'] : []),
  ];

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
        <SelfMasteryScore score={smsScore} />
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

        {tab === 'mission' && (
          <MissionTab mission={mission} objectiveData={objectiveData} />
        )}

        {tab === 'pillars' && (
          <PillarsTab pillarData={pillarData} pillarDetailsData={pillarDetailsData} />
        )}

        {tab === 'fitness' && (
          <div className="portal-program">
            <ProgramCalendar program={program} blockStart={client.blockStart} />
            {program ? (
              <>
                <div className="portal-program-name" style={{ marginTop: '2rem' }}>{program.name}</div>
                <div className="portal-program-meta">{program.daysPerWeek}x/week · {program.weeks} weeks · {program.experienceLevel || ''}</div>
                {program.note && (
                  <div className="portal-program-philosophy">{program.note}</div>
                )}
                {program.workouts.length > 0 ? (
                  <div className="portal-workout-list">
                    {program.workouts.map(w => (
                      <div key={w.id} className="portal-workout-block">
                        <div className="portal-workout-day">{w.day}</div>
                        {w.exercises.map((ex, i) => (
                          <div key={i} className="portal-exercise-row">
                            <div className="portal-exercise-main">
                              <span className="portal-exercise-name">{ex.name}</span>
                              <span className="portal-exercise-detail">{ex.sets}×{ex.reps} · {ex.rest}</span>
                            </div>
                            {ex.note && (
                              <div className="portal-exercise-note">{ex.note}</div>
                            )}
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

        {tab === 'nutrition' && (
          <div className="portal-nutrition">
            {nutri?.dailyStandards ? (
              <DailyStandards nutri={nutri} />
            ) : (
              <>
                <FoodQualityScore nutri={nutri} />
                <div className="portal-fq-macros-toggle">
                  <button className="portal-macros-expand" onClick={() => setShowMacros(s => !s)}>
                    {showMacros ? '− hide macro detail' : '+ full macro tracking'}
                  </button>
                </div>
                {showMacros && nutri && (
                  <div className="portal-macros-detail">
                    <div className="portal-section-label" style={{ marginBottom: '1rem' }}>macro targets</div>
                    <div className="portal-macros">
                      <div className="portal-macro"><span>{nutri.targets.calories}</span><label>kcal</label></div>
                      <div className="portal-macro"><span>{nutri.targets.protein}g</span><label>protein</label></div>
                      <div className="portal-macro"><span>{nutri.targets.carbs}g</span><label>carbs</label></div>
                      <div className="portal-macro"><span>{nutri.targets.fat}g</span><label>fat</label></div>
                    </div>
                    <div className="portal-section-label" style={{ marginTop: '1.5rem', marginBottom: '0.8rem' }}>log today</div>
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
                  </div>
                )}
              </>
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
                  <input type="number" placeholder={client.weight.current}
                    value={checkIn.weight} onChange={e => setCheckIn({ ...checkIn, weight: e.target.value })} />
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

                {checkInQ && checkInQ.questions.map(q => (
                  <div key={q.id} className="portal-field">
                    <label>{q.text}</label>
                    {q.type === 'yesno' && (
                      <div className="portal-yesno">
                        {['yes', 'no'].map(v => (
                          <button
                            key={v}
                            type="button"
                            className={`portal-yesno-btn${customAnswers[q.id] === v ? ' selected' : ''}`}
                            onClick={() => setCustomAnswers({ ...customAnswers, [q.id]: v })}
                          >
                            {v}
                          </button>
                        ))}
                      </div>
                    )}
                    {q.type === 'slider' && (
                      <div className="portal-slider-row">
                        <input type="range" min="1" max="10"
                          value={customAnswers[q.id] || '5'}
                          onChange={e => setCustomAnswers({ ...customAnswers, [q.id]: e.target.value })} />
                        <span className="portal-slider-val">{customAnswers[q.id] || '5'}</span>
                      </div>
                    )}
                    {q.type === 'number' && (
                      <input type="number" min="0" max={q.max || 99} placeholder="0"
                        value={customAnswers[q.id] || ''}
                        onChange={e => setCustomAnswers({ ...customAnswers, [q.id]: e.target.value })} />
                    )}
                    {q.type === 'text' && (
                      <textarea rows={3} placeholder="be honest."
                        value={customAnswers[q.id] || ''}
                        onChange={e => setCustomAnswers({ ...customAnswers, [q.id]: e.target.value })} />
                    )}
                  </div>
                ))}

                <div className="portal-field">
                  <label>anything else for nico</label>
                  <textarea placeholder="wins, losses, anything you want me to know."
                    value={checkIn.notes}
                    onChange={e => setCheckIn({ ...checkIn, notes: e.target.value })}
                    rows={3} />
                </div>
                <button type="submit" className="portal-submit">submit check in →</button>
              </form>
            )}
          </div>
        )}

        {tab === 'grocery' && <GroceryList groceryList={groceryList} />}

        {tab === 'progress' && (
          <ProgressTab progressInfo={progressInfo} client={client} />
        )}

        {tab === 'messages' && (
          <div className="portal-messages">
            <div className="portal-thread">
              {thread ? thread.thread.map((m, i) => (
                <div key={i} className={`portal-msg ${m.from}`}>
                  <div className="portal-msg-text" style={{ whiteSpace: 'pre-line' }}>{m.text}</div>
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

        {tab === 'in-person' && <InPersonTab inPerson={inPerson} />}

        {tab === 'coach' && <CoachTab coachData={coachData} />}

      </div>

      <footer className="portal-footer">vveritas* coaching</footer>
    </div>
  );
}
