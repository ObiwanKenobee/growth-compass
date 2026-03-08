import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PieChart, TrendingUp, TrendingDown, AlertTriangle, ShieldCheck } from "lucide-react";

interface Customer {
  id?: string;
  name: string;
  revenue: number;
  pct: number;
  segment?: string | null;
  growthTrend?: number;
  riskLevel?: string | null;
}

interface RevenueConcentrationModalProps {
  customer: Customer | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const RevenueConcentrationModal = ({ customer, open, onOpenChange }: RevenueConcentrationModalProps) => {
  if (!customer) return <Dialog open={false} onOpenChange={onOpenChange}><DialogContent className="hidden" /></Dialog>;

  const riskColor = customer.riskLevel === "high" ? "text-danger" : customer.riskLevel === "medium" ? "text-warning" : "text-success";
  const RiskIcon = customer.riskLevel === "high" ? AlertTriangle : ShieldCheck;
  const TrendIcon = (customer.growthTrend ?? 0) >= 0 ? TrendingUp : TrendingDown;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <PieChart className="w-4 h-4 text-muted-foreground" />
            {customer.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Revenue */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/40">
            <div>
              <p className="text-sm text-muted-foreground">Annual Revenue</p>
              <p className="text-2xl font-bold font-mono text-foreground">${(customer.revenue / 1000).toFixed(0)}k</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Share</p>
              <p className={`text-xl font-bold font-mono ${customer.pct > 15 ? "text-danger" : customer.pct > 8 ? "text-warning" : "text-foreground"}`}>
                {customer.pct}%
              </p>
            </div>
          </div>

          {/* Details */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-secondary/30">
              <span className="text-xs text-muted-foreground">Segment</span>
              <p className="text-sm font-mono text-foreground mt-1">{customer.segment || "N/A"}</p>
            </div>
            <div className="p-3 rounded-lg bg-secondary/30">
              <span className="text-xs text-muted-foreground">Growth Trend</span>
              <div className="flex items-center gap-1 mt-1">
                <TrendIcon className={`w-3.5 h-3.5 ${(customer.growthTrend ?? 0) >= 0 ? "text-success" : "text-danger"}`} />
                <p className={`text-sm font-mono ${(customer.growthTrend ?? 0) >= 0 ? "text-success" : "text-danger"}`}>
                  {(customer.growthTrend ?? 0) > 0 ? "+" : ""}{customer.growthTrend ?? 0}%
                </p>
              </div>
            </div>
          </div>

          {/* Risk Level */}
          <div className={`flex items-center gap-2 p-3 rounded-lg border ${
            customer.riskLevel === "high" ? "bg-danger/5 border-danger/20" :
            customer.riskLevel === "medium" ? "bg-warning/5 border-warning/20" :
            "bg-success/5 border-success/20"
          }`}>
            <RiskIcon className={`w-4 h-4 ${riskColor}`} />
            <div>
              <p className={`text-sm font-medium ${riskColor}`}>
                {customer.riskLevel === "high" ? "High Concentration Risk" :
                 customer.riskLevel === "medium" ? "Moderate Risk" : "Low Risk"}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {customer.pct > 15 ? "Revenue dependency above safe threshold" :
                 customer.pct > 8 ? "Monitor for concentration changes" :
                 "Well-diversified revenue contribution"}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RevenueConcentrationModal;
