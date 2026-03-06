import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// Fallback data imports for when DB is empty
import * as mockDashboard from "@/data/dashboardData";
import * as mockFinancial from "@/data/financialData";

function useFallbackQuery<T>(key: string[], fetcher: () => Promise<T>, fallback: T) {
  return useQuery({
    queryKey: key,
    queryFn: async () => {
      const result = await fetcher();
      // If empty result, return fallback
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
  const fallback = mockDashboard.acquisitionChannels;
  return useFallbackQuery(
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
}

export function useCustomerSegments() {
  const fallback = mockDashboard.customerSegments;
  return useFallbackQuery(
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
}

export function useCohortRetention() {
  const fallback = mockDashboard.cohortData;
  return useFallbackQuery(
    ["cohort-retention"],
    async () => {
      const { data, error } = await supabase
        .from("cohort_retention")
        .select("*")
        .order("cohort_label", { ascending: true })
        .order("month_index", { ascending: true });
      if (error) throw error;
      if (!data || data.length === 0) return fallback;
      // Group by cohort
      const grouped: Record<string, number[]> = {};
      data.forEach(r => {
        if (!grouped[r.cohort_label]) grouped[r.cohort_label] = [];
        grouped[r.cohort_label][r.month_index] = r.retention_pct;
      });
      return Object.entries(grouped).map(([cohort, months]) => ({ cohort, months }));
    },
    fallback
  );
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
  const fallback = mockDashboard.expansionRevenue;
  return useFallbackQuery(
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

  const cacHistory = cacQuery.data ? processMetrics(cacQuery.data) : mockDashboard.cacData.history;
  const ltvHistory = ltvQuery.data ? processMetrics(ltvQuery.data) : mockDashboard.ltvData.history;
  const churnHistory = churnQuery.data ? processMetrics(churnQuery.data) : mockDashboard.churnData.history;

  const latestCac = cacQuery.data?.length ? cacQuery.data[cacQuery.data.length - 1].value : mockDashboard.cacData.current;
  const latestLtv = ltvQuery.data?.length ? ltvQuery.data[ltvQuery.data.length - 1].value : mockDashboard.ltvData.current;
  const latestChurn = churnQuery.data?.length ? churnQuery.data[churnQuery.data.length - 1].value : mockDashboard.churnData.current;

  const cacTrend = cacQuery.data?.length && cacQuery.data.length >= 2
    ? Number(((cacQuery.data[cacQuery.data.length - 1].value - cacQuery.data[0].value) / cacQuery.data[0].value * 100).toFixed(1))
    : mockDashboard.cacData.trend;
  const ltvTrend = ltvQuery.data?.length && ltvQuery.data.length >= 2
    ? Number(((ltvQuery.data[ltvQuery.data.length - 1].value - ltvQuery.data[0].value) / ltvQuery.data[0].value * 100).toFixed(1))
    : mockDashboard.ltvData.trend;
  const churnTrend = churnQuery.data?.length && churnQuery.data.length >= 2
    ? Number(((churnQuery.data[churnQuery.data.length - 1].value - churnQuery.data[0].value) / churnQuery.data[0].value * 100).toFixed(1))
    : mockDashboard.churnData.trend;

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
