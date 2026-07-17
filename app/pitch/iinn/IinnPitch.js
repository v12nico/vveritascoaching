'use client';
import { useState, useEffect } from 'react';

// ── EDITABLE BEFORE CALL ─────────────────────────────────────────────────────
const prospectName = 'Iinn';
const PRICE_8W = 997;

// ── HELPERS ───────────────────────────────────────────────────────────────────
const fmt  = n => n ? `$${Number(n).toLocaleString()}` : '[ set before call ]';
const div2 = n => n ? `$${Math.ceil(n / 2).toLocaleString()} / payment` : '[ ÷ 2 ]';
const div4 = n => n ? `$${Math.ceil(n / 4).toLocaleString()} / mo` : '[ ÷ 4 ]';

const GREEN = '#4a8c6a';

// ── SLIDES ────────────────────────────────────────────────────────────────────
const SLIDES = [
  // 1
  {
    type: 'hero',
    label: 'vveritas* coaching',
    headline: `built for ${prospectName}.`,
    body: 'not another plan to start. a system to finally finish.',
    sub: 'eight weeks of structure, accountability, training, and measurable execution.',
    notes: `This is on screen when the call starts. Let ${prospectName} see his name. Say nothing. Let the moment land. When he reacts, begin.`,
  },
  // 2
  {
    type: 'fit-frame',
    notes: `Say: "Bro, I want this call to be different from someone just pitching you." Pause. "You already told me the real problem — you've never committed to something in your life. You've always stopped. You said you don't have structure to follow." Pause. "So before I show you anything, I want to understand why that pattern keeps happening — and whether you're genuinely ready to build a different one." Then: "I'm going to ask questions, listen, and tell you exactly what I think. This is not about convincing you. It's about seeing whether this system actually fits you." Ask: "Fair?" Wait for him to agree before going anywhere.`,
  },
  // 3
  {
    type: 'statement',
    headline: "you told me you've never committed\nto something in your life.",
    body: "most people think that's a motivation problem.\n\nit's not.",
    notes: `Let it sit. He said it himself. You're not judging him — you're naming it accurately. The moment he sees it framed as a structural problem rather than a character flaw, the entire conversation shifts. Don't add anything. Let him sit with it.`,
  },
  // 4
  {
    type: 'discovery',
    label: 'part 1 — the pattern',
    headline: 'your history.',
    questions: [
      `"when you say you've never committed to anything, what are the biggest examples?"`,
      `"how long do you normally stay consistent before falling off?"`,
      `"what usually happens right before you stop?"`,
      `"what do you tell yourself after you give up?"`,
      `"how has repeating that pattern affected the way you see yourself?"`,
    ],
    notes: `These questions reveal the emotional pattern. Listen for what triggers the fall-off. Is it a missed day? A hard week at work? An obstacle? Use follow-ups freely: "tell me more." / "give me a real example." / "what does that cost you?" Do not judge anything. The goal is for him to understand his own pattern — not for you to tell him.`,
  },
  // 5
  {
    type: 'discovery',
    label: 'part 2 — why now',
    headline: 'what changed.',
    questions: [
      `"what happened recently that made you finally reach out?"`,
      `"why are you tired of this pattern now instead of six months from now?"`,
      `"what would happen if another year passed and nothing changed?"`,
      `"what would becoming consistent prove to you?"`,
      `"who else would benefit from you becoming more reliable?"`,
    ],
    notes: `The last question is critical. He mentioned wanting to be present with friends and family. When he names the people who would benefit — he's connecting this to something bigger than the gym. Reflect it back: "so this is also about being the person they can count on." Let him confirm.`,
  },
  // 6
  {
    type: 'discovery',
    label: 'part 3 — current reality',
    headline: 'where things stand today.',
    questions: [
      `"what does your current training week look like?"`,
      `"what does your work schedule look like right now?"`,
      `"what normally pulls your attention away from friends and family?"`,
      `"how are your sleep, nutrition, and energy right now?"`,
      `"which of those areas is creating the most frustration today?"`,
    ],
    notes: `You are mapping the territory. Ask specifically about work — because if he wants to train at 5am, you need to know what his day looks like. The energy question often reveals sleep and food quality issues without asking directly. Ask for specifics. Numbers where possible. Let him lead.`,
  },
  // 7
  {
    type: 'discovery',
    label: 'part 4 — what is already working',
    headline: 'what you bring.',
    questions: [
      `"what is something you have stayed consistent with, even if it seems small?"`,
      `"what made you wake up for a 5am gym session before this call?"`,
      `"what do the people closest to you respect about you?"`,
      `"when you are at your best, what kind of person are you?"`,
      `"what makes you believe you are actually capable of changing this?"`,
    ],
    notes: `This section is not flattery. It is finding real evidence. He already demonstrated something: he scheduled this call at 6am Eastern and committed to training before it. When he says things like "I'm reliable at work when I care" — use that as proof that the consistency muscle exists. Point that out: "you already know how to follow through. you've just never had a structure that held you accountable to yourself."`,
  },
  // 8
  {
    type: 'discovery',
    label: 'part 5 — what you are committing to',
    headline: 'five questions.',
    questions: [
      `"can you commit to three training sessions every week — even when motivation is gone?"`,
      `"can you complete a two-minute check-in on your dashboard, even on a bad day?"`,
      `"can you communicate when you fall behind instead of disappearing?"`,
      `"can you follow one system for eight weeks before deciding it doesn't work?"`,
      `"what are you prepared to reorganize in your life to make room for this?"`,
    ],
    notes: `These are real commitment questions — not motivation questions. If he hesitates on any of them, explore it: "what makes that one harder than the others?" The last question is the most revealing. What he's willing to reorganize tells you how serious he actually is. Listen for specifics. A vague answer means he hasn't thought it through. Don't pressure. Just observe.`,
  },
  // 9
  {
    type: 'reflection',
    label: 'the diagnosis',
    headline: `what i'm actually hearing.`,
    items: [
      'you are not missing information.',
      'you are missing a structure you trust enough to follow.',
      'you have repeatedly started with emotion but lacked a system when motivation faded.',
      `every time you stopped, it weakened your confidence in your own word.`,
      'your real goal is not simply to work out.',
      `your real goal is to become somebody who follows through.`,
      `you are already demonstrating readiness by showing up for this call at 6am.`,
    ],
    script: [
      `"I don't think your problem is that you're lazy."`,
      `"I think you've been trying to rely on motivation to do a job that structure is supposed to do."`,
      `"Every time motivation disappeared — the plan disappeared with it."`,
      `"So the goal isn't to make you feel ready."`,
      `"The goal is to give you enough repeated proof that you stop questioning whether you can trust yourself."`,
    ],
    notes: `Read the observations one by one. Slowly. Leave space after each one. When you reach the script — pause before reading it. Read it deliberately. After the last line, pause for at least three seconds. Let him sit in it. He has probably never heard someone frame his own pattern this way without judgment. The silence is valuable — don't fill it.`,
  },
  // 10
  {
    type: 'statement',
    label: 'the core reframe',
    headline: 'you are not missing information.',
    body: 'you are missing a structure you trust enough to follow.',
    notes: `Simple. Clean. Ask: "Does that feel accurate?" He will say yes. That yes is important — it means he owns the diagnosis. From here, the program becomes the solution to his stated problem, not a product you're pitching.`,
  },
  // 11
  {
    type: 'identity-reframe',
    headline: 'your current identity\nis not permanent.',
    left: {
      label: 'the old pattern',
      items: [
        'start emotionally',
        'miss one day',
        'lose momentum',
        'judge yourself',
        'abandon the plan',
        'restart later',
      ],
    },
    right: {
      label: 'the new standard',
      items: [
        'follow a clear structure',
        'expect imperfect days',
        'communicate immediately',
        'correct without spiraling',
        'continue the process',
        'build evidence',
      ],
    },
    highlight: 'consistency is not never missing.\nconsistency is refusing to disappear.',
    notes: `Walk through both columns slowly. After the highlight line — stop. Let him read it. Ask: "Which column does the person you want to be live in?" He will point to the right. "Good. That's what the next eight weeks are for. Not proving you're perfect. Proving you don't disappear."`,
  },
  // 12
  {
    type: 'challenge',
    headline: `i already see something in you\nthat i think you've stopped seeing in yourself.`,
    items: [
      'you reached out honestly.',
      `you admitted the pattern — without making excuses.`,
      'you agreed to wake up and take this call before most people are out of bed.',
    ],
    turn: `but belief isn't enough.`,
    challenge: `over the next eight weeks, i want you to prove that my read on you was right.\n\nnot by being perfect.\n\nby staying engaged every time the old version of you wants to disappear.`,
    notes: `Say it with conviction — because you mean it. He has already demonstrated something by being on this call at this hour. Name that explicitly. Then shift: "But I'm not asking for motivation right now. I'm asking for a commitment to a standard." Pause. "There's a difference."`,
  },
  // 13 — NEW
  {
    type: 'more-than-plan',
    notes: `Say: "And bro — I heard you when you said you mainly wanted a workout plan. You are absolutely getting that. Your actual training program is still the foundation of everything." Pause. "But based on what you told me, I would be doing you a disservice if I just sent you a list of exercises and disappeared." Pause. "Because you already said the real issue is not knowing that you should work out. The issue is sticking to something after the motivation wears off." Pause. "So yes, this is more than a workout PDF — but it is not me trying to pile random extras onto you. Everything I added exists to help the actual workout plan succeed." Walk through the feature connections on screen. Then: "I built the offer this way because I want to see you actually finish something — not just receive another document." Then: "I know there are simpler coaching offers at similar or even higher price points. I intentionally built more support into mine because I care about whether you actually follow through." Let the core line land.`,
  },
  // 14 — NEW
  {
    type: '167-hours',
    notes: `Say: "And this is the part most people miss." Pause. "The workout matters, obviously. But the workout is not even the tip of the iceberg when it comes to your actual result." Pause. "You might train for three or four hours total in a week." "The rest of the week is where everything either gets supported or gets destroyed." Go through the list on screen. Then: "Those hours matter way more than the hour you spend lifting." Then advance to the iceberg slide.`,
  },
  // 15 — NEW
  {
    type: 'iceberg',
    notes: `Say: "This is what I mean when I say it's more than a workout plan." "The part you see is the training." "But underneath that is everything that determines whether you actually keep showing up long enough for the training to work." "If I gave you only the top of the iceberg, I would be ignoring the exact reason you told me you have struggled before." "So no, I'm not trying to upsell you." "I'm trying to make sure the plan survives after the excitement wears off." Then: "You are not paying me to tell you to work out. You are paying for a system that keeps the rest of your life from pulling you away from the result." Advance to the value stack.`,
  },
  // 16 — NEW
  {
    type: 'value-stack',
    notes: `Walk through the list. Don't rush. Name the ones that stand out for him specifically: "work-accountability structure" and "presence goals for friends and family." Say: "You'll notice some of these have nothing to do with the gym. That's intentional. You told me you wanted consistency in your work, with your friends, with your family. That's what this is built to support." Let the bottom line land before advancing.`,
  },
  // 17 — condensed from 9 demo slides
  {
    type: 'demo',
    notes: `Open /portal/iinn-demo. Walk through each tab at your own pace — no need to follow the slides. Show: Missions (point to the work block and presence task), Pillars (expand one — show score, what's helping, what's holding it back), Fitness (Workout A, read the program note), Nutrition (grocery list, daily checklist), Schedule (week structure), Check-In (point to the "where did you almost fall back" question), Progress (point to Recovery Wins specifically), Messages (read the coach message out loud slowly). Take your time. Let him react. Ask: "Have you ever seen a coaching dashboard that covers all of this?" When done, advance.`,
  },
  // 18
  {
    type: 'roadmap',
    label: 'the process',
    headline: '8 weeks.',
    notes: `Walk through each phase one at a time. After Weeks 1–2, ask: "Does this make sense? No proving anything. No intensity. Just evidence that you can return." After Weeks 3–4: "This is when you'll start to feel it — not because you're motivated, because you have data." After Weeks 5–6: "This is usually where programs fall apart. We're building you for this phase." After Weeks 7–8: "You'll have a record. Not a feeling. A record."`,
  },
  // 19
  {
    type: 'fit-who',
    left: {
      label: 'this is built for you if:',
      items: [
        `you are honest about the pattern and want to end it`,
        `you are willing to follow a structure without reinventing it every week`,
        `you understand that skipping doesn't disqualify you — disappearing does`,
        `you are willing to communicate when you struggle instead of going silent`,
        `you want consistency in more than just the gym`,
        `you are ready to take the next step, not the perfect step`,
      ],
    },
    right: {
      label: 'this is not a fit if:',
      items: [
        `you want a workout pdf and nothing else`,
        `you are not willing to check in, even when it is uncomfortable`,
        `you want motivation content instead of a real structure`,
        `you are not ready to be accountable for your own execution`,
        `you see this as another thing to try for two weeks`,
      ],
    },
    notes: `Say: "I want to be honest about who this program is built for — and who it isn't." Let him read both columns. Then ask: "Based on what you know about yourself right now — where do you land?" Let him answer. If he says he belongs in the left column — he's ready. If he hedges — explore that before moving forward.`,
  },
  // 20 — NEW pre-price gate
  {
    type: 'pre-price',
    notes: `Ask calmly: "Based on everything I showed you — the system, the portal, the roadmap, the structure around your gym, your work, and your relationships — does this feel like the kind of structure you were actually missing?" Stop. Wait for his answer. Don't fill the silence. If he says yes: "Good. Then let me show you what the eight-week investment looks like." Advance. If he's unsure: go back to any slide and address what's unclear before revealing the price.`,
  },
  // 21 — NEW investment reveal
  {
    type: 'investment',
    notes: `Say: "The full investment for the eight-week program is $997." Pause. "That includes the personalized plan, the full dashboard, daily accountability, weekly reviews, direct access to me, program adjustments, and the entire consistency system we just walked through." Pause. "And I want to be clear — I did not build all of this just to make the offer sound bigger. I built it because you told me you are tired of starting and stopping, and I want to give you the best possible structure to finally break that pattern." Pause. "You can handle it in full, split it into two payments, or divide it into four monthly payments." Then ask: "Does that investment make sense for the level of support we just walked through?" Stop. Let him respond.`,
  },
  // 22
  {
    type: 'close',
    notes: `Deliver this with complete calm. No urgency. No fake scarcity. After the question — stop talking. Whatever he says next is the close. If he says yes: "Tell me exactly what you're committing to." Let him speak. Then: "Good. Based on that, I'm comfortable moving forward with you." Open /enroll/iinn. If he hesitates — move to objections.`,
  },
  // 23
  {
    type: 'objections',
    label: `let's address it.`,
    headline: 'whatever is holding you back.',
    notes: `Do not bring this slide up unprompted. If he raises an objection, navigate here and click the matching one. These are frameworks — not scripts. Let the conversation lead.`,
  },
  // 24
  {
    type: 'cta',
    headline: `your follow-through\nstarts when you decide.`,
    body: `vveritascoaching.com/enroll/iinn`,
    sub: `ask what questions he has before moving forward — and go silent. let him talk. whatever he says next is your close.`,
    notes: `Do not pitch. Do not oversell. Ask "what questions do you have before we move forward?" and go silent. Let him talk. Open the enrollment page. Confirm his start date.`,
  },
];

