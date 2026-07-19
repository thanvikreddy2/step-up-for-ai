"use client";

import React from "react";
import { useDashboard } from "@/context/DashboardContext";

const HomePanel: React.FC = () => {
  const { setActivePanel, allPitches, shortlistedIds } = useDashboard();

  const totalPitches = allPitches.length;
  const totalShortlist = shortlistedIds.length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "30px", animation: "fadeIn 0.4s ease" }}>
      {/* Hero Welcome Card */}
      <div
        className="glass-card"
        style={{
          padding: "45px 35px",
          borderRadius: "16px",
          border: "1px solid var(--border-color)",
          background: "linear-gradient(135deg, rgba(9, 15, 27, 0.95), rgba(47, 191, 100, 0.04))",
          position: "relative",
          overflow: "hidden"
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-10%', right: '-10%'",
            width: "300px",
            height: "300px",
            background: "rgba(47, 191, 100, 0.08)",
            filter: "blur(80px)",
            borderRadius: "50%",
            pointerEvents: "none"
          }}
        />
        <h2 style={{ fontSize: "2.5rem", fontWeight: 800, color: "#ffffff", marginBottom: "16px", marginTop: 0, lineHeight: 1.2 }}>
          StepUp for AI <span style={{ color: "var(--accent)" }}>Investor Portal</span>
        </h2>
        <p style={{ fontSize: "1.1rem", color: "var(--text-secondary)", maxWidth: "700px", lineHeight: 1.6, marginBottom: "30px" }}>
          Welcome back to your exclusive deal room workspace. Evaluate vetted startups, review interactive pitch decks, track round allocations, and maintain diligence notes seamlessly in one premium dashboard.
        </p>
        <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
          <button
            className="btn btn-primary"
            onClick={() => setActivePanel("pitch-decks")}
            style={{ padding: "12px 24px", fontSize: "0.95rem", fontWeight: 600 }}
          >
            <i className="fa-solid fa-briefcase" style={{ marginRight: "8px" }}></i>
            Explore Pitch Decks
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => setActivePanel("shortlisted-ideas")}
            style={{ padding: "12px 24px", fontSize: "0.95rem", fontWeight: 600 }}
          >
            <i className="fa-solid fa-bookmark" style={{ marginRight: "8px" }}></i>
            View Shortlisted Ideas
          </button>
        </div>
      </div>

      {/* Portal Stats Summary */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
        <div className="stat-card glass-card" style={{ padding: "24px" }}>
          <div className="stat-icon-wrapper text-green" style={{ width: "48px", height: "48px", fontSize: "1.25rem" }}>
            <i className="fa-solid fa-briefcase"></i>
          </div>
          <div className="stat-info">
            <h3 style={{ fontSize: "1.75rem", margin: "0 0 4px 0" }}>{totalPitches}</h3>
            <p style={{ margin: 0 }}>Vetted Startups Available</p>
          </div>
        </div>
        <div className="stat-card glass-card" style={{ padding: "24px" }}>
          <div className="stat-icon-wrapper text-blue" style={{ width: "48px", height: "48px", fontSize: "1.25rem" }}>
            <i className="fa-solid fa-bookmark"></i>
          </div>
          <div className="stat-info">
            <h3 style={{ fontSize: "1.75rem", margin: "0 0 4px 0" }}>{totalShortlist}</h3>
            <p style={{ margin: 0 }}>Your Shortlisted Deals</p>
          </div>
        </div>
        <div className="stat-card glass-card" style={{ padding: "24px" }}>
          <div className="stat-icon-wrapper text-gold" style={{ width: "48px", height: "48px", fontSize: "1.25rem" }}>
            <i className="fa-solid fa-chart-line"></i>
          </div>
          <div className="stat-info">
            <h3 style={{ fontSize: "1.75rem", margin: "0 0 4px 0" }}>₹18.4 Cr</h3>
            <p style={{ margin: 0 }}>Aggregate Funding Ask</p>
          </div>
        </div>
      </div>

      {/* Featured Quick Info Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", flexWrap: "wrap" }}>
        <div
          className="glass-card"
          style={{
            padding: "24px",
            border: "1px solid var(--border-color)",
            borderRadius: "12px",
            background: "rgba(255,255,255,0.01)"
          }}
        >
          <h3 style={{ fontSize: "1.25rem", color: "#ffffff", marginBottom: "12px", marginTop: 0 }}>
            Interactive Deal Rooms
          </h3>
          <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.5, margin: 0 }}>
            Every startup includes a vertical tab navigation data room. Evaluate founder pedigree, examine cap table models, review legal and financial assets, and save personal notes locally.
          </p>
        </div>
        <div
          className="glass-card"
          style={{
            padding: "24px",
            border: "1px solid var(--border-color)",
            borderRadius: "12px",
            background: "rgba(255,255,255,0.01)"
          }}
        >
          <h3 style={{ fontSize: "1.25rem", color: "#ffffff", marginBottom: "12px", marginTop: 0 }}>
            Slide Presentation & PDF
          </h3>
          <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.5, margin: 0 }}>
            Click the "Pitch Deck" toggle inside any startup to view a responsive 10-slide slide presentation directly inline, or download the slide deck in A4 landscape PDF format for offline due diligence.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePanel;
