import { Router } from 'express';
import { Connection, clusterApiUrl } from '@solana/web3.js';

const router = Router();

// GET /api/health - Health check
router.get('/', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// GET /api/health/solana - Solana connection health
router.get('/solana', async (req, res) => {
  try {
    const connection = new Connection(clusterApiUrl('mainnet-beta'));
    const slot = await connection.getSlot();
    
    res.json({
      status: 'healthy',
      currentSlot: slot,
      network: 'mainnet-beta',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      status: 'unhealthy',
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
});

export default router;
