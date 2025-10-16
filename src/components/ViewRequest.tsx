import React, { useState, useEffect } from 'react';
import { UserPlus, CheckCircle, XCircle, Clock, Eye, Loader2, Heart, Users, AlertTriangle, Search, Sparkles } from 'lucide-react';

interface User {
  _id: string;
  fullName: string;
  dateOfBirth: string;
  gender: string;
  profileCreatedFor: string;
  education?: string;
  occupation?: string;
  location?: string;
  profilePhotos?: string[];
}

interface Request {
  _id: string;
  sender: User | null;
  receiver: User | null;
  status: 'pending' | 'accepted' | 'rejected';
  compatibility?: number;
  createdAt: string;
  type: 'received' | 'sent';
}

interface ViewRequestsProps {
  onNavigate: (page: string, data?: any) => void;
}

export const ViewRequests: React.FC<ViewRequestsProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'received' | 'sent'>('received');
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'accepted' | 'rejected'>('all');
  const [receivedRequests, setReceivedRequests] = useState<Request[]>([]);
  const [sentRequests, setSentRequests] = useState<Request[]>([]);
  const [error, setError] = useState<string>('');
  const [invalidRequestCount, setInvalidRequestCount] = useState<number>(0);
  const [requestCounts, setRequestCounts] = useState({
    received: 0,
    sent: 0,
    pending: 0
  });

  // API Base URL
  // const API_BASE_URL = 'https://matrimonial-backend-14t2.onrender.com/api/request';
  const API_BASE_URL = 'http://localhost:5000/api/request';

  // Calculate age from date of birth
  const calculateAge = (dateOfBirth: string): number => {
    try {
      const birthDate = new Date(dateOfBirth);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      
      return age;
    } catch (error) {
      return 0;
    }
  };

  // Format time ago
  const getTimeAgo = (createdAt: string): string => {
    try {
      const created = new Date(createdAt);
      const now = new Date();
      const diffInMs = now.getTime() - created.getTime();
      const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
      const diffInDays = Math.floor(diffInHours / 24);

      if (diffInHours < 1) return 'Just now';
      if (diffInHours < 24) return `${diffInHours} hours ago`;
      if (diffInDays === 1) return '1 day ago';
      if (diffInDays < 7) return `${diffInDays} days ago`;
      if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
      return `${Math.floor(diffInDays / 30)} months ago`;
    } catch (error) {
      return 'Recently';
    }
  };

  // Get default profile image
  const getDefaultProfileImage = (gender: string): string => {
    return gender === 'female' 
      ? 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face'
      : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face';
  };

  // Get auth token
  const getAuthToken = (): string => {
    return localStorage.getItem('authToken') || '';
  };

  // Fetch request statistics
  const fetchRequestStats = async () => {
    try {
      const token = getAuthToken();
      const response = await fetch(`${API_BASE_URL}/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch request statistics');
      }

      const result = await response.json();
      if (result.success) {
        setRequestCounts(result.data);
      }
    } catch (err) {
      console.error('Error fetching request stats:', err);
    }
  };

  // Fetch received requests
  const fetchReceivedRequests = async (retryCount = 0) => {
    try {
      setLoading(true);
      setError('');
      const token = getAuthToken();
      
      const response = await fetch(`${API_BASE_URL}/received`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch received requests');
      }

      const result = await response.json();
      
      if (result.success) {
        const requestsData = result.data || [];
        const formattedRequests: Request[] = requestsData
          .filter((request: any) => request.sender && request.receiver)
          .map((request: any) => ({
            ...request,
            type: 'received' as const,
          }));
        
        if (requestsData.length !== formattedRequests.length) {
          console.warn(`Filtered out ${requestsData.length - formattedRequests.length} invalid received requests`);
          setInvalidRequestCount(requestsData.length - formattedRequests.length);
        }
        
        setReceivedRequests(formattedRequests);
      } else {
        throw new Error(result.error || 'Failed to fetch requests');
      }
    } catch (err) {
      if (retryCount < 3) {
        console.warn(`Retrying fetchReceivedRequests (${retryCount + 1}/3)`);
        setTimeout(() => fetchReceivedRequests(retryCount + 1), 1000);
        return;
      }
      setError(err instanceof Error ? err.message : 'Failed to fetch requests');
      console.error('Error fetching received requests:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch sent requests
  const fetchSentRequests = async (retryCount = 0) => {
    try {
      setLoading(true);
      setError('');
      const token = getAuthToken();
      
      const response = await fetch(`${API_BASE_URL}/sent`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch sent requests');
      }

      const result = await response.json();
      
      if (result.success) {
        const requestsData = result.data || [];
        const formattedRequests: Request[] = requestsData
          .filter((request: any) => request.sender && request.receiver)
          .map((request: any) => ({
            ...request,
            type: 'sent' as const,
          }));
        
        if (requestsData.length !== formattedRequests.length) {
          console.warn(`Filtered out ${requestsData.length - formattedRequests.length} invalid sent requests`);
          setInvalidRequestCount(requestsData.length - formattedRequests.length);
        }
        
        setSentRequests(formattedRequests);
      } else {
        throw new Error(result.error || 'Failed to fetch requests');
      }
    } catch (err) {
      if (retryCount < 3) {
        console.warn(`Retrying fetchSentRequests (${retryCount + 1}/3)`);
        setTimeout(() => fetchSentRequests(retryCount + 1), 1000);
        return;
      }
      setError(err instanceof Error ? err.message : 'Failed to fetch requests');
      console.error('Error fetching sent requests:', err);
    } finally {
      setLoading(false);
    }
  };

  // Update request status
  const updateRequestStatus = async (requestId: string, status: 'accepted' | 'rejected') => {
    try {
      setError('');
      const token = getAuthToken();
      
      const response = await fetch(`${API_BASE_URL}/${requestId}/status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Failed to ${status} request`);
      }

      const result = await response.json();
      if (!result.success) {
        throw new Error(result.error || `Failed to ${status} request`);
      }

      // Update local state
      if (activeTab === 'received') {
        setReceivedRequests(prev => 
          prev.map(req => 
            req._id === requestId ? { ...req, status } : req
          )
        );
      } else {
        setSentRequests(prev => 
          prev.map(req => 
            req._id === requestId ? { ...req, status } : req
          )
        );
      }

      // Refresh stats
      await fetchRequestStats();

      console.log(`${status} request:`, requestId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update request');
      console.error(`Error ${status}ing request:`, err);
    }
  };

  // Delete request
  const deleteRequest = async (requestId: string) => {
    try {
      setError('');
      const token = getAuthToken();
      
      const response = await fetch(`${API_BASE_URL}/${requestId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to delete request');
      }

      const result = await response.json();
      if (!result.success) {
        throw new Error(result.error || 'Failed to delete request');
      }

      // Update local state
      if (activeTab === 'received') {
        setReceivedRequests(prev => prev.filter(req => req._id !== requestId));
      } else {
        setSentRequests(prev => prev.filter(req => req._id !== requestId));
      }

      // Refresh stats
      await fetchRequestStats();

      console.log('Deleted request:', requestId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete request');
      console.error('Error deleting request:', err);
    }
  };

  // Handle accept request
  const handleAcceptRequest = (requestId: string) => {
    updateRequestStatus(requestId, 'accepted');
  };

  // Handle reject request
  const handleRejectRequest = (requestId: string) => {
    updateRequestStatus(requestId, 'rejected');
  };

  // Handle delete request
  const handleDeleteRequest = (requestId: string) => {
    if (window.confirm('Are you sure you want to delete this request?')) {
      deleteRequest(requestId);
    }
  };

  const handleViewProfile = (request: Request) => {
    const profileUser = activeTab === 'received' ? request.sender : request.receiver;
    if (!profileUser) {
      setError('Cannot view profile: User data is missing');
      return;
    }
    onNavigate('profile-view', { 
      profileId: profileUser._id,
      user: profileUser
    });
  };

  // Fetch data when tab changes
  useEffect(() => {
    if (activeTab === 'received') {
      fetchReceivedRequests();
    } else {
      fetchSentRequests();
    }
    fetchRequestStats();
  }, [activeTab]);

  // Stats calculations
  const pendingReceived = receivedRequests.filter(r => r.status === 'pending').length;
  const acceptedSent = sentRequests.filter(r => r.status === 'accepted').length;
  const rejectedSent = sentRequests.filter(r => r.status === 'rejected').length;
  const pendingSent = sentRequests.filter(r => r.status === 'pending').length;

  // Filter requests based on search and status
  const filteredRequests = (activeTab === 'received' ? receivedRequests : sentRequests).filter(req => {
    const targetUser = activeTab === 'received' ? req.sender : req.receiver;
    if (!targetUser) {
      return false;
    }
    const matchesSearch =
      (targetUser.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) || false) ||
     (targetUser.gender?.toLowerCase().includes(searchQuery.toLowerCase()) || false);
    const matchesStatus = filterStatus === 'all' || req.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            {error}
            <button 
              onClick={() => setError('')} 
              className="ml-auto text-red-500 hover:text-red-700"
            >
              ×
            </button>
          </div>
        )}

        {/* Invalid Requests Warning */}
        {invalidRequestCount > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-xl flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            <span>{invalidRequestCount} invalid request(s) could not be displayed due to missing user data.</span>
          </div>
        )}

        {/* Hero Header */}
        <div className="relative overflow-hidden bg-gradient-to-r from-rose-600 to-pink-600 rounded-3xl p-8 text-white shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <UserPlus className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-1">Connection Requests</h1>
                <p className="text-rose-100 text-lg">Manage your meaningful connections</p>
              </div>
            </div>
            
            {requestCounts.pending > 0 && (
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <Sparkles className="h-5 w-5 animate-pulse" />
                <span className="font-semibold">{requestCounts.pending} new requests waiting for you!</span>
              </div>
            )}
          </div>
        </div>

        {/* Tab Navigation with Stats */}
        <div className="grid md:grid-cols-2 gap-4">
          <button
            onClick={() => setActiveTab('received')}
            className={`relative overflow-hidden rounded-2xl p-6 transition-all ${
              activeTab === 'received'
                ? 'bg-white text-gray-900 shadow-xl ring-2 ring-rose-600'
                : 'bg-white text-gray-700 shadow-lg hover:shadow-xl'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="h-6 w-6 fill-rose-600 text-rose-600" />
                  <span className="text-2xl font-bold">Received</span>
                </div>
                <p className="text-sm text-gray-600">
                  Profiles interested in you
                </p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-gray-900">{requestCounts.received}</div>
                {pendingReceived > 0 && (
                  <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-rose-600 to-pink-600 text-white">
                    {pendingReceived} New
                  </span>
                )}
              </div>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('sent')}
            className={`relative overflow-hidden rounded-2xl p-6 transition-all ${
              activeTab === 'sent'
                ? 'bg-white text-gray-900 shadow-xl ring-2 ring-rose-600'
                : 'bg-white text-gray-700 shadow-lg hover:shadow-xl'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-6 w-6 text-gray-700" />
                  <span className="text-2xl font-bold">Sent</span>
                </div>
                <p className="text-sm text-gray-600">
                  Your sent requests
                </p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-gray-900">{requestCounts.sent}</div>
                {acceptedSent > 0 && (
                  <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                    {acceptedSent} Accepted
                  </span>
                )}
              </div>
            </div>
          </button>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-rose-500 focus:outline-none transition-colors"
              />
            </div>
            
            {/* Filter Pills */}
            <div className="flex flex-wrap gap-3">
              <div
                onClick={() => setFilterStatus('all')}
                className={`cursor-pointer px-5 py-2.5 rounded-full font-medium transition-all flex items-center gap-2 ${
                  filterStatus === 'all'
                    ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="text-sm">All Requests</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  filterStatus === 'all' ? 'bg-white/20' : 'bg-gray-200'
                }`}>
                  {(activeTab === 'received' ? receivedRequests : sentRequests).length}
                </span>
              </div>
              
              <div
                onClick={() => setFilterStatus('pending')}
                className={`cursor-pointer px-5 py-2.5 rounded-full font-medium transition-all flex items-center gap-2 ${
                  filterStatus === 'pending'
                    ? 'bg-blue-600 text-white shadow-lg scale-105'
                    : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                }`}
              >
                <Clock className="h-4 w-4" />
                <span className="text-sm">Pending</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  filterStatus === 'pending' ? 'bg-white/20' : 'bg-blue-100'
                }`}>
                  {activeTab === 'received' ? pendingReceived : pendingSent}
                </span>
              </div>
              
              <div
                onClick={() => setFilterStatus('accepted')}
                className={`cursor-pointer px-5 py-2.5 rounded-full font-medium transition-all flex items-center gap-2 ${
                  filterStatus === 'accepted'
                    ? 'bg-green-600 text-white shadow-lg scale-105'
                    : 'bg-green-50 text-green-700 hover:bg-green-100'
                }`}
              >
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm">Accepted</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  filterStatus === 'accepted' ? 'bg-white/20' : 'bg-green-100'
                }`}>
                  {activeTab === 'received' 
                    ? receivedRequests.filter(r => r.status === 'accepted').length 
                    : acceptedSent}
                </span>
              </div>
              
              <div
                onClick={() => setFilterStatus('rejected')}
                className={`cursor-pointer px-5 py-2.5 rounded-full font-medium transition-all flex items-center gap-2 ${
                  filterStatus === 'rejected'
                    ? 'bg-red-600 text-white shadow-lg scale-105'
                    : 'bg-red-50 text-red-700 hover:bg-red-100'
                }`}
              >
                <XCircle className="h-4 w-4" />
                <span className="text-sm">Declined</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  filterStatus === 'rejected' ? 'bg-white/20' : 'bg-red-100'
                }`}>
                  {activeTab === 'received' 
                    ? receivedRequests.filter(r => r.status === 'rejected').length 
                    : rejectedSent}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Requests Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full text-center py-12">
              <Loader2 className="h-12 w-12 animate-spin text-rose-600 mx-auto mb-4" />
              <p className="text-gray-600">Loading requests...</p>
            </div>
          ) : filteredRequests.length === 0 ? (
            <div className="col-span-full text-center py-12 bg-white rounded-2xl shadow-lg">
              <UserPlus className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No requests found</h3>
              <p className="text-gray-600">
                {searchQuery || filterStatus !== 'all' 
                  ? 'Try adjusting your search or filters' 
                  : activeTab === 'received' 
                    ? 'No received requests at the moment' 
                    : "You haven't sent any requests yet"}
              </p>
            </div>
          ) : (
            filteredRequests.map((request, index) => {
              const targetUser = activeTab === 'received' ? request.sender : request.receiver;
              if (!targetUser) {
                return (
                  <div
                    key={request._id}
                    className="bg-white rounded-2xl shadow-lg p-6 text-center flex items-center justify-center gap-2"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    <p className="text-yellow-600">Invalid request: User data missing</p>
                  </div>
                );
              }
              const age = calculateAge(targetUser.dateOfBirth);
              const profileImage = targetUser.profilePhotos?.[0] || getDefaultProfileImage(targetUser.gender);
              
              return (
                <div
                  key={request._id}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Image Header */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={profileImage}
                      alt={targetUser.fullName}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.src = getDefaultProfileImage(targetUser.gender);
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    
                    {/* Status Badge */}
                    {request.status === 'pending' && activeTab === 'received' && (
                      <div className="absolute top-4 right-4">
                        <span className="bg-gradient-to-r from-rose-600 to-pink-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg animate-pulse flex items-center gap-1">
                          <Sparkles className="h-3 w-3" />
                          New
                        </span>
                      </div>
                    )}
                    
                    {/* Compatibility Badge */}
                    {request.compatibility && (
                      <div className="absolute top-4 left-4">
                        <div className="bg-white/90 backdrop-blur-sm text-gray-900 text-sm font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                          <Heart className="h-4 w-4 text-rose-600 fill-rose-600" />
                          {request.compatibility}%
                        </div>
                      </div>
                    )}
                    
                    {/* Time */}
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {getTimeAgo(request.createdAt)}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* <h3 className="text-xl font-bold text-gray-900 mb-2">{targetUser.fullName}</h3>
                    <p className="text-sm text-gray-600 mb-3 flex items-center gap-1">
                      <span className="font-medium">{age} years</span>
                      <span>•</span>
                      <span>{targetUser.location || 'Location not specified'}</span>
                    </p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">🎓</span>
                        <span>{targetUser.education || 'Education not specified'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="w-6 h-6 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">💼</span>
                        <span>{targetUser.occupation || 'Occupation not specified'}</span>
                      </div> */}
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{targetUser.fullName}</h3>
                      <p className="text-sm text-gray-600 mb-3 flex items-center gap-1">
                        <span className="font-medium">{age} years</span> 
                        <span>•</span>
                        <span className="capitalize">{targetUser.gender}</span>  
                      </p>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span>👤</span>
                          <span className="capitalize">Profile for: {targetUser.profileCreatedFor}</span>  
                        </div>
                        {/* <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span>📱</span>
                          <span>{targetUser.phoneNumber || 'Phone not provided'}</span> 
                        </div> */}
                    
                    </div>

                    {/* Actions */}
                    {activeTab === 'received' && request.status === 'pending' ? (
                      <div className="flex gap-2">
                        {/* <button
                          onClick={() => handleViewProfile(request)}
                          className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all font-medium flex items-center justify-center gap-2"
                        >
                          <Eye className="h-4 w-4" />
                          View
                        </button> */}
                        <button
                          onClick={() => handleAcceptRequest(request._id)}
                          className="flex-1 py-3 bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-xl hover:shadow-lg transition-all font-medium flex items-center justify-center gap-2"
                        >
                          <CheckCircle className="h-4 w-4" />
                          Accept
                        </button>
                        <button
                          onClick={() => handleRejectRequest(request._id)}
                          className="py-3 px-4 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all"
                        >
                          <XCircle className="h-5 w-5" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        {/* <button
                          onClick={() => handleViewProfile(request)}
                          className="flex items-center gap-2 text-gray-600 hover:text-rose-600 transition-colors font-medium"
                        >
                          <Eye className="h-5 w-5" />
                          View Profile
                        </button> */}
                        <div className="flex items-center gap-2">
                          <div
                            className={`px-4 py-2 rounded-xl font-medium flex items-center gap-2 ${
                              request.status === 'accepted'
                                ? 'bg-green-100 text-green-700'
                                : request.status === 'rejected'
                                ? 'bg-red-100 text-red-700'
                                : 'bg-amber-100 text-amber-700'
                            }`}
                          >
                            {request.status === 'accepted' && <CheckCircle className="h-4 w-4" />}
                            {request.status === 'rejected' && <XCircle className="h-4 w-4" />}
                            {request.status === 'pending' && <Clock className="h-4 w-4" />}
                            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                          </div>
                          {(request.status === 'rejected' || request.status === 'accepted') && (
                           <button
                            onClick={() => handleDeleteRequest(request._id)}
                            className="flex items-center gap-2 px-4 py-2 rounded-md border border-gray-300 text-gray-600 hover:text-red-600 hover:border-red-600 transition-colors duration-200"
                            title="Delete request"
                          >
                            Delete
                            <XCircle className="h-5 w-5" />
                          </button>

                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Add some custom animations */}
      <style >{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};