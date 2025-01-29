import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  PieChart, Pie, Cell, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart
} from 'recharts';
import '../styles/Dashboard.css';
import Leaderboard from '../components/Leaderboard.js';
import { useState } from 'react';
import {
  Card,
  CalendarDateRangePicker,
  SearchCommand,
  Title
} from "../components/ui/dashboard.jsx";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs.jsx";
import { Button } from "../components/ui/button.jsx";
import {
  Activity,
  CreditCard,
  DollarSign,
  Download,
  Users,
  TrendingUp,
  Search,
  Bell,
  Settings,
  Briefcase,
  ChevronRight,
  Shield,
  Target,
  Award,
  Clock,
  Share,
  Bookmark,
  Linkedin,
  FileText,
} from "lucide-react";

const Dashboard = () => {
  // Sample data for various charts
  const fundingTrends = [
    { month: 'Jan', crowdfunding: 4000, angelInvestors: 2400, vcFunding: 6000 },
    { month: 'Feb', crowdfunding: 3000, angelInvestors: 1398, vcFunding: 5000 },
    { month: 'Mar', crowdfunding: 5000, angelInvestors: 9800, vcFunding: 4000 },
    { month: 'Apr', crowdfunding: 7000, angelInvestors: 3908, vcFunding: 8000 },
    { month: 'May', crowdfunding: 6000, angelInvestors: 4800, vcFunding: 7000 },
  ];

  const fundingDistribution = [
    { name: 'Tech', value: 400 },
    { name: 'Healthcare', value: 300 },
    { name: 'Finance', value: 300 },
    { name: 'Education', value: 200 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const performanceMetrics = [
    { subject: 'Engagement', A: 120, B: 110, fullMark: 150 },
    { subject: 'Funding', A: 98, B: 130, fullMark: 150 },
    { subject: 'Growth', A: 86, B: 130, fullMark: 150 },
    { subject: 'Reach', A: 99, B: 100, fullMark: 150 },
    { subject: 'Success Rate', A: 85, B: 90, fullMark: 150 },
    { subject: 'ROI', A: 65, B: 85, fullMark: 150 },
  ];

  const successRate = [
    { name: 'Successful', value: 75 },
    { name: 'Pending', value: 25 },
  ];

  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [selectedView, setSelectedView] = useState("overview");

  // New data for additional charts
  const recentTrends = [
    { category: "AI & ML", growth: 85, deals: 234, amount: "12.5M" },
    { category: "Clean Tech", growth: 65, deals: 187, amount: "8.2M" },
    { category: "FinTech", growth: 72, deals: 156, amount: "15.7M" },
    { category: "HealthTech", growth: 78, deals: 198, amount: "11.3M" },
  ];

  const topInvestors = [
    { name: "Sequoia Capital", investments: 45, amount: "120M" },
    { name: "Andreessen Horowitz", investments: 38, amount: "95M" },
    { name: "Y Combinator", investments: 52, amount: "78M" },
    { name: "Tiger Global", investments: 31, amount: "150M" },
  ];

  const fundingDetails = {
    currentRaise: {
      target: 10000000,
      raised: 7500000,
      backers: 245,
      daysLeft: 18,
      percentFunded: 75
    },
    highlights: [
      {
        icon: <TrendingUp className="h-5 w-5 text-blue-500" />,
        title: "Revenue Traction",
        value: "$500K ARR",
        growth: "+15% MoM growth"
      },
      {
        icon: <Users className="h-5 w-5 text-green-500" />,
        title: "Team Size",
        value: "15 full-time employees",
        details: "Engineering & Product focused"
      },
      {
        icon: <Target className="h-5 w-5 text-purple-500" />,
        title: "Market Size",
        value: "$50B TAM",
        details: "$5B SAM"
      }
    ],
    investmentTiers: [
      {
        name: "Early Bird Investment",
        amount: 5000,
        equity: "2%",
        perks: [
          "Priority access to beta testing",
          "Quarterly investor updates",
          "Exclusive community access"
        ],
        available: 11,
        totalSpots: 100,
        estimatedDelivery: "December 2024"
      },
      {
        name: "Strategic Partner",
        amount: 25000,
        equity: "5%",
        perks: [
          "Board observer rights",
          "Quarterly meetings with founders",
          "Priority partnership opportunities",
          "Custom feature requests"
        ],
        available: 8,
        totalSpots: 20,
        estimatedDelivery: "January 2025"
      },
      {
        name: "Lead Investor Package",
        amount: 100000,
        equity: "10%",
        perks: [
          "Board seat",
          "Monthly strategy sessions",
          "Direct access to founding team",
          "Custom integration support",
          "First right of refusal for future rounds"
        ],
        available: 2,
        totalSpots: 5,
        estimatedDelivery: "January 2025"
      }
    ],
    investmentTerms: {
      minimum: 5000,
      valuation: 10000000,
      security: "SAFE",
      discount: 20,
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="header-left">
          <h1>Mission Control Center</h1>
          <div className="search-container">
            <Search className="search-icon" />
            <input 
              type="text" 
              placeholder="Search campaigns, investors, or trends..." 
              className="search-input"
            />
          </div>
        </div>
        <div className="header-right">
          <CalendarDateRangePicker />
          <Button variant="outline" className="notifications-btn">
            <Bell className="h-4 w-4" />
            <span className="notification-badge">3</span>
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="funding">Funding</TabsTrigger>
          <TabsTrigger value="investors">Investors</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <Title>Total Raised</Title>
              <p className="stat-value">$2.5M</p>
              <span className="stat-change positive">+15.3%</span>
            </Card>
            <Card>
              <Title>Active Campaigns</Title>
              <p className="stat-value">142</p>
              <span className="stat-change positive">+8.7%</span>
            </Card>
            <Card>
              <Title>Success Rate</Title>
              <p className="stat-value">75%</p>
              <span className="stat-change positive">+5.2%</span>
            </Card>
            <Card>
              <Title>Investors</Title>
              <p className="stat-value">1,234</p>
              <span className="stat-change positive">+12.1%</span>
            </Card>
          </div>
          
          <div className="grid md:grid-cols-7 gap-6 mt-6">
            <Card className="md:col-span-4">
              <Title>Funding Overview</Title>
              <div className="chart-container">
                <ResponsiveContainer>
                  <AreaChart data={fundingTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="crowdfunding" stackId="1" stroke="#8884d8" fill="#8884d8" />
                    <Area type="monotone" dataKey="angelInvestors" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                    <Area type="monotone" dataKey="vcFunding" stackId="1" stroke="#ffc658" fill="#ffc658" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
            
            <Card className="md:col-span-3">
              <Title>Success Metrics</Title>
              <div className="chart-container">
                <ResponsiveContainer>
                  <RadarChart data={performanceMetrics}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis />
                    <Radar name="Current" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                    <Radar name="Target" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <Title>Industry Distribution</Title>
              <div className="chart-container">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={fundingDistribution}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {fundingDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card>
              <Title>Monthly Investment Trends</Title>
              <div className="chart-container">
                <ResponsiveContainer>
                  <BarChart data={fundingTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="crowdfunding" fill="#8884d8" />
                    <Bar dataKey="angelInvestors" fill="#82ca9d" />
                    <Bar dataKey="vcFunding" fill="#ffc658" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card>
              <Title>Success Rate</Title>
              <div className="chart-container">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={successRate}
                      startAngle={180}
                      endAngle={0}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      <Cell fill="#4f46e5" />
                      <Cell fill="#e5e7eb" />
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="lg:col-span-2">
              <Title>Performance Comparison</Title>
              <div className="chart-container">
                <ResponsiveContainer>
                  <LineChart data={performanceMetrics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="subject" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="A" name="Current" stroke="#8884d8" />
                    <Line type="monotone" dataKey="B" name="Target" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card>
              <Title>Investment Growth</Title>
              <div className="chart-container">
                <ResponsiveContainer>
                  <AreaChart data={fundingTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="vcFunding" 
                      stackId="1" 
                      stroke="#8884d8" 
                      fill="#8884d8" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <Card>
              <Title>Sector Performance</Title>
              <div className="chart-container">
                <ResponsiveContainer>
                  <RadarChart data={performanceMetrics}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis />
                    <Radar 
                      name="Current" 
                      dataKey="A" 
                      stroke="#8884d8" 
                      fill="#8884d8" 
                      fillOpacity={0.6} 
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card>
              <Title>Monthly Success Rate</Title>
              <div className="chart-container">
                <ResponsiveContainer>
                  <ComposedChart data={fundingTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="crowdfunding" fill="#8884d8" />
                    <Line type="monotone" dataKey="angelInvestors" stroke="#ff7300" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <Title>Emerging Sectors</Title>
              <div className="trending-sectors">
                {recentTrends.map((trend, index) => (
                  <motion.div 
                    key={trend.category}
                    className="trend-item"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <TrendingUp className={`trend-icon ${trend.growth > 75 ? 'high-growth' : ''}`} />
                    <div className="trend-info">
                      <h3>{trend.category}</h3>
                      <p>{trend.growth}% growth</p>
                      <span>{trend.deals} deals · ${trend.amount}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
            <Card>
              <Title>Market Insights</Title>
              {/* Add market insights visualization */}
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="investors">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="col-span-2">
              <Title>Top Investors</Title>
              <div className="investors-list">
                {topInvestors.map((investor, index) => (
                  <motion.div 
                    key={investor.name}
                    className="investor-item"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="investor-info">
                      <h3>{investor.name}</h3>
                      <p>{investor.investments} investments</p>
                      <span>${investor.amount} total invested</span>
                    </div>
                    <Button variant="outline" className="connect-btn">
                      Connect
                    </Button>
                  </motion.div>
                ))}
              </div>
            </Card>
            <Card>
              <Title>Investment Distribution</Title>
              {/* Add investment distribution chart */}
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="funding">
          <div className="funding-page">
            {/* Project Overview */}
            <Card className="mb-8">
              <div className="flex items-start gap-6">
                <div className="flex-1">
                  <h1 className="text-2xl font-bold mb-2">EcoTech Solutions - Smart Energy Management</h1>
                  <p className="text-gray-600 mb-4">Revolutionizing home energy consumption with AI</p>
                  <div className="flex gap-4">
                    <Button variant="outline" className="gap-2">
                      <Share className="h-4 w-4" />
                      Share
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <Bookmark className="h-4 w-4" />
                      Save
                    </Button>
                  </div>
                </div>
                <div className="w-1/3">
                  <ResponsiveContainer width="100%" height={100}>
                    <LineChart data={fundingTrends}>
                      <Line 
                        type="monotone" 
                        dataKey="crowdfunding" 
                        stroke="#4f46e5" 
                        strokeWidth={2}
                        dot={false}
                      />
                      <Tooltip />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Card>

            {/* Funding Progress Section */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="funding-stat-card">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-blue-100">
                    <DollarSign className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Raised</p>
                    <h3 className="text-2xl font-bold">${(fundingDetails.currentRaise.raised / 1000000).toFixed(2)}M</h3>
                    <p className="text-sm text-green-600">of ${(fundingDetails.currentRaise.target / 1000000).toFixed(2)}M goal</p>
                  </div>
                </div>
                <div className="mt-4 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${fundingDetails.currentRaise.percentFunded}%` }}
                  />
                </div>
              </Card>

              <Card className="funding-stat-card">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-purple-100">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Backers</p>
                    <h3 className="text-2xl font-bold">{fundingDetails.currentRaise.backers}</h3>
                    <p className="text-sm text-purple-600">Active investors</p>
                  </div>
                </div>
              </Card>

              <Card className="funding-stat-card">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-orange-100">
                    <Clock className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Time Left</p>
                    <h3 className="text-2xl font-bold">{fundingDetails.currentRaise.daysLeft} days</h3>
                    <p className="text-sm text-orange-600">Until closing</p>
                  </div>
                </div>
              </Card>

              <Card className="funding-stat-card">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-green-100">
                    <Shield className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Security Type</p>
                    <h3 className="text-2xl font-bold">{fundingDetails.investmentTerms.security}</h3>
                    <p className="text-sm text-green-600">{fundingDetails.investmentTerms.discount}% discount</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Campaign Highlights with Charts */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="funding-chart-card">
                <Title>Funding Progress Over Time</Title>
                <div className="chart-container">
                  <ResponsiveContainer>
                    <AreaChart data={fundingTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="crowdfunding" 
                        stroke="#4f46e5" 
                        fill="#4f46e5" 
                        fillOpacity={0.1}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card className="funding-chart-card">
                <Title>Investor Distribution</Title>
                <div className="chart-container">
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Early Birds', value: 45 },
                          { name: 'Strategic', value: 35 },
                          { name: 'Lead Investors', value: 20 },
                        ]}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {fundingDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>

            {/* Campaign Highlights */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {fundingDetails.highlights.map((highlight, index) => (
                <Card key={index} className="highlight-card">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-gray-100">
                      {highlight.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{highlight.title}</h3>
                      <p className="text-lg font-bold text-blue-600">{highlight.value}</p>
                      <p className="text-sm text-gray-500">{highlight.growth || highlight.details}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Investment Tiers */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Investment Tiers</h2>
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Download Pitch Deck
                </Button>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {fundingDetails.investmentTiers.map((tier, index) => (
                  <Card key={index} className={`tier-card relative overflow-hidden ${
                    tier.available <= 5 ? 'border-red-200' : ''
                  }`}>
                    <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
                      {tier.available <= 5 && (
                        <div className="bg-red-500 text-white text-xs py-1 px-6 rotate-45 transform translate-x-2 translate-y-6">
                          Limited
                        </div>
                      )}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                    <div className="text-3xl font-bold text-blue-600 mb-4">
                      ${(tier.amount).toLocaleString()}
                    </div>
                    <p className="text-gray-600 mb-4">{tier.equity} equity stake</p>
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Includes:</h4>
                      <ul className="space-y-2">
                        {tier.perks.map((perk, perkIndex) => (
                          <li key={perkIndex} className="flex items-center gap-2 text-sm text-gray-600">
                            <ChevronRight className="h-4 w-4 text-blue-500" />
                            {perk}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm text-gray-500">
                        {tier.available} of {tier.totalSpots} spots available
                      </p>
                      <div className="mt-2 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(tier.available / tier.totalSpots) * 100}%` }}
                        />
                      </div>
                    </div>
                    <Button 
                      className="w-full mt-6"
                      variant={tier.available > 0 ? "default" : "outline"}
                      disabled={tier.available === 0}
                    >
                      {tier.available > 0 ? "Select Investment" : "Sold Out"}
                    </Button>
                  </Card>
                ))}
              </div>
            </div>

            {/* Team & Company Section */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card>
                <Title>Team</Title>
                <div className="space-y-4">
                  {[
                    { name: 'Sarah Chen', role: 'CEO & Founder', linkedin: '#' },
                    { name: 'Alex Kumar', role: 'CTO', linkedin: '#' },
                    { name: 'Maria Garcia', role: 'Head of Product', linkedin: '#' },
                  ].map((member, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50">
                      <div className="w-12 h-12 rounded-full bg-gray-200" />
                      <div className="flex-1">
                        <h3 className="font-semibold">{member.name}</h3>
                        <p className="text-sm text-gray-500">{member.role}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Linkedin className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>

              <Card>
                <Title>Company Overview</Title>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Founded</p>
                      <p className="font-semibold">2022</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-semibold">San Francisco, CA</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Employees</p>
                      <p className="font-semibold">15-30</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Industry</p>
                      <p className="font-semibold">CleanTech</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Documents</h4>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-between">
                        <span className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          Pitch Deck
                        </span>
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" className="w-full justify-between">
                        <span className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          Financial Projections
                        </span>
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Investment Terms */}
            <Card className="mb-8">
              <Title>Investment Terms</Title>
              <div className="grid md:grid-cols-4 gap-6">
                <div>
                  <p className="text-sm text-gray-500">Minimum Investment</p>
                  <p className="text-xl font-bold">${fundingDetails.investmentTerms.minimum.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Valuation Cap</p>
                  <p className="text-xl font-bold">${(fundingDetails.investmentTerms.valuation / 1000000).toFixed(1)}M</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Security Type</p>
                  <p className="text-xl font-bold">{fundingDetails.investmentTerms.security}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Discount Rate</p>
                  <p className="text-xl font-bold">{fundingDetails.investmentTerms.discount}%</p>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <motion.div 
        className="dashboard-actions"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <button 
          className="action-button"
          onClick={() => setShowLeaderboard(!showLeaderboard)}
        >
          {showLeaderboard ? 'Hide Leaderboard' : 'View Global Leaderboard'}
          <span className="arrow">→</span>
        </button>
      </motion.div>

      {showLeaderboard && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="dashboard-leaderboard"
        >
          <Leaderboard />
        </motion.div>
      )}
    </div>
  );
};

export default Dashboard; 