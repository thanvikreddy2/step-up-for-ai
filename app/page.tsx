"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import "@/styles/investor-dashboard.css";

interface Startup {
  id: string;
  name: string;
  logoText: string;
  logoBg: string;
  tagline: string;
  description: string;
  sector: string;
  sectorLabel: string;
  stage: string;
  ask: number;
  founder: string;
  email: string;
  linkedin: string;
  submittedDate: string;
  status: string;
}

interface ProfileData {
  name: string;
  org: string;
  bio: string;
  phone: string;
  email: string;
  linkedin: string;
  twitter: string;
  website: string;
  focusSectors: string[];
}

const STARTUP_DATA: Startup[] = [
  {
    id: "apex-ai",
    name: "Apex AI",
    logoText: "AA",
    logoBg: "linear-gradient(135deg, #10b981, #059669)",
    tagline: "Autonomous multi-agent workflows for enterprise operations.",
    description: "Apex AI orchestrates autonomous software agents that integrate with existing company tools, automating complex tasks like data retrieval, analysis, and report generation with minimal human oversight.",
    sector: "ai-ml",
    sectorLabel: "AI / ML",
    stage: "Seed",
    ask: 1500000,
    founder: "Sarah Jenkins",
    email: "sarah@apexai.io",
    linkedin: "https://www.linkedin.com/in/sarah-jenkins-apex",
    submittedDate: "2026-06-16",
    status: "New"
  },
  {
    id: "wealthstream",
    name: "WealthStream",
    logoText: "WS",
    logoBg: "linear-gradient(135deg, #3b82f6, #2563eb)",
    tagline: "Micro-investing and financial wellness for gig-economy workers.",
    description: "WealthStream integrates directly with gig-platforms to automatically round up earnings into diversified portfolios, offering tailored retirement and insurance options for contract workers.",
    sector: "fintech",
    sectorLabel: "Fintech",
    stage: "Pre-seed",
    ask: 500000,
    founder: "David Chen",
    email: "d.chen@wealthstream.com",
    linkedin: "https://www.linkedin.com/in/david-chen-wealthstream",
    submittedDate: "2026-06-14",
    status: "Under Review"
  },
  {
    id: "bioscribe",
    name: "BioScribe",
    logoText: "BS",
    logoBg: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
    tagline: "AI medical scribe translating patient-doctor dialogue into notes.",
    description: "BioScribe uses clinical-grade voice recognition to transcribe patient consultations, auto-generate EHR-compliant reports, and reduce doctor administrative workloads by 70%.",
    sector: "healthtech",
    sectorLabel: "Healthtech",
    stage: "Series A",
    ask: 4000000,
    founder: "Dr. Amanda Ross",
    email: "amanda@bioscribe.health",
    linkedin: "https://www.linkedin.com/in/amanda-ross-bioscribe",
    submittedDate: "2026-06-10",
    status: "Shortlisted"
  },
  {
    id: "solarloop",
    name: "SolarLoop",
    logoText: "SL",
    logoBg: "linear-gradient(135deg, #f59e0b, #d97706)",
    tagline: "Decentralized community solar grid optimization software.",
    description: "SolarLoop enables peer-to-peer clean energy sharing by automating micro-transactions between local solar producers and energy consumers using smart grid algorithms.",
    sector: "climate",
    sectorLabel: "Climate Tech",
    stage: "Series B+",
    ask: 12000000,
    founder: "Marcus Vance",
    email: "marcus@solarloop.net",
    linkedin: "https://www.linkedin.com/in/marcus-vance-solarloop",
    submittedDate: "2026-06-17",
    status: "New"
  },
  {
    id: "learnsphere",
    name: "LearnSphere",
    logoText: "LS",
    logoBg: "linear-gradient(135deg, #ec4899, #db2777)",
    tagline: "Adaptive gamified math curriculums for primary schools.",
    description: "LearnSphere's diagnostic engine customizes educational pathways in real time, leveraging gaming dynamics to double student math comprehension and retention rates.",
    sector: "edtech",
    sectorLabel: "Edtech",
    stage: "Seed",
    ask: 800000,
    founder: "Elena Rostova",
    email: "elena@learnsphere.org",
    linkedin: "https://www.linkedin.com/in/elena-rostova-learnsphere",
    submittedDate: "2026-06-08",
    status: "Under Review"
  },
  {
    id: "neurocare",
    name: "NeuroCare",
    logoText: "NC",
    logoBg: "linear-gradient(135deg, #14b8a6, #0d9488)",
    tagline: "Non-invasive neuro-stimulation headband for sleep optimization.",
    description: "NeuroCare combines sleep-tracking sensors with low-frequency neural pulses to increase deep sleep duration, helping busy professionals recover faster with fewer hours of sleep.",
    sector: "healthtech",
    sectorLabel: "Healthtech",
    stage: "Seed",
    ask: 1250000,
    founder: "Kenji Takahashi",
    email: "kenji@neurocare.io",
    linkedin: "https://www.linkedin.com/in/kenji-takahashi-neurocare",
    submittedDate: "2026-06-15",
    status: "New"
  },
  {
    id: "paychain",
    name: "PayChain",
    logoText: "PC",
    logoBg: "linear-gradient(135deg, #06b6d4, #0891b2)",
    tagline: "Instant global settlement API for cross-border e-commerce.",
    description: "PayChain aggregates local payment methods and blockchain settlements to offer instant, friction-free transactions for international merchants at 90% lower fees.",
    sector: "fintech",
    sectorLabel: "Fintech",
    stage: "Series A",
    ask: 3500000,
    founder: "Sofia Moreno",
    email: "s.moreno@paychain.dev",
    linkedin: "https://www.linkedin.com/in/sofia-moreno-paychain",
    submittedDate: "2026-06-01",
    status: "Under Review"
  },
  {
    id: "ecopack",
    name: "EcoPack Labs",
    logoText: "EP",
    logoBg: "linear-gradient(135deg, #84cc16, #65a30d)",
    tagline: "Water-soluble seaweed packaging replacing single-use plastics.",
    description: "EcoPack Labs manufactures zero-waste, marine-safe packaging materials for food and cosmetics brands that dissolve naturally in water within minutes.",
    sector: "climate",
    sectorLabel: "Climate Tech",
    stage: "Pre-seed",
    ask: 450000,
    founder: "Liam O'Connor",
    email: "liam@ecopacklabs.co",
    linkedin: "https://www.linkedin.com/in/liam-oconnor-ecopack",
    submittedDate: "2026-06-12",
    status: "Shortlisted"
  },
  {
    id: "promptcraft",
    name: "PromptCraft",
    logoText: "PC",
    logoBg: "linear-gradient(135deg, #6366f1, #4f46e5)",
    tagline: "Enterprise prompt engineering registry and testing suite.",
    description: "PromptCraft helps development teams version control, benchmark, and secure prompts for LLM applications, reducing API costs and model output regressions.",
    sector: "ai-ml",
    sectorLabel: "AI / ML",
    stage: "Seed",
    ask: 750000,
    founder: "Michael Chang",
    email: "michael@promptcraft.ai",
    linkedin: "https://www.linkedin.com/in/michael-chang-promptcraft",
    submittedDate: "2026-06-18",
    status: "New"
  },
  {
    id: "saasify",
    name: "SaaSify",
    logoText: "SF",
    logoBg: "linear-gradient(135deg, #f43f5e, #e11d48)",
    tagline: "No-code customer portal creator for legacy enterprise software.",
    description: "SaaSify hooks into old databases and mainframe APIs to output sleek, customer-facing web and mobile applications in a drag-and-drop builder.",
    sector: "saas",
    sectorLabel: "SaaS",
    stage: "Series A",
    ask: 2800000,
    founder: "Emma Watson",
    email: "emma@saasify.io",
    linkedin: "https://www.linkedin.com/in/emma-watson-saasify",
    submittedDate: "2026-05-28",
    status: "Under Review"
  }
];

const SECTORS = [
  { value: "fintech", label: "Fintech" },
  { value: "healthtech", label: "Healthtech" },
  { value: "climate", label: "Climate Tech" },
  { value: "edtech", label: "Edtech" },
  { value: "ai-ml", label: "AI / ML" },
  { value: "saas", label: "SaaS" }
];

interface Toast {
  id: number;
  message: string;
  type: "success" | "info" | "error";
}

