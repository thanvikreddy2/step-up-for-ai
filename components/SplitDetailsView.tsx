"use client";

import React from "react";
import { useDashboard } from "@/context/DashboardContext";
import { getPitchDeckDetails } from "@/lib/pitchDeckData";
import { downloadPitchDeckPDF } from "@/lib/pdfGenerator";
import InlineSlideshow from "./InlineSlideshow";

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
    showToast,
    formatAskAmount,
    formatLakhs
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

  const currentStartupRating = startupRatings[selectedStartup.id] || { pedigree: 4.0, tailwinds: 4.2, moat: 4.5 };
  const currentAverageRating =
    (currentStartupRating.pedigree + currentStartupRating.tailwinds + currentStartupRating.moat) / 3;

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

        {/* Presentation slide deck inline or Normal detailed view */}
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

            {/* Horizontal Tabs */}
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

            {/* Render Tab Contents */}
            <div style={{ minHeight: "180px" }}>
              {/* OVERVIEW TAB */}
              {activeTab === "overview" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", background: "rgba(255, 255, 255, 0.01)", border: "1px solid rgba(255, 255, 255, 0.05)", borderRadius: "10px", padding: "12px" }}>
                    <div>
                      <span style={{ fontSize: "0.65rem", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", display: "block", marginBottom: "2px" }}>Funding Ask</span>
                      <strong style={{ fontSize: "1.1rem", color: "#10b981" }}>{formatAskAmount(selectedStartup.ask)}</strong>
                    </div>
                    <div>
                      <span style={{ fontSize: "0.65rem", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", display: "block", marginBottom: "2px" }}>Submitted Date</span>
                      <strong style={{ fontSize: "1.1rem", color: "#ffffff" }}>{selectedStartup.submittedDate}</strong>
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "15px", alignItems: "center" }}>
                    <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "10px", padding: "12px", display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{ position: "relative", width: "46px", height: "46px" }}>
                        <svg width="46" height="46" viewBox="0 0 56 56">
                          <defs>
                            <linearGradient id="emeraldTealGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#10b981" />
                              <stop offset="100%" stopColor="#059669" />
                            </linearGradient>
                          </defs>
                          <circle cx="28" cy="28" r="23" fill="transparent" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="5" />
                          <circle cx="28" cy="28" r="23" fill="transparent" stroke="url(#emeraldTealGrad)" strokeWidth="5"
                                  strokeDasharray="144.5" strokeDashoffset={144.5 * (1 - 0.6)} strokeLinecap="round" transform="rotate(-90 28 28)" />
                        </svg>
                        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", fontSize: "0.7rem", fontWeight: 700, color: "#ffffff" }}>60%</div>
                      </div>
                      <div style={{ fontSize: "0.75rem", lineHeight: 1.3 }}>
                        <div style={{ color: "#ffffff", fontWeight: 600 }}>{formatLakhs(selectedStartup.ask * 0.6)} Vetted</div>
                        <div style={{ color: "rgba(255,255,255,0.4)" }}>{formatLakhs(selectedStartup.ask * 0.4)} Left</div>
                      </div>
                    </div>

                    <div style={{ background: "rgba(16, 185, 129, 0.04)", border: "1px solid rgba(16, 185, 129, 0.2)", borderRadius: "10px", padding: "12px", textAlign: "center" }}>
                      <span style={{ fontSize: "0.65rem", textTransform: "uppercase", color: "#10b981", display: "block", marginBottom: "2px", fontWeight: 600 }}>Conviction Score</span>
                      <strong style={{ fontSize: "1.1rem", color: "#ffffff" }}>{currentAverageRating.toFixed(1)} / 5.0</strong>
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {[
                      { key: "pedigree", label: "Founder Pedigree" },
                      { key: "tailwinds", label: "Market Tailwinds" },
                      { key: "moat", label: "Product Moat" }
                    ].map((m) => {
                      const val = (currentStartupRating as any)[m.key];
                      return (
                        <div key={m.key} style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem" }}>
                            <span style={{ color: "rgba(255,255,255,0.6)" }}>{m.label}</span>
                            <span style={{ color: "#10b981", fontWeight: 700 }}>{val.toFixed(1)} / 5.0</span>
                          </div>
                          <input
                            type="range"
                            min="1"
                            max="5"
                            step="0.1"
                            value={val}
                            onChange={(e) => updateRating(selectedStartup.id, m.key as any, parseFloat(e.target.value))}
                            className="scorecard-slider"
                            style={{ width: "100%", cursor: "pointer" }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* DATA ROOM TAB */}
              {activeTab === "dataroom" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {[
                      { name: `${selectedStartup.name}_PitchDeck_v2.pdf`, size: "4.2 MB", type: "pdf" },
                      { name: `${selectedStartup.name}_Financials.xlsx`, size: "1.8 MB", type: "excel" },
                      { name: `${selectedStartup.name}_CapTable.xlsx`, size: "920 KB", type: "excel" }
                    ].map((asset, idx) => (
                      <div key={idx} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "8px", fontSize: "0.75rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", minWidth: 0 }}>
                          {asset.type === "pdf" ? (
                            <i className="fa-solid fa-file-pdf" style={{ color: "#ef4444", fontSize: "0.9rem" }}></i>
                          ) : (
                            <i className="fa-solid fa-file-excel" style={{ color: "#10b981", fontSize: "0.9rem" }}></i>
                          )}
                          <span style={{ color: "rgba(255,255,255,0.8)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={asset.name}>
                            {asset.name}
                          </span>
                        </div>
                        <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.7rem", flexShrink: 0 }}>{asset.size}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => showToast("Downloading all files as a ZIP archive...", "info")}
                    className="btn btn-secondary"
                    style={{ padding: "8px", fontSize: "0.75rem", fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", color: "#ffffff" }}
                  >
                    <i className="fa-solid fa-file-archive" style={{ color: "#eab308" }}></i>
                    <span>Download All Assets (.zip)</span>
                  </button>
                </div>
              )}

              {/* CAP TABLE TAB */}
              {activeTab === "captable" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "8px", overflow: "hidden" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.75rem", textAlign: "left" }}>
                      <thead>
                        <tr style={{ background: "rgba(255,255,255,0.02)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                          <th style={{ padding: "6px 10px", color: "rgba(255,255,255,0.4)" }}>Shareholder</th>
                          <th style={{ padding: "6px 10px", color: "rgba(255,255,255,0.4)", textAlign: "right" }}>Equity</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { role: "Founders & Team", pct: "65.0%" },
                          { role: "Angel Investors", pct: "15.0%" },
                          { role: "ESOP Option Pool", pct: "15.0%" },
                          { role: "Syndicate Advisors", pct: "5.0%" }
                        ].map((row, index) => (
                          <tr key={index} style={{ borderBottom: index < 3 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                            <td style={{ padding: "6px 10px", color: "rgba(255,255,255,0.7)" }}>{row.role}</td>
                            <td style={{ padding: "6px 10px", color: "#10b981", fontWeight: 700, textAlign: "right" }}>{row.pct}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.35)", lineHeight: 1.3 }}>
                    * Dilution projection modeled post-current Seed round.
                  </span>
                </div>
              )}

              {/* THESIS NOTES TAB */}
              {activeTab === "notes" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <textarea
                    value={startupNotes[selectedStartup.id] || ""}
                    onChange={(e) => updateNotes(selectedStartup.id, e.target.value)}
                    placeholder="Write personal thesis notes, follow-up questions, or investment risks. Auto-saves locally..."
                    style={{
                      width: "100%",
                      height: "120px",
                      background: "rgba(255,255,255,0.01)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "8px",
                      padding: "8px",
                      color: "#ffffff",
                      fontSize: "0.75rem",
                      fontFamily: "inherit",
                      resize: "none",
                      outline: "none"
                    }}
                  />
                  <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "0.65rem", color: "#10b981" }}>
                    <i className="fa-solid fa-cloud-arrow-up"></i>
                    <span>Saved in localStorage</span>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default SplitDetailsView;
