import { motion } from "framer-motion";
import { Handshake, Building, Globe, Shield, ShoppingBag } from "lucide-react";
import { strategicIntel } from "@/data/dashboardData";

const iconMap: Record<string, typeof Handshake> = {
  partnership: Handshake,
  adoption: Building,
  pilot: Globe,
  verification: Shield,
};

const impactColors: Record<string, string> = {
  high: "text-success bg-success/10 border-success/20",
  medium: "text-info bg-info/10 border-info/20",
  low: "text-muted-foreground bg-muted/50 border-border",
};

const StrategicIntel = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.0 }}
      className="rounded-xl border border-border gradient-card shadow-card p-6"
    >
      <h3 className="text-sm font-medium text-muted-foreground tracking-wide uppercase mb-6">Strategic Intelligence</h3>
      <div className="space-y-3">
        {strategicIntel.map((item, i) => {
          const Icon = iconMap[item.type] || ShoppingBag;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1 + i * 0.05 }}
              className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground leading-snug">{item.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.date}</p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full border font-mono ${impactColors[item.impact]}`}>
                {item.impact}
              </span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default StrategicIntel;
