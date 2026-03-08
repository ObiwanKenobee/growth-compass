import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { History, RefreshCw, Download } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { exportToCSV } from "@/lib/exportUtils";

interface AuditEntry {
  id: string;
  table_name: string;
  record_id: string;
  action: string;
  old_data: Record<string, any> | null;
  new_data: Record<string, any> | null;
  changed_by: string | null;
  changed_at: string;
}

export default function AuditLog({ isAdmin }: { isAdmin: boolean }) {
  const [entries, setEntries] = useState<AuditEntry[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchLog = async () => {
    setLoading(true);
    const { data } = await (supabase as any)
      .from("audit_log")
      .select("*")
      .order("changed_at", { ascending: false })
      .limit(50);
    setEntries((data as AuditEntry[]) || []);
    setLoading(false);
  };

  useEffect(() => {
    if (isAdmin) fetchLog();
  }, [isAdmin]);

  if (!isAdmin) return null;

  const actionColor = (action: string) => {
    switch (action) {
      case "INSERT": return "text-emerald-400 bg-emerald-400/10";
      case "UPDATE": return "text-amber-400 bg-amber-400/10";
      case "DELETE": return "text-red-400 bg-red-400/10";
      default: return "text-muted-foreground bg-secondary";
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-accent" />
          <h2 className="text-sm font-semibold text-foreground">Audit Log</h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              const csvData = entries.map(e => ({
                when: new Date(e.changed_at).toISOString(),
                action: e.action,
                table: e.table_name,
                record_id: e.record_id,
                changes: e.action === "UPDATE" && e.old_data && e.new_data
                  ? Object.keys(e.new_data)
                      .filter(k => k !== "created_at" && JSON.stringify(e.old_data![k]) !== JSON.stringify(e.new_data![k]))
                      .map(k => `${k}: ${e.old_data![k]} → ${e.new_data![k]}`)
                      .join("; ")
                  : e.action === "DELETE" ? "record removed" : "new record",
                user: e.changed_by || "",
              }));
              exportToCSV(csvData, `audit-log-${new Date().toISOString().slice(0, 10)}`);
            }}
            disabled={entries.length === 0}
            className="px-3 py-1.5 rounded-lg bg-secondary border border-border text-xs text-muted-foreground flex items-center gap-1 hover:text-foreground transition-colors disabled:opacity-40"
          >
            <Download className="w-3 h-3" /> Export CSV
          </button>
          <button onClick={fetchLog} className="px-3 py-1.5 rounded-lg bg-secondary border border-border text-xs text-muted-foreground flex items-center gap-1 hover:text-foreground transition-colors">
            <RefreshCw className="w-3 h-3" /> Refresh
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-border gradient-card shadow-card overflow-hidden">
        {loading ? (
          <div className="p-6 text-center text-muted-foreground text-sm">Loading...</div>
        ) : entries.length === 0 ? (
          <div className="p-6 text-center text-muted-foreground text-sm">No audit entries yet. Changes will appear here.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 text-muted-foreground font-medium uppercase tracking-wider">When</th>
                  <th className="text-left p-3 text-muted-foreground font-medium uppercase tracking-wider">Action</th>
                  <th className="text-left p-3 text-muted-foreground font-medium uppercase tracking-wider">Table</th>
                  <th className="text-left p-3 text-muted-foreground font-medium uppercase tracking-wider">Changes</th>
                  <th className="text-left p-3 text-muted-foreground font-medium uppercase tracking-wider">User</th>
                </tr>
              </thead>
              <tbody>
                {entries.map(e => (
                  <tr key={e.id} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                    <td className="p-3 text-muted-foreground whitespace-nowrap">
                      {formatDistanceToNow(new Date(e.changed_at), { addSuffix: true })}
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${actionColor(e.action)}`}>
                        {e.action}
                      </span>
                    </td>
                    <td className="p-3 text-foreground">{e.table_name.replace(/_/g, " ")}</td>
                    <td className="p-3 text-muted-foreground max-w-xs truncate">
                      {e.action === "UPDATE" && e.old_data && e.new_data
                        ? Object.keys(e.new_data)
                            .filter(k => k !== "created_at" && JSON.stringify(e.old_data![k]) !== JSON.stringify(e.new_data![k]))
                            .map(k => `${k}: ${e.old_data![k]} → ${e.new_data![k]}`)
                            .join(", ") || "no changes"
                        : e.action === "DELETE"
                        ? "record removed"
                        : "new record"}
                    </td>
                    <td className="p-3 text-muted-foreground truncate max-w-[120px]">{e.changed_by?.slice(0, 8) || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
