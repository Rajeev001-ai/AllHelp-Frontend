import { AnimatePresence, motion } from 'framer-motion'
import { BriefcaseBusiness, CheckCircle2, MapPin, Search, Star, Timer, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { availabilityOptions, getAvailabilityClasses } from '../../utils/workerHelpers'

function AssignmentModal({ isSubmitting, onAssign, onClose, request, selectedWorkerId, setSelectedWorkerId, workers }) {
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState({ city: '', availability: '', skill: '' })

  const filteredWorkers = useMemo(() => {
    const query = search.trim().toLowerCase()
    return workers.filter((worker) => {
      const profileText = [worker.user?.fullName, worker.user?.email, worker.city, worker.skills].join(' ').toLowerCase()
      const matchesSearch = !query || profileText.includes(query)
      const matchesCity = !filters.city || worker.city?.toLowerCase().includes(filters.city.toLowerCase())
      const matchesAvailability = !filters.availability || worker.availability === filters.availability
      const matchesSkill = !filters.skill || worker.skills?.toLowerCase().includes(filters.skill.toLowerCase())
      return matchesSearch && matchesCity && matchesAvailability && matchesSkill
    })
  }, [filters, search, workers])

  if (!request) {
    return null
  }

  const selectedWorker = workers.find((worker) => String(worker.id) === String(selectedWorkerId))
  const selectedWorkerAssignable = selectedWorker?.availability === 'AVAILABLE'

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/75 p-3 backdrop-blur-xl sm:p-5">
      <motion.div
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="max-h-[92vh] w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/20 bg-white/12 text-white shadow-2xl shadow-black/40 backdrop-blur-2xl"
        initial={{ opacity: 0, scale: 0.97, y: 18 }}
        transition={{ duration: 0.25 }}
      >
        <div className="flex items-start justify-between gap-4 border-b border-white/10 p-5 sm:p-6">
          <div className="min-w-0">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-200">Assign worker</p>
            <h2 className="break-safe mt-2 text-2xl font-black tracking-tight sm:text-4xl">{request.category}</h2>
            <p className="break-safe mt-2 text-sm font-bold text-white/60">
              Request #{request.id} by {request.user?.fullName} in {request.city || 'city not added'}
            </p>
          </div>
          <button className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/10 transition hover:bg-white hover:text-slate-950" type="button" onClick={onClose}>
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="grid max-h-[calc(92vh-98px)] gap-5 overflow-y-auto p-5 lg:grid-cols-[1fr_300px] lg:p-6">
          <div className="space-y-4">
            <div className="grid gap-3 rounded-[1.5rem] border border-white/10 bg-white/10 p-4 sm:grid-cols-2 xl:grid-cols-4">
              <label className="relative sm:col-span-2 xl:col-span-1">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input className="min-h-12 w-full rounded-2xl bg-white pl-12 pr-4 font-bold text-slate-950 outline-none" placeholder="Search workers" value={search} onChange={(event) => setSearch(event.target.value)} />
              </label>
              <input className="min-h-12 rounded-2xl bg-white px-4 font-bold text-slate-950 outline-none" placeholder="Filter city" value={filters.city} onChange={(event) => setFilters((current) => ({ ...current, city: event.target.value }))} />
              <input className="min-h-12 rounded-2xl bg-white px-4 font-bold text-slate-950 outline-none" placeholder="Filter skill" value={filters.skill} onChange={(event) => setFilters((current) => ({ ...current, skill: event.target.value }))} />
              <select className="min-h-12 rounded-2xl bg-white px-4 font-bold text-slate-950 outline-none" value={filters.availability} onChange={(event) => setFilters((current) => ({ ...current, availability: event.target.value }))}>
                <option value="">All availability</option>
                {availabilityOptions.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <AnimatePresence mode="popLayout">
                {filteredWorkers.map((worker) => {
                  const isSelected = String(selectedWorkerId) === String(worker.id)
                  return (
                    <motion.button
                      animate={{ opacity: 1, y: 0 }}
                      className={`group rounded-[1.5rem] border p-4 text-left shadow-2xl transition hover:-translate-y-1 ${isSelected ? 'border-emerald-300 bg-emerald-300/18 shadow-emerald-950/30' : 'border-white/10 bg-white text-slate-950 shadow-black/10'}`}
                      exit={{ opacity: 0, y: -8 }}
                      initial={{ opacity: 0, y: 10 }}
                      key={worker.id}
                      layout
                      type="button"
                      onClick={() => setSelectedWorkerId(worker.id)}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className={`truncate text-xl font-black ${isSelected ? 'text-white' : 'text-slate-950'}`}>{worker.user.fullName}</h3>
                          <p className={`mt-1 truncate text-sm font-bold ${isSelected ? 'text-white/65' : 'text-slate-500'}`}>{worker.user.email}</p>
                        </div>
                        {isSelected && <CheckCircle2 className="h-6 w-6 text-emerald-200" />}
                      </div>
                      <p className={`mt-4 line-clamp-2 text-sm leading-6 ${isSelected ? 'text-white/72' : 'text-slate-600'}`}>{worker.skills || 'Skills not added yet'}</p>
                      <div className="mt-4 grid grid-cols-2 gap-2 text-xs font-black">
                        <Meta icon={Star} label={`${worker.rating || 0} rating`} selected={isSelected} />
                        <Meta icon={Timer} label={`${worker.experience || 0} yrs exp`} selected={isSelected} />
                        <Meta icon={BriefcaseBusiness} label={`${worker.completedJobs || 0} jobs`} selected={isSelected} />
                        <Meta icon={MapPin} label={worker.city || 'No city'} selected={isSelected} />
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-black ${getAvailabilityClasses(worker.availability)}`}>{worker.availability}</span>
                        <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-black ${worker.verified ? 'border-emerald-200 bg-emerald-100 text-emerald-800' : 'border-amber-200 bg-amber-100 text-amber-800'}`}>{worker.verified ? 'VERIFIED' : 'UNVERIFIED'}</span>
                      </div>
                    </motion.button>
                  )
                })}
              </AnimatePresence>
            </div>

            {filteredWorkers.length === 0 && (
              <div className="grid min-h-52 place-items-center rounded-[1.5rem] border border-white/10 bg-white/10 text-center">
                <div>
                  <h3 className="text-2xl font-black">No workers match</h3>
                  <p className="mt-2 text-white/60">Try changing city, skill, availability, or search.</p>
                </div>
              </div>
            )}
          </div>

          <aside className="h-fit rounded-[1.5rem] border border-white/10 bg-white p-5 text-slate-950 shadow-2xl shadow-black/20">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-600">Request summary</p>
            <h3 className="mt-3 text-2xl font-black">{request.category}</h3>
            <p className="mt-3 line-clamp-4 text-sm leading-6 text-slate-600">{request.description}</p>
            <div className="mt-5 space-y-3 text-sm font-bold text-slate-500">
              <p>{request.address}</p>
              <p>{request.city || 'No city'} · {request.urgency}</p>
            </div>
            <div className="mt-5 rounded-2xl bg-slate-100 p-4">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">Selected</p>
              <p className="mt-2 text-lg font-black">{selectedWorker ? selectedWorker.user.fullName : 'No worker selected'}</p>
              {selectedWorker && <p className="mt-1 text-sm font-bold text-slate-500">{selectedWorker.city || 'No city'} · {selectedWorker.availability}</p>}
              {selectedWorker && !selectedWorkerAssignable && <p className="mt-2 text-sm font-black text-amber-700">Set this worker to AVAILABLE before assigning.</p>}
            </div>
            <button className="mt-5 min-h-12 w-full rounded-full bg-slate-950 font-black text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50" disabled={!selectedWorkerId || !selectedWorkerAssignable || isSubmitting} type="button" onClick={onAssign}>
              {isSubmitting ? 'Assigning...' : 'Assign selected worker'}
            </button>
          </aside>
        </div>
      </motion.div>
    </div>
  )
}

function Meta({ icon: Icon, label, selected }) {
  return (
    <span className={`inline-flex min-w-0 items-center gap-1 rounded-full px-2.5 py-1.5 ${selected ? 'bg-white/12 text-white' : 'bg-slate-100 text-slate-600'}`}>
      <Icon className="h-3.5 w-3.5 shrink-0" />
      <span className="truncate">{label}</span>
    </span>
  )
}

export default AssignmentModal
