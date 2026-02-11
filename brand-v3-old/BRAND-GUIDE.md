# Solvency AI - Brand Guidelines V3
## Institutional Grade Identity

**Version:** 3.0 (Institutional Pivot)  
**Target Aesthetic:** Maple Finance / Bloomberg Terminal Credibility  
**Last Updated:** 2026-02-11

---

## Brand Philosophy

### "Intelligent Infrastructure"

Solvency AI is **financial infrastructure**, not a consumer product. Every design decision prioritizes:

1. **Credibility over creativity** - Could this appear in a VC pitch deck?
2. **Clarity over cleverness** - Institutional clients value transparency
3. **Precision over personality** - Professional, not playful

**Design Principle:**  
If it wouldn't look appropriate on a Bloomberg terminal, it doesn't belong in our brand.

---

## Logo System

### Primary Mark: The Sentinel

**Concept:**  
A geometric "S" constructed from flowing curves that create subtle "watchful" marks through negative space—referencing the owl requirement without illustration.

**Design Elements:**
- **S-form curves**: Mathematical precision, not hand-drawn
- **Negative space**: Two subtle accent dots suggest "eyes" (watchful intelligence)
- **Stroke-based**: Professional line work, not filled shapes
- **Monochromatic focus**: Ice blue (#4A90E2) primary, gold (#C9A959) accents

**Files:**
- `logo-mark.svg` - Icon only (512x512 base)
- `logo-wordmark.svg` - Full horizontal lockup
- `logo-mark-{size}.png` - Exports: 32, 64, 128, 400, 512px

### Usage Rules

**✅ DO:**
- Use on dark backgrounds (#0A1628 or darker)
- Maintain minimum 32px clear space around mark
- Scale proportionally only
- Use provided color values exactly

**❌ DON'T:**
- Add effects (shadows, glows, gradients beyond spec)
- Place on light backgrounds without adjustment
- Stretch or distort
- Animate (exception: subtle fade-in only)
- Use playful or casual contexts

### Minimum Sizes
- **Favicon:** 32px (legible, dots visible)
- **Profile pictures:** 400px (recommended)
- **Print:** 0.5 inches minimum

---

## Color Palette

### Institutional Navy System

| Name | Hex | RGB | Usage | WCAG AA |
|------|-----|-----|-------|---------|
| **Midnight Navy** | `#0A1628` | 10, 22, 40 | Primary background | Base |
| **Deep Navy** | `#1B2B44` | 27, 43, 68 | Card backgrounds, sections | ✓ |
| **Steel Blue** | `#2D4A6C` | 45, 74, 108 | Borders, dividers | ✓ |
| **Ice Blue** | `#4A90E2` | 74, 144, 226 | Primary accent, links, CTAs | ✓ |
| **Muted Gold** | `#C9A959` | 201, 169, 89 | Highlights, APY, success | ✓ |
| **Frost** | `#E8EDF2` | 232, 237, 242 | Primary text, headings | ✓ |
| **Silver** | `#9BA8B8` | 155, 168, 184 | Body text, secondary | ✓ |

### Color Psychology

- **Navy tones**: Trust, stability, finance (banks, terminals)
- **Ice Blue**: Technology, precision, clarity
- **Muted Gold**: Value, yield, premium (not flashy)
- **High contrast**: Accessibility and credibility

### Accessibility
All color combinations meet WCAG AA standards for contrast (4.5:1 minimum).

---

## Typography

### Font Stack

**Primary:** Inter or system fallback
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', system-ui, sans-serif;
```

**Monospace:** For code, addresses, stats
```css
font-family: 'JetBrains Mono', 'IBM Plex Mono', 'Courier New', monospace;
```

### Hierarchy

```
H1: 64px / 700 weight / -2px letter-spacing
H2: 48px / 700 weight / -1px letter-spacing
H3: 24px / 600 weight / 0px letter-spacing
Body: 18px / 400 weight / 1.7 line-height
Small: 14px / 500 weight / 1px letter-spacing (uppercase)
```

### Rules

- **No text gradients** - Solid colors only
- **Generous line height** - 1.6-1.7 for readability
- **Tight heading tracking** - Professional, not loose
- **Uppercase sparingly** - Labels and tags only

---

## Design System

### Cards

```css
background: rgba(27, 43, 68, 0.5);
border: 1px solid rgba(74, 144, 226, 0.1);
border-radius: 12px;
padding: 40px;
transition: border-color 0.3s, transform 0.3s;
```

**Hover:**
```css
border-color: rgba(74, 144, 226, 0.3);
transform: translateY(-4px);
```

### Buttons

**Primary (CTA):**
```css
background: #4A90E2;
color: #FFFFFF;
border-radius: 6px;
padding: 14px 32px;
font-weight: 600;
```

**Secondary (Ghost):**
```css
background: transparent;
border: 1px solid #4A90E2;
color: #4A90E2;
```

### Stats Display

Large numbers with context:
```html
<div class="stat">
  <div class="value">8.5%</div>
  <div class="label">ANNUAL YIELD</div>
</div>
```

**Value:** 56px / 700 weight / Ice Blue  
**Label:** 14px / 600 weight / Silver / Uppercase / 2px tracking

### Spacing System

Use 8px base unit:
- **Tight:** 8px, 16px
- **Medium:** 24px, 32px
- **Generous:** 48px, 64px
- **Section:** 120px vertical padding

---

## Token Symbol

### solvUSD

**S**olana **Y**ie**LD**

**Rationale:**
1. Clear meaning - "yield" is in the name
2. Professional - 4 characters, standard format
3. Memorable - Pronounceable ("sild" or "S-yield")
4. Solana reference - "S" prefix convention
5. Not memey - Serious token for serious infrastructure

**Usage:**
- Always prefix with "$" in marketing (solvUSD)
- No prefix in technical contexts (SYLD token address)
- Uppercase only (never $syld)

---

## Voice & Tone

### Institutional Shift (V1/V2 → V3)

**Before (Too Casual):**
> "Your bot woke you up at 3am because it ran out of API credits. What if it just... funded itself?"

**After (Institutional):**
> "Autonomous agents require sustainable infrastructure for API access and operational costs. Solvency AI provides yield-bearing collateralized assets enabling self-funding operations."

### Messaging Principles

1. **Statements over questions** - Assert, don't ask
2. **Agents, not bots** - Professional terminology
3. **Infrastructure, not product** - Position as foundational
4. **Specific numbers** - 6-9% APY (target), 1:1 collateralized
5. **Technical accuracy** - No handwaving

### Approved Phrases

✅ **Use:**
- "Yield-bearing infrastructure"
- "Autonomous agent operations"
- "Fully collateralized stablecoin"
- "Self-funding capabilities"
- "Institutional-grade security"
- "Built on Solana"

❌ **Avoid:**
- "Revolutionary" / "game-changing"
- "To the moon" / crypto slang
- "Your bot" (too casual)
- "What if..." (no hypotheticals)
- Excessive emojis
- Hype language

---

## Twitter Assets

### Profile Picture (400x400)

**File:** `twitter-profile-400.png`

**Specifications:**
- Logo mark centered on #0A1628 background
- Full bleed circular format
- Subtle border (optional): 2px #2D4A6C at 30% opacity
- Accent dots visible at small sizes

### Banner (1500x500)

**File:** Generate from `twitter-banner.html`

**Layout:**
- **Background:** Dark navy gradient (#0A1628 → #1B2B44)
- **Left 60%:** SOLVENCY AI wordmark + subtitle
- **Right 40%:** Stats (6-9% APY (target), 1:1 USDC, Solana)
- **Subtle watermark:** Logo at 8% opacity, right side
- **Footer:** "Built for Colosseum Agent Hackathon" (small, bottom-left)

**Design Elements:**
- No bright colors
- Minimal animation (none preferred)
- Professional typography
- Stats-focused (credibility)

### Bio

**160 character version:**
> Yield-bearing infrastructure for autonomous AI agents. 6-9% APY (target), fully collateralized on Solana. Built at @Colosseum_org hackathon.

**Shorter version (140 chars):**
> Yield-bearing stablecoin for autonomous agents. 6-9% APY (target) on Solana. Self-funding infrastructure. Built for @Colosseum_org.

---

## Website Design

### Architecture

**Domain:** solvency.money

**Structure:**
1. **Hero** - Value proposition + CTAs
2. **Stats Bar** - APY, TVL, collateral ratio
3. **How It Works** - 4-step process
4. **Value Props** - 6 key benefits
5. **Security** - Technical architecture
6. **CTA** - GitHub + Colosseum links
7. **Footer** - Links + legal

### Design Language

**Inspired by:** Maple Finance

**Characteristics:**
- Dark theme mandatory (#0A1628 background)
- Generous whitespace
- Minimal animation (fade-in only)
- Grid-based layout (12 columns, 1200px max-width)
- Cards with subtle borders
- No glassmorphism, no gradients (except logo)
- Professional typography hierarchy
- Fast loading (<2 seconds)

### Key Metrics Display

Always visible above fold:
- **6-9% APY (target)** (gold color)
- **1:1 USDC Backed** (ice blue)
- **TVL** (dynamic, starts at $0.00)
- **100% Autonomous** (credibility)

### Mobile Responsive

- Breakpoint: 768px
- Stack cards vertically
- Maintain readability (minimum 16px body)
- Simplify navigation (hamburger menu)

---

## Usage Examples

### Social Media Post

**LinkedIn/Twitter (Institutional tone):**
> Solvency AI provides yield-bearing infrastructure for autonomous agents operating on Solana.
>
> 6-9% APY (target) | Fully collateralized | Self-funding capabilities
>
> Built for the Colosseum Agent Hackathon.
>
> [Link to GitHub]

### Email Signature

```
━━━━━━━━━━━━━━━━━━━
Solvency AI
Yield-Bearing Infrastructure

🔗 solvency.money
📊 6-9% APY (target) | Solana
━━━━━━━━━━━━━━━━━━━
```

### Hackathon Pitch (60 seconds)

"Autonomous agents require sustainable infrastructure for operational costs—API calls, compute, data access. Current solutions require manual funding, credit cards, or centralized payment rails.

Solvency AI is a fully collateralized stablecoin generating 6-9% APY (target) through DeFi strategies on Solana. Agents can hold solvUSD, earn yield autonomously, and convert earnings to API credits.

One-to-one USDC backing. Open-source smart contracts. Emergency controls. Institutional-grade security.

We're live on Solana devnet, submitted to the Colosseum Agent Hackathon. Infrastructure for the autonomous economy."

---

## Competitive Positioning

### We Are Positioned As:

✅ **Financial infrastructure** (like Stripe, Plaid)  
✅ **Developer tooling** (like Helius, Alchemy)  
✅ **Institutional DeFi** (like Maple Finance, Aave)

### We Are NOT:

❌ Meme coin  
❌ Yield farming protocol  
❌ Consumer wallet app  
❌ Trading platform

### Closest Comparables:

- **Maple Finance** - Institutional lending (aesthetic reference)
- **Coinbase** - Trust and credibility
- **Aave** - Serious DeFi protocol
- **Stripe** - Developer-first infrastructure

---

## Brand Checklist

Before publishing any asset:

**Logo & Identity:**
- [ ] Logo is legible at smallest size (32px minimum)
- [ ] Colors match brand palette exactly
- [ ] No unauthorized effects (glows, shadows, etc.)
- [ ] Dark background maintained

**Copy & Voice:**
- [ ] Institutional tone (not casual or playful)
- [ ] Specific numbers provided (6-9% APY (target), 1:1 backing)
- [ ] No hype language or crypto slang
- [ ] Technical accuracy verified

**Design & Layout:**
- [ ] Generous whitespace
- [ ] Professional typography (Inter or system)
- [ ] High contrast (WCAG AA)
- [ ] Minimal animation (fade-in only)
- [ ] Fast loading (<2s target)

**Technical:**
- [ ] SVG optimized (clean code, no unnecessary elements)
- [ ] PNG exports at correct sizes
- [ ] Responsive design tested (mobile + desktop)
- [ ] Accessibility tested (screen readers, keyboard nav)

---

## File Inventory

### Logo Files
```
brand-v3/assets/
  ├── logo-mark.svg           # Icon only (vector)
  ├── logo-wordmark.svg       # Full horizontal lockup
  ├── logo-mark-32.png        # Favicon size
  ├── logo-mark-64.png        # Small UI
  ├── logo-mark-128.png       # Standard icon
  ├── logo-mark-400.png       # Twitter profile
  └── logo-mark-512.png       # High-res
```

### Twitter Assets
```
  ├── twitter-profile.svg     # Profile pic (vector)
  ├── twitter-profile-400.png # Twitter optimized
  └── twitter-banner.html     # Banner generator
```

### Website
```
  └── index.html              # Landing page
```

### Documentation
```
  ├── BRAND-STRATEGY.md       # Design rationale
  ├── BRAND-GUIDE.md          # This file
  └── TOKEN-SPEC.md           # solvUSD specifications
```

---

## Version History

**V3.0 (Current)** - Institutional pivot
- Maple Finance aesthetic
- Professional color palette (navy + ice blue)
- Subtle owl reference (geometric, not illustrated)
- Bloomberg terminal credibility

**V2.0** - Purple/gold gradient, playful owl eyes
- *Rejected:* Too playful, not institutional

**V1.0** - Electric blue/cyan, generic "S"
- *Rejected:* Too generic, no differentiation

---

## Contact & Support

**Repository:** github.com/solvency-ai  
**Documentation:** docs.solvency.money  
**Twitter:** @solvency_ai  
**Hackathon:** Colosseum Agent Hackathon (Feb 2026)

---

**Brand Status:** Ready for Production  
**Target:** VC Pitch / Institutional Credibility  
**Deadline:** Hackathon submission (~9 hours)
