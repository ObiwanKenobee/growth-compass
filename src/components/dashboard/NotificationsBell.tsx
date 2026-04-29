import { useState, useEffect, useCallback, useMemo } from "react";
import { Bell, Trash2, Download, BellOff, Clock, MoreVertical } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuTrigger,
  DropdownMenuItem, DropdownMenuSeparator, DropdownMenuSub,
  DropdownMenuSubTrigger, DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { exportToCSV, exportToPDF } from "@/lib/exportUtils";

interface Alert {
  id: string;
  alert_type: string;
  severity: string;
  message: string;
  checked_at: string;
}

const SNOOZE_KEY = "alert_snoozes_v1";
const MUTE_KEY = "alert_mutes_v1";

// Per-alert snooze: { [alertId]: epochMsExpiry }  (Infinity = mute forever)
type SnoozeMap = Record<string, number>;
// Per-type mute: string[] of alert_type values
type MuteList = string[];

function loadJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
function saveJSON(key: string, value: unknown) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* noop */ }
}

const NotificationsBell = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(false);
  const [snoozes, setSnoozes] = useState<SnoozeMap>(() => loadJSON(SNOOZE_KEY, {}));
  const [mutes, setMutes] = useState<MuteList>(() => loadJSON(MUTE_KEY, []));
  const [showMuted, setShowMuted] = useState(false);

  const fetchAlerts = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await supabase
        .from("health_alerts")
        .select("id, alert_type, severity, message, checked_at")
        .order("checked_at", { ascending: false })
        .limit(50);
      setAlerts((data as Alert[]) || []);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 60_000);
    return () => clearInterval(interval);
  }, [fetchAlerts]);

  // Cleanup expired snoozes once per minute
  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      setSnoozes(prev => {
        const next: SnoozeMap = {};
        let changed = false;
        Object.entries(prev).forEach(([id, exp]) => {
          if (exp > now) next[id] = exp;
          else changed = true;
        });
        if (changed) saveJSON(SNOOZE_KEY, next);
        return changed ? next : prev;
      });
    };
    const t = setInterval(tick, 60_000);
    return () => clearInterval(t);
  }, []);

  const now = Date.now();
  const visibleAlerts = useMemo(() => alerts.filter(a => {
    if (mutes.includes(a.alert_type)) return false;
    if ((snoozes[a.id] ?? 0) > now) return false;
    return true;
  }), [alerts, mutes, snoozes, now]);

  const hiddenCount = alerts.length - visibleAlerts.length;
  const criticalCount = visibleAlerts.filter(a => a.severity === "critical").length;
  const hasAlerts = visibleAlerts.length > 0;

  const updateSnoozes = (next: SnoozeMap) => {
    setSnoozes(next);
    saveJSON(SNOOZE_KEY, next);
  };
  const updateMutes = (next: MuteList) => {
    setMutes(next);
    saveJSON(MUTE_KEY, next);
  };

  const snoozeAlert = (id: string, ms: number) => {
    const expiry = ms === Infinity ? Number.MAX_SAFE_INTEGER : Date.now() + ms;
    updateSnoozes({ ...snoozes, [id]: expiry });
    toast.success(ms === Infinity ? "Alert dismissed locally" : `Snoozed for ${formatDuration(ms)}`);
  };

  const muteType = (type: string) => {
    if (mutes.includes(type)) return;
    updateMutes([...mutes, type]);
    toast.success(`Muted "${type.replace(/_/g, " ")}" alerts`);
  };

  const unmuteAll = () => {
    updateMutes([]);
    toast.success("All mutes cleared");
  };

  const clearSnoozes = () => {
    updateSnoozes({});
    toast.success("All snoozes cleared");
  };

  const handleClearAll = async () => {
    if (alerts.length === 0) return;
    const ids = alerts.map(a => a.id);
    const { error } = await supabase.from("health_alerts").delete().in("id", ids);
    if (error) {
      toast.error("Admin role required to dismiss alerts");
      return;
    }
    setAlerts([]);
    toast.success("All alerts dismissed");
  };

  const handleExportCSV = async () => {
    const { data, error } = await supabase
      .from("health_alerts")
      .select("checked_at, severity, alert_type, message, details")
      .order("checked_at", { ascending: false })
      .limit(500);
    if (error || !data || data.length === 0) {
      toast.error(error?.message || "No alerts to export");
      return;
    }
    const rows = data.map(a => ({
      checked_at: a.checked_at,
      severity: a.severity,
      alert_type: a.alert_type,
      message: a.message,
      details: a.details ? JSON.stringify(a.details) : "",
    }));
    exportToCSV(rows as Record<string, unknown>[], `health-alerts-${new Date().toISOString().slice(0, 10)}`);
    toast.success(`Exported ${rows.length} alerts`);
  };

  const handleExportPDF = async () => {
    const { data, error } = await supabase
      .from("health_alerts")
      .select("checked_at, severity, alert_type, message")
      .order("checked_at", { ascending: false })
      .limit(500);
    if (error || !data || data.length === 0) {
      toast.error(error?.message || "No alerts to export");
      return;
    }
    const counts = data.reduce<Record<string, number>>((acc, a) => {
      acc[a.severity] = (acc[a.severity] ?? 0) + 1;
      return acc;
    }, {});
    exportToPDF("Atlas Sanctum — Health Alerts History", [
      {
        heading: "Summary",
        rows: [
          ["Metric", "Value"],
          ["Total alerts", String(data.length)],
          ["Critical", String(counts.critical ?? 0)],
          ["Warning", String(counts.warning ?? 0)],
          ["Earliest", data[data.length - 1]?.checked_at ?? "—"],
          ["Latest", data[0]?.checked_at ?? "—"],
        ],
      },
      {
        heading: "Recent Alerts",
        rows: [
          ["Time", "Severity", "Type", "Message"],
          ...data.map(a => [
            new Date(a.checked_at).toLocaleString(),
            a.severity,
            a.alert_type.replace(/_/g, " "),
            a.message,
          ]),
        ],
      },
    ]);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative px-2 py-1.5 rounded-lg bg-secondary/50 border border-border text-muted-foreground hover:text-foreground transition-colors">
        <Bell className="w-4 h-4" />
        {hasAlerts && (
          <span className={`absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center ${
            criticalCount > 0 ? "bg-destructive text-destructive-foreground" : "bg-warning text-warning-foreground"
          }`}>
            {visibleAlerts.length > 9 ? "9+" : visibleAlerts.length}
          </span>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-96 max-h-[28rem] overflow-y-auto bg-card border-border p-0" align="end">
        <div className="px-3 py-2 border-b border-border flex items-center justify-between gap-2 sticky top-0 bg-card z-10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-foreground">Health Alerts</span>
            {loading && <span className="text-[10px] text-muted-foreground">Refreshing…</span>}
          </div>
          <div className="flex items-center gap-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-1 rounded hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors" title="More">
                  <MoreVertical className="w-3.5 h-3.5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-card border-border w-48">
                <DropdownMenuItem onClick={handleExportCSV} className="text-xs cursor-pointer">
                  <Download className="w-3 h-3 mr-2" /> Export CSV
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleExportPDF} className="text-xs cursor-pointer">
                  <Download className="w-3 h-3 mr-2" /> Export PDF
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setShowMuted(s => !s)} className="text-xs cursor-pointer">
                  {showMuted ? "Hide" : "Show"} muted ({hiddenCount})
                </DropdownMenuItem>
                <DropdownMenuItem onClick={clearSnoozes} className="text-xs cursor-pointer" disabled={Object.keys(snoozes).length === 0}>
                  Clear all snoozes
                </DropdownMenuItem>
                <DropdownMenuItem onClick={unmuteAll} className="text-xs cursor-pointer" disabled={mutes.length === 0}>
                  Unmute all types
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleClearAll} className="text-xs cursor-pointer text-destructive focus:text-destructive">
                  <Trash2 className="w-3 h-3 mr-2" /> Clear all (admin)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {(showMuted ? alerts : visibleAlerts).length === 0 ? (
          <div className="px-3 py-6 text-center text-xs text-muted-foreground">
            {alerts.length === 0 ? "No active alerts" : "All alerts are muted or snoozed"}
          </div>
        ) : (
          <AnimatePresence>
            {(showMuted ? alerts : visibleAlerts).map((alert, i) => {
              const isMuted = mutes.includes(alert.alert_type);
              const snoozedUntil = snoozes[alert.id];
              const isSnoozed = snoozedUntil && snoozedUntil > now;
              return (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.02 }}
                  className={`px-3 py-2 border-b border-border/50 last:border-0 hover:bg-secondary/30 transition-colors ${isMuted || isSnoozed ? "opacity-50" : ""}`}
                >
                  <div className="flex items-start gap-2">
                    <span className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${
                      alert.severity === "critical" ? "bg-destructive" : "bg-warning"
                    }`} />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-foreground leading-snug">{alert.message}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">
                        {new Date(alert.checked_at).toLocaleString()} · {alert.alert_type.replace(/_/g, " ")}
                        {isMuted && <span className="ml-1 text-warning">· muted</span>}
                        {isSnoozed && <span className="ml-1 text-warning">· snoozed</span>}
                      </p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-1 rounded hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors" title="Snooze / mute">
                          <MoreVertical className="w-3 h-3" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-card border-border w-44">
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger className="text-xs">
                            <Clock className="w-3 h-3 mr-2" /> Snooze
                          </DropdownMenuSubTrigger>
                          <DropdownMenuSubContent className="bg-card border-border">
                            <DropdownMenuItem className="text-xs cursor-pointer" onClick={() => snoozeAlert(alert.id, 60 * 60 * 1000)}>1 hour</DropdownMenuItem>
                            <DropdownMenuItem className="text-xs cursor-pointer" onClick={() => snoozeAlert(alert.id, 4 * 60 * 60 * 1000)}>4 hours</DropdownMenuItem>
                            <DropdownMenuItem className="text-xs cursor-pointer" onClick={() => snoozeAlert(alert.id, 24 * 60 * 60 * 1000)}>24 hours</DropdownMenuItem>
                            <DropdownMenuItem className="text-xs cursor-pointer" onClick={() => snoozeAlert(alert.id, 7 * 24 * 60 * 60 * 1000)}>7 days</DropdownMenuItem>
                            <DropdownMenuItem className="text-xs cursor-pointer" onClick={() => snoozeAlert(alert.id, Infinity)}>Forever</DropdownMenuItem>
                          </DropdownMenuSubContent>
                        </DropdownMenuSub>
                        <DropdownMenuItem
                          className="text-xs cursor-pointer"
                          onClick={() => muteType(alert.alert_type)}
                          disabled={isMuted}
                        >
                          <BellOff className="w-3 h-3 mr-2" /> Mute this type
                        </DropdownMenuItem>
                        {isSnoozed && (
                          <DropdownMenuItem
                            className="text-xs cursor-pointer"
                            onClick={() => {
                              const next = { ...snoozes };
                              delete next[alert.id];
                              updateSnoozes(next);
                            }}
                          >
                            Unsnooze
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

function formatDuration(ms: number): string {
  const h = Math.round(ms / (60 * 60 * 1000));
  if (h < 24) return `${h}h`;
  return `${Math.round(h / 24)}d`;
}

export default NotificationsBell;
