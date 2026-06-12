export function getDashboardPath(role) {
  const destinations = {
    ADMIN: '/admin/dashboard',
    USER: '/user/dashboard',
    WORKER: '/worker/dashboard',
  }

  return destinations[role] || '/'
}

export function getErrorMessage(error) {
  return error?.response?.data?.message || error.message || 'Request failed'
}
