import { animate, motion, useInView, useMotionValue, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'

function AnimatedCounter({ value, suffix = '' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => `${Math.round(latest).toLocaleString()}${suffix}`)

  useEffect(() => {
    if (!isInView) {
      return undefined
    }

    const controls = animate(count, value, { duration: 1.8, ease: 'easeOut' })
    return controls.stop
  }, [count, isInView, value])

  return <motion.span ref={ref}>{rounded}</motion.span>
}

export default AnimatedCounter
