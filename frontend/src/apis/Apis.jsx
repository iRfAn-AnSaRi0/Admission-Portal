import axios from "axios";

// Base API instance
const API = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true, // Automatically includes cookies in requests
});

// Request Interceptor: No need to manually attach token from cookies
API.interceptors.request.use((config) => {
  return config; // Cookies are automatically sent due to `withCredentials: true`
});

// Response Interceptor: Refreshes token when accessToken expires
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await API.post("/user/refreshtoken"); // Server will handle token refresh via cookies
        
        return API(originalRequest); // Retry the original request
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        window.location.href = "/"; // Redirect to login page
      }
    }
    
    return Promise.reject(error);
  }
);

export default API;
