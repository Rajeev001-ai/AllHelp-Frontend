import { CalendarDays, CheckCircle2, Circle, MapPin, UserRound } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatDate, getStatusClasses } from '../../utils/requestHelpers'
import { getAssignmentClasses } from '../../utils/workerHelpers'

function WorkerJobCard({ job, onAction }) {
  const request = job.serviceRequest
  const status = job.assignmentStatus

  return (
    <article className="rounded-[1.5rem] bg-white p-5 text-slate-950 shadow-2xl shadow-black/10">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-600">Job #{job.id}</p>
          <h3 className="break-safe mt-2 text-2xl font-black">{request.category}</h3>
        </div>
        <span className={`rounded-full border px-3 py-1 text-xs font-black ${getAssignmentClasses(status)}`}>{status.replace('_', ' ')}</span>
      </div>

      <p className="break-safe mt-4 leading-7 text-slate-600">{request.description}</p>

      <div className="mt-5 grid gap-3 text-sm font-bold text-slate-500">
        <InfoRow icon={UserRound}>
          Customer: {request.user?.fullName || 'Customer'}{request.user?.phone ? ` · ${request.user.phone}` : ''}
        </InfoRow>
        <InfoRow icon={MapPin}>
          {request.address}{request.city ? `, ${request.city}` : ''}
        </InfoRow>
        <InfoRow icon={CalendarDays}>Preferred: {formatDate(request.preferredDate)}</InfoRow>
        <span className={`w-fit rounded-full border px-3 py-1 text-xs font-black ${getStatusClasses(request.status)}`}>Request {request.status.replace('_', ' ')}</span>
      </div>

      <LifecycleTimeline status={status} />

      <div className="mt-5 flex flex-wrap gap-2">
        <Link className="min-h-10 rounded-full bg-slate-100 px-4 py-2 text-sm font-black text-slate-700" to={`/requests/${request.id}`}>View details</Link>
        {status === 'ASSIGNED' && (
          <>
            <Action onClick={() => onAction(job.id, 'accept')}>Accept</Action>
            <Action danger onClick={() => onAction(job.id, 'reject')}>Reject</Action>
          </>
        )}
        {status === 'ACCEPTED' && <Action onClick={() => onAction(job.id, 'start')}>Start Work</Action>}
        {status === 'IN_PROGRESS' && <Action onClick={() => onAction(job.id, 'complete')}>Complete Work</Action>}
        {status === 'COMPLETED_PENDING_VERIFICATION' && <span className="rounded-full bg-amber-50 px-4 py-2 text-sm font-black text-amber-700">Waiting for admin verification</span>}
      </div>
    </article>
  )
}

function InfoRow({ children, icon: Icon }) {
  return (
    <div className="break-safe flex items-start gap-2">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
      <span className="min-w-0">{children}</span>
    </div>
  )
}

const lifecycle = ['ASSIGNED', 'ACCEPTED', 'IN_PROGRESS', 'COMPLETED_PENDING_VERIFICATION', 'COMPLETED']

function LifecycleTimeline({ status }) {
  const activeIndex = lifecycle.indexOf(status)

  return (
    <div className="mt-5 rounded-2xl bg-slate-100 p-4">
      <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">Status timeline</p>
      <div className="mt-3 grid gap-2">
        {lifecycle.map((item, index) => {
          const isDone = activeIndex >= index
          return (
            <div className="flex items-center gap-2 text-xs font-black" key={item}>
              {isDone ? <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" /> : <Circle className="h-4 w-4 shrink-0 text-slate-300" />}
              <span className={isDone ? 'break-safe text-slate-900' : 'break-safe text-slate-400'}>{item.replaceAll('_', ' ')}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function Action({ children, danger, onClick }) {
  return <button className={`min-h-10 rounded-full px-4 text-sm font-black text-white ${danger ? 'bg-rose-600' : 'bg-emerald-600'}`} type="button" onClick={onClick}>{children}</button>
}

export default WorkerJobCard
