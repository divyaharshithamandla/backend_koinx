const axios = require("axios");
const Crypto = require("../models/Crypto");
const cron = require("node-cron");

const fetchCryptoData = async () => {
  try {
    const coins = ["bitcoin", "matic-network", "ethereum"];
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coins.join(",")}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`;

    const response = await axios.get(url);
    const data = response.data;

    for (let coin of coins) {
      await Crypto.create({
        coin,
        price: data[coin].usd,
        marketCap: data[coin].usd_market_cap,
        change24h: data[coin].usd_24h_change,
      });
    }
    console.log("Crypto data updated successfully!");
  } catch (error) {
    console.error("Error fetching crypto data:", error);
  }
};

// Schedule the job to run every 2 hours
cron.schedule("0 */2 * * *", fetchCryptoData);

module.exports = fetchCryptoData;
