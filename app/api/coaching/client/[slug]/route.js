import { getCoachingDb } from '@/lib/db';

export async function GET(req, { params }) {
  const sql = getCoachingDb();
  const { slug } = await params;

  const [client] = await sql`SELECT * FROM clients WHERE slug = ${slug} LIMIT 1`;
  if (!client) return Response.json({ error: 'not found' }, { status: 404 });

  const [intake] = await sql`
    SELECT * FROM intake WHERE client_id = ${client.id} ORDER BY submitted_at DESC LIMIT 1
  `;
  return Response.json({ client, intake: intake || null });
}
