function AdminTableSkeleton() {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white p-4 shadow-2xl shadow-black/10">
      {Array.from({ length: 7 }).map((_, index) => (
        <div className="grid grid-cols-6 gap-4 border-b border-slate-100 py-4 last:border-0" key={index}>
          {Array.from({ length: 6 }).map((__, cellIndex) => (
            <div className="h-5 animate-pulse rounded-full bg-slate-200" key={cellIndex} />
          ))}
        </div>
      ))}
    </div>
  )
}

export default AdminTableSkeleton
