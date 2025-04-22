const express = require("express");
const router = express.Router();
const runPython = require("../utils/runPython");

router.get("/", async (req, res) => {
  try {
    const news = await runPython();
    res.json({ news });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

module.exports = router;
