import { motion } from 'framer-motion'
import { Eye, Mail, MapPin, Phone, Search, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { getAdminUsers } from '../../services/adminService'
import { getErrorMessage } from '../../utils/authRedirect'
import { formatDateTime } from '../../utils/requestHelpers'

function AdminUsersPage() {
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState('')
  const [selectedUser, setSelectedUser] = useState(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(async () => {
      try {
        setUsers(await getAdminUsers())
      } catch (requestError) {
        setError(getErrorMessage(requestError))
      } finally {
        setIsLoading(false)
      }
    }, 0)
    return () => window.clearTimeout(timer)
  }, [])

  const visibleUsers = useMemo(() => {
    const query = search.trim().toLowerCase()
    return query ? users.filter((user) => [user.fullName, user.email, user.phone, user.city, user.address].join(' ').toLowerCase().includes(query)) : users
  }, [search, users])

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl shadow-black/20 backdrop-blur-2xl lg:p-8">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-emerald-200">Users</p>
        <h1 className="break-safe mt-4 text-3xl font-black tracking-tight sm:text-5xl">Customer profiles and request history.</h1>
        <p className="break-safe mt-4 max-w-2xl leading-8 text-white/68">View complete customer contact, location, and request activity details.</p>
      </section>

      <label className="relative block rounded-[1.5rem] border border-white/10 bg-white/10 p-4 backdrop-blur-2xl">
        <Search className="absolute left-8 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
        <input className="min-h-12 w-full rounded-2xl bg-white pl-12 pr-4 font-bold text-slate-950 outline-none" placeholder="Search by name, email, phone, city..." value={search} onChange={(event) => setSearch(event.target.value)} />
      </label>

      {error && <div className="rounded-2xl bg-rose-500/10 p-4 font-bold text-rose-100">{error}</div>}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {isLoading ? Array.from({ length: 6 }).map((_, index) => <div className="h-72 animate-pulse rounded-[1.5rem] bg-white/20" key={index} />) : visibleUsers.map((user) => (
          <motion.article animate={{ opacity: 1, y: 0 }} className="rounded-[1.5rem] bg-white p-5 text-slate-950 shadow-2xl shadow-black/10" initial={{ opacity: 0, y: 16 }} key={user.id}>
            <div className="flex items-start gap-4">
              <img alt="" className="h-16 w-16 rounded-2xl object-cover ring-4 ring-slate-100" src={user.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName)}&background=0f172a&color=ffffff`} />
              <div className="min-w-0">
                <h3 className="truncate text-2xl font-black">{user.fullName}</h3>
                <p className="truncate font-bold text-slate-500">{user.email}</p>
              </div>
            </div>
            <div className="mt-5 grid gap-3 text-sm font-bold text-slate-500">
              <Info icon={Phone} value={user.phone} />
              <Info icon={MapPin} value={[user.address, user.city].filter(Boolean).join(', ') || 'No address added'} />
            </div>
            <div className="mt-5 grid grid-cols-3 gap-2">
              <MiniStat label="Total" value={user.totalRequests} />
              <MiniStat label="Pending" value={user.pendingRequests} />
              <MiniStat label="Completed" value={user.completedRequests} />
            </div>
            <button className="mt-5 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-full bg-slate-950 font-black text-white" type="button" onClick={() => setSelectedUser(user)}>
              <Eye className="h-4 w-4" />View all details
            </button>
          </motion.article>
        ))}
      </div>
      {!isLoading && visibleUsers.length === 0 && <div className="rounded-[2rem] bg-white/10 p-10 text-center font-bold text-white/60">No users found.</div>}
      {selectedUser && <UserDetailsModal user={selectedUser} onClose={() => setSelectedUser(null)} />}
    </div>
  )
}

function Info({ icon: Icon, value }) {
  return <p className="flex items-center gap-2"><Icon className="h-4 w-4 text-emerald-600" />{value || '-'}</p>
}

function MiniStat({ label, value }) {
  return <div className="rounded-2xl bg-slate-100 p-3 text-center"><p className="text-2xl font-black">{value}</p><p className="text-xs font-black uppercase tracking-[0.12em] text-slate-400">{label}</p></div>
}

function UserDetailsModal({ onClose, user }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/75 p-4 backdrop-blur-xl">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] bg-white p-6 text-slate-950 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-4">
            <img alt="" className="h-20 w-20 rounded-3xl object-cover" src={user.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName)}&background=0f172a&color=ffffff`} />
            <div className="min-w-0">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-600">Customer profile</p>
              <h2 className="break-safe mt-2 text-2xl font-black sm:text-3xl">{user.fullName}</h2>
            </div>
          </div>
          <button className="grid h-10 w-10 place-items-center rounded-full bg-slate-100" type="button" onClick={onClose}><X className="h-5 w-5" /></button>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Detail icon={Mail} label="Email" value={user.email} />
          <Detail icon={Phone} label="Phone" value={user.phone} />
          <Detail icon={MapPin} label="City" value={user.city || 'No city'} />
          <Detail icon={MapPin} label="Address" value={user.address || 'No address'} />
          <Detail label="Role" value={user.role} />
          <Detail label="Joined" value={formatDateTime(user.createdAt)} />
          <Detail label="Total Requests" value={user.totalRequests} />
          <Detail label="Pending Requests" value={user.pendingRequests} />
          <Detail label="Completed Requests" value={user.completedRequests} />
        </div>
      </div>
    </div>
  )
}

function Detail({ icon: Icon, label, value }) {
  return <div className="rounded-2xl bg-slate-100 p-4"><p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-slate-400">{Icon && <Icon className="h-4 w-4 shrink-0" />}{label}</p><p className="break-safe mt-2 font-black text-slate-800">{value || '-'}</p></div>
}

export default AdminUsersPage
