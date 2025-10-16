// import React, { useState, useEffect } from 'react';
// import { Shield, Users, Image, AlertCircle, CheckCircle, XCircle, TrendingUp } from 'lucide-react';
// import { CompleteProfile } from '../types';

// interface AdminPanelProps {
//   onNavigate: (page: string) => void;
// }

// export const AdminPanel: React.FC<AdminPanelProps> = ({ onNavigate }) => {
//   const [activeTab, setActiveTab] = useState<'overview' | 'photos' | 'reports' | 'users'>('overview');
//   const [profiles, setProfiles] = useState<CompleteProfile[]>([]);
//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     activeUsers: 0,
//     pendingPhotos: 0,
//     pendingReports: 0
//   });

//   useEffect(() => {
//     const storedProfiles = JSON.parse(localStorage.getItem('profiles') || '[]');
//     setProfiles(storedProfiles);

//     setStats({
//       totalUsers: storedProfiles.length,
//       activeUsers: storedProfiles.filter((p: CompleteProfile) => p.isActive).length,
//       pendingPhotos: storedProfiles.reduce((sum: number, p: CompleteProfile) =>
//         sum + p.photos.filter(photo => photo.status === 'pending').length, 0
//       ),
//       pendingReports: Math.floor(Math.random() * 5)
//     });
//   }, []);

//   const handlePhotoApproval = (profileId: string, photoId: string, approved: boolean) => {
//     const updatedProfiles = profiles.map(p => {
//       if (p.id === profileId) {
//         return {
//           ...p,
//           photos: p.photos.map(photo =>
//             photo.id === photoId
//               ? { ...photo, status: approved ? 'approved' : 'rejected' as any }
//               : photo
//           )
//         };
//       }
//       return p;
//     });
//     setProfiles(updatedProfiles);
//     localStorage.setItem('profiles', JSON.stringify(updatedProfiles));
//     alert(`Photo ${approved ? 'approved' : 'rejected'} successfully!`);
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div className="flex items-center space-x-3">
//           <Shield className="h-8 w-8 text-rose-600" />
//           <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         <div className="bg-white rounded-xl shadow-lg p-6">
//           <Users className="h-8 w-8 text-blue-600 mb-4" />
//           <div className="text-3xl font-bold text-gray-900 mb-1">{stats.totalUsers}</div>
//           <div className="text-sm text-gray-600">Total Users</div>
//         </div>

//         <div className="bg-white rounded-xl shadow-lg p-6">
//           <TrendingUp className="h-8 w-8 text-green-600 mb-4" />
//           <div className="text-3xl font-bold text-gray-900 mb-1">{stats.activeUsers}</div>
//           <div className="text-sm text-gray-600">Active Users</div>
//         </div>

//         <div className="bg-white rounded-xl shadow-lg p-6">
//           <Image className="h-8 w-8 text-amber-600 mb-4" />
//           <div className="text-3xl font-bold text-gray-900 mb-1">{stats.pendingPhotos}</div>
//           <div className="text-sm text-gray-600">Pending Photos</div>
//         </div>

//         <div className="bg-white rounded-xl shadow-lg p-6">
//           <AlertCircle className="h-8 w-8 text-red-600 mb-4" />
//           <div className="text-3xl font-bold text-gray-900 mb-1">{stats.pendingReports}</div>
//           <div className="text-sm text-gray-600">Pending Reports</div>
//         </div>
//       </div>

//       <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//         <div className="border-b border-gray-200">
//           <div className="flex space-x-1 p-4">
//             <button
//               onClick={() => setActiveTab('overview')}
//               className={`px-4 py-2 rounded-lg font-medium transition-colors ${
//                 activeTab === 'overview'
//                   ? 'bg-rose-600 text-white'
//                   : 'text-gray-700 hover:bg-gray-100'
//               }`}
//             >
//               Overview
//             </button>
//             <button
//               onClick={() => setActiveTab('photos')}
//               className={`px-4 py-2 rounded-lg font-medium transition-colors ${
//                 activeTab === 'photos'
//                   ? 'bg-rose-600 text-white'
//                   : 'text-gray-700 hover:bg-gray-100'
//               }`}
//             >
//               Photo Moderation
//             </button>
//             <button
//               onClick={() => setActiveTab('reports')}
//               className={`px-4 py-2 rounded-lg font-medium transition-colors ${
//                 activeTab === 'reports'
//                   ? 'bg-rose-600 text-white'
//                   : 'text-gray-700 hover:bg-gray-100'
//               }`}
//             >
//               Reports
//             </button>
//             <button
//               onClick={() => setActiveTab('users')}
//               className={`px-4 py-2 rounded-lg font-medium transition-colors ${
//                 activeTab === 'users'
//                   ? 'bg-rose-600 text-white'
//                   : 'text-gray-700 hover:bg-gray-100'
//               }`}
//             >
//               Users
//             </button>
//           </div>
//         </div>

