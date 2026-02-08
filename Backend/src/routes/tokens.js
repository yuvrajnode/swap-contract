import { Router } from 'express';
import axios from 'axios';
import NodeCache from 'node-cache';

const router = Router();
const tokenCache = new NodeCache({ stdTTL: 300 }); // Cache for 5 minutes

// GET /api/tokens - Get all tokens
router.get('/', async (req, res, next) => {
  try {
    const cached = tokenCache.get('tokens');
    if (cached) {
      return res.json(cached);
    }

    const response = await axios.get('https://token.jup.ag/all');
    tokenCache.set('tokens', response.data);
    res.json(response.data);
  } catch (error) {
    next(error);
  }
});

// GET /api/tokens/:mint - Get token by mint
router.get('/:mint', async (req, res, next) => {
  try {
    const { mint } = req.params;
    const response = await axios.get(`https://token.jup.ag/token/${mint}`);
    res.json(response.data);
  } catch (error) {
    next(error);
  }
});

// GET /api/tokens/price/:mints - Get token prices
router.get('/price/:mints', async (req, res, next) => {
  try {
    const { mints } = req.params;
    const response = await axios.get(`https://api.jup.ag/price/v2?ids=${mints}`);
    res.json(response.data);
  } catch (error) {
    next(error);
  }
});

export default router;
