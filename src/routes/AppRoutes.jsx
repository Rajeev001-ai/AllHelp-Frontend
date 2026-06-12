import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import PremiumLanding from '../components/landing/PremiumLanding'
import AuthLayout from '../layouts/AuthLayout'
import AdminDashboardLayout from '../layouts/admin/AdminDashboardLayout'
import PublicLayout from '../layouts/PublicLayout'
import UserDashboardLayout from '../layouts/user/UserDashboardLayout'
import WorkerDashboardLayout from '../layouts/worker/WorkerDashboardLayout'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import RequestDetailsPage from '../pages/RequestDetailsPage'
import AdminAnalyticsPage from '../pages/admin/AdminAnalyticsPage'
import AdminDashboardPage from '../pages/admin/AdminDashboardPage'
import AdminAssignmentsPage from '../pages/admin/AdminAssignmentsPage'
import AdminCompletionRequestsPage from '../pages/admin/AdminCompletionRequestsPage'
import AdminRequestsPage from '../pages/admin/AdminRequestsPage'
import AdminUsersPage from '../pages/admin/AdminUsersPage'
import AdminWorkersPage from '../pages/admin/AdminWorkersPage'
import CreateRequestPage from '../pages/user/CreateRequestPage'
import MyRequestsPage from '../pages/user/MyRequestsPage'
import UserDashboardHome from '../pages/user/UserDashboardHome'
import UserProfilePage from '../pages/user/UserProfilePage'
import WorkerDashboardPage from '../pages/worker/WorkerDashboardPage'
import WorkerEarningsPage from '../pages/worker/WorkerEarningsPage'
import WorkerJobsPage from '../pages/worker/WorkerJobsPage'
import WorkerProfilePage from '../pages/worker/WorkerProfilePage'
import ProtectedRoute from './ProtectedRoute'

function HomeRoute() {
  const navigate = useNavigate()
  return <PremiumLanding onLoginClick={() => navigate('/login')} onRegisterClick={() => navigate('/register')} />
}

function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route element={<HomeRoute />} path="/" />
      </Route>

      <Route element={<AuthLayout />}>
        <Route element={<Navigate replace to="/login" />} path="/auth" />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<RegisterPage />} path="/register" />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
        <Route element={<AdminDashboardLayout />}>
          <Route element={<AdminDashboardPage />} path="/admin/dashboard" />
          <Route element={<AdminRequestsPage />} path="/admin/requests" />
          <Route element={<AdminAssignmentsPage />} path="/admin/assignments" />
          <Route element={<AdminCompletionRequestsPage />} path="/admin/completions" />
          <Route element={<AdminWorkersPage />} path="/admin/workers" />
          <Route element={<AdminUsersPage />} path="/admin/users" />
          <Route element={<AdminAnalyticsPage />} path="/admin/analytics" />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={['ADMIN', 'USER', 'WORKER']} />}>
        <Route element={<RequestDetailsPage />} path="/requests/:id" />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={['USER']} />}>
        <Route element={<UserDashboardLayout />}>
          <Route element={<UserDashboardHome />} path="/user/dashboard" />
          <Route element={<CreateRequestPage />} path="/user/requests/create" />
          <Route element={<MyRequestsPage />} path="/user/requests" />
          <Route element={<MyRequestsPage completedOnly />} path="/user/completed" />
          <Route element={<UserProfilePage />} path="/user/profile" />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={['WORKER']} />}>
        <Route element={<WorkerDashboardLayout />}>
          <Route element={<WorkerDashboardPage />} path="/worker/dashboard" />
          <Route element={<WorkerJobsPage />} path="/worker/jobs" />
          <Route element={<WorkerJobsPage completedOnly />} path="/worker/completed" />
          <Route element={<WorkerEarningsPage />} path="/worker/earnings" />
          <Route element={<WorkerProfilePage />} path="/worker/profile" />
        </Route>
      </Route>

      <Route element={<Navigate replace to="/" />} path="*" />
    </Routes>
  )
}

export default AppRoutes
