import { AnimatePresence, motion } from 'framer-motion'
import { Bell } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getNotifications, getUnreadNotificationCount, markAllNotificationsRead, markNotificationRead } from '../../services/notificationService'
import { formatDateTime } from '../../utils/requestHelpers'

function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [count, setCount] = useState(0)

  const load = async () => {
    const [items, unread] = await Promise.all([getNotifications(), getUnreadNotificationCount()])
    setNotifications(items)
    setCount(unread)
  }

  useEffect(() => {
    const timer = window.setTimeout(() => void load(), 0)
    return () => window.clearTimeout(timer)
  }, [])

  const handleOpen = async () => {
    setIsOpen((current) => !current)
    if (!isOpen) {
      await load()
    }
  }

  const handleRead = async (id) => {
    const updated = await markNotificationRead(id)
    setNotifications((current) => current.map((item) => (item.id === id ? updated : item)))
    setCount((current) => Math.max(0, current - 1))
  }

  const handleReadAll = async () => {
    await markAllNotificationsRead()
    setNotifications((current) => current.map((item) => ({ ...item, isRead: true })))
    setCount(0)
  }

  return (
    <div className="relative">
      <button className="relative grid h-11 w-11 place-items-center rounded-2xl bg-white/10 text-white transition hover:bg-white hover:text-slate-950" type="button" onClick={handleOpen}>
        <Bell className="h-5 w-5" />
        {count > 0 && <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-rose-500 px-1 text-[10px] font-black text-white">{count}</span>}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div animate={{ opacity: 1, y: 0 }} className="absolute right-0 top-14 z-40 w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-[1.5rem] border border-white/15 bg-white text-slate-950 shadow-2xl" exit={{ opacity: 0, y: -8 }} initial={{ opacity: 0, y: -8 }}>
            <div className="flex items-center justify-between border-b border-slate-100 p-4">
              <h3 className="font-black">Notifications</h3>
              <button className="text-xs font-black text-emerald-700" type="button" onClick={handleReadAll}>Mark all read</button>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <p className="p-5 text-center text-sm font-bold text-slate-500">No notifications yet.</p>
              ) : notifications.map((item) => (
                <button className={`block w-full border-b border-slate-100 p-4 text-left transition hover:bg-slate-50 ${item.isRead ? 'opacity-70' : ''}`} key={item.id} type="button" onClick={() => handleRead(item.id)}>
                  <p className="font-black">{item.title}</p>
                  <p className="mt-1 text-sm font-bold text-slate-500">{item.message}</p>
                  <p className="mt-2 text-xs font-black uppercase tracking-[0.12em] text-slate-400">{formatDateTime(item.createdAt)}</p>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default NotificationBell
