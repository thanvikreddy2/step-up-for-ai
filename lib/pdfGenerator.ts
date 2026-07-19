import { Startup, PitchDeckDetails } from "@/types";

export const downloadPitchDeckPDF = async (
  startup: Startup,
  deck: PitchDeckDetails,
  showToast: (message: string, type?: "success" | "info" | "error") => void
) => {
  showToast("Preparing PDF download...", "info");

  try {
    let html2pdf: any;
    if (typeof window !== "undefined") {
      if ((window as any).html2pdf) {
        html2pdf = (window as any).html2pdf;
      } else {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement("script");
          script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
          script.onload = () => resolve();
          script.onerror = () => reject(new Error("Failed to load PDF library"));
          document.head.appendChild(script);
        });
        html2pdf = (window as any).html2pdf;
      }
    }

    if (!html2pdf) {
      throw new Error("PDF library not loaded");
    }

    const element = document.createElement("div");
    element.style.width = "277mm";
    element.style.color = "#ffffff";
    element.style.backgroundColor = "#0b0f19";
    element.style.fontFamily = "'Inter', sans-serif";
    element.style.lineHeight = "1.6";

    element.innerHTML = `
      <div style="width: 277mm; height: 190mm; box-sizing: border-box; padding: 45px; color: #ffffff; background-color: #0b0f19; font-family: 'Inter', sans-serif; display: flex; flex-direction: column; justify-content: space-between; page-break-after: always;">
        <div style="border-bottom: 2px solid #2fbf64; padding-bottom: 15px; display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 14px; font-weight: 800; color: #2fbf64; text-transform: uppercase;">StepUp for AI | Pitch Deck</span>
          <span style="font-size: 12px; color: #94a3b8;">Slide 1 of 10</span>
        </div>
        <div style="text-align: center; margin: auto 0;">
          <div style="width: 80px; height: 80px; background: ${startup.logoBg}; border-radius: 16px; margin: 0 auto 24px; display: flex; align-items: center; justify-content: center; font-size: 32px; font-weight: 800; color: #ffffff;">
            ${startup.logoText}
          </div>
          <h1 style="font-size: 44px; font-weight: 800; color: #ffffff; margin-bottom: 16px; margin-top: 0;">${startup.name}</h1>
          <p style="font-size: 20px; font-style: italic; color: #94a3b8; max-width: 700px; margin: 0 auto;">"${startup.tagline}"</p>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255, 255, 255, 0.08); padding-top: 15px; font-size: 12px; color: #94a3b8;">
          <span>Confidential Investment Summary</span>
          <span>Generated on ${new Date().toLocaleDateString()}</span>
        </div>
      </div>

      <div style="width: 277mm; height: 190mm; box-sizing: border-box; padding: 45px; color: #ffffff; background-color: #0b0f19; font-family: 'Inter', sans-serif; display: flex; flex-direction: column; justify-content: space-between; page-break-after: always;">
        <div style="border-bottom: 2px solid #2fbf64; padding-bottom: 15px; display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 14px; font-weight: 800; color: #2fbf64; text-transform: uppercase;">StepUp for AI | ${startup.name}</span>
          <span style="font-size: 12px; color: #94a3b8;">Slide 2 of 10</span>
        </div>
        <div style="margin: auto 0;">
          <span style="color: #ef4444; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 8px;">The Problem</span>
          <h2 style="font-size: 32px; font-weight: 800; color: #ffffff; margin-bottom: 24px; margin-top: 0;">What Issue Are We Solving?</h2>
          <p style="font-size: 20px; color: #e2e8f0; line-height: 1.8; border-left: 4px solid #ef4444; padding-left: 20px; margin: 0;">
            ${deck.problem}
          </p>
        </div>
        <div style="border-top: 1px solid rgba(255, 255, 255, 0.08); padding-top: 15px; font-size: 12px; color: #94a3b8;">
          <span>Confidential Investment Summary</span>
        </div>
      </div>

      <div style="width: 277mm; height: 190mm; box-sizing: border-box; padding: 45px; color: #ffffff; background-color: #0b0f19; font-family: 'Inter', sans-serif; display: flex; flex-direction: column; justify-content: space-between; page-break-after: always;">
        <div style="border-bottom: 2px solid #2fbf64; padding-bottom: 15px; display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 14px; font-weight: 800; color: #2fbf64; text-transform: uppercase;">StepUp for AI | ${startup.name}</span>
          <span style="font-size: 12px; color: #94a3b8;">Slide 3 of 10</span>
        </div>
        <div style="margin: auto 0;">
          <span style="color: #2fbf64; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 8px;">The Solution</span>
          <h2 style="font-size: 32px; font-weight: 800; color: #ffffff; margin-bottom: 24px; margin-top: 0;">Our Product & Innovation</h2>
          <p style="font-size: 20px; color: #e2e8f0; line-height: 1.8; border-left: 4px solid #2fbf64; padding-left: 20px; margin: 0;">
            ${deck.solution}
          </p>
        </div>
        <div style="border-top: 1px solid rgba(255, 255, 255, 0.08); padding-top: 15px; font-size: 12px; color: #94a3b8;">
          <span>Confidential Investment Summary</span>
        </div>
      </div>

      <div style="width: 277mm; height: 190mm; box-sizing: border-box; padding: 45px; color: #ffffff; background-color: #0b0f19; font-family: 'Inter', sans-serif; display: flex; flex-direction: column; justify-content: space-between; page-break-after: always;">
        <div style="border-bottom: 2px solid #2fbf64; padding-bottom: 15px; display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 14px; font-weight: 800; color: #2fbf64; text-transform: uppercase;">StepUp for AI | ${startup.name}</span>
          <span style="font-size: 12px; color: #94a3b8;">Slide 4 of 10</span>
        </div>
        <div style="margin: auto 0;">
          <span style="color: #3b82f6; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 8px;">Market Opportunity</span>
          <h2 style="font-size: 32px; font-weight: 800; color: #ffffff; margin-bottom: 30px; margin-top: 0;">Target Sector & Market Size</h2>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
            <div style="background: rgba(255, 255, 255, 0.03); padding: 25px; border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.08);">
              <div style="font-size: 14px; color: #94a3b8; margin-bottom: 6px;">Target Sector</div>
              <div style="font-size: 24px; font-weight: 700; color: #ffffff;">${startup.sectorLabel}</div>
            </div>
            <div style="background: rgba(255, 255, 255, 0.03); padding: 25px; border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.08);">
              <div style="font-size: 14px; color: #94a3b8; margin-bottom: 6px;">Funding Stage</div>
              <div style="font-size: 24px; font-weight: 700; color: #ffffff;">${startup.stage}</div>
            </div>
          </div>
        </div>
        <div style="border-top: 1px solid rgba(255, 255, 255, 0.08); padding-top: 15px; font-size: 12px; color: #94a3b8;">
          <span>Confidential Investment Summary</span>
        </div>
      </div>

      <div style="width: 277mm; height: 190mm; box-sizing: border-box; padding: 45px; color: #ffffff; background-color: #0b0f19; font-family: 'Inter', sans-serif; display: flex; flex-direction: column; justify-content: space-between; page-break-after: always;">
        <div style="border-bottom: 2px solid #2fbf64; padding-bottom: 15px; display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 14px; font-weight: 800; color: #2fbf64; text-transform: uppercase;">StepUp for AI | ${startup.name}</span>
          <span style="font-size: 12px; color: #94a3b8;">Slide 5 of 10</span>
        </div>
        <div style="margin: auto 0;">
          <span style="color: #ec4899; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 8px;">Product & Traction</span>
          <h2 style="font-size: 32px; font-weight: 800; color: #ffffff; margin-bottom: 20px; margin-top: 0;">Milestones & User Growth</h2>
          <p style="font-size: 18px; color: #e2e8f0; line-height: 1.8; margin-bottom: 20px; text-align: justify;">
            ${startup.description}
          </p>
          <div style="font-size: 14px; color: #94a3b8;">
            Submitted Date: <strong>${startup.submittedDate}</strong> | Current Status: <strong>${startup.status}</strong>
          </div>
        </div>
        <div style="border-top: 1px solid rgba(255, 255, 255, 0.08); padding-top: 15px; font-size: 12px; color: #94a3b8;">
          <span>Confidential Investment Summary</span>
        </div>
      </div>

      <div style="width: 277mm; height: 190mm; box-sizing: border-box; padding: 45px; color: #ffffff; background-color: #0b0f19; font-family: 'Inter', sans-serif; display: flex; flex-direction: column; justify-content: space-between; page-break-after: always;">
        <div style="border-bottom: 2px solid #2fbf64; padding-bottom: 15px; display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 14px; font-weight: 800; color: #2fbf64; text-transform: uppercase;">StepUp for AI | ${startup.name}</span>
          <span style="font-size: 12px; color: #94a3b8;">Slide 6 of 10</span>
        </div>
        <div style="margin: auto 0;">
          <span style="color: #eab308; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 8px;">Business Model</span>
          <h2 style="font-size: 32px; font-weight: 800; color: #ffffff; margin-bottom: 24px; margin-top: 0;">How We Generate Revenue</h2>
          <p style="font-size: 20px; color: #e2e8f0; line-height: 1.8; border-left: 4px solid #eab308; padding-left: 20px; margin: 0;">
            ${deck.businessModel}
          </p>
        </div>
        <div style="border-top: 1px solid rgba(255, 255, 255, 0.08); padding-top: 15px; font-size: 12px; color: #94a3b8;">
          <span>Confidential Investment Summary</span>
        </div>
      </div>

      <div style="width: 277mm; height: 190mm; box-sizing: border-box; padding: 45px; color: #ffffff; background-color: #0b0f19; font-family: 'Inter', sans-serif; display: flex; flex-direction: column; justify-content: space-between; page-break-after: always;">
        <div style="border-bottom: 2px solid #2fbf64; padding-bottom: 15px; display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 14px; font-weight: 800; color: #2fbf64; text-transform: uppercase;">StepUp for AI | ${startup.name}</span>
          <span style="font-size: 12px; color: #94a3b8;">Slide 7 of 10</span>
        </div>
        <div style="margin: auto 0;">
          <span style="color: #a855f7; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 8px;">Competitive Advantage</span>
          <h2 style="font-size: 32px; font-weight: 800; color: #ffffff; margin-bottom: 24px; margin-top: 0;">Why We Win (USP)</h2>
          <p style="font-size: 20px; color: #e2e8f0; line-height: 1.8; border-left: 4px solid #a855f7; padding-left: 20px; margin: 0;">
            ${deck.advantage}
          </p>
        </div>
        <div style="border-top: 1px solid rgba(255, 255, 255, 0.08); padding-top: 15px; font-size: 12px; color: #94a3b8;">
          <span>Confidential Investment Summary</span>
        </div>
      </div>

      <div style="width: 277mm; height: 190mm; box-sizing: border-box; padding: 45px; color: #ffffff; background-color: #0b0f19; font-family: 'Inter', sans-serif; display: flex; flex-direction: column; justify-content: space-between; page-break-after: always;">
        <div style="border-bottom: 2px solid #2fbf64; padding-bottom: 15px; display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 14px; font-weight: 800; color: #2fbf64; text-transform: uppercase;">StepUp for AI | ${startup.name}</span>
          <span style="font-size: 12px; color: #94a3b8;">Slide 8 of 10</span>
        </div>
        <div style="margin: auto 0;">
          <span style="color: #06b6d4; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 8px;">Financials</span>
          <h2 style="font-size: 32px; font-weight: 800; color: #ffffff; margin-bottom: 24px; margin-top: 0;">Growth & Forecast</h2>
          <p style="font-size: 20px; color: #e2e8f0; line-height: 1.8; border-left: 4px solid #06b6d4; padding-left: 20px; margin: 0;">
            ${deck.financialProjections}
          </p>
        </div>
        <div style="border-top: 1px solid rgba(255, 255, 255, 0.08); padding-top: 15px; font-size: 12px; color: #94a3b8;">
          <span>Confidential Investment Summary</span>
        </div>
      </div>

      <div style="width: 277mm; height: 190mm; box-sizing: border-box; padding: 45px; color: #ffffff; background-color: #0b0f19; font-family: 'Inter', sans-serif; display: flex; flex-direction: column; justify-content: space-between; page-break-after: always;">
        <div style="border-bottom: 2px solid #2fbf64; padding-bottom: 15px; display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 14px; font-weight: 800; color: #2fbf64; text-transform: uppercase;">StepUp for AI | ${startup.name}</span>
          <span style="font-size: 12px; color: #94a3b8;">Slide 9 of 10</span>
        </div>
        <div style="margin: auto 0;">
          <span style="color: #f97316; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 8px;">The Team</span>
          <h2 style="font-size: 32px; font-weight: 800; color: #ffffff; margin-bottom: 30px; margin-top: 0;">Leadership & Expertise</h2>
          <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 30px;">
            <h3 style="font-size: 24px; font-weight: 700; color: #ffffff; margin-top: 0; margin-bottom: 8px;">${startup.founder}</h3>
            <p style="font-size: 16px; color: #94a3b8; margin-top: 0; margin-bottom: 20px;">Founder & CEO, ${startup.name}</p>
            <div style="font-size: 14px; color: #e2e8f0;">
              Email: <span style="color: #2fbf64;">${startup.email}</span><br />
              LinkedIn: <span style="color: #3b82f6;">${startup.linkedin}</span>
            </div>
          </div>
        </div>
        <div style="border-top: 1px solid rgba(255, 255, 255, 0.08); padding-top: 15px; font-size: 12px; color: #94a3b8;">
          <span>Confidential Investment Summary</span>
        </div>
      </div>

      <div style="width: 277mm; height: 190mm; box-sizing: border-box; padding: 45px; color: #ffffff; background-color: #0b0f19; font-family: 'Inter', sans-serif; display: flex; flex-direction: column; justify-content: space-between;">
        <div style="border-bottom: 2px solid #2fbf64; padding-bottom: 15px; display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 14px; font-weight: 800; color: #2fbf64; text-transform: uppercase;">StepUp for AI | ${startup.name}</span>
          <span style="font-size: 12px; color: #94a3b8;">Slide 10 of 10</span>
        </div>
        <div style="margin: auto 0;">
          <span style="color: #2fbf64; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 8px;">The Ask</span>
          <h2 style="font-size: 32px; font-weight: 800; color: #ffffff; margin-bottom: 24px; margin-top: 0;">Funding & Milestones</h2>
          <p style="font-size: 20px; color: #e2e8f0; line-height: 1.8; border-left: 4px solid #2fbf64; padding-left: 20px; margin: 0;">
            ${deck.askDetails}
          </p>
        </div>
        <div style="border-top: 1px solid rgba(255, 255, 255, 0.08); padding-top: 15px; display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: #94a3b8;">
          <span>Confidential Investment Summary</span>
          <span>StepUp for AI Network</span>
        </div>
      </div>
    `;

    const options = {
      margin: [0, 0, 0, 0],
      filename: `${startup.name.replace(/\s+/g, "_")}_Pitch_Deck.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, backgroundColor: "#0b0f19" },
      jsPDF: { unit: "mm", format: "a4", orientation: "landscape" }
    };

    await html2pdf().from(element).set(options).save();
    showToast("PDF downloaded successfully!", "success");
  } catch (error) {
    console.error(error);
    showToast("Failed to generate PDF. Please try again.", "error");
  }
};
