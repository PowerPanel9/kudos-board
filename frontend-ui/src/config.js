// Central API base URL. On Render, set VITE_API_BASE_URL in the static-site
// environment settings (e.g. https://<your-backend>.onrender.com/api).
// Falls back to the local backend for development.
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'
