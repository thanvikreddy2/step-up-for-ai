"use client";

import React, { useState } from "react";
import { useDashboard } from "@/context/DashboardContext";
import { SECTORS } from "@/lib/mockData";
import { getPitchDeckDetails } from "@/lib/pitchDeckData";

interface SplitPitchDashboardProps {
  forcedShortlisted?: boolean;
}

const SplitPitchDashboard: React.FC<SplitPitchDashboardProps> = ({ forcedShortlisted = false }) => {
  const {
    allPitches,
    shortlistedIds,
    searchQuery,
    setSearchQuery,
    sectorFilter,
    setSectorFilter,
    stageFilter,
    setStageFilter,
    sortOrder,
    setSortOrder,
    locationFilter,
    setLocationFilter,
    companyFilter,
    setCompanyFilter,
    ratingFilter,
    setRatingFilter,
    clearAllFilters,
    getFilteredPitches,
    selectedStartup,
    setSelectedStartup,
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
    toggleShortlist,
    showToast,
    formatAskAmount,
    formatLakhs
  } = useDashboard();

  const filteredPitches = getFilteredPitches(forcedShortlisted);

  // Dynamic unique filters from dataset
  const uniqueLocations = Array.from(
    new Set(allPitches.map((s) => s.location).filter(Boolean))
  );
  
  const uniqueCompanies = allPitches.map((s) => ({ id: s.id, name: s.name }));

  const isShortlisted = selectedStartup ? shortlistedIds.includes(selectedStartup.id) : false;

  const currentStartupRating = selectedStartup
    ? startupRatings[selectedStartup.id] || { pedigree: 4.0, tailwinds: 4.2, moat: 4.5 }
    : { pedigree: 4.0, tailwinds: 4.2, moat: 4.5 };

  const currentAverageRating =
    (currentStartupRating.pedigree + currentStartupRating.tailwinds + currentStartupRating.moat) / 3;

  // Deck details
  const deck = selectedStartup ? getPitchDeckDetails(selectedStartup) : null;

  // Slides structure for inline presentation
  const slides = selectedStartup && deck ? [
    {
      title: "Title / Hook",
      content: (
        <div style={{ textAlign: "center", padding: "20px 10px", width: "100%" }}>
          <div
            style={{
              width: "60px",
              height: "60px",
              background: selectedStartup.logoBg,
              borderRadius: "12px",
              margin: "0 auto 15px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.5rem",
              fontWeight: 800,
              color: "#ffffff",
              boxShadow: "var(--glow-shadow)"
            }}
          >
            {selectedStartup.logoText}
          </div>
          <h3 style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "8px", marginTop: 0 }}>
            {selectedStartup.name}
          </h3>
          <p style={{ fontSize: "1rem", fontStyle: "italic", color: "var(--text-secondary)", maxWidth: "500px", margin: "0 auto", lineHeight: "1.4" }}>
            "{selectedStartup.tagline}"
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
              <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)" }}>{selectedStartup.sectorLabel}</div>
            </div>
            <div className="glass-card" style={{ padding: "12px", borderRadius: "8px", border: "1px solid var(--border-color)", background: "rgba(255,255,255,0.01)" }}>
              <div style={{ fontSize: "0.65rem", color: "var(--text-secondary)", marginBottom: "2px" }}>Funding Stage</div>
              <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)" }}>{selectedStartup.stage}</div>
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
            {selectedStartup.description}
          </p>
          <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
            Submitted: <strong>{selectedStartup.submittedDate}</strong> | Status: <strong>{selectedStartup.status}</strong>
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
            <h5 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)", margin: "0 0 2px 0" }}>{selectedStartup.founder}</h5>
            <p style={{ color: "var(--text-secondary)", margin: "0 0 8px 0", fontSize: "0.8rem" }}>Founder & CEO, {selectedStartup.name}</p>
            <div style={{ display: "flex", gap: "8px" }}>
              <a href={`mailto:${selectedStartup.email}`} className="founder-btn" style={{ padding: "6px 10px", fontSize: "0.75rem", background: "rgba(255, 255, 255, 0.02)", border: "1px solid var(--border-color)", borderRadius: "6px", color: "var(--text-primary)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                <i className="fa-solid fa-envelope"></i>
                <span>Email</span>
              </a>
              <a href={selectedStartup.linkedin} target="_blank" rel="noopener noreferrer" className="founder-btn linkedin-btn" style={{ padding: "6px 10px", fontSize: "0.75rem", background: "rgba(59, 130, 246, 0.15)", border: "1px solid rgba(59, 130, 246, 0.3)", borderRadius: "6px", color: "#3b82f6", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "4px" }}>
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
  ] : [];

  const handleDownloadPDF = async () => {
    if (!selectedStartup || !deck) return;
    showToast("Preparing PDF download...", "info");

    try {
      let html2pdf: any;
      if (typeof window !== "undefined") {
        if ((window as any).html2pdf) {
          html2pdf = (window as any).html2pdf;
        } else {
          await new Promise<void>((resolve, reject) => {
            const script = document.createElement("script");
            script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
            script.onload = () => resolve();
            script.onerror = () => reject(new Error("Failed to load PDF library"));
            document.head.appendChild(script);
          });
          html2pdf = (window as any).html2pdf;
        }
      }

      if (!html2pdf) {
        throw new Error("PDF library not loaded");
      }

      const element = document.createElement("div");
      element.style.width = "277mm";
      element.style.color = "#ffffff";
      element.style.backgroundColor = "#0b0f19";
      element.style.fontFamily = "'Inter', sans-serif";
      element.style.lineHeight = "1.6";

      element.innerHTML = `
        <div style="width: 277mm; height: 190mm; box-sizing: border-box; padding: 45px; color: #ffffff; background-color: #0b0f19; font-family: 'Inter', sans-serif; display: flex; flex-direction: column; justify-content: space-between; page-break-after: always;">
          <div style="border-bottom: 2px solid #2fbf64; padding-bottom: 15px; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 14px; font-weight: 800; color: #2fbf64; text-transform: uppercase;">StepUp for AI | Pitch Deck</span>
            <span style="font-size: 12px; color: #94a3b8;">Slide 1 of 10</span>
          </div>
          <div style="text-align: center; margin: auto 0;">
            <div style="width: 80px; height: 80px; background: ${selectedStartup.logoBg}; border-radius: 16px; margin: 0 auto 24px; display: flex; align-items: center; justify-content: center; font-size: 32px; font-weight: 800; color: #ffffff;">
              ${selectedStartup.logoText}
            </div>
            <h1 style="font-size: 44px; font-weight: 800; color: #ffffff; margin-bottom: 16px; margin-top: 0;">${selectedStartup.name}</h1>
            <p style="font-size: 20px; font-style: italic; color: #94a3b8; max-width: 700px; margin: 0 auto;">"${selectedStartup.tagline}"</p>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255, 255, 255, 0.08); padding-top: 15px; font-size: 12px; color: #94a3b8;">
            <span>Confidential Investment Summary</span>
            <span>Generated on ${new Date().toLocaleDateString()}</span>
          </div>
        </div>

        <div style="width: 277mm; height: 190mm; box-sizing: border-box; padding: 45px; color: #ffffff; background-color: #0b0f19; font-family: 'Inter', sans-serif; display: flex; flex-direction: column; justify-content: space-between; page-break-after: always;">
          <div style="border-bottom: 2px solid #2fbf64; padding-bottom: 15px; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 14px; font-weight: 800; color: #2fbf64; text-transform: uppercase;">StepUp for AI | ${selectedStartup.name}</span>
            <span style="font-size: 12px; color: #94a3b8;">Slide 2 of 10</span>
          </div>
          <div style="margin: auto 0;">
            <span style="color: #ef4444; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 8px;">The Problem</span>
            <h2 style="font-size: 32px; font-weight: 800; color: #ffffff; margin-bottom: 24px; margin-top: 0;">What Issue Are We Solving?</h2>
            <p style="font-size: 20px; color: #e2e8f0; line-height: 1.8; border-left: 4px solid #ef4444; padding-left: 20px; margin: 0;">
              ${deck.problem}
            </p>
          </div>
          <div style="border-top: 1px solid rgba(255, 255, 255, 0.08); padding-top: 15px; font-size: 12px; color: #94a3b8;">
            <span>Confidential Investment Summary</span>
          </div>
        </div>

        <div style="width: 277mm; height: 190mm; box-sizing: border-box; padding: 45px; color: #ffffff; background-color: #0b0f19; font-family: 'Inter', sans-serif; display: flex; flex-direction: column; justify-content: space-between; page-break-after: always;">
          <div style="border-bottom: 2px solid #2fbf64; padding-bottom: 15px; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 14px; font-weight: 800; color: #2fbf64; text-transform: uppercase;">StepUp for AI | ${selectedStartup.name}</span>
            <span style="font-size: 12px; color: #94a3b8;">Slide 3 of 10</span>
          </div>
          <div style="margin: auto 0;">
            <span style="color: #2fbf64; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 8px;">The Solution</span>
            <h2 style="font-size: 32px; font-weight: 800; color: #ffffff; margin-bottom: 24px; margin-top: 0;">Our Product & Innovation</h2>
            <p style="font-size: 20px; color: #e2e8f0; line-height: 1.8; border-left: 4px solid #2fbf64; padding-left: 20px; margin: 0;">
              ${deck.solution}
            </p>
          </div>
          <div style="border-top: 1px solid rgba(255, 255, 255, 0.08); padding-top: 15px; font-size: 12px; color: #94a3b8;">
            <span>Confidential Investment Summary</span>
          </div>
        </div>

        <div style="width: 277mm; height: 190mm; box-sizing: border-box; padding: 45px; color: #ffffff; background-color: #0b0f19; font-family: 'Inter', sans-serif; display: flex; flex-direction: column; justify-content: space-between; page-break-after: always;">
          <div style="border-bottom: 2px solid #2fbf64; padding-bottom: 15px; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 14px; font-weight: 800; color: #2fbf64; text-transform: uppercase;">StepUp for AI | ${selectedStartup.name}</span>
            <span style="font-size: 12px; color: #94a3b8;">Slide 4 of 10</span>
          </div>
          <div style="margin: auto 0;">
            <span style="color: #3b82f6; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 8px;">Market Opportunity</span>
            <h2 style="font-size: 32px; font-weight: 800; color: #ffffff; margin-bottom: 30px; margin-top: 0;">Target Sector & Market Size</h2>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
              <div style="background: rgba(255, 255, 255, 0.03); padding: 25px; border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.08);">
                <div style="font-size: 14px; color: #94a3b8; margin-bottom: 6px;">Target Sector</div>
                <div style="font-size: 24px; font-weight: 700; color: #ffffff;">${selectedStartup.sectorLabel}</div>
              </div>
              <div style="background: rgba(255, 255, 255, 0.03); padding: 25px; border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.08);">
                <div style="font-size: 14px; color: #94a3b8; margin-bottom: 6px;">Funding Stage</div>
                <div style="font-size: 24px; font-weight: 700; color: #ffffff;">${selectedStartup.stage}</div>
              </div>
            </div>
          </div>
          <div style="border-top: 1px solid rgba(255, 255, 255, 0.08); padding-top: 15px; font-size: 12px; color: #94a3b8;">
            <span>Confidential Investment Summary</span>
          </div>
        </div>

        <div style="width: 277mm; height: 190mm; box-sizing: border-box; padding: 45px; color: #ffffff; background-color: #0b0f19; font-family: 'Inter', sans-serif; display: flex; flex-direction: column; justify-content: space-between; page-break-after: always;">
          <div style="border-bottom: 2px solid #2fbf64; padding-bottom: 15px; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 14px; font-weight: 800; color: #2fbf64; text-transform: uppercase;">StepUp for AI | ${selectedStartup.name}</span>
            <span style="font-size: 12px; color: #94a3b8;">Slide 5 of 10</span>
          </div>
          <div style="margin: auto 0;">
            <span style="color: #ec4899; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 8px;">Product & Traction</span>
            <h2 style="font-size: 32px; font-weight: 800; color: #ffffff; margin-bottom: 20px; margin-top: 0;">Milestones & User Growth</h2>
            <p style="font-size: 18px; color: #e2e8f0; line-height: 1.8; margin-bottom: 20px; text-align: justify;">
              ${selectedStartup.description}
            </p>
            <div style="font-size: 14px; color: #94a3b8;">
              Submitted Date: <strong>${selectedStartup.submittedDate}</strong> | Current Status: <strong>${selectedStartup.status}</strong>
            </div>
          </div>
          <div style="border-top: 1px solid rgba(255, 255, 255, 0.08); padding-top: 15px; font-size: 12px; color: #94a3b8;">
            <span>Confidential Investment Summary</span>
          </div>
        </div>

        <div style="width: 277mm; height: 190mm; box-sizing: border-box; padding: 45px; color: #ffffff; background-color: #0b0f19; font-family: 'Inter', sans-serif; display: flex; flex-direction: column; justify-content: space-between; page-break-after: always;">
          <div style="border-bottom: 2px solid #2fbf64; padding-bottom: 15px; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 14px; font-weight: 800; color: #2fbf64; text-transform: uppercase;">StepUp for AI | ${selectedStartup.name}</span>
            <span style="font-size: 12px; color: #94a3b8;">Slide 6 of 10</span>
          </div>
          <div style="margin: auto 0;">
            <span style="color: #eab308; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 8px;">Business Model</span>
            <h2 style="font-size: 32px; font-weight: 800; color: #ffffff; margin-bottom: 24px; margin-top: 0;">How We Generate Revenue</h2>
            <p style="font-size: 20px; color: #e2e8f0; line-height: 1.8; border-left: 4px solid #eab308; padding-left: 20px; margin: 0;">
              ${deck.businessModel}
            </p>
          </div>
          <div style="border-top: 1px solid rgba(255, 255, 255, 0.08); padding-top: 15px; font-size: 12px; color: #94a3b8;">
            <span>Confidential Investment Summary</span>
          </div>
        </div>

        <div style="width: 277mm; height: 190mm; box-sizing: border-box; padding: 45px; color: #ffffff; background-color: #0b0f19; font-family: 'Inter', sans-serif; display: flex; flex-direction: column; justify-content: space-between; page-break-after: always;">
          <div style="border-bottom: 2px solid #2fbf64; padding-bottom: 15px; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 14px; font-weight: 800; color: #2fbf64; text-transform: uppercase;">StepUp for AI | ${selectedStartup.name}</span>
            <span style="font-size: 12px; color: #94a3b8;">Slide 7 of 10</span>
          </div>
          <div style="margin: auto 0;">
            <span style="color: #a855f7; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 8px;">Competitive Advantage</span>
            <h2 style="font-size: 32px; font-weight: 800; color: #ffffff; margin-bottom: 24px; margin-top: 0;">Why We Win (USP)</h2>
            <p style="font-size: 20px; color: #e2e8f0; line-height: 1.8; border-left: 4px solid #a855f7; padding-left: 20px; margin: 0;">
              ${deck.advantage}
            </p>
          </div>
          <div style="border-top: 1px solid rgba(255, 255, 255, 0.08); padding-top: 15px; font-size: 12px; color: #94a3b8;">
            <span>Confidential Investment Summary</span>
          </div>
        </div>

        <div style="width: 277mm; height: 190mm; box-sizing: border-box; padding: 45px; color: #ffffff; background-color: #0b0f19; font-family: 'Inter', sans-serif; display: flex; flex-direction: column; justify-content: space-between; page-break-after: always;">
          <div style="border-bottom: 2px solid #2fbf64; padding-bottom: 15px; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 14px; font-weight: 800; color: #2fbf64; text-transform: uppercase;">StepUp for AI | ${selectedStartup.name}</span>
            <span style="font-size: 12px; color: #94a3b8;">Slide 8 of 10</span>
          </div>
          <div style="margin: auto 0;">
            <span style="color: #06b6d4; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 8px;">Financials</span>
            <h2 style="font-size: 32px; font-weight: 800; color: #ffffff; margin-bottom: 24px; margin-top: 0;">Growth & Forecast</h2>
            <p style="font-size: 20px; color: #e2e8f0; line-height: 1.8; border-left: 4px solid #06b6d4; padding-left: 20px; margin: 0;">
              ${deck.financialProjections}
            </p>
          </div>
          <div style="border-top: 1px solid rgba(255, 255, 255, 0.08); padding-top: 15px; font-size: 12px; color: #94a3b8;">
            <span>Confidential Investment Summary</span>
          </div>
        </div>

        <div style="width: 277mm; height: 190mm; box-sizing: border-box; padding: 45px; color: #ffffff; background-color: #0b0f19; font-family: 'Inter', sans-serif; display: flex; flex-direction: column; justify-content: space-between; page-break-after: always;">
          <div style="border-bottom: 2px solid #2fbf64; padding-bottom: 15px; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 14px; font-weight: 800; color: #2fbf64; text-transform: uppercase;">StepUp for AI | ${selectedStartup.name}</span>
            <span style="font-size: 12px; color: #94a3b8;">Slide 9 of 10</span>
          </div>
          <div style="margin: auto 0;">
            <span style="color: #f97316; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 8px;">The Team</span>
            <h2 style="font-size: 32px; font-weight: 800; color: #ffffff; margin-bottom: 30px; margin-top: 0;">Leadership & Expertise</h2>
            <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 30px;">
              <h3 style="font-size: 24px; font-weight: 700; color: #ffffff; margin-top: 0; margin-bottom: 8px;">${selectedStartup.founder}</h3>
              <p style="font-size: 16px; color: #94a3b8; margin-top: 0; margin-bottom: 20px;">Founder & CEO, ${selectedStartup.name}</p>
              <div style="font-size: 14px; color: #e2e8f0;">
                Email: <span style="color: #2fbf64;">${selectedStartup.email}</span><br />
                LinkedIn: <span style="color: #3b82f6;">${selectedStartup.linkedin}</span>
              </div>
            </div>
          </div>
          <div style="border-top: 1px solid rgba(255, 255, 255, 0.08); padding-top: 15px; font-size: 12px; color: #94a3b8;">
            <span>Confidential Investment Summary</span>
          </div>
        </div>

        <div style="width: 277mm; height: 190mm; box-sizing: border-box; padding: 45px; color: #ffffff; background-color: #0b0f19; font-family: 'Inter', sans-serif; display: flex; flex-direction: column; justify-content: space-between;">
          <div style="border-bottom: 2px solid #2fbf64; padding-bottom: 15px; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 14px; font-weight: 800; color: #2fbf64; text-transform: uppercase;">StepUp for AI | ${selectedStartup.name}</span>
            <span style="font-size: 12px; color: #94a3b8;">Slide 10 of 10</span>
          </div>
          <div style="margin: auto 0;">
            <span style="color: #2fbf64; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 8px;">The Ask</span>
            <h2 style="font-size: 32px; font-weight: 800; color: #ffffff; margin-bottom: 24px; margin-top: 0;">Funding & Milestones</h2>
            <p style="font-size: 20px; color: #e2e8f0; line-height: 1.8; border-left: 4px solid #2fbf64; padding-left: 20px; margin: 0;">
              ${deck.askDetails}
            </p>
          </div>
          <div style="border-top: 1px solid rgba(255, 255, 255, 0.08); padding-top: 15px; display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: #94a3b8;">
            <span>Confidential Investment Summary</span>
            <span>StepUp for AI Network</span>
          </div>
        </div>
      `;

      const options = {
        margin: [0, 0, 0, 0],
        filename: `${selectedStartup.name.replace(/\s+/g, "_")}_Pitch_Deck.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, backgroundColor: "#0b0f19" },
        jsPDF: { unit: "mm", format: "a4", orientation: "landscape" }
      };

      await html2pdf().from(element).set(options).save();
      showToast("PDF downloaded successfully!", "success");
    } catch (error) {
      console.error(error);
      showToast("Failed to generate PDF. Please try again.", "error");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        height: "calc(100vh - 120px)",
        minHeight: "550px",
        width: "100%",
        boxSizing: "border-box",
        animation: "fadeIn 0.3s ease"
      }}
    >
      {/* ==================== LEFT FILTER PANE (25%) ==================== */}
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
            {filteredPitches.length} results found
          </span>
        </div>

        {/* Company Dropdown Filter */}
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

        {/* Location Dropdown Filter */}
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

        {/* Sector / Industries Dropdown Filter */}
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

        {/* Job Title / Funding Stage Filter */}
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

        {/* Rating Category Filter */}
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

        {/* Search Input Filter */}
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

        {/* Reset button */}
        <button
          onClick={clearAllFilters}
          className="btn btn-secondary"
          style={{ width: "100%", padding: "8px", marginTop: "auto", fontSize: "0.8rem", fontWeight: 600 }}
        >
          Reset Filters
        </button>
      </aside>

      {/* ==================== MIDDLE CARD LIST PANE (35%) ==================== */}
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

      {/* ==================== RIGHT DETAILS PANEL (40%) ==================== */}
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
          boxSizing: "border-box",
          position: "relative"
        }}
      >
        {selectedStartup ? (
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

            {/* ==================== PRESENTATION DECK DISPLAY (IF TOGGLED) ==================== */}
            {isDeckToggled && deck ? (
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
                  onClick={handleDownloadPDF}
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

                {/* Slides content area */}
                <div style={{ flex: 1, display: "flex", alignItems: "center", minHeight: "220px", padding: "10px 0" }}>
                  {slides[currentSlide]?.content}
                </div>

                {/* Slides navigation */}
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
            ) : (
              // ==================== DETAIL SHEET TABBED VIEW (NORMAL) ====================
              <>
                {/* Startup detailed pitch overview */}
                <div>
                  <h4 style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px", marginTop: 0 }}>
                    Startup Description
                  </h4>
                  <p style={{ fontSize: "0.9rem", color: "rgba(255, 255, 255, 0.75)", lineHeight: "1.5", margin: 0 }}>
                    {selectedStartup.description}
                  </p>
                </div>

                {/* Founder direct details brief */}
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
                      <a href={`mailto:${selectedStartup.email}`} className="founder-btn" style={{ padding: "6px 10px", fontSize: "0.75rem", background: "rgba(255,255,255,0.02)", border: "1px solid var(--border-color)", borderRadius: "6px", color: "#ffffff", textDecoration: "none", display: "inline-flex", gap: "4px", alignItems: "center" }}>
                        <i className="fa-solid fa-envelope"></i> <span>Email</span>
                      </a>
                      <a href={selectedStartup.linkedin} target="_blank" rel="noopener noreferrer" className="founder-btn" style={{ padding: "6px 10px", fontSize: "0.75rem", background: "rgba(255,255,255,0.02)", border: "1px solid var(--border-color)", borderRadius: "6px", color: "#ffffff", textDecoration: "none", display: "inline-flex", gap: "4px", alignItems: "center" }}>
                        <i className="fa-brands fa-linkedin"></i> <span>LinkedIn</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Horizontal Tab Navigation in Right Sidebar */}
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

                {/* Tab content renderer */}
                <div style={{ minHeight: "180px" }}>
                  {/* OVERVIEW TAB */}
                  {activeTab === "overview" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                      {/* Grid metrics */}
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

                      {/* SVG Tracker and conviction scorecard */}
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "15px", alignItems: "center" }}>
                        <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "10px", padding: "12px", display: "flex", alignItems: "center", gap: "10px" }}>
                          <div style={{ position: "relative", width: "46px", height: "46px" }}>
                            <svg width="46" height="46" viewBox="0 0 56 56">
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

                        {/* Average conviction indicator */}
                        <div style={{ background: "rgba(16, 185, 129, 0.04)", border: "1px solid rgba(16, 185, 129, 0.2)", borderRadius: "10px", padding: "12px", textAlign: "center" }}>
                          <span style={{ fontSize: "0.65rem", textTransform: "uppercase", color: "#10b981", display: "block", marginBottom: "2px", fontWeight: 600 }}>Conviction Score</span>
                          <strong style={{ fontSize: "1.1rem", color: "#ffffff" }}>{currentAverageRating.toFixed(1)} / 5.0</strong>
                        </div>
                      </div>

                      {/* Range sliders */}
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
        ) : (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", color: "var(--text-secondary)" }}>
            <i className="fa-solid fa-briefcase" style={{ fontSize: "3rem", marginBottom: "16px", color: "rgba(255,255,255,0.06)" }}></i>
            <h3 style={{ margin: "0 0 4px 0", fontSize: "1.1rem" }}>Select a Startup Pitch</h3>
            <p style={{ margin: 0, fontSize: "0.85rem" }}>Click on a startup from the middle list to view its full interactive deal room.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default SplitPitchDashboard;
