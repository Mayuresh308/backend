// server/services/forexService.js
const axios = require('axios');
const { ALPHAVANTAGE_API_KEY } = require('../config/apiKeys');

// Fetch forex data (example for USD to EUR)
async function getMarketIndices() {
  try {
    const response = await axios.get(`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=EUR&apikey=${ALPHAVANTAGE_API_KEY}`);
    console.log("Alpha Vantage Response:", response.data); // Log the full response to check

    return response.data['Realtime Currency Exchange Rate']; // This should contain the actual data
  } catch (error) {
    console.error('Error fetching market indices:', error);
    throw new Error('Failed to fetch market indices');
  }
}

// Example top forex movers (requires some logic for actual top movers)
async function getTopMovers() {
  // Placeholder for top forex movers, you might want to implement sorting logic
  return [{ currencyPair: 'USD/EUR', value: '1.22' }];
}

// Fetch live forex data (example for USD to EUR)
async function getLiveData() {
  try {
    const response = await axios.get(`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=EUR&apikey=${ALPHAVANTAGE_API_KEY}`);
    return response.data['Realtime Currency Exchange Rate'];
  } catch (error) {
    console.error('Error fetching live data:', error);
    throw new Error('Failed to fetch live data');
  }
}

// Fetch market chart (time series data for Forex)
async function getMarketChart() {
  try {
    // Using Alpha Vantage's TIME_SERIES_DAILY function for USD/EUR (correct symbol format: USDEUR)
    const response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=USDEUR&apikey=${ALPHAVANTAGE_API_KEY}`);
    
    if (response.data['Time Series (Daily)']) {
      return response.data['Time Series (Daily)']; // Return the time series data
    } else {
      throw new Error('Invalid data returned from Alpha Vantage');
    }
  } catch (error) {
    console.error('Error fetching market chart data:', error);
    if (error.response) {
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
    }
    throw new Error('Failed to fetch market chart data');
  }
}

// Finnhub does not provide a forex heatmap directly
async function getMarketHeatmap() {
  // Simulating a market heatmap with a few currencies
  const currencyPairs = ['USD/EUR', 'GBP/USD', 'AUD/USD', 'USD/JPY'];
  const results = [];

  for (const pair of currencyPairs) {
    try {
      const { data } = await axios.get(`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${pair.split('/')[0]}&to_currency=${pair.split('/')[1]}&apikey=${ALPHAVANTAGE_API_KEY}`);
      results.push({
        currencyPair: pair,
        exchangeRate: data['Realtime Currency Exchange Rate'] ? data['Realtime Currency Exchange Rate']['5. Exchange Rate'] : 'N/A',
      });
    } catch (err) {
      results.push({
        currencyPair: pair,
        error: 'Failed to fetch data',
      });
    }
  }

  return results;
}

// Global forex indices (e.g., USD, EUR, GBP)
async function getGlobalIndices() {
  const currencies = [
    { symbol: 'USD', name: 'US Dollar' },
    { symbol: 'EUR', name: 'Euro' },
    { symbol: 'GBP', name: 'British Pound' }
  ];

  const results = await Promise.all(currencies.map(async ({ symbol, name }) => {
    try {
      const res = await axios.get(`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=${symbol}&apikey=${ALPHAVANTAGE_API_KEY}`);
      return { name, symbol, exchangeRate: res.data['Realtime Currency Exchange Rate'] ? res.data['Realtime Currency Exchange Rate']['5. Exchange Rate'] : 'N/A' };
    } catch (error) {
      console.error('Error fetching global index for', symbol, error);
      return { name, symbol, error: 'Failed to fetch data' };
    }
  }));

  return results;
}

// Note: The economic calendar endpoint is not accessible with the free Alpha Vantage API plan.
// For now, we are using mock data.
async function getEconomicCalendar() {
  // Since Alpha Vantage doesn't support an economic calendar, we can use mock data
  return [
    { date: '2025-05-08', event: 'ECB Interest Rate Decision' },
    { date: '2025-05-09', event: 'US Non-Farm Payrolls' },
    { date: '2025-05-10', event: 'UK GDP Report' }
  ];
}

module.exports = {
  getMarketIndices,
  getTopMovers,
  getLiveData,
  getMarketChart, // Ensure the function is exported here
  getMarketHeatmap,
  getGlobalIndices,
  getEconomicCalendar,
};
