// src/components/profileView.tsx (or src/pages/ProfileView.tsx)
import React, { useEffect, useState } from 'react';
import { Heart, MapPin, Briefcase, GraduationCap, Users, Home, Utensils, Activity, MessageCircle, Phone, Mail, Calendar, Ruler, CheckCircle, ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import { CompleteProfile } from '../types';
import profileService from '../services/profile.service';

interface ProfileViewProps {
  profileId: string;
  onNavigate: (page: string, data?: any) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ profileId, onNavigate }) => {
  const [profile, setProfile] = useState<CompleteProfile | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // ✅ FETCH PROFILE FROM API USING /:id ENDPOINT
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError('');
        
        
        // ✅ THIS CALLS: GET /api/profile/:id
        const response = await profileService.getProfileById(profileId);
        
        
        if (response.success && response.data) {
          setProfile(response.data);
        } else {
          setError('Profile not found');
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    if (profileId) {
      fetchProfile();
    } else {
      setError('No profile ID provided');
      setLoading(false);
    }
  }, [profileId]);

  // Loading State
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-rose-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error || !profile) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => onNavigate('dashboard')}
          className="flex items-center gap-2 text-rose-600 hover:text-rose-700 font-semibold"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Dashboard
        </button>
        
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Profile Not Found</h2>
            <p className="text-gray-600 mb-6">{error || 'The profile you are looking for does not exist.'}</p>
            <button
              onClick={() => onNavigate('dashboard')}
              className="px-6 py-3 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const age = new Date().getFullYear() - new Date(profile.dateOfBirth).getFullYear();
  const photos = profile.photos?.filter(p => p.status === 'approved') || [];

  return (
    <div className="space-y-6">
      <button
        onClick={() => onNavigate('dashboard')}
        className="flex items-center gap-2 text-rose-600 hover:text-rose-700 font-semibold transition-colors"
      >
        <ArrowLeft className="h-5 w-5" />
        Back to Matches
      </button>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="relative">
          {photos.length > 0 ? (
            <>
              <img
                src={photos[currentPhotoIndex]?.photoUrl}
                alt={profile.fullName}
                className="w-full h-96 object-cover"
              />
              {photos.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {photos.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPhotoIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentPhotoIndex ? 'bg-white w-8' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-96 bg-gradient-to-br from-rose-400 to-pink-400 flex items-center justify-center">
              <Users className="h-20 w-20 text-white" />
            </div>
          )}

          {profile.isVerified && (
            <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full flex items-center space-x-1 shadow-lg">
              <CheckCircle className="h-4 w-4" />
              <span className="font-medium">Verified</span>
            </div>
          )}

          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
            <span className="font-semibold text-gray-900">
              {profile.subscription?.tier?.toUpperCase() || 'FREE'}
            </span>
          </div>
        </div>

        <div className="p-8">
          <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{profile.fullName}</h1>
              <p className="text-xl text-gray-600">{age} years • {profile.gender}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => alert('Interest sent! This will be connected to backend in next phase.')}
                className="flex items-center space-x-2 px-6 py-3 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors shadow-lg hover:shadow-xl"
              >
                <Heart className="h-5 w-5" />
                <span>Send Interest</span>
              </button>
              <button
                onClick={() => onNavigate('messages', { profileId: profile._id || profile.id })}
                className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
              >
                <MessageCircle className="h-5 w-5" />
                <span>Message</span>
              </button>
            </div>
          </div>

          {profile.lifestylePreferences?.aboutMe && (
            <div className="mb-8 p-6 bg-gray-50 rounded-xl">
              <h2 className="text-xl font-bold text-gray-900 mb-3">About</h2>
              <p className="text-gray-700 leading-relaxed">{profile.lifestylePreferences.aboutMe}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Basic Information */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Basic Information</h2>
              <div className="space-y-3">
                {profile.personalDetails && (
                  <>
                    {profile.personalDetails.heightCm && (
                      <div className="flex items-center space-x-3">
                        <Ruler className="h-5 w-5 text-rose-600" />
                        <span className="text-gray-700">
                          {profile.personalDetails.heightCm} cm ({Math.floor(profile.personalDetails.heightCm / 30.48)}'{Math.round((profile.personalDetails.heightCm % 30.48) / 2.54)}")
                        </span>
                      </div>
                    )}
                    {profile.personalDetails.maritalStatus && (
                      <div className="flex items-center space-x-3">
                        <Users className="h-5 w-5 text-rose-600" />
                        <span className="text-gray-700 capitalize">
                          {profile.personalDetails.maritalStatus.replace('_', ' ')}
                        </span>
                      </div>
                    )}
                    {profile.personalDetails.motherTongue && (
                      <div className="flex items-center space-x-3">
                        <Activity className="h-5 w-5 text-rose-600" />
                        <span className="text-gray-700">{profile.personalDetails.motherTongue}</span>
                      </div>
                    )}
                  </>
                )}
                {profile.profileCreatedFor && (
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-rose-600" />
                    <span className="text-gray-700">Created for {profile.profileCreatedFor}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Religious Background */}
            {profile.religiousDetails && (
              <div className="bg-gray-50 rounded-xl p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Religious Background</h2>
                <div className="space-y-3 text-gray-700">
                  {profile.religiousDetails.religion && (
                    <p><span className="font-medium">Religion:</span> {profile.religiousDetails.religion}</p>
                  )}
                  {profile.religiousDetails.caste && (
                    <p><span className="font-medium">Caste:</span> {profile.religiousDetails.caste}</p>
                  )}
                  {profile.religiousDetails.subCaste && (
                    <p><span className="font-medium">Sub Caste:</span> {profile.religiousDetails.subCaste}</p>
                  )}
                  {profile.religiousDetails.manglik !== undefined && (
                    <p><span className="font-medium">Manglik:</span> {profile.religiousDetails.manglik ? 'Yes' : 'No'}</p>
                  )}
                </div>
              </div>
            )}

            {/* Education */}
            {profile.educationDetails && (
              <div className="bg-gray-50 rounded-xl p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Education</h2>
                <div className="flex items-start space-x-3">
                  <GraduationCap className="h-5 w-5 text-rose-600 mt-1" />
                  <div className="text-gray-700">
                    {profile.educationDetails.highestEducation && (
                      <p className="font-medium">{profile.educationDetails.highestEducation}</p>
                    )}
                    {profile.educationDetails.educationField && (
                      <p>{profile.educationDetails.educationField}</p>
                    )}
                    {profile.educationDetails.institutionName && (
                      <p className="text-sm text-gray-600 mt-1">{profile.educationDetails.institutionName}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Professional Details */}
            {profile.professionalDetails && (
              <div className="bg-gray-50 rounded-xl p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Professional Details</h2>
                <div className="flex items-start space-x-3">
                  <Briefcase className="h-5 w-5 text-rose-600 mt-1" />
                  <div className="text-gray-700">
                    {profile.professionalDetails.occupation && (
                      <p className="font-medium">{profile.professionalDetails.occupation}</p>
                    )}
                    {profile.professionalDetails.organizationName && (
                      <p>{profile.professionalDetails.organizationName}</p>
                    )}
                    {profile.professionalDetails.annualIncomeMin && (
                      <p className="text-sm text-gray-600 mt-1">
                        ₹{(profile.professionalDetails.annualIncomeMin / 100000).toFixed(1)}L
                        {profile.professionalDetails.annualIncomeMax && 
                          ` - ₹${(profile.professionalDetails.annualIncomeMax / 100000).toFixed(1)}L`
                        } per year
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Family Details */}
            {profile.familyDetails && (
              <div className="md:col-span-2 bg-gray-50 rounded-xl p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Family Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                  {(profile.familyDetails.currentResidenceCity || profile.familyDetails.currentResidenceState) && (
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-rose-600 mt-1" />
                      <div>
                        <p className="font-medium">Location</p>
                        <p>{profile.familyDetails.currentResidenceCity}{profile.familyDetails.currentResidenceState && `, ${profile.familyDetails.currentResidenceState}`}</p>
                      </div>
                    </div>
                  )}
                  {profile.familyDetails.familyType && (
                    <div className="flex items-start space-x-3">
                      <Home className="h-5 w-5 text-rose-600 mt-1" />
                      <div>
                        <p className="font-medium">Family Type</p>
                        <p>{profile.familyDetails.familyType}</p>
                      </div>
                    </div>
                  )}
                  {profile.familyDetails.fatherName && (
                    <div>
                      <p><span className="font-medium">Father:</span> {profile.familyDetails.fatherName}</p>
                      {profile.familyDetails.fatherOccupation && (
                        <p className="text-sm text-gray-600">{profile.familyDetails.fatherOccupation}</p>
                      )}
                    </div>
                  )}
                  {profile.familyDetails.motherName && (
                    <div>
                      <p><span className="font-medium">Mother:</span> {profile.familyDetails.motherName}</p>
                      {profile.familyDetails.motherOccupation && (
                        <p className="text-sm text-gray-600">{profile.familyDetails.motherOccupation}</p>
                      )}
                    </div>
                  )}
                  {(profile.familyDetails.brothers !== undefined || profile.familyDetails.sisters !== undefined) && (
                    <div>
                      <p><span className="font-medium">Siblings:</span> {(profile.familyDetails.brothers || 0) + (profile.familyDetails.sisters || 0)} 
                        ({profile.familyDetails.brothers || 0} Brother{profile.familyDetails.brothers !== 1 ? 's' : ''}, 
                        {profile.familyDetails.sisters || 0} Sister{profile.familyDetails.sisters !== 1 ? 's' : ''})
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Lifestyle */}
            {profile.lifestylePreferences && (
              <div className="md:col-span-2 bg-gray-50 rounded-xl p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Lifestyle</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {profile.lifestylePreferences.diet && (
                    <div className="flex items-center space-x-3">
                      <Utensils className="h-5 w-5 text-rose-600" />
                      <span className="text-gray-700">{profile.lifestylePreferences.diet}</span>
                    </div>
                  )}
                  {profile.lifestylePreferences.smoking !== undefined && (
                    <div className="flex items-center space-x-3">
                      <Activity className="h-5 w-5 text-rose-600" />
                      <span className="text-gray-700">Smoking: {profile.lifestylePreferences.smoking ? 'Yes' : 'No'}</span>
                    </div>
                  )}
                  {profile.lifestylePreferences.drinking !== undefined && (
                    <div className="flex items-center space-x-3">
                      <Activity className="h-5 w-5 text-rose-600" />
                      <span className="text-gray-700">Drinking: {profile.lifestylePreferences.drinking ? 'Yes' : 'No'}</span>
                    </div>
                  )}
                </div>
                {profile.lifestylePreferences.hobbies && profile.lifestylePreferences.hobbies.length > 0 && (
                  <div className="mt-4">
                    <p className="font-medium text-gray-900 mb-2">Hobbies & Interests:</p>
                    <div className="flex flex-wrap gap-2">
                      {profile.lifestylePreferences.hobbies.map((hobby, idx) => (
                        <span key={idx} className="px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-sm">
                          {hobby}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Partner Expectations */}
            {profile.lifestylePreferences?.partnerExpectations && (
              <div className="md:col-span-2 bg-gray-50 rounded-xl p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Partner Expectations</h2>
                <p className="text-gray-700 leading-relaxed">{profile.lifestylePreferences.partnerExpectations}</p>
              </div>
            )}
          </div>

          {/* Contact Information Button */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <button
              onClick={() => alert('Contact information revealed! This feature requires premium membership. Will be implemented in next phase.')}
              className="w-full py-4 bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center space-x-2"
            >
              <Phone className="h-5 w-5" />
              <span>View Contact Information</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};