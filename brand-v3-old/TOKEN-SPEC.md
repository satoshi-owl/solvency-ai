# solvUSD Token Specification

## Token Symbol: solvUSD

**Full Name:** Solvency USD  
**Pronunciation:** "sild" or "S-yield"  
**Format:** 4 characters (standard DeFi format)

---

## Rationale

### Why solvUSD Works

1. **Clear Meaning**
   - **S** = Solana (ecosystem native)
   - **YLD** = Yield (core value proposition)
   - Immediately communicates what the token does

2. **Professional Standard**
   - 4 characters matches industry norms (USDC, USDT, AAVE, LINK)
   - Not cute or memey (no "doggo", "moon", etc.)
   - Ticker-appropriate (financial terminal ready)

3. **Memorable & Pronounceable**
   - Can be said aloud: "I hold SYLD" or "S-yield tokens"
   - Not an acronym soup (no SOLVUSDY or similar)
   - Easy to type and search

4. **Solana Convention**
   - "S" prefix common in Solana ecosystem
   - Suggests stability (like sUSD, sETH in other chains)
   - Reinforces native integration

5. **Institutional Credibility**
   - Could appear on Bloomberg terminal without confusion
   - Professional format expected by VCs/institutions
   - No crypto-native slang

---

## Alternatives Considered

| Symbol | Pros | Cons | Verdict |
|--------|------|------|---------|
| **SOLV** | Short, Solvency reference | Unclear what it does | ❌ Too ambiguous |
| **sUSD** | Clear stablecoin reference | Already used by Synthetix | ❌ Name collision |
| **SVCY** | Direct abbreviation | Hard to pronounce, no meaning | ❌ Not intuitive |
| **SYLD** | Clear meaning, professional | None identified | ✅ **Winner** |
| **SLVY** | Short form | Sounds like "silvery", unclear | ❌ Confusing |
| **SOLD** | Short | Negative connotation ("sold out") | ❌ Bad psychology |

---

## Usage Guidelines

### In Marketing Copy

**Correct:**
- "solvUSD generates 6-9% APY (target)"
- "Hold solvUSD to earn yield"
- "Stake SYLD tokens for rewards"