// ── ROADMAP COMPONENT ─────────────────────────────────────────────────────────
function RoadmapSlide() {
  const [active, setActive] = useState(0);
  const phases = [
    {
      label: 'weeks 1–2', title: 'establish the standard.',
      coach: `your only job is to prove that you can return tomorrow.`,
      items: [
        'lock in three weekly training sessions',
        'establish morning and evening routines',
        'complete daily check-ins without exception',
        `build simple nutrition standards — protein every meal`,
        `identify the exact trigger that normally causes you to fall off`,
        'reduce unnecessary daily decisions',
        'track attendance, not perfection',
      ],
    },
    {
      label: 'weeks 3–4', title: 'build evidence.',
      coach: `confidence is no longer an idea. it is becoming a record.`,
      items: [
        'progressive overload — weight moves when the previous session was clean',
        'stronger workout execution and logging',
        'consistent nutrition adherence',
        `improved work structure and focus blocks`,
        `more intentional presence with friends and family`,
        'first full progress review',
        'identify where consistency is beginning to transfer',
      ],
    },
    {
      label: 'weeks 5–6', title: 'protect the standard.',
      coach: `the test is not how you perform when motivated. the test is what you do after an imperfect day.`,
      items: [
        'prepare for low-motivation days — they are coming',
        'strengthen routines until they run on autopilot',
        'reduce all-or-nothing thinking',
        'improve communication — message before you disappear',
        'adjust the plan based on real data',
        `increase personal responsibility without removing support`,
      ],
    },
    {
      label: 'weeks 7–8', title: 'become self-directed.',
      coach: `you are no longer trying to become consistent. you now have eight weeks of proof that you can be.`,
      items: [
        `compare week one and week eight — real numbers`,
        'review training consistency, strength progress, and check-in completion',
        'review work execution and presence with friends and family',
        'build the next phase',
        `create a personal relapse-prevention plan`,
        `define the standards you will continue independently`,
      ],
    },
  ];
  const p = phases[active];
  return (
    <div className="ws-slide" style={{ gap: '0.8rem' }}>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.4rem' }}>
        {phases.map((ph, i) => (
          <button key={i} onClick={() => setActive(i)} style={{ flex: 1, padding: '0.5rem 0.3rem', background: i === active ? '#EDEDE8' : 'transparent', border: '1px solid', borderColor: i === active ? '#EDEDE8' : '#141414', color: i === active ? '#000' : '#3A3A3A', fontFamily: 'ui-monospace, monospace', fontSize: '0.42rem', letterSpacing: '0.12em', cursor: 'pointer', transition: 'all 0.15s' }}>
            {ph.label}
          </button>
        ))}
      </div>
      <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.52rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#3A3A3A' }}>{p.label}</div>
      <div style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', fontWeight: 200, letterSpacing: '-0.02em', color: '#EDEDE8', marginBottom: '0.4rem' }}>{p.title}</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.35rem 2.5rem', flex: 1 }}>
        {p.items.map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: '0.6rem', alignItems: 'baseline' }}>
            <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.48rem', color: GREEN, flexShrink: 0 }}>→</span>
            <span style={{ fontSize: 'clamp(0.65rem, 0.95vw, 0.78rem)', color: '#EDEDE8', lineHeight: 1.5 }}>{item}</span>
          </div>
        ))}
      </div>
      <div style={{ borderTop: '1px solid #141414', paddingTop: '0.8rem', fontFamily: 'ui-monospace, monospace', fontSize: '0.5rem', letterSpacing: '0.06em', color: '#5A5A5A', fontStyle: 'italic', lineHeight: 1.6 }}>
        "{p.coach}"
      </div>
    </div>
  );
}

