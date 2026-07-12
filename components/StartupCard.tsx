"use client";

import React from "react";
import { Startup } from "@/types";
import { useDashboard } from "@/context/DashboardContext";

interface StartupCardProps {
  startup: Startup;
}

const StartupCard: React.FC<StartupCardProps> = ({ startup }) => {
  const {
    shortlistedIds,
    selectedStartup,
    modalMode,
    isModalOpen,
    openPitchModal,
    closePitchModal,
    toggleShortlist,
    formatAskAmount
  } = useDashboard();

  const isStartupShortlisted = shortlistedIds.includes(startup.id);

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
      className="pitch-card glass-card"
      tabIndex={0}
      aria-label={`${startup.name} startup card. Sector: ${startup.sectorLabel}. Stage: ${startup.stage}. Funding Ask: ${formatAskAmount(startup.ask)}`}
    >
      <div className="card-main-info">
        <div className="card-title-row">
          <h3>{startup.name}</h3>
          <span className={`status-badge ${startupBadgeClass}`}>{startupDisplayStatus}</span>
        </div>
        <p className="card-tagline">{startup.tagline}</p>
        <div className="card-tags">
          <span className="tag">{startup.sectorLabel}</span>
          <span className="tag">{startup.stage}</span>
        </div>
      </div>

      <div className="card-metrics-col">
        <div className="metric-label">Funding Ask</div>
        <div className="metric-value">{formatAskAmount(startup.ask)}</div>
        <span className="submission-date">Submitted: {startup.submittedDate}</span>
      </div>

      <div className="card-actions-col">
        <div className="card-checkboxes">
          <label className="custom-checkbox">
            <input
              type="checkbox"
              className="cb-view-pitch"
              checked={
                selectedStartup?.id === startup.id && modalMode === "pitch" && isModalOpen
              }
              onChange={(e) => {
                if (e.target.checked) {
                  openPitchModal(startup, "pitch");
                } else {
                  closePitchModal();
                }
              }}
              aria-label="Check to view full pitch details"
            />
            <span className="checkbox-box">
              <i className="fa-solid fa-check"></i>
            </span>
            <span className="checkbox-label">More Details</span>
          </label>
          <label className="custom-checkbox">
            <input
              type="checkbox"
              className="cb-view-contact"
              checked={
                selectedStartup?.id === startup.id && modalMode === "contact" && isModalOpen
              }
              onChange={(e) => {
                if (e.target.checked) {
                  openPitchModal(startup, "contact");
                } else {
                  closePitchModal();
                }
              }}
              aria-label="Check to view owner contact details"
            />
            <span className="checkbox-box">
              <i className="fa-solid fa-check"></i>
            </span>
            <span className="checkbox-label">Contact Details</span>
          </label>
        </div>

        <div
          className="card-footer-actions"
          style={{ display: "flex", gap: "10px", alignItems: "center" }}
        >
          <button
            className="btn-pitch-deck-action"
            onClick={() => openPitchModal(startup, "deck")}
            style={{
              padding: "6px 12px",
              borderRadius: "8px",
              background: "rgba(47, 191, 100, 0.1)",
              border: "1px solid rgba(47, 191, 100, 0.2)",
              color: "var(--accent)",
              fontSize: "0.8rem",
              fontWeight: 600,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              transition: "all var(--transition-fast)"
            }}
          >
            <i className="fa-solid fa-file-pdf"></i>
            <span>Pitch Deck</span>
          </button>
          <button
            className={`bookmark-btn ${isStartupShortlisted ? "active" : ""}`}
            onClick={() => toggleShortlist(startup.id)}
            aria-label={isStartupShortlisted ? "Remove from shortlist" : "Add to shortlist"}
            title={isStartupShortlisted ? "Remove from Shortlist" : "Add to Shortlist"}
          >
            <i className={`fa-${isStartupShortlisted ? "solid" : "regular"} fa-bookmark`}></i>
          </button>
        </div>
      </div>
    </article>
  );
};

export default StartupCard;
