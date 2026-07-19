"use client";

import React from "react";
import { useDashboard } from "@/context/DashboardContext";

interface ContactInfoCardProps {
  isProfileEditing: boolean;
  tempProfilePhone: string;
  setTempProfilePhone: (val: string) => void;
  tempProfileLinkedin: string;
  setTempProfileLinkedin: (val: string) => void;
  tempProfileTwitter: string;
  setTempProfileTwitter: (val: string) => void;
  tempProfileWebsite: string;
  setTempProfileWebsite: (val: string) => void;
  saveProfileData: () => void;
}

const ContactInfoCard: React.FC<ContactInfoCardProps> = ({
  isProfileEditing,
  tempProfilePhone,
  setTempProfilePhone,
  tempProfileLinkedin,
  setTempProfileLinkedin,
  tempProfileTwitter,
  setTempProfileTwitter,
  tempProfileWebsite,
  setTempProfileWebsite,
  saveProfileData
}) => {
  const { profileData } = useDashboard();

  return (
    <div className={`profile-contact-card glass-card ${isProfileEditing ? "edit-mode" : ""}`}>
      <h3>Contact Information</h3>
      <div className="contact-details-list">
        <div className="contact-detail-item">
          <div className="detail-icon">
            <i className="fa-solid fa-envelope"></i>
          </div>
          <div className="detail-info">
            <span className="detail-label">Email (Issued by Admin)</span>
            <span className="detail-val">{profileData.email}</span>
          </div>
        </div>

        <div className="contact-detail-item">
          <div className="detail-icon">
            <i className="fa-solid fa-phone"></i>
          </div>
          <div className="detail-info">
            <span className="detail-label">Phone Number</span>
            {isProfileEditing ? (
              <input
                type="tel"
                value={tempProfilePhone}
                onChange={(e) => setTempProfilePhone(e.target.value)}
                className="inline-input"
              />
            ) : (
              <input
                type="tel"
                value={profileData.phone}
                readOnly
                className="inline-input"
              />
            )}
          </div>
        </div>

        <div className="contact-detail-item">
          <div className="detail-icon">
            <i className="fa-brands fa-linkedin"></i>
          </div>
          <div className="detail-info">
            <span className="detail-label">LinkedIn Link</span>
            {isProfileEditing ? (
              <input
                type="url"
                value={tempProfileLinkedin}
                onChange={(e) => setTempProfileLinkedin(e.target.value)}
                className="inline-input"
              />
            ) : (
              <input
                type="url"
                value={profileData.linkedin}
                readOnly
                className="inline-input"
              />
            )}
          </div>
        </div>

        <div className="contact-detail-item">
          <div className="detail-icon">
            <i className="fa-brands fa-x-twitter"></i>
          </div>
          <div className="detail-info">
            <span className="detail-label">Twitter / X Link</span>
            {isProfileEditing ? (
              <input
                type="url"
                value={tempProfileTwitter}
                onChange={(e) => setTempProfileTwitter(e.target.value)}
                className="inline-input"
              />
            ) : (
              <input
                type="url"
                value={profileData.twitter}
                readOnly
                className="inline-input"
              />
            )}
          </div>
        </div>

        <div className="contact-detail-item">
          <div className="detail-icon">
            <i className="fa-solid fa-globe"></i>
          </div>
          <div className="detail-info">
            <span className="detail-label">Website / Fund Link</span>
            {isProfileEditing ? (
              <input
                type="url"
                value={tempProfileWebsite}
                onChange={(e) => setTempProfileWebsite(e.target.value)}
                className="inline-input"
              />
            ) : (
              <input
                type="url"
                value={profileData.website}
                readOnly
                className="inline-input"
              />
            )}
          </div>
        </div>
      </div>
      {isProfileEditing && (
        <div className="profile-save-row">
          <button className="btn btn-primary" onClick={saveProfileData}>
            <i className="fa-solid fa-check"></i> Save Changes
          </button>
        </div>
      )}
    </div>
  );
};

export default ContactInfoCard;
