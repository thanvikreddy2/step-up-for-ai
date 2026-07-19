"use client";

import React from "react";
import { Startup } from "@/types";

interface NotesTabProps {
  startup: Startup;
  startupNotes: Record<string, string>;
  updateNotes: (startupId: string, notesText: string) => void;
}

const NotesTab: React.FC<NotesTabProps> = ({ startup, startupNotes, updateNotes }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <textarea
        value={startupNotes[startup.id] || ""}
        onChange={(e) => updateNotes(startup.id, e.target.value)}
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
  );
};

export default NotesTab;
