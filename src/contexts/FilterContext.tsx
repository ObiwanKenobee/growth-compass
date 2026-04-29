import { createContext, useContext, useState, ReactNode } from "react";

export type DateRange = "1m" | "3m" | "6m" | "12m";
export type Segment = "all" | "governments" | "climate-funds" | "corporations" | "ngos" | "research";
export type Channel = "all" | "partnerships" | "institutions" | "outreach" | "research-collab" | "developer" | "events";

const DEFAULT_DATE_RANGE: DateRange = "6m";
const DEFAULT_SEGMENT: Segment = "all";
const DEFAULT_CHANNEL: Channel = "all";

interface FilterState {
  dateRange: DateRange;
  segment: Segment;
  channel: Channel;
  setDateRange: (v: DateRange) => void;
  setSegment: (v: Segment) => void;
  setChannel: (v: Channel) => void;
  reset: () => void;
  isDefault: boolean;
}

const FilterContext = createContext<FilterState | null>(null);

export const useFilters = () => {
  const ctx = useContext(FilterContext);
  if (!ctx) throw new Error("useFilters must be used within FilterProvider");
  return ctx;
};

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [dateRange, setDateRange] = useState<DateRange>(DEFAULT_DATE_RANGE);
  const [segment, setSegment] = useState<Segment>(DEFAULT_SEGMENT);
  const [channel, setChannel] = useState<Channel>(DEFAULT_CHANNEL);

  const reset = () => {
    setDateRange(DEFAULT_DATE_RANGE);
    setSegment(DEFAULT_SEGMENT);
    setChannel(DEFAULT_CHANNEL);
  };

  const isDefault =
    dateRange === DEFAULT_DATE_RANGE && segment === DEFAULT_SEGMENT && channel === DEFAULT_CHANNEL;

  return (
    <FilterContext.Provider value={{ dateRange, setDateRange, segment, setSegment, channel, setChannel, reset, isDefault }}>
      {children}
    </FilterContext.Provider>
  );
};
