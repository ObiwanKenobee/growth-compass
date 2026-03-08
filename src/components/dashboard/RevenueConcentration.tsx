import { useState } from "react";
import { motion } from "framer-motion";
import { PieChart, AlertTriangle } from "lucide-react";
import { useRevenueConcentration } from "@/hooks/useIntelligenceData";
import { Skeleton } from "@/components/ui/skeleton";
import RevenueConcentrationModal from "./RevenueConcentrationModal";

const RevenueConcentration = () => {
  const { data, isLoading } = useRevenueConcentration();
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  if (isLoading) return <Skeleton className="h-64 rounded-xl" />;

  const { topCustomers, metrics } = data!;
  const maxRevenue = Math.max(...topCustomers.map((c: any) => c.revenue));

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.65 }}
        className="rounded-xl border border-border gradient-card shadow-card p-6"
      >
        <div className="flex items-center gap-2 mb-5">
          <PieChart className="w-4 h-4 text-muted-foreground" />
          <h3 className="text-sm font-medium text-muted-foreground tracking-wide uppercase">Revenue Concentration Risk</h3>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-5">
          <div className="p-3 rounded-lg bg-secondary/40 text-center">
            <p className={`text-lg font-bold font-mono ${metrics.top1Pct > 20 ? "text-danger" : metrics.top1Pct > 10 ? "text-warning" : "text-success"}`}>{metrics.top1Pct}%</p>
            <p className="text-xs text-muted-foreground mt-0.5">Top Client</p>
          </div>
          <div className="p-3 rounded-lg bg-secondary/40 text-center">
            <p className={`text-lg font-bold font-mono ${metrics.top5Pct > 50 ? "text-warning" : "text-success"}`}>{metrics.top5Pct}%</p>
            <p className="text-xs text-muted-foreground mt-0.5">Top 5 Clients</p>
          </div>
          <div className="p-3 rounded-lg bg-secondary/40 text-center">
            <p className="text-lg font-bold font-mono text-foreground">{metrics.herfindahl}</p>
            <p className="text-xs text-muted-foreground mt-0.5">HHI Score</p>
          </div>
        </div>

        {metrics.top1Pct > 15 && (
          <div className="flex items-center gap-2 p-2.5 rounded-lg bg-warning/5 border border-warning/20 mb-4">
            <AlertTriangle className="w-4 h-4 text-warning flex-shrink-0" />
            <p className="text-xs text-warning">High concentration risk — top client accounts for {metrics.top1Pct}% of revenue</p>
          </div>
        )}

        <div className="space-y-2.5">
          {topCustomers.map((cust: any, i: number) => (
            <motion.div
              key={cust.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 + i * 0.04 }}
              className="cursor-pointer hover:bg-secondary/20 rounded-lg transition-colors p-1 -mx-1"
              onClick={() => setSelectedCustomer(cust)}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-foreground truncate max-w-[60%]">{cust.name}</span>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-muted-foreground">${(cust.revenue / 1000).toFixed(0)}k</span>
                  <span className="text-xs font-mono text-muted-foreground w-10 text-right">{cust.pct}%</span>
                </div>
              </div>
              <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(cust.revenue / maxRevenue) * 100}%` }}
                  transition={{ duration: 0.6, delay: 0.9 + i * 0.04 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: cust.pct > 15 ? "hsl(0, 72%, 55%)" : cust.pct > 8 ? "hsl(38, 90%, 55%)" : "hsl(162, 63%, 45%)" }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <RevenueConcentrationModal customer={selectedCustomer} open={!!selectedCustomer} onOpenChange={(open) => !open && setSelectedCustomer(null)} />
    </>
  );
};

export default RevenueConcentration;
