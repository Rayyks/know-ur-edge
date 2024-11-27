import axios from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Request interceptor
instance.interceptors.request.use(
  (config) => {
    // Add Content-Type header
    config.headers["Content-Type"] = "application/json";

    // Add Authorization header if token exists and endpoint is not auth-related
    const token = Cookies.get("_user_accessToken_");
    const authEndpoints = ["/login", "/register"];
    const isAuthEndpoint = authEndpoints.some((endpoint) =>
      config.url.includes(endpoint)
    );

    if (token && !isAuthEndpoint) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle token expiration or other errors
    if (error.response && error.response.status === 401) {
      // Optionally, you can redirect to login page or refresh token
      console.error("Unauthorized access - possibly due to expired token");
      // Redirect to login page or handle token refresh logic here
    }
    return Promise.reject(error);
  }
);

export default instance;
