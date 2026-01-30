// src/services/auth.service.ts
import api from './api';

// Interface for API responses
interface AuthResponse {
  token: string;
  user: {
    id: string;
    fullName: string;
    phoneNumber: string;
    gender?: string;
    dateOfBirth?: string;
    profileCreatedFor?: string;
  };
}

interface RegisterData {
  fullName: string;
  phoneNumber: string;
  password: string;
  gender: string;
  dateOfBirth: string;
  profileCreatedFor: string;
}

interface LoginData {
  phoneNumber: string;
  password: string;
}
export const authService = {
  // Register new user
  register: async (data: RegisterData): Promise<AuthResponse> => {
    try {
      const response = await api.post<AuthResponse>(
        "/backend/auth/register",
        data
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || "Registration failed");
    }
  },

  // Login user
  login: async (data: LoginData): Promise<AuthResponse> => {
    try {
      const response = await api.post<AuthResponse>(
        "/backend/auth/login",
        data
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || "Login failed");
    }
  },

  // Get current user profile
  getProfile: async (): Promise<any> => {
    try {
      const response = await api.get("/backend/auth/me");
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.error || "Failed to fetch profile"
      );
    }
  },

  // Google Login
  googleLogin: async (idToken: string): Promise<AuthResponse> => {
    try {
      const response = await api.post<AuthResponse>(
        "/backend/auth/google-login",
        { idToken }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.error || "Google login failed"
      );
    }
  },
};



export default authService;