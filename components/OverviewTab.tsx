"use client";

import React from "react";
import { Startup, MetricKey } from "@/types";
import { formatAskAmount, formatLakhs } from "@/lib/utils";

interface OverviewTabProps {
  startup: Startup;
  startupRatings: Record<string, { pedigree: number; tailwinds: number; moat: number }>;
  updateRating: (startupId: string, metric: MetricKey, value: number) => void;
}

const OverviewTab: React.FC<OverviewTabProps> = ({
  startup,
  startupRatings,
  updateRating
}) => {
  const currentStartupRating = startupRatings[startup.id] || { pedigree: 4.0, tailwinds: 4.2, moat: 4.5 };
  const currentAverageRating =
    (currentStartupRating.pedigree + currentStartupRating.tailwinds + currentStartupRating.moat) / 3;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", background: "rgba(255, 255, 255, 0.01)", border: "1px solid rgba(255, 255, 255, 0.05)", borderRadius: "10px", padding: "12px" }}>
        <div>
          <span style={{ fontSize: "0.65rem", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", display: "block", marginBottom: "2px" }}>Funding Ask</span>
          <strong style={{ fontSize: "1.1rem", color: "#10b981" }}>{formatAskAmount(startup.ask)}</strong>
        </div>
        <div>
          <span style={{ fontSize: "0.65rem", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", display: "block", marginBottom: "2px" }}>Submitted Date</span>
          <strong style={{ fontSize: "1.1rem", color: "#ffffff" }}>{startup.submittedDate}</strong>
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
            <div style={{ color: "#ffffff", fontWeight: 600 }}>{formatLakhs(startup.ask * 0.6)} Vetted</div>
            <div style={{ color: "rgba(255,255,255,0.4)" }}>{formatLakhs(startup.ask * 0.4)} Left</div>
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
                onChange={(e) => updateRating(startup.id, m.key as MetricKey, parseFloat(e.target.value))}
                className="scorecard-slider"
                style={{ width: "100%", cursor: "pointer" }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OverviewTab;
