import { Startup, PitchDeckDetails } from "@/types";

export const getPitchDeckDetails = (startup: Startup): PitchDeckDetails => {
  const name = startup.name;
  const sector = startup.sectorLabel;
  const stage = startup.stage;
  
  const formatAskAmount = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(1).replace(/\.0$/, "")} Cr`;
    }
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1).replace(/\.0$/, "")} L`;
    }
    return `₹${amount.toLocaleString("en-IN")}`;
  };
  
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
    askDetails = `Raising ${ask} Seed funding to build prompt evaluation frameworks, hire developer advocates, and reach $1.2M ARR.`;
  } else if (startup.id === "saasify") {
    problem = "Enterprises spend millions custom-building client dashboards and portals for their legacy systems.";
    solution = "An AI-powered builder that crawls database schemas to drag-and-drop secure client portals instantly.";
    businessModel = "Usage-based tier starting at $299/mo + enterprise self-hosted plans.";
    advantage = "Zero-config pipeline converting legacy query results into fully responsive, modern web views.";
    financialProjections = "Projecting $4.8M ARR by Year 2, gross margins exceeding 88%.";
    askDetails = `Raising ${ask} Series A funding to scale integrations marketplace, hire sales directors, and expand customer success.`;
  } else {
    // Default fallback slide information for dynamic/student pitches
    problem = startup.description || "The target market faces critical inefficiencies in access, billing, or automated execution workflow systems.";
    solution = startup.tagline || "Our proprietary software platform automates the pipeline with zero manual oversight and maximum security.";
    businessModel = "B2B SaaS monthly licensing fee per active seat, alongside custom enterprise API access tiers.";
    advantage = "Proprietary technology stack featuring low-latency processing and built-in cross-border regulatory compliance layers.";
    financialProjections = "Targeting cash-flow break-even point in month 18, reaching $2M ARR by Year 2.";
    askDetails = `Raising ${ask} to expand the technical engineering team, fast-track distribution licenses, and scale sales.`;
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
