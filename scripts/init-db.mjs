import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

await sql`
  CREATE TABLE IF NOT EXISTS submissions (
    id SERIAL PRIMARY KEY,
    type TEXT NOT NULL,
    name TEXT,
    email TEXT,
    age TEXT,
    gender TEXT,
    height TEXT,
    weight TEXT,
    looking TEXT,
    discord TEXT,
    product TEXT,
    intake JSONB,
    plan TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )
`;

console.log('submissions table ready');
