import { motion } from 'framer-motion'
import AnimatedCounter from '../landing/AnimatedCounter'

function AdminStatCard({ icon: Icon, label, loading, value }) {
  return (
    <motion.article
      className="rounded-[1.5rem] border border-white/10 bg-white p-6 text-slate-950 shadow-2xl shadow-black/10"
      initial={{ opacity: 0, y: 18 }}
      whileHover={{ y: -6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="mb-8 grid h-12 w-12 place-items-center rounded-2xl bg-emerald-50 text-emerald-700">
        <Icon className="h-6 w-6" />
      </div>
      {loading ? (
        <div className="h-10 w-20 animate-pulse rounded-full bg-slate-200" />
      ) : (
        <strong className="text-4xl font-black">
          <AnimatedCounter value={value || 0} />
        </strong>
      )}
      <p className="mt-2 font-bold text-slate-500">{label}</p>
    </motion.article>
  )
}

export default AdminStatCard
