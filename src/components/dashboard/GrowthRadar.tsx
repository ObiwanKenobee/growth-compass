import { motion } from "framer-motion";
import { TrendingDown, TrendingUp } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { useGrowthRadarData } from "@/hooks/useDashboardData";

interface MetricCardProps {
  title: string;
  value: string;
  subtitle?: string;
  trend: number;
  trendLabel: string;
  data: { month?: string; value: number }[];
  color: string;
  invertTrend?: boolean;
  delay: number;
  isLoading?: boolean;
}

const MetricCard = ({ title, value, subtitle, trend, trendLabel, data, color, invertTrend, delay, isLoading }: MetricCardProps) => {
  const isPositive = invertTrend ? trend < 0 : trend > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="relative overflow-hidden rounded-xl border border-border gradient-card shadow-card p-6 flex flex-col gap-4"
    >
      <div className="absolute inset-0 gradient-glow pointer-events-none" />
      <div className="relative z-10">
        <p className="text-sm font-medium text-muted-foreground tracking-wide uppercase">{title}</p>
        {isLoading ? (
          <div className="h-10 w-32 bg-secondary/60 rounded animate-pulse mt-2" />
        ) : (
          <>
            <div className="flex items-end gap-3 mt-2">
              <span className="text-4xl font-bold font-display tracking-tight text-foreground">{value}</span>
              {subtitle && <span className="text-sm text-muted-foreground mb-1">{subtitle}</span>}
            </div>
            <div className="flex items-center gap-1.5 mt-2">
              {isPositive ? (
                <TrendingUp className="w-4 h-4 text-success" />
              ) : (
                <TrendingDown className="w-4 h-4 text-danger" />
              )}
              <span className={`text-sm font-mono font-medium ${isPositive ? "text-success" : "text-danger"}`}>
                {trend > 0 ? "+" : ""}{trend}%
              </span>
              <span className="text-xs text-muted-foreground ml-1">{trendLabel}</span>
            </div>
          </>
        )}
      </div>
      <div className="h-20 -mx-2 mt-auto">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id={`grad-${title}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.3} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              fill={`url(#grad-${title})`}
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

const GrowthRadar = () => {
  const { isLoading, cac, ltv, churn } = useGrowthRadarData();

  return (
    <section>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-3 mb-6"
      >
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
        <h2 className="text-lg font-semibold text-foreground tracking-wide uppercase">Growth Radar</h2>
        <span className="text-xs text-muted-foreground font-mono">LIVE</span>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <MetricCard
          title="Customer Acquisition Cost"
          value={`$${Number(cac.current).toLocaleString()}`}
          trend={cac.trend}
          trendLabel="vs 6mo ago"
          data={cac.history}
          color="hsl(162, 63%, 45%)"
          invertTrend
          delay={0.1}
          isLoading={isLoading}
        />
        <MetricCard
          title="Lifetime Value"
          value={`$${Number(ltv.current).toLocaleString()}`}
          subtitle={`avg ${ltv.avgDuration}`}
          trend={ltv.trend}
          trendLabel="vs 6mo ago"
          data={ltv.history}
          color="hsl(200, 70%, 55%)"
          delay={0.2}
          isLoading={isLoading}
        />
        <MetricCard
          title="Churn Rate"
          value={`${churn.current}%`}
          subtitle="monthly"
          trend={churn.trend}
          trendLabel="12mo rolling"
          data={churn.history}
          color="hsl(38, 90%, 55%)"
          invertTrend
          delay={0.3}
          isLoading={isLoading}
        />
      </div>
    </section>
  );
};

export default GrowthRadar;
