import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const REALTIME_TABLES = [
  { table: "dashboard_metrics", queryKeys: ["dashboard-metrics"] },
  { table: "acquisition_channels", queryKeys: ["acquisition-channels"] },
  { table: "customer_segments", queryKeys: ["customer-segments"] },
  { table: "cohort_retention", queryKeys: ["cohort-retention"] },
  { table: "funnel_stages", queryKeys: ["funnel-stages"] },
  { table: "strategic_intel", queryKeys: ["strategic-intel"] },
  { table: "expansion_revenue", queryKeys: ["expansion-revenue"] },
  { table: "nrr_tracking", queryKeys: ["nrr-tracking"] },
  { table: "customer_health", queryKeys: ["customer-health"] },
  { table: "pipeline_velocity", queryKeys: ["pipeline-velocity"] },
  { table: "competitive_analysis", queryKeys: ["competitive-analysis"] },
  { table: "revenue_concentration", queryKeys: ["revenue-concentration"] },
  { table: "financial_data", queryKeys: ["financial-data"] },
] as const;

export function useRealtimeSubscription() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const channel = supabase.channel("dashboard-realtime");

    REALTIME_TABLES.forEach(({ table, queryKeys }) => {
      channel.on(
        "postgres_changes",
        { event: "*", schema: "public", table },
        () => {
          queryKeys.forEach((key) => {
            queryClient.invalidateQueries({ queryKey: [key] });
          });
        }
      );
    });

    channel.subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);
}
