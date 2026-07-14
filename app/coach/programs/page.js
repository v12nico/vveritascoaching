import Link from 'next/link';
import { programs, clients } from '../../../lib/mockData';

export default function ProgramsPage() {
  return (
    <div className="coach-page">
      <div className="coach-page-header">
        <h1 className="coach-page-title">programs</h1>
        <button className="coach-btn">+ new program</button>
      </div>

      <div className="coach-program-grid">
        {programs.map(p => {
          const assigned = p.assignedTo.map(id => clients.find(c => c.id === id)?.name).filter(Boolean);
          return (
            <div key={p.id} className="coach-program-card">
              <div className="coach-program-card-name">{p.name}</div>
              <div className="coach-program-card-meta">
                {p.daysPerWeek}x/week · {p.weeks} weeks · {p.type}
              </div>
              <div className="coach-program-card-assigned">
                {assigned.length > 0
                  ? `assigned to: ${assigned.join(', ')}`
                  : 'unassigned'}
              </div>
              <div className="coach-program-card-footer">
                <span>{p.workouts.length} workouts built</span>
                <button className="coach-link-btn">edit →</button>
              </div>
            </div>
          );
        })}
      </div>

      {programs.length > 0 && (
        <section className="coach-section" style={{ marginTop: '3rem' }}>
          <div className="coach-section-label">program detail — push pull legs</div>
          {programs[0].workouts.map(w => (
            <div key={w.id} className="coach-workout-block">
              <div className="coach-workout-day">{w.day}</div>
              <div className="coach-exercise-list">
                {w.exercises.map((ex, i) => (
                  <div key={i} className="coach-exercise-row">
                    <span className="coach-exercise-name">{ex.name}</span>
                    <span className="coach-exercise-detail">{ex.sets}×{ex.reps} · {ex.rest}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
