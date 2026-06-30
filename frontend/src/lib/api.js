/**
 * Central API configuration.
 * The backend is hosted at https://resumebuilder-9t8p.onrender.com
 * Use `API_BASE` for all fetch/axios calls to the backend.
 */
export const API_BASE = import.meta.env.VITE_API_URL || "https://resumebuilder-9t8p.onrender.com";

/**
 * Helper: make an authenticated request to the backend.
 * @param {string} endpoint  - e.g. "/resumes"
 * @param {RequestInit} opts - fetch options
 */
export async function apiFetch(endpoint, opts = {}) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(opts.headers || {}),
    },
    ...opts,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    throw new Error(`API error ${res.status}: ${text}`);
  }

  return res.json();
}
