"use client";

import React from "react";
import { useDashboard } from "@/context/DashboardContext";

const ToastContainer: React.FC = () => {
  const { toasts } = useDashboard();

  return (
    <div className="toast-container" id="toastContainer">
      {toasts.map((t) => (
        <div key={t.id} className={`toast ${t.type} show`}>
          <div className="toast-content">
            {t.type === "success" && <i className="fa-solid fa-circle-check toast-icon"></i>}
            {t.type === "info" && <i className="fa-solid fa-circle-info toast-icon"></i>}
            {t.type === "error" && <i className="fa-solid fa-circle-exclamation toast-icon"></i>}
            <span className="toast-message">{t.message}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
