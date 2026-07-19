"use client";

import React from "react";
import { useDashboard } from "@/context/DashboardContext";

const Header: React.FC = () => {
  const { activePanel, setIsSidebarOpen } = useDashboard();

  const getTitle = () => {
    switch (activePanel) {
      case "home":
        return "Home Portal";
      case "pitch-decks":
        return "Explore Pitches";
      case "shortlisted-ideas":
        return "Shortlisted Ideas";
      case "about-us":
        return "About StepUp";
      case "contact-us":
        return "Contact Investment Team";
      case "profile":
        return "Investor Profile";
      default:
        return "Investor Portal";
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button
          className="btn-hamburger"
          onClick={() => setIsSidebarOpen(true)}
          aria-label="Open Sidebar"
        >
          <i className="fa-solid fa-bars"></i>
        </button>
        <h1 className="panel-title" id="panelTitle">
          {getTitle()}
        </h1>
      </div>

      <div className="topbar-right">
        <div className="investor-badge">
          <i className="fa-solid fa-circle-check"></i>
          <span>Verified Investor</span>
        </div>
        <button
          onClick={handleLogout}
          className="btn-logout"
          style={{ background: "transparent", cursor: "pointer", fontFamily: "inherit" }}
          aria-label="Logout"
        >
          <i className="fa-solid fa-right-from-bracket"></i>
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
