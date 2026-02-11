#!/bin/bash
# Solvency AI - Deployment Script (Devnet)

set -e

echo "🦉 Solvency AI - Devnet Deployment"
echo "==================================="
echo ""

# Check Solana config
echo "Checking Solana configuration..."
solana config get

# Check balance
echo ""
echo "Checking wallet balance..."
BALANCE=$(solana balance)
echo "Balance: $BALANCE"

if [[ "$BALANCE" == "0 SOL" ]]; then
    echo "❌ Insufficient SOL for deployment"
    echo "Please request devnet SOL from:"
    echo "  https://faucet.solana.com"
    echo "  or use: solana airdrop 2"
    exit 1
fi

# Build programs
echo ""
echo "Building Anchor programs..."
anchor build

# Deploy
echo ""
echo "Deploying to devnet..."
anchor deploy --provider.cluster devnet

# Get program IDs
echo ""
echo "Deployed program IDs:"
solana address -k target/deploy/solvency_vault-keypair.json

# Initialize vault (TODO: Add initialization script)
echo ""
echo "⚠️  Next steps:"
echo "1. Update Anchor.toml with deployed program ID"
echo "2. Run initialization script"
echo "3. Test deposit/withdraw flow"
echo ""
echo "✅ Deployment complete!"
