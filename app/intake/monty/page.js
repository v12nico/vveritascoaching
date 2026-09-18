import { Suspense } from 'react';
import IntakeWizard from '@/components/IntakeWizard';
import Back from '@/components/Back';

// A static route beats the [slug] one in Next's matcher, so /intake/monty gets
// this page while every other client still falls through to the generic wizard.
//
// The preamble exists because he is about to fill in a long form and deserves
// to know why it is long. The steps line is the specific reason — it is the
// single biggest input into his plan, and leading with it proves the depth is
// not a formality. There has been no call yet; everything so far was DMs, and
// he has not seen any part of his program. Nothing here may imply otherwise.

export const metadata = { title: 'intake — monty — vveritas*' };

const GHOST = '#3A3A3A';
const DIM = '#5A5A5A';
const LINE = '#141414';
const OX = '#5C1A1A';

const mono = (size, color) => ({
  fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
  fontSize: size, letterSpacing: '0.2em', textTransform: 'uppercase', color,
});

const WEEK = [
  { day: 'lower a', focus: 'quads', work: ['leg press or hack squat', 'leg extension', 'seated leg curl', 'calf raise'] },
  { day: 'upper a', focus: 'chest + back', work: ['incline chest press', 'chest-supported row', 'lat pulldown', 'lateral raise'] },
  { day: 'athletic', focus: 'jumps + short sprints', work: ['box jumps', 'broad jumps', '10–20s sprints', 'full recovery between'] },
  { day: 'lower b', focus: 'posterior chain', work: ['romanian deadlift', 'hip thrust', 'lying leg curl', 'ab work'] },
  { day: 'upper b', focus: 'shoulders + arms', work: ['overhead press', 'row', 'rear delt', 'curl + triceps'] },
];

export default function MontyIntake() {
  return (
    <div className="page ik-page">
      <Back href="/work" />

      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '2.5rem 1.25rem 0' }}>

        <div style={mono('0.42rem', GHOST)}>vveritas* &middot; the 8 week build</div>
        <h1 style={{ fontSize: 'clamp(1.7rem, 6vw, 2.3rem)', fontWeight: 200, letterSpacing: '-0.03em', lineHeight: 1.05, margin: '0.8rem 0 0' }}>
          monty.
        </h1>

        <div style={{ marginTop: '1.6rem', display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
          <p style={{ fontSize: '0.92rem', lineHeight: 1.75, color: '#EDEDE8', fontWeight: 300, margin: 0 }}>
            before you fill this out &mdash; you told me you average <b style={{ fontWeight: 300 }}>twenty thousand
            steps a day</b>. that changes your plan more than anything else you&rsquo;ve told me so far.
          </p>
          <p style={{ fontSize: '0.88rem', lineHeight: 1.75, color: DIM, margin: 0 }}>
            twenty thousand steps is a real amount of energy, every single day. it means your maintenance
            is nowhere near what a normal estimate would say &mdash; and if i built your food off one, you&rsquo;d
            eat what looks like plenty and stay exactly where you are.
          </p>
          <p style={{ fontSize: '0.88rem', lineHeight: 1.75, color: DIM, margin: 0 }}>
            it&rsquo;s also already doing a lot for your glucose. walking after meals is the first thing i&rsquo;d
            tell anyone in your position to do, and you&rsquo;re doing four times that without being told. it&rsquo;s
            part of why your numbers aren&rsquo;t worse, and nobody&rsquo;s given you credit for it. so the rest comes
            from muscle, and from where your food sits around training.
          </p>
          <p style={{ fontSize: '0.88rem', lineHeight: 1.75, color: DIM, margin: 0 }}>
            this is longer than it needs to be, on purpose. i&rsquo;m not sending you a template &mdash; every
            answer changes something specific in what i build. the more exact you are, the less i guess.
          </p>
        </div>

        <div style={{ marginTop: '2.2rem', paddingTop: '1.4rem', borderTop: `1px solid ${LINE}` }}>
          <div style={mono('0.42rem', GHOST)}>what you bought</div>
          <p style={{ fontSize: '0.88rem', lineHeight: 1.75, color: DIM, margin: '0.7rem 0 0' }}>
            the 8 week build is everything in my 1:1 coaching except the weekly call. same program,
            same dashboard, same food structure, same logging &mdash; and i still read every check-in you
            send. the call&rsquo;s the only thing you&rsquo;re not getting.
          </p>
        </div>

        <div style={{ marginTop: '2.2rem', paddingTop: '1.4rem', borderTop: `1px solid ${LINE}` }}>
          <div style={mono('0.42rem', GHOST)}>a typical week &mdash; yours gets built from what you put below</div>

          <div style={{ marginTop: '1rem' }}>
            {WEEK.map(d => (
              <div key={d.day} style={{ padding: '0.8rem 0', borderBottom: `1px solid ${LINE}` }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.7rem' }}>
                  <span style={{ fontSize: '0.88rem', fontWeight: 300, color: '#EDEDE8' }}>{d.day}</span>
                  <span style={mono('0.4rem', OX)}>{d.focus}</span>
                </div>
                <div style={{ fontSize: '0.78rem', lineHeight: 1.7, color: GHOST, marginTop: '0.3rem' }}>
                  {d.work.join(' · ')}
                </div>
              </div>
            ))}
          </div>

          <ul style={{ listStyle: 'none', margin: '1.1rem 0 0', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {[
              'two hard working sets per movement. heavy compounds first.',
              'double progression — top of the rep range on both sets, then the weight moves.',
              'protein around 160g. carbs placed around training, when muscle actually takes them up.',
              'whole food, no seed oils, built from what you already eat.',
              'every set logged, so week six can be compared to week one instead of remembered.',
            ].map(l => (
              <li key={l} style={{ fontSize: '0.82rem', lineHeight: 1.65, color: DIM }}>{l}</li>
            ))}
          </ul>

          <p style={{ fontSize: '0.8rem', lineHeight: 1.7, color: GHOST, margin: '1.1rem 0 0', fontStyle: 'normal' }}>
            that&rsquo;s the shape, not your plan. the days move to when you can actually train, the movements
            change to whatever your gym has, and the food gets built around what you already eat. that&rsquo;s
            what the next ten minutes are for.
          </p>
        </div>

        <div style={{ marginTop: '2.4rem', paddingTop: '1.4rem', borderTop: `1px solid ${LINE}` }}>
          <div style={mono('0.42rem', GHOST)}>ten minutes. answer honest.</div>
        </div>
      </div>

      <Suspense fallback={null}>
        <IntakeWizard slug="monty" clientName="Monty" />
      </Suspense>
    </div>
  );
}
