"use client";

import React from "react";
import "@/styles/investor-dashboard.css";
import { DashboardProvider, useDashboard } from "@/context/DashboardContext";
import Sidebar from "@/components/Layout/Sidebar";
import Header from "@/components/Layout/Header";
import HomePanel from "@/components/Pages/HomePanel";
import SplitPitchDashboard from "@/components/Dashboard/SplitPitchDashboard";
import AboutPanel from "@/components/Pages/AboutPanel";
import ContactPanel from "@/components/Pages/ContactPanel";
import ProfilePanel from "@/components/Profile/ProfilePanel";
import ToastContainer from "@/components/UI/ToastContainer";

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
          {activePanel === "home" && <HomePanel />}
          
          {activePanel === "pitch-decks" && <SplitPitchDashboard />}
          
          {activePanel === "shortlisted-ideas" && <SplitPitchDashboard forcedShortlisted={true} />}
          
          {activePanel === "about-us" && <AboutPanel />}
          
          {activePanel === "contact-us" && <ContactPanel />}
          
          {activePanel === "profile" && <ProfilePanel />}
        </main>
      </div>

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