// ── OBJECTIONS COMPONENT ──────────────────────────────────────────────────────
function ObjectionsSlide({ slide }) {
  const [active, setActive] = useState(null);
  const objections = [
    {
      q: `"i only need a workout plan."`,
      a: `A workout plan would solve a knowledge problem. You already told me your real problem is that you repeatedly stop. Giving you another plan without accountability and structure would ignore the exact issue you asked me to help with.\n\nI can send you an example workout — but I wouldn't pretend that the document alone solves what you described.`,
    },
    {
      q: `"i want to try it alone."`,
      a: `You absolutely can. My question is — what will be structurally different this time from every other attempt?\n\n[pause]\n\nIf nothing changes around the plan, the result usually doesn't change either. You have tried alone before. You know how it ends.`,
    },
    {
      q: `"$997 is a lot."`,
      a: `I understand. Don't make a reckless financial decision.\n\nThe question is whether you want another workout file or eight weeks of coaching, structure, tracking, and accountability around the exact pattern you said you are tired of repeating.\n\nPayment plans are available. The investment stays the same.`,
    },
    {
      q: `"i'm not sure i'm ready."`,
      a: `You are waiting for a feeling that normally comes after action.\n\nReadiness feels like competence. Competence comes from producing evidence.\n\nYou don't need to feel certain about all eight weeks today. You need to be willing to complete the first commitment.\n\nOne session. One check-in. One day.`,
    },
    {
      q: `"what if i fall off?"`,
      a: `Then we address it immediately. The program is not built for someone who never struggles. It is built to stop a struggle from becoming another disappearance.\n\nYour Recovery Wins metric tracks exactly that — every time you fall behind but return within 24 hours. That is the standard. Not perfection.`,
    },
    {
      q: `"i've tried this before."`,
      a: `You've tried programs before. Have you had a system that tracked your work, your presence with family, your daily follow-through, and built a coach message around exactly what is happening in your life that week?\n\nThis is not another program. It's a different kind of structure.`,
    },
  ];
  return (
    <div className="ws-slide">
      <div className="ws-label">{slide.label}</div>
      <h1 className="ws-headline ws-headline-sm" style={{ marginBottom: '2rem' }}>{slide.headline}</h1>
      <div style={{ display: 'grid', gridTemplateColumns: active !== null ? '1fr 1fr' : '1fr', gap: '0.8rem', maxWidth: '720px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {objections.map((o, i) => (
            <button key={i} onClick={() => setActive(active === i ? null : i)} style={{ background: 'none', border: `1px solid ${active === i ? '#EDEDE8' : '#1a1a1a'}`, padding: '0.9rem 1rem', cursor: 'pointer', textAlign: 'left', borderRadius: '2px', fontFamily: 'Inter, -apple-system, sans-serif', color: active === i ? '#EDEDE8' : '#5A5A5A', fontSize: 'clamp(0.7rem, 1.05vw, 0.82rem)', fontWeight: 300, transition: 'border-color 0.15s, color 0.15s' }}>
              {o.q}
            </button>
          ))}
        </div>
        {active !== null && (
          <div style={{ padding: '1.2rem', border: '1px solid #1a1a1a', borderRadius: '2px', fontSize: 'clamp(0.72rem, 1.1vw, 0.85rem)', color: '#EDEDE8', lineHeight: 1.8, alignSelf: 'start', whiteSpace: 'pre-line' }}>
            {objections[active].a}
          </div>
        )}
      </div>
    </div>
  );
}

