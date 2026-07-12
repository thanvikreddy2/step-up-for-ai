"use client";

import React from "react";
import { useDashboard } from "@/context/DashboardContext";

const StatsStrip: React.FC = () => {
  const { allPitches, shortlistedIds, isNewThisWeek } = useDashboard();

  const totalPitchesCount = allPitches.length;
  const newPitchesCount = allPitches.filter((s) => isNewThisWeek(s.submittedDate)).length;
  const shortlistedPitchesCount = shortlistedIds.length;

  return (
    <div className="summary-strip">
      <div className="stat-card glass-card">
        <div className="stat-icon-wrapper text-green">
          <i className="fa-solid fa-folder-open"></i>
        </div>
        <div className="stat-info">
          <h3 id="stat-total-pitches">{totalPitchesCount}</h3>
          <p>Total Pitches</p>
        </div>
      </div>
      <div className="stat-card glass-card">
        <div className="stat-icon-wrapper text-gold">
          <i className="fa-solid fa-fire-flame-curved"></i>
        </div>
        <div className="stat-info">
          <h3 id="stat-new-pitches">{newPitchesCount}</h3>
          <p>New This Week</p>
        </div>
      </div>
      <div className="stat-card glass-card">
        <div className="stat-icon-wrapper text-blue">
          <i className="fa-solid fa-bookmark"></i>
        </div>
        <div className="stat-info">
          <h3 id="stat-shortlisted-pitches">{shortlistedPitchesCount}</h3>
          <p>Your Shortlist</p>
        </div>
      </div>
    </div>
  );
};

export default StatsStrip;
