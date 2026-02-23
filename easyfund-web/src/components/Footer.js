import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>EasyFund</h4>
          <p>Real-time startup intelligence platform</p>
        </div>
        <div className="footer-section">
          <h4>Data Sources</h4>
          <p>Crunchbase &middot; Hacker News</p>
          <p>MongoDB &middot; Live API</p>
        </div>
        <div className="footer-section">
          <h4>Built With</h4>
          <p>React &middot; Express &middot; Recharts</p>
          <p>MongoDB &middot; Node.js</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 EasyFund. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
