import React, { useState, useEffect, useRef } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { CompleteProfile } from '../types';
import { ProfileCard } from '../components/ProfileCard';
import QuickFilters from '../components/QuickFilters';

interface SearchProps {
  onNavigate: (page: string, data?: any) => void;
}

export const Search: React.FC<SearchProps> = ({ onNavigate }) => {
  const { currentUser } = useAuth();

  console.log('👤 Current User:', currentUser);
  const [profiles, setProfiles] = useState<CompleteProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalProfiles, setTotalProfiles] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeView, setActiveView] = useState<'all' | 'recommended' | 'recent'>('all');
  const [currentFilters, setCurrentFilters] = useState<any>({});
  const [currentQueryString, setCurrentQueryString] = useState('');
  
  // Use ref to prevent double API calls
  const isFirstRender = useRef(true);
  const searchTimeoutRef = useRef<NodeJS.Timeout>();

  // Fetch profiles from API
  const fetchProfiles = async (filters: any = {}, queryString: string = '', view: string = 'all') => {
    setLoading(true);
    console.log('🚀 Starting API call...');
    console.log('📋 Current View:', view);
    console.log('📋 Current Filters:', filters);
    console.log('📋 Query String:', queryString);
    
    try {
      let finalQuery = '';

      if (view === 'all') {
        finalQuery = queryString 
          ? `${queryString}&page=${currentPage}&limit=20&sortBy=createdAt&sortOrder=desc`
          : `page=${currentPage}&limit=20&sortBy=createdAt&sortOrder=desc`;
      } else if (view === 'recommended') {
        const recommendedFilters = [];
        if (currentUser?.religiousDetails?.religion) {
          recommendedFilters.push(`religion=${currentUser.religiousDetails.religion}`);
          console.log('✅ Added religion filter:', currentUser.religiousDetails.religion);
        }
        if (currentUser?.familyDetails?.currentResidenceCity) {
          recommendedFilters.push(`city=${currentUser.familyDetails.currentResidenceCity}`);
          console.log('✅ Added city filter:', currentUser.familyDetails.currentResidenceCity);
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
      
      if (searchTerm) {
        finalQuery = `${finalQuery}&search=${encodeURIComponent(searchTerm)}`;
        console.log('🔍 Added search term:', searchTerm);
      }
      
       const apiUrl = `https://matrimonial-backend-14t2.onrender.com/api/profile/list?${finalQuery}`;
     // const apiUrl = `http://localhost:5000/api/profile/list?${finalQuery}`;
      console.log('🌐 API URL:', apiUrl);
      console.log('⏳ Fetching data from API...');
      
      const response = await fetch(apiUrl);
      console.log('📡 Response Status:', response.status, response.statusText);
      console.log('📡 Response OK:', response.ok);
      
      const data = await response.json();
      console.log('📦 API Response Data:', data);
      
      if (data.success) {
        console.log('✅ API Call Successful!');
        console.log('✅ Total Profiles:', data.total);
        console.log('✅ Profiles Count:', data.data?.length || 0);
        console.log('✅ Current Page:', data.page);
        console.log('✅ Total Pages:', data.pages);
        
        // 🔥 FILTER OUT CURRENT USER'S PROFILE
        // 🔥 FILTER OUT CURRENT USER'S PROFILE AND SAME GENDER PROFILES
          const filteredProfiles = (data.data || []).filter((profile: CompleteProfile) => {
            const profileUserId = profile.userId || profile.id || profile._id;
            const currentUserId = currentUser?.id;
            
            // 🧍 Exclude current user's own profile
            if (profileUserId === currentUserId) return false;

            // 🚻 Show only opposite gender profiles
            const userGender = currentUser?.gender?.toLowerCase();
            const profileGender = profile.gender?.toLowerCase();

            if (userGender && profileGender && userGender === profileGender) {
              return false; // same gender → hide
            }

            return true; // opposite gender → show
          });

        
        console.log('✅ Filtered Profiles Count (excluding own):', filteredProfiles.length);
        
        setProfiles(filteredProfiles);
        // Adjust total count to exclude current user
        setTotalProfiles(filteredProfiles.length > 0 ? data.total - 1 : 0);
      } else {
        console.error('❌ API returned success: false');
        console.error('❌ Error Message:', data.message);
        setProfiles([]);
        setTotalProfiles(0);
      }
    } catch (error) {
      console.error('❌❌❌ API Call Failed! ❌❌❌');
      console.error('❌ Error Type:', error instanceof Error ? error.name : typeof error);
      console.error('❌ Error Message:', error instanceof Error ? error.message : error);
      console.error('❌ Full Error Object:', error);
      
      setProfiles([]);
      setTotalProfiles(0);
    } finally {
      setLoading(false);
      console.log('✔️ API call completed');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    }
  };

  // Initial load - only once
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      console.log('🔄 Initial load');
      fetchProfiles(currentFilters, currentQueryString, activeView);
    }
  }, []);

  // Handle page changes
  useEffect(() => {
    if (!isFirstRender.current) {
      console.log('🔄 Page changed to:', currentPage);
      fetchProfiles(currentFilters, currentQueryString, activeView);
    }
  }, [currentPage]);

  // Handle view changes
  useEffect(() => {
    if (!isFirstRender.current) {
      console.log('🔄 View changed to:', activeView);
      setCurrentPage(1);
      fetchProfiles(currentFilters, currentQueryString, activeView);
    }
  }, [activeView]);

  // Handle filter changes from QuickFilters component
  const handleFilterChange = (filters: any, queryString: string) => {
    console.log('🎛️ Filters Changed!');
    console.log('🎛️ New Filters:', filters);
    console.log('🎛️ New Query String:', queryString);
    
    setCurrentFilters(filters);
    setCurrentQueryString(queryString);
    setCurrentPage(1);
    fetchProfiles(filters, queryString, activeView);
  };

 
  const handleSendInterest = async (profileId: string) => {
    if (!currentUser) {
      alert("Please login to send an interest");
      return;
    }

    const token = localStorage.getItem("authToken");

    if (!token) {
      alert("Authentication token not found. Please login again.");
      return;
    }

    try {
      console.log("💌 Sending interest to:", profileId);

      // const response = await fetch("https://matrimonial-backend-14t2.onrender.com/api/request/send", {
      const response = await fetch("https://matrimonial-backend-14t2.onrender.com/api/request/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          senderId: currentUser.id,
          receiverId: profileId,
        }),
      });

      const data = await response.json();
      console.log("📦 Interest Response:", data);

      if (data.success) {
        alert("Interest sent successfully ❤️");
      } else {
        alert(data.message || "Failed to send interest");
      }
    } catch (error) {
      console.error("❌ Failed to send interest:", error);
      alert("Something went wrong while sending interest");
    }
  };

  // Handle search input with debounce
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    console.log('🔍 Search term changed:', value);
    
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    searchTimeoutRef.current = setTimeout(() => {
      console.log('🔍 Executing search after debounce...');
      setCurrentPage(1);
      fetchProfiles(currentFilters, currentQueryString, activeView);
    }, 500);
  };

  // Handle view change
  const handleViewChange = (view: 'all' | 'recommended' | 'recent') => {
    console.log('👁️ View Changed to:', view);
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
    <div className="space-y-6">
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

      {/* QuickFilters Component */}
      <QuickFilters onFilterChange={handleFilterChange} initialFilters={currentFilters} />

      {/* Results Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          {/* <h2 className="text-xl font-bold text-gray-900">
            {totalProfiles} {activeView === 'all' ? 'Profiles' : activeView === 'recommended' ? 'Recommended Profiles' : 'Recently Joined'} Found
          </h2> */}
              {(() => {
      const displayedCount = profiles.length;
      const totalCount = totalProfiles;
      const viewLabel =
        activeView === 'all'
          ? 'Profiles'
          : activeView === 'recommended'
          ? 'Recommended Profiles'
          : 'Recently Joined Profiles';

      if (displayedCount === 0) {
        return (
          <h2 className="text-xl font-bold text-gray-900">
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
      } else {
        return (
          <h2 className="text-xl font-bold text-gray-900">
            {displayedCount} {displayedCount === 1 ? 'Profile' : 'Profiles'} Found
          </h2>
        );
      }
    })()}

        </div>

        {loading ? (
          <div className="text-center py-12 bg-white rounded-xl">
            <div className="w-16 h-16 border-4 border-rose-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-500">Loading profiles...</p>
          </div>
        ) : profiles.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="px-4 py-2 text-gray-700">
                  Page {currentPage} of {Math.ceil(totalProfiles / 20)}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  disabled={currentPage >= Math.ceil(totalProfiles / 20)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl">
            <SearchIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No profiles found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>
    </div>
  );
};