//         <div className="p-6">
//           {activeTab === 'overview' && (
//             <div className="space-y-6">
//               <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
//               <div className="space-y-3">
//                 <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
//                   <div className="flex items-center space-x-3">
//                     <Users className="h-5 w-5 text-blue-600" />
//                     <span className="text-gray-700">New user registration: Priya Sharma</span>
//                   </div>
//                   <span className="text-sm text-gray-500">2 hours ago</span>
//                 </div>
//                 <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
//                   <div className="flex items-center space-x-3">
//                     <Image className="h-5 w-5 text-amber-600" />
//                     <span className="text-gray-700">Photo approval pending for Rahul Verma</span>
//                   </div>
//                   <span className="text-sm text-gray-500">5 hours ago</span>
//                 </div>
//                 <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
//                   <div className="flex items-center space-x-3">
//                     <CheckCircle className="h-5 w-5 text-green-600" />
//                     <span className="text-gray-700">Premium subscription purchased by Anjali Patel</span>
//                   </div>
//                   <span className="text-sm text-gray-500">1 day ago</span>
//                 </div>
//               </div>
//             </div>
//           )}

//           {activeTab === 'photos' && (
//             <div className="space-y-6">
//               <h2 className="text-xl font-bold text-gray-900">Photo Moderation Queue</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {profiles.flatMap(profile =>
//                   profile.photos
//                     .filter(photo => photo.status === 'pending')
//                     .map(photo => (
//                       <div key={photo.id} className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden">
//                         <img
//                           src={photo.photoUrl}
//                           alt="Pending approval"
//                           className="w-full h-48 object-cover"
//                         />
//                         <div className="p-4">
//                           <p className="font-medium text-gray-900 mb-2">{profile.fullName}</p>
//                           <div className="flex gap-2">
//                             <button
//                               onClick={() => handlePhotoApproval(profile.id, photo.id, true)}
//                               className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
//                             >
//                               <CheckCircle className="h-4 w-4" />
//                               <span>Approve</span>
//                             </button>
//                             <button
//                               onClick={() => handlePhotoApproval(profile.id, photo.id, false)}
//                               className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
//                             >
//                               <XCircle className="h-4 w-4" />
//                               <span>Reject</span>
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     ))
//                 )}
//                 {profiles.flatMap(p => p.photos.filter(photo => photo.status === 'pending')).length === 0 && (
//                   <div className="col-span-3 text-center py-12">
//                     <Image className="h-16 w-16 text-gray-400 mx-auto mb-4" />
//                     <p className="text-gray-600">No pending photo approvals</p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}

//           {activeTab === 'reports' && (
//             <div className="space-y-4">
//               <h2 className="text-xl font-bold text-gray-900">User Reports</h2>
//               <div className="text-center py-12">
//                 <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
//                 <p className="text-gray-600">No pending reports</p>
//               </div>
//             </div>
//           )}

//           {activeTab === 'users' && (
//             <div className="space-y-4">
//               <h2 className="text-xl font-bold text-gray-900">All Users</h2>
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
//                       <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Phone</th>
//                       <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
//                       <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Verified</th>
//                       <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Membership</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-gray-200">
//                     {profiles.map(profile => (
//                       <tr key={profile.id} className="hover:bg-gray-50">
//                         <td className="px-4 py-3 text-sm text-gray-900">{profile.fullName}</td>
//                         <td className="px-4 py-3 text-sm text-gray-600">{profile.phoneNumber}</td>
//                         <td className="px-4 py-3">
//                           <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${
//                             profile.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
//                           }`}>
//                             {profile.isActive ? 'Active' : 'Inactive'}
//                           </span>
//                         </td>
//                         <td className="px-4 py-3">
//                           {profile.isVerified ? (
//                             <CheckCircle className="h-5 w-5 text-green-600" />
//                           ) : (
//                             <XCircle className="h-5 w-5 text-gray-400" />
//                           )}
//                         </td>
//                         <td className="px-4 py-3 text-sm text-gray-600">
//                           {profile.subscription?.tier.toUpperCase() || 'FREE'}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// src/pages/AdminPanel.tsx

