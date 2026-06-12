import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import LoadingScreen from './components/landing/LoadingScreen'
import AppRoutes from './routes/AppRoutes'
import './styles/global.css'
import './styles/landing.css'
import './styles/auth.css'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 900)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <div className="site-shell">
      <AnimatePresence>{isLoading && <LoadingScreen />}</AnimatePresence>
      <AppRoutes />
    </div>
  )
}

export default App
