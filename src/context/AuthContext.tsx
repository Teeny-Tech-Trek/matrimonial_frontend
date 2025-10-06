import React, { createContext, useContext, useState, useEffect } from 'react';
import { Profile } from '../types';

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

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    const storedAdmin = localStorage.getItem('isAdmin');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    if (storedAdmin === 'true') {
      setIsAdmin(true);
    }
  }, []);

  const sendOTP = async (phoneNumber: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    localStorage.setItem(`otp_${phoneNumber}`, otp);
    console.log(`OTP for ${phoneNumber}: ${otp}`);
  };

  const loginWithOTP = async (phoneNumber: string, otp: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const storedOTP = localStorage.getItem(`otp_${phoneNumber}`);

    if (storedOTP !== otp) {
      throw new Error('Invalid OTP');
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.phoneNumber === phoneNumber);

    if (!user) {
      throw new Error('User not found');
    }

    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.removeItem(`otp_${phoneNumber}`);
  };

  const login = async (phoneNumber: string, password: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.phoneNumber === phoneNumber && u.password === password);

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const { password: _, ...userWithoutPassword } = user;
    setCurrentUser(userWithoutPassword);
    localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));

    if (phoneNumber === '+919999999999') {
      setIsAdmin(true);
      localStorage.setItem('isAdmin', 'true');
    }
  };

  const register = async (data: RegisterData): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const existingUser = users.find((u: any) => u.phoneNumber === data.phoneNumber);

    if (existingUser) {
      throw new Error('Phone number already registered');
    }

    const newUser: Profile & { password: string } = {
      id: `user_${Date.now()}`,
      phoneNumber: data.phoneNumber,
      phoneVerified: true,
      fullName: data.fullName,
      gender: data.gender as any,
      dateOfBirth: data.dateOfBirth,
      profileCreatedFor: data.profileCreatedFor,
      profileCompletionPercentage: 20,
      isActive: true,
      isVerified: false,
      lastActiveAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      password: data.password
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    const { password: _, ...userWithoutPassword } = newUser;
    setCurrentUser(userWithoutPassword);
    localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAdmin(false);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isAdmin');
  };

  const updateProfile = (profile: Partial<Profile>) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, ...profile };
      setCurrentUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));

      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const userIndex = users.findIndex((u: any) => u.id === currentUser.id);
      if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...profile };
        localStorage.setItem('users', JSON.stringify(users));
      }
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
    updateProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};