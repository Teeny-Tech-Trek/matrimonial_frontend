// // src/pages/Register.tsx
// import React, { useState, useEffect } from 'react';
// import { Heart, Phone, User, Calendar, Lock, ArrowRight, CheckCircle, Eye, EyeOff } from 'lucide-react';
// import { useAuth } from '../context/AuthContext';
// import { useToast } from '../context/ToastContext'; // ✅ NEW IMPORT

// interface RegisterProps {
//   onNavigate: (page: string) => void;
// }

// export const Register: React.FC<RegisterProps> = ({ onNavigate }) => {
//   const { register } = useAuth();
//   const { showToast } = useToast(); // ✅ NEW: Use toast hook
  
//   const [formData, setFormData] = useState({
//     phoneNumber: '',
//     fullName: '',
//     gender: '',
//     dateOfBirth: '',
//     profileCreatedFor: '',
//     password: '',
//     confirmPassword: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const [registrationSuccess, setRegistrationSuccess] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const getMaxDate = () => {
//     const today = new Date();
//     let yearsToSubtract = 18;
    
//     if (formData.gender === 'male') {
//       yearsToSubtract = 21;
//     }
    
//     const maxDate = new Date(today.setFullYear(today.getFullYear() - yearsToSubtract));
//     return maxDate.toISOString().split('T')[0];
//   };

  
//   useEffect(() => {
//     if (formData.gender && formData.dateOfBirth) {
//       const selectedDate = new Date(formData.dateOfBirth);
//       const today = new Date();
//       const age = today.getFullYear() - selectedDate.getFullYear();
      
//       if (formData.gender === 'male' && age < 21) {
//         setFormData(prev => ({ ...prev, dateOfBirth: '' }));
//         showToast('Please select a date of birth (Male must be 21+)', 'warning'); // ✅ Toast
//       } else if (formData.gender === 'female' && age < 18) {
//         setFormData(prev => ({ ...prev, dateOfBirth: '' }));
//         showToast('Please select a date of birth (Female must be 18+)', 'warning'); // ✅ Toast
//       }
//     }
//   }, [formData.gender, showToast]);

//   const validateAge = () => {
//     if (!formData.dateOfBirth || !formData.gender) return true;
    
//     const selectedDate = new Date(formData.dateOfBirth);
//     const today = new Date();
//     const age = today.getFullYear() - selectedDate.getFullYear();
//     const monthDiff = today.getMonth() - selectedDate.getMonth();
//     const dayDiff = today.getDate() - selectedDate.getDate();
    
//     const actualAge = (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) ? age - 1 : age;
    
//     if (formData.gender === 'male' && actualAge < 21) {
//       showToast('Male applicants must be at least 21 years old', 'error'); // ✅ Toast
//       return false;
//     }
    
//     if (formData.gender === 'female' && actualAge < 18) {
//       showToast('Female applicants must be at least 18 years old', 'error'); // ✅ Toast
//       return false;
//     }
    
//     return true;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log('🚀 Form submitted!');

//     // Validation checks
//     if (formData.password !== formData.confirmPassword) {
//       console.log('❌ Password mismatch');
//       showToast('Passwords do not match', 'error'); // ✅ Toast
//       return;
//     }

//     if (formData.password.length < 6) {
//       console.log('❌ Password too short');
//       showToast('Password must be at least 6 characters', 'error'); // ✅ Toast
//       return;
//     }

//     if (!formData.phoneNumber) {
//       console.log('❌ Phone number missing');
//       showToast('Phone number is required', 'error'); // ✅ Toast
//       return;
//     }

//     if (!validateAge()) {
//       console.log('❌ Age validation failed');
//       return;
//     }

//     console.log('✅ All validations passed');
//     setLoading(true);
    
//     try {
//       const registrationData = {
//         fullName: formData.fullName,
//         phoneNumber: formData.phoneNumber,
//         password: formData.password,
//         gender: formData.gender,
//         dateOfBirth: formData.dateOfBirth,
//         profileCreatedFor: formData.profileCreatedFor,
//       };

