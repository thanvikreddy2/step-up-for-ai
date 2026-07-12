export interface Startup {
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

export interface ProfileData {
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

export interface Toast {
  id: number;
  message: string;
  type: "success" | "info" | "error";
}

export interface PitchDeckDetails {
  problem: string;
  solution: string;
  businessModel: string;
  advantage: string;
  financialProjections: string;
  askDetails: string;
}

export type MetricKey = "pedigree" | "tailwinds" | "moat";
export type ModalMode = "pitch" | "contact" | "deck";
export type ActiveTab = "overview" | "dataroom" | "captable" | "notes";
