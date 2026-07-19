"use client";

import React from "react";
import { useDashboard } from "@/context/DashboardContext";
import { SECTORS } from "@/lib/mockData";
import { getInitials } from "@/lib/utils";

interface ProfileHeaderProps {
  isProfileEditing: boolean;
  tempProfileName: string;
  setTempProfileName: (val: string) => void;
  tempProfileOrg: string;
  setTempProfileOrg: (val: string) => void;
  tempProfileBio: string;
  setTempProfileBio: (val: string) => void;
  tempFocusSectors: string[];
  toggleTempFocusSector: (sector: string) => void;
  startEditingProfile: () => void;
  cancelEditingProfile: () => void;
  saveProfileData: () => void;
  handleProfilePicUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  isProfileEditing,
  tempProfileName,
  setTempProfileName,
  tempProfileOrg,
  setTempProfileOrg,
  tempProfileBio,
  setTempProfileBio,
  tempFocusSectors,
  toggleTempFocusSector,
  startEditingProfile,
  cancelEditingProfile,
  saveProfileData,
  handleProfilePicUpload
}) => {
  const { profileData, profilePicData } = useDashboard();

  return (
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
          <label htmlFor="profilePicUpload" className="avatar-upload-overlay" title="Upload profile picture">
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
                value={tempProfileName}
                onChange={(e) => setTempProfileName(e.target.value)}
                className="inline-input-header profile-name-input"
              />
            ) : (
              <input
                type="text"
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
              value={tempProfileOrg}
              onChange={(e) => setTempProfileOrg(e.target.value)}
              className="inline-input-header profile-org-input"
            />
          ) : (
            <input
              type="text"
              value={profileData.org}
              readOnly
              className="inline-input-header profile-org-input"
            />
          )}
          <p className="profile-role">Managing Partner</p>
        </div>
        <div className="profile-header-actions" style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          {isProfileEditing && (
            <button className="btn btn-primary" onClick={saveProfileData} aria-label="Save Changes">
              <i className="fa-solid fa-check"></i>
              <span>Save</span>
            </button>
          )}
          <button
            className="btn btn-secondary btn-edit-profile"
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
            <div className="focus-chips">
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
            <div className="chip-edit-wrapper">
              <p className="field-help">Click to toggle investment sectors:</p>
              <div className="focus-chips-selector">
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
  );
};

export default ProfileHeader;
