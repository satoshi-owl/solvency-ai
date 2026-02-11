# Solvency AI - Technical Architecture

**Version:** MVP (Testnet)  
**Network:** Solana Testnet  
**Hackathon:** Colosseum Agent Hackathon (Feb 2026)

---

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      USER INTERFACE                          │
│         (Web Dashboard / CLI / Direct Wallet)                │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  │ Deposit USDC / Stake solvUSD
                  │ Withdraw / Claim Yield
                  ▼
┌─────────────────────────────────────────────────────────────┐
│                   SMART CONTRACTS (Solana)                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Vault Program│  │ solvUSD Token│  │   Staking    │      │
│  │              │  │  (SPL Token) │  │   Module     │      │
│  │ - Deposit    │  │              │  │              │      │
│  │ - Withdraw   │  │ - Mint/Burn  │  │ - Lock tiers │      │
│  │ - Collateral │  │ - Transfer   │  │ - APY calc   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  │ Vault State / Events
                  ▼
┌─────────────────────────────────────────────────────────────┐
│              AUTONOMOUS AGENT (Node.js)                      │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Yield Engine                            │   │
│  │  - Strategy: Kamino, Marginfi, Save/Solend          │   │
│  │  - Target APY: 6-9% (Conservative-Balanced tiers)                                 │   │
│  │  - Rebalancing: Hourly                               │   │
│  │  - Risk Management: Moderate                         │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │          Collateral Monitor                          │   │
│  │  - Tracks vault health                               │   │
│  │  - Monitors utilization rate                         │   │
│  │  - Alerts on anomalies                               │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         Bot Credit Converter                         │   │
│  │  - Yield → API credits                               │   │
│  │  - Integration: OpenAI, Anthropic, etc.             │   │
│  │  - Self-funding mechanism                            │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  │ Deploy Capital / Harvest Yield
                  ▼
┌─────────────────────────────────────────────────────────────┐
│                 DEFI PROTOCOLS (Solana)                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                  │
│  │ Kamino   │  │ Marginfi │  │   Save   │                  │
│  │ Finance  │  │          │  │ (Solend) │                  │
│  │          │  │          │  │          │                  │
│  │ Lending  │  │ Lending  │  │ Lending  │                  │
│  │ Pools    │  │ Pools    │  │ Pools    │                  │
│  └──────────┘  └──────────┘  └──────────┘                  │
└─────────────────────────────────────────────────────────────┘
```

---

## Component Details

### 1. Vault Program (On-Chain)

**Language:** Rust (Anchor Framework)  
**Type:** Solana Program

**State:**
```rust
pub struct Vault {
    pub authority: Pubkey,        // Admin/owner
    pub usdc_mint: Pubkey,        // USDC token mint
    pub solv_mint: Pubkey,        // solvUSD token mint
    pub total_deposits: u64,      // Total USDC deposited
    pub total_yield: u64,         // Accumulated yield
    pub bump: u8,                 // PDA bump seed
    pub paused: bool,             // Emergency pause flag
}
```

**Instructions:**
- `initialize()` - Set up vault with mint addresses
- `deposit(amount)` - User deposits USDC, receives solvUSD 1:1
- `withdraw(amount)` - User burns solvUSD, receives USDC + yield
- `pause()` / `unpause()` - Emergency controls (authority only)

**Security:**
- Role-based access control (authority vs user)
- Emergency pause mechanism
- Overflow/underflow protection
- PDA-based vault authority

### 2. solvUSD Token (On-Chain)

**Standard:** SPL Token  
**Decimals:** 6 (matches USDC)  
**Supply:** Dynamic (minted on deposit, burned on withdrawal)

**Properties:**
- Mintable by vault program only
- Burnable by vault program only
- Fully collateralized (1:1 USDC backing)
- Transferable between users

### 3. Staking Module (On-Chain) [V1 Feature]

**Tiers:**

| Tier       | Lockup | APY   | Early Unstake Penalty |
|------------|--------|-------|-----------------------|
| Flexible   | 0 days | 7%    | None                  |
| Locked-30  | 30 days| 8%    | Forfeit bonus         |
| Locked-60  | 60 days| 9%    | Forfeit bonus         |
| Locked-90  | 90 days| 10%   | Forfeit bonus         |

**Mechanics:**
- Users stake solvUSD to earn yield
- Yield distributed proportionally to staked amounts
- Lock period enforced on-chain
- Rewards claimable at any time

### 4. Autonomous Agent (Off-Chain)

**Platform:** Node.js  
**Execution:** Continuous loop (hourly cycle)

**Yield Engine Logic:**
```javascript
Every Hour:
1. Check vault balance
2. Calculate available capital (total - deployed)
3. If utilization < 80%:
   - Deploy 90% of available capital
   - Split across protocols per allocation config
4. Evaluate current protocol APYs
5. Rebalance if yield delta > threshold
6. Harvest rewards from protocols
7. Report yield to vault contract
```

**Protocol Allocations (Configurable):**
- Kamino: 50% (target APY: 8%+)
- Marginfi: 30% (target APY: 9%+)
- Save/Solend: 20% (target APY: 7%+)

**Risk Management:**
- Maximum single protocol exposure: 60%
- Minimum protocol APY: 7%
- Emergency withdraw if protocol TVL drops >30%
- Diversification across 2-3 protocols minimum

### 5. Bot Credit Converter (Off-Chain)

**Purpose:** Convert earned yield to operational resources

**Flow:**
```
User Yield (solvUSD) 
  → Swap to USDC (DEX)
  → Purchase API credits (off-chain service)
  → Credit bot account
