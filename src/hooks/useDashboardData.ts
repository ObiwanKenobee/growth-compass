import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useFilters, DateRange, Segment, Channel } from "@/contexts/FilterContext";

// Fallback data imports for when DB is empty
import * as mockDashboard from "@/data/dashboardData";
import * as mockFinancial from "@/data/financialData";

// ---------- Filter helpers ----------
const dateRangeMonths: Record<DateRange, number> = { "1m": 1, "3m": 3, "6m": 6, "12m": 12 };

const segmentLabel: Record<Exclude<Segment, "all">, string> = {
  "governments": "Governments",
  "climate-funds": "Climate Funds",
  "corporations": "Corporations",
  "ngos": "NGOs",
  "research": "Research Groups",
};

const channelLabel: Record<Exclude<Channel, "all">, string> = {
  "partnerships": "Enterprise Partnerships",
  "institutions": "Climate Institutions",
  "outreach": "Direct Outreach",
  "research-collab": "Research Collaborations",
  "developer": "Developer Ecosystem",
  "events": "Events & Conferences",
};

function sliceByRange<T>(arr: T[], range: DateRange): T[] {
  const n = dateRangeMonths[range];
  return arr.slice(-n);
}

function matchSegment(name: string, segment: Segment): boolean {
  if (segment === "all") return true;
  const target = segmentLabel[segment];
  return name?.toLowerCase().includes(target.toLowerCase().split(" ")[0]);
}

function matchChannel(name: string, channel: Channel): boolean {
  if (channel === "all") return true;
  const target = channelLabel[channel];
  return name?.toLowerCase().includes(target.toLowerCase().split(" ")[0]);
}

function useFallbackQuery<T>(key: string[], fetcher: () => Promise<T>, fallback: T) {
  return useQuery({
    queryKey: key,
    queryFn: async () => {
      const result = await fetcher();
      if (Array.isArray(result) && result.length === 0) return fallback;
      return result;
    },
    staleTime: 60_000,
  });
}

export function useDashboardMetrics(metricType: string) {
  return useFallbackQuery(
    ["dashboard-metrics", metricType],
    async () => {
      const { data, error } = await supabase
        .from("dashboard_metrics")
        .select("*")
        .eq("metric_type", metricType)
        .order("period_month", { ascending: true });
      if (error) throw error;
      return data;
    },
    []
  );
}

export function useAcquisitionChannels() {
  const { channel } = useFilters();
  const fallback = mockDashboard.acquisitionChannels;
  const query = useFallbackQuery(
    ["acquisition-channels"],
    async () => {
      const { data, error } = await supabase
        .from("acquisition_channels")
        .select("*")
        .order("customers", { ascending: false });
      if (error) throw error;
      if (!data || data.length === 0) return fallback;
      return data.map(c => ({
        name: c.name,
        customers: c.customers,
        cac: c.cac,
        color: c.color || "hsl(162, 63%, 45%)",
      }));
    },
    fallback
  );
  const filtered = useMemo(
    () => query.data?.filter(c => matchChannel(c.name, channel)),
    [query.data, channel]
  );
  return { ...query, data: filtered };
}

export function useCustomerSegments() {
  const { segment } = useFilters();
  const fallback = mockDashboard.customerSegments;
  const query = useFallbackQuery(
    ["customer-segments"],
    async () => {
      const { data, error } = await supabase
        .from("customer_segments")
        .select("*")
        .order("ltv", { ascending: false });
      if (error) throw error;
      if (!data || data.length === 0) return fallback;
      return data.map(s => ({
        name: s.name,
        contractValue: s.contract_value,
        ltv: s.ltv,
        churn: s.churn_rate,
        growth: s.growth_rate,
        size: s.customer_count,
      }));
    },
    fallback
  );
  const filtered = useMemo(
    () => query.data?.filter(s => matchSegment(s.name, segment)),
    [query.data, segment]
  );
  return { ...query, data: filtered };
}

