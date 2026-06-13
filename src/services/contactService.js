import apiClient from './api'

export async function submitContactMessage(payload) {
  const { data } = await apiClient.post('/api/contact', payload)
  return data
}

export async function getContactMessages() {
  const { data } = await apiClient.get('/api/admin/contact-messages')
  return data
}

export async function markContactMessageRead(id) {
  const { data } = await apiClient.patch(`/api/admin/contact-messages/${id}/read`)
  return data
}
