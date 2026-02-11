# Solvency AI - Hackathon Submission Checklist

**Deadline:** February 12, 2026 (end of day)  
**Status:** In Progress 🟡

---

## ✅ Required for Submission

### Core Deliverables

- [ ] **Working Smart Contract on Devnet**
  - [x] Vault program code complete
  - [ ] Deployed to Devnet
  - [ ] Program ID documented
  - [ ] Basic testing done

- [ ] **Autonomous Agent**
  - [x] AgentWallet integration
  - [x] Yield engine logic
  - [x] Main loop implementation
  - [ ] Connected to deployed contract
  - [ ] Demonstrated running

- [ ] **Documentation**
  - [x] README.md
  - [x] DEMO.md guide
  - [ ] Architecture diagram
  - [ ] Video demo (2-5 min)

- [ ] **Submission Materials**
  - [ ] GitHub repository (public)
  - [ ] Submission form filled
  - [ ] Demo video uploaded
  - [ ] Social post (optional but recommended)

---

## 🚧 Current Blockers

### Critical
1. **Devnet SOL** - Need ~5 SOL for deployment
   - Faucet issues (GitHub account error)
   - Alternatives: QuickNode, SolFaucet, Discord
   - **STATUS:** Waiting on Owl

2. **Anchor CLI Installation** - Currently compiling
   - Expected: 10-15 min
   - Required for build + deploy

### Nice-to-Have (Not Blocking)
- Frontend UI (out of scope for MVP)
- Real DeFi integration (can mock for demo)
- Staking contracts (V1 feature)

---

## ⏰ Timeline (19 hours remaining)

### Next 2 Hours (01:30-03:30 UTC)
- [ ] Finish Anchor install
- [ ] Build contracts
- [ ] Get devnet SOL
- [ ] Deploy vault program

### Hours 3-6 (03:30-07:30 UTC)
- [ ] Test deposit/withdraw flow
- [ ] Connect agent to contract
- [ ] Demonstrate autonomous operation
- [ ] Fix any critical bugs

### Hours 7-12 (07:30-13:30 UTC)
- [ ] Record demo video
- [ ] Create architecture diagram
- [ ] Polish documentation
- [ ] Set up GitHub repo (public)

### Hours 13-18 (13:30-19:30 UTC)
- [ ] Submit to Colosseum
- [ ] Post on social media
- [ ] Buffer time for issues
- [ ] Final testing

### Hour 19 (19:30-20:30 UTC)
- Final submission check
- Backup time

---

## 📋 Post-Deployment Checklist

Once deployed, update these files:

- [ ] `Anchor.toml` - deployed program ID
- [ ] `app/.env` - VAULT_PROGRAM_ID
- [ ] `DEMO.md` - Devnet links
- [ ] `README.md` - program address
- [ ] Create `DEPLOYED.md` with:
  - Vault program ID
  - solvUSD token mint address
  - Deployment transaction signature
  - Test wallet addresses

---

## 🎥 Demo Video Script

**Target:** 3-5 minutes

1. **Intro** (30s)
   - Problem: Stable yields + bot self-funding
   - Solution: Solvency AI

2. **Architecture** (60s)
   - Show contract structure
   - Explain agent automation
   - Highlight differentiation

3. **Live Demo** (90s)
   - Deposit USDC → mint solvUSD
   - Show agent monitoring vault
   - Demonstrate yield strategy
   - Withdraw with yield

4. **Bot Use Case** (45s)
   - Show yield → API credits conversion
   - Explain self-funding mechanism

5. **Roadmap** (30s)
   - V1 features
   - Mainnet plans

6. **Call to Action** (15s)
   - Links, social, feedback request

---

## 🔍 Testing Checklist

Before submission, verify:

- [ ] Vault initialization works
- [ ] Deposit mints correct solvUSD amount
- [ ] Withdraw burns solvUSD and returns USDC
- [ ] Emergency pause functions
- [ ] Agent can read vault state
- [ ] Agent wallet integration working
- [ ] No obvious security issues
- [ ] All docs render correctly

---

## 📝 Submission Form Fields

Prepare answers for:

- Project name
- Description (1 sentence + 1 paragraph)
- Team members
- GitHub repo URL
- Demo video URL
- Devnet program ID
- Twitter/social handles
- Problem statement
- Solution explanation
- Tech stack
- Unique value proposition

---

**Last Updated:** 2026-02-11 01:35 UTC  
**Next Review:** After deployment
