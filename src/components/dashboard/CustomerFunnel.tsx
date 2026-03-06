import { motion } from "framer-motion";
import { useFunnelStages } from "@/hooks/useDashboardData";

const CustomerFunnel = () => {
  const { data: funnelData, isLoading } = useFunnelStages();
  const maxCount = funnelData ? funnelData[0]?.count || 1 : 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="rounded-xl border border-border gradient-card shadow-card p-6"
    >
      <h3 className="text-sm font-medium text-muted-foreground tracking-wide uppercase mb-6">Customer Journey Funnel</h3>
      {isLoading ? (
        <div className="space-y-3">
          {[1,2,3,4,5].map(i => <div key={i} className="h-12 bg-secondary/40 rounded animate-pulse" />)}
        </div>
      ) : (
        <div className="space-y-3">
          {funnelData?.map((stage, i) => {
            const widthPct = (stage.count / maxCount) * 100;
            const isDropoff = i > 0 && stage.rate < 50;
            return (
              <div key={stage.stage}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-foreground">{stage.stage}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-foreground">{stage.count.toLocaleString()}</span>
                    {i > 0 && (
                      <span className={`text-xs font-mono ${isDropoff ? "text-warning" : "text-success"}`}>
                        {stage.rate}% conv
                      </span>
                    )}
                  </div>
                </div>
                <div className="relative h-8 rounded-md bg-secondary/40 overflow-hidden flex items-center">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${widthPct}%` }}
                    transition={{ duration: 0.8, delay: 0.9 + i * 0.08 }}
                    className="absolute inset-y-0 left-0 rounded-md"
                    style={{
                      background: `linear-gradient(90deg, hsl(162, 63%, 45%), hsl(180, 50%, ${35 + i * 5}%))`,
                      opacity: 1 - i * 0.12,
                    }}
                  />
                  {isDropoff && (
                    <div className="absolute right-3 text-xs font-mono text-warning flex items-center gap-1">
                      ⚠ friction point
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
};

export default CustomerFunnel;
