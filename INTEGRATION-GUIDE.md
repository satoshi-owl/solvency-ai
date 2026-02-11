# Solvency AI Integration Guide

**Version:** 1.0  
**Date:** 2026-02-11  
**Network:** Testnet (Mainnet guide will follow)  
**Status:** 🟡 Draft - Ready for testnet integration

---

## Table of Contents

1. [Overview](#overview)
2. [Quick Start](#quick-start)
3. [SDK Installation](#sdk-installation)
4. [Core Concepts](#core-concepts)
5. [Integration Examples](#integration-examples)
6. [Agent Framework Integration](#agent-framework-integration)
7. [API Reference](#api-reference)
8. [Best Practices](#best-practices)
9. [Troubleshooting](#troubleshooting)

---

## Overview

### What is Solvency AI?

Solvency AI allows AI agents to **prove their solvency** by locking collateral on-chain. Users can verify an agent is solvent before transacting.

**Key Features:**
- **On-chain collateral:** Agents deposit SOL into vaults
- **Instant verification:** Anyone can check solvency status
- **Trustless:** No need to trust the agent operator
- **Composable:** Integrate with any Solana-based agent

### Who Should Integrate?

✅ **AI Agent Developers:** Add trust layer to your agents  
✅ **Agent Platforms:** Offer solvency verification to users  
✅ **DeFi Protocols:** Verify counterparty solvency  
✅ **Marketplaces:** Show solvency badges on agent listings  
✅ **Wallets:** Display agent solvency status  

---

## Quick Start

### 5-Minute Integration

**Goal:** Check if an agent is solvent

```typescript
import { Connection, PublicKey } from '@solana/web3.js';
import { SolvencyClient } from '@solvency-ai/sdk';

// 1. Connect to Solana
const connection = new Connection('https://api.testnet.solana.com');

// 2. Initialize Solvency client
const client = new SolvencyClient(connection, 'testnet');

// 3. Check agent solvency
const agentPubkey = new PublicKey('Your-Agent-Pubkey-Here');
const solvency = await client.checkSolvency(agentPubkey);

if (solvency.isSolvent) {
  console.log(`✅ Agent is solvent with ${solvency.collateral} SOL`);
} else {
  console.log(`❌ Agent is not solvent`);
}
```

**That's it!** You've verified agent solvency.

---

## SDK Installation

### JavaScript/TypeScript

```bash
npm install @solvency-ai/sdk @solana/web3.js
# or
yarn add @solvency-ai/sdk @solana/web3.js
# or
pnpm add @solvency-ai/sdk @solana/web3.js
```

### Python

```bash
pip install solvency-ai-sdk solana
```

### Rust

```toml
[dependencies]
solvency-ai-sdk = "0.1.0"
solana-client = "1.18"
solana-sdk = "1.18"
```

### Direct On-Chain (No SDK)

If you prefer direct on-chain calls:

```typescript
import { Connection, PublicKey } from '@solana/web3.js';
import { Program, AnchorProvider } from '@coral-xyz/anchor';
import idl from './solvency_vault_idl.json';

const PROGRAM_ID = new PublicKey('Your-Program-ID-Here'); // Will be provided after deployment

const provider = new AnchorProvider(connection, wallet, {});
const program = new Program(idl, PROGRAM_ID, provider);

// Derive vault PDA
const [vaultPDA] = PublicKey.findProgramAddressSync(
  [Buffer.from('vault'), agentPubkey.toBuffer()],
  PROGRAM_ID
);

// Fetch vault account
const vault = await program.account.vault.fetch(vaultPDA);
console.log('Collateral:', vault.balance.toString());
```

---

## Core Concepts

### 1. Vault Account

Every agent has a **vault account** (PDA) that stores:

```rust
pub struct Vault {
    pub agent: Pubkey,           // Agent's wallet address
    pub balance: u64,            // Locked collateral (lamports)
    pub last_verified: i64,      // Last verification timestamp
    pub status: VaultStatus,     // Active, Paused, Withdrawn
    pub bump: u8,                // PDA bump seed
}
```

**PDA Derivation:**
```
vault_pda = PDA(["vault", agent_pubkey], program_id)
```

### 2. Solvency Status

```typescript
enum VaultStatus {
  Active = 'active',       // Agent is operational, collateral locked
  Cooldown = 'cooldown',   // Agent initiated withdrawal, waiting period
  Withdrawn = 'withdrawn', // Collateral withdrawn, agent not solvent
}
```

### 3. Minimum Collateral

- **Testnet:** 0.1 SOL minimum (for testing)
- **Mainnet:** TBD (likely 1-10 SOL based on agent tier)

### 4. Cooldown Period

- When agent requests withdrawal: 24-hour cooldown
- Users have time to stop transacting with agent
- After cooldown: Agent can withdraw

---

## Integration Examples

### Example 1: Basic Solvency Check

```typescript
import { SolvencyClient } from '@solvency-ai/sdk';
import { Connection, PublicKey } from '@solana/web3.js';

async function checkAgentSolvency(agentPubkey: string) {
  const connection = new Connection('https://api.testnet.solana.com');
  const client = new SolvencyClient(connection, 'testnet');
  
  try {
    const solvency = await client.checkSolvency(
      new PublicKey(agentPubkey)
    );
    
    return {
      isSolvent: solvency.status === 'active' && solvency.balance > 0,
      collateral: solvency.balance / 1e9, // Convert lamports to SOL
      status: solvency.status,
      lastVerified: new Date(solvency.lastVerified * 1000),
    };
  } catch (error) {
    // Vault doesn't exist = not solvent
    return { isSolvent: false };
  }
}

// Usage
const result = await checkAgentSolvency('AgentPubkey...');
if (result.isSolvent) {
  console.log(`Agent has ${result.collateral} SOL locked`);
}
```

### Example 2: Display Solvency Badge (React)

```tsx
import { useSolvency } from '@solvency-ai/react-sdk';
import { PublicKey } from '@solana/web3.js';

function AgentCard({ agentPubkey }: { agentPubkey: string }) {
  const { solvency, loading, error } = useSolvency(
    new PublicKey(agentPubkey)
  );
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error checking solvency</div>;
  
  return (
    <div className="agent-card">
      <h3>Agent Name</h3>
      {solvency.isSolvent ? (
        <div className="badge solvent">
          ✅ Solvent
          <span className="collateral">{solvency.collateral} SOL</span>
        </div>
      ) : (
        <div className="badge not-solvent">
          ⚠️ Not Verified
        </div>
      )}
    </div>
  );
}
```

### Example 3: Agent Creates Vault (TypeScript)

```typescript
import { SolvencyClient } from '@solvency-ai/sdk';
import { Connection, Keypair } from '@solana/web3.js';

async function createAgentVault(
  agentKeypair: Keypair,
  initialDeposit: number // SOL
) {
  const connection = new Connection('https://api.testnet.solana.com');
  const client = new SolvencyClient(connection, 'testnet');
  
  // Initialize vault with deposit
  const signature = await client.initializeVault(
    agentKeypair,
    initialDeposit * 1e9 // Convert SOL to lamports
  );
  
  console.log(`Vault created! Tx: ${signature}`);
  
  // Get vault address
  const vaultPDA = client.getVaultAddress(agentKeypair.publicKey);
  console.log(`Vault address: ${vaultPDA.toString()}`);
  
  return { signature, vaultPDA };
}
```

### Example 4: Agent Deposits More Collateral

```typescript
async function addCollateral(
  agentKeypair: Keypair,
  amount: number // SOL
) {
  const connection = new Connection('https://api.testnet.solana.com');
  const client = new SolvencyClient(connection, 'testnet');
  
  const signature = await client.deposit(
    agentKeypair,
    amount * 1e9
  );
  
  console.log(`Deposited ${amount} SOL. Tx: ${signature}`);
  
  // Check new balance
  const solvency = await client.checkSolvency(agentKeypair.publicKey);
  console.log(`New balance: ${solvency.balance / 1e9} SOL`);
}
```

### Example 5: Agent Initiates Withdrawal

```typescript
async function withdrawCollateral(
  agentKeypair: Keypair,
  amount: number // SOL
) {
  const connection = new Connection('https://api.testnet.solana.com');
  const client = new SolvencyClient(connection, 'testnet');
  
  // Step 1: Initiate cooldown
  const initSignature = await client.initiateWithdrawal(agentKeypair);
  console.log(`Cooldown started. Tx: ${initSignature}`);
  console.log(`Wait 24 hours before completing withdrawal.`);
  
  // Step 2: After 24 hours, complete withdrawal
  // (In production, this would be done 24h later)
  setTimeout(async () => {
    const withdrawSignature = await client.completeWithdrawal(
      agentKeypair,
      amount * 1e9
    );
    console.log(`Withdrawn ${amount} SOL. Tx: ${withdrawSignature}`);
  }, 24 * 60 * 60 * 1000); // 24 hours
}
```

### Example 6: Monitor Agent Solvency Changes

```typescript
import { SolvencyClient } from '@solvency-ai/sdk';
import { Connection, PublicKey } from '@solana/web3.js';

async function monitorAgent(agentPubkey: PublicKey) {
  const connection = new Connection('https://api.testnet.solana.com');
  const client = new SolvencyClient(connection, 'testnet');
  
  // Subscribe to vault account changes
  const vaultPDA = client.getVaultAddress(agentPubkey);
  
  connection.onAccountChange(vaultPDA, (accountInfo) => {
    // Decode vault data
    const vault = client.decodeVault(accountInfo.data);
    
    console.log('Vault updated:', {
      balance: vault.balance / 1e9,
      status: vault.status,
      timestamp: new Date(vault.lastVerified * 1000),
    });
    
    // Trigger alerts if solvency changes
    if (vault.status !== 'active') {
      alert(`Agent ${agentPubkey} is no longer active!`);
    }
  });
  
  console.log(`Monitoring agent ${agentPubkey}...`);
}
```

---

## Agent Framework Integration

### 1. LangChain Integration

```typescript
import { SolvencyTool } from '@solvency-ai/langchain-tools';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { AgentExecutor } from 'langchain/agents';

// Add solvency checking to your agent
const tools = [
  new SolvencyTool({
    connection: new Connection('https://api.testnet.solana.com'),
    network: 'testnet',
  }),
  // ... other tools
];

const agent = new AgentExecutor({
  agent: yourAgent,
  tools,
});

// Agent can now check solvency of other agents
const result = await agent.run(
  "Check if agent ABC123... is solvent before executing trade"
);
```

### 2. AutoGPT Integration

```python
from solvency_ai import SolvencyClient
from solana.rpc.api import Client
from solana.publickey import PublicKey

class SolvencyCheckCommand:
    """AutoGPT command to check agent solvency"""
    
    def __init__(self):
        self.client = SolvencyClient(
            Client("https://api.testnet.solana.com"),
            network="testnet"
        )
    
    def execute(self, agent_pubkey: str) -> dict:
        """Check if an agent is solvent"""
        try:
            pubkey = PublicKey(agent_pubkey)
            solvency = self.client.check_solvency(pubkey)
            
            return {
                "solvent": solvency.is_solvent,
                "collateral": solvency.balance / 1e9,
                "status": solvency.status.value,
            }
        except Exception as e:
            return {"error": str(e)}
```

### 3. AgentGPT Integration

```typescript
import { SolvencyMiddleware } from '@solvency-ai/agentgpt';

// Add solvency checking middleware
const agent = new AgentGPT({
  // ... config
  middleware: [
    new SolvencyMiddleware({
      connection: new Connection('https://api.testnet.solana.com'),
      network: 'testnet',
      requireSolvency: true, // Reject tasks from insolvent agents
      minimumCollateral: 1, // SOL
    }),
  ],
});
```

### 4. Eliza (a16z) Integration

```typescript
import { SolvencyPlugin } from '@solvency-ai/eliza-plugin';
import { createElizaAgent } from '@elizaos/core';

const agent = createElizaAgent({
  // ... config
  plugins: [
    new SolvencyPlugin({
      connection: new Connection('https://api.testnet.solana.com'),
      network: 'testnet',
      autoCreateVault: true, // Automatically create vault on first run
      initialDeposit: 2, // SOL
    }),
  ],
});

// Agent now has solvency vault!
```

### 5. OpenClaw Agent Integration

```typescript
// For agents built with OpenClaw
import { SolvencyClient } from '@solvency-ai/sdk';
import { Connection, Keypair } from '@solana/web3.js';

class MyOpenClawAgent {
  private solvencyClient: SolvencyClient;
  private agentKeypair: Keypair;
  
  constructor() {
    const connection = new Connection('https://api.testnet.solana.com');
    this.solvencyClient = new SolvencyClient(connection, 'testnet');
    this.agentKeypair = Keypair.fromSecretKey(/* your key */);
  }
  
  async initialize() {
    // Create vault on first run
    await this.solvencyClient.initializeVault(
      this.agentKeypair,
      2 * 1e9 // 2 SOL initial deposit
    );
  }
  
  async beforeTask(task: any) {
    // Check our own solvency before accepting task
    const solvency = await this.solvencyClient.checkSolvency(
      this.agentKeypair.publicKey
    );
    
    if (!solvency.isSolvent) {
      throw new Error('Agent is not solvent, cannot accept task');
    }
  }
  
  async checkCounterparty(counterpartyPubkey: PublicKey) {
    // Verify counterparty agent is solvent
    const solvency = await this.solvencyClient.checkSolvency(
      counterpartyPubkey
    );
    
    if (!solvency.isSolvent) {
      throw new Error('Counterparty is not solvent, rejecting task');
    }
  }
}
```

---

## API Reference

### SolvencyClient

#### Constructor

```typescript
new SolvencyClient(
  connection: Connection,
  network: 'testnet' | 'mainnet-beta',
  programId?: PublicKey
)
```

#### Methods

**checkSolvency**
```typescript
async checkSolvency(agentPubkey: PublicKey): Promise<SolvencyStatus>
```
Returns solvency status of an agent.

**initializeVault**
```typescript
async initializeVault(
  agentKeypair: Keypair,
  initialDeposit: number // lamports
): Promise<string> // transaction signature
```
Creates a new vault for an agent.

**deposit**
```typescript
async deposit(
  agentKeypair: Keypair,
  amount: number // lamports
): Promise<string>
```
Deposits additional collateral.

**initiateWithdrawal**
```typescript
async initiateWithdrawal(
  agentKeypair: Keypair
): Promise<string>
```
Starts 24-hour cooldown period.

**completeWithdrawal**
```typescript
async completeWithdrawal(
  agentKeypair: Keypair,
  amount: number // lamports
): Promise<string>
```
Completes withdrawal after cooldown.

**getVaultAddress**
```typescript
getVaultAddress(agentPubkey: PublicKey): PublicKey
```
Returns PDA address of agent's vault.

**decodeVault**
```typescript
decodeVault(data: Buffer): Vault
```
Decodes raw vault account data.

### Types

```typescript
interface SolvencyStatus {
  isSolvent: boolean;
  balance: number; // lamports
  status: 'active' | 'cooldown' | 'withdrawn';
  lastVerified: number; // Unix timestamp
}

interface Vault {
  agent: PublicKey;
  balance: bigint;
  lastVerified: bigint;
  status: VaultStatus;
  bump: number;
}

enum VaultStatus {
  Active,
  Cooldown,
  Withdrawn,
}
```

---

## Best Practices

### For Agent Developers

1. **Create vault early:** Initialize vault during agent setup, not first transaction
2. **Monitor your solvency:** Regularly check your vault balance
3. **Maintain buffer:** Keep extra collateral beyond minimum (e.g., 2x minimum)
4. **Announce withdrawals:** Tell users 24h before initiating withdrawal
5. **Test on testnet first:** Always test full flow on testnet

### For Integrators

1. **Cache solvency checks:** Don't check every transaction (use 5-minute cache)
2. **Handle errors gracefully:** Vault might not exist (agent hasn't registered)
3. **Show status clearly:** Make solvency status visible to users
4. **Set minimums:** Define minimum acceptable collateral for your use case
5. **Monitor status changes:** Subscribe to account changes for real-time updates

### Security Considerations

1. **Don't trust status alone:** Check collateral amount, not just "solvent" flag
2. **Consider cooldown status:** Agent in cooldown might be exiting
3. **Economic alignment:** Higher collateral = more aligned incentives
4. **Combine with other signals:** Solvency + reputation + insurance
5. **Verify program ID:** Ensure you're calling the correct program

### Performance Tips

1. **Batch checks:** Check multiple agents in parallel
2. **Use RPC pools:** Don't rely on single RPC endpoint
3. **Cache aggressively:** Solvency doesn't change that often
4. **Index on-chain:** For marketplaces, index all vaults off-chain

---

## Troubleshooting

### Vault Not Found

```typescript
Error: Account does not exist
```

**Cause:** Agent hasn't created a vault yet.

**Solution:** 
- Check if `initializeVault` was called
- Agent may not be registered with Solvency AI

### Insufficient Collateral

```typescript
Error: Insufficient vault balance
```

**Cause:** Agent's vault has less than minimum required.

**Solution:**
- Agent needs to deposit more collateral
- Check minimum collateral requirements

### Unauthorized Signer

```typescript
Error: A seeds constraint was violated
```

**Cause:** Wrong keypair used to sign transaction.

**Solution:**
- Ensure agent is signing with correct keypair
- Verify vault PDA derivation is correct

### RPC Rate Limit

```typescript
Error: 429 Too Many Requests
```

**Cause:** Too many RPC calls.

**Solution:**
- Use RPC pooling (Helius, Triton, GenesisGo)
- Implement caching
- Batch requests

### Account Not Rent-Exempt

```typescript
Error: Account not rent exempt
```

**Cause:** Insufficient SOL for rent exemption.

**Solution:**
- Ensure agent has enough SOL for transaction + rent
- Minimum ~0.002 SOL needed for vault account

---

## Code Examples Repository

Full integration examples available at:

**GitHub:** https://github.com/solvency-ai/integration-examples

Examples include:
- Basic TypeScript integration
- React frontend with solvency badges
- Python agent integration
- LangChain tool
- AutoGPT plugin
- AgentGPT middleware
- Eliza plugin
- Monitoring scripts

---

## Support & Resources

### Documentation
- **Main Docs:** https://docs.solvency.ai
- **API Reference:** https://docs.solvency.ai/api
- **Architecture:** See ARCHITECTURE.md in repo

### Community
- **Discord:** https://discord.gg/solvency-ai
- **Telegram:** https://t.me/solvency_ai
- **Twitter:** https://twitter.com/solvency_ai

### Developer Support
- **Email:** developers@solvency.ai
- **GitHub Issues:** https://github.com/solvency-ai/solvency-vault/issues
- **Office Hours:** Fridays 3PM UTC in Discord

### SDKs
- **TypeScript/JavaScript:** [@solvency-ai/sdk](https://npmjs.com/package/@solvency-ai/sdk)
- **Python:** [solvency-ai-sdk](https://pypi.org/project/solvency-ai-sdk/)
- **Rust:** [solvency-ai-sdk](https://crates.io/crates/solvency-ai-sdk)

---

## Roadmap

### Q1 2026 (Current)
- ✅ Core vault program
- ✅ Basic TypeScript SDK
- 🟡 Testnet deployment (in progress)
- 🟡 Integration guides (this document)

### Q2 2026
- Python SDK
- Rust SDK
- React hooks library
- LangChain integration
- AutoGPT plugin
- Public mainnet launch

### Q3 2026
- Multi-asset support (USDC, other SPL tokens)
- Reputation scoring system
- Insurance integration (Nexus Mutual)
- Agent marketplace integration

### Q4 2026
- Cross-chain bridges (EVM, Cosmos)
- Advanced analytics dashboard
- DAO governance for parameters
- Institutional features

---

## License

The Solvency AI smart contract is licensed under MIT.
SDKs are open-source under Apache 2.0.

---

**Document Version:** 1.0  
**Last Updated:** 2026-02-11  
**Status:** 🟡 Draft - Will update after testnet deployment  
**Maintainer:** Technical Agent

**Note:** This guide will be updated with actual program IDs and RPC endpoints once testnet deployment is complete.
