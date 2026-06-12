import apiClient from './api'

export async function getWorkerJobs() {
  const { data } = await apiClient.get('/api/worker/jobs')
  return data
}

export async function getCompletedWorkerJobs() {
  const { data } = await apiClient.get('/api/worker/jobs/completed')
  return data
}

export async function updateWorkerJobAction(id, action) {
  const { data } = await apiClient.patch(`/api/worker/assignments/${id}/${action}`)
  return data
}

export async function getWorkerProfile() {
  const { data } = await apiClient.get('/api/worker/profile')
  return data
}

export async function updateWorkerProfile(payload) {
  const { data } = await apiClient.put('/api/worker/profile', payload)
  return data
}

export async function uploadWorkerProfileImage(file) {
  const formData = new FormData()
  formData.append('image', file)
  const { data } = await apiClient.post('/api/worker/profile/image', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
  return data
}

export async function getWorkerPortfolio() {
  const { data } = await apiClient.get('/api/worker/portfolio')
  return data
}

export async function addWorkerPortfolio({ image, title, description }) {
  const formData = new FormData()
  formData.append('image', image)
  formData.append('title', title || '')
  formData.append('description', description || '')
  const { data } = await apiClient.post('/api/worker/portfolio', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
  return data
}

export async function deleteWorkerPortfolio(id) {
  await apiClient.delete(`/api/worker/portfolio/${id}`)
}

export async function getWorkerReviews() {
  const { data } = await apiClient.get('/api/worker/reviews')
  return data
}
