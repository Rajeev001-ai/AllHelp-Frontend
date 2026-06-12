import apiClient from './api'

export async function getUserProfile() {
  const { data } = await apiClient.get('/api/user/profile')
  return data
}

export async function updateUserProfile(payload) {
  const { data } = await apiClient.put('/api/user/profile', payload)
  return data
}

export async function uploadUserProfileImage(file) {
  const formData = new FormData()
  formData.append('image', file)
  const { data } = await apiClient.post('/api/user/profile/image', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
  return data
}
