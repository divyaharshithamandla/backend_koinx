const express = require("express");
const mongoose = require("mongoose");
const fetchCryptoData = require("./jobs/cryptoJob");

const statsRoute = require("./routes/stats");
const deviationRoutes = require("./routes/deviation");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/cryptoDB", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Routes
app.use(statsRoute);
app.use(deviationRoutes);


  
// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  fetchCryptoData(); // Initial fetch
});