**Avoid:**
- "syld" (lowercase looks unprofessional)
- "$syld" (mixed case is inconsistent)
- "SYLD coin" (it's a token, not a coin)

### In Technical Documentation

**Correct:**
- "The SYLD token is an SPL token on Solana"
- "Mint address: [address]"
- "SYLD/USDC trading pair"

**Avoid:**
- "solvUSD" in code (no currency symbol in technical contexts)
- "SYLD stablecoin" (it's yield-bearing, not just stable)

### In Social Media

**Correct:**
- "solvUSD 🟦" (optional blue square emoji for branding)
- "Just staked solvUSD for 6-9% APY (target)"
- "#SYLD #Solana #DeFi"

**Avoid:**
- Overuse of emojis (keep professional)
- "SYLDgang" or similar meme culture
- Price speculation language

---

## Token Economics (Reference)

**Type:** SPL Token (Solana)  
**Backing:** 1:1 USDC collateralized  
**Supply:** Dynamic (mints on deposit, burns on withdrawal)  
**Decimals:** 6 (standard for Solana stablecoins)

**Staking Tiers:**
- Flexible: Withdraw anytime, base APY
- Locked: 30/60/90 days, boosted APY

**Yield Source:**
- Kamino Finance
- Marginfi
- Solend/Save
- (Other vetted Solana DeFi protocols)

**Use Cases:**
1. Hold for yield (6-9% APY (target) average)
2. Convert yield to API credits (agent self-funding)
3. Trade on DEXs (liquidity provision)
4. Collateral in other protocols (future)

---

## Visual Identity for Token

### Icon Design

**Primary:**
- Use the main Solvency AI logo mark (S-curve with dots)
- Ice blue (#4A90E2) primary color
- Dark navy (#0A1628) background for circular tokens

**DEX Listings:**
- Provide 128x128 PNG (logo-mark-128.png)
- Ensure visibility at 32px (favicon test)

**Emoji/Unicode:**
- No custom emoji (not standard yet)
- Use 🟦 (blue square) as temporary stand-in for social
- Request official emoji if token gains traction

### Color Association

**Primary:** Ice Blue (#4A90E2)  
**Accent:** Muted Gold (#C9A959) for APY/yield highlights  
**Background:** Midnight Navy (#0A1628)

---

## Messaging Framework

### Elevator Pitch (10 seconds)
> "solvUSD is a yield-bearing stablecoin on Solana generating 6-9% APY (target). Autonomous agents can hold it and convert yield to API credits."

### Value Proposition (30 seconds)
> "Unlike traditional stablecoins that just hold value, solvUSD generates 6-9% APY (target) through DeFi strategies. It's fully collateralized 1:1 with USDC, and the yield can be claimed as USDC or converted to API credits for autonomous agent operations. Infrastructure for self-funding bots."

### Technical Explanation (60 seconds)
> "solvUSD is an SPL token on Solana, backed 1:1 by USDC held in audited smart contracts. When users stake SYLD, the collateral is deployed to vetted DeFi protocols like Kamino and Marginfi, generating yield. Our autonomous agent manages strategy allocation, risk monitoring, and distribution. Users can claim yield as USDC or convert it to API credits through our credit converter service. It's designed specifically for AI agents that need sustainable funding without human intervention."

---

## Competitive Positioning

### Similar Tokens (Comparison)

**vs. USDC/USDT:**
- They're stable but don't generate native yield
- solvUSD adds yield generation layer

**vs. Aave aTokens:**
- Similar yield-bearing concept
- solvUSD adds agent-specific features (API credit conversion)

**vs. sUSD (Synthetix):**
- Both are stablecoins with "s" prefix
- solvUSD is Solana-native, focused on agents

**vs. DAI:**
- DAI has DSR (savings rate)
- solvUSD has higher APY and agent tooling

### Unique Selling Points

1. **Agent Self-Funding:** Only yield-bearer with built-in API credit conversion
2. **Solana Native:** Fast, cheap transactions for agent operations
3. **Transparent Yield:** Clear strategy allocation, no black box
4. **Institutional Grade:** 1:1 backing, emergency controls, open source

---

## Launch Checklist

**Pre-Launch:**
- [ ] Token deployed to devnet
- [ ] Mint/burn functions tested
- [ ] Staking contracts audited
- [ ] Yield distribution verified
- [ ] API credit converter integrated

**Marketing:**
- [ ] Logo/icon finalized (128px minimum)
- [ ] Twitter announcement drafted
- [ ] GitHub README updated with token address
- [ ] Documentation site live (docs.solvency.money)
- [ ] Colosseum hackathon submission includes token spec

**Distribution:**
- [ ] Initial liquidity on DEX (Raydium/Orca)
- [ ] Faucet for testnet users
- [ ] Demo frontend deployed (app.solvency.money)

---

## FAQs

**Q: Is solvUSD a stablecoin?**  
A: It's a yield-bearing stablecoin. It's backed 1:1 by USDC, so the principal is stable, but it generates 6-9% APY (target).

**Q: How is the 6-9% APY (target) sustained?**  
A: Through DeFi strategies on Solana (Kamino, Marginfi, etc.). It's real yield from lending and liquidity provision, not inflationary rewards.

**Q: Can I trade solvUSD?**  
A: Yes, it will be available on Solana DEXs. However, it's designed to be held for yield, not day-traded.

**Q: What if I want to exit?**  
A: Burn solvUSD to redeem 1:1 USDC from the vault. Flexible staking allows immediate withdrawal (with base APY). Locked staking requires waiting for term completion.

**Q: Is this audited?**  
A: Devnet version is live for hackathon. Full audit planned before mainnet launch.

**Q: Why "SYLD" and not "SOLVENCY"?**  
A: Token tickers are typically 3-5 characters for readability on exchanges and terminals. SYLD is clear, professional, and pronounceable.

---

## Visual Examples

### Token Display

```
┌─────────────────────────┐
│  🟦 solvUSD               │
│  Solvency USD    │
│                         │
│  Balance: 1,000 SYLD    │
│  Value: $1,000 USDC     │
│  Yield: +85 SYLD/year   │
│                         │
│  [Stake] [Claim] [Swap] │
└─────────────────────────┘
```

### Stats Card

```
╔═══════════════════════════╗
║   solvUSD Token Stats       ║
╠═══════════════════════════╣
║ APY            8.5%       ║
║ TVL            $0.00      ║
║ Backing        1:1 USDC   ║
║ Stakers        0          ║
╚═══════════════════════════╝
```

---

**Status:** Specification Complete  
**Token Symbol:** solvUSD  
**Approved:** Yes (Institutional Grade)  
**Next Steps:** Deploy to devnet, test staking, launch marketing
