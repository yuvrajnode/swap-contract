import { Connection, PublicKey } from '@solana/web3.js';

export function createConnection(network = 'mainnet-beta') {
  const endpoint =
    process.env.SOLANA_RPC_URL ||
    `https://api.${network}.solana.com`;
  return new Connection(endpoint, 'confirmed');
}

export function validatePublicKey(key) {
  try {
    new PublicKey(key);
    return true;
  } catch {
    return false;
  }
}

export function lamportsToSol(lamports) {
  return lamports / 1e9;
}

export function solToLamports(sol) {
  return Math.floor(sol * 1e9);
}
