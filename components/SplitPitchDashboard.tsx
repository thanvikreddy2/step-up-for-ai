"use client";

import React from "react";
import { useDashboard } from "@/context/DashboardContext";
import SplitFilters from "./SplitFilters";
import SplitCardList from "./SplitCardList";
import SplitDetailsView from "./SplitDetailsView";

interface SplitPitchDashboardProps {
  forcedShortlisted?: boolean;
}

const SplitPitchDashboard: React.FC<SplitPitchDashboardProps> = ({ forcedShortlisted = false }) => {
  const { getFilteredPitches } = useDashboard();
  
  const filteredPitches = getFilteredPitches(forcedShortlisted);

  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        height: "calc(100vh - 120px)",
        minHeight: "550px",
        width: "100%",
        boxSizing: "border-box",
        animation: "fadeIn 0.3s ease"
      }}
    >
      {/* 1. Left Vertical Filters Column */}
      <SplitFilters filteredCount={filteredPitches.length} />

      {/* 2. Middle Scrollable Cards List */}
      <SplitCardList filteredPitches={filteredPitches} />

      {/* 3. Right Startup Details view pane */}
      <SplitDetailsView />
    </div>
  );
};

export default SplitPitchDashboard;
