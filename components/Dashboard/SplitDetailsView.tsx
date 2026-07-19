"use client";

import React from "react";
import { useDashboard } from "@/context/DashboardContext";
import { getPitchDeckDetails } from "@/lib/pitchDeckData";
import { downloadPitchDeckPDF } from "@/lib/pdfGenerator";
import { formatAskAmount, formatLakhs } from "@/lib/utils";
import InlineSlideshow from "../DealRoom/InlineSlideshow";
import OverviewTab from "../DealRoom/OverviewTab";
import DataRoomTab from "../DealRoom/DataRoomTab";
import CapTableTab from "../DealRoom/CapTableTab";
import NotesTab from "../DealRoom/NotesTab";

const SplitDetailsView: React.FC = () => {
  const {
    selectedStartup,
    shortlistedIds,
    toggleShortlist,
    isDeckToggled,
    setIsDeckToggled,
    currentSlide,
    setCurrentSlide,
    activeTab,
    setActiveTab,
    startupRatings,
    startupNotes,
    updateRating,
    updateNotes,
    showToast
  } = useDashboard();

  if (!selectedStartup) {
    return (
      <main
        className="glass-card"
        style={{
          flex: 1,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid var(--border-color)",
          borderRadius: "12px",
          background: "rgba(9, 15, 27, 0.75)",
          padding: "24px",
          color: "var(--text-secondary)"
        }}
      >
        <i className="fa-solid fa-briefcase" style={{ fontSize: "3rem", marginBottom: "16px", color: "rgba(255,255,255,0.06)" }}></i>
        <h3 style={{ margin: "0 0 4px 0", fontSize: "1.1rem" }}>Select a Startup Pitch</h3>
        <p style={{ margin: 0, fontSize: "0.85rem" }}>Click on a startup from the middle list to view its full interactive deal room.</p>
      </main>
    );
  }

  const isShortlisted = shortlistedIds.includes(selectedStartup.id);
  const deck = getPitchDeckDetails(selectedStartup);

  const handlePDF = () => {
    downloadPitchDeckPDF(selectedStartup, deck, showToast);
  };

  return (
    <main
      className="glass-card"
      style={{
        flex: 1,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        border: "1px solid var(--border-color)",
        borderRadius: "12px",
        background: "rgba(9, 15, 27, 0.75)",
        padding: "24px",
        boxSizing: "border-box"
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "20px", width: "100%" }}>
        {/* Header info row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", paddingBottom: "16px" }}>
          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <div
              style={{
                width: "56px",
                height: "56px",
                background: selectedStartup.logoBg,
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.3rem",
                fontWeight: 800,
                color: "#ffffff"
              }}
            >
              {selectedStartup.logoText}
            </div>
            <div>
              <h3 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#ffffff", margin: "0 0 4px 0" }}>
                {selectedStartup.name}
              </h3>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                <span style={{ background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.1)", padding: "2px 8px", borderRadius: "100px", fontSize: "0.7rem", color: "rgba(255, 255, 255, 0.7)" }}>
                  {selectedStartup.sectorLabel}
                </span>
                <span style={{ background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.1)", padding: "2px 8px", borderRadius: "100px", fontSize: "0.7rem", color: "rgba(255, 255, 255, 0.7)" }}>
                  {selectedStartup.stage}
                </span>
                <span style={{ background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.1)", padding: "2px 8px", borderRadius: "100px", fontSize: "0.7rem", color: "rgba(255, 255, 255, 0.7)" }}>
                  <i className="fa-solid fa-location-dot" style={{ marginRight: "4px" }}></i> {selectedStartup.location || "Remote"}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <button
              onClick={() => setIsDeckToggled(!isDeckToggled)}
              className="btn btn-secondary"
              style={{
                padding: "8px 12px",
                fontSize: "0.75rem",
                fontWeight: 600,
                background: isDeckToggled ? "rgba(47, 191, 100, 0.15)" : "rgba(255,255,255,0.03)",
                border: isDeckToggled ? "1px solid var(--accent)" : "1px solid var(--border-color)",
                color: isDeckToggled ? "var(--accent)" : "#ffffff"
              }}
            >
              <i className="fa-solid fa-file-pdf" style={{ marginRight: "6px" }}></i>
              {isDeckToggled ? "Close Slides" : "Pitch Deck"}
            </button>
            <button
              onClick={() => toggleShortlist(selectedStartup.id)}
              className={`bookmark-btn ${isShortlisted ? "active" : ""}`}
              style={{ width: "32px", height: "32px", padding: 0 }}
              title={isShortlisted ? "Remove from Shortlist" : "Add to Shortlist"}
            >
              <i className={`fa-${isShortlisted ? "solid" : "regular"} fa-bookmark`}></i>
            </button>
          </div>
        </div>

        {/* Inline presentation or normal tabbed view */}
        {isDeckToggled ? (
          <InlineSlideshow
            startup={selectedStartup}
            deck={deck}
            currentSlide={currentSlide}
            setCurrentSlide={setCurrentSlide}
            onDownloadPDF={handlePDF}
          />
        ) : (
          <>
            {/* Startup description */}
            <div>
              <h4 style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px", marginTop: 0 }}>
                Startup Description
              </h4>
              <p style={{ fontSize: "0.9rem", color: "rgba(255, 255, 255, 0.75)", lineHeight: "1.5", margin: 0 }}>
                {selectedStartup.description}
              </p>
            </div>

            {/* Founder brief profile */}
            <div style={{ background: "rgba(47, 191, 100, 0.02)", border: "1px solid rgba(47, 191, 100, 0.1)", borderRadius: "8px", padding: "12px" }}>
              <h4 style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px", marginTop: 0 }}>
                Founder Profile
              </h4>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
                <div>
                  <h5 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#ffffff", margin: "0 0 2px 0" }}>{selectedStartup.founder}</h5>
                  <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", margin: 0 }}>CEO & Co-founder, {selectedStartup.name}</p>
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                  <a href={`mailto:${selectedStartup.email}`} className="founder-btn" style={{ padding: "6px 10px", fontSize: "0.75rem", background: "rgba(255, 255, 255, 0.02)", border: "1px solid var(--border-color)", borderRadius: "6px", color: "#ffffff", textDecoration: "none", display: "inline-flex", gap: "4px", alignItems: "center" }}>
                    <i className="fa-solid fa-envelope"></i> <span>Email</span>
                  </a>
                  <a href={selectedStartup.linkedin} target="_blank" rel="noopener noreferrer" className="founder-btn" style={{ padding: "6px 10px", fontSize: "0.75rem", background: "rgba(255, 255, 255, 0.02)", border: "1px solid var(--border-color)", borderRadius: "6px", color: "#ffffff", textDecoration: "none", display: "inline-flex", gap: "4px", alignItems: "center" }}>
                    <i className="fa-brands fa-linkedin"></i> <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Tab selection row */}
            <div style={{ display: "flex", background: "rgba(255, 255, 255, 0.02)", borderRadius: "8px", padding: "2px", border: "1px solid rgba(255, 255, 255, 0.06)", justifyContent: "space-between" }}>
              {[
                { id: "overview", label: "Overview" },
                { id: "dataroom", label: "Data Room" },
                { id: "captable", label: "Cap Table" },
                { id: "notes", label: "Thesis Notes" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  style={{
                    flex: 1,
                    padding: "5px 2px",
                    borderRadius: "6px",
                    border: "none",
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all var(--transition-fast)",
                    background: activeTab === tab.id ? "#10b981" : "transparent",
                    color: activeTab === tab.id ? "#030712" : "rgba(255, 255, 255, 0.6)"
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab content boxes */}
            <div style={{ minHeight: "180px" }}>
              {activeTab === "overview" && (
                <OverviewTab
                  startup={selectedStartup}
                  startupRatings={startupRatings}
                  updateRating={updateRating}
                  formatAskAmount={formatAskAmount}
                  formatLakhs={formatLakhs}
                />
              )}

              {activeTab === "dataroom" && (
                <DataRoomTab
                  startup={selectedStartup}
                  showToast={showToast}
                />
              )}

              {activeTab === "captable" && <CapTableTab />}

              {activeTab === "notes" && (
                <NotesTab
                  startup={selectedStartup}
                  startupNotes={startupNotes}
                  updateNotes={updateNotes}
                />
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default SplitDetailsView;
