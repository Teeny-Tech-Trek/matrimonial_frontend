

// import api from "./api";

// export const adminService = {
//   // GET /admin/stats
//   getStats: async () => {
//     try {
//       const response = await api.get("/admin/stats");
//       return response.data;
//     } catch (error: any) {
//       throw new Error(error.response?.data?.message || "Failed to fetch stats");
//     }
//   },

//   // GET /admin/users
//   listUsers: async (params: {
//     page?: number;
//     limit?: number;
//     role?: string;
//     search?: string;
//     isActive?: string;
//   }) => {
//     try {
//       const response = await api.get("/admin/users", { params });
//       return response.data;
//     } catch (error: any) {
//       throw new Error(error.response?.data?.message || "Failed to fetch users");
//     }
//   },

//   // GET /admin/users/:userId
//   getUser: async (userId: string) => {
//     try {
//       const response = await api.get(`/admin/users/${userId}`);
//       return response.data;
//     } catch (error: any) {
//       throw new Error(error.response?.data?.message || "Failed to fetch user");
//     }
//   },

//   // PUT /admin/users/:userId
//   updateUser: async (userId: string, data: any) => {
//     try {
//       const response = await api.put(`/admin/users/${userId}`, data);
//       return response.data;
//     } catch (error: any) {
//       throw new Error(error.response?.data?.message || "Failed to update user");
//     }
//   },

//   // DELETE /admin/users/:userId
//   deleteUser: async (userId: string) => {
//     try {
//       const response = await api.delete(`/admin/users/${userId}`);
//       return response.data;
//     } catch (error: any) {
//       throw new Error(error.response?.data?.message || "Failed to delete user");
//     }
//   },

//   // GET /admin/users/export
//   exportUsers: async (params?: { role?: string }) => {
//     try {
//       const response = await api.get("/admin/users/export", {
//         params,
//         responseType: "blob",
//       });
//       return response.data;
//     } catch {
//       throw new Error("Failed to export users");
//     }
//   },

//   // GET /admin/profiles
//   listProfiles: async (params: {
//     page?: number;
//     limit?: number;
//     status?: string;
//     search?: string;
//   }) => {
//     try {
//       const response = await api.get("/admin/profiles", { params });
//       return response.data;
//     } catch (error: any) {
//       throw new Error(
//         error.response?.data?.message || "Failed to fetch profiles"
//       );
//     }
//   },

//   // PUT /admin/profiles/:profileId/verify
//   verifyProfile: async (profileId: string, isVerified: boolean) => {
//     try {
//       const response = await api.put(
//         `/admin/profiles/${profileId}/verify`,
//         { isVerified }
//       );
//       return response.data;
//     } catch (error: any) {
//       throw new Error(
//         error.response?.data?.message || "Failed to verify profile"
//       );
//     }
//   },

//   // PUT /admin/profiles/:profileId/photos/:photoId/moderate
//   moderatePhoto: async (
//     profileId: string,
//     photoId: string,
//     status: string
//   ) => {
//     try {
//       const response = await api.put(
//         `/admin/profiles/${profileId}/photos/${photoId}/moderate`,
//         { status }
//       );
//       return response.data;
//     } catch (error: any) {
//       throw new Error(
//         error.response?.data?.message || "Failed to moderate photo"
//       );
//     }
//   },

//   // GET /admin/requests
//   listRequests: async (params: {
//     page?: number;
//     limit?: number;
//     status?: string;
//     search?: string;
//   }) => {
//     try {
//       const response = await api.get("/admin/requests", { params });
//       return response.data;
//     } catch (error: any) {
//       throw new Error(
//         error.response?.data?.message || "Failed to fetch requests"
//       );
//     }
//   },

//   // GET /admin/conversations
//   listConversations: async (params: {
//     page?: number;
//     limit?: number;
//     search?: string;
//   }) => {
//     try {
//       const response = await api.get("/admin/conversations", {
//         params,
//       });
//       return response.data;
//     } catch (error: any) {
//       throw new Error(
//         error.response?.data?.message || "Failed to fetch conversations"
//       );
//     }
//   },

//   // GET /admin/search
//   quickSearch: async (query: string) => {
//     try {
//       const response = await api.get("/admin/search", {
//         params: { q: query },
//       });
//       return response.data;
//     } catch (error: any) {
//       throw new Error(
//         error.response?.data?.message || "Search failed"
//       );
//     }
//   },
// };

// export default adminService;

import api from "./api";

export const adminService = {
  // GET /admin/stats
  getStats: async () => {
    try {
      const response = await api.get("/admin/stats");
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to fetch stats");
    }
  },

  // GET /admin/users
  listUsers: async (params: {
    page?: number;
    limit?: number;
    role?: string;
    search?: string;
    isActive?: string;
  }) => {
    try {
      const response = await api.get("/admin/users", { params });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to fetch users");
    }
  },

  // GET /admin/users/:userId
  getUser: async (userId: string) => {
    try {
      const response = await api.get(`/admin/users/${userId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to fetch user");
    }
  },

  // PUT /admin/users/:userId
  updateUser: async (userId: string, data: any) => {
    try {
      const response = await api.put(`/admin/users/${userId}`, data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to update user");
    }
  },

  // DELETE /admin/users/:userId
  deleteUser: async (userId: string) => {
    try {
      const response = await api.delete(`/admin/users/${userId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to delete user");
    }
  },

  // DELETE /admin/users/:userId/permanent - Permanent deletion
  permanentDeleteUser: async (userId: string) => {
    try {
      const response = await api.delete(`/admin/users/${userId}/permanent`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to permanently delete user");
    }
  },

  // GET /admin/users/export
  exportUsers: async (params?: { role?: string }) => {
    try {
      const response = await api.get("/admin/users/export", {
        params,
        responseType: "blob",
      });
      return response.data;
    } catch {
      throw new Error("Failed to export users");
    }
  },

  // GET /admin/profiles
  listProfiles: async (params: {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
  }) => {
    try {
      const response = await api.get("/admin/profiles", { params });
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch profiles"
      );
    }
  },

  // PUT /admin/profiles/:profileId/verify
  verifyProfile: async (profileId: string, isVerified: boolean) => {
    try {
      const response = await api.put(
        `/admin/profiles/${profileId}/verify`,
        { isVerified }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to verify profile"
      );
    }
  },

  // PUT /admin/profiles/:profileId/photos/:photoId/moderate
  moderatePhoto: async (
    profileId: string,
    photoId: string,
    status: string
  ) => {
    try {
      const response = await api.put(
        `/admin/profiles/${profileId}/photos/${photoId}/moderate`,
        { status }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to moderate photo"
      );
    }
  },

  // GET /admin/requests
  listRequests: async (params: {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
  }) => {
    try {
      const response = await api.get("/admin/requests", { params });
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch requests"
      );
    }
  },

  // GET /admin/conversations
  listConversations: async (params: {
    page?: number;
    limit?: number;
    search?: string;
  }) => {
    try {
      const response = await api.get("/admin/conversations", {
        params,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch conversations"
      );
    }
  },

  // GET /admin/search
  quickSearch: async (query: string) => {
    try {
      const response = await api.get("/admin/search", {
        params: { q: query },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Search failed"
      );
    }
  },

  // DELETE /admin/profiles/:profileId
  deleteProfile: async (profileId: string) => {
    try {
      const response = await api.delete(`/admin/profiles/${profileId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to delete profile"
      );
    }
  },
};

export default adminService;