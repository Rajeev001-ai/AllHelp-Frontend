function StatCard({ icon: Icon, label, loading, value }) {
  return (
    <article className="rounded-[1.5rem] border border-white/10 bg-white p-6 text-slate-950 shadow-2xl shadow-black/10 transition hover:-translate-y-1">
      {Icon && <div className="mb-8 grid h-12 w-12 place-items-center rounded-2xl bg-emerald-50 text-emerald-700"><Icon className="h-6 w-6" /></div>}
      {loading ? <div className="h-10 w-20 animate-pulse rounded-full bg-slate-200" /> : <strong className="text-4xl font-black">{value}</strong>}
      <p className="mt-2 font-bold text-slate-500">{label}</p>
    </article>
  )
}

export default StatCard
