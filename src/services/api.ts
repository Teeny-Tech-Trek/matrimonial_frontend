

import axios from "axios";

const configuredBaseURL =
    import.meta.env.VITE_API_BASE_URL ||
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000/backend";

// Backward compatibility: old env files use `/api`, while current backend mounts under `/backend`.
const baseURL = configuredBaseURL.replace(/\/api\/?$/, "/backend");

const api = axios.create({
    baseURL,
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
