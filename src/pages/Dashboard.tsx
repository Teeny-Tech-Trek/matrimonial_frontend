// src/pages/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import { Heart, MessageCircle, Star, TrendingUp, Users, UserPlus, Loader2, User, X, AlertCircle, Edit } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { CompleteProfile } from '../types';
import { ProfileCard } from '../components/ProfileCard';

interface DashboardProps {
  onNavigate: (page: string, data?: any) => void;
}

// Profile Completion Modal Component
const ProfileCompletionModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  completionPercentage: number;
  missingFields: string[];
}> = ({ isOpen, onClose, onComplete, completionPercentage, missingFields }) => {
  const [loading, setLoading] = useState(false);

  const handleSkip = () => {
    localStorage.setItem('profileCompletionSkipped', 'true');
    localStorage.setItem('profileCompletionSkippedAt', new Date().toISOString());
    console.log('✅ Profile completion skipped');
    onClose();
  };

  if (!isOpen || completionPercentage === 100) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden animate-scale-in">
        <div className="bg-gradient-to-r from-rose-600 to-pink-600 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-full flex-shrink-0">
              <AlertCircle className="h-8 w-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-1">Complete Your Profile</h2>
              <p className="text-rose-100">Help us find your perfect match by completing your profile</p>
            </div>
          </div>
        </div>
        <div className="p-6">
          {loading ? (
            <div className="text-center py-12">
              <Loader2 className="h-12 w-12 animate-spin text-rose-600 mx-auto mb-4" />
              <p className="text-gray-600">Checking profile...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center justify-center">
                <div className="relative">
                  <svg className="w-40 h-40 transform -rotate-90">
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="#FEE2E2"
                      strokeWidth="12"
                      fill="none"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="#E11D48"
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={`${(completionPercentage / 100) * 440} 440`}
                      strokeLinecap="round"
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-gray-900">{completionPercentage}%</div>
                      <div className="text-sm text-gray-600">Complete</div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-4 text-center">
                  Complete all sections to maximize your matches
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                  Sections to Complete:
                </h3>
                <div className="space-y-2">
                  {missingFields.map((field, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-2 rounded-lg"
                    >
                      <div className="w-2 h-2 bg-rose-500 rounded-full flex-shrink-0"></div>
                      <span>{field}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col justify-between">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <h4 className="text-sm font-semibold text-blue-900 mb-2">
                    Why complete?
                  </h4>
                  <ul className="space-y-1 text-xs text-blue-800">
                    <li>✓ Better match recommendations</li>
                    <li>✓ 10x more profile visibility</li>
                    <li>✓ Receive more interests</li>
                    <li>✓ Build trust with matches</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      onComplete();
                      onClose();
                    }}
                    className="w-full bg-gradient-to-r from-rose-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <Edit className="h-5 w-5" />
                    Complete Profile Now
                  </button>
                  <button
                    onClick={handleSkip}
                    className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-all text-sm"
                  >
                    Skip for Now
                  </button>
                  <p className="text-xs text-center text-gray-500 mt-2">
                    You can complete your profile anytime
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <style>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
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
    profileCompletion: 20,
  });
  const [missingFields, setMissingFields] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  // Check if user just registered and show modal
  useEffect(() => {
    const justRegistered = localStorage.getItem('justRegistered');
    const skipped = localStorage.getItem('profileCompletionSkipped');
    
    console.log('🔍 Checking registration flag:', justRegistered);
    console.log('🔍 Skip status:', skipped);
    
    if (justRegistered === 'true' && !skipped) {
      console.log('✅ Showing profile completion modal in 1 second...');
      setTimeout(() => {
        setShowCompletionModal(true);
      }, 1000);
      
      localStorage.removeItem('justRegistered');
    }
  }, []);

  // Fetch dashboard data on component mount
  useEffect(() => {
    fetchDashboardData();
  }, [currentUser]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError('');
      
      console.log('📥 Fetching dashboard data for user:', currentUser?.id);
      
      const token = localStorage.getItem('authToken');
      if (!token) {
        setError('Please log in to view your dashboard');
        setLoading(false);
        return;
      }

      // Fetch dashboard stats
      const statsResponse = await fetch('https://matrimonial-backend-14t2.onrender.com/api/dashboard/stats', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const statsData = await statsResponse.json();
      console.log('📦 Stats API Response:', statsData);
      
      if (!statsResponse.ok || !statsData.success) {
        throw new Error(statsData.message || 'Failed to load stats');
      }

      // Fetch recommended profiles
      const profilesResponse = await fetch('https://matrimonial-backend-14t2.onrender.com/api/dashboard/recommended?page=1&limit=50', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const profilesData = await profilesResponse.json();
      console.log('📦 Profiles API Response:', profilesData);

      if (profilesResponse.ok && profilesData.success) {
        // Filter out current user's profile
        const filteredProfiles = profilesData.data.filter((profile: CompleteProfile) => {
          const profileUserId = profile.userId || profile.id || profile._id;
          return profileUserId !== currentUser?.id;
        });
        
        console.log('✅ Total profiles:', profilesData.data.length);
        console.log('✅ Filtered profiles:', filteredProfiles.length);
        
        setProfiles(filteredProfiles);
      } else {
        setError(profilesData.message || 'No profiles found');
        setProfiles([]);
      }

      if (statsData.success) {
        setStats({
          interests: statsData.data.interests,
          messages: statsData.data.messages,
          matches: statsData.data.matches,
          pendingRequests: statsData.data.pendingRequests,
          profileCompletion: statsData.data.profileCompletion,
        });
        
        // Calculate missing fields based on profile data
        const profile = statsData.data;
        const missing: string[] = [];
        if (!profile.personalDetails?.heightCm) missing.push('Personal Details');
        if (!profile.religiousDetails?.religion) missing.push('Religious Background');
        if (!profile.educationDetails?.highestEducation) missing.push('Education Details');
        if (!profile.professionalDetails?.occupation) missing.push('Professional Details');
        if (!profile.familyDetails?.currentResidenceCity) missing.push('Family Details');
        if (!profile.lifestylePreferences?.aboutMe) missing.push('About & Expectations');
        setMissingFields(missing);
      } else {
        setError(statsData.message || 'Failed to load dashboard data');
      }
    } catch (err: any) {
      console.error('❌ Error fetching dashboard data:', err);
      setError('Failed to connect to the server');
      setProfiles([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSendInterest = (profileId: string) => {
    alert('Interest sent successfully!');
  };

  const handleMessage = (profileId: string) => {
    onNavigate('messages', { profileId });
  };

  return (
    <div className="space-y-8">
      {/* Profile Completion Modal */}
      <ProfileCompletionModal
        isOpen={showCompletionModal}
        onClose={() => setShowCompletionModal(false)}
        onComplete={() => onNavigate('profile-setup')}
        completionPercentage={stats.profileCompletion}
        missingFields={missingFields}
      />

      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-rose-600 to-pink-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {currentUser?.fullName?.split(' ')[0]}!
        </h1>
        <p className="text-rose-100">
          Here are your AI-recommended matches based on your preferences
        </p>
        <div className="mt-4 flex items-center gap-4 flex-wrap">
          {stats.profileCompletion < 100 && (
            <button
              onClick={() => setShowCompletionModal(true)}
              className="inline-block bg-white/20 px-4 py-2 rounded-full hover:bg-white/30 transition-colors cursor-pointer"
            >
              Profile Completion: {stats.profileCompletion}%
            </button>
          )}
          {stats.profileCompletion === 100 && (
            <div className="inline-flex items-center gap-2 bg-green-500/20 px-4 py-2 rounded-full">
              <span className="text-sm">✓ Profile Complete</span>
            </div>
          )}
          {stats.profileCompletion < 100 && (
            <button
              onClick={() => onNavigate('profile-setup')}
              className="bg-rose-700 text-white px-6 py-2 rounded-lg font-semibold hover:bg-rose-800 transition-colors"
            >
              Complete Profile
            </button>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <Heart className="h-8 w-8 text-rose-600 fill-rose-600" />
            <TrendingUp className="h-5 w-5 text-green-500" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{stats.interests}</div>
          <div className="text-sm text-gray-600">Interests Received</div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <MessageCircle className="h-8 w-8 text-green-600" />
            <TrendingUp className="h-5 w-5 text-green-500" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{stats.messages}</div>
          <div className="text-sm text-gray-600">New Messages</div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <Star className="h-8 w-8 text-amber-600 fill-amber-600" />
            <TrendingUp className="h-5 w-5 text-green-500" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{stats.matches}</div>
          <div className="text-sm text-gray-600">Mutual Matches</div>
        </div>
      </div>

      {/* View Requests Card */}
      <div
        onClick={() => onNavigate('requests')}
        className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all cursor-pointer group relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-pink-600 opacity-0 group-hover:opacity-5 transition-opacity"></div>
        <div className="flex items-center justify-between relative z-10">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <UserPlus className="h-6 w-6 text-rose-600" />
              View Requests
            </h3>
            <p className="text-gray-600">{stats.pendingRequests} new connection requests waiting</p>
          </div>
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-r from-rose-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <UserPlus className="h-10 w-10 text-white" />
            </div>
            {stats.pendingRequests > 0 && (
              <span className="absolute -top-2 -right-2 bg-gradient-to-r from-rose-600 to-pink-600 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
                {stats.pendingRequests} New
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Profiles Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">AI Recommended Matches</h2>
          <div className="text-sm text-gray-600">
            Showing {profiles.length} profile{profiles.length !== 1 ? 's' : ''}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700">{error}</p>
            <button
              onClick={() => fetchDashboardData()}
              className="mt-2 text-red-600 font-semibold hover:underline"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-12 bg-white rounded-xl">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin text-rose-600 mx-auto mb-4" />
              <p className="text-gray-600">Loading profiles...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Profile Grid */}
            {profiles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {profiles.map(profile => (
                  <ProfileCard
                    key={profile.id || profile._id}
                    profile={profile}
                    onViewProfile={(id) => onNavigate('profile-view', { profileId: id })}
                    onSendInterest={handleSendInterest}
                    onMessage={handleMessage}
                  />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="text-center py-12 bg-white rounded-xl">
                <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No matches found</h3>
                <p className="text-gray-600 mb-4">
                  Complete your profile to improve your recommendations
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

      {/* Membership Upgrade Banner */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Upgrade Your Membership</h3>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600 mb-2">Get unlimited access to premium features</p>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>✓ Unlimited profile views</li>
              <li>✓ Send unlimited interests</li>
              <li>✓ Chat with matches</li>
              <li>✓ View contact information</li>
            </ul>
          </div>
          <button
            onClick={() => onNavigate('membership')}
            className="px-8 py-3 bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            View Plans
          </button>
        </div>
      </div>
    </div>
  );
};