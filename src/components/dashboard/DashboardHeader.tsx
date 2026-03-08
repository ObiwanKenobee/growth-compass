import { motion } from "framer-motion";
import { Radar, Calendar, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { exportToCSV, exportToPDF } from "@/lib/exportUtils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const DashboardHeader = () => {
  const handleExportCSV = async () => {
    try {
      const [metrics, channels, segments, health, pipeline, concentration] = await Promise.all([
        supabase.from("dashboard_metrics").select("*"),
        supabase.from("acquisition_channels").select("*"),
        supabase.from("customer_segments").select("*"),
        supabase.from("customer_health").select("*"),
        supabase.from("pipeline_velocity").select("*"),
        supabase.from("revenue_concentration").select("*"),
      ]);

      const allData = [
        ...(metrics.data || []).map(r => ({ table: "Metrics", ...r })),
        ...(channels.data || []).map(r => ({ table: "Channels", ...r })),
        ...(segments.data || []).map(r => ({ table: "Segments", ...r })),
        ...(health.data || []).map(r => ({ table: "Health", ...r })),
        ...(pipeline.data || []).map(r => ({ table: "Pipeline", ...r })),
        ...(concentration.data || []).map(r => ({ table: "Concentration", ...r })),
      ];
      exportToCSV(allData as Record<string, unknown>[], "atlas-sanctum-dashboard");
      toast({ title: "CSV exported", description: "Dashboard data downloaded successfully." });
    } catch {
      toast({ title: "Export failed", variant: "destructive" });
    }
  };

  const handleExportPDF = async () => {
    try {
      const [health, pipeline, concentration] = await Promise.all([
        supabase.from("customer_health").select("*").order("score", { ascending: false }),
        supabase.from("pipeline_velocity").select("*").order("period_month", { ascending: true }),
        supabase.from("revenue_concentration").select("*").order("revenue", { ascending: false }),
      ]);

      exportToPDF("Atlas Sanctum — Intelligence Report", [
        {
          heading: "Customer Health",
          rows: [
            ["Account", "Score", "Status", "Reason"],
            ...(health.data || []).map(a => [a.name, String(a.score), a.status, a.reason]),
          ],
        },
        {
          heading: "Pipeline Velocity",
          rows: [
            ["Month", "Velocity", "Deal Size", "Win Rate", "Won", "Lost"],
            ...(pipeline.data || []).map(p => [p.period_month, `$${p.velocity}`, `$${p.avg_deal_size}`, `${p.win_rate}%`, String(p.deals_won), String(p.deals_lost)]),
          ],
        },
        {
          heading: "Revenue Concentration",
          rows: [
            ["Customer", "Revenue", "Share", "Segment", "Risk"],
            ...(concentration.data || []).map(c => [c.customer_name, `$${c.revenue}`, `${c.revenue_pct}%`, c.segment || "", c.risk_level || ""]),
          ],
        },
      ]);
    } catch {
      toast({ title: "Export failed", variant: "destructive" });
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-between flex-wrap gap-4"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
          <Radar className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="text-xl font-bold font-display text-foreground tracking-tight">Atlas Sanctum</h1>
          <p className="text-xs text-muted-foreground">Customer & Marketing Intelligence</p>
        </div>
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <DropdownMenu>
          <DropdownMenuTrigger className="px-3 py-1.5 rounded-lg bg-secondary/50 border border-border text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5">
            <Download className="w-3.5 h-3.5" />
            Export
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-card border-border">
            <DropdownMenuItem onClick={handleExportCSV} className="text-xs cursor-pointer">Export as CSV</DropdownMenuItem>
            <DropdownMenuItem onClick={handleExportPDF} className="text-xs cursor-pointer">Export as PDF Report</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Link to="/financial" className="px-3 py-1.5 rounded-lg bg-secondary/50 border border-border text-xs text-muted-foreground hover:text-foreground transition-colors">
          Financial Health →
        </Link>
        <Link to="/admin" className="px-3 py-1.5 rounded-lg bg-accent/10 border border-accent/20 text-xs text-accent hover:bg-accent/20 transition-colors">
          Admin
        </Link>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/50 border border-border">
          <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="text-xs font-mono text-muted-foreground">Feb 2026</span>
        </div>
      </div>
    </motion.header>
  );
};

export default DashboardHeader;
