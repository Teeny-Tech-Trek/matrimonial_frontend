// src/pages/MyProfile.tsx
import React, { useEffect, useState } from 'react';
import { 
  User, Heart, Briefcase, GraduationCap, Home, Activity, 
  Edit, Loader2, X, AlertCircle
} from 'lucide-react';
import profileService from '../services/profile.service';
import { useAuth } from '../context/AuthContext';

interface MyProfileProps {
  onNavigate: (page: string, data?: any) => void;
}

// ==========================================
// PROFILE COMPLETION MODAL COMPONENT
// ==========================================
const ProfileCompletionModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  onNavigate: (page: string) => void;
  completionPercentage: number;
  missingFields: string[];
}> = ({ isOpen, onClose, onComplete, onNavigate, completionPercentage, missingFields }) => {
  const [skipped, setSkipped] = useState(false);

  const handleSkip = () => {
    const skipData = {
      skipped: true,
      skippedAt: new Date().toISOString(),
      profileCompletion: completionPercentage
    };
    localStorage.setItem('profileCompletionSkipped', JSON.stringify(skipData));
    setSkipped(true);
    onClose();
    onNavigate('dashboard');
  };
   
  const getDisplayPercentage = (percentage: number) => {
    return percentage === 0 ? 20 : percentage;
  };

  if (!isOpen || completionPercentage === 100 || skipped) return null;

  return (
    <div
      className="
        fixed inset-0 bg-black/50 backdrop-blur-sm z-50 
        p-2 sm:p-4 
        pt-4 pl-6 sm:pt-0 
        sm:flex sm:items-center sm:justify-center"
    >
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-[95%] sm:max-w-4xl w-full overflow-hidden animate-scale-in max-h-[90vh] flex flex-col">
        <div className="bg-gradient-to-r from-rose-600 to-pink-600 p-4 sm:p-6 text-white relative flex-shrink-0">
          <button
            onClick={handleSkip}
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
        <div className="px-2 pb-2 pt-4 sm:p-6 overflow-y-auto flex-1 ">
          <div className="flex flex-col gap-2 sm:gap-6 md:grid md:grid-cols-3 -mt-2 sm:mt-0">
            <div className="flex flex-col items-center justify-center md:col-span-3 lg:col-span-1">
              <div className="relative">
                <svg className="w-14 h-14 sm:w-32 sm:h-32 md:w-40 md:h-40 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#FEE2E2"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#E11D48"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${((getDisplayPercentage(completionPercentage)) / 100) * 251.2} 251.2`}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-base sm:text-3xl md:text-4xl font-bold text-gray-900">{getDisplayPercentage(completionPercentage)}%</div>
                    <div className="text-[7px] sm:text-xs md:text-sm text-gray-600">Complete</div>
                  </div>
                </div>
              </div>
              <p className="text-[7px] sm:text-xs md:text-sm text-gray-500 mt-1 sm:mt-3 md:mt-4 text-center px-2">
                Complete all sections to maximize your matches
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                Sections to Complete:
              </h3>
              <div className="space-y-2">
                {missingFields.length > 0 ? (
                  missingFields.map((field, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-2 rounded-lg"
                    >
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
              {/* <div className="bg-blue-50 border border-blue-200 rounded-lg p-1.5 sm:p-4 mb-1.5 sm:mb-4">
                <h4 className="text-[9px] sm:text-sm font-semibold text-blue-900 mb-0.5 sm:mb-2">
                  Why complete?
                </h4>
                <ul className="space-y-0.5 sm:space-y-1 text-[7px] sm:text-xs text-blue-800">
                  <li>✓ Better match recommendations</li>
                  <li>✓ 10x more profile visibility</li>
                  <li>✓ Receive more interests</li>
                  <li>✓ Build trust with matches</li>
                </ul>
              </div> */}
              <div className="space-y-1 sm:space-y-2">
                <button
                  onClick={() => {
                    onComplete();
                  }}
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
                <p className="text-[7px] sm:text-xs text-center text-gray-500">
                  You can complete your profile anytime
                </p>
              </div>
            </div>
          </div>
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
// ==========================================
// MY PROFILE COMPONENT
// ==========================================
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
      } else {
        // No profile found
        setProfile(null);
      }
    } catch (err: any) {
      console.error('❌ Error loading profile:', err);
      setError(err.message || 'Failed to load profile');
      setProfile(null);
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

  // Show modal ONLY if no profile exists or error occurred
  if (!profile || error) {
    return (
      <ProfileCompletionModal
        isOpen={true}
        onClose={() => {}}
        onComplete={() => onNavigate('profile-setup')}
        onNavigate={onNavigate}
        completionPercentage={0}
        missingFields={[
          'Basic Information',
          'Personal Details',
          'Religious Background',
          'Education Details',
          'Professional Details',
          'Family Details',
          'Lifestyle & Interests'
        ]}
      />
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
              className="flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-6 sm:py-3 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors text-sm sm:text-base"
            >
              <Edit className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="hidden xs:inline sm:inline">Edit Profile</span>
              <span className="inline xs:hidden sm:hidden">Edit</span>
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