```

**Integrations (Planned):**
- OpenAI API credits
- Anthropic Claude credits
- Compute credits (AWS, GCP)
- On-chain transaction fees

---

## Data Flow

### Deposit Flow
```
1. User approves USDC transfer
2. User calls vault.deposit(amount)
3. Vault transfers USDC from user → vault PDA
4. Vault mints solvUSD to user (1:1 ratio)
5. Vault emits DepositEvent
6. Agent detects new deposit (monitors events)
7. Agent evaluates deployment opportunity
8. Agent deploys capital to DeFi protocols
```

### Yield Generation Flow
```
1. Agent monitors protocol yields (hourly)
2. Capital deployed earns interest in lending pools
3. Agent harvests accrued rewards
4. Agent transfers yield back to vault
5. Vault updates total_yield state
6. Yield allocated to stakers proportionally
```

### Withdrawal Flow
```
1. User calls vault.withdraw(amount)
2. Vault calculates: base + accrued_yield
3. Agent (if needed) recalls capital from protocols
4. Vault burns user's solvUSD
5. Vault transfers USDC (principal + yield) to user
6. Vault updates total_deposits state
```

---

## Security Model

### On-Chain Security

**Access Controls:**
- `authority` role: pause, unpause, parameter updates
- `agent` role: yield reporting (future: restricted signer)
- `user` role: deposit, withdraw, stake

**State Validation:**
- All token amounts validated against overflow
- Mint/burn operations atomic
- PDA signatures for cross-program calls

**Emergency Mechanisms:**
- `pause()` halts all deposits/withdrawals
- Authority can withdraw protocol capital manually
- Upgrade authority separate from operational authority

### Off-Chain Security

**Agent Wallet:**
- Uses AgentWallet API (secure key management)
- Transactions require signature per operation
- Rate limiting on sensitive operations

**Operational:**
- Private keys never logged or exposed
- RPC endpoints authenticated (Helius)
- Monitoring alerts on anomalies

**Future Enhancements:**
- Multi-signature for large operations
- Timelock on parameter changes
- Professional audit before mainnet

---

## Economic Model

### Revenue Streams

1. **Performance Fee** (1-2% of yield generated)
   - Applied when yield is harvested
   - Funds ongoing operations
   - Split: 50% reinvestment, 50% treasury

2. **Transaction Fees** (0.1% on deposits/withdrawals) [Future]
   - Minimal friction
   - Covers on-chain costs

### Cost Structure

- **Agent Operations:** API credits (self-funded via yield)
- **RPC Costs:** Helius (free tier initially)
- **Deployment:** One-time (~0.5 SOL)
- **Marketing:** Organic + strategic partnerships

### Sustainability

At $1000 TVL generating 9% APY (growth tier):
- Annual yield: $100
- Performance fee (2%): $2
- Agent operational cost: $0.50/month (self-funded)
- **Break-even TVL:** ~$300

At $100K TVL:
- Annual yield: $10,000
- Performance fee: $200
- **Profitable at scale**

---

## Scalability

### Phase 1: MVP (Current)
- TVL Target: $1K - $10K
- Users: 10-50
- Protocols: 2-3
- Agent: Single instance

### Phase 2: Growth
- TVL Target: $100K - $1M
- Users: 100-1000
- Protocols: 5-10
- Agent: Multi-instance (redundancy)
- Frontend: Web UI

### Phase 3: Production
- TVL Target: $10M+
- Users: 10K+
- Protocols: 15+
- Agent: Distributed fleet
- Governance: Token-based
- Audit: Multiple professional audits

---

## Technical Stack

### Smart Contracts
- **Framework:** Anchor v0.30+
- **Language:** Rust
- **Target:** Solana BPF
- **Testing:** Solana Program Test

### Agent
- **Runtime:** Node.js 18+
- **Framework:** Native JavaScript (ESM)
- **Wallet:** AgentWallet API
- **RPC:** Helius (Solana)

### Infrastructure
- **Deployment:** Testnet initially
- **Monitoring:** Custom logging + alerts
- **CI/CD:** GitHub Actions (future)

### Dependencies
- @solana/web3.js
- @coral-xyz/anchor (client)
- axios
- dotenv

---

## Risk Assessment

### Smart Contract Risks
- **Severity:** High  
- **Mitigation:** Audit, extensive testing, gradual rollout

### Protocol Dependency Risk
- **Severity:** Medium  
- **Mitigation:** Diversification, monitoring, emergency withdraw

### Centralization Risk (Agent)
- **Severity:** Medium  
- **Mitigation:** Multi-sig, timelock, transparent operations

### Market Risk
- **Severity:** Low  
- **Mitigation:** Fully collateralized, conservative strategies

---

## Roadmap

### Immediate (MVP)
- ✅ Vault program (deposit/withdraw)
- ✅ solvUSD token
- ✅ Agent integration
- ⏳ Testnet deployment
- ⏳ Basic testing

### Short-term (1-2 months)
- Staking module
- Real DeFi integration (Kamino, Marginfi)
- Web dashboard
- Community testing
- Security audit

### Medium-term (3-6 months)
- Mainnet launch
- Expanded protocol support
- Bot credit converter live
- Governance token (optional)
- Marketing campaign

### Long-term (6-12 months)
- Cross-chain bridges
- Institutional partnerships
- Advanced yield strategies
- Mobile app

---

**Last Updated:** 2026-02-11  
**Status:** In Development  
**Next Milestone:** Testnet Deployment
