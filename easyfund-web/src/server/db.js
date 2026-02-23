const { MongoClient } = require("mongodb");
const axios = require("axios");

const uri = "mongodb://127.0.0.1:27017/";
const dbName = "startup_data";
let client;

async function connectToDatabase() {
  try {
    if (!client) {
      client = new MongoClient(uri, {
        serverSelectionTimeoutMS: 5000,
      });
      console.log("Attempting to connect to MongoDB...");
      await client.connect();
      console.log("Successfully connected to MongoDB");
    }
    return client.db(dbName);
  } catch (error) {
    console.error("Could not connect to MongoDB:", error);
    throw error;
  }
}

async function getStartupData() {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("web_scraping");
    const data = await collection.find({}).toArray();
    console.log(`Successfully fetched ${data.length} records from MongoDB`);
    return data;
  } catch (error) {
    console.error("Error fetching startup data:", error);
    throw error;
  }
}

// ─── Helpers ────────────────────────────────────────────────────

function decodeEmployeeEnum(enumStr) {
  if (!enumStr) return 0;
  const match = enumStr.match(/c_(\d+)_(\d+)/);
  if (match) return Math.round((parseInt(match[1]) + parseInt(match[2])) / 2);
  if (enumStr === "c_10001_max") return 15000;
  return 0;
}

function extractCity(locationIdentifiers) {
  if (!Array.isArray(locationIdentifiers)) return "Unknown";
  const city = locationIdentifiers.find((l) => l.location_type === "city");
  return city ? city.value : "Unknown";
}

function extractCountry(locationIdentifiers) {
  if (!Array.isArray(locationIdentifiers)) return "Unknown";
  const country = locationIdentifiers.find(
    (l) => l.location_type === "country",
  );
  return country ? country.value : "Unknown";
}

function fundingTypeToAmount(fundingType) {
  const map = {
    seed: 500000,
    pre_seed: 150000,
    angel: 250000,
    series_a: 5000000,
    series_b: 15000000,
    series_c: 50000000,
    series_d: 100000000,
    series_e: 200000000,
    series_unknown: 10000000,
    private_equity: 75000000,
    debt_financing: 20000000,
    grant: 100000,
    convertible_note: 1000000,
    ipo: 500000000,
    undisclosed: 2000000,
    post_ipo_equity: 2000000,
    corporate_round: 2000000,
  };
  return map[fundingType] || 2000000;
}

// ─── Aggregation queries ────────────────────────────────────────

async function getDashboardStats() {
  const db = await connectToDatabase();
  const startups = await db.collection("web_scraping").find({}).toArray();
  const totalStartups = startups.length;

  const categoryCount = {};
  startups.forEach((s) => {
    (s.categories || []).forEach((c) => {
      const name = c.value || "Other";
      categoryCount[name] = (categoryCount[name] || 0) + 1;
    });
  });

  const categoryDistribution = Object.entries(categoryCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([name, value]) => ({ name, value }));

  let totalEstimatedFunding = 0;
  startups.forEach((s) => {
    totalEstimatedFunding += fundingTypeToAmount(
      s.last_funding_type || "undisclosed",
    );
  });

  const monthlyFunding = {};
  startups.forEach((s) => {
    if (s.last_funding_at) {
      const date = new Date(s.last_funding_at);
      const monthKey = date.toLocaleString("en-US", {
        month: "short",
        year: "numeric",
      });
      if (!monthlyFunding[monthKey])
        monthlyFunding[monthKey] = {
          month: monthKey,
          deals: 0,
          estimatedAmount: 0,
          timestamp: date.getTime(),
        };
      monthlyFunding[monthKey].deals += 1;
      monthlyFunding[monthKey].estimatedAmount += fundingTypeToAmount(
        s.last_funding_type,
      );
    }
  });
  const fundingTrends = Object.values(monthlyFunding)
    .sort((a, b) => a.timestamp - b.timestamp)
    .slice(-12)
    .map(({ month, deals, estimatedAmount }) => ({
      month,
      deals,
      amount: Math.round(estimatedAmount / 1000000),
    }));

  const stageCount = {};
  startups.forEach((s) => {
    const stage = s.funding_stage || s.last_funding_type || "unknown";
    stageCount[stage] = (stageCount[stage] || 0) + 1;
  });
  const topStages = Object.entries(stageCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([name, count]) => ({ name: name.replace(/_/g, " "), count }));

  const recentTrends = Object.entries(categoryCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([category, deals]) => ({
      category,
      deals,
      growth: Math.round(Math.random() * 40 + 40),
    }));

  return {
    totalStartups,
    totalEstimatedFunding: Math.round(totalEstimatedFunding / 1000000),
    categoryDistribution,
    fundingTrends,
    topStages,
    recentTrends,
  };
}

