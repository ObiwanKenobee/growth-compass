import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Database, Sparkles, Trash2, Loader2, Eye } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import * as mock from "@/data/dashboardData";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";

interface Props {
  isAdmin: boolean;
}

type SeedTable =
  | "dashboard_metrics"
  | "acquisition_channels"
  | "customer_segments"
  | "cohort_retention"
  | "funnel_stages"
  | "expansion_revenue"
  | "strategic_intel"
  | "nrr_tracking"
  | "customer_health"
  | "pipeline_velocity"
  | "competitive_analysis"
  | "revenue_concentration";

const tableMeta: { name: SeedTable; label: string; description: string }[] = [
  { name: "dashboard_metrics", label: "Dashboard Metrics", description: "CAC, LTV, churn time series + engagement" },
  { name: "acquisition_channels", label: "Acquisition Channels", description: "Channel performance & CAC" },
  { name: "customer_segments", label: "Customer Segments", description: "Segment LTV, churn, growth" },
  { name: "cohort_retention", label: "Cohort Retention", description: "Monthly cohort retention curves" },
  { name: "funnel_stages", label: "Funnel Stages", description: "Outreach → contract conversion" },
  { name: "expansion_revenue", label: "Expansion Revenue", description: "Upgrades, new services, geo" },
  { name: "strategic_intel", label: "Strategic Intel", description: "Partnerships, adoptions, milestones" },
  { name: "nrr_tracking", label: "NRR Tracking", description: "Net Revenue Retention history" },
  { name: "customer_health", label: "Customer Health", description: "Account-level health scores" },
  { name: "pipeline_velocity", label: "Pipeline Velocity", description: "Deals won/lost per month" },
  { name: "competitive_analysis", label: "Competitive Analysis", description: "Wins/losses by competitor" },
  { name: "revenue_concentration", label: "Revenue Concentration", description: "Top customers & risk" },
];

const months6 = ["Sep 2025", "Oct 2025", "Nov 2025", "Dec 2025", "Jan 2026", "Feb 2026"];

function buildSeed(name: SeedTable): any[] {
  switch (name) {
    case "dashboard_metrics": {
      const cac = mock.cacData.history.map((h, i) => ({
        metric_type: "cac", value: h.value, period_month: months6[i] ?? `${h.month} 2026`,
      }));
      const ltv = mock.ltvData.history.map((h, i) => ({
        metric_type: "ltv", value: h.value, period_month: months6[i] ?? `${h.month} 2026`,
        metadata: { avg_duration: mock.ltvData.avgDuration },
      }));
      const churn = mock.churnData.history.slice(-6).map((h, i) => ({
        metric_type: "churn", value: h.value, period_month: months6[i] ?? `${h.month} 2026`,
      }));
      const eng = [
        { type: "assets_verified", v: mock.engagementMetrics.assetsProcessed.value },
        { type: "simulations", v: mock.engagementMetrics.simulationRuns.value },
        { type: "analyses", v: mock.engagementMetrics.ecosystemAnalyses.value },
        { type: "reports", v: mock.engagementMetrics.reportsGenerated.value },
      ].flatMap(e => months6.map((m, i) => ({
        metric_type: e.type,
        value: Math.round(e.v * (0.7 + i * 0.06)),
        period_month: m,
      })));
      return [...cac, ...ltv, ...churn, ...eng];
    }
    case "acquisition_channels":
      return mock.acquisitionChannels.map(c => ({
        name: c.name, customers: c.customers, cac: c.cac, color: c.color, period_month: "Feb 2026",
      }));
    case "customer_segments":
      return mock.customerSegments.map(s => ({
        name: s.name, contract_value: s.contractValue, ltv: s.ltv,
        churn_rate: s.churn, growth_rate: s.growth, customer_count: s.size, period_month: "Feb 2026",
      }));
    case "cohort_retention":
      return mock.cohortData.flatMap(c =>
        c.months.map((pct, idx) => ({
          cohort_label: c.cohort, month_index: idx, retention_pct: pct,
        }))
      );
    case "funnel_stages":
      return mock.funnelData.map((s, i) => ({
        stage_name: s.stage, stage_order: i, count: s.count,
        conversion_rate: s.rate, period_month: "Feb 2026",
      }));
    case "expansion_revenue":
      return mock.expansionRevenue.history.map((h, i) => ({
        period_month: months6[i] ?? `${h.month} 2026`,
        total: h.value,
        tier_upgrades: Math.round(mock.expansionRevenue.upgrades * (0.6 + i * 0.08)),
        new_services: Math.round(mock.expansionRevenue.newServices * (0.6 + i * 0.08)),
        geo_expansion: Math.round(mock.expansionRevenue.geoExpansion * (0.6 + i * 0.08)),
      }));
    case "strategic_intel":
      return mock.strategicIntel.map(i => ({
        intel_type: i.type, title: i.title, event_date: i.date, impact: i.impact,
      }));
    case "nrr_tracking":
      return mock.nrrData.history.map((h, i) => ({
        period_month: months6[i] ?? `${h.month} 2026`,
        nrr_value: h.value,
        expansion: mock.nrrData.components[0].value,
        contraction: mock.nrrData.components[1].value,
        churn: mock.nrrData.components[2].value,
        target: mock.nrrData.target,
      }));
    case "customer_health":
      return mock.customerHealthData.accounts.map(a => ({
        name: a.name, score: a.score, status: a.status, reason: a.reason,
        revenue: 50000 + a.score * 1000,
        nps_score: Math.min(100, a.score + 5),
        feature_adoption_pct: a.score,
        support_tickets_open: a.status === "churning" ? 5 : a.status === "at-risk" ? 2 : 0,
      }));
    case "pipeline_velocity":
      return mock.pipelineData.monthlyDeals.map((d, i) => ({
        period_month: months6[i] ?? `${d.month} 2026`,
        deals_won: d.won, deals_lost: d.lost,
        win_rate: Number(((d.won / (d.won + d.lost)) * 100).toFixed(1)),
        avg_deal_size: mock.pipelineData.avgDealSize,
        avg_cycle_time: mock.pipelineData.avgCycleTime,
        velocity: mock.pipelineData.velocity,
      }));
    case "competitive_analysis":
      return mock.competitiveData.competitors.map(c => ({
        competitor_name: c.name, wins: c.wins, losses: c.losses,
        top_reason: c.topReason, period_month: "Feb 2026",
      }));
    case "revenue_concentration":
      return mock.revenueConcentrationData.topCustomers.map((c, i) => ({
        customer_name: c.name, revenue: c.revenue, revenue_pct: c.pct,
        segment: i % 2 === 0 ? "Governments" : "Climate Funds",
        risk_level: c.pct > 15 ? "high" : c.pct > 8 ? "medium" : "low",
        growth_trend: 5 + (i % 3) * 4,
      }));
    default:
      return [];
  }
}

