import { motion } from 'framer-motion';
import '../styles/pages/Campaign.css';

const Campaign = () => {
  return (
    <div className="campaign-page">
      <motion.div 
        className="campaign-header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>Launch Your Campaign</h1>
        <p>Create and manage your funding campaign</p>
      </motion.div>

      <div className="campaign-content">
        <div className="campaign-form">
          <h2>Campaign Details</h2>
          <form>
            <div className="form-group">
              <label>Campaign Title</label>
              <input type="text" placeholder="Enter campaign title" />
            </div>
            <div className="form-group">
              <label>Funding Goal</label>
              <input type="number" placeholder="Enter amount" />
            </div>
            <div className="form-group">
              <label>Campaign Duration</label>
              <select>
                <option value="30">30 Days</option>
                <option value="60">60 Days</option>
                <option value="90">90 Days</option>
              </select>
            </div>
            <div className="form-group">
              <label>Campaign Description</label>
              <textarea placeholder="Describe your campaign"></textarea>
            </div>
            <div className="form-group">
              <label>Perks</label>
              <div className="perks-container">
                <div className="perk-input">
                  <input type="text" placeholder="Perk title" />
                  <input type="number" placeholder="Amount" />
                  <textarea placeholder="Perk description"></textarea>
                </div>
                <button type="button" className="add-perk-btn">+ Add Another Perk</button>
              </div>
            </div>
            <button type="submit" className="launch-btn">Launch Campaign</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Campaign; 