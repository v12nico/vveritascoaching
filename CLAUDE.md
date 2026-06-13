# vveritas* coaching — project context

This file is for any developer or AI agent working on this codebase. Read it fully before touching anything.

---

## what this is

A coaching website for Nico (vveritas*, @_v12nico on Instagram). Sells coaching packages and AI-generated programs. Everything here reflects his brand — the aesthetic, the voice, the philosophy. Do not deviate from it without asking.

---

## tech stack

- **Next.js 16** — App Router, all files are `.js` (not TypeScript)
- **React 19**
- **Plain CSS** — all styles in `app/globals.css`, class-based, no Tailwind
- **Resend** — transactional email (inquiries + plan delivery)
- **Anthropic SDK** (`@anthropic-ai/sdk`) — Claude sonnet-4-6 for plan generation
- **Stripe** — payment links via env vars, opened via `window.open()` before any `await`

---

## brand aesthetic — do not break this

**Colors (CSS variables):**
```css
--black:   #000000   /* background everywhere */
--text:    #EDEDE8   /* primary text */
--dim:     #5A5A5A   /* secondary / muted text */
--ghost:   #3A3A3A   /* borders, labels */
--oxblood: #5C1A1A   /* selection highlight only */
```

**Typography:**
- Font: Inter, weights 200 and 300 only. Never 400+ on body text.
- Headings: `font-weight: 200`, tight letter-spacing (`-0.02em` to `-0.03em`)
- Labels / monospace: `ui-monospace, 'SF Mono', Menlo, monospace`
- All copy is lowercase. No title case. No caps except CSS `letter-spacing` labels.

**Grain:** Animated film grain overlay on the entire page (`.grain` div in layout.js). Do not remove.

**Photo frames:** `border: 1px solid var(--ghost)`, `padding: 14px`, inner vignette shadow.

**Spacing:** Generous. Pages breathe. Don't crowd elements.

**Animations:** Subtle only. `fadeUp` on landing mark, `fadeIn` on enter link. Page transitions via CSS (`animation: fadeIn 0.3s`).

---

## voice — critical

Everything written for this site follows this voice:

- Lowercase. Always.
- Direct. No hype. No exclamation points.
- Like a knowledgeable friend talking to you, not a brand.
- Short sentences. No filler.
- Examples: "the system, taught directly." / "answer honest. the plan is only as real as the intake." / "2 sets to failure. heavy. every movement has a reason."

Apply this voice to: page copy, form labels, button text, error messages, AI-generated plan prompts, email subjects.

---

## project structure

```
app/
  page.js                    — landing (vveritas* mark, enter →)
  layout.js                  — root layout, grain overlay, Inter font
  globals.css                — ALL styles live here
  not-found.js               — 404 void page
  work/page.js               — menu page (coaching + programs + photos)
  blueprint/page.js          — offer page
  mentorship/page.js         — offer page
  competitor/page.js         — offer page
  meal-plan/
    page.js                  — offer page with secondary link to /build
    build/page.js            — intake form → preview → stripe gate
    complete/page.js         — post-payment: generates + emails full plan
  workout/
    page.js                  — offer page
    build/page.js            — intake form → preview → stripe gate
    complete/page.js         — post-payment: generates + emails full plan
  bundle/page.js             — offer page
  ready/page.js              — inquiry form (name, email, what they're looking for)
  edge/page.js               — (trading content page)
  system/page.js             — (system page)
  partnership/page.js        — (partnership page)
  api/
    submit/route.js          — handles /ready form → email via Resend
    submit/meal-plan/route.js — emails full meal plan after payment
    submit/workout/route.js   — emails full workout after payment
    generate/meal-plan/route.js — Claude API: preview (500 tok) or full (3000 tok)
    generate/workout/route.js   — Claude API: preview (600 tok) or full (3500 tok)

components/
  Back.js     — fixed back arrow, takes `href` prop (default: /work)
  Footer.js   — "vveritas* — mmxxvi" + instagram ↗
  OfferPage.js — shared wrapper for all offer pages (title, priceLine, children, from, secondary)

public/
  nico.jpg    — competition photo (primary, top)
  nico2.jpg   — double bicep gym photo (secondary, below)
```

