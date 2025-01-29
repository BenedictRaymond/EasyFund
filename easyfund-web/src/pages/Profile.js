import { motion } from 'framer-motion';
import '../styles/pages/Profile.css';

const Profile = () => {
  return (
    <div className="profile">
      <motion.div 
        className="profile-header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>Your Profile</h1>
        <p>Manage your startup profile</p>
      </motion.div>

      <div className="profile-content">
        <div className="profile-section">
          <h2>Personal Information</h2>
          <form className="profile-form">
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" placeholder="Enter your name" />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="Enter your email" />
            </div>
            <div className="form-group">
              <label>Position</label>
              <input type="text" placeholder="Your role in the startup" />
            </div>
          </form>
        </div>

        <div className="profile-section">
          <h2>Startup Details</h2>
          <form className="profile-form">
            <div className="form-group">
              <label>Startup Name</label>
              <input type="text" placeholder="Enter startup name" />
            </div>
            <div className="form-group">
              <label>Industry</label>
              <select>
                <option value="">Select Industry</option>
                <option value="tech">Technology</option>
                <option value="health">Healthcare</option>
                <option value="finance">Finance</option>
                <option value="education">Education</option>
              </select>
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea placeholder="Describe your startup"></textarea>
            </div>
            <button type="submit" className="save-btn">Save Changes</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile; 