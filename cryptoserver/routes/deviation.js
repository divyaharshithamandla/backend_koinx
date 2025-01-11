const express = require("express");
const router = express.Router();
const Crypto = require("../models/Crypto");
const { std } = require("mathjs");

router.get("/deviation", async (req, res) => {
  const { coin } = req.query;
  if (!coin) return res.status(400).json({ error: "Missing 'coin' parameter" });

  try {
    const records = await Crypto.find({ coin }).sort({ timestamp: -1 }).limit(100);
    if (records.length === 0) return res.status(404).json({ error: "No data found" });

    const prices = records.map((record) => record.price);
    const deviation = std(prices).toFixed(2);

    res.json({ deviation: parseFloat(deviation) });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