//       console.log('📤 Sending registration data:', registrationData);
//       await register(registrationData);
      
//       console.log('✅ Registration API successful!');
//       setRegistrationSuccess(true);
      
//       // Set flag for profile completion modal
//       localStorage.setItem('justRegistered', 'true');
//       console.log('✅ Registration flag set in localStorage');
      
//       // Small delay before showing toast
//       await new Promise(resolve => setTimeout(resolve, 150));
      
//       console.log('🎯 Setting success toast...');
//       showToast('✨ Account created successfully! Redirecting to dashboard...', 'success'); // ✅ Toast
      
//       console.log('⏰ Starting 2 second countdown before redirect...');
//       await new Promise(resolve => setTimeout(resolve, 2000));
      
//       console.log('🚀 Redirecting to dashboard now...');
//       onNavigate('dashboard');
      
//     } catch (err) {
//       console.error('❌ Registration error:', err);
      
//       const errorMessage = err instanceof Error 
//         ? err.message 
//         : 'Registration failed. Please try again.';
      
//       console.log('🎯 Setting error toast:', errorMessage);
//       showToast(errorMessage, 'error'); // ✅ Toast
      
//       setRegistrationSuccess(false);
//     } finally {
//       setLoading(false);
//       console.log('🏁 Loading state set to false');
//     }
//   };

//   return (
//     <div className="relative min-h-screen bg-gradient-to-br from-rose-50 to-pink-50">
//       <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
//         <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
//           <div className="text-center mb-8">
//             <div className="flex justify-center mb-4">
//               <Heart className="h-16 w-16 text-rose-600 fill-rose-600" />
//             </div>
//             <h2 className="text-3xl font-bold text-gray-900">Create Your Profile</h2>
//             <p className="text-gray-600 mt-2">Join thousands finding their perfect match</p>
//           </div>

//           <div className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {/* Full Name */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Full Name *
//                 </label>
//                 <div className="relative">
//                   <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//                   <input
//                     type="text"
//                     value={formData.fullName}
//                     onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
//                     placeholder="Enter your full name"
//                     className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
//                     required
//                     disabled={loading}
//                   />
//                 </div>
//               </div>

//               {/* Phone Number */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Phone Number *
//                 </label>
//                 <div className="relative">
//                   <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//                   <input
//                     type="tel"
//                     value={formData.phoneNumber}
//                     onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
//                     placeholder="+91 Phone Number"
//                     className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
//                     required
//                     disabled={loading}
//                   />
//                 </div>
//                 <p className="text-xs text-gray-500 mt-1">Ex :6283****** </p>
//               </div>

//               {/* Gender */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Gender *
//                 </label>
//                 <select
//                   value={formData.gender}
//                   onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
//                   required
//                   disabled={loading}
//                 >
//                   <option value="">Select Gender</option>
//                   <option value="male">Male (21+ years)</option>
//                   <option value="female">Female (18+ years)</option>
//                 </select>
//               </div>

//               {/* Date of Birth */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Date of Birth *
//                 </label>
//                 <div className="relative">
//                   <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//                   <input
//                     type="date"
//                     value={formData.dateOfBirth}
//                     onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
//                     max={getMaxDate()}
//                     className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
//                     required
//                     disabled={!formData.gender || loading}
//                   />
//                 </div>
//                 {!formData.gender && (
//                   <p className="text-xs text-amber-600 mt-1">⚠️ Please select gender first</p>
//                 )}
//                 {formData.gender && (
//                   <p className="text-xs text-gray-500 mt-1">
//                     {formData.gender === 'male' ? '👨 Must be 21 or older' : '👩 Must be 18 or older'}
//                   </p>
//                 )}
//               </div>

