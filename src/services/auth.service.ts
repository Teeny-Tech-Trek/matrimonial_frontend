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

interface GenericMessageResponse {
  success: boolean;
  message: string;
}

export const authService = {
  // Register new user
  register: async (data: RegisterData): Promise<AuthResponse> => {
    try {
      const response = await api.post<AuthResponse>(
        "/auth/register",
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
        "/auth/login",
        data
      );
      return response.data;
    } catch (error: any) {
      // If server returns 401 Unauthorized, show a clear invalid credentials message
      if (error.response?.status === 401) {
        throw new Error(error.response?.data?.error || 'Invalid credentials');
      }
      throw new Error(error.response?.data?.error || "Login failed");
    }
  },

  // Get current user profile
  getProfile: async (): Promise<any> => {
    try {
      const response = await api.get("/auth/me");
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
        "/auth/google-login",
        { idToken }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.error || "Google login failed"
      );
    }
  },

  forgotPassword: async (email: string): Promise<GenericMessageResponse> => {
    try {
      const response = await api.post<GenericMessageResponse>("/auth/forgot-password", { email });
      return response.data;
    } catch (error: any) {
      const fallback =
        "If an account with that email exists, a password reset link has been sent.";
      const status = error.response?.status;
      if (status === 404 || status >= 500 || !status) {
        throw new Error("Email doesn't exist");
      }
      throw new Error(fallback);
    }
  },

  resetPassword: async (token: string, password: string, confirmPassword: string): Promise<GenericMessageResponse> => {
    try {
      const response = await api.post<GenericMessageResponse>(`/auth/reset-password/${token}`, {
        password,
        confirmPassword,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.response?.data?.error || "Password reset failed");
    }
  },
};



export default authService;
