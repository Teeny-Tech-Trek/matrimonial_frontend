// src/services/profile.service.ts
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

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
      const response = await apiClient.post<ProfileResponse>('/profile/save', data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Failed to save profile');
    }
  },

  // Get My Profile
  getMyProfile: async (): Promise<ProfileResponse> => {
    try {
      const response = await apiClient.get<ProfileResponse>('/profile/me');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Failed to fetch profile');
    }
  },

  // Get Profile by ID
  getProfileById: async (id: string): Promise<ProfileResponse> => {
    try {
      const response = await apiClient.get<ProfileResponse>(`/profile/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Failed to fetch profile');
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
      const response = await apiClient.get<ProfileResponse>(
        `/profile/list${queryParams ? `?${queryParams}` : ''}`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Failed to fetch profiles');
    }
  },

  // Delete Profile
  deleteProfile: async (): Promise<ProfileResponse> => {
    try {
      const response = await apiClient.delete<ProfileResponse>('/profile');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Failed to delete profile');
    }
  },
};

export default profileService;