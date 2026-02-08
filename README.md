# Solana Swap

A full-stack Solana token swap application with a React frontend and Node.js backend, powered by Jupiter Aggregator.

## Project Structure

```
Solana-swap/
├── Backend/                 # Express.js API
│   ├── src/
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── utils/          # Utilities
│   │   └── server.js       # Entry point
│   └── package.json
├── Frontend/               # React + TypeScript + Vite
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── utils/          # Utilities
│   │   ├── types/          # TypeScript types
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

## Features

- **Token Swaps**: Swap any SPL token using Jupiter's liquidity aggregation
- **Wallet Integration**: Connect with Phantom, Solflare, and other Solana wallets
- **Real-time Quotes**: Get instant swap quotes with price impact
- **Token Selector**: Browse and search tokens from Jupiter's token list
- **Backend API**: Express server for swap operations and token data

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone and navigate to the project:
```bash
cd Solana-swap
```

2. Install backend dependencies:
```bash
cd Backend
npm install
cp .env.example .env
# Edit .env with your configuration
```

3. Install frontend dependencies:
```bash
cd ../Frontend
npm install
```

### Running the Application

1. Start the backend:
```bash
cd Backend
npm run dev
```

2. Start the frontend (in a new terminal):
```bash
cd Frontend
npm run dev
```

3. Open http://localhost:3000 in your browser

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/health/solana` | Solana connection status |
| GET | `/api/swap/quote` | Get swap quote |
| POST | `/api/swap/transaction` | Get swap transaction |
| GET | `/api/tokens` | Get all tokens |
| GET | `/api/tokens/:mint` | Get token by mint |
| GET | `/api/tokens/price/:mints` | Get token prices |

## Tech Stack

**Frontend:**
- React 18 + TypeScript
- Vite
- Tailwind CSS
- @solana/wallet-adapter
- react-hot-toast

**Backend:**
- Node.js + Express
- @solana/web3.js
- Jupiter API integration
- CORS + Helmet security

## License

MIT
