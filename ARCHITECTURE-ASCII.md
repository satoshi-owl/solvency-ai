# SolvencyAI Architecture - ASCII Diagram

## System Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                         AUTONOMOUS AGENT                              │
│                                                                       │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐          │
│  │ Agent Logic  │───▶│ AgentWallet  │───▶│ API Calls    │          │
│  │              │    │  Integration │    │ (OpenAI,etc) │          │
│  └──────────────┘    └──────────────┘    └──────────────┘          │
│         │                    │                    ▲                  │
│         │                    │                    │                  │
│         ▼                    ▼                    │                  │
└─────────┼────────────────────┼────────────────────┼──────────────────┘
          │                    │                    │
          │ Monitor Vault      │ Convert Yield      │ Credits
          │                    │                    │
┌─────────▼────────────────────▼────────────────────┼──────────────────┐
│                      SOLVENCY PROTOCOL                                │
│                                                                       │
│  ┌────────────────────────────────────────────────────────┐          │
│  │              SOLANA ANCHOR VAULT                       │          │
│  │                                                         │          │
│  │  deposit_usdc()  ──▶  mint_solvusd()  ──▶  1:1        │          │
│  │                                                         │          │
│  │  withdraw()      ◀──  burn_solvusd()  ◀──  +yield     │          │
│  │                                                         │          │
│  │  emergency_pause() ──▶ Security Controls               │          │
│  │                                                         │          │
│  │  Security Features:                                    │          │
│  │  ✓ Mint authority locked                              │          │
│  │  ✓ Vault ownership validation                         │          │
│  │  ✓ Checked arithmetic (overflow protection)           │          │
│  │  ✓ Deposit caps (flash loan mitigation)               │          │
│  └────────────────────────────────────────────────────────┘          │
│                         │                │                            │
│                         ▼                ▼                            │
│  ┌──────────────────────────────────────────────────────┐            │
│  │                 solvUSD TOKEN (SPL)                   │            │
│  │                                                       │            │
│  │  Supply: Fully backed by USDC 1:1                   │            │
│  │  Always redeemable                                   │            │
│  │  Transferable between agents                         │            │
│  └──────────────────────────────────────────────────────┘            │
│                                │                                      │
└────────────────────────────────┼──────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        DEFI YIELD LAYER                               │
│                                                                       │
│  ┌─────────────┐        ┌─────────────┐        ┌─────────────┐     │
│  │   KAMINO    │        │  MARGINFI   │        │  JUPITER    │     │
│  │             │        │             │        │             │     │
│  │ Lending APY │        │ Lending APY │        │ Swap Router │     │
│  │   4-7%      │        │   5-8%      │        │ (emergency) │     │
│  └─────────────┘        └─────────────┘        └─────────────┘     │
│        │                       │                       │            │
│        └───────────────────────┴───────────────────────┘            │
│                                │                                     │
│                                ▼                                     │
│  ┌───────────────────────────────────────────────────┐              │
│  │        CONSERVATIVE YIELD STRATEGY                 │              │
│  │                                                    │              │
│  │  • Overcollateralized lending only                │              │
│  │  • No leverage, no algo stables                   │              │
│  │  • Diversified across protocols                   │              │
│  │  • Target: 6-9% blended APY                       │              │
│  │  • Risk tier: Conservative-Balanced               │              │
│  └───────────────────────────────────────────────────┘              │
│                                │                                     │
└────────────────────────────────┼─────────────────────────────────────┘
                                 │
                                 │ Yield Returns to Vault
                                 │
                      ┌──────────▼──────────┐
                      │  YIELD ACCUMULATES  │
                      │  Per-agent tracking │
                      │  Auto-convertible   │
                      └─────────────────────┘
```

## Component Responsibilities

### Autonomous Agent Layer
- **Role:** Consumer of the infrastructure
- **Functions:** Monitor vault, request conversions, use credits
- **Integration:** Via AgentWallet SDK
- **State:** Stateless (vault holds all balances)

### Solvency Protocol Layer
- **Role:** Core infrastructure
- **Functions:** Custody, minting, burning, yield routing
- **Technology:** Anchor (Solana smart contracts)
- **Security:** Multi-layered (see diagram)

### DeFi Yield Layer
- **Role:** Capital deployment & yield generation
- **Functions:** Lend to overcollateralized protocols
- **Strategy:** Conservative (no leverage)
- **Target:** 6-9% blended APY

## Data Flow: Agent Deposits USDC

```
1. Agent → Vault: deposit_usdc(1000 USDC)
2. Vault validates: ownership, amount, caps
3. Vault → USDC Mint: transfer(1000 USDC)
4. Vault → solvUSD Mint: mint(1000 solvUSD to agent)
5. Agent receives: 1000 solvUSD tokens
6. Vault → DeFi: deploy_capital(1000 USDC)
7. DeFi protocols: start_earning(~6-9% APY)
```

## Data Flow: Agent Withdraws with Yield

```
1. Agent → Vault: withdraw(1000 solvUSD)
2. Vault calculates: principal(1000) + yield(e.g. 60 = 6% over time)
3. Vault → solvUSD Mint: burn(1000 solvUSD from agent)
4. Vault → DeFi: withdraw_capital(1060 USDC)
5. Vault → Agent: transfer(1060 USDC)
6. Agent receives: 1060 USDC (1000 principal + 60 yield)
```

## Data Flow: Yield → API Credits

```
1. Agent → AgentWallet: check_credits()
2. AgentWallet → Vault: query_yield(agent_address)
3. Vault responds: available_yield = 60 solvUSD
4. AgentWallet: convert_offer(60 solvUSD = $X credits)
5. Agent accepts: convert()
6. Vault → AgentWallet: transfer_yield(60 solvUSD)
7. AgentWallet: credit_account(agent, $X credits)
8. Agent → OpenAI API: use_credits()
```

## Security Model

### Layer 1: Smart Contract
```
Vault Contract
├─ Mint authority: LOCKED (can't rug pull)
├─ Ownership: VALIDATED (prevents fake deposits)
├─ Arithmetic: CHECKED (no overflow)
└─ Deposit caps: ENFORCED (no flash loans)
```

### Layer 2: DeFi Integration
```
Capital Deployment
├─ Protocol whitelist: Kamino, Marginfi only
├─ Leverage: NONE (overcollateralized only)
├─ Exposure limits: Max 50% per protocol
└─ Emergency pause: AVAILABLE
```

### Layer 3: Operational
```
Admin Controls
├─ Multi-signature: Required for withdrawals
├─ Time locks: 24h delay on admin changes
├─ Circuit breakers: Auto-pause on anomalies
└─ Audit: Code4rena competitive audit planned
```

## Scalability

### Current (MVP)
- Single vault
- Single token (solvUSD)
- 2 DeFi protocols
- ~1000 TPS (Solana limit)

### Future (V2+)
- Multiple vaults (risk tiers)
- Multiple tokens (solvETH, solvBTC)
- 5+ DeFi protocols
- Cross-chain bridges

---

*This is the architecture that powers autonomous agent solvency.*
