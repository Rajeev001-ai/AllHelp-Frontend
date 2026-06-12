import { useEffect, useMemo, useState } from 'react'
import { Eye, Image, Mail, MapPin, Phone, Search, ShieldCheck, Star, X } from 'lucide-react'
import { getWorkerPortfolioByAdmin, getWorkers, updateWorkerAvailability, verifyWorker } from '../../services/workerManagementService'
import { getErrorMessage } from '../../utils/authRedirect'
import { availabilityOptions, getAvailabilityClasses } from '../../utils/workerHelpers'

function AdminWorkersPage() {
  const [workers, setWorkers] = useState([])
  const [filters, setFilters] = useState({ city: '', availability: '', verified: '' })
  const [search, setSearch] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [portfolio, setPortfolio] = useState([])
  const [portfolioWorker, setPortfolioWorker] = useState(null)
  const [selectedWorker, setSelectedWorker] = useState(null)

  const loadWorkers = async () => {
    setIsLoading(true)
    try {
      const data = await getWorkers(filters)
      setWorkers(data)
    } catch (requestError) {
      setError(getErrorMessage(requestError))
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const timer = window.setTimeout(() => void loadWorkers(), 0)
    return () => window.clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.city, filters.availability, filters.verified])

  const visibleWorkers = useMemo(() => {
    const query = search.toLowerCase()
    return workers.filter((worker) => [worker.user.fullName, worker.user.email, worker.city, worker.skills].join(' ').toLowerCase().includes(query))
  }, [search, workers])

  const handleVerify = async (id) => {
    const updated = await verifyWorker(id)
    setWorkers((current) => current.map((worker) => (worker.id === id ? updated : worker)))
  }

  const handleAvailability = async (id, availability) => {
    const updated = await updateWorkerAvailability(id, availability)
    setWorkers((current) => current.map((worker) => (worker.id === id ? updated : worker)))
  }

  const openPortfolio = async (worker) => {
    setPortfolioWorker(worker)
    setPortfolio(await getWorkerPortfolioByAdmin(worker.id))
  }

  return (
    <div className="space-y-6">
      <Header title="Workers" copy="Review worker profiles, verification, city coverage, and availability." />
      <div className="grid gap-3 rounded-[1.5rem] border border-white/10 bg-white/10 p-4 backdrop-blur-2xl lg:grid-cols-[1.2fr_repeat(3,1fr)]">
        <label className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input className="min-h-12 w-full rounded-2xl bg-white pl-12 pr-4 font-bold text-slate-950 outline-none" placeholder="Search workers..." value={search} onChange={(event) => setSearch(event.target.value)} />
        </label>
        <input className="min-h-12 rounded-2xl bg-white px-4 font-bold text-slate-950 outline-none" placeholder="City" value={filters.city} onChange={(event) => setFilters((current) => ({ ...current, city: event.target.value }))} />
        <select className="min-h-12 rounded-2xl bg-white px-4 font-bold text-slate-950 outline-none" value={filters.availability} onChange={(event) => setFilters((current) => ({ ...current, availability: event.target.value }))}>
          <option value="">All availability</option>
          {availabilityOptions.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
        <select className="min-h-12 rounded-2xl bg-white px-4 font-bold text-slate-950 outline-none" value={filters.verified} onChange={(event) => setFilters((current) => ({ ...current, verified: event.target.value }))}>
          <option value="">All verification</option>
          <option value="true">Verified</option>
          <option value="false">Unverified</option>
        </select>
      </div>
      {error && <div className="rounded-2xl bg-rose-500/10 p-4 font-bold text-rose-100">{error}</div>}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {isLoading ? Array.from({ length: 6 }).map((_, index) => <div className="h-64 animate-pulse rounded-[1.5rem] bg-white/20" key={index} />) : visibleWorkers.map((worker) => (
          <article className="rounded-[1.5rem] bg-white p-5 text-slate-950 shadow-2xl shadow-black/10" key={worker.id}>
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <img alt="" className="h-14 w-14 rounded-2xl object-cover ring-4 ring-slate-100" src={worker.user.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(worker.user.fullName)}&background=0f172a&color=ffffff`} />
                <div className="min-w-0">
                <h3 className="truncate text-2xl font-black">{worker.user.fullName}</h3>
                <p className="truncate font-bold text-slate-500">{worker.user.email}</p>
                </div>
              </div>
              {worker.verified && <ShieldCheck className="h-6 w-6 text-emerald-600" />}
            </div>
            <p className="mt-4 line-clamp-2 text-slate-600">{worker.skills || 'Skills not added yet'}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className={`rounded-full border px-3 py-1 text-xs font-black ${getAvailabilityClasses(worker.availability)}`}>{worker.availability}</span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-700">{worker.city || 'No city'}</span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-700">{worker.completedJobs} jobs</span>
            </div>
            <div className="mt-5 grid gap-2">
              {!worker.verified && <button className="min-h-10 rounded-full bg-emerald-600 font-black text-white" type="button" onClick={() => handleVerify(worker.id)}>Verify worker</button>}
              <button className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-slate-100 font-black text-slate-800" type="button" onClick={() => setSelectedWorker(worker)}><Eye className="h-4 w-4" />View details</button>
              <button className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-slate-950 font-black text-white" type="button" onClick={() => openPortfolio(worker)}><Image className="h-4 w-4" />View portfolio</button>
              <select className="min-h-10 rounded-full border border-slate-200 px-4 font-bold" value={worker.availability} onChange={(event) => handleAvailability(worker.id, event.target.value)}>
                {availabilityOptions.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </div>
          </article>
        ))}
      </div>
      {selectedWorker && <WorkerDetailsModal worker={selectedWorker} onClose={() => setSelectedWorker(null)} />}
      {portfolioWorker && <PortfolioModal items={portfolio} worker={portfolioWorker} onClose={() => setPortfolioWorker(null)} />}
    </div>
  )
}

function WorkerDetailsModal({ onClose, worker }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/75 p-4 backdrop-blur-xl">
      <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[2rem] bg-white p-6 text-slate-950 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-4">
            <img alt="" className="h-20 w-20 rounded-3xl object-cover" src={worker.user.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(worker.user.fullName)}&background=0f172a&color=ffffff`} />
            <div className="min-w-0">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-600">Worker profile</p>
              <h2 className="break-safe mt-2 text-2xl font-black sm:text-3xl">{worker.user.fullName}</h2>
            </div>
          </div>
          <button className="grid h-10 w-10 place-items-center rounded-full bg-slate-100" type="button" onClick={onClose}><X className="h-5 w-5" /></button>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Detail icon={Mail} label="Email" value={worker.user.email} />
          <Detail icon={Phone} label="Phone" value={worker.user.phone} />
          <Detail icon={MapPin} label="Worker City" value={worker.city || 'No city'} />
          <Detail icon={MapPin} label="User Address" value={worker.user.address || 'No address'} />
          <Detail label="Skills" value={worker.skills || 'No skills added'} />
          <Detail label="Bio" value={worker.bio || 'No bio added'} />
          <Detail label="Experience" value={`${worker.experience || 0} years`} />
          <Detail label="Availability" value={worker.availability} />
          <Detail label="Verification" value={worker.verified ? 'Verified' : 'Unverified'} />
          <Detail icon={Star} label="Rating" value={`${worker.rating || '0.00'} (${worker.totalReviews || 0} reviews)`} />
          <Detail label="Completed Jobs" value={worker.completedJobs || 0} />
        </div>
      </div>
    </div>
  )
}

function Detail({ icon: Icon, label, value }) {
  return <div className="rounded-2xl bg-slate-100 p-4"><p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-slate-400">{Icon && <Icon className="h-4 w-4 shrink-0" />}{label}</p><p className="break-safe mt-2 whitespace-pre-wrap font-black text-slate-800">{value || '-'}</p></div>
}

function PortfolioModal({ items, onClose, worker }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/75 p-4 backdrop-blur-xl">
      <div className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-[2rem] bg-white p-6 text-slate-950 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-600">Worker portfolio</p>
            <h2 className="break-safe mt-2 text-2xl font-black sm:text-3xl">{worker.user.fullName}</h2>
          </div>
          <button className="grid h-10 w-10 place-items-center rounded-full bg-slate-100" type="button" onClick={onClose}><X className="h-5 w-5" /></button>
        </div>
        {items.length === 0 ? (
          <p className="mt-8 rounded-2xl bg-slate-100 p-8 text-center font-bold text-slate-500">No portfolio images yet.</p>
        ) : (
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {items.map((item) => (
              <article className="overflow-hidden rounded-[1.5rem] bg-slate-100" key={item.id}>
                <img alt={item.title || 'Portfolio'} className="h-52 w-full object-cover" src={item.imageUrl} />
                <div className="p-4">
                  <h3 className="text-xl font-black">{item.title || 'Work sample'}</h3>
                  <p className="mt-2 text-sm font-bold text-slate-500">{item.description || 'No description added.'}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function Header({ title, copy }) {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl shadow-black/20 backdrop-blur-2xl lg:p-8">
      <p className="text-xs font-black uppercase tracking-[0.24em] text-emerald-200">Admin</p>
      <h1 className="break-safe mt-4 text-3xl font-black tracking-tight sm:text-5xl">{title}</h1>
      <p className="break-safe mt-4 max-w-2xl leading-8 text-white/68">{copy}</p>
    </section>
  )
}

export default AdminWorkersPage
