import { getCoachingDb } from '@/lib/db';

export async function GET(req, { params }) {
  const sql = getCoachingDb();
  const { slug } = await params;

  const [client] = await sql`SELECT id FROM clients WHERE slug = ${slug} LIMIT 1`;
  if (!client) return Response.json({ error: 'not found' }, { status: 404 });

  const workouts = await sql`
    SELECT id, logged_at, exercises, notes
    FROM workouts WHERE client_id = ${client.id}
    ORDER BY logged_at DESC LIMIT 30
  `;
  return Response.json({ workouts });
}
