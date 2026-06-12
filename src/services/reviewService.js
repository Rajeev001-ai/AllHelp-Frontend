import apiClient from './api'

export async function createReview(payload) {
  const { data } = await apiClient.post('/api/user/reviews', payload)
  return data
}

export async function getUserReviews() {
  const { data } = await apiClient.get('/api/user/reviews')
  return data
}
