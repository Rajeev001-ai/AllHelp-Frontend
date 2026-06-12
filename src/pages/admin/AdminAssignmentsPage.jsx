import { useEffect, useState } from 'react'
import { getAssignments } from '../../services/workerManagementService'
import { getErrorMessage } from '../../utils/authRedirect'
import { formatDateTime, getStatusClasses } from '../../utils/requestHelpers'
import { getAssignmentClasses } from '../../utils/workerHelpers'

function AdminAssignmentsPage() {
  const [assignments, setAssignments] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(async () => {
      try {
        const data = await getAssignments()
        setAssignments(data)
      } catch (requestError) {
        setError(getErrorMessage(requestError))
      } finally {
        setIsLoading(false)
      }
    }, 0)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl shadow-black/20 backdrop-blur-2xl lg:p-8">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-emerald-200">Assignments</p>
        <h1 className="break-safe mt-4 text-3xl font-black tracking-tight sm:text-5xl">Track worker assignments.</h1>
        <p className="break-safe mt-4 max-w-2xl leading-8 text-white/68">See which worker is handling each customer request and its current assignment status.</p>
      </section>
      {error && <div className="rounded-2xl bg-rose-500/10 p-4 font-bold text-rose-100">{error}</div>}
      {isLoading ? (
        <div className="h-80 animate-pulse rounded-[1.5rem] bg-white/20" />
      ) : assignments.length === 0 ? (
        <div className="grid min-h-[320px] place-items-center rounded-[2rem] border border-white/10 bg-white/10 text-center backdrop-blur-2xl">
          <div>
            <h2 className="text-3xl font-black">No assignments yet</h2>
            <p className="mt-3 text-white/64">Assign a worker from the Requests page.</p>
          </div>
        </div>
      ) : (
        <div className="overflow-hidden rounded-[1.5rem] bg-white shadow-2xl shadow-black/10">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[920px] text-left text-sm">
              <thead className="bg-slate-50 text-xs font-black uppercase tracking-[0.14em] text-slate-500">
                <tr>
                  <th className="px-5 py-4">Request</th>
                  <th className="px-5 py-4">Worker</th>
                  <th className="px-5 py-4">Request Status</th>
                  <th className="px-5 py-4">Assignment Status</th>
                  <th className="px-5 py-4">Timeline</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {assignments.map((assignment) => (
                  <tr className="text-slate-700" key={assignment.id}>
                    <td className="px-5 py-4 font-black text-slate-950">#{assignment.serviceRequest.id} {assignment.serviceRequest.category}</td>
                    <td className="px-5 py-4">
                      <p className="font-black text-slate-950">{assignment.worker.user.fullName}</p>
                      <p className="mt-1 text-xs font-bold text-slate-500">{assignment.worker.city || 'No city'} · {assignment.worker.completedJobs || 0} jobs</p>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`rounded-full border px-3 py-1 text-xs font-black ${getStatusClasses(assignment.serviceRequest.status)}`}>{assignment.serviceRequest.status.replace('_', ' ')}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`rounded-full border px-3 py-1 text-xs font-black ${getAssignmentClasses(assignment.assignmentStatus)}`}>{assignment.assignmentStatus.replace('_', ' ')}</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="space-y-1 text-xs font-bold text-slate-500">
                        <p><span className="text-slate-950">Assigned:</span> {formatDateTime(assignment.assignedAt)}</p>
                        {assignment.acceptedAt && <p><span className="text-slate-950">Accepted:</span> {formatDateTime(assignment.acceptedAt)}</p>}
                        {assignment.completedAt && <p><span className="text-slate-950">Completed:</span> {formatDateTime(assignment.completedAt)}</p>}
                        {assignment.notes && <p className="max-w-xs text-rose-600">{assignment.notes}</p>}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminAssignmentsPage
