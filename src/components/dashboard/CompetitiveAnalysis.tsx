import { motion } from "framer-motion";
import { Swords, Trophy, XCircle } from "lucide-react";
import { useCompetitiveAnalysis } from "@/hooks/useIntelligenceData";
import { Skeleton } from "@/components/ui/skeleton";

const CompetitiveAnalysis = () => {
  const { data, isLoading } = useCompetitiveAnalysis();

  if (isLoading) return <Skeleton className="h-64 rounded-xl" />;

  const { competitors, overallWinRate } = data!;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="rounded-xl border border-border gradient-card shadow-card p-6"
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Swords className="w-4 h-4 text-muted-foreground" />
          <h3 className="text-sm font-medium text-muted-foreground tracking-wide uppercase">Competitive Win/Loss</h3>
        </div>
        <span className="text-xs font-mono text-success">{overallWinRate}% overall win rate</span>
      </div>

      <div className="space-y-3">
        {competitors.map((comp: any, i: number) => {
          const total = comp.wins + comp.losses;
          const winPct = Math.round((comp.wins / total) * 100);
          return (
            <motion.div key={comp.name} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 + i * 0.05 }} className="p-3 rounded-lg bg-secondary/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-foreground font-medium">{comp.name}</span>
                <span className={`text-xs font-mono ${winPct >= 60 ? "text-success" : winPct >= 40 ? "text-warning" : "text-danger"}`}>{winPct}% win rate</span>
              </div>
              <div className="flex h-2 rounded-full overflow-hidden gap-0.5 mb-2">
                <div className="bg-success rounded-l-full" style={{ width: `${winPct}%` }} />
                <div className="bg-danger/60 rounded-r-full" style={{ width: `${100 - winPct}%` }} />
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1"><Trophy className="w-3 h-3 text-success" /> {comp.wins} won</span>
                  <span className="flex items-center gap-1"><XCircle className="w-3 h-3 text-danger/60" /> {comp.losses} lost</span>
                </div>
                <span className="font-mono">{comp.topReason}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default CompetitiveAnalysis;
