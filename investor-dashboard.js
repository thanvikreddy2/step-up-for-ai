/**
 * StepUp for AI - Investor Dashboard
 * Main Script - Mock Data & Panel Logic
 */

// ==========================================================================
// MOCK DATASET (10+ curated startups for deal flow)
// ==========================================================================
const STARTUP_DATA = [
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

document.addEventListener('DOMContentLoaded', () => {
  // Navigation & Shell Elements
  const navItems = document.querySelectorAll('.nav-item');
  const panels = document.querySelectorAll('.dashboard-panel');
  const panelTitle = document.getElementById('panelTitle');
  
  // Mobile Sidebar Elements
  const sidebar = document.getElementById('sidebar');
  const hamburgerMenu = document.getElementById('hamburgerMenu');
  const closeSidebar = document.getElementById('closeSidebar');
  const sidebarOverlay = document.getElementById('sidebarOverlay');

  // Panel Titles Mapping
  const panelTitles = {
    'pitch-decks': 'Pitch Decks',
    'profile': 'Investor Profile',
    'contact': 'Contact Details'
  };

  // State
  let shortlistedIds = JSON.parse(localStorage.getItem('stepup_shortlist')) || [];

  // Filter State
  const filterState = {
    search: '',
    sector: 'all',
    stage: 'all',
    sort: 'newest'
  };

  // Filter DOM Elements
  const searchBar = document.getElementById('searchBar');
  const sectorFilter = document.getElementById('sectorFilter');
  const stageFilter = document.getElementById('stageFilter');
  const sortOrder = document.getElementById('sortOrder');
  const btnClearFilters = document.getElementById('btnClearFilters');
  const emptyState = document.getElementById('emptyState');
  const emptyStateReset = document.getElementById('emptyStateReset');
  const pitchGrid = document.getElementById('pitchGrid');

  // Format Helper for Currency (e.g. 1500000 -> $1.5M or $500K)
  function formatAskAmount(amount) {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1).replace('.0', '')}M`;
    }
    return `$${(amount / 1000).toFixed(0)}K`;
  }

  // Calculate if submitted within the last 7 days (reference: 2026-06-18)
  function isNewThisWeek(dateStr) {
    const submissionDate = new Date(dateStr);
    const referenceDate = new Date('2026-06-18');
    const diffTime = Math.abs(referenceDate - submissionDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  }

  // Apply filtering and sorting logic
  function applyFiltersAndSort() {
    let filtered = [...STARTUP_DATA];

    // 1. Text Search Filter (Startup Name or Tagline)
    if (filterState.search) {
      const searchVal = filterState.search.toLowerCase().trim();
      filtered = filtered.filter(startup => 
        startup.name.toLowerCase().includes(searchVal) ||
        startup.tagline.toLowerCase().includes(searchVal)
      );
    }

    // 2. Sector Filter
    if (filterState.sector !== 'all') {
      filtered = filtered.filter(startup => startup.sector === filterState.sector);
    }

    // 3. Stage Filter
    if (filterState.stage !== 'all') {
      filtered = filtered.filter(startup => startup.stage === filterState.stage);
    }

    // 4. Sorting
    if (filterState.sort === 'newest') {
      filtered.sort((a, b) => new Date(b.submittedDate) - new Date(a.submittedDate));
    } else if (filterState.sort === 'oldest') {
      filtered.sort((a, b) => new Date(a.submittedDate) - new Date(b.submittedDate));
    } else if (filterState.sort === 'highest-ask') {
      filtered.sort((a, b) => b.ask - a.ask);
    } else if (filterState.sort === 'lowest-ask') {
      filtered.sort((a, b) => a.ask - b.ask);
    }

    // 5. Update Results count UI
    const resultsCountElement = document.getElementById('resultsCount');
    if (resultsCountElement) {
      resultsCountElement.textContent = `${filtered.length} Result${filtered.length === 1 ? '' : 's'}`;
    }

    // 6. Manage Grid Visibility & Empty State display
    if (filtered.length === 0) {
      if (pitchGrid) pitchGrid.style.display = 'none';
      if (emptyState) emptyState.style.display = 'flex';
    } else {
      if (pitchGrid) pitchGrid.style.display = 'grid';
      if (emptyState) emptyState.style.display = 'none';
      renderPitches(filtered);
    }
  }

  // Bind Filter Event Listeners
  function bindFilterListeners() {
    if (searchBar) {
      searchBar.addEventListener('input', (e) => {
        filterState.search = e.target.value;
        applyFiltersAndSort();
      });
    }

    if (sectorFilter) {
      sectorFilter.addEventListener('change', (e) => {
        filterState.sector = e.target.value;
        applyFiltersAndSort();
      });
    }

    if (stageFilter) {
      stageFilter.addEventListener('change', (e) => {
        filterState.stage = e.target.value;
        applyFiltersAndSort();
      });
    }

    if (sortOrder) {
      sortOrder.addEventListener('change', (e) => {
        filterState.sort = e.target.value;
        applyFiltersAndSort();
      });
    }

    function clearAllFilters() {
      filterState.search = '';
      filterState.sector = 'all';
      filterState.stage = 'all';
      filterState.sort = 'newest';

      if (searchBar) searchBar.value = '';
      if (sectorFilter) sectorFilter.value = 'all';
      if (stageFilter) stageFilter.value = 'all';
      if (sortOrder) sortOrder.value = 'newest';

      applyFiltersAndSort();
      showToast('Filters cleared', 'info');
    }

    if (btnClearFilters) btnClearFilters.addEventListener('click', clearAllFilters);
    if (emptyStateReset) emptyStateReset.addEventListener('click', clearAllFilters);
  }

  // Render Pitches Card Grid
  function renderPitches(dataToRender = STARTUP_DATA) {
    if (!pitchGrid) return;

    pitchGrid.innerHTML = '';

    dataToRender.forEach(startup => {
      const isShortlisted = shortlistedIds.includes(startup.id);
      const card = document.createElement('article');
      card.className = 'pitch-card glass-card';
      card.setAttribute('tabindex', '0'); // Keyboard navigation accessibility
      card.setAttribute('aria-label', `${startup.name} startup card. Sector: ${startup.sectorLabel}. Stage: ${startup.stage}. Funding Ask: ${formatAskAmount(startup.ask)}`);

      // Determine correct status badge display text and class
      let badgeClass = 'new';
      if (startup.status === 'Under Review') badgeClass = 'review';
      if (startup.status === 'Shortlisted') badgeClass = 'shortlisted';

      card.innerHTML = `
        <div class="card-header">
          <div class="brand-info">
            <div class="card-avatar" style="background: ${startup.logoBg}; color: #ffffff;">
              ${startup.logoText}
            </div>
            <div class="brand-details">
              <h3>${startup.name}</h3>
              <span class="founder-name">by ${startup.founder}</span>
            </div>
          </div>
          <span class="status-badge ${badgeClass}">${startup.status}</span>
        </div>

        <p class="card-tagline">${startup.tagline}</p>

        <div class="card-tags">
          <span class="tag">${startup.sectorLabel}</span>
          <span class="tag">${startup.stage}</span>
        </div>

        <div class="card-metrics">
          <div>
            <div class="metric-label">Funding Ask</div>
            <div class="metric-value">${formatAskAmount(startup.ask)}</div>
          </div>
        </div>

        <div class="card-footer">
          <span class="submission-date">Submitted: ${startup.submittedDate}</span>
          <div class="card-actions">
            <button class="bookmark-btn ${isShortlisted ? 'active' : ''}" 
                    data-id="${startup.id}" 
                    aria-label="${isShortlisted ? 'Remove from shortlist' : 'Add to shortlist'}"
                    title="${isShortlisted ? 'Remove from Shortlist' : 'Add to Shortlist'}">
              <i class="fa-${isShortlisted ? 'solid' : 'regular'} fa-bookmark"></i>
            </button>
            <button class="btn-view-pitch" data-id="${startup.id}">
              View Pitch
            </button>
          </div>
        </div>
      `;

      pitchGrid.appendChild(card);
    });

    bindCardActions();
  }

  // Event handler bindings for cards (bookmark toggle & view pitch button)
  function bindCardActions() {
    const bookmarkBtns = document.querySelectorAll('.bookmark-btn');
    bookmarkBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const startupId = btn.dataset.id;
        toggleShortlist(startupId);
      });
    });

    const viewPitchBtns = document.querySelectorAll('.btn-view-pitch');
    viewPitchBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const startupId = btn.dataset.id;
        openModal(startupId, btn);
      });
    });
  }

  // Modal Elements & Functions
  const pitchModal = document.getElementById('pitchModal');
  const closeModalBtn = document.getElementById('closeModal');
  const modalContent = document.getElementById('modalContent');
  let previouslyFocusedElement = null;

  function openModal(id, triggerElement) {
    const startup = STARTUP_DATA.find(s => s.id === id);
    if (!startup) return;

    previouslyFocusedElement = triggerElement;
    const isShortlisted = shortlistedIds.includes(startup.id);

    let badgeClass = 'new';
    if (startup.status === 'Under Review') badgeClass = 'review';
    if (startup.status === 'Shortlisted') badgeClass = 'shortlisted';

    modalContent.innerHTML = `
      <div class="modal-header-section">
        <div class="modal-brand">
          <div class="modal-avatar" style="background: ${startup.logoBg}; color: #ffffff;">
            ${startup.logoText}
          </div>
          <div class="modal-title">
            <h2>${startup.name}</h2>
            <div class="modal-meta-tags">
              <span class="tag">${startup.sectorLabel}</span>
              <span class="tag">${startup.stage}</span>
              <span class="status-badge ${badgeClass}">${startup.status}</span>
            </div>
            <p class="modal-tagline">${startup.tagline}</p>
          </div>
        </div>
      </div>

      <div class="modal-body-section">
        <h3 class="modal-section-title">Startup Pitch</h3>
        <p class="modal-description">${startup.description}</p>
      </div>

      <div class="modal-metrics-section">
        <div class="modal-metric-card">
          <h4>Funding Ask</h4>
          <p class="accent-val">${formatAskAmount(startup.ask)}</p>
        </div>
        <div class="modal-metric-card">
          <h4>Submitted Date</h4>
          <p>${startup.submittedDate}</p>
        </div>
      </div>

      <div class="modal-founder-section">
        <h3 class="modal-section-title">Founder Contact</h3>
        <div class="founder-profile">
          <div class="founder-info">
            <h4>${startup.founder}</h4>
            <p>Founder & CEO, ${startup.name}</p>
          </div>
          <div class="founder-contact-links">
            <a href="mailto:${startup.email}" class="founder-btn" title="Email founder">
              <i class="fa-solid fa-envelope"></i>
              <span>Email</span>
            </a>
            <a href="${startup.linkedin}" target="_blank" class="founder-btn linkedin-btn" title="Founder LinkedIn">
              <i class="fa-brands fa-linkedin"></i>
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>

      <div class="modal-footer-section">
        <button class="btn btn-secondary modal-bookmark-btn" id="modalBookmarkBtn" data-id="${startup.id}">
          <i class="fa-${isShortlisted ? 'solid' : 'regular'} fa-bookmark"></i>
          <span>${isShortlisted ? 'Shortlisted' : 'Shortlist Pitch'}</span>
        </button>
        <button class="btn-meeting-request" id="btnRequestMeeting">
          <i class="fa-solid fa-calendar-check"></i>
          <span>Request a Meeting</span>
        </button>
      </div>
    `;

    // Bind inner modal event listeners
    const modalBookmarkBtn = document.getElementById('modalBookmarkBtn');
    if (modalBookmarkBtn) {
      modalBookmarkBtn.addEventListener('click', () => {
        toggleShortlist(startup.id);
        const updatedShortlisted = shortlistedIds.includes(startup.id);
        modalBookmarkBtn.innerHTML = `
          <i class="fa-${updatedShortlisted ? 'solid' : 'regular'} fa-bookmark"></i>
          <span>${updatedShortlisted ? 'Shortlisted' : 'Shortlist Pitch'}</span>
        `;
      });
    }

    const btnRequestMeeting = document.getElementById('btnRequestMeeting');
    if (btnRequestMeeting) {
      btnRequestMeeting.addEventListener('click', () => {
        showToast(`Meeting request sent to ${startup.founder}!`);
        btnRequestMeeting.innerHTML = `<i class="fa-solid fa-check"></i> <span>Requested</span>`;
        btnRequestMeeting.disabled = true;
        btnRequestMeeting.style.opacity = '0.7';
        btnRequestMeeting.style.cursor = 'default';
        btnRequestMeeting.style.boxShadow = 'none';
      });
    }

    // Show modal
    pitchModal.classList.add('open');
    pitchModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Accessibility: Set focus to close button
    if (closeModalBtn) closeModalBtn.focus();
  }

  function closeModal() {
    if (!pitchModal) return;
    pitchModal.classList.remove('open');
    pitchModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    // Accessibility: restore focus
    if (previouslyFocusedElement) {
      previouslyFocusedElement.focus();
    }
  }

  // Bind close events
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }
  if (pitchModal) {
    pitchModal.addEventListener('click', (e) => {
      if (e.target === pitchModal) {
        closeModal();
      }
    });
  }

  // Escape key closes modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && pitchModal && pitchModal.classList.contains('open')) {
      closeModal();
    }
  });

  // Toggle Shortlist State (LocalStorage)
  function toggleShortlist(id) {
    const index = shortlistedIds.indexOf(id);
    if (index === -1) {
      shortlistedIds.push(id);
      showToast('Added to Shortlist!');
    } else {
      shortlistedIds.splice(index, 1);
      showToast('Removed from Shortlist.', 'info');
    }
    localStorage.setItem('stepup_shortlist', JSON.stringify(shortlistedIds));
    
    // Maintain filter/search state while updating grid and stats
    applyFiltersAndSort();
    updateStats();
    renderProfile(); // Sync stats on the profile panel live
  }

  // Update Summary Stats Strip
  function updateStats() {
    const totalPitches = document.getElementById('stat-total-pitches');
    const newPitches = document.getElementById('stat-new-pitches');
    const shortlistedPitches = document.getElementById('stat-shortlisted-pitches');

    if (totalPitches) totalPitches.textContent = STARTUP_DATA.length;

    if (newPitches) {
      const newCount = STARTUP_DATA.filter(s => isNewThisWeek(s.submittedDate)).length;
      newPitches.textContent = newCount;
    }

    if (shortlistedPitches) {
      shortlistedPitches.textContent = shortlistedIds.length;
    }
  }

  // Profile State
  const profileData = {
    name: 'John Doe',
    org: 'Vanguard Ventures',
    bio: 'Focused on early-stage investments in artificial intelligence, climate technology, and SaaS solutions. Over 15 years of venture capital experience supporting visionary founders from Seed to Series A.',
    phone: '+1 (555) 019-2834',
    email: 'investor.john@stepupforai.org',
    focusSectors: ['ai-ml', 'climate', 'saas']
  };

  const sectorLabelsMap = {
    'ai-ml': 'AI / ML',
    'fintech': 'Fintech',
    'healthtech': 'Healthtech',
    'climate': 'Climate Tech',
    'edtech': 'Edtech',
    'saas': 'SaaS'
  };

  // Profile DOM Elements
  const profileAvatar = document.getElementById('profileAvatar');
  const sidebarAvatar = document.querySelector('.avatar-sm');
  const sidebarUserName = document.querySelector('.user-name');
  
  const profileNameInput = document.getElementById('profileNameInput');
  const profileOrgInput = document.getElementById('profileOrgInput');
  const profileBioInput = document.getElementById('profileBioInput');
  const profilePhoneInput = document.getElementById('profilePhoneInput');
  const profileEmail = document.getElementById('profileEmail');
  
  const focusChipsContainer = document.getElementById('focusChipsContainer');
  const focusChipsSelector = document.getElementById('focusChipsSelector');
  const chipEditWrapper = document.getElementById('chipEditWrapper');
  
  const btnEditProfile = document.getElementById('btnEditProfile');
  const profileSaveRow = document.getElementById('profileSaveRow');
  const btnSaveProfile = document.getElementById('btnSaveProfile');
  
  const changePasswordForm = document.getElementById('changePasswordForm');
  const contactForm = document.getElementById('contactForm');
  const contactFormName = document.getElementById('contactFormName');

  // Helper to extract initials from name
  function getInitials(name) {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }

  // Render Profile View & Edit UI
  function renderProfile() {
    // Sync text values
    if (profileNameInput) profileNameInput.value = profileData.name;
    if (profileOrgInput) profileOrgInput.value = profileData.org;
    if (profileBioInput) profileBioInput.value = profileData.bio;
    if (profilePhoneInput) profilePhoneInput.value = profileData.phone;
    if (profileEmail) profileEmail.textContent = profileData.email;
    if (contactFormName) contactFormName.value = profileData.name;

    // Sync sidebar name
    if (sidebarUserName) sidebarUserName.textContent = profileData.name;

    // Sync Initials
    const initials = getInitials(profileData.name);
    if (profileAvatar) profileAvatar.textContent = initials;
    if (sidebarAvatar) sidebarAvatar.textContent = initials;

    // Sync Investment Focus Chips
    if (focusChipsContainer) {
      focusChipsContainer.innerHTML = '';
      profileData.focusSectors.forEach(sec => {
        const label = sectorLabelsMap[sec] || sec;
        const chip = document.createElement('span');
        chip.className = 'tag';
        chip.textContent = label;
        focusChipsContainer.appendChild(chip);
      });
    }

    // Sync Stats
    const statVetted = document.getElementById('profile-stat-vetted');
    const statShortlist = document.getElementById('profile-stat-shortlist');
    if (statVetted) statVetted.textContent = STARTUP_DATA.length;
    if (statShortlist) statShortlist.textContent = shortlistedIds.length;

    // Render Edit Mode Selector Chips
    if (focusChipsSelector) {
      focusChipsSelector.innerHTML = '';
      Object.keys(sectorLabelsMap).forEach(sec => {
        const label = sectorLabelsMap[sec];
        const isActive = profileData.focusSectors.includes(sec);
        const chip = document.createElement('span');
        chip.className = `selectable-chip ${isActive ? 'active' : ''}`;
        chip.textContent = label;
        chip.dataset.sector = sec;
        
        chip.addEventListener('click', () => {
          if (profileData.focusSectors.includes(sec)) {
            profileData.focusSectors = profileData.focusSectors.filter(s => s !== sec);
          } else {
            profileData.focusSectors.push(sec);
          }
          renderProfile();
        });
        
        focusChipsSelector.appendChild(chip);
      });
    }
  }

  // Toggle profile inputs read-only state
  let isProfileEditing = false;
  function toggleProfileEditMode() {
    isProfileEditing = !isProfileEditing;
    const profileCard = document.querySelector('.profile-card');
    const profileContactCard = document.querySelector('.profile-contact-card');

    if (isProfileEditing) {
      // Enter Edit Mode
      if (profileCard) profileCard.classList.add('edit-mode');
      if (profileContactCard) profileContactCard.classList.add('edit-mode');
      
      if (profileNameInput) profileNameInput.removeAttribute('readonly');
      if (profileOrgInput) profileOrgInput.removeAttribute('readonly');
      if (profileBioInput) profileBioInput.removeAttribute('readonly');
      if (profilePhoneInput) profilePhoneInput.removeAttribute('readonly');

      if (chipEditWrapper) chipEditWrapper.style.display = 'block';
      if (profileSaveRow) profileSaveRow.style.display = 'flex';

      if (btnEditProfile) {
        btnEditProfile.innerHTML = `<i class="fa-solid fa-xmark"></i> <span>Cancel</span>`;
      }
    } else {
      // Exit Edit Mode (Reset)
      if (profileCard) profileCard.classList.remove('edit-mode');
      if (profileContactCard) profileContactCard.classList.remove('edit-mode');

      if (profileNameInput) profileNameInput.setAttribute('readonly', 'true');
      if (profileOrgInput) profileOrgInput.setAttribute('readonly', 'true');
      if (profileBioInput) profileBioInput.setAttribute('readonly', 'true');
      if (profilePhoneInput) profilePhoneInput.setAttribute('readonly', 'true');

      if (chipEditWrapper) chipEditWrapper.style.display = 'none';
      if (profileSaveRow) profileSaveRow.style.display = 'none';

      if (btnEditProfile) {
        btnEditProfile.innerHTML = `<i class="fa-solid fa-pen-to-square"></i> <span>Edit Profile</span>`;
      }

      // Revert values to saved state
      renderProfile();
    }
  }

  function bindProfileEvents() {
    if (btnEditProfile) {
      btnEditProfile.addEventListener('click', toggleProfileEditMode);
    }

    if (btnSaveProfile) {
      btnSaveProfile.addEventListener('click', () => {
        // Save values
        if (profileNameInput) profileData.name = profileNameInput.value.trim() || 'John Doe';
        if (profileOrgInput) profileData.org = profileOrgInput.value.trim() || 'Vanguard Ventures';
        if (profileBioInput) profileData.bio = profileBioInput.value.trim();
        if (profilePhoneInput) profileData.phone = profilePhoneInput.value.trim();

        // Exit Edit Mode & Notify
        toggleProfileEditMode();
        showToast('Profile updated successfully!');
      });
    }

    if (changePasswordForm) {
      changePasswordForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (newPassword !== confirmPassword) {
          showToast('Passwords do not match!', 'error');
          return;
        }

        // FRONT-END ONLY PLACEHOLDER FOR FUTURE BACKEND PASSWORD WIRE
        // API Endpoint: POST /api/investor/change-password
        // Payload: { currentPassword, newPassword }
        showToast('Password updated successfully!');
        changePasswordForm.reset();
      });
    }
  }

  // Bind Contact Form Submission Events
  function bindContactEvents() {
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const subject = document.getElementById('contactFormSubject').value;
        const message = document.getElementById('contactFormMessage').value;

        // FRONT-END ONLY PLACEHOLDER FOR FUTURE BACKEND CONTACT WIRE
        // API Endpoint: POST /api/support/message
        // Payload: { name: profileData.name, subject, message }
        showToast('Message sent successfully!');
        
        // Reset form subject & message fields
        const subjectEl = document.getElementById('contactFormSubject');
        const messageEl = document.getElementById('contactFormMessage');
        if (subjectEl) subjectEl.selectedIndex = 0;
        if (messageEl) messageEl.value = '';
      });
    }
  }

  // Toast System Helper
  function showToast(message, type = 'success') {
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    let iconClass = 'fa-circle-info';
    if (type === 'success') iconClass = 'fa-circle-check';
    if (type === 'error') iconClass = 'fa-triangle-exclamation';

    toast.innerHTML = `
      <i class="fa-solid ${iconClass}"></i>
      <span>${message}</span>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'fadeIn 0.2s reverse forwards';
      setTimeout(() => {
        toast.remove();
      }, 200);
    }, 3000);
  }

  // INITIALIZE
  bindFilterListeners();
  applyFiltersAndSort();
  updateStats();
  bindProfileEvents();
  bindContactEvents();
  renderProfile();

  // Expose Toast globally
  window.showToast = showToast;
});
