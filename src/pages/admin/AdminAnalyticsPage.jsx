import { BarChart3, CheckCircle2, Clock3, GitBranch, ListChecks, Star, UserCheck, UsersRound } from 'lucide-react'
import { useEffect, useState } from 'react'
import AdminStatCard from '../../components/admin/AdminStatCard'
import { getAdminAnalytics } from '../../services/adminService'
import { getErrorMessage } from '../../utils/authRedirect'

function AdminAnalyticsPage() {
  const [analytics, setAnalytics] = useState(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(async () => {
      try {
        setAnalytics(await getAdminAnalytics())
      } catch (requestError) {
        setError(getErrorMessage(requestError))
      } finally {
        setIsLoading(false)
      }
    }, 0)
    return () => window.clearTimeout(timer)
  }, [])

  const cards = [
    { label: 'Total Users', value: analytics?.totalUsers, icon: UsersRound },
    { label: 'Total Workers', value: analytics?.totalWorkers, icon: UserCheck },
    { label: 'Total Requests', value: analytics?.totalRequests, icon: ListChecks },
    { label: 'Pending', value: analytics?.pendingRequests, icon: Clock3 },
    { label: 'Assigned', value: analytics?.assignedRequests, icon: GitBranch },
    { label: 'In Progress', value: analytics?.inProgressRequests, icon: BarChart3 },
    { label: 'Completed Requests', value: analytics?.completedRequests, icon: CheckCircle2 },
    { label: 'Active Assignments', value: analytics?.activeAssignments, icon: GitBranch },
    { label: 'Completed Jobs', value: analytics?.completedAssignments, icon: CheckCircle2 },
    { label: 'Total Reviews', value: analytics?.totalReviews, icon: Star },
  ]

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl shadow-black/20 backdrop-blur-2xl lg:p-8">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-emerald-200">Analytics</p>
        <h1 className="break-safe mt-4 text-3xl font-black tracking-tight sm:text-5xl">Platform health at a glance.</h1>
        <p className="break-safe mt-4 max-w-2xl leading-8 text-white/68">Track customer demand, worker supply, assignment movement, and review activity.</p>
      </section>
      {error && <div className="rounded-2xl bg-rose-500/10 p-4 font-bold text-rose-100">{error}</div>}
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {cards.map((card) => <AdminStatCard icon={card.icon} key={card.label} label={card.label} loading={isLoading} value={card.value || 0} />)}
      </section>
      <section className="rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl shadow-black/20 backdrop-blur-2xl">
        <h2 className="text-3xl font-black">Request conversion</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-4">
          <Progress label="Pending" total={analytics?.totalRequests} value={analytics?.pendingRequests} />
          <Progress label="Assigned" total={analytics?.totalRequests} value={analytics?.assignedRequests} />
          <Progress label="In Progress" total={analytics?.totalRequests} value={analytics?.inProgressRequests} />
          <Progress label="Completed" total={analytics?.totalRequests} value={analytics?.completedRequests} />
        </div>
      </section>
    </div>
  )
}

function Progress({ label, total = 0, value = 0 }) {
  const percent = total ? Math.round((value / total) * 100) : 0
  return (
    <div className="rounded-2xl bg-white p-4 text-slate-950">
      <div className="flex items-center justify-between gap-3">
        <p className="font-black">{label}</p>
        <p className="text-sm font-black text-slate-500">{percent}%</p>
      </div>
      <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full rounded-full bg-emerald-500" style={{ width: `${percent}%` }} />
      </div>
    </div>
  )
}

export default AdminAnalyticsPage
