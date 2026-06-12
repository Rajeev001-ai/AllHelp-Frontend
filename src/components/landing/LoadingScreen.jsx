import { motion } from 'framer-motion'

function LoadingScreen() {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 grid place-items-center bg-[#050816]"
      exit={{ opacity: 0, transition: { duration: 0.45 } }}
      initial={{ opacity: 1 }}
    >
      <div className="relative">
        <motion.div
          animate={{ rotate: 360 }}
          className="h-24 w-24 rounded-full border border-white/10 border-t-emerald-300"
          transition={{ duration: 1, ease: 'linear', repeat: Infinity }}
        />
        <div className="absolute inset-0 grid place-items-center text-xl font-black text-white">A</div>
      </div>
    </motion.div>
  )
}

export default LoadingScreen
