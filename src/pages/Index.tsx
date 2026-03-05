import { FilterProvider } from "@/contexts/FilterContext";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardFilters from "@/components/dashboard/DashboardFilters";
import GrowthRadar from "@/components/dashboard/GrowthRadar";
import UnitEconomics from "@/components/dashboard/UnitEconomics";
import AcquisitionChannels from "@/components/dashboard/AcquisitionChannels";
import CustomerSegments from "@/components/dashboard/CustomerSegments";
import RetentionCohort from "@/components/dashboard/RetentionCohort";
import CustomerFunnel from "@/components/dashboard/CustomerFunnel";
import ExpansionRevenue from "@/components/dashboard/ExpansionRevenue";
import StrategicIntel from "@/components/dashboard/StrategicIntel";

const Index = () => {
  return (
    <FilterProvider>
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <DashboardHeader />
          <DashboardFilters />
          <GrowthRadar />
          <UnitEconomics />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <AcquisitionChannels />
            <CustomerSegments />
          </div>
          <RetentionCohort />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <CustomerFunnel />
            <ExpansionRevenue />
          </div>
          <StrategicIntel />
        </div>
      </div>
    </FilterProvider>
  );
};

export default Index;
