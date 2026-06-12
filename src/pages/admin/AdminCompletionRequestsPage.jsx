import { useEffect, useState } from 'react'
import { CheckCircle2, Clock3, MapPin, UserRound } from 'lucide-react'
import { motion } from 'framer-motion'
import { getCompletionRequests, verifyAssignmentCompletion } from '../../services/workerManagementService'
import { getErrorMessage } from '../../utils/authRedirect'
import { formatDateTime } from '../../utils/requestHelpers'
import { getAssignmentClasses } from '../../utils/workerHelpers'

function AdminCompletionRequestsPage() {
  const [assignments, setAssignments] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [verifyingId, setVerifyingId] = useState(null)

  useEffect(() => {
    const timer = window.setTimeout(async () => {
      try {
        const data = await getCompletionRequests()
        setAssignments(data)
      } catch (requestError) {
        setError(getErrorMessage(requestError))
      } finally {
        setIsLoading(false)
      }
    }, 0)
    return () => window.clearTimeout(timer)
  }, [])

  const handleVerify = async (id) => {
    setVerifyingId(id)
    try {
      await verifyAssignmentCompletion(id)
      setAssignments((current) => current.filter((assignment) => assignment.id !== id))
    } catch (requestError) {
      setError(getErrorMessage(requestError))
    } finally {
      setVerifyingId(null)
    }
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl shadow-black/20 backdrop-blur-2xl lg:p-8">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-emerald-200">Completion verification</p>
        <h1 className="break-safe mt-4 text-3xl font-black tracking-tight sm:text-5xl">Verify finished jobs.</h1>
        <p className="break-safe mt-4 max-w-2xl leading-8 text-white/68">Approve worker-completed jobs before customers can leave reviews.</p>
      </section>

      {error && <div className="rounded-2xl bg-rose-500/10 p-4 font-bold text-rose-100">{error}</div>}

      {isLoading ? (
        <div className="grid gap-5 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => <div className="h-72 animate-pulse rounded-[1.5rem] bg-white/20" key={index} />)}
        </div>
      ) : assignments.length === 0 ? (
        <div className="grid min-h-[320px] place-items-center rounded-[2rem] border border-white/10 bg-white/10 p-8 text-center backdrop-blur-2xl">
          <div>
            <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-200" />
            <h2 className="mt-4 text-3xl font-black">No jobs waiting verification</h2>
            <p className="mt-2 text-white/60">Completed jobs will appear here after workers mark them done.</p>
          </div>
        </div>
      ) : (
        <div className="grid gap-5 xl:grid-cols-2">
          {assignments.map((assignment) => (
            <motion.article animate={{ opacity: 1, y: 0 }} className="rounded-[1.5rem] bg-white p-5 text-slate-950 shadow-2xl shadow-black/10" initial={{ opacity: 0, y: 18 }} key={assignment.id}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-600">Assignment #{assignment.id}</p>
                  <h3 className="break-safe mt-2 text-2xl font-black">{assignment.serviceRequest.category}</h3>
                </div>
                <span className={`rounded-full border px-3 py-1 text-xs font-black ${getAssignmentClasses(assignment.assignmentStatus)}`}>
                  {assignment.assignmentStatus.replaceAll('_', ' ')}
                </span>
              </div>
              <p className="break-safe mt-4 line-clamp-3 leading-7 text-slate-600">{assignment.serviceRequest.description}</p>
              <div className="mt-5 grid gap-3 text-sm font-bold text-slate-500 sm:grid-cols-2">
                <Info icon={UserRound} label="Worker" value={assignment.worker.user.fullName} />
                <Info icon={UserRound} label="Customer" value={assignment.serviceRequest.user.fullName} />
                <Info icon={MapPin} label="Address" value={`${assignment.serviceRequest.address}${assignment.serviceRequest.city ? `, ${assignment.serviceRequest.city}` : ''}`} />
                <Info icon={Clock3} label="Completed" value={formatDateTime(assignment.completedAt)} />
              </div>
              <button className="mt-6 min-h-12 w-full rounded-full bg-slate-950 font-black text-white transition hover:-translate-y-0.5 disabled:opacity-50" disabled={verifyingId === assignment.id} type="button" onClick={() => handleVerify(assignment.id)}>
                {verifyingId === assignment.id ? 'Verifying...' : 'Verify completion'}
              </button>
            </motion.article>
          ))}
        </div>
      )}
    </div>
  )
}

function Info({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl bg-slate-100 p-3">
      <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-slate-400"><Icon className="h-4 w-4 shrink-0" />{label}</p>
      <p className="break-safe mt-2 font-black text-slate-800">{value || '-'}</p>
    </div>
  )
}

export default AdminCompletionRequestsPage
