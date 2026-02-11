/**
 * Solvency AI - Main Agent Entry Point
 * Autonomous yield-bearing stablecoin management
 */

import 'dotenv/config';
import { Connection, PublicKey } from '@solana/web3.js';
import AgentWalletClient from './agent-wallet.js';
import { YieldEngine } from './yield-engine.js';

// Load environment
const {
  AGENTWALLET_API_TOKEN,
  AGENTWALLET_SOLANA_ADDRESS,
  HELIUS_RPC_URL,
  SOLANA_NETWORK = 'devnet'
} = process.env;

// Validate config
if (!AGENTWALLET_API_TOKEN || !AGENTWALLET_SOLANA_ADDRESS) {
  console.error('Missing required environment variables');
  process.exit(1);
}

const RPC_URL = HELIUS_RPC_URL || `https://api.${SOLANA_NETWORK}.solana.com`;

async function main() {
  console.log('🦉 Solvency AI - Autonomous Yield Agent');
  console.log('========================================\n');
  
  // Initialize AgentWallet
  console.log('Initializing AgentWallet...');
  const wallet = new AgentWalletClient(
    AGENTWALLET_API_TOKEN,
    AGENTWALLET_SOLANA_ADDRESS
  );
  
  // Check wallet balance
  const balance = await wallet.getBalance(RPC_URL);
  console.log(`Wallet: ${AGENTWALLET_SOLANA_ADDRESS}`);
  console.log(`Balance: ${balance} SOL\n`);
  
  // Check token accounts
  console.log('Checking token accounts...');
  const tokens = await wallet.getTokenAccounts(RPC_URL);
  console.log(`Found ${tokens.length} token accounts\n`);
  
  // TODO: Initialize vault program connection
  // For MVP demo, we'll mock the vault program
  const mockVaultProgram = {
    getVaultBalance: async () => 0, // Mock: no deposits yet
  };
  
  // Initialize yield engine
  console.log('Starting Yield Engine...');
  const engine = new YieldEngine(wallet, RPC_URL, mockVaultProgram);
  
  // Run initial analysis
  await engine.analyzeVault();
  
  // Start autonomous loop
  await engine.run();
  
  console.log('\n✅ Agent running. Press Ctrl+C to stop.');
}

// Handle shutdown
process.on('SIGINT', () => {
  console.log('\n\nShutting down Solvency AI...');
  process.exit(0);
});

// Run
main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
