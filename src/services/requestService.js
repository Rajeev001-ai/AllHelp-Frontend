import apiClient from './api'

export async function createServiceRequest(payload) {
  const { data } = await apiClient.post('/api/user/requests', payload)
  return data
}

export async function getUserRequests() {
  const { data } = await apiClient.get('/api/user/requests')
  return data
}

export async function getUserRequest(id) {
  const { data } = await apiClient.get(`/api/user/requests/${id}`)
  return data
}

export async function deleteUserRequest(id) {
  await apiClient.delete(`/api/user/requests/${id}`)
}
