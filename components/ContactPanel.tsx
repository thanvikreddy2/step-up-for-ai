"use client";

import React, { useState } from "react";
import { useDashboard } from "@/context/DashboardContext";

const ContactPanel: React.FC = () => {
  const { profileData, showToast } = useDashboard();
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) {
      showToast("Please fill in all fields", "error");
      return;
    }
    const text = `Hello StepUp Team,\n\nName: ${profileData.name}\nSubject: ${subject}\nMessage: ${message}`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=918341011206&text=${encodeURIComponent(text)}`;
    showToast("Opening WhatsApp support channel...");
    window.open(whatsappUrl, "_blank");
    setSubject("");
    setMessage("");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "30px", animation: "fadeIn 0.4s ease" }}>
      {/* Contact Header */}
      <div
        className="glass-card"
        style={{
          padding: "35px",
          borderRadius: "16px",
          border: "1px solid var(--border-color)",
          background: "rgba(9, 15, 27, 0.85)"
        }}
      >
        <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "#ffffff", marginBottom: "12px", marginTop: 0 }}>
          Contact investment Desk
        </h2>
        <p style={{ fontSize: "1.05rem", color: "var(--text-secondary)", lineHeight: "1.6", margin: 0 }}>
          Have general inquiries, syndicate setup questions, or want to submit a new startup recommendation? Fill out the contact form below to directly connect with StepUp's administration team via WhatsApp.
        </p>
      </div>

      <div style={{ display: "flex", gap: "24px", flexDirection: "row", flexWrap: "wrap" }}>
        {/* Contact Form (Left) */}
        <div style={{ flex: "2 1 450px" }}>
          <form className="glass-card" onSubmit={handleSubmit} style={{ padding: "30px", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
            <h3 style={{ fontSize: "1.25rem", color: "#ffffff", marginBottom: "20px", marginTop: 0 }}>
              Submit Inquiry
            </h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div className="form-group">
                <label style={{ fontSize: "0.85rem", color: "var(--text-secondary)", fontWeight: 600, display: "block", marginBottom: "8px" }}>
                  Your Name
                </label>
                <input
                  type="text"
                  value={profileData.name}
                  disabled
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    background: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid var(--border-color)",
                    borderRadius: "8px",
                    color: "rgba(255, 255, 255, 0.4)",
                    outline: "none",
                    cursor: "not-allowed"
                  }}
                />
              </div>

              <div className="form-group">
                <label htmlFor="contactSubject" style={{ fontSize: "0.85rem", color: "var(--text-secondary)", fontWeight: 600, display: "block", marginBottom: "8px" }}>
                  Subject
                </label>
                <input
                  type="text"
                  id="contactSubject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Syndicate partnership, Seed allocation"
                  required
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    background: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid var(--border-color)",
                    borderRadius: "8px",
                    color: "#ffffff",
                    outline: "none"
                  }}
                />
              </div>

              <div className="form-group">
                <label htmlFor="contactMessage" style={{ fontSize: "0.85rem", color: "var(--text-secondary)", fontWeight: 600, display: "block", marginBottom: "8px" }}>
                  Message Content
                </label>
                <textarea
                  id="contactMessage"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type details of your inquiry here..."
                  rows={5}
                  required
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    background: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid var(--border-color)",
                    borderRadius: "8px",
                    color: "#ffffff",
                    outline: "none",
                    fontFamily: "inherit",
                    resize: "none"
                  }}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary" style={{ padding: "12px 20px", fontWeight: 600, fontSize: "0.95rem" }}>
                <i className="fa-solid fa-paper-plane" style={{ marginRight: "8px" }}></i>
                Send Message via WhatsApp
              </button>
            </div>
          </form>
        </div>

        {/* Contact Info (Right) */}
        <div style={{ flex: "1 1 280px" }}>
          <div className="glass-card" style={{ padding: "30px", borderRadius: "12px", border: "1px solid var(--border-color)", height: "100%" }}>
            <h3 style={{ fontSize: "1.25rem", color: "#ffffff", marginBottom: "20px", marginTop: 0 }}>
              Office Details
            </h3>
            
            <div className="contact-details-list" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div className="contact-detail-item" style={{ display: "flex", gap: "14px", alignItems: "center" }}>
                <div className="detail-icon" style={{ width: "36px", height: "36px", borderRadius: "50%", background: "rgba(255,255,255,0.02)", border: "1px solid var(--border-color)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--accent)" }}>
                  <i className="fa-solid fa-phone"></i>
                </div>
                <div className="detail-info">
                  <span className="detail-label" style={{ fontSize: "0.75rem", color: "var(--text-secondary)", display: "block" }}>Phone Number</span>
                  <span className="detail-val" style={{ fontSize: "0.9rem", color: "#ffffff", fontWeight: 600 }}>+91 83410 11206</span>
                </div>
              </div>

              <div className="contact-detail-item" style={{ display: "flex", gap: "14px", alignItems: "center" }}>
                <div className="detail-icon" style={{ width: "36px", height: "36px", borderRadius: "50%", background: "rgba(255,255,255,0.02)", border: "1px solid var(--border-color)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--accent)" }}>
                  <i className="fa-solid fa-envelope"></i>
                </div>
                <div className="detail-info">
                  <span className="detail-label" style={{ fontSize: "0.75rem", color: "var(--text-secondary)", display: "block" }}>Admin Email</span>
                  <span className="detail-val" style={{ fontSize: "0.9rem", color: "#ffffff", fontWeight: 600 }}>admin@stepupai.com</span>
                </div>
              </div>

              <div className="contact-detail-item" style={{ display: "flex", gap: "14px", alignItems: "center" }}>
                <div className="detail-icon" style={{ width: "36px", height: "36px", borderRadius: "50%", background: "rgba(255,255,255,0.02)", border: "1px solid var(--border-color)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--accent)" }}>
                  <i className="fa-solid fa-location-dot"></i>
                </div>
                <div className="detail-info">
                  <span className="detail-label" style={{ fontSize: "0.75rem", color: "var(--text-secondary)", display: "block" }}>Headquarters</span>
                  <span className="detail-val" style={{ fontSize: "0.9rem", color: "#ffffff", fontWeight: 600 }}>Gachibowli, Hyderabad, India</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPanel;
