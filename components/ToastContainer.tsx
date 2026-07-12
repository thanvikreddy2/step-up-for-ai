"use client";

import React from "react";
import { useDashboard } from "@/context/DashboardContext";

const ToastContainer: React.FC = () => {
  const { toasts } = useDashboard();

  return (
    <div className="toast-container" id="toastContainer" aria-live="polite">
      {toasts.map((t) => (
        <div className={`running-toast toast ${t.type}`} key={t.id}>
          <div className="toast-content-wrapper">
            <div className="toast-icon">
              {t.type === "success" && <i className="fa-solid fa-circle-check"></i>}
              {t.type === "info" && <i className="fa-solid fa-circle-info"></i>}
              {t.type === "error" && <i className="fa-solid fa-circle-exclamation"></i>}
            </div>
            <div className="toast-message">{t.message}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
