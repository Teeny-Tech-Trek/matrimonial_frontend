import api from "./api";

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

interface SearchPreferencesPayload {
  gender?: string;
  state?: string;
  religion?: string;
  maritalStatus?: string;
  diet?: string;
  ageMin?: string;
  ageMax?: string;
}

export const profileService = {
  saveProfile: async (data: ProfileData): Promise<ProfileResponse> => {
    try {
      const response = await api.post<ProfileResponse>("/profile/save", data);
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to save profile";
      throw new Error(errorMessage);
    }
  },

  getMyProfile: async (): Promise<ProfileResponse> => {
    try {
      const response = await api.get<ProfileResponse>("/profile/me");
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        try {
          const fallbackResponse = await api.get<ProfileResponse>("/profile/my-profile");
          return fallbackResponse.data;
        } catch (fallbackError: any) {
          if (fallbackError.response?.status === 404) {
            return { success: true, data: null, message: "Profile not found" };
          }
        }
      }

      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to fetch profile";
      throw new Error(errorMessage);
    }
  },

  getProfileById: async (id: string): Promise<ProfileResponse> => {
    try {
      const response = await api.get<ProfileResponse>(`/profile/${id}`);
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to fetch profile";
      throw new Error(errorMessage);
    }
  },

  listProfiles: async (filters?: {
    gender?: string;
    religion?: string;
    city?: string;
  }): Promise<ProfileResponse> => {
    try {
      const queryParams = new URLSearchParams(filters as any).toString();
      const response = await api.get<ProfileResponse>(
        `/profile/list${queryParams ? `?${queryParams}` : ""}`
      );
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to fetch profiles";
      throw new Error(errorMessage);
    }
  },

  deleteProfile: async (): Promise<ProfileResponse> => {
    try {
      const response = await api.delete<ProfileResponse>("/profile");
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to delete profile";
      throw new Error(errorMessage);
    }
  },

  saveSearchPreferences: async (
    data: SearchPreferencesPayload
  ): Promise<ProfileResponse> => {
    try {
      const response = await api.patch<ProfileResponse>("/profile/preferences/search", data);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 400 || error.response?.status === 404) {
        return { success: false, data: null, message: "Preferences not saved on server" };
      }

      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to save search preferences";
      throw new Error(errorMessage);
    }
  },
};

export default profileService;
