import axios from "axios";

const BASE_URl = import.meta.env.VITE_API_URL

const api = axios.create({
  baseURL:`${BASE_URl}/api/v1`,
  withCredentials: true,
});

export default api;
