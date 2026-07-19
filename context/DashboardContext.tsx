"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { Startup, ProfileData, Toast, ActiveTab, ModalMode, MetricKey } from "@/types";
import { STARTUP_DATA } from "@/lib/mockData";
import { getPitchDeckDetails } from "@/lib/pitchDeckData";

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

  // Profile
  profileData: ProfileData;
  setProfileData: React.Dispatch<React.SetStateAction<ProfileData>>;
  profilePicData: string | null;
  setProfilePicData: React.Dispatch<React.SetStateAction<string | null>>;
  isProfileEditing: boolean;
  setIsProfileEditing: React.Dispatch<React.SetStateAction<boolean>>;
  
  // Profile edit forms
  tempProfileName: string;
  setTempProfileName: (val: string) => void;
  tempProfileOrg: string;
  setTempProfileOrg: (val: string) => void;
  tempProfileBio: string;
  setTempProfileBio: (val: string) => void;
  tempProfilePhone: string;
  setTempProfilePhone: (val: string) => void;
  tempProfileLinkedin: string;
  setTempProfileLinkedin: (val: string) => void;
  tempProfileTwitter: string;
  setTempProfileTwitter: (val: string) => void;
  tempProfileWebsite: string;
  setTempProfileWebsite: (val: string) => void;
  tempFocusSectors: string[];
  setTempFocusSectors: React.Dispatch<React.SetStateAction<string[]>>;

  // Password editing forms
  currentPassword: string;
  setCurrentPassword: (val: string) => void;
  newPassword: string;
  setNewPassword: (val: string) => void;
  confirmPassword: string;
  setConfirmPassword: (val: string) => void;

  // Support message form
  supportSubject: string;
  setSupportSubject: (val: string) => void;
  supportMessage: string;
  setSupportMessage: (val: string) => void;

  // Selected startup & tabs inside split-pane
  selectedStartup: Startup | null;
  setSelectedStartup: (startup: Startup | null) => void;
  isDeckToggled: boolean;
  setIsDeckToggled: (toggled: boolean) => void;
  currentSlide: number;
  setCurrentSlide: React.Dispatch<React.SetStateAction<number>>;

  // Deal Room tabs
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
  startEditingProfile: () => void;
  cancelEditingProfile: () => void;
  saveProfileData: () => void;
  toggleTempFocusSector: (sector: string) => void;
  handleProfilePicUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordSubmit: (e: React.FormEvent) => void;
  handleSupportMessageSubmit: (e: React.FormEvent) => void;
  getInitials: (name: string) => string;
  isNewThisWeek: (dateString: string) => boolean;
  formatAskAmount: (amount: number) => string;
  formatLakhs: (amount: number) => string;
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

  // Helpers
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

  const formatLakhs = (amount: number) => {
    return formatAskAmount(amount);
  };

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
    let result = [...allPitches];

    // Forced shortlisted mode (when on shortlisted ideas panel)
    if (forcedShortlisted) {
      result = result.filter(s => shortlistedIds.includes(s.id));
    }

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

    // Company filter
    if (companyFilter !== "all") {
      result = result.filter(s => s.id === companyFilter);
    }

    // Location filter
    if (locationFilter !== "all") {
      result = result.filter(s => s.location && s.location.toLowerCase().includes(locationFilter.toLowerCase()));
    }

    // Sector/Industry filter
    if (sectorFilter !== "all") {
      result = result.filter(s => s.sector === sectorFilter);
    }

    // Stage filter
    if (stageFilter !== "all") {
      result = result.filter(s => s.stage === stageFilter);
    }

    // Shortlisted filter
    if (!forcedShortlisted && shortlistFilter === "shortlisted") {
      result = result.filter(s => shortlistedIds.includes(s.id));
    }

    // Rating Filter
    if (ratingFilter > 0) {
      result = result.filter(s => {
        const rating = startupRatings[s.id] || { pedigree: 4.0, tailwinds: 4.2, moat: 4.5 };
        const average = (rating.pedigree + rating.tailwinds + rating.moat) / 3;
        return average >= ratingFilter;
      });
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

  // Sync selectedStartup when filtered pitches list changes
  const currentFiltered = getFilteredPitches(activePanel === "shortlisted-ideas");
  useEffect(() => {
    if (currentFiltered.length > 0) {
      // If currently selected is not in filtered, reset to first filtered
      if (!selectedStartup || !currentFiltered.some(s => s.id === selectedStartup.id)) {
        setSelectedStartup(currentFiltered[0]);
        setCurrentSlide(0);
        setIsDeckToggled(false);
      }
    } else {
      setSelectedStartup(null);
    }
  }, [searchQuery, sectorFilter, stageFilter, shortlistFilter, sortOrder, locationFilter, companyFilter, ratingFilter, activePanel, shortlistedIds]);

  // Profile Edit Actions
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
        isProfileEditing,
        setIsProfileEditing,
        tempProfileName,
        setTempProfileName,
        tempProfileOrg,
        setTempProfileOrg,
        tempProfileBio,
        setTempProfileBio,
        tempProfilePhone,
        setTempProfilePhone,
        tempProfileLinkedin,
        setTempProfileLinkedin,
        tempProfileTwitter,
        setTempProfileTwitter,
        tempProfileWebsite,
        setTempProfileWebsite,
        tempFocusSectors,
        setTempFocusSectors,
        currentPassword,
        setCurrentPassword,
        newPassword,
        setNewPassword,
        confirmPassword,
        setConfirmPassword,
        supportSubject,
        setSupportSubject,
        supportMessage,
        setSupportMessage,
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
        getFilteredPitches,
        startEditingProfile,
        cancelEditingProfile,
        saveProfileData,
        toggleTempFocusSector,
        handleProfilePicUpload,
        handlePasswordSubmit,
        handleSupportMessageSubmit,
        getInitials,
        isNewThisWeek,
        formatAskAmount,
        formatLakhs
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
