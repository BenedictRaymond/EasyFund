import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js';
import Home from './pages/Home.js';
import Ecosystem from './pages/Ecosystem.js';
import Dashboard from './pages/Dashboard.js';
import Profile from './pages/Profile.js';
import Funding from './pages/Funding.js';
import Pitching from './pages/Pitching.js';
import Campaign from './pages/Campaign.js';
import TestDatabase from './pages/TestDatabase.js';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    });
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/ecosystem" element={<Ecosystem />} />
          <Route path="/ecosystem/funding" element={<Funding />} />
          <Route path="/ecosystem/pitching" element={<Pitching />} />
          <Route path="/ecosystem/campaign" element={<Campaign />} />
          <Route path="/test-database" element={<TestDatabase />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
