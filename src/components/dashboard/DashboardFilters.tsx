import { motion } from "framer-motion";
import { Calendar, Users, Megaphone, RotateCcw } from "lucide-react";
import { useFilters, DateRange, Segment, Channel } from "@/contexts/FilterContext";

const dateRangeOptions: { value: DateRange; label: string }[] = [
  { value: "1m", label: "1M" },
  { value: "3m", label: "3M" },
  { value: "6m", label: "6M" },
  { value: "12m", label: "12M" },
];

const segmentOptions: { value: Segment; label: string }[] = [
  { value: "all", label: "All Segments" },
  { value: "governments", label: "Governments" },
  { value: "climate-funds", label: "Climate Funds" },
  { value: "corporations", label: "Corporations" },
  { value: "ngos", label: "NGOs" },
  { value: "research", label: "Research" },
];

const channelOptions: { value: Channel; label: string }[] = [
  { value: "all", label: "All Channels" },
  { value: "partnerships", label: "Partnerships" },
  { value: "institutions", label: "Institutions" },
  { value: "outreach", label: "Direct Outreach" },
  { value: "research-collab", label: "Research" },
  { value: "developer", label: "Developer" },
  { value: "events", label: "Events" },
];

interface PillGroupProps<T extends string> {
  options: { value: T; label: string }[];
  selected: T;
  onChange: (v: T) => void;
  icon: React.ReactNode;
}

function PillGroup<T extends string>({ options, selected, onChange, icon }: PillGroupProps<T>) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-muted-foreground">{icon}</span>
      <div className="flex gap-1 flex-wrap">
        {options.map(opt => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              selected === opt.value
                ? "bg-primary text-primary-foreground"
                : "bg-secondary/60 text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

const DashboardFilters = () => {
  const { dateRange, setDateRange, segment, setSegment, channel, setChannel, reset, isDefault } = useFilters();

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      className="rounded-xl border border-border gradient-card p-4 flex flex-col gap-3"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-3 flex-1 min-w-0">
          <PillGroup options={dateRangeOptions} selected={dateRange} onChange={setDateRange} icon={<Calendar className="w-3.5 h-3.5" />} />
          <PillGroup options={segmentOptions} selected={segment} onChange={setSegment} icon={<Users className="w-3.5 h-3.5" />} />
          <PillGroup options={channelOptions} selected={channel} onChange={setChannel} icon={<Megaphone className="w-3.5 h-3.5" />} />
        </div>
        <button
          onClick={reset}
          disabled={isDefault}
          title="Reset filters to defaults"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary/60 border border-border text-xs text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
        >
          <RotateCcw className="w-3 h-3" /> Reset
        </button>
      </div>
    </motion.div>
  );
};

export default DashboardFilters;
