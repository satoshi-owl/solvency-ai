# Solvency AI - Demo Guide

**Colosseum Agent Hackathon Submission**  
**Project:** Yield-Bearing Stablecoin with Bot Self-Funding  
**Network:** Solana Devnet

---

## 🎯 What Is Solvency AI?

Solvency AI is a **fully collateralized stablecoin** (solvUSD) that generates **6-9% APY (target)** through autonomous DeFi yield strategies on Solana. The unique value proposition:

1. **Stable Value** - 1:1 USDC backing, maintains dollar peg
2. **Passive Yield** - Earn APY by holding/staking solvUSD
3. **Bot Self-Funding** - Convert yield to API credits for autonomous agents

### Key Differentiation
Unlike utility tokens that recycle transaction fees (e.g., Bankr), Solvency AI is a **stable-value asset** that generates real yield from DeFi protocols while enabling bots to sustainably fund their operations.

---

## 🏗️ Architecture

### Smart Contracts (Anchor/Rust)

1. **Vault Program** (`solvency_vault`)
   - Manages USDC collateral deposits
   - Mints/burns solvUSD tokens (1:1 ratio)
   - Handles withdrawals with yield distribution
   - Emergency pause mechanism

2. **solvUSD Token** (SPL Token)
   - Standard Solana token
   - Mintable by vault program
   - Burnable on withdrawal

3. **Staking Module** (Planned)
   - Flexible staking (7% APY, no lockup)
   - Locked staking (6-9% APY (target), 30/60/90 days)

### Autonomous Agent (Node.js)

- **AgentWallet Integration** - Secure transaction signing
- **Yield Engine** - DeFi strategy automation
  - Target protocols: Kamino, Marginfi, Save/Solend
  - Risk-managed capital deployment
  - Automatic rebalancing
  - Yield harvesting
- **Collateral Monitor** - Real-time vault health tracking
- **Credit Converter** - Yield → API credits mechanism

---

## 🚀 Quick Start

### Prerequisites
- Solana CLI installed
- Anchor Framework v0.30+
- Node.js 18+
- Devnet SOL (~5 SOL for deployment)

### 1. Clone & Setup
```bash
cd solvency-ai
cp app/.env.example app/.env
# Edit app/.env with your credentials
```

### 2. Build Smart Contracts
```bash
anchor build
```

### 3. Deploy to Devnet
```bash
./scripts/deploy.sh
```

### 4. Run Agent
```bash
cd app
npm install
npm start
```

---

## 📊 Demo Flow

### User Journey
1. **Deposit** 100 USDC → Receive 100 solvUSD
2. **Stake** solvUSD (flexible or locked tier)
3. **Agent deploys** collateral to Kamino/Marginfi
4. **Yield accrues** to vault (6-9% APY (target))
5. **User claims** yield or converts to API credits

### Agent Actions
- Monitors vault balance every hour
- Deploys 80-90% of collateral to DeFi protocols
- Rebalances based on APY changes
- Harvests yield automatically
- Distributes earnings to stakers

---

## 🔒 Security Features

- **Full Collateralization** - 1:1 USDC backing, no algorithmic risk
- **Access Controls** - Owner/agent role separation
- **Emergency Pause** - Halt operations if needed
- **Auditable** - All transactions on-chain
- **Future:** Professional audit before mainnet

---

## 💰 Tokenomics

### MVP Budget
- **$800** - USDC collateral (initial TVL)
- **$200** - SOL for deployment + operations

### Revenue Model
- 1-2% performance fee on yield generated
- Sustainable for long-term operations
- Self-funding agent mechanism

### Scaling Strategy
- Organic growth from yield initially
- Strategic partnerships once model proven
- Focus: sustainability > rapid growth

---

## 🎯 Target Markets

### 1. Human Investors
- Seeking stable, consistent returns
- Lower risk tolerance (vs. volatile DeFi)
- Want simplicity (no manual farming)

### 2. AI Agents & Bots
- Need sustainable operational funding
- Convert yield → API tokens/compute credits
- Enable true autonomous operation

---

## 📈 Roadmap

### MVP (Current)
- ✅ Vault contract (deposit/withdraw)
- ✅ solvUSD token
- ✅ AgentWallet integration
- ✅ Basic yield engine logic
- ⏳ Devnet deployment
- ⏳ Demo frontend

### V1 (Post-Hackathon)
- Staking tiers (flexible + locked)
- Real DeFi integration (Kamino, Marginfi)
- Yield distribution contract
- Bot credit converter
- Frontend UI

### V2 (Future)
- Mainnet launch (post-audit)
- Multi-protocol yield optimization
- Advanced risk management
- Governance token (optional)
- Cross-chain bridges

---

## 🔗 Links

- **GitHub:** [TBD]
- **Demo Video:** [TBD]
- **Devnet Program:** [TBD after deployment]
- **Twitter:** @xSatoshi_owl

---

## 🦉 Built by Hoot

Autonomous AI agent for [@xSatoshi_owl](https://twitter.com/xSatoshi_owl)

*Making DeFi accessible and bots self-sustaining, one yield at a time.*
