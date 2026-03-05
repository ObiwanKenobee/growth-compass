import { motion } from "framer-motion";
import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts";
import { ltvCacRatio } from "@/data/dashboardData";

const UnitEconomics = () => {
  const ratio = ltvCacRatio.current;
  const maxRatio = 15;
  const percentage = Math.min((ratio / maxRatio) * 100, 100);
  const circumference = 2 * Math.PI * 70;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getColor = () => {
    if (ratio >= ltvCacRatio.threshold.green) return "hsl(162, 63%, 45%)";
    if (ratio >= ltvCacRatio.threshold.yellow) return "hsl(38, 90%, 55%)";
    return "hsl(0, 72%, 55%)";
  };

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
            <circle cx="80" cy="80" r="70" fill="none" stroke="hsl(200, 10%, 14%)" strokeWidth="8" />
            <circle
              cx="80" cy="80" r="70" fill="none"
              stroke={getColor()}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold font-display text-foreground">{ratio.toFixed(1)}x</span>
            <span className="text-xs text-muted-foreground mt-1">LTV:CAC</span>
          </div>
        </div>
        <div className="flex-1 min-w-[200px]">
          <p className="text-sm text-muted-foreground mb-3">
            Ratio above <span className="text-success font-mono">3.0x</span> indicates healthy unit economics. Current ratio signals strong sustainable growth.
          </p>
          <div className="h-24">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ltvCacRatio.history}>
                <defs>
                  <linearGradient id="ratioGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(162, 63%, 45%)" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="hsl(162, 63%, 45%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="value" stroke="hsl(162, 63%, 45%)" strokeWidth={2} fill="url(#ratioGrad)" dot={false} />
                <Tooltip
                  contentStyle={{ background: "hsl(200, 12%, 9%)", border: "1px solid hsl(200, 10%, 16%)", borderRadius: "8px", fontFamily: "var(--font-mono)", fontSize: "12px" }}
                  labelStyle={{ color: "hsl(200, 8%, 48%)" }}
                  itemStyle={{ color: "hsl(162, 63%, 45%)" }}
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
