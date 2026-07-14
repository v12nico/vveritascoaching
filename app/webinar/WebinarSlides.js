'use client';
import { useState, useEffect, useCallback } from 'react';

// ─── image placeholder ───────────────────────────────────────────
// To add a photo: replace null with "/slides/your-filename.jpg"
// Drop the file in /public/slides/ and it will appear automatically.
function Photo({ src, label, tall }) {
  if (src) return (
    <div className={`ws-photo${tall ? ' tall' : ''}`}>
      <img src={src} alt={label} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
    </div>
  );
  return (
    <div className={`ws-photo ws-photo-placeholder${tall ? ' tall' : ''}`}>
      <span className="ws-photo-label">[ {label} ]</span>
    </div>
  );
}

// ─── slide data ───────────────────────────────────────────────────
const SLIDES = [
  // 1
  {
    type: 'hero',
    label: null,
    headline: 'master yourself.\nchange everything.',
    body: 'the system behind the body, discipline, confidence,\nand life you actually want.',
    photo: null,
    notes: "welcome in. tonight is different. this isn't a typical fitness webinar — i'm not going to sell you supplements or send you a generic meal plan. i'm going to show you the exact system i used to change my body, my mindset, and my life. and how it's changing the lives of the people i coach right now. stay to the end.",
  },
  // 2
  {
    type: 'list',
    label: 'first things first',
    headline: 'this is not just a fitness webinar.',
    bullets: [
      'not just workouts.',
      'not just meal plans.',
      'not just motivation.',
      'this is self-mastery — applied to your body, your habits, your discipline, and your future.',
    ],
    notes: "i need you to shift how you're thinking about this. most people come to a webinar like this looking for the workout or the diet. those things matter — but they're downstream of something bigger. we're talking about command over yourself tonight.",
  },
  // 3
  {
    type: 'statement',
    label: 'the real problem',
    headline: 'you don\'t need more information.\nyou need command over yourself.',
    body: 'phone. bad food. no structure. low confidence. starting over every monday.',
    notes: "be honest with yourself. you've probably watched enough videos. read enough articles. you know what you're supposed to do. the issue isn't information. the issue is execution. that's what we fix.",
  },
  // 4
  {
    type: 'split',
    label: 'my story',
    headline: '6th grade.\nfirst day of middle school.',
    body: 'new school. new people.\ni was chubby, self-conscious, and insecure about everything.',
    photo: { src: null, label: 'childhood / 6th grade photo' },
    notes: "i had friends. good ones. but they cooked me constantly. i was the chubby kid. insecure about my body, my teeth, how i looked, how people saw me. that stayed with me longer than most people realize.",
  },
  // 5
  {
    type: 'photo-full',
    label: null,
    headline: 'they laughed.\ni remembered.',
    photo: { src: null, label: 'early insecurity / childhood photo' },
    notes: "i'm not telling this story for sympathy. i'm telling it because that wound is what made me. every person in this webinar has a version of that story. something that made you feel like you weren't enough. we're going to talk about what you do with it.",
  },
  // 6
  {
    type: 'statement',
    label: 'the first proof',
    headline: 'i came back different.',
    body: '7th grade. a little leaner. a little sharper.\nmy first taste of self-mastery.',
    notes: "i locked in that summer. not a crazy transformation — but i came back with some abs, a little more confidence. more importantly, i realized for the first time: i could actually change myself. that was the proof i needed.",
  },
  // 7
  {
    type: 'statement',
    label: 'the truth',
    headline: 'transformation\nis not linear.',
    body: 'i looked better. then i fell off. then better. then off again.',
    notes: "and then i slipped. bad habits came back. progress disappeared. i want to be real about this because most coaches won't say it — the path is not a straight line up. the goal is to make the lows less low and the recoveries faster.",
  },
  // 8
  {
    type: 'split',
    label: 'high school',
    headline: 'skinny.\nacne.\ntrying to find myself.',
    body: 'i was doing my best. but the inside was still a mess.',
    photo: { src: null, label: 'high school / acne era photo' },
    notes: "i was trying to make friends, trying to be cool, trying to figure out who i was. but acne was wrecking my confidence. i was skinny in a way that didn't feel athletic. i felt invisible in rooms where i wanted to be seen.",
  },
  // 9
  {
    type: 'photo-full',
    label: 'quarantine',
    headline: 'my lowest\ndiscipline era.',
    photo: { src: null, label: 'quarantine vibes — dark room, phone, junk food visual' },
    notes: "covid hit and i completely fell apart structurally. sleep schedule reversed — i'd be up until sunrise. eating frozen cheesesteak rolls, cereal at 2am, glued to my phone. no gym, no structure, no accountability. nothing. i didn't even realize how bad it was until after.",
  },
  // 10
  {
    type: 'statement',
    label: 'the drift',
    headline: 'i wasn\'t the same\noutgoing kid anymore.',
    body: 'i switched schools. confidence was gone.\nhad to rebuild from scratch.',
    notes: "when school came back, i felt it. i'd become quieter, more closed off. i switched to a new school where i didn't know anyone, and that isolation hit different. no foundation. had to rebuild socially, mentally — everything.",
  },
  // 11
  {
    type: 'statement',
    label: 'the turning point',
    headline: 'i bought\nthe gym membership.',
    body: '$89/month. supreme sports club. senior year.\ni made myself go.',
    notes: "this was the decision. not cheap for me at the time. but i made a promise to myself — i paid for it, i'm going. that financial commitment was the first real accountability i had. i went almost every day.",
  },
  // 12
  {
    type: 'statement',
    label: 'the habit',
    headline: 'i didn\'t know everything.\ni just showed up.',
    body: 'extra sets. random exercises. learning as i went.\nbut the habit was forming.',
    notes: "i wasn't doing the perfect program. i was figuring it out. doing stuff i'd seen online, trying things, failing some, figuring out what worked. but i was there. consistently. and that consistency started to compound.",
  },
  // 13
  {
    type: 'quote',
    label: 'the pattern i found',
    headline: 'every version of me changed\nwhen i stopped negotiating with myself.',
    body: 'self-mastery is not hype.\nit is keeping promises to yourself.',
    notes: "this is the thing i want you to write down. every time my life got better — physically, mentally, financially — it happened when i stopped giving myself the option to quit. the negotiation is the enemy. when you remove it, you move.",
  },
  // 14
  {
    type: 'split',
    label: 'the wake-up call',
    headline: 'i had muscle.\nbut i was inflamed.',
    body: 'chipotle every day. cookie dough.\nthinking protein alone made it optimal.',
    photo: { src: null, label: 'mid-2024 inflamed / chubby photo' },
    notes: "i was working out consistently at this point. but i looked puffy. soft. i thought i was eating enough protein so it was fine. i wasn't connecting the dots. the food i was eating was creating inflammation, water retention, low energy. i looked like i was working out and eating bad — because i was.",
  },
  // 15
  {
    type: 'list',
    label: 'the fix',
    headline: 'when i fixed the inputs,\nmy body changed fast.',
    bullets: [
      'less processed food.',
      'better ingredients — real sources, not manufactured.',
      'higher quality protein.',
      'less inflammation.',
      'better digestion.',
      'more energy.',
    ],
    notes: "this wasn't some crazy diet. i didn't go keto or count every calorie. i just upgraded the quality of what i was eating. grass-fed beef, pasture eggs, raw dairy, whole fruit, real fats. within weeks the puffiness was gone and my muscle actually started showing.",
  },
  // 16
  {
    type: 'split',
    label: 'the result',
    headline: 'within weeks,\ni looked and felt different.',
    body: 'leaner. clearer. sharper. more confident.\nthe muscle finally started working for me.',
    photo: { src: null, label: 'best transformation photos — before / after or current physique' },
    notes: "i want you to see this side by side. same training. same consistency. the only thing that changed was food quality. this is the thing nobody talks about enough — you can be working hard and eating yourself into inflammation at the same time.",
  },
  // 17
  {
    type: 'quote',
    label: 'the insight',
    headline: 'the body is the receipt.',
    body: 'body = habits made visible.\nconfidence = promises kept.\ndiscipline = self-love in action.',
    notes: "your body tells the truth about how you've been living. not in a shame way — in an honest way. it is the physical record of your choices, your consistency, your relationship with yourself. when you change the choices, the receipt changes.",
  },
  // 18
  {
    type: 'statement',
    label: 'the framework',
    headline: 'you are both\nthe parent and the child.',
    body: 'the child wants comfort.\nthe parent who loves you makes you do what\'s good for you.',
    notes: "think about it. the child version of you wants to sleep in, eat the cookie dough, skip the gym. the parent version — the one who actually loves you — makes you do the hard thing because they know the outcome. most people's inner parent is absent. we're bringing it back.",
  },
  // 19
  {
    type: 'list',
    label: 'redefining the word',
    headline: 'self-love is not\nletting yourself rot.',
    bullets: [
      'you train because you love yourself.',
      'you eat better because you love yourself.',
      'you sleep because you love yourself.',
      'you build because you love yourself.',
    ],
    notes: "the culture got this backwards. self-love became an excuse. a reason to never push yourself. real self-love is doing the hard thing for the person you're becoming. it's the highest form of respect for your own potential.",
  },
  // 20
  {
    type: 'split',
    label: 'the transfer',
    headline: 'self-mastery started\ntouching everything.',
    body: 'fitness. music. trading. content. mindset.\none discipline built them all.',
    photo: { src: null, label: 'lifestyle collage — gym, studio, charts, content creation' },
    notes: "once i understood how to master one thing, it transferred. the same traits that built my body built my other skills. consistency, patience, execution, emotional control. it's all the same muscle.",
  },
  // 21
  {
    type: 'split',
    label: 'proof — music',
    headline: 'i made beats.\nlanded a major placement.\nysl.',
    body: 'not luck. consistency and skill-building over years.',
    photo: { src: null, label: 'music proof / YSL placement screenshot or studio photo' },
    notes: "i was making beats for years with no validation. i kept going. kept improving. and eventually it connected at the highest level. that's what discipline without an audience looks like. you keep building even when nobody's watching.",
  },
  // 22
  {
    type: 'statement',
    label: 'proof — mindset × trading',
    headline: 'the same traits that\nbuild a physique build a life.',
    body: 'discipline. patience. emotional control. execution.\nnot optional in any area.',
    notes: "i'm not going to make this a trading webinar. but i want you to understand — the way i approach the market is identical to the way i approach training. you don't panic. you follow the system. you don't let emotion override process. it's all connected.",
  },
  // 23
  {
    type: 'photo-full',
    label: 'life proof',
    headline: 'by 21, i was becoming\nwho i used to dream about.',
    photo: { src: null, label: 'lifestyle proof collage — physique, income proof, clients, content, business' },
    notes: "i'm not going to exaggerate this. i'm going to show you exactly where i am. i built income streams around my skills. i have clients getting real results. i have content that's growing. i have a body i'm proud of. and i'm 21. this is what self-mastery builds. it's not magic. it's compounding.",
  },
  // 24
  {
    type: 'split',
    label: 'client proof',
    headline: 'this is what happens\nwhen the system is applied.',
    body: '"christina lost 20 lbs in 2 months."\n\nindividual results vary.',
    photo: { src: null, label: 'Christina before / after transformation photo' },
    notes: "i don't want to just show you my results. i want to show you what happens when someone else runs the system. christina came to me with a clear goal. we built her protocol. she followed it. the result speaks for itself.",
  },
  // 25
  {
    type: 'list',
    label: 'what you get',
    headline: 'this is 1:1\nself-mastery coaching.',
    bullets: [
      'custom training protocol.',
      'custom nutrition strategy.',
      'weekly coaching calls.',
      'discipline and lifestyle structure.',
      'habit rebuilding.',
      'mindset / self-mastery coaching.',
      'ongoing adjustments.',
      'accountability — real, direct, personal.',
    ],
    notes: "this is not a course. not a group program. not a pdf. this is me, working with you, building a system specific to your life. everything gets adjusted based on your actual data and compliance.",
  },
  // 26 — SITE DEMO
  {
    type: 'demo',
    label: 'live demo',
    headline: 'your portal.\nbuilt for this.',
    body: '→ open: vveritascoaching.vercel.app/portal/xK9mP2qLnR8v',
    demoNote: 'switch to browser and walk through: greeting, momentum bar, program calendar, tabs',
    notes: "pull this up on your screen. this is what a client sees the moment they get their link. no login. no app download. it just opens and it knows who you are. your name at the top. your goal. your progress tracked. this is your private space.",
  },
  // 27 — SITE DEMO: program
  {
    type: 'demo',
    label: 'live demo — program',
    headline: 'your full program,\non a timeline.',
    body: '→ click: program tab',
    demoNote: 'show the week calendar (week 7 of 8), then scroll through the workouts',
    notes: "this is your program. not a pdf sitting in your email. a live timeline. you can see exactly where you are in the block — week 7 of 8 right now. every exercise, every set, every rest period. clear. always there.",
  },
  // 28 — SITE DEMO: check-in
  {
    type: 'demo',
    label: 'live demo — check in',
    headline: 'weekly check-in.\nbuilt in.',
    body: '→ click: check in tab',
    demoNote: 'show the weight input, energy slider, sleep slider, notes field',
    notes: "every week you check in here. weight, energy, sleep, notes for me. i see everything in real time on my dashboard. no chasing you down in DMs. no 'hey did you train?' texts. the system keeps us aligned.",
  },
  // 29 — SITE DEMO: grocery
  {
    type: 'demo',
    label: 'live demo — grocery',
    headline: 'weekly grocery list.\ncustomized to you.',
    body: '→ click: grocery tab',
    demoNote: 'show the grocery list — protein / dairy / fats / carbs sections with Nico\'s note at top',
    notes: "every week i push your grocery list to your portal. not generic. built around your targets, your phase, your body. grass-fed beef, pasture eggs, real dairy, whole fruit. no seed oils. no fillers. you know exactly what to buy on sunday.",
  },
  // 30
  {
    type: 'list',
    label: 'what we rebuild',
    headline: 'your body is not the only\nthing we\'re working on.',
    bullets: [
      'food — quality and timing.',
      'training — structured, progressive.',
      'sleep — non-negotiable.',
      'confidence — built through proof.',
      'discipline — built through reps.',
      'environment — what you\'re surrounded by.',
      'identity — who you\'re becoming.',
      'daily structure — your actual life.',
    ],
    notes: "most fitness coaches only touch the surface. we go into everything because everything is connected. the reason you keep falling off isn't laziness — it's that the surrounding environment hasn't been addressed. we fix all of it.",
  },
  // 31
  {
    type: 'steps',
    label: 'how it works',
    headline: 'five steps.',
    steps: [
      { n: '01', text: 'audit your current life — training, food, habits, mindset.' },
      { n: '02', text: 'build your protocol — custom to your goals and reality.' },
      { n: '03', text: 'execute — weekly calls, daily check-ins, real accountability.' },
      { n: '04', text: 'adjust — protocol changes based on your actual compliance data.' },
      { n: '05', text: 'become the person who no longer needs motivation.' },
    ],
    notes: "step five is the goal. motivation is for people who are still on the outside. once you've built the identity, the behavior is automatic. that's what we're actually building — the version of you that just does this.",
  },
  // 32
  {
    type: 'list',
    label: 'call topics',
    headline: 'what our\ncalls sound like.',
    bullets: [
      'self-love through discipline.',
      'parent vs. child mindset.',
      'building confidence through proof.',
      'food environment reset.',
      'training intensity and recovery.',
      'emotional control and execution.',
      'identity shift.',
      'becoming undeniable.',
    ],
    notes: "i want you to understand these are not cookie-cutter calls. i'm not reading a script. we talk about what's actually happening in your life. the physical stuff and the mental stuff. because they're the same thing.",
  },
  // 33
  {
    type: 'split-list',
    label: 'is this for you?',
    headline: 'this is for you if…',
    for: [
      'you\'re tired of starting over.',
      'you want a better body and a sharper mind.',
      'you need structure and accountability.',
      'you know you\'re meant for more.',
      'you\'re ready to be coached — directly.',
    ],
    notFor: [
      'you want shortcuts.',
      'you avoid accountability.',
      'you just want motivation.',
      'you aren\'t ready to change daily habits.',
    ],
    notes: "i want to be honest about this. if you're looking for something that lets you opt out whenever it gets hard — this isn't it. i'm looking for people who are done negotiating with themselves. that's who this works for.",
  },
  // 34
  {
    type: 'tiers',
    label: 'the offer',
    headline: 'three tiers.\none standard.',
    tiers: [
      { name: 'foundation', price: '$997', duration: '8 weeks', tag: 'structure + accountability' },
      { name: 'operator', price: '$2,750', duration: '8–12 weeks', tag: 'direct coaching' },
      { name: 'sovereign', price: '$5,000', duration: '12 weeks', tag: '3–5 spots only' },
    ],
    notes: "foundation is for people who need the framework and can run it themselves with bi-weekly check-ins. operator is direct coaching — weekly calls, 24hr access, monthly protocol revisions. sovereign is my highest-frequency offering. daily check-ins, twice-weekly calls, i'm personally reviewing your compliance log. capped intentionally.",
  },
  // 35
  {
    type: 'statement',
    label: 'limited by design',
    headline: 'spots are limited\nbecause i am the product.',
    body: 'i can only personally coach a small number of people\nat a high level at one time.',
    notes: "this isn't manufactured scarcity. my time and attention are the constraint. when the spots are gone, they're gone. i'd rather work with five people at the highest level than twenty people at the surface.",
  },
  // 36
  {
    type: 'cta',
    label: 'apply now',
    headline: 'book your call.',
    body: 'tell me your exact situation.\ni\'ll show you what we\'d fix first\nand how we\'d build your system.',
    sub: 'if you\'re ready to stop negotiating with yourself — apply now.',
    notes: "the link is in the chat. you're not buying anything tonight — you're booking a conversation. we'll talk. i'll tell you honestly if i think i can help you and what tier makes sense. if it's not the right fit, i'll tell you that too. apply now.",
  },
  // 37
  {
    type: 'hero',
    label: null,
    headline: 'master yourself now.\nor keep meeting the same version\nof yourself next year.',
    body: null,
    notes: "i'm applying this to my own life too. everything we talked about tonight — i'm still doing it. the body, the income, the business, the content — all of it compounds from the same foundation. the decision is yours.",
  },
];

