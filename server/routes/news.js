// const express = require("express");
// const router = express.Router();
// const runPython = require("../utils/runPython");

// router.get("/", async (req, res) => {
//   try {
//     const news = await runPython();
//     res.json({ news });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch news" });
//   }
// });

// module.exports = router;






const express = require("express");
const router = express.Router();
const getYahooFinanceNews = require("../news_script");

router.get("/", async (req, res) => {
  try {
    const news = await getYahooFinanceNews();
    res.json(news);
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

module.exports = router;

