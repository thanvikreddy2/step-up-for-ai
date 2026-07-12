"use client";

import React from "react";
import "@/styles/investor-dashboard.css";
import { DashboardProvider, useDashboard } from "@/context/DashboardContext";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import StatsStrip from "@/components/StatsStrip";
import FilterBar from "@/components/FilterBar";
import StartupGrid from "@/components/StartupGrid";
import DealRoomModal from "@/components/DealRoomModal";
import ProfilePanel from "@/components/ProfilePanel";
import ToastContainer from "@/components/ToastContainer";

function DashboardContent() {
  const { activePanel, isMounted } = useDashboard();

  if (!isMounted) {
    return (
      <div
        className="loading-screen"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          background: "#030712",
          color: "#2fbf64"
        }}
      >
        <h3>Loading StepUp Dashboard...</h3>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Sidebar />
      
      <div className="main-content">
        <Header />
        
        <main className="panels-container">
          {activePanel === "pitch-decks" && (
            <section id="panel-pitch-decks" className="dashboard-panel active">
              <StatsStrip />
              <FilterBar />
              <StartupGrid />
            </section>
          )}

          {activePanel === "profile" && <ProfilePanel />}
        </main>
      </div>

      <DealRoomModal />
      <ToastContainer />
    </div>
  );
}

export default function Page() {
  return (
    <DashboardProvider>
      <DashboardContent />
    </DashboardProvider>
  );
}