// ─── slide renderers ──────────────────────────────────────────────
function SlideHero({ s }) {
  return (
    <div className="ws-slide ws-hero">
      <div className="ws-hero-inner">
        <div className="ws-mark">vveritas*</div>
        <h1 className="ws-headline">{s.headline}</h1>
        {s.body && <p className="ws-body">{s.body}</p>}
      </div>
    </div>
  );
}

function SlideStatement({ s }) {
  return (
    <div className="ws-slide ws-statement">
      {s.label && <div className="ws-label">{s.label}</div>}
      <h2 className="ws-headline">{s.headline}</h2>
      {s.body && <p className="ws-body">{s.body}</p>}
    </div>
  );
}

function SlideQuote({ s }) {
  return (
    <div className="ws-slide ws-statement">
      {s.label && <div className="ws-label">{s.label}</div>}
      <h2 className="ws-headline ws-headline-quote">{s.headline}</h2>
      {s.body && <p className="ws-body ws-body-spaced">{s.body}</p>}
    </div>
  );
}

function SlideList({ s }) {
  return (
    <div className="ws-slide ws-list-slide">
      {s.label && <div className="ws-label">{s.label}</div>}
      <h2 className="ws-headline ws-headline-sm">{s.headline}</h2>
      <ul className="ws-bullets">
        {s.bullets.map((b, i) => <li key={i}>{b}</li>)}
      </ul>
    </div>
  );
}

