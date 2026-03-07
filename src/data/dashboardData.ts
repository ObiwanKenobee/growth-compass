// Mock data for Atlas Sanctum Customer & Marketing Dashboard

export const cacData = {
  current: 2840,
  trend: -12.4,
  history: [
    { month: "Sep", value: 3800 },
    { month: "Oct", value: 3500 },
    { month: "Nov", value: 3200 },
    { month: "Dec", value: 3100 },
    { month: "Jan", value: 2950 },
    { month: "Feb", value: 2840 },
  ],
};

export const ltvData = {
  current: 34200,
  avgDuration: "3.2 years",
  trend: 18.6,
  history: [
    { month: "Sep", value: 26000 },
    { month: "Oct", value: 28000 },
    { month: "Nov", value: 29500 },
    { month: "Dec", value: 31000 },
    { month: "Jan", value: 32800 },
    { month: "Feb", value: 34200 },
  ],
  segments: [
    { name: "Climate Funds", value: 48000 },
    { name: "Governments", value: 38000 },
    { name: "Enterprise", value: 32000 },
    { name: "Research", value: 22000 },
  ],
};

export const churnData = {
  current: 2.1,
  trend: -0.8,
  history: [
    { month: "Mar", value: 3.8 },
    { month: "Apr", value: 3.5 },
    { month: "May", value: 3.2 },
    { month: "Jun", value: 2.9 },
    { month: "Jul", value: 2.8 },
    { month: "Aug", value: 2.6 },
    { month: "Sep", value: 2.5 },
    { month: "Oct", value: 2.4 },
    { month: "Nov", value: 2.3 },
    { month: "Dec", value: 2.2 },
    { month: "Jan", value: 2.1 },
    { month: "Feb", value: 2.1 },
  ],
};

export const ltvCacRatio = {
  current: 12.04,
  threshold: { green: 3, yellow: 2 },
  history: [
    { month: "Sep", value: 6.8 },
    { month: "Oct", value: 8.0 },
    { month: "Nov", value: 9.2 },
    { month: "Dec", value: 10.0 },
    { month: "Jan", value: 11.1 },
    { month: "Feb", value: 12.04 },
  ],
};

export const acquisitionChannels = [
  { name: "Enterprise Partnerships", customers: 42, cac: 1800, color: "hsl(162, 63%, 45%)" },
  { name: "Climate Institutions", customers: 28, cac: 2200, color: "hsl(180, 50%, 40%)" },
  { name: "Direct Outreach", customers: 35, cac: 3400, color: "hsl(200, 70%, 55%)" },
  { name: "Research Collaborations", customers: 18, cac: 1500, color: "hsl(38, 90%, 55%)" },
  { name: "Developer Ecosystem", customers: 22, cac: 2800, color: "hsl(280, 50%, 55%)" },
  { name: "Events & Conferences", customers: 15, cac: 4200, color: "hsl(340, 60%, 55%)" },
];

export const customerSegments = [
  { name: "Governments", contractValue: 85000, ltv: 180000, churn: 1.2, growth: 24, size: 18 },
  { name: "Climate Funds", contractValue: 62000, ltv: 148000, churn: 1.8, growth: 32, size: 28 },
  { name: "Corporations", contractValue: 45000, ltv: 95000, churn: 3.2, growth: 18, size: 42 },
  { name: "NGOs", contractValue: 28000, ltv: 52000, churn: 4.5, growth: 12, size: 24 },
  { name: "Research Groups", contractValue: 18000, ltv: 38000, churn: 2.8, growth: 28, size: 22 },
];

export const cohortData = [
  { cohort: "Aug '25", months: [100, 92, 88, 84, 81, 78, 76] },
  { cohort: "Sep '25", months: [100, 94, 90, 86, 83, 80] },
  { cohort: "Oct '25", months: [100, 93, 89, 85, 82] },
  { cohort: "Nov '25", months: [100, 95, 91, 88] },
  { cohort: "Dec '25", months: [100, 96, 92] },
  { cohort: "Jan '26", months: [100, 94] },
  { cohort: "Feb '26", months: [100] },
];

export const funnelData = [
  { stage: "Initial Outreach", count: 1200, rate: 100 },
  { stage: "Product Demo", count: 480, rate: 40 },
  { stage: "Pilot Project", count: 192, rate: 40 },
  { stage: "Paid Contract", count: 125, rate: 65 },
  { stage: "Long-term Sub", count: 98, rate: 78 },
];

