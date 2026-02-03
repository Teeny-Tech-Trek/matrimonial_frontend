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
      const response = await api.post<ProfileResponse>('/profile/save', data);
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message 
        || error.response?.data?.error 
        || 'Failed to save profile';
      throw new Error(errorMessage);
    }
  },

  // ✅ FIXED: Get My Profile - changed to /profile/me (matches backend)
  getMyProfile: async (): Promise<ProfileResponse> => {
    try {
      // ✅ CHANGED FROM /profile/my-profile TO /profile/me
      const response = await api.get<ProfileResponse>('/profile/me');
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message 
        || error.response?.data?.error 
        || 'Failed to fetch profile';
      throw new Error(errorMessage);
    }
  },

  // Get Profile by ID (for viewing other profiles)
  getProfileById: async (id: string): Promise<ProfileResponse> => {
    try {
      const response = await api.get<ProfileResponse>(`/profile/${id}`);
      return response.data;
    } catch (error: any) {
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
      const queryParams = new URLSearchParams(filters as any).toString();
      const response = await api.get<ProfileResponse>(
        `/profile/list${queryParams ? `?${queryParams}` : ''}`
      );
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message 
        || error.response?.data?.error 
        || 'Failed to fetch profiles';
      throw new Error(errorMessage);
    }
  },

  // Delete Profile
  deleteProfile: async (): Promise<ProfileResponse> => {
    try {
      const response = await api.delete<ProfileResponse>('/profile');
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message 
        || error.response?.data?.error 
        || 'Failed to delete profile';
      throw new Error(errorMessage);
    }
  },
};

export default profileService;