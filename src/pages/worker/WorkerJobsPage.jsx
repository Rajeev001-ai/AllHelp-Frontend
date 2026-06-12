import { useEffect, useState } from 'react'
import WorkerJobCard from '../../components/worker/WorkerJobCard'
import { getWorkerJobs, updateWorkerJobAction } from '../../services/workerService'
import { getErrorMessage } from '../../utils/authRedirect'

function WorkerJobsPage({ completedOnly = false }) {
  const [jobs, setJobs] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const timer = window.setTimeout(async () => {
      try {
        const data = await getWorkerJobs()
        setJobs(completedOnly ? data.filter((job) => job.assignmentStatus === 'COMPLETED') : data.filter((job) => job.assignmentStatus !== 'COMPLETED'))
      } catch (requestError) {
        setError(getErrorMessage(requestError))
      } finally {
        setIsLoading(false)
      }
    }, 0)
    return () => window.clearTimeout(timer)
  }, [completedOnly])
  const handleAction = async (id, action) => {
    const updated = await updateWorkerJobAction(id, action)
    setJobs((current) => current.map((job) => (job.id === id ? updated : job)).filter((job) => (completedOnly ? job.assignmentStatus === 'COMPLETED' : job.assignmentStatus !== 'COMPLETED')))
  }
  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl shadow-black/20 backdrop-blur-2xl lg:p-8">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-emerald-200">{completedOnly ? 'Completed jobs' : 'Assigned jobs'}</p>
        <h1 className="break-safe mt-4 text-3xl font-black tracking-tight sm:text-5xl">{completedOnly ? 'Your completed work.' : 'Jobs assigned to you.'}</h1>
      </section>
      {error && <div className="rounded-2xl bg-rose-500/10 p-4 font-bold text-rose-100">{error}</div>}
      {isLoading ? <div className="h-72 animate-pulse rounded-[1.5rem] bg-white/20" /> : jobs.length === 0 ? <div className="rounded-[2rem] bg-white/10 p-10 text-center font-bold text-white/70">No jobs to show.</div> : <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{jobs.map((job) => <WorkerJobCard job={job} key={job.id} onAction={handleAction} />)}</div>}
    </div>
  )
}

export default WorkerJobsPage
