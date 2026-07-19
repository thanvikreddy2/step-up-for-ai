"use client";

import React from "react";

const AboutPanel: React.FC = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "30px", animation: "fadeIn 0.4s ease" }}>
      {/* About Header Card */}
      <div
        className="glass-card"
        style={{
          padding: "35px",
          borderRadius: "16px",
          border: "1px solid var(--border-color)",
          background: "rgba(9, 15, 27, 0.85)"
        }}
      >
        <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "#ffffff", marginBottom: "16px", marginTop: 0 }}>
          About StepUp for AI
        </h2>
        <p style={{ fontSize: "1.05rem", color: "var(--text-secondary)", lineHeight: "1.7", margin: 0 }}>
          StepUp for AI is a private vetted venture investment network connecting institutional funds, family offices, and accredited angel investors with high-conviction early-stage startups. We prioritize startups leveraging artificial intelligence, climate technology, fintech solutions, SaaS builders, and edtech platforms.
        </p>
      </div>

      {/* Philosophy and Diligence */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", flexWrap: "wrap" }}>
        <div
          className="glass-card"
          style={{
            padding: "24px",
            border: "1px solid var(--border-color)",
            borderRadius: "12px",
            background: "rgba(255,255,255,0.015)"
          }}
        >
          <div style={{ color: "var(--accent)", fontSize: "1.25rem", marginBottom: "12px" }}>
            <i className="fa-solid fa-shield-halved" style={{ marginRight: "10px" }}></i>
            <strong>Vetted Due Diligence</strong>
          </div>
          <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
            Every startup listed on StepUp undergo thorough filter review processes. We evaluate team backgrounds, verify technical prototypes, assess early market traction, and validate financial projections before launching their deal rooms.
          </p>
        </div>

        <div
          className="glass-card"
          style={{
            padding: "24px",
            border: "1px solid var(--border-color)",
            borderRadius: "12px",
            background: "rgba(255,255,255,0.015)"
          }}
        >
          <div style={{ color: "var(--accent)", fontSize: "1.25rem", marginBottom: "12px" }}>
            <i className="fa-solid fa-arrows-spin" style={{ marginRight: "10px" }}></i>
            <strong>Co-Investment Network</strong>
          </div>
          <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
            Our syndicate model allows lead investors and angel syndicates to commit capital together. By pooling resources and diligence notes, we speed up rounds and reduce post-seed dilution bottlenecks.
          </p>
        </div>
      </div>

      {/* Vetting Criteria List */}
      <div
        className="glass-card"
        style={{
          padding: "30px",
          border: "1px solid var(--border-color)",
          borderRadius: "12px"
        }}
      >
        <h3 style={{ fontSize: "1.25rem", color: "#ffffff", marginBottom: "20px", marginTop: 0 }}>
          Vetted Pitch Criteria
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {[
            {
              title: "Founder Pedigree",
              desc: "Technical excellence, prior execution capability, and high subject-matter domain competence."
            },
            {
              title: "Market Tailwinds",
              desc: "Startups targeting growing market industries with strong regulatory or tech adoptions."
            },
            {
              title: "Product Moat & IP",
              desc: "Proprietary code structures, speech speech models, smart smart contracts, or seaweed formulas."
            },
            {
              title: "Financial Sanity",
              desc: "Vetted cap tables, realistic post-seed equity distribution, and clear pathway to break-even ARR."
            }
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                gap: "15px",
                alignItems: "flex-start",
                borderBottom: idx < 3 ? "1px solid rgba(255, 255, 255, 0.05)" : "none",
                paddingBottom: idx < 3 ? "16px" : 0
              }}
            >
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  background: "var(--accent-glow)",
                  color: "var(--accent)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  flexShrink: 0
                }}
              >
                {idx + 1}
              </div>
              <div>
                <h4 style={{ fontSize: "1rem", color: "#ffffff", margin: "0 0 4px 0", fontWeight: 600 }}>{item.title}</h4>
                <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", margin: 0, lineHeight: 1.4 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPanel;
