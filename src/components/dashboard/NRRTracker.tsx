import { motion } from "framer-motion";
import { TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, ReferenceLine } from "recharts";
import { nrrData } from "@/data/dashboardData";

const NRRTracker = () => {
  const { current, target, history, components } = nrrData;
  const isAboveTarget = current >= target;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.45 }}
      className="rounded-xl border border-border gradient-card shadow-card p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-muted-foreground tracking-wide uppercase">Net Revenue Retention</h3>
        <span className={`text-xs px-2 py-0.5 rounded-full font-mono border ${
          isAboveTarget ? "text-success bg-success/10 border-success/20" : "text-warning bg-warning/10 border-warning/20"
        }`}>
          Target: {target}%
        </span>
      </div>

      <div className="flex items-end gap-3 mb-1">
        <span className="text-4xl font-bold font-display text-foreground">{current}%</span>
        <div className="flex items-center gap-1 mb-1.5">
          {isAboveTarget ? (
            <ArrowUpRight className="w-4 h-4 text-success" />
          ) : (
            <ArrowDownRight className="w-4 h-4 text-warning" />
          )}
          <span className={`text-sm font-mono ${isAboveTarget ? "text-success" : "text-warning"}`}>
            {current > 100 ? "+" : ""}{(current - 100).toFixed(0)}pp net
          </span>
        </div>
      </div>
      <p className="text-xs text-muted-foreground mb-4">Revenue retained + expanded from existing customers</p>

      <div className="h-32 mb-5">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={history}>
            <defs>
              <linearGradient id="nrrGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(162, 63%, 45%)" stopOpacity={0.25} />
                <stop offset="100%" stopColor="hsl(162, 63%, 45%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <ReferenceLine y={100} stroke="hsl(200, 8%, 28%)" strokeDasharray="4 4" />
            <ReferenceLine y={target} stroke="hsl(38, 90%, 55%)" strokeDasharray="4 4" strokeOpacity={0.5} />
            <Area type="monotone" dataKey="value" stroke="hsl(162, 63%, 45%)" strokeWidth={2} fill="url(#nrrGrad)" dot={false} />
            <Tooltip
              contentStyle={{ background: "hsl(200, 12%, 9%)", border: "1px solid hsl(200, 10%, 16%)", borderRadius: "8px", fontFamily: "var(--font-mono)", fontSize: "12px" }}
              labelStyle={{ color: "hsl(200, 8%, 48%)" }}
              formatter={(v: number) => [`${v}%`, "NRR"]}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {components.map(c => (
          <div key={c.label} className="p-3 rounded-lg bg-secondary/40 text-center">
            <p className="text-lg font-bold font-mono text-foreground">{c.value > 0 ? "+" : ""}{c.value}%</p>
            <p className="text-xs text-muted-foreground mt-0.5">{c.label}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default NRRTracker;
