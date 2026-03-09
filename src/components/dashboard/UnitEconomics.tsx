import { motion } from "framer-motion";
import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts";
import { useUnitEconomics } from "@/hooks/useDashboardData";
import { Skeleton } from "@/components/ui/skeleton";

const UnitEconomics = () => {
  const { ratio, history, threshold, isLoading } = useUnitEconomics();
  const maxRatio = 15;
  const percentage = Math.min((ratio / maxRatio) * 100, 100);
  const circumference = 2 * Math.PI * 70;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getColor = () => {
    if (ratio >= threshold.green) return "hsl(var(--success))";
    if (ratio >= threshold.yellow) return "hsl(var(--warning))";
    return "hsl(var(--danger))";
  };

  if (isLoading) return <Skeleton className="h-64 rounded-xl" />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="rounded-xl border border-border gradient-card shadow-card p-6"
    >
      <h3 className="text-sm font-medium text-muted-foreground tracking-wide uppercase mb-6">Unit Economics</h3>
      <div className="flex items-center gap-8 flex-wrap">
        <div className="relative w-44 h-44 flex-shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
            <circle cx="80" cy="80" r="70" fill="none" stroke="hsl(var(--secondary))" strokeWidth="8" />
            <motion.circle
              cx="80" cy="80" r="70" fill="none"
              stroke={getColor()}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold font-display text-foreground">{ratio.toFixed(1)}x</span>
            <span className="text-xs text-muted-foreground mt-1">LTV:CAC</span>
          </div>
        </div>
        <div className="flex-1 min-w-[200px]">
          <p className="text-sm text-muted-foreground mb-3">
            Ratio above <span className="text-success font-mono">3.0x</span> indicates healthy unit economics. Current ratio signals {ratio >= 3 ? "strong sustainable growth" : ratio >= 2 ? "moderate growth potential" : "optimization needed"}.
          </p>
          <div className="h-24">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={history}>
                <defs>
                  <linearGradient id="ratioGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--success))" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="hsl(var(--success))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="value" stroke="hsl(var(--success))" strokeWidth={2} fill="url(#ratioGrad)" dot={false} />
                <Tooltip
                  contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontFamily: "var(--font-mono)", fontSize: "12px" }}
                  labelStyle={{ color: "hsl(var(--muted-foreground))" }}
                  itemStyle={{ color: "hsl(var(--success))" }}
                  formatter={(v: number) => [`${v.toFixed(1)}x`, "LTV:CAC"]}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UnitEconomics;
