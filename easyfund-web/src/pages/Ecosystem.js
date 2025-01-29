import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/pages/Ecosystem.css';

const Ecosystem = () => {
  return (
    <div className="ecosystem">
      <motion.div 
        className="ecosystem-header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>Startup Ecosystem</h1>
        <p>Connect with the best in the industry</p>
      </motion.div>

      <div className="ecosystem-menu">
        <Link to="/ecosystem/funding" className="ecosystem-menu-item">
          <h3>Funding</h3>
          <p>Access various funding opportunities</p>
        </Link>
        <Link to="/ecosystem/pitching" className="ecosystem-menu-item">
          <h3>Pitching</h3>
          <p>Perfect your pitch deck</p>
        </Link>
        <Link to="/ecosystem/campaign" className="ecosystem-menu-item">
          <h3>Campaign</h3>
          <p>Launch your funding campaign</p>
        </Link>
      </div>

      <div className="ecosystem-grid">
        <div className="ecosystem-card" data-aos="fade-up">
          <h3>Mentorship</h3>
          <p>Get guidance from experienced entrepreneurs and industry experts</p>
        </div>
        <div className="ecosystem-card" data-aos="fade-up" data-aos-delay="100">
          <h3>Networking Events</h3>
          <p>Join exclusive events and connect with like-minded individuals</p>
        </div>
        <div className="ecosystem-card" data-aos="fade-up" data-aos-delay="200">
          <h3>Resources</h3>
          <p>Access tools and resources to help grow your startup</p>
        </div>
      </div>
    </div>
  );
};

export default Ecosystem; 