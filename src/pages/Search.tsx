
import React, { useState, useEffect, useRef } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { CompleteProfile } from '../types';
import { ProfileCard } from '../components/ProfileCard';
import QuickFilters from '../components/QuickFilters';
import api from '../services/api'; 

interface SearchProps {
  onNavigate: (page: string, data?: any) => void;
}

export const Search: React.FC<SearchProps> = ({ onNavigate }) => {
  const { currentUser } = useAuth();

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
  
  const isFirstRender = useRef(true);
  const searchTimeoutRef = useRef<NodeJS.Timeout>();

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

  // Initial load - only once
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      fetchProfiles(currentFilters, currentQueryString, activeView);
    }
  }, []);

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