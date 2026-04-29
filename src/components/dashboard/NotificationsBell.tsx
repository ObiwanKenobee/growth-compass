import { useState, useEffect, useCallback } from "react";
import { Bell, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

interface Alert {
  id: string;
  alert_type: string;
  severity: string;
  message: string;
  checked_at: string;
}

const NotificationsBell = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAlerts = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await supabase
        .from("health_alerts")
        .select("id, alert_type, severity, message, checked_at")
        .order("checked_at", { ascending: false })
        .limit(20);
      setAlerts((data as Alert[]) || []);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 60_000); // poll every minute
    return () => clearInterval(interval);
  }, [fetchAlerts]);

  const criticalCount = alerts.filter(a => a.severity === "critical").length;
  const hasAlerts = alerts.length > 0;

  const handleClearAll = async () => {
    if (!hasAlerts) return;
    const ids = alerts.map(a => a.id);
    const { error } = await supabase.from("health_alerts").delete().in("id", ids);
    if (error) {
      toast.error("Admin role required to dismiss alerts");
      return;
    }
    setAlerts([]);
    toast.success("All alerts dismissed");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative px-2 py-1.5 rounded-lg bg-secondary/50 border border-border text-muted-foreground hover:text-foreground transition-colors">
        <Bell className="w-4 h-4" />
        {hasAlerts && (
          <span className={`absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center ${
            criticalCount > 0 ? "bg-destructive text-destructive-foreground" : "bg-warning text-warning-foreground"
          }`}>
            {alerts.length > 9 ? "9+" : alerts.length}
          </span>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 max-h-96 overflow-y-auto bg-card border-border p-0" align="end">
        <div className="px-3 py-2 border-b border-border flex items-center justify-between gap-2">
          <span className="text-xs font-medium text-foreground">Health Alerts</span>
          <div className="flex items-center gap-2">
            {loading && <span className="text-[10px] text-muted-foreground">Refreshing…</span>}
            {hasAlerts && (
              <button
                onClick={handleClearAll}
                className="text-[10px] text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1"
              >
                <Trash2 className="w-3 h-3" /> Clear all
              </button>
            )}
          </div>
        </div>
        {alerts.length === 0 ? (
          <div className="px-3 py-6 text-center text-xs text-muted-foreground">No active alerts</div>
        ) : (
          <AnimatePresence>
            {alerts.map((alert, i) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="px-3 py-2 border-b border-border/50 last:border-0 hover:bg-secondary/30 transition-colors"
              >
                <div className="flex items-start gap-2">
                  <span className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${
                    alert.severity === "critical" ? "bg-destructive" : "bg-warning"
                  }`} />
                  <div className="min-w-0">
                    <p className="text-xs text-foreground leading-snug">{alert.message}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">
                      {new Date(alert.checked_at).toLocaleString()} · {alert.alert_type.replace(/_/g, " ")}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationsBell;
