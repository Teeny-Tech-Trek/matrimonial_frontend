
import React, { useState, useEffect, useRef } from 'react';
import { Search as SearchIcon, X, SlidersHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { CompleteProfile } from '../types';
import { ProfileCard } from '../components/ProfileCard';
import QuickFilters from '../components/QuickFilters';
import api from '../services/api'; 
import profileService from '../services/profile.service';

interface SearchProps {
  onNavigate: (page: string, data?: any) => void;
}

export const Search: React.FC<SearchProps> = ({ onNavigate }) => {
  const { currentUser, profileComplete } = useAuth();
  const preferenceDefaults = {
    gender: '',
    state: '',
    religion: '',
    maritalStatus: '',
    diet: '',
    ageMin: '',
    ageMax: '',
  };
  const stateOptions = ['Punjab', 'Delhi', 'Haryana', 'Uttar Pradesh', 'Maharashtra', 'Gujarat', 'Rajasthan'];
  const religionOptions = ['Hindu', 'Muslim', 'Sikh', 'Christian', 'Jain'];
  const maritalStatusOptions = [
    { value: 'never_married', label: 'Never Married' },
    { value: 'divorced', label: 'Divorced' },
    { value: 'widowed', label: 'Widowed' },
  ];
  const dietOptions = ['Vegetarian', 'Non-Vegetarian', 'Eggetarian', 'Vegan'];

  const [profiles, setProfiles] = useState<CompleteProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [totalProfiles, setTotalProfiles] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeView, setActiveView] = useState<'all' | 'recommended' | 'recent'>('all');
  const [currentFilters, setCurrentFilters] = useState<any>({});
  const [currentQueryString, setCurrentQueryString] = useState('');
  const [acceptedConnectionIds, setAcceptedConnectionIds] = useState<string[]>([]);
  const [showPreferencePrompt, setShowPreferencePrompt] = useState(true);
  const [quickFilterKey, setQuickFilterKey] = useState(0);
  const [preferenceDraft, setPreferenceDraft] = useState(preferenceDefaults);
  const [preferenceSlideIndex, setPreferenceSlideIndex] = useState(0);
  const totalPreferenceSlides = 6;
  
  const isFirstRender = useRef(true);
  const searchTimeoutRef = useRef<NodeJS.Timeout>();

  const buildQueryStringFromFilters = (filters: any) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== '' && value !== 'Other') {
        params.append(key, String(value));
      }
    });
    return params.toString();
  };

  const goToNextPreferenceSlide = () => {
    setPreferenceSlideIndex((prev) => (prev + 1) % totalPreferenceSlides);
  };

  const handlePreferenceSelect = (field: keyof typeof preferenceDefaults, value: string) => {
    setPreferenceDraft((prev) => ({ ...prev, [field]: value }));
    if (value) {
      goToNextPreferenceSlide();
    }
  };

  const dismissPreferencePrompt = () => {
    setShowPreferencePrompt(false);
    setPreferenceSlideIndex(0);
  };

  // ✅ Fetch accepted connections using axios
  const fetchAcceptedConnections = async () => {
    try {
      // console.log('🔗 Fetching accepted connections...');
      
      const response = await api.get('/request/connections/accepted');

      if (response.data.success) {
        // console.log('✅ Accepted Connections Response:', response.data);
        
        const connections = response.data.data || [];
        const currentUserId = currentUser?.id || currentUser?.userId;
        
        // Extract all possible user IDs from connections
        const connectedUserIds = connections.flatMap((conn: any) => {
          const possibleIds = [
            conn.userId,
            conn.senderId,
            conn.receiverId,
            conn.sender?._id,
            conn.sender?.userId,
            conn.receiver?._id,
            conn.receiver?.userId,
            conn.user?._id,
            conn.user?.userId,
            conn.profile?._id,
            conn.profile?.userId,
            conn.profileId,
            conn._id,
            conn.id,
          ].filter(id => id && id !== currentUserId);
          
          return possibleIds;
        })
        .filter((id, index, self) => self.indexOf(id) === index); // Remove duplicates
        
        // console.log('✅ Connected User IDs:', connectedUserIds);
        return connectedUserIds;
      }
      
      return [];
    } catch (error: any) {
      // console.error('❌ Error fetching connections:', error);
      return [];
    }
  };

  // ✅ Fetch profiles using axios
  const fetchProfiles = async (filters: any = {}, queryString: string = '', view: string = 'all') => {
    setLoading(true);
    setError('');
    
    try {
      // Fetch accepted connections first
      const connectedIds = await fetchAcceptedConnections();
      setAcceptedConnectionIds(connectedIds);
      
      // Build query string
      let finalQuery = '';

      if (view === 'all') {
        finalQuery = queryString 
          ? `${queryString}&page=${currentPage}&limit=20&sortBy=createdAt&sortOrder=desc`
          : `page=${currentPage}&limit=20&sortBy=createdAt&sortOrder=desc`;
      } else if (view === 'recommended') {
        const recommendedFilters = [];
        if (currentUser?.religiousDetails?.religion) {
          recommendedFilters.push(`religion=${encodeURIComponent(currentUser.religiousDetails.religion)}`);
        }
        if (currentUser?.familyDetails?.currentResidenceCity) {
          recommendedFilters.push(`city=${encodeURIComponent(currentUser.familyDetails.currentResidenceCity)}`);
        }
        const baseQuery = recommendedFilters.join('&');
        finalQuery = queryString 
          ? `${baseQuery}&${queryString}&page=${currentPage}&limit=20&sortBy=createdAt&sortOrder=desc`
          : `${baseQuery}&page=${currentPage}&limit=20&sortBy=createdAt&sortOrder=desc`;
      } else if (view === 'recent') {
        finalQuery = queryString 
          ? `${queryString}&page=${currentPage}&limit=20&sortBy=createdAt&sortOrder=desc`
          : `page=${currentPage}&limit=20&sortBy=createdAt&sortOrder=desc`;
      }
      
      if (searchTerm.trim()) {
        finalQuery = `${finalQuery}&search=${encodeURIComponent(searchTerm.trim())}`;
      }
      
      // console.log('📡 Fetching profiles with query:', finalQuery);
      
      const response = await api.get(`/profile/list?${finalQuery}`);
      
      if (response.data.success) {
        // ✅ Filter out current user, same gender (optional), AND accepted connections
        const filteredProfiles = (response.data.data || []).filter((profile: CompleteProfile) => {
          // Get all possible profile IDs
          const possibleProfileIds = [
            profile.userId,
            profile.id,
            profile._id,
            profile.user?._id,
            profile.user?.userId,
            profile.user?.id,
          ].filter(id => id);
          
          const currentUserId = currentUser?.id || currentUser?.userId;
          
          // 🚫 1. Exclude current user's own profile
          if (possibleProfileIds.includes(currentUserId)) {
            // console.log('🚫 Filtered: Own profile');
            return false;
          }

          // 🚫 2. Exclude same gender profiles (uncomment if needed)
          // const userGender = currentUser?.gender?.toLowerCase();
          // const profileGender = profile.gender?.toLowerCase();
          // if (userGender && profileGender && userGender === profileGender) {
          //   console.log('🚫 Filtered: Same gender -', profile.fullName);
          //   return false;
          // }

          // 🚫 3. Exclude accepted connections
          const isConnected = possibleProfileIds.some(profileId => 
            connectedIds.includes(profileId)
          );
          
          if (isConnected) {
            // console.log('🚫 Filtered: Already connected -', profile.fullName);
            return false;
          }

          return true; // ✅ Show this profile
        });
        
        // console.log(`✅ Showing ${filteredProfiles.length} profiles after filtering`);
        
        setProfiles(filteredProfiles);
        // Adjust total count (subtract connected + own profile)
        const adjustedTotal = Math.max(0, (response.data.total || 0) - connectedIds.length - 1);
        setTotalProfiles(adjustedTotal);
      } else {
        setProfiles([]);
        setTotalProfiles(0);
        setError(response.data.message || 'Failed to fetch profiles');
      }
    } catch (error: any) {
      // console.error('❌ Error fetching profiles:', error);
      setProfiles([]);
      setTotalProfiles(0);
      setError(error.response?.data?.message || error.message || 'Failed to load profiles');
    } finally {
      setLoading(false);
    }
  };

  // Initial load - wait until preference prompt is dismissed
  useEffect(() => {
    if (isFirstRender.current && !showPreferencePrompt) {
      isFirstRender.current = false;
      fetchProfiles(currentFilters, currentQueryString, activeView);
    }
  }, [showPreferencePrompt]);

  useEffect(() => {
    const loadSavedPreferences = async () => {
      if (!profileComplete) {
        return;
      }

      try {
        const response = await profileService.getMyProfile();
        if (!response?.success || !response?.data) return;

        const restoredPrefs = {
          ...preferenceDefaults,
          ...(response.data.searchPreferences || {}),
        };

        const hasAnyPreference = Object.values(restoredPrefs).some((v) => String(v).trim() !== '');
        if (!hasAnyPreference) return;

        const updatedFilters = {
          ...currentFilters,
          gender: '',
          state: restoredPrefs.state,
          religion: restoredPrefs.religion,
          maritalStatus: restoredPrefs.maritalStatus,
          diet: restoredPrefs.diet,
          ageMin: restoredPrefs.ageMin,
          ageMax: restoredPrefs.ageMax,
        };

        const queryString = buildQueryStringFromFilters(updatedFilters);

        setPreferenceDraft(restoredPrefs);
        setCurrentFilters(updatedFilters);
        setCurrentQueryString(queryString);
        setShowPreferencePrompt(false);
        setQuickFilterKey((prev) => prev + 1);
        isFirstRender.current = false;
        fetchProfiles(updatedFilters, queryString, activeView);
      } catch {
      }
    };

    loadSavedPreferences();
  }, [currentUser?.id, currentUser?.userId, profileComplete]);

  // Handle page changes
  useEffect(() => {
    if (!isFirstRender.current) {
      // console.log('🔄 Page changed to:', currentPage);
      fetchProfiles(currentFilters, currentQueryString, activeView);
    }
  }, [currentPage]);

  // Handle view changes
  useEffect(() => {
    if (!isFirstRender.current) {
      // console.log('🔄 View changed to:', activeView);
      setCurrentPage(1);
      fetchProfiles(currentFilters, currentQueryString, activeView);
    }
  }, [activeView]);

  // Handle filter changes from QuickFilters component
  const handleFilterChange = (filters: any, queryString: string) => {
    // console.log('🎛️ Filters Changed!');
    // console.log('🎛️ New Filters:', filters);
    // console.log('🎛️ New Query String:', queryString);
    
    setCurrentFilters(filters);
    setCurrentQueryString(queryString);
    setCurrentPage(1);
    fetchProfiles(filters, queryString, activeView);
  };

  const applyPreferenceFilters = async () => {
    const updatedFilters = {
      ...currentFilters,
      gender: '',
      state: preferenceDraft.state,
      religion: preferenceDraft.religion,
      maritalStatus: preferenceDraft.maritalStatus,
      diet: preferenceDraft.diet,
      ageMin: preferenceDraft.ageMin,
      ageMax: preferenceDraft.ageMax,
    };
    if (profileComplete) {
      try {
        await profileService.saveSearchPreferences(preferenceDraft);
      } catch {
      }
    }
    const queryString = buildQueryStringFromFilters(updatedFilters);
    setCurrentFilters(updatedFilters);
    setCurrentQueryString(queryString);
    setCurrentPage(1);
    setQuickFilterKey(prev => prev + 1);
    isFirstRender.current = false;
    fetchProfiles(updatedFilters, queryString, activeView);
    dismissPreferencePrompt();
  };

  const clearPreferenceFilters = async () => {
    const updatedFilters = {
      ...currentFilters,
      gender: '',
      state: '',
      religion: '',
      maritalStatus: '',
      diet: '',
      ageMin: '',
      ageMax: '',
    };
    const queryString = buildQueryStringFromFilters(updatedFilters);
    if (profileComplete) {
      try {
        await profileService.saveSearchPreferences(preferenceDefaults);
      } catch {
      }
    }
    setPreferenceDraft(preferenceDefaults);
    setCurrentFilters(updatedFilters);
    setCurrentQueryString(queryString);
    setCurrentPage(1);
    setQuickFilterKey(prev => prev + 1);
    isFirstRender.current = false;
    fetchProfiles(updatedFilters, queryString, activeView);
    dismissPreferencePrompt();
  };

  // ✅ Send interest using axios
  const handleSendInterest = async (profileId: string) => {
    if (!currentUser) {
      // alert("Please login to send an interest");
      return;
    }

    try {
      // console.log("💌 Sending interest to:", profileId);

      const response = await api.post('/request/send', {
        senderId: currentUser.id,
        receiverId: profileId,
      });

      // console.log("📦 Interest Response:", response.data);

      if (response.data.success) {
        // alert("Interest sent successfully ❤️");
        // Refresh profiles after sending interest
        fetchProfiles(currentFilters, currentQueryString, activeView);
      } else {
        // alert(response.data.message || "Failed to send interest");
      }
    } catch (error: any) {
      // console.error("❌ Failed to send interest:", error);
      // alert(error.response?.data?.message || "Something went wrong while sending interest");
    }
  };

  // Handle search input with debounce
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    searchTimeoutRef.current = setTimeout(() => {
      // console.log('🔍 Executing search:', value);
      setCurrentPage(1);
      fetchProfiles(currentFilters, currentQueryString, activeView);
    }, 500);
  };

  // Handle view change
  const handleViewChange = (view: 'all' | 'recommended' | 'recent') => {
    // console.log('👁️ View Changed to:', view);
    setActiveView(view);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="space-y-6 relative">
      {/* View Toggle Buttons + Search Bar */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-wrap gap-3 mb-4">
          <button
            onClick={() => handleViewChange('all')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeView === 'all'
                ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Profiles
          </button>
          <button
            onClick={() => handleViewChange('recommended')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeView === 'recommended'
                ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Recommended
          </button>
          <button
            onClick={() => handleViewChange('recent')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeView === 'recent'
                ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Recently Joined
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, location, profession..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
          />
        </div>
      </div>

      {showPreferencePrompt && (
        <div className="absolute inset-0 z-40 bg-white/55 backdrop-blur-[1px] flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl overflow-hidden bg-white rounded-3xl shadow-2xl border border-rose-100 p-5 md:p-7">
          <div className="absolute -top-16 -right-12 w-48 h-48 bg-rose-100/50 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-20 -left-10 w-56 h-56 bg-pink-100/40 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <p className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold text-rose-700 bg-white/80 border border-rose-100 px-3 py-1 rounded-full mb-2">
                <SlidersHorizontal size={16} />
                Smart Preferences
              </p>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900">Tell us your ideal match in a few quick steps</h3>
              <p className="text-gray-600">Pick preferences and we will instantly refine your profile results.</p>
            </div>
            <button
              type="button"
              onClick={() => {
                dismissPreferencePrompt();
              }}
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-rose-600 transition-colors"
            >
              <X size={16} />
              Close
            </button>
          </div>

          <div className="max-w-2xl mx-auto relative z-10">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-rose-700">
                Step {preferenceSlideIndex + 1} of {totalPreferenceSlides}
              </p>
              <button
                type="button"
                onClick={() => setPreferenceSlideIndex((prev) => (prev + 1) % totalPreferenceSlides)}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700"
              >
                Skip Step
              </button>
            </div>

            <div className="rounded-2xl border border-rose-100/90 bg-white/85 backdrop-blur-sm p-5 shadow-sm min-h-[190px]">
              {preferenceSlideIndex === 0 && (
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-2">Preferred Gender</p>
                  <select
                    value={preferenceDraft.gender}
                    onChange={(e) => handlePreferenceSelect('gender', e.target.value)}
                    className="w-full px-3 py-2 border border-rose-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              )}

              {preferenceSlideIndex === 1 && (
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-2">Preferred State</p>
                  <select
                    value={preferenceDraft.state}
                    onChange={(e) => handlePreferenceSelect('state', e.target.value)}
                    className="w-full px-3 py-2 border border-rose-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  >
                    <option value="">Select state</option>
                    {stateOptions.map((state) => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>
              )}

              {preferenceSlideIndex === 2 && (
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-2">Preferred Religion</p>
                  <select
                    value={preferenceDraft.religion}
                    onChange={(e) => handlePreferenceSelect('religion', e.target.value)}
                    className="w-full px-3 py-2 border border-rose-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  >
                    <option value="">Select religion</option>
                    {religionOptions.map((religion) => (
                      <option key={religion} value={religion}>{religion}</option>
                    ))}
                  </select>
                </div>
              )}

              {preferenceSlideIndex === 3 && (
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-2">Marital Status</p>
                  <select
                    value={preferenceDraft.maritalStatus}
                    onChange={(e) => handlePreferenceSelect('maritalStatus', e.target.value)}
                    className="w-full px-3 py-2 border border-rose-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  >
                    <option value="">Select status</option>
                    {maritalStatusOptions.map((status) => (
                      <option key={status.value} value={status.value}>{status.label}</option>
                    ))}
                  </select>
                </div>
              )}

              {preferenceSlideIndex === 4 && (
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-2">Diet Preference</p>
                  <select
                    value={preferenceDraft.diet}
                    onChange={(e) => handlePreferenceSelect('diet', e.target.value)}
                    className="w-full px-3 py-2 border border-rose-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  >
                    <option value="">Select diet</option>
                    {dietOptions.map((diet) => (
                      <option key={diet} value={diet}>{diet}</option>
                    ))}
                  </select>
                </div>
              )}

              {preferenceSlideIndex === 5 && (
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-2">Preferred Age Range</p>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      min={18}
                      max={80}
                      value={preferenceDraft.ageMin}
                      onChange={(e) => setPreferenceDraft(prev => ({ ...prev, ageMin: e.target.value }))}
                      className="w-full px-3 py-2 border border-rose-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                      placeholder="Min age"
                    />
                    <input
                      type="number"
                      min={18}
                      max={80}
                      value={preferenceDraft.ageMax}
                      onChange={(e) => setPreferenceDraft(prev => ({ ...prev, ageMax: e.target.value }))}
                      className="w-full px-3 py-2 border border-rose-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                      placeholder="Max age"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-center gap-3 mt-4">
              <button
                type="button"
                onClick={() => setPreferenceSlideIndex((prev) => (prev - 1 + totalPreferenceSlides) % totalPreferenceSlides)}
                className="w-9 h-9 rounded-full bg-white border border-rose-200 hover:bg-rose-50 flex items-center justify-center text-rose-700 transition-colors"
                aria-label="Previous preference card"
              >
                <ChevronLeft size={18} />
              </button>

              <div className="flex items-center gap-2">
                {Array.from({ length: totalPreferenceSlides }).map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setPreferenceSlideIndex(idx)}
                    className="w-2.5 h-2.5 rounded-full transition-all"
                    style={{
                      backgroundColor: idx === preferenceSlideIndex ? '#E85D8D' : '#D8B0BE',
                      transform: idx === preferenceSlideIndex ? 'scale(1.2)' : 'scale(1)',
                    }}
                    aria-label={`Go to preference card ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => setPreferenceSlideIndex((prev) => (prev + 1) % totalPreferenceSlides)}
                className="w-9 h-9 rounded-full bg-white border border-rose-200 hover:bg-rose-50 flex items-center justify-center text-rose-700 transition-colors"
                aria-label="Next preference card"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap justify-end items-center gap-3 mt-5">
            <button
              type="button"
              onClick={clearPreferenceFilters}
              className="px-5 py-2.5 rounded-lg border border-rose-200 text-rose-700 font-semibold hover:bg-rose-50 transition-colors"
            >
              Clear Preferences
            </button>
            <button
              type="button"
              onClick={() => {
                dismissPreferencePrompt();
              }}
              className="px-5 py-2.5 rounded-lg border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-colors"
            >
              Skip for now
            </button>
            <button
              type="button"
              onClick={applyPreferenceFilters}
              className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-rose-600 to-pink-600 text-white font-semibold hover:shadow-md transition-all"
            >
              Apply Preferences
            </button>
          </div>
        </div>
        </div>
      )}

      {/* QuickFilters Component */}
      <QuickFilters key={quickFilterKey} onFilterChange={handleFilterChange} initialFilters={currentFilters} />

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <p className="font-semibold">Error</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Results Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          {(() => {
            const displayedCount = profiles.length;
            const totalCount = totalProfiles;
            const viewLabel =
              activeView === 'all'
                ? 'Profiles'
                : activeView === 'recommended'
                ? 'Recommended Profiles'
                : 'Recently Joined Profiles';

            if (displayedCount === 0 && !loading) {
              return (
                <h2 className="text-xl font-bold text-gray-900 px-10">
                  No {viewLabel} Found
                </h2>
              );
            } else if (displayedCount < totalCount) {
              return (
                <h2 className="text-xl font-bold text-gray-900">
                  Showing {displayedCount} of {totalCount}{' '}
                  {totalCount === 1 ? 'Profile' : 'Profiles'}
                </h2>
              );
            } else if (displayedCount > 0) {
              return (
                <h2 className="text-xl font-bold text-gray-900 px-10">
                  {displayedCount} {displayedCount === 1 ? 'Profile' : 'Profiles'} Found
                </h2>
              );
            }
            return null;
          })()}
        </div>

        {loading ? (
          <div className="text-center py-12 bg-white rounded-xl">
            <div className="w-16 h-16 border-4 border-rose-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-500">Loading profiles...</p>
          </div>
        ) : profiles.length > 0 ? (
          <>
            <div className="grid grid-cols-1 p-10 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {profiles.map(profile => (
                <ProfileCard
                  key={profile.id || profile._id}
                  profile={profile}
                  onViewProfile={(id) => onNavigate('profile-view', { profileId: id })}
                  onSendInterest={() => handleSendInterest(profile.userId)}
                  onMessage={(id) => onNavigate('messages', { profileId: id })}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalProfiles > 20 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                <span className="px-4 py-2 text-gray-700 font-medium">
                  Page {currentPage} of {Math.ceil(totalProfiles / 20)}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  disabled={currentPage >= Math.ceil(totalProfiles / 20)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl px-10">
            <SearchIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No profiles found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>
    </div>
  );
};
