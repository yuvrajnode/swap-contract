import React from 'react';
import { Token, SwapQuote } from '../types/swap';

interface SwapCardProps {
  inputToken: Token;
  outputToken: Token;
  inputAmount: string;
  onInputAmountChange: (value: string) => void;
  onInputTokenClick: () => void;
  onOutputTokenClick: () => void;
  onSwapTokens: () => void;
  quote: SwapQuote | null;
  onFetchQuote: () => void;
  onExecuteSwap: () => void;
  loading: boolean;
  connected: boolean;
}

export default function SwapCard({
  inputToken,
  outputToken,
  inputAmount,
  onInputAmountChange,
  onInputTokenClick,
  onOutputTokenClick,
  onSwapTokens,
  quote,
  onFetchQuote,
  onExecuteSwap,
  loading,
  connected,
}: SwapCardProps) {
  const formatAmount = (amount: string, decimals: number) => {
    return (parseInt(amount) / 10 ** decimals).toFixed(6);
  };

  return (
    <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md shadow-xl">
      {/* Input Section */}
      <div className="bg-gray-700 rounded-xl p-4 mb-2">
        <div className="flex justify-between mb-2">
          <span className="text-gray-400 text-sm">You Pay</span>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={inputAmount}
            onChange={(e) => onInputAmountChange(e.target.value)}
            placeholder="0.00"
            className="bg-transparent text-3xl font-semibold text-white w-full outline-none"
          />
          <button
            onClick={onInputTokenClick}
            className="flex items-center gap-2 bg-gray-600 hover:bg-gray-500 rounded-full px-4 py-2 transition-colors"
          >
            <img
              src={inputToken.logoURI}
              alt={inputToken.symbol}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-white font-medium">{inputToken.symbol}</span>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Swap Button */}
      <div className="flex justify-center -my-2 relative z-10">
        <button
          onClick={onSwapTokens}
          className="bg-gray-700 hover:bg-gray-600 p-2 rounded-xl border-4 border-gray-800 transition-colors"
        >
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
          </svg>
        </button>
      </div>

      {/* Output Section */}
      <div className="bg-gray-700 rounded-xl p-4 mt-2">
        <div className="flex justify-between mb-2">
          <span className="text-gray-400 text-sm">You Receive</span>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={quote ? formatAmount(quote.outAmount, outputToken.decimals) : ''}
            readOnly
            placeholder="0.00"
            className="bg-transparent text-3xl font-semibold text-white w-full outline-none"
          />
          <button
            onClick={onOutputTokenClick}
            className="flex items-center gap-2 bg-gray-600 hover:bg-gray-500 rounded-full px-4 py-2 transition-colors"
          >
            <img
              src={outputToken.logoURI}
              alt={outputToken.symbol}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-white font-medium">{outputToken.symbol}</span>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Quote Info */}
      {quote && (
        <div className="mt-4 p-3 bg-gray-700/50 rounded-xl">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Rate</span>
            <span className="text-white">
              1 {inputToken.symbol} ≈ {formatAmount(quote.outAmount, outputToken.decimals)} {outputToken.symbol}
            </span>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span className="text-gray-400">Price Impact</span>
            <span className="text-green-400">{quote.priceImpactPct}%</span>
          </div>
        </div>
      )}

      {/* Action Button */}
      <button
        onClick={connected ? (quote ? onExecuteSwap : onFetchQuote) : undefined}
        disabled={loading || !connected || (!quote && !inputAmount)}
        className="w-full mt-4 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-colors"
      >
        {!connected ? 'Connect Wallet' : loading ? 'Loading...' : quote ? 'Swap' : 'Get Quote'}
      </button>
    </div>
  );
}
