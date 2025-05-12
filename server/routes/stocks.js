// // server/routes/stocks.js
// const express = require('express');
// const router = express.Router();
// const stockService = require('../services/stockService');

// router.get('/market-indices', async (req, res) => {
//   try {
//     const marketIndices = await stockService.getMarketIndices();
//     res.json({ success: true, data: marketIndices });
//   } catch (error) {
//     console.error("Error fetching market indices:", error);
//     res.status(500).json({ error: "Failed to fetch market indices" });
//   }
// });

// router.get('/top-movers', async (req, res) => {
//   try {
//     const topMovers = await stockService.getTopMovers();
//     res.json({ success: true, data: topMovers });
//   } catch (error) {
//     console.error("Error fetching top movers:", error);
//     res.status(500).json({ error: "Failed to fetch top movers" });
//   }
// });

// router.get('/market-chart', async (req, res) => {
//   try {
//     const marketChart = await stockService.getMarketChart();
//     res.json({ success: true, data: marketChart });
//   } catch (error) {
//     console.error("Error fetching market chart:", error);
//     res.status(500).json({ error: "Failed to fetch market chart" });
//   }
// });

// router.get('/market-heatmap', async (req, res) => {
//   try {
//     const marketHeatmap = await stockService.getMarketHeatmap();
//     res.json({ success: true, data: marketHeatmap });
//   } catch (error) {
//     console.error("Error fetching market heatmap:", error);
//     res.status(500).json({ error: "Failed to fetch market heatmap" });
//   }
// });

// router.get('/global-indices', async (req, res) => {
//   try {
//     const globalIndices = await stockService.getGlobalIndices();
//     res.json({ success: true, data: globalIndices });
//   } catch (error) {
//     console.error("Error fetching global indices:", error);
//     res.status(500).json({ error: "Failed to fetch global indices" });
//   }
// });

// router.get('/economic-calendar', async (req, res) => {
//   try {
//     const economicCalendar = await stockService.getEconomicCalendar();
//     res.json({ success: true, data: economicCalendar });
//   } catch (error) {
//     console.error("Error fetching economic calendar:", error);
//     res.status(500).json({ error: "Failed to fetch economic calendar" });
//   }
// });

// module.exports = router;














const express = require('express');
const router = express.Router();
const stockService = require('../services/stockService');

router.get('/market-indices', async (req, res) => {
  try {
    const marketIndices = await stockService.getMarketIndices();
    res.json({ success: true, data: marketIndices });
  } catch (error) {
    console.error("Error fetching market indices:", error);
    res.status(500).json({ error: "Failed to fetch market indices" });
  }
});

router.get('/top-movers', async (req, res) => {
  try {
    const topMovers = await stockService.getTopMovers();
    res.json({ success: true, data: topMovers });
  } catch (error) {
    console.error("Error fetching top movers:", error);
    res.status(500).json({ error: "Failed to fetch top movers" });
  }
});

router.get('/market-chart', async (req, res) => {
  try {
    const { symbol = 'AAPL', interval = '1day' } = req.query;
    const marketChart = await stockService.getMarketChart(symbol, interval);
    res.json({ success: true, data: marketChart });
  } catch (error) {
    console.error("Error fetching market chart:", error.message);
    res.status(500).json({ error: error.message || "Failed to fetch market chart" });
  }
});


router.get('/market-heatmap', async (req, res) => {
  try {
    const marketHeatmap = await stockService.getMarketHeatmap();
    res.json({ success: true, data: marketHeatmap });
  } catch (error) {
    console.error("Error fetching market heatmap:", error);
    res.status(500).json({ error: "Failed to fetch market heatmap" });
  }
});

router.get('/global-indices', async (req, res) => {
  try {
    const globalIndices = await stockService.getGlobalIndices();
    res.json({ success: true, data: globalIndices });
  } catch (error) {
    console.error("Error fetching global indices:", error);
    res.status(500).json({ error: "Failed to fetch global indices" });
  }
});

router.get('/economic-calendar', async (req, res) => {
  try {
    const economicCalendar = await stockService.getEconomicCalendar();
    res.json({ success: true, data: economicCalendar });
  } catch (error) {
    console.error("Error fetching economic calendar:", error);
    res.status(500).json({ error: "Failed to fetch economic calendar" });
  }
});

module.exports = router;
