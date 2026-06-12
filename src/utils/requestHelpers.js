export const serviceCategories = [
  'Electrician',
  'Plumber',
  'Painter',
  'Cleaner',
  'Carpenter',
  'AC Repair',
  'Appliance Repair',
  'General Help',
]

export const urgencyOptions = [
  { value: 'LOW', label: 'Low' },
  { value: 'MEDIUM', label: 'Medium' },
  { value: 'HIGH', label: 'High' },
]

export function formatDate(value) {
  if (!value) {
    return 'Not selected'
  }

  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value))
}

export function formatDateTime(value) {
  if (!value) {
    return 'Not available'
  }

  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value))
}

export function getStatusClasses(status) {
  const classes = {
    PENDING: 'bg-amber-100 text-amber-800 border-amber-200',
    ASSIGNED: 'bg-sky-100 text-sky-800 border-sky-200',
    IN_PROGRESS: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    COMPLETED: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    CANCELLED: 'bg-rose-100 text-rose-800 border-rose-200',
  }

  return classes[status] || classes.PENDING
}
