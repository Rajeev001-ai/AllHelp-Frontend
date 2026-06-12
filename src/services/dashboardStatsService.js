import apiClient from './api'

export async function getUserDashboardStats() {
  const { data } = await apiClient.get('/api/user/dashboard/stats')
  return data
}

export async function getWorkerDashboardStats() {
  const { data } = await apiClient.get('/api/worker/dashboard/stats')
  return data
}