// src/pages/AdminPanel.tsx - FIXED VERSION
// src/pages/AdminPanel.tsx - COMPLETE VERSION
import React, { useState, useEffect } from 'react';
import { 
  Users, FileText, MessageSquare, UserCheck, 
  Download, Shield, TrendingUp, ArrowLeft, X, Search as SearchIcon
} from 'lucide-react';
import adminService from '../services/admin.service';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

interface AdminPanelProps {
  onNavigate: (page: string) => void;
}

type TabType = 'dashboard' | 'users' | 'profiles' | 'requests' | 'conversations';

export const AdminPanel: React.FC<AdminPanelProps> = ({ onNavigate }) => {
  const { logout } = useAuth();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  
  // Dashboard stats
  const [stats, setStats] = useState({
    users: 0,
    profiles: 0,
    pendingPhotos: 0,
    requests: 0,
    conversations: 0,
  });

  // Users data
  const [users, setUsers] = useState<any[]>([]);
  const [usersPage, setUsersPage] = useState(1);
  const [usersTotal, setUsersTotal] = useState(0);
  const [usersPages, setUsersPages] = useState(0);
  const [usersFilter, setUsersFilter] = useState({ role: '', search: '', isActive: '' });

  // Profiles data
  const [profiles, setProfiles] = useState<any[]>([]);
  const [profilesPage, setProfilesPage] = useState(1);
  const [profilesTotal, setProfilesTotal] = useState(0);
  const [profilesPages, setProfilesPages] = useState(0);
  const [profilesFilter, setProfilesFilter] = useState({ status: '', search: '' });

  // Requests data
  const [requests, setRequests] = useState<any[]>([]);
  const [requestsPage, setRequestsPage] = useState(1);
  const [requestsTotal, setRequestsTotal] = useState(0);
  const [requestsPages, setRequestsPages] = useState(0);
  const [requestsFilter, setRequestsFilter] = useState({ status: '', search: '' });

  // Conversations data
  const [conversations, setConversations] = useState<any[]>([]);
  const [conversationsPage, setConversationsPage] = useState(1);
  const [conversationsTotal, setConversationsTotal] = useState(0);
  const [conversationsPages, setConversationsPages] = useState(0);

  // ⭐ NEW: User Details Modal
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [loadingUserDetails, setLoadingUserDetails] = useState(false);

  // ⭐ NEW: Global Search
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any>({ users: [], profiles: [] });
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    if (activeTab === 'users') fetchUsers();
    if (activeTab === 'profiles') fetchProfiles();
    if (activeTab === 'requests') fetchRequests();
    if (activeTab === 'conversations') fetchConversations();
  }, [activeTab, usersPage, usersFilter, profilesPage, profilesFilter, requestsPage, requestsFilter, conversationsPage]);

  const fetchStats = async () => {
    try {
      const response = await adminService.getStats();
      if (response.success) {
        setStats(response.data);
      }
    } catch (error: any) {
      showToast(error.message, 'error');
    }
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const params: any = {
        page: usersPage,
        limit: 20,
      };
      
      if (usersFilter.role) params.role = usersFilter.role;
      if (usersFilter.search) params.search = usersFilter.search;
      if (usersFilter.isActive) params.isActive = usersFilter.isActive;
      
      const response = await adminService.listUsers(params);
      
      if (response.success) {
        setUsers(response.data);
        setUsersTotal(response.total);
        setUsersPages(response.pages);
      }
    } catch (error: any) {
      showToast(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const fetchProfiles = async () => {
    setLoading(true);
    try {
      const params: any = {
        page: profilesPage,
        limit: 20,
      };
      
      if (profilesFilter.status) params.status = profilesFilter.status;
      if (profilesFilter.search) params.search = profilesFilter.search;
      
      const response = await adminService.listProfiles(params);
      
      if (response.success) {
        setProfiles(response.data);
        setProfilesTotal(response.total);
        setProfilesPages(response.pages);
      }
    } catch (error: any) {
      showToast(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const params: any = {
        page: requestsPage,
        limit: 20,
      };
      
      if (requestsFilter.status) params.status = requestsFilter.status;
      if (requestsFilter.search) params.search = requestsFilter.search;
      
      const response = await adminService.listRequests(params);
      
      if (response.success) {
        setRequests(response.data);
        setRequestsTotal(response.total);
        setRequestsPages(response.pages);
      }
    } catch (error: any) {
      showToast(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const fetchConversations = async () => {
    setLoading(true);
    try {
      const response = await adminService.listConversations({
        page: conversationsPage,
        limit: 20,
      });
      
      if (response.success) {
        setConversations(response.data);
        setConversationsTotal(response.total);
        setConversationsPages(response.pages);
      }
    } catch (error: any) {
      showToast(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  // ⭐ NEW: Fetch Single User Details
  const handleViewUserDetails = async (userId: string) => {
    setLoadingUserDetails(true);
    setShowUserModal(true);
    try {
      const response = await adminService.getUser(userId);
      if (response.success) {
        setSelectedUser(response.data);
      }
    } catch (error: any) {
      showToast(error.message, 'error');
      setShowUserModal(false);
    } finally {
      setLoadingUserDetails(false);
    }
  };

  // ⭐ NEW: Global Search
  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    
    if (query.length < 2) {
      setShowSearchResults(false);
      return;
    }

    setSearchLoading(true);
    setShowSearchResults(true);
    
    try {
      const response = await adminService.quickSearch(query);
      if (response.success) {
        setSearchResults(response.data);
      }
    } catch (error: any) {
      showToast(error.message, 'error');
    } finally {
      setSearchLoading(false);
    }
  };

  const handleUpdateUser = async (userId: string, updates: any) => {
    try {
      const response = await adminService.updateUser(userId, updates);
      if (response.success) {
        fetchUsers();
        showToast('User updated successfully', 'success');
      }
    } catch (error: any) {
      showToast(error.message, 'error');
    }
  };

  const handleVerifyProfile = async (profileId: string, isVerified: boolean) => {
    try {
      const response = await adminService.verifyProfile(profileId, isVerified);
      if (response.success) {
        fetchProfiles();
        showToast(`Profile ${isVerified ? 'verified' : 'unverified'}`, 'success');
      }
    } catch (error: any) {
      showToast(error.message, 'error');
    }
  };

  const handleExportUsers = async () => {
    try {
      const params: any = {};
      if (usersFilter.role) params.role = usersFilter.role;
      
      const blob = await adminService.exportUsers(params);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `users_${Date.now()}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      showToast('Users exported successfully', 'success');
    } catch (error: any) {
      showToast('Failed to export users', 'error');
    }
  };

  // ⭐ NEW: User Details Modal Component
  const UserDetailsModal = () => {
    if (!showUserModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Modal Header */}
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-2xl font-bold">User Details</h2>
            <button
              onClick={() => {
                setShowUserModal(false);
                setSelectedUser(null);
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-6">
            {loadingUserDetails ? (
              <div className="text-center py-8">Loading user details...</div>
            ) : selectedUser ? (
              <div className="space-y-4">
                {/* Basic Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Full Name</label>
                    <p className="text-lg font-semibold">{selectedUser.fullName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Phone Number</label>
                    <p className="text-lg font-semibold">{selectedUser.phoneNumber}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Gender</label>
                    <p className="text-lg capitalize">{selectedUser.gender}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Date of Birth</label>
                    <p className="text-lg">
                      {selectedUser.dateOfBirth ? new Date(selectedUser.dateOfBirth).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Role</label>
                    <p className="text-lg">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        selectedUser.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                        selectedUser.role === 'moderator' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {selectedUser.role}
                      </span>
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Status</label>
                    <p className="text-lg">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        selectedUser.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {selectedUser.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">Profile Created For</label>
                  <p className="text-lg capitalize">{selectedUser.profileCreatedFor || 'N/A'}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Joined Date</label>
                    <p className="text-lg">{new Date(selectedUser.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Last Updated</label>
                    <p className="text-lg">{new Date(selectedUser.updatedAt).toLocaleDateString()}</p>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="pt-4 border-t">
                  <label className="text-sm font-medium text-gray-500 mb-2 block">Quick Actions</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        handleUpdateUser(selectedUser._id, { isActive: !selectedUser.isActive });
                        setShowUserModal(false);
                      }}
                      className={`px-4 py-2 rounded-lg ${
                        selectedUser.isActive 
                          ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                          : 'bg-green-100 text-green-700 hover:bg-green-200'
                      }`}
                    >
                      {selectedUser.isActive ? 'Deactivate User' : 'Activate User'}
                    </button>
                    <select
                      value={selectedUser.role}
                      onChange={(e) => {
                        handleUpdateUser(selectedUser._id, { role: e.target.value });
                        setSelectedUser({ ...selectedUser, role: e.target.value });
                      }}
                      className="px-4 py-2 border rounded-lg"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                      <option value="moderator">Moderator</option>
                    </select>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">No user data available</div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // ⭐ NEW: Search Results Dropdown
  const SearchResults = () => {
    if (!showSearchResults) return null;

    return (
      <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border max-h-96 overflow-y-auto z-50">
        {searchLoading ? (
          <div className="p-4 text-center">Searching...</div>
        ) : (
          <>
            {/* Users Results */}
            {searchResults.users.length > 0 && (
              <div className="p-4 border-b">
                <h3 className="text-sm font-semibold text-gray-500 mb-2">USERS ({searchResults.users.length})</h3>
                {searchResults.users.map((user: any) => (
                  <button
                    key={user._id}
                    onClick={() => {
                      handleViewUserDetails(user._id);
                      setShowSearchResults(false);
                      setSearchQuery('');
                    }}
                    className="w-full text-left p-3 hover:bg-gray-50 rounded-lg mb-2"
                  >
                    <div className="font-medium">{user.fullName}</div>
                    <div className="text-sm text-gray-500">{user.phoneNumber}</div>
                    <div className="text-xs text-gray-400 mt-1">
                      Role: {user.role} • Status: {user.isActive ? 'Active' : 'Inactive'}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Profiles Results */}
            {searchResults.profiles.length > 0 && (
              <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-500 mb-2">PROFILES ({searchResults.profiles.length})</h3>
                {searchResults.profiles.map((profile: any) => (
                  <div
                    key={profile._id}
                    className="p-3 hover:bg-gray-50 rounded-lg mb-2"
                  >
                    <div className="font-medium">{profile.fullName}</div>
                    <div className="text-sm text-gray-500">
                      {profile.familyDetails?.currentResidenceCity || 'Location not specified'}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {searchResults.users.length === 0 && searchResults.profiles.length === 0 && (
              <div className="p-4 text-center text-gray-500">
                No results found for "{searchQuery}"
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  const renderDashboard = () => (
    <div>
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <Users className="text-blue-600" size={24} />
            <span className="text-2xl font-bold">{stats.users}</span>
          </div>
          <p className="text-gray-600 text-sm">Total Users</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <UserCheck className="text-green-600" size={24} />
            <span className="text-2xl font-bold">{stats.profiles}</span>
          </div>
          <p className="text-gray-600 text-sm">Active Profiles</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <FileText className="text-orange-600" size={24} />
            <span className="text-2xl font-bold">{stats.pendingPhotos}</span>
          </div>
          <p className="text-gray-600 text-sm">Pending Photos</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="text-purple-600" size={24} />
            <span className="text-2xl font-bold">{stats.requests}</span>
          </div>
          <p className="text-gray-600 text-sm">Total Requests</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <MessageSquare className="text-pink-600" size={24} />
            <span className="text-2xl font-bold">{stats.conversations}</span>
          </div>
          <p className="text-gray-600 text-sm">Conversations</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => setActiveTab('users')}
            className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-center transition-colors"
          >
            <Users className="mx-auto mb-2 text-blue-600" size={32} />
            <span className="text-sm font-medium">Manage Users</span>
          </button>
          <button
            onClick={() => setActiveTab('profiles')}
            className="p-4 bg-green-50 hover:bg-green-100 rounded-lg text-center transition-colors"
          >
            <UserCheck className="mx-auto mb-2 text-green-600" size={32} />
            <span className="text-sm font-medium">Verify Profiles</span>
          </button>
          <button
            onClick={() => setActiveTab('requests')}
            className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg text-center transition-colors"
          >
            <TrendingUp className="mx-auto mb-2 text-purple-600" size={32} />
            <span className="text-sm font-medium">View Requests</span>
          </button>
          <button
            onClick={() => setActiveTab('conversations')}
            className="p-4 bg-pink-50 hover:bg-pink-100 rounded-lg text-center transition-colors"
          >
            <MessageSquare className="mx-auto mb-2 text-pink-600" size={32} />
            <span className="text-sm font-medium">Conversations</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">User Management</h2>
        <button
          onClick={handleExportUsers}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Download size={20} />
          Export CSV
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow mb-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search by name or phone..."
            value={usersFilter.search}
            onChange={(e) => setUsersFilter({ ...usersFilter, search: e.target.value })}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
          />
          <select
            value={usersFilter.role}
            onChange={(e) => setUsersFilter({ ...usersFilter, role: e.target.value })}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
          >
            <option value="">All Roles</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="moderator">Moderator</option>
          </select>
          <select
            value={usersFilter.isActive}
            onChange={(e) => setUsersFilter({ ...usersFilter, isActive: e.target.value })}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
          >
            <option value="">All Status</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
          <button
            onClick={fetchUsers}
            className="px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500">Loading...</td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500">No users found</td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium">{user.fullName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{user.phoneNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={user.role}
                        onChange={(e) => handleUpdateUser(user._id, { role: e.target.value })}
                        className="px-2 py-1 border rounded text-sm"
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                        <option value="moderator">Moderator</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 text-xs rounded-full ${
                        user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {user.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                      {/* ⭐ NEW: View Details Button */}
                      <button
                        onClick={() => handleViewUserDetails(user._id)}
                        className="text-purple-600 hover:text-purple-900 font-medium"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => handleUpdateUser(user._id, { isActive: !user.isActive })}
                        className={`${
                          user.isActive ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'
                        }`}
                      >
                        {user.isActive ? 'Deactivate' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-center items-center mt-6 gap-2">
        <button
          onClick={() => setUsersPage(Math.max(1, usersPage - 1))}
          disabled={usersPage === 1}
          className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2">Page {usersPage} of {usersPages || 1}</span>
        <button
          onClick={() => setUsersPage(usersPage + 1)}
          disabled={usersPage >= usersPages}
          className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );

  const renderProfiles = () => (
    <div>
      <h2 className="text-2xl font-bold mb-6">Profile Verification</h2>

      <div className="bg-white p-4 rounded-lg shadow mb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Search profiles..."
            value={profilesFilter.search}
            onChange={(e) => setProfilesFilter({ ...profilesFilter, search: e.target.value })}
            className="px-4 py-2 border rounded-lg"
          />
          <select
            value={profilesFilter.status}
            onChange={(e) => setProfilesFilter({ ...profilesFilter, status: e.target.value })}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="">All Profiles</option>
            <option value="verified">Verified</option>
            <option value="unverified">Unverified</option>
          </select>
          <button
            onClick={fetchProfiles}
            className="px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700"
          >
            Apply Filters
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : profiles.length === 0 ? (
          <div className="text-center py-8">No profiles found</div>
        ) : (
          profiles.map((profile) => (
            <div key={profile._id} className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold">{profile.userId?.fullName}</h3>
                  <p className="text-gray-600">{profile.userId?.phoneNumber}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Created: {new Date(profile.createdAt).toLocaleDateString()}
                  </p>
                  <span className={`mt-3 inline-block px-3 py-1 rounded-full text-sm ${
                    profile.isVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {profile.isVerified ? '✓ Verified' : '⏳ Pending'}
                  </span>
                </div>
                <button
                  onClick={() => handleVerifyProfile(profile._id, !profile.isVerified)}
                  className={`px-4 py-2 rounded-lg ${
                    profile.isVerified 
                      ? 'bg-red-600 hover:bg-red-700' 
                      : 'bg-green-600 hover:bg-green-700'
                  } text-white`}
                >
                  {profile.isVerified ? 'Unverify' : 'Verify'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="flex justify-center items-center mt-6 gap-2">
        <button
          onClick={() => setProfilesPage(Math.max(1, profilesPage - 1))}
          disabled={profilesPage === 1}
          className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2">Page {profilesPage} of {profilesPages || 1}</span>
        <button
          onClick={() => setProfilesPage(profilesPage + 1)}
          disabled={profilesPage >= profilesPages}
          className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );

  const renderRequests = () => (
    <div>
      <h2 className="text-2xl font-bold mb-6">Connection Requests</h2>

      <div className="bg-white p-4 rounded-lg shadow mb-4">
        <select
          value={requestsFilter.status}
          onChange={(e) => setRequestsFilter({ ...requestsFilter, status: e.target.value })}
          className="px-4 py-2 border rounded-lg w-full md:w-auto"
        >
          <option value="">All Requests</option>
          <option value="pending">Pending</option>
          <option value="accepted">Accepted</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">From</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">To</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr><td colSpan={4} className="px-6 py-4 text-center">Loading...</td></tr>
            ) : requests.length === 0 ? (
              <tr><td colSpan={4} className="px-6 py-4 text-center">No requests found</td></tr>
            ) : (
              requests.map((req) => (
                <tr key={req._id}>
                  <td className="px-6 py-4">
                    <div className="font-medium">{req.sender?.fullName}</div>
                    <div className="text-sm text-gray-500">{req.sender?.phoneNumber}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium">{req.receiver?.fullName}</div>
                    <div className="text-sm text-gray-500">{req.receiver?.phoneNumber}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-xs rounded-full ${
                      req.status === 'accepted' ? 'bg-green-100 text-green-800' :
                      req.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">{new Date(req.createdAt).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center mt-6 gap-2">
        <button
          onClick={() => setRequestsPage(Math.max(1, requestsPage - 1))}
          disabled={requestsPage === 1}
          className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2">Page {requestsPage} of {requestsPages || 1}</span>
        <button
          onClick={() => setRequestsPage(requestsPage + 1)}
          disabled={requestsPage >= requestsPages}
          className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );

  const renderConversations = () => (
    <div>
      <h2 className="text-2xl font-bold mb-6">Conversations Monitor</h2>

      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : conversations.length === 0 ? (
          <div className="text-center py-8">No conversations found</div>
        ) : (
          conversations.map((conv) => (
            <div key={conv._id} className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center gap-4">
                <MessageSquare className="text-blue-600" size={24} />
                <div>
                  <div className="font-medium">
                    {conv.participants?.map((p: any) => p.fullName).join(' & ')}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Last updated: {new Date(conv.updatedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="flex justify-center items-center mt-6 gap-2">
        <button
          onClick={() => setConversationsPage(Math.max(1, conversationsPage - 1))}
          disabled={conversationsPage === 1}
          className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2">Page {conversationsPage} of {conversationsPages || 1}</span>
        <button
          onClick={() => setConversationsPage(conversationsPage + 1)}
          disabled={conversationsPage >= conversationsPages}
          className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <Shield className="text-rose-600" size={32} />
              <h1 className="text-2xl font-bold">Admin Panel</h1>
            </div>

            {/* ⭐ NEW: Global Search Bar */}
            <div className="flex-1 max-w-md mx-8 relative">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search users and profiles..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  onFocus={() => searchQuery.length >= 2 && setShowSearchResults(true)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                />
              </div>
              <SearchResults />
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate('dashboard')}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <ArrowLeft size={20} />
                Back
              </button>
              <button
                onClick={logout}
                className="px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto">
            {[
              { id: 'dashboard', label: 'Dashboard' },
              { id: 'users', label: 'Users' },
              { id: 'profiles', label: 'Profiles' },
              { id: 'requests', label: 'Requests' },
              { id: 'conversations', label: 'Conversations' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`px-6 py-4 font-medium border-b-2 ${
                  activeTab === tab.id
                    ? 'border-rose-600 text-rose-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'users' && renderUsers()}
        {activeTab === 'profiles' && renderProfiles()}
        {activeTab === 'requests' && renderRequests()}
        {activeTab === 'conversations' && renderConversations()}
      </div>

      {/* ⭐ NEW: User Details Modal */}
      <UserDetailsModal />
    </div>
  );
};