//               {/* Profile Created For */}
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Profile Created For *
//                 </label>
//                 <select
//                   value={formData.profileCreatedFor}
//                   onChange={(e) => setFormData({ ...formData, profileCreatedFor: e.target.value })}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
//                   required
//                   disabled={loading}
//                 >
//                   <option value="">Select Option</option>
//                   <option value="self">Self</option>
//                   <option value="son">Son</option>
//                   <option value="daughter">Daughter</option>
//                   <option value="brother">Brother</option>
//                   <option value="sister">Sister</option>
//                   <option value="friend">Friend</option>
//                   <option value="relative">Relative</option>
//                 </select>
//               </div>

//               {/* Password */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Password *
//                 </label>
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     value={formData.password}
//                     onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//                     placeholder="Minimum 6 characters"
//                     className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
//                     required
//                     disabled={loading}
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
//                     disabled={loading}
//                   >
//                     {showPassword ? (
//                       <EyeOff className="h-5 w-5" />
//                     ) : (
//                       <Eye className="h-5 w-5" />
//                     )}
//                   </button>
//                 </div>
//               </div>

//               {/* Confirm Password */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Confirm Password *
//                 </label>
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//                  <input
//                     type={showConfirmPassword ? "text" : "password"}
//                     value={formData.confirmPassword}
//                     onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
//                     placeholder="Re-enter password"
//                     className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
//                     required
//                     disabled={loading}
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
//                     disabled={loading}
//                   >
//                     {showConfirmPassword ? (
//                       <EyeOff className="h-5 w-5" />
//                     ) : (
//                       <Eye className="h-5 w-5" />
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Submit Button */}
//             <button
//               onClick={handleSubmit}
//               disabled={loading || registrationSuccess}
//               className="w-full bg-gradient-to-r from-rose-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
//             >
//               <span>{loading ? 'Creating Account...' : registrationSuccess ? 'Redirecting...' : 'Create Account'}</span>
//               {!loading && !registrationSuccess && <ArrowRight className="h-5 w-5" />}
//             </button>
//           </div>

//           {/* Login Link */}
//           <div className="mt-6 text-center">
//             <p className="text-gray-600">
//               Already have an account?{' '}
//               <button
//                 onClick={() => onNavigate('login')}
//                 className="text-rose-600 font-semibold hover:underline"
//                 disabled={loading}
//               >
//                 Login
//               </button>
//             </p>
//           </div>

//           {/* Success Info Box */}
//           {registrationSuccess && (
//             <div className="mt-6 p-4 bg-green-50 border-2 border-green-300 rounded-lg animate-pulse">
//               <p className="text-sm font-bold text-green-900 mb-3 flex items-center gap-2">
//                 <CheckCircle className="h-5 w-5" />
//                 ✨ Registration Successful!
//               </p>
//               <p className="text-sm font-medium text-green-800 mb-2">📝 What happens next:</p>
//               <p className="text-xs text-green-700 mb-1">✅ You'll be redirected to your dashboard</p>
//               <p className="text-xs text-green-700 mb-1">✅ A popup will guide you to complete your profile</p>
//               <p className="text-xs text-green-700 mb-1">✅ You can skip and complete it later anytime</p>
//               <p className="text-xs text-green-700">✅ Complete profile gets 10x more visibility!</p>
//             </div>
//           )}

