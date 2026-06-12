const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

if (!API_BASE_URL) {
  console.warn(
    'Missing VITE_API_BASE_URL. Set it in your Vite environment, for example VITE_API_BASE_URL=https://your-backend.onrender.com',
  )
}

export { API_BASE_URL }
