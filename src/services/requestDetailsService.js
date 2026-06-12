import apiClient from './api'

export async function getRequestDetails(id) {
  const { data } = await apiClient.get(`/api/requests/${id}/details`)
  return data
}
