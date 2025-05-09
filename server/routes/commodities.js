const express = require('express');
const commoditiesService = require('../services/commoditiesService');
const router = express.Router();

router.get('/market-indices', async (req, res) => {
  try {
    const data = await commoditiesService.getMarketIndices();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/top-movers', async (req, res) => {
  try {
    const data = await commoditiesService.getTopMovers();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/market-chart', async (req, res) => {
  try {
    const data = await commoditiesService.getMarketChart();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/market-heatmap', async (req, res) => {
  try {
    const data = await commoditiesService.getMarketHeatmap();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/global-indices', async (req, res) => {
  try {
    const data = await commoditiesService.getGlobalIndices();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/economic-calendar', async (req, res) => {
  try {
    const data = await commoditiesService.getEconomicCalendar();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
