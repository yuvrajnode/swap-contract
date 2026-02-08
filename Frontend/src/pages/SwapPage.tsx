import React, { useState, useCallback } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { PublicKey, VersionedTransaction } from '@solana/web3.js';
import toast from 'react-hot-toast';
import SwapCard from '../components/SwapCard';
import TokenSelector from '../components/TokenSelector';
import { Token, SwapQuote } from '../types/swap';
import { getSwapQuote, getSwapTransaction } from '../utils/jupiter';

const SOL_TOKEN: Token = {
  symbol: 'SOL',
  name: 'Solana',
  mint: 'So11111111111111111111111111111111111111112',
  decimals: 9,
  logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
};

const USDC_TOKEN: Token = {
  symbol: 'USDC',
  name: 'USD Coin',
  mint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
  decimals: 6,
  logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png',
};

export default function SwapPage() {
  const { publicKey, signTransaction, connected } = useWallet();
  const { connection } = useConnection();
  
  const [inputToken, setInputToken] = useState<Token>(SOL_TOKEN);
  const [outputToken, setOutputToken] = useState<Token>(USDC_TOKEN);
  const [inputAmount, setInputAmount] = useState<string>('');
  const [quote, setQuote] = useState<SwapQuote | null>(null);
  const [loading, setLoading] = useState(false);
  const [showTokenSelector, setShowTokenSelector] = useState<'input' | 'output' | null>(null);

  const fetchQuote = useCallback(async () => {
    if (!inputAmount || parseFloat(inputAmount) === 0) {
      setQuote(null);
      return;
    }

    setLoading(true);
    try {
      const inAmount = Math.floor(parseFloat(inputAmount) * 10 ** inputToken.decimals).toString();
      const quoteData = await getSwapQuote(
        inputToken.mint,
        outputToken.mint,
        inAmount,
        50 // 0.5% slippage
      );
      setQuote(quoteData);
    } catch (error) {
      console.error('Error fetching quote:', error);
      toast.error('Failed to fetch swap quote');
      setQuote(null);
    } finally {
      setLoading(false);
    }
  }, [inputAmount, inputToken, outputToken]);

  const executeSwap = async () => {
    if (!publicKey || !signTransaction || !quote) {
      toast.error('Please connect wallet first');
      return;
    }

    setLoading(true);
    try {
      const swapData = await getSwapTransaction(
        quote,
        publicKey.toString(),
        false,
        'finalized'
      );

      const transaction = VersionedTransaction.deserialize(
        Buffer.from(swapData.swapTransaction, 'base64')
      );

      const signed = await signTransaction(transaction);
      const signature = await connection.sendRawTransaction(signed.serialize());

      toast.loading('Confirming transaction...', { id: signature });
      
      await connection.confirmTransaction({
        signature,
        blockhash: (await connection.getLatestBlockhash()).blockhash,
        lastValidBlockHeight: swapData.lastValidBlockHeight,
      }, 'confirmed');

      toast.success(
        <div>
          Swap successful!{' '}
          <a
            href={`https://solscan.io/tx/${signature}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            View on Solscan
          </a>
        </div>,
        { id: signature, duration: 5000 }
      );

      setInputAmount('');
      setQuote(null);
    } catch (error) {
      console.error('Swap error:', error);
      toast.error('Swap failed: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const handleTokenSelect = (token: Token) => {
    if (showTokenSelector === 'input') {
      if (token.mint === outputToken.mint) {
        setOutputToken(inputToken);
      }
      setInputToken(token);
    } else {
      if (token.mint === inputToken.mint) {
        setInputToken(outputToken);
      }
      setOutputToken(token);
    }
    setShowTokenSelector(null);
    setQuote(null);
  };

  const handleSwapTokens = () => {
    setInputToken(outputToken);
    setOutputToken(inputToken);
    setQuote(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <WalletMultiButton className="!bg-purple-600 hover:!bg-purple-700" />
      </div>

      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Solana Swap</h1>
        <p className="text-gray-400">Fast, secure token swaps powered by Jupiter</p>
      </div>

      <SwapCard
        inputToken={inputToken}
        outputToken={outputToken}
        inputAmount={inputAmount}
        onInputAmountChange={(value) => {
          setInputAmount(value);
          setQuote(null);
        }}
        onInputTokenClick={() => setShowTokenSelector('input')}
        onOutputTokenClick={() => setShowTokenSelector('output')}
        onSwapTokens={handleSwapTokens}
        quote={quote}
        onFetchQuote={fetchQuote}
        onExecuteSwap={executeSwap}
        loading={loading}
        connected={connected}
      />

      {showTokenSelector && (
        <TokenSelector
          onSelect={handleTokenSelect}
          onClose={() => setShowTokenSelector(null)}
        />
      )}
    </div>
  );
}
