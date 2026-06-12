import { CheckCircle2, Circle } from 'lucide-react'

const steps = [
  { key: 'created', label: 'Request Created' },
  { key: 'assigned', label: 'Worker Assigned' },
  { key: 'accepted', label: 'Worker Accepted' },
  { key: 'started', label: 'Work Started' },
  { key: 'completed', label: 'Work Completed' },
]

function RequestTimeline({ assignment, request }) {
  const completed = {
    created: true,
    assigned: Boolean(assignment),
    accepted: ['ACCEPTED', 'IN_PROGRESS', 'COMPLETED_PENDING_VERIFICATION', 'COMPLETED'].includes(assignment?.assignmentStatus),
    started: ['IN_PROGRESS', 'COMPLETED_PENDING_VERIFICATION', 'COMPLETED'].includes(assignment?.assignmentStatus),
    completed: request?.status === 'COMPLETED',
  }

  return (
    <div className="rounded-[1.5rem] bg-white p-5 text-slate-950 shadow-2xl shadow-black/10">
      <h2 className="text-2xl font-black">Status timeline</h2>
      <div className="mt-5 space-y-4">
        {steps.map((step, index) => {
          const done = completed[step.key]
          return (
            <div className="relative flex gap-3" key={step.key}>
              {index < steps.length - 1 && <span className={`absolute left-[9px] top-6 h-8 w-0.5 ${done ? 'bg-emerald-400' : 'bg-slate-200'}`} />}
              {done ? <CheckCircle2 className="relative z-10 h-5 w-5 text-emerald-600" /> : <Circle className="relative z-10 h-5 w-5 text-slate-300" />}
              <p className={`font-black ${done ? 'text-slate-950' : 'text-slate-400'}`}>{step.label}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default RequestTimeline
