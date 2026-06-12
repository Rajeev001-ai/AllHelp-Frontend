function AdminPlaceholderPage({ title }) {
  return (
    <div className="grid min-h-[70vh] place-items-center text-center">
      <div className="glass-panel max-w-xl rounded-[2rem] p-8">
        <h1 className="text-4xl font-black">{title}</h1>
        <p className="mt-4 text-slate-300">This admin section will be connected after request management is complete.</p>
      </div>
    </div>
  )
}

export default AdminPlaceholderPage
