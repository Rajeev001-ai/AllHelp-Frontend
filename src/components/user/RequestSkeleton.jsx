function RequestSkeleton() {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white p-5 shadow-2xl shadow-black/10">
      <div className="h-4 w-28 animate-pulse rounded-full bg-slate-200" />
      <div className="mt-4 h-8 w-44 animate-pulse rounded-full bg-slate-200" />
      <div className="mt-6 space-y-3">
        <div className="h-4 animate-pulse rounded-full bg-slate-200" />
        <div className="h-4 w-3/4 animate-pulse rounded-full bg-slate-200" />
      </div>
      <div className="mt-8 h-10 w-36 animate-pulse rounded-full bg-slate-200" />
    </div>
  )
}

export default RequestSkeleton
