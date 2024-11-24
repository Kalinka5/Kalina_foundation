import Cookies from "js-cookie";

import { ACCESS_TOKEN, API_URL } from "./constants";

const baseURL = process.env.REACT_APP_API_URL || API_URL;

/**
 * Custom fetch wrapper for API requests.
 * @param {string} endpoint - The API endpoint (e.g., "items/").
 * @param {object} options - Fetch options (method, body, headers, etc.).
 * @returns {Promise<Response>} - A promise resolving to the fetch response.
 */
const api = async (endpoint, options = {}) => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  const csrfToken = Cookies.get("csrftoken");

  // Default headers
  const headers = {
    ...(options.headers || {}),
  };

  // Add token and CSRF headers if available
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  if (csrfToken) {
    headers["X-CSRFToken"] = csrfToken;
  }

  // Remove 'Content-Type' if using FormData
  if (options.body instanceof FormData) {
    delete headers["Content-Type"];
  } else {
    headers["Content-Type"] = "application/json";
  }

  // Configure fetch options
  const fetchOptions = {
    ...options,
    headers,
  };

  // Perform the fetch request
  const response = await fetch(`${baseURL}${endpoint}`, fetchOptions);

  // Check if the response is empty (204 No Content or similar)
  if (response.status === 204) {
    return null; // Return null for no content responses
  }

  // Return the parsed response
  return response.json();
};

export default api;
