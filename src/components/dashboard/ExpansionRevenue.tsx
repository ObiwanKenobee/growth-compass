import { motion } from "framer-motion";
import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts";
import { TrendingUp, ArrowUpRight } from "lucide-react";
import { expansionRevenue } from "@/data/dashboardData";

const ExpansionRevenue = () => {
  const items = [
    { label: "Tier Upgrades", value: expansionRevenue.upgrades, color: "bg-primary" },
    { label: "New Services", value: expansionRevenue.newServices, color: "bg-info" },
    { label: "Geo Expansion", value: expansionRevenue.geoExpansion, color: "bg-accent" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.9 }}
      className="rounded-xl border border-border gradient-card shadow-card p-6"
    >
      <h3 className="text-sm font-medium text-muted-foreground tracking-wide uppercase mb-4">Expansion Revenue</h3>
      <div className="flex items-end gap-3 mb-1">
        <span className="text-3xl font-bold font-display text-foreground">${(expansionRevenue.total / 1000000).toFixed(1)}M</span>
        <div className="flex items-center gap-1 mb-1">
          <TrendingUp className="w-4 h-4 text-success" />
          <span className="text-sm font-mono text-success">+{expansionRevenue.trend}%</span>
        </div>
      </div>
      <p className="text-xs text-muted-foreground mb-4">Revenue from existing customers expanding usage</p>

      <div className="h-28 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={expansionRevenue.history}>
            <defs>
              <linearGradient id="expansionGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(200, 70%, 55%)" stopOpacity={0.25} />
                <stop offset="100%" stopColor="hsl(200, 70%, 55%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="value" stroke="hsl(200, 70%, 55%)" strokeWidth={2} fill="url(#expansionGrad)" dot={false} />
            <Tooltip
              contentStyle={{ background: "hsl(200, 12%, 9%)", border: "1px solid hsl(200, 10%, 16%)", borderRadius: "8px", fontFamily: "var(--font-mono)", fontSize: "12px" }}
              labelStyle={{ color: "hsl(200, 8%, 48%)" }}
              formatter={(v: number) => [`$${(v / 1000000).toFixed(2)}M`, "Revenue"]}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {items.map(item => (
          <div key={item.label} className="p-3 rounded-lg bg-secondary/40 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <ArrowUpRight className="w-3 h-3 text-success" />
              <span className="text-lg font-bold font-mono text-foreground">{item.value}</span>
            </div>
            <p className="text-xs text-muted-foreground">{item.label}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ExpansionRevenue;
