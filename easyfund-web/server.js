const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const {
  connectToDatabase,
  getStartupData,
  getDashboardStats,
  getLeaderboard,
  getStartupsByCategory,
  getFundingOverview,
  scrapeAndInsert,
} = require("./src/server/db.js");

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // your MySQL username
  password: "leenawastepaper", // update this to your MySQL password
  database: "easyfund",
  port: 3306,
  // Add these options for better error handling
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Improve error handling for MySQL connection
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database:", err);
    // Don't exit the process, just log the error
    return;
  }
  console.log("Connected to MySQL database");
});

// Add error handler for the connection
db.on("error", (err) => {
  console.error("MySQL database error:", err);
  if (err.code === "PROTOCOL_CONNECTION_LOST") {
    console.log("Database connection was closed. Attempting to reconnect...");
    db.connect();
  } else {
    console.error(
      "MySQL fatal error — server will continue without MySQL:",
      err.code,
    );
  }
});

// Connect to MongoDB when server starts
connectToDatabase()
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// API endpoint to get startup data
app.get("/api/startups", async (req, res) => {
  try {
    const data = await getStartupData();
    console.log("Data fetched successfully:", data.length, "records");
    res.json(data);
  } catch (error) {
    console.error("Detailed error:", error);
    res.status(500).json({
      error: "Error fetching startup data",
      details: error.message,
    });
  }
});

app.get("/api/test", (req, res) => {
  res.json({ message: "API is working!" });
});

// Dashboard aggregated stats
app.get("/api/dashboard/stats", async (req, res) => {
  try {
    const stats = await getDashboardStats();
    res.json(stats);
  } catch (error) {
    console.error("Dashboard stats error:", error);
    res.status(500).json({
      error: "Error fetching dashboard stats",
      details: error.message,
    });
  }
});

// Leaderboard — top startups by Crunchbase rank
app.get("/api/leaderboard", async (req, res) => {
  try {
    const leaderboard = await getLeaderboard();
    res.json(leaderboard);
  } catch (error) {
    console.error("Leaderboard error:", error);
    res
      .status(500)
      .json({ error: "Error fetching leaderboard", details: error.message });
  }
});

// Startups grouped by category
app.get("/api/startups/by-category", async (req, res) => {
  try {
    const data = await getStartupsByCategory();
    res.json(data);
  } catch (error) {
    console.error("Category error:", error);
    res
      .status(500)
      .json({ error: "Error fetching categories", details: error.message });
  }
});

// Funding overview
app.get("/api/funding/overview", async (req, res) => {
  try {
    const overview = await getFundingOverview();
    res.json(overview);
  } catch (error) {
    console.error("Funding overview error:", error);
    res.status(500).json({
      error: "Error fetching funding overview",
      details: error.message,
    });
  }
});

// Scrape fresh data from Crunchbase and add to MongoDB
app.post("/api/scrape", async (req, res) => {
  try {
    const { query } = req.body; // optional search query
    console.log("Scrape request received. Query:", query || "(random queries)");
    const result = await scrapeAndInsert(query);
    res.json(result);
  } catch (error) {
    console.error("Scrape error:", error);
    res.status(500).json({ error: "Scraping failed", details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
