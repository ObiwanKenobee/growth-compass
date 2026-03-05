// Mock data for Financial Health Dashboard

export const revenueData = {
  mrr: 485000,
  mrrTrend: 14.2,
  arr: 5820000,
  history: [
    { month: "Sep", value: 340000 },
    { month: "Oct", value: 368000 },
    { month: "Nov", value: 398000 },
    { month: "Dec", value: 425000 },
    { month: "Jan", value: 458000 },
    { month: "Feb", value: 485000 },
  ],
};

export const burnRateData = {
  monthly: 320000,
  trend: -5.2,
  breakdown: [
    { category: "Engineering", amount: 145000, pct: 45 },
    { category: "Sales & Marketing", amount: 78000, pct: 24 },
    { category: "Operations", amount: 52000, pct: 16 },
    { category: "Infrastructure", amount: 32000, pct: 10 },
    { category: "Legal & Compliance", amount: 13000, pct: 5 },
  ],
  history: [
    { month: "Sep", value: 355000 },
    { month: "Oct", value: 348000 },
    { month: "Nov", value: 340000 },
    { month: "Dec", value: 335000 },
    { month: "Jan", value: 328000 },
    { month: "Feb", value: 320000 },
  ],
};

export const runwayData = {
  months: 28.4,
  cashOnHand: 9100000,
  trend: 3.2,
  projections: [
    { month: "Mar", conservative: 8780000, optimistic: 8900000 },
    { month: "Jun", conservative: 7950000, optimistic: 8400000 },
    { month: "Sep", conservative: 7020000, optimistic: 8100000 },
    { month: "Dec", conservative: 5990000, optimistic: 7950000 },
    { month: "Mar '27", conservative: 4850000, optimistic: 7900000 },
    { month: "Jun '27", conservative: 3600000, optimistic: 7950000 },
  ],
};

export const revenueBreakdown = [
  { source: "Verification Services", amount: 210000, pct: 43, color: "hsl(162, 63%, 45%)" },
  { source: "Platform Subscriptions", amount: 145000, pct: 30, color: "hsl(200, 70%, 55%)" },
  { source: "Policy Simulations", amount: 72000, pct: 15, color: "hsl(38, 90%, 55%)" },
  { source: "Data & Analytics", amount: 38000, pct: 8, color: "hsl(280, 50%, 55%)" },
  { source: "Consulting", amount: 20000, pct: 4, color: "hsl(340, 60%, 55%)" },
];

export const cashFlowData = [
  { month: "Sep", inflow: 340000, outflow: 355000 },
  { month: "Oct", inflow: 368000, outflow: 348000 },
  { month: "Nov", inflow: 398000, outflow: 340000 },
  { month: "Dec", inflow: 425000, outflow: 335000 },
  { month: "Jan", inflow: 458000, outflow: 328000 },
  { month: "Feb", inflow: 485000, outflow: 320000 },
];

export const financialKPIs = {
  grossMargin: { value: 78.4, trend: 2.1 },
  netMargin: { value: 34.0, trend: 8.5 },
  revenuePerEmployee: { value: 12800, trend: 15 },
  operatingLeverage: { value: 2.8, trend: 0.4 },
};
