const axios = require("axios");
const cheerio = require("cheerio");
const vader = require("vader-sentiment");

function analyzeSentiment(text) {
  const score = vader.SentimentIntensityAnalyzer.polarity_scores(text).compound;
  if (score > 0.1) return "Positive";
  if (score < -0.1) return "Negative";
  return "Neutral";
}

async function getYahooFinanceNews() {
  const url = "https://finance.yahoo.com/news/";
  const headers = {
    "User-Agent": "Mozilla/5.0 (compatible; StockBot/1.0)"
  };

  try {
    const response = await axios.get(url, { headers });
    const $ = cheerio.load(response.data);

    const newsItems = $('section[data-testid="storyitem"]').slice(0, 10);

    const newsData = [];

    newsItems.each((_, item) => {
      const title = $(item).find("h3").text().trim() || "No Title";
      let link = $(item).find("a").attr("href") || "";
      if (link && !link.startsWith("http")) {
        link = "https://finance.yahoo.com" + link;
      }

      const summary = $(item).find("p").text().trim() || "";
      const image = $(item).find("img").attr("src") || "";
      const publisher = $(item).find("div.publishing").text().trim() || "Unknown";

      const sentiment = analyzeSentiment(`${title} ${summary}`);

      newsData.push({
        title,
        link,
        summary,
        image,
        publisher,
        sentiment
      });
    });

    return newsData;
  } catch (error) {
    return [{ error: error.message }];
  }
}

module.exports = getYahooFinanceNews;
