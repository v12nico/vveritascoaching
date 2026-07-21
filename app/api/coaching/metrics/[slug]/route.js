import { getCoachingDb } from '@/lib/db';

export async function GET(req, { params }) {
  const sql = getCoachingDb();
  const { slug } = await params;

  const [client] = await sql`SELECT id FROM clients WHERE slug = ${slug} LIMIT 1`;
  if (!client) return Response.json({ error: 'not found' }, { status: 404 });

  const metrics = await sql`
    SELECT id, logged_at, body_weight, waist, notes
    FROM metrics WHERE client_id = ${client.id}
    ORDER BY logged_at DESC LIMIT 60
  `;
  return Response.json({ metrics });
}
