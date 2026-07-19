"use client";

import React, { useState } from "react";
import { useDashboard } from "@/context/DashboardContext";
import ProfileHeader from "./ProfileHeader";
import SecuritySettings from "./SecuritySettings";
import ContactInfoCard from "./ContactInfoCard";

const ProfilePanel: React.FC = () => {
  const {
    profileData,
    setProfileData,
    setProfilePicData,
    allPitches,
    shortlistedIds,
    showToast
  } = useDashboard();

  // Local editing states
  const [isProfileEditing, setIsProfileEditing] = useState(false);
  const [tempProfileName, setTempProfileName] = useState("");
  const [tempProfileOrg, setTempProfileOrg] = useState("");
  const [tempProfileBio, setTempProfileBio] = useState("");
  const [tempProfilePhone, setTempProfilePhone] = useState("");
  const [tempProfileLinkedin, setTempProfileLinkedin] = useState("");
  const [tempProfileTwitter, setTempProfileTwitter] = useState("");
  const [tempProfileWebsite, setTempProfileWebsite] = useState("");
  const [tempFocusSectors, setTempFocusSectors] = useState<string[]>([]);

  // Password editing states
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const startEditingProfile = () => {
    setTempProfileName(profileData.name);
    setTempProfileOrg(profileData.org);
    setTempProfileBio(profileData.bio);
    setTempProfilePhone(profileData.phone);
    setTempProfileLinkedin(profileData.linkedin);
    setTempProfileTwitter(profileData.twitter);
    setTempProfileWebsite(profileData.website);
    setTempFocusSectors([...profileData.focusSectors]);
    setIsProfileEditing(true);
  };

  const cancelEditingProfile = () => {
    setIsProfileEditing(false);
  };

  const saveProfileData = () => {
    const updatedProfile = {
      name: tempProfileName.trim() || profileData.name,
      org: tempProfileOrg.trim() || profileData.org,
      bio: tempProfileBio.trim(),
      phone: tempProfilePhone.trim(),
      email: profileData.email,
      linkedin: tempProfileLinkedin.trim(),
      twitter: tempProfileTwitter.trim(),
      website: tempProfileWebsite.trim(),
      focusSectors: tempFocusSectors
    };
    setProfileData(updatedProfile);
    localStorage.setItem("stepup_profile_data", JSON.stringify(updatedProfile));
    setIsProfileEditing(false);
    showToast("Profile updated successfully!");
  };

  const toggleTempFocusSector = (sector: string) => {
    if (tempFocusSectors.includes(sector)) {
      setTempFocusSectors(tempFocusSectors.filter((s) => s !== sector));
    } else {
      setTempFocusSectors([...tempFocusSectors, sector]);
    }
  };

  const handleProfilePicUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        setProfilePicData(dataUrl);
        localStorage.setItem("stepup_profile_pic", dataUrl);
        showToast("Profile picture uploaded successfully!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      showToast("Passwords do not match!", "error");
      return;
    }
    showToast("Password updated successfully!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <section id="panel-profile" className="dashboard-panel active" style={{ animation: "fadeIn 0.4s ease" }}>
      <div className="profile-layout">
        {/* Left Column: Profile Card & Bio & Security */}
        <div className="profile-main-col">
          <ProfileHeader
            isProfileEditing={isProfileEditing}
            tempProfileName={tempProfileName}
            setTempProfileName={setTempProfileName}
            tempProfileOrg={tempProfileOrg}
            setTempProfileOrg={setTempProfileOrg}
            tempProfileBio={tempProfileBio}
            setTempProfileBio={setTempProfileBio}
            tempFocusSectors={tempFocusSectors}
            toggleTempFocusSector={toggleTempFocusSector}
            startEditingProfile={startEditingProfile}
            cancelEditingProfile={cancelEditingProfile}
            saveProfileData={saveProfileData}
            handleProfilePicUpload={handleProfilePicUpload}
          />

          <SecuritySettings
            currentPassword={currentPassword}
            setCurrentPassword={setCurrentPassword}
            newPassword={newPassword}
            setNewPassword={setNewPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            handlePasswordSubmit={handlePasswordSubmit}
          />
        </div>

        {/* Right Column: Stats & Contact Info */}
        <div className="profile-sidebar-col">
          <div className="profile-stats-card glass-card">
            <h3>Vetted Activity</h3>
            <div className="profile-stats-grid">
              <div className="profile-stat-box">
                <span className="stat-number">{allPitches.length}</span>
                <span className="stat-label">Total Vetted</span>
              </div>
              <div className="profile-stat-box">
                <span className="stat-number">{shortlistedIds.length}</span>
                <span className="stat-label">Shortlisted</span>
              </div>
            </div>
          </div>

          <ContactInfoCard
            isProfileEditing={isProfileEditing}
            tempProfilePhone={tempProfilePhone}
            setTempProfilePhone={setTempProfilePhone}
            tempProfileLinkedin={tempProfileLinkedin}
            setTempProfileLinkedin={setTempProfileLinkedin}
            tempProfileTwitter={tempProfileTwitter}
            setTempProfileTwitter={setTempProfileTwitter}
            tempProfileWebsite={tempProfileWebsite}
            setTempProfileWebsite={setTempProfileWebsite}
            saveProfileData={saveProfileData}
          />
        </div>
      </div>
    </section>
  );
};

export default ProfilePanel;
