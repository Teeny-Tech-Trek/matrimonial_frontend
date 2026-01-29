// src/services/admin.service.ts
import api from './api';

export const adminService = {
  // GET /api/admin/stats
  getStats: async () => {
    try {
      const response = await api.get('/admin/stats');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch stats');
    }
  },

  // GET /api/admin/users
  listUsers: async (params: {
    page?: number;
    limit?: number;
    role?: string;
    search?: string;
    isActive?: string;
  }) => {
    try {
      const response = await api.get('/admin/users', { params });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch users');
    }
  },

  // GET /api/admin/users/:userId
  getUser: async (userId: string) => {
    try {
      const response = await api.get(`/admin/users/${userId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch user');
    }
  },

  // PUT /api/admin/users/:userId
  updateUser: async (userId: string, data: any) => {
    try {
      const response = await api.put(`/admin/users/${userId}`, data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update user');
    }
  },

  // DELETE /api/admin/users/:userId
  deleteUser: async (userId: string) => {
    try {
      const response = await api.delete(`/admin/users/${userId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to delete user');
    }
  },

  // GET /api/admin/users/export
  exportUsers: async (params?: { role?: string }) => {
    try {
      const response = await api.get('/admin/users/export', {
        params,
        responseType: 'blob',
      });
      return response.data;
    } catch (error: any) {
      throw new Error('Failed to export users');
    }
  },

  // GET /api/admin/profiles
  listProfiles: async (params: {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
  }) => {
    try {
      const response = await api.get('/admin/profiles', { params });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch profiles');
    }
  },

  // PUT /api/admin/profiles/:profileId/verify
  verifyProfile: async (profileId: string, isVerified: boolean) => {
    try {
      const response = await api.put(`/admin/profiles/${profileId}/verify`, { 
        isVerified 
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to verify profile');
    }
  },

  // PUT /api/admin/profiles/:profileId/photos/:photoId/moderate
  moderatePhoto: async (profileId: string, photoId: string, status: string) => {
    try {
      const response = await api.put(
        `/admin/profiles/${profileId}/photos/${photoId}/moderate`,
        { status }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to moderate photo');
    }
  },

  // GET /api/admin/requests
  listRequests: async (params: {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
  }) => {
    try {
      const response = await api.get('/admin/requests', { params });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch requests');
    }
  },

  // GET /api/admin/conversations
  listConversations: async (params: {
    page?: number;
    limit?: number;
    search?: string;
  }) => {
    try {
      const response = await api.get('/admin/conversations', { params });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch conversations');
    }
  },

  // GET /api/admin/search
  quickSearch: async (query: string) => {
    try {
      const response = await api.get('/admin/search', { 
        params: { q: query } 
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Search failed');
    }
  },
};

export default adminService;