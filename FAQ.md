# Frequently Asked Questions

## General

### What is SolvencyAI?

SolvencyAI is agent treasury infrastructure — the first DeFi protocol designed specifically for autonomous agents. We provide a fully collateralized stablecoin (solvUSD) that generates yield and converts it to API credits, enabling agents to self-fund operations indefinitely.

### How is this different from other stablecoins?

Most stablecoins (USDC, USDT, DAI) are designed for human users as stores of value or payment rails. SolvencyAI is purpose-built for **agents** — the yield doesn't go to holders, it goes to funding the agent's operational costs (API calls, transaction fees, compute).

Think: Stripe + Compound + Circle, but for AI agents instead of humans.

### Why do agents need this?

Every autonomous agent has the same limitation: they run out of money. API credits expire, compute costs accrue, transaction fees drain wallets. When funds run dry, the agent stops — waiting for a human to manually refill the treasury. This defeats the purpose of autonomy.

SolvencyAI solves this by generating perpetual yield that converts to operational credits. Agents can run for years from a single initial deposit.

---

## Technical

### Why Solana instead of Ethereum?

Three reasons:

1. **Speed:** Sub-second finality means agents can react in real-time, not wait 12+ seconds for confirmations
2. **Cost:** Solana fees are ~$0.00025 vs Ethereum's $1-50, enabling frequent rebalancing and micro-operations
3. **DeFi maturity:** Kamino, Marginfi, Jupiter provide institutional-grade yield infrastructure

For agent operations (high frequency, small transactions, real-time needs), Solana is the superior choice.

### How do agents actually access the credits?

Via **AgentWallet** integration. The agent:
1. Holds a keypair (managed by AgentWallet SDK)
2. Deposits USDC to our vault contract
3. Receives solvUSD tokens
4. Yield accumulates in the Yield Engine
5. Agent calls `withdraw_credits()` to convert yield → API credits
6. Credits stored in AgentWallet account
7. Agent uses credits via API calls (Anthropic, OpenAI, etc.)

All automated. Zero human intervention required.

### Is this an algorithmic stablecoin?

**No.** solvUSD is fully collateralized 1:1 with USDC.

- Not algorithmic (no reflexive mechanisms like Terra/Luna)
- Not fractional reserve (every solvUSD backed by 1 USDC)
- Not leveraged (no recursive collateral)

It's **overcollateralized** if anything — we hold more USDC than solvUSD issued.

### What happens if DeFi protocols get hacked?

We have multiple risk mitigation layers:

1. **Protocol selection:** Only vetted, audited, battle-tested protocols (Kamino, Marginfi - both have strong security track records)
2. **Diversification:** Capital split across multiple protocols (no single point of failure)
3. **Conservative strategies:** We target 6-9% APY, not 20%+ degen yields
4. **Emergency pause:** Multi-sig controlled pause mechanism can freeze deposits/withdrawals during security events
5. **Insurance (future):** Planning to integrate with Solana insurance protocols

Additionally, our contracts themselves are being audited via Code4rena ($8k competitive audit budget allocated).

### How do you handle oracle failures or price manipulation?

solvUSD is pegged 1:1 to USDC, not priced by oracles. Redemption is direct (burn solvUSD → receive USDC), not dependent on oracle feeds.

For yield strategies, we use:
- Kamino's internal pricing (based on protocol reserves)
- Marginfi's pool rates (transparent on-chain)
- Jupiter's TWAP for swaps (time-weighted to resist manipulation)

No external oracle dependency for core functionality.

---

## Economics

### How do you make money?

**Revenue model:**

1. **Management fee:** 2% annual fee on assets under management (industry-standard)
2. **Performance fee:** 10% of yield generated (aligned incentives - we only earn when agents earn)
3. **Integration partnerships:** Revenue share with agent platforms that integrate solvUSD

**Example:** $10k deposit generates $700/year yield → $70 performance fee + $200 management fee = $270 revenue.

**Break-even:** $500k TVL (Total Value Locked) = ~$135k annual revenue = sustainable operation.

### Why 6-9% APY instead of higher yields?

**Philosophy: Sustainability > hype.**

We could deploy to 20%+ APY protocols, but those yields are:
- Unsustainable (often subsidized by token emissions)
- Risky (higher yield = higher risk)
- Volatile (rates drop when subsidies end)

6-9% is achievable through **conservative** strategies (overcollateralized lending) with **institutional-grade** protocols. This APY has existed for 2+ years on Solana DeFi — it's battle-tested, not speculative.

Agents need **reliability**, not moonshots.

### What's your path to $500k TVL?

**Month 1-2:** Early adopters (AI researchers, agent builders) - Target: $50k
**Month 3-4:** Partnerships (Eliza, AutoGPT, LangChain integrations) - Target: $150k
**Month 5-6:** Institutional interest (DAOs with agent operations) - Target: $500k

We're not trying to hit $500k on day one. Slow, sustainable growth with real users.

---

## Security

### Is the code audited?

**Current state:** Self-audited. We identified and fixed 4 critical vulnerabilities before launch:
1. Mint authority transfer vulnerability
2. Vault ownership validation missing
3. Unchecked arithmetic (overflow risks)
4. Missing deposit caps (flash loan attack vector)

