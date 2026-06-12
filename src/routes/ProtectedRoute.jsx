import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

function ProtectedRoute({ allowedRoles }) {
  const { isAuthenticated, role } = useAuth()

  if (!isAuthenticated) {
    return <Navigate replace to="/login" />
  }

  if (allowedRoles?.length && !allowedRoles.includes(role)) {
    return <Navigate replace to="/" />
  }

  return <Outlet />
}

export default ProtectedRoute
