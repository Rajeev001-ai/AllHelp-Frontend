import { BriefcaseBusiness, CheckCircle2, Star, Wifi } from 'lucide-react'
import { useEffect, useState } from 'react'
import AdminStatCard from '../../components/admin/AdminStatCard'
import { getWorkerDashboardStats } from '../../services/dashboardStatsService'

function WorkerDashboardPage() {
  const [stats, setStats] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const timer = window.setTimeout(async () => {
      setStats(await getWorkerDashboardStats())
      setIsLoading(false)
    }, 0)
    return () => window.clearTimeout(timer)
  }, [])
  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl shadow-black/20 backdrop-blur-2xl lg:p-8">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-emerald-200">Worker dashboard</p>
        <h1 className="break-safe mt-4 text-3xl font-black tracking-tight sm:text-5xl">Manage your assigned service jobs.</h1>
        <p className="break-safe mt-4 max-w-2xl leading-8 text-white/68">Accept work, update progress, and keep your profile ready for nearby requests.</p>
      </section>
      <section className="grid gap-4 md:grid-cols-4">
        <AdminStatCard icon={BriefcaseBusiness} label="Assigned Jobs" loading={isLoading} value={stats?.assignedJobs || 0} />
        <AdminStatCard icon={CheckCircle2} label="Completed Jobs" loading={isLoading} value={stats?.completedJobs || 0} />
        <AdminStatCard icon={Star} label="Rating" loading={isLoading} value={Number(stats?.rating || 0)} />
        <AdminStatCard icon={Wifi} label={stats?.availability || 'Availability'} loading={isLoading} value={stats?.availability === 'AVAILABLE' ? 1 : 0} />
      </section>
    </div>
  )
}

export default WorkerDashboardPage
