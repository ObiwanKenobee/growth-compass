import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import * as mock from "@/data/dashboardData";

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

export function useNRRTracking() {
  const fallback = mock.nrrData;
  return useFallbackQuery(
    ["nrr-tracking"],
    async () => {
      const { data, error } = await supabase
        .from("nrr_tracking")
        .select("*")
        .order("period_month", { ascending: true });
      if (error) throw error;
      if (!data || data.length === 0) return fallback;
      const latest = data[data.length - 1];
      return {
        current: Number(latest.nrr_value),
        target: Number(latest.target),
        history: data.map(d => ({
          month: d.period_month.split(" ")[0].substring(0, 3),
          value: Number(d.nrr_value),
        })),
        components: [
          { label: "Expansion", value: Number(latest.expansion) },
          { label: "Contraction", value: Number(latest.contraction) },
          { label: "Churn", value: Number(latest.churn) },
        ],
      };
    },
    fallback
  );
}

export function useCustomerHealth() {
  const fallback = mock.customerHealthData;
  return useFallbackQuery(
    ["customer-health"],
    async () => {
      const { data, error } = await supabase
        .from("customer_health")
        .select("*")
        .order("score", { ascending: false });
      if (error) throw error;
      if (!data || data.length === 0) return fallback;
      const healthy = data.filter(a => a.status === "healthy").length;
      const atRisk = data.filter(a => a.status === "at-risk").length;
      const churning = data.filter(a => a.status === "churning").length;
      const total = data.length;
      return {
        summary: {
          healthy: Math.round((healthy / total) * 100),
          atRisk: Math.round((atRisk / total) * 100),
          churning: Math.round((churning / total) * 100),
        },
        accounts: data.map(a => ({
          id: a.id,
          name: a.name,
          score: a.score,
          status: a.status,
          reason: a.reason,
          revenue: Number(a.revenue),
          contractEnd: a.contract_end,
          lastActivity: a.last_activity_date,
          npsScore: a.nps_score,
          featureAdoption: Number(a.feature_adoption_pct),
          supportTickets: a.support_tickets_open,
        })),
      };
    },
    fallback
  );
}

export function usePipelineVelocity() {
  const fallback = mock.pipelineData;
  return useFallbackQuery(
    ["pipeline-velocity"],
    async () => {
      const { data, error } = await supabase
        .from("pipeline_velocity")
        .select("*")
        .order("period_month", { ascending: true });
      if (error) throw error;
      if (!data || data.length === 0) return fallback;
      const latest = data[data.length - 1];
      return {
        velocity: Number(latest.velocity),
        avgDealSize: Number(latest.avg_deal_size),
        avgCycleTime: latest.avg_cycle_time,
        winRate: Number(latest.win_rate),
        monthlyDeals: data.map(d => ({
          month: d.period_month.split(" ")[0].substring(0, 3),
          won: d.deals_won,
          lost: d.deals_lost,
        })),
      };
    },
    fallback
  );
}

export function useCompetitiveAnalysis() {
  const fallback = mock.competitiveData;
  return useFallbackQuery(
    ["competitive-analysis"],
    async () => {
      const { data, error } = await supabase
        .from("competitive_analysis")
        .select("*")
        .order("wins", { ascending: false });
      if (error) throw error;
      if (!data || data.length === 0) return fallback;
      const totalWins = data.reduce((s, c) => s + c.wins, 0);
      const totalAll = data.reduce((s, c) => s + c.wins + c.losses, 0);
      return {
        overallWinRate: Math.round((totalWins / totalAll) * 100),
        competitors: data.map(c => ({
          name: c.competitor_name,
          wins: c.wins,
          losses: c.losses,
          topReason: c.top_reason,
        })),
      };
    },
    fallback
  );
}

export function useRevenueConcentration() {
  const fallback = mock.revenueConcentrationData;
  return useFallbackQuery(
    ["revenue-concentration"],
    async () => {
      const { data, error } = await supabase
        .from("revenue_concentration")
        .select("*")
        .order("revenue", { ascending: false });
      if (error) throw error;
      if (!data || data.length === 0) return fallback;
      const top1 = Number(data[0].revenue_pct);
      const top5 = data.slice(0, 5).reduce((s, c) => s + Number(c.revenue_pct), 0);
      const totalRev = data.reduce((s, c) => s + Number(c.revenue), 0);
      const hhi = data.reduce((s, c) => {
        const share = Number(c.revenue) / totalRev;
        return s + share * share;
      }, 0);
      return {
        metrics: { top1Pct: Math.round(top1), top5Pct: Math.round(top5), herfindahl: Number(hhi.toFixed(2)) },
        topCustomers: data.map(c => ({
          id: c.id,
          name: c.customer_name,
          revenue: Number(c.revenue),
          pct: Number(c.revenue_pct),
          segment: c.segment,
          growthTrend: Number(c.growth_trend),
          riskLevel: c.risk_level,
        })),
      };
    },
    fallback
  );
}
