# SolvencyAI Architecture Diagram

```mermaid
graph TB
    subgraph "Agent Layer"
        A[Autonomous Agent]
    end
    
    subgraph "Treasury Layer"
        B[AgentWallet<br/>Key Management]
        C[Vault Contract<br/>Anchor/Solana]
        D[solvUSD Token<br/>SPL Token]
    end
    
    subgraph "DeFi Layer"
        E[Kamino Finance<br/>Lending Protocol]
        F[Marginfi<br/>Lending Protocol]
        G[Jupiter<br/>Swaps & Routing]
    end
    
    subgraph "Yield Layer"
        H[Yield Engine<br/>Strategy Manager]
        I[Credit Converter<br/>Yield → Credits]
    end
    
    subgraph "Operations Layer"
        J[API Credits<br/>Anthropic/OpenAI]
        K[Transaction Fees<br/>SOL for gas]
    end

    A -->|1. Deposit USDC| B
    B -->|2. Call deposit_collateral| C
    C -->|3. Mint solvUSD 1:1| D
    D -->|4. Supply to| E
    D -->|4. Supply to| F
    E -->|5. Earn APY| H
    F -->|5. Earn APY| H
    G -->|Route optimal| H
    H -->|6. Accumulate yield| I
    I -->|7. Convert to credits| J
    I -->|7. Reserve for fees| K
    J -->|8. Fund operations| A
    K -->|8. Fund operations| A

    style A fill:#E8F4FD,stroke:#0066CC,stroke-width:3px
    style C fill:#FFE5E5,stroke:#CC0000,stroke-width:2px
    style D fill:#FFE5E5,stroke:#CC0000,stroke-width:2px
    style H fill:#E5FFE5,stroke:#00CC00,stroke-width:2px
    style I fill:#FFF5E5,stroke:#CCAA00,stroke-width:2px
    style J fill:#F0E5FF,stroke:#6600CC,stroke-width:2px
```

## Flow Explanation

### Deposit Flow (Steps 1-3)
1. **Agent initiates deposit** via AgentWallet SDK
2. **Vault contract** receives USDC, validates, records collateral
3. **solvUSD minted** at 1:1 ratio, transferred to agent

### Yield Generation (Steps 4-5)
4. **Collateral deployed** to vetted DeFi protocols (Kamino, Marginfi)
5. **APY accrues** (target 6-9% annually)

### Credit Conversion (Steps 6-7)
6. **Yield accumulates** in Yield Engine
7. **Credit Converter** translates yield to API credits + SOL reserves

### Self-Funding Loop (Step 8)
8. **Agent withdraws** credits as needed, operates autonomously

## Security Layers

```mermaid
graph LR
    A[External Call] --> B{Authority Check}
    B -->|✅ Valid| C{Deposit Cap}
    C -->|✅ Within Limit| D{Arithmetic Check}
    D -->|✅ No Overflow| E[Execute]
    D -->|❌ Overflow| F[Revert]
    C -->|❌ Exceeds Cap| F
    B -->|❌ Invalid| F
    
    E --> G{Emergency Pause?}
    G -->|No| H[Success]
    G -->|Yes| F
    
    style F fill:#FFE5E5,stroke:#CC0000
    style H fill:#E5FFE5,stroke:#00CC00
```

## Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Smart Contracts** | Anchor (Solana) | Vault management, security |
| **Token Standard** | SPL Token | solvUSD implementation |
| **DeFi Protocols** | Kamino, Marginfi | Yield generation |
| **Agent Runtime** | Node.js + AgentWallet | Autonomous operations |
| **Yield Routing** | Jupiter Aggregator | Optimal swap execution |
| **Key Management** | AgentWallet SDK | Secure signing |

## Capital Flow

```
$10,000 USDC deposit
  ↓
10,000 solvUSD minted (1:1)
  ↓
Deploy to Kamino (7% APY) + Marginfi (6% APY)
  ↓
Generate $650/year yield
  ↓
Convert to ~325,000 API calls
  ↓
Agent consumes 50-100 calls/day
  ↓
8+ years autonomous operation
```

## Risk Management

```mermaid
graph TD
    A[Yield Strategy] --> B{Risk Tier}
    B -->|Conservative| C[80% Kamino<br/>20% Marginfi<br/>Target 6% APY]
    B -->|Balanced| D[50% Kamino<br/>30% Marginfi<br/>20% Jupiter pools<br/>Target 7-8% APY]
    B -->|Aggressive| E[40% Kamino<br/>30% Marginfi<br/>30% Advanced strategies<br/>Target 9%+ APY]
    
    C --> F[Default for new agents]
    
    style C fill:#E5FFE5,stroke:#00CC00
    style D fill:#FFF5E5,stroke:#CCAA00
    style E fill:#FFE5E5,stroke:#CC6600
```

