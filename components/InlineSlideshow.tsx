"use client";

import React from "react";
import { Startup, PitchDeckDetails } from "@/types";

interface InlineSlideshowProps {
  startup: Startup;
  deck: PitchDeckDetails;
  currentSlide: number;
  setCurrentSlide: React.Dispatch<React.SetStateAction<number>>;
  onDownloadPDF: () => void;
}

const InlineSlideshow: React.FC<InlineSlideshowProps> = ({
  startup,
  deck,
  currentSlide,
  setCurrentSlide,
  onDownloadPDF
}) => {
  const slides = [
    {
      title: "Title / Hook",
      content: (
        <div style={{ textAlign: "center", padding: "20px 10px", width: "100%" }}>
          <div
            style={{
              width: "60px",
              height: "60px",
              background: startup.logoBg,
              borderRadius: "12px",
              margin: "0 auto 15px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.5rem",
              fontWeight: 800,
              color: "#ffffff"
            }}
          >
            {startup.logoText}
          </div>
          <h3 style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "8px", marginTop: 0 }}>
            {startup.name}
          </h3>
          <p style={{ fontSize: "1rem", fontStyle: "italic", color: "var(--text-secondary)", maxWidth: "500px", margin: "0 auto", lineHeight: "1.4" }}>
            "{startup.tagline}"
          </p>
        </div>
      )
    },
    {
      title: "The Problem",
      content: (
        <div style={{ width: "100%" }}>
          <div style={{ color: "#ef4444", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", marginBottom: "4px", letterSpacing: "1px" }}>
            The Problem
          </div>
          <h4 style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "10px", marginTop: 0 }}>
            What Issue Are We Solving?
          </h4>
          <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: "1.6", borderLeft: "4px solid #ef4444", paddingLeft: "12px", margin: 0 }}>
            {deck.problem}
          </p>
        </div>
      )
    },
    {
      title: "The Solution",
      content: (
        <div style={{ width: "100%" }}>
          <div style={{ color: "var(--accent)", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", marginBottom: "4px", letterSpacing: "1px" }}>
            The Solution
          </div>
          <h4 style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "10px", marginTop: 0 }}>
            Our Product & Innovation
          </h4>
          <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: "1.6", borderLeft: "4px solid var(--accent)", paddingLeft: "12px", margin: 0 }}>
            {deck.solution}
          </p>
        </div>
      )
    },
    {
      title: "Market Opportunity",
      content: (
        <div style={{ width: "100%" }}>
          <div style={{ color: "#3b82f6", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", marginBottom: "4px", letterSpacing: "1px" }}>
            Market Opportunity
          </div>
          <h4 style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "12px", marginTop: 0 }}>
            Target Sector & Market Size
          </h4>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div className="glass-card" style={{ padding: "12px", borderRadius: "8px", border: "1px solid var(--border-color)", background: "rgba(255,255,255,0.01)" }}>
              <div style={{ fontSize: "0.65rem", color: "var(--text-secondary)", marginBottom: "2px" }}>Target Sector</div>
              <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)" }}>{startup.sectorLabel}</div>
            </div>
            <div className="glass-card" style={{ padding: "12px", borderRadius: "8px", border: "1px solid var(--border-color)", background: "rgba(255,255,255,0.01)" }}>
              <div style={{ fontSize: "0.65rem", color: "var(--text-secondary)", marginBottom: "2px" }}>Funding Stage</div>
              <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)" }}>{startup.stage}</div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Product / Traction",
      content: (
        <div style={{ width: "100%" }}>
          <div style={{ color: "#ec4899", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", marginBottom: "4px", letterSpacing: "1px" }}>
            Product & Traction
          </div>
          <h4 style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "10px", marginTop: 0 }}>
            Milestones & User Growth
          </h4>
          <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: "1.5", marginBottom: "10px", marginTop: 0 }}>
            {startup.description}
          </p>
          <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
            Submitted: <strong>{startup.submittedDate}</strong> | Status: <strong>{startup.status}</strong>
          </div>
        </div>
      )
    },
    {
      title: "Business Model",
      content: (
        <div style={{ width: "100%" }}>
          <div style={{ color: "#eab308", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", marginBottom: "4px", letterSpacing: "1px" }}>
            Business Model
          </div>
          <h4 style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "10px", marginTop: 0 }}>
            How We Generate Revenue
          </h4>
          <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: "1.6", borderLeft: "4px solid #eab308", paddingLeft: "12px", margin: 0 }}>
            {deck.businessModel}
          </p>
        </div>
      )
    },
    {
      title: "Competitive Advantage",
      content: (
        <div style={{ width: "100%" }}>
          <div style={{ color: "#a855f7", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", marginBottom: "4px", letterSpacing: "1px" }}>
            Competitive Advantage
          </div>
          <h4 style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "10px", marginTop: 0 }}>
            Why We Win (USP)
          </h4>
          <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: "1.6", borderLeft: "4px solid #a855f7", paddingLeft: "12px", margin: 0 }}>
            {deck.advantage}
          </p>
        </div>
      )
    },
    {
      title: "Financial Projections",
      content: (
        <div style={{ width: "100%" }}>
          <div style={{ color: "#06b6d4", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", marginBottom: "4px", letterSpacing: "1px" }}>
            Financials
          </div>
          <h4 style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "10px", marginTop: 0 }}>
            Growth & Forecast
          </h4>
          <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: "1.6", borderLeft: "4px solid #06b6d4", paddingLeft: "12px", margin: 0 }}>
            {deck.financialProjections}
          </p>
        </div>
      )
    },
    {
      title: "The Team",
      content: (
        <div style={{ width: "100%" }}>
          <div style={{ color: "#f97316", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", marginBottom: "4px", letterSpacing: "1px" }}>
            The Team
          </div>
          <h4 style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "10px", marginTop: 0 }}>
            Leadership & Expertise
          </h4>
          <div style={{ background: "rgba(255, 255, 255, 0.01)", border: "1px solid var(--border-color)", borderRadius: "8px", padding: "12px" }}>
            <h5 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)", margin: "0 0 2px 0" }}>{startup.founder}</h5>
            <p style={{ color: "var(--text-secondary)", margin: "0 0 8px 0", fontSize: "0.8rem" }}>Founder & CEO, {startup.name}</p>
            <div style={{ display: "flex", gap: "8px" }}>
              <a href={`mailto:${startup.email}`} className="founder-btn" style={{ padding: "6px 10px", fontSize: "0.75rem", background: "rgba(255, 255, 255, 0.02)", border: "1px solid var(--border-color)", borderRadius: "6px", color: "var(--text-primary)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                <i className="fa-solid fa-envelope"></i>
                <span>Email</span>
              </a>
              <a href={startup.linkedin} target="_blank" rel="noopener noreferrer" className="founder-btn linkedin-btn" style={{ padding: "6px 10px", fontSize: "0.75rem", background: "rgba(59, 130, 246, 0.15)", border: "1px solid rgba(59, 130, 246, 0.3)", borderRadius: "6px", color: "#3b82f6", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                <i className="fa-brands fa-linkedin"></i>
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "The Ask",
      content: (
        <div style={{ width: "100%" }}>
          <div style={{ color: "var(--accent)", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", marginBottom: "4px", letterSpacing: "1px" }}>
            The Ask
          </div>
          <h4 style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "10px", marginTop: 0 }}>
            Funding & Milestones
          </h4>
          <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: "1.6", borderLeft: "4px solid var(--accent)", paddingLeft: "12px", margin: 0 }}>
            {deck.askDetails}
          </p>
        </div>
      )
    }
  ];

  return (
    <div
      className="pitch-deck-viewer"
      style={{
        minHeight: "350px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "rgba(255,255,255,0.01)",
        border: "1px solid rgba(255,255,255,0.05)",
        borderRadius: "12px",
        padding: "20px",
        boxSizing: "border-box",
        position: "relative"
      }}
    >
      <button
        className="btn-download-pdf"
        onClick={onDownloadPDF}
        title="Download Slides as PDF"
        style={{
          position: "absolute",
          top: "12px",
          right: "12px",
          background: "rgba(47, 191, 100, 0.15)",
          border: "1px solid rgba(47, 191, 100, 0.3)",
          color: "var(--accent)",
          height: "28px",
          borderRadius: "6px",
          fontSize: "0.75rem",
          fontWeight: 600,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "4px",
          padding: "0 10px",
          zIndex: 2
        }}
      >
        <i className="fa-solid fa-file-pdf"></i>
        <span>Download PDF</span>
      </button>

      <div style={{ flex: 1, display: "flex", alignItems: "center", minHeight: "220px", padding: "10px 0" }}>
        {slides[currentSlide]?.content}
      </div>

      <div
        className="slide-controls"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          paddingTop: "12px",
          marginTop: "12px"
        }}
      >
        <button
          disabled={currentSlide === 0}
          onClick={() => setCurrentSlide((prev) => Math.max(0, prev - 1))}
          className="btn btn-secondary"
          style={{
            opacity: currentSlide === 0 ? 0.4 : 1,
            cursor: currentSlide === 0 ? "not-allowed" : "pointer",
            padding: "6px 12px",
            fontSize: "0.75rem"
          }}
        >
          <i className="fa-solid fa-arrow-left"></i> Previous
        </button>

        <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
          Slide {currentSlide + 1} of {slides.length} : <strong>{slides[currentSlide]?.title}</strong>
        </div>

        <button
          disabled={currentSlide === slides.length - 1}
          onClick={() => setCurrentSlide((prev) => Math.min(slides.length - 1, prev + 1))}
          className="btn btn-primary"
          style={{
            opacity: currentSlide === slides.length - 1 ? 0.4 : 1,
            cursor: currentSlide === slides.length - 1 ? "not-allowed" : "pointer",
            padding: "6px 12px",
            fontSize: "0.75rem"
          }}
        >
          Next <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
};

export default InlineSlideshow;
