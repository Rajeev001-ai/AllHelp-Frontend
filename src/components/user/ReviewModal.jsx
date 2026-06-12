import { motion } from 'framer-motion'
import { Star, X } from 'lucide-react'
import { useState } from 'react'

function ReviewModal({ isSubmitting, onClose, onSubmit, request }) {
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')

  if (!request) {
    return null
  }

  const handleSubmit = () => {
    onSubmit({ requestId: request.id, rating, comment })
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/75 p-4 backdrop-blur-xl">
      <motion.div animate={{ opacity: 1, y: 0 }} className="w-full max-w-lg rounded-[2rem] border border-white/20 bg-white p-6 text-slate-950 shadow-2xl" initial={{ opacity: 0, y: 18 }}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-600">Leave review</p>
            <h2 className="mt-2 text-3xl font-black">{request.category}</h2>
            <p className="mt-2 text-sm font-bold text-slate-500">Request #{request.id}</p>
          </div>
          <button className="grid h-10 w-10 place-items-center rounded-full bg-slate-100" type="button" onClick={onClose}>
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6">
          <p className="text-sm font-black text-slate-700">Rating</p>
          <div className="mt-3 flex gap-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <button className="transition hover:-translate-y-0.5" key={value} type="button" onClick={() => setRating(value)}>
                <Star className={`h-8 w-8 ${value <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
              </button>
            ))}
          </div>
        </div>

        <label className="mt-6 grid gap-2 text-sm font-black text-slate-700">
          Comment
          <textarea className="min-h-32 rounded-2xl border border-slate-200 bg-slate-50 p-4 font-bold text-slate-950 outline-none focus:border-emerald-400" placeholder="Share your experience..." value={comment} onChange={(event) => setComment(event.target.value)} />
        </label>

        <button className="mt-6 min-h-12 w-full rounded-full bg-slate-950 font-black text-white transition hover:-translate-y-0.5 disabled:opacity-50" disabled={isSubmitting} type="button" onClick={handleSubmit}>
          {isSubmitting ? 'Submitting...' : 'Submit review'}
        </button>
      </motion.div>
    </div>
  )
}

export default ReviewModal
