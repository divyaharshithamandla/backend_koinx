const express = require("express");
const mongoose = require("mongoose");
const fetchCryptoData = require("./jobs/cryptoJob");

const statsRoute = require("./routes/stats");
const deviationRoutes = require("./routes/deviation");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// MongoDB Atlas Connection
const mongoURI =
  "mongodb+srv://divyaharshitha7704:21B91A54A2@cluster0.tdvjxih.mongodb.net/cryptoDB?retryWrites=true&w=majority";

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Atlas connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Routes
app.use(statsRoute);
app.use(deviationRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  fetchCryptoData(); // Initial fetch
});
