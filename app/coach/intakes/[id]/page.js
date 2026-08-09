import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCoachingDb } from '@/lib/db';
import { deriveSummary, groupedAnswers } from '@/lib/intakeSummary';

export const dynamic = 'force-dynamic';

async function loadIntake(id) {
  try {
    const sql = getCoachingDb();
    const [row] = await sql`SELECT * FROM client_intakes WHERE id = ${id} LIMIT 1`;
    return row || null;
  } catch (err) {
    console.error('intake detail error:', err);
    return null;
  }
}

const Row = ({ label, value }) => (
  <div className="ik-snap-row">
    <span className="ik-snap-label">{label}</span>
    <span className="ik-snap-value">{value || '—'}</span>
  </div>
);

export default async function IntakeDetailPage({ params }) {
  const { id } = await params;
  const row = await loadIntake(id);
  if (!row) notFound();

  const a = row.answers || {};
  const s = deriveSummary(a);
  const flags = row.review_flags || [];

  // The plan builder takes the same shape the christian intake posts, so an
  // approved draft flows straight into the existing program generator.
  const planQuery = new URLSearchParams({
    from: `intake-${row.id}`,
    name: row.full_name || '',
    email: row.email || '',
    goal: a.primaryGoal || '',
    experience: a.experience || '',
    days: a.trainingDays || '',
    injuries: [a.injuryDetail, a.surgeryDetail].filter(Boolean).join('; '),
    style: a.coachingStyle || '',
  }).toString();

  return (
    <div className="coach-page">
      <Link href="/coach/intakes" className="coach-back">← intakes</Link>

      <div className="coach-page-header">
        <h1 className="coach-page-title">{row.full_name}</h1>
        <span className="coach-count">
          {new Date(row.created_at).toLocaleDateString('en-US')}
        </span>
      </div>

      {flags.length > 0 && (
        <div className="ik-review-banner">
          <div className="ik-review-banner-title">coach review required</div>
          <ul>{flags.map((f) => <li key={f}>{f}</li>)}</ul>
        </div>
      )}

      <div className="coach-section">
        <div className="coach-section-label">recommended starting structure — draft</div>
        <div className="ik-snap">
          <Row label="primary objective" value={s.objective} />
          <Row label="training frequency" value={s.frequency} />
          <Row label="training priorities" value={s.trainingPriorities} />
          <Row label="nutrition priorities" value={s.nutritionPriorities} />
          <Row label="main obstacle" value={s.obstacle} />
          <Row label="accountability" value={s.accountability} />
          <Row label="recovery priority" value={s.recovery} />
          <Row label="coach tone" value={s.tone} />
          <Row label="first-week focus" value={s.firstWeek} />
        </div>
        <p className="ik-draft-note">
          derived from the answers below, not generated. approve and adjust before anything
          reaches the client.
        </p>
        <Link href={`/coach/programs?${planQuery}`} className="ik-build-btn">
          build client plan →
        </Link>
      </div>

      <div className="coach-section">
        <div className="coach-section-label">snapshot</div>
        <div className="ik-snap">
          <Row label="contact" value={[row.email, row.phone].filter(Boolean).join(' · ')} />
          <Row label="package" value={row.package} />
          <Row label="experience" value={s.experience} />
          <Row label="their standard" value={s.standard} />
        </div>
      </div>

      {groupedAnswers(a).map((g) => (
        <div className="coach-section" key={g.key}>
          <div className="coach-section-label">{g.num} — {g.label}</div>
          <div className="ik-snap">
            {g.rows.map((r) => <Row key={r.id} label={r.q} value={r.value} />)}
          </div>
        </div>
      ))}
    </div>
  );
}
