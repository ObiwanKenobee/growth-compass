import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AuthGate } from "@/components/admin/AuthGate";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Settings, LogOut, Plus, Trash2, Save, RefreshCw, ShieldAlert } from "lucide-react";
import UserManagement from "@/components/admin/UserManagement";
import AuditLog from "@/components/admin/AuditLog";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useUserRole } from "@/hooks/useUserRole";
import type { User } from "@supabase/supabase-js";

type TableName = "dashboard_metrics" | "acquisition_channels" | "customer_segments" | "funnel_stages" | "strategic_intel" | "expansion_revenue" | "financial_data" | "cohort_retention" | "nrr_tracking" | "customer_health" | "pipeline_velocity" | "competitive_analysis" | "revenue_concentration";

const tables: { name: TableName; label: string; fields: string[] }[] = [
  { name: "dashboard_metrics", label: "Dashboard Metrics", fields: ["metric_type", "value", "period_month"] },
  { name: "acquisition_channels", label: "Acquisition Channels", fields: ["name", "customers", "cac", "color", "period_month"] },
  { name: "customer_segments", label: "Customer Segments", fields: ["name", "contract_value", "ltv", "churn_rate", "growth_rate", "customer_count", "period_month"] },
  { name: "funnel_stages", label: "Funnel Stages", fields: ["stage_name", "stage_order", "count", "conversion_rate", "period_month"] },
  { name: "strategic_intel", label: "Strategic Intel", fields: ["intel_type", "title", "event_date", "impact"] },
  { name: "expansion_revenue", label: "Expansion Revenue", fields: ["total", "tier_upgrades", "new_services", "geo_expansion", "period_month"] },
  { name: "financial_data", label: "Financial Data", fields: ["data_type", "label", "value", "percentage", "color", "period_month"] },
  { name: "cohort_retention", label: "Cohort Retention", fields: ["cohort_label", "month_index", "retention_pct"] },
  { name: "nrr_tracking", label: "NRR Tracking", fields: ["nrr_value", "expansion", "contraction", "churn", "target", "period_month"] },
  { name: "customer_health", label: "Customer Health", fields: ["name", "score", "status", "reason", "revenue", "nps_score", "feature_adoption_pct"] },
  { name: "pipeline_velocity", label: "Pipeline Velocity", fields: ["velocity", "avg_deal_size", "avg_cycle_time", "win_rate", "deals_won", "deals_lost", "period_month"] },
  { name: "competitive_analysis", label: "Competitive Analysis", fields: ["competitor_name", "wins", "losses", "top_reason", "period_month"] },
  { name: "revenue_concentration", label: "Revenue Concentration", fields: ["customer_name", "revenue", "revenue_pct", "segment", "risk_level", "growth_trend"] },
];

