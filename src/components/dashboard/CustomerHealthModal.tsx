import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Heart, Calendar, MessageSquare, Layers, TrendingUp, TrendingDown } from "lucide-react";

interface Account {
  id?: string;
  name: string;
  score: number;
  status: string;
  reason: string;
  revenue?: number;
  contractEnd?: string | null;
  lastActivity?: string | null;
  npsScore?: number | null;
  featureAdoption?: number;
  supportTickets?: number;
}

interface CustomerHealthModalProps {
  account: Account | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CustomerHealthModal = ({ account, open, onOpenChange }: CustomerHealthModalProps) => {
  if (!account) return <Dialog open={false} onOpenChange={onOpenChange}><DialogContent className="hidden" /></Dialog>;

  const statusColor = account.status === "healthy" ? "text-success" : account.status === "at-risk" ? "text-warning" : "text-danger";

  const details = [
    { label: "Revenue", value: account.revenue ? `$${(account.revenue / 1000).toFixed(0)}k` : "N/A", icon: TrendingUp },
    { label: "Contract Ends", value: account.contractEnd || "N/A", icon: Calendar },
    { label: "Last Active", value: account.lastActivity || "N/A", icon: Calendar },
    { label: "NPS Score", value: account.npsScore != null ? `${account.npsScore}/10` : "N/A", icon: MessageSquare },
    { label: "Feature Adoption", value: account.featureAdoption != null ? `${account.featureAdoption}%` : "N/A", icon: Layers },
    { label: "Open Tickets", value: account.supportTickets != null ? String(account.supportTickets) : "N/A", icon: MessageSquare },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <Heart className="w-4 h-4 text-primary" />
            {account.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Health Score */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/40">
            <div>
              <p className="text-sm text-muted-foreground">Health Score</p>
              <p className={`text-2xl font-bold font-mono ${statusColor}`}>{account.score}</p>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full border ${statusColor} bg-secondary/60`}>
              {account.status}
            </span>
          </div>

          <p className="text-sm text-muted-foreground">{account.reason}</p>

          {/* Detail Grid */}
          <div className="grid grid-cols-2 gap-3">
            {details.map(d => (
              <div key={d.label} className="p-3 rounded-lg bg-secondary/30">
                <div className="flex items-center gap-1.5 mb-1">
                  <d.icon className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{d.label}</span>
                </div>
                <p className="text-sm font-mono text-foreground">{d.value}</p>
              </div>
            ))}
          </div>

          {/* Feature Adoption Bar */}
          {account.featureAdoption != null && (
            <div>
              <p className="text-xs text-muted-foreground mb-1.5">Feature Adoption</p>
              <div className="h-2 rounded-full bg-secondary overflow-hidden">
                <div
                  className={`h-full rounded-full ${account.featureAdoption >= 60 ? "bg-success" : account.featureAdoption >= 30 ? "bg-warning" : "bg-danger"}`}
                  style={{ width: `${account.featureAdoption}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerHealthModal;
