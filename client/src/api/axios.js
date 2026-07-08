import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    console.log("Axios Token:", token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log("Request Headers:", config.headers);

    return config;
  },
  (error) => Promise.reject(error)
);

export default API;