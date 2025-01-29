import { motion } from 'framer-motion';
import '../styles/pages/Home.css';

const Home = () => {
  return (
    <div className="home">
      <motion.div 
        className="hero"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>Welcome to StartupHub</h1>
        <p>Your gateway to startup success</p>
      </motion.div>

      <div className="features">
        <div className="feature-card" data-aos="fade-up">
          <h3>Startup Ecosystem</h3>
          <p>Connect with mentors, investors, and fellow entrepreneurs</p>
        </div>
        <div className="feature-card" data-aos="fade-up" data-aos-delay="100">
          <h3>Funding Resources</h3>
          <p>Access to various funding opportunities and investors</p>
        </div>
        <div className="feature-card" data-aos="fade-up" data-aos-delay="200">
          <h3>Pitch Perfect</h3>
          <p>Learn how to create compelling pitches</p>
        </div>
      </div>
    </div>
  );
};

export default Home; 