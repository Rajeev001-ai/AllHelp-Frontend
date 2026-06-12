import apiClient from './api'

export async function getWorkers(filters = {}) {
  const params = Object.fromEntries(Object.entries(filters).filter(([, value]) => value !== '' && value !== null && value !== undefined))
  const { data } = await apiClient.get('/api/admin/workers', { params })
  return data
}

export async function verifyWorker(id) {
  const { data } = await apiClient.patch(`/api/admin/workers/${id}/verify`)
  return data
}

export async function updateWorkerAvailability(id, availability) {
  const { data } = await apiClient.patch(`/api/admin/workers/${id}/availability`, { availability })
  return data
}

export async function createAssignment(payload) {
  const { data } = await apiClient.post('/api/admin/assignments', payload)
  return data
}

export async function getAssignments() {
  const { data } = await apiClient.get('/api/admin/assignments')
  return data
}

export async function getAssignment(id) {
  const { data } = await apiClient.get(`/api/admin/assignments/${id}`)
  return data
}

export async function getWorkerPortfolioByAdmin(id) {
  const { data } = await apiClient.get(`/api/admin/workers/${id}/portfolio`)
  return data
}

export async function getPendingRequests() {
  const { data } = await apiClient.get('/api/admin/requests/pending')
  return data
}

export async function getAssignedRequests() {
  const { data } = await apiClient.get('/api/admin/requests/assigned')
  return data
}

export async function getCompletionRequests() {
  const { data } = await apiClient.get('/api/admin/completion-requests')
  return data
}

export async function verifyAssignmentCompletion(id) {
  const { data } = await apiClient.patch(`/api/admin/assignments/${id}/verify-completion`)
  return data
}
