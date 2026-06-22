import axios from "axios";
import { getToken } from "../auth/authStore";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
});

// attach token automatically
API.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;
