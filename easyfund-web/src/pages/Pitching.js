import { motion } from 'framer-motion';
import '../styles/pages/Pitching.css';

const Pitching = () => {
  return (
    <div className="pitching">
      <motion.div 
        className="pitching-header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>Pitch Your Startup</h1>
        <p>Perfect your pitch and win investors</p>
      </motion.div>

      <div className="pitching-grid">
        <div className="pitching-card" data-aos="fade-up">
          <h3>Pitch Deck Templates</h3>
          <p>Access proven pitch deck templates and examples</p>
        </div>
        <div className="pitching-card" data-aos="fade-up" data-aos-delay="100">
          <h3>Presentation Skills</h3>
          <p>Learn effective presentation techniques</p>
        </div>
        <div className="pitching-card" data-aos="fade-up" data-aos-delay="200">
          <h3>Investor Questions</h3>
          <p>Prepare for common investor questions</p>
        </div>
      </div>
    </div>
  );
};

export default Pitching; 