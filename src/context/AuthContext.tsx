

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Profile } from '../types';
import authService from '../services/auth.service';
import profileService from '../services/profile.service';

interface AuthContextType {
  currentUser: Profile | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  profileComplete: boolean;
  login: (phoneNumber: string, password: string) => Promise<void>;
  loginWithOTP: (phoneNumber: string, otp: string) => Promise<void>;
  sendOTP: (phoneNumber: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateProfile: (profile: Partial<Profile>) => void;
  loginWithGoogle: (idToken: string) => Promise<void>;
  refreshProfile: () => Promise<void>;
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
  const [profileComplete, setProfileComplete] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    const storedAdmin = localStorage.getItem('isAdmin');
    const token = localStorage.getItem('authToken');
    
    if (storedUser && token) {
      setCurrentUser(JSON.parse(storedUser));
      checkProfileCompletion();
    }
    if (storedAdmin === 'true') {
      setIsAdmin(true);
    }
  }, []);

  const checkProfileCompletion = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) return;

      const response = await profileService.getMyProfile();
      if (response.success && response.data) {
        const profile = response.data;
        const hasPersonalDetails = !!profile.personalDetails?.heightCm;
        const hasEducation = !!profile.educationDetails?.highestEducation;
        const hasProfessional = !!profile.professionalDetails?.occupation;
        const hasFamily = !!profile.familyDetails?.currentResidenceCity;
        
        const isComplete = hasPersonalDetails && hasEducation && hasProfessional && hasFamily;
        setProfileComplete(isComplete);
      }
    } catch (error) {
      setProfileComplete(false);
    }
  };

  const refreshProfile = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) return;

      const response = await profileService.getMyProfile();
      if (response.success && response.data) {
        const updatedUser = {
          ...currentUser!,
          profileCompletionPercentage: 100,
        };
        setCurrentUser(updatedUser);
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        await checkProfileCompletion();
      }
    } catch (error) {
    }
  };

  const sendOTP = async (phoneNumber: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    alert(`OTP sent! For demo: ${otp}`);
  };

  const loginWithOTP = async (phoneNumber: string, otp: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    throw new Error('OTP login not implemented in backend yet. Please use password login.');
  };

  // ✅ UPDATED: Check role from backend
  const login = async (phoneNumber: string, password: string): Promise<void> => {
    try {
      
      const response = await authService.login({ phoneNumber, password });
      
      // Store token
      localStorage.setItem('authToken', response.token);
      
      // Create user profile
      const userProfile: Profile = {
        id: response.user.id,
        phoneNumber: response.user.phoneNumber,
        phoneVerified: true,
        fullName: response.user.fullName,
         gender: response.user.gender as any,
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

      // ⭐ CHECK ADMIN ROLE FROM BACKEND RESPONSE
      const userRole = (response.user as any).role;
      if (userRole === 'admin' || userRole === 'moderator') {
        setIsAdmin(true);
        localStorage.setItem('isAdmin', 'true');
      } else {
        setIsAdmin(false);
        localStorage.removeItem('isAdmin');
      }

      await checkProfileCompletion();
    } catch (error: any) {
      throw error;
    }
  };

  const register = async (data: RegisterData): Promise<void> => {
    try {
      const response = await authService.register(data);
      
      localStorage.setItem('authToken', response.token);
      
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
      setProfileComplete(false);
    } catch (error: any) {
      throw error;
    }
  };

  const loginWithGoogle = async (idToken: string): Promise<void> => {
    try {
      const response = await authService.googleLogin(idToken);
      
      localStorage.setItem('authToken', response.token);
      
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
      
      // Check admin role for Google login too
      const userRole = (response.user as any).role;
      if (userRole === 'admin' || userRole === 'moderator') {
        setIsAdmin(true);
        localStorage.setItem('isAdmin', 'true');
      } else {
        setIsAdmin(false);
        localStorage.removeItem('isAdmin');
      }
      
      await checkProfileCompletion();
    } catch (error: any) {
      throw error;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAdmin(false);
    setProfileComplete(false);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('authToken');
  };

  const updateProfile = (profile: Partial<Profile>) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, ...profile };
      setCurrentUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    }
  };

  const value: AuthContextType = {
    currentUser,
    isAuthenticated: !!currentUser,
    isAdmin,
    profileComplete,
    login,
    loginWithOTP,
    sendOTP,
    register,
    logout,
    updateProfile,
    loginWithGoogle,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};