function SlideSplit({ s }) {
  return (
    <div className="ws-slide ws-split">
      <div className="ws-split-left">
        {s.label && <div className="ws-label">{s.label}</div>}
        <h2 className="ws-headline ws-headline-sm">{s.headline}</h2>
        {s.body && <p className="ws-body">{s.body}</p>}
      </div>
      <div className="ws-split-right">
        {s.photo && <Photo src={s.photo.src} label={s.photo.label} />}
      </div>
    </div>
  );
}

function SlidePhotoFull({ s }) {
  return (
    <div className="ws-slide ws-photo-full">
      {s.photo && <Photo src={s.photo.src} label={s.photo.label} tall />}
      <div className="ws-photo-overlay">
        {s.label && <div className="ws-label">{s.label}</div>}
        <h2 className="ws-headline ws-headline-over">{s.headline}</h2>
      </div>
    </div>
  );
}

function SlideDemo({ s }) {
  return (
    <div className="ws-slide ws-demo-slide">
      <div className="ws-demo-badge">live demo</div>
      {s.label && <div className="ws-label" style={{marginTop:'1rem'}}>{s.label}</div>}
      <h2 className="ws-headline ws-headline-sm">{s.headline}</h2>
      <div className="ws-demo-url">{s.body}</div>
      {s.demoNote && <div className="ws-demo-instruction">speaker: {s.demoNote}</div>}
    </div>
  );
}

