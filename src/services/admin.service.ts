import api from "./api";

export const adminService = {
  // GET /backend/admin/stats
  getStats: async () => {
    try {
      const response = await api.get("/backend/admin/stats");
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to fetch stats");
    }
  },

  // GET /backend/admin/users
  listUsers: async (params: {
    page?: number;
    limit?: number;
    role?: string;
    search?: string;
    isActive?: string;
  }) => {
    try {
      const response = await api.get("/backend/admin/users", { params });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to fetch users");
    }
  },

  // GET /backend/admin/users/:userId
  getUser: async (userId: string) => {
    try {
      const response = await api.get(`/backend/admin/users/${userId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to fetch user");
    }
  },

  // PUT /backend/admin/users/:userId
  updateUser: async (userId: string, data: any) => {
    try {
      const response = await api.put(
        `/backend/admin/users/${userId}`,
        data
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to update user");
    }
  },

  // DELETE /backend/admin/users/:userId
  deleteUser: async (userId: string) => {
    try {
      const response = await api.delete(
        `/backend/admin/users/${userId}`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to delete user");
    }
  },

  // GET /backend/admin/users/export
  exportUsers: async (params?: { role?: string }) => {
    try {
      const response = await api.get("/backend/admin/users/export", {
        params,
        responseType: "blob",
      });
      return response.data;
    } catch {
      throw new Error("Failed to export users");
    }
  },

  // GET /backend/admin/profiles
  listProfiles: async (params: {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
  }) => {
    try {
      const response = await api.get("/backend/admin/profiles", { params });
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch profiles"
      );
    }
  },

  // PUT /backend/admin/profiles/:profileId/verify
  verifyProfile: async (profileId: string, isVerified: boolean) => {
    try {
      const response = await api.put(
        `/backend/admin/profiles/${profileId}/verify`,
        { isVerified }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to verify profile"
      );
    }
  },

  // PUT /backend/admin/profiles/:profileId/photos/:photoId/moderate
  moderatePhoto: async (
    profileId: string,
    photoId: string,
    status: string
  ) => {
    try {
      const response = await api.put(
        `/backend/admin/profiles/${profileId}/photos/${photoId}/moderate`,
        { status }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to moderate photo"
      );
    }
  },

  // GET /backend/admin/requests
  listRequests: async (params: {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
  }) => {
    try {
      const response = await api.get("/backend/admin/requests", { params });
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch requests"
      );
    }
  },

  // GET /backend/admin/conversations
  listConversations: async (params: {
    page?: number;
    limit?: number;
    search?: string;
  }) => {
    try {
      const response = await api.get("/backend/admin/conversations", {
        params,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch conversations"
      );
    }
  },

  // GET /backend/admin/search
  quickSearch: async (query: string) => {
    try {
      const response = await api.get("/backend/admin/search", {
        params: { q: query },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Search failed"
      );
    }
  },
};

export default adminService;
