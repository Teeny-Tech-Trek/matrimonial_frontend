// src/pages/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import { Heart, Eye, MessageCircle, Star, TrendingUp, Users,UserPlus, Loader2, User, X, AlertCircle, Edit, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { CompleteProfile } from '../types';
import { ProfileCard } from '../components/ProfileCard';
import profileService from '../services/profile.service';
import QuickFilters from '../components/QuickFilters';
import {ViewRequests } from "../components/ViewRequest"

interface DashboardProps {
  onNavigate: (page: string, data?: any) => void;
}

// Profile Completion Modal Component (Inline)
const ProfileCompletionModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}> = ({ isOpen, onClose, onComplete }) => {
  const [completionPercentage, setCompletionPercentage] = useState(20);
  const [missingFields, setMissingFields] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      checkProfileCompletion();
    }
  }, [isOpen]);

  const checkProfileCompletion = async () => {
    try {
      setLoading(true);
      const response = await profileService.getMyProfile();
      
      if (response.success && response.data) {
        const profile = response.data;
        const missing: string[] = [];
        let completed = 20;

        if (!profile.personalDetails?.heightCm) missing.push('Personal Details');
        else completed += 15;

        if (!profile.religiousDetails?.religion) missing.push('Religious Background');
        else completed += 10;

        if (!profile.educationDetails?.highestEducation) missing.push('Education Details');
        else completed += 15;

        if (!profile.professionalDetails?.occupation) missing.push('Professional Details');
        else completed += 15;

        if (!profile.familyDetails?.currentResidenceCity) missing.push('Family Details');
        else completed += 15;

        if (!profile.lifestylePreferences?.aboutMe) missing.push('About & Expectations');
        else completed += 10;

        setCompletionPercentage(completed);
        setMissingFields(missing);
      } else {
        setCompletionPercentage(20);
        setMissingFields([
          'Personal Details',
          'Religious Background',
          'Education Details',
          'Professional Details',
          'Family Details',
          'About & Expectations'
        ]);
      }
    } catch (error) {
      console.log('Profile not found');
      setCompletionPercentage(20);
      setMissingFields([
        'Personal Details',
        'Religious Background',
        'Education Details',
        'Professional Details',
        'Family Details',
        'About & Expectations'
      ]);
    } finally {
      setLoading(false);
    }
  };

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
        {/* Header */}
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

        {/* Content */}
        <div className="p-6">
          {loading ? (
            <div className="text-center py-12">
              <Loader2 className="h-12 w-12 animate-spin text-rose-600 mx-auto mb-4" />
              <p className="text-gray-600">Checking profile...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {/* Left: Progress Circle */}
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

              {/* Middle: Missing Sections */}
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

              {/* Right: Benefits & Actions */}
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

                {/* Action Buttons */}
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'recentlyJoined' | 'recommended'>('all');
  const [completionPercentage, setCompletionPercentage] = useState(20);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [stats, setStats] = useState({
    profileViews: 0,
    interests: 0,
    messages: 0,
    matches: 0
  });

  // ✅ CHECK IF USER JUST REGISTERED AND SHOW MODAL
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

  // Check profile completion percentage
  useEffect(() => {
    checkProfileCompletion();
  }, [currentUser]);

  const checkProfileCompletion = async () => {
    try {
      const response = await profileService.getMyProfile();
      
      if (response.success && response.data) {
        const profile = response.data;
        let completed = 20;

        if (profile.personalDetails?.heightCm) completed += 15;
        if (profile.religiousDetails?.religion) completed += 10;
        if (profile.educationDetails?.highestEducation) completed += 15;
        if (profile.professionalDetails?.occupation) completed += 15;
        if (profile.familyDetails?.currentResidenceCity) completed += 15;
        if (profile.lifestylePreferences?.aboutMe) completed += 10;

        setCompletionPercentage(completed);
      }
    } catch (error) {
      setCompletionPercentage(20);
    }
  };

  // Fetch profiles on component mount
  useEffect(() => {
    fetchProfiles();
    
    setStats({
      profileViews: Math.floor(Math.random() * 50) + 10,
      interests: Math.floor(Math.random() * 15) + 3,
      messages: Math.floor(Math.random() * 10) + 2,
      matches: Math.floor(Math.random() * 8) + 1
    });
  }, [currentUser]);

  const fetchProfiles = async (filterType?: string) => {
    try {
      setLoading(true);
      setError('');
      
      console.log('📥 Fetching profiles with filter type:', filterType);
      console.log('👤 Current User ID:', currentUser?.id);
      
      // Build query string based on filter
      let queryString = 'page=1&limit=50&sortBy=createdAt&sortOrder=desc';
      
      if (filterType === 'religion' && currentUser?.religiousDetails?.religion) {
        queryString += `&religion=${currentUser.religiousDetails.religion}`;
      } else if (filterType === 'city' && currentUser?.familyDetails?.currentResidenceCity) {
        queryString += `&city=${currentUser.familyDetails.currentResidenceCity}`;
      } else if (filterType === 'recommended') {
        if (currentUser?.religiousDetails?.religion && currentUser?.familyDetails?.currentResidenceCity) {
          queryString += `&religion=${currentUser.religiousDetails.religion}&city=${currentUser.familyDetails.currentResidenceCity}`;
        }
      }
      
      const apiUrl = `http://localhost:5000/api/profile/list?${queryString}`;
      console.log('🌐 API URL:', apiUrl);
      
      const response = await fetch(apiUrl);
      const data = await response.json();
      
      console.log('📦 API Response:', data);
      
      if (data.success && data.data) {
        // 🔥 FILTER OUT CURRENT USER'S PROFILE
        const filteredProfiles = (data.data || []).filter((profile: CompleteProfile) => {
          const profileUserId = profile.userId || profile.id || profile._id;
          const currentUserId = currentUser?.id;
          
          console.log('🔍 Comparing profile:', {
            profileUserId,
            currentUserId,
            profileName: profile.personalDetails?.fullName || 'Unknown',
            isCurrentUser: profileUserId === currentUserId
          });
          
          return profileUserId !== currentUserId;
        });
        
        console.log('✅ Total profiles from API:', data.data.length);
        console.log('✅ Filtered profiles (excluding own):', filteredProfiles.length);
        
        setProfiles(filteredProfiles);
      } else {
        console.log('⚠️ No profiles in response');
        setProfiles([]);
      }
    } catch (err: any) {
      console.error('❌ Error fetching profiles:', err);
      setError(err.message || 'Failed to load profiles');
      setProfiles([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterByRecentlyJoined = async () => {
    setActiveFilter('recentlyJoined');
    await fetchProfiles('recentlyJoined');
  };

  const handleFilterByCity = async () => {
    setActiveFilter('city');
    await fetchProfiles('city');
  };

  const handleShowAll = async () => {
    setActiveFilter('all');
    await fetchProfiles('all');
  };

  const handleRecommended = async () => {
    setActiveFilter('recommended');
    await fetchProfiles('recommended');
  };

  const handleSendInterest = (profileId: string) => {
    alert('Interest sent successfully!');
  };

  const handleMessage = (profileId: string) => {
    onNavigate('messages', { profileId });
  };

  return (
    <div className="space-y-8">
      {/* ✅ PROFILE COMPLETION MODAL */}
      <ProfileCompletionModal
        isOpen={showCompletionModal}
        onClose={() => setShowCompletionModal(false)}
        onComplete={() => onNavigate('profile-setup')}
      />

      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-rose-600 to-pink-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {currentUser?.fullName?.split(' ')[0]}!
        </h1>
        <p className="text-rose-100">
          Here are your personalized matches based on your preferences
        </p>
        <div className="mt-4 flex items-center gap-4 flex-wrap">
          {completionPercentage < 100 && (
            <button
              onClick={() => setShowCompletionModal(true)}
              className="inline-block bg-white/20 px-4 py-2 rounded-full hover:bg-white/30 transition-colors cursor-pointer"
            >
              Profile Completion: {completionPercentage}%
            </button>
          )}
          
          {completionPercentage === 100 && (
            <div className="inline-flex items-center gap-2 bg-green-500/20 px-4 py-2 rounded-full">
              <span className="text-sm">✓ Profile Complete</span>
            </div>
          )}
          
          {completionPercentage < 100 && (
            <button 
              onClick={() => onNavigate("profile-setup")} 
              className="bg-rose-700 text-white px-6 py-2 rounded-lg font-semibold hover:bg-rose-800 transition-colors"
            >
              Complete Profile
            </button>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <Eye className="h-8 w-8 text-blue-600" />
            <TrendingUp className="h-5 w-5 text-green-500" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{stats.profileViews}</div>
          <div className="text-sm text-gray-600">Profile Views</div>
        </div>

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

      {/* View Requests Card - Clickable */}
      <div 
        onClick={() => onNavigate('requests')}
        className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all cursor-pointer group relative overflow-hidden"
      >
        {/* Background gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-pink-600 opacity-0 group-hover:opacity-5 transition-opacity"></div>
        
        <div className="flex items-center justify-between relative z-10">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <UserPlus className="h-6 w-6 text-rose-600" />
              View Requests
            </h3>
            <p className="text-gray-600">3 new connection requests waiting</p>
          </div>
          
          {/* Badge */}
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-r from-rose-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <UserPlus className="h-10 w-10 text-white" />
            </div>
            <span className="absolute -top-2 -right-2 bg-gradient-to-r from-rose-600 to-pink-600 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
              3 New
            </span>
          </div>
        </div>
      </div>

      {/* Profiles Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {activeFilter === 'all' && 'All Profiles'}
            {activeFilter === 'recommended' && 'Recommended Matches'}
            {activeFilter === 'religion' && 'Same Religion'}
            {activeFilter === 'city' && 'Same City'}
          </h2>
          <div className="text-sm text-gray-600">
            Showing {profiles.length} profile{profiles.length !== 1 ? 's' : ''}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700">{error}</p>
            <button
              onClick={() => fetchProfiles()}
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
                  {activeFilter === 'all' 
                    ? 'No profiles available at the moment'
                    : 'Try different filters to find matches'}
                </p>
                <div className="flex justify-center gap-3">
                  {activeFilter !== 'all' && (
                    <button
                      onClick={handleShowAll}
                      className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                    >
                      View All Profiles
                    </button>
                  )}
                  <button
                    onClick={() => onNavigate('profile-setup')}
                    className="px-6 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700"
                  >
                    Complete Your Profile
                  </button>
                </div>
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