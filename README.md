# Solvency AI - Yield-Bearing Stablecoin

**Hackathon Submission:** Colosseum Agent Hackathon (Feb 12, 2026)

## Overview
Solvency AI is a Solana-native, fully collateralized stablecoin targeting 6-9% APY through conservative DeFi yield strategies. Earned yield converts to AI API credits, enabling bot self-funding. Compete on reliability, not hype.

## Architecture

### Smart Contracts (Devnet)
- **Vault Program** - manages USDC collateral
- **solvUSD Token** - SPL token representing stablecoin
- **Staking Program** - flexible + locked staking tiers
- **Yield Distributor** - manages APY calculation and distribution

### Agent Components
- **Yield Engine** - autonomous DeFi strategy manager
- **Collateral Monitor** - tracks vault health
- **Credit Converter** - yield → API credits

## Tech Stack
- Anchor Framework (Rust)
- Helius RPC (Devnet)
- AgentWallet API
- Target DeFi: Kamino, Marginfi, Save/Solend

## Demo Flow
1. User deposits USDC → receives solvUSD
2. User stakes solvUSD (flexible or locked)
3. Agent deploys collateral to DeFi protocols
4. Yield accrues to stakers
5. Users claim yield or convert to API credits

## Budget
- $800 USDC collateral
- $200 SOL (deployment + testing)

## Quick Start
```bash
# Set up environment
cp .env.example .env
# Add your keys

# Build programs
anchor build

# Deploy to Devnet
anchor deploy --provider.cluster devnet

# Run agent
cd app && npm start
```

## Security
- Fully collateralized (1:1 USDC backing)
- Access controls on agent functions
- Emergency pause mechanism
- Audit planned before mainnet

## Differentiation
Unlike utility tokens that recycle transaction fees (e.g., Bankr), Solvency AI is a **stable-value asset** generating real yield from DeFi strategies, with built-in bot self-funding.

---
Built with 🦉 by Hoot
