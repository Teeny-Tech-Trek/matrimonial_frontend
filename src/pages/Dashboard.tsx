import React, { useEffect, useState } from 'react';
import { Heart, Eye, MessageCircle, Star, TrendingUp, Users } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { CompleteProfile } from '../types';
import { ProfileCard } from '../components/ProfileCard';

interface DashboardProps {
  onNavigate: (page: string, data?: any) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { currentUser } = useAuth();
  const [profiles, setProfiles] = useState<CompleteProfile[]>([]);
  const [stats, setStats] = useState({
    profileViews: 0,
    interests: 0,
    messages: 0,
    matches: 0
  });

  useEffect(() => {
    const storedProfiles = JSON.parse(localStorage.getItem('profiles') || '[]');
    const filteredProfiles = storedProfiles.filter((p: CompleteProfile) =>
      p.id !== currentUser?.id &&
      p.gender !== currentUser?.gender &&
      p.isActive
    );
    setProfiles(filteredProfiles.slice(0, 12));

    setStats({
      profileViews: Math.floor(Math.random() * 50) + 10,
      interests: Math.floor(Math.random() * 15) + 3,
      messages: Math.floor(Math.random() * 10) + 2,
      matches: Math.floor(Math.random() * 8) + 1
    });
  }, [currentUser]);

  const handleSendInterest = (profileId: string) => {
    alert('Interest sent successfully!');
  };

  const handleMessage = (profileId: string) => {
    onNavigate('messages', { profileId });
  };

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-rose-600 to-pink-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {currentUser?.fullName?.split(' ')[0]}!</h1>
        <p className="text-rose-100">Here are your personalized matches based on your preferences</p>
        <div className="mt-4 inline-block bg-white/20 px-4 py-2 rounded-full">
          Profile Completion: {currentUser?.profileCompletionPercentage || 20}%
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <Eye className="h-8 w-8 text-blue-600" />
            <TrendingUp className="h-5 w-5 text-green-500" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{stats.profileViews}</div>
          <div className="text-sm text-gray-600">Profile Views</div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <Heart className="h-8 w-8 text-rose-600 fill-rose-600" />
            <TrendingUp className="h-5 w-5 text-green-500" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{stats.interests}</div>
          <div className="text-sm text-gray-600">Interests Received</div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <MessageCircle className="h-8 w-8 text-green-600" />
            <TrendingUp className="h-5 w-5 text-green-500" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{stats.messages}</div>
          <div className="text-sm text-gray-600">New Messages</div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <Star className="h-8 w-8 text-amber-600 fill-amber-600" />
            <TrendingUp className="h-5 w-5 text-green-500" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{stats.matches}</div>
          <div className="text-sm text-gray-600">Mutual Matches</div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Recommended Matches</h2>
          <button
            onClick={() => onNavigate('search')}
            className="text-rose-600 font-semibold hover:underline flex items-center space-x-1"
          >
            <span>View All</span>
            <Users className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profiles.map(profile => (
            <ProfileCard
              key={profile.id}
              profile={profile}
              onViewProfile={(id) => onNavigate('profile-view', { profileId: id })}
              onSendInterest={handleSendInterest}
              onMessage={handleMessage}
            />
          ))}
        </div>

        {profiles.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No matches found</h3>
            <p className="text-gray-600 mb-4">Complete your profile to get better matches</p>
            <button
              onClick={() => onNavigate('profile')}
              className="px-6 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700"
            >
              Complete Profile
            </button>
          </div>
        )}
      </div>

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