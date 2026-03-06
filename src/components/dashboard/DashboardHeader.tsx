import { motion } from "framer-motion";
import { Radar, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const DashboardHeader = () => {
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
        <Link
          to="/financial"
          className="px-3 py-1.5 rounded-lg bg-secondary/50 border border-border text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          Financial Health →
        </Link>
        <Link
          to="/admin"
          className="px-3 py-1.5 rounded-lg bg-accent/10 border border-accent/20 text-xs text-accent hover:bg-accent/20 transition-colors"
        >
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
