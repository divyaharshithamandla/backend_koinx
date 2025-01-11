const express = require("express");
const router = express.Router();
const Crypto = require("../models/Crypto");

router.get("/stats", async (req, res) => {
  const { coin } = req.query;
  if (!coin) return res.status(400).json({ error: "Missing 'coin' parameter" });

  try {
    const latestRecord = await Crypto.findOne({ coin }).sort({ timestamp: -1 });
    if (!latestRecord) return res.status(404).json({ error: "No data found" });

    res.json({
      price: latestRecord.price,
      marketCap: latestRecord.marketCap,
      "24hChange": latestRecord.change24h,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
