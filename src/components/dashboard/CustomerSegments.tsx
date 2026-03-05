import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { customerSegments } from "@/data/dashboardData";

const CustomerSegments = () => {
  const maxLtv = Math.max(...customerSegments.map(s => s.ltv));

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="rounded-xl border border-border gradient-card shadow-card p-6"
    >
      <h3 className="text-sm font-medium text-muted-foreground tracking-wide uppercase mb-6">Customer Segmentation</h3>
      <div className="grid gap-3">
        {customerSegments.map((seg, i) => {
          const bubbleSize = (seg.ltv / maxLtv) * 48 + 24;
          return (
            <motion.div
              key={seg.name}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + i * 0.06 }}
              className="flex items-center gap-4 p-3 rounded-lg bg-secondary/40 hover:bg-secondary/60 transition-colors"
            >
              <div
                className="rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0"
                style={{ width: bubbleSize, height: bubbleSize }}
              >
                <span className="text-xs font-mono text-primary">{seg.size}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{seg.name}</p>
                <div className="flex gap-4 mt-1 flex-wrap">
                  <span className="text-xs text-muted-foreground">ACV <span className="font-mono text-foreground">${(seg.contractValue / 1000).toFixed(0)}k</span></span>
                  <span className="text-xs text-muted-foreground">LTV <span className="font-mono text-foreground">${(seg.ltv / 1000).toFixed(0)}k</span></span>
                  <span className="text-xs text-muted-foreground">Churn <span className={`font-mono ${seg.churn > 3 ? "text-danger" : seg.churn > 2 ? "text-warning" : "text-success"}`}>{seg.churn}%</span></span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-success" />
                <span className="text-xs font-mono text-success">+{seg.growth}%</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default CustomerSegments;
