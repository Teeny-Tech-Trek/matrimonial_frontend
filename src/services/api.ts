

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
    baseURL: "https://15-207-55-215.nip.io", //  Updated to your actual backend URL
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

// Add request interceptor (optional - for auth tokens)
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor (optional - for error handling)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Handle unauthorized - redirect to login
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default api;