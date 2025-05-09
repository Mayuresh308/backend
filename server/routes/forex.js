// server/routes/forex.js
const express = require('express');
const forexService = require('../services/forexService'); // Correct import of forexService
const router = express.Router();

// Utility to handle async route errors
const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

router.get('/market-indices', asyncHandler(async (req, res) => {
  try {
    const data = await forexService.getMarketIndices();

    if (data) {
      res.json({ success: true, data });  // Return the data
    } else {
      res.status(404).json({ success: false, message: 'No market data found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}));

// Route: Top Movers
router.get('/top-movers', asyncHandler(async (req, res) => {
  const data = await forexService.getTopMovers();
  res.json({ success: true, data });
}));

// Route: Live Forex Data
router.get('/live-data', asyncHandler(async (req, res) => {
  const data = await forexService.getLiveData();
  res.json({ success: true, data });
}));

// Route: Market Chart (Time Series)
router.get('/market-chart', asyncHandler(async (req, res) => {
  const data = await forexService.getMarketChart();
  res.json({ success: true, data });
}));

// Route: Market Heatmap
router.get('/market-heatmap', asyncHandler(async (req, res) => {
  const data = await forexService.getMarketHeatmap();
  res.json({ success: true, data });
}));

// Route: Global Indices
router.get('/global-indices', asyncHandler(async (req, res) => {
  const data = await forexService.getGlobalIndices();
  res.json({ success: true, data });
}));

// Route: Economic Calendar
router.get('/economic-calendar', asyncHandler(async (req, res) => {
  const data = await forexService.getEconomicCalendar();
  res.json({ success: true, data });
}));

module.exports = router;
