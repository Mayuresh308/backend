const axios = require('axios');
const { FINNHUB_API_KEY } = require('../config/apiKeys');

const finnhub = axios.create({
  baseURL: 'https://finnhub.io/api/v1',
  params: {
    token: FINNHUB_API_KEY,
  },
});

// 1. Market Indices
const getMarketIndices = async () => {
  const symbols = ['BINANCE:BTCUSDT', 'BINANCE:ETHUSDT', 'BINANCE:SOLUSDT'];
  const results = await Promise.all(
    symbols.map(async (symbol) => {
      const { data } = await finnhub.get('/quote', { params: { symbol } });
      return {
        symbol,
        ...data,
      };
    })
  );
  return results;
};

// 2. Top Movers (based on % price change)
const getTopMovers = async () => {
  const symbols = ['BINANCE:BTCUSDT', 'BINANCE:ETHUSDT', 'BINANCE:SOLUSDT', 'BINANCE:ADAUSDT'];
  const quotes = await Promise.all(
    symbols.map(async (symbol) => {
      const { data } = await finnhub.get('/quote', { params: { symbol } });
      const changePercent = ((data.c - data.pc) / data.pc) * 100;
      return {
        symbol,
        price: data.c,
        changePercent,
      };
    })
  );

  return quotes
    .sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent))
    .slice(0, 5);
};

// 3. Live Data (e.g. BTC)
const getLiveData = async () => {
  const { data } = await finnhub.get('/quote', { params: { symbol: 'BINANCE:BTCUSDT' } });
  return data;
};

// 4. Market Chart (simulated using quote data)
const getMarketChart = async () => {
  try {
    // Fetch the latest quote data for BTC/USDT
    const { data } = await finnhub.get('/quote', {
      params: { symbol: 'BINANCE:BTCUSDT' },
    });

    // Return a structure resembling market chart data (OHLC)
    return {
      t: [Date.now()], // Time (current time)
      o: [data.o], // Open price
      c: [data.c], // Close price
      h: [data.h], // High price
      l: [data.l], // Low price
    };
  } catch (error) {
    console.error("Error fetching market chart data:", error);
    throw new Error('Failed to fetch market chart data');
  }
};

// 5. Market Heatmap (relative % change from open)
const getMarketHeatmap = async () => {
  const symbols = ['BINANCE:BTCUSDT', 'BINANCE:ETHUSDT', 'BINANCE:SOLUSDT', 'BINANCE:ADAUSDT', 'BINANCE:XRPUSDT'];
  const results = await Promise.all(
    symbols.map(async (symbol) => {
      const { data } = await finnhub.get('/quote', { params: { symbol } });
      const percentChange = ((data.c - data.o) / data.o) * 100;
      return {
        symbol,
        percentChange,
      };
    })
  );

  return results;
};

// 6. Global Indices (mocked summary of global crypto leaders)
const getGlobalIndices = async () => {
  const globalLeaders = ['BINANCE:BTCUSDT', 'BINANCE:ETHUSDT'];
  const results = await Promise.all(
    globalLeaders.map(async (symbol) => {
      const { data } = await finnhub.get('/quote', { params: { symbol } });
      return {
        symbol,
        currentPrice: data.c,
      };
    })
  );

  return results;
};

// 7. Economic Calendar (mock only — Finnhub paid tier supports this)
const getEconomicCalendar = async () => {
  return [
    { date: '2025-05-09', event: 'Bitcoin Halving Prediction' },
    { date: '2025-05-12', event: 'Ethereum Shanghai Upgrade' },
    { date: '2025-05-15', event: 'US CPI Inflation Report' },
  ];
};

module.exports = {
  getMarketIndices,
  getTopMovers,
  getLiveData,
  getMarketChart,
  getMarketHeatmap,
  getGlobalIndices,
  getEconomicCalendar,
};
