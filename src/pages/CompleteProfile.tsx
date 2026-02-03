import React, { useState, useEffect } from 'react';
import { User, Heart, Briefcase, GraduationCap, Home, Activity, Loader2, Upload, X, Camera } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import profileService from '../services/profile.service';
import { useToast } from '../context/ToastContext';

interface CompleteProfileProps {
  onNavigate: (page: string) => void;
}

export default function CompleteProfile({ onNavigate }: CompleteProfileProps) {
  const { refreshProfile } = useAuth();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: '', gender: '', age: '', height: '', maritalStatus: '', language: '',
    createdFor: '', religion: '', caste: '', subCaste: '', manglik: '',
    degree: '', field: '', institution: '', occupation: '', company: '',
    annualIncomeMin: '', annualIncomeMax: '', city: '', state: 'Punjab',
    familyType: '', fatherName: '', fatherOccupation: '', motherName: '',
    motherOccupation: '', brothers: '', sisters: '', diet: '', smoking: '',
    drinking: '', hobbies: [] as string[], partnerExpectations: '', about: ''
  });

  const [photos, setPhotos] = useState<Array<{url: string; isPrimary: boolean; file?: File}>>([]);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [availableHobbies] = useState(['Drawing', 'Shopping', 'Dancing', 'Cooking', 'Reading', 'Traveling', 'Music', 'Sports']);
  const [loading, setLoading] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);

  const PUNJAB_CITIES = [
    'Amritsar', 'Ludhiana', 'Jalandhar', 'Patiala', 'Bathinda', 'Pathankot',
    'Hoshiarpur', 'Mohali', 'Batala', 'Moga', 'Malerkotla', 'Khanna',
    'Phagwara', 'Muktsar', 'Barnala', 'Rajpura', 'Firozpur', 'Kapurthala',
    'Faridkot', 'Sunam', 'Sangrur', 'Fazilka', 'Gurdaspur', 'Kharar',
    'Gobindgarh', 'Mansa', 'Malout', 'Nabha', 'Tarn Taran', 'Jagraon',
    'Abohar', 'Budhlada', 'Zirakpur', 'Kot Kapura', 'Nawanshahr',
    'Rupnagar', 'Fatehgarh Sahib'
  ].sort();

  // Load existing profile on mount
  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoadingProfile(true);
      const response = await profileService.getMyProfile();
      
      if (response.success && response.data) {
        const profile = response.data;
        
        // Map backend data to form fields
        setFormData({
          name: profile.fullName || '',
          gender: profile.gender || '',
          age: profile.dateOfBirth ? calculateAge(profile.dateOfBirth) : '',
          height: profile.personalDetails?.heightCm?.toString() || '',
          maritalStatus: formatMaritalStatus(profile.personalDetails?.maritalStatus) || '',
          language: profile.personalDetails?.motherTongue || '',
          createdFor: profile.profileCreatedFor || '',
          religion: profile.religiousDetails?.religion || '',
          caste: profile.religiousDetails?.caste || '',
          subCaste: profile.religiousDetails?.subCaste || '',
          manglik: profile.religiousDetails?.manglik ? 'Yes' : 'No',
          degree: profile.educationDetails?.highestEducation || '',
          field: profile.educationDetails?.educationField || '',
          institution: profile.educationDetails?.institutionName || '',
          occupation: profile.professionalDetails?.occupation || '',
          company: profile.professionalDetails?.organizationName || '',
          annualIncomeMin: profile.professionalDetails?.annualIncomeMin?.toString() || '',
          annualIncomeMax: profile.professionalDetails?.annualIncomeMax?.toString() || '',
          city: profile.familyDetails?.currentResidenceCity || '',
          state: profile.familyDetails?.currentResidenceState || 'Punjab',
          familyType: profile.familyDetails?.familyType || '',
          fatherName: profile.familyDetails?.fatherName || '',
          fatherOccupation: profile.familyDetails?.fatherOccupation || '',
          motherName: profile.familyDetails?.motherName || '',
          motherOccupation: profile.familyDetails?.motherOccupation || '',
          brothers: profile.familyDetails?.brothers?.toString() || '',
          sisters: profile.familyDetails?.sisters?.toString() || '',
          diet: profile.lifestylePreferences?.diet || '',
          smoking: profile.lifestylePreferences?.smoking ? 'Yes' : 'No',
          drinking: profile.lifestylePreferences?.drinking ? 'Yes' : 'No',
          hobbies: profile.lifestylePreferences?.hobbies || [],
          about: profile.lifestylePreferences?.aboutMe || '',
          partnerExpectations: profile.lifestylePreferences?.partnerExpectations || '',
        });

        // Load photos if they exist
        if (profile.photos && profile.photos.length > 0) {
          setPhotos(profile.photos.map((photo: any) => ({
            url: photo.photoUrl,
            isPrimary: photo.isPrimary || false
          })));
        }
      }
    } catch (err: any) {
      // It's okay if no profile exists yet
    } finally {
      setLoadingProfile(false);
    }
  };

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age.toString();
  };

  const formatMaritalStatus = (status: string) => {
    if (!status) return '';
    return status.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleHobby = (hobby: string) => {
    setFormData(prev => ({
      ...prev,
      hobbies: prev.hobbies.includes(hobby)
        ? prev.hobbies.filter(h => h !== hobby)
        : [...prev.hobbies, hobby]
    }));
  };

  //  FIXED: Correct route - /backend instead of /api
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('Please upload an image file', 'error');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showToast('Image size should be less than 5MB', 'error');
      return;
    }

    setUploadingPhoto(true);

    try {
      const formData = new FormData();
      formData.append('image', file);

   // Line 154 ko update karo
const response = await fetch('https://api.rsaristomatch.com/backend/upload-image', {
  method: 'POST',
  body: formData,
  credentials: 'include'
});

      // Check if response is ok before parsing JSON
      if (!response.ok) {
        throw new Error(`Upload failed: ${response.status} ${response.statusText}`);
      }

      // Check if response has content
      const text = await response.text();
      if (!text) {
        throw new Error('Empty response from server');
      }

      const data = JSON.parse(text);

      if (data.success && data.imageUrl) {
        // Only allow a single photo; set as primary
        setPhotos([{ 
          url: data.imageUrl,
          isPrimary: true,
          file: file
        }]);
        showToast('Photo uploaded successfully and set as primary!', 'success');
      } else {
        throw new Error(data.message || 'Upload failed');
      }
    } catch (err: any) {
      // console.error('Upload error:', err);
       console.error(err);
      showToast(err.message || 'Failed to upload photo', 'error');
    } finally {
      setUploadingPhoto(false);
      e.target.value = '';
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(prev => {
      const updated = prev.filter((_, i) => i !== index);
      // If we removed the primary photo, make the first one primary
      if (updated.length > 0 && prev[index].isPrimary) {
        updated[0].isPrimary = true;
      }
      return updated;
    });
  };

  const setPrimaryPhoto = (index: number) => {
    setPhotos(prev => prev.map((photo, i) => ({
      ...photo,
      isPrimary: i === index
    })));
  };

  // SUBMIT HANDLER
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate required fields
      if (!formData.name || !formData.age || !formData.height) {
        showToast('Please fill in all required fields', 'error');
        setLoading(false);
        return;
      }

      // Check if at least one photo is uploaded
      if (photos.length === 0) {
        showToast('Please upload at least one photo', 'error');
        setLoading(false);
        return;
      }

      // Transform form data to match backend schema
      const currentYear = new Date().getFullYear();
      const birthYear = currentYear - parseInt(formData.age);
      
      const profileData = {
        fullName: formData.name,
        gender: formData.gender, 
        dateOfBirth: new Date(birthYear, 0, 1).toISOString(),
        profileCreatedFor: formData.createdFor,
        photos: photos.map(photo => ({
          photoUrl: photo.url,
          isPrimary: photo.isPrimary
        })),
        personalDetails: {
          heightCm: parseInt(formData.height),
          maritalStatus: formData.maritalStatus.toLowerCase().replace(/\s+/g, '_'),
          motherTongue: formData.language,
        },
        religiousDetails: {
          religion: formData.religion,
          caste: formData.caste,
          subCaste: formData.subCaste,
          manglik: formData.manglik === 'Yes',
        },
        educationDetails: {
          highestEducation: formData.degree,
          educationField: formData.field,
          institutionName: formData.institution,
        },
        professionalDetails: {
          occupation: formData.occupation,
          organizationName: formData.company,
          annualIncomeMin: formData.annualIncomeMin ? parseInt(formData.annualIncomeMin) : undefined,
          annualIncomeMax: formData.annualIncomeMax ? parseInt(formData.annualIncomeMax) : undefined,
        },
        familyDetails: {
          fatherName: formData.fatherName,
          fatherOccupation: formData.fatherOccupation,
          motherName: formData.motherName,
          motherOccupation: formData.motherOccupation,
          brothers: formData.brothers ? parseInt(formData.brothers) : 0,
          sisters: formData.sisters ? parseInt(formData.sisters) : 0,
          familyType: formData.familyType,
          currentResidenceCity: formData.city,
          currentResidenceState: formData.state,
        },
        lifestylePreferences: {
          diet: formData.diet,
          smoking: formData.smoking === 'Yes',
          drinking: formData.drinking === 'Yes',
          hobbies: formData.hobbies,
          aboutMe: formData.about,
          partnerExpectations: formData.partnerExpectations,
        },
      };

      const response = await profileService.saveProfile(profileData);
      
      // Refresh profile completion status in auth context
      await refreshProfile();
      
      showToast('✨ Profile completed successfully! Redirecting to dashboard...', 'success');
      
      // Small delay before redirect
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Navigate to dashboard or profile view
      if (onNavigate) {
        onNavigate('dashboard');
      }
    } catch (err: any) {
      showToast(err.message || 'Failed to save profile. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const sections = [
    { id: 0, title: 'Photos', icon: Camera },
    { id: 1, title: 'Basic Information', icon: User },
    { id: 2, title: 'Religious Background', icon: Heart },
    { id: 3, title: 'Education', icon: GraduationCap },
    { id: 4, title: 'Professional Details', icon: Briefcase },
    { id: 5, title: 'Family Details', icon: Home },
    { id: 6, title: 'Lifestyle & Interests', icon: Activity },
    { id: 7, title: 'About & Expectations', icon: User }
  ];

  if (loadingProfile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-rose-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-600 to-pink-600 rounded-t-2xl p-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Complete Your Profile</h1>
          <p className="text-rose-100">Fill in all the details to help us find your perfect match</p>
        </div>

        {/* Section Tabs */}
        <div className="bg-white shadow-sm p-4 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setCurrentSection(section.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    currentSection === section.id
                      ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon size={18} />
                  <span className="text-sm font-medium whitespace-nowrap">{section.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white shadow-lg rounded-b-2xl p-8">
          {/* PHOTO UPLOAD SECTION */}
          {currentSection === 0 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Profile Photos</h2>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-800">
                  <strong>Tip for your photo:</strong> Upload a clear, recent photo. Only one photo is allowed and it will be set as your primary display picture.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {photos.map((photo, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={photo.url}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    {photo.isPrimary && (
                      <div className="absolute top-2 left-2 bg-rose-600 text-white text-xs px-2 py-1 rounded">
                        Primary
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => removePhoto(index)}
                        className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                ))}

                {photos.length === 0 && (
                  <label className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-rose-500 hover:bg-rose-50 transition-all">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploadingPhoto}
                      className="hidden"
                    />
                    {uploadingPhoto ? (
                      <Loader2 className="h-8 w-8 text-rose-600 animate-spin mb-2" />
                    ) : (
                      <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    )}
                    <span className="text-sm text-gray-600">
                      {uploadingPhoto ? 'Uploading...' : 'Upload Photo'}
                    </span>
                    <span className="text-xs text-gray-400 mt-1">Max 100kb</span>
                  </label>
                )}
              </div>

              {photos.length === 0 && (
                <div className="text-center py-8 border border-rose-200 rounded-lg bg-rose-50">
                  <Camera className="h-12 w-12 text-rose-600 mx-auto mb-3" />
                  <p className="text-gray-700 font-medium">No photos uploaded yet</p>
                  <p className="text-sm text-gray-600 mt-1">Upload at least one photo to continue</p>
                </div>
              )}
            </div>
          )}

          {/* BASIC INFORMATION SECTION */}
          {currentSection === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Basic Information</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Gender <span className="text-rose-600">*</span>
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Age <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="28"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Height (cm) <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="170"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Marital Status <span className="text-rose-600">*</span>
                  </label>
                  <select
                    name="maritalStatus"
                    value={formData.maritalStatus}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  >
                    <option value="">Select</option>
                    <option value="Never Married">Never Married</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widowed">Widowed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Mother Tongue <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="language"
                    value={formData.language}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="Punjabi"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Created For <span className="text-rose-600">*</span>
                  </label>
                  <select
                    name="createdFor"
                    value={formData.createdFor}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  >
                    <option value="">Select</option>
                    <option value="Self">Self</option>
                    <option value="Son">Son</option>
                    <option value="Daughter">Daughter</option>
                    <option value="Brother">Brother</option>
                    <option value="Sister">Sister</option>
                    <option value="Friend">Friend</option>
                    <option value="Relative">Relative</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* RELIGIOUS BACKGROUND SECTION */}
          {currentSection === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Religious Background</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Religion <span className="text-rose-600">*</span>
                  </label>
                  <select
                    name="religion"
                    value={formData.religion}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  >
                    <option value="">Select</option>
                    <option value="Hindu">Hindu</option>
                    <option value="Muslim">Muslim</option>
                    <option value="Christian">Christian</option>
                    <option value="Sikh">Sikh</option>
                    <option value="Jain">Jain</option>
                    <option value="Buddhist">Buddhist</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Caste
                  </label>
                  <input
                    type="text"
                    name="caste"
                    value={formData.caste}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="Patel"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Sub Caste
                  </label>
                  <input
                    type="text"
                    name="subCaste"
                    value={formData.subCaste}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="Leva Patel"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Manglik
                  </label>
                  <select
                    name="manglik"
                    value={formData.manglik}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* EDUCATION SECTION */}
          {currentSection === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Education</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Highest Degree <span className="text-rose-600">*</span>
                  </label>
                  <select
                    name="degree"
                    value={formData.degree}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  >
                    <option value="">Select</option>
                    <option value="Bachelors">Bachelors</option>
                    <option value="Masters">Masters</option>
                    <option value="PhD">PhD</option>
                    <option value="Diploma">Diploma</option>
                    <option value="High School">High School</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Field of Study <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="field"
                    value={formData.field}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="Computer Science"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Institution
                  </label>
                  <input
                    type="text"
                    name="institution"
                    value={formData.institution}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="University Name"
                  />
                </div>
              </div>
            </div>
          )}

          {/* PROFESSIONAL DETAILS SECTION */}
          {currentSection === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Professional Details</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Occupation <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="Software Engineer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Company/Organization
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="Tech Company"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Annual Income (Min)
                  </label>
                  <input
                    type="number"
                    name="annualIncomeMin"
                    value={formData.annualIncomeMin}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="600000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Annual Income (Max)
                  </label>
                  <input
                    type="number"
                    name="annualIncomeMax"
                    value={formData.annualIncomeMax}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="800000"
                  />
                </div>
              </div>
            </div>
          )}

          {/* FAMILY DETAILS SECTION */}
          {currentSection === 5 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Family Details</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    City <span className="text-rose-600">*</span>
                  </label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  >
                    <option value="">Select City</option>
                    {PUNJAB_CITIES.map(city => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    State <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    readOnly
                    placeholder='Punjab'
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Family Type <span className="text-rose-600">*</span>
                  </label>
                  <select
                    name="familyType"
                    value={formData.familyType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  >
                    <option value="">Select</option>
                    <option value="Joint">Joint Family</option>
                    <option value="Nuclear">Nuclear Family</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Father's Name
                  </label>
                  <input
                    type="text"
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="Father's Name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Father's Occupation
                  </label>
                  <input
                    type="text"
                    name="fatherOccupation"
                    value={formData.fatherOccupation}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="Business"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Mother's Name
                  </label>
                  <input
                    type="text"
                    name="motherName"
                    value={formData.motherName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="Mother's Name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Mother's Occupation
                  </label>
                  <input
                    type="text"
                    name="motherOccupation"
                    value={formData.motherOccupation}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="Homemaker"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Number of Brothers
                  </label>
                  <input
                    type="number"
                    name="brothers"
                    value={formData.brothers}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Number of Sisters
                  </label>
                  <input
                    type="number"
                    name="sisters"
                    value={formData.sisters}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
          )}

          {/* LIFESTYLE & INTERESTS SECTION */}
          {currentSection === 6 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Lifestyle & Interests</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Diet
                  </label>
                  <select
                    name="diet"
                    value={formData.diet}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  >
                    <option value="">Select</option>
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Non-Vegetarian">Non-Vegetarian</option>
                    <option value="Vegan">Vegan</option>
                    <option value="Eggetarian">Eggetarian</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Smoking
                  </label>
                  <select
                    name="smoking"
                    value={formData.smoking}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  >
                    <option value="">Select</option>
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                    <option value="Occasionally">Occasionally</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Drinking
                  </label>
                  <select
                    name="drinking"
                    value={formData.drinking}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  >
                    <option value="">Select</option>
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                    <option value="Socially">Socially</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Hobbies & Interests
                </label>
                <div className="flex flex-wrap gap-3">
                  {availableHobbies.map(hobby => (
                    <button
                      key={hobby}
                      type="button"
                      onClick={() => toggleHobby(hobby)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        formData.hobbies.includes(hobby)
                          ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {hobby}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ABOUT & EXPECTATIONS SECTION */}
          {currentSection === 7 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">About & Expectations</h2>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  About Yourself
                </label>
                <textarea
                  name="about"
                  value={formData.about}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="Tell us about yourself, your interests, values, and what makes you unique."
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Partner Expectations
                </label>
                <textarea
                  name="partnerExpectations"
                  value={formData.partnerExpectations}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="Describe what you're looking for in a life partner."
                ></textarea>
              </div>
            </div>
          )}

          {/* NAVIGATION BUTTONS */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            <button
              type="button"
              onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
              disabled={currentSection === 0 || loading}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                currentSection === 0 || loading
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Previous
            </button>

            {currentSection < sections.length - 1 ? (
              <button
                type="button"
                onClick={() => setCurrentSection(currentSection + 1)}
                disabled={loading}
                className="px-6 py-3 bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50"
              >
                Next Section
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="px-8 py-3 bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Complete Profile'
                )}
              </button>
            )}
          </div>
        </div>

        {/* PROGRESS BAR */}
        <div className="mt-6 bg-white rounded-lg p-4 shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-700">Profile Completion</span>
            <span className="text-sm font-semibold text-rose-600">
              {Math.round(((currentSection + 1) / sections.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-rose-600 to-pink-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}