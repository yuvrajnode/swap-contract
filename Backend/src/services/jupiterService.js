import axios from 'axios';

const JUPITER_SWAP_API = 'https://api.jup.ag/swap/v1';
const JUPITER_QUOTE_API = 'https://api.jup.ag/price/v2';

export async function getQuote(inputMint, outputMint, amount, slippageBps = '50') {
  const params = new URLSearchParams({
    inputMint,
    outputMint,
    amount,
    slippageBps,
  });

  const response = await axios.get(`${JUPITER_SWAP_API}/quote?${params}`);
  return response.data;
}

export async function getSwapTransaction(quote, userPublicKey, wrapAndUnwrapSol = true) {
  const response = await axios.post(`${JUPITER_SWAP_API}/swap`, {
    quoteResponse: quote,
    userPublicKey,
    wrapAndUnwrapSol,
    prioritizationFeeLamports: 'auto',
    dynamicComputeUnitLimit: true,
    skipUserAccountsRpcCalls: true,
  });

  return response.data;
}

export async function executeSwap(quote, userPublicKey) {
  // This is a placeholder for server-side swap execution
  // Would require a wallet keypair to sign transactions
  throw new Error('Server-side swap execution not implemented. Use client-side signing.');
}
