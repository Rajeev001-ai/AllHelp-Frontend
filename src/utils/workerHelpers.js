export const availabilityOptions = ['AVAILABLE', 'BUSY', 'OFFLINE']

export const assignmentStatuses = ['ASSIGNED', 'ACCEPTED', 'REJECTED', 'IN_PROGRESS', 'COMPLETED_PENDING_VERIFICATION', 'COMPLETED']

export function getAvailabilityClasses(availability) {
  const classes = {
    AVAILABLE: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    BUSY: 'bg-amber-100 text-amber-800 border-amber-200',
    OFFLINE: 'bg-slate-100 text-slate-700 border-slate-200',
  }
  return classes[availability] || classes.OFFLINE
}

export function getAssignmentClasses(status) {
  const classes = {
    ASSIGNED: 'bg-sky-100 text-sky-800 border-sky-200',
    ACCEPTED: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    REJECTED: 'bg-rose-100 text-rose-800 border-rose-200',
    IN_PROGRESS: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    COMPLETED_PENDING_VERIFICATION: 'bg-amber-100 text-amber-800 border-amber-200',
    COMPLETED: 'bg-teal-100 text-teal-800 border-teal-200',
  }
  return classes[status] || classes.ASSIGNED
}
