"use client";

import React from "react";

interface SecuritySettingsProps {
  currentPassword: string;
  setCurrentPassword: (val: string) => void;
  newPassword: string;
  setNewPassword: (val: string) => void;
  confirmPassword: string;
  setConfirmPassword: (val: string) => void;
  handlePasswordSubmit: (e: React.FormEvent) => void;
}

const SecuritySettings: React.FC<SecuritySettingsProps> = ({
  currentPassword,
  setCurrentPassword,
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  handlePasswordSubmit
}) => {
  return (
    <div className="security-card glass-card">
      <h3>Security Settings</h3>
      <p className="card-subtitle">Manage your credentials</p>
      <form onSubmit={handlePasswordSubmit} className="password-form">
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
  );
};

export default SecuritySettings;
