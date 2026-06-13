import { AnimatePresence, motion } from 'framer-motion'
import { LogOut, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import NotificationBell from '../components/common/NotificationBell'
import { useAuth } from '../hooks/useAuth'

const themes = {
  admin: {
    bg: 'bg-[#070b18]',
    backdrop: 'bg-[radial-gradient(circle_at_16%_10%,rgba(99,102,241,0.2),transparent_28%),radial-gradient(circle_at_86%_16%,rgba(45,212,191,0.18),transparent_30%),linear-gradient(135deg,#070b18_0%,#101827_54%,#071d19_100%)]',
    mark: 'from-indigo-300 to-emerald-300',
  },
  default: {
    bg: 'bg-[#07111f]',
    backdrop: 'bg-[radial-gradient(circle_at_14%_12%,rgba(45,212,191,0.18),transparent_28%),radial-gradient(circle_at_84%_8%,rgba(99,102,241,0.18),transparent_30%),linear-gradient(135deg,#07111f_0%,#0d1728_48%,#09231e_100%)]',
    mark: 'from-emerald-300 to-cyan-300',
  },
}

function DashboardShell({ animateOutlet = false, navItems, panelLabel, productLabel, theme = 'default' }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { logout, user } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const activeTheme = themes[theme] || themes.default

  const currentItem = navItems.find((item) => {
    if (item.end) return location.pathname === item.path
    return location.pathname === item.path || location.pathname.startsWith(`${item.path}/`)
  })

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  const page = animateOutlet ? (
    <AnimatePresence mode="wait">
      <motion.div animate={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 18 }} key={location.pathname} transition={{ duration: 0.32 }}>
        <Outlet />
      </motion.div>
    </AnimatePresence>
  ) : (
    <Outlet />
  )

  return (
    <main className={`min-h-screen overflow-x-hidden ${activeTheme.bg} text-white`}>
      <div className={`fixed inset-0 ${activeTheme.backdrop}`} />
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:44px_44px] opacity-40" />

      <div className="relative z-10 min-h-screen lg:grid lg:grid-cols-[290px_minmax(0,1fr)]">
        <aside className="hidden min-h-screen flex-col border-r border-white/10 bg-white/8 p-4 backdrop-blur-2xl lg:sticky lg:top-0 lg:flex lg:h-screen">
          <Brand productLabel={productLabel} panelLabel={panelLabel} themeClass={activeTheme.mark} />
          <Navigation navItems={navItems} />
          <AccountCard handleLogout={handleLogout} panelLabel={panelLabel} user={user} />
        </aside>

        <MobileTopBar
          currentLabel={currentItem?.label || 'Dashboard'}
          onMenuOpen={() => setIsMenuOpen(true)}
          productLabel={productLabel}
          themeClass={activeTheme.mark}
        />

        <section className="min-w-0 px-3 pb-6 pt-4 sm:px-5 sm:pb-8 lg:px-8 lg:py-8">
          <div className="mx-auto w-full max-w-[1500px]">
            <div className="mb-4 hidden justify-end lg:flex">
              <NotificationBell />
            </div>
            {page}
          </div>
        </section>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.button
              aria-label="Close menu"
              animate={{ opacity: 1 }}
              className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm lg:hidden"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              type="button"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.aside
              animate={{ x: 0 }}
              className="fixed inset-y-0 left-0 z-50 flex w-[min(21rem,calc(100vw-1.25rem))] flex-col border-r border-white/10 bg-[#07111f]/96 p-4 text-white shadow-2xl shadow-black/40 backdrop-blur-2xl lg:hidden"
              exit={{ x: '-105%' }}
              initial={{ x: '-105%' }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
            >
              <div className="flex items-center justify-between gap-3">
                <Brand productLabel={productLabel} panelLabel={panelLabel} themeClass={activeTheme.mark} compact />
                <button className="grid h-11 w-11 place-items-center rounded-2xl bg-white/10 text-white" type="button" onClick={() => setIsMenuOpen(false)}>
                  <X className="h-5 w-5" />
                </button>
              </div>
              <Navigation navItems={navItems} onNavigate={() => setIsMenuOpen(false)} />
              <AccountCard handleLogout={handleLogout} panelLabel={panelLabel} user={user} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </main>
  )
}

function MobileTopBar({ currentLabel, onMenuOpen, productLabel, themeClass }) {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#07111f]/82 px-3 py-3 backdrop-blur-2xl sm:px-5 lg:hidden">
      <div className="flex items-center justify-between gap-3">
        <button className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/10 text-white" type="button" onClick={onMenuOpen}>
          <Menu className="h-5 w-5" />
        </button>
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${themeClass} font-black text-slate-950`}>A</span>
          <div className="min-w-0">
            <p className="truncate text-sm font-black">{productLabel}</p>
            <p className="truncate text-xs font-bold text-white/54">{currentLabel}</p>
          </div>
        </div>
        <NotificationBell />
      </div>
    </header>
  )
}

function Brand({ compact = false, panelLabel, productLabel, themeClass }) {
  return (
    <div className={`${compact ? '' : 'rounded-3xl border border-white/10 bg-white/8 p-4'}`}>
      <div className="flex min-w-0 items-center gap-3">
        <span className={`grid ${compact ? 'h-10 w-10' : 'h-12 w-12'} shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${themeClass} font-black text-slate-950`}>
          A
        </span>
        <div className="min-w-0">
          <p className="truncate font-black">{productLabel}</p>
          <p className="truncate text-xs font-bold text-white/50">{panelLabel}</p>
        </div>
      </div>
    </div>
  )
}

function Navigation({ navItems, onNavigate }) {
  return (
    <nav className="mt-5 grid min-h-0 flex-1 content-start gap-2 overflow-y-auto pr-1">
      {navItems.map((item) => {
        const Icon = item.icon
        return (
          <NavLink
            className={({ isActive }) =>
              `group flex min-h-12 min-w-0 items-center gap-3 rounded-2xl border px-3 py-3 text-sm font-black transition ${
                isActive
                  ? 'border-emerald-300/30 bg-emerald-300/15 text-emerald-50 shadow-xl shadow-emerald-950/20'
                  : 'border-transparent text-white/68 hover:border-white/10 hover:bg-white/10 hover:text-white'
              }`
            }
            end={item.end}
            key={item.path}
            to={item.path}
            onClick={onNavigate}
          >
            {({ isActive }) => (
              <>
                <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl transition ${isActive ? 'bg-emerald-300 text-slate-950' : 'bg-white/8 text-white/70 group-hover:bg-white/12 group-hover:text-white'}`}>
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0 truncate">{item.label}</span>
              </>
            )}
          </NavLink>
        )
      })}
    </nav>
  )
}

function AccountCard({ handleLogout, panelLabel, user }) {
  return (
    <div className="mt-5 shrink-0 rounded-3xl border border-white/10 bg-white/8 p-4">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-200">{panelLabel}</p>
      <p className="mt-2 truncate font-black">{user?.fullName || panelLabel}</p>
      <p className="truncate text-sm font-bold text-white/50">{user?.email}</p>
      <button
        className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/10 text-sm font-black text-white transition hover:bg-white hover:text-slate-950"
        type="button"
        onClick={handleLogout}
      >
        <LogOut className="h-4 w-4" />
        Logout
      </button>
    </div>
  )
}

export default DashboardShell
