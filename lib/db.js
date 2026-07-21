import { neon } from '@neondatabase/serverless';

let _sql = null;
let _coachingSql = null;

export function getDb() {
  if (!_sql) _sql = neon(process.env.DATABASE_URL);
  return _sql;
}

export function getCoachingDb() {
  if (!_coachingSql) _coachingSql = neon(process.env.COACHING_DATABASE_URL);
  return _coachingSql;
}
