// src/components/ViewRequests.tsx
import React, { useState, useEffect } from 'react';
import { UserPlus, CheckCircle, XCircle, Clock, Eye, Loader2, Heart, MessageCircle, ArrowRight, Filter, Search, Sparkles, TrendingUp, Users } from 'lucide-react';

interface Request {
  id: string;
  name: string;
  age: number;
  location: string;
  education: string;
  occupation: string;
  image: string;
  status: 'pending' | 'accepted' | 'rejected';
  time: string;
  type: 'received' | 'sent';
  compatibility?: number;
}

interface ViewRequestsProps {
  onNavigate: (page: string, data?: any) => void;
}

export const ViewRequests: React.FC<ViewRequestsProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'received' | 'sent'>('received');
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'accepted' | 'rejected'>('all');
  
  // Sample data - Replace with API calls
  const [receivedRequests, setReceivedRequests] = useState<Request[]>([
    {
      id: '1',
      name: 'Priya Sharma',
      age: 26,
      location: 'Mumbai, Maharashtra',
      education: 'MBA',
      occupation: 'Marketing Manager',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      status: 'pending',
      time: '2 hours ago',
      type: 'received',
      compatibility: 94
    },
    {
      id: '2',
      name: 'Anjali Verma',
      age: 24,
      location: 'Delhi, NCR',
      education: 'B.Tech in CS',
      occupation: 'Software Engineer',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
      status: 'pending',
      time: '5 hours ago',
      type: 'received',
      compatibility: 88
    },
    {
      id: '3',
      name: 'Neha Patel',
      age: 27,
      location: 'Ahmedabad, Gujarat',
      education: 'CA',
      occupation: 'Chartered Accountant',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
      status: 'pending',
      time: '1 day ago',
      type: 'received',
      compatibility: 91
    }
  ]);

  const [sentRequests, setSentRequests] = useState<Request[]>([
    {
      id: '4',
      name: 'Kavya Reddy',
      age: 25,
      location: 'Hyderabad, Telangana',
      education: 'M.Sc',
      occupation: 'Research Scientist',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
      status: 'accepted',
      time: '3 days ago',
      type: 'sent',
      compatibility: 92
    },
    {
      id: '5',
      name: 'Riya Malhotra',
      age: 23,
      location: 'Chandigarh, Punjab',
      education: 'BBA',
      occupation: 'Business Analyst',
      image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400',
      status: 'rejected',
      time: '4 days ago',
      type: 'sent',
      compatibility: 85
    },
    {
      id: '6',
      name: 'Divya Iyer',
      age: 26,
      location: 'Bangalore, Karnataka',
      education: 'B.Tech',
      occupation: 'Product Manager',
      image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400',
      status: 'pending',
      time: '1 week ago',
      type: 'sent',
      compatibility: 89
    }
  ]);

  const handleAcceptRequest = (requestId: string) => {
    setReceivedRequests(prev => 
      prev.map(req => 
        req.id === requestId ? { ...req, status: 'accepted' as const } : req
      )
    );
    console.log('Accepted request:', requestId);
  };

  const handleRejectRequest = (requestId: string) => {
    setReceivedRequests(prev => 
      prev.map(req => 
        req.id === requestId ? { ...req, status: 'rejected' as const } : req
      )
    );
    console.log('Rejected request:', requestId);
  };

  const handleViewProfile = (requestId: string) => {
    onNavigate('profile-view', { profileId: requestId });
  };

  const pendingReceived = receivedRequests.filter(r => r.status === 'pending').length;
  const acceptedSent = sentRequests.filter(r => r.status === 'accepted').length;
  const rejectedSent = sentRequests.filter(r => r.status === 'rejected').length;
  const pendingSent = sentRequests.filter(r => r.status === 'pending').length;

  // Filter requests based on search and status
  const filteredRequests = (activeTab === 'received' ? receivedRequests : sentRequests).filter(req => {
    const matchesSearch = req.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          req.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || req.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
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
            
            {pendingReceived > 0 && (
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <Sparkles className="h-5 w-5 animate-pulse" />
                <span className="font-semibold">{pendingReceived} new requests waiting for you!</span>
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
                <div className="text-4xl font-bold text-gray-900">{receivedRequests.length}</div>
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
                <div className="text-4xl font-bold text-gray-900">{sentRequests.length}</div>
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
                {searchQuery ? 'Try adjusting your search' : 'No requests at the moment'}
              </p>
            </div>
          ) : (
            filteredRequests.map((request, index) => (
              <div
                key={request.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Image Header */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={request.image}
                    alt={request.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Status Badge */}
                  {request.status === 'pending' && (
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
                      {request.time}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{request.name}</h3>
                  <p className="text-sm text-gray-600 mb-3 flex items-center gap-1">
                    <span className="font-medium">{request.age} years</span>
                    <span>•</span>
                    <span>{request.location}</span>
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">🎓</span>
                      <span>{request.education}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-6 h-6 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">💼</span>
                      <span>{request.occupation}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  {activeTab === 'received' && request.status === 'pending' ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleViewProfile(request.id)}
                        className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all font-medium flex items-center justify-center gap-2"
                      >
                        <Eye className="h-4 w-4" />
                        View
                      </button>
                      <button
                        onClick={() => handleAcceptRequest(request.id)}
                        className="flex-1 py-3 bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-xl hover:shadow-lg transition-all font-medium flex items-center justify-center gap-2"
                      >
                        <CheckCircle className="h-4 w-4" />
                        Accept
                      </button>
                      <button
                        onClick={() => handleRejectRequest(request.id)}
                        className="py-3 px-4 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all"
                      >
                        <XCircle className="h-5 w-5" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => handleViewProfile(request.id)}
                        className="flex items-center gap-2 text-gray-600 hover:text-rose-600 transition-colors font-medium"
                      >
                        <Eye className="h-5 w-5" />
                        View Profile
                      </button>
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
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};