import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

// helper
const token = () => localStorage.getItem("token");

//  SINGLE API CLIENT (recommended)
const API = axios.create({
  baseURL: `${BASE_URL}/api`,
});

//  ALWAYS attach latest token
API.interceptors.request.use((req) => {
  const t = token();

  if (t) {
    req.headers.Authorization = `Bearer ${t}`;
  }

  console.log("TOKEN SENT:", t); // 🔍 debug

  return req;
});

export default API;