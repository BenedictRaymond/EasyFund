import { useState } from 'react';
import '../styles/ProfileForm.css';

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    businessName: '',
    industry: '',
    fundingGoal: '',
    pitchDescription: '',
    businessPlan: null,
    pitchDeck: null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  return (
    <div className="profile-form">
      <h2>Create Startup Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Business Name</label>
          <input
            type="text"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Industry</label>
          <select name="industry" value={formData.industry} onChange={handleChange} required>
            <option value="">Select Industry</option>
            <option value="tech">Technology</option>
            <option value="health">Healthcare</option>
            <option value="finance">Fintech</option>
            <option value="retail">Retail</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Funding Goal</label>
          <input
            type="number"
            name="fundingGoal"
            value={formData.fundingGoal}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Pitch Description</label>
          <textarea
            name="pitchDescription"
            value={formData.pitchDescription}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Business Plan (PDF)</label>
          <input
            type="file"
            name="businessPlan"
            accept=".pdf"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Pitch Deck (PDF)</label>
          <input
            type="file"
            name="pitchDeck"
            accept=".pdf"
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="submit-btn">Create Profile</button>
      </form>
    </div>
  );
};

export default ProfileForm; 