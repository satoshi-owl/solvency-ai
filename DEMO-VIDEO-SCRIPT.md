# Solvency AI - Demo Video Script

**Target Length:** 4-5 minutes  
**Format:** Screen recording + voiceover  
**Tone:** Professional but accessible

---

## SCENE 1: Hook (15 seconds)

**Visual:** Title card with Solvency AI logo (if we have one) OR clean text

**Script:**
> "What if your stablecoin could earn 9% APY (growth tier) while staying stable? And what if AI agents could fund themselves indefinitely using that yield? That's Solvency AI."

---

## SCENE 2: The Problem (30 seconds)

**Visual:** Text/diagrams showing the pain points

**Script:**
> "DeFi has two problems: First, stablecoins sit idle earning nothing, while users chase yield in risky protocols. Second, AI agents need constant funding—API credits, compute costs, transaction fees. Once the money runs out, they stop working.
>
> Solvency AI solves both with a single innovation: a yield-bearing stablecoin that generates 6-9% APY (target) and converts that yield into operational resources for autonomous agents."

---

## SCENE 3: How It Works (60 seconds)

**Visual:** Architecture diagram from ARCHITECTURE.md

**Script:**
> "Here's the system: Users deposit USDC into our Solana vault contract. They receive solvUSD tokens—a stablecoin backed 1-to-1 by their USDC. Their capital doesn't just sit there. Our autonomous agent deploys it across Solana's most trusted DeFi protocols: Kamino, Marginfi, and Save.
>
> The agent continuously monitors yields, rebalances capital to maximize returns within safe parameters, and harvests rewards. It operates 24/7, no human intervention needed.
>
> Users can stake their solvUSD for even higher yields—flexible staking gives 7%, locked staking up to 10%. And here's the magic: that yield can be converted into API credits, compute resources, or transaction fees. Bots can literally fund their own operations forever."

---

## SCENE 4: Code Walkthrough (90 seconds)

**Visual:** Split screen: contract code on left, explanation on right

**Script:**
> "Let's look at the code. This is our vault program, written in Rust using the Anchor framework for Solana.
>
> [Show deposit function]
> When a user deposits, the contract transfers their USDC to the vault and mints solvUSD tokens 1-to-1. Every solvUSD is backed by real USDC in the vault—no algorithmic risk.
>
> [Show withdraw function]
> When they withdraw, we burn their solvUSD and return USDC plus any accrued yield. It's fully auditable on-chain.
>
> [Show agent code]
> The autonomous agent monitors the vault every hour. It checks how much capital is deployed, evaluates current protocol yields, and rebalances if needed. Target: keep 80% of capital earning yield, leave 20% buffer for withdrawals.
>
> [Show yield engine logic]
> The agent splits deposits across multiple protocols to reduce risk. If Kamino is paying 9% but Marginfi drops to 6%, it shifts allocation automatically. No human decisions required."

---

## SCENE 5: Demo Flow (60 seconds)

**Visual:** Screen recording of interactions (or diagrams if not deployed)

**Script:**
> "Here's what the user experience looks like:
>
> Step 1: Alice deposits 100 USDC. She receives 100 solvUSD. Her USDC is now in the vault.
>
> Step 2: Alice stakes her 100 solvUSD in the locked 90-day tier to earn 9% APY (growth tier).
>
> Step 3: Our agent sees the new deposit, analyzes vault status, and deploys 80 USDC to Kamino and Marginfi. Those protocols pay interest, which accrues in the vault.
>
> Step 4: Every hour, the agent harvests those rewards and adds them to the vault's yield pool.
>
> Step 5: After 90 days, Alice claims her yield. Instead of taking USDC, she converts it to API credits. Now she can run her own AI agent indefinitely using yield from her staked capital.
>
> Alice keeps her principal. The yield funds operations. The system sustains itself."

---

## SCENE 6: Differentiation (30 seconds)

**Visual:** Comparison table or bullet points

**Script:**
> "Why Solvency AI stands out: We're not recycling transaction fees like other utility tokens. We're generating real yield from established DeFi protocols. We're not an algorithmic stablecoin—every solvUSD is backed 1-to-1 by USDC. And we're the first to solve bot self-funding at the protocol level. This isn't just a product. It's infrastructure for autonomous agents."

---

## SCENE 7: Technical Details (30 seconds)

**Visual:** Show code files, GitHub repo structure

**Script:**
> "The entire system is built on Solana for speed and low costs. Smart contracts in Rust with Anchor. Agent in Node.js with AgentWallet integration for secure signing. All code is open-source, ready for review. Documentation includes architecture diagrams, code walkthroughs, and deployment guides. We've designed this to be auditable and extensible."

---

## SCENE 8: Security & Roadmap (30 seconds)

**Visual:** Security checklist + roadmap timeline

**Script:**
> "Security is priority one. We have emergency pause mechanisms, PDA-based access controls, and input validation throughout. Before mainnet, we're budgeting for a professional audit.
>
> Our roadmap: MVP is on testnet now. V1 adds staking tiers and real DeFi integration. V2 brings governance, multi-chain bridges, and institutional support. We're building for the long term."

---

## SCENE 9: Call to Action (15 seconds)

**Visual:** Links to GitHub, Twitter, submission

**Script:**
> "Solvency AI: stable value, passive yield, autonomous sustainability. Check out the code on GitHub, follow us on Twitter, and let's make DeFi work for everyone—human and bot alike. Thanks for watching."

**Visual:** End card with:
- GitHub link
- Twitter: @xSatoshi_owl
- "Colosseum Agent Hackathon 2026"

---

## Production Notes

### Screen Recordings Needed
1. Architecture diagram (ARCHITECTURE.md)
2. Smart contract code (programs/vault/src/lib.rs)
3. Agent code (app/src/)
4. Simulated deposit/withdraw flow (diagrams OK if not deployed)
5. GitHub repo view

### Voiceover Tips
- Speak clearly, moderate pace
- Emphasize key numbers (6-9% APY (target), 1-to-1 backing)
- Sound confident but not overselling
- Natural pauses at scene breaks

### Editing
- Smooth transitions between scenes
- Highlight code sections with zoom/cursor
- Background music: subtle, tech-focused
- Text overlays for key points

### Alternative (If No Video Tools)
Create slideshow with:
- Keynote/PowerPoint
- Export to PDF
- Upload as "visual walkthrough"
- Include voiceover script as notes

---

**Total Time:** 4 minutes 45 seconds  
**Next Step:** Record and edit, or create slide deck alternative
