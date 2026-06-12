import { motion } from 'framer-motion'
import { ArrowLeft, CalendarDays, Clock3, MapPin, Star, UserRound } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ActivityHistory from '../components/common/ActivityHistory'
import RequestTimeline from '../components/common/RequestTimeline'
import StatusBadge from '../components/common/StatusBadge'
import { getRequestDetails } from '../services/requestDetailsService'
import { getErrorMessage } from '../utils/authRedirect'
import { formatDate, formatDateTime } from '../utils/requestHelpers'

function RequestDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [details, setDetails] = useState(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(async () => {
      try {
        setDetails(await getRequestDetails(id))
      } catch (requestError) {
        setError(getErrorMessage(requestError))
      } finally {
        setIsLoading(false)
      }
    }, 0)
    return () => window.clearTimeout(timer)
  }, [id])

  if (isLoading) {
    return <div className="min-h-screen bg-[#07111f] p-6 text-white"><div className="mx-auto h-[70vh] max-w-6xl animate-pulse rounded-[2rem] bg-white/10" /></div>
  }

  if (error || !details) {
    return <div className="grid min-h-screen place-items-center bg-[#07111f] p-6 text-center text-white"><div><h1 className="text-3xl font-black">Request not available</h1><p className="mt-3 text-white/60">{error}</p></div></div>
  }

  const { request, assignment, review, activities } = details
  const worker = assignment?.worker

  return (
    <main className="min-h-screen bg-[#07111f] p-4 text-white sm:p-6 lg:p-8">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_14%_12%,rgba(45,212,191,0.18),transparent_28%),radial-gradient(circle_at_84%_8%,rgba(99,102,241,0.18),transparent_30%),linear-gradient(135deg,#07111f_0%,#0d1728_48%,#09231e_100%)]" />
      <motion.div animate={{ opacity: 1, y: 0 }} className="relative z-10 mx-auto max-w-6xl space-y-6" initial={{ opacity: 0, y: 18 }}>
        <button className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-black transition hover:bg-white hover:text-slate-950" type="button" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <section className="rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl shadow-black/20 backdrop-blur-2xl lg:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-emerald-200">Request #{request.id}</p>
              <h1 className="break-safe mt-4 text-3xl font-black tracking-tight sm:text-5xl">{request.category}</h1>
              <p className="break-safe mt-4 max-w-3xl leading-8 text-white/68">{request.description}</p>
            </div>
            <StatusBadge status={request.status} />
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            <InfoCard title="Request information">
              <Info icon={MapPin} label="Address" value={`${request.address}${request.city ? `, ${request.city}` : ''}`} />
              <Info icon={CalendarDays} label="Preferred date" value={formatDate(request.preferredDate)} />
              <Info icon={Clock3} label="Preferred time" value={request.preferredTime || '-'} />
              <Info icon={UserRound} label="Urgency" value={request.urgency} />
            </InfoCard>

            <InfoCard title="Worker information">
              {worker ? (
                <>
                  <Info icon={UserRound} label="Name" value={worker.user.fullName} />
                  <Info icon={Clock3} label="Experience" value={`${worker.experience || 0} years`} />
                  <Info icon={Star} label="Rating" value={`${worker.rating || '0.00'} (${worker.totalReviews || 0} reviews)`} />
                  <Info icon={MapPin} label="Availability" value={worker.availability} />
                </>
              ) : <p className="font-bold text-slate-500">No worker assigned yet.</p>}
            </InfoCard>

            <InfoCard title="Assignment information">
              {assignment ? (
                <>
                  <Info icon={CalendarDays} label="Assigned date" value={formatDateTime(assignment.assignedAt)} />
                  <div className="rounded-2xl bg-slate-100 p-4"><p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">Status</p><div className="mt-2"><StatusBadge status={assignment.assignmentStatus} type="assignment" /></div></div>
                </>
              ) : <p className="font-bold text-slate-500">Assignment will appear after admin assigns a worker.</p>}
            </InfoCard>

            <InfoCard title="Review information">
              {review ? (
                <div>
                  <div className="flex gap-1 text-amber-400">{Array.from({ length: 5 }).map((_, index) => <Star className={`h-5 w-5 ${index < review.rating ? 'fill-amber-400' : 'text-slate-300'}`} key={index} />)}</div>
                  <p className="mt-3 font-bold text-slate-700">{review.comment || 'No comment added.'}</p>
                </div>
              ) : <p className="font-bold text-slate-500">No review submitted yet.</p>}
            </InfoCard>
          </div>
          <div className="space-y-6">
            <RequestTimeline assignment={assignment} request={request} />
            <ActivityHistory activities={activities} />
          </div>
        </div>
      </motion.div>
    </main>
  )
}

function InfoCard({ children, title }) {
  return <section className="rounded-[1.5rem] bg-white p-5 text-slate-950 shadow-2xl shadow-black/10"><h2 className="text-2xl font-black">{title}</h2><div className="mt-5 grid gap-3 sm:grid-cols-2">{children}</div></section>
}

function Info({ icon: Icon, label, value }) {
  return <div className="rounded-2xl bg-slate-100 p-4"><p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-slate-400"><Icon className="h-4 w-4 shrink-0" />{label}</p><p className="break-safe mt-2 font-black text-slate-800">{value || '-'}</p></div>
}

export default RequestDetailsPage
