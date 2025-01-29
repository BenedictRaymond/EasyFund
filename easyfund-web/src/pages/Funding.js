import { useEffect, useState } from 'react';
import { Progress } from '../components/ui/progress.jsx';
import { Badge } from '../components/ui/badge.jsx';
import { motion } from 'framer-motion';
import { startupApi } from '../api/startupApi.js';
import '../styles/pages/Funding.css';

const Funding = () => {
  const [startupData, setStartupData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await startupApi.getStartupData();
        setStartupData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching startup data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="funding-dashboard p-6 max-w-7xl mx-auto">
        <div className="text-center text-white">Loading...</div>
      </div>
    );
  }

  const totalRaised = 7500000;
  const goalAmount = 10000000;
  const progressPercentage = (totalRaised / goalAmount) * 100;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.4
      }
    }
  };

  return (
    <motion.div 
      className="funding-dashboard p-6 max-w-7xl mx-auto"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="hero-section text-center mb-12 p-8 rounded-2xl gradient-bg">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold text-white mb-4"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          Join Our Journey to Innovation
        </motion.h1>
        <motion.p 
          className="text-xl text-white/90"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Be part of the next big thing in tech
        </motion.p>
      </div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        variants={containerVariants}
      >
        <motion.div 
          className="stat-card gradient-card-1"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <h3 className="text-sm font-medium text-white/80">Total Raised</h3>
          <p className="text-3xl font-bold text-white">${(totalRaised / 1000000).toFixed(2)}M</p>
          <div className="mt-2">
            <Progress value={progressPercentage} className="progress-gradient" />
            <p className="text-sm text-white/80 mt-1">{progressPercentage.toFixed(0)}% of goal</p>
          </div>
        </motion.div>

        <motion.div 
          className="stat-card gradient-card-2"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <h3 className="text-sm font-medium text-white/80">Backers</h3>
          <p className="text-3xl font-bold text-white">245</p>
          <p className="text-sm text-emerald-300 mt-1">+12 this week</p>
        </motion.div>

        <motion.div 
          className="stat-card gradient-card-3"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <h3 className="text-sm font-medium text-white/80">Days Left</h3>
          <p className="text-3xl font-bold text-white">18</p>
          <p className="text-sm text-white/80 mt-1">Campaign ends Dec 31, 2024</p>
        </motion.div>

        <motion.div 
          className="stat-card gradient-card-4"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <h3 className="text-sm font-medium text-white/80">Minimum Investment</h3>
          <p className="text-3xl font-bold text-white">$5,000</p>
          <p className="text-sm text-white/80 mt-1">SAFE notes</p>
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div 
          className="card glass-card p-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-xl font-semibold mb-4 text-white">Investment Tiers</h3>
          <div className="space-y-4">
            {[
              {
                title: "Early Bird Investment",
                description: "Get 2% equity stake + priority access",
                available: "11 of 100 available",
                price: "$5,000",
                progress: 11
              },
              {
                title: "Strategic Partner",
                description: "5% equity stake + board observer rights",
                available: "8 of 20 available",
                price: "$25,000",
                progress: 40
              },
              {
                title: "Lead Investor Package",
                description: "10% equity stake + board seat",
                available: "2 of 5 available",
                price: "$100,000",
                progress: 60
              }
            ].map((tier, index) => (
              <motion.div 
                key={index}
                className="tier glass-effect"
                whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index }}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium text-white">{tier.title}</h4>
                    <p className="text-sm text-white/80">{tier.description}</p>
                    <p className="text-sm text-white/60">{tier.available}</p>
                  </div>
                  <p className="text-xl font-bold text-white">{tier.price}</p>
                </div>
                <Progress value={tier.progress} className="mt-2 progress-gradient" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="card glass-card p-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-xl font-semibold mb-4 text-white">Campaign Highlights</h3>
          <div className="space-y-4">
            {[
              { title: "Revenue Traction", content: "$500K ARR with 15% MoM growth" },
              { title: "Team Size", content: "15 full-time employees" },
              { title: "Market Size", content: "$50B TAM, $5B SAM" },
              { title: "Investment Terms", content: "SAFE notes with $10M valuation cap" }
            ].map((highlight, index) => (
              <motion.div 
                key={index}
                className="highlight glass-effect"
                whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index }}
              >
                <h4 className="font-medium text-white">{highlight.title}</h4>
                <p className="text-sm text-white/80">{highlight.content}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Funding; 