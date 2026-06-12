import { motion } from 'framer-motion'
import { ArrowLeft, CheckCircle2, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'

function AuthShell({ children, eyebrow, title, copy }) {
  return (
    <main className="min-h-screen bg-[#07111f] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_14%_12%,rgba(45,212,191,0.18),transparent_28%),radial-gradient(circle_at_84%_8%,rgba(99,102,241,0.18),transparent_30%),linear-gradient(135deg,#07111f_0%,#0d1728_48%,#09231e_100%)]" />
      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-48px)] max-w-6xl items-center gap-5 lg:grid-cols-[0.92fr_1.08fr]">
        <motion.section animate={{ opacity: 1, y: 0 }} className="rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl shadow-black/20 backdrop-blur-2xl lg:p-8" initial={{ opacity: 0, y: 18 }}>
          <Link className="inline-flex min-h-10 items-center gap-2 rounded-full bg-white/10 px-4 text-sm font-black text-white transition hover:bg-white hover:text-slate-950" to="/">
            <ArrowLeft className="h-4 w-4" />
            Back home
          </Link>

          <div className="mt-10">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-emerald-200">{eyebrow}</p>
            <h1 className="break-safe mt-4 text-3xl font-black tracking-tight sm:text-5xl">{title}</h1>
            <p className="break-safe mt-5 max-w-xl leading-8 text-white/68">{copy}</p>
          </div>

          <div className="mt-8 grid gap-3">
            {['Verified workers for real service needs', 'Simple request tracking from start to finish', 'One account for customers, workers, and admin'].map((item) => (
              <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/8 p-3 text-sm font-black text-white/78" key={item}>
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-emerald-300 text-slate-950">
                  <CheckCircle2 className="h-5 w-5" />
                </span>
                <span className="break-safe min-w-0">{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-white/10 bg-white/8 p-4">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-slate-950">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <div>
                <p className="font-black">AllHelp trust layer</p>
                <p className="text-sm font-bold text-white/55">Requests, assignments, reviews, and profiles stay organized.</p>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section animate={{ opacity: 1, y: 0 }} className="rounded-[2rem] bg-white p-5 text-slate-950 shadow-2xl shadow-black/20 sm:p-6 lg:p-8" initial={{ opacity: 0, y: 18 }} transition={{ delay: 0.08 }}>
          {children}
        </motion.section>
      </div>
    </main>
  )
}

export default AuthShell
