# Solana Playground Deployment Guide

## Quick Deploy (10 minutes)

### 1. Open Playground
Go to: https://beta.solpg.io

### 2. Create New Anchor Project
- Click "Create a new project"
- Choose "Anchor (Rust)"
- Name it "solvency-vault"

### 3. Replace Code
Delete the default code and paste our vault program:

**File: `lib.rs`** (see PLAYGROUND-CODE.md)

### 4. Build
- Click "Build" button (or Ctrl+B)
- Wait for compilation (1-2 min)
- Should see "Build successful"

### 5. Deploy to Testnet
- Make sure "Devnet" or "Testnet" is selected in network dropdown
- Click "Deploy"
- Approve the wallet connection
- Wait for deployment
- **COPY THE PROGRAM ID** - you'll need this!

### 6. Verify Deployment
```
solana program show <PROGRAM_ID> --url testnet
```

### 7. Update Our Code
Add the program ID to:
- `Anchor.toml` (programs.testnet section)
- `app/.env` (VAULT_PROGRAM_ID)

---

## Troubleshooting

**"Insufficient SOL"**
- Playground wallet needs ~1 SOL for deployment
- Use faucet inside Playground (click wallet icon → "Airdrop")

**"Build failed"**
- Check Rust syntax
- Make sure all imports are correct
- Try the simplified version in PLAYGROUND-CODE.md

**"Deployment failed"**
- Check network (should be testnet/devnet)
- Retry - sometimes network is congested
- Check Playground wallet has SOL

---

## After Deployment

1. Test the program:
```bash
# In our local environment
cd solvency-ai
# Update Anchor.toml with deployed program ID
# Run test script
```

2. Connect agent to deployed program
3. Demo the flow!

---

**Estimated Time:** 10-15 minutes if smooth, 30 minutes with troubleshooting
