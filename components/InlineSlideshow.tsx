"use client";

import React from "react";
import { Startup, PitchDeckDetails } from "@/types";
import { renderSlideContent, slideTitles } from "./SlideRenderers";

interface InlineSlideshowProps {
  startup: Startup;
  deck: PitchDeckDetails;
  currentSlide: number;
  setCurrentSlide: React.Dispatch<React.SetStateAction<number>>;
  onDownloadPDF: () => void;
}

const InlineSlideshow: React.FC<InlineSlideshowProps> = ({
  startup,
  deck,
  currentSlide,
  setCurrentSlide,
  onDownloadPDF
}) => {
  const totalSlidesCount = 10;

  return (
    <div
      className="pitch-deck-viewer"
      style={{
        minHeight: "350px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "rgba(255,255,255,0.01)",
        border: "1px solid rgba(255,255,255,0.05)",
        borderRadius: "12px",
        padding: "20px",
        boxSizing: "border-box",
        position: "relative"
      }}
    >
      <button
        className="btn-download-pdf"
        onClick={onDownloadPDF}
        title="Download Slides as PDF"
        style={{
          position: "absolute",
          top: "12px",
          right: "12px",
          background: "rgba(47, 191, 100, 0.15)",
          border: "1px solid rgba(47, 191, 100, 0.3)",
          color: "var(--accent)",
          height: "28px",
          borderRadius: "6px",
          fontSize: "0.75rem",
          fontWeight: 600,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "4px",
          padding: "0 10px",
          zIndex: 2
        }}
      >
        <i className="fa-solid fa-file-pdf"></i>
        <span>Download PDF</span>
      </button>

      <div style={{ flex: 1, display: "flex", alignItems: "center", minHeight: "220px", padding: "10px 0" }}>
        {renderSlideContent(currentSlide, startup, deck)}
      </div>

      <div
        className="slide-controls"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          paddingTop: "12px",
          marginTop: "12px"
        }}
      >
        <button
          disabled={currentSlide === 0}
          onClick={() => setCurrentSlide((prev) => Math.max(0, prev - 1))}
          className="btn btn-secondary"
          style={{
            opacity: currentSlide === 0 ? 0.4 : 1,
            cursor: currentSlide === 0 ? "not-allowed" : "pointer",
            padding: "6px 12px",
            fontSize: "0.75rem"
          }}
        >
          <i className="fa-solid fa-arrow-left"></i> Previous
        </button>

        <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
          Slide {currentSlide + 1} of {totalSlidesCount} : <strong>{slideTitles[currentSlide]}</strong>
        </div>

        <button
          disabled={currentSlide === totalSlidesCount - 1}
          onClick={() => setCurrentSlide((prev) => Math.min(totalSlidesCount - 1, prev + 1))}
          className="btn btn-primary"
          style={{
            opacity: currentSlide === totalSlidesCount - 1 ? 0.4 : 1,
            cursor: currentSlide === totalSlidesCount - 1 ? "not-allowed" : "pointer",
            padding: "6px 12px",
            fontSize: "0.75rem"
          }}
        >
          Next <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
};

export default InlineSlideshow;
