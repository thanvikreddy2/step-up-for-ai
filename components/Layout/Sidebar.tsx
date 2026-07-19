"use client";

import React from "react";
import { useDashboard } from "@/context/DashboardContext";
import { getInitials } from "@/lib/utils";

const Sidebar: React.FC = () => {
  const {
    activePanel,
    setActivePanel,
    isSidebarOpen,
    setIsSidebarOpen,
    profileData,
    profilePicData
  } = useDashboard();

  const menuItems = [
    { id: "home", label: "Home", icon: "fa-house" },
    { id: "pitch-decks", label: "Explore Pitches", icon: "fa-briefcase" },
    { id: "shortlisted-ideas", label: "Shortlisted Ideas", icon: "fa-bookmark" },
    { id: "about-us", label: "About Us", icon: "fa-circle-info" },
    { id: "contact-us", label: "Contact Us", icon: "fa-envelope" },
    { id: "profile", label: "Investor Profile", icon: "fa-user-tie" }
  ];

  return (
    <>
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
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  className={`nav-item ${activePanel === item.id ? "active" : ""}`}
                  onClick={() => {
                    setActivePanel(item.id);
                    setIsSidebarOpen(false);
                  }}
                >
                  <i className={`fa-solid ${item.icon}`}></i>
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
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
