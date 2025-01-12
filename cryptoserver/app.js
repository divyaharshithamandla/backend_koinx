const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables from .env file
const fetchCryptoData = require("./jobs/cryptoJob");

const statsRoute = require("./routes/stats");
const deviationRoutes = require("./routes/deviation");

const app = express();
const PORT = process.env.PORT || 3000; // Use PORT from environment or default to 3000

// Middleware
app.use(express.json());

// MongoDB Atlas Connection
const mongoURI = process.env.MONGO_URI; // Retrieve MongoDB URI from environment
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Atlas connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Routes
app.use(statsRoute);
app.use(deviationRoutes);

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${PORT}`);
  fetchCryptoData(); // Initial fetch
});
