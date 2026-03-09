import { motion } from "framer-motion";
import { Activity, BarChart3, FileText, Cpu } from "lucide-react";
import { useCohortRetention, useEngagementMetrics } from "@/hooks/useDashboardData";
import { Skeleton } from "@/components/ui/skeleton";

const RetentionCohort = () => {
  const { data: cohortData, isLoading: cohortLoading } = useCohortRetention();
  const { data: engagementData, isLoading: engagementLoading } = useEngagementMetrics();
  const maxMonths = cohortData ? Math.max(...cohortData.map(c => c.months.length)) : 0;
  const isLoading = cohortLoading || engagementLoading;

  const metrics = engagementData ? [
    { label: "Assets Verified", ...engagementData.assetsProcessed, icon: Activity },
    { label: "Simulations", ...engagementData.simulationRuns, icon: Cpu },
    { label: "Analyses", ...engagementData.ecosystemAnalyses, icon: BarChart3 },
    { label: "Reports", ...engagementData.reportsGenerated, icon: FileText },
  ] : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.7 }}
      className="rounded-xl border border-border gradient-card shadow-card p-6"
    >
      <h3 className="text-sm font-medium text-muted-foreground tracking-wide uppercase mb-6">Retention & Engagement</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {metrics.map((m) => (
          <div key={m.label} className="p-3 rounded-lg bg-secondary/40">
            <m.icon className="w-4 h-4 text-muted-foreground mb-2" />
            <p className="text-xl font-bold font-mono text-foreground">{m.value.toLocaleString()}</p>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-xs text-muted-foreground">{m.label}</span>
              <span className="text-xs font-mono text-success">+{m.trend}%</span>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wider">Cohort Retention (%)</p>
      {isLoading ? (
        <div className="h-40 bg-secondary/30 rounded animate-pulse" />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-xs font-mono">
            <thead>
              <tr>
                <th className="text-left p-2 text-muted-foreground font-normal">Cohort</th>
                {Array.from({ length: maxMonths }, (_, i) => (
                  <th key={i} className="p-2 text-muted-foreground font-normal text-center">M{i}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cohortData?.map((row) => (
                <tr key={row.cohort}>
                  <td className="p-2 text-foreground">{row.cohort}</td>
                  {Array.from({ length: maxMonths }, (_, mi) => {
                    const val = row.months[mi];
                    if (val === undefined) return <td key={mi} className="p-2" />;
                    const opacity = val / 100;
                    return (
                      <td key={mi} className="p-2 text-center">
                        <span
                          className="inline-block w-full py-1 rounded text-xs"
                          style={{
                            backgroundColor: `hsla(162, 63%, 45%, ${opacity * 0.4})`,
                            color: opacity > 0.7 ? "hsl(162, 63%, 45%)" : "hsl(200, 8%, 48%)",
                          }}
                        >
                          {val}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
};

export default RetentionCohort;
