import { motion } from "framer-motion";
import { Heart, AlertTriangle, ShieldCheck, TrendingDown } from "lucide-react";
import { customerHealthData } from "@/data/dashboardData";

const statusConfig = {
  healthy: { color: "text-success", bg: "bg-success/10", border: "border-success/20", icon: ShieldCheck, label: "Healthy" },
  "at-risk": { color: "text-warning", bg: "bg-warning/10", border: "border-warning/20", icon: AlertTriangle, label: "At Risk" },
  churning: { color: "text-danger", bg: "bg-danger/10", border: "border-danger/20", icon: TrendingDown, label: "Churning" },
};

const CustomerHealth = () => {
  const { summary, accounts } = customerHealthData;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="rounded-xl border border-border gradient-card shadow-card p-6"
    >
      <div className="flex items-center gap-2 mb-6">
        <Heart className="w-4 h-4 text-primary" />
        <h3 className="text-sm font-medium text-muted-foreground tracking-wide uppercase">Customer Health Matrix</h3>
      </div>

      {/* Health distribution bar */}
      <div className="mb-5">
        <div className="flex h-3 rounded-full overflow-hidden gap-0.5">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${summary.healthy}%` }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-success rounded-l-full"
          />
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${summary.atRisk}%` }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="bg-warning"
          />
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${summary.churning}%` }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="bg-danger rounded-r-full"
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-xs text-success font-mono">{summary.healthy}% healthy</span>
          <span className="text-xs text-warning font-mono">{summary.atRisk}% at-risk</span>
          <span className="text-xs text-danger font-mono">{summary.churning}% churning</span>
        </div>
      </div>

      {/* Account list */}
      <div className="space-y-2">
        {accounts.map((acct, i) => {
          const cfg = statusConfig[acct.status as keyof typeof statusConfig];
          const Icon = cfg.icon;
          return (
            <motion.div
              key={acct.name}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + i * 0.04 }}
              className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
            >
              <div className={`w-8 h-8 rounded-lg ${cfg.bg} ${cfg.border} border flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-4 h-4 ${cfg.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground truncate">{acct.name}</p>
                <p className="text-xs text-muted-foreground">{acct.reason}</p>
              </div>
              {/* Health score bar */}
              <div className="w-20 flex-shrink-0">
                <div className="flex items-center justify-between mb-0.5">
                  <span className={`text-xs font-mono ${cfg.color}`}>{acct.score}</span>
                </div>
                <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                  <div
                    className={`h-full rounded-full ${acct.score >= 70 ? "bg-success" : acct.score >= 40 ? "bg-warning" : "bg-danger"}`}
                    style={{ width: `${acct.score}%` }}
                  />
                </div>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full border font-mono ${cfg.bg} ${cfg.border} ${cfg.color}`}>
                {cfg.label}
              </span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default CustomerHealth;