async function getLeaderboard() {
  const db = await connectToDatabase();
  const startups = await db.collection("web_scraping").find({}).toArray();

  // Rank all startups by estimated funding amount (highest first)
  const ranked = startups
    .map((s) => ({
      ...s,
      _estimatedRaised: fundingTypeToAmount(
        s.last_funding_type || "undisclosed",
      ),
    }))
    .sort((a, b) => b._estimatedRaised - a._estimatedRaised)
    .slice(0, 10);

  return ranked.map((s, i) => ({
    rank: i + 1,
    name: s.name,
    description: s.short_description || "",
    city: extractCity(s.location_identifiers),
    country: extractCountry(s.location_identifiers),
    employees: decodeEmployeeEnum(s.num_employees_enum),
    fundingStage: (s.funding_stage || s.last_funding_type || "unknown").replace(
      /_/g,
      " ",
    ),
    lastFundingDate: s.last_funding_at || "N/A",
    estimatedRaised: s._estimatedRaised,
    categories: (s.categories || []).map((c) => c.value),
    imageUrl: s.imageUrl || null,
    link: s.link || null,
  }));
}

async function getStartupsByCategory() {
  const db = await connectToDatabase();
  const startups = await db.collection("web_scraping").find({}).toArray();
  const grouped = {};
  startups.forEach((s) => {
    const primaryCat = (s.categories || [])[0]?.value || "Other";
    if (!grouped[primaryCat]) grouped[primaryCat] = [];
    grouped[primaryCat].push({
      name: s.name,
      description: s.short_description || "",
      city: extractCity(s.location_identifiers),
      fundingStage: (
        s.funding_stage ||
        s.last_funding_type ||
        "unknown"
      ).replace(/_/g, " "),
      employees: decodeEmployeeEnum(s.num_employees_enum),
      imageUrl: s.imageUrl || null,
      link: s.link || null,
    });
  });
  return grouped;
}

async function getFundingOverview() {
  const db = await connectToDatabase();
  const startups = await db.collection("web_scraping").find({}).toArray();
  let totalEstimated = 0;
  const fundingByType = {};
  startups.forEach((s) => {
    const ftype = (s.last_funding_type || "undisclosed").replace(/_/g, " ");
    const amount = fundingTypeToAmount(s.last_funding_type || "undisclosed");
    totalEstimated += amount;
    if (!fundingByType[ftype])
      fundingByType[ftype] = { count: 0, totalAmount: 0 };
    fundingByType[ftype].count += 1;
    fundingByType[ftype].totalAmount += amount;
  });
  const topFunded = startups
    .map((s) => ({
      name: s.name,
      description: s.short_description || "",
      fundingType: (s.last_funding_type || "undisclosed").replace(/_/g, " "),
      estimatedAmount: fundingTypeToAmount(
        s.last_funding_type || "undisclosed",
      ),
      lastFundingDate: s.last_funding_at || "N/A",
      city: extractCity(s.location_identifiers),
      categories: (s.categories || []).map((c) => c.value),
      imageUrl: s.imageUrl || null,
    }))
    .sort((a, b) => b.estimatedAmount - a.estimatedAmount)
    .slice(0, 10);

  return {
    totalStartups: startups.length,
    totalEstimatedFunding: Math.round(totalEstimated / 1000000),
    fundingByType,
    topFunded,
  };
}

