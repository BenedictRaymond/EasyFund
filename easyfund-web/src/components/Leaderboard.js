import { useState, useEffect } from "react";
import { startupApi } from "../api/startupApi.js";
import "../styles/Leaderboard.css";

const Leaderboard = () => {
  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const data = await startupApi.getLeaderboard();
        setStartups(data);
      } catch (err) {
        console.error("Failed to load leaderboard:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="leaderboard">
        <h2>Top Performing Startups</h2>
        <p style={{ textAlign: "center", padding: "20px" }}>
          Loading leaderboard...
        </p>
      </div>
    );
  }

  return (
    <div className="leaderboard">
      <h2>Top Performing Startups</h2>
      <div className="leaderboard-list">
        {startups.map((startup, index) => (
          <div key={index} className={`leaderboard-item rank-${startup.rank}`}>
            <div className="rank">{startup.rank}</div>
            <div className="startup-info">
              <h3>{startup.name}</h3>
              <div className="badges">
                {startup.categories.slice(0, 2).map((cat, catIndex) => (
                  <span key={catIndex} className="badge">
                    {cat}
                  </span>
                ))}
                <span className="badge">{startup.fundingStage}</span>
              </div>
            </div>
            <div className="raised">
              ${startup.estimatedRaised.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
