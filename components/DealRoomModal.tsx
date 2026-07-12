"use client";

import React from "react";
import { useDashboard } from "@/context/DashboardContext";
import { getPitchDeckDetails } from "@/lib/pitchDeckData";

const DealRoomModal: React.FC = () => {
  const {
    isModalOpen,
    closePitchModal,
    selectedStartup,
    modalMode,
    shortlistedIds,
    toggleShortlist,
    activeTab,
    setActiveTab,
    startupRatings,
    startupNotes,
    updateRating,
    updateNotes,
    currentSlide,
    setCurrentSlide,
    showToast,
    formatAskAmount,
    formatLakhs
  } = useDashboard();

  if (!isModalOpen || !selectedStartup) return null;

  const isShortlisted = shortlistedIds.includes(selectedStartup.id);
  let displayStatus = selectedStartup.status;
  if (isShortlisted) {
    displayStatus = "Shortlisted";
  } else if (selectedStartup.status === "Shortlisted") {
    displayStatus = "Under Review";
  }
  const badgeClass = displayStatus.toLowerCase().replace(/\s+/g, "-");

  const deck = getPitchDeckDetails(selectedStartup);

  // Compile interactive slides content
  const slides = [
    {
      title: "Title / Hook",
      content: (
        <div style={{ textAlign: "center", padding: "30px 10px", width: "100%" }}>
          <div
            style={{
              width: "70px",
              height: "70px",
              background: selectedStartup.logoBg,
              borderRadius: "14px",
              margin: "0 auto 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.75rem",
              fontWeight: 800,
              color: "#ffffff",
              boxShadow: "var(--glow-shadow)"
            }}
          >
            {selectedStartup.logoText}
          </div>
          <h2
            style={{
              fontSize: "2.5rem",
              fontWeight: 800,
              color: "var(--text-primary)",
              marginBottom: "12px",
              marginTop: 0
            }}
          >
            {selectedStartup.name}
          </h2>
          <p
            style={{
              fontSize: "1.25rem",
              fontStyle: "italic",
              color: "var(--text-secondary)",
              maxWidth: "550px",
              margin: "0 auto",
              lineHeight: "1.4"
            }}
          >
            "{selectedStartup.tagline}"
          </p>
        </div>
      )
    },
    {
      title: "The Problem",
      content: (
        <div style={{ padding: "10px", width: "100%" }}>
          <div
            style={{
              color: "#ef4444",
              fontSize: "0.85rem",
              fontWeight: 700,
              textTransform: "uppercase",
              marginBottom: "6px",
              letterSpacing: "1px"
            }}
          >
            The Problem
          </div>
          <h3
            style={{
              fontSize: "1.75rem",
              fontWeight: 800,
              color: "var(--text-primary)",
              marginBottom: "16px",
              marginTop: 0
            }}
          >
            What Issue Are We Solving?
          </h3>
          <p
            style={{
              fontSize: "1.15rem",
              color: "var(--text-secondary)",
              lineHeight: "1.8",
              borderLeft: "4px solid #ef4444",
              paddingLeft: "16px",
              margin: 0
            }}
          >
            {deck.problem}
          </p>
        </div>
      )
    },
    {
      title: "The Solution",
      content: (
        <div style={{ padding: "10px", width: "100%" }}>
          <div
            style={{
              color: "var(--accent)",
              fontSize: "0.85rem",
              fontWeight: 700,
              textTransform: "uppercase",
              marginBottom: "6px",
              letterSpacing: "1px"
            }}
          >
            The Solution
          </div>
          <h3
            style={{
              fontSize: "1.75rem",
              fontWeight: 800,
              color: "var(--text-primary)",
              marginBottom: "16px",
              marginTop: 0
            }}
          >
            Our Product & Innovation
          </h3>
          <p
            style={{
              fontSize: "1.15rem",
              color: "var(--text-secondary)",
              lineHeight: "1.8",
              borderLeft: "4px solid var(--accent)",
              paddingLeft: "16px",
              margin: 0
            }}
          >
            {deck.solution}
          </p>
        </div>
      )
    },
    {
      title: "Market Opportunity",
      content: (
        <div style={{ padding: "10px", width: "100%" }}>
          <div
            style={{
              color: "#3b82f6",
              fontSize: "0.85rem",
              fontWeight: 700,
              textTransform: "uppercase",
              marginBottom: "6px",
              letterSpacing: "1px"
            }}
          >
            Market Opportunity
          </div>
          <h3
            style={{
              fontSize: "1.75rem",
              fontWeight: 800,
              color: "var(--text-primary)",
              marginBottom: "20px",
              marginTop: 0
            }}
          >
            Target Sector & Market Size
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <div
              className="glass-card"
              style={{
                padding: "16px",
                borderRadius: "10px",
                border: "1px solid var(--border-color)",
                background: "rgba(255,255,255,0.02)"
              }}
            >
              <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginBottom: "4px" }}>
                Target Sector
              </div>
              <div style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text-primary)" }}>
                {selectedStartup.sectorLabel}
              </div>
            </div>
            <div
              className="glass-card"
              style={{
                padding: "16px",
                borderRadius: "10px",
                border: "1px solid var(--border-color)",
                background: "rgba(255,255,255,0.02)"
              }}
            >
              <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginBottom: "4px" }}>
                Funding Stage
              </div>
              <div style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text-primary)" }}>
                {selectedStartup.stage}
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Product / Traction",
      content: (
        <div style={{ padding: "10px", width: "100%" }}>
          <div
            style={{
              color: "#ec4899",
              fontSize: "0.85rem",
              fontWeight: 700,
              textTransform: "uppercase",
              marginBottom: "6px",
              letterSpacing: "1px"
            }}
          >
            Product & Traction
          </div>
          <h3
            style={{
              fontSize: "1.75rem",
              fontWeight: 800,
              color: "var(--text-primary)",
              marginBottom: "16px",
              marginTop: 0
            }}
          >
            Milestones & User Growth
          </h3>
          <p
            style={{
              fontSize: "1.1rem",
              color: "var(--text-secondary)",
              lineHeight: "1.7",
              marginBottom: "16px",
              marginTop: 0
            }}
          >
            {selectedStartup.description}
          </p>
          <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
            Submitted: <strong>{selectedStartup.submittedDate}</strong> | Status: <strong>{selectedStartup.status}</strong>
          </div>
        </div>
      )
    },
    {
      title: "Business Model",
      content: (
        <div style={{ padding: "10px", width: "100%" }}>
          <div
            style={{
              color: "#eab308",
              fontSize: "0.85rem",
              fontWeight: 700,
              textTransform: "uppercase",
              marginBottom: "6px",
              letterSpacing: "1px"
            }}
          >
            Business Model
          </div>
          <h3
            style={{
              fontSize: "1.75rem",
              fontWeight: 800,
              color: "var(--text-primary)",
              marginBottom: "16px",
              marginTop: 0
            }}
          >
            How We Generate Revenue
          </h3>
          <p
            style={{
              fontSize: "1.15rem",
              color: "var(--text-secondary)",
              lineHeight: "1.8",
              borderLeft: "4px solid #eab308",
              paddingLeft: "16px",
              margin: 0
            }}
          >
            {deck.businessModel}
          </p>
        </div>
      )
    },
    {
      title: "Competitive Advantage",
      content: (
        <div style={{ padding: "10px", width: "100%" }}>
          <div
            style={{
              color: "#a855f7",
              fontSize: "0.85rem",
              fontWeight: 700,
              textTransform: "uppercase",
              marginBottom: "6px",
              letterSpacing: "1px"
            }}
          >
            Competitive Advantage
          </div>
          <h3
            style={{
              fontSize: "1.75rem",
              fontWeight: 800,
              color: "var(--text-primary)",
              marginBottom: "16px",
              marginTop: 0
            }}
          >
            Why We Win (USP)
          </h3>
          <p
            style={{
              fontSize: "1.15rem",
              color: "var(--text-secondary)",
              lineHeight: "1.8",
              borderLeft: "4px solid #a855f7",
              paddingLeft: "16px",
              margin: 0
            }}
          >
            {deck.advantage}
          </p>
        </div>
      )
    },
    {
      title: "Financial Projections",
      content: (
        <div style={{ padding: "10px", width: "100%" }}>
          <div
            style={{
              color: "#06b6d4",
              fontSize: "0.85rem",
              fontWeight: 700,
              textTransform: "uppercase",
              marginBottom: "6px",
              letterSpacing: "1px"
            }}
          >
            Financials
          </div>
          <h3
            style={{
              fontSize: "1.75rem",
              fontWeight: 800,
              color: "var(--text-primary)",
              marginBottom: "16px",
              marginTop: 0
            }}
          >
            Growth & Forecast
          </h3>
          <p
            style={{
              fontSize: "1.15rem",
              color: "var(--text-secondary)",
              lineHeight: "1.8",
              borderLeft: "4px solid #06b6d4",
              paddingLeft: "16px",
              margin: 0
            }}
          >
            {deck.financialProjections}
          </p>
        </div>
      )
    },
    {
      title: "The Team",
      content: (
        <div style={{ padding: "10px", width: "100%" }}>
          <div
            style={{
              color: "#f97316",
              fontSize: "0.85rem",
              fontWeight: 700,
              textTransform: "uppercase",
              marginBottom: "6px",
              letterSpacing: "1px"
            }}
          >
            The Team
          </div>
          <h3
            style={{
              fontSize: "1.75rem",
              fontWeight: 800,
              color: "var(--text-primary)",
              marginBottom: "16px",
              marginTop: 0
            }}
          >
            Leadership & Expertise
          </h3>
          <div
            style={{
              background: "rgba(255, 255, 255, 0.02)",
              border: "1px solid var(--border-color)",
              borderRadius: "12px",
              padding: "16px"
            }}
          >
            <h4 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text-primary)", margin: "0 0 4px 0" }}>
              {selectedStartup.founder}
            </h4>
            <p style={{ color: "var(--text-secondary)", margin: "0 0 12px 0", fontSize: "0.9rem" }}>
              Founder & CEO, {selectedStartup.name}
            </p>
            <div style={{ display: "flex", gap: "10px" }}>
              <a
                href={`mailto:${selectedStartup.email}`}
                className="founder-btn"
                style={{
                  padding: "8px 12px",
                  fontSize: "0.8rem",
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "6px",
                  color: "var(--text-primary)",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px"
                }}
              >
                <i className="fa-solid fa-envelope"></i>
                <span>Email</span>
              </a>
              <a
                href={selectedStartup.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="founder-btn linkedin-btn"
                style={{
                  padding: "8px 12px",
                  fontSize: "0.8rem",
                  background: "rgba(59, 130, 246, 0.15)",
                  border: "1px solid rgba(59, 130, 246, 0.3)",
                  borderRadius: "6px",
                  color: "#3b82f6",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px"
                }}
              >
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
        <div style={{ padding: "10px", width: "100%" }}>
          <div
            style={{
              color: "var(--accent)",
              fontSize: "0.85rem",
              fontWeight: 700,
              textTransform: "uppercase",
              marginBottom: "6px",
              letterSpacing: "1px"
            }}
          >
            The Ask
          </div>
          <h3
            style={{
              fontSize: "1.75rem",
              fontWeight: 800,
              color: "var(--text-primary)",
              marginBottom: "16px",
              marginTop: 0
            }}
          >
            Funding & Milestones
          </h3>
          <p
            style={{
              fontSize: "1.15rem",
              color: "var(--text-secondary)",
              lineHeight: "1.8",
              borderLeft: "4px solid var(--accent)",
              paddingLeft: "16px",
              margin: 0
            }}
          >
            {deck.askDetails}
          </p>
        </div>
      )
    }
  ];

  const handleDownloadPDF = async () => {
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
        <!-- SLIDE 1: Title -->
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

        <!-- SLIDE 2: Problem -->
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

        <!-- SLIDE 3: Solution -->
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

        <!-- SLIDE 4: Market Opportunity -->
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

        <!-- SLIDE 5: Product / Traction -->
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

        <!-- SLIDE 6: Business Model -->
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

        <!-- SLIDE 7: Competitive Advantage -->
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

        <!-- SLIDE 8: Financial Projections -->
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

        <!-- SLIDE 9: Team -->
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

        <!-- SLIDE 10: Ask -->
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
      className={`modal-backdrop ${isModalOpen ? "open" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-hidden={!isModalOpen}
      onClick={closePitchModal}
    >
      <div
        className="modal glass-card"
        style={{ maxWidth: modalMode === "pitch" ? "1000px" : "680px", width: "100%" }}
        onClick={(e) => e.stopPropagation()}
      >
        {modalMode === "deck" && (
          <button
            className="btn-download-pdf"
            onClick={handleDownloadPDF}
            title="Download Pitch Deck as PDF"
            style={{
              position: "absolute",
              top: "20px",
              right: "64px",
              background: "rgba(47, 191, 100, 0.1)",
              border: "1px solid rgba(47, 191, 100, 0.25)",
              color: "var(--accent)",
              height: "32px",
              borderRadius: "8px",
              fontSize: "0.85rem",
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              padding: "0 12px",
              transition: "all var(--transition-fast)",
              zIndex: 10
            }}
          >
            <i className="fa-solid fa-file-pdf"></i>
            <span>Download PDF</span>
          </button>
        )}
        <button className="btn-close-modal" onClick={closePitchModal} aria-label="Close Modal">
          <i className="fa-solid fa-xmark"></i>
        </button>

        <div className="modal-content">
          {/* ==================== MORE DETAILS MODE ==================== */}
          {modalMode === "pitch" && (
            <div style={{ display: "flex", gap: "24px", flexDirection: "row", flexWrap: "wrap", width: "100%" }}>
              {/* Left Panel: 2/3 width */}
              <div style={{ flex: "2 1 480px", display: "flex", flexDirection: "column" }}>
                <div
                  className="modal-header-section"
                  style={{
                    display: "flex",
                    gap: "20px",
                    alignItems: "flex-start",
                    marginBottom: "20px",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                    paddingBottom: "20px"
                  }}
                >
                  <div
                    style={{
                      width: "64px",
                      height: "64px",
                      background: selectedStartup.logoBg,
                      borderRadius: "16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.5rem",
                      fontWeight: 800,
                      color: "#ffffff"
                    }}
                  >
                    {selectedStartup.logoText}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h2
                      style={{
                        fontSize: "1.85rem",
                        fontWeight: 700,
                        color: "#ffffff",
                        margin: "0 0 8px 0",
                        letterSpacing: "-0.5px"
                      }}
                    >
                      {selectedStartup.name}
                    </h2>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        flexWrap: "wrap",
                        marginBottom: "12px"
                      }}
                    >
                      <span
                        style={{
                          background: "rgba(255, 255, 255, 0.05)",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                          padding: "4px 12px",
                          borderRadius: "100px",
                          fontSize: "0.75rem",
                          color: "rgba(255, 255, 255, 0.7)",
                          fontWeight: 500
                        }}
                      >
                        {selectedStartup.sectorLabel}
                      </span>
                      <span
                        style={{
                          background: "rgba(255, 255, 255, 0.05)",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                          padding: "4px 12px",
                          borderRadius: "100px",
                          fontSize: "0.75rem",
                          color: "rgba(255, 255, 255, 0.7)",
                          fontWeight: 500
                        }}
                      >
                        {selectedStartup.stage}
                      </span>
                      <span
                        style={{
                          background:
                            displayStatus.toLowerCase() === "new"
                              ? "rgba(16, 185, 129, 0.1)"
                              : displayStatus.toLowerCase() === "under review"
                              ? "rgba(245, 158, 11, 0.1)"
                              : "rgba(59, 130, 246, 0.1)",
                          border:
                            displayStatus.toLowerCase() === "new"
                              ? "1px solid rgba(16, 185, 129, 0.3)"
                              : displayStatus.toLowerCase() === "under review"
                              ? "1px solid rgba(245, 158, 11, 0.3)"
                              : "1px solid rgba(59, 130, 246, 0.3)",
                          color:
                            displayStatus.toLowerCase() === "new"
                              ? "#10b981"
                              : displayStatus.toLowerCase() === "under review"
                              ? "#f59e0b"
                              : "#3b82f6",
                          padding: "4px 12px",
                          borderRadius: "100px",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.5px"
                        }}
                      >
                        {displayStatus}
                      </span>
                    </div>
                    <p
                      style={{
                        fontSize: "0.95rem",
                        color: "rgba(255, 255, 255, 0.5)",
                        margin: 0,
                        lineHeight: "1.4"
                      }}
                    >
                      {selectedStartup.tagline}
                    </p>
                  </div>
                </div>

                <div style={{ marginBottom: "24px" }}>
                  <h3
                    style={{
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      color: "#10b981",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      marginBottom: "12px",
                      marginTop: 0
                    }}
                  >
                    Startup Pitch
                  </h3>
                  <p
                    style={{
                      fontSize: "1rem",
                      color: "rgba(255, 255, 255, 0.7)",
                      lineHeight: "1.6",
                      margin: 0
                    }}
                  >
                    {selectedStartup.description}
                  </p>
                </div>

                <div
                  style={{
                    background: "rgba(16, 185, 129, 0.02)",
                    border: "1px solid rgba(16, 185, 129, 0.15)",
                    borderRadius: "12px",
                    padding: "20px",
                    marginBottom: "24px"
                  }}
                >
                  <h3
                    style={{
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      color: "#10b981",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      marginBottom: "16px",
                      marginTop: 0
                    }}
                  >
                    Founder Contact Summary
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: "16px"
                    }}
                  >
                    <div>
                      <h4 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#ffffff", margin: "0 0 4px 0" }}>
                        {selectedStartup.founder}
                      </h4>
                      <p style={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "0.85rem", margin: 0 }}>
                        Founder & CEO, {selectedStartup.name}
                      </p>
                    </div>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <a
                        href={`mailto:${selectedStartup.email}`}
                        className="founder-btn"
                        style={{
                          padding: "8px 16px",
                          background: "rgba(255, 255, 255, 0.03)",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                          borderRadius: "8px",
                          color: "rgba(255, 255, 255, 0.8)",
                          textDecoration: "none",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "8px",
                          fontSize: "0.85rem",
                          fontWeight: 600,
                          transition: "all var(--transition-fast)"
                        }}
                      >
                        <i className="fa-solid fa-envelope"></i>
                        <span>Email</span>
                      </a>
                      <a
                        href={selectedStartup.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="founder-btn"
                        style={{
                          padding: "8px 16px",
                          background: "rgba(255, 255, 255, 0.03)",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                          borderRadius: "8px",
                          color: "rgba(255, 255, 255, 0.8)",
                          textDecoration: "none",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "8px",
                          fontSize: "0.85rem",
                          fontWeight: 600,
                          transition: "all var(--transition-fast)"
                        }}
                      >
                        <i className="fa-brands fa-linkedin"></i>
                        <span>LinkedIn</span>
                      </a>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                    paddingTop: "20px"
                  }}
                >
                  <button
                    onClick={() => toggleShortlist(selectedStartup.id)}
                    className="btn btn-secondary"
                    style={{
                      padding: "10px 20px",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      background: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      borderRadius: "8px",
                      color: "rgba(255, 255, 255, 0.9)",
                      cursor: "pointer"
                    }}
                  >
                    <i className={`fa-${isShortlisted ? "solid" : "regular"} fa-bookmark`}></i>
                    <span>Shortlist Pitch</span>
                  </button>
                </div>
              </div>

              {/* Right Sidebar Panel: 1/3 width */}
              <div
                style={{
                  flex: "1 1 280px",
                  borderLeft: "1px solid rgba(255, 255, 255, 0.08)",
                  paddingLeft: "24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px"
                }}
              >
                {/* Tab Navigation */}
                <div
                  style={{
                    display: "flex",
                    background: "rgba(255, 255, 255, 0.02)",
                    borderRadius: "8px",
                    padding: "3px",
                    border: "1px solid rgba(255, 255, 255, 0.06)",
                    justifyContent: "space-between"
                  }}
                >
                  {[
                    { id: "overview", label: "Overview" },
                    { id: "dataroom", label: "Data Room" },
                    { id: "captable", label: "Cap Table" },
                    { id: "notes", label: "Notes" }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      style={{
                        flex: 1,
                        padding: "6px 2px",
                        borderRadius: "6px",
                        border: "none",
                        fontSize: "0.75rem",
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

                {/* Tab Content Area */}
                <div style={{ flex: 1, transition: "all 0.3s ease" }}>
                  {/* Overview Tab Content */}
                  {activeTab === "overview" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                      {/* Metrics (Funding Ask, Date) */}
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          gap: "16px",
                          background: "rgba(255, 255, 255, 0.015)",
                          border: "1px solid rgba(255, 255, 255, 0.06)",
                          borderRadius: "12px",
                          padding: "16px"
                        }}
                      >
                        <div>
                          <div
                            style={{
                              fontSize: "0.7rem",
                              textTransform: "uppercase",
                              color: "rgba(255, 255, 255, 0.5)",
                              fontWeight: 700,
                              letterSpacing: "0.5px",
                              marginBottom: "4px"
                            }}
                          >
                            Funding Ask
                          </div>
                          <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "#10b981" }}>
                            {formatAskAmount(selectedStartup.ask)}
                          </div>
                        </div>
                        <div>
                          <div
                            style={{
                              fontSize: "0.7rem",
                              textTransform: "uppercase",
                              color: "rgba(255, 255, 255, 0.5)",
                              fontWeight: 700,
                              letterSpacing: "0.5px",
                              marginBottom: "4px"
                            }}
                          >
                            Submitted Date
                          </div>
                          <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "#ffffff" }}>
                            {selectedStartup.submittedDate}
                          </div>
                        </div>
                      </div>

                      {/* Round Allocation Tracker */}
                      <div
                        style={{
                          background: "rgba(255, 255, 255, 0.015)",
                          border: "1px solid rgba(255, 255, 255, 0.06)",
                          borderRadius: "12px",
                          padding: "16px"
                        }}
                      >
                        <h4
                          style={{
                            fontSize: "0.75rem",
                            textTransform: "uppercase",
                            color: "rgba(255, 255, 255, 0.5)",
                            fontWeight: 700,
                            letterSpacing: "0.5px",
                            marginBottom: "12px",
                            marginTop: 0
                          }}
                        >
                          Round Allocation Tracker
                        </h4>
                        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                          <div
                            style={{
                              position: "relative",
                              width: "56px",
                              height: "56px",
                              flexShrink: 0
                            }}
                          >
                            <svg width="56" height="56" viewBox="0 0 56 56">
                              <circle
                                cx="28"
                                cy="28"
                                r="23"
                                fill="transparent"
                                stroke="rgba(255, 255, 255, 0.05)"
                                strokeWidth="5"
                              />
                              <circle
                                cx="28"
                                cy="28"
                                r="23"
                                fill="transparent"
                                stroke="url(#emeraldTealGrad)"
                                strokeWidth="5"
                                strokeDasharray="144.5"
                                strokeDashoffset={144.5 * (1 - 0.6)}
                                strokeLinecap="round"
                                transform="rotate(-90 28 28)"
                              />
                              <defs>
                                <linearGradient id="emeraldTealGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                  <stop offset="0%" stopColor="#10b981" />
                                  <stop offset="100%" stopColor="#14b8a6" />
                                </linearGradient>
                              </defs>
                            </svg>
                            <div
                              style={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                fontSize: "0.8rem",
                                fontWeight: 700,
                                color: "#ffffff"
                              }}
                            >
                              60%
                            </div>
                          </div>
                          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                            <span style={{ fontSize: "0.8rem", color: "#ffffff", fontWeight: 500 }}>
                              <strong style={{ color: "#10b981" }}>
                                {formatLakhs(selectedStartup.ask * 0.6)}
                              </strong>{" "}
                              Committed
                            </span>
                            <span style={{ fontSize: "0.75rem", color: "rgba(255, 255, 255, 0.4)" }}>
                              {formatLakhs(selectedStartup.ask * 0.4)} Remaining
                            </span>
                            <span
                              style={{
                                fontSize: "0.65rem",
                                color: "#10b981",
                                fontWeight: 600,
                                marginTop: "2px"
                              }}
                            >
                              3 Vetted Angels Committed
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Scorecard Widget */}
                      <div
                        style={{
                          background: "rgba(255, 255, 255, 0.015)",
                          border: "1px solid rgba(255, 255, 255, 0.06)",
                          borderRadius: "12px",
                          padding: "16px"
                        }}
                      >
                        <h4
                          style={{
                            fontSize: "0.75rem",
                            textTransform: "uppercase",
                            color: "rgba(255, 255, 255, 0.5)",
                            fontWeight: 700,
                            letterSpacing: "0.5px",
                            marginBottom: "16px",
                            marginTop: 0
                          }}
                        >
                          Team Scorecard
                        </h4>
                        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                          {[
                            {
                              key: "pedigree",
                              label: "Founder Pedigree",
                              value: (
                                startupRatings[selectedStartup.id] || {
                                  pedigree: 4.0,
                                  tailwinds: 4.2,
                                  moat: 4.5
                                }
                              ).pedigree
                            },
                            {
                              key: "tailwinds",
                              label: "Market Tailwinds",
                              value: (
                                startupRatings[selectedStartup.id] || {
                                  pedigree: 4.0,
                                  tailwinds: 4.2,
                                  moat: 4.5
                                }
                              ).tailwinds
                            },
                            {
                              key: "moat",
                              label: "Product Moat",
                              value: (
                                startupRatings[selectedStartup.id] || {
                                  pedigree: 4.0,
                                  tailwinds: 4.2,
                                  moat: 4.5
                                }
                              ).moat
                            }
                          ].map((metric) => (
                            <div
                              key={metric.key}
                              style={{ display: "flex", flexDirection: "column", gap: "4px" }}
                            >
                              <div
                                style={{
                                  fontSize: "0.75rem",
                                  display: "flex",
                                  justifyContent: "space-between"
                                }}
                              >
                                <span style={{ color: "rgba(255, 255, 255, 0.7)" }}>
                                  {metric.label}
                                </span>
                                <span style={{ color: "#10b981", fontWeight: 700 }}>
                                  {metric.value.toFixed(1)} / 5.0
                                </span>
                              </div>
                              <input
                                type="range"
                                min="1"
                                max="5"
                                step="0.1"
                                value={metric.value}
                                onChange={(e) =>
                                  updateRating(selectedStartup.id, metric.key as any, parseFloat(e.target.value))
                                }
                                className="scorecard-slider"
                                style={{ width: "100%", cursor: "pointer" }}
                              />
                            </div>
                          ))}
                        </div>

                        {/* Conviction Indicator */}
                        <div
                          className="glass-card"
                          style={{
                            marginTop: "16px",
                            padding: "12px",
                            borderRadius: "8px",
                            border: "1px solid rgba(16, 185, 129, 0.25)",
                            background: "rgba(16, 185, 129, 0.05)",
                            textAlign: "center",
                            boxShadow: "0 0 15px rgba(16, 185, 129, 0.1)"
                          }}
                        >
                          <div
                            style={{
                              fontSize: "0.7rem",
                              textTransform: "uppercase",
                              color: "#10b981",
                              fontWeight: 700,
                              letterSpacing: "0.5px",
                              marginBottom: "4px"
                            }}
                          >
                            Total Conviction Score
                          </div>
                          <div
                            style={{
                              fontSize: "1.25rem",
                              fontWeight: 800,
                              color: "#ffffff",
                              textShadow: "0 0 10px rgba(16, 185, 129, 0.4)"
                            }}
                          >
                            {(
                              ((startupRatings[selectedStartup.id] || {
                                pedigree: 4.0,
                                tailwinds: 4.2,
                                moat: 4.5
                              }).pedigree +
                                (startupRatings[selectedStartup.id] || {
                                  pedigree: 4.0,
                                  tailwinds: 4.2,
                                  moat: 4.5
                                }).tailwinds +
                                (startupRatings[selectedStartup.id] || {
                                  pedigree: 4.0,
                                  tailwinds: 4.2,
                                  moat: 4.5
                                }).moat) /
                              3
                            ).toFixed(1)}{" "}
                            / 5
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Data Room Tab Content */}
                  {activeTab === "dataroom" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                      <h4
                        style={{
                          fontSize: "0.75rem",
                          textTransform: "uppercase",
                          color: "rgba(255, 255, 255, 0.5)",
                          fontWeight: 700,
                          letterSpacing: "0.5px",
                          marginBottom: "4px",
                          marginTop: 0
                        }}
                      >
                        Available Assets
                      </h4>
                      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        {[
                          { name: `${selectedStartup.name}_PitchDeck_v2.pdf`, size: "4.2 MB", type: "pdf" },
                          { name: `${selectedStartup.name}_Financials.xlsx`, size: "1.8 MB", type: "excel" },
                          { name: `${selectedStartup.name}_CapTable.xlsx`, size: "920 KB", type: "excel" },
                          { name: `${selectedStartup.name}_OnePager.pdf`, size: "1.1 MB", type: "pdf" }
                        ].map((asset, idx) => (
                          <div
                            key={idx}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              padding: "10px 12px",
                              background: "rgba(255,255,255,0.015)",
                              border: "1px solid rgba(255,255,255,0.05)",
                              borderRadius: "8px",
                              fontSize: "0.8rem"
                            }}
                          >
                            <div style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: 0 }}>
                              {asset.type === "pdf" ? (
                                <i className="fa-solid fa-file-pdf" style={{ color: "#ef4444", fontSize: "1rem" }}></i>
                              ) : (
                                <i className="fa-solid fa-file-excel" style={{ color: "#10b981", fontSize: "1rem" }}></i>
                              )}
                              <span
                                style={{
                                  color: "rgba(255, 255, 255, 0.8)",
                                  fontWeight: 500,
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap"
                                }}
                                title={asset.name}
                              >
                                {asset.name}
                              </span>
                            </div>
                            <span
                              style={{
                                color: "rgba(255,255,255,0.4)",
                                fontSize: "0.75rem",
                                flexShrink: 0,
                                marginLeft: "8px"
                              }}
                            >
                              {asset.size}
                            </span>
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => showToast("Downloading all assets as a ZIP archive...", "info")}
                        className="btn btn-secondary"
                        style={{
                          marginTop: "8px",
                          padding: "10px",
                          fontSize: "0.8rem",
                          fontWeight: 600,
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: "8px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "8px",
                          color: "#ffffff"
                        }}
                      >
                        <i className="fa-solid fa-file-archive" style={{ color: "#eab308" }}></i>
                        <span>Download All Assets (.zip)</span>
                      </button>
                    </div>
                  )}

                  {/* Cap Table Tab Content */}
                  {activeTab === "captable" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      <h4
                        style={{
                          fontSize: "0.75rem",
                          textTransform: "uppercase",
                          color: "rgba(255, 255, 255, 0.5)",
                          fontWeight: 700,
                          letterSpacing: "0.5px",
                          marginBottom: "4px",
                          marginTop: 0
                        }}
                      >
                        Equity Distribution
                      </h4>
                      <div
                        style={{
                          background: "rgba(255,255,255,0.015)",
                          border: "1px solid rgba(255,255,255,0.05)",
                          borderRadius: "10px",
                          overflow: "hidden"
                        }}
                      >
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.75rem", textAlign: "left" }}>
                          <thead>
                            <tr
                              style={{
                                background: "rgba(255,255,255,0.02)",
                                borderBottom: "1px solid rgba(255,255,255,0.06)"
                              }}
                            >
                              <th style={{ padding: "8px 12px", color: "rgba(255,255,255,0.5)" }}>
                                Shareholder
                              </th>
                              <th style={{ padding: "8px 12px", color: "rgba(255,255,255,0.5)", textAlign: "right" }}>
                                Equity
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { role: "Founders & Team", pct: "65.0%" },
                              { role: "Angel Investors", pct: "15.0%" },
                              { role: "Option Pool (ESOP)", pct: "15.0%" },
                              { role: "Advisors", pct: "5.0%" }
                            ].map((row, index) => (
                              <tr
                                key={index}
                                style={{
                                  borderBottom: index < 3 ? "1px solid rgba(255,255,255,0.04)" : "none"
                                }}
                              >
                                <td
                                  style={{
                                    padding: "8px 12px",
                                    color: "rgba(255,255,255,0.8)",
                                    fontWeight: 500
                                  }}
                                >
                                  {row.role}
                                </td>
                                <td
                                  style={{
                                    padding: "8px 12px",
                                    color: "#10b981",
                                    fontWeight: 700,
                                    textAlign: "right"
                                  }}
                                >
                                  {row.pct}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.4)", lineHeight: "1.3" }}>
                        * Dilution projection modeled post-current Seed round completion. Class A common stock terms apply.
                      </div>
                    </div>
                  )}

                  {/* Notes Tab Content */}
                  {activeTab === "notes" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px", height: "100%" }}>
                      <h4
                        style={{
                          fontSize: "0.75rem",
                          textTransform: "uppercase",
                          color: "rgba(255, 255, 255, 0.5)",
                          fontWeight: 700,
                          letterSpacing: "0.5px",
                          marginBottom: "4px",
                          marginTop: 0
                        }}
                      >
                        Internal Diligence Notes
                      </h4>
                      <textarea
                        value={startupNotes[selectedStartup.id] || ""}
                        onChange={(e) => updateNotes(selectedStartup.id, e.target.value)}
                        placeholder="Type investment thesis, follow-up questions, or risk analysis. Auto-saves locally..."
                        style={{
                          width: "100%",
                          height: "180px",
                          background: "rgba(255,255,255,0.015)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          borderRadius: "8px",
                          padding: "10px",
                          color: "#ffffff",
                          fontSize: "0.8rem",
                          fontFamily: "inherit",
                          resize: "none",
                          outline: "none"
                        }}
                      />
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.65rem", color: "#10b981" }}>
                        <i className="fa-solid fa-cloud-arrow-up"></i>
                        <span>Saved in localStorage</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ==================== INTERACTIVE PITCH DECK MODE ==================== */}
          {modalMode === "deck" && (
            <div
              className="pitch-deck-viewer"
              style={{
                minHeight: "400px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}
            >
              {/* Active Slide content */}
              <div style={{ flex: 1, display: "flex", alignItems: "center", minHeight: "280px" }}>
                {slides[currentSlide]?.content}
              </div>

              {/* Navigation controls */}
              <div
                className="slide-controls"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderTop: "1px solid var(--border-color)",
                  paddingTop: "20px",
                  marginTop: "20px"
                }}
              >
                <button
                  disabled={currentSlide === 0}
                  onClick={() => setCurrentSlide((prev) => Math.max(0, prev - 1))}
                  className="btn btn-secondary"
                  style={{
                    opacity: currentSlide === 0 ? 0.5 : 1,
                    cursor: currentSlide === 0 ? "not-allowed" : "pointer",
                    padding: "8px 16px",
                    fontSize: "0.85rem"
                  }}
                >
                  <i className="fa-solid fa-arrow-left"></i> Previous
                </button>

                <div style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                  Slide {currentSlide + 1} of {slides.length} : <strong>{slides[currentSlide]?.title}</strong>
                </div>

                <button
                  disabled={currentSlide === slides.length - 1}
                  onClick={() => setCurrentSlide((prev) => Math.min(slides.length - 1, prev + 1))}
                  className="btn btn-primary"
                  style={{
                    opacity: currentSlide === slides.length - 1 ? 0.5 : 1,
                    cursor: currentSlide === slides.length - 1 ? "not-allowed" : "pointer",
                    padding: "8px 16px",
                    fontSize: "0.85rem"
                  }}
                >
                  Next <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>
          )}

          {/* ==================== OWNER CONTACT DETAILS MODE ==================== */}
          {modalMode === "contact" && (
            <>
              <div className="modal-header-section">
                <div className="modal-brand">
                  <div className="modal-title">
                    <h2>{selectedStartup.name} Contact Details</h2>
                    <div className="modal-meta-tags">
                      <span className="tag">{selectedStartup.sectorLabel}</span>
                      <span className="tag">{selectedStartup.stage}</span>
                    </div>
                    <p className="modal-tagline">Connect directly with the pitch owner</p>
                  </div>
                </div>
              </div>

              <div
                className="modal-founder-section"
                style={{
                  background: "rgba(47, 191, 100, 0.05)",
                  borderColor: "rgba(47, 191, 100, 0.17)",
                  marginTop: "10px"
                }}
              >
                <h3 className="modal-section-title">Pitch Owner / Founder</h3>
                <div
                  className="founder-profile"
                  style={{ flexDirection: "column", alignItems: "flex-start", gap: "16px" }}
                >
                  <div className="founder-info">
                    <h4>{selectedStartup.founder}</h4>
                    <p>Founder & CEO, {selectedStartup.name}</p>
                  </div>

                  <div
                    className="contact-details-list"
                    style={{
                      width: "100%",
                      marginTop: "10px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px"
                    }}
                  >
                    <div
                      className="contact-detail-item"
                      style={{ display: "flex", alignItems: "center", gap: "14px" }}
                    >
                      <div
                        className="detail-icon"
                        style={{
                          width: "38px",
                          height: "38px",
                          borderRadius: "50%",
                          backgroundColor: "rgba(255, 255, 255, 0.03)",
                          border: "1px solid var(--border-color)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "0.95rem",
                          color: "var(--accent)"
                        }}
                      >
                        <i className="fa-solid fa-envelope"></i>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                        <span
                          className="detail-label"
                          style={{
                            fontSize: "0.75rem",
                            color: "var(--text-secondary)",
                            fontWeight: 500
                          }}
                        >
                          Direct Email Address
                        </span>
                        <span
                          className="detail-val"
                          style={{ fontSize: "0.95rem", color: "var(--text-primary)", fontWeight: 600 }}
                        >
                          <a
                            href={`mailto:${selectedStartup.email}`}
                            style={{ color: "var(--accent)", textDecoration: "underline" }}
                          >
                            {selectedStartup.email}
                          </a>
                        </span>
                      </div>
                    </div>
                    <div
                      className="contact-detail-item"
                      style={{ display: "flex", alignItems: "center", gap: "14px" }}
                    >
                      <div
                        className="detail-icon"
                        style={{
                          width: "38px",
                          height: "38px",
                          borderRadius: "50%",
                          backgroundColor: "rgba(255, 255, 255, 0.03)",
                          border: "1px solid var(--border-color)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "0.95rem",
                          color: "var(--accent)"
                        }}
                      >
                        <i className="fa-solid fa-phone"></i>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                        <span
                          className="detail-label"
                          style={{
                            fontSize: "0.75rem",
                            color: "var(--text-secondary)",
                            fontWeight: 500
                          }}
                        >
                          Phone Number
                        </span>
                        <span
                          className="detail-val"
                          style={{ fontSize: "0.95rem", color: "var(--text-primary)", fontWeight: 600 }}
                        >
                          +91 98765 43210
                        </span>
                      </div>
                    </div>
                    <div
                      className="contact-detail-item"
                      style={{ display: "flex", alignItems: "center", gap: "14px" }}
                    >
                      <div
                        className="detail-icon"
                        style={{
                          width: "38px",
                          height: "38px",
                          borderRadius: "50%",
                          backgroundColor: "rgba(255, 255, 255, 0.03)",
                          border: "1px solid var(--border-color)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "0.95rem",
                          color: "var(--accent)"
                        }}
                      >
                        <i className="fa-brands fa-linkedin"></i>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                        <span
                          className="detail-label"
                          style={{
                            fontSize: "0.75rem",
                            color: "var(--text-secondary)",
                            fontWeight: 500
                          }}
                        >
                          LinkedIn Profile Link
                        </span>
                        <span
                          className="detail-val"
                          style={{ fontSize: "0.95rem", color: "var(--text-primary)", fontWeight: 600 }}
                        >
                          <a
                            href={selectedStartup.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "#3b82f6", textDecoration: "underline" }}
                          >
                            {selectedStartup.linkedin}
                          </a>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-footer-section">
                <button
                  className="btn btn-secondary"
                  onClick={closePitchModal}
                  style={{ padding: "10px 20px", fontWeight: 600, fontSize: "0.9rem" }}
                >
                  Close Details
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DealRoomModal;
