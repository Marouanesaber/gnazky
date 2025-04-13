
import React from "react";
import { Filter, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DashboardHeaderProps {
  selectedTimeRange: string;
  setSelectedTimeRange: (value: string) => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  selectedTimeRange,
  setSelectedTimeRange,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Shop Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your orders and view product performance.
        </p>
      </div>
      
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
          <SelectTrigger className="h-8 w-[160px] text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Today">Today</SelectItem>
            <SelectItem value="Yesterday">Yesterday</SelectItem>
            <SelectItem value="Last 7 days">Last 7 days</SelectItem>
            <SelectItem value="This Month">This Month</SelectItem>
            <SelectItem value="Last Month">Last Month</SelectItem>
            <SelectItem value="This Year">This Year</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" size="sm" className="h-8 gap-1 text-xs">
          <Filter className="h-3.5 w-3.5" />
          Filter
          <ChevronDown className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
};
