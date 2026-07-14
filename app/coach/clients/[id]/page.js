import Link from 'next/link';
import { clients, programs, messages, nutrition } from '../../../../lib/mockData';
import { notFound } from 'next/navigation';

export default async function ClientDetail({ params }) {
  const { id } = await params;
  const client = clients.find(c => c.id === id);
  if (!client) notFound();

  const program = programs.find(p => p.assignedTo.includes(id));
  const thread = messages.find(m => m.clientId === id);
  const nutri = nutrition.find(n => n.clientId === id);

  const weightLost = client.weight.start - client.weight.current;

  return (
    <div className="coach-page">
      <div className="coach-page-header">
        <Link href="/coach/clients" className="coach-back">← clients</Link>
      </div>

      <div className="coach-client-detail-header">
        <div>
          <h1 className="coach-page-title">{client.name}</h1>
          <div className="coach-client-detail-meta">
            {client.tier} · ${client.price}/mo · started {client.startDate}
          </div>
          <div className="coach-client-goal">"{client.goal}"</div>
        </div>
        <span className={`coach-client-status large ${client.status}`}>{client.status}</span>
      </div>

      <div className="coach-detail-grid">

        {/* weight */}
        <section className="coach-section">
          <div className="coach-section-label">weight</div>
          <div className="coach-weight-row">
            <div className="coach-weight-stat">
              <div className="coach-weight-val">{client.weight.start} lbs</div>
              <div className="coach-weight-lab">start</div>
            </div>
            <div className="coach-weight-arrow">→</div>
            <div className="coach-weight-stat">
              <div className="coach-weight-val">{client.weight.current} lbs</div>
              <div className="coach-weight-lab">current</div>
            </div>
            <div className="coach-weight-stat accent">
              <div className="coach-weight-val">{weightLost > 0 ? `−${weightLost}` : `+${Math.abs(weightLost)}`} lbs</div>
              <div className="coach-weight-lab">total change</div>
            </div>
          </div>
        </section>

        {/* program */}
        <section className="coach-section">
          <div className="coach-section-label">program</div>
          {program ? (
            <>
              <div className="coach-program-name">{program.name}</div>
              <div className="coach-program-meta">{program.daysPerWeek}x/week · {program.weeks} weeks · {program.type}</div>
              <div className="coach-workout-list">
                {program.workouts.map(w => (
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
              </div>
            </>
          ) : (
            <div className="coach-empty">no program assigned.</div>
          )}
        </section>

        {/* nutrition */}
        {nutri && (
          <section className="coach-section">
            <div className="coach-section-label">nutrition targets</div>
            <div className="coach-macro-targets">
              <div className="coach-macro"><span>{nutri.targets.calories}</span><label>kcal</label></div>
              <div className="coach-macro"><span>{nutri.targets.protein}g</span><label>protein</label></div>
              <div className="coach-macro"><span>{nutri.targets.carbs}g</span><label>carbs</label></div>
              <div className="coach-macro"><span>{nutri.targets.fat}g</span><label>fat</label></div>
            </div>
            <div className="coach-section-label" style={{marginTop:'1.5rem'}}>recent logs</div>
            {nutri.log.map(day => (
              <div key={day.date} className="coach-nutrition-log-row">
                <span className="coach-log-date">{day.date}</span>
                <span>{day.calories} kcal</span>
                <span>{day.protein}g P</span>
                <span>{day.carbs}g C</span>
                <span>{day.fat}g F</span>
              </div>
            ))}
          </section>
        )}

        {/* messages */}
        <section className="coach-section">
          <div className="coach-section-label">messages</div>
          {thread ? (
            <div className="coach-thread">
              {thread.thread.map((msg, i) => (
                <div key={i} className={`coach-msg ${msg.from}`}>
                  <div className="coach-msg-text">{msg.text}</div>
                  <div className="coach-msg-time">{msg.time}</div>
                </div>
              ))}
              <div className="coach-msg-input-row">
                <input type="text" placeholder="reply..." className="coach-msg-input" />
                <button className="coach-msg-send">send</button>
              </div>
            </div>
          ) : (
            <div className="coach-empty">no messages yet.</div>
          )}
        </section>

      </div>
    </div>
  );
}