const AdminPanel = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeTable, setActiveTable] = useState<TableName>("dashboard_metrics");
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Record<string, string>>({});
  const { isAdmin, loading: roleLoading } = useUserRole(user);
  const queryClient = useQueryClient();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user ?? null));
    return () => subscription.unsubscribe();
  }, []);

  const tableConfig = tables.find(t => t.name === activeTable)!;

  const fetchRows = async () => {
    setLoading(true);
    const { data, error } = await supabase.from(activeTable).select("*").order("created_at", { ascending: false }).limit(50);
    if (error) toast.error(error.message);
    else setRows(data || []);
    setLoading(false);
  };

  useEffect(() => { if (user) fetchRows(); }, [activeTable, user]);

  const handleAdd = async () => {
    const newRow: Record<string, any> = {};
    tableConfig.fields.forEach(f => {
      if (f.includes("value") || f.includes("count") || f.includes("rate") || f.includes("total") || f.includes("cac") || f.includes("ltv") || f.includes("order") || f.includes("index") || f.includes("pct") || f.includes("percentage") || f.includes("customers") || f.includes("upgrades") || f.includes("services") || f.includes("expansion")) {
        newRow[f] = 0;
      } else {
        newRow[f] = "";
      }
    });
    const { error } = await supabase.from(activeTable).insert(newRow as any);
    if (error) toast.error(error.message);
    else { toast.success("Row added"); fetchRows(); queryClient.invalidateQueries(); }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from(activeTable).delete().eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("Deleted"); fetchRows(); queryClient.invalidateQueries(); }
  };

  const handleSave = async (id: string) => {
    const updates: Record<string, any> = {};
    Object.entries(editValues).forEach(([key, val]) => {
      const numFields = ["value", "count", "rate", "total", "cac", "ltv", "order", "index", "pct", "percentage", "customers", "upgrades", "services", "expansion", "contract_value", "churn_rate", "growth_rate", "customer_count", "conversion_rate", "stage_order", "month_index", "retention_pct", "tier_upgrades", "new_services", "geo_expansion"];
      if (numFields.some(n => key.includes(n))) {
        updates[key] = Number(val);
      } else {
        updates[key] = val;
      }
    });
    const { error } = await supabase.from(activeTable).update(updates as any).eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("Saved"); setEditingId(null); fetchRows(); queryClient.invalidateQueries(); }
  };

  const startEdit = (row: any) => {
    setEditingId(row.id);
    const vals: Record<string, string> = {};
    tableConfig.fields.forEach(f => { vals[f] = String(row[f] ?? ""); });
    setEditValues(vals);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthGate user={user}>
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          {/* Header */}
          <motion.header initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                <Settings className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h1 className="text-xl font-bold font-display text-foreground">Admin Panel</h1>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Link to="/" className="px-4 py-2 rounded-lg bg-secondary/50 border border-border text-xs text-muted-foreground hover:text-foreground transition-colors">
                ← Dashboard
              </Link>
              <button onClick={handleSignOut} className="px-4 py-2 rounded-lg bg-destructive/10 border border-destructive/20 text-xs text-destructive hover:bg-destructive/20 transition-colors flex items-center gap-1">
                <LogOut className="w-3 h-3" /> Sign Out
              </button>
            </div>
          </motion.header>

          {/* Role Guard */}
          {!roleLoading && !isAdmin && (
            <div className="flex items-center gap-3 p-4 rounded-xl bg-warning/5 border border-warning/20">
              <ShieldAlert className="w-5 h-5 text-warning flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium text-warning">Read-only access</p>
                <p className="text-xs text-muted-foreground">You need admin privileges to modify data.</p>
              </div>
              <button
                onClick={async () => {
                  try {
                    const { data, error } = await supabase.functions.invoke("bootstrap-admin");
                    if (error) throw error;
                    if (data?.error) { toast.error(data.error); return; }
                    toast.success("Admin role assigned! Refreshing...");
                    window.location.reload();
                  } catch (err: any) {
                    toast.error(err.message || "Failed to bootstrap admin");
                  }
                }}
                className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors whitespace-nowrap"
              >
                Claim Admin
              </button>
            </div>
          )}

          {/* Table Selector */}
          <div className="flex gap-2 flex-wrap">
            {tables.map(t => (
              <button
                key={t.name}
                onClick={() => setActiveTable(t.name)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  activeTable === t.name
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary/60 text-muted-foreground hover:bg-secondary"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button onClick={handleAdd} disabled={!isAdmin} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-medium flex items-center gap-1 hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
              <Plus className="w-3 h-3" /> Add Row
            </button>
            <button onClick={fetchRows} className="px-4 py-2 rounded-lg bg-secondary border border-border text-xs text-muted-foreground flex items-center gap-1 hover:text-foreground transition-colors">
              <RefreshCw className="w-3 h-3" /> Refresh
            </button>
          </div>

          {/* Data Table */}
          <div className="rounded-xl border border-border gradient-card shadow-card overflow-hidden">
            {loading ? (
              <div className="p-8 text-center text-muted-foreground text-sm">Loading...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs font-mono">
                  <thead>
                    <tr className="border-b border-border">
                      {tableConfig.fields.map(f => (
                        <th key={f} className="text-left p-3 text-muted-foreground font-medium uppercase tracking-wider">{f.replace(/_/g, " ")}</th>
                      ))}
                      <th className="p-3 text-muted-foreground font-medium w-24">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map(row => (
                      <tr key={row.id} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                        {tableConfig.fields.map(f => (
                          <td key={f} className="p-3">
                            {editingId === row.id ? (
                              <input
                                value={editValues[f] || ""}
                                onChange={e => setEditValues({ ...editValues, [f]: e.target.value })}
                                className="w-full px-2 py-1 rounded bg-secondary border border-border text-foreground text-xs focus:outline-none focus:ring-1 focus:ring-primary/40"
                              />
                            ) : (
                              <span className={`text-foreground ${isAdmin ? "cursor-pointer" : ""}`} onClick={() => isAdmin && startEdit(row)}>
                                {String(row[f] ?? "—")}
                              </span>
                            )}
                          </td>
                        ))}
                        <td className="p-3">
                          {isAdmin && (
                          <div className="flex gap-1">
                            {editingId === row.id ? (
                              <button onClick={() => handleSave(row.id)} className="p-1.5 rounded bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                                <Save className="w-3 h-3" />
                              </button>
                            ) : (
                              <button onClick={() => startEdit(row)} className="p-1.5 rounded bg-secondary text-muted-foreground hover:text-foreground transition-colors">
                                <Settings className="w-3 h-3" />
                              </button>
                            )}
                            <button onClick={() => handleDelete(row.id)} className="p-1.5 rounded bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors">
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                          )}
                        </td>
                      </tr>
                    ))}
                    {rows.length === 0 && (
                      <tr><td colSpan={tableConfig.fields.length + 1} className="p-8 text-center text-muted-foreground">No data. Click "Add Row" to start.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Audit Log */}
          <AuditLog isAdmin={isAdmin} />

          {/* User Management */}
          <UserManagement isAdmin={isAdmin} />
        </div>
      </div>
    </AuthGate>
  );
};

export default AdminPanel;