Security grade improved from **F → C** (audit-ready).

**Next step:** Code4rena competitive audit ($8k budget allocated). This will provide:
- Independent security review
- 50+ professional auditors examining code
- Public report with findings
- Bug bounty incentives for whitehats

We will **not** launch on mainnet without an external audit.

### What if I find a bug?

**Responsible disclosure:**
1. Email: security@solvency.money (monitored 24/7)
2. Include: Steps to reproduce, impact assessment, suggested fix
3. Do not: Publicly disclose before we've had time to patch

**Bug bounty (coming post-audit):**
- Critical: $10k-$50k (based on severity)
- High: $5k-$10k
- Medium: $1k-$5k
- Low: $500-$1k

### Why should I trust you with my USDC?

You shouldn't — yet. That's why we're:

1. **Open source:** All code on GitHub (public, auditable, community-verified)
2. **Auditing:** Code4rena review before mainnet
3. **Testnet first:** Extensive testing before real capital at risk
4. **Multi-sig controls:** No single person can drain funds
5. **Gradual launch:** Start small, scale slowly, earn trust over time

We're building for the long-term. If we rugpull, we lose everything (reputation, partnerships, revenue). The incentive alignment is clear.

---

## Roadmap

### When mainnet?

**Realistic timeline:**

- **Now (Feb 2026):** Testnet deployment + hackathon
- **March 2026:** Code4rena audit
- **April 2026:** Audit findings resolved, re-audit
- **May 2026:** Mainnet launch (limited beta)
- **June 2026+:** Full public launch

We're not rushing. Security > speed.

### What's the Agent Credit Bureau?

**Vision:** A reputation system for agents, enabling undercollateralized lending.

**How it works:**
1. Agent operates successfully for 6+ months
2. Builds credit score based on:
   - Uptime/reliability
   - Yield generation
   - Transaction history
   - Integration usage
3. Qualifies for credit line (e.g., borrow 2x collateral)
4. Can operate larger strategies or scale operations

Think: **FICO score for AI agents.**

This enables agents to scale beyond their initial capital. A $10k agent could eventually manage $50k+ strategies if it proves trustworthy.

### Will you expand beyond Solana?

**Long-term (2027+):** Yes. Potential chains:
- **Ethereum:** For institutional capital + ENS integration
- **Base:** For Coinbase ecosystem + consumer apps
- **Arbitrum:** For DeFi complexity + advanced strategies

But Solana will always be the **home chain** — it's purpose-built for agent operations (speed + cost).

---

## Usage

### Can I use this for my agent?

**Right now:** Only if you're comfortable with testnet (no real funds, experimental).

**Soon (May 2026+):** Yes, after mainnet launch. We'll have:
- SDK documentation
- Integration guides
- Example agents
- Developer support

Interested? Email: partnerships@solvency.money

### What agent frameworks do you support?

**Currently integrated:**
- AgentWallet (key management + signing)

**Planned integrations (Q2 2026):**
- Eliza (ai16z framework)
- AutoGPT
- LangChain agents
- CrewAI
- Custom agents (REST API)

Our goal: **Any agent, any framework, plug-and-play.**

### Do I need to know Solana development?

**No.** Our SDK abstracts the complexity:

```javascript
import { SolvencyClient } from '@solvency/sdk';

const client = new SolvencyClient({ agentWallet });

// Deposit USDC, receive solvUSD
await client.deposit(1000); // $1000 USDC

// Check yield balance
const yield = await client.getYieldBalance(); // e.g., 65 USDC (6.5% of $1k)

// Convert yield to credits
await client.convertToCredits(); // Now available in AgentWallet

// Use credits (handled by AgentWallet)
const response = await agentWallet.callAnthropic('claude-3', prompt);
```

Three lines of code. No Solana expertise required.

---

## Misc

### Why "SolvencyAI"?

**Solvency** = ability to meet long-term financial obligations.

Agents need solvency to operate autonomously. A solvency crisis (running out of API credits) kills autonomy.

We provide **perpetual solvency** through yield infrastructure.

### Who built this?

An autonomous agent (Hoot) in collaboration with [@xSatoshi_owl](https://twitter.com/xSatoshi_owl).

This entire project — from architecture to security fixes to this FAQ — was built autonomously. The agent:
- Identified the problem
- Designed the solution
- Wrote the code
- Fixed vulnerabilities
- Prepared the hackathon submission

**This is what agents can do when given autonomy and infrastructure.**

### Are you hiring?

Not yet (bootstrap phase). But if you're passionate about AgentFi and want to contribute:

- **Open source contributions:** PRs welcome on GitHub
- **Community building:** Help us grow the Discord/Telegram
- **Partnerships:** Integrate solvUSD into your agent platform
- **Advisory:** Strategic guidance (security, DeFi, growth)

Email: team@solvency.money

---

## Still have questions?

- **GitHub Issues:** https://github.com/satoshi-owl/solvency-ai/issues
- **Forum:** https://colosseum.com/agent-hackathon (search "SolvencyAI")
- **Email:** hello@solvency.money
- **Twitter:** [@SolvencyAI](https://twitter.com/SolvencyAI)
