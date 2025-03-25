import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// Base API configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// Create axios instance with default config
const apiClient: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // 10 seconds
});

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('token');
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor for handling common errors
apiClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => {
        // Handle authentication errors
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
            // Optional: redirect to login page
            // window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// API request methods
export const api = {
    get: <T>(url: string, config?: AxiosRequestConfig) => 
        apiClient.get<T>(url, config).then(response => response.data),
        
    post: <T>(url: string, data: any, config?: AxiosRequestConfig) => 
        apiClient.post<T>(url, data, config).then(response => response.data),
        
    put: <T>(url: string, data: any, config?: AxiosRequestConfig) => 
        apiClient.put<T>(url, data, config).then(response => response.data),
        
    patch: <T>(url: string, data: any, config?: AxiosRequestConfig) => 
        apiClient.patch<T>(url, data, config).then(response => response.data),
        
    delete: <T>(url: string, config?: AxiosRequestConfig) => 
        apiClient.delete<T>(url, config).then(response => response.data),
};

export default api;