export function useCohortRetention() {
  const { dateRange } = useFilters();
  const fallback = mockDashboard.cohortData;
  const query = useFallbackQuery(
    ["cohort-retention"],
    async () => {
      const { data, error } = await supabase
        .from("cohort_retention")
        .select("*")
        .order("cohort_label", { ascending: true })
        .order("month_index", { ascending: true });
      if (error) throw error;
      if (!data || data.length === 0) return fallback;
      const grouped: Record<string, number[]> = {};
      data.forEach(r => {
        if (!grouped[r.cohort_label]) grouped[r.cohort_label] = [];
        grouped[r.cohort_label][r.month_index] = r.retention_pct;
      });
      return Object.entries(grouped).map(([cohort, months]) => ({ cohort, months }));
    },
    fallback
  );
  const filtered = useMemo(
    () => (query.data ? sliceByRange(query.data, dateRange) : query.data),
    [query.data, dateRange]
  );
  return { ...query, data: filtered };
}

export function useFunnelStages() {
  const fallback = mockDashboard.funnelData;
  return useFallbackQuery(
    ["funnel-stages"],
    async () => {
      const { data, error } = await supabase
        .from("funnel_stages")
        .select("*")
        .order("stage_order", { ascending: true });
      if (error) throw error;
      if (!data || data.length === 0) return fallback;
      return data.map(s => ({
        stage: s.stage_name,
        count: s.count,
        rate: s.conversion_rate,
      }));
    },
    fallback
  );
}

export function useStrategicIntel() {
  const fallback = mockDashboard.strategicIntel;
  return useFallbackQuery(
    ["strategic-intel"],
    async () => {
      const { data, error } = await supabase
        .from("strategic_intel")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      if (!data || data.length === 0) return fallback;
      return data.map(i => ({
        type: i.intel_type,
        title: i.title,
        date: i.event_date,
        impact: i.impact,
      }));
    },
    fallback
  );
}

export function useExpansionRevenue() {
  const { dateRange } = useFilters();
  const fallback = mockDashboard.expansionRevenue;
  const query = useFallbackQuery(
    ["expansion-revenue"],
    async () => {
      const { data, error } = await supabase
        .from("expansion_revenue")
        .select("*")
        .order("period_month", { ascending: true });
      if (error) throw error;
      if (!data || data.length === 0) return fallback;
      const latest = data[data.length - 1];
      return {
        total: latest.total,
        trend: 34,
        upgrades: latest.tier_upgrades,
        newServices: latest.new_services,
        geoExpansion: latest.geo_expansion,
        history: data.map(d => {
          const shortMonth = d.period_month.split(" ")[0].substring(0, 3);
          return { month: shortMonth, value: d.total };
        }),
      };
    },
    fallback
  );
  const filtered = useMemo(() => {
    if (!query.data) return query.data;
    return { ...query.data, history: sliceByRange(query.data.history, dateRange) };
  }, [query.data, dateRange]);
  return { ...query, data: filtered };
}

export function useFinancialData(dataType: string) {
  return useFallbackQuery(
    ["financial-data", dataType],
    async () => {
      const { data, error } = await supabase
        .from("financial_data")
        .select("*")
        .eq("data_type", dataType)
        .order("created_at", { ascending: true });
      if (error) throw error;
      return data;
    },
    []
  );
}