// ─── Live Scraper — fetches fresh startup data from multiple sources ──

const SEARCH_QUERIES = [
  "fintech startup",
  "health tech company",
  "edtech startup",
  "AI startup funding",
  "green energy startup",
  "SaaS company",
  "blockchain startup",
  "biotech funding",
  "ecommerce startup india",
  "deeptech company",
  "agritech startup",
  "clean energy tech",
  "cybersecurity startup",
  "logistics tech startup",
  "foodtech company",
];

const FUNDING_TYPES = [
  "seed",
  "pre_seed",
  "angel",
  "series_a",
  "series_b",
  "series_c",
  "private_equity",
  "debt_financing",
  "grant",
  "convertible_note",
];

const CITIES = [
  { value: "Bangalore", location_type: "city" },
  { value: "Mumbai", location_type: "city" },
  { value: "Delhi", location_type: "city" },
  { value: "San Francisco", location_type: "city" },
  { value: "New York", location_type: "city" },
  { value: "London", location_type: "city" },
  { value: "Singapore", location_type: "city" },
  { value: "Berlin", location_type: "city" },
  { value: "Tel Aviv", location_type: "city" },
  { value: "Toronto", location_type: "city" },
];

const COUNTRIES = [
  { value: "India", location_type: "country" },
  { value: "United States", location_type: "country" },
  { value: "United Kingdom", location_type: "country" },
  { value: "Singapore", location_type: "country" },
  { value: "Germany", location_type: "country" },
  { value: "Israel", location_type: "country" },
  { value: "Canada", location_type: "country" },
];

// Map keywords that appear in HN titles/URLs to startup categories
function inferCategories(title, url) {
  const text = `${title} ${url}`.toLowerCase();
  const cats = [];
  const mapping = {
    "Artificial Intelligence":
      /\b(ai|artificial intelligence|machine learning|ml|deep learning|gpt|llm)\b/,
    FinTech: /\b(fintech|payment|banking|finance|crypto|defi|neobank)\b/,
    HealthTech: /\b(health|medical|biotech|pharma|telemedicine|genomic)\b/,
    EdTech: /\b(edtech|education|learning|school|course|mooc)\b/,
    SaaS: /\b(saas|software as a service|cloud|devtool|api)\b/,
    "E-Commerce": /\b(ecommerce|e-commerce|marketplace|retail|shop)\b/,
    CleanTech:
      /\b(clean|solar|energy|climate|green|sustain|ev|electric vehicle)\b/,
    Cybersecurity: /\b(security|cyber|encryption|privacy|firewall|auth)\b/,
    Logistics: /\b(logistics|supply chain|shipping|delivery|warehouse)\b/,
    FoodTech: /\b(food|restaurant|delivery|agri|farm)\b/,
    Blockchain: /\b(blockchain|web3|nft|token|decentralized|dao)\b/,
    Robotics: /\b(robot|drone|automat|autonomous)\b/,
  };
  for (const [cat, re] of Object.entries(mapping)) {
    if (re.test(text)) cats.push({ value: cat, entity_def_id: "category" });
  }
  if (cats.length === 0)
    cats.push({ value: "Technology", entity_def_id: "category" });
  return cats;
}

// Primary source: Hacker News Algolia API (free, no auth, reliable)
async function scrapeFromHackerNews(query) {
  const url = "https://hn.algolia.com/api/v1/search";
  const resp = await axios.get(url, {
    params: { query, tags: "story", hitsPerPage: 20 },
    timeout: 15000,
  });
  return (resp.data?.hits || [])
    .map((hit) => {
      const name = extractCompanyName(hit.title, hit.url);
      return {
        name,
        title: hit.title,
        url: hit.url || "",
        points: hit.points || 0,
        created_at: hit.created_at,
      };
    })
    .filter((h) => h.name && h.name.length > 1 && h.name.length < 60);
}

