import React, { useEffect, useState } from 'react';
import { Heart, MessageCircle, Star, TrendingUp, Users, UserPlus, Loader2, User, X, AlertCircle, Edit, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { CompleteProfile } from '../types';
import { ProfileCard } from '../components/ProfileCard';

// Import background images
import heroFamilyBackground from "../Images/ChatGPT Image Jan 3, 2026, 01_08_57 PM.png";
import pinkBokehBackground from "../Images/ChatGPT Image Jan 3, 2026, 04_53_31 PM.png";
import glassCardBackground from "../Images/ChatGPT Image Jan 3, 2026, 04_51_46 PM.png";

interface DashboardProps {
  onNavigate: (page: string, data?: any) => void;
}

// ========================================
// 🔧 API CONFIGURATION
// ========================================
const API_CONFIG = {
  //  For local development
  // STATS_API: 'http://localhost:5000/api/dashboard/stats',
  // PROFILE_LIST_API: 'http://localhost:5000/api/profile/list',
  // SEND_INTEREST_API: 'http://localhost:5000/api/request/send',
  // ACCEPTED_CONNECTIONS_API: 'http://localhost:5000/api/request/connections/accepted',
  
  // For production, uncomment these:
  STATS_API: 'https://api.rsaristomatch.com/api/dashboard/stats',
  PROFILE_LIST_API: 'https://api.rsaristomatch.com/api/profile/list',
  SEND_INTEREST_API: 'https://api.rsaristomatch.com/api/request/send',
  ACCEPTED_CONNECTIONS_API: 'https://api.rsaristomatch.com/api/request/connections/accepted',
};

// Profile Completion Modal Component
const ProfileCompletionModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  completionPercentage: number;
  missingFields: string[];
}> = ({ isOpen, onClose, onComplete, completionPercentage, missingFields }) => {
  const isProfileComplete = completionPercentage >= 98;

  const handleSkip = () => {
    const skipData = {
      skipped: true,
      skippedAt: new Date().toISOString(),
      profileCompletion: completionPercentage
    };
    localStorage.setItem('profileCompletionSkipped', JSON.stringify(skipData));
    onClose();
  };

  if (!isOpen || isProfileComplete) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 p-2 sm:p-4 pt-20 pl-6 sm:pt-0 sm:flex sm:items-center sm:justify-center">
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-[95%] sm:max-w-4xl w-full overflow-hidden animate-scale-in max-h-[90vh] flex flex-col">
        <div className="bg-gradient-to-r from-rose-600 to-pink-600 p-4 sm:p-6 text-white relative flex-shrink-0">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 text-white/80 hover:text-white transition-colors"
          >
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
          <div className="flex items-center gap-3 sm:gap-4 pr-8 sm:pr-0">
            <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-full flex-shrink-0">
              <AlertCircle className="h-6 w-6 sm:h-8 sm:w-8" />
            </div>
            <div>
              <h2 className="text-lg sm:text-2xl font-bold mb-0.5 sm:mb-1">Complete Your Profile</h2>
              <p className="text-xs sm:text-base text-rose-100">Help us find your perfect match by completing your profile</p>
            </div>
          </div>
        </div>
        <div className="px-2 pb-2 pt-4 sm:p-6 overflow-y-auto flex-1">
          <div className="flex flex-col gap-2 sm:gap-6 md:grid md:grid-cols-3 -mt-2 sm:mt-0">
            <div className="flex flex-col items-center justify-center md:col-span-3 lg:col-span-1">
              <div className="relative">
                <svg className="w-14 h-14 sm:w-32 sm:h-32 md:w-40 md:h-40 transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" stroke="#FEE2E2" strokeWidth="8" fill="none" />
                  <circle
                    cx="50" cy="50" r="40"
                    stroke="#E11D48" strokeWidth="8" fill="none"
                    strokeDasharray={`${((completionPercentage || 20) / 100) * 251.2} 251.2`}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-base sm:text-3xl md:text-4xl font-bold text-gray-900">{completionPercentage || 20}%</div>
                    <div className="text-[7px] sm:text-xs md:text-sm text-gray-600">Complete</div>
                  </div>
                </div>
              </div>
              <p className="text-[7px] sm:text-xs md:text-sm text-gray-500 mt-1 sm:mt-3 md:mt-4 text-center px-2">
                Complete all sections to maximize your matches
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Sections to Complete:</h3>
              <div className="space-y-2">
                {missingFields.length > 0 ? (
                  missingFields.map((field, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-2 rounded-lg">
                      <div className="w-2 h-2 bg-rose-500 rounded-full flex-shrink-0"></div>
                      <span>{field}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                    Please complete your profile to see missing sections
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col justify-between md:col-span-3 lg:col-span-1">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-1.5 sm:p-4 mb-1.5 sm:mb-4">
                <h4 className="text-[9px] sm:text-sm font-semibold text-blue-900 mb-0.5 sm:mb-2">Why complete?</h4>
                <ul className="space-y-0.5 sm:space-y-1 text-[7px] sm:text-xs text-blue-800">
                  <li>✓ Better match recommendations</li>
                  <li>✓ 10x more profile visibility</li>
                  <li>✓ Receive more interests</li>
                  <li>✓ Build trust with matches</li>
                </ul>
              </div>
              <div className="space-y-1 sm:space-y-2">
                <button
                  onClick={() => { onComplete(); onClose(); }}
                  className="w-full bg-gradient-to-r from-rose-600 to-pink-600 text-white py-1.5 sm:py-3 rounded-lg text-[10px] sm:text-base font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-1 sm:gap-2"
                >
                  <Edit className="h-2.5 w-2.5 sm:h-5 sm:w-5" />
                  Complete Profile Now
                </button>
                <button
                  onClick={handleSkip}
                  className="w-full bg-gray-100 text-gray-700 py-1 sm:py-2 rounded-lg font-semibold hover:bg-gray-200 transition-all text-[9px] sm:text-sm"
                >
                  Skip for Now
                </button>
                <p className="text-[7px] sm:text-xs text-center text-gray-500">You can complete your profile anytime</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-scale-in { animation: scale-in 0.3s ease-out; }
      `}</style>
    </div>
  );
};

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { currentUser } = useAuth();
  const [profiles, setProfiles] = useState<CompleteProfile[]>([]);
  const [stats, setStats] = useState({
    interests: 0,
    messages: 0,
    matches: 0,
    pendingRequests: 0,
    profileCompletion: 0,
  });
  const [missingFields, setMissingFields] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);
  const [acceptedConnectionIds, setAcceptedConnectionIds] = useState<string[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, [currentUser]);

  useEffect(() => {
    if (!dataFetched || loading) return;
    
    if (stats.profileCompletion >= 98) {
      localStorage.removeItem('justRegistered');
      localStorage.removeItem('justLoggedIn');
      return;
    }

    const justRegistered = localStorage.getItem('justRegistered');
    const justLoggedIn = localStorage.getItem('justLoggedIn');
    const skipDataStr = localStorage.getItem('profileCompletionSkipped');
    let shouldSkip = false;
    
    if (skipDataStr) {
      try {
        const skipData = JSON.parse(skipDataStr);
        const skippedAt = new Date(skipData.skippedAt);
        const hoursSinceSkip = (Date.now() - skippedAt.getTime()) / (1000 * 60 * 60);
        
        if (justRegistered !== 'true' && hoursSinceSkip < 24) {
          shouldSkip = true;
        } else {
          localStorage.removeItem('profileCompletionSkipped');
        }
      } catch (e) {
        localStorage.removeItem('profileCompletionSkipped');
      }
    }

    if (shouldSkip) {
      localStorage.removeItem('justRegistered');
      localStorage.removeItem('justLoggedIn');
      return;
    }

    if ((justRegistered === 'true' || justLoggedIn === 'true') && stats.profileCompletion < 100) {
      setTimeout(() => setShowCompletionModal(true), 1000);
      localStorage.removeItem('justRegistered');
      localStorage.removeItem('justLoggedIn');
    }
  }, [dataFetched, loading, stats.profileCompletion]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError('');
      
      const token = localStorage.getItem('authToken');
      if (!token) {
        setError('Please log in to view your dashboard');
        setLoading(false);
        return;
      }

      const statsResponse = await fetch(API_CONFIG.STATS_API, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const statsData = await statsResponse.json();
      
      if (!statsResponse.ok || !statsData.success) {
        throw new Error(statsData.message || 'Failed to load stats');
      }

      const connectionsResponse = await fetch(API_CONFIG.ACCEPTED_CONNECTIONS_API, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      let connectedUserIds: string[] = [];
      
      if (connectionsResponse.ok) {
        const result = await connectionsResponse.json();
        const connections = result.data || [];
        
        if (connections.length > 0) {
          const currentUserId = currentUser?.id || currentUser?.userId;
          
          connectedUserIds = connections.map((conn: any) => {
            const possibleIds = [
              conn.userId, conn.senderId, conn.receiverId,
              conn.sender?._id, conn.sender?.userId,
              conn.receiver?._id, conn.receiver?.userId,
              conn.user?._id, conn.user?.userId,
              conn.profile?._id, conn.profile?.userId,
              conn.profileId, conn._id, conn.id,
            ].filter(id => id && id !== currentUserId);
            
            return possibleIds;
          }).flat().filter((id, index, self) => self.indexOf(id) === index);
        }
      }
      
      setAcceptedConnectionIds(connectedUserIds);

      const matchCriteria: string[] = [];
      const userGender = currentUser?.gender?.toLowerCase()?.trim();
      
      let oppositeGender: string;
      if (userGender === 'male') {
        oppositeGender = 'female';
      } else if (userGender === 'female') {
        oppositeGender = 'male';
      } else {
        oppositeGender = 'female';
      }
      
      matchCriteria.push(`gender=${oppositeGender}`);
      
      if (currentUser?.religiousDetails?.religion) {
        matchCriteria.push(`religion=${encodeURIComponent(currentUser.religiousDetails.religion)}`);
      }
      
      if (currentUser?.familyDetails?.currentResidenceCity) {
        matchCriteria.push(`city=${encodeURIComponent(currentUser.familyDetails.currentResidenceCity)}`);
      }

      matchCriteria.push('page=1');
      matchCriteria.push('limit=50');
      matchCriteria.push('sortBy=createdAt');
      matchCriteria.push('sortOrder=desc');
      
      const queryString = matchCriteria.join('&');
      const profileApiUrl = `${API_CONFIG.PROFILE_LIST_API}?${queryString}`;
      
      const profilesResponse = await fetch(profileApiUrl);
      const profilesData = await profilesResponse.json();

      if (profilesResponse.ok && profilesData.success) {
        const filteredProfiles = (profilesData.data || []).filter((profile: CompleteProfile) => {
          const possibleProfileIds = [
            profile.userId, profile.id, profile._id,
            profile.user?._id, profile.user?.userId, profile.user?.id,
          ].filter(id => id);
          
          const currentUserId = currentUser?.id;
          
          if (possibleProfileIds.includes(currentUserId)) return false;

          const profileGender = profile.gender?.toLowerCase()?.trim();
          const userGenderNormalized = currentUser?.gender?.toLowerCase()?.trim();
          
          if (userGenderNormalized && profileGender) {
            if (userGenderNormalized === profileGender) return false;
          }
          
          if (currentUser?.religiousDetails?.religion) {
            const profileReligion = profile.religiousDetails?.religion;
            if (profileReligion !== currentUser.religiousDetails.religion) return false;
          }
          
          if (currentUser?.familyDetails?.currentResidenceCity) {
            const profileCity = profile.familyDetails?.currentResidenceCity;
            if (profileCity !== currentUser.familyDetails.currentResidenceCity) return false;
          }

          const isConnected = possibleProfileIds.some(profileId => 
            connectedUserIds.includes(profileId)
          );
          
          if (isConnected) return false;

          return true;
        });
        
        setProfiles(filteredProfiles);
      } else {
        setProfiles([]);
      }

      if (statsData.success) {
        const profileCompletion = statsData.data.profileCompletion || 0;
        
        setStats({
          interests: statsData.data.interests || 0,
          messages: statsData.data.messages || 0,
          matches: statsData.data.matches || 0,
          pendingRequests: statsData.data.pendingRequests || 0,
          profileCompletion: profileCompletion,
        });
        
        const profile = statsData.data;
        const missing: string[] = [];
        
        if (!profile.personalDetails?.heightCm) missing.push('Personal Details (Height, Body Type, etc.)');
        if (!profile.religiousDetails?.religion) missing.push('Religious Background');
        if (!profile.educationDetails?.highestEducation) missing.push('Education Details');
        if (!profile.professionalDetails?.occupation) missing.push('Professional Details');
        if (!profile.familyDetails?.fatherOccupation) missing.push('Family Details');
        if (!profile.lifestylePreferences?.aboutMe || profile.lifestylePreferences?.aboutMe?.length < 50) {
          missing.push('About Me & Partner Expectations');
        }
        
        if (missing.length === 0 && profileCompletion < 100) {
          missing.push('Complete your profile information');
          missing.push('Add photos to your profile');
          missing.push('Fill in all required details');
        }
        
        setMissingFields(missing);
        setDataFetched(true);
      } else {
        setError(statsData.message || 'Failed to load dashboard data');
      }
      
    } catch (err: any) {
      if (err.message.includes('Failed to fetch')) {
        setError('Cannot connect to server. Please make sure your backend is running');
      } else if (err.message.includes('CORS')) {
        setError('CORS error: Backend needs to allow requests');
      } else {
        setError(err.message || 'Failed to connect to the server. Please check your connection.');
      }
      
      setProfiles([]);
      setDataFetched(true);
    } finally {
      setLoading(false);
    }
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
      const response = await fetch(API_CONFIG.SEND_INTEREST_API, {
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

      if (data.success) {
        alert("Interest sent successfully ❤️");
      } else {
        alert(data.message || "Failed to send interest");
      }
    } catch (error) {
      alert("Something went wrong while sending interest. Make sure your backend is running.");
    }
  };

  const handleMessage = (profileId: string) => {
    onNavigate('messages', { profileId });
  };

  return (
    <div className="space-y-0">
      <ProfileCompletionModal 
        isOpen={showCompletionModal}
        onClose={() => setShowCompletionModal(false)}
        onComplete={() => onNavigate('profile-setup')}
        completionPercentage={stats.profileCompletion}
        missingFields={missingFields}
      />

      {/* ========================================
          SECTION 1: HERO WITH FAMILY BACKGROUND (Image 3)
          ======================================== */}
      <div 
        className="relative overflow-hidden min-h-[500px] sm:min-h-[600px] lg:min-h-[700px]"
        style={{
          backgroundImage: `url(${heroFamilyBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-white/5"></div>
        
        <div className="relative z-10 p-6 pt-16 md:p-10 lg:p-12">
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3" style={{ 
              color: '#5D4037',
              fontFamily: 'Georgia, serif',
              letterSpacing: '-0.5px'
            }}>
              Welcome back, {currentUser?.fullName?.split(' ')[0]}!
            </h1>
            <p className="text-base md:text-lg" style={{ color: '#6D4C41' }}>
              Helping families discover meaningful connections for their
            </p>
          </div>

          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-5 md:p-6 mb-8 max-w-3xl shadow-lg">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex-1 w-full">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm md:text-base font-semibold text-gray-800">
                    Profile {stats.profileCompletion}% Complete
                  </span>
                  <span className="text-xs md:text-sm text-gray-600">
                    {stats.profileCompletion >= 98 ? '✓ Complete' : 'Complete your profile'}
                  </span>
                </div>
                <div className="w-full bg-gray-300 rounded-full h-2.5 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-rose-400 via-pink-500 to-rose-500 rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${stats.profileCompletion}%` }}
                  ></div>
                </div>
              </div>
              {stats.profileCompletion < 98 && (
                <div className="w-full sm:w-auto flex-shrink-0">
                  <button
                    onClick={() => onNavigate('profile-setup')}
                    className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full font-semibold hover:shadow-xl transition-all whitespace-nowrap text-sm md:text-base"
                  >
                    Complete Profile
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            <div 
              className="bg-white/98 backdrop-blur-md rounded-2xl p-5 md:p-7 shadow-md hover:shadow-2xl transition-all cursor-pointer group border border-white/50"
              onClick={() => onNavigate('requests')}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-rose-100 to-pink-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
                  <Heart className="h-7 w-7 md:h-8 md:w-8 text-rose-500 fill-rose-500" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stats.interests}</div>
                <div className="text-sm md:text-base text-gray-700 font-semibold mb-1">Interests Received</div>
                <div className="text-xs text-gray-500">New Interests</div>
              </div>
            </div>

            <div 
              className="bg-white/98 backdrop-blur-md rounded-2xl p-5 md:p-7 shadow-md hover:shadow-2xl transition-all cursor-pointer group border border-white/50"
              onClick={() => onNavigate('messages')}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-pink-100 to-rose-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
                  <MessageCircle className="h-7 w-7 md:h-8 md:w-8 text-pink-500" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stats.messages}</div>
                <div className="text-sm md:text-base text-gray-700 font-semibold mb-1">New Messages</div>
                <div className="text-xs text-gray-500">Unread Messages</div>
              </div>
            </div>

            <div 
              className="bg-white/98 backdrop-blur-md rounded-2xl p-5 md:p-7 shadow-md hover:shadow-2xl transition-all cursor-pointer group border border-white/50"
              onClick={() => onNavigate('matches')}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
                  <Star className="h-7 w-7 md:h-8 md:w-8 text-amber-500 fill-amber-500" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stats.matches}</div>
                <div className="text-sm md:text-base text-gray-700 font-semibold mb-1">Mutual Matches</div>
                <div className="text-xs text-gray-500">Matches Found</div>
              </div>
            </div>

            <div 
              className="bg-white/98 backdrop-blur-md rounded-2xl p-5 md:p-7 shadow-md hover:shadow-2xl transition-all cursor-pointer group border border-white/50"
              onClick={() => onNavigate('requests')}
            >
              <div className="flex flex-col items-center text-center relative">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-rose-100 to-pink-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
                  <UserPlus className="h-7 w-7 md:h-8 md:w-8 text-rose-500" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stats.pendingRequests}</div>
                <div className="text-sm md:text-base text-gray-700 font-semibold mb-1">View Requests</div>
                <div className="text-xs text-gray-500">Requests Pending</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================
          SECTION 2: RECOMMENDED MATCHES WITH PINK BOKEH (Image 1)
          ======================================== */}
      <div 
        className="relative overflow-hidden"
        style={{
          backgroundImage: `url(${pinkBokehBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '600px'
        }}
      >
        <div className="relative z-10 p-6 md:p-10 lg:p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ 
              color: '#5D4037',
              fontFamily: 'Georgia, serif'
            }}>
              Recommended Matches
            </h2>
            <p className="text-base text-gray-600">
              Showing {profiles.length} profile{profiles.length !== 1 ? 's' : ''}
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12 bg-white/90 backdrop-blur-sm rounded-xl">
              <div className="text-center">
                <Loader2 className="h-12 w-12 animate-spin text-rose-600 mx-auto mb-4" />
                <p className="text-gray-600">Loading matched profiles...</p>
              </div>
            </div>
          ) : (
            <>
              {profiles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {profiles.map(profile => (
                    <ProfileCard
                      key={profile.id || profile._id}
                      profile={profile}
                      onViewProfile={(id) => onNavigate('profile-view', { profileId: id })}
                      onSendInterest={() => handleSendInterest(profile.userId)}
                      onMessage={handleMessage}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white/90 backdrop-blur-sm rounded-xl">
                  <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No matches found</h3>
                  <p className="text-gray-600 mb-4">
                    No profiles match your criteria. Try completing your profile or check back later.
                  </p>
                  <button
                    onClick={() => onNavigate('profile-setup')}
                    className="px-6 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700"
                  >
                    Complete Your Profile
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* ========================================
          SECTION 3: MEMBERSHIP UPGRADE WITH GLASS CARD (Image 2)
          ======================================== */}
      <div 
        className="relative overflow-hidden"
        style={{
          backgroundImage: `url(${glassCardBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '500px'
        }}
      >
        <div className="relative z-10 p-6 md:p-10 lg:p-12 flex items-center justify-center min-h-[500px]">
          <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl max-w-5xl w-full overflow-hidden border border-white/50">
            <div className="flex flex-col md:flex-row">
              <div className="flex-1 p-8 md:p-10">
                <h3 className="text-3xl md:text-4xl font-bold mb-4" style={{ 
                  color: '#5D4037',
                  fontFamily: 'Georgia, serif'
                }}>
                  Upgrade Your Membership
                </h3>
                <p className="text-gray-600 mb-6 text-lg">Get unlimited access to premium features</p>
                
                <div className="space-y-4 mb-8">
                  {[
                    'Unlimited profile views',
                    'Send unlimited interests',
                    'Chat with matches',
                    'View contact information'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="h-4 w-4 text-rose-600" />
                      </div>
                      <span className="text-gray-700 text-base md:text-lg">{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => onNavigate('membership')}
                  className="w-full md:w-auto px-12 py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full text-lg font-semibold hover:shadow-2xl transition-all"
                >
                  View Plans
                </button>
              </div>
              
              <div 
                className="hidden md:block w-1/3 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${heroFamilyBackground})`,
                  backgroundPosition: 'right center',
                  minHeight: '400px'
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};