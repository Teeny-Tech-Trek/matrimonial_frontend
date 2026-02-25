

import axios from "axios";

const getBaseUrl = () => {
    const envBase = import.meta.env.VITE_API_BASE_URL;
    if (envBase) return envBase;

    if (typeof window !== "undefined" && window.location.hostname === "localhost") {
        return "http://localhost:5000/backend";
    }

    return "https://api.rsaristomatch.com/backend";
};

const api = axios.create({
    baseURL: getBaseUrl(),
    
 //  Added /backend
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

// Add request interceptor - FIXED token key
api.interceptors.request.use(
    (config) => {
        // ✅ Changed from "token" to "authToken" (consistent with your app)
        const token = localStorage.getItem("authToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor - FIXED token key
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Don't automatically redirect for login endpoints so the calling
            // code can show a toast message (e.g., Invalid credentials).
            const requestUrl = error.config?.url || '';
            const isAuthEndpoint = requestUrl.includes('/auth/login') || requestUrl.includes('/auth/google-login');

            if (!isAuthEndpoint) {
                // Handle unauthorized - redirect to login
                // Changed from "token" to "authToken"
                localStorage.removeItem("authToken");
                localStorage.removeItem("user"); // Also clear user data
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);

export default api;
