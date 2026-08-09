import Link from 'next/link';
import { getCoachingDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

export const metadata = { title: 'intakes — coach — vveritas*' };

async function loadIntakes() {
  try {
    const sql = getCoachingDb();
    return await sql`
      SELECT id, full_name, email, package, status, needs_review, review_flags, created_at
      FROM client_intakes
      ORDER BY created_at DESC
      LIMIT 200
    `;
  } catch (err) {
    // An unconfigured or unreachable database should render an explanation,
    // not a 500 that looks like the feature was never built.
    console.error('intake list error:', err);
    return null;
  }
}

const when = (d) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

export default async function IntakesPage() {
  const rows = await loadIntakes();

  return (
    <div className="coach-page">
      <div className="coach-page-header">
        <h1 className="coach-page-title">intakes</h1>
        <span className="coach-count">{rows ? `${rows.length} total` : 'unavailable'}</span>
      </div>

      {rows === null && (
        <div className="coach-empty">
          could not reach the database. check COACHING_DATABASE_URL, then run
          <br />node --env-file=.env.local scripts/init-intake-db.mjs
        </div>
      )}

      {rows?.length === 0 && (
        <div className="coach-empty">no intakes yet. send a client to /intake.</div>
      )}

      {rows?.map((r) => (
        <Link key={r.id} href={`/coach/intakes/${r.id}`} className="coach-client-row">
          <div className="coach-client-info">
            <span className="coach-client-name">{r.full_name}</span>
            <span className="coach-client-meta">
              {r.email}{r.package ? ` · ${r.package}` : ''} · {when(r.created_at)}
            </span>
          </div>
          {r.needs_review && <span className="ik-flag">review</span>}
        </Link>
      ))}
    </div>
  );
}
