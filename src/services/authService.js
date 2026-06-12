import apiClient from './api'

export async function register(payload) {
  const { data } = await apiClient.post('/api/auth/register', payload)
  return data
}

export async function login(payload) {
  const { data } = await apiClient.post('/api/auth/login', payload)
  return data
}