export const expansionRevenue = {
  total: 2800000,
  trend: 34,
  upgrades: 38,
  newServices: 24,
  geoExpansion: 16,
  history: [
    { month: "Sep", value: 1400000 },
    { month: "Oct", value: 1650000 },
    { month: "Nov", value: 1900000 },
    { month: "Dec", value: 2100000 },
    { month: "Jan", value: 2450000 },
    { month: "Feb", value: 2800000 },
  ],
};

export const strategicIntel = [
  { type: "partnership", title: "UNEP partnership signed for global biodiversity monitoring", date: "Feb 28, 2026", impact: "high" },
  { type: "adoption", title: "Norwegian Sovereign Wealth Fund adopts Atlas verification", date: "Feb 22, 2026", impact: "high" },
  { type: "pilot", title: "Brazilian government launches Amazon restoration pilot", date: "Feb 15, 2026", impact: "medium" },
  { type: "verification", title: "500th ecosystem restoration project verified", date: "Feb 10, 2026", impact: "medium" },
  { type: "adoption", title: "Patagonia expands platform usage to supply chain verification", date: "Feb 3, 2026", impact: "low" },
];

export const engagementMetrics = {
  assetsProcessed: { value: 12400, trend: 22 },
  simulationRuns: { value: 3800, trend: 15 },
  ecosystemAnalyses: { value: 8200, trend: 28 },
  reportsGenerated: { value: 5600, trend: 18 },
};

export const nrrData = {
  current: 124,
  target: 110,
  history: [
    { month: "Sep", value: 108 },
    { month: "Oct", value: 112 },
    { month: "Nov", value: 115 },
    { month: "Dec", value: 118 },
    { month: "Jan", value: 121 },
    { month: "Feb", value: 124 },
  ],
  components: [
    { label: "Expansion", value: 32 },
    { label: "Contraction", value: -5 },
    { label: "Churn", value: -3 },
  ],
};

export const customerHealthData = {
  summary: { healthy: 68, atRisk: 22, churning: 10 },
  accounts: [
    { name: "Norwegian Sovereign Fund", score: 92, status: "healthy", reason: "High engagement, expanding usage" },
    { name: "UNEP Climate Division", score: 88, status: "healthy", reason: "Active pilot, strong NPS" },
    { name: "Brazilian Ministry of Environment", score: 45, status: "at-risk", reason: "Declining logins, delayed renewal" },
    { name: "Patagonia Supply Chain", score: 78, status: "healthy", reason: "Steady usage, recent upsell" },
    { name: "Carbon Trust UK", score: 35, status: "at-risk", reason: "Budget constraints, reduced scope" },
    { name: "GreenTech Ventures", score: 18, status: "churning", reason: "No activity in 45 days" },
  ],
};

export const pipelineData = {
  velocity: 485000,
  avgDealSize: 52000,
  avgCycleTime: 68,
  winRate: 34,
  monthlyDeals: [
    { month: "Sep", won: 8, lost: 14 },
    { month: "Oct", won: 11, lost: 12 },
    { month: "Nov", won: 9, lost: 15 },
    { month: "Dec", won: 14, lost: 10 },
    { month: "Jan", won: 12, lost: 11 },
    { month: "Feb", won: 16, lost: 9 },
  ],
};

export const competitiveData = {
  overallWinRate: 62,
  competitors: [
    { name: "Verra Analytics", wins: 18, losses: 8, topReason: "Better accuracy" },
    { name: "Gold Standard Tech", wins: 14, losses: 12, topReason: "Price pressure" },
    { name: "Pachama Platform", wins: 10, losses: 14, topReason: "Faster deploy" },
    { name: "Sylvera AI", wins: 12, losses: 6, topReason: "Data depth" },
  ],
};

export const revenueConcentrationData = {
  metrics: { top1Pct: 18, top5Pct: 52, herfindahl: 0.08 },
  topCustomers: [
    { name: "Norwegian Sovereign Fund", revenue: 680000, pct: 18 },
    { name: "UNEP Climate Division", revenue: 420000, pct: 11 },
    { name: "Brazilian Gov Environment", revenue: 340000, pct: 9 },
    { name: "Patagonia Inc.", revenue: 280000, pct: 7.5 },
    { name: "Carbon Trust UK", revenue: 260000, pct: 7 },
    { name: "World Wildlife Fund", revenue: 220000, pct: 5.8 },
    { name: "Goldman Sachs ESG", revenue: 195000, pct: 5.2 },
    { name: "EU Climate Directorate", revenue: 180000, pct: 4.8 },
  ],
};
