// src/services/profile.service.ts
import api from "./api";

// Interface for complete profile data
interface ProfileData {
  fullName: string;
  gender: string;
  dateOfBirth: string;
  profileCreatedFor: string;
  photos?: Array<{
    photoUrl: string;
    status?: string;
  }>;
  personalDetails?: {
    heightCm: number;
    maritalStatus: string;
    motherTongue: string;
  };
  religiousDetails?: {
    religion: string;
    caste?: string;
    subCaste?: string;
    manglik?: boolean;
  };
  educationDetails?: {
    highestEducation: string;
    educationField: string;
    institutionName?: string;
  };
  professionalDetails?: {
    occupation: string;
    organizationName?: string;
    annualIncomeMin?: number;
    annualIncomeMax?: number;
  };
  familyDetails?: {
    fatherName?: string;
    fatherOccupation?: string;
    motherName?: string;
    motherOccupation?: string;
    brothers?: number;
    sisters?: number;
    familyType?: string;
    currentResidenceCity?: string;
    currentResidenceState?: string;
  };
  lifestylePreferences?: {
    diet?: string;
    smoking?: boolean;
    drinking?: boolean;
    hobbies?: string[];
    aboutMe?: string;
    partnerExpectations?: string;
  };
}

interface ProfileResponse {
  success: boolean;
  message?: string;
  data?: any;
  error?: string;
}

export const profileService = {
  // Create or Update Profile
  saveProfile: async (data: ProfileData): Promise<ProfileResponse> => {
    try {
      console.log('💾 Saving profile...');
      const response = await api.post<ProfileResponse>('/profile/save', data);
      console.log('✅ Profile saved successfully');
      return response.data;
    } catch (error: any) {
      console.error('❌ Failed to save profile:', error);
      const errorMessage = error.response?.data?.message 
        || error.response?.data?.error 
        || 'Failed to save profile';
      throw new Error(errorMessage);
    }
  },

  // ✅ FIXED: Get My Profile - changed to /profile/me (matches backend)
  getMyProfile: async (): Promise<ProfileResponse> => {
    try {
      console.log('👤 Fetching my profile from /profile/me...');
      // ✅ CHANGED FROM /profile/my-profile TO /profile/me
      const response = await api.get<ProfileResponse>('/profile/me');
      console.log('✅ Profile fetched successfully:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('❌ Failed to fetch profile:', error);
      const errorMessage = error.response?.data?.message 
        || error.response?.data?.error 
        || 'Failed to fetch profile';
      throw new Error(errorMessage);
    }
  },

  // Get Profile by ID (for viewing other profiles)
  getProfileById: async (id: string): Promise<ProfileResponse> => {
    try {
      console.log('👤 Fetching profile by ID:', id);
      const response = await api.get<ProfileResponse>(`/profile/${id}`);
      console.log('✅ Profile fetched successfully');
      return response.data;
    } catch (error: any) {
      console.error('❌ Failed to fetch profile:', error);
      const errorMessage = error.response?.data?.message 
        || error.response?.data?.error 
        || 'Failed to fetch profile';
      throw new Error(errorMessage);
    }
  },

  // Get All Profiles (with filters)
  listProfiles: async (filters?: {
    gender?: string;
    religion?: string;
    city?: string;
  }): Promise<ProfileResponse> => {
    try {
      console.log('📋 Fetching profiles with filters:', filters);
      const queryParams = new URLSearchParams(filters as any).toString();
      const response = await api.get<ProfileResponse>(
        `/profile/list${queryParams ? `?${queryParams}` : ''}`
      );
      console.log('✅ Profiles fetched successfully');
      return response.data;
    } catch (error: any) {
      console.error('❌ Failed to fetch profiles:', error);
      const errorMessage = error.response?.data?.message 
        || error.response?.data?.error 
        || 'Failed to fetch profiles';
      throw new Error(errorMessage);
    }
  },

  // Delete Profile
  deleteProfile: async (): Promise<ProfileResponse> => {
    try {
      console.log('🗑️ Deleting profile...');
      const response = await api.delete<ProfileResponse>('/profile');
      console.log('✅ Profile deleted successfully');
      return response.data;
    } catch (error: any) {
      console.error('❌ Failed to delete profile:', error);
      const errorMessage = error.response?.data?.message 
        || error.response?.data?.error 
        || 'Failed to delete profile';
      throw new Error(errorMessage);
    }
  },
};

export default profileService;