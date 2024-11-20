import axios from "axios";

import Cookies from "js-cookie";

import { ACCESS_TOKEN, API_URL } from "./constants";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
    ? process.env.REACT_APP_API_URL
    : API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    const csrfToken = Cookies.get("csrftoken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers["Content-Type"] = "multipart/form-data";
    }
    if (csrfToken) {
      config.headers["X-CSRFToken"] = csrfToken;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default api;