// Processed hooks for Growth Radar cards
export function useGrowthRadarData() {
  const { dateRange } = useFilters();
  const cacQuery = useDashboardMetrics("cac");
  const ltvQuery = useDashboardMetrics("ltv");
  const churnQuery = useDashboardMetrics("churn");

  const processMetrics = (data: typeof cacQuery.data, monthKey = "month") => {
    if (!data || data.length === 0) return [];
    return data.map(d => {
      const parts = d.period_month.split(" ");
      return { [monthKey]: parts[0].substring(0, 3), value: d.value };
    });
  };

  const cacHistoryRaw = cacQuery.data ? processMetrics(cacQuery.data) : mockDashboard.cacData.history;
  const ltvHistoryRaw = ltvQuery.data ? processMetrics(ltvQuery.data) : mockDashboard.ltvData.history;
  const churnHistoryRaw = churnQuery.data ? processMetrics(churnQuery.data) : mockDashboard.churnData.history;

  const cacHistory = sliceByRange(cacHistoryRaw, dateRange);
  const ltvHistory = sliceByRange(ltvHistoryRaw, dateRange);
  const churnHistory = sliceByRange(churnHistoryRaw, dateRange);

  const lastVal = <T extends { value: number }>(arr: T[], fb: number) =>
    arr.length ? arr[arr.length - 1].value : fb;
  const trend = <T extends { value: number }>(arr: T[], fb: number) =>
    arr.length >= 2
      ? Number(((arr[arr.length - 1].value - arr[0].value) / arr[0].value * 100).toFixed(1))
      : fb;

  const latestCac = lastVal(cacHistory, mockDashboard.cacData.current);
  const latestLtv = lastVal(ltvHistory, mockDashboard.ltvData.current);
  const latestChurn = lastVal(churnHistory, mockDashboard.churnData.current);

  const cacTrend = trend(cacHistory, mockDashboard.cacData.trend);
  const ltvTrend = trend(ltvHistory, mockDashboard.ltvData.trend);
  const churnTrend = trend(churnHistory, mockDashboard.churnData.trend);

  const ltvAvgDuration = ltvQuery.data?.length
    ? (ltvQuery.data[ltvQuery.data.length - 1].metadata as Record<string, string>)?.avg_duration || "3.2 years"
    : mockDashboard.ltvData.avgDuration;

  return {
    isLoading: cacQuery.isLoading || ltvQuery.isLoading || churnQuery.isLoading,
    cac: { current: latestCac, trend: cacTrend, history: cacHistory },
    ltv: { current: latestLtv, trend: ltvTrend, history: ltvHistory, avgDuration: ltvAvgDuration },
    churn: { current: latestChurn, trend: churnTrend, history: churnHistory },
  };
}

export function useUnitEconomics() {
  const { cac, ltv, isLoading } = useGrowthRadarData();
  const ratio = cac.current > 0 ? ltv.current / cac.current : 0;

  const history = cac.history.map((c, i) => {
    const ltvVal = ltv.history[i]?.value || 0;
    const cacVal = c.value || 1;
    return { month: c.month, value: Number((ltvVal / cacVal).toFixed(2)) };
  });

  return {
    isLoading,
    ratio: Number(ratio.toFixed(2)),
    history,
    threshold: mockDashboard.ltvCacRatio.threshold,
  };
}

export function useEngagementMetrics() {
  const fallback = mockDashboard.engagementMetrics;
  return useFallbackQuery(
    ["engagement-metrics"],
    async () => {
      const { data, error } = await supabase
        .from("dashboard_metrics")
        .select("*")
        .in("metric_type", ["assets_verified", "simulations", "analyses", "reports"])
        .order("period_month", { ascending: false });
      if (error) throw error;
      if (!data || data.length === 0) return fallback;

      const grouped: Record<string, { value: number; trend: number }> = {};
      const byType: Record<string, typeof data> = {};
      data.forEach(d => {
        if (!byType[d.metric_type]) byType[d.metric_type] = [];
        byType[d.metric_type].push(d);
      });

      Object.entries(byType).forEach(([type, items]) => {
        const sorted = items.sort((a, b) => b.period_month.localeCompare(a.period_month));
        const latest = sorted[0];
        const prev = sorted[1];
        const trend = prev ? Number((((latest.value - prev.value) / prev.value) * 100).toFixed(0)) : 0;
        grouped[type] = { value: latest.value, trend };
      });

      return {
        assetsProcessed: grouped.assets_verified || fallback.assetsProcessed,
        simulationRuns: grouped.simulations || fallback.simulationRuns,
        ecosystemAnalyses: grouped.analyses || fallback.ecosystemAnalyses,
        reportsGenerated: grouped.reports || fallback.reportsGenerated,
      };
    },
    fallback
  );
}
