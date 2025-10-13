import React from 'react';
import { Heart, MapPin, Briefcase, GraduationCap, Users, CheckCircle, Eye, MessageCircle } from 'lucide-react';
import { CompleteProfile } from '../types';

interface ProfileCardProps {
  profile: CompleteProfile;
  onViewProfile: (id: string) => void;
  onSendInterest?: (id: string) => void;
  onMessage?: (id: string) => void;
  showActions?: boolean;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  profile,
  onViewProfile,
  onSendInterest,
  onMessage,
  showActions = true
}) => {
  const primaryPhoto = profile.photos.find(p => p.isPrimary) || profile.photos[0];
  const age = new Date().getFullYear() - new Date(profile.dateOfBirth).getFullYear();

  const getTierBadge = () => {
    const tier = profile.subscription?.tier || 'free';
    const colors = {
      free: 'bg-gray-100 text-gray-700',
      basic: 'bg-blue-100 text-blue-700',
      premium: 'bg-purple-100 text-purple-700',
      elite: 'bg-amber-100 text-amber-700'
    };
    return (
      <span className={`px-2 py-1 text-xs font-semibold rounded ${colors[tier]}`}>
        {tier.toUpperCase()}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div className="relative">
        <img
          src={primaryPhoto?.photoUrl || 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800'}
          alt={profile.fullName}
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-4 right-4">
          {getTierBadge()}
        </div>
        {profile.isVerified && (
          <div className="absolute top-4 left-4 bg-green-500 text-white px-2 py-1 rounded flex items-center space-x-1 text-xs font-medium">
            <CheckCircle className="h-3 w-3" />
            <span>Verified</span>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{profile.fullName}</h3>
            <p className="text-gray-600">{age} years</p>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          {profile.personalDetails && (
            <div className="flex items-center text-sm text-gray-600">
              <Users className="h-4 w-4 mr-2 flex-shrink-0" />
              <span>{profile.personalDetails.heightCm} cm, {profile.personalDetails.maritalStatus.replace('_', ' ')}</span>
            </div>
          )}
          {profile.educationDetails && (
            <div className="flex items-center text-sm text-gray-600">
              <GraduationCap className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="truncate">{profile.educationDetails.highestEducation} in {profile.educationDetails.educationField}</span>
            </div>
          )}
          {profile.professionalDetails && (
            <div className="flex items-center text-sm text-gray-600">
              <Briefcase className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="truncate">{profile.professionalDetails.occupation}</span>
            </div>
          )}
          {profile.familyDetails && (
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="truncate">{profile.familyDetails.currentResidenceCity}, {profile.familyDetails.currentResidenceState}</span>
            </div>
          )}
        </div>

        {profile.religiousDetails && (
          <div className="mb-4 text-sm">
            <span className="inline-block bg-rose-50 text-rose-700 px-3 py-1 rounded-full">
              {profile.religiousDetails.religion}
              {profile.religiousDetails.caste && ` - ${profile.religiousDetails.caste}`}
            </span>
          </div>
        )}

        {showActions && (
          <div className="flex gap-2">
            <button
              onClick={() => onViewProfile(profile._id || profile.id)}
              className="flex-1 flex items-center justify-center space-x-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Eye className="h-4 w-4" />
              <span>View Profile</span>
            </button>
            {onSendInterest && (
              <button
                onClick={() => onSendInterest(profile.id)}
                className="flex items-center justify-center px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors"
              >
                <Heart className="h-4 w-4" />
              </button>
            )}
            {onMessage && (
              <button
                onClick={() => onMessage(profile.id)}
                className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};