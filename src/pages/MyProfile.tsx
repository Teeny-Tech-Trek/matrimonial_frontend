// src/pages/MyProfile.tsx
import React, { useEffect, useState } from 'react';
import { 
  User, Heart, Briefcase, GraduationCap, Home, Activity, 
  Edit, Camera, CheckCircle, MapPin, Phone, Mail, Loader2 
} from 'lucide-react';
import profileService from '../services/profile.service';
import { useAuth } from '../context/AuthContext';

interface MyProfileProps {
  onNavigate: (page: string, data?: any) => void;
}

export const MyProfile: React.FC<MyProfileProps> = ({ onNavigate }) => {
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch my profile on mount
  useEffect(() => {
    fetchMyProfile();
  }, []);

  const fetchMyProfile = async () => {
    try {
      setLoading(true);
      setError('');
      
      console.log('📥 Fetching my profile...');
      const response = await profileService.getMyProfile();
      
      if (response.success && response.data) {
        console.log('✅ Profile loaded:', response.data);
        setProfile(response.data);
      }
    } catch (err: any) {
      console.error('❌ Error loading profile:', err);
      setError(err.message || 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  // Calculate age from date of birth
  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-rose-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-4">
            <p className="text-red-700 mb-4">{error}</p>
            <button
              onClick={fetchMyProfile}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
          <button
            onClick={() => onNavigate('profile-setup')}
            className="px-6 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700"
          >
            Complete Profile
          </button>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Profile Found</h3>
          <p className="text-gray-600 mb-4">Complete your profile to get started</p>
          <button
            onClick={() => onNavigate('profile-setup')}
            className="px-6 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700"
          >
            Complete Profile
          </button>
        </div>
      </div>
    );
  }

  const age = profile.dateOfBirth ? calculateAge(profile.dateOfBirth) : 'N/A';

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header with Edit Button */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 bg-gradient-to-r from-rose-600 to-pink-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                {profile.fullName?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{profile.fullName}</h1>
                <p className="text-gray-600">Profile ID: {profile._id?.slice(-8)}</p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('profile-setup')}
              className="flex items-center gap-2 px-6 py-3 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors"
            >
              <Edit className="h-5 w-5" />
              Edit Profile
            </button>
          </div>
        </div>

        {/* Basic Information */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-2 mb-6">
            <User className="h-6 w-6 text-rose-600" />
            <h2 className="text-2xl font-bold text-gray-900">Basic Information</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-semibold text-gray-500">Full Name</label>
              <p className="text-lg text-gray-900">{profile.fullName || 'Not provided'}</p>
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-500">Age</label>
              <p className="text-lg text-gray-900">{age} years</p>
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-500">Gender</label>
              <p className="text-lg text-gray-900 capitalize">{profile.gender || 'Not provided'}</p>
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-500">Profile Created For</label>
              <p className="text-lg text-gray-900">{profile.profileCreatedFor || 'Not provided'}</p>
            </div>
          </div>
        </div>

        {/* Personal Details */}
        {profile.personalDetails && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex items-center gap-2 mb-6">
              <User className="h-6 w-6 text-rose-600" />
              <h2 className="text-2xl font-bold text-gray-900">Personal Details</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="text-sm font-semibold text-gray-500">Height</label>
                <p className="text-lg text-gray-900">{profile.personalDetails.heightCm} cm</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-500">Marital Status</label>
                <p className="text-lg text-gray-900 capitalize">
                  {profile.personalDetails.maritalStatus?.replace('_', ' ') || 'Not provided'}
                </p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-500">Mother Tongue</label>
                <p className="text-lg text-gray-900">{profile.personalDetails.motherTongue || 'Not provided'}</p>
              </div>
            </div>
          </div>
        )}

        {/* Religious Details */}
        {profile.religiousDetails && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex items-center gap-2 mb-6">
              <Heart className="h-6 w-6 text-rose-600" />
              <h2 className="text-2xl font-bold text-gray-900">Religious Background</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-semibold text-gray-500">Religion</label>
                <p className="text-lg text-gray-900">{profile.religiousDetails.religion || 'Not provided'}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-500">Caste</label>
                <p className="text-lg text-gray-900">{profile.religiousDetails.caste || 'Not provided'}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-500">Sub Caste</label>
                <p className="text-lg text-gray-900">{profile.religiousDetails.subCaste || 'Not provided'}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-500">Manglik</label>
                <p className="text-lg text-gray-900">
                  {profile.religiousDetails.manglik === true ? 'Yes' : profile.religiousDetails.manglik === false ? 'No' : 'Not provided'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Education Details */}
        {profile.educationDetails && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex items-center gap-2 mb-6">
              <GraduationCap className="h-6 w-6 text-rose-600" />
              <h2 className="text-2xl font-bold text-gray-900">Education</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-semibold text-gray-500">Highest Education</label>
                <p className="text-lg text-gray-900">{profile.educationDetails.highestEducation || 'Not provided'}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-500">Field of Study</label>
                <p className="text-lg text-gray-900">{profile.educationDetails.educationField || 'Not provided'}</p>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-semibold text-gray-500">Institution</label>
                <p className="text-lg text-gray-900">{profile.educationDetails.institutionName || 'Not provided'}</p>
              </div>
            </div>
          </div>
        )}

        {/* Professional Details */}
        {profile.professionalDetails && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex items-center gap-2 mb-6">
              <Briefcase className="h-6 w-6 text-rose-600" />
              <h2 className="text-2xl font-bold text-gray-900">Professional Details</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-semibold text-gray-500">Occupation</label>
                <p className="text-lg text-gray-900">{profile.professionalDetails.occupation || 'Not provided'}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-500">Organization</label>
                <p className="text-lg text-gray-900">{profile.professionalDetails.organizationName || 'Not provided'}</p>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-semibold text-gray-500">Annual Income</label>
                <p className="text-lg text-gray-900">
                  {profile.professionalDetails.annualIncomeMin && profile.professionalDetails.annualIncomeMax
                    ? `₹${profile.professionalDetails.annualIncomeMin.toLocaleString()} - ₹${profile.professionalDetails.annualIncomeMax.toLocaleString()}`
                    : 'Not provided'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Family Details */}
        {profile.familyDetails && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex items-center gap-2 mb-6">
              <Home className="h-6 w-6 text-rose-600" />
              <h2 className="text-2xl font-bold text-gray-900">Family Details</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-semibold text-gray-500">Current City</label>
                <p className="text-lg text-gray-900">{profile.familyDetails.currentResidenceCity || 'Not provided'}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-500">State</label>
                <p className="text-lg text-gray-900">{profile.familyDetails.currentResidenceState || 'Not provided'}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-500">Family Type</label>
                <p className="text-lg text-gray-900">{profile.familyDetails.familyType || 'Not provided'}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-500">Siblings</label>
                <p className="text-lg text-gray-900">
                  {profile.familyDetails.brothers || 0} Brother(s), {profile.familyDetails.sisters || 0} Sister(s)
                </p>
              </div>
              {profile.familyDetails.fatherName && (
                <>
                  <div>
                    <label className="text-sm font-semibold text-gray-500">Father's Name</label>
                    <p className="text-lg text-gray-900">{profile.familyDetails.fatherName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-500">Father's Occupation</label>
                    <p className="text-lg text-gray-900">{profile.familyDetails.fatherOccupation || 'Not provided'}</p>
                  </div>
                </>
              )}
              {profile.familyDetails.motherName && (
                <>
                  <div>
                    <label className="text-sm font-semibold text-gray-500">Mother's Name</label>
                    <p className="text-lg text-gray-900">{profile.familyDetails.motherName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-500">Mother's Occupation</label>
                    <p className="text-lg text-gray-900">{profile.familyDetails.motherOccupation || 'Not provided'}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Lifestyle Preferences */}
        {profile.lifestylePreferences && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex items-center gap-2 mb-6">
              <Activity className="h-6 w-6 text-rose-600" />
              <h2 className="text-2xl font-bold text-gray-900">Lifestyle & Interests</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="text-sm font-semibold text-gray-500">Diet</label>
                <p className="text-lg text-gray-900">{profile.lifestylePreferences.diet || 'Not provided'}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-500">Smoking</label>
                <p className="text-lg text-gray-900">
                  {profile.lifestylePreferences.smoking === true ? 'Yes' : profile.lifestylePreferences.smoking === false ? 'No' : 'Not provided'}
                </p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-500">Drinking</label>
                <p className="text-lg text-gray-900">
                  {profile.lifestylePreferences.drinking === true ? 'Yes' : profile.lifestylePreferences.drinking === false ? 'No' : 'Not provided'}
                </p>
              </div>
            </div>

            {profile.lifestylePreferences.hobbies && profile.lifestylePreferences.hobbies.length > 0 && (
              <div className="mb-6">
                <label className="text-sm font-semibold text-gray-500 block mb-3">Hobbies & Interests</label>
                <div className="flex flex-wrap gap-2">
                  {profile.lifestylePreferences.hobbies.map((hobby: string, index: number) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-rose-100 text-rose-700 rounded-full text-sm font-medium"
                    >
                      {hobby}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {profile.lifestylePreferences.aboutMe && (
              <div className="mb-6">
                <label className="text-sm font-semibold text-gray-500 block mb-2">About Me</label>
                <p className="text-gray-900 leading-relaxed">{profile.lifestylePreferences.aboutMe}</p>
              </div>
            )}

            {profile.lifestylePreferences.partnerExpectations && (
              <div>
                <label className="text-sm font-semibold text-gray-500 block mb-2">Partner Expectations</label>
                <p className="text-gray-900 leading-relaxed">{profile.lifestylePreferences.partnerExpectations}</p>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => onNavigate('dashboard')}
            className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
          >
            Back to Dashboard
          </button>
          <button
            onClick={() => onNavigate('profile-setup')}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};