//           {/* Info Box (Before Registration) */}
//           {!registrationSuccess && (
//             <div className="mt-6 p-4 bg-blue-50 rounded-lg">
//               <p className="text-sm font-medium text-blue-900 mb-2">📝 What happens next:</p>
//               <p className="text-xs text-blue-800 mb-1">• You'll be redirected to your dashboard</p>
//               <p className="text-xs text-blue-800 mb-1">• A popup will guide you to complete your profile</p>
//               <p className="text-xs text-blue-800 mb-1">• You can skip and complete it later anytime</p>
//               <p className="text-xs text-blue-800">• Complete profile gets 10x more visibility!</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// src/pages/Register.tsx
import React, { useState, useEffect } from 'react';
import { Heart, Phone, User, Calendar, Lock, ArrowRight, CheckCircle, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

interface RegisterProps {
  onNavigate: (page: string) => void;
}

export const Register: React.FC<RegisterProps> = ({ onNavigate }) => {
  const { register } = useAuth();
  const { showToast } = useToast();
  
  const [formData, setFormData] = useState({
    phoneNumber: '',
    fullName: '',
    gender: '',
    dateOfBirth: '',
    profileCreatedFor: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const getMaxDate = () => {
    const today = new Date();
    let yearsToSubtract = 18;
    
    if (formData.gender === 'male') {
      yearsToSubtract = 21;
    }
    
    const maxDate = new Date(today.setFullYear(today.getFullYear() - yearsToSubtract));
    return maxDate.toISOString().split('T')[0];
  };

  
  useEffect(() => {
    if (formData.gender && formData.dateOfBirth) {
      const selectedDate = new Date(formData.dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - selectedDate.getFullYear();
      
      if (formData.gender === 'male' && age < 21) {
        setFormData(prev => ({ ...prev, dateOfBirth: '' }));
        showToast('Please select a date of birth (Male must be 21+)', 'warning');
      } else if (formData.gender === 'female' && age < 18) {
        setFormData(prev => ({ ...prev, dateOfBirth: '' }));
        showToast('Please select a date of birth (Female must be 18+)', 'warning');
      }
    }
  }, [formData.gender, showToast]);

  const validateAge = () => {
    if (!formData.dateOfBirth || !formData.gender) return true;
    
    const selectedDate = new Date(formData.dateOfBirth);
    const today = new Date();
    const age = today.getFullYear() - selectedDate.getFullYear();
    const monthDiff = today.getMonth() - selectedDate.getMonth();
    const dayDiff = today.getDate() - selectedDate.getDate();
    
    const actualAge = (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) ? age - 1 : age;
    
    if (formData.gender === 'male' && actualAge < 21) {
      showToast('Male applicants must be at least 21 years old', 'error');
      return false;
    }
    
    if (formData.gender === 'female' && actualAge < 18) {
      showToast('Female applicants must be at least 18 years old', 'error');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation checks
    if (formData.password !== formData.confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }

    if (formData.password.length < 6) {
      showToast('Password must be at least 6 characters', 'error');
      return;
    }

    if (!formData.phoneNumber) {
      showToast('Phone number is required', 'error');
      return;
    }

    if (!validateAge()) {
      return;
    }

    setLoading(true);
    
    try {
      const registrationData = {
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
        gender: formData.gender,
        dateOfBirth: formData.dateOfBirth,
        profileCreatedFor: formData.profileCreatedFor,
      };

      await register(registrationData);
      
      setRegistrationSuccess(true);
      
      // Set flag for profile completion modal
      localStorage.setItem('justRegistered', 'true');
      
      // Small delay before showing toast
      await new Promise(resolve => setTimeout(resolve, 150));
      
      showToast('✨ Account created successfully! Redirecting to dashboard...', 'success');
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      onNavigate('dashboard');
      
    } catch (err) {
      
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'Registration failed. Please try again.';
      
      showToast(errorMessage, 'error');
      
      setRegistrationSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-rose-50 to-pink-50">
      <div className="min-h-screen flex items-center justify-center py-6 sm:py-8 md:py-12 px-3 sm:px-4 md:px-6">
        <div className="max-w-2xl w-full bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="flex justify-center mb-3 sm:mb-4">
              <Heart className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 text-rose-600 fill-rose-600" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Create Your Profile</h2>
            <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2 px-2">Join thousands finding their perfect match</p>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Enter your full name"
                    className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                  <input
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    placeholder="+91 Phone Number"
                    className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    required
                    disabled={loading}
                  />
                </div>
                <p className="text-[10px] sm:text-xs text-gray-500 mt-1">Ex: 6283****** </p>
              </div>

              {/* Gender */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                  Gender *
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  required
                  disabled={loading}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male (21+ years)</option>
                  <option value="female">Female (18+ years)</option>
                </select>
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                  Date of Birth *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    max={getMaxDate()}
                    className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                    required
                    disabled={!formData.gender || loading}
                  />
                </div>
                {!formData.gender && (
                  <p className="text-[10px] sm:text-xs text-amber-600 mt-1">⚠️ Please select gender first</p>
                )}
                {formData.gender && (
                  <p className="text-[10px] sm:text-xs text-gray-500 mt-1">
                    {formData.gender === 'male' ? '👨 Must be 21 or older' : '👩 Must be 18 or older'}
                  </p>
                )}
              </div>

              {/* Profile Created For */}
              <div className="sm:col-span-2">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                  Profile Created For *
                </label>
                <select
                  value={formData.profileCreatedFor}
                  onChange={(e) => setFormData({ ...formData, profileCreatedFor: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  required
                  disabled={loading}
                >
                  <option value="">Select Option</option>
                  <option value="self">Self</option>
                  <option value="son">Son</option>
                  <option value="daughter">Daughter</option>
                  <option value="brother">Brother</option>
                  <option value="sister">Sister</option>
                  <option value="friend">Friend</option>
                  <option value="relative">Relative</option>
                </select>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                  Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Minimum 6 characters"
                    className="w-full pl-9 sm:pl-10 pr-10 sm:pr-12 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                    disabled={loading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" />
                    ) : (
                      <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                  Confirm Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder="Re-enter password"
                    className="w-full pl-9 sm:pl-10 pr-10 sm:pr-12 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                    disabled={loading}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" />
                    ) : (
                      <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={loading || registrationSuccess}
              className="w-full bg-gradient-to-r from-rose-600 to-pink-600 text-white py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <span>{loading ? 'Creating Account...' : registrationSuccess ? 'Redirecting...' : 'Create Account'}</span>
              {!loading && !registrationSuccess && <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />}
            </button>
          </div>

          {/* Login Link */}
          <div className="mt-4 sm:mt-6 text-center">
            <p className="text-sm sm:text-base text-gray-600">
              Already have an account?{' '}
              <button
                onClick={() => onNavigate('login')}
                className="text-rose-600 font-semibold hover:underline"
                disabled={loading}
              >
                Login
              </button>
            </p>
          </div>

          {/* Success Info Box */}
          {registrationSuccess && (
            <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-green-50 border-2 border-green-300 rounded-lg animate-pulse">
              <p className="text-xs sm:text-sm font-bold text-green-900 mb-2 sm:mb-3 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                ✨ Registration Successful!
              </p>
              <p className="text-xs sm:text-sm font-medium text-green-800 mb-1.5 sm:mb-2">📝 What happens next:</p>
              <p className="text-[10px] sm:text-xs text-green-700 mb-1">✅ You'll be redirected to your dashboard</p>
              <p className="text-[10px] sm:text-xs text-green-700 mb-1">✅ A popup will guide you to complete your profile</p>
              <p className="text-[10px] sm:text-xs text-green-700 mb-1">✅ You can skip and complete it later anytime</p>
              <p className="text-[10px] sm:text-xs text-green-700">✅ Complete profile gets 10x more visibility!</p>
            </div>
          )}

          {/* Info Box (Before Registration) */}
          {!registrationSuccess && (
            <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-50 rounded-lg">
              <p className="text-xs sm:text-sm font-medium text-blue-900 mb-1.5 sm:mb-2">📝 What happens next:</p>
              <p className="text-[10px] sm:text-xs text-blue-800 mb-1">• You'll be redirected to your dashboard</p>
              <p className="text-[10px] sm:text-xs text-blue-800 mb-1">• A popup will guide you to complete your profile</p>
              <p className="text-[10px] sm:text-xs text-blue-800 mb-1">• You can skip and complete it later anytime</p>
              <p className="text-[10px] sm:text-xs text-blue-800">• Complete profile gets 10x more visibility!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};