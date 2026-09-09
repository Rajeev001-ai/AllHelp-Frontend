
import axios from 'axios'
import { API_BASE_URL } from '../config/api'
import { AUTH_STORAGE_KEY } from '../utils/constants'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// ===============================
// REQUEST INTERCEPTOR
// ===============================
api.interceptors.request.use(
  (config) => {

    // Login and Register APIs are public.
    // JWT should NOT be sent with these requests.
    const isAuthRequest =
      config.url?.includes('/api/auth/login') ||
      config.url?.includes('/api/auth/register')

    if (!isAuthRequest) {

      const storedAuth = localStorage.getItem(AUTH_STORAGE_KEY)

      if (storedAuth) {
        try {
          const auth = JSON.parse(storedAuth)

          if (auth?.accessToken) {
            config.headers.Authorization = `Bearer ${auth.accessToken}`
          }
        } catch (error) {
          console.error('Invalid authentication data in localStorage:', error)

          // Remove corrupted authentication data
          localStorage.removeItem(AUTH_STORAGE_KEY)
        }
      }
    }

    return config
  },
  (error) => Promise.reject(error),
)


// ===============================
// RESPONSE INTERCEPTOR
// ===============================
api.interceptors.response.use(
  (response) => response,

  (error) => {

    // Network error
    if (!error.response) {
      error.userMessage =
        'Network error. Please check your internet connection or try again later.'

      console.error('API Network Error:', error.message)

      return Promise.reject(error)
    }

    const { status } = error.response


    // ===============================
    // 401 - Unauthorized
    // ===============================
    if (status === 401) {

      // JWT expired / invalid
      // Remove stored authentication
      localStorage.removeItem(AUTH_STORAGE_KEY)

      error.userMessage =
        'Your session has expired. Please login again.'
    }


    // ===============================
    // 403 - Forbidden
    // ===============================
    else if (status === 403) {

      // Do NOT remove token here.
      // 403 usually means the user is authenticated
      // but does not have permission.

      error.userMessage =
        'You do not have permission to perform this action.'
    }


    // ===============================
    // 500+ - Server Error
    // ===============================
    else if (status >= 500) {

      error.userMessage =
        'Server error. Please try again later.'
    }

    return Promise.reject(error)
  },
)

export default api
