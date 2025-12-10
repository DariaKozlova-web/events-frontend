const API_FALLBACK = "http://localhost:3001/api";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || API_FALLBACK;

export const apiConfig = {
  baseUrl: API_BASE_URL,
};
