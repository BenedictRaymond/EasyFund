import { motion } from "framer-motion";
import { startupApi } from "../api/startupApi.js";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from "recharts";
import "../styles/Dashboard.css";
import Leaderboard from "../components/Leaderboard.js";
import { useState, useEffect } from "react";
import {
  Card,
  CalendarDateRangePicker,
  Title,
} from "../components/ui/dashboard.jsx";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../components/ui/tabs.jsx";
import { Button } from "../components/ui/button.jsx";
import {
  DollarSign,
  Users,
  TrendingUp,
  Search,
  Bell,
  Settings,
  RefreshCw,
  BarChart3,
  Globe,
  Layers,
} from "lucide-react";

const COLORS = [
  "#0088FE", "#00C49F", "#FFBB28", "#FF8042",
  "#8884d8", "#82ca9d", "#ff7300", "#a855f7",
];

const Dashboard = () => {
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [scraping, setScraping] = useState(false);
  const [scrapeResult, setScrapeResult] = useState(null);
  const [scrapeQuery, setScrapeQuery] = useState("");

  const loadDashboard = async () => {
    try {
      const stats = await startupApi.getDashboardStats();
      setDashboardData(stats);
    } catch (err) {
      console.error("Failed to load dashboard:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleScrape = async () => {
    setScraping(true);
    setScrapeResult(null);
    try {
      const result = await startupApi.scrapeData(scrapeQuery || undefined);
      setScrapeResult(result);
      await loadDashboard();
    } catch (err) {
      console.error("Scrape failed:", err);
      setScrapeResult({ error: err.message });
    } finally {
      setScraping(false);
    }
  };

  useEffect(() => { loadDashboard(); }, []);

  /* -- Derived data from API response -- */
  const fundingTrends = (dashboardData?.fundingTrends || []).map((t) => ({
    month: t.month, deals: t.deals, amount: t.amount,
  }));

  const fundingDistribution = dashboardData?.categoryDistribution || [];

  const topStages = dashboardData?.topStages || [];
  const performanceMetrics = topStages.slice(0, 6).map((s) => ({
    subject: s.name, current: s.count,
    target: Math.round(s.count * 1.3), fullMark: Math.round(s.count * 2),
  }));

  const totalStartups = dashboardData?.totalStartups || 0;
  const totalFundingM = dashboardData?.totalEstimatedFunding || 0;
  const fundedCount = (dashboardData?.fundingTrends || []).reduce((s, t) => s + t.deals, 0);
  const successPct = totalStartups > 0 ? Math.round((fundedCount / totalStartups) * 100) : 0;

  const successRate = [
    { name: "Funded", value: successPct },
    { name: "Seeking", value: 100 - successPct },
  ];

  const recentTrends = (dashboardData?.recentTrends || []).map((t) => ({
    category: t.category, growth: t.growth, deals: t.deals, amount: t.deals + " startups",
  }));

  if (loading) {
    return (
      <div className="dashboard-container" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <div style={{ textAlign: "center" }}>
          <h2>Loading real-time data...</h2>
          <p style={{ color: "#666" }}>Connecting to database</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-left">
          <h1>Mission Control Center</h1>
          <div className="search-container">
            <Search className="search-icon" />
            <input type="text" placeholder="Search startups, categories, or trends..." className="search-input" />
          </div>
        </div>
        <div className="header-right">
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <input
              type="text" placeholder="e.g. fintech, AI startup..."
              value={scrapeQuery} onChange={(e) => setScrapeQuery(e.target.value)}
              style={{ padding: "6px 12px", borderRadius: "6px", border: "1px solid #d1d5db", fontSize: "14px", width: "200px" }}
            />
            <Button onClick={handleScrape} disabled={scraping}
              style={{ background: scraping ? "#9ca3af" : "linear-gradient(135deg, #4f46e5, #10b981)", color: "#fff", border: "none", display: "flex", alignItems: "center", gap: "6px", padding: "8px 16px", borderRadius: "8px", cursor: scraping ? "wait" : "pointer" }}>
              <RefreshCw className={`h-4 w-4 ${scraping ? "animate-spin" : ""}`} />
              {scraping ? "Scraping..." : "Fetch Fresh Data"}
            </Button>
          </div>
          {scrapeResult && (
            <div style={{ padding: "8px 14px", borderRadius: "8px", fontSize: "13px", marginLeft: "8px",
              background: scrapeResult.error ? "#fef2f2" : "#f0fdf4",
              color: scrapeResult.error ? "#dc2626" : "#16a34a",
              border: `1px solid ${scrapeResult.error ? "#fecaca" : "#bbf7d0"}` }}>
              {scrapeResult.error ? `Error: ${scrapeResult.error}` : `Done! ${scrapeResult.newRecords} new startups added (${scrapeResult.totalInDb} total in DB)`}
            </div>
          )}
          <CalendarDateRangePicker />
          <Button variant="outline" className="notifications-btn"><Bell className="h-4 w-4" /></Button>
          <Button variant="outline"><Settings className="h-4 w-4" /></Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <div className="flex items-center gap-3 mb-2"><DollarSign className="h-5 w-5 text-blue-500" /><Title>Total Estimated Funding</Title></div>
              <p className="stat-value">${totalFundingM}M</p>
              <span className="stat-change positive">from database</span>
            </Card>
            <Card>
              <div className="flex items-center gap-3 mb-2"><Layers className="h-5 w-5 text-green-500" /><Title>Tracked Startups</Title></div>
              <p className="stat-value">{totalStartups}</p>
              <span className="stat-change positive">live count</span>
            </Card>
            <Card>
              <div className="flex items-center gap-3 mb-2"><BarChart3 className="h-5 w-5 text-purple-500" /><Title>Funded Rate</Title></div>
              <p className="stat-value">{successPct}%</p>
              <span className="stat-change positive">of total</span>
            </Card>
            <Card>
              <div className="flex items-center gap-3 mb-2"><Globe className="h-5 w-5 text-orange-500" /><Title>Categories</Title></div>
              <p className="stat-value">{fundingDistribution.length}</p>
              <span className="stat-change positive">tracked</span>
            </Card>
          </div>

          <div className="grid md:grid-cols-7 gap-6 mt-6">
            <Card className="md:col-span-4">
              <Title>Funding Trends (Monthly)</Title>
              <div className="chart-container">
                <ResponsiveContainer>
                  <ComposedChart data={fundingTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="deals" name="Deals" fill="#8884d8" />
                    <Line yAxisId="right" type="monotone" dataKey="amount" name="Amount ($M)" stroke="#ff7300" strokeWidth={2} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="md:col-span-3">
              <Title>Funding Stage Breakdown</Title>
              <div className="chart-container">
                <ResponsiveContainer>
                  <RadarChart data={performanceMetrics}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis />
                    <Radar name="Startups" dataKey="current" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                    <Legend />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <Card>
              <Title>Category Distribution</Title>
              <div className="chart-container">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie data={fundingDistribution} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                      {fundingDistribution.map((entry, index) => (<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card>
              <Title>Top Funding Stages</Title>
              <div className="space-y-3 p-2">
                {topStages.map((stage, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg" style={{ background: "rgba(99,102,241,0.05)" }}>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                      <span className="font-medium capitalize">{stage.name}</span>
                    </div>
                    <span className="font-bold text-gray-700">{stage.count} startups</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <Title>Category Distribution</Title>
              <div className="chart-container">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie data={fundingDistribution} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                      {fundingDistribution.map((entry, index) => (<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />))}
                    </Pie>
                    <Tooltip /><Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card>
              <Title>Monthly Deal Count</Title>
              <div className="chart-container">
                <ResponsiveContainer>
                  <BarChart data={fundingTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" /><YAxis /><Tooltip /><Legend />
                    <Bar dataKey="deals" name="Deals" fill="#8884d8" />
                    <Bar dataKey="amount" name="Amount ($M)" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card>
              <Title>Funded vs Seeking</Title>
              <div className="chart-container">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie data={successRate} startAngle={180} endAngle={0} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                      <Cell fill="#4f46e5" /><Cell fill="#e5e7eb" />
                    </Pie>
                    <Tooltip /><Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="lg:col-span-2">
              <Title>Stage Comparison</Title>
              <div className="chart-container">
                <ResponsiveContainer>
                  <LineChart data={performanceMetrics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="subject" /><YAxis /><Tooltip /><Legend />
                    <Line type="monotone" dataKey="current" name="Current" stroke="#8884d8" strokeWidth={2} />
                    <Line type="monotone" dataKey="target" name="Target" stroke="#82ca9d" strokeWidth={2} strokeDasharray="5 5" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card>
              <Title>Funding Amount Growth</Title>
              <div className="chart-container">
                <ResponsiveContainer>
                  <AreaChart data={fundingTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" /><YAxis /><Tooltip />
                    <Area type="monotone" dataKey="amount" name="Amount ($M)" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Trends Tab */}
        <TabsContent value="trends">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <Title>Emerging Sectors</Title>
              <div className="trending-sectors">
                {recentTrends.map((trend, index) => (
                  <motion.div key={trend.category} className="trend-item" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}>
                    <TrendingUp className={`trend-icon ${trend.growth > 75 ? "high-growth" : ""}`} />
                    <div className="trend-info">
                      <h3>{trend.category}</h3>
                      <p>{trend.growth}% growth</p>
                      <span>{trend.amount}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>

            <Card>
              <Title>Category Trend Lines</Title>
              <div className="chart-container">
                <ResponsiveContainer>
                  <AreaChart data={fundingTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" /><YAxis /><Tooltip /><Legend />
                    <Area type="monotone" dataKey="deals" name="New Deals" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.15} />
                    <Area type="monotone" dataKey="amount" name="Funding ($M)" stroke="#10b981" fill="#10b981" fillOpacity={0.15} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="md:col-span-2">
              <Title>Funding Stage Distribution</Title>
              <div className="chart-container">
                <ResponsiveContainer>
                  <BarChart data={topStages} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="name" width={120} tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="count" name="Startups" fill="#6366f1">
                      {topStages.map((_, index) => (<Cell key={`bar-${index}`} fill={COLORS[index % COLORS.length]} />))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Leaderboard Toggle */}
      <motion.div className="dashboard-actions" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}>
        <button className="action-button" onClick={() => setShowLeaderboard(!showLeaderboard)}>
          {showLeaderboard ? "Hide Leaderboard" : "View Global Leaderboard"}
          <span className="arrow">-></span>
        </button>
      </motion.div>

      {showLeaderboard && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="dashboard-leaderboard">
          <Leaderboard />
        </motion.div>
      )}
    </div>
  );
};

export default Dashboard;
