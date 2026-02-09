# Solana Swap

A Node.js Solana token swap service using Jupiter Aggregator for optimal swap routes across Solana DEXs.

## Overview

This project enables seamless token swaps on Solana by leveraging Jupiter's liquidity aggregation. It provides a simple Node.js service for executing swaps directly from the command line.

## Features

- **Token Swaps**: Swap any SPL token using Jupiter's liquidity aggregation
- **Optimal Routes**: Automatically finds the best swap routes across multiple DEXs
- **Wallet Integration**: Secure wallet signing and transaction execution
- **Real-time Quotes**: Live price quotes and slippage protection

## Project Structure

```
solana-swap/
├── swap.js              # Main swap execution script
├── package.json         # Node.js dependencies
├── .env.example         # Environment variables template
├── .gitignore          # Git ignore rules
└── README.md            # Documentation
```

## Quick Start

### Prerequisites

- Node.js 18+
- A Solana wallet with SOL for transaction fees
- RPC endpoint access (uses public RPC by default)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yuvrajnode/swap-contract.git
cd swap-contract
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
# Create .env file
echo "PRIVATE_KEY=your_wallet_private_key_here" > .env
```

### Running the Swap Service

Execute a swap from the command line:

```bash
npm start
```

This will:
1. Fetch a quote for swapping SOL → USDC
2. Request a swap transaction from Jupiter
3. Sign and submit the transaction
4. Output the Solscan transaction URL

## Configuration

### Environment Variables

Create a `.env` file in the project root:

| Variable | Description | Required |
|----------|-------------|----------|
| `PRIVATE_KEY` | Base58 encoded private key for signing transactions | Yes |

### Swap Parameters

The default swap configuration in `swap.js`:

- **Input**: SOL (So11111111111111111111111111111111111111112)
- **Output**: USDC (EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v)
- **Amount**: 0.1 SOL (100000000 lamports)
- **Slippage**: 0.5% (50 bps)

Modify these values in `swap.js` to customize your swap.

## API Integration

This project uses Jupiter's v1 API:

- **Quote API**: `https://lite-api.jup.ag/swap/v1/quote`
- **Swap API**: `https://lite-api.jup.ag/swap/v1/swap`

For production use, consider:
- Using your own RPC endpoint
- Implementing rate limiting
- Adding retry logic for failed transactions

## Security Considerations

⚠️ **Important**:
- Never commit your `.env` file or private keys
- Use a dedicated wallet for swaps (not your main wallet)
- Always verify transaction details before signing
- Test with small amounts first

## Supported Tokens

Any SPL token can be swapped using Jupiter. Common token mints:

| Token | Mint Address |
|-------|--------------|
| SOL | So11111111111111111111111111111111111111112 |
| USDC | EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v |
| USDT | Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB |
| BONK | DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263 |

## Troubleshooting

### Common Issues

1. **Insufficient balance**: Ensure you have enough SOL for the swap amount plus transaction fees
2. **Transaction failed**: Check slippage settings and token account existence
3. **RPC errors**: The public RPC may be rate-limited; use a private RPC for better reliability

### Getting Help

- [Jupiter Documentation](https://station.jup.ag/docs/)
- [Solana Web3.js Docs](https://solana-labs.github.io/solana-web3.js/)
- Open an issue on GitHub

## Dependencies

- `@solana/web3.js`: Solana blockchain interaction
- `@project-serum/anchor`: Wallet and transaction handling
- `axios`: HTTP client for API requests
- `bs58`: Base58 encoding for private keys
- `dotenv`: Environment variable management

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## License

ISC

## Disclaimer

This software is provided for educational purposes. Use at your own risk. The authors are not responsible for any financial losses incurred through the use of this software.
