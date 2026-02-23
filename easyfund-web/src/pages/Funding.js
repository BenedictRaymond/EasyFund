import { useEffect, useState } from "react";
import { Progress } from "../components/ui/progress.jsx";
import { motion } from "framer-motion";
import { startupApi } from "../api/startupApi.js";
import "../styles/pages/Funding.css";

const Funding = () => {
  const [fundingData, setFundingData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await startupApi.getFundingOverview();
        setFundingData(data);
      } catch (error) {
        console.error("Error fetching funding data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="funding-dashboard p-6 max-w-7xl mx-auto">
        <div className="text-center text-white">
          Loading real-time funding data...
        </div>
      </div>
    );
  }

  const totalStartups = fundingData?.totalStartups || 0;
  const totalFundingM = fundingData?.totalEstimatedFunding || 0;
  const topFunded = fundingData?.topFunded || [];
  const fundingByType = fundingData?.fundingByType || {};
  const numFundingTypes = Object.keys(fundingByType).length;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.4,
      },
    },
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
          Startup Funding Intelligence
        </motion.h1>
        <motion.p
          className="text-xl text-white/90"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Live funding data from {totalStartups} tracked startups
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
          <h3 className="text-sm font-medium text-white/80">
            Estimated Total Funding
          </h3>
          <p className="text-3xl font-bold text-white">${totalFundingM}M</p>
          <div className="mt-2">
            <Progress
              value={Math.min(
                100,
                Math.round(
                  (totalFundingM / Math.max(totalFundingM * 1.2, 1)) * 100,
                ),
              )}
              className="progress-gradient"
            />
            <p className="text-sm text-white/80 mt-1">
              Across {totalStartups} startups
            </p>
          </div>
        </motion.div>

        <motion.div
          className="stat-card gradient-card-2"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <h3 className="text-sm font-medium text-white/80">
            Tracked Startups
          </h3>
          <p className="text-3xl font-bold text-white">{totalStartups}</p>
          <p className="text-sm text-emerald-300 mt-1">Live from database</p>
        </motion.div>

        <motion.div
          className="stat-card gradient-card-3"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <h3 className="text-sm font-medium text-white/80">Funding Types</h3>
          <p className="text-3xl font-bold text-white">{numFundingTypes}</p>
          <p className="text-sm text-white/80 mt-1">Different funding stages</p>
        </motion.div>

        <motion.div
          className="stat-card gradient-card-4"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <h3 className="text-sm font-medium text-white/80">
            Top Funded Category
          </h3>
          <p className="text-3xl font-bold text-white">
            {topFunded[0]?.fundingType || "N/A"}
          </p>
          <p className="text-sm text-white/80 mt-1">
            {topFunded[0]?.name || ""}
          </p>
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          className="card glass-card p-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-xl font-semibold mb-4 text-white">
            Top Funded Startups
          </h3>
          <div className="space-y-4">
            {topFunded.slice(0, 3).map((startup, index) => (
              <motion.div
                key={index}
                className="tier glass-effect"
                whileHover={{
                  scale: 1.02,
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index }}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium text-white">{startup.name}</h4>
                    <p className="text-sm text-white/80">
                      {startup.categories?.slice(0, 2).join(", ") || "N/A"}
                    </p>
                    <p className="text-sm text-white/60">
                      {startup.city} · {startup.fundingType}
                    </p>
                  </div>
                  <p className="text-xl font-bold text-white">
                    ${(startup.estimatedAmount / 1000000).toFixed(0)}M
                  </p>
                </div>
                <Progress
                  value={Math.min(
                    100,
                    (startup.estimatedAmount / 500000000) * 100,
                  )}
                  className="mt-2 progress-gradient"
                />
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
          <h3 className="text-xl font-semibold mb-4 text-white">
            Funding Breakdown
          </h3>
          <div className="space-y-4">
            {Object.entries(fundingByType)
              .slice(0, 4)
              .map(([type, info], index) => (
                <motion.div
                  key={index}
                  className="highlight glass-effect"
                  whileHover={{
                    scale: 1.02,
                    backgroundColor: "rgba(255, 255, 255, 0.15)",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 * index }}
                >
                  <h4 className="font-medium text-white">{type}</h4>
                  <p className="text-sm text-white/80">
                    {info.count} startups · $
                    {(info.totalAmount / 1000000).toFixed(0)}M estimated
                  </p>
                </motion.div>
              ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Funding;
