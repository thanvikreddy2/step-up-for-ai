import { Startup } from "@/types";

export interface PitchFilters {
  searchQuery: string;
  companyFilter: string;
  locationFilter: string;
  sectorFilter: string;
  stageFilter: string;
  shortlistFilter: string;
  sortOrder: string;
  ratingFilter: number;
}

export const filterPitches = (
  allPitches: Startup[],
  filters: PitchFilters,
  shortlistedIds: string[],
  startupRatings: Record<string, { pedigree: number; tailwinds: number; moat: number }>,
  forcedShortlisted = false
): Startup[] => {
  let result = [...allPitches];

  // Forced shortlisted mode
  if (forcedShortlisted) {
    result = result.filter(s => shortlistedIds.includes(s.id));
  }

  // Search query filter
  if (filters.searchQuery.trim() !== "") {
    const query = filters.searchQuery.toLowerCase();
    result = result.filter(
      s =>
        s.name.toLowerCase().includes(query) ||
        s.tagline.toLowerCase().includes(query) ||
        s.founder.toLowerCase().includes(query) ||
        s.description.toLowerCase().includes(query)
    );
  }

  // Company filter
  if (filters.companyFilter !== "all") {
    result = result.filter(s => s.id === filters.companyFilter);
  }

  // Location filter
  if (filters.locationFilter !== "all") {
    result = result.filter(s => s.location && s.location.toLowerCase().includes(filters.locationFilter.toLowerCase()));
  }

  // Sector/Industry filter
  if (filters.sectorFilter !== "all") {
    result = result.filter(s => s.sector === filters.sectorFilter);
  }

  // Stage filter
  if (filters.stageFilter !== "all") {
    result = result.filter(s => s.stage === filters.stageFilter);
  }

  // Shortlisted filter
  if (!forcedShortlisted && filters.shortlistFilter === "shortlisted") {
    result = result.filter(s => shortlistedIds.includes(s.id));
  }

  // Rating Filter
  if (filters.ratingFilter > 0) {
    result = result.filter(s => {
      const rating = startupRatings[s.id] || { pedigree: 4.0, tailwinds: 4.2, moat: 4.5 };
      const average = (rating.pedigree + rating.tailwinds + rating.moat) / 3;
      return average >= filters.ratingFilter;
    });
  }

  // Sorting
  result.sort((a, b) => {
    if (filters.sortOrder === "newest") {
      return new Date(b.submittedDate).getTime() - new Date(a.submittedDate).getTime();
    } else if (filters.sortOrder === "oldest") {
      return new Date(a.submittedDate).getTime() - new Date(b.submittedDate).getTime();
    } else if (filters.sortOrder === "highest-ask") {
      return b.ask - a.ask;
    } else if (filters.sortOrder === "lowest-ask") {
      return a.ask - b.ask;
    }
    return 0;
  });

  return result;
};
