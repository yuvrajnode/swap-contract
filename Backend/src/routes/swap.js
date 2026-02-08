import { Router } from 'express';
import { getQuote, getSwapTransaction, executeSwap } from '../services/jupiterService.js';

const router = Router();

// GET /api/swap/quote - Get swap quote
router.get('/quote', async (req, res, next) => {
  try {
    const { inputMint, outputMint, amount, slippageBps } = req.query;

    if (!inputMint || !outputMint || !amount) {
      return res.status(400).json({
        error: 'Missing required parameters: inputMint, outputMint, amount',
      });
    }

    const quote = await getQuote(
      inputMint,
      outputMint,
      amount,
      slippageBps || '50'
    );

    res.json(quote);
  } catch (error) {
    next(error);
  }
});

// POST /api/swap/transaction - Get swap transaction
router.post('/transaction', async (req, res, next) => {
  try {
    const { quote, userPublicKey, wrapAndUnwrapSol } = req.body;

    if (!quote || !userPublicKey) {
      return res.status(400).json({
        error: 'Missing required parameters: quote, userPublicKey',
      });
    }

    const transaction = await getSwapTransaction(
      quote,
      userPublicKey,
      wrapAndUnwrapSol !== false
    );

    res.json(transaction);
  } catch (error) {
    next(error);
  }
});

// POST /api/swap/execute - Execute swap (server-side)
router.post('/execute', async (req, res, next) => {
  try {
    const { quote, userPublicKey } = req.body;

    if (!quote || !userPublicKey) {
      return res.status(400).json({
        error: 'Missing required parameters: quote, userPublicKey',
      });
    }

    const result = await executeSwap(quote, userPublicKey);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

export default router;
