import { clients, nutrition } from '../../../lib/mockData';

export default function NutritionPage() {
  return (
    <div className="coach-page">
      <div className="coach-page-header">
        <h1 className="coach-page-title">nutrition</h1>
      </div>

      {clients.map(c => {
        const n = nutrition.find(x => x.clientId === c.id);
        if (!n) return null;
        return (
          <section key={c.id} className="coach-section">
            <div className="coach-section-label">{c.name}</div>
            <div className="coach-macro-targets">
              <div className="coach-macro">
                <span>{n.targets.calories}</span>
                <label>kcal</label>
              </div>
              <div className="coach-macro">
                <span>{n.targets.protein}g</span>
                <label>protein</label>
              </div>
              <div className="coach-macro">
                <span>{n.targets.carbs}g</span>
                <label>carbs</label>
              </div>
              <div className="coach-macro">
                <span>{n.targets.fat}g</span>
                <label>fat</label>
              </div>
            </div>

            <div className="coach-nutrition-logs">
              <div className="coach-nutrition-log-head">
                <span>date</span>
                <span>kcal</span>
                <span>protein</span>
                <span>carbs</span>
                <span>fat</span>
                <span>adherence</span>
              </div>
              {n.log.map(day => {
                const adherence = Math.round((day.calories / n.targets.calories) * 100);
                const onTrack = adherence >= 90 && adherence <= 110;
                return (
                  <div key={day.date} className="coach-nutrition-log-row">
                    <span className="coach-log-date">{day.date}</span>
                    <span>{day.calories}</span>
                    <span>{day.protein}g</span>
                    <span>{day.carbs}g</span>
                    <span>{day.fat}g</span>
                    <span className={onTrack ? 'positive' : 'dim'}>{adherence}%</span>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}

      {clients.every(c => !nutrition.find(n => n.clientId === c.id)) && (
        <div className="coach-empty">no nutrition data logged yet.</div>
      )}
    </div>
  );
}
