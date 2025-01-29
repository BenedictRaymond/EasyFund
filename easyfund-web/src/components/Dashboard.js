import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const campaignData = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 5000 },
    { name: 'Apr', value: 7000 },
    { name: 'May', value: 6000 },
  ];

  return (
    <div className="dashboard">
      <h2>Startup Dashboard</h2>
      
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Campaign Progress</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={campaignData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="dashboard-card">
          <h3>Funding Metrics</h3>
          <div className="metrics">
            <div className="metric">
              <h4>Total Raised</h4>
              <p>$25,000</p>
            </div>
            <div className="metric">
              <h4>Goal</h4>
              <p>$50,000</p>
            </div>
            <div className="metric">
              <h4>Backers</h4>
              <p>127</p>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <h3>Investor Matches</h3>
          <div className="matches-list">
            <div className="match-item">
              <span>Angel Investor A</span>
              <button className="connect-btn">Connect</button>
            </div>
            <div className="match-item">
              <span>VC Fund B</span>
              <button className="connect-btn">Connect</button>
            </div>
            <div className="match-item">
              <span>Seed Fund C</span>
              <button className="connect-btn">Connect</button>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <h3>Upcoming Mentor Sessions</h3>
          <div className="sessions-list">
            <div className="session-item">
              <h4>Product Strategy</h4>
              <p>Tomorrow, 2:00 PM</p>
            </div>
            <div className="session-item">
              <h4>Pitch Practice</h4>
              <p>Friday, 11:00 AM</p>
            </div>
            <div className="session-item">
              <h4>Financial Planning</h4>
              <p>Next Monday, 3:00 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 