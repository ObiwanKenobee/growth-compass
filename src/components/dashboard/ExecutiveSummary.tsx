import { motion } from "framer-motion";
import { Activity, TrendingUp, TrendingDown, Users, DollarSign, Shield, AlertTriangle, Zap } from "lucide-react";
import { useNRRTracking, useCustomerHealth, usePipelineVelocity, useRevenueConcentration } from "@/hooks/useIntelligenceData";
import { useGrowthRadarData } from "@/hooks/useDashboardData";
import { Skeleton } from "@/components/ui/skeleton";

const ExecutiveSummary = () => {
  const { cac, ltv, churn, isLoading: radarLoading } = useGrowthRadarData();
  const { data: nrrData, isLoading: nrrLoading } = useNRRTracking();
  const { data: healthData, isLoading: healthLoading } = useCustomerHealth();
  const { data: pipelineData, isLoading: pipelineLoading } = usePipelineVelocity();
  const { data: concData, isLoading: concLoading } = useRevenueConcentration();

  const isLoading = radarLoading || nrrLoading || healthLoading || pipelineLoading || concLoading;

  if (isLoading) return <Skeleton className="h-40 rounded-xl" />;

  const ltvCacRatio = cac.current > 0 ? (ltv.current / cac.current).toFixed(1) : "—";
  const nrr = nrrData?.current ?? 0;
  const nrrTarget = nrrData?.target ?? 110;
  const healthyPct = healthData?.summary.healthy ?? 0;
  const atRiskPct = healthData?.summary.atRisk ?? 0;
  const winRate = pipelineData?.winRate ?? 0;
  const hhi = concData?.metrics.herfindahl ?? 0;

  // Overall score: weighted composite
  const nrrScore = Math.min(100, (nrr / nrrTarget) * 100);
  const healthScore = healthyPct;
  const churnScore = Math.max(0, 100 - (churn.current * 20)); // lower churn = better
  const overallScore = Math.round(nrrScore * 0.3 + healthScore * 0.3 + churnScore * 0.2 + winRate * 0.2);

  const scoreColor = overallScore >= 75 ? "text-success" : overallScore >= 50 ? "text-warning" : "text-danger";
  const scoreBg = overallScore >= 75 ? "bg-success/10 border-success/20" : overallScore >= 50 ? "bg-warning/10 border-warning/20" : "bg-danger/10 border-danger/20";

  const indicators = [
    { label: "NRR", value: `${nrr}%`, icon: TrendingUp, good: nrr >= nrrTarget, sub: `Target ${nrrTarget}%` },
    { label: "LTV:CAC", value: `${ltvCacRatio}x`, icon: DollarSign, good: Number(ltvCacRatio) >= 3, sub: `CAC $${cac.current.toLocaleString()}` },
    { label: "Churn", value: `${churn.current}%`, icon: TrendingDown, good: churn.current < 3, sub: `Trend ${churn.trend > 0 ? "+" : ""}${churn.trend}%` },
    { label: "Health", value: `${healthyPct}%`, icon: Shield, good: healthyPct >= 70, sub: `${atRiskPct}% at-risk` },
    { label: "Win Rate", value: `${winRate}%`, icon: Zap, good: winRate >= 50, sub: `Pipeline velocity` },
    { label: "HHI", value: hhi.toFixed(2), icon: Users, good: hhi < 0.15, sub: `Concentration risk` },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="rounded-xl border border-border gradient-card shadow-card p-6"
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-medium text-muted-foreground tracking-wide uppercase">Executive Overview</h3>
        </div>
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${scoreBg}`}>
          <span className={`text-lg font-bold font-mono ${scoreColor}`}>{overallScore}</span>
          <span className="text-xs text-muted-foreground">/ 100</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {indicators.map((ind, i) => {
          const Icon = ind.icon;
          return (
            <motion.div
              key={ind.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.05 }}
              className="p-3 rounded-lg bg-secondary/40 border border-border/50"
            >
              <div className="flex items-center gap-1.5 mb-2">
                <Icon className={`w-3.5 h-3.5 ${ind.good ? "text-success" : "text-warning"}`} />
                <span className="text-xs text-muted-foreground">{ind.label}</span>
              </div>
              <p className={`text-xl font-bold font-mono ${ind.good ? "text-foreground" : "text-warning"}`}>{ind.value}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{ind.sub}</p>
            </motion.div>
          );
        })}
      </div>

      {atRiskPct > 20 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-4 flex items-center gap-2 px-3 py-2 rounded-lg bg-warning/5 border border-warning/15"
        >
          <AlertTriangle className="w-3.5 h-3.5 text-warning flex-shrink-0" />
          <span className="text-xs text-warning">{atRiskPct}% of accounts are at-risk — review Customer Health Matrix for details</span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ExecutiveSummary;
