import { motion } from 'framer-motion'
import { Mail, MapPin, Phone } from 'lucide-react'
import { useEffect, useState } from 'react'
import ImageUploadArea from '../../components/common/ImageUploadArea'
import { getUserProfile, updateUserProfile, uploadUserProfileImage } from '../../services/userProfileService'
import { getErrorMessage } from '../../utils/authRedirect'

function UserProfilePage() {
  const [profile, setProfile] = useState(null)
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', address: '', city: '' })
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(async () => {
      try {
        const data = await getUserProfile()
        setProfile(data)
        setForm({ fullName: data.fullName || '', email: data.email || '', phone: data.phone || '', address: data.address || '', city: data.city || '' })
      } catch (requestError) {
        setError(getErrorMessage(requestError))
      } finally {
        setIsLoading(false)
      }
    }, 0)
    return () => window.clearTimeout(timer)
  }, [])

  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }))

  const submit = async (event) => {
    event.preventDefault()
    setMessage('')
    setError('')
    try {
      const updated = await updateUserProfile(form)
      setProfile(updated)
      setMessage('Profile updated successfully')
    } catch (requestError) {
      setError(getErrorMessage(requestError))
    }
  }

  const uploadImage = async (file) => {
    setIsUploading(true)
    setError('')
    try {
      setProfile(await uploadUserProfileImage(file))
    } catch (requestError) {
      setError(getErrorMessage(requestError))
    } finally {
      setIsUploading(false)
    }
  }

  if (isLoading) {
    return <div className="h-[520px] animate-pulse rounded-[2rem] bg-white/10" />
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <section className="rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl shadow-black/20 backdrop-blur-2xl lg:p-8">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-emerald-200">Profile</p>
        <h1 className="break-safe mt-4 text-3xl font-black tracking-tight sm:text-5xl">Your AllHelp profile.</h1>
      </section>

      {error && <div className="rounded-2xl bg-rose-500/10 p-4 font-bold text-rose-100">{error}</div>}
      {message && <div className="rounded-2xl bg-emerald-500/10 p-4 font-bold text-emerald-100">{message}</div>}

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <motion.aside animate={{ opacity: 1, y: 0 }} className="rounded-[2rem] bg-white p-6 text-slate-950 shadow-2xl shadow-black/10" initial={{ opacity: 0, y: 18 }}>
          <ImageUploadArea isUploading={isUploading} label="Upload profile picture" preview={profile?.profilePicture} onUpload={uploadImage} />
          <h2 className="break-safe mt-6 text-3xl font-black">{profile?.fullName}</h2>
          <Info icon={Mail} value={profile?.email} />
          <Info icon={Phone} value={profile?.phone} />
          <Info icon={MapPin} value={[profile?.address, profile?.city].filter(Boolean).join(', ') || 'No address added'} />
        </motion.aside>

        <form className="rounded-[2rem] bg-white p-6 text-slate-950 shadow-2xl shadow-black/10" onSubmit={submit}>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Full Name"><input className="field-input pl-4" name="fullName" value={form.fullName} onChange={update} /></Field>
            <Field label="Email"><input className="field-input pl-4" name="email" type="email" value={form.email} onChange={update} /></Field>
            <Field label="Phone"><input className="field-input pl-4" name="phone" value={form.phone} onChange={update} /></Field>
            <Field label="City"><input className="field-input pl-4" name="city" value={form.city} onChange={update} /></Field>
            <div className="md:col-span-2"><Field label="Address"><textarea className="field-input min-h-28 py-3 pl-4" name="address" value={form.address} onChange={update} /></Field></div>
          </div>
          <button className="mt-6 min-h-12 w-full rounded-full bg-slate-950 font-black text-white transition hover:-translate-y-0.5" type="submit">Save profile</button>
        </form>
      </div>
    </div>
  )
}

function Info({ icon: Icon, value }) {
  return <p className="break-safe mt-3 flex items-start gap-2 font-bold text-slate-500"><Icon className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" /><span className="min-w-0">{value}</span></p>
}

function Field({ children, label }) {
  return <label className="grid gap-2 text-sm font-black text-slate-700">{label}{children}</label>
}

export default UserProfilePage
