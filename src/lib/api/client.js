/**
 * ─── KrushiAI API Client ──────────────────────────────────────────────
 * Central Axios instance with request/response interceptors.
 * Every service file imports this single client.
 */
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/v1',
  timeout: Number(process.env.NEXT_PUBLIC_API_TIMEOUT) || 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// ── Request Interceptor ────────────────────────────────────────────────
apiClient.interceptors.request.use(
  (config) => {
    // Attach auth token if present (future JWT / session support)
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('krushi_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ── Response Interceptor ───────────────────────────────────────────────
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const customError = {
      message: error.response?.data?.detail || error.message || 'Something went wrong',
      status: error.response?.status || 500,
      data: error.response?.data || null,
    };

    // Global 401 handling (optional: redirect to login)
    if (customError.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('krushi_token');
      // window.location.href = '/login';
    }

    return Promise.reject(customError);
  },
);

export default apiClient;
