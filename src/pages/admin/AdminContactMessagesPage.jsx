import { Mail, Phone, RefreshCw, Search, CheckCircle2, MessageSquareText } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { getContactMessages, markContactMessageRead } from '../../services/contactService'
import { getErrorMessage } from '../../utils/authRedirect'
import { formatDateTime } from '../../utils/requestHelpers'

function AdminContactMessagesPage() {
  const [messages, setMessages] = useState([])
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdatingId, setIsUpdatingId] = useState(null)
  const [error, setError] = useState('')

  const loadMessages = async () => {
    setIsLoading(true)
    setError('')
    try {
      const data = await getContactMessages()
      setMessages(data)
    } catch (requestError) {
      setError(getErrorMessage(requestError))
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadMessages()
    }, 0)
    return () => window.clearTimeout(timer)
  }, [])

  const filteredMessages = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return messages

    return messages.filter((message) =>
      [message.fullName, message.email, message.phone, message.message]
        .join(' ')
        .toLowerCase()
        .includes(query),
    )
  }, [messages, search])

  const unreadCount = messages.filter((message) => !message.read).length

  const handleMarkRead = async (id) => {
    setIsUpdatingId(id)
    setError('')
    try {
      const updated = await markContactMessageRead(id)
      setMessages((current) => current.map((message) => (message.id === id ? updated : message)))
    } catch (requestError) {
      setError(getErrorMessage(requestError))
    } finally {
      setIsUpdatingId(null)
    }
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl shadow-black/20 backdrop-blur-2xl lg:p-8">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-emerald-200">Contact messages</p>
        <div className="mt-4 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <h1 className="break-safe text-3xl font-black tracking-tight sm:text-5xl">Customer and worker inquiries.</h1>
            <p className="break-safe mt-4 max-w-2xl leading-8 text-white/68">Every message sent from the landing page appears here for the admin team.</p>
          </div>
          <button className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white/10 px-5 font-black text-white transition hover:bg-white hover:text-slate-950" type="button" onClick={loadMessages}>
            <RefreshCw className="h-5 w-5" />
            Refresh
          </button>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <Stat label="Total Messages" value={messages.length} />
          <Stat label="Unread" value={unreadCount} />
          <Stat label="Read" value={messages.length - unreadCount} />
        </div>
      </section>

      <section className="rounded-[1.5rem] border border-white/10 bg-white/10 p-4 backdrop-blur-2xl">
        <label className="relative block">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input className="min-h-12 w-full rounded-2xl border border-white/10 bg-white pl-12 pr-4 font-bold text-slate-950 outline-none" onChange={(event) => setSearch(event.target.value)} placeholder="Search name, email, phone, message..." value={search} />
        </label>
      </section>

      {error && <div className="rounded-2xl border border-rose-300/30 bg-rose-500/10 p-4 font-bold text-rose-100">{error}</div>}

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div className="h-64 animate-pulse rounded-[1.5rem] bg-white/20" key={index} />
          ))}
        </div>
      ) : filteredMessages.length === 0 ? (
        <div className="grid min-h-[340px] place-items-center rounded-[2rem] border border-white/10 bg-white/10 p-8 text-center backdrop-blur-2xl">
          <div>
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-white text-emerald-700">
              <MessageSquareText className="h-8 w-8" />
            </div>
            <h2 className="mt-6 text-3xl font-black">No contact messages</h2>
            <p className="mx-auto mt-3 max-w-md leading-7 text-white/64">Landing page messages will appear here once visitors contact you.</p>
          </div>
        </div>
      ) : (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredMessages.map((message) => (
            <article className="rounded-[1.5rem] bg-white p-5 text-slate-950 shadow-2xl shadow-black/10" key={message.id}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-400">Message #{message.id}</p>
                  <h2 className="mt-1 truncate text-xl font-black">{message.fullName}</h2>
                  <p className="mt-1 text-xs font-black uppercase tracking-[0.12em] text-slate-400">{formatDateTime(message.createdAt)}</p>
                </div>
                <span className={`shrink-0 rounded-full border px-3 py-1 text-[11px] font-black ${message.read ? 'border-slate-200 bg-slate-50 text-slate-500' : 'border-emerald-200 bg-emerald-50 text-emerald-700'}`}>
                  {message.read ? 'READ' : 'NEW'}
                </span>
              </div>

              <div className="mt-5 grid gap-3 text-sm font-bold text-slate-600">
                <a className="flex min-w-0 items-center gap-2 rounded-2xl bg-slate-50 p-3 transition hover:bg-emerald-50 hover:text-emerald-700" href={`mailto:${message.email}`}>
                  <Mail className="h-4 w-4 shrink-0" />
                  <span className="truncate">{message.email}</span>
                </a>
                <a className="flex min-w-0 items-center gap-2 rounded-2xl bg-slate-50 p-3 transition hover:bg-emerald-50 hover:text-emerald-700" href={`tel:${message.phone}`}>
                  <Phone className="h-4 w-4 shrink-0" />
                  <span className="truncate">{message.phone}</span>
                </a>
              </div>

              <p className="break-safe mt-5 rounded-2xl bg-slate-50 p-4 text-sm font-bold leading-7 text-slate-700">{message.message}</p>

              {!message.read && (
                <button className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 text-sm font-black text-white transition hover:bg-emerald-700 disabled:opacity-60" disabled={isUpdatingId === message.id} type="button" onClick={() => handleMarkRead(message.id)}>
                  <CheckCircle2 className="h-4 w-4" />
                  {isUpdatingId === message.id ? 'Updating...' : 'Mark as read'}
                </button>
              )}
            </article>
          ))}
        </section>
      )}
    </div>
  )
}

function Stat({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
      <p className="text-3xl font-black text-white">{value}</p>
      <p className="mt-1 text-sm font-bold text-white/58">{label}</p>
    </div>
  )
}

export default AdminContactMessagesPage
