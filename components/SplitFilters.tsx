"use client";

import React from "react";
import { useDashboard } from "@/context/DashboardContext";
import { SECTORS } from "@/lib/mockData";

interface SplitFiltersProps {
  filteredCount: number;
}

const SplitFilters: React.FC<SplitFiltersProps> = ({ filteredCount }) => {
  const {
    allPitches,
    companyFilter,
    setCompanyFilter,
    locationFilter,
    setLocationFilter,
    sectorFilter,
    setSectorFilter,
    stageFilter,
    setStageFilter,
    ratingFilter,
    setRatingFilter,
    searchQuery,
    setSearchQuery,
    clearAllFilters
  } = useDashboard();

  // Dynamic filter values
  const uniqueLocations = Array.from(
    new Set(allPitches.map((s) => s.location).filter(Boolean))
  );
  
  const uniqueCompanies = allPitches.map((s) => ({ id: s.id, name: s.name }));

  return (
    <aside
      className="glass-card"
      style={{
        flex: "0 0 260px",
        display: "flex",
        flexDirection: "column",
        gap: "18px",
        padding: "20px",
        height: "100%",
        overflowY: "auto",
        border: "1px solid var(--border-color)",
        borderRadius: "12px",
        background: "rgba(9, 15, 27, 0.5)"
      }}
    >
      <div style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.06)", paddingBottom: "10px" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#ffffff", margin: 0 }}>Explore Companies</h2>
        <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
          {filteredCount} results found
        </span>
      </div>

      {/* Company */}
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-secondary)", textTransform: "uppercase" }}>
          Company
        </label>
        <select
          value={companyFilter}
          onChange={(e) => setCompanyFilter(e.target.value)}
          style={{
            padding: "8px 12px",
            background: "rgba(255, 255, 255, 0.02)",
            border: "1px solid var(--border-color)",
            borderRadius: "8px",
            color: "#ffffff",
            fontSize: "0.85rem",
            outline: "none"
          }}
        >
          <option value="all" style={{ background: "#0b0f19" }}>Select a company</option>
          {uniqueCompanies.map((c) => (
            <option key={c.id} value={c.id} style={{ background: "#0b0f19" }}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Location */}
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-secondary)", textTransform: "uppercase" }}>
          Location
        </label>
        <select
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          style={{
            padding: "8px 12px",
            background: "rgba(255, 255, 255, 0.02)",
            border: "1px solid var(--border-color)",
            borderRadius: "8px",
            color: "#ffffff",
            fontSize: "0.85rem",
            outline: "none"
          }}
        >
          <option value="all" style={{ background: "#0b0f19" }}>Select a location</option>
          {uniqueLocations.map((loc) => (
            <option key={loc} value={loc} style={{ background: "#0b0f19" }}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      {/* Industries */}
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-secondary)", textTransform: "uppercase" }}>
          Industries
        </label>
        <select
          value={sectorFilter}
          onChange={(e) => setSectorFilter(e.target.value)}
          style={{
            padding: "8px 12px",
            background: "rgba(255, 255, 255, 0.02)",
            border: "1px solid var(--border-color)",
            borderRadius: "8px",
            color: "#ffffff",
            fontSize: "0.85rem",
            outline: "none"
          }}
        >
          <option value="all" style={{ background: "#0b0f19" }}>All Industries</option>
          {SECTORS.map((s) => (
            <option key={s.value} value={s.value} style={{ background: "#0b0f19" }}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      {/* Funding Stage */}
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-secondary)", textTransform: "uppercase" }}>
          Funding Stage
        </label>
        <select
          value={stageFilter}
          onChange={(e) => setStageFilter(e.target.value)}
          style={{
            padding: "8px 12px",
            background: "rgba(255, 255, 255, 0.02)",
            border: "1px solid var(--border-color)",
            borderRadius: "8px",
            color: "#ffffff",
            fontSize: "0.85rem",
            outline: "none"
          }}
        >
          <option value="all" style={{ background: "#0b0f19" }}>All Stages</option>
          <option value="Pre-seed" style={{ background: "#0b0f19" }}>Pre-seed</option>
          <option value="Seed" style={{ background: "#0b0f19" }}>Seed</option>
          <option value="Series A" style={{ background: "#0b0f19" }}>Series A</option>
          <option value="Series B+" style={{ background: "#0b0f19" }}>Series B+</option>
        </select>
      </div>

      {/* Conviction Rating */}
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-secondary)", textTransform: "uppercase" }}>
          Conviction Rating
        </label>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "4px" }}>
          {[4.0, 3.0, 2.0].map((stars) => {
            const active = ratingFilter === stars;
            return (
              <button
                key={stars}
                type="button"
                onClick={() => setRatingFilter(active ? 0 : stars)}
                style={{
                  background: active ? "rgba(47, 191, 100, 0.15)" : "transparent",
                  border: "1px solid " + (active ? "var(--accent)" : "rgba(255,255,255,0.06)"),
                  borderRadius: "6px",
                  padding: "6px 10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  color: active ? "#ffffff" : "var(--text-secondary)",
                  cursor: "pointer",
                  fontSize: "0.8rem",
                  transition: "all var(--transition-fast)"
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <i
                      key={i}
                      className={`fa-solid fa-star ${i < stars ? "text-gold" : "text-gray"}`}
                      style={{ fontSize: "0.7rem", color: i < stars ? "#f59e0b" : "rgba(255,255,255,0.15)" }}
                    ></i>
                  ))}
                </span>
                <span style={{ fontWeight: 600 }}>& Up</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Keywords */}
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-secondary)", textTransform: "uppercase" }}>
          Keywords
        </label>
        <div style={{ position: "relative" }}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search details..."
            style={{
              width: "100%",
              padding: "8px 12px 8px 30px",
              background: "rgba(255, 255, 255, 0.02)",
              border: "1px solid var(--border-color)",
              borderRadius: "8px",
              color: "#ffffff",
              fontSize: "0.85rem",
              outline: "none"
            }}
          />
          <i
            className="fa-solid fa-magnifying-glass"
            style={{
              position: "absolute",
              left: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: "0.75rem",
              color: "var(--text-secondary)"
            }}
          ></i>
        </div>
      </div>

      {/* Reset */}
      <button
        onClick={clearAllFilters}
        className="btn btn-secondary"
        style={{ width: "100%", padding: "8px", marginTop: "auto", fontSize: "0.8rem", fontWeight: 600 }}
      >
        Reset Filters
      </button>
    </aside>
  );
};

export default SplitFilters;
