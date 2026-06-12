import { useCallback, useMemo, useState } from 'react'
import { login as loginRequest, register as registerRequest } from '../services/authService'
import { AUTH_STORAGE_KEY } from '../utils/constants'
import { AuthContext } from './authContextValue'

function getStoredAuth() {
  const storedAuth = localStorage.getItem(AUTH_STORAGE_KEY)
  return storedAuth ? JSON.parse(storedAuth) : null
}

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(getStoredAuth)

  const persistAuth = useCallback((authResponse) => {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authResponse))
    setAuth(authResponse)
  }, [])

  const register = useCallback(
    async (payload) => {
      const response = await registerRequest(payload)
      persistAuth(response)
      return response
    },
    [persistAuth],
  )

  const login = useCallback(
    async (payload) => {
      const response = await loginRequest(payload)
      persistAuth(response)
      return response
    },
    [persistAuth],
  )

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_STORAGE_KEY)
    setAuth(null)
  }, [])

  const value = useMemo(
    () => ({
      auth,
      accessToken: auth?.accessToken || null,
      isAuthenticated: Boolean(auth?.accessToken),
      role: auth?.role || null,
      user: auth
        ? {
            id: auth.id,
            fullName: auth.fullName,
            email: auth.email,
            role: auth.role,
          }
        : null,
      register,
      login,
      logout,
    }),
    [auth, login, logout, register],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
