import axios from "axios";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5001";

export const startupApi = {
  getStartupData: async () => {
    const res = await axios.get(`${API_BASE}/api/startups`);
    return res.data;
  },

  getDashboardStats: async () => {
    const res = await axios.get(`${API_BASE}/api/dashboard/stats`);
    return res.data;
  },

  getLeaderboard: async () => {
    const res = await axios.get(`${API_BASE}/api/leaderboard`);
    return res.data;
  },

  getStartupsByCategory: async () => {
    const res = await axios.get(`${API_BASE}/api/startups/by-category`);
    return res.data;
  },

  getFundingOverview: async () => {
    const res = await axios.get(`${API_BASE}/api/funding/overview`);
    return res.data;
  },

  scrapeData: async (query) => {
    const res = await axios.post(`${API_BASE}/api/scrape`, { query });
    return res.data;
  },
};
