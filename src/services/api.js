import axios from 'axios'
import { API_BASE_URL } from '../config/api'
import { AUTH_STORAGE_KEY } from '../utils/constants'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    const storedAuth = localStorage.getItem(AUTH_STORAGE_KEY)

    if (storedAuth) {
      const auth = JSON.parse(storedAuth)
      if (auth?.accessToken) {
        config.headers.Authorization = `Bearer ${auth.accessToken}`
      }
    }

    return config
  },
  (error) => Promise.reject(error),
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      error.userMessage = 'Network error. Please check your internet connection or try again later.'
      console.error('API Network Error:', error.message)
      return Promise.reject(error)
    }

    const { status } = error.response

    if (status === 401) {
      error.userMessage = 'Your session has expired. Please login again.'
    } else if (status === 403) {
      error.userMessage = 'You do not have permission to perform this action.'
    } else if (status >= 500) {
      error.userMessage = 'Server error. Please try again later.'
    }

    return Promise.reject(error)
  },
)

export default api
