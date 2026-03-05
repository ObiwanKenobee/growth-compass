import { createContext, useContext, useState, ReactNode } from "react";

export type DateRange = "1m" | "3m" | "6m" | "12m";
export type Segment = "all" | "governments" | "climate-funds" | "corporations" | "ngos" | "research";
export type Channel = "all" | "partnerships" | "institutions" | "outreach" | "research-collab" | "developer" | "events";

interface FilterState {
  dateRange: DateRange;
  segment: Segment;
  channel: Channel;
  setDateRange: (v: DateRange) => void;
  setSegment: (v: Segment) => void;
  setChannel: (v: Channel) => void;
}

const FilterContext = createContext<FilterState | null>(null);

export const useFilters = () => {
  const ctx = useContext(FilterContext);
  if (!ctx) throw new Error("useFilters must be used within FilterProvider");
  return ctx;
};

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [dateRange, setDateRange] = useState<DateRange>("6m");
  const [segment, setSegment] = useState<Segment>("all");
  const [channel, setChannel] = useState<Channel>("all");

  return (
    <FilterContext.Provider value={{ dateRange, setDateRange, segment, setSegment, channel, setChannel }}>
      {children}
    </FilterContext.Provider>
  );
};
