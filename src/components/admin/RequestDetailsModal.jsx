import { AnimatePresence, motion } from 'framer-motion'
import { CalendarDays, Clock3, Mail, MapPin, Phone, UserRound, X } from 'lucide-react'
import { requestStatuses } from '../../utils/adminHelpers'
import { formatDate, formatDateTime, getStatusClasses } from '../../utils/requestHelpers'

function RequestDetailsModal({ isUpdating, onClose, onStatusChange, request }) {
  return (
    <AnimatePresence>
      {request && (
        <motion.div
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 grid place-items-center bg-slate-950/70 p-4 backdrop-blur-sm"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
        >
          <motion.div
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="max-h-[90vh] w-full max-w-3xl overflow-auto rounded-[2rem] bg-white p-5 text-slate-950 shadow-2xl sm:p-7"
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-600">Request #{request.id}</p>
                <h2 className="break-safe mt-2 text-2xl font-black sm:text-3xl">{request.category}</h2>
              </div>
              <button className="grid h-11 w-11 place-items-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200" type="button" onClick={onClose}>
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <InfoCard icon={UserRound} label="User" value={request.user?.fullName} />
              <InfoCard icon={Mail} label="Email" value={request.user?.email} />
              <InfoCard icon={Phone} label="Phone" value={request.user?.phone} />
              <InfoCard icon={MapPin} label="Address" value={`${request.address}${request.city ? `, ${request.city}` : ''}`} />
              <InfoCard icon={CalendarDays} label="Preferred Date" value={formatDate(request.preferredDate)} />
              <InfoCard icon={Clock3} label="Preferred Time" value={request.preferredTime || 'Not selected'} />
            </div>

            <div className="mt-5 rounded-3xl bg-slate-50 p-5">
              <p className="text-sm font-black text-slate-500">Description</p>
              <p className="mt-2 leading-8 text-slate-700">{request.description}</p>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 p-5">
                <p className="text-sm font-black text-slate-500">Current Status</p>
                <span className={`mt-3 inline-flex rounded-full border px-3 py-1 text-xs font-black ${getStatusClasses(request.status)}`}>
                  {request.status.replace('_', ' ')}
                </span>
              </div>
              <label className="grid gap-2 rounded-3xl border border-slate-200 p-5 text-sm font-black text-slate-700">
                Update Status
                <select
                  className="min-h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 font-bold outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
                  disabled={isUpdating}
                  value={request.status}
                  onChange={(event) => onStatusChange(request.id, event.target.value)}
                >
                  {requestStatuses.map((status) => (
                    <option key={status} value={status}>{status.replace('_', ' ')}</option>
                  ))}
                </select>
              </label>
            </div>

            <p className="mt-5 text-xs font-black uppercase tracking-[0.16em] text-slate-400">Created {formatDateTime(request.createdAt)}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function InfoCard({ icon: Icon, label, value }) {
  return (
    <div className="flex gap-3 rounded-3xl border border-slate-200 p-4">
      <span className="grid h-11 w-11 flex-none place-items-center rounded-2xl bg-emerald-50 text-emerald-700">
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <p className="text-sm font-black text-slate-500">{label}</p>
        <p className="break-safe mt-1 font-bold text-slate-900">{value || 'Not available'}</p>
      </div>
    </div>
  )
}

export default RequestDetailsModal
