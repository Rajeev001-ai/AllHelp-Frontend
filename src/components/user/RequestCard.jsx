import { CalendarDays, MapPin, Star, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatDate, formatDateTime, getStatusClasses } from '../../utils/requestHelpers'

function RequestCard({ onDelete, onReview, request, review }) {
  const canDelete = request.status === 'PENDING'
  const canReview = request.status === 'COMPLETED' && !review

  return (
    <article className="group rounded-[1.5rem] border border-white/10 bg-white p-5 text-slate-950 shadow-2xl shadow-black/10 transition hover:-translate-y-1 hover:shadow-emerald-950/20">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-600">{request.urgency} urgency</p>
          <h3 className="break-safe mt-2 text-2xl font-black">{request.category}</h3>
        </div>
        <span className={`rounded-full border px-3 py-1 text-xs font-black ${getStatusClasses(request.status)}`}>
          {request.status.replace('_', ' ')}
        </span>
      </div>

      <p className="mt-4 line-clamp-2 leading-7 text-slate-600">{request.description}</p>

      <div className="mt-5 grid gap-3 text-sm font-bold text-slate-500">
        <div className="flex items-start gap-2">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
          <span className="break-safe min-w-0">{request.address}{request.city ? `, ${request.city}` : ''}</span>
        </div>
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 shrink-0 text-emerald-600" />
          <span>Preferred: {formatDate(request.preferredDate)}</span>
        </div>
        <div className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
          Created {formatDateTime(request.createdAt)}
        </div>
      </div>

      {canDelete && (
        <button
          className="mt-5 inline-flex min-h-10 max-w-full items-center gap-2 rounded-full border border-rose-100 bg-rose-50 px-4 text-sm font-black text-rose-700 transition hover:bg-rose-100"
          type="button"
          onClick={() => onDelete(request.id)}
        >
          <Trash2 className="h-4 w-4" />
          Delete pending request
        </button>
      )}
      <Link className="mt-5 inline-flex min-h-10 max-w-full items-center rounded-full bg-slate-100 px-4 text-sm font-black text-slate-700 transition hover:bg-slate-200" to={`/requests/${request.id}`}>
        View details
      </Link>
      {canReview && (
        <button className="mt-5 inline-flex min-h-10 items-center gap-2 rounded-full bg-slate-950 px-4 text-sm font-black text-white transition hover:-translate-y-0.5" type="button" onClick={() => onReview(request)}>
          <Star className="h-4 w-4" />
          Add review
        </button>
      )}
      {review && (
        <div className="mt-5 rounded-2xl bg-emerald-50 p-4">
          <div className="flex gap-1 text-amber-400">
            {Array.from({ length: 5 }).map((_, index) => <Star className={`h-4 w-4 ${index < review.rating ? 'fill-amber-400' : 'text-slate-300'}`} key={index} />)}
          </div>
          <p className="mt-2 text-sm font-bold text-emerald-900">{review.comment || 'Review submitted.'}</p>
        </div>
      )}
    </article>
  )
}

export default RequestCard
