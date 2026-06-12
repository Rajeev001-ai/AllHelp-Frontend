import { motion } from 'framer-motion'
import { ClipboardList, RefreshCw } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import RequestCard from '../../components/user/RequestCard'
import ReviewModal from '../../components/user/ReviewModal'
import RequestSkeleton from '../../components/user/RequestSkeleton'
import { useUserRequests } from '../../hooks/useUserRequests'
import { createReview, getUserReviews } from '../../services/reviewService'
import { deleteUserRequest } from '../../services/requestService'
import { getErrorMessage } from '../../utils/authRedirect'

function MyRequestsPage({ completedOnly = false }) {
  const { requests, setRequests, isLoading, error, refresh } = useUserRequests()
  const [reviews, setReviews] = useState([])
  const [reviewRequest, setReviewRequest] = useState(null)
  const [reviewError, setReviewError] = useState('')
  const [isSubmittingReview, setIsSubmittingReview] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(async () => {
      try {
        setReviews(await getUserReviews())
      } catch (requestError) {
        setReviewError(getErrorMessage(requestError))
      }
    }, 0)
    return () => window.clearTimeout(timer)
  }, [])

  const reviewsByRequest = useMemo(() => {
    return Object.fromEntries(reviews.map((review) => [review.serviceRequest.id, review]))
  }, [reviews])

  const visibleRequests = useMemo(() => {
    return completedOnly ? requests.filter((request) => request.status === 'COMPLETED') : requests
  }, [completedOnly, requests])

  const handleDelete = async (id) => {
    await deleteUserRequest(id)
    setRequests((current) => current.filter((request) => request.id !== id))
  }

  const handleReviewSubmit = async (payload) => {
    setIsSubmittingReview(true)
    setReviewError('')
    try {
      const savedReview = await createReview(payload)
      setReviews((current) => [savedReview, ...current])
      setReviewRequest(null)
    } catch (requestError) {
      setReviewError(getErrorMessage(requestError))
    } finally {
      setIsSubmittingReview(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.24em] text-emerald-200">{completedOnly ? 'Completed requests' : 'My requests'}</p>
          <h1 className="break-safe mt-3 text-3xl font-black tracking-tight sm:text-5xl">{completedOnly ? 'Review completed work.' : 'Track your service requests.'}</h1>
          <p className="break-safe mt-4 max-w-2xl leading-8 text-white/68">{completedOnly ? 'See finished jobs, submit reviews, and view your past feedback.' : 'See what you asked for, where help is needed, and the current request status.'}</p>
        </div>
        <button className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white/10 px-5 font-black text-white transition hover:bg-white hover:text-slate-950" type="button" onClick={refresh}>
          <RefreshCw className="h-5 w-5" />
          Refresh
        </button>
      </div>

      {error && <div className="rounded-2xl border border-rose-300/30 bg-rose-500/10 p-4 font-bold text-rose-100">{error}</div>}
      {reviewError && <div className="rounded-2xl border border-rose-300/30 bg-rose-500/10 p-4 font-bold text-rose-100">{reviewError}</div>}

      {isLoading && (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => <RequestSkeleton key={index} />)}
        </div>
      )}

      {!isLoading && visibleRequests.length === 0 && <EmptyState completedOnly={completedOnly} />}

      {!isLoading && visibleRequests.length > 0 && (
        <motion.div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3" initial="hidden" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }} animate="show">
          {visibleRequests.map((request) => (
            <motion.div key={request.id} variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}>
              <RequestCard request={request} review={reviewsByRequest[request.id]} onDelete={handleDelete} onReview={setReviewRequest} />
            </motion.div>
          ))}
        </motion.div>
      )}
      <ReviewModal isSubmitting={isSubmittingReview} request={reviewRequest} onClose={() => setReviewRequest(null)} onSubmit={handleReviewSubmit} />
    </div>
  )
}

function EmptyState({ completedOnly }) {
  return (
    <div className="grid min-h-[360px] place-items-center rounded-[2rem] border border-white/10 bg-white/10 p-8 text-center backdrop-blur-2xl">
      <div>
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-white text-emerald-700">
          <ClipboardList className="h-8 w-8" />
        </div>
        <h2 className="mt-6 text-3xl font-black">{completedOnly ? 'No completed requests yet' : 'No requests yet'}</h2>
        <p className="mx-auto mt-3 max-w-md leading-7 text-white/64">{completedOnly ? 'Completed and admin-verified jobs will appear here for review.' : 'Create your first service request and AllHelp will help coordinate the right worker.'}</p>
      </div>
    </div>
  )
}

export default MyRequestsPage
