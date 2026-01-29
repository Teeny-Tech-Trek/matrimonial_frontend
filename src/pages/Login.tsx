
import React, { useState } from 'react';
import { Heart, Phone, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';



interface LoginProps {
  onNavigate: (page: string) => void;
}

export const Login: React.FC<LoginProps> = ({ onNavigate }) => {
  const { login } = useAuth();
  const { showToast } = useToast();
  
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); 

  // ⭐ UPDATED: Check admin status and redirect
  const handleLogin = async () => {
    if (!phoneNumber || !password) {
      showToast('Please enter phone number and password', 'error');
      return;
    }

    setLoading(true);
    
    try {
      await login(phoneNumber, password);
      
      // Set flag for profile completion check
      localStorage.setItem('justLoggedIn', 'true');
      
      // ⭐ CHECK IF ADMIN AND REDIRECT ACCORDINGLY
      const isAdminUser = localStorage.getItem('isAdmin') === 'true';
      
      if (isAdminUser) {
        showToast('Welcome back, Admin!', 'success');
        onNavigate('admin');
      } else {
        showToast('Login successful! Welcome back.', 'success');
        onNavigate('dashboard');
      }
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed. Please try again.';
      showToast(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      showToast('Google login requires OAuth setup. Use password login for now.', 'warning');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Google login failed';
      showToast(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !loading) {
      handleLogin();
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Heart className="h-16 w-16 text-rose-600 fill-rose-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="text-gray-600 mt-2">Login to find your perfect match</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                onKeyPress={handleKeyPress}
                // placeholder="9876543210"
                    placeholder="+91 Phone Number"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                disabled={loading}
              />
            </div>
         {/* <p className="text-xs text-gray-500 mt-1">Enter with or without +91 prefix</p> */}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter your password"
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                disabled={loading}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-gradient-to-r from-rose-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            <span>{loading ? 'Please wait...' : 'Login'}</span>
            {!loading && <ArrowRight className="h-5 w-5" />}
          </button>
        </div>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        {/* <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full bg-white border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 hover:shadow-md transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
        >
          <GoogleIcon />
          <span>Continue with Google</span>
        </button> */}

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={() => onNavigate('register')}
              className="text-rose-600 font-semibold hover:underline"
              disabled={loading}
            >
              Register Free
            </button>
          </p>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-xs text-blue-800">
            💡 Complete your profile after login to get better match recommendations and 10x more visibility!
          </p>
        </div>
      </div>
    </div>
  );
};