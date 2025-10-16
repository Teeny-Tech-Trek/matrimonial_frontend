// src/services/auth.service.ts
import axios from 'axios';

// const API_BASE_URL = 'https://matrimonial-backend-14t2.onrender.com/api';
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
      const response = await apiClient.post<AuthResponse>('/auth/register', data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Registration failed');
    }
  },

  // Login user
  login: async (data: LoginData): Promise<AuthResponse> => {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/login', data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Login failed');
    }
  },

  // Get current user profile
  getProfile: async (): Promise<any> => {
    try {
      const response = await apiClient.get('/auth/me');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Failed to fetch profile');
    }
  },

  // Google Login
  googleLogin: async (idToken: string): Promise<AuthResponse> => {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/google-login', { idToken });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Google login failed');
    }
  },
};

export default authService;