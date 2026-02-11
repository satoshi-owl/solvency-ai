# DeFi Yield Research Roadmap

**Goal:** Prove 6-9% APY claims with real data. Small fish wins by being the reliable choice.

## Problem Statement

We're competing against established stablecoin players (Bankr, traditional USDC holders, TradFi savings). We can't win on brand recognition or peak APY promises. We win on **credibility and reliability**.

**Strategy:** Under-promise, over-deliver. Show the receipts.

## Research Deliverables

### 1. Historical Yield Analysis (3-6 Month Lookback)
**Goal:** Prove what APY is actually achievable with minimal risk

**Data to collect:**
- Kamino USDC lending rates (hourly/daily)
- Marginfi USDC lending rates (hourly/daily)
- Solend/Save USDC rates (if still operational)
- Orca USDC-USDT LP returns (fees + potential IL)
- Raydium USDC-USDT LP returns

**Deliverable:** Spreadsheet showing:
- Min/max/average APY per protocol
- Volatility (standard deviation)
- 95th percentile confidence interval
- "What would a $1000 deposit have earned?" backtests

**Tools:**
- DeFi Llama API
- Kamino/Marginfi historical APY endpoints
- Birdeye analytics
- Manual scraping if needed

**Timeline:** 2-3 hours

---

### 2. Risk Assessment Matrix
**Goal:** Quantify what "minimal risk" actually means

**Protocols to assess:**
- **Kamino Finance**
  - Smart contract audits? (Y/N, link)
  - TVL and duration
  - Historical exploits/incidents
  - Liquidation risk exposure
  - Risk score: 1-10

- **Marginfi**
  - Smart contract audits?
  - TVL and duration
  - Historical exploits/incidents
  - Liquidation parameters
  - Risk score: 1-10

- **Orca/Raydium (for USDC-USDT LPs)**
  - Audit status
  - Impermanent loss historical data
  - Pool depth/stability
  - Risk score: 1-10

**Deliverable:** Risk matrix table:
```
Protocol    | Audit | TVL   | Exploits | Liquidation Risk | Risk Score
------------|-------|-------|----------|------------------|------------
Kamino      | ✅    | $XXXm | None     | Low              | 3/10
Marginfi    | ✅    | $XXXm | None     | Low              | 3/10
Orca USDC-T | ✅    | $XXXm | None     | Minimal IL       | 4/10
```

**Timeline:** 2-3 hours

---

### 3. Conservative Portfolio Backtest
**Goal:** Prove "6-9% APY with minimal risk" is achievable

**Portfolio design:**
- **Conservative (target 4-6%):**
  - 100% Kamino/Marginfi USDC lending
  - No leverage, no rotation
  - Rebalance quarterly

- **Balanced (target 6-8%):**
  - 70% Kamino/Marginfi lending
  - 30% USDC-USDT LP (Orca)
  - Monthly rebalancing

- **Growth (target 8-10%+):**
  - 50% Kamino/Marginfi lending
  - 30% USDC-USDT LP
  - 20% protocol rotation (chase yields)
  - Weekly rebalancing

**Backtest method:**
- Use 3-6 month historical data
- Calculate actual returns for $10k portfolio
- Include gas costs (Solana = negligible but show transparency)
- Show volatility and drawdowns

**Deliverable:** Chart showing:
- Actual APY achieved vs target
- Risk-adjusted returns (Sharpe ratio if feeling fancy)
- Confidence interval ("We're 90% confident this portfolio returns 6-8%")

**Timeline:** 3-4 hours

---

### 4. Competitive Comparison
**Goal:** Show where competitors overpromise

**Competitors to analyze:**
- **Bankr** - What APY do they claim? What's their risk profile?
- **Traditional USDC holders** - 0% APY, no risk
- **Coinbase/Kraken staking** - ~2-4% APY, custodial risk
- **Anchor Protocol (Terra)** - (RIP, cautionary tale of unsustainable yields)

**Deliverable:** Comparison table:
```
Product         | Claimed APY | Actual APY | Risk Level | Credibility
----------------|-------------|------------|------------|-------------
Solvency AI     | 6-9%        | TBD (prove)| Low-Med    | High (receipts)
Bankr           | 10%+?       | Unknown    | Unknown    | Unproven
USDC (baseline) | 0%          | 0%         | Minimal    | Established
Coinbase        | 2-4%        | 2-4%       | Low        | High (custodial)
```

**Timeline:** 1-2 hours

---

### 5. Documentation & Marketing Materials
**Goal:** Turn research into credible marketing

**Assets to create:**
- **"Yield Transparency Report"** - PDF showing all data, methods, backtests
- **One-pager infographic** - "How we achieve 6-9% APY (with receipts)"
- **FAQ section** - "Why not 15% APY?" (because it's bullshit)
- **Twitter thread** - "We backtested 6 months of Solana DeFi yields. Here's what's actually achievable..."

**Tone:**
- Institutional honesty
- "We did the math so you don't have to"
- "Boring is good in DeFi"
- Show the work, build trust

**Timeline:** 2-3 hours

---

## Total Timeline Estimate
**15-20 hours** for comprehensive research and documentation

**Phased approach:**
1. **Phase 1 (Post-Hackathon, Week 1):** Historical yield analysis + risk matrix
2. **Phase 2 (Week 2):** Conservative portfolio backtest
3. **Phase 3 (Week 3):** Competitive comparison + marketing materials

---

## Success Metrics

**What "good" looks like:**
- ✅ Can prove 6-8% APY is achievable with 90%+ confidence
- ✅ Can show risk assessment for every protocol used
- ✅ Can point to specific backtests when asked "How do you hit those yields?"
- ✅ Competitors look like they're overpromising in comparison
- ✅ Institutional clients see us as "the reliable choice"

**What failure looks like:**
- ❌ Data shows we can only hit 4-5% consistently → adjust marketing
- ❌ Risk assessment shows protocols are shadier than expected → pivot protocols
- ❌ Backtests show high volatility → need better risk management

---

## Tools & Resources

**Data sources:**
- [DeFi Llama](https://defillama.com) - Protocol TVL and yields
- [Kamino Finance Docs](https://docs.kamino.finance) - Historical APY data
- [Marginfi Analytics](https://app.marginfi.com) - Lending pool stats
- [Birdeye](https://birdeye.so) - Solana DeFi analytics
- [Solscan](https://solscan.io) - On-chain data verification

**Analysis tools:**
- Google Sheets / Excel for backtests
- Python (pandas) for data analysis
- Chart.js or similar for visualizations

**Audit resources:**
- [Certik](https://certik.com)
- [Quantstamp](https://quantstamp.com)
- [Ackee Blockchain](https://ackee.xyz)

---

## Post-Hackathon Action Items

1. **Hire/contract DeFi analyst** (or do it ourselves if time permits)
2. **Set up automated yield tracking** - Daily snapshots of protocol APYs
3. **Build "Yield Transparency Dashboard"** - Live data showing current strategies
4. **Quarterly yield reports** - "Here's what we earned, here's the risk we took"

---

## The Bottom Line

**Small fish strategy:** We can't out-market Bankr. We can't out-brand Circle. But we can out-credible everyone by showing our work.

**Target audience:** 
- Institutional clients who care about "will I get 6% reliably?" > "maybe 10% sometimes"
- Builders who want infrastructure that doesn't collapse
- Users burned by Terra/Anchor who want honesty

**Competitive moat:** Transparency + reliability. Let them overpromise. We'll deliver.

---

**Next steps:** Prioritize Phase 1 (historical analysis + risk matrix) for immediate credibility boost. Rest can happen post-hackathon as part of "institutional roadmap."
