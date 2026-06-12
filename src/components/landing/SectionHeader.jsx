import { motion } from 'framer-motion'

function SectionHeader({ eyebrow, title, copy, align = 'center', tone = 'light' }) {
  const isDark = tone === 'dark'

  return (
    <motion.div
      className={`mx-auto max-w-3xl ${align === 'left' ? 'mx-0 text-left' : 'text-center'}`}
      initial={{ opacity: 0, y: 24 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.4 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <p className={`mb-4 text-xs font-black uppercase ${isDark ? 'text-emerald-300' : 'text-emerald-500'}`}>{eyebrow}</p>
      <h2 className={`break-safe text-3xl font-black leading-tight sm:text-5xl lg:text-6xl ${isDark ? 'text-white' : 'text-slate-950'}`}>{title}</h2>
      {copy && <p className={`mt-5 text-base leading-8 sm:text-lg ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{copy}</p>}
    </motion.div>
  )
}

export default SectionHeader
