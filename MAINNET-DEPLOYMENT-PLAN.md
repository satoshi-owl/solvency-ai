# Mainnet Deployment Plan

**Document Version:** 1.0  
**Date:** 2026-02-11  
**Status:** 🟡 DRAFT - Awaiting Testnet Success & Audit

---

## Table of Contents

1. [Overview](#overview)
2. [Mainnet vs Testnet Differences](#mainnet-vs-testnet-differences)
3. [Pre-Deployment Checklist](#pre-deployment-checklist)
4. [Security Hardening](#security-hardening)
5. [Deployment Process](#deployment-process)
6. [Post-Deployment Verification](#post-deployment-verification)
7. [Emergency Procedures](#emergency-procedures)
8. [Rollback Plan](#rollback-plan)

---

## Overview

### Purpose
This document outlines the complete plan for deploying the Solvency Vault smart contract to Solana **mainnet-beta**.

### Prerequisites
- ✅ Successful testnet deployment
- ✅ Comprehensive testing (unit, integration, E2E)
- ✅ Security audit completed (Code4rena or equivalent)
- ✅ All audit findings resolved
- ✅ Economic model validated
- ✅ Emergency procedures documented
- ✅ Team trained on emergency response

### Timeline (After Testnet Success)
1. **Week 1-2:** Security audit preparation
2. **Week 3-4:** Code4rena audit ($8k budget)
3. **Week 5:** Audit remediation
4. **Week 6:** Final testing & preparation
5. **Week 7:** Mainnet deployment
6. **Week 8+:** Monitoring & optimization

---

## Mainnet vs Testnet Differences

### 1. Network Configuration

| Aspect | Testnet | Mainnet |
|--------|---------|---------|
| **RPC Endpoint** | `https://api.testnet.solana.com` | `https://api.mainnet-beta.solana.com` |
| **Cluster** | testnet | mainnet-beta |
| **SOL Value** | Test tokens (no value) | Real SOL ($$$) |
| **Transaction Costs** | ~0.000005 SOL (negligible) | ~0.000005 SOL (real cost) |
| **Finality** | ~400ms (same) | ~400ms (same) |
| **Program Deployment Cost** | ~1-2 SOL (free from faucet) | ~1-2 SOL (**real cost**) |

### 2. Economic Considerations

**Testnet:**
- Unlimited SOL from faucet
- No financial risk
- Can redeploy freely
- Users play with test tokens

**Mainnet:**
- Real SOL required for:
  - Initial deployment: ~1-2 SOL
  - Upgrade authority rent: ~0.001 SOL
  - Transaction fees: ~0.000005 SOL per tx
- **Real user funds at risk**
- Redeployment = new program ID (breaks integrations)
- Economic attacks have real impact

### 3. Security Implications

**Testnet:**
- Lower stakes
- Can test exploits safely
- Rapid iteration possible
- Limited adversarial testing

**Mainnet:**
- **High stakes** - real money at risk
- **Adversarial environment** - active attackers
- **Immutability** - bugs can't be easily fixed
- **Reputational risk** - exploits damage project
- **Legal implications** - user fund loss can lead to liability

### 4. Upgrade Authority

**Testnet:**
- Can use personal wallet
- Less critical if compromised
- Frequent upgrades acceptable

**Mainnet:**
- **MUST use multisig or governance**
- Recommended: 3-of-5 multisig (Squads Protocol)
- Frequent upgrades signal instability
- Upgrade process must be transparent

### 5. Program ID Management

**Testnet:**
- Can change program ID freely
- Redeploy with new keypair
- Integration partners expect changes

**Mainnet:**
- **Program ID is permanent**
- Must be communicated to all integrators
- Changing = breaking all integrations
- **Backup keypair securely** (offline cold storage)

### 6. Monitoring & Alerting

**Testnet:**
- Manual monitoring acceptable
- Less critical if downtime occurs
- No 24/7 support needed

**Mainnet:**
- **24/7 monitoring required**
- Automated alerting for:
  - Unusual transaction patterns
  - Failed transactions spike
  - Program authority changes
  - Large fund movements
- On-call rotation for emergency response

### 7. Data & State

**Testnet:**
- Can reset/wipe state
- Test data acceptable
- Historical data less critical

**Mainnet:**
- **State is permanent**
- User data must be accurate
- Historical data is immutable
- Must plan for state migration if needed

---

## Pre-Deployment Checklist

### Code Readiness
- [ ] All security fixes from SECURITY-FIXES-APPLIED.md verified
- [ ] Code4rena audit completed with clean report
- [ ] All critical/high findings resolved
- [ ] Medium/low findings documented (accept or fix)
- [ ] Code freeze at least 1 week before deployment
- [ ] Final code review by 2+ experienced Solana developers
- [ ] No hardcoded testnet values (URLs, addresses, etc.)

### Testing Completeness
- [ ] Unit tests: 100% coverage of critical paths
- [ ] Integration tests: All user flows tested
- [ ] Fuzz testing: Edge cases and random inputs
- [ ] Load testing: Can handle expected transaction volume
- [ ] Adversarial testing: Attempted exploits documented
- [ ] Economic simulation: Vault behavior under various market conditions
- [ ] Mainnet-fork testing: Test against real mainnet state

### Infrastructure
- [ ] Mainnet RPC endpoint configured (private node recommended)
- [ ] Backup RPC endpoints (GenesisGo, Triton, etc.)
- [ ] Monitoring stack deployed:
  - [ ] Transaction monitoring (APY.fi, Birdeye, or custom)
  - [ ] Error alerting (Sentry, PagerDuty)
  - [ ] Performance metrics (Prometheus + Grafana)
- [ ] Deployment wallet secured (hardware wallet or MPC)
- [ ] Multisig setup for upgrade authority (Squads or Goki)
- [ ] Emergency contact list prepared

### Documentation
- [ ] User-facing documentation complete
- [ ] Integration guide for developers (INTEGRATION-GUIDE.md)
- [ ] Emergency procedures documented
- [ ] Upgrade process documented
- [ ] Known limitations disclosed
- [ ] Terms of service reviewed by legal counsel

### Legal & Compliance
- [ ] Terms of service finalized
- [ ] Privacy policy published
- [ ] Regulatory review (if applicable)
- [ ] Insurance options explored (Nexus Mutual, etc.)
- [ ] Incident response plan legal review

### Economic Model
- [ ] Fee structure validated
- [ ] Collateral ratios stress-tested
- [ ] Liquidation mechanisms tested
- [ ] Oracle dependencies documented
- [ ] Economic attack vectors analyzed
- [ ] Game theory review completed

### Team Readiness
- [ ] All team members trained on emergency procedures
- [ ] On-call rotation scheduled (24/7 coverage for first month)
- [ ] Communication channels tested (Discord, Telegram, etc.)
- [ ] Post-deployment checklist prepared
- [ ] Marketing/launch plan ready

---

## Security Hardening

### 1. Upgrade Authority Management

**❌ DO NOT:**
- Use a single private key
- Store keys on internet-connected machines
- Use the deployment wallet as upgrade authority

**✅ DO:**
- Use 3-of-5 or 2-of-3 multisig (Squads Protocol)
- Distribute keys across team + trusted advisors
- Store keys in hardware wallets (Ledger) or MPC vaults
- Document key holders and backup plans
- Set up 24-48 hour timelock for upgrades

**Implementation:**
```bash
# Create Squads multisig (example)
# https://squads.so/

# Transfer upgrade authority from deployment wallet to multisig
solana program set-upgrade-authority <PROGRAM_ID> \
  --new-upgrade-authority <MULTISIG_ADDRESS> \
  --url mainnet-beta
```

### 2. Rent-Exempt Accounts

**Critical:** All program-owned accounts must be rent-exempt.

- Vault accounts: MUST be rent-exempt
- PDA accounts: Automatically rent-exempt
- User accounts: Enforce minimum balance

**Verification:**
```bash
# Check program account is rent-exempt
solana account <PROGRAM_ID> --url mainnet-beta | grep "Rent Epoch"
# Should show: Rent Epoch: 0 (means rent-exempt)
```

### 3. Access Control Validation

**Before mainnet:**
- [ ] Only authorized signers can call admin functions
- [ ] No backdoors or privileged access
- [ ] Time-locked operations where appropriate
- [ ] Multi-signature for critical operations

**Test:**
```rust
// Verify unauthorized users can't call admin functions
#[test]
fn test_unauthorized_admin_call() {
    // Should fail
    initialize_vault(&non_admin_signer).expect_err("Should fail");
}
```

### 4. Oracle Security

**If using price oracles (Pyth, Switchboard, etc.):**
- [ ] Multiple oracle sources (redundancy)
- [ ] Staleness checks (reject old prices)
- [ ] Circuit breakers (pause if price deviates >X%)
- [ ] Fallback mechanisms

### 5. Rate Limiting

**Protect against spam/DOS:**
- Implement per-user rate limits
- Cool-down periods for large withdrawals
- Maximum transaction size limits
- Gradual unlocking for new features

### 6. Emergency Pause Mechanism

**CRITICAL for mainnet:**
```rust
// Program must have emergency pause
pub struct VaultState {
    pub paused: bool,
    pub pause_authority: Pubkey,
    // ... other fields
}

// Check in all user-facing instructions
if vault.paused {
    return Err(ErrorCode::VaultPaused.into());
}
```

**Pause conditions:**
- Exploit detected
- Unusual activity patterns
- Oracle failure
- Critical bug discovered

---

## Deployment Process

### Step 1: Final Preparation (1 week before)

```bash
# 1. Create dedicated deployment environment
mkdir -p ~/mainnet-deployment
cd ~/mainnet-deployment

# 2. Clone production branch
git clone https://github.com/your-org/solvency-ai.git
cd solvency-ai
git checkout production  # Production branch, not main

# 3. Verify commit hash matches audited code
git log -1 --pretty=format:"%H"
# Compare with audit report hash

# 4. Clean build
rm -rf target/
cargo clean
```

### Step 2: Build Verification (2 days before)

```bash
# 1. Build deterministically
anchor build

# 2. Verify binary hash
sha256sum target/deploy/solvency_vault.so
# Compare with team members' builds (should match)

# 3. Verify program size
ls -lh target/deploy/solvency_vault.so
# Should be <200KB

# 4. Disassemble and review
# Use https://explorer.solana.com/inspector
# Upload .so file and review instructions
```

### Step 3: Deployment Rehearsal (1 day before)

```bash
# 1. Deploy to testnet one final time
solana config set --url testnet
anchor deploy --provider.cluster testnet

# 2. Run full integration test suite
npm run test:integration

# 3. Test emergency pause
# Call pause function, verify all user operations blocked

# 4. Test emergency resume
# Unpause, verify operations work again

# 5. Document exact steps taken
# This becomes your mainnet deployment script
```

### Step 4: Mainnet Deployment (D-Day)

**Deployment Window:** Tuesday-Thursday, 10:00 AM UTC
- **Why Tuesday-Thursday:** Team available, not Friday (weekend risk)
- **Why 10:00 AM UTC:** All timezones covered, not late night

**Pre-Deployment:**
```bash
# 1. Team call - all hands on deck
# - Deployment lead
# - Backend engineer
# - Frontend engineer
# - Security engineer
# - Community manager (for announcements)

# 2. Final checks
solana config get
# Verify: url = https://api.mainnet-beta.solana.com

# 3. Verify wallet balance
solana balance
# Need at least 3 SOL (2 for deployment + buffer)

# 4. Backup deployment keypair
cp ~/.config/solana/id.json ~/backup/mainnet-deploy-key-$(date +%Y%m%d).json
# Store offline securely
```

**Deployment Commands:**
```bash
# LIVE DEPLOYMENT - POINT OF NO RETURN

# 1. Deploy program
anchor deploy --provider.cluster mainnet-beta --provider.wallet ~/.config/solana/id.json

# Output:
# Program Id: <PROGRAM_ID>
# SAVE THIS IMMEDIATELY!

# 2. Verify deployment
export PROGRAM_ID="<from_above>"
solana program show $PROGRAM_ID --url mainnet-beta

# 3. Verify upgrade authority
solana program show $PROGRAM_ID --url mainnet-beta | grep "Upgrade Authority"
# Should be your deployment wallet (will transfer to multisig next)

# 4. Initialize program state
anchor run initialize --provider.cluster mainnet-beta
# Or call initialize instruction manually

# 5. Transfer upgrade authority to multisig (CRITICAL!)
solana program set-upgrade-authority $PROGRAM_ID \
  --new-upgrade-authority <MULTISIG_ADDRESS> \
  --url mainnet-beta

# 6. Verify authority transfer
solana program show $PROGRAM_ID --url mainnet-beta | grep "Upgrade Authority"
# Should now be multisig address
```

### Step 5: Immediate Post-Deployment (First 30 minutes)

```bash
# 1. Document program ID everywhere
echo "MAINNET_PROGRAM_ID=$PROGRAM_ID" >> .env.production
git add .env.production
git commit -m "🚀 Mainnet deployment - Program ID: $PROGRAM_ID"
git tag -a v1.0.0-mainnet -m "Mainnet launch"
git push origin production --tags

# 2. Update website
# Frontend team: Update src/config/solana.ts with mainnet program ID

# 3. Update documentation
# Replace all testnet references with mainnet

# 4. Verify on Solana Explorer
# https://explorer.solana.com/address/$PROGRAM_ID?cluster=mainnet-beta

# 5. Test basic operations
# Create test vault
# Deposit small amount (0.1 SOL)
# Withdraw
# Verify all works correctly

# 6. Monitor for first hour
# Watch for any errors or unusual activity
```

---

## Post-Deployment Verification

### Immediate Checks (First 1 Hour)

- [ ] Program appears on Solana Explorer
- [ ] Upgrade authority correctly set to multisig
- [ ] Program is rent-exempt (Rent Epoch: 0)
- [ ] Test deposit transaction succeeds
- [ ] Test withdrawal transaction succeeds
- [ ] All program instructions callable
- [ ] No errors in monitoring logs
- [ ] Frontend connects correctly
- [ ] API endpoints return correct data

### First 24 Hours

- [ ] Monitor transaction volume
- [ ] Check error rates (<1% acceptable)
- [ ] Verify no failed transactions from bugs
- [ ] Monitor SOL balance (should not drain unexpectedly)
- [ ] Social media monitoring (Twitter, Discord)
- [ ] User feedback collection
- [ ] Performance metrics within expected ranges
- [ ] No security alerts triggered

### First Week

- [ ] Daily team check-ins
- [ ] Weekly security review
- [ ] User behavior analysis
- [ ] Economic model validation (fees, collateral)
- [ ] Integration partner feedback
- [ ] Bug report review (should be zero critical)
- [ ] Plan for future upgrades if needed

---

## Emergency Procedures

### 1. Critical Bug Discovered

**Severity: CRITICAL - User funds at risk**

**Immediate Actions (within 5 minutes):**
1. Call emergency pause (if available)
2. Alert all team members via emergency group
3. Post public notice (Twitter, Discord)
4. Disable frontend access

**Next Steps (within 1 hour):**
1. Analyze bug severity and impact
2. Determine if user funds are at risk
3. Prepare emergency upgrade if needed
4. Contact security partners (Immunefi, etc.)
5. Prepare public communication

**Emergency Upgrade Process:**
1. Multisig signers coordinate (need 3-of-5)
2. Build and verify fix
3. Test fix on devnet + mainnet-fork
4. Deploy upgrade via multisig
5. Resume operations
6. Post-mortem report within 48 hours

### 2. Exploit Detected

**Severity: CRITICAL - Active attack**

**Immediate Actions (within 1 minute):**
1. PAUSE PROGRAM IMMEDIATELY
2. Alert entire team
3. Screenshot all evidence
4. Contact Solana Foundation security team

**Do NOT:**
- Publicly disclose exploit details (yet)
- Panic or make rushed decisions
- Communicate externally without legal review

**Do:**
- Preserve all evidence
- Contact affected users privately
- Work with security researchers
- Prepare compensation plan if funds lost

### 3. Oracle Failure

**Severity: HIGH - Price data unreliable**

**Actions:**
1. Pause operations dependent on oracle
2. Switch to backup oracle (if available)
3. Monitor price discrepancies
4. Resume when oracle data reliable
5. Review oracle selection post-incident

### 4. Unexpected State

**Severity: MEDIUM - Program state inconsistent**

**Actions:**
1. Identify affected accounts
2. Pause affected operations
3. Investigate root cause
4. Manual state correction if possible
5. Upgrade to prevent recurrence

---

## Rollback Plan

### Can We Rollback on Mainnet?

**❌ NO - Solana programs cannot be "rolled back" in traditional sense**

However, you can:

### 1. Upgrade to Previous Version

```bash
# If new version has bugs, upgrade back to old version
# Requires:
# - Multisig approval
# - Old program binary available
# - State compatibility

# Process:
solana program write-buffer target/deploy/solvency_vault_v1.0.0.so
# Note buffer address
solana program set-buffer-authority <BUFFER> --new-buffer-authority <MULTISIG>
# Multisig approves and upgrades
```

**Limitations:**
- Only works if state structure is compatible
- Cannot undo state changes (user deposits/withdrawals persist)
- Requires multisig coordination

### 2. Deploy New Program

**If upgrade not viable:**
- Deploy entirely new program (new program ID)
- Migrate user state manually
- Compensate users for migration costs
- **VERY EXPENSIVE AND DISRUPTIVE**

**Process:**
1. Deploy new program ID
2. Pause old program
3. Build migration tool
4. Contact all users to migrate
5. Compensate gas fees
6. Update all integrations

**Cost Estimate:**
- New deployment: 2 SOL
- User migration gas: 0.000005 SOL × users
- Reputation damage: High
- Integration partner disruption: High

### 3. Compensation Fund

**If exploit leads to user fund loss:**
- Insurance coverage (if purchased)
- Team compensation from treasury
- Community goodwill gesture
- Legal settlement (worst case)

**Preparation:**
- Set aside 10-20% of initial funding as emergency reserve
- Consider Nexus Mutual coverage
- Legal entity setup for liability protection

---

## Mainnet Deployment Costs

### One-Time Costs

| Item | Cost | Notes |
|------|------|-------|
| Program deployment | ~1.5 SOL | Rent-exempt program account |
| Initial testing | ~0.5 SOL | Test transactions |
| Multisig setup | ~0.1 SOL | Squads creation |
| **Total** | **~2.1 SOL** | **~$500 @ $250/SOL** |

### Ongoing Costs

| Item | Cost/Month | Notes |
|------|------------|-------|
| RPC endpoint (private) | $200-500 | Triton, GenesisGo, or run own node |
| Monitoring tools | $50-200 | Sentry, DataDog, custom |
| On-call support | $0-$2000 | If hiring external |
| Program upgrades | ~0.5 SOL each | Only when needed |
| **Total** | **$250-2700/month** | Varies by scale |

---

## Checklist Summary

**Before Deployment:**
- [ ] Testnet successful for >1 week
- [ ] Security audit complete
- [ ] All critical findings resolved
- [ ] Team trained
- [ ] Monitoring deployed
- [ ] Multisig setup
- [ ] Documentation complete
- [ ] Legal review done

**Deployment Day:**
- [ ] Team on call
- [ ] Final code review
- [ ] Deterministic build
- [ ] Deploy to mainnet
- [ ] Transfer to multisig
- [ ] Test basic operations
- [ ] Update documentation
- [ ] Public announcement

**Post-Deployment:**
- [ ] Monitor first hour
- [ ] Daily checks first week
- [ ] User feedback collection
- [ ] Performance metrics review
- [ ] Plan next iteration

---

## Success Metrics

**Week 1:**
- Zero critical bugs
- <1% transaction failure rate
- >90% user satisfaction
- All integrations working

**Month 1:**
- No security incidents
- Transaction volume growing
- Positive community sentiment
- At least 1 successful upgrade (minor)

**Year 1:**
- Establish as reliable protocol
- Multiple integrations
- Community-driven governance
- Sustainable economic model

---

**Document Owner:** Technical Agent  
**Last Updated:** 2026-02-11  
**Next Review:** After successful testnet deployment  
**Status:** 🟡 DRAFT - Will finalize post-testnet

