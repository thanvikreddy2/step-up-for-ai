"use client";

import React from "react";
import { useDashboard } from "@/context/DashboardContext";

const FilterBar: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    sectorFilter,
    setSectorFilter,
    stageFilter,
    setStageFilter,
    shortlistFilter,
    setShortlistFilter,
    sortOrder,
    setSortOrder,
    clearAllFilters,
    getFilteredPitches
  } = useDashboard();

  const filteredPitches = getFilteredPitches();

  return (
    <div className="filter-bar glass-card">
      <div className="filter-input-group search-group">
        <i className="fa-solid fa-magnifying-glass search-icon"></i>
        <input
          type="text"
          id="searchBar"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search startups..."
          aria-label="Search startups"
        />
      </div>

      <div className="filter-input-group">
        <select
          id="sectorFilter"
          value={sectorFilter}
          onChange={(e) => setSectorFilter(e.target.value)}
          aria-label="Filter by Sector"
        >
          <option value="all">All Sectors</option>
          <option value="fintech">Fintech</option>
          <option value="healthtech">Healthtech</option>
          <option value="climate">Climate Tech</option>
          <option value="edtech">Edtech</option>
          <option value="ai-ml">AI / ML</option>
          <option value="saas">SaaS</option>
        </select>
      </div>

      <div className="filter-input-group">
        <select
          id="stageFilter"
          value={stageFilter}
          onChange={(e) => setStageFilter(e.target.value)}
          aria-label="Filter by Funding Stage"
        >
          <option value="all">All Stages</option>
          <option value="Pre-seed">Pre-seed</option>
          <option value="Seed">Seed</option>
          <option value="Series A">Series A</option>
          <option value="Series B+">Series B+</option>
        </select>
      </div>

      <div className="filter-input-group">
        <select
          id="shortlistFilter"
          value={shortlistFilter}
          onChange={(e) => setShortlistFilter(e.target.value)}
          aria-label="Filter by Shortlist"
        >
          <option value="all">All Pitches</option>
          <option value="shortlisted">Shortlisted Only</option>
        </select>
      </div>

      <div className="filter-input-group">
        <select
          id="sortOrder"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          aria-label="Sort Pitches"
        >
          <option value="newest">Newest Submitted</option>
          <option value="oldest">Oldest Submitted</option>
          <option value="highest-ask">Highest Ask</option>
          <option value="lowest-ask">Lowest Ask</option>
        </select>
      </div>

      <div className="filter-actions">
        <span className="results-count" id="resultsCount">
          {filteredPitches.length} Results
        </span>
        <button
          className="btn-clear-filters"
          onClick={clearAllFilters}
          id="btnClearFilters"
        >
          Clear All
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
