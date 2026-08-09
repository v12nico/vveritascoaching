// ─── INTAKE SUMMARY ──────────────────────────────────────────────────────────
// Two readers, one file: the email that reaches Nico, and the coach snapshot.
//
// deriveSummary() is deliberately deterministic — plain mapping, no model. A
// starting structure sitting next to injuries and medications is not a place
// for a plausible-sounding guess, and this output is a draft for the coach to
// approve, never something published to the client.

import { SECTIONS, isVisible, reviewFlags } from './intakeSpec.js';

const val = (v) => {
  if (Array.isArray(v)) return v.length ? v.join(', ') : '—';
  if (v === '' || v === null || v === undefined) return '—';
  return String(v);
};

/** Every answered question, grouped by section, in the order it was asked. */
export function groupedAnswers(a) {
  return SECTIONS.map((section) => ({
    key: section.key,
    num: section.num,
    label: section.label,
    rows: section.screens
      .flatMap((s) => s.fields)
      .filter((f) => isVisible(f, a))
      .map((f) => ({ id: f.id, q: f.q, value: val(a[f.id]) })),
  }));
}

/** Plain-text rendering for the notification email. */
export function intakeText(a) {
  const flags = reviewFlags(a);
  const out = [
    `vveritas* client intake — ${a.fullName || 'unknown'}`,
    `submitted ${new Date().toLocaleString('en-US')}`,
  ];
  if (a.package) out.push(`package: ${a.package}`);
  if (a.slug) out.push(`client link: /intake/${a.slug}`);

  if (flags.length) {
    out.push('', '*** coach review required ***', ...flags.map((f) => `  - ${f}`));
  }

  const s = deriveSummary(a);
  out.push(
    '',
    '— recommended starting structure (draft) —',
    `primary objective:       ${s.objective}`,
    `training frequency:      ${s.frequency}`,
    `training priorities:     ${s.trainingPriorities}`,
    `nutrition priorities:    ${s.nutritionPriorities}`,
    `main obstacle:           ${s.obstacle}`,
    `accountability strategy: ${s.accountability}`,
    `recovery priority:       ${s.recovery}`,
    `coach tone:              ${s.tone}`,
    `first-week focus:        ${s.firstWeek}`,
  );

  for (const g of groupedAnswers(a)) {
    out.push('', `— ${g.num} ${g.label} —`);
    for (const r of g.rows) {
      out.push(r.value.length > 60 ? `${r.q}:\n  ${r.value}` : `${r.q}: ${r.value}`);
    }
  }

  return out.join('\n');
}

// ─── DERIVED STARTING STRUCTURE ──────────────────────────────────────────────

const NUTRITION_PRIORITY = {
  'not enough protein': 'protein consistency',
  'eating out too much': 'reduce takeout',
  'junk / processed food': 'food quality',
  snacking: 'snack structure',
  'skipping meals': 'meal structure',
  overeating: 'portion awareness',
  'late-night eating': 'meal timing',
  'no grocery routine': 'grocery routine',
  "don't know what to eat": 'simple repeatable meals',
  'inconsistent meals': 'meal structure',
};

const ACCOUNTABILITY = {
  'call it out immediately': 'immediate call-out on a missed commitment',
  'ask me what happened first': 'ask first, then reset',
  'give me a reset plan': 'reset plan on every slip',
  'be very direct': 'direct intervention, no softening',
  combination: 'ask once, then direct',
};

const SPLIT_BY_DAYS = {
  2: 'full body, 2x',
  3: 'full body or ppl, 3x',
  4: 'upper / lower, 4x',
  '5+': 'ppl + accessory, 5–6x',
};

export function deriveSummary(a) {
  const days = String(a.trainingDays || '').trim();

  const nutrition = [...new Set(
    (a.nutritionStruggle || []).map((s) => NUTRITION_PRIORITY[s]).filter(Boolean),
  )].slice(0, 3);

  // Lowest-scoring lifestyle marker becomes the recovery priority. Stress is
  // inverted because on that slider high is bad.
  const markers = [
    { label: 'improve sleep', score: Number(a.ratingSleep ?? 5) },
    { label: 'raise energy', score: Number(a.ratingEnergy ?? 5) },
    { label: 'lower stress', score: 11 - Number(a.ratingStress ?? 5) },
  ].sort((x, y) => x.score - y.score);

  const obstacle = (a.consistencyBlocker || [])[0]
    || (a.missPattern && a.missPattern !== 'depends' ? a.missPattern : '')
    || '—';

  const firstWeek = [
    days ? `complete all ${days} scheduled sessions` : 'complete every scheduled session',
    nutrition[0] || 'eat at consistent times',
  ].join(' · ');

  return {
    objective: a.primaryGoal || '—',
    frequency: days ? `${days} days/week — ${SPLIT_BY_DAYS[days] || 'split tbd'}` : '—',
    trainingPriorities: (a.focusAreas || []).slice(0, 3).join(', ') || '—',
    nutritionPriorities: nutrition.join(', ') || '—',
    obstacle,
    accountability: ACCOUNTABILITY[a.interventionPref] || a.interventionPref || '—',
    recovery: markers[0].score >= 7 ? 'no recovery red flags' : markers[0].label,
    tone: a.coachingStyle || '—',
    firstWeek,
    experience: a.experience || '—',
    standard: a.oneStandard || '—',
  };
}
