"use client";

import React from "react";

const CapTableTab: React.FC = () => {
  return (
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
  );
};

export default CapTableTab;
