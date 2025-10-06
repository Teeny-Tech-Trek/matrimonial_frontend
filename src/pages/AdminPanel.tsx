import React, { useState, useEffect } from 'react';
import { Shield, Users, Image, AlertCircle, CheckCircle, XCircle, TrendingUp } from 'lucide-react';
import { CompleteProfile } from '../types';

interface AdminPanelProps {
  onNavigate: (page: string) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'photos' | 'reports' | 'users'>('overview');
  const [profiles, setProfiles] = useState<CompleteProfile[]>([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    pendingPhotos: 0,
    pendingReports: 0
  });

  useEffect(() => {
    const storedProfiles = JSON.parse(localStorage.getItem('profiles') || '[]');
    setProfiles(storedProfiles);

    setStats({
      totalUsers: storedProfiles.length,
      activeUsers: storedProfiles.filter((p: CompleteProfile) => p.isActive).length,
      pendingPhotos: storedProfiles.reduce((sum: number, p: CompleteProfile) =>
        sum + p.photos.filter(photo => photo.status === 'pending').length, 0
      ),
      pendingReports: Math.floor(Math.random() * 5)
    });
  }, []);

  const handlePhotoApproval = (profileId: string, photoId: string, approved: boolean) => {
    const updatedProfiles = profiles.map(p => {
      if (p.id === profileId) {
        return {
          ...p,
          photos: p.photos.map(photo =>
            photo.id === photoId
              ? { ...photo, status: approved ? 'approved' : 'rejected' as any }
              : photo
          )
        };
      }
      return p;
    });
    setProfiles(updatedProfiles);
    localStorage.setItem('profiles', JSON.stringify(updatedProfiles));
    alert(`Photo ${approved ? 'approved' : 'rejected'} successfully!`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Shield className="h-8 w-8 text-rose-600" />
          <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <Users className="h-8 w-8 text-blue-600 mb-4" />
          <div className="text-3xl font-bold text-gray-900 mb-1">{stats.totalUsers}</div>
          <div className="text-sm text-gray-600">Total Users</div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <TrendingUp className="h-8 w-8 text-green-600 mb-4" />
          <div className="text-3xl font-bold text-gray-900 mb-1">{stats.activeUsers}</div>
          <div className="text-sm text-gray-600">Active Users</div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <Image className="h-8 w-8 text-amber-600 mb-4" />
          <div className="text-3xl font-bold text-gray-900 mb-1">{stats.pendingPhotos}</div>
          <div className="text-sm text-gray-600">Pending Photos</div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <AlertCircle className="h-8 w-8 text-red-600 mb-4" />
          <div className="text-3xl font-bold text-gray-900 mb-1">{stats.pendingReports}</div>
          <div className="text-sm text-gray-600">Pending Reports</div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="border-b border-gray-200">
          <div className="flex space-x-1 p-4">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'overview'
                  ? 'bg-rose-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('photos')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'photos'
                  ? 'bg-rose-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Photo Moderation
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'reports'
                  ? 'bg-rose-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Reports
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'users'
                  ? 'bg-rose-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Users
            </button>
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-blue-600" />
                    <span className="text-gray-700">New user registration: Priya Sharma</span>
                  </div>
                  <span className="text-sm text-gray-500">2 hours ago</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Image className="h-5 w-5 text-amber-600" />
                    <span className="text-gray-700">Photo approval pending for Rahul Verma</span>
                  </div>
                  <span className="text-sm text-gray-500">5 hours ago</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-gray-700">Premium subscription purchased by Anjali Patel</span>
                  </div>
                  <span className="text-sm text-gray-500">1 day ago</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'photos' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900">Photo Moderation Queue</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {profiles.flatMap(profile =>
                  profile.photos
                    .filter(photo => photo.status === 'pending')
                    .map(photo => (
                      <div key={photo.id} className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden">
                        <img
                          src={photo.photoUrl}
                          alt="Pending approval"
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                          <p className="font-medium text-gray-900 mb-2">{profile.fullName}</p>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handlePhotoApproval(profile.id, photo.id, true)}
                              className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                            >
                              <CheckCircle className="h-4 w-4" />
                              <span>Approve</span>
                            </button>
                            <button
                              onClick={() => handlePhotoApproval(profile.id, photo.id, false)}
                              className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                            >
                              <XCircle className="h-4 w-4" />
                              <span>Reject</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                )}
                {profiles.flatMap(p => p.photos.filter(photo => photo.status === 'pending')).length === 0 && (
                  <div className="col-span-3 text-center py-12">
                    <Image className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No pending photo approvals</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900">User Reports</h2>
              <div className="text-center py-12">
                <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No pending reports</p>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900">All Users</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Phone</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Verified</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Membership</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {profiles.map(profile => (
                      <tr key={profile.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-900">{profile.fullName}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{profile.phoneNumber}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                            profile.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          }`}>
                            {profile.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {profile.isVerified ? (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          ) : (
                            <XCircle className="h-5 w-5 text-gray-400" />
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {profile.subscription?.tier.toUpperCase() || 'FREE'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};