import { BriefcaseBusiness, CheckCircle2, IndianRupee, LayoutDashboard, LogOut, UserRound } from 'lucide-react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import NotificationBell from '../../components/common/NotificationBell'
import { useAuth } from '../../hooks/useAuth'

const navItems = [
  { label: 'Dashboard', path: '/worker/dashboard', icon: LayoutDashboard },
  { label: 'Assigned Jobs', path: '/worker/jobs', icon: BriefcaseBusiness },
  { label: 'Completed Jobs', path: '/worker/completed', icon: CheckCircle2 },
  { label: 'Earnings', path: '/worker/earnings', icon: IndianRupee },
  { label: 'Profile', path: '/worker/profile', icon: UserRound },
]

function WorkerDashboardLayout() {
  const navigate = useNavigate()
  const { logout, user } = useAuth()
  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_14%_12%,rgba(45,212,191,0.18),transparent_28%),radial-gradient(circle_at_84%_8%,rgba(99,102,241,0.18),transparent_30%),linear-gradient(135deg,#07111f_0%,#0d1728_48%,#09231e_100%)]" />
      <div className="relative z-10 grid min-h-screen lg:grid-cols-[280px_1fr]">
        <aside className="flex flex-col border-b border-white/10 bg-white/8 p-3 backdrop-blur-2xl sm:p-4 lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r">
          <div className="flex shrink-0 items-center gap-3 rounded-3xl border border-white/10 bg-white/8 p-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-emerald-300 to-cyan-300 font-black text-slate-950">A</span>
            <div className="min-w-0"><p className="font-black">AllHelp Worker</p><p className="text-xs font-bold text-white/50">Jobs dashboard</p></div>
          </div>
          <nav className="mt-4 flex min-h-0 gap-2 overflow-x-auto pb-1 lg:mt-6 lg:grid lg:flex-1 lg:content-start lg:overflow-y-auto lg:overflow-x-visible lg:pr-1">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <NavLink className={({ isActive }) => `group flex shrink-0 items-center gap-3 rounded-2xl border px-3 py-3 text-sm font-black transition lg:shrink ${isActive ? 'border-emerald-300/30 bg-emerald-300/15 text-white shadow-xl shadow-emerald-950/20' : 'border-transparent text-white/68 hover:border-white/10 hover:bg-white/10 hover:text-white'}`} end={item.path === '/worker/dashboard'} key={item.path} to={item.path}>
                  {({ isActive }) => (
                    <>
                      <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl transition ${isActive ? 'bg-emerald-300 text-slate-950' : 'bg-white/8 text-white/70 group-hover:bg-white/12 group-hover:text-white'}`}>
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="truncate">{item.label}</span>
                    </>
                  )}
                </NavLink>
              )
            })}
          </nav>
          <div className="mt-4 shrink-0 rounded-3xl border border-white/10 bg-white/8 p-3 sm:p-4 lg:mt-6">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-200">Worker</p>
            <p className="mt-2 truncate font-black">{user?.fullName || 'Worker'}</p>
            <p className="truncate text-sm font-bold text-white/50">{user?.email}</p>
            <button className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/10 text-sm font-black text-white transition hover:bg-white hover:text-slate-950" type="button" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />Logout
            </button>
          </div>
        </aside>
        <section className="min-w-0 p-4 sm:p-6 lg:p-8">
          <div className="mb-4 flex justify-end">
            <NotificationBell />
          </div>
          <Outlet />
        </section>
      </div>
    </main>
  )
}

export default WorkerDashboardLayout
