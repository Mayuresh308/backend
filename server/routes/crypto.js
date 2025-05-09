const express = require('express');
const cryptoService = require('../services/cryptoService');
const router = express.Router();

// 1. Market Indices
router.get('/market-indices', async (req, res) => {
  try {
    const data = await cryptoService.getMarketIndices();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch market indices' });
  }
});

// 2. Top Movers
router.get('/top-movers', async (req, res) => {
  try {
    const data = await cryptoService.getTopMovers();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch top movers' });
  }
});

// 3. Live Data
router.get('/live-data', async (req, res) => {
  try {
    const data = await cryptoService.getLiveData();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch live data' });
  }
});

// 4. Market Chart (historical OHLC data)
router.get('/market-chart', async (req, res) => {
  try {
    const data = await cryptoService.getMarketChart();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch market chart data' });
  }
});

// 5. Market Heatmap (relative performance)
router.get('/market-heatmap', async (req, res) => {
  try {
    const data = await cryptoService.getMarketHeatmap();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch heatmap data' });
  }
});

// 6. Global Indices
router.get('/global-indices', async (req, res) => {
  try {
    const data = await cryptoService.getGlobalIndices();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch global indices' });
  }
});

// 7. Economic Calendar (mocked)
router.get('/economic-calendar', async (req, res) => {
  try {
    const data = await cryptoService.getEconomicCalendar();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch economic calendar' });
  }
});

module.exports = router;
