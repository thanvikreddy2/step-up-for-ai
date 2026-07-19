"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { Startup, ProfileData, Toast, ActiveTab, MetricKey } from "@/types";
import { STARTUP_DATA, DEFAULT_PROFILE_DATA } from "@/lib/mockData";
import { filterPitches, PitchFilters } from "@/lib/filterUtils";

interface DashboardContextType {
  isMounted: boolean;
  allPitches: Startup[];
  setAllPitches: React.Dispatch<React.SetStateAction<Startup[]>>;
  shortlistedIds: string[];
  setShortlistedIds: React.Dispatch<React.SetStateAction<string[]>>;
  activePanel: string;
  setActivePanel: React.Dispatch<React.SetStateAction<string>>;
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  
  // Filters
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sectorFilter: string;
  setSectorFilter: (sector: string) => void;
  stageFilter: string;
  setStageFilter: (stage: string) => void;
  shortlistFilter: string;
  setShortlistFilter: (filter: string) => void;
  sortOrder: string;
  setSortOrder: (order: string) => void;
  locationFilter: string;
  setLocationFilter: (location: string) => void;
  companyFilter: string;
  setCompanyFilter: (company: string) => void;
  ratingFilter: number;
  setRatingFilter: (rating: number) => void;

  // Profile data
  profileData: ProfileData;
  setProfileData: React.Dispatch<React.SetStateAction<ProfileData>>;
  profilePicData: string | null;
  setProfilePicData: React.Dispatch<React.SetStateAction<string | null>>;

  // Selected startup in details view
  selectedStartup: Startup | null;
  setSelectedStartup: (startup: Startup | null) => void;
  isDeckToggled: boolean;
  setIsDeckToggled: (toggled: boolean) => void;
  currentSlide: number;
  setCurrentSlide: React.Dispatch<React.SetStateAction<number>>;

  // Deal Room Tabs State
  activeTab: ActiveTab;
  setActiveTab: React.Dispatch<React.SetStateAction<ActiveTab>>;
  startupRatings: Record<string, { pedigree: number; tailwinds: number; moat: number }>;
  startupNotes: Record<string, string>;

  // Toasts
  toasts: Toast[];

  // Functions
  showToast: (message: string, type?: "success" | "info" | "error") => void;
  toggleShortlist: (id: string) => void;
  updateNotes: (startupId: string, notesText: string) => void;
  updateRating: (startupId: string, metric: MetricKey, value: number) => void;
  clearAllFilters: () => void;
  getFilteredPitches: (forcedShortlisted?: boolean) => Startup[];
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [allPitches, setAllPitches] = useState<Startup[]>(STARTUP_DATA);
  const [shortlistedIds, setShortlistedIds] = useState<string[]>([]);
  const [activePanel, setActivePanel] = useState<string>("home");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Filters State
  const [searchQuery, setSearchQuery] = useState("");
  const [sectorFilter, setSectorFilter] = useState("all");
  const [stageFilter, setStageFilter] = useState("all");
  const [shortlistFilter, setShortlistFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const [locationFilter, setLocationFilter] = useState("all");
  const [companyFilter, setCompanyFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState(0);

  // Profile State
  const [profileData, setProfileData] = useState<ProfileData>(DEFAULT_PROFILE_DATA);
  const [profilePicData, setProfilePicData] = useState<string | null>(null);

  // Selected startup in details view
  const [selectedStartup, setSelectedStartup] = useState<Startup | null>(null);
  const [isDeckToggled, setIsDeckToggled] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Toasts State
  const [toasts, setToasts] = useState<Toast[]>([]);
  const nextToastId = useRef(0);

  // Deal Room Tabs State
  const [activeTab, setActiveTab] = useState<ActiveTab>("overview");
  const [startupRatings, setStartupRatings] = useState<Record<string, { pedigree: number; tailwinds: number; moat: number }>>({});
  const [startupNotes, setStartupNotes] = useState<Record<string, string>>({});

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

  const updateNotes = (startupId: string, notesText: string) => {
    const updated = { ...startupNotes, [startupId]: notesText };
    setStartupNotes(updated);
    localStorage.setItem("stepup_startup_notes", JSON.stringify(updated));
  };

  const updateRating = (startupId: string, metric: MetricKey, value: number) => {
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
      try {
        setAllPitches([...JSON.parse(studentPitches), ...STARTUP_DATA]);
      } catch (err) {
        console.error("Failed to parse student pitches", err);
      }
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

  const clearAllFilters = () => {
    setSearchQuery("");
    setSectorFilter("all");
    setStageFilter("all");
    setShortlistFilter("all");
    setSortOrder("newest");
    setLocationFilter("all");
    setCompanyFilter("all");
    setRatingFilter(0);
    showToast("Filters reset", "info");
  };

  const getFilteredPitches = (forcedShortlisted = false) => {
    const filters: PitchFilters = {
      searchQuery,
      companyFilter,
      locationFilter,
      sectorFilter,
      stageFilter,
      shortlistFilter,
      sortOrder,
      ratingFilter
    };
    return filterPitches(allPitches, filters, shortlistedIds, startupRatings, forcedShortlisted);
  };

  // Sync selectedStartup when filtered pitches list changes
  const currentFiltered = getFilteredPitches(activePanel === "shortlisted-ideas");
  useEffect(() => {
    if (currentFiltered.length > 0) {
      if (!selectedStartup || !currentFiltered.some(s => s.id === selectedStartup.id)) {
        setSelectedStartup(currentFiltered[0]);
        setCurrentSlide(0);
        setIsDeckToggled(false);
      }
    } else {
      setSelectedStartup(null);
    }
  }, [searchQuery, sectorFilter, stageFilter, shortlistFilter, sortOrder, locationFilter, companyFilter, ratingFilter, activePanel, shortlistedIds]);

  return (
    <DashboardContext.Provider
      value={{
        isMounted,
        allPitches,
        setAllPitches,
        shortlistedIds,
        setShortlistedIds,
        activePanel,
        setActivePanel,
        isSidebarOpen,
        setIsSidebarOpen,
        searchQuery,
        setSearchQuery,
        sectorFilter,
        setSectorFilter,
        stageFilter,
        setStageFilter,
        shortlistFilter,
        setShortlistFilter,
        sortOrder,
        setSortOrder,
        locationFilter,
        setLocationFilter,
        companyFilter,
        setCompanyFilter,
        ratingFilter,
        setRatingFilter,
        profileData,
        setProfileData,
        profilePicData,
        setProfilePicData,
        selectedStartup,
        setSelectedStartup,
        isDeckToggled,
        setIsDeckToggled,
        currentSlide,
        setCurrentSlide,
        activeTab,
        setActiveTab,
        startupRatings,
        startupNotes,
        toasts,
        showToast,
        toggleShortlist,
        updateNotes,
        updateRating,
        clearAllFilters,
        getFilteredPitches
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
};