// ── SLIDE DISPATCHER ──────────────────────────────────────────────────────────
function Slide({ slide }) {

  if (slide.type === 'hero') {
    return (
      <div className="ws-slide ws-hero">
        <div className="ws-hero-inner">
          <div className="ws-mark">{slide.label}</div>
          <h1 className="ws-headline" style={{ textAlign: 'center', whiteSpace: 'pre-line' }}>{slide.headline}</h1>
          <p className="ws-body" style={{ textAlign: 'center', marginTop: '0.5rem' }}>{slide.body}</p>
          {slide.sub && <p style={{ textAlign: 'center', fontSize: 'clamp(0.72rem, 1.05vw, 0.85rem)', color: '#3A3A3A', marginTop: '1rem', maxWidth: '480px' }}>{slide.sub}</p>}
        </div>
      </div>
    );
  }

  if (slide.type === 'fit-frame') {
    return (
      <div className="ws-slide" style={{ justifyContent: 'center', maxWidth: '70vw', margin: '0 auto', padding: '5vw 8vw' }}>
        <div className="ws-label">before we begin</div>
        <h1 className="ws-headline" style={{ marginBottom: '2.5rem' }}>this is not<br />a traditional<br />sales call.</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', maxWidth: '480px', marginBottom: '2.5rem' }}>
          <p style={{ fontSize: 'clamp(0.8rem, 1.3vw, 1rem)', color: '#5A5A5A', lineHeight: 1.75 }}>you are deciding whether vveritas fits you.</p>
          <p style={{ fontSize: 'clamp(0.8rem, 1.3vw, 1rem)', color: '#5A5A5A', lineHeight: 1.75 }}>i am deciding whether i believe the system fits your goals, your schedule, and your willingness to execute.</p>
        </div>
        <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.52rem', letterSpacing: '0.25em', color: '#3A3A3A' }}>the goal is the right fit — not the largest package.</div>
      </div>
    );
  }

  if (slide.type === 'statement') {
    return (
      <div className="ws-slide" style={{ justifyContent: 'center', maxWidth: '70vw', margin: '0 auto', padding: '5vw 8vw' }}>
        {slide.label && <div className="ws-label">{slide.label}</div>}
        <h1 className="ws-headline ws-headline-sm" style={{ whiteSpace: 'pre-line' }}>{slide.headline}</h1>
        <p className="ws-body ws-body-spaced" style={{ whiteSpace: 'pre-line' }}>{slide.body}</p>
      </div>
    );
  }

  if (slide.type === 'discovery') {
    return (
      <div className="ws-slide">
        <div className="ws-label">{slide.label}</div>
        <h1 className="ws-headline ws-headline-sm" style={{ marginBottom: '2rem' }}>{slide.headline}</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '600px' }}>
          {slide.questions.map((q, i) => (
            <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'baseline' }}>
              <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.5rem', color: '#3A3A3A', flexShrink: 0 }}>0{i + 1}</span>
              <span style={{ fontSize: 'clamp(0.75rem, 1.15vw, 0.9rem)', color: '#EDEDE8', lineHeight: 1.6, fontStyle: 'italic' }}>{q}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '2.5rem', fontFamily: 'ui-monospace, monospace', fontSize: '0.46rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#1e1e1e' }}>
          listen. reflect. follow up. do not rush.
        </div>
      </div>
    );
  }

  if (slide.type === 'reflection') {
    return (
      <div className="ws-slide">
        <div className="ws-label">{slide.label}</div>
        <h1 className="ws-headline ws-headline-sm" style={{ marginBottom: '1.8rem' }}>{slide.headline}</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', maxWidth: '580px', marginBottom: '2rem' }}>
          {slide.items.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.7rem', alignItems: 'baseline' }}>
              <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.52rem', color: '#3A3A3A', flexShrink: 0 }}>—</span>
              <span style={{ fontSize: 'clamp(0.7rem, 1.05vw, 0.82rem)', color: '#EDEDE8', lineHeight: 1.5 }}>{item}</span>
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid #0f0f0f', paddingTop: '1.5rem', maxWidth: '540px' }}>
          {slide.script.map((line, i) => (
            <p key={i} style={{ fontSize: 'clamp(0.72rem, 1.1vw, 0.85rem)', color: '#5A5A5A', fontStyle: 'italic', lineHeight: 1.8, marginBottom: '0.5rem' }}>{line}</p>
          ))}
        </div>
      </div>
    );
  }

  if (slide.type === 'identity-reframe') {
    return (
      <div className="ws-slide">
        <h1 className="ws-headline ws-headline-sm" style={{ whiteSpace: 'pre-line', marginBottom: '2.5rem' }}>{slide.headline}</h1>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4vw', maxWidth: '640px', marginBottom: '2.5rem' }}>
          <div>
            <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.46rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#3A3A3A', marginBottom: '1rem' }}>{slide.left.label}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {slide.left.items.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.65rem', alignItems: 'baseline' }}>
                  <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.5rem', color: '#2a2a2a', flexShrink: 0 }}>—</span>
                  <span style={{ fontSize: 'clamp(0.7rem, 1.05vw, 0.82rem)', color: '#5A5A5A', lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.46rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: GREEN, marginBottom: '1rem' }}>{slide.right.label}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {slide.right.items.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.65rem', alignItems: 'baseline' }}>
                  <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.5rem', color: GREEN, flexShrink: 0 }}>✓</span>
                  <span style={{ fontSize: 'clamp(0.7rem, 1.05vw, 0.82rem)', color: '#EDEDE8', lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid #141414', paddingTop: '1.5rem' }}>
          <p style={{ fontSize: 'clamp(1rem, 1.7vw, 1.3rem)', fontWeight: 200, letterSpacing: '-0.02em', color: '#EDEDE8', whiteSpace: 'pre-line', lineHeight: 1.4 }}>{slide.highlight}</p>
        </div>
      </div>
    );
  }

  if (slide.type === 'challenge') {
    return (
      <div className="ws-slide" style={{ maxWidth: '70vw', margin: '0 auto', padding: '4vw 8vw', justifyContent: 'center' }}>
        <h1 className="ws-headline ws-headline-sm" style={{ whiteSpace: 'pre-line', marginBottom: '2rem' }}>{slide.headline}</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', maxWidth: '540px', marginBottom: '2rem' }}>
          {slide.items.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.7rem', alignItems: 'baseline' }}>
              <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.52rem', color: GREEN, flexShrink: 0 }}>✓</span>
              <span style={{ fontSize: 'clamp(0.78rem, 1.2vw, 0.92rem)', color: '#EDEDE8', lineHeight: 1.5 }}>{item}</span>
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid #141414', paddingTop: '1.8rem', maxWidth: '540px' }}>
          <p style={{ fontSize: 'clamp(0.82rem, 1.3vw, 1rem)', color: '#5A5A5A', marginBottom: '1.2rem' }}>{slide.turn}</p>
          <p style={{ fontSize: 'clamp(0.85rem, 1.3vw, 1rem)', color: '#EDEDE8', lineHeight: 1.75, whiteSpace: 'pre-line' }}>{slide.challenge}</p>
        </div>
      </div>
    );
  }

  if (slide.type === 'more-than-plan') {
    const connections = [
      { item: 'the workouts',              purpose: 'tell you exactly how to train.' },
      { item: 'the schedule',              purpose: 'gives those workouts a permanent place in your week.' },
      { item: 'the daily missions',        purpose: 'remove decision-making from your day.' },
      { item: 'the check-ins',             purpose: `stop one missed day from becoming another abandoned month.` },
      { item: 'the messaging',             purpose: 'gives you somewhere to communicate before disappearing.' },
      { item: 'the progress tracking',     purpose: 'gives you evidence that you are actually improving.' },
      { item: 'the work + presence goals', purpose: 'help you build consistency beyond the gym.' },
    ];
    return (
      <div className="ws-slide">
        <h1 className="ws-headline ws-headline-sm" style={{ marginBottom: '0.5rem' }}>you asked for a workout plan.</h1>
        <p style={{ fontSize: 'clamp(0.82rem, 1.3vw, 1rem)', color: '#5A5A5A', marginBottom: '2rem' }}>you are getting that. your training program is still the foundation of everything.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', maxWidth: '640px', marginBottom: '2.5rem' }}>
          {connections.map((c, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '12rem 1fr', gap: '1rem', alignItems: 'baseline', paddingBottom: '0.55rem', borderBottom: '1px solid #0a0a0a' }}>
              <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.46rem', letterSpacing: '0.1em', color: '#EDEDE8' }}>{c.item}</span>
              <span style={{ fontSize: 'clamp(0.68rem, 1.05vw, 0.82rem)', color: '#5A5A5A', lineHeight: 1.5 }}>{c.purpose}</span>
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid #141414', paddingTop: '1.5rem', maxWidth: '600px' }}>
          <p style={{ fontSize: 'clamp(0.88rem, 1.4vw, 1.1rem)', fontWeight: 200, color: '#EDEDE8', letterSpacing: '-0.01em', lineHeight: 1.4, marginBottom: '0.6rem' }}>
            the extras are not there to make the offer bigger.
          </p>
          <p style={{ fontSize: 'clamp(0.88rem, 1.4vw, 1.1rem)', fontWeight: 200, color: '#EDEDE8', letterSpacing: '-0.01em', lineHeight: 1.4 }}>
            they are there to make the plan work.
          </p>
          <p style={{ fontSize: 'clamp(0.68rem, 1vw, 0.8rem)', color: '#3A3A3A', marginTop: '0.8rem', fontStyle: 'italic' }}>the training plan tells you what to do. the system helps make sure you continue doing it.</p>
        </div>
      </div>
    );
  }

  if (slide.type === '167-hours') {
    const factors = [
      'what you eat matters.',
      'how you sleep matters.',
      `whether you follow through on the days you don't feel motivated matters.`,
      'whether you communicate when you are slipping matters.',
      'whether you structure your work, your recovery, and your environment matters.',
    ];
    return (
      <div className="ws-slide">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5vw', maxWidth: '700px', alignItems: 'start', marginBottom: '2.5rem' }}>
          <div>
            <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.46rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#3A3A3A', marginBottom: '0.8rem' }}>training</div>
            <div style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 200, letterSpacing: '-0.05em', color: '#EDEDE8', lineHeight: 1 }}>3–4</div>
            <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.46rem', color: '#5A5A5A', marginTop: '0.4rem' }}>hours per week</div>
          </div>
          <div>
            <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.46rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#3A3A3A', marginBottom: '0.8rem' }}>everything else</div>
            <div style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 200, letterSpacing: '-0.05em', color: '#5A5A5A', lineHeight: 1 }}>164+</div>
            <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.46rem', color: '#3A3A3A', marginTop: '0.4rem' }}>hours where it either gets supported or gets destroyed</div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', maxWidth: '540px', marginBottom: '2.5rem' }}>
          {factors.map((f, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.7rem', alignItems: 'baseline' }}>
              <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.52rem', color: '#3A3A3A', flexShrink: 0 }}>—</span>
              <span style={{ fontSize: 'clamp(0.72rem, 1.1vw, 0.85rem)', color: '#5A5A5A', lineHeight: 1.6 }}>{f}</span>
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid #141414', paddingTop: '1.5rem', maxWidth: '560px' }}>
          <p style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.2rem)', fontWeight: 200, letterSpacing: '-0.02em', color: '#EDEDE8', lineHeight: 1.45, marginBottom: '0.5rem' }}>
            the workout builds the body.
          </p>
          <p style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.2rem)', fontWeight: 200, letterSpacing: '-0.02em', color: '#EDEDE8', lineHeight: 1.45 }}>
            the rest of the week determines whether it actually happens.
          </p>
        </div>
      </div>
    );
  }

  if (slide.type === 'iceberg') {
    const above = ['workouts', 'exercises', 'sets', 'reps'];
    const below = [
      'nutrition', 'sleep', 'recovery', 'daily structure',
      'consistency', 'accountability', 'stress management',
      'environment', 'communication', 'weekly planning',
      'progress tracking', 'returning after bad days',
    ];
    return (
      <div className="ws-slide" style={{ maxWidth: '680px' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.46rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#3A3A3A', marginBottom: '0.8rem' }}>above the surface</div>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            {above.map((item, i) => (
              <span key={i} style={{ fontSize: 'clamp(0.88rem, 1.4vw, 1.1rem)', fontWeight: 200, color: '#EDEDE8', letterSpacing: '-0.01em' }}>{item}</span>
            ))}
          </div>
        </div>

        <div style={{ borderTop: '1px solid #5A5A5A', margin: '1.2rem 0', position: 'relative' }}>
          <span style={{ position: 'absolute', top: '-0.55rem', left: 0, fontFamily: 'ui-monospace, monospace', fontSize: '0.4rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#3A3A3A', background: '#000', paddingRight: '0.6rem' }}>surface</span>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.46rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#2a2a2a', marginBottom: '0.8rem' }}>below the surface — the rest of the week</div>
          <div style={{ display: 'flex', gap: '0.5rem 1.5rem', flexWrap: 'wrap' }}>
            {below.map((item, i) => (
              <span key={i} style={{ fontSize: 'clamp(0.68rem, 1vw, 0.8rem)', color: '#3A3A3A' }}>{item}</span>
            ))}
          </div>
        </div>

        <div style={{ borderTop: '1px solid #141414', paddingTop: '1.2rem' }}>
          <p style={{ fontSize: 'clamp(0.72rem, 1.1vw, 0.85rem)', color: '#5A5A5A', fontStyle: 'italic', lineHeight: 1.7, marginBottom: '0.7rem' }}>
            the session is where we train. the rest of the system is what makes the training count.
          </p>
          <p style={{ fontSize: 'clamp(0.72rem, 1.1vw, 0.85rem)', color: '#3A3A3A', fontStyle: 'italic', lineHeight: 1.7 }}>
            you are not paying me to tell you to work out. you are paying for a system that keeps the rest of your life from pulling you away from the result.
          </p>
        </div>
      </div>
    );
  }

  if (slide.type === 'value-stack') {
    const items = [
      'personalized three-day training program',
      'exercise instructions and progression targets',
      'nutrition structure built around your lifestyle',
      'personalized grocery framework',
      'daily missions',
      'weekly planning',
      'daily accountability check-ins',
      'weekly progress reviews',
      'direct coach messaging',
      'form-video feedback',
      'program adjustments',
      'strength tracking',
      'consistency tracking',
      'work-accountability support',
      'presence goals for friends and family',
      'recovery guidance',
      'personalized client dashboard',
      'end-of-program continuation plan',
    ];
    return (
      <div className="ws-slide">
        <div className="ws-label">what the eight weeks actually include</div>
        <h1 className="ws-headline ws-headline-sm" style={{ marginBottom: '1.8rem' }}>everything inside<br />the eight weeks.</h1>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem 3rem', maxWidth: '660px', marginBottom: '1.8rem' }}>
          {items.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.55rem', alignItems: 'baseline' }}>
              <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.5rem', color: GREEN, flexShrink: 0 }}>✓</span>
              <span style={{ fontSize: 'clamp(0.62rem, 0.9vw, 0.74rem)', color: '#EDEDE8', lineHeight: 1.5 }}>{item}</span>
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid #141414', paddingTop: '1.2rem', maxWidth: '560px' }}>
          <p style={{ fontSize: 'clamp(0.72rem, 1.1vw, 0.85rem)', color: '#5A5A5A', fontStyle: 'italic', lineHeight: 1.7 }}>
            this is not a collection of random features. every part supports your ability to stay consistent.
          </p>
        </div>
      </div>
    );
  }

  if (slide.type === 'demo') {
    return (
      <div className="ws-slide ws-demo-slide">
        <div style={{ display: 'inline-block' }}>
          <div className="ws-demo-badge">client portal</div>
        </div>
        <h1 className="ws-headline ws-headline-sm" style={{ marginTop: '1rem' }}>your dashboard.</h1>
        <p className="ws-body ws-body-spaced">everything in one place. walk through it now.</p>
        <div className="ws-demo-instruction">→ open /portal/iinn-demo</div>
      </div>
    );
  }

  if (slide.type === 'roadmap') return <RoadmapSlide />;

  if (slide.type === 'fit-who') {
    return (
      <div className="ws-slide">
        <div className="ws-label">who this is built for</div>
        <h1 className="ws-headline ws-headline-sm" style={{ marginBottom: '2rem' }}>the right fit.</h1>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4vw', maxWidth: '720px' }}>
          <div>
            <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.46rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: GREEN, marginBottom: '1rem' }}>{slide.left.label}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {slide.left.items.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.65rem', alignItems: 'baseline' }}>
                  <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.5rem', color: GREEN, flexShrink: 0 }}>✓</span>
                  <span style={{ fontSize: 'clamp(0.65rem, 1vw, 0.78rem)', color: '#EDEDE8', lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.46rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#3A3A3A', marginBottom: '1rem' }}>{slide.right.label}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {slide.right.items.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.65rem', alignItems: 'baseline' }}>
                  <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.5rem', color: '#2a2a2a', flexShrink: 0 }}>—</span>
                  <span style={{ fontSize: 'clamp(0.65rem, 1vw, 0.78rem)', color: '#5A5A5A', lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (slide.type === 'pre-price') {
    return (
      <div className="ws-slide" style={{ justifyContent: 'center', maxWidth: '70vw', margin: '0 auto', padding: '5vw 8vw' }}>
        <p style={{ fontSize: 'clamp(0.72rem, 1.05vw, 0.85rem)', color: '#3A3A3A', marginBottom: '2rem' }}>based on everything i showed you —</p>
        <h1 className="ws-headline" style={{ marginBottom: '2.5rem', lineHeight: 1.2 }}>
          does this feel like the kind of structure you were actually missing?
        </h1>
        <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.46rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#1a1a1a' }}>
          wait for his answer. then advance.
        </div>
      </div>
    );
  }

  if (slide.type === 'investment') {
    return (
      <div className="ws-slide" style={{ justifyContent: 'center', maxWidth: '70vw', margin: '0 auto', padding: '4vw 8vw' }}>
        <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.52rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#3A3A3A', marginBottom: '0.5rem' }}>vveritas*</div>
        <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.48rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#3A3A3A', marginBottom: '2.5rem' }}>8-week consistency rebuild</div>
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.5rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#3A3A3A', marginBottom: '0.8rem' }}>total investment</div>
          <div style={{ fontSize: 'clamp(3.5rem, 7vw, 6rem)', fontWeight: 200, letterSpacing: '-0.05em', color: '#EDEDE8', lineHeight: 1 }}>
            {fmt(PRICE_8W)}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0', maxWidth: '420px', marginBottom: '2rem' }}>
          {[
            { label: 'pay in full',    amount: fmt(PRICE_8W),  note: 'immediate start.' },
            { label: 'two payments',   amount: div2(PRICE_8W), note: 'split over the program.' },
            { label: 'four payments',  amount: div4(PRICE_8W), note: 'monthly.' },
          ].map((opt, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '8rem 1fr', gap: '1rem', alignItems: 'center', padding: '0.75rem 0', borderBottom: '1px solid #0d0d0d' }}>
              <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.44rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: i === 0 ? '#EDEDE8' : '#3A3A3A' }}>{opt.label}</span>
              <div>
                <span style={{ fontSize: i === 0 ? 'clamp(1rem, 1.6vw, 1.25rem)' : 'clamp(0.82rem, 1.2vw, 0.95rem)', fontWeight: 200, color: i === 0 ? '#EDEDE8' : '#5A5A5A' }}>{opt.amount}</span>
                <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.42rem', color: '#3A3A3A', marginLeft: '0.7rem' }}>{opt.note}</span>
              </div>
            </div>
          ))}
        </div>
        <p style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.44rem', letterSpacing: '0.08em', color: '#2a2a2a', fontStyle: 'italic' }}>
          installment plans divide the total. they are not discounts. start date confirmed once first payment is received.
        </p>
      </div>
    );
  }

  if (slide.type === 'close') {
    const followUp = [
      `[pause — wait for his answer without filling the silence]`,
      `if yes → "tell me exactly what you're committing to."`,
      `[let him answer in his own words — do not interrupt]`,
      `then → "good. based on that, i'm comfortable moving forward with you."`,
      `then open /enroll/iinn`,
    ];
    return (
      <div className="ws-slide">
        <h1 className="ws-headline" style={{ marginBottom: '2.5rem' }}>
          are you ready to commit<br />to that standard?
        </h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', maxWidth: '520px' }}>
          {followUp.map((line, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.65rem', alignItems: 'baseline' }}>
              <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.52rem', color: '#2a2a2a', flexShrink: 0 }}>—</span>
              <span style={{ fontSize: 'clamp(0.72rem, 1.1vw, 0.85rem)', color: line.startsWith('[') ? '#3A3A3A' : '#5A5A5A', lineHeight: 1.5, fontFamily: line.startsWith('[') ? 'ui-monospace, monospace' : 'inherit', letterSpacing: line.startsWith('[') ? '0.04em' : 'inherit' }}>
                {line}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (slide.type === 'objections') return <ObjectionsSlide slide={slide} />;

  if (slide.type === 'cta') {
    return (
      <div className="ws-slide ws-cta-slide">
        <h1 className="ws-headline" style={{ whiteSpace: 'pre-line' }}>{slide.headline}</h1>
        <p className="ws-body ws-body-spaced">{slide.body}</p>
        <p className="ws-cta-sub">{slide.sub}</p>
        <div className="ws-cta-mark">vveritas* — built for {prospectName}</div>
      </div>
    );
  }

  return null;
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function IinnPitch() {
  const [entered, setEntered]     = useState(false);
  const [idx, setIdx]             = useState(0);
  const [showNotes, setShowNotes] = useState(false);

  useEffect(() => {
    if (!entered) return;
    function onKey(e) {
      if (e.key === 'ArrowRight' || e.key === ' ') setIdx(i => Math.min(i + 1, SLIDES.length - 1));
      if (e.key === 'ArrowLeft') setIdx(i => Math.max(i - 1, 0));
      if (e.key === 'n' || e.key === 'N') setShowNotes(s => !s);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [entered]);

  if (!entered) {
    return (
      <div className="ws-enter">
        <div className="ws-enter-inner">
          <div className="ws-enter-title">{`vveritas*\nbuilt for ${prospectName}.`}</div>
          <div className="ws-enter-sub">remote coaching — 8-week consistency rebuild</div>
          <button className="ws-enter-btn" onClick={() => setEntered(true)}>begin →</button>
        </div>
      </div>
    );
  }

  const total = SLIDES.length;
  const slide = SLIDES[idx];
  const pct   = ((idx + 1) / total) * 100;

  return (
    <div className="ws-root">
      <div className="ws-progress">
        <div className="ws-progress-fill" style={{ width: `${pct}%` }} />
      </div>

      <div className="ws-stage" key={idx}>
        <Slide slide={slide} />
      </div>

      {showNotes && slide.notes && (
        <div className="ws-notes">
          <div className="ws-notes-label">speaker notes</div>
          <div className="ws-notes-text">{slide.notes}</div>
        </div>
      )}

      <nav className="ws-nav">
        <button className="ws-nav-btn" onClick={() => setIdx(i => Math.max(i - 1, 0))} disabled={idx === 0}>←</button>
        <div className="ws-nav-center">
          <span className="ws-counter">{idx + 1} / {total}</span>
          <button className="ws-notes-toggle" onClick={() => setShowNotes(s => !s)}>
            {showNotes ? 'hide notes' : 'notes'}
          </button>
        </div>
        <button className="ws-nav-btn" onClick={() => setIdx(i => Math.min(i + 1, total - 1))} disabled={idx === total - 1}>→</button>
      </nav>
    </div>
  );
}
