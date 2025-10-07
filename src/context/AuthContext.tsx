// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Profile } from '../types';
import authService from '../services/auth.service';

interface AuthContextType {
  currentUser: Profile | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (phoneNumber: string, password: string) => Promise<void>;
  loginWithOTP: (phoneNumber: string, otp: string) => Promise<void>;
  sendOTP: (phoneNumber: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateProfile: (profile: Partial<Profile>) => void;
  loginWithGoogle: (idToken: string) => Promise<void>;
}

interface RegisterData {
  phoneNumber: string;
  fullName: string;
  gender: string;
  dateOfBirth: string;
  profileCreatedFor: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<Profile | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    const storedAdmin = localStorage.getItem('isAdmin');
    const token = localStorage.getItem('authToken');
    
    if (storedUser && token) {
      setCurrentUser(JSON.parse(storedUser));
    }
    if (storedAdmin === 'true') {
      setIsAdmin(true);
    }
  }, []);

  // Send OTP (Mock - implement backend endpoint if needed)
  const sendOTP = async (phoneNumber: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    localStorage.setItem(`otp_${phoneNumber}`, otp);
    console.log(`🔐 OTP for ${phoneNumber}: ${otp}`);
    alert(`OTP sent! For demo: ${otp}`);
  };

  // Login with OTP (Mock - implement backend endpoint if needed)
  const loginWithOTP = async (phoneNumber: string, otp: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const storedOTP = localStorage.getItem(`otp_${phoneNumber}`);

    if (storedOTP !== otp) {
      throw new Error('Invalid OTP');
    }

    // For now using mock data - you can create a backend endpoint for OTP login
    throw new Error('OTP login not implemented in backend yet. Please use password login.');
  };

  // Login with Password - BACKEND API
  const login = async (phoneNumber: string, password: string): Promise<void> => {
    try {
      console.log('🔄 Attempting login...', { phoneNumber });
      
      const response = await authService.login({ phoneNumber, password });
      
      console.log('✅ Login successful!', response);
      
      // Store token
      localStorage.setItem('authToken', response.token);
      
      // Create user profile from response
      const userProfile: Profile = {
        id: response.user.id,
        phoneNumber: response.user.phoneNumber,
        phoneVerified: true,
        fullName: response.user.fullName,
        gender: (response.user.gender || 'male') as any,
        dateOfBirth: response.user.dateOfBirth || '',
        profileCreatedFor: response.user.profileCreatedFor || '',
        profileCompletionPercentage: 20,
        isActive: true,
        isVerified: false,
        lastActiveAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      };

      setCurrentUser(userProfile);
      localStorage.setItem('currentUser', JSON.stringify(userProfile));

      // Check if admin
      if (phoneNumber === '+919999999999' || phoneNumber === '9999999999') {
        setIsAdmin(true);
        localStorage.setItem('isAdmin', 'true');
      }
    } catch (error: any) {
      console.error('❌ Login error:', error);
      throw error;
    }
  };

  // Register - BACKEND API
  const register = async (data: RegisterData): Promise<void> => {
    try {
      console.log('🔄 Attempting registration...', { phoneNumber: data.phoneNumber });
      
      const response = await authService.register(data);
      
      console.log('✅ Registration successful!', response);
      
      // Store token
      localStorage.setItem('authToken', response.token);
      
      // Create user profile from response
      const userProfile: Profile = {
        id: response.user.id,
        phoneNumber: response.user.phoneNumber,
        phoneVerified: true,
        fullName: response.user.fullName,
        gender: data.gender as any,
        dateOfBirth: data.dateOfBirth,
        profileCreatedFor: data.profileCreatedFor,
        profileCompletionPercentage: 20,
        isActive: true,
        isVerified: false,
        lastActiveAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      };

      setCurrentUser(userProfile);
      localStorage.setItem('currentUser', JSON.stringify(userProfile));
      
      console.log('✅ User profile created:', userProfile);
    } catch (error: any) {
      console.error('❌ Registration error:', error);
      throw error;
    }
  };

  // Google Login - BACKEND API
  const loginWithGoogle = async (idToken: string): Promise<void> => {
    try {
      console.log('🔄 Attempting Google login...');
      
      const response = await authService.googleLogin(idToken);
      
      console.log('✅ Google login successful!', response);
      
      // Store token
      localStorage.setItem('authToken', response.token);
      
      // Create user profile from response
      const userProfile: Profile = {
        id: response.user.id,
        phoneNumber: response.user.phoneNumber,
        phoneVerified: true,
        fullName: response.user.fullName,
        gender: 'male' as any,
        dateOfBirth: '',
        profileCreatedFor: 'self',
        profileCompletionPercentage: 20,
        isActive: true,
        isVerified: false,
        lastActiveAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      };

      setCurrentUser(userProfile);
      localStorage.setItem('currentUser', JSON.stringify(userProfile));
    } catch (error: any) {
      console.error('❌ Google login error:', error);
      throw error;
    }
  };

  // Logout
  const logout = () => {
    setCurrentUser(null);
    setIsAdmin(false);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('authToken');
    console.log('👋 User logged out');
  };

  // Update Profile
  const updateProfile = (profile: Partial<Profile>) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, ...profile };
      setCurrentUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      console.log('✅ Profile updated:', updatedUser);
    }
  };

  const value: AuthContextType = {
    currentUser,
    isAuthenticated: !!currentUser,
    isAdmin,
    login,
    loginWithOTP,
    sendOTP,
    register,
    logout,
    updateProfile,
    loginWithGoogle,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};