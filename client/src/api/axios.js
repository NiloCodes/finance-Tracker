import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000", // your Express server
});

// Automatically attach JWT token to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token"); // temporary, we'll improve this
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
