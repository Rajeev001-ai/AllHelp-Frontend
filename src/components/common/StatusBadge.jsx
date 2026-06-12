import { getStatusClasses } from '../../utils/requestHelpers'
import { getAssignmentClasses } from '../../utils/workerHelpers'

function StatusBadge({ status, type = 'request' }) {
  const classes = type === 'assignment' ? getAssignmentClasses(status) : getStatusClasses(status)
  return <span className={`rounded-full border px-3 py-1 text-xs font-black ${classes}`}>{String(status || 'PENDING').replaceAll('_', ' ')}</span>
}

export default StatusBadge