---

## how offer pages work

All offer pages use the `OfferPage` component:

```jsx
<OfferPage
  title="the blueprint"
  priceLine="$250 — one-time"
  from="the blueprint"           // passed to /ready?from= query param
  secondary={<Link href="...">already purchased? →</Link>}
>
  <p>copy here</p>
</OfferPage>
```

The `from` param is picked up by `/ready` to pre-fill the product context and open the right Stripe link.

---

## preview gate flow (meal plan + workout)

1. User fills intake form on `/meal-plan/build` or `/workout/build`
2. Submits → hits `/api/generate/[type]` with `preview: true`
3. Claude returns short teaser (~500 tokens): intro + one day / one section
4. Teaser shown, rest blurred with overlay
5. "unlock it — $50 →" opens `NEXT_PUBLIC_STRIPE_[PRODUCT]` via `window.open()` BEFORE any await (critical — prevents popup blocker)
6. Form data saved to `sessionStorage`
7. Stripe redirects to `/meal-plan/complete` or `/workout/complete`
8. Complete page pulls form from sessionStorage, generates full plan (3000–3500 tokens), displays it, emails it via Resend to client + `ncortezwilliams@gmail.com`

**Never call `window.open()` after an `await`.** The popup will be blocked. Always open synchronously first, then do async work.

---

## AI generation — Nico's philosophy encoded

### nutrition (meal plan)
- Primal/ancestral: grass-fed beef, pasture-raised eggs, raw dairy, wild-caught fish, fruit, raw honey
- NO seed oils ever (canola, vegetable, sunflower, etc.) — tallow, ghee, coconut oil only
- No leafy greens in plans
- Minimize grains — sweet potato occasional only, no white rice
- Circadian-aligned eating windows
- Macro cycling: never combine heavy carb + heavy fat in same meal
- Budget tiers: tight = ground beef/eggs/canned fish, open = raw dairy/wild salmon/bison
- Voice in output: direct, lowercase, like a knowledgeable friend

### training (workout)
- 2 sets to failure. Heavy. That's the system.
- Rep range: 3–7 reps. Heavy enough to grind, light enough to keep perfect form.
- Beginners: 8–12 reps, form mastery first
- Splits: PPL (3x or 6x/week), Upper/Lower (4x), Full Body (3x)
- Push: flat press, incline press, fly / lateral raise, OHP / tricep pushdown
- Pull: lat pulldown, seated row, upper back row / rear delt / barbell curl, hammer curl
- Legs: squat, hip thrust, leg extension, leg curl or RDL, calf raise, adductors/abductors
- Progressive overload is the only variable that matters long term

Model: always `claude-sonnet-4-6`. Never downgrade.

---

## environment variables

```
ANTHROPIC_API_KEY                  — Claude API
RESEND_API_KEY                     — email delivery
NEXT_PUBLIC_STRIPE_BLUEPRINT       — $250 payment link
NEXT_PUBLIC_STRIPE_MENTORSHIP      — $500 payment link
NEXT_PUBLIC_STRIPE_COMPETITOR      — $1,000 payment link
NEXT_PUBLIC_STRIPE_MEALPLAN        — $50 payment link
NEXT_PUBLIC_STRIPE_WORKOUT         — $50 payment link
NEXT_PUBLIC_STRIPE_BUNDLE          — $100 payment link
```

Set in `.env.local` for local dev, Vercel dashboard for production.

---

## deployment

- **GitHub:** github.com/v12nico/vveritascoaching
- **Vercel:** auto-deploys on every push to `main`
- **Local dev:** `npm run dev` → runs on port 3001 (VANTA occupies 3000)

---

## things to never do

- Never use TypeScript in this project (everything is `.js`)
- Never add Tailwind
- Never use title case in copy
- Never add entry/exit price fields to the trade log (simplified to just P&L)
- Never expose API keys client-side
- Never call `window.open()` after an `await`
- Never change the color palette without Nico's approval
- Never write comments explaining what code does — only write comments for non-obvious WHY
