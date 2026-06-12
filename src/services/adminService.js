import apiClient from './api'

export async function getAdminStats() {
  const { data } = await apiClient.get('/api/admin/dashboard/stats')
  return data
}

export async function getAdminUsers() {
  const { data } = await apiClient.get('/api/admin/users')
  return data
}

export async function getAdminAnalytics() {
  const { data } = await apiClient.get('/api/admin/analytics')
  return data
}

export async function getAdminRequests(filters = {}) {
  const params = Object.fromEntries(
    Object.entries(filters).filter(([, value]) => value !== undefined && value !== null && value !== ''),
  )
  const { data } = await apiClient.get('/api/admin/requests', { params })
  return data
}

export async function getAdminRequest(id) {
  const { data } = await apiClient.get(`/api/admin/requests/${id}`)
  return data
}

export async function updateAdminRequestStatus(id, status) {
  const { data } = await apiClient.patch(`/api/admin/requests/${id}/status`, { status })
  return data
}
