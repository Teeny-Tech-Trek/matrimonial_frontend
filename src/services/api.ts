

// const api = axios.create({
//     // baseURL: import.meta.env.VITE_API_URL,
//     // baseURL:"http://localhost:5000/api" ,
//     baseURL:"https://api.rsaristomatch.com" ,
//     withCredentials: true,
//     headers: {
//         'Content-Type': 'application/json',
//     }
// });// src/lib/api.ts or src/services/api.ts

// src/lib/api.ts or src/services/api.ts

import axios from "axios";

const api = axios.create({
    baseURL: "https://15-207-55-215.nip.io/backend", //  Added /backend
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
            // Handle unauthorized - redirect to login
            //  Changed from "token" to "authToken"
            localStorage.removeItem("authToken");
            localStorage.removeItem("user"); // Also clear user data
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default api;