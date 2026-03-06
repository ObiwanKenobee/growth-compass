import { motion } from "framer-motion";
import { useAcquisitionChannels } from "@/hooks/useDashboardData";

const AcquisitionChannels = () => {
  const { data: channels, isLoading } = useAcquisitionChannels();
  const maxCustomers = channels ? Math.max(...channels.map(c => c.customers)) : 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="rounded-xl border border-border gradient-card shadow-card p-6"
    >
      <h3 className="text-sm font-medium text-muted-foreground tracking-wide uppercase mb-6">Acquisition Channels</h3>
      {isLoading ? (
        <div className="space-y-4">
          {[1,2,3,4].map(i => <div key={i} className="h-8 bg-secondary/40 rounded animate-pulse" />)}
        </div>
      ) : (
        <div className="space-y-4">
          {channels?.map((channel, i) => (
            <div key={channel.name} className="group">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm text-foreground">{channel.name}</span>
                <div className="flex items-center gap-4">
                  <span className="text-xs font-mono text-muted-foreground">{channel.customers} customers</span>
                  <span className="text-xs font-mono text-muted-foreground">${channel.cac.toLocaleString()} CAC</span>
                </div>
              </div>
              <div className="h-2 rounded-full bg-secondary overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(channel.customers / maxCustomers) * 100}%` }}
                  transition={{ duration: 0.8, delay: 0.6 + i * 0.05 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: channel.color }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default AcquisitionChannels;
