const getYahooFinanceNews = require('../news_script'); // Import the function to get news

// Service function to get the news
async function fetchNews() {
  try {
    // Fetch news using the scraping function
    const news = await getYahooFinanceNews();
    return news; // Return the news data
  } catch (error) {
    console.error('Error in news service:', error);
    throw new Error('Failed to fetch news');
  }
}

module.exports = { fetchNews };
