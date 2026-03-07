import { motion } from "framer-motion";
import { Zap, Clock, DollarSign, Target } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { pipelineData } from "@/data/dashboardData";

const PipelineVelocity = () => {
  const { velocity, avgDealSize, avgCycleTime, winRate, monthlyDeals } = pipelineData;

  const kpis = [
    { label: "Pipeline Velocity", value: `$${(velocity / 1000).toFixed(0)}k`, sublabel: "per month", icon: Zap, accent: "text-primary" },
    { label: "Avg Deal Size", value: `$${(avgDealSize / 1000).toFixed(0)}k`, sublabel: "contract value", icon: DollarSign, accent: "text-info" },
    { label: "Sales Cycle", value: `${avgCycleTime}d`, sublabel: "avg close time", icon: Clock, accent: "text-warning" },
    { label: "Win Rate", value: `${winRate}%`, sublabel: "qualified → closed", icon: Target, accent: "text-success" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.55 }}
      className="rounded-xl border border-border gradient-card shadow-card p-6"
    >
      <h3 className="text-sm font-medium text-muted-foreground tracking-wide uppercase mb-5">Pipeline Velocity</h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        {kpis.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + i * 0.06 }}
            className="p-3 rounded-lg bg-secondary/40"
          >
            <kpi.icon className={`w-4 h-4 ${kpi.accent} mb-2`} />
            <p className="text-xl font-bold font-mono text-foreground">{kpi.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{kpi.sublabel}</p>
          </motion.div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Monthly Closed Deals</p>
      <div className="h-32">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthlyDeals}>
            <XAxis dataKey="month" tick={{ fill: "hsl(200, 8%, 48%)", fontSize: 11, fontFamily: "var(--font-mono)" }} axisLine={false} tickLine={false} />
            <Bar dataKey="won" stackId="deals" fill="hsl(162, 63%, 45%)" radius={[0, 0, 0, 0]} />
            <Bar dataKey="lost" stackId="deals" fill="hsl(0, 72%, 55%)" opacity={0.5} radius={[4, 4, 0, 0]} />
            <Tooltip
              contentStyle={{ background: "hsl(200, 12%, 9%)", border: "1px solid hsl(200, 10%, 16%)", borderRadius: "8px", fontFamily: "var(--font-mono)", fontSize: "12px" }}
              labelStyle={{ color: "hsl(200, 8%, 48%)" }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center gap-4 mt-2 justify-center">
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><span className="w-2 h-2 rounded-sm bg-success inline-block" /> Won</span>
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><span className="w-2 h-2 rounded-sm bg-danger/50 inline-block" /> Lost</span>
      </div>
    </motion.div>
  );
};

export default PipelineVelocity;
