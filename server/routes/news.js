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
const { fetchNews } = require("../services/newsService"); // Import the news service

// Route to fetch news
router.get("/", async (req, res) => {
  try {
    const news = await fetchNews();  // Use the service function to fetch news
    res.json(news);  // Send the fetched news as a JSON response
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

module.exports = router;


