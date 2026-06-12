import { AirVent, Brush, ClipboardCheck, Clock3, Hammer, Home, ListChecks, Paintbrush, PlusCircle, PlugZap, Sparkles, Wrench } from 'lucide-react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import StatCard from '../../components/common/StatCard'
import { useAuth } from '../../hooks/useAuth'
import { getUserDashboardStats } from '../../services/dashboardStatsService'

const services = [
  { title: 'Electrician', heading: 'Hire an Electrician', copy: 'Wiring, switches, fans, lighting and quick electrical checks.', icon: PlugZap, accent: 'from-amber-300 to-orange-400' },
  { title: 'Plumber', heading: 'Book a Plumber', copy: 'Leaks, taps, pipes, drainage and bathroom repair support.', icon: Wrench, accent: 'from-sky-300 to-cyan-400' },
  { title: 'Cleaner', heading: 'Schedule Cleaning', copy: 'Home cleaning, kitchen cleaning and move-in cleanup help.', icon: Sparkles, accent: 'from-emerald-300 to-teal-400' },
  { title: 'Painter', heading: 'Find a Painter', copy: 'Room painting, touch-ups, polish and wall finishing work.', icon: Paintbrush, accent: 'from-fuchsia-300 to-rose-400' },
  { title: 'Carpenter', heading: 'Hire a Carpenter', copy: 'Furniture repair, doors, shelves and custom wood fixes.', icon: Hammer, accent: 'from-yellow-300 to-lime-400' },
  { title: 'AC Repair', heading: 'Request AC Repair', copy: 'AC service, cooling issues, installation and maintenance.', icon: AirVent, accent: 'from-indigo-300 to-blue-400' },
  { title: 'Appliance Repair', heading: 'Fix an Appliance', copy: 'Common appliance checks, repair and installation support.', icon: Brush, accent: 'from-violet-300 to-purple-400' },
  { title: 'General Help', heading: 'Request General Help', copy: 'Not sure who to call? Share your task and we will coordinate.', icon: Home, accent: 'from-slate-300 to-emerald-300' },
]

function UserDashboardHome() {
  const { user } = useAuth()
  const [stats, setStats] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(async () => {
      setStats(await getUserDashboardStats())
      setIsLoading(false)
    }, 0)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl shadow-black/20 backdrop-blur-2xl lg:p-8">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-emerald-200">Welcome</p>
        <div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="break-safe text-3xl font-black tracking-tight sm:text-5xl">Hi {user?.fullName || 'there'}, request help with confidence.</h1>
            <p className="break-safe mt-4 max-w-2xl leading-8 text-white/68">
              Create a service request and AllHelp will help coordinate the right verified worker for your location.
            </p>
          </div>
          <Link className="shimmer-button inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-300 to-cyan-300 px-6 font-black text-slate-950 shadow-2xl shadow-emerald-500/20 transition hover:-translate-y-1" to="/user/requests/create">
            <PlusCircle className="h-5 w-5" />
            Create request
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        <StatCard icon={ListChecks} label="Total Requests" loading={isLoading} value={stats?.totalRequests || 0} />
        <StatCard icon={Clock3} label="Active Requests" loading={isLoading} value={stats?.activeRequests || 0} />
        <StatCard icon={Clock3} label="Pending Requests" loading={isLoading} value={stats?.pendingRequests || 0} />
        <StatCard icon={ClipboardCheck} label="Completed Requests" loading={isLoading} value={stats?.completedRequests || 0} />
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-white/10 p-5 shadow-2xl shadow-black/20 backdrop-blur-2xl lg:p-7">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-emerald-200">Popular services</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">What do you need help with?</h2>
          </div>
          <Link className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-white/10 px-5 text-sm font-black text-white transition hover:bg-white hover:text-slate-950" to="/user/requests/create">
            <PlusCircle className="h-4 w-4" />
            Custom request
          </Link>
        </div>

        <motion.div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4" initial="hidden" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }} animate="show">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <motion.div key={service.title} variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}>
                <Link className="group block h-full overflow-hidden rounded-[1.5rem] bg-white p-5 text-slate-950 shadow-2xl shadow-black/10 transition hover:-translate-y-1 hover:shadow-emerald-950/20" to={`/user/requests/create?category=${encodeURIComponent(service.title)}`}>
                  <div className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${service.accent} text-slate-950 shadow-lg transition group-hover:scale-105`}>
                    <Icon className="h-7 w-7" />
                  </div>
                  <p className="mt-5 text-xs font-black uppercase tracking-[0.16em] text-emerald-700">{service.title}</p>
                  <h3 className="mt-2 text-2xl font-black">{service.heading}</h3>
                  <p className="mt-3 min-h-20 text-sm font-bold leading-6 text-slate-500">{service.copy}</p>
                  <span className="mt-4 inline-flex text-sm font-black text-emerald-700">Book now</span>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </section>
    </div>
  )
}

export default UserDashboardHome
