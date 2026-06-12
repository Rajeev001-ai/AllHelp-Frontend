export const requestStatuses = ['PENDING', 'ASSIGNED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']

export const requestUrgencies = ['LOW', 'MEDIUM', 'HIGH']

export function formatNumber(value) {
  return Number(value || 0).toLocaleString()
}

export function sortRequests(requests, sortKey, sortDirection) {
  return [...requests].sort((first, second) => {
    const firstValue = getSortValue(first, sortKey)
    const secondValue = getSortValue(second, sortKey)

    if (firstValue < secondValue) {
      return sortDirection === 'asc' ? -1 : 1
    }
    if (firstValue > secondValue) {
      return sortDirection === 'asc' ? 1 : -1
    }
    return 0
  })
}

function getSortValue(request, sortKey) {
  const values = {
    id: request.id,
    user: request.user?.fullName || '',
    category: request.category || '',
    urgency: request.urgency || '',
    date: request.createdAt || '',
    status: request.status || '',
  }

  return values[sortKey] || ''
}
