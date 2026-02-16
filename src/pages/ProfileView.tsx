import React, { useEffect, useState } from 'react';
import { Heart, MapPin, Briefcase, GraduationCap, Users, Home, Utensils, Activity, MessageCircle, Phone, Mail, Calendar, Ruler, CheckCircle, ArrowLeft, Loader2, AlertCircle, Image, Star, Award, Clock } from 'lucide-react';
import { CompleteProfile } from '../types';
import profileService from '../services/profile.service';

interface ProfileViewProps {
  profileId: string;
  onNavigate: (page: string, data?: any) => void;
}

// API Base URL for image handling
const API_BASE_URL = 'https://api.rsaristomatch.com/backend';

export const ProfileView: React.FC<ProfileViewProps> = ({ profileId, onNavigate }) => {
  const [profile, setProfile] = useState<CompleteProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Helper function to construct image URL
  function getImageUrl(photoUrl: string): string {
    if (!photoUrl) return '';
    
    if (photoUrl.startsWith('https://') || photoUrl.startsWith('http://')) {
      console.log(`✅ Using full S3 URL: ${photoUrl}`);
      return photoUrl;
    }
    
    if (photoUrl.startsWith('/')) {
      return `https://api.rsaristomatch.com/backend${photoUrl}`;
    }
    
    if (photoUrl.startsWith('uploads/')) {
      return `${API_BASE_URL}/${photoUrl}`;
    }
    
    console.warn(`⚠️ Unexpected URL format, trying local fallback: ${photoUrl}`);
    return `https://api.rsaristomatch.com/backend/uploads/${photoUrl}`;
  }

  // ✅ FETCH PROFILE FROM API USING /:id ENDPOINT
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError('');
        setImageErrors(new Set());

        const response = await profileService.getProfileById(profileId);
        console.log('🔍 Profile Response:', response);
        console.log('📸 Photos in response:', response.data?.photos);

        if (response.success && response.data) {
          setProfile(response.data);
          console.log('✅ Profile loaded successfully');
          console.log('🖼️ Total photos:', response.data.photos?.length || 0);
          response.data.photos?.forEach((photo, idx) => {
            const constructed = (typeof getImageUrl === 'function') 
              ? getImageUrl(photo.photoUrl) 
              : `${API_BASE_URL}/${photo.photoUrl}`;
            console.log(`Photo ${idx}:`, {
              photoUrl: photo.photoUrl,
              isPrimary: photo.isPrimary,
              status: photo.status,
              constructedUrl: constructed,
            });
          });
        } else {
          setError(response.message || 'Profile not found');
        }
      } catch (err: any) {
        console.error('❌ Error fetching profile:', err);
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

  // Handle image load errors
  const handleImageError = (photoUrl: string) => {
    console.warn(`⚠️ Image failed to load: ${photoUrl}`);
    setImageErrors(prev => new Set(prev).add(photoUrl));
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-rose-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading profile...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error || !profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md bg-white rounded-2xl shadow-xl p-8">
          <AlertCircle className="w-16 h-16 text-rose-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Profile Not Found</h2>
          <p className="text-gray-600 mb-6">{error || 'The profile you are looking for does not exist.'}</p>
          <button
            onClick={() => onNavigate('dashboard')}
            className="px-6 py-3 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors font-medium"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const age = new Date().getFullYear() - new Date(profile.dateOfBirth).getFullYear();

  // ✅ EXTRACT DISPLAY PICTURE AND GALLERY PHOTOS
  const allPhotos = profile.photos?.filter(p => p.status !== 'rejected') || [];
  const displayPicture = allPhotos.find(photo => photo.isPrimary);
  const galleryPhotos = allPhotos.filter(photo => !photo.isPrimary);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');
        
        * {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        
        .serif-heading {
          font-family: 'Cormorant Garamond', serif;
        }
        
        .profile-card {
          background: white;
          border-radius: 24px;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
        }
        
        .action-btn {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .action-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
        }
        
        .gallery-image {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }
        
        .gallery-image:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(244, 63, 94, 0.2);
        }
        
        .info-row {
          border-bottom: 1px solid #f3f4f6;
          padding: 16px 0;
        }
        
        .info-row:last-child {
          border-bottom: none;
        }
        
        .section-header {
          position: relative;
          padding-bottom: 12px;
          margin-bottom: 24px;
        }
        
        .section-header::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 60px;
          height: 3px;
          background: linear-gradient(to right, #f43f5e, #ec4899);
          border-radius: 2px;
        }
        
        .badge {
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        
        .decorative-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          opacity: 0.4;
          animation: float 20s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
      `}</style>

      {/* Decorative Background Blobs */}
      <div className="decorative-blob w-96 h-96 bg-rose-300 top-0 right-0" style={{ animationDelay: '0s' }} />
      <div className="decorative-blob w-80 h-80 bg-pink-300 bottom-0 left-0" style={{ animationDelay: '7s' }} />

      <div className="max-w-6xl mx-auto px-4 py-8 relative z-10">
        {/* Back Button */}
        <button
          onClick={() => onNavigate('dashboard')}
          className="mb-6 flex items-center gap-2 text-gray-700 hover:text-rose-600 transition-colors font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Matches</span>
        </button>

        {/* Main Profile Card */}
        <div className="profile-card overflow-hidden mb-6">
          <div className="grid lg:grid-cols-5 gap-0">
            {/* Left: Display Picture */}
            <div className="lg:col-span-2 relative">
              {displayPicture?.photoUrl && !imageErrors.has(displayPicture.photoUrl) ? (
                <div className="relative h-full min-h-[400px] lg:min-h-[600px]">
                  {console.log('🎬 Rendering display picture:', {
                    photoUrl: displayPicture.photoUrl,
                    constructedUrl: getImageUrl(displayPicture.photoUrl)
                  })}
                  <img
                    src={getImageUrl(displayPicture.photoUrl)}
                    alt={profile.fullName}
                    className="w-full h-full object-cover"
                    onError={() => handleImageError(displayPicture.photoUrl)}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-black/20" />
                  
                  {/* Badges - Top Right */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    {profile.isVerified && (
                      <div className="badge bg-white/90 text-rose-600 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg">
                        <CheckCircle className="w-3.5 h-3.5" />
                        Verified
                      </div>
                    )}
                    <div className="badge bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                      {profile.subscription?.tier?.toUpperCase() || 'FREE'}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full min-h-[400px] lg:min-h-[600px] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <Image className="w-16 h-16 mb-3 opacity-50 mx-auto" />
                    <p className="font-medium">Photo not available</p>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Profile Info */}
            <div className="lg:col-span-3 p-8 lg:p-12">
              {/* Name & Basic Info */}
              <div className="mb-8">
                <h1 className="serif-heading text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
                  {profile.fullName}
                </h1>
                <div className="flex flex-wrap items-center gap-3 text-gray-600 text-lg mb-6">
                  <span className="font-semibold text-rose-600">{age} years</span>
                  <span className="text-gray-400">•</span>
                  <span>{profile.gender}</span>
                  {profile.personalDetails?.heightCm && (
                    <>
                      <span className="text-gray-400">•</span>
                      <span className="flex items-center gap-1">
                        <Ruler className="w-4 h-4" />
                        {Math.floor(profile.personalDetails.heightCm / 30.48)}'{Math.round((profile.personalDetails.heightCm % 30.48) / 2.54)}"
                      </span>
                    </>
                  )}
                  {profile.familyDetails?.currentResidenceCity && (
                    <>
                      <span className="text-gray-400">•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {profile.familyDetails.currentResidenceCity}
                      </span>
                    </>
                  )}
                </div>

                {/* About */}
                {profile.lifestylePreferences?.aboutMe && (
                  <p className="text-gray-700 leading-relaxed text-base">
                    {profile.lifestylePreferences.aboutMe}
                  </p>
                )}
              </div>

              

              {/* Quick Stats Grid */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200">
                {profile.educationDetails?.highestEducation && (
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium mb-0.5">Education</p>
                      <p className="text-sm font-semibold text-gray-900">{profile.educationDetails.highestEducation}</p>
                    </div>
                  </div>
                )}

                {profile.professionalDetails?.occupation && (
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium mb-0.5">Profession</p>
                      <p className="text-sm font-semibold text-gray-900">{profile.professionalDetails.occupation}</p>
                    </div>
                  </div>
                )}

                {profile.religiousDetails?.religion && (
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                      <Award className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium mb-0.5">Religion</p>
                      <p className="text-sm font-semibold text-gray-900">{profile.religiousDetails.religion}</p>
                    </div>
                  </div>
                )}

                {profile.familyDetails?.familyType && (
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Home className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium mb-0.5">Family</p>
                      <p className="text-sm font-semibold text-gray-900">{profile.familyDetails.familyType}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Photo Gallery */}
        {galleryPhotos && galleryPhotos.length > 0 && (
          <div className="profile-card p-8 mb-6">
            <h2 className="section-header serif-heading text-3xl font-bold text-gray-900">
              Photos
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {galleryPhotos.map((photo, index) => {
                const imageUrl = getImageUrl(photo.photoUrl);
                console.log(`🖼️ Rendering gallery image ${index}:`, {
                  photoUrl: photo.photoUrl,
                  constructedUrl: imageUrl,
                  hasError: imageErrors.has(photo.photoUrl)
                });
                
                return (
                  <div
                    key={index}
                    className="gallery-image aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer"
                    onClick={() => setSelectedImage(imageUrl)}
                  >
                    {photo.photoUrl && !imageErrors.has(photo.photoUrl) ? (
                      <img
                        src={imageUrl}
                        alt={`Gallery ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={() => handleImageError(photo.photoUrl)}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <AlertCircle className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Personal Details */}
          <div className="profile-card p-8">
            <h2 className="section-header serif-heading text-3xl font-bold text-gray-900">
              Personal Details
            </h2>
            <div>
              {profile.personalDetails?.heightCm && (
                <div className="info-row flex justify-between">
                  <span className="text-gray-600">Height</span>
                  <span className="font-semibold text-gray-900">
                    {profile.personalDetails.heightCm} cm ({Math.floor(profile.personalDetails.heightCm / 30.48)}'{Math.round((profile.personalDetails.heightCm % 30.48) / 2.54)}")
                  </span>
                </div>
              )}
              
              {profile.personalDetails?.maritalStatus && (
                <div className="info-row flex justify-between">
                  <span className="text-gray-600">Marital Status</span>
                  <span className="font-semibold text-gray-900">{profile.personalDetails.maritalStatus.replace('_', ' ')}</span>
                </div>
              )}
              
              {profile.personalDetails?.motherTongue && (
                <div className="info-row flex justify-between">
                  <span className="text-gray-600">Mother Tongue</span>
                  <span className="font-semibold text-gray-900">{profile.personalDetails.motherTongue}</span>
                </div>
              )}
              
              {profile.profileCreatedFor && (
                <div className="info-row flex justify-between">
                  <span className="text-gray-600">Profile For</span>
                  <span className="font-semibold text-gray-900">{profile.profileCreatedFor}</span>
                </div>
              )}
            </div>
          </div>

          {/* Religious Background */}
          {profile.religiousDetails && (
            <div className="profile-card p-8">
              <h2 className="section-header serif-heading text-3xl font-bold text-gray-900">
                Religious Background
              </h2>
              <div>
                {profile.religiousDetails.religion && (
                  <div className="info-row flex justify-between">
                    <span className="text-gray-600">Religion</span>
                    <span className="font-semibold text-gray-900">{profile.religiousDetails.religion}</span>
                  </div>
                )}
                
                {profile.religiousDetails.caste && (
                  <div className="info-row flex justify-between">
                    <span className="text-gray-600">Caste</span>
                    <span className="font-semibold text-gray-900">{profile.religiousDetails.caste}</span>
                  </div>
                )}
                
                {profile.religiousDetails.subCaste && (
                  <div className="info-row flex justify-between">
                    <span className="text-gray-600">Sub Caste</span>
                    <span className="font-semibold text-gray-900">{profile.religiousDetails.subCaste}</span>
                  </div>
                )}
                
                {profile.religiousDetails.manglik !== undefined && (
                  <div className="info-row flex justify-between">
                    <span className="text-gray-600">Manglik</span>
                    <span className="font-semibold text-gray-900">{profile.religiousDetails.manglik ? 'Yes' : 'No'}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Education */}
          {profile.educationDetails && (
            <div className="profile-card p-8">
              <h2 className="section-header serif-heading text-3xl font-bold text-gray-900">
                Education
              </h2>
              <div>
                {profile.educationDetails.highestEducation && (
                  <div className="info-row flex justify-between">
                    <span className="text-gray-600">Qualification</span>
                    <span className="font-semibold text-gray-900">{profile.educationDetails.highestEducation}</span>
                  </div>
                )}
                
                {profile.educationDetails.educationField && (
                  <div className="info-row flex justify-between">
                    <span className="text-gray-600">Field</span>
                    <span className="font-semibold text-gray-900">{profile.educationDetails.educationField}</span>
                  </div>
                )}
                
                {profile.educationDetails.institutionName && (
                  <div className="info-row flex justify-between">
                    <span className="text-gray-600">Institution</span>
                    <span className="font-semibold text-gray-900 text-right">{profile.educationDetails.institutionName}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Career */}
          {profile.professionalDetails && (
            <div className="profile-card p-8">
              <h2 className="section-header serif-heading text-3xl font-bold text-gray-900">
                Career
              </h2>
              <div>
                {profile.professionalDetails.occupation && (
                  <div className="info-row flex justify-between">
                    <span className="text-gray-600">Occupation</span>
                    <span className="font-semibold text-gray-900">{profile.professionalDetails.occupation}</span>
                  </div>
                )}
                
                {profile.professionalDetails.organizationName && (
                  <div className="info-row flex justify-between">
                    <span className="text-gray-600">Organization</span>
                    <span className="font-semibold text-gray-900 text-right">{profile.professionalDetails.organizationName}</span>
                  </div>
                )}
                
                {profile.professionalDetails.annualIncomeMin && (
                  <div className="info-row flex justify-between">
                    <span className="text-gray-600">Annual Income</span>
                    <span className="font-semibold text-gray-900">
                      ₹{(profile.professionalDetails.annualIncomeMin / 100000).toFixed(1)}L
                      {profile.professionalDetails.annualIncomeMax && 
                        ` - ₹${(profile.professionalDetails.annualIncomeMax / 100000).toFixed(1)}L`
                      }
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Family Details */}
          {profile.familyDetails && (
            <div className="profile-card p-8 lg:col-span-2">
              <h2 className="section-header serif-heading text-3xl font-bold text-gray-900">
                Family
              </h2>
              <div className="grid md:grid-cols-2 gap-x-8">
                <div>
                  {(profile.familyDetails.currentResidenceCity || profile.familyDetails.currentResidenceState) && (
                    <div className="info-row flex justify-between">
                      <span className="text-gray-600">Location</span>
                      <span className="font-semibold text-gray-900 text-right">
                        {profile.familyDetails.currentResidenceCity}
                        {profile.familyDetails.currentResidenceState && `, ${profile.familyDetails.currentResidenceState}`}
                      </span>
                    </div>
                  )}
                  
                  {profile.familyDetails.familyType && (
                    <div className="info-row flex justify-between">
                      <span className="text-gray-600">Family Type</span>
                      <span className="font-semibold text-gray-900">{profile.familyDetails.familyType}</span>
                    </div>
                  )}
                  
                  {(profile.familyDetails.brothers !== undefined || profile.familyDetails.sisters !== undefined) && (
                    <div className="info-row flex justify-between">
                      <span className="text-gray-600">Siblings</span>
                      <span className="font-semibold text-gray-900">
                        {profile.familyDetails.brothers || 0}B, {profile.familyDetails.sisters || 0}S
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  {profile.familyDetails.fatherName && (
                    <div className="info-row">
                      <span className="text-gray-600 block mb-1">Father</span>
                      <span className="font-semibold text-gray-900 block">{profile.familyDetails.fatherName}</span>
                      {profile.familyDetails.fatherOccupation && (
                        <span className="text-sm text-gray-600">{profile.familyDetails.fatherOccupation}</span>
                      )}
                    </div>
                  )}
                  
                  {profile.familyDetails.motherName && (
                    <div className="info-row">
                      <span className="text-gray-600 block mb-1">Mother</span>
                      <span className="font-semibold text-gray-900 block">{profile.familyDetails.motherName}</span>
                      {profile.familyDetails.motherOccupation && (
                        <span className="text-sm text-gray-600">{profile.familyDetails.motherOccupation}</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Lifestyle */}
          {profile.lifestylePreferences && (
            <div className="profile-card p-8 lg:col-span-2">
              <h2 className="section-header serif-heading text-3xl font-bold text-gray-900">
                Lifestyle
              </h2>
              <div className="grid md:grid-cols-3 gap-x-8 mb-6">
                {profile.lifestylePreferences.diet && (
                  <div className="info-row flex justify-between md:block">
                    <span className="text-gray-600">Diet</span>
                    <span className="font-semibold text-gray-900 md:block md:mt-1">{profile.lifestylePreferences.diet}</span>
                  </div>
                )}
                
                {profile.lifestylePreferences.smoking !== undefined && (
                  <div className="info-row flex justify-between md:block">
                    <span className="text-gray-600">Smoking</span>
                    <span className="font-semibold text-gray-900 md:block md:mt-1">{profile.lifestylePreferences.smoking ? 'Yes' : 'No'}</span>
                  </div>
                )}
                
                {profile.lifestylePreferences.drinking !== undefined && (
                  <div className="info-row flex justify-between md:block">
                    <span className="text-gray-600">Drinking</span>
                    <span className="font-semibold text-gray-900 md:block md:mt-1">{profile.lifestylePreferences.drinking ? 'Yes' : 'No'}</span>
                  </div>
                )}
              </div>
              
              {profile.lifestylePreferences.hobbies && profile.lifestylePreferences.hobbies.length > 0 && (
                <div>
                  <span className="text-gray-600 block mb-3">Hobbies & Interests</span>
                  <div className="flex flex-wrap gap-2">
                    {profile.lifestylePreferences.hobbies.map((hobby, idx) => (
                      <span 
                        key={idx}
                        className="px-4 py-2 bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 text-sm font-medium rounded-full"
                      >
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
            <div className="profile-card p-8 lg:col-span-2 bg-gradient-to-br from-rose-50 to-pink-50">
              <h2 className="section-header serif-heading text-3xl font-bold text-gray-900">
                Partner Expectations
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {profile.lifestylePreferences.partnerExpectations}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors z-10"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img 
            src={selectedImage} 
            alt="Full size" 
            className="max-w-full max-h-full object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};