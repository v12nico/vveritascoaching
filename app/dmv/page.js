import Link from 'next/link'

// ─── /dmv — WHERE THE FLYER LANDS ────────────────────────────────────────────
// Somebody scanned a code on a gym wall thirty seconds ago. They are standing
// up, holding a phone, and they have already been sold enough to scan — so this
// page does not re-pitch from scratch. It confirms what they just read and gives
// three doors at three levels of readiness:
//
//   ready         → pay for online and start tonight
//   interested    → book the call (the only route to in-person)
//   not sure yet  → email, which costs them nothing
//
// Deliberately short. The most common failure here is treating a scanner like a
// cold reader and burying the actions under a sales page they did not ask for.

export const metadata = {
  title: 'vveritas* — coaching, baltimore & dc',
  description: 'one session a week in person. your own dashboard for the other six days.',
}

const CALENDLY = 'https://calendly.com/vveritascoaching/30min'
const EMAIL = 'vveritascoaching@gmail.com'

export default function DmvPage() {
  // A missing env var must not render a dead checkout button — that has already
  // happened once on this project. No link, no button.
  const stripeOnline = process.env.NEXT_PUBLIC_STRIPE_ONLINE || null

  return (
    <main className="dmv">
      <section className="dmv-hero">
        <img src="/images/nico-flyer.jpg" alt="" className="dmv-shot" />
        <div className="dmv-hero-in">
          <div className="dmv-kicker">vveritas<i>*</i> · baltimore &amp; dc</div>
          <h1 className="dmv-hook">eight weeks<br />to not need<br />a <em>trainer</em>.</h1>
          <p className="dmv-sub">
            most coaching hands you a plan. this hands you a system — and teaches you to
            run it yourself, so you leave able to write your own programming.
          </p>
        </div>
      </section>

      <section className="dmv-sec">
        <ul className="dmv-list">
          <li><i>01</i><span>one session a week, in person, hands on</span></li>
          <li><i>02</i><span>your own dashboard for the other six days</span></li>
          <li><i>03</i><span>every set logged — last week’s numbers next to today’s</span></li>
          <li><i>04</i><span>nightly check-ins i actually read</span></li>
          <li><i>05</i><span>food built around what you already eat</span></li>
        </ul>
      </section>

      {/* ── the three doors ── */}
      <section className="dmv-sec">
        <div className="dmv-label">pick the one that’s true right now</div>

        <a className="dmv-door primary" href={CALENDLY} target="_blank" rel="noreferrer">
          <div className="dmv-door-top">
            <span className="dmv-door-t">book a call</span>
            <span className="dmv-door-m">30 min · free</span>
          </div>
          <p>
            the only way into in-person. we work out where you actually are, and i tell you
            what i’d build — whether or not you hire me.
          </p>
          <span className="dmv-go">pick a time →</span>
        </a>

        {stripeOnline ? (
          <a className="dmv-door" href={stripeOnline} target="_blank" rel="noreferrer">
            <div className="dmv-door-top">
              <span className="dmv-door-t">start online tonight</span>
              <span className="dmv-door-m">$125 / week</span>
            </div>
            <p>
              you already know what you want. pay, fill the intake, and your dashboard is
              live tomorrow.
            </p>
            <span className="dmv-go">start →</span>
          </a>
        ) : (
          <Link className="dmv-door" href="/intake">
            <div className="dmv-door-top">
              <span className="dmv-door-t">start online</span>
              <span className="dmv-door-m">$125 / week</span>
            </div>
            <p>
              fill the intake and i’ll send your payment link and build your dashboard from it.
            </p>
            <span className="dmv-go">fill the intake →</span>
          </Link>
        )}

        <a className="dmv-door quiet" href={`mailto:${EMAIL}?subject=coaching`}>
          <div className="dmv-door-top">
            <span className="dmv-door-t">just have a question</span>
            <span className="dmv-door-m">email</span>
          </div>
          <p>ask me anything before you commit to a call. i answer these myself.</p>
          <span className="dmv-go">{EMAIL} →</span>
        </a>
      </section>

      {/* ── prices ── */}
      <section className="dmv-sec">
        <div className="dmv-label">what it costs</div>
        <div className="dmv-price"><b>online coaching</b><span>$125 / week</span></div>
        <div className="dmv-price"><b>in person · baltimore</b><span>from $200 / week</span></div>
        <div className="dmv-price"><b>in person · dc</b><span>by the day</span></div>
        <p className="dmv-note">
          billed weekly, eight week minimum — eight weeks is how long it takes to be
          worth anything. biweekly and monthly options if you’d rather. in-person pricing
          varies with how far i travel; we settle that on the call, not before.
        </p>
        <p className="dmv-note">
          <b>dc runs as a day, not a drive.</b> i come down when the day fills — three spots
          each. if you’re in dc and the day isn’t full, the call is still worth taking.
        </p>
      </section>

      <footer className="dmv-foot">
        <span>vveritas<i>*</i></span>
        <span>@_v12nico</span>
      </footer>
    </main>
  )
}
