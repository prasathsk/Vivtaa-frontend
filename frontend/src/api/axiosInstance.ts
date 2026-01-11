import axios from "axios";
import UseLocalStorage from "../@hooks/useLocalStorage";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});


axiosInstance.interceptors.request.use((config) => {
    const {getLocalstorage} = UseLocalStorage();
    const accessToken = getLocalstorage('access-token');

    if(accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;