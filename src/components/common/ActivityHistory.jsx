import { formatDateTime } from '../../utils/requestHelpers'

function ActivityHistory({ activities = [] }) {
  return (
    <div className="rounded-[1.5rem] bg-white p-5 text-slate-950 shadow-2xl shadow-black/10">
      <h2 className="text-2xl font-black">Activity history</h2>
      {activities.length === 0 ? (
        <p className="mt-4 font-bold text-slate-500">No activity recorded yet.</p>
      ) : (
        <div className="mt-5 space-y-4">
          {activities.map((activity) => (
            <div className="rounded-2xl bg-slate-100 p-4" key={activity.id}>
              <p className="font-black">{activity.action}</p>
              <p className="mt-1 text-sm font-bold text-slate-500">{activity.performedBy || 'System'} · {formatDateTime(activity.createdAt)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ActivityHistory
