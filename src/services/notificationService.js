import apiClient from './api'

export async function getNotifications() {
  const { data } = await apiClient.get('/api/notifications')
  return data
}

export async function getUnreadNotificationCount() {
  const { data } = await apiClient.get('/api/notifications/unread-count')
  return data.count || 0
}

export async function markNotificationRead(id) {
  const { data } = await apiClient.patch(`/api/notifications/${id}/read`)
  return data
}

export async function markAllNotificationsRead() {
  await apiClient.patch('/api/notifications/read-all')
}
