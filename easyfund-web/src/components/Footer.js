import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>StartupHub</h4>
          <p>Your gateway to startup success</p>
        </div>
        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: info@startuphub.com</p>
          <p>Phone: (555) 123-4567</p>
        </div>
        <div className="footer-section">
          <h4>Follow Us</h4>
          <p>Twitter</p>
          <p>LinkedIn</p>
          <p>Facebook</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 StartupHub. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 