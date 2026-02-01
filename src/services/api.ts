
import axios from 'axios';

// const api = axios.create({
//     // baseURL: import.meta.env.VITE_API_URL,
//     // baseURL:"http://localhost:5000/api" ,
//     baseURL:"https://api.rsaristomatch.com" ,
//     withCredentials: true,
//     headers: {
//         'Content-Type': 'application/json',
//     }
// });
const api = axios.create({
    baseURL: "https://15-207-55-215.nip.io",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});


api.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
