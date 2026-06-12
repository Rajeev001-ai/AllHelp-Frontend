import { motion } from 'framer-motion'
import { ArrowDownUp, ClipboardList, Eye, RefreshCw, Search } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import AdminTableSkeleton from '../../components/admin/AdminTableSkeleton'
import AssignmentModal from '../../components/admin/AssignmentModal'
import RequestDetailsModal from '../../components/admin/RequestDetailsModal'
import { getAdminRequests, updateAdminRequestStatus } from '../../services/adminService'
import { createAssignment, getWorkers } from '../../services/workerManagementService'
import { requestStatuses, requestUrgencies, sortRequests } from '../../utils/adminHelpers'
import { getErrorMessage } from '../../utils/authRedirect'
import { formatDate, getStatusClasses, serviceCategories } from '../../utils/requestHelpers'

const pageSize = 8

const initialFilters = {
  status: '',
  category: '',
  urgency: '',
  date: '',
}

function AdminRequestsPage() {
  const [requests, setRequests] = useState([])
  const [filters, setFilters] = useState(initialFilters)
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState('date')
  const [sortDirection, setSortDirection] = useState('desc')
  const [page, setPage] = useState(1)
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [assignRequest, setAssignRequest] = useState(null)
  const [workers, setWorkers] = useState([])
  const [selectedWorkerId, setSelectedWorkerId] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)
  const [isAssigning, setIsAssigning] = useState(false)
  const [error, setError] = useState('')

  const loadRequests = async () => {
    setIsLoading(true)
    setError('')

    try {
      const data = await getAdminRequests(filters)
      setRequests(data)
      setPage(1)
    } catch (requestError) {
      setError(getErrorMessage(requestError))
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadRequests()
    }, 0)

    return () => window.clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.status, filters.category, filters.urgency, filters.date])

  const filteredRequests = useMemo(() => {
    const query = search.trim().toLowerCase()
    const searched = query
      ? requests.filter((request) =>
          [request.id, request.user?.fullName, request.category, request.address, request.status]
            .join(' ')
            .toLowerCase()
            .includes(query),
        )
      : requests

    return sortRequests(searched, sortKey, sortDirection)
  }, [requests, search, sortDirection, sortKey])

  const totalPages = Math.max(1, Math.ceil(filteredRequests.length / pageSize))
  const paginatedRequests = filteredRequests.slice((page - 1) * pageSize, page * pageSize)

  const updateFilter = (event) => {
    const { name, value } = event.target
    setFilters((current) => ({ ...current, [name]: value }))
  }

  const toggleSort = (key) => {
    if (sortKey === key) {
      setSortDirection((current) => (current === 'asc' ? 'desc' : 'asc'))
      return
    }

    setSortKey(key)
    setSortDirection('asc')
  }

  const handleStatusChange = async (id, status) => {
    setIsUpdating(true)

    try {
      const updatedRequest = await updateAdminRequestStatus(id, status)
      setRequests((current) => current.map((request) => (request.id === id ? updatedRequest : request)))
      setSelectedRequest(updatedRequest)
    } catch (requestError) {
      setError(getErrorMessage(requestError))
    } finally {
      setIsUpdating(false)
    }
  }

  const openAssignment = async (request) => {
    setAssignRequest(request)
    setSelectedWorkerId('')
    try {
      const data = await getWorkers()
      setWorkers(data)
    } catch (requestError) {
      setError(getErrorMessage(requestError))
    }
  }

  const handleAssign = async () => {
    setIsAssigning(true)
    try {
      const assignment = await createAssignment({ requestId: assignRequest.id, workerId: Number(selectedWorkerId) })
      setRequests((current) => current.map((request) => (request.id === assignRequest.id ? assignment.serviceRequest : request)))
      setAssignRequest(null)
      setSelectedWorkerId('')
    } catch (requestError) {
      setError(getErrorMessage(requestError))
    } finally {
      setIsAssigning(false)
    }
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl shadow-black/20 backdrop-blur-2xl lg:p-8">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-emerald-200">Request management</p>
        <div className="mt-4 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <h1 className="break-safe text-3xl font-black tracking-tight sm:text-5xl">Manage every customer request.</h1>
            <p className="break-safe mt-4 max-w-2xl leading-8 text-white/68">Review service details, understand urgency, and move requests through the right status.</p>
          </div>
          <button className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white/10 px-5 font-black text-white transition hover:bg-white hover:text-slate-950" type="button" onClick={loadRequests}>
            <RefreshCw className="h-5 w-5" />
            Refresh
          </button>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          <QueueButton active={filters.status === 'PENDING'} onClick={() => setFilters((current) => ({ ...current, status: 'PENDING' }))}>Pending queue</QueueButton>
          <QueueButton active={filters.status === 'ASSIGNED'} onClick={() => setFilters((current) => ({ ...current, status: 'ASSIGNED' }))}>Assigned</QueueButton>
          <QueueButton active={filters.status === ''} onClick={() => setFilters((current) => ({ ...current, status: '' }))}>All requests</QueueButton>
        </div>
      </section>

      <section className="rounded-[1.5rem] border border-white/10 bg-white/10 p-4 backdrop-blur-2xl">
        <div className="grid gap-3 lg:grid-cols-[1.2fr_repeat(4,1fr)]">
          <label className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input className="min-h-12 w-full rounded-2xl border border-white/10 bg-white pl-12 pr-4 font-bold text-slate-950 outline-none" onChange={(event) => setSearch(event.target.value)} placeholder="Search request, user, category..." value={search} />
          </label>
          <FilterSelect name="status" onChange={updateFilter} value={filters.status}>
            <option value="">All Status</option>
            {requestStatuses.map((status) => <option key={status} value={status}>{status.replace('_', ' ')}</option>)}
          </FilterSelect>
          <FilterSelect name="category" onChange={updateFilter} value={filters.category}>
            <option value="">All Categories</option>
            {serviceCategories.map((category) => <option key={category} value={category}>{category}</option>)}
          </FilterSelect>
          <FilterSelect name="urgency" onChange={updateFilter} value={filters.urgency}>
            <option value="">All Urgency</option>
            {requestUrgencies.map((urgency) => <option key={urgency} value={urgency}>{urgency}</option>)}
          </FilterSelect>
          <input className="min-h-12 rounded-2xl border border-white/10 bg-white px-4 font-bold text-slate-950 outline-none" name="date" onChange={updateFilter} type="date" value={filters.date} />
        </div>
      </section>

      {error && <div className="rounded-2xl border border-rose-300/30 bg-rose-500/10 p-4 font-bold text-rose-100">{error}</div>}

      {isLoading ? (
        <AdminTableSkeleton />
      ) : filteredRequests.length === 0 ? (
        <EmptyState />
      ) : (
        <section className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-white shadow-2xl shadow-black/10">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1080px] text-left text-sm">
              <thead className="bg-slate-50 text-xs font-black uppercase tracking-[0.14em] text-slate-500">
                <tr>
                  <HeadCell label="Request ID" sortKey="id" onSort={toggleSort} />
                  <HeadCell label="User Name" sortKey="user" onSort={toggleSort} />
                  <th className="px-5 py-4">Location</th>
                  <HeadCell label="Category" sortKey="category" onSort={toggleSort} />
                  <HeadCell label="Urgency" sortKey="urgency" onSort={toggleSort} />
                  <HeadCell label="Date" sortKey="date" onSort={toggleSort} />
                  <HeadCell label="Status" sortKey="status" onSort={toggleSort} />
                  <th className="px-5 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginatedRequests.map((request) => (
                  <motion.tr className="text-slate-700 transition hover:bg-emerald-50/50" key={request.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <td className="px-5 py-4 font-black text-slate-950">#{request.id}</td>
                    <td className="px-5 py-4 font-bold">{request.user?.fullName}</td>
                    <td className="px-5 py-4">
                      <p className="font-bold">{request.city || 'No city'}</p>
                      <p className="mt-1 max-w-52 truncate text-xs font-bold text-slate-500">{request.address}</p>
                    </td>
                    <td className="px-5 py-4 font-bold">{request.category}</td>
                    <td className="px-5 py-4">{request.urgency}</td>
                    <td className="px-5 py-4">{formatDate(request.createdAt)}</td>
                    <td className="px-5 py-4">
                      <span className={`rounded-full border px-3 py-1 text-xs font-black ${getStatusClasses(request.status)}`}>
                        {request.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        <button className="inline-flex min-h-10 items-center gap-2 rounded-full bg-slate-950 px-4 text-xs font-black text-white transition hover:-translate-y-0.5" type="button" onClick={() => setSelectedRequest(request)}>
                          <Eye className="h-4 w-4" />
                          View
                        </button>
                        <Link className="inline-flex min-h-10 items-center rounded-full bg-slate-100 px-4 py-3 text-xs font-black text-slate-700 transition hover:-translate-y-0.5" to={`/requests/${request.id}`}>
                          Details
                        </Link>
                        {request.status === 'PENDING' && (
                          <button className="inline-flex min-h-10 items-center rounded-full bg-emerald-600 px-4 text-xs font-black text-white transition hover:-translate-y-0.5" type="button" onClick={() => openAssignment(request)}>
                            Assign
                          </button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-3 border-t border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-bold text-slate-500">Showing {paginatedRequests.length} of {filteredRequests.length} requests</p>
            <div className="flex gap-2">
              <button className="rounded-full border border-slate-200 px-4 py-2 text-sm font-black text-slate-700 disabled:opacity-40" disabled={page === 1} type="button" onClick={() => setPage((current) => Math.max(1, current - 1))}>Previous</button>
              <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-black text-slate-700">{page} / {totalPages}</span>
              <button className="rounded-full border border-slate-200 px-4 py-2 text-sm font-black text-slate-700 disabled:opacity-40" disabled={page === totalPages} type="button" onClick={() => setPage((current) => Math.min(totalPages, current + 1))}>Next</button>
            </div>
          </div>
        </section>
      )}

      <RequestDetailsModal isUpdating={isUpdating} onClose={() => setSelectedRequest(null)} onStatusChange={handleStatusChange} request={selectedRequest} />
      <AssignmentModal
        isSubmitting={isAssigning}
        onAssign={handleAssign}
        onClose={() => setAssignRequest(null)}
        request={assignRequest}
        selectedWorkerId={selectedWorkerId}
        setSelectedWorkerId={setSelectedWorkerId}
        workers={workers}
      />
    </div>
  )
}

function FilterSelect({ children, name, onChange, value }) {
  return (
    <select className="min-h-12 rounded-2xl border border-white/10 bg-white px-4 font-bold text-slate-950 outline-none" name={name} onChange={onChange} value={value}>
      {children}
    </select>
  )
}

function QueueButton({ active, children, onClick }) {
  return (
    <button className={`rounded-full px-4 py-2 text-sm font-black transition ${active ? 'bg-emerald-300 text-slate-950' : 'bg-white/10 text-white hover:bg-white hover:text-slate-950'}`} type="button" onClick={onClick}>
      {children}
    </button>
  )
}

function HeadCell({ label, onSort, sortKey }) {
  return (
    <th className="px-5 py-4">
      <button className="inline-flex items-center gap-2" type="button" onClick={() => onSort(sortKey)}>
        {label}
        <ArrowDownUp className="h-4 w-4" />
      </button>
    </th>
  )
}

function EmptyState() {
  return (
    <div className="grid min-h-[360px] place-items-center rounded-[2rem] border border-white/10 bg-white/10 p-8 text-center backdrop-blur-2xl">
      <div>
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-white text-emerald-700">
          <ClipboardList className="h-8 w-8" />
        </div>
        <h2 className="mt-6 text-3xl font-black">No matching requests</h2>
        <p className="mx-auto mt-3 max-w-md leading-7 text-white/64">Try changing the search term or filters to see more requests.</p>
      </div>
    </div>
  )
}

export default AdminRequestsPage