export default function InvestorDashboard() {
  const [isMounted, setIsMounted] = useState(false);
  const [allPitches, setAllPitches] = useState<Startup[]>(STARTUP_DATA);
  const [shortlistedIds, setShortlistedIds] = useState<string[]>([]);
  const [activePanel, setActivePanel] = useState<string>("pitch-decks");

  // Filters State
  const [searchQuery, setSearchQuery] = useState("");
  const [sectorFilter, setSectorFilter] = useState("all");
  const [stageFilter, setStageFilter] = useState("all");
  const [shortlistFilter, setShortlistFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");

  // Profile State
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "Thanvik Reddy",
    org: "Thanvik Ventures",
    bio: "Focused on early-stage investments in artificial intelligence, climate technology, and SaaS solutions. Supporting visionary founders from Seed to Series A.",
    phone: "+91 83410 11206",
    email: "thanvikreddy2@gmail.com",
    linkedin: "https://linkedin.com/in/thanvik-reddy",
    twitter: "https://x.com/thanvik_reddy",
    website: "https://thanvikventures.com",
    focusSectors: ["ai-ml", "climate", "saas"]
  });
  const [profilePicData, setProfilePicData] = useState<string | null>(null);
  const [isProfileEditing, setIsProfileEditing] = useState(false);

  // Form states
  const [tempProfileName, setTempProfileName] = useState("");
  const [tempProfileOrg, setTempProfileOrg] = useState("");
  const [tempProfileBio, setTempProfileBio] = useState("");
  const [tempProfilePhone, setTempProfilePhone] = useState("");
  const [tempProfileLinkedin, setTempProfileLinkedin] = useState("");
  const [tempProfileTwitter, setTempProfileTwitter] = useState("");
  const [tempProfileWebsite, setTempProfileWebsite] = useState("");
  const [tempFocusSectors, setTempFocusSectors] = useState<string[]>([]);

  // Password setting state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Support message state
  const [supportSubject, setSupportSubject] = useState("");
  const [supportMessage, setSupportMessage] = useState("");

  // Modal State
  const [selectedStartup, setSelectedStartup] = useState<Startup | null>(null);
  const [modalMode, setModalMode] = useState<"pitch" | "contact" | "deck">("pitch");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Toasts State
  const [toasts, setToasts] = useState<Toast[]>([]);
  const nextToastId = useRef(0);

  // Sidebar Mobile State
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // New Deal Room, Kanban, and Rating state variables
  const [dashboardView, setDashboardView] = useState<"list" | "pipeline">("list");
  const [activeTab, setActiveTab] = useState<"overview" | "dataroom" | "captable" | "notes">("overview");
  const [startupRatings, setStartupRatings] = useState<Record<string, { pedigree: number; tailwinds: number; moat: number }>>({});
  const [startupNotes, setStartupNotes] = useState<Record<string, string>>({});

  const formatLakhs = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(1).replace(/\.0$/, "")} Cr`;
    }
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1).replace(/\.0$/, "")} L`;
    }
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  const updateNotes = (startupId: string, notesText: string) => {
    const updated = { ...startupNotes, [startupId]: notesText };
    setStartupNotes(updated);
    localStorage.setItem("stepup_startup_notes", JSON.stringify(updated));
  };

  const updateRating = (startupId: string, metric: "pedigree" | "tailwinds" | "moat", value: number) => {
    const current = startupRatings[startupId] || { pedigree: 4.0, tailwinds: 4.2, moat: 4.5 };
    const updated = {
      ...startupRatings,
      [startupId]: {
        ...current,
        [metric]: value
      }
    };
    setStartupRatings(updated);
    localStorage.setItem("stepup_startup_ratings", JSON.stringify(updated));
  };

  // Load from localStorage on mount
  useEffect(() => {
    setIsMounted(true);

    const savedShortlist = localStorage.getItem("stepup_shortlist");
    if (savedShortlist) {
      setShortlistedIds(JSON.parse(savedShortlist));
    } else {
      const defaultShortlist = STARTUP_DATA.filter(s => s.status === "Shortlisted").map(s => s.id);
      setShortlistedIds(defaultShortlist);
      localStorage.setItem("stepup_shortlist", JSON.stringify(defaultShortlist));
    }

    const savedProfile = localStorage.getItem("stepup_profile_data");
    if (savedProfile) {
      setProfileData(JSON.parse(savedProfile));
    }

    const savedPic = localStorage.getItem("stepup_profile_pic");
    if (savedPic) {
      setProfilePicData(savedPic);
    }

    const studentPitches = localStorage.getItem("stepup_student_pitches");
    if (studentPitches) {
      setAllPitches([...JSON.parse(studentPitches), ...STARTUP_DATA]);
    }

    const savedNotes = localStorage.getItem("stepup_startup_notes");
    if (savedNotes) {
      setStartupNotes(JSON.parse(savedNotes));
    }
    const savedRatings = localStorage.getItem("stepup_startup_ratings");
    if (savedRatings) {
      setStartupRatings(JSON.parse(savedRatings));
    }
  }, []);

  // Form submission handler helpers
  const showToast = (message: string, type: "success" | "info" | "error" = "success") => {
    const id = nextToastId.current++;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const toggleShortlist = (id: string) => {
    const newShortlist = shortlistedIds.includes(id)
      ? shortlistedIds.filter(item => item !== id)
      : [...shortlistedIds, id];

    setShortlistedIds(newShortlist);
    localStorage.setItem("stepup_shortlist", JSON.stringify(newShortlist));
    showToast(shortlistedIds.includes(id) ? "Removed from Shortlist." : "Added to Shortlist!", shortlistedIds.includes(id) ? "info" : "success");
  };

  const getPitchDeckDetails = (startup: Startup) => {
    const name = startup.name;
    const sector = startup.sectorLabel;
    const stage = startup.stage;
    const ask = formatAskAmount(startup.ask);
    
    let problem = "";
    let solution = "";
    let businessModel = "";
    let advantage = "";
    let financialProjections = "";
    let askDetails = "";

    if (startup.id === "apex-ai") {
      problem = "Enterprises waste thousands of hours manually fetching, analyzing, and reporting operations data due to fragmented legacy tools.";
      solution = "Autonomous software agents that integrate with enterprise tools to automate data retrieval, processing, and reporting with zero human overhead.";
      businessModel = "B2B SaaS subscription starting at $499/month per agent, plus enterprise custom usage tiers.";
      advantage = "Proprietary multi-agent orchestration engine that prevents LLM hallucinations and maintains 99.9% uptime.";
      financialProjections = "Projecting $2.4M ARR by Year 2, reaching break-even point in month 14.";
      askDetails = `Raising ${ask} Seed funding to hire 3 AI engineers, expand sales operations, and hit $1.5M ARR milestone.`;
    } else if (startup.id === "wealthstream") {
      problem = "Gig-economy workers lack structured savings plans, pensions, and medical insurance due to variable earnings.";
      solution = "An automated micro-investing platform that rounds up gig platform payouts directly into customized portfolios and benefit accounts.";
      businessModel = "0.25% annual management fee on assets under management (AUM) + $2 monthly subscription.";
      advantage = "Direct API integration with Uber, DoorDash, and Upwork for seamless real-time transaction processing.";
      financialProjections = "Targeting $150M AUM by Year 3, cash-flow positive by month 18.";
      askDetails = `Raising ${ask} Pre-seed funding to secure regulatory licenses, expand support teams, and onboard 50k users.`;
    } else if (startup.id === "bioscribe") {
      problem = "Doctors spend over 3 hours daily typing consultation notes, leading to physician burnout and reduced patient time.";
      solution = "A clinical-grade AI medical scribe that listens to dialogue and generates EHR-compliant reports instantly.";
      businessModel = "SaaS license fee of $199/month per practitioner, with volume discounts for hospital groups.";
      advantage = "HIPAA-compliant custom speech model tuned for complex medical terminologies and multilingual dialogue.";
      financialProjections = "Projecting $6.2M ARR in Year 3 with an estimated 85% gross margin.";
      askDetails = `Raising ${ask} Series A funding to expand hospital integrations, fast-track FDA clearance, and scale sales.`;
    } else if (startup.id === "solarloop") {
      problem = "Community clean energy sharing is restricted by inefficient billing, lack of grid data, and micro-transaction friction.";
      solution = "Decentralized community solar grid optimization software enabling peer-to-peer clean energy transactions via automated smart contracts.";
      businessModel = "2.5% transaction commission on energy exchanged through the peer-to-peer marketplace.";
      advantage = "Patent-pending micro-transaction settlement engine capable of processing 10,000 grid transactions per second.";
      financialProjections = "Targeting $4.8M net revenue by Year 4, covering 120 regional microgrids.";
      askDetails = `Raising ${ask} Series B+ funding to scale infrastructure across 5 state grids and launch partnerships with utilities.`;
    } else if (startup.id === "learnsphere") {
      problem = "Primary school students struggle with standardized math curriculums, leading to low retention and high failure rates.";
      solution = "A gamified, adaptive math learning curriculum that dynamically adjusts learning pathways based on real-time diagnostic metrics.";
      businessModel = "Annual school licensing fee of $12 per student, alongside a parent-premium home tier at $4.99/month.";
      advantage = "Diagnostic algorithm that double student retention rates compared to traditional digital worksheets.";
      financialProjections = "Projecting $1.8M ARR by Year 2, reaching profitability in Q3 of Year 2.";
      askDetails = `Raising ${ask} Seed funding to develop advanced curriculum content, expand school sales, and implement mobile versions.`;
    } else if (startup.id === "neurocare") {
      problem = "Busy professionals suffer from chronic sleep deprivation and low recovery rates, decreasing workplace productivity.";
      solution = "A non-invasive neuro-stimulation headband that emits low-frequency neural pulses to double deep sleep duration.";
      businessModel = "Direct-to-consumer hardware sales at $299 per unit, plus a premium sleep analytics subscription at $9.99/month.";
      advantage = "Clinically validated neural-pulse technology certified by top sleep medicine laboratories.";
      financialProjections = "Projecting $12.5M hardware sales revenue by Year 3, reaching profitability in month 22.";
      askDetails = `Raising ${ask} Seed funding to scale hardware manufacturing lines, launch clinical trials, and run consumer marketing.`;
    } else if (startup.id === "paychain") {
      problem = "Cross-border e-commerce merchants lose up to 5% in transaction fees and suffer from 3-5 day settlement delays.";
      solution = "An instant global settlement API aggregating local payment networks and blockchain tech to reduce fees by 90%.";
      businessModel = "Flat 0.5% transaction fee on all international settlement volume.";
      advantage = "Unified API with built-in compliance engine and liquidity router across 140 currencies.";
      financialProjections = "Projecting $8.5M transaction revenue on $1.7B GMV by Year 3.";
      askDetails = `Raising ${ask} Series A funding to expand local payment licenses, grow developer relations, and launch in LatAm.`;
    } else if (startup.id === "ecopack") {
      problem = "Single-use plastics in cosmetics packaging take 500 years to decompose, creating severe ecological waste.";
      solution = "Water-soluble seaweed packaging materials that dissolve naturally in warm water within minutes without microplastics.";
      businessModel = "Wholesale supply contracts sold per ton directly to consumer brand manufacturers.";
      advantage = "Proprietary heat-resistant seaweed formula that doesn't melt in humid storage conditions but dissolves instantly in water.";
      financialProjections = "Projecting $1.2M ARR in Year 2, break-even by month 16.";
      askDetails = `Raising ${ask} Pre-seed funding to expand production facilities, acquire eco-certifications, and secure pilot contracts.`;
    } else if (startup.id === "promptcraft") {
      problem = "Enterprises struggle with prompt version control, model output regressions, and soaring API costs when deploying LLMs.";
      solution = "An enterprise prompt engineering registry, version control system, and automated regression testing suite.";
      businessModel = "Developer-seat pricing ($25/seat/month) + custom self-hosted enterprise deployment licensing.";
      advantage = "Real-time prompt tracing engine that auto-optimizes prompt token counts, reducing API bills by 30%.";
      financialProjections = "Projecting $3.5M ARR by Year 3, profitable in month 20.";
      askDetails = `Raising ${ask} Seed funding to hire core developers, launch developer marketing, and deploy enterprise cloud support.`;
    } else if (startup.id === "saasify") {
      problem = "Companies running legacy software lose customers due to outdated, complex desktop portals that lack mobile support.";
      solution = "A no-code customer portal builder that hooks directly into legacy databases to publish modern, responsive web/mobile apps.";
      businessModel = "Usage-based tier list starting at $199/month, scaling up for enterprise data bandwidth.";
      advantage = "Zero-code database schema mapping technology that requires no APIs or mainframe code adjustments.";
      financialProjections = "Projecting $7.2M ARR by Year 3, with 85% gross margins.";
      askDetails = `Raising ${ask} Series A funding to expand partner integrations, hire enterprise support staff, and launch marketing.`;
    } else {
      problem = `Target customers are experiencing significant inefficiencies in the ${sector} space, leading to lost time and money.`;
      solution = startup.description;
      businessModel = "Subscription-based B2B SaaS model with tiered packages based on user seats and transaction volume.";
      advantage = "First-mover advantage in this niche with custom proprietary models and integrations.";
      financialProjections = "Projecting high growth over the next 3-5 years, hitting profitability in Year 2.";
      askDetails = `Raising ${ask} funding in the ${stage} stage to expand product engineering and grow client base.`;
    }

    return {
      problem,
      solution,
      businessModel,
      advantage,
      financialProjections,
      askDetails
    };
  };

  const handleDownloadPDF = async () => {
    if (!selectedStartup) return;

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

      const deck = getPitchDeckDetails(selectedStartup);
      const element = document.createElement("div");
      element.style.width = "277mm";
      element.style.color = "#ffffff";
      element.style.backgroundColor = "#0b0f19";
      element.style.fontFamily = "'Inter', sans-serif";
      element.style.lineHeight = "1.6";

      element.innerHTML = `
        <!-- SLIDE 1: Title -->
        <div style="width: 277mm; height: 190mm; box-sizing: border-box; padding: 45px; color: #ffffff; background-color: #0b0f19; font-family: 'Inter', sans-serif; display: flex; flex-direction: column; justify-content: space-between; page-break-after: always;">
          <div style="border-bottom: 2px solid #2fbf64; padding-bottom: 15px; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 14px; font-weight: 800; color: #2fbf64; text-transform: uppercase;">StepUp for AI | Pitch Deck</span>
            <span style="font-size: 12px; color: #94a3b8;">Slide 1 of 10</span>
          </div>
          <div style="text-align: center; margin: auto 0;">
            <div style="width: 80px; height: 80px; background: ${selectedStartup.logoBg}; border-radius: 16px; margin: 0 auto 24px; display: flex; align-items: center; justify-content: center; font-size: 32px; font-weight: 800; color: #ffffff;">
              ${selectedStartup.logoText}
            </div>
            <h1 style="font-size: 44px; font-weight: 800; color: #ffffff; margin-bottom: 16px; margin-top: 0;">${selectedStartup.name}</h1>
            <p style="font-size: 20px; font-style: italic; color: #94a3b8; max-width: 700px; margin: 0 auto;">"${selectedStartup.tagline}"</p>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255, 255, 255, 0.08); padding-top: 15px; font-size: 12px; color: #94a3b8;">
            <span>Confidential Investment Summary</span>
            <span>Generated on ${new Date().toLocaleDateString()}</span>
          </div>
        </div>

        <!-- SLIDE 2: Problem -->
        <div style="width: 277mm; height: 190mm; box-sizing: border-box; padding: 45px; color: #ffffff; background-color: #0b0f19; font-family: 'Inter', sans-serif; display: flex; flex-direction: column; justify-content: space-between; page-break-after: always;">
          <div style="border-bottom: 2px solid #2fbf64; padding-bottom: 15px; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 14px; font-weight: 800; color: #2fbf64; text-transform: uppercase;">StepUp for AI | ${selectedStartup.name}</span>
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

        <!-- SLIDE 3: Solution -->
        <div style="width: 277mm; height: 190mm; box-sizing: border-box; padding: 45px; color: #ffffff; background-color: #0b0f19; font-family: 'Inter', sans-serif; display: flex; flex-direction: column; justify-content: space-between; page-break-after: always;">
          <div style="border-bottom: 2px solid #2fbf64; padding-bottom: 15px; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 14px; font-weight: 800; color: #2fbf64; text-transform: uppercase;">StepUp for AI | ${selectedStartup.name}</span>
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

        <!-- SLIDE 4: Market Opportunity -->
        <div style="width: 277mm; height: 190mm; box-sizing: border-box; padding: 45px; color: #ffffff; background-color: #0b0f19; font-family: 'Inter', sans-serif; display: flex; flex-direction: column; justify-content: space-between; page-break-after: always;">
          <div style="border-bottom: 2px solid #2fbf64; padding-bottom: 15px; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 14px; font-weight: 800; color: #2fbf64; text-transform: uppercase;">StepUp for AI | ${selectedStartup.name}</span>
            <span style="font-size: 12px; color: #94a3b8;">Slide 4 of 10</span>
          </div>
          <div style="margin: auto 0;">
            <span style="color: #3b82f6; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 8px;">Market Opportunity</span>
            <h2 style="font-size: 32px; font-weight: 800; color: #ffffff; margin-bottom: 30px; margin-top: 0;">Target Sector & Market Size</h2>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
              <div style="background: rgba(255, 255, 255, 0.03); padding: 25px; border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.08);">
                <div style="font-size: 14px; color: #94a3b8; margin-bottom: 6px;">Target Sector</div>
                <div style="font-size: 24px; font-weight: 700; color: #ffffff;">${selectedStartup.sectorLabel}</div>
              </div>
              <div style="background: rgba(255, 255, 255, 0.03); padding: 25px; border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.08);">
                <div style="font-size: 14px; color: #94a3b8; margin-bottom: 6px;">Funding Stage</div>
                <div style="font-size: 24px; font-weight: 700; color: #ffffff;">${selectedStartup.stage}</div>
              </div>
            </div>
          </div>
          <div style="border-top: 1px solid rgba(255, 255, 255, 0.08); padding-top: 15px; font-size: 12px; color: #94a3b8;">
            <span>Confidential Investment Summary</span>
          </div>
        </div>

        <!-- SLIDE 5: Product / Traction -->
        <div style="width: 277mm; height: 190mm; box-sizing: border-box; padding: 45px; color: #ffffff; background-color: #0b0f19; font-family: 'Inter', sans-serif; display: flex; flex-direction: column; justify-content: space-between; page-break-after: always;">
          <div style="border-bottom: 2px solid #2fbf64; padding-bottom: 15px; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 14px; font-weight: 800; color: #2fbf64; text-transform: uppercase;">StepUp for AI | ${selectedStartup.name}</span>
            <span style="font-size: 12px; color: #94a3b8;">Slide 5 of 10</span>
          </div>
          <div style="margin: auto 0;">
            <span style="color: #ec4899; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 8px;">Product & Traction</span>
            <h2 style="font-size: 32px; font-weight: 800; color: #ffffff; margin-bottom: 20px; margin-top: 0;">Milestones & User Growth</h2>
            <p style="font-size: 18px; color: #e2e8f0; line-height: 1.8; margin-bottom: 20px; text-align: justify;">
              ${selectedStartup.description}
            </p>
            <div style="font-size: 14px; color: #94a3b8;">
              Submitted Date: <strong>${selectedStartup.submittedDate}</strong> | Current Status: <strong>${selectedStartup.status}</strong>
            </div>
          </div>
          <div style="border-top: 1px solid rgba(255, 255, 255, 0.08); padding-top: 15px; font-size: 12px; color: #94a3b8;">
            <span>Confidential Investment Summary</span>
          </div>
        </div>

        <!-- SLIDE 6: Business Model -->
        <div style="width: 277mm; height: 190mm; box-sizing: border-box; padding: 45px; color: #ffffff; background-color: #0b0f19; font-family: 'Inter', sans-serif; display: flex; flex-direction: column; justify-content: space-between; page-break-after: always;">
          <div style="border-bottom: 2px solid #2fbf64; padding-bottom: 15px; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 14px; font-weight: 800; color: #2fbf64; text-transform: uppercase;">StepUp for AI | ${selectedStartup.name}</span>
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

        <!-- SLIDE 7: Competitive Advantage -->
        <div style="width: 277mm; height: 190mm; box-sizing: border-box; padding: 45px; color: #ffffff; background-color: #0b0f19; font-family: 'Inter', sans-serif; display: flex; flex-direction: column; justify-content: space-between; page-break-after: always;">
          <div style="border-bottom: 2px solid #2fbf64; padding-bottom: 15px; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 14px; font-weight: 800; color: #2fbf64; text-transform: uppercase;">StepUp for AI | ${selectedStartup.name}</span>
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

        <!-- SLIDE 8: Financial Projections -->
        <div style="width: 277mm; height: 190mm; box-sizing: border-box; padding: 45px; color: #ffffff; background-color: #0b0f19; font-family: 'Inter', sans-serif; display: flex; flex-direction: column; justify-content: space-between; page-break-after: always;">
          <div style="border-bottom: 2px solid #2fbf64; padding-bottom: 15px; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 14px; font-weight: 800; color: #2fbf64; text-transform: uppercase;">StepUp for AI | ${selectedStartup.name}</span>
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

        <!-- SLIDE 9: Team -->
        <div style="width: 277mm; height: 190mm; box-sizing: border-box; padding: 45px; color: #ffffff; background-color: #0b0f19; font-family: 'Inter', sans-serif; display: flex; flex-direction: column; justify-content: space-between; page-break-after: always;">
          <div style="border-bottom: 2px solid #2fbf64; padding-bottom: 15px; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 14px; font-weight: 800; color: #2fbf64; text-transform: uppercase;">StepUp for AI | ${selectedStartup.name}</span>
            <span style="font-size: 12px; color: #94a3b8;">Slide 9 of 10</span>
          </div>
          <div style="margin: auto 0;">
            <span style="color: #f97316; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 8px;">The Team</span>
            <h2 style="font-size: 32px; font-weight: 800; color: #ffffff; margin-bottom: 30px; margin-top: 0;">Leadership & Expertise</h2>
            <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 30px;">
              <h3 style="font-size: 24px; font-weight: 700; color: #ffffff; margin-top: 0; margin-bottom: 8px;">${selectedStartup.founder}</h3>
              <p style="font-size: 16px; color: #94a3b8; margin-top: 0; margin-bottom: 20px;">Founder & CEO, ${selectedStartup.name}</p>
              <div style="font-size: 14px; color: #e2e8f0;">
                Email: <span style="color: #2fbf64;">${selectedStartup.email}</span><br />
                LinkedIn: <span style="color: #3b82f6;">${selectedStartup.linkedin}</span>
              </div>
            </div>
          </div>
          <div style="border-top: 1px solid rgba(255, 255, 255, 0.08); padding-top: 15px; font-size: 12px; color: #94a3b8;">
            <span>Confidential Investment Summary</span>
          </div>
        </div>

        <!-- SLIDE 10: Ask -->
        <div style="width: 277mm; height: 190mm; box-sizing: border-box; padding: 45px; color: #ffffff; background-color: #0b0f19; font-family: 'Inter', sans-serif; display: flex; flex-direction: column; justify-content: space-between;">
          <div style="border-bottom: 2px solid #2fbf64; padding-bottom: 15px; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 14px; font-weight: 800; color: #2fbf64; text-transform: uppercase;">StepUp for AI | ${selectedStartup.name}</span>
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
        filename: `${selectedStartup.name.replace(/\s+/g, "_")}_Pitch_Deck.pdf`,
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

  // Profile Edit Toggle
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
    const updatedProfile: ProfileData = {
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
      setTempFocusSectors(tempFocusSectors.filter(s => s !== sector));
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

  const handleSupportMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hello StepUp Team,\n\nName: ${profileData.name}\nSubject: ${supportSubject}\nMessage: ${supportMessage}`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=918341011206&text=${encodeURIComponent(text)}`;
    showToast("Opening WhatsApp...");
    window.open(whatsappUrl, "_blank");
    setSupportSubject("");
    setSupportMessage("");
  };

  // Pitch filtration and rendering calculation
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(word => word[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const isNewThisWeek = (dateString: string) => {
    const submitted = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - submitted.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  };

  const formatAskAmount = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(1).replace(/\.0$/, "")} Cr`;
    }
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1).replace(/\.0$/, "")} L`;
    }
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  // Filtered dataset
  const getFilteredPitches = () => {
    let result = [...allPitches];

    // Search query filter
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        s =>
          s.name.toLowerCase().includes(query) ||
          s.tagline.toLowerCase().includes(query) ||
          s.founder.toLowerCase().includes(query) ||
          s.description.toLowerCase().includes(query)
      );
    }

    // Sector filter
    if (sectorFilter !== "all") {
      result = result.filter(s => s.sector === sectorFilter);
    }

    // Stage filter
    if (stageFilter !== "all") {
      result = result.filter(s => s.stage === stageFilter);
    }

    // Shortlisted filter
    if (shortlistFilter === "shortlisted") {
      result = result.filter(s => shortlistedIds.includes(s.id));
    }

    // Sorting
    result.sort((a, b) => {
      if (sortOrder === "newest") {
        return new Date(b.submittedDate).getTime() - new Date(a.submittedDate).getTime();
      } else if (sortOrder === "oldest") {
        return new Date(a.submittedDate).getTime() - new Date(b.submittedDate).getTime();
      } else if (sortOrder === "highest-ask") {
        return b.ask - a.ask;
      } else if (sortOrder === "lowest-ask") {
        return a.ask - b.ask;
      }
      return 0;
    });

    return result;
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setSectorFilter("all");
    setStageFilter("all");
    setShortlistFilter("all");
    setSortOrder("newest");
  };

  const filteredPitches = getFilteredPitches();

  const getPipelineColumns = () => {
    const newInbound: Startup[] = [];
    const introCall: Startup[] = [];
    const dueDiligence: Startup[] = [];
    const shortlisted: Startup[] = [];

    filteredPitches.forEach(startup => {
      if (shortlistedIds.includes(startup.id)) {
        shortlisted.push(startup);
      } else {
        switch (startup.id) {
          case "apex-ai":
          case "solarloop":
          case "neurocare":
          case "promptcraft":
            newInbound.push(startup);
            break;
          case "wealthstream":
          case "learnsphere":
            introCall.push(startup);
            break;
          case "paychain":
          case "saasify":
            dueDiligence.push(startup);
            break;
          default:
            if (startup.status === "New") {
              newInbound.push(startup);
            } else if (startup.status === "Shortlisted") {
              shortlisted.push(startup);
            } else {
              introCall.push(startup);
            }
            break;
        }
      }
    });

    return { newInbound, introCall, dueDiligence, shortlisted };
  };

  // Modal controllers
  const openPitchModal = (startup: Startup, mode: "pitch" | "contact" | "deck") => {
    setSelectedStartup(startup);
    setModalMode(mode);
    setCurrentSlide(0);
    setActiveTab("overview");
    setIsModalOpen(true);
  };

  const closePitchModal = () => {
    setIsModalOpen(false);
    setSelectedStartup(null);
  };

  if (!isMounted) {
    return (
      <div className="loading-screen" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "#030712", color: "#2fbf64" }}>
        <h3>Loading StepUp Dashboard...</h3>
      </div>
    );
  }

  // Calculate dynamic stats
  const totalPitchesCount = allPitches.length;
  const newPitchesCount = allPitches.filter(s => isNewThisWeek(s.submittedDate)).length;
  const shortlistedPitchesCount = shortlistedIds.length;

  // Compile slides inside render
  const selectedDeck = selectedStartup ? getPitchDeckDetails(selectedStartup) : null;
  const slides = selectedStartup && selectedDeck ? [
    {
      title: "Title / Hook",
      content: (
        <div style={{ textAlign: "center", padding: "30px 10px", width: "100%" }}>
          <div style={{
            width: "70px",
            height: "70px",
            background: selectedStartup.logoBg,
            borderRadius: "14px",
            margin: "0 auto 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.75rem",
            fontWeight: 800,
            color: "#ffffff",
            boxShadow: "var(--glow-shadow)"
          }}>
            {selectedStartup.logoText}
          </div>
          <h2 style={{ fontSize: "2.5rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "12px", marginTop: 0 }}>
            {selectedStartup.name}
          </h2>
          <p style={{ fontSize: "1.25rem", fontStyle: "italic", color: "var(--text-secondary)", maxWidth: "550px", margin: "0 auto", lineHeight: "1.4" }}>
            "{selectedStartup.tagline}"
          </p>
        </div>
      )
    },
    {
      title: "The Problem",
      content: (
        <div style={{ padding: "10px", width: "100%" }}>
          <div style={{ color: "#ef4444", fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", marginBottom: "6px", letterSpacing: "1px" }}>
            The Problem
          </div>
          <h3 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "16px", marginTop: 0 }}>
            What Issue Are We Solving?
          </h3>
          <p style={{ fontSize: "1.15rem", color: "var(--text-secondary)", lineHeight: "1.8", borderLeft: "4px solid #ef4444", paddingLeft: "16px", margin: 0 }}>
            {selectedDeck.problem}
          </p>
        </div>
      )
    },
    {
      title: "The Solution",
      content: (
        <div style={{ padding: "10px", width: "100%" }}>
          <div style={{ color: "var(--accent)", fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", marginBottom: "6px", letterSpacing: "1px" }}>
            The Solution
          </div>
          <h3 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "16px", marginTop: 0 }}>
            Our Product & Innovation
          </h3>
          <p style={{ fontSize: "1.15rem", color: "var(--text-secondary)", lineHeight: "1.8", borderLeft: "4px solid var(--accent)", paddingLeft: "16px", margin: 0 }}>
            {selectedDeck.solution}
          </p>
        </div>
      )
    },
    {
      title: "Market Opportunity",
      content: (
        <div style={{ padding: "10px", width: "100%" }}>
          <div style={{ color: "#3b82f6", fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", marginBottom: "6px", letterSpacing: "1px" }}>
            Market Opportunity
          </div>
          <h3 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "20px", marginTop: 0 }}>
            Target Sector & Market Size
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <div className="glass-card" style={{ padding: "16px", borderRadius: "10px", border: "1px solid var(--border-color)", background: "rgba(255,255,255,0.02)" }}>
              <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginBottom: "4px" }}>Target Sector</div>
              <div style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text-primary)" }}>{selectedStartup.sectorLabel}</div>
            </div>
            <div className="glass-card" style={{ padding: "16px", borderRadius: "10px", border: "1px solid var(--border-color)", background: "rgba(255,255,255,0.02)" }}>
              <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginBottom: "4px" }}>Funding Stage</div>
              <div style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text-primary)" }}>{selectedStartup.stage}</div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Product / Traction",
      content: (
        <div style={{ padding: "10px", width: "100%" }}>
          <div style={{ color: "#ec4899", fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", marginBottom: "6px", letterSpacing: "1px" }}>
            Product & Traction
          </div>
          <h3 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "16px", marginTop: 0 }}>
            Milestones & User Growth
          </h3>
          <p style={{ fontSize: "1.1rem", color: "var(--text-secondary)", lineHeight: "1.7", marginBottom: "16px", marginTop: 0 }}>
            {selectedStartup.description}
          </p>
          <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
            Submitted: <strong>{selectedStartup.submittedDate}</strong> | Status: <strong>{selectedStartup.status}</strong>
          </div>
        </div>
      )
    },
    {
      title: "Business Model",
      content: (
        <div style={{ padding: "10px", width: "100%" }}>
          <div style={{ color: "#eab308", fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", marginBottom: "6px", letterSpacing: "1px" }}>
            Business Model
          </div>
          <h3 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "16px", marginTop: 0 }}>
            How We Generate Revenue
          </h3>
          <p style={{ fontSize: "1.15rem", color: "var(--text-secondary)", lineHeight: "1.8", borderLeft: "4px solid #eab308", paddingLeft: "16px", margin: 0 }}>
            {selectedDeck.businessModel}
          </p>
        </div>
      )
    },
    {
      title: "Competitive Advantage",
      content: (
        <div style={{ padding: "10px", width: "100%" }}>
          <div style={{ color: "#a855f7", fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", marginBottom: "6px", letterSpacing: "1px" }}>
            Competitive Advantage
          </div>
          <h3 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "16px", marginTop: 0 }}>
            Why We Win (USP)
          </h3>
          <p style={{ fontSize: "1.15rem", color: "var(--text-secondary)", lineHeight: "1.8", borderLeft: "4px solid #a855f7", paddingLeft: "16px", margin: 0 }}>
            {selectedDeck.advantage}
          </p>
        </div>
      )
    },
    {
      title: "Financial Projections",
      content: (
        <div style={{ padding: "10px", width: "100%" }}>
          <div style={{ color: "#06b6d4", fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", marginBottom: "6px", letterSpacing: "1px" }}>
            Financials
          </div>
          <h3 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "16px", marginTop: 0 }}>
            Growth & Forecast
          </h3>
          <p style={{ fontSize: "1.15rem", color: "var(--text-secondary)", lineHeight: "1.8", borderLeft: "4px solid #06b6d4", paddingLeft: "16px", margin: 0 }}>
            {selectedDeck.financialProjections}
          </p>
        </div>
      )
    },
    {
      title: "The Team",
      content: (
        <div style={{ padding: "10px", width: "100%" }}>
          <div style={{ color: "#f97316", fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", marginBottom: "6px", letterSpacing: "1px" }}>
            The Team
          </div>
          <h3 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "16px", marginTop: 0 }}>
            Leadership & Expertise
          </h3>
          <div style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid var(--border-color)", borderRadius: "12px", padding: "16px" }}>
            <h4 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text-primary)", margin: "0 0 4px 0" }}>{selectedStartup.founder}</h4>
            <p style={{ color: "var(--text-secondary)", margin: "0 0 12px 0", fontSize: "0.9rem" }}>Founder & CEO, {selectedStartup.name}</p>
            <div style={{ display: "flex", gap: "10px" }}>
              <a href={`mailto:${selectedStartup.email}`} className="founder-btn" style={{ padding: "8px 12px", fontSize: "0.8rem", background: "rgba(255, 255, 255, 0.03)", border: "1px solid var(--border-color)", borderRadius: "6px", color: "var(--text-primary)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                <i className="fa-solid fa-envelope"></i>
                <span>Email</span>
              </a>
              <a href={selectedStartup.linkedin} target="_blank" rel="noopener noreferrer" className="founder-btn linkedin-btn" style={{ padding: "8px 12px", fontSize: "0.8rem", background: "rgba(59, 130, 246, 0.15)", border: "1px solid rgba(59, 130, 246, 0.3)", borderRadius: "6px", color: "#3b82f6", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                <i className="fa-brands fa-linkedin"></i>
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "The Ask",
      content: (
        <div style={{ padding: "10px", width: "100%" }}>
          <div style={{ color: "var(--accent)", fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", marginBottom: "6px", letterSpacing: "1px" }}>
            The Ask
          </div>
          <h3 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "16px", marginTop: 0 }}>
            Funding & Milestones
          </h3>
          <p style={{ fontSize: "1.15rem", color: "var(--text-secondary)", lineHeight: "1.8", borderLeft: "4px solid var(--accent)", paddingLeft: "16px", margin: 0 }}>
            {selectedDeck.askDetails}
          </p>
        </div>
      )
    }
  ] : [];

  const isShortlisted = selectedStartup ? shortlistedIds.includes(selectedStartup.id) : false;
  let displayStatus = selectedStartup ? selectedStartup.status : "";
  if (selectedStartup && isShortlisted) {
    displayStatus = "Shortlisted";
  }
  const badgeClass = displayStatus.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="app-container">
      {/* Mobile Sidebar Backdrop Overlay */}
      <div className={`sidebar-overlay ${isSidebarOpen ? "open" : ""}`} onClick={() => setIsSidebarOpen(false)}></div>

      {/* SIDEBAR */}
      <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`} id="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <span className="logo-text">StepUp <span className="logo-accent">for AI</span></span>
          </div>
          <button className="btn-close-sidebar" onClick={() => setIsSidebarOpen(false)} aria-label="Close Sidebar">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <nav className="sidebar-nav">
          <ul>
            <li>
              <button className={`nav-item ${activePanel === "pitch-decks" ? "active" : ""}`} onClick={() => { setActivePanel("pitch-decks"); setIsSidebarOpen(false); }}>
                <i className="fa-solid fa-briefcase"></i>
                <span>Pitch Decks</span>
              </button>
            </li>
            <li>
              <button className={`nav-item ${activePanel === "profile" ? "active" : ""}`} onClick={() => { setActivePanel("profile"); setIsSidebarOpen(false); }}>
                <i className="fa-solid fa-user-tie"></i>
                <span>Investor Profile</span>
              </button>
            </li>
          </ul>
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile-sm">
            <div className="avatar-sm" style={profilePicData ? { backgroundImage: `url(${profilePicData})` } : undefined}>
              {!profilePicData && getInitials(profileData.name)}
            </div>
            <div className="user-info-sm">
              <h4 className="user-name">{profileData.name}</h4>
              <span className="user-role">Vetted Investor</span>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="main-content">
        {/* TOPBAR */}
        <header className="topbar">
          <div className="topbar-left">
            <button className="btn-hamburger" onClick={() => setIsSidebarOpen(true)} aria-label="Open Sidebar">
              <i className="fa-solid fa-bars"></i>
            </button>
            <h1 className="panel-title" id="panelTitle">
              {activePanel === "pitch-decks" && "Pitch Decks"}
              {activePanel === "profile" && "Investor Profile"}
            </h1>
          </div>

          <div className="topbar-right">
            <div className="investor-badge">
              <i className="fa-solid fa-circle-check"></i>
              <span>Verified Investor</span>
            </div>
            <button
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
              className="btn-logout"
              style={{ background: "transparent", cursor: "pointer", fontFamily: "inherit" }}
              aria-label="Logout"
            >
              <i className="fa-solid fa-right-from-bracket"></i>
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* PANELS CONTAINER */}
        <main className="panels-container">
          {/* PANEL 1: PITCH DECKS */}
          {activePanel === "pitch-decks" && (
            <section id="panel-pitch-decks" className="dashboard-panel active">
              {/* Summary Strip */}
              <div className="summary-strip">
                <div className="stat-card glass-card">
                  <div className="stat-icon-wrapper text-green">
                    <i className="fa-solid fa-folder-open"></i>
                  </div>
                  <div className="stat-info">
                    <h3 id="stat-total-pitches">{totalPitchesCount}</h3>
                    <p>Total Pitches</p>
                  </div>
                </div>
                <div className="stat-card glass-card">
                  <div className="stat-icon-wrapper text-gold">
                    <i className="fa-solid fa-fire-flame-curved"></i>
                  </div>
                  <div className="stat-info">
                    <h3 id="stat-new-pitches">{newPitchesCount}</h3>
                    <p>New This Week</p>
                  </div>
                </div>
                <div className="stat-card glass-card">
                  <div className="stat-icon-wrapper text-blue">
                    <i className="fa-solid fa-bookmark"></i>
                  </div>
                  <div className="stat-info">
                    <h3 id="stat-shortlisted-pitches">{shortlistedPitchesCount}</h3>
                    <p>Your Shortlist</p>
                  </div>
                </div>
              </div>

              {/* Filter Bar */}
              <div className="filter-bar glass-card">
                <div className="filter-input-group search-group">
                  <i className="fa-solid fa-magnifying-glass search-icon"></i>
                  <input type="text" id="searchBar" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search startups..." aria-label="Search startups" />
                </div>
                
                <div className="filter-input-group">
                  <select id="sectorFilter" value={sectorFilter} onChange={(e) => setSectorFilter(e.target.value)} aria-label="Filter by Sector">
                    <option value="all">All Sectors</option>
                    <option value="fintech">Fintech</option>
                    <option value="healthtech">Healthtech</option>
                    <option value="climate">Climate Tech</option>
                    <option value="edtech">Edtech</option>
                    <option value="ai-ml">AI / ML</option>
                    <option value="saas">SaaS</option>
                  </select>
                </div>
                
                <div className="filter-input-group">
                  <select id="stageFilter" value={stageFilter} onChange={(e) => setStageFilter(e.target.value)} aria-label="Filter by Funding Stage">
                    <option value="all">All Stages</option>
                    <option value="Pre-seed">Pre-seed</option>
                    <option value="Seed">Seed</option>
                    <option value="Series A">Series A</option>
                    <option value="Series B+">Series B+</option>
                  </select>
                </div>
                
                <div className="filter-input-group">
                  <select id="shortlistFilter" value={shortlistFilter} onChange={(e) => setShortlistFilter(e.target.value)} aria-label="Filter by Shortlist">
                    <option value="all">All Pitches</option>
                    <option value="shortlisted">Shortlisted Only</option>
                  </select>
                </div>
                
                <div className="filter-input-group">
                  <select id="sortOrder" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} aria-label="Sort Pitches">
                    <option value="newest">Newest Submitted</option>
                    <option value="oldest">Oldest Submitted</option>
                    <option value="highest-ask">Highest Ask</option>
                    <option value="lowest-ask">Lowest Ask</option>
                  </select>
                </div>

                <div className="filter-actions">
                  <span className="results-count" id="resultsCount">{filteredPitches.length} Results</span>
                  <button className="btn-clear-filters" onClick={clearAllFilters} id="btnClearFilters">Clear All</button>
                </div>
              </div>

              {/* View Selector Header Row */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "12px", borderBottom: "1px solid rgba(255, 255, 255, 0.05)", paddingBottom: "16px" }}>
                <span className="results-count" id="resultsCount" style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                  {filteredPitches.length} Startups Found
                </span>
                
                {/* Segmented Controller */}
                <div style={{ display: "flex", background: "rgba(255, 255, 255, 0.02)", borderRadius: "8px", padding: "3px", border: "1px solid rgba(255, 255, 255, 0.06)" }}>
                  <button
                    onClick={() => setDashboardView("list")}
                    style={{
                      padding: "6px 14px",
                      borderRadius: "6px",
                      border: "none",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      transition: "all 0.2s",
                      background: dashboardView === "list" ? "#10b981" : "transparent",
                      color: dashboardView === "list" ? "#030712" : "rgba(255, 255, 255, 0.6)"
                    }}
                  >
                    <i className="fa-solid fa-list"></i>
                    <span>List View</span>
                  </button>
                  <button
                    onClick={() => setDashboardView("pipeline")}
                    style={{
                      padding: "6px 14px",
                      borderRadius: "6px",
                      border: "none",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      transition: "all 0.2s",
                      background: dashboardView === "pipeline" ? "#10b981" : "transparent",
                      color: dashboardView === "pipeline" ? "#030712" : "rgba(255, 255, 255, 0.6)"
                    }}
                  >
                    <i className="fa-solid fa-table-columns"></i>
                    <span>Pipeline Board</span>
                  </button>
                </div>
              </div>

              {dashboardView === "list" ? (
                /* Pitch Card Grid */
                <div className="pitch-grid" id="pitchGrid">
                  {filteredPitches.map(startup => {
                    const isStartupShortlisted = shortlistedIds.includes(startup.id);

                    let startupDisplayStatus = startup.status;
                    if (isStartupShortlisted) {
                      startupDisplayStatus = "Shortlisted";
                    } else if (startup.status === "Shortlisted") {
                      startupDisplayStatus = "Under Review";
                    }

                    let startupBadgeClass = "new";
                    if (startupDisplayStatus === "Under Review") startupBadgeClass = "review";
                    if (startupDisplayStatus === "Shortlisted") startupBadgeClass = "shortlisted";

                    return (
                      <article className="pitch-card glass-card" key={startup.id} tabIndex={0} aria-label={`${startup.name} startup card. Sector: ${startup.sectorLabel}. Stage: ${startup.stage}. Funding Ask: ${formatAskAmount(startup.ask)}`}>
                        <div className="card-main-info">
                          <div className="card-title-row">
                            <h3>{startup.name}</h3>
                            <span className={`status-badge ${startupBadgeClass}`}>{startupDisplayStatus}</span>
                          </div>
                          <p className="card-tagline">{startup.tagline}</p>
                          <div className="card-tags">
                            <span className="tag">{startup.sectorLabel}</span>
                            <span className="tag">{startup.stage}</span>
                          </div>
                        </div>

                        <div className="card-metrics-col">
                          <div className="metric-label">Funding Ask</div>
                          <div className="metric-value">{formatAskAmount(startup.ask)}</div>
                          <span className="submission-date">Submitted: {startup.submittedDate}</span>
                        </div>

                        <div className="card-actions-col">
                          <div className="card-checkboxes">
                            <label className="custom-checkbox">
                              <input type="checkbox" className="cb-view-pitch" checked={selectedStartup?.id === startup.id && modalMode === "pitch" && isModalOpen} onChange={(e) => { if (e.target.checked) openPitchModal(startup, "pitch"); else closePitchModal(); }} aria-label="Check to view full pitch details" />
                              <span className="checkbox-box"><i className="fa-solid fa-check"></i></span>
                              <span className="checkbox-label">More Details</span>
                            </label>
                            <label className="custom-checkbox">
                              <input type="checkbox" className="cb-view-contact" checked={selectedStartup?.id === startup.id && modalMode === "contact" && isModalOpen} onChange={(e) => { if (e.target.checked) openPitchModal(startup, "contact"); else closePitchModal(); }} aria-label="Check to view owner contact details" />
                              <span className="checkbox-box"><i className="fa-solid fa-check"></i></span>
                              <span className="checkbox-label">Contact Details</span>
                            </label>
                          </div>
                          
                          <div className="card-footer-actions" style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                            <button 
                              className="btn-pitch-deck-action" 
                              onClick={() => openPitchModal(startup, "deck")}
                              style={{
                                padding: "6px 12px",
                                borderRadius: "8px",
                                background: "rgba(47, 191, 100, 0.1)",
                                border: "1px solid rgba(47, 191, 100, 0.2)",
                                color: "var(--accent)",
                                fontSize: "0.8rem",
                                fontWeight: 600,
                                cursor: "pointer",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "6px",
                                transition: "all var(--transition-fast)"
                              }}
                            >
                              <i className="fa-solid fa-file-pdf"></i>
                              <span>Pitch Deck</span>
                            </button>
                            <button className={`bookmark-btn ${isStartupShortlisted ? "active" : ""}`} onClick={() => toggleShortlist(startup.id)} aria-label={isStartupShortlisted ? "Remove from shortlist" : "Add to shortlist"} title={isStartupShortlisted ? "Remove from Shortlist" : "Add to Shortlist"}>
                              <i className={`fa-${isStartupShortlisted ? "solid" : "regular"} fa-bookmark`}></i>
                            </button>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              ) : (
                /* Pipeline Kanban Board View */
                <div style={{ display: "flex", gap: "16px", overflowX: "auto", paddingBottom: "16px", alignItems: "flex-start", width: "100%" }}>
                  {[
                    { id: "new", title: "New Inbound", color: "#3b82f6", items: getPipelineColumns().newInbound },
                    { id: "intro", title: "Intro Call", color: "#f59e0b", items: getPipelineColumns().introCall },
                    { id: "diligence", title: "Due Diligence", color: "#8b5cf6", items: getPipelineColumns().dueDiligence },
                    { id: "shortlisted", title: "Shortlisted", color: "#10b981", items: getPipelineColumns().shortlisted }
                  ].map(column => (
                    <div key={column.id} style={{
                      flex: "1 1 0px",
                      minWidth: "255px",
                      background: "rgba(3, 7, 18, 0.4)",
                      border: "1px solid rgba(255, 255, 255, 0.05)",
                      borderRadius: "16px",
                      padding: "16px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "14px",
                      maxHeight: "750px",
                      overflow: "hidden"
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "10px", marginBottom: "4px" }}>
                        <h3 style={{ fontSize: "0.85rem", fontWeight: 700, color: "#ffffff", margin: 0, display: "flex", alignItems: "center", gap: "8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                          <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: column.color }} />
                          {column.title}
                        </h3>
                        <span style={{ fontSize: "0.75rem", background: "rgba(255,255,255,0.05)", padding: "2px 8px", borderRadius: "10px", color: "rgba(255, 255, 255, 0.6)", fontWeight: 600 }}>
                          {column.items.length}
                        </span>
                      </div>
                      
                      <div style={{ display: "flex", flexDirection: "column", gap: "12px", overflowY: "auto", paddingRight: "4px", minHeight: "100px" }}>
                        {column.items.length === 0 ? (
                          <div style={{ padding: "30px 10px", textAlign: "center", color: "rgba(255,255,255,0.3)", fontSize: "0.75rem", border: "1px dashed rgba(255,255,255,0.05)", borderRadius: "8px" }}>
                            No deals in this stage
                          </div>
                        ) : (
                          column.items.map(startup => {
                            const isStartupShortlisted = shortlistedIds.includes(startup.id);
                            return (
                              <div key={startup.id} className="glass-card" style={{
                                padding: "16px",
                                borderRadius: "12px",
                                border: "1px solid rgba(255, 255, 255, 0.05)",
                                background: "rgba(255, 255, 255, 0.015)",
                                display: "flex",
                                flexDirection: "column",
                                gap: "10px"
                              }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px" }}>
                                  <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#ffffff", margin: 0 }}>{startup.name}</h4>
                                  <button className={`bookmark-btn ${isStartupShortlisted ? "active" : ""}`} onClick={() => toggleShortlist(startup.id)} style={{ padding: "4px", minWidth: "auto", height: "auto", background: "transparent", border: "none", cursor: "pointer" }}>
                                    <i className={`fa-${isStartupShortlisted ? "solid" : "regular"} fa-bookmark`} style={{ fontSize: "0.85rem", color: isStartupShortlisted ? "#10b981" : "rgba(255,255,255,0.4)" }}></i>
                                  </button>
                                </div>
                                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                                  <span style={{ fontSize: "0.65rem", padding: "2px 6px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "4px", color: "rgba(255,255,255,0.5)" }}>{startup.sectorLabel}</span>
                                  <span style={{ fontSize: "0.65rem", padding: "2px 6px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "4px", color: "rgba(255,255,255,0.5)" }}>{startup.stage}</span>
                                </div>
                                <p style={{
                                  fontSize: "0.75rem",
                                  color: "rgba(255, 255, 255, 0.5)",
                                  margin: 0,
                                  lineClamp: 2,
                                  display: "-webkit-box",
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: "vertical",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  lineHeight: "1.4"
                                }}>
                                  {startup.tagline}
                                </p>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "10px", marginTop: "4px" }}>
                                  <div>
                                    <div style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>Ask</div>
                                    <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "#10b981" }}>{formatAskAmount(startup.ask)}</div>
                                  </div>
                                  <div style={{ display: "flex", gap: "6px" }}>
                                    <button 
                                      onClick={() => openPitchModal(startup, "pitch")}
                                      style={{
                                        padding: "4px 8px",
                                        borderRadius: "6px",
                                        border: "1px solid rgba(255,255,255,0.1)",
                                        background: "rgba(255,255,255,0.03)",
                                        color: "#ffffff",
                                        fontSize: "0.7rem",
                                        fontWeight: 600,
                                        cursor: "pointer"
                                      }}
                                    >
                                      Details
                                    </button>
                                    <button 
                                      onClick={() => openPitchModal(startup, "deck")}
                                      style={{
                                        padding: "4px 8px",
                                        borderRadius: "6px",
                                        background: "rgba(47, 191, 100, 0.1)",
                                        border: "1px solid rgba(47, 191, 100, 0.2)",
                                        color: "var(--accent)",
                                        fontSize: "0.7rem",
                                        fontWeight: 600,
                                        cursor: "pointer"
                                      }}
                                    >
                                      Deck
                                    </button>
                                  </div>
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Empty State */}
              {filteredPitches.length === 0 && (
                <div className="empty-state" id="emptyState">
                  <i className="fa-solid fa-folder-open empty-icon"></i>
                  <h3>No startups match your search</h3>
                  <p>Try clearing some filters or searching for something else.</p>
                  <button className="btn btn-secondary" onClick={clearAllFilters} id="emptyStateReset">Clear Filters</button>
                </div>
              )}
            </section>
          )}

          {/* PANEL 2: INVESTOR PROFILE */}
          {activePanel === "profile" && (
            <section id="panel-profile" className="dashboard-panel active">
              <div className="profile-layout">
                {/* Left Column: Profile Card & Bio */}
                <div className="profile-main-col">
                  {/* Profile Header Card */}
                  <div className={`profile-card glass-card ${isProfileEditing ? "edit-mode" : ""}`}>
                    <div className="profile-card-header">
                      <div className="profile-avatar-container">
                        <div className="profile-avatar-lg" id="profileAvatar" style={profilePicData ? { backgroundImage: `url(${profilePicData})` } : undefined}>
                          {!profilePicData && getInitials(profileData.name)}
                        </div>
                        <label htmlFor="profilePicUpload" className="avatar-upload-overlay" id="avatarUploadOverlay" title="Upload profile picture">
                          <i className="fa-solid fa-camera"></i>
                          <input type="file" id="profilePicUpload" onChange={handleProfilePicUpload} accept="image/*" style={{ display: "none" }} />
                        </label>
                      </div>
                      <div className="profile-headline">
                        <div className="profile-name-row">
                          {isProfileEditing ? (
                            <input type="text" id="profileNameInput" value={tempProfileName} onChange={(e) => setTempProfileName(e.target.value)} className="inline-input-header profile-name-input" />
                          ) : (
                            <input type="text" id="profileNameInput" value={profileData.name} readOnly className="inline-input-header profile-name-input" />
                          )}
                          <span className="investor-badge">
                            <i className="fa-solid fa-circle-check"></i> Verified
                          </span>
                        </div>
                        {isProfileEditing ? (
                          <input type="text" id="profileOrgInput" value={tempProfileOrg} onChange={(e) => setTempProfileOrg(e.target.value)} className="inline-input-header profile-org-input" />
                        ) : (
                          <input type="text" id="profileOrgInput" value={profileData.org} readOnly className="inline-input-header profile-org-input" />
                        )}
                        <p className="profile-role">Managing Partner</p>
                      </div>
                      <div className="profile-header-actions" style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                        {isProfileEditing && (
                          <button className="btn btn-primary" id="btnSaveProfileHeader" onClick={saveProfileData} aria-label="Save Changes">
                            <i className="fa-solid fa-check"></i>
                            <span>Save</span>
                          </button>
                        )}
                        <button className="btn btn-secondary btn-edit-profile" id="btnEditProfile" onClick={isProfileEditing ? cancelEditingProfile : startEditingProfile} aria-label={isProfileEditing ? "Cancel" : "Edit Profile"}>
                          <i className={`fa-solid ${isProfileEditing ? "fa-xmark" : "fa-pen-to-square"}`}></i>
                          <span>{isProfileEditing ? "Cancel" : "Edit Profile"}</span>
                        </button>
                      </div>
                    </div>
                    
                    <div className="profile-card-body">
                      <div className="form-group">
                        <label htmlFor="profileBioInput">Professional Bio</label>
                        {isProfileEditing ? (
                          <textarea id="profileBioInput" value={tempProfileBio} onChange={(e) => setTempProfileBio(e.target.value)} rows={4}></textarea>
                        ) : (
                          <textarea id="profileBioInput" value={profileData.bio} readOnly rows={4}></textarea>
                        )}
                      </div>

                      <div className="form-group">
                        <label>Investment Focus</label>
                        {!isProfileEditing ? (
                          <div className="focus-chips" id="focusChipsContainer">
                            {profileData.focusSectors.map(sec => {
                              const sObj = SECTORS.find(s => s.value === sec);
                              return (
                                <span className="chip" key={sec}>{sObj ? sObj.label : sec}</span>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="chip-edit-wrapper" id="chipEditWrapper">
                            <p className="field-help">Click to toggle investment sectors:</p>
                            <div className="focus-chips-selector" id="focusChipsSelector">
                              {SECTORS.map(sec => {
                                const isActive = tempFocusSectors.includes(sec.value);
                                return (
                                  <span className={`selectable-chip ${isActive ? "active" : ""}`} key={sec.value} onClick={() => toggleTempFocusSector(sec.value)}>
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
                          <input type="password" id="currentPassword" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required placeholder="••••••••" />
                        </div>
                        <div className="form-group">
                          <label htmlFor="newPassword">New Password</label>
                          <input type="password" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required placeholder="••••••••" />
                        </div>
                        <div className="form-group">
                          <label htmlFor="confirmPassword">Confirm New Password</label>
                          <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required placeholder="••••••••" />
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
                        <span className="stat-number" id="profile-stat-vetted">{totalPitchesCount}</span>
                        <span className="stat-label">Total Vetted</span>
                      </div>
                      <div className="profile-stat-box">
                        <span className="stat-number" id="profile-stat-shortlist">{shortlistedPitchesCount}</span>
                        <span className="stat-label">Shortlisted</span>
                      </div>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className={`profile-contact-card glass-card ${isProfileEditing ? "edit-mode" : ""}`}>
                    <h3>Contact Information</h3>
                    <div className="contact-details-list">
                      <div className="contact-detail-item">
                        <div className="detail-icon"><i className="fa-solid fa-envelope"></i></div>
                        <div className="detail-info">
                          <span className="detail-label">Email (Issued by Admin)</span>
                          <span className="detail-val" id="profileEmail">{profileData.email}</span>
                        </div>
                      </div>
                      <div className="contact-detail-item">
                        <div className="detail-icon"><i className="fa-solid fa-phone"></i></div>
                        <div className="detail-info">
                          <span className="detail-label">Phone Number</span>
                          {isProfileEditing ? (
                            <input type="tel" id="profilePhoneInput" value={tempProfilePhone} onChange={(e) => setTempProfilePhone(e.target.value)} className="inline-input" />
                          ) : (
                            <input type="tel" id="profilePhoneInput" value={profileData.phone} readOnly className="inline-input" />
                          )}
                        </div>
                      </div>
                      <div className="contact-detail-item">
                        <div className="detail-icon"><i className="fa-brands fa-linkedin"></i></div>
                        <div className="detail-info">
                          <span className="detail-label">LinkedIn Link</span>
                          {isProfileEditing ? (
                            <input type="url" id="profileLinkedinInput" value={tempProfileLinkedin} onChange={(e) => setTempProfileLinkedin(e.target.value)} className="inline-input" />
                          ) : (
                            <input type="url" id="profileLinkedinInput" value={profileData.linkedin} readOnly className="inline-input" />
                          )}
                        </div>
                      </div>
                      <div className="contact-detail-item">
                        <div className="detail-icon"><i className="fa-brands fa-x-twitter"></i></div>
                        <div className="detail-info">
                          <span className="detail-label">Twitter / X Link</span>
                          {isProfileEditing ? (
                            <input type="url" id="profileTwitterInput" value={tempProfileTwitter} onChange={(e) => setTempProfileTwitter(e.target.value)} className="inline-input" />
                          ) : (
                            <input type="url" id="profileTwitterInput" value={profileData.twitter} readOnly className="inline-input" />
                          )}
                        </div>
                      </div>
                      <div className="contact-detail-item">
                        <div className="detail-icon"><i className="fa-solid fa-globe"></i></div>
                        <div className="detail-info">
                          <span className="detail-label">Website / Fund Link</span>
                          {isProfileEditing ? (
                            <input type="url" id="profileWebsiteInput" value={tempProfileWebsite} onChange={(e) => setTempProfileWebsite(e.target.value)} className="inline-input" />
                          ) : (
                            <input type="url" id="profileWebsiteInput" value={profileData.website} readOnly className="inline-input" />
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
          )}
        </main>
      </div>

      {/* Pitch Detail Modal */}
      <div className={`modal-backdrop ${isModalOpen ? "open" : ""}`} role="dialog" aria-modal="true" aria-hidden={!isModalOpen} onClick={closePitchModal}>
        {selectedStartup && (
          <div className="modal glass-card" style={{ maxWidth: modalMode === "pitch" ? "1000px" : "680px", width: "100%" }} onClick={(e) => e.stopPropagation()}>
            {modalMode === "deck" && (
              <button 
                className="btn-download-pdf" 
                onClick={handleDownloadPDF} 
                title="Download Pitch Deck as PDF"
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "64px",
                  background: "rgba(47, 191, 100, 0.1)",
                  border: "1px solid rgba(47, 191, 100, 0.25)",
                  color: "var(--accent)",
                  height: "32px",
                  borderRadius: "8px",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  padding: "0 12px",
                  transition: "all var(--transition-fast)"
                }}
              >
                <i className="fa-solid fa-file-pdf"></i>
                <span>Download PDF</span>
              </button>
            )}
            <button className="btn-close-modal" onClick={closePitchModal} aria-label="Close Modal">
              <i className="fa-solid fa-xmark"></i>
            </button>
            <div className="modal-content">
              {modalMode === "pitch" && (
                <div style={{ display: "flex", gap: "24px", flexDirection: "row", flexWrap: "wrap", width: "100%" }}>
                  {/* Left Panel: 2/3 width */}
                  <div style={{ flex: "2 1 480px", display: "flex", flexDirection: "column" }}>
                    <div className="modal-header-section" style={{ display: "flex", gap: "20px", alignItems: "flex-start", marginBottom: "20px", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", paddingBottom: "20px" }}>
                      <div style={{
                        width: "64px",
                        height: "64px",
                        background: selectedStartup.logoBg,
                        borderRadius: "16px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.5rem",
                        fontWeight: 800,
                        color: "#ffffff"
                      }}>
                        {selectedStartup.logoText}
                      </div>
                      <div style={{ flex: 1 }}>
                        <h2 style={{ fontSize: "1.85rem", fontWeight: 700, color: "#ffffff", margin: "0 0 8px 0", letterSpacing: "-0.5px" }}>
                          {selectedStartup.name}
                        </h2>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "12px" }}>
                          <span style={{ background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.1)", padding: "4px 12px", borderRadius: "100px", fontSize: "0.75rem", color: "rgba(255, 255, 255, 0.7)", fontWeight: 500 }}>
                            {selectedStartup.sectorLabel}
                          </span>
                          <span style={{ background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.1)", padding: "4px 12px", borderRadius: "100px", fontSize: "0.75rem", color: "rgba(255, 255, 255, 0.7)", fontWeight: 500 }}>
                            {selectedStartup.stage}
                          </span>
                          <span style={{
                            background: displayStatus.toLowerCase() === "new" ? "rgba(16, 185, 129, 0.1)" : displayStatus.toLowerCase() === "under review" ? "rgba(245, 158, 11, 0.1)" : "rgba(59, 130, 246, 0.1)",
                            border: displayStatus.toLowerCase() === "new" ? "1px solid rgba(16, 185, 129, 0.3)" : displayStatus.toLowerCase() === "under review" ? "1px solid rgba(245, 158, 11, 0.3)" : "1px solid rgba(59, 130, 246, 0.3)",
                            color: displayStatus.toLowerCase() === "new" ? "#10b981" : displayStatus.toLowerCase() === "under review" ? "#f59e0b" : "#3b82f6",
                            padding: "4px 12px",
                            borderRadius: "100px",
                            fontSize: "0.75rem",
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: "0.5px"
                          }}>
                            {displayStatus}
                          </span>
                        </div>
                        <p style={{ fontSize: "0.95rem", color: "rgba(255, 255, 255, 0.5)", margin: 0, lineHeight: "1.4" }}>
                          {selectedStartup.tagline}
                        </p>
                      </div>
                    </div>

                    <div style={{ marginBottom: "24px" }}>
                      <h3 style={{ fontSize: "0.85rem", fontWeight: 700, color: "#10b981", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "12px", marginTop: 0 }}>
                        Startup Pitch
                      </h3>
                      <p style={{ fontSize: "1rem", color: "rgba(255, 255, 255, 0.7)", lineHeight: "1.6", margin: 0 }}>
                        {selectedStartup.description}
                      </p>
                    </div>

                    <div style={{
                      background: "rgba(16, 185, 129, 0.02)",
                      border: "1px solid rgba(16, 185, 129, 0.15)",
                      borderRadius: "12px",
                      padding: "20px",
                      marginBottom: "24px"
                    }}>
                      <h3 style={{ fontSize: "0.85rem", fontWeight: 700, color: "#10b981", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "16px", marginTop: 0 }}>
                        Founder Contact Summary
                      </h3>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
                        <div>
                          <h4 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#ffffff", margin: "0 0 4px 0" }}>
                            {selectedStartup.founder}
                          </h4>
                          <p style={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "0.85rem", margin: 0 }}>
                            Founder & CEO, {selectedStartup.name}
                          </p>
                        </div>
                        <div style={{ display: "flex", gap: "10px" }}>
                          <a href={`mailto:${selectedStartup.email}`} className="founder-btn" style={{
                            padding: "8px 16px",
                            background: "rgba(255, 255, 255, 0.03)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            borderRadius: "8px",
                            color: "rgba(255, 255, 255, 0.8)",
                            textDecoration: "none",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                            fontSize: "0.85rem",
                            fontWeight: 600,
                            transition: "all var(--transition-fast)"
                          }}>
                            <i className="fa-solid fa-envelope"></i>
                            <span>Email</span>
                          </a>
                          <a href={selectedStartup.linkedin} target="_blank" rel="noopener noreferrer" className="founder-btn" style={{
                            padding: "8px 16px",
                            background: "rgba(255, 255, 255, 0.03)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            borderRadius: "8px",
                            color: "rgba(255, 255, 255, 0.8)",
                            textDecoration: "none",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                            fontSize: "0.85rem",
                            fontWeight: 600,
                            transition: "all var(--transition-fast)"
                          }}>
                            <i className="fa-brands fa-linkedin"></i>
                            <span>LinkedIn</span>
                          </a>
                        </div>
                      </div>
                    </div>

                    <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "20px" }}>
                      <button
                        onClick={() => toggleShortlist(selectedStartup.id)}
                        className="btn btn-secondary"
                        style={{
                          padding: "10px 20px",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "8px",
                          fontSize: "0.9rem",
                          fontWeight: 600,
                          background: "rgba(255, 255, 255, 0.03)",
                          border: "1px solid rgba(255, 255, 255, 0.15)",
                          borderRadius: "8px",
                          color: "rgba(255, 255, 255, 0.9)",
                          cursor: "pointer"
                        }}
                      >
                        <i className={`fa-${isShortlisted ? "solid" : "regular"} fa-bookmark`}></i>
                        <span>Shortlist Pitch</span>
                      </button>
                      <button
                        onClick={() => {
                          const text = `Hello StepUp Team,\n\nI would like to request a meeting with the founder of ${selectedStartup.name}.\nInvestor: ${profileData.name}`;
                          const whatsappUrl = `https://api.whatsapp.com/send?phone=918341011206&text=${encodeURIComponent(text)}`;
                          window.open(whatsappUrl, "_blank");
                        }}
                        className="btn btn-primary"
                        style={{
                          padding: "10px 20px",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "8px",
                          fontSize: "0.9rem",
                          fontWeight: 700,
                          background: "#10b981",
                          border: "none",
                          borderRadius: "8px",
                          color: "#030712",
                          cursor: "pointer"
                        }}
                      >
                        <i className="fa-solid fa-calendar-check"></i>
                        <span>Request a Meeting</span>
                      </button>
                    </div>
                  </div>

                  {/* Right Sidebar Panel: 1/3 width */}
                  <div style={{ flex: "1 1 280px", borderLeft: "1px solid rgba(255, 255, 255, 0.08)", paddingLeft: "24px", display: "flex", flexDirection: "column", gap: "20px" }}>
                    {/* Tab Navigation */}
                    <div style={{ display: "flex", background: "rgba(255, 255, 255, 0.02)", borderRadius: "8px", padding: "3px", border: "1px solid rgba(255, 255, 255, 0.06)", justifyContent: "space-between" }}>
                      {[
                        { id: "overview", label: "Overview" },
                        { id: "dataroom", label: "Data Room" },
                        { id: "captable", label: "Cap Table" },
                        { id: "notes", label: "Notes" }
                      ].map(tab => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id as any)}
                          style={{
                            flex: 1,
                            padding: "6px 2px",
                            borderRadius: "6px",
                            border: "none",
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            cursor: "pointer",
                            transition: "all var(--transition-fast)",
                            background: activeTab === tab.id ? "#10b981" : "transparent",
                            color: activeTab === tab.id ? "#030712" : "rgba(255, 255, 255, 0.6)"
                          }}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>

                    {/* Tab Content Area */}
                    <div style={{ flex: 1, transition: "all 0.3s ease" }}>
                      {/* Overview Tab Content */}
                      {activeTab === "overview" && (
                        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                          {/* Metrics (Funding Ask, Date) */}
                          <div style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: "16px",
                            background: "rgba(255, 255, 255, 0.015)",
                            border: "1px solid rgba(255, 255, 255, 0.06)",
                            borderRadius: "12px",
                            padding: "16px"
                          }}>
                            <div>
                              <div style={{ fontSize: "0.7rem", textTransform: "uppercase", color: "rgba(255, 255, 255, 0.5)", fontWeight: 700, letterSpacing: "0.5px", marginBottom: "4px" }}>
                                Funding Ask
                              </div>
                              <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "#10b981" }}>
                                {formatAskAmount(selectedStartup.ask)}
                              </div>
                            </div>
                            <div>
                              <div style={{ fontSize: "0.7rem", textTransform: "uppercase", color: "rgba(255, 255, 255, 0.5)", fontWeight: 700, letterSpacing: "0.5px", marginBottom: "4px" }}>
                                Submitted Date
                              </div>
                              <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "#ffffff" }}>
                                {selectedStartup.submittedDate}
                              </div>
                            </div>
                          </div>

                          {/* Round Allocation Tracker */}
                          <div style={{
                            background: "rgba(255, 255, 255, 0.015)",
                            border: "1px solid rgba(255, 255, 255, 0.06)",
                            borderRadius: "12px",
                            padding: "16px"
                          }}>
                            <h4 style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "rgba(255, 255, 255, 0.5)", fontWeight: 700, letterSpacing: "0.5px", marginBottom: "12px", marginTop: 0 }}>
                              Round Allocation Tracker
                            </h4>
                            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                              <div style={{ position: "relative", width: "56px", height: "56px", flexShrink: 0 }}>
                                <svg width="56" height="56" viewBox="0 0 56 56">
                                  <circle cx="28" cy="28" r="23" fill="transparent" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="5" />
                                  <circle cx="28" cy="28" r="23" fill="transparent" stroke="url(#emeraldTealGrad)" strokeWidth="5"
                                          strokeDasharray="144.5" strokeDashoffset={144.5 * (1 - 0.6)} strokeLinecap="round" transform="rotate(-90 28 28)" />
                                  <defs>
                                    <linearGradient id="emeraldTealGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                      <stop offset="0%" stopColor="#10b981" />
                                      <stop offset="100%" stopColor="#14b8a6" />
                                    </linearGradient>
                                  </defs>
                                </svg>
                                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", fontSize: "0.8rem", fontWeight: 700, color: "#ffffff" }}>
                                  60%
                                </div>
                              </div>
                              <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                                <span style={{ fontSize: "0.8rem", color: "#ffffff", fontWeight: 500 }}>
                                  <strong style={{ color: "#10b981" }}>{formatLakhs(selectedStartup.ask * 0.6)}</strong> Committed
                                </span>
                                <span style={{ fontSize: "0.75rem", color: "rgba(255, 255, 255, 0.4)" }}>
                                  {formatLakhs(selectedStartup.ask * 0.4)} Remaining
                                </span>
                                <span style={{ fontSize: "0.65rem", color: "#10b981", fontWeight: 600, marginTop: "2px" }}>
                                  3 Vetted Angels Committed
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Scorecard Widget */}
                          <div style={{
                            background: "rgba(255, 255, 255, 0.015)",
                            border: "1px solid rgba(255, 255, 255, 0.06)",
                            borderRadius: "12px",
                            padding: "16px"
                          }}>
                            <h4 style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "rgba(255, 255, 255, 0.5)", fontWeight: 700, letterSpacing: "0.5px", marginBottom: "16px", marginTop: 0 }}>
                              Team Scorecard
                            </h4>
                            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                              {[
                                { key: "pedigree", label: "Founder Pedigree", value: (startupRatings[selectedStartup.id] || { pedigree: 4.0, tailwinds: 4.2, moat: 4.5 }).pedigree },
                                { key: "tailwinds", label: "Market Tailwinds", value: (startupRatings[selectedStartup.id] || { pedigree: 4.0, tailwinds: 4.2, moat: 4.5 }).tailwinds },
                                { key: "moat", label: "Product Moat", value: (startupRatings[selectedStartup.id] || { pedigree: 4.0, tailwinds: 4.2, moat: 4.5 }).moat }
                              ].map(metric => (
                                <div key={metric.key} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                                  <div style={{ display: "flex", justifyBetween: "space-between", fontSize: "0.75rem", display: "flex", justifyContent: "space-between" }}>
                                    <span style={{ color: "rgba(255, 255, 255, 0.7)" }}>{metric.label}</span>
                                    <span style={{ color: "#10b981", fontWeight: 700 }}>{metric.value.toFixed(1)} / 5.0</span>
                                  </div>
                                  <input
                                    type="range"
                                    min="1"
                                    max="5"
                                    step="0.1"
                                    value={metric.value}
                                    onChange={(e) => updateRating(selectedStartup.id, metric.key as any, parseFloat(e.target.value))}
                                    className="scorecard-slider"
                                    style={{ width: "100%", cursor: "pointer" }}
                                  />
                                </div>
                              ))}
                            </div>

                            {/* Conviction Indicator */}
                            <div className="glass-card" style={{
                              marginTop: "16px",
                              padding: "12px",
                              borderRadius: "8px",
                              border: "1px solid rgba(16, 185, 129, 0.25)",
                              background: "rgba(16, 185, 129, 0.05)",
                              textAlign: "center",
                              boxShadow: "0 0 15px rgba(16, 185, 129, 0.1)"
                            }}>
                              <div style={{ fontSize: "0.7rem", textTransform: "uppercase", color: "#10b981", fontWeight: 700, letterSpacing: "0.5px", marginBottom: "4px" }}>
                                Total Conviction Score
                              </div>
                              <div style={{ fontSize: "1.25rem", fontWeight: 800, color: "#ffffff", textShadow: "0 0 10px rgba(16, 185, 129, 0.4)" }}>
                                {((((startupRatings[selectedStartup.id] || { pedigree: 4.0, tailwinds: 4.2, moat: 4.5 }).pedigree +
                                    (startupRatings[selectedStartup.id] || { pedigree: 4.0, tailwinds: 4.2, moat: 4.5 }).tailwinds +
                                    (startupRatings[selectedStartup.id] || { pedigree: 4.0, tailwinds: 4.2, moat: 4.5 }).moat) / 3)).toFixed(1)} / 5
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Data Room Tab Content */}
                      {activeTab === "dataroom" && (
                        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                          <h4 style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "rgba(255, 255, 255, 0.5)", fontWeight: 700, letterSpacing: "0.5px", marginBottom: "4px", marginTop: 0 }}>
                            Available Assets
                          </h4>
                          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                            {[
                              { name: `${selectedStartup.name}_PitchDeck_v2.pdf`, size: "4.2 MB", type: "pdf" },
                              { name: `${selectedStartup.name}_Financials.xlsx`, size: "1.8 MB", type: "excel" },
                              { name: `${selectedStartup.name}_CapTable.xlsx`, size: "920 KB", type: "excel" },
                              { name: `${selectedStartup.name}_OnePager.pdf`, size: "1.1 MB", type: "pdf" }
                            ].map((asset, idx) => (
                              <div key={idx} style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                padding: "10px 12px",
                                background: "rgba(255,255,255,0.015)",
                                border: "1px solid rgba(255,255,255,0.05)",
                                borderRadius: "8px",
                                fontSize: "0.8rem"
                              }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: 0 }}>
                                  {asset.type === "pdf" ? (
                                    <i className="fa-solid fa-file-pdf" style={{ color: "#ef4444", fontSize: "1rem" }}></i>
                                  ) : (
                                    <i className="fa-solid fa-file-excel" style={{ color: "#10b981", fontSize: "1rem" }}></i>
                                  )}
                                  <span style={{
                                    color: "rgba(255, 255, 255, 0.8)",
                                    fontWeight: 500,
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap"
                                  }} title={asset.name}>
                                    {asset.name}
                                  </span>
                                </div>
                                <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", flexShrink: 0, marginLeft: "8px" }}>
                                  {asset.size}
                                </span>
                              </div>
                            ))}
                          </div>
                          <button
                            onClick={() => showToast("Downloading all assets as a ZIP archive...", "info")}
                            className="btn btn-secondary"
                            style={{
                              marginTop: "8px",
                              padding: "10px",
                              fontSize: "0.8rem",
                              fontWeight: 600,
                              background: "rgba(255,255,255,0.03)",
                              border: "1px solid rgba(255,255,255,0.1)",
                              borderRadius: "8px",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: "8px",
                              color: "#ffffff"
                            }}
                          >
                            <i className="fa-solid fa-file-archive" style={{ color: "#eab308" }}></i>
                            <span>Download All Assets (.zip)</span>
                          </button>
                        </div>
                      )}

                      {/* Cap Table Tab Content */}
                      {activeTab === "captable" && (
                        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                          <h4 style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "rgba(255, 255, 255, 0.5)", fontWeight: 700, letterSpacing: "0.5px", marginBottom: "4px", marginTop: 0 }}>
                            Equity Distribution
                          </h4>
                          <div style={{
                            background: "rgba(255,255,255,0.015)",
                            border: "1px solid rgba(255,255,255,0.05)",
                            borderRadius: "10px",
                            overflow: "hidden"
                          }}>
                            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.75rem", textAlign: "left" }}>
                              <thead>
                                <tr style={{ background: "rgba(255,255,255,0.02)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                                  <th style={{ padding: "8px 12px", color: "rgba(255,255,255,0.5)" }}>Shareholder</th>
                                  <th style={{ padding: "8px 12px", color: "rgba(255,255,255,0.5)", textAlign: "right" }}>Equity</th>
                                </tr>
                              </thead>
                              <tbody>
                                {[
                                  { role: "Founders & Team", pct: "65.0%" },
                                  { role: "Angel Investors", pct: "15.0%" },
                                  { role: "Option Pool (ESOP)", pct: "15.0%" },
                                  { role: "Advisors", pct: "5.0%" }
                                ].map((row, index) => (
                                  <tr key={index} style={{ borderBottom: index < 3 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                                    <td style={{ padding: "8px 12px", color: "rgba(255,255,255,0.8)", fontWeight: 500 }}>{row.role}</td>
                                    <td style={{ padding: "8px 12px", color: "#10b981", fontWeight: 700, textAlign: "right" }}>{row.pct}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                          <div style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.4)", lineHeight: "1.3" }}>
                            * Dilution projection modeled post-current Seed round completion. Class A common stock terms apply.
                          </div>
                        </div>
                      )}

                      {/* Notes Tab Content */}
                      {activeTab === "notes" && (
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px", height: "100%" }}>
                          <h4 style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "rgba(255, 255, 255, 0.5)", fontWeight: 700, letterSpacing: "0.5px", marginBottom: "4px", marginTop: 0 }}>
                            Internal Diligence Notes
                          </h4>
                          <textarea
                            value={startupNotes[selectedStartup.id] || ""}
                            onChange={(e) => updateNotes(selectedStartup.id, e.target.value)}
                            placeholder="Type investment thesis, follow-up questions, or risk analysis. Auto-saves locally..."
                            style={{
                              width: "100%",
                              height: "180px",
                              background: "rgba(255,255,255,0.015)",
                              border: "1px solid rgba(255,255,255,0.08)",
                              borderRadius: "8px",
                              padding: "10px",
                              color: "#ffffff",
                              fontSize: "0.8rem",
                              fontFamily: "inherit",
                              resize: "none",
                              outline: "none"
                            }}
                          />
                          <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.65rem", color: "#10b981" }}>
                            <i className="fa-solid fa-cloud-arrow-up"></i>
                            <span>Saved in localStorage</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {modalMode === "deck" && (
                <div className="pitch-deck-viewer" style={{ minHeight: "400px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  {/* Active Slide content */}
                  <div style={{ flex: 1, display: "flex", alignItems: "center", minHeight: "280px" }}>
                    {slides[currentSlide]?.content}
                  </div>

                  {/* Navigation controls */}
                  <div className="slide-controls" style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderTop: "1px solid var(--border-color)",
                    paddingTop: "20px",
                    marginTop: "20px"
                  }}>
                    <button 
                      disabled={currentSlide === 0}
                      onClick={() => setCurrentSlide(prev => Math.max(0, prev - 1))}
                      className="btn btn-secondary"
                      style={{
                        opacity: currentSlide === 0 ? 0.5 : 1,
                        cursor: currentSlide === 0 ? "not-allowed" : "pointer",
                        padding: "8px 16px",
                        fontSize: "0.85rem"
                      }}
                    >
                      <i className="fa-solid fa-arrow-left"></i> Previous
                    </button>
                    
                    <div style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                      Slide {currentSlide + 1} of {slides.length} : <strong>{slides[currentSlide]?.title}</strong>
                    </div>

                    <button 
                      disabled={currentSlide === slides.length - 1}
                      onClick={() => setCurrentSlide(prev => Math.min(slides.length - 1, prev + 1))}
                      className="btn btn-primary"
                      style={{
                        opacity: currentSlide === slides.length - 1 ? 0.5 : 1,
                        cursor: currentSlide === slides.length - 1 ? "not-allowed" : "pointer",
                        padding: "8px 16px",
                        fontSize: "0.85rem"
                      }}
                    >
                      Next <i className="fa-solid fa-arrow-right"></i>
                    </button>
                  </div>
                </div>
              )}

              {modalMode === "contact" && (
                <>
                  <div className="modal-header-section">
                    <div className="modal-brand">
                      <div className="modal-title">
                        <h2>{selectedStartup.name} Contact Details</h2>
                        <div className="modal-meta-tags">
                          <span className="tag">{selectedStartup.sectorLabel}</span>
                          <span className="tag">{selectedStartup.stage}</span>
                        </div>
                        <p className="modal-tagline">Connect directly with the pitch owner</p>
                      </div>
                    </div>
                  </div>

                  <div className="modal-founder-section" style={{ background: "rgba(47, 191, 100, 0.05)", borderColor: "rgba(47, 191, 100, 0.17)", marginTop: "10px" }}>
                    <h3 className="modal-section-title">Pitch Owner / Founder</h3>
                    <div className="founder-profile" style={{ flexDirection: "column", alignItems: "flex-start", gap: "16px" }}>
                      <div className="founder-info">
                        <h4>{selectedStartup.founder}</h4>
                        <p>Founder & CEO, {selectedStartup.name}</p>
                      </div>
                      
                      <div className="contact-details-list" style={{ width: "100%", marginTop: "10px", display: "flex", flexDirection: "column", gap: "12px" }}>
                        <div className="contact-detail-item" style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                          <div className="detail-icon" style={{ width: "38px", height: "38px", borderRadius: "50%", backgroundColor: "rgba(255, 255, 255, 0.03)", border: "1px solid var(--border-color)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.95rem", color: "var(--accent)" }}><i className="fa-solid fa-envelope"></i></div>
                          <div className="detail-info" style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                            <span className="detail-label" style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontWeight: 500 }}>Direct Email Address</span>
                            <span className="detail-val" style={{ fontSize: "0.95rem", color: "var(--text-primary)", fontWeight: 600 }}><a href={`mailto:${selectedStartup.email}`} style={{ color: "var(--accent)", textDecoration: "underline" }}>{selectedStartup.email}</a></span>
                          </div>
                        </div>
                        <div className="contact-detail-item" style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                          <div className="detail-icon" style={{ width: "38px", height: "38px", borderRadius: "50%", backgroundColor: "rgba(255, 255, 255, 0.03)", border: "1px solid var(--border-color)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.95rem", color: "var(--accent)" }}><i className="fa-solid fa-phone"></i></div>
                          <div className="detail-info" style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                            <span className="detail-label" style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontWeight: 500 }}>Phone Number</span>
                            <span className="detail-val" style={{ fontSize: "0.95rem", color: "var(--text-primary)", fontWeight: 600 }}>+91 98765 43210</span>
                          </div>
                        </div>
                        <div className="contact-detail-item" style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                          <div className="detail-icon" style={{ width: "38px", height: "38px", borderRadius: "50%", backgroundColor: "rgba(255, 255, 255, 0.03)", border: "1px solid var(--border-color)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.95rem", color: "var(--accent)" }}><i className="fa-brands fa-linkedin"></i></div>
                          <div className="detail-info" style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                            <span className="detail-label" style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontWeight: 500 }}>LinkedIn Profile Link</span>
                            <span className="detail-val" style={{ fontSize: "0.95rem", color: "var(--text-primary)", fontWeight: 600 }}><a href={selectedStartup.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: "#3b82f6", textDecoration: "underline" }}>{selectedStartup.linkedin}</a></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="modal-footer-section">
                    <button className="btn btn-secondary" onClick={closePitchModal} style={{ padding: "10px 20px", fontWeight: 600, fontSize: "0.9rem" }}>Close Details</button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Toast Notification Container */}
      <div className="toast-container" id="toastContainer" aria-live="polite">
        {toasts.map(t => (
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
    </div>
  );
}
