"use client";

import React from "react";
import { useDashboard } from "@/context/DashboardContext";

const Sidebar: React.FC = () => {
  const {
    activePanel,
    setActivePanel,
    isSidebarOpen,
    setIsSidebarOpen,
    profileData,
    profilePicData,
    getInitials
  } = useDashboard();

  return (
    <>
      {/* Mobile Sidebar Backdrop Overlay */}
      <div
        className={`sidebar-overlay ${isSidebarOpen ? "open" : ""}`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`} id="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <span className="logo-text">
              StepUp <span className="logo-accent">for AI</span>
            </span>
          </div>
          <button
            className="btn-close-sidebar"
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close Sidebar"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <nav className="sidebar-nav">
          <ul>
            <li>
              <button
                className={`nav-item ${activePanel === "pitch-decks" ? "active" : ""}`}
                onClick={() => {
                  setActivePanel("pitch-decks");
                  setIsSidebarOpen(false);
                }}
              >
                <i className="fa-solid fa-briefcase"></i>
                <span>Pitch Decks</span>
              </button>
            </li>
            <li>
              <button
                className={`nav-item ${activePanel === "profile" ? "active" : ""}`}
                onClick={() => {
                  setActivePanel("profile");
                  setIsSidebarOpen(false);
                }}
              >
                <i className="fa-solid fa-user-tie"></i>
                <span>Investor Profile</span>
              </button>
            </li>
          </ul>
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile-sm">
            <div
              className="avatar-sm"
              style={profilePicData ? { backgroundImage: `url(${profilePicData})` } : undefined}
            >
              {!profilePicData && getInitials(profileData.name)}
            </div>
            <div className="user-info-sm">
              <h4 className="user-name">{profileData.name}</h4>
              <span className="user-role">Vetted Investor</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
