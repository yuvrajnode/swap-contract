import { SwapQuote, SwapTransaction } from '../types/swap';

const JUPITER_API_BASE = 'https://api.jup.ag/swap/v1';
const QUOTE_API_BASE = 'https://api.jup.ag/price/v2';

export async function getSwapQuote(
  inputMint: string,
  outputMint: string,
  amount: string,
  slippageBps: number
): Promise<SwapQuote> {
  const params = new URLSearchParams({
    inputMint,
    outputMint,
    amount,
    slippageBps: slippageBps.toString(),
  });

  const response = await fetch(`${JUPITER_API_BASE}/quote?${params}`);
  
  if (!response.ok) {
    throw new Error(`Quote API error: ${response.status}`);
  }

  return response.json();
}

export async function getSwapTransaction(
  quote: SwapQuote,
  userPublicKey: string,
  wrapAndUnwrapSol: boolean = true,
  confirmationLevel: 'confirmed' | 'finalized' = 'confirmed'
): Promise<SwapTransaction> {
  const response = await fetch(`${JUPITER_API_BASE}/swap`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      quoteResponse: quote,
      userPublicKey,
      wrapAndUnwrapSol,
      prioritizationFeeLamports: 'auto',
      dynamicComputeUnitLimit: true,
      skipUserAccountsRpcCalls: true,
    }),
  });

  if (!response.ok) {
    throw new Error(`Swap API error: ${response.status}`);
  }

  return response.json();
}

export async function getPrice(tokenMint: string): Promise<string> {
  const response = await fetch(`${QUOTE_API_BASE}?ids=${tokenMint}`);
  
  if (!response.ok) {
    throw new Error(`Price API error: ${response.status}`);
  }

  const data = await response.json();
  return data.data[tokenMint]?.price || '0';
}
