import { motion } from "framer-motion";
import { startupApi } from "../api/startupApi.js";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/pages/Home.css";

const Home = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await startupApi.getDashboardStats();
        setStats(data);
      } catch (err) {
        console.error("Failed to load stats:", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="home">
      <motion.div
        className="hero"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>Welcome to EasyFund</h1>
        <p>Real-time startup intelligence powered by live data</p>
      </motion.div>

      <div className="features">
        <motion.div
          className="feature-card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3>{stats ? `${stats.totalStartups}` : "..."}</h3>
          <p>Startups tracked in our database from Crunchbase & Hacker News</p>
        </motion.div>
        <motion.div
          className="feature-card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <h3>{stats ? `$${stats.totalEstimatedFunding}M` : "..."}</h3>
          <p>Total estimated funding across all tracked startups</p>
        </motion.div>
        <motion.div
          className="feature-card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3>{stats ? `${(stats.categoryDistribution || []).length}` : "..."}</h3>
          <p>Industry categories including AI, FinTech, HealthTech & more</p>
        </motion.div>
      </div>

      <motion.div
        style={{ textAlign: "center", marginTop: "2rem" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <Link to="/dashboard" style={{
          display: "inline-block",
          padding: "12px 32px",
          background: "linear-gradient(135deg, #4f46e5, #10b981)",
          color: "#fff",
          borderRadius: "8px",
          textDecoration: "none",
          fontWeight: "600",
          fontSize: "16px",
        }}>
          Open Dashboard &rarr;
        </Link>
      </motion.div>
    </div>
  );
};

export default Home;
