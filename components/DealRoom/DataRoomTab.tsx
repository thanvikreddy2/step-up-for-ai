"use client";

import React from "react";
import { Startup } from "@/types";

interface DataRoomTabProps {
  startup: Startup;
  showToast: (message: string, type?: "success" | "info" | "error") => void;
}

const DataRoomTab: React.FC<DataRoomTabProps> = ({ startup, showToast }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {[
          { name: `${startup.name}_PitchDeck_v2.pdf`, size: "4.2 MB", type: "pdf" },
          { name: `${startup.name}_Financials.xlsx`, size: "1.8 MB", type: "excel" },
          { name: `${startup.name}_CapTable.xlsx`, size: "920 KB", type: "excel" }
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
  );
};

export default DataRoomTab;
