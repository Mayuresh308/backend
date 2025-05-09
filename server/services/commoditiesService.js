require('dotenv').config();
const axios = require('axios');

const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY;

const finnhub = axios.create({
  baseURL: 'https://finnhub.io/api/v1',
  params: {
    token: FINNHUB_API_KEY,
  },
});

// 1. Market Indices (mock example with AAPL quote)
const getMarketIndices = async () => {
  try {
    const response = await finnhub.get('/quote', {
      params: { symbol: 'AAPL' },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch market indices: ' + error.message);
  }
};

// 2. Top Movers (example: gold)
const getTopMovers = async () => {
  try {
    const response = await finnhub.get('/quote', {
      params: { symbol: 'OANDA:XAU_USD' },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch top movers: ' + error.message);
  }
};

// 3. Market Chart (historical OHLC data for gold)
const getMarketChart = async () => {
  try {
    const now = Math.floor(Date.now() / 1000);
    const oneWeekAgo = now - 7 * 24 * 60 * 60;

    const response = await finnhub.get('/forex/candle', {
      params: {
        symbol: 'OANDA:XAU_USD',
        resolution: 'D',
        from: oneWeekAgo,
        to: now,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error.message);
    throw new Error('Failed to fetch market chart data: ' + error.message);
  }
};

// 4. Market Heatmap
const getMarketHeatmap = async () => {
  try {
    const symbols = ['OANDA:XAU_USD', 'OANDA:WTICO_USD', 'OANDA:XAG_USD'];
    const results = await Promise.all(
      symbols.map(async (symbol) => {
        const res = await finnhub.get('/quote', { params: { symbol } });
        return {
          symbol,
          percentChange: ((res.data.c - res.data.o) / res.data.o) * 100,
        };
      })
    );
    return results;
  } catch (error) {
    throw new Error('Failed to fetch market heatmap: ' + error.message);
  }
};

// 5. Global Indices (commodities list)
const getGlobalIndices = async () => {
  try {
    const response = await finnhub.get('/commodities');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch global indices: ' + error.message);
  }
};

// 6. Economic Calendar
const getEconomicCalendar = async () => {
  try {
    const response = await finnhub.get('/economic-calendar');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch economic calendar: ' + error.message);
  }
};

module.exports = {
  getMarketIndices,
  getTopMovers,
  getMarketChart,
  getMarketHeatmap,
  getGlobalIndices,
  getEconomicCalendar,
};
