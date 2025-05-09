// server/services/stockService.js
const axios = require('axios');

const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY;
const FINNHUB_API_URL = 'https://finnhub.io/api/v1';

// Fetch quote data for key US indices
async function getMarketIndices() {
  const indices = [
    { name: 'Apple', symbol: 'AAPL' },
    { name: 'Microsoft', symbol: 'MSFT' },
    { name: 'Google', symbol: 'GOOGL' }
  ];

  const results = await Promise.all(indices.map(async (index) => {
    try {
      const res = await axios.get(`${FINNHUB_API_URL}/quote`, {
        params: { token: FINNHUB_API_KEY, symbol: index.symbol }
      });
      return { ...index, ...res.data };
    } catch (err) {
      return { ...index, error: err.message };
    }
  }));

  return results;
}

// Example top gainers (Finnhub doesn't have exact endpoint, may need to simulate)
async function getTopMovers() {
  const response = await axios.get(`${FINNHUB_API_URL}/stock/symbol`, {
    params: { token: FINNHUB_API_KEY, exchange: 'US' }
  });
  // This needs sorting logic and quote fetch for each symbol to be meaningful
  return response.data.slice(0, 10); // placeholder
}

async function getMarketChart() {
  const response = await axios.get(`${FINNHUB_API_URL}/quote`, {
    params: { token: FINNHUB_API_KEY, symbol: 'AAPL' }
  });
  return response.data;
}

// Finnhub doesn't have a direct heatmap endpoint
async function getMarketHeatmap() {
  const symbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'NVDA'];
  const results = [];

  for (const symbol of symbols) {
    try {
      const { data } = await axios.get(`${FINNHUB_API_URL}/quote`, {
        params: { token: FINNHUB_API_KEY, symbol },
      });

      results.push({
        symbol,
        ...data, // c, d, dp, etc.
      });
    } catch (err) {
      results.push({
        symbol,
        error: 'Failed to fetch data',
      });
    }
  }

  return results;
}


async function getGlobalIndices() {
  // Repeat the same logic as getMarketIndices but with international indices
  const indices = [
    { symbol: '^FTSE', name: 'FTSE 100' },
    { symbol: '^N225', name: 'Nikkei 225' },
    { symbol: '^GDAXI', name: 'DAX' }
  ];

  const results = await Promise.all(indices.map(async ({ symbol, name }) => {
    const res = await axios.get(`${FINNHUB_API_URL}/quote`, {
      params: { token: FINNHUB_API_KEY, symbol }
    });
    return { name, symbol, ...res.data };
  }));

  return results;
}


// Note: The economic calendar endpoint is not accessible with the free Finnhub API plan.
// To enable this feature, a premium Finnhub subscription is required.
// For now, I am considering using mock data.
 
async function getEconomicCalendar() {
  const from = new Date();
  const to = new Date();
  to.setDate(to.getDate() + 7);

  const formattedFrom = from.toISOString().split('T')[0];
  const formattedTo = to.toISOString().split('T')[0];

  try {
    const response = await axios.get(`${FINNHUB_API_URL}/calendar/economic`, {
      params: {
        token: FINNHUB_API_KEY,
        from: formattedFrom,
        to: formattedTo,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Finnhub economic calendar error:", error.response?.data || error.message);
    throw new Error("Failed to fetch economic calendar");
  }
}





module.exports = {
  getMarketIndices,
  getTopMovers,
  getMarketChart,
  getMarketHeatmap,
  getGlobalIndices,
  getEconomicCalendar,
};
