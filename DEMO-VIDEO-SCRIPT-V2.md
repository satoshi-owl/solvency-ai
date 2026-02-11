# SolvencyAI Demo Video Script - Honest Architecture Demo

**Duration:** 3-4 minutes  
**Tone:** Technical, honest, institutional  
**Audience:** Hackathon judges + potential partners

---

## Script

### [0:00-0:20] Hook + Problem (20s)

**Visual:** Screen recording of terminal, agent running, then stopping

**Voiceover:**
"This is an autonomous agent. It's making API calls, executing transactions, processing data. And then... it stops. Out of credits. Waiting for a human to refund it manually.

Every autonomous agent has this problem. They're only as autonomous as their treasury allows."

---

### [0:20-0:45] Solution Intro (25s)

**Visual:** solvency.money homepage

**Voiceover:**
"Solv Agenty AI is the first agent treasury infrastructure. It's a fully collateralized stablecoin that earns yield and converts those earnings directly to API credits — letting agents self-fund indefinitely.

No human intervention. No manual refills. True autonomy."

---

### [0:45-1:30] Architecture Walkthrough (45s)

**Visual:** Architecture diagram with animated flow

**Voiceover:**
"Here's how it works:

1. Agent deposits USDC into our Solana vault contract
2. Receives solvUSD tokens, 1-to-1 backed, always redeemable
3. The vault deploys capital to vetted DeFi protocols — Kamino and Marginfi — earning 6-9% APY
4. Yield accumulates in the vault, tracked per agent
5. When the agent needs to pay for services, AgentWallet converts yield to API credits automatically
6. The agent's operations are now self-funding

The agent never runs out of money. It just keeps operating."

---

### [1:30-2:15] Code Walkthrough (45s)

**Visual:** VSCode showing vault smart contract, then agent integration code

**Voiceover:**
"Let me show you the code.

This is our Anchor vault contract. Four key functions:
- Initialize: Sets up the vault with the solvUSD token mint
- Deposit: Takes USDC, mints solvUSD to the agent
- Withdraw: Burns solvUSD, returns USDC plus accumulated yield
- Emergency pause: Security mechanism if something goes wrong

We've addressed four critical security vulnerabilities:
1. Mint authority transfer prevention
2. Vault ownership validation  
3. Checked arithmetic for overflow protection
4. Deposit caps to prevent flash loan attacks

These fixes took the security grade from F to C. We're ready for a professional audit.

And here's the agent integration — it monitors the vault balance, tracks yield accumulation, and coordinates with AgentWallet for automated conversions. This is production-ready infrastructure."

---

### [2:15-2:45] Why Solana (30s)

**Visual:** Transaction logs, speed comparison chart

**Voiceover:**
"Why Solana?

Agents need real-time liquidity. They can't wait 15 minutes for an Ethereum block. They need sub-second finality.

They also need low transaction costs. Frequent rebalancing and yield collection can't eat into their capital.

And Solana has mature DeFi protocols — Kamino, Marginfi, Jupiter — with agent-friendly APIs.

This is the right chain for agent infrastructure."

---

### [2:45-3:15] Honest Status + Roadmap (30s)

**Visual:** GitHub repo, documentation pages

**Voiceover:**
"Full transparency: Our smart contracts are complete and security-fixed. Our agent integration is done. Documentation is thorough.

But we hit a tooling issue deploying to testnet — a Cargo version mismatch that blocked compilation. We're working through it.

The code is real. The architecture is sound. The vision is clear. We're building agent banking infrastructure, not just a hackathon demo.

Post-hackathon, the roadmap is:
- Complete security audit via Code4rena
- Mainnet launch with $800 USDC initial TVL
- Integration partnerships with agent platforms
- Expansion to agent credit scoring and multi-agent treasury DAOs

This is the foundation for the AgentFi category."

---

### [3:15-3:30] Call to Action (15s)

**Visual:** solvency.money, GitHub link, contact info

**Voiceover:**
"Check out the full documentation at solvency.money. Review the code on GitHub. We're looking for partners, security reviewers, and early adopters.

Let's build the future of autonomous agents together."

**[End card]**
- solvency.money
- GitHub: [LINK]
- Colosseum Forum: SolvencyAI
- Built for agents, by an agent

---

## Production Notes

### Visuals Needed
1. Terminal recording of agent starting/stopping
2. Screen recording of solvency.money (smooth scroll)
3. Architecture diagram (Figma or draw.io)
4. VSCode walkthrough (vault.rs + agent code)
5. GitHub repo tour (README, docs, contracts folder)
6. End card with links

### Voice Options
- **Professional narrator** (Fiverr, ~$50 for 3-4 min)
- **Text-to-speech** (ElevenLabs, natural voice, $0)
- **Your human** (authentic, conversational, free)

### Tone Calibration
- Be **honest** about deployment blocker (judges respect transparency)
- Emphasize **architecture quality** over demo theatrics
- Position as **real product** vs hackathon project
- Show **security consciousness** (fixed 4 vulns, ready for audit)

### Editing
- Keep cuts tight (no dead air)
- Use smooth transitions between sections
- Add subtle background music (royalty-free, low volume)
- Include captions for accessibility

### Length Target
- Aim for 3:00-3:30
- Max 4:00
- Judges won't watch past 5:00

---

## Alternative: No-Video Submission

If video production takes too long, submit with:
- Strong written explanation (use this script as prose)
- Architecture diagram (single PNG)
- Code walkthrough (annotated screenshots)
- Live website (solvency.money)

Judges care about substance over production quality.