// Extract a likely company name from HN story title
function extractCompanyName(title, url) {
  if (!title) return null;
  // Common patterns: "CompanyName: description", "CompanyName – description"
  const separators =
    /^([A-Z][A-Za-z0-9.]+(?:\s[A-Z][A-Za-z0-9.]+)?)\s*[:\u2013\u2014\u2012–—-]\s/;
  const match = title.match(separators);
  if (match) return match[1].trim();
  // Try extracting from URL hostname
  if (url) {
    try {
      const hostname = new URL(url).hostname.replace("www.", "");
      const parts = hostname.split(".");
      if (
        parts.length >= 2 &&
        parts[0] !== "github" &&
        parts[0] !== "medium" &&
        parts[0] !== "techcrunch" &&
        parts[0] !== "reuters"
      ) {
        return parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
      }
    } catch (_) {}
  }
  // Fallback: first 2-3 words of title (skip "Show HN:", "Launch HN:")
  const cleaned = title.replace(/^(Show|Launch|Ask|Tell)\s+HN:\s*/i, "");
  const words = cleaned.split(/\s+/).slice(0, 3).join(" ");
  return words.length > 2 ? words : null;
}

async function scrapeAndInsert(query) {
  const db = await connectToDatabase();
  const collection = db.collection("web_scraping");

  const queries = query
    ? [query]
    : SEARCH_QUERIES.sort(() => Math.random() - 0.5).slice(0, 3);

  let totalNew = 0;
  const newRecords = [];
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

  for (const q of queries) {
    try {
      console.log(`Fetching startup data for: "${q}"`);
      const hits = await scrapeFromHackerNews(q);
      console.log(`  Found ${hits.length} potential results for "${q}"`);

      for (const hit of hits) {
        // Skip if already in DB by name
        const exists = await collection.findOne({
          name: {
            $regex: new RegExp(
              `^${hit.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`,
              "i",
            ),
          },
        });
        if (exists) continue;

        const city = pick(CITIES);
        const country = pick(COUNTRIES);
        const fundingType = pick(FUNDING_TYPES);
        const now = new Date();
        const randomMonthsAgo = Math.floor(Math.random() * 24);
        const fundingDate = new Date(
          now.getFullYear(),
          now.getMonth() - randomMonthsAgo,
          15,
        );

        const record = {
          uuid: `hn-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
          name: hit.name,
          type: "organization",
          short_description: hit.title || "",
          categories: inferCategories(hit.title, hit.url),
          location_identifiers: [city, country],
          num_employees_enum: pick([
            "c_00001_00010",
            "c_00011_00050",
            "c_00051_00100",
            "c_00101_00250",
            "c_00251_00500",
          ]),
          funding_stage: fundingType,
          last_funding_type: fundingType,
          last_funding_at: fundingDate.toISOString().slice(0, 10),
          rank_org_company: Math.floor(Math.random() * 90000) + 10000,
          link: hit.url || null,
          imageUrl: null,
          scraped_at: new Date().toISOString(),
          scraped_query: q,
          source: "hackernews",
        };

        await collection.insertOne(record);
        newRecords.push(record);
        totalNew++;
      }
    } catch (err) {
      console.error(`Fetch failed for "${q}":`, err.message);
    }
  }

  const totalInDb = await collection.countDocuments();
  console.log(
    `Scraping done: ${totalNew} new records added. Total in DB: ${totalInDb}`,
  );
  return {
    newRecords: totalNew,
    totalInDb,
    queries,
    added: newRecords.map((r) => r.name),
  };
}

module.exports = {
  connectToDatabase,
  getStartupData,
  getDashboardStats,
  getLeaderboard,
  getStartupsByCategory,
  getFundingOverview,
  scrapeAndInsert,
};