function SlideSteps({ s }) {
  return (
    <div className="ws-slide ws-steps-slide">
      {s.label && <div className="ws-label">{s.label}</div>}
      <h2 className="ws-headline ws-headline-sm">{s.headline}</h2>
      <div className="ws-steps">
        {s.steps.map((step, i) => (
          <div key={i} className="ws-step">
            <span className="ws-step-n">{step.n}</span>
            <span className="ws-step-text">{step.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SlideSplitList({ s }) {
  return (
    <div className="ws-slide ws-split-list">
      {s.label && <div className="ws-label">{s.label}</div>}
      <h2 className="ws-headline ws-headline-sm">{s.headline}</h2>
      <div className="ws-split-lists">
        <div>
          <div className="ws-mini-label">this is for you</div>
          <ul className="ws-bullets ws-bullets-green">
            {s.for.map((b, i) => <li key={i}>{b}</li>)}
          </ul>
        </div>
        <div>
          <div className="ws-mini-label">not for you</div>
          <ul className="ws-bullets ws-bullets-dim">
            {s.notFor.map((b, i) => <li key={i}>{b}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}

function SlideTiers({ s }) {
  return (
    <div className="ws-slide ws-tiers-slide">
      {s.label && <div className="ws-label">{s.label}</div>}
      <h2 className="ws-headline ws-headline-sm">{s.headline}</h2>
      <div className="ws-tiers">
        {s.tiers.map((t, i) => (
          <div key={i} className={`ws-tier${i === 1 ? ' featured' : ''}`}>
            <div className="ws-tier-name">{t.name}</div>
            <div className="ws-tier-price">{t.price}</div>
            <div className="ws-tier-duration">{t.duration}</div>
            <div className="ws-tier-tag">{t.tag}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SlideCTA({ s }) {
  return (
    <div className="ws-slide ws-cta-slide">
      {s.label && <div className="ws-label">{s.label}</div>}
      <h2 className="ws-headline">{s.headline}</h2>
      {s.body && <p className="ws-body ws-body-spaced">{s.body}</p>}
      {s.sub && <p className="ws-cta-sub">{s.sub}</p>}
      <div className="ws-cta-mark">vveritascoaching.vercel.app/ready</div>
    </div>
  );
}

function renderSlide(s) {
  switch (s.type) {
    case 'hero': return <SlideHero s={s} />;
    case 'statement': return <SlideStatement s={s} />;
    case 'quote': return <SlideQuote s={s} />;
    case 'list': return <SlideList s={s} />;
    case 'split': return <SlideSplit s={s} />;
    case 'photo-full': return <SlidePhotoFull s={s} />;
    case 'demo': return <SlideDemo s={s} />;
    case 'steps': return <SlideSteps s={s} />;
    case 'split-list': return <SlideSplitList s={s} />;
    case 'tiers': return <SlideTiers s={s} />;
    case 'cta': return <SlideCTA s={s} />;
    default: return <SlideStatement s={s} />;
  }
}

// ─── main component ───────────────────────────────────────────────
export default function WebinarSlides() {
  const [idx, setIdx] = useState(0);
  const [showNotes, setShowNotes] = useState(false);
  const [entered, setEntered] = useState(false);

  const total = SLIDES.length;
  const current = SLIDES[idx];

  const prev = useCallback(() => setIdx(i => Math.max(0, i - 1)), []);
  const next = useCallback(() => setIdx(i => Math.min(total - 1, i + 1)), [total]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'ArrowRight' || e.key === ' ') next();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'n' || e.key === 'N') setShowNotes(s => !s);
      if (e.key === 'Escape') setShowNotes(false);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev]);

  if (!entered) {
    return (
      <div className="ws-enter">
        <div className="ws-enter-inner">
          <div className="ws-mark" style={{marginBottom:'2rem'}}>vveritas*</div>
          <h1 className="ws-enter-title">{'master yourself.\nchange everything.'}</h1>
          <p className="ws-enter-sub">use → or spacebar to advance · ← to go back · N for speaker notes</p>
          <button className="ws-enter-btn" onClick={() => setEntered(true)}>begin →</button>
        </div>
      </div>
    );
  }

  return (
    <div className="ws-root">
      {/* progress bar */}
      <div className="ws-progress">
        <div className="ws-progress-fill" style={{ width: `${((idx + 1) / total) * 100}%` }} />
      </div>

      {/* slide */}
      <div className="ws-stage" key={idx}>
        {renderSlide(current)}
      </div>

      {/* nav */}
      <div className="ws-nav">
        <button className="ws-nav-btn" onClick={prev} disabled={idx === 0}>←</button>
        <div className="ws-nav-center">
          <span className="ws-counter">{idx + 1} / {total}</span>
          <button className="ws-notes-toggle" onClick={() => setShowNotes(s => !s)}>
            {showNotes ? 'hide notes' : 'notes'}
          </button>
        </div>
        <button className="ws-nav-btn" onClick={next} disabled={idx === total - 1}>→</button>
      </div>

      {/* speaker notes */}
      {showNotes && current.notes && (
        <div className="ws-notes">
          <div className="ws-notes-label">speaker notes — slide {idx + 1}</div>
          <p className="ws-notes-text">{current.notes}</p>
        </div>
      )}

    </div>
  );
}
