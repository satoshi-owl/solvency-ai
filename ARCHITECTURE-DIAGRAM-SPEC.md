# SolvencyAI Architecture Diagram Specification

## Diagram Style
- Clean, institutional aesthetic (match solvency.money brand)
- Navy (#0F2D52) and Gold (#C9A961) accent colors
- White/light gray background
- Simple geometric shapes, clear arrows
- Professional font (SF Pro Display or similar)

---

## Main Flow Diagram

### Components (Left to Right)

**[1. Agent]**
- Icon: Robot or AI symbol
- Label: "Autonomous Agent"
- Color: Navy outline, white fill

→ *Arrow labeled: "Deposits USDC"*

**[2. Vault Smart Contract]**
- Icon: Shield or vault symbol
- Label: "Solana Vault (Anchor)"
- Sub-labels:
  - "Deposit"
  - "Mint solvUSD"
  - "Withdraw"
  - "Emergency Pause"
- Color: Navy fill, white text

→ *Arrow labeled: "1:1 mint"*

**[3. solvUSD Token]**
- Icon: Coin or token symbol
- Label: "solvUSD (SPL Token)"
- Sub-label: "Fully Collateralized"
- Color: Gold fill, navy text

→ *Arrow labeled: "Deploy to DeFi"*

**[4. DeFi Protocols]**
- Icons: Stack of protocol logos (Kamino, Marginfi)
- Label: "Yield Strategies"
- Sub-label: "6-9% APY"
- Color: Light gray fill, navy outlines

→ *Arrow labeled: "Yield returns"*

**[Back to Vault]**
- Loop arrow showing yield accumulation

→ *Arrow labeled: "Convert to credits"*

**[5. AgentWallet]**
- Icon: Wallet symbol
- Label: "AgentWallet API"
- Sub-label: "Automated Conversions"
- Color: Navy outline, white fill

→ *Arrow labeled: "API Credits"*

**[Back to Agent]**
- Arrow completing the cycle
- Label: "Self-Funding Operations"

---

## Security Layer (Bottom)

**Sidebar or bottom panel showing:**

**[Security Features]**
- ✓ Mint authority locked
- ✓ Ownership validation
- ✓ Checked arithmetic
- ✓ Deposit caps
- ✓ Emergency pause
- ✓ Multi-signature admin

Color: Light navy background, white text

---

## Tech Stack (Top Right Corner)

**Small badges:**
- Solana
- Anchor v0.30.1
- AgentWallet
- Kamino
- Marginfi
- Node.js

---

## Callout Boxes (Floating)

**[1] Near Vault:**
"Fully Collateralized
Every solvUSD = 1 USDC
Always redeemable"

**[2] Near DeFi Protocols:**
"Conservative Strategies
Overcollateralized lending only
No leverage, no algo stables"

**[3] Near AgentWallet:**
"Autonomous Operation
No human intervention
Yield → Credits conversion"

---

## Alternative Layout: Vertical Flow

For mobile or portrait orientation:

```
[Agent]
   ↓ Deposit USDC
[Vault] ← Mint solvUSD → [solvUSD Token]
   ↓ Deploy capital
[DeFi Protocols]
   ↓ Generate yield
[Vault] ← Accumulate
   ↓ Convert
[AgentWallet]
   ↓ Credits
[Agent] ← Self-funding
```

---

## Color Palette (Exact values)

- Navy: #0F2D52
- Gold: #C9A961
- White: #FFFFFF
- Light Gray: #F8F9FA
- Medium Gray: #5A6B7F
- Border: #E8EBED

---

## Export Formats

1. **PNG** (for documentation, forum posts)
   - Size: 1920x1080 (16:9)
   - Resolution: 300 DPI
   - Transparent or white background

2. **SVG** (for website, scalable)
   - Clean paths
   - Web-optimized

3. **PDF** (for presentations)
   - Vector format
   - Print-ready

---

## Tools to Create

**Option A: Figma** (Professional)
- Use components for consistency
- Export multiple sizes
- Shareable link for collaboration

**Option B: draw.io / Excalidraw** (Quick)
- Free, web-based
- Good for rough drafts
- Export to PNG/SVG

**Option C: Code (Programmatic)**
- D3.js or mermaid.js
- Version-controllable
- Easy to update

**Option D: AI Generation**
- Describe to DALL-E / Midjourney
- Requires manual cleanup
- Fast iteration

---

## Recommended Approach

1. Start with draw.io quick draft (30 min)
2. Refine in Figma for final version (1 hour)
3. Export all formats
4. Include in README, forum post, demo video

**Priority:** Get a working draft fast, polish later if time permits.
