import { ClipboardCheck, Clock3, GitBranch, ListChecks, UserCheck, UsersRound } from 'lucide-react'
import { useEffect, useState } from 'react'
import AdminStatCard from '../../components/admin/AdminStatCard'
import { getAdminStats } from '../../services/adminService'
import { getErrorMessage } from '../../utils/authRedirect'

function AdminDashboardPage() {
  const [stats, setStats] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const timer = window.setTimeout(async () => {
      try {
        const data = await getAdminStats()
        setStats(data)
      } catch (requestError) {
        setError(getErrorMessage(requestError))
      } finally {
        setIsLoading(false)
      }
    }, 0)

    return () => window.clearTimeout(timer)
  }, [])

  const cards = [
    { label: 'Total Users', value: stats?.totalUsers, icon: UsersRound },
    { label: 'Total Workers', value: stats?.totalWorkers, icon: UserCheck },
    { label: 'Total Requests', value: stats?.totalRequests, icon: ListChecks },
    { label: 'Active Assignments', value: stats?.activeAssignments, icon: GitBranch },
    { label: 'Completed Jobs', value: stats?.completedJobs, icon: ClipboardCheck },
    { label: 'Pending Requests', value: stats?.pendingRequests, icon: Clock3 },
  ]

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl shadow-black/20 backdrop-blur-2xl lg:p-8">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-emerald-200">Admin dashboard</p>
        <h1 className="break-safe mt-4 text-3xl font-black tracking-tight sm:text-5xl">Monitor requests, users, and worker supply.</h1>
        <p className="break-safe mt-4 max-w-2xl leading-8 text-white/68">Track service demand and keep customer requests moving through the right operational status.</p>
      </section>

      {error && <div className="rounded-2xl border border-rose-300/30 bg-rose-500/10 p-4 font-bold text-rose-100">{error}</div>}

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
        {cards.map((card) => (
          <AdminStatCard icon={card.icon} key={card.label} label={card.label} loading={isLoading} value={card.value} />
        ))}
      </section>
    </div>
  )
}

export default AdminDashboardPage
