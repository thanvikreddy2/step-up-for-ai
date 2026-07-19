"use client";

import React from "react";
import { Startup } from "@/types";
import { useDashboard } from "@/context/DashboardContext";

interface SplitCardListProps {
  filteredPitches: Startup[];
}

const SplitCardList: React.FC<SplitCardListProps> = ({ filteredPitches }) => {
  const {
    selectedStartup,
    setSelectedStartup,
    shortlistedIds,
    toggleShortlist,
    clearAllFilters,
    formatAskAmount
  } = useDashboard();

  return (
    <section
      style={{
        flex: "0 0 350px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        overflowY: "auto",
        boxSizing: "border-box"
      }}
    >
      {filteredPitches.length > 0 ? (
        filteredPitches.map((startup) => {
          const isStartupShortlisted = shortlistedIds.includes(startup.id);
          const active = selectedStartup?.id === startup.id;

          let startupDisplayStatus = startup.status;
          if (isStartupShortlisted) {
            startupDisplayStatus = "Shortlisted";
          } else if (startup.status === "Shortlisted") {
            startupDisplayStatus = "Under Review";
          }

          let startupBadgeClass = "new";
          if (startupDisplayStatus === "Under Review") startupBadgeClass = "review";
          if (startupDisplayStatus === "Shortlisted") startupBadgeClass = "shortlisted";

          return (
            <article
              key={startup.id}
              onClick={() => setSelectedStartup(startup)}
              className={`pitch-card glass-card ${active ? "active-split-card" : ""}`}
              style={{
                padding: "16px",
                cursor: "pointer",
                border: active ? "1px solid var(--accent)" : "1px solid var(--border-color)",
                background: active ? "rgba(47, 191, 100, 0.05)" : "var(--card-bg)",
                transition: "all var(--transition-fast)",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                borderRadius: "12px"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      background: startup.logoBg,
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.9rem",
                      fontWeight: 800,
                      color: "#ffffff"
                    }}
                  >
                    {startup.logoText}
                  </div>
                  <div>
                    <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#ffffff", margin: "0 0 2px 0" }}>
                      {startup.name}
                    </h4>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "4px" }}>
                      <i className="fa-solid fa-location-dot"></i> {startup.location || "Remote"}
                    </span>
                  </div>
                </div>
                <span className={`status-badge ${startupBadgeClass}`} style={{ fontSize: "0.65rem", padding: "2px 8px" }}>
                  {startupDisplayStatus}
                </span>
              </div>

              <p
                style={{
                  fontSize: "0.8rem",
                  color: "var(--text-secondary)",
                  lineHeight: "1.4",
                  margin: 0,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical"
                }}
              >
                {startup.tagline}
              </p>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: "8px", marginTop: "2px" }}>
                <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--accent)" }}>
                  {formatAskAmount(startup.ask)} ask
                </span>
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <span className="tag" style={{ fontSize: "0.7rem", padding: "2px 6px" }}>{startup.stage}</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleShortlist(startup.id);
                    }}
                    className={`bookmark-btn ${isStartupShortlisted ? "active" : ""}`}
                    style={{ width: "28px", height: "28px", padding: 0, fontSize: "0.75rem" }}
                    aria-label="Bookmark"
                  >
                    <i className={`fa-${isStartupShortlisted ? "solid" : "regular"} fa-bookmark`}></i>
                  </button>
                </div>
              </div>
            </article>
          );
        })
      ) : (
        <div className="glass-card" style={{ padding: "30px 20px", textAlign: "center", border: "1px solid var(--border-color)", borderRadius: "12px" }}>
          <i className="fa-solid fa-folder-open" style={{ fontSize: "2rem", color: "var(--text-secondary)", marginBottom: "12px" }}></i>
          <h4 style={{ margin: "0 0 6px 0", fontSize: "0.95rem" }}>No pitches match filters</h4>
          <button className="btn btn-secondary" onClick={clearAllFilters} style={{ padding: "6px 12px", fontSize: "0.75rem", marginTop: "10px" }}>
            Clear Filters
          </button>
        </div>
      )}
    </section>
  );
};

export default SplitCardList;
