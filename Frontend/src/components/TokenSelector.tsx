import React, { useState, useEffect } from 'react';
import { Token } from '../types/swap';

const TOKEN_LIST_URL = 'https://token.jup.ag/all';

interface TokenSelectorProps {
  onSelect: (token: Token) => void;
  onClose: () => void;
}

export default function TokenSelector({ onSelect, onClose }: TokenSelectorProps) {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTokens();
  }, []);

  const fetchTokens = async () => {
    try {
      const response = await fetch(TOKEN_LIST_URL);
      const data = await response.json();
      setTokens(data);
    } catch (error) {
      console.error('Error fetching tokens:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTokens = tokens.filter(
    (token) =>
      token.symbol.toLowerCase().includes(search.toLowerCase()) ||
      token.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-2xl w-full max-w-md max-h-[80vh] flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">Select Token</h2>
            <button
              onClick={onClose}
              type="button"
              className="text-gray-400 hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or symbol"
            className="w-full bg-gray-700 text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="overflow-y-auto flex-1 p-4">
          {loading ? (
            <div className="text-center text-gray-400 py-8">Loading tokens...</div>
          ) : (
            <div className="space-y-2">
              {filteredTokens.map((token) => (
                <button
                  key={token.mint}
                  onClick={() => onSelect(token)}
                  type="button"
                  className="w-full flex items-center gap-3 p-3 hover:bg-gray-700 rounded-xl transition-colors"
                >
                  <img
                    src={token.logoURI}
                    alt={token.symbol}
                    className="w-10 h-10 rounded-full"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png';
                    }}
                  />
                  <div className="text-left">
                    <div className="text-white font-medium">{token.symbol}</div>
                    <div className="text-gray-400 text-sm">{token.name}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