type PreviewMode = { kind: "single"; name: SeedTable; label: string } | { kind: "all" } | null;

const DataSeeder = ({ isAdmin }: Props) => {
  const [busy, setBusy] = useState<string | null>(null);
  const [preview, setPreview] = useState<PreviewMode>(null);
  const queryClient = useQueryClient();

  // Pre-compute row counts (cheap, deterministic)
  const counts = useMemo(() => {
    const m: Record<SeedTable, number> = {} as Record<SeedTable, number>;
    tableMeta.forEach(t => { m[t.name] = buildSeed(t.name).length; });
    return m;
  }, []);

  const totalRows = useMemo(
    () => tableMeta.reduce((sum, t) => sum + counts[t.name], 0),
    [counts]
  );

  const insertSingle = async (name: SeedTable, label: string) => {
    setBusy(`seed-${name}`);
    try {
      const rows = buildSeed(name);
      if (rows.length === 0) throw new Error("No sample data defined");
      const { error } = await supabase.from(name).insert(rows as any);
      if (error) throw error;
      toast.success(`Seeded ${rows.length} rows into ${label}`);
      queryClient.invalidateQueries();
    } catch (e: any) {
      toast.error(e.message || "Seed failed");
    } finally {
      setBusy(null);
      setPreview(null);
    }
  };

  const handleClear = async (name: SeedTable, label: string) => {
    if (!confirm(`Delete ALL rows in ${label}? This cannot be undone.`)) return;
    setBusy(`clear-${name}`);
    try {
      const { error } = await supabase.from(name).delete().not("id", "is", null);
      if (error) throw error;
      toast.success(`Cleared ${label}`);
      queryClient.invalidateQueries();
    } catch (e: any) {
      toast.error(e.message || "Clear failed");
    } finally {
      setBusy(null);
    }
  };

  const insertAll = async () => {
    setBusy("seed-all");
    let ok = 0, fail = 0, total = 0;
    for (const t of tableMeta) {
      try {
        const rows = buildSeed(t.name);
        const { error } = await supabase.from(t.name).insert(rows as any);
        if (error) throw error;
        ok++; total += rows.length;
      } catch {
        fail++;
      }
    }
    queryClient.invalidateQueries();
    setBusy(null);
    setPreview(null);
    toast.success(`Seeded ${total} rows across ${ok} tables${fail ? `, ${fail} failed` : ""}`);
  };

  // Build payload for the preview dialog
  const previewPayload = useMemo(() => {
    if (!preview) return null;
    if (preview.kind === "single") {
      const rows = buildSeed(preview.name);
      return {
        title: `Preview: ${preview.label}`,
        sections: [{ name: preview.name, label: preview.label, rows }],
        total: rows.length,
      };
    }
    return {
      title: "Preview: Seed All Tables",
      sections: tableMeta.map(t => ({ name: t.name, label: t.label, rows: buildSeed(t.name) })),
      total: totalRows,
    };
  }, [preview, totalRows]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-border gradient-card shadow-card p-6"
    >
      <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
            <Database className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Data Seeder</h3>
            <p className="text-xs text-muted-foreground">Populate tables with realistic sample data. Preview before committing.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-muted-foreground">
            {totalRows} rows total
          </span>
          <button
            onClick={() => setPreview({ kind: "all" })}
            disabled={!isAdmin || busy !== null}
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-medium flex items-center gap-1.5 hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {busy === "seed-all" ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
            Preview & Seed All
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {tableMeta.map(t => (
          <div key={t.name} className="flex items-center justify-between gap-3 p-3 rounded-lg bg-secondary/30 border border-border/50">
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-foreground truncate">
                {t.label}
                <span className="ml-2 text-[10px] font-mono text-muted-foreground">{counts[t.name]} rows</span>
              </p>
              <p className="text-[10px] text-muted-foreground truncate">{t.description}</p>
            </div>
            <div className="flex gap-1 flex-shrink-0">
              <button
                onClick={() => setPreview({ kind: "single", name: t.name, label: t.label })}
                disabled={busy !== null}
                className="p-1.5 rounded bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                title="Preview generated rows"
              >
                <Eye className="w-3 h-3" />
              </button>
              <button
                onClick={() => setPreview({ kind: "single", name: t.name, label: t.label })}
                disabled={!isAdmin || busy !== null}
                className="p-1.5 rounded bg-primary/10 text-primary hover:bg-primary/20 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                title="Seed sample data"
              >
                {busy === `seed-${t.name}` ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
              </button>
              <button
                onClick={() => handleClear(t.name, t.label)}
                disabled={!isAdmin || busy !== null}
                className="p-1.5 rounded bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                title="Clear all rows"
              >
                {busy === `clear-${t.name}` ? <Loader2 className="w-3 h-3 animate-spin" /> : <Trash2 className="w-3 h-3" />}
              </button>
            </div>
          </div>
        ))}
      </div>

      {!isAdmin && (
        <p className="text-[10px] text-warning mt-3">Admin role required to seed or clear data. (Preview is still available.)</p>
      )}

      {/* Preview Dialog */}
      <Dialog open={preview !== null} onOpenChange={open => !open && setPreview(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">{previewPayload?.title}</DialogTitle>
            <DialogDescription>
              {previewPayload?.total} row{previewPayload?.total === 1 ? "" : "s"} will be inserted.
              Showing first 3 rows per table.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {previewPayload?.sections.map(s => (
              <div key={s.name} className="rounded-lg border border-border/50 overflow-hidden">
                <div className="px-3 py-2 bg-secondary/40 flex items-center justify-between">
                  <span className="text-xs font-medium text-foreground">{s.label}</span>
                  <span className="text-[10px] font-mono text-muted-foreground">{s.rows.length} rows</span>
                </div>
                {s.rows.length === 0 ? (
                  <p className="px-3 py-2 text-[11px] text-muted-foreground italic">No sample data defined.</p>
                ) : (
                  <pre className="px-3 py-2 text-[10px] font-mono text-muted-foreground bg-background/40 overflow-x-auto leading-relaxed">
{JSON.stringify(s.rows.slice(0, 3), null, 2)}
{s.rows.length > 3 ? `\n…and ${s.rows.length - 3} more row${s.rows.length - 3 === 1 ? "" : "s"}` : ""}
                  </pre>
                )}
              </div>
            ))}
          </div>

          <DialogFooter>
            <button
              onClick={() => setPreview(null)}
              disabled={busy !== null}
              className="px-4 py-2 rounded-lg bg-secondary border border-border text-xs text-muted-foreground hover:text-foreground transition-colors disabled:opacity-40"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (!preview) return;
                if (preview.kind === "single") insertSingle(preview.name, preview.label);
                else insertAll();
              }}
              disabled={!isAdmin || busy !== null}
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-medium flex items-center gap-1.5 hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {busy ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
              Confirm & Insert {previewPayload?.total} rows
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default DataSeeder;

