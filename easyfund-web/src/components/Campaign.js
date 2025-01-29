import '../styles/Campaign.css';

const Campaign = () => {
  const progress = 65; // Example progress percentage
  const goal = 100000;
  const raised = 65000;
  const backers = 234;

  const perks = [
    {
      title: "Early Bird",
      price: 100,
      description: "Get early access to our platform",
      claimed: 45,
      total: 100
    },
    {
      title: "Premium Package",
      price: 500,
      description: "Early access + premium features",
      claimed: 20,
      total: 50
    },
    {
      title: "Enterprise Deal",
      price: 2000,
      description: "Full enterprise solution",
      claimed: 5,
      total: 10
    }
  ];

  return (
    <div className="campaign">
      <div className="campaign-header">
        <h2>Funding Campaign</h2>
        <div className="campaign-stats">
          <div className="stat">
            <h3>${raised.toLocaleString()}</h3>
            <p>raised of ${goal.toLocaleString()}</p>
          </div>
          <div className="stat">
            <h3>{backers}</h3>
            <p>backers</p>
          </div>
          <div className="stat">
            <h3>28</h3>
            <p>days left</p>
          </div>
        </div>
      </div>

      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>

      <div className="perks-section">
        <h3>Campaign Perks</h3>
        <div className="perks-grid">
          {perks.map((perk, index) => (
            <div key={index} className="perk-card">
              <h4>{perk.title}</h4>
              <p className="price">${perk.price}</p>
              <p className="description">{perk.description}</p>
              <div className="perk-progress">
                <div className="perk-progress-bar">
                  <div 
                    className="perk-progress-fill" 
                    style={{ width: `${(perk.claimed/perk.total) * 100}%` }}
                  ></div>
                </div>
                <p>{perk.claimed} of {perk.total} claimed</p>
              </div>
              <button className="claim-btn">Claim This Perk</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Campaign; 