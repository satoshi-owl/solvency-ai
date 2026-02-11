/**
 * AgentWallet Integration
 * Handles Solana transactions via AgentWallet API
 */

import axios from 'axios';
import { Connection, PublicKey, Transaction } from '@solana/web3.js';

const AGENTWALLET_API = 'https://api.agentwallet.ai';

export class AgentWalletClient {
  constructor(apiToken, solanaAddress) {
    this.apiToken = apiToken;
    this.address = new PublicKey(solanaAddress);
    this.headers = {
      'Authorization': `Bearer ${apiToken}`,
      'Content-Type': 'application/json'
    };
  }

  /**
   * Get wallet balance
   */
  async getBalance(rpcUrl) {
    const connection = new Connection(rpcUrl, 'confirmed');
    const balance = await connection.getBalance(this.address);
    return balance / 1e9; // Convert lamports to SOL
  }

  /**
   * Sign and send transaction via AgentWallet
   */
  async signAndSend(transaction, rpcUrl) {
    try {
      const serialized = transaction.serialize({
        requireAllSignatures: false
      }).toString('base64');

      const response = await axios.post(
        `${AGENTWALLET_API}/solana/sign-transaction`,
        {
          transaction: serialized,
          network: 'devnet'
        },
        { headers: this.headers }
      );

      // Send signed transaction
      const connection = new Connection(rpcUrl, 'confirmed');
      const signature = await connection.sendRawTransaction(
        Buffer.from(response.data.signedTransaction, 'base64')
      );

      await connection.confirmTransaction(signature);
      return signature;
    } catch (error) {
      console.error('Transaction failed:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Get token accounts
   */
  async getTokenAccounts(rpcUrl) {
    const connection = new Connection(rpcUrl, 'confirmed');
    const accounts = await connection.getParsedTokenAccountsByOwner(
      this.address,
      { programId: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA') }
    );
    return accounts.value;
  }
}

export default AgentWalletClient;
