
// import React, { useEffect, useState } from 'react';
// import { Heart, MessageCircle, Star, TrendingUp, Users, UserPlus, Loader2, User, X, AlertCircle, Edit } from 'lucide-react';
// import { useAuth } from '../context/AuthContext';
// import { CompleteProfile } from '../types';
// import { ProfileCard } from '../components/ProfileCard';

// interface DashboardProps {
//   onNavigate: (page: string, data?: any) => void;
// }

// // Profile Completion Modal Component
// const ProfileCompletionModal: React.FC<{
//   isOpen: boolean;
//   onClose: () => void;
//   onComplete: () => void;
//   completionPercentage: number;
//   missingFields: string[];
// }> = ({ isOpen, onClose, onComplete, completionPercentage, missingFields }) => {
//   const handleSkip = () => {
//     const skipData = {
//       skipped: true,
//       skippedAt: new Date().toISOString(),
//       profileCompletion: completionPercentage
//     };
//     localStorage.setItem('profileCompletionSkipped', JSON.stringify(skipData));
//     console.log('✅ Profile completion skipped:', skipData);
//     onClose();
//   };

//   if (!isOpen || completionPercentage === 100) return null;

//   return (
//     <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
//       <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden animate-scale-in">
//         <div className="bg-gradient-to-r from-rose-600 to-pink-600 p-6 text-white relative">
//           <button
//             onClick={onClose}
//             className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
//           >
//             <X className="h-6 w-6" />
//           </button>
//           <div className="flex items-center gap-4">
//             <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-full flex-shrink-0">
//               <AlertCircle className="h-8 w-8" />
//             </div>
//             <div>
//               <h2 className="text-2xl font-bold mb-1">Complete Your Profile</h2>
//               <p className="text-rose-100">Help us find your perfect match by completing your profile</p>
//             </div>
//           </div>
//         </div>
//         <div className="p-6">
//           <div className="grid md:grid-cols-3 gap-6">
//             <div className="flex flex-col items-center justify-center">
//               <div className="relative">
//                 <svg className="w-40 h-40 transform -rotate-90">
//                   <circle
//                     cx="80"
//                     cy="80"
//                     r="70"
//                     stroke="#FEE2E2"
//                     strokeWidth="12"
//                     fill="none"
//                   />
//                   <circle
//                     cx="80"
//                     cy="80"
//                     r="70"
//                     stroke="#E11D48"
//                     strokeWidth="12"
//                     fill="none"
//                     strokeDasharray={`${(completionPercentage / 100) * 440} 440`}
//                     strokeLinecap="round"
//                     className="transition-all duration-1000"
//                   />
//                 </svg>
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <div className="text-center">
//                     <div className="text-4xl font-bold text-gray-900">{completionPercentage}%</div>
//                     <div className="text-sm text-gray-600">Complete</div>
//                   </div>
//                 </div>
//               </div>
//               <p className="text-sm text-gray-500 mt-4 text-center">
//                 Complete all sections to maximize your matches
//               </p>
//             </div>
//             <div>
//               <h3 className="text-sm font-semibold text-gray-700 mb-3">
//                 Sections to Complete:
//               </h3>
//               <div className="space-y-2">
//                 {missingFields.length > 0 ? (
//                   missingFields.map((field, index) => (
//                     <div
//                       key={index}
//                       className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-2 rounded-lg"
//                     >
//                       <div className="w-2 h-2 bg-rose-500 rounded-full flex-shrink-0"></div>
//                       <span>{field}</span>
//                     </div>
//                   ))
//                 ) : (
//                   <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
//                     Please complete your profile to see missing sections
//                   </div>
//                 )}
//               </div>
//             </div>
//             <div className="flex flex-col justify-between">
//               <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
//                 <h4 className="text-sm font-semibold text-blue-900 mb-2">
//                   Why complete?
//                 </h4>
//                 <ul className="space-y-1 text-xs text-blue-800">
//                   <li>✓ Better match recommendations</li>
//                   <li>✓ 10x more profile visibility</li>
//                   <li>✓ Receive more interests</li>
//                   <li>✓ Build trust with matches</li>
//                 </ul>
//               </div>
//               <div className="space-y-2">
//                 <button
//                   onClick={() => {
//                     onComplete();
//                     onClose();
//                   }}
//                   className="w-full bg-gradient-to-r from-rose-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
//                 >
//                   <Edit className="h-5 w-5" />
//                   Complete Profile Now
//                 </button>
//                 <button
//                   onClick={handleSkip}
//                   className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-all text-sm"
//                 >
//                   Skip for Now
//                 </button>
//                 <p className="text-xs text-center text-gray-500 mt-2">
//                   You can complete your profile anytime
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <style>{`
//         @keyframes scale-in {
//           from {
//             opacity: 0;
//             transform: scale(0.95);
//           }
//           to {
//             opacity: 1;
//             transform: scale(1);
//           }
//         }
//         .animate-scale-in {
//           animation: scale-in 0.3s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// };

// export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
//   const { currentUser } = useAuth();
//   const [profiles, setProfiles] = useState<CompleteProfile[]>([]);
//   const [stats, setStats] = useState({
//     interests: 0,
//     messages: 0,
//     matches: 0,
//     pendingRequests: 0,
//     profileCompletion: 0,
//   });
//   const [missingFields, setMissingFields] = useState<string[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [showCompletionModal, setShowCompletionModal] = useState(false);
//   const [dataFetched, setDataFetched] = useState(false);

//   // Fetch dashboard data on component mount
//   useEffect(() => {
//     fetchDashboardData();
//   }, [currentUser]);

//   // Check if modal should open AFTER data is fetched
//   useEffect(() => {
//     if (!dataFetched || loading) {
//       return;
//     }

//     console.log('🔍 Checking if modal should open...');
//     console.log('📊 Profile completion:', stats.profileCompletion);
    
//     // Don't show modal if profile is 100% complete
//     if (stats.profileCompletion >= 100) {
//       console.log('✅ Profile is complete, not showing modal');
//       // Clean up any old flags
//       localStorage.removeItem('justRegistered');
//       localStorage.removeItem('justLoggedIn');
//       return;
//     }

//     // Check if user should see the modal
//     const justRegistered = localStorage.getItem('justRegistered');
//     const justLoggedIn = localStorage.getItem('justLoggedIn');
    
//     console.log('🔍 Just registered:', justRegistered);
//     console.log('🔍 Just logged in:', justLoggedIn);
    
//     // Check if user has skipped the modal recently
//     const skipDataStr = localStorage.getItem('profileCompletionSkipped');
//     let shouldSkip = false;
    
//     if (skipDataStr) {
//       try {
//         const skipData = JSON.parse(skipDataStr);
//         const skippedAt = new Date(skipData.skippedAt);
//         const hoursSinceSkip = (Date.now() - skippedAt.getTime()) / (1000 * 60 * 60);
        
//         // For regular logins, show modal again after 24 hours
//         // For new registrations, always show regardless of skip
//         if (justRegistered !== 'true' && hoursSinceSkip < 24) {
//           shouldSkip = true;
//           console.log('⏭️ User skipped within 24 hours (login), not showing modal');
//         } else {
//           console.log('🔄 Skip expired or new registration, will show modal');
//           localStorage.removeItem('profileCompletionSkipped');
//         }
//       } catch (e) {
//         console.error('Error parsing skip data:', e);
//         localStorage.removeItem('profileCompletionSkipped');
//       }
//     }

//     if (shouldSkip) {
//       // Still clean up the flags
//       localStorage.removeItem('justRegistered');
//       localStorage.removeItem('justLoggedIn');
//       return;
//     }

//     // Show modal if:
//     // 1. User just registered OR just logged in
//     // 2. Profile is incomplete (< 100%)
//     // 3. Haven't skipped recently (or it's a new registration)
//     if ((justRegistered === 'true' || justLoggedIn === 'true') && stats.profileCompletion < 100) {
//       console.log('✅ Showing profile completion modal in 1 second...');
//       console.log('📋 Reason:', justRegistered === 'true' ? 'New registration' : 'Login with incomplete profile');
      
//       setTimeout(() => {
//         setShowCompletionModal(true);
//       }, 1000);
      
//       // Remove the flags after showing modal
//       localStorage.removeItem('justRegistered');
//       localStorage.removeItem('justLoggedIn');
//     } else {
//       console.log('⏭️ Not showing modal - no trigger flag or profile complete');
//     }
//   }, [dataFetched, loading, stats.profileCompletion]);

//   const fetchDashboardData = async () => {
//     try {
//       setLoading(true);
//       setError('');
      
//       console.log('📥 Fetching dashboard data for user:', currentUser?.id);
      
//       const token = localStorage.getItem('authToken');
//       if (!token) {
//         setError('Please log in to view your dashboard');
//         setLoading(false);
//         return;
//       }

//       // Fetch dashboard stats
//       //  const statsResponse = await fetch('https://matrimonial-backend-14t2.onrender.com/api/dashboard/stats', {
//       const statsResponse = await fetch('https://matrimonial-backend-14t2.onrender.com/api/dashboard/stats', {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       const statsData = await statsResponse.json();
//       console.log('📦 Stats API Response:', statsData);
      
//       if (!statsResponse.ok || !statsData.success) {
//         throw new Error(statsData.message || 'Failed to load stats');
//       }

//       // Fetch recommended profiles
 
//       // const profilesResponse = await fetch('https://matrimonial-backend-14t2.onrender.com/api/dashboard/recommended?page=1&limit=50', {
//       const profilesResponse = await fetch(
//         'https://matrimonial-backend-14t2.onrender.com/api/dashboard/recommended?page=1&limit=50',
//         {
//           method: 'GET',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       const profilesData = await profilesResponse.json();
//       console.log('📦 Profiles API Response:', profilesData);

//       if (profilesResponse.ok && profilesData.success) {
//         const filteredProfiles = profilesData.data.filter((profile: CompleteProfile) => {
//           const profileUserId = profile.userId || profile.id || profile._id;
//           return profileUserId !== currentUser?.id;
//         });
        
//         console.log('✅ Total profiles:', profilesData.data.length);
//         console.log('✅ Filtered profiles:', filteredProfiles.length);
        
//         setProfiles(filteredProfiles);
//       } else {
//         setProfiles([]);
//       }

//       if (statsData.success) {
//         const profileCompletion = statsData.data.profileCompletion || 0;
        
//         setStats({
//           interests: statsData.data.interests || 0,
//           messages: statsData.data.messages || 0,
//           matches: statsData.data.matches || 0,
//           pendingRequests: statsData.data.pendingRequests || 0,
//           profileCompletion: profileCompletion,
//         });
        
//         console.log('📊 Profile completion set to:', profileCompletion);
        
//         // Calculate missing fields
//         const profile = statsData.data;
//         const missing: string[] = [];
        
//         if (!profile.personalDetails?.heightCm) missing.push('Personal Details (Height, Body Type, etc.)');
//         if (!profile.religiousDetails?.religion) missing.push('Religious Background');
//         if (!profile.educationDetails?.highestEducation) missing.push('Education Details');
//         if (!profile.professionalDetails?.occupation) missing.push('Professional Details');
//         if (!profile.familyDetails?.fatherOccupation) missing.push('Family Details');
//         if (!profile.lifestylePreferences?.aboutMe || profile.lifestylePreferences?.aboutMe?.length < 50) {
//           missing.push('About Me & Partner Expectations');
//         }
        
//         if (missing.length === 0 && profileCompletion < 100) {
//           missing.push('Complete your profile information');
//           missing.push('Add photos to your profile');
//           missing.push('Fill in all required details');
//         }
        
//         setMissingFields(missing);
//         console.log('📋 Missing fields:', missing);
        
//         setDataFetched(true);
//       } else {
//         setError(statsData.message || 'Failed to load dashboard data');
//       }
//     } catch (err: any) {
//       console.error('❌ Error fetching dashboard data:', err);
//       setError('Failed to connect to the server. Please check your connection.');
//       setProfiles([]);
//       setDataFetched(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSendInterest = (profileId: string) => {
//     alert('Interest sent successfully!');
//   };

//   const handleMessage = (profileId: string) => {
//     onNavigate('messages', { profileId });
//   };

//   return (
//     <div className="space-y-8">
//       {/* Profile Completion Modal */}
//       <ProfileCompletionModal
//         isOpen={showCompletionModal}
//         onClose={() => setShowCompletionModal(false)}
//         onComplete={() => onNavigate('profile-setup')}
//         completionPercentage={stats.profileCompletion}
//         missingFields={missingFields}
//       />

//       {/* Welcome Banner */}
//       <div className="bg-gradient-to-r from-rose-600 to-pink-600 rounded-2xl p-8 text-white">
//         <h1 className="text-3xl font-bold mb-2">
//           Welcome back, {currentUser?.fullName?.split(' ')[0]}!
//         </h1>
//         <p className="text-rose-100">
//           Here are your AI-recommended matches based on your preferences
//         </p>
//         <div className="mt-4 flex items-center gap-4 flex-wrap">
//           {stats.profileCompletion < 100 && (
//             <button
//               onClick={() => setShowCompletionModal(true)}
//               className="inline-block bg-white/20 px-4 py-2 rounded-full hover:bg-white/30 transition-colors cursor-pointer"
//             >
//               Profile Completion: {stats.profileCompletion}%
//             </button>
//           )}
//           {stats.profileCompletion === 100 && (
//             <div className="inline-flex items-center gap-2 bg-green-500/20 px-4 py-2 rounded-full">
//               <span className="text-sm">✓ Profile Complete</span>
//             </div>
//           )}
//           {stats.profileCompletion < 100 && (
//             <button
//               onClick={() => onNavigate('profile-setup')}
//               className="bg-rose-700 text-white px-6 py-2 rounded-lg font-semibold hover:bg-rose-800 transition-colors"
//             >
//               Complete Profile
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
//           <div className="flex items-center justify-between mb-4">
//             <Heart className="h-8 w-8 text-rose-600 fill-rose-600" />
//             <TrendingUp className="h-5 w-5 text-green-500" />
//           </div>
//           <div className="text-3xl font-bold text-gray-900 mb-1">{stats.interests}</div>
//           <div className="text-sm text-gray-600">Interests Received</div>
//         </div>
//         <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
//           <div className="flex items-center justify-between mb-4">
//             <MessageCircle className="h-8 w-8 text-green-600" />
//             <TrendingUp className="h-5 w-5 text-green-500" />
//           </div>
//           <div className="text-3xl font-bold text-gray-900 mb-1">{stats.messages}</div>
//           <div className="text-sm text-gray-600">New Messages</div>
//         </div>
//         <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
//           <div className="flex items-center justify-between mb-4">
//             <Star className="h-8 w-8 text-amber-600 fill-amber-600" />
//             <TrendingUp className="h-5 w-5 text-green-500" />
//           </div>
//           <div className="text-3xl font-bold text-gray-900 mb-1">{stats.matches}</div>
//           <div className="text-sm text-gray-600">Mutual Matches</div>
//         </div>
//       </div>

//       {/* View Requests Card */}
//       <div
//         onClick={() => onNavigate('requests')}
//         className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all cursor-pointer group relative overflow-hidden"
//       >
//         <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-pink-600 opacity-0 group-hover:opacity-5 transition-opacity"></div>
//         <div className="flex items-center justify-between relative z-10">
//           <div>
//             <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
//               <UserPlus className="h-6 w-6 text-rose-600" />
//               View Requests
//             </h3>
//             <p className="text-gray-600">{stats.pendingRequests} new connection requests waiting</p>
//           </div>
//           <div className="relative">
//             <div className="w-20 h-20 bg-gradient-to-r from-rose-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
//               <UserPlus className="h-10 w-10 text-white" />
//             </div>
//             {stats.pendingRequests > 0 && (
//               <span className="absolute -top-2 -right-2 bg-gradient-to-r from-rose-600 to-pink-600 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
//                 {stats.pendingRequests} New
//               </span>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Profiles Section */}
//       <div>
//         <div className="flex items-center justify-between mb-6">
//           <h2 className="text-2xl font-bold text-gray-900">AI Recommended Matches</h2>
//           <div className="text-sm text-gray-600">
//             Showing {profiles.length} profile{profiles.length !== 1 ? 's' : ''}
//           </div>
//         </div>

//         {/* Error Message */}
//         {error && (
//           <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
//             <p className="text-red-700">{error}</p>
//             <button
//               onClick={() => fetchDashboardData()}
//               className="mt-2 text-red-600 font-semibold hover:underline"
//             >
//               Try Again
//             </button>
//           </div>
//         )}

//         {/* Loading State */}
//         {loading ? (
//           <div className="flex items-center justify-center py-12 bg-white rounded-xl">
//             <div className="text-center">
//               <Loader2 className="h-12 w-12 animate-spin text-rose-600 mx-auto mb-4" />
//               <p className="text-gray-600">Loading profiles...</p>
//             </div>
//           </div>
//         ) : (
//           <>
//             {/* Profile Grid */}
//             {profiles.length > 0 ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {profiles.map(profile => (
//                   <ProfileCard
//                     key={profile.id || profile._id}
//                     profile={profile}
//                     onViewProfile={(id) => onNavigate('profile-view', { profileId: id })}
//                     onSendInterest={handleSendInterest}
//                     onMessage={handleMessage}
//                   />
//                 ))}
//               </div>
//             ) : (
//               /* Empty State */
//               <div className="text-center py-12 bg-white rounded-xl">
//                 <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
//                 <h3 className="text-xl font-semibold text-gray-900 mb-2">No matches found</h3>
//                 <p className="text-gray-600 mb-4">
//                   Complete your profile to improve your recommendations
//                 </p>
//                 <button
//                   onClick={() => onNavigate('profile-setup')}
//                   className="px-6 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700"
//                 >
//                   Complete Your Profile
//                 </button>
//               </div>
//             )}
//           </>
//         )}
//       </div>

//       {/* Membership Upgrade Banner */}
//       <div className="bg-white rounded-xl shadow-lg p-8">
//         <h3 className="text-xl font-bold text-gray-900 mb-4">Upgrade Your Membership</h3>
//         <div className="flex flex-col md:flex-row items-center justify-between">
//           <div className="mb-4 md:mb-0">
//             <p className="text-gray-600 mb-2">Get unlimited access to premium features</p>
//             <ul className="space-y-1 text-sm text-gray-600">
//               <li>✓ Unlimited profile views</li>
//               <li>✓ Send unlimited interests</li>
//               <li>✓ Chat with matches</li>
//               <li>✓ View contact information</li>
//             </ul>
//           </div>
//           <button
//             onClick={() => onNavigate('membership')}
//             className="px-8 py-3 bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
//           >
//             View Plans
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };



import React, { useEffect, useState } from 'react';
  import { Heart, MessageCircle, Star, TrendingUp, Users, UserPlus, Loader2, User, X, AlertCircle, Edit } from 'lucide-react';
  import { useAuth } from '../context/AuthContext';
  import { CompleteProfile } from '../types';
  import { ProfileCard } from '../components/ProfileCard';

  interface DashboardProps {
    onNavigate: (page: string, data?: any) => void;
  }

  // ========================================
  // 🔧 API CONFIGURATION
  // ========================================
  const API_CONFIG = {
  //  For local development
    // STATS_API: 'http://localhost:5000/api/dashboard/stats',
    // PROFILE_LIST_API: 'http://localhost:5000/api/profile/list',
    // SEND_INTEREST_API: 'http://localhost:5000/api/request/send',
    // // ✅ NEW: Add accepted connections API
    // ACCEPTED_CONNECTIONS_API: 'http://localhost:5000/api/request/connections/accepted',
    
    // For production, uncomment these:
    STATS_API: 'https://api.rsaristomatch.com/api/dashboard/stats',
    PROFILE_LIST_API: 'https://api.rsaristomatch.com/api/profile/list',
    SEND_INTEREST_API: 'https://api.rsaristomatch.com/api/request/send',
    ACCEPTED_CONNECTIONS_API: 'https://api.rsaristomatch.com/api/request/connections/accepted',
  };

// Profile Completion Modal Component
  const ProfileCompletionModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onComplete: () => void;
    completionPercentage: number;
    missingFields: string[];
  }> = ({ isOpen, onClose, onComplete, completionPercentage, missingFields }) => {
      // Treat 98% or higher as 100% complete
    const isProfileComplete = completionPercentage >= 98;

    const handleSkip = () => {
      const skipData = {
        skipped: true,
        skippedAt: new Date().toISOString(),
        profileCompletion: completionPercentage
      };
      localStorage.setItem('profileCompletionSkipped', JSON.stringify(skipData));
      onClose();
    };

    // if (!isOpen || completionPercentage === 100) return null;
    if (!isOpen || isProfileComplete) return null;

    return (
        <div
          className="
            fixed inset-0 bg-black/50 backdrop-blur-sm z-50 
            p-2 sm:p-4 
            pt-20 pl-6 sm:pt-0 
            sm:flex sm:items-center sm:justify-center"
        >
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-[95%] sm:max-w-4xl w-full overflow-hidden animate-scale-in max-h-[90vh] flex flex-col">
          <div className="bg-gradient-to-r from-rose-600 to-pink-600 p-4 sm:p-6 text-white relative flex-shrink-0">
            <button
              onClick={onClose}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-white/80 hover:text-white transition-colors"
            >
              <X className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
            <div className="flex items-center gap-3 sm:gap-4 pr-8 sm:pr-0">
              <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-full flex-shrink-0">
                <AlertCircle className="h-6 w-6 sm:h-8 sm:w-8" />
              </div>
              <div>
                <h2 className="text-lg sm:text-2xl font-bold mb-0.5 sm:mb-1">Complete Your Profile</h2>
                <p className="text-xs sm:text-base text-rose-100">Help us find your perfect match by completing your profile</p>
              </div>
            </div>
          </div>
          <div className="px-2 pb-2 pt-4 sm:p-6 overflow-y-auto flex-1 ">
            <div className="flex flex-col gap-2 sm:gap-6 md:grid md:grid-cols-3 -mt-2 sm:mt-0">
              <div className="flex flex-col items-center justify-center md:col-span-3 lg:col-span-1">
                <div className="relative">
                  <svg className="w-14 h-14 sm:w-32 sm:h-32 md:w-40 md:h-40 transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#FEE2E2"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#E11D48"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${((completionPercentage || 20) / 100) * 251.2} 251.2`}
                      strokeLinecap="round"
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-base sm:text-3xl md:text-4xl font-bold text-gray-900">{completionPercentage || 20}%</div>
                      <div className="text-[7px] sm:text-xs md:text-sm text-gray-600">Complete</div>
                    </div>
                  </div>
                </div>
                <p className="text-[7px] sm:text-xs md:text-sm text-gray-500 mt-1 sm:mt-3 md:mt-4 text-center px-2">
                  Complete all sections to maximize your matches
                </p>
              </div>
               <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                 Sections to Complete:
               </h3>
               <div className="space-y-2">
                 {missingFields.length > 0 ? (
                  missingFields.map((field, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-2 rounded-lg"
                    >
                      <div className="w-2 h-2 bg-rose-500 rounded-full flex-shrink-0"></div>
                      <span>{field}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                    Please complete your profile to see missing sections
                  </div>
                )}
              </div>
            </div>
              <div className="flex flex-col justify-between md:col-span-3 lg:col-span-1">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-1.5 sm:p-4 mb-1.5 sm:mb-4">
                  <h4 className="text-[9px] sm:text-sm font-semibold text-blue-900 mb-0.5 sm:mb-2">
                    Why complete?
                  </h4>
                  <ul className="space-y-0.5 sm:space-y-1 text-[7px] sm:text-xs text-blue-800">
                    <li>✓ Better match recommendations</li>
                    <li>✓ 10x more profile visibility</li>
                    <li>✓ Receive more interests</li>
                    <li>✓ Build trust with matches</li>
                  </ul>
                </div>
                <div className="space-y-1 sm:space-y-2">
                  <button
                    onClick={() => {
                      onComplete();
                      onClose();
                    }}
                    className="w-full bg-gradient-to-r from-rose-600 to-pink-600 text-white py-1.5 sm:py-3 rounded-lg text-[10px] sm:text-base font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-1 sm:gap-2"
                  >
                    <Edit className="h-2.5 w-2.5 sm:h-5 sm:w-5" />
                    Complete Profile Now
                  </button>
                  <button
                    onClick={handleSkip}
                    className="w-full bg-gray-100 text-gray-700 py-1 sm:py-2 rounded-lg font-semibold hover:bg-gray-200 transition-all text-[9px] sm:text-sm"
                  >
                    Skip for Now
                  </button>
                  <p className="text-[7px] sm:text-xs text-center text-gray-500">
                    You can complete your profile anytime
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <style>{`
          @keyframes scale-in {
            from {
              opacity: 0;
              transform: scale(0.95);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          .animate-scale-in {
            animation: scale-in 0.3s ease-out;
          }
        `}</style>
      </div>
    );
  };

  export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
    const { currentUser } = useAuth();
    const [profiles, setProfiles] = useState<CompleteProfile[]>([]);
    const [stats, setStats] = useState({
      interests: 0,
      messages: 0,
      matches: 0,
      pendingRequests: 0,
      profileCompletion: 0,
    });
    const [missingFields, setMissingFields] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showCompletionModal, setShowCompletionModal] = useState(false);
    const [dataFetched, setDataFetched] = useState(false);
    // ✅ NEW: State to store accepted connection IDs
    const [acceptedConnectionIds, setAcceptedConnectionIds] = useState<string[]>([]);

    // Fetch dashboard data on component mount
    useEffect(() => {
      fetchDashboardData();
    }, [currentUser]);

    // Check if modal should open AFTER data is fetched
    useEffect(() => {
      if (!dataFetched || loading) {
        return;
      }

      
      if (stats.profileCompletion >= 98) {
        console.log('✅ Profile is complete, not showing modal');
        localStorage.removeItem('justRegistered');
        localStorage.removeItem('justLoggedIn');
        return;
      }

      const justRegistered = localStorage.getItem('justRegistered');
      const justLoggedIn = localStorage.getItem('justLoggedIn');
      
      
      const skipDataStr = localStorage.getItem('profileCompletionSkipped');
      let shouldSkip = false;
      
      if (skipDataStr) {
        try {
          const skipData = JSON.parse(skipDataStr);
          const skippedAt = new Date(skipData.skippedAt);
          const hoursSinceSkip = (Date.now() - skippedAt.getTime()) / (1000 * 60 * 60);
          
          if (justRegistered !== 'true' && hoursSinceSkip < 24) {
            shouldSkip = true;
            console.log('⏭️ User skipped within 24 hours (login), not showing modal');
          } else {
            console.log('🔄 Skip expired or new registration, will show modal');
            localStorage.removeItem('profileCompletionSkipped');
          }
        } catch (e) {
          console.error('Error parsing skip data:', e);
          localStorage.removeItem('profileCompletionSkipped');
        }
      }

      if (shouldSkip) {
        localStorage.removeItem('justRegistered');
        localStorage.removeItem('justLoggedIn');
        return;
      }

      if ((justRegistered === 'true' || justLoggedIn === 'true') && stats.profileCompletion < 100) {
      
        setTimeout(() => {
          setShowCompletionModal(true);
        }, 1000);
        
        localStorage.removeItem('justRegistered');
        localStorage.removeItem('justLoggedIn');
      } 
    }, [dataFetched, loading, stats.profileCompletion]);

    // ✅ NEW FUNCTION: Fetch accepted connections
 const fetchAcceptedConnections = async (token: string) => {
  try {
    console.log('🔍 Fetching accepted connections...');
    
    const response = await fetch(API_CONFIG.ACCEPTED_CONNECTIONS_API, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const result = await response.json();
      console.log('✅ Accepted Connections Response:', result);
      
      // ✅ FIX 1: Your API returns connections in 'data' field, NOT 'connections'
      const connections = result.data || [];
      
      if (connections.length === 0) {
        console.log('⚠️ No accepted connections found');
        setAcceptedConnectionIds([]);
        return;
      }
      
      console.log(`📊 Found ${connections.length} accepted connection(s)`);
      
      // Debug: Show the structure of the first connection
      if (connections[0]) {
        console.log('🔍 First connection object:', connections[0]);
        console.log('🔍 Connection keys:', Object.keys(connections[0]));
      }
      
      // Get current user ID to exclude it
      const currentUserId = currentUser?.id || currentUser?.userId;
      console.log('👤 Current user ID:', currentUserId);
      
      // ✅ FIX 2: Extract user IDs from connections
      // Try multiple fields to handle different API response structures
      const connectedUserIds = connections.map((conn: any) => {
        // Collect all possible user IDs from the connection object
        const possibleIds = [
          conn.userId,           // Direct userId field
          conn.senderId,         // If connection has senderId
          conn.receiverId,       // If connection has receiverId
          conn.sender?._id,      // Nested sender object with _id
          conn.sender?.userId,   // Nested sender object with userId
          conn.receiver?._id,    // Nested receiver object with _id
          conn.receiver?.userId, // Nested receiver object with userId
          conn.user?._id,        // Nested user object with _id
          conn.user?.userId,     // Nested user object with userId
          conn.profile?._id,     // Nested profile object with _id
          conn.profile?.userId,  // Nested profile object with userId
          conn.profileId,        // Direct profileId field
          conn._id,              // MongoDB _id field
          conn.id,               // Standard id field
        ].filter(id => id && id !== currentUserId); // Remove undefined and current user's ID
        
        // Log what we found
        console.log('🔍 Possible IDs from connection:', possibleIds);
        
        // Return all valid IDs (not just the first one)
        return possibleIds;
      }).flat() // Flatten the array of arrays
        .filter((id, index, self) => self.indexOf(id) === index); // Remove duplicates
      
      setAcceptedConnectionIds(connectedUserIds);
      console.log('✅ Connected User IDs to filter out:', connectedUserIds);
      console.log('✅ Total unique connection IDs:', connectedUserIds.length);
      
    } else {
      console.error('❌ Failed to fetch accepted connections:', response.status);
      const errorText = await response.text();
      console.error('❌ Error details:', errorText);
    }
  } catch (error) {
    console.error('❌ Error fetching accepted connections:', error);
  }
};

   const fetchDashboardData = async () => {
  try {
    setLoading(true);
    setError('');
  
    const token = localStorage.getItem('authToken');
    if (!token) {
      setError('Please log in to view your dashboard');
      setLoading(false);
      return;
    }

    // ========================================
    // 1. FETCH DASHBOARD STATS
    // ========================================
    const statsResponse = await fetch(API_CONFIG.STATS_API, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const statsData = await statsResponse.json();
    
    if (!statsResponse.ok || !statsData.success) {
      throw new Error(statsData.message || 'Failed to load stats');
    }

    // ========================================
    // 1.5. FETCH ACCEPTED CONNECTIONS
    // ========================================
    console.log('🔍 Fetching accepted connections...');
    
    const connectionsResponse = await fetch(API_CONFIG.ACCEPTED_CONNECTIONS_API, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    let connectedUserIds: string[] = [];
    
    if (connectionsResponse.ok) {
      const result = await connectionsResponse.json();
      console.log('✅ Accepted Connections Response:', result);
      
      const connections = result.data || [];
      
      if (connections.length > 0) {
        console.log(`📊 Found ${connections.length} accepted connection(s)`);
        
        const currentUserId = currentUser?.id || currentUser?.userId;
        
        connectedUserIds = connections.map((conn: any) => {
          const possibleIds = [
            conn.userId,
            conn.senderId,
            conn.receiverId,
            conn.sender?._id,
            conn.sender?.userId,
            conn.receiver?._id,
            conn.receiver?.userId,
            conn.user?._id,
            conn.user?.userId,
            conn.profile?._id,
            conn.profile?.userId,
            conn.profileId,
            conn._id,
            conn.id,
          ].filter(id => id && id !== currentUserId);
          
          return possibleIds;
        }).flat()
          .filter((id, index, self) => self.indexOf(id) === index);
        
        console.log('✅ Connected User IDs to filter out:', connectedUserIds);
      }
    }
    
    setAcceptedConnectionIds(connectedUserIds);

    // ========================================
    // 2. BUILD MATCH CRITERIA (✅ FIXED GENDER LOGIC)
    // ========================================
    const matchCriteria: string[] = [];
    
    // ✅ IMPROVED: Better gender handling with logging
    console.log('\n🚹🚺 GENDER FILTER SETUP:');
    console.log('Current user:', currentUser?.fullName);
    console.log('Current user gender (raw):', currentUser?.gender);
    
    const userGender = currentUser?.gender?.toLowerCase()?.trim();
    console.log('Current user gender (processed):', userGender);
    
    let oppositeGender: string;
    if (userGender === 'male') {
      oppositeGender = 'female';
      console.log('✅ User is MALE → Looking for FEMALE profiles');
    } else if (userGender === 'female') {
      oppositeGender = 'male';
      console.log('✅ User is FEMALE → Looking for MALE profiles');
    } else {
      console.warn('⚠️ User gender not set or invalid:', userGender);
      oppositeGender = 'female';
      console.log('⚠️ Defaulting to FEMALE profiles');
    }
    
    matchCriteria.push(`gender=${oppositeGender}`);
    console.log('📋 Gender filter added:', `gender=${oppositeGender}`);
    
    if (currentUser?.religiousDetails?.religion) {
      matchCriteria.push(`religion=${encodeURIComponent(currentUser.religiousDetails.religion)}`);
      console.log('📋 Religion filter added:', currentUser.religiousDetails.religion);
    } else {
      console.log('⚠️ Religion Filter: SKIPPED');
    }
    
    if (currentUser?.familyDetails?.currentResidenceCity) {
      matchCriteria.push(`city=${encodeURIComponent(currentUser.familyDetails.currentResidenceCity)}`);
      console.log('📋 City filter added:', currentUser.familyDetails.currentResidenceCity);
    } else {
      console.log('⚠️ City Filter: SKIPPED');
    }
    
    matchCriteria.push('page=1');
    matchCriteria.push('limit=50');
    matchCriteria.push('sortBy=createdAt');
    matchCriteria.push('sortOrder=desc');
    
    const queryString = matchCriteria.join('&');
    const profileApiUrl = `${API_CONFIG.PROFILE_LIST_API}?${queryString}`;
    
    console.log('🔗 Final API URL:', profileApiUrl);

    // ========================================
    // 3. FETCH RECOMMENDED PROFILES
    // ========================================
    const profilesResponse = await fetch(profileApiUrl);
    const profilesData = await profilesResponse.json();

    if (profilesResponse.ok && profilesData.success) {
      console.log('\n📦 Profiles received from API:', profilesData.data?.length || 0);
      
      // Log first profile to check gender
      if (profilesData.data && profilesData.data.length > 0) {
        console.log('🔍 First profile from API:', {
          name: profilesData.data[0].fullName,
          gender: profilesData.data[0].gender
        });
      }
      
      // ========================================
      // 4. CLIENT-SIDE FILTERING
      // ========================================
      console.log('\n🎯 Starting profile filtering...');
      console.log('📋 Connection IDs we will filter:', connectedUserIds);
      
      const filteredProfiles = (profilesData.data || []).filter((profile: CompleteProfile, index: number) => {
        const possibleProfileIds = [
          profile.userId,
          profile.id,
          profile._id,
          profile.user?._id,
          profile.user?.userId,
          profile.user?.id,
        ].filter(id => id);
        
        const currentUserId = currentUser?.id;
        
        if (index < 3 || profile.fullName?.toLowerCase().includes('rekha')) {
          console.log(`\n🔍 CHECKING PROFILE #${index + 1}:`, {
            name: profile.fullName,
            allPossibleProfileIds: possibleProfileIds,
            connectedUserIds: connectedUserIds,
            hasMatch: possibleProfileIds.some(id => connectedUserIds.includes(id))
          });
        }
        
        // 🚫 1. Exclude current user's own profile
        if (possibleProfileIds.includes(currentUserId)) {
          console.log('🚫 Filtering out: Current user');
          return false;
        }

        // 🚫 2. Double-check gender (✅ IMPROVED)
        const profileGender = profile.gender?.toLowerCase()?.trim();
        const userGenderNormalized = currentUser?.gender?.toLowerCase()?.trim();
        
        if (index < 3) {
          console.log(`🔍 Gender check for ${profile.fullName}:`, {
            profileGender: profileGender,
            userGender: userGenderNormalized,
            sameGender: profileGender === userGenderNormalized
          });
        }
        
        if (userGenderNormalized && profileGender) {
          if (userGenderNormalized === profileGender) {
            console.log('🚫 Filtering out: Same gender -', profile.fullName);
            return false;
          }
        }
        
        // 🚫 3. Double-check religion if user has one
        if (currentUser?.religiousDetails?.religion) {
          const profileReligion = profile.religiousDetails?.religion;
          if (profileReligion !== currentUser.religiousDetails.religion) {
            console.log('🚫 Filtering out: Different religion -', profile.fullName);
            return false;
          }
        }
        
        // 🚫 4. Double-check city if user has one
        if (currentUser?.familyDetails?.currentResidenceCity) {
          const profileCity = profile.familyDetails?.currentResidenceCity;
          if (profileCity !== currentUser.familyDetails.currentResidenceCity) {
            console.log('🚫 Filtering out: Different city -', profile.fullName);
            return false;
          }
        }

        // 🚫 5. Filter out accepted connections
        const isConnected = possibleProfileIds.some(profileId => 
          connectedUserIds.includes(profileId)
        );
        
        if (isConnected) {
          console.log('✅ 🚫 FILTERING OUT CONNECTED USER:', profile.fullName);
          return false;
        }

        return true;
      });
      
      console.log('\n📊 FILTERING SUMMARY:');
      console.log('📋 Total profiles from API:', profilesData.data?.length || 0);
      console.log('✅ Profiles after filtering:', filteredProfiles.length);
      console.log('🚫 Filtered out:', (profilesData.data?.length || 0) - filteredProfiles.length);
      
      setProfiles(filteredProfiles);
    } else {
      console.error('❌ Failed to fetch profiles');
      setProfiles([]);
    }

    // ========================================
    // 5. SET STATS DATA
    // ========================================
    if (statsData.success) {
      const profileCompletion = statsData.data.profileCompletion || 0;
      
      setStats({
        interests: statsData.data.interests || 0,
        messages: statsData.data.messages || 0,
        matches: statsData.data.matches || 0,
        pendingRequests: statsData.data.pendingRequests || 0,
        profileCompletion: profileCompletion,
      });
   
      const profile = statsData.data;
      const missing: string[] = [];
      
      if (!profile.personalDetails?.heightCm) missing.push('Personal Details (Height, Body Type, etc.)');
      if (!profile.religiousDetails?.religion) missing.push('Religious Background');
      if (!profile.educationDetails?.highestEducation) missing.push('Education Details');
      if (!profile.professionalDetails?.occupation) missing.push('Professional Details');
      if (!profile.familyDetails?.fatherOccupation) missing.push('Family Details');
      if (!profile.lifestylePreferences?.aboutMe || profile.lifestylePreferences?.aboutMe?.length < 50) {
        missing.push('About Me & Partner Expectations');
      }
      
      if (missing.length === 0 && profileCompletion < 100) {
        missing.push('Complete your profile information');
        missing.push('Add photos to your profile');
        missing.push('Fill in all required details');
      }
      
      setMissingFields(missing);
      setDataFetched(true);
    } else {
      setError(statsData.message || 'Failed to load dashboard data');
    }
    
  } catch (err: any) {
    if (err.message.includes('Failed to fetch')) {
      setError('Cannot connect to server. Please make sure your backend is running on http://localhost:5000');
    } else if (err.message.includes('CORS')) {
      setError('CORS error: Backend needs to allow requests from localhost:5173');
    } else {
      setError(err.message || 'Failed to connect to the server. Please check your connection.');
    }
    
    setProfiles([]);
    setDataFetched(true);
  } finally {
    setLoading(false);
  }
};

    // ========================================
    // SEND INTEREST HANDLER
    // ========================================
    const handleSendInterest = async (profileId: string) => {
      if (!currentUser) {
        alert("Please login to send an interest");
        return;
      }

      const token = localStorage.getItem("authToken");

      if (!token) {
        alert("Authentication token not found. Please login again.");
        return;
      }

      try {

        const response = await fetch(API_CONFIG.SEND_INTEREST_API, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            senderId: currentUser.id,
            receiverId: profileId,
          }),
        });

        const data = await response.json();

        if (data.success) {
          alert("Interest sent successfully ❤️");
        } else {
          alert(data.message || "Failed to send interest");
        }
      } catch (error) {
        alert("Something went wrong while sending interest. Make sure your backend is running.");
      }
    };

    const handleMessage = (profileId: string) => {
      onNavigate('messages', { profileId });
    };

    return (
      <div className="space-y-8">
        {/* Profile Completion Modal */}
        <ProfileCompletionModal 
          isOpen={showCompletionModal}
          onClose={() => setShowCompletionModal(false)}
          onComplete={() => onNavigate('profile-setup')}
          completionPercentage={stats.profileCompletion}
          missingFields={missingFields}
        />

        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-rose-600 to-pink-600 rounded-2xl p-8 text-white">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {currentUser?.fullName?.split(' ')[0]}!
          </h1>
          <p className="text-rose-100">
            Here are your AI-recommended matches based on your preferences
          </p>
          <div className="mt-4 flex items-center gap-4 flex-wrap">
            {/* Match Criteria Display */}
            {/* <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm">
              <span>🚻 Looking for: {currentUser?.gender === 'male' ? 'Female' : 'Male'}</span>
            </div> */}
            {currentUser?.religiousDetails?.religion && (
              <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm">
                <span>🕉️ Religion: {currentUser.religiousDetails.religion}</span>
              </div>
            )}
            {currentUser?.familyDetails?.currentResidenceCity && (
              <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm">
                <span>📍 City: {currentUser.familyDetails.currentResidenceCity}</span>
              </div>
            )}
          </div>
          <div className="mt-4 flex items-center gap-4 flex-wrap">
            {stats.profileCompletion < 100 && (
              <button
                onClick={() => setShowCompletionModal(true)}
                className="inline-block bg-white/20 px-4 py-2 rounded-full hover:bg-white/30 transition-colors cursor-pointer"
              >
                Profile Completion: {stats.profileCompletion}%
              </button>
            )}
            {stats.profileCompletion === 100 && (
              <div className="inline-flex items-center gap-2 bg-green-500/20 px-4 py-2 rounded-full">
                <span className="text-sm">✓ Profile Complete</span>
              </div>
            )}
            {stats.profileCompletion < 100 && (
              <button
                onClick={() => onNavigate('profile-setup')}
                className="bg-rose-700 text-white px-6 py-2 rounded-lg font-semibold hover:bg-rose-800 transition-colors"
              >
                Complete Profile
              </button>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <Heart className="h-8 w-8 text-rose-600 fill-rose-600" />
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.interests}</div>
            <div className="text-sm text-gray-600">Interests Received</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <MessageCircle className="h-8 w-8 text-green-600" />
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.messages}</div>
            <div className="text-sm text-gray-600">New Messages</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <Star className="h-8 w-8 text-amber-600 fill-amber-600" />
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.matches}</div>
            <div className="text-sm text-gray-600">Mutual Matches</div>
          </div>
        </div>

        {/* View Requests Card */}
        <div
          onClick={() => onNavigate('requests')}
          className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all cursor-pointer group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-pink-600 opacity-0 group-hover:opacity-5 transition-opacity"></div>
          <div className="flex items-center justify-between relative z-10">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                <UserPlus className="h-6 w-6 text-rose-600" />
                View Requests
              </h3>
              <p className="text-gray-600">{stats.pendingRequests} new connection requests waiting</p>
            </div>
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-rose-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <UserPlus className="h-10 w-10 text-white" />
              </div>
              {stats.pendingRequests > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-rose-600 to-pink-600 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
                  {stats.pendingRequests} New
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Profiles Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recommended Matches</h2>
            <div className="text-sm text-gray-600">
              Showing {profiles.length} profile{profiles.length !== 1 ? 's' : ''}
            </div>
          </div>

        
          {/* Loading State */}
          {loading ? (
            <div className="flex items-center justify-center py-12 bg-white rounded-xl">
              <div className="text-center">
                <Loader2 className="h-12 w-12 animate-spin text-rose-600 mx-auto mb-4" />
                <p className="text-gray-600">Loading matched profiles...</p>
              </div>
            </div>
          ) : (
            <>
              {/* Profile Grid */}
              {profiles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {profiles.map(profile => (
                    <ProfileCard
                      key={profile.id || profile._id}
                      profile={profile}
                      onViewProfile={(id) => onNavigate('profile-view', { profileId: id })}
                      onSendInterest={() => handleSendInterest(profile.userId)}
                      onMessage={handleMessage}
                    />
                  ))}
                </div>
              ) : (
                /* Empty State */
                <div className="text-center py-12 bg-white rounded-xl">
                  <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No matches found</h3>
                  <p className="text-gray-600 mb-4">
                    No profiles match your criteria. Try completing your profile or check back later.
                  </p>
                  <div className="text-sm text-gray-500 mb-4">
                    <p className="mb-2">We're looking for:</p>
                    <ul className="text-left inline-block">
                      <li>• {currentUser?.gender === 'male' ? 'Female' : 'Male'} profiles</li>
                      {currentUser?.religiousDetails?.religion && (
                        <li>• Same religion: {currentUser.religiousDetails.religion}</li>
                      )}
                      {currentUser?.familyDetails?.currentResidenceCity && (
                        <li>• Same city: {currentUser.familyDetails.currentResidenceCity}</li>
                      )}
                    </ul>
                  </div>
                  <button
                    onClick={() => onNavigate('profile-setup')}
                    className="px-6 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700"
                  >
                    Complete Your Profile
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Membership Upgrade Banner */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Upgrade Your Membership</h3>
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-600 mb-2">Get unlimited access to premium features</p>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>✓ Unlimited profile views</li>
                <li>✓ Send unlimited interests</li>
                <li>✓ Chat with matches</li>
                <li>✓ View contact information</li>
              </ul>
            </div>
            <button
              onClick={() => onNavigate('membership')}
              className="px-8 py-3 bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              View Plans
            </button>
          </div>
        </div>
      </div>
    );
  };