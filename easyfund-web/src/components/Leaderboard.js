import '../styles/Leaderboard.css';

const Leaderboard = () => {
  const startups = [
    {
      name: "TechStart",
      raised: 1500000,
      badges: ["Rapid Growth", "Innovation"],
      rank: 1
    },
    {
      name: "GreenEnergy",
      raised: 1200000,
      badges: ["Sustainable", "Community Choice"],
      rank: 2
    },
    {
      name: "HealthAI",
      raised: 900000,
      badges: ["Innovation"],
      rank: 3
    },
    {
      name: "FinTech Pro",
      raised: 750000,
      badges: ["Rising Star"],
      rank: 4
    },
    {
      name: "EduTech",
      raised: 500000,
      badges: ["Impact"],
      rank: 5
    }
  ];

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
                {startup.badges.map((badge, badgeIndex) => (
                  <span key={badgeIndex} className="badge">{badge}</span>
                ))}
              </div>
            </div>
            <div className="raised">
              ${startup.raised.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard; 