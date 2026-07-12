"use client";

import React from "react";
import { useDashboard } from "@/context/DashboardContext";
import StartupCard from "./StartupCard";

const StartupGrid: React.FC = () => {
  const { getFilteredPitches, clearAllFilters } = useDashboard();

  const filteredPitches = getFilteredPitches();

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
          paddingBottom: "16px"
        }}
      >
        <span
          className="results-count"
          style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}
        >
          {filteredPitches.length} Startups Found
        </span>
      </div>

      {filteredPitches.length > 0 ? (
        <div className="pitch-grid" id="pitchGrid">
          {filteredPitches.map((startup) => (
            <StartupCard key={startup.id} startup={startup} />
          ))}
        </div>
      ) : (
        <div className="empty-state" id="emptyState">
          <i className="fa-solid fa-folder-open empty-icon"></i>
          <h3>No startups match your search</h3>
          <p>Try clearing some filters or searching for something else.</p>
          <button
            className="btn btn-secondary"
            onClick={clearAllFilters}
            id="emptyStateReset"
          >
            Clear Filters
          </button>
        </div>
      )}
    </>
  );
};

export default StartupGrid;
