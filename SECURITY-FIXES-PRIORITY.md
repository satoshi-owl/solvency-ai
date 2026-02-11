# Security Fixes Priority List
**Based on CTO Strategic Analysis**  
**Date:** 2026-02-11

## 🔴 CRITICAL - Block Deployment Until Fixed

### 1. Mint Authority Not Set
**File:** `programs/vault/src/lib.rs`  
**Line:** Initialize function  
**Risk:** Deployer can mint unlimited solvUSD, rug pull vault

**Fix:**
```rust
// In initialize() function, add:
let cpi_accounts = SetAuthority {
    current_authority: ctx.accounts.authority.to_account_info(),
    account_or_mint: ctx.accounts.solv_mint.to_account_info(),
};
token::set_authority(
    CpiContext::new(ctx.accounts.token_program.to_account_info(), cpi_accounts),
    AuthorityType::MintTokens,
    Some(vault.key()),
)?;
```

**Effort:** 30 minutes  
**Must fix before:** Any deployment

---

### 2. Vault USDC Account Ownership Not Validated
**File:** `programs/vault/src/lib.rs`  
**Line:** Deposit and Withdraw context structs  
**Risk:** Attacker can mint solvUSD without depositing real USDC

**Fix:**
```rust
// In Deposit and Withdraw contexts:
#[account(
    mut,
    constraint = vault_usdc.mint == vault.usdc_mint,
    constraint = vault_usdc.owner == vault.key()  // ADD THIS
)]
pub vault_usdc: Account<'info, TokenAccount>,
```

**Effort:** 5 minutes  
**Must fix before:** Any deployment

---

### 3. Integer Overflow in Yield Calculation
**File:** `programs/vault/src/lib.rs`  
**Line:** Withdraw function (when yield is implemented)  
**Risk:** Overflow allows withdrawal of entire vault for pennies

**Fix:**
```rust
// When implementing yield withdrawal:
let withdrawal_amount = principal
    .checked_add(accrued_yield)
    .ok_or(VaultError::Overflow)?;

// Use checked_add everywhere amounts are added
```

**Effort:** 1-2 hours (implement yield + use checked math everywhere)  
**Must fix before:** Adding yield distribution feature

---

### 4. No Deposit Caps or Rate Limits
**File:** `programs/vault/src/lib.rs`  
**Risk:** Flash loan attacks, economic DoS, whale manipulation

**Fix:**
```rust
// Add to Vault struct:
pub max_deposit: u64,
pub max_total_deposits: u64,
pub min_deposit: u64,

// In deposit():
require!(
    amount >= vault.min_deposit && amount <= vault.max_deposit,
    VaultError::DepositOutOfBounds
);
require!(
    vault.total_deposits.checked_add(amount)
        .ok_or(VaultError::Overflow)? <= vault.max_total_deposits,
    VaultError::VaultCapacityExceeded
);
```

**Effort:** 2-3 hours  
**Must fix before:** Mainnet deployment

---

## 🟡 HIGH - Fix Before Mainnet

### 5. Agent Wallet Key Management
**File:** `app/src/agent-wallet.js`, `.env`  
**Risk:** Compromised server = drained vault

**Short-term fix:**
- Move API token to encrypted secrets manager (AWS Secrets Manager, HashiCorp Vault)
- Implement spending limits (max $1000/day without human approval)
- Add monitoring/alerts on large transactions

**Long-term fix:**
- Multi-signature for operations >$1000
- Hardware security module (HSM) for production keys
- Timelock on capital movements >10% of TVL

**Effort:** 1 week (short-term), 1 month (long-term)

---

### 6. No Emergency Withdraw in Agent
**File:** `app/src/yield-engine.js`  
**Risk:** Can't respond quickly to protocol exploits

**Fix:**
```javascript
async monitorProtocolHealth() {
  for (const protocol of this.protocols) {
    const tvlChange24h = await this.getTVLChange(protocol);
    if (tvlChange24h < -0.3) { // 30% TVL drop
      await this.emergencyWithdrawAll(protocol);
      await this.pauseDeposits(protocol);
      await this.alertHumans(`CRITICAL: ${protocol} TVL dropped 30%`);
    }
  }
}
```

**Effort:** 1 week

---

### 7. No Slippage Protection
**File:** `app/src/yield-engine.js`  
**Risk:** MEV bots front-run deposits, steal value

**Fix:** Implement slippage limits when integrating with DEXs/protocols  
**Effort:** 2-3 days per protocol

---

## 🟠 MEDIUM - Fix in First Month

### 8. Error Handling Without Retries
**File:** `app/src/yield-engine.js`  
**Fix:** Add retry logic with exponential backoff  
**Effort:** 2-3 days

### 9. No APY Data Validation
**File:** `app/src/yield-engine.js`  
**Fix:** Sanity check APY data (max 100%, historical comparison)  
**Effort:** 1 day

### 10. Single RPC Dependency
**File:** Throughout app  
**Fix:** Add fallback RPC endpoints, health checking  
**Effort:** 1-2 days

---

## Timeline

**Before Testnet Deployment:**
- ✅ Fix #1: Mint authority (30 min)
- ✅ Fix #2: Vault ownership validation (5 min)
- ✅ Fix #4: Deposit caps (3 hours)
- **Total: 4 hours**

**Before Mainnet Deployment:**
- ✅ All above
- ✅ Professional security audit ($20-30k, 2-4 weeks)
- ✅ Fix #5: Better key management (1 week)
- ✅ Fix #6: Emergency monitoring (1 week)
- ✅ Fix #7: Slippage protection (1 week)
- **Total: 6-8 weeks + audit time**

**First Month After Launch:**
- ✅ Fix #8-10: Error handling, validation, redundancy
- **Total: 1 week**

---

## Audit Recommendations

**Firms to Contact:**
1. **Zellic** - Specializes in Solana, good track record
2. **Trail of Bits** - Expensive but thorough
3. **OtterSec** - Solana-focused, mid-range pricing
4. **Neodyme** - Solana experts, German-based

**Budget:** $15k-30k depending on firm and scope  
**Timeline:** 2-4 weeks after code freeze  
**Scope:** Smart contract only (agent can be audited separately or internally reviewed)

---

## Risk Acceptance

**For Hackathon Submission:**
- ✅ It's OK to have these issues in hackathon code
- ✅ Judges will appreciate that we identified them
- ✅ Shows security awareness even if not implemented

**For Testnet:**
- ✅ Must fix critical issues (#1-4)
- ⚠️ Can defer high/medium issues with limited TVL (<$10k)
- ✅ Document known issues publicly

**For Mainnet:**
- ❌ Cannot launch with any critical issues
- ❌ Cannot launch without professional audit
- ❌ Cannot launch without fixing high-priority issues
- ⚠️ Medium issues can be addressed in first month with monitoring

---

## Developer Checklist

Before each deployment:

```
Testnet:
[ ] Fixed mint authority transfer
[ ] Fixed vault ownership validation
[ ] Added deposit caps
[ ] Tested all functions with real SOL
[ ] Documented known issues

Mainnet:
[ ] All testnet items
[ ] Professional audit completed
[ ] All critical/high findings resolved
[ ] Confirmatory re-audit passed
[ ] Insurance or disclaimer in place
[ ] Emergency response plan documented
[ ] Monitoring & alerting configured
[ ] Multi-sig on admin functions
[ ] Bug bounty program launched
```

---

**This is not optional. Security first, always.**
