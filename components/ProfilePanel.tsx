"use client";

import React from "react";
import { useDashboard } from "@/context/DashboardContext";
import { SECTORS } from "@/lib/mockData";

const ProfilePanel: React.FC = () => {
  const {
    profileData,
    profilePicData,
    isProfileEditing,
    tempProfileName,
    setTempProfileName,
    tempProfileOrg,
    setTempProfileOrg,
    tempProfileBio,
    setTempProfileBio,
    tempProfilePhone,
    setTempProfilePhone,
    tempProfileLinkedin,
    setTempProfileLinkedin,
    tempProfileTwitter,
    setTempProfileTwitter,
    tempProfileWebsite,
    setTempProfileWebsite,
    tempFocusSectors,
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    allPitches,
    shortlistedIds,
    startEditingProfile,
    cancelEditingProfile,
    saveProfileData,
    toggleTempFocusSector,
    handleProfilePicUpload,
    handlePasswordSubmit,
    getInitials
  } = useDashboard();

  const totalPitchesCount = allPitches.length;
  const shortlistedPitchesCount = shortlistedIds.length;

  return (
    <section id="panel-profile" className="dashboard-panel active">
      <div className="profile-layout">
        {/* Left Column: Profile Card & Bio */}
        <div className="profile-main-col">
          {/* Profile Header Card */}
          <div className={`profile-card glass-card ${isProfileEditing ? "edit-mode" : ""}`}>
            <div className="profile-card-header">
              <div className="profile-avatar-container">
                <div
                  className="profile-avatar-lg"
                  id="profileAvatar"
                  style={profilePicData ? { backgroundImage: `url(${profilePicData})` } : undefined}
                >
                  {!profilePicData && getInitials(profileData.name)}
                </div>
                <label
                  htmlFor="profilePicUpload"
                  className="avatar-upload-overlay"
                  id="avatarUploadOverlay"
                  title="Upload profile picture"
                >
                  <i className="fa-solid fa-camera"></i>
                  <input
                    type="file"
                    id="profilePicUpload"
                    onChange={handleProfilePicUpload}
                    accept="image/*"
                    style={{ display: "none" }}
                  />
                </label>
              </div>
              <div className="profile-headline">
                <div className="profile-name-row">
                  {isProfileEditing ? (
                    <input
                      type="text"
                      id="profileNameInput"
                      value={tempProfileName}
                      onChange={(e) => setTempProfileName(e.target.value)}
                      className="inline-input-header profile-name-input"
                    />
                  ) : (
                    <input
                      type="text"
                      id="profileNameInput"
                      value={profileData.name}
                      readOnly
                      className="inline-input-header profile-name-input"
                    />
                  )}
                  <span className="investor-badge">
                    <i className="fa-solid fa-circle-check"></i> Verified
                  </span>
                </div>
                {isProfileEditing ? (
                  <input
                    type="text"
                    id="profileOrgInput"
                    value={tempProfileOrg}
                    onChange={(e) => setTempProfileOrg(e.target.value)}
                    className="inline-input-header profile-org-input"
                  />
                ) : (
                  <input
                    type="text"
                    id="profileOrgInput"
                    value={profileData.org}
                    readOnly
                    className="inline-input-header profile-org-input"
                  />
                )}
                <p className="profile-role">Managing Partner</p>
              </div>
              <div
                className="profile-header-actions"
                style={{ display: "flex", gap: "8px", alignItems: "center" }}
              >
                {isProfileEditing && (
                  <button
                    className="btn btn-primary"
                    id="btnSaveProfileHeader"
                    onClick={saveProfileData}
                    aria-label="Save Changes"
                  >
                    <i className="fa-solid fa-check"></i>
                    <span>Save</span>
                  </button>
                )}
                <button
                  className="btn btn-secondary btn-edit-profile"
                  id="btnEditProfile"
                  onClick={isProfileEditing ? cancelEditingProfile : startEditingProfile}
                  aria-label={isProfileEditing ? "Cancel" : "Edit Profile"}
                >
                  <i className={`fa-solid ${isProfileEditing ? "fa-xmark" : "fa-pen-to-square"}`}></i>
                  <span>{isProfileEditing ? "Cancel" : "Edit Profile"}</span>
                </button>
              </div>
            </div>

            <div className="profile-card-body">
              <div className="form-group">
                <label htmlFor="profileBioInput">Professional Bio</label>
                {isProfileEditing ? (
                  <textarea
                    id="profileBioInput"
                    value={tempProfileBio}
                    onChange={(e) => setTempProfileBio(e.target.value)}
                    rows={4}
                  ></textarea>
                ) : (
                  <textarea
                    id="profileBioInput"
                    value={profileData.bio}
                    readOnly
                    rows={4}
                  ></textarea>
                )}
              </div>

              <div className="form-group">
                <label>Investment Focus</label>
                {!isProfileEditing ? (
                  <div className="focus-chips" id="focusChipsContainer">
                    {profileData.focusSectors.map((sec) => {
                      const sObj = SECTORS.find((s) => s.value === sec);
                      return (
                        <span className="chip" key={sec}>
                          {sObj ? sObj.label : sec}
                        </span>
                      );
                    })}
                  </div>
                ) : (
                  <div className="chip-edit-wrapper" id="chipEditWrapper">
                    <p className="field-help">Click to toggle investment sectors:</p>
                    <div className="focus-chips-selector" id="focusChipsSelector">
                      {SECTORS.map((sec) => {
                        const isActive = tempFocusSectors.includes(sec.value);
                        return (
                          <span
                            className={`selectable-chip ${isActive ? "active" : ""}`}
                            key={sec.value}
                            onClick={() => toggleTempFocusSector(sec.value)}
                          >
                            {sec.label}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="security-card glass-card">
            <h3>Security Settings</h3>
            <p className="card-subtitle">Manage your credentials</p>
            <form id="changePasswordForm" onSubmit={handlePasswordSubmit} className="password-form">
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="currentPassword">Current Password</label>
                  <input
                    type="password"
                    id="currentPassword"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="newPassword">New Password</label>
                  <input
                    type="password"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm New Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                  />
                </div>
              </div>
              <div className="form-actions-row">
                <button type="submit" className="btn btn-primary btn-save-password">
                  <i className="fa-solid fa-key"></i>
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Stats & Contact Info */}
        <div className="profile-sidebar-col">
          {/* Stats */}
          <div className="profile-stats-card glass-card">
            <h3>Vetted Activity</h3>
            <div className="profile-stats-grid">
              <div className="profile-stat-box">
                <span className="stat-number" id="profile-stat-vetted">
                  {totalPitchesCount}
                </span>
                <span className="stat-label">Total Vetted</span>
              </div>
              <div className="profile-stat-box">
                <span className="stat-number" id="profile-stat-shortlist">
                  {shortlistedPitchesCount}
                </span>
                <span className="stat-label">Shortlisted</span>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className={`profile-contact-card glass-card ${isProfileEditing ? "edit-mode" : ""}`}>
            <h3>Contact Information</h3>
            <div className="contact-details-list">
              <div className="contact-detail-item">
                <div className="detail-icon">
                  <i className="fa-solid fa-envelope"></i>
                </div>
                <div className="detail-info">
                  <span className="detail-label">Email (Issued by Admin)</span>
                  <span className="detail-val" id="profileEmail">
                    {profileData.email}
                  </span>
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
                      id="profilePhoneInput"
                      value={tempProfilePhone}
                      onChange={(e) => setTempProfilePhone(e.target.value)}
                      className="inline-input"
                    />
                  ) : (
                    <input
                      type="tel"
                      id="profilePhoneInput"
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
                      id="profileLinkedinInput"
                      value={tempProfileLinkedin}
                      onChange={(e) => setTempProfileLinkedin(e.target.value)}
                      className="inline-input"
                    />
                  ) : (
                    <input
                      type="url"
                      id="profileLinkedinInput"
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
                      id="profileTwitterInput"
                      value={tempProfileTwitter}
                      onChange={(e) => setTempProfileTwitter(e.target.value)}
                      className="inline-input"
                    />
                  ) : (
                    <input
                      type="url"
                      id="profileTwitterInput"
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
                      id="profileWebsiteInput"
                      value={tempProfileWebsite}
                      onChange={(e) => setTempProfileWebsite(e.target.value)}
                      className="inline-input"
                    />
                  ) : (
                    <input
                      type="url"
                      id="profileWebsiteInput"
                      value={profileData.website}
                      readOnly
                      className="inline-input"
                    />
                  )}
                </div>
              </div>
            </div>
            {isProfileEditing && (
              <div className="profile-save-row" id="profileSaveRow">
                <button className="btn btn-primary" id="btnSaveProfile" onClick={saveProfileData}>
                  <i className="fa-solid fa-check"></i> Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePanel;
