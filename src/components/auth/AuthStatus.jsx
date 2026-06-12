import { motion } from 'framer-motion'

function AuthStatus({ status }) {
  if (!status.message) {
    return null
  }

  const isSuccess = status.type === 'success'

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl border p-4 text-sm font-black ${
        isSuccess ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-rose-200 bg-rose-50 text-rose-800'
      }`}
      initial={{ opacity: 0, y: -8 }}
    >
      {status.message}
    </motion.div>
  )
}

export default AuthStatus
