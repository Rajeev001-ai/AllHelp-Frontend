import { motion } from 'framer-motion'
import { BriefcaseBusiness, MapPin, Star, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import ImageUploadArea from '../../components/common/ImageUploadArea'
import { addWorkerPortfolio, deleteWorkerPortfolio, getWorkerPortfolio, getWorkerProfile, getWorkerReviews, updateWorkerProfile, uploadWorkerProfileImage } from '../../services/workerService'
import { getErrorMessage } from '../../utils/authRedirect'
import { formatDateTime } from '../../utils/requestHelpers'
import { availabilityOptions } from '../../utils/workerHelpers'

function WorkerProfilePage() {
  const [form, setForm] = useState({ fullName: '', skills: '', experience: 0, bio: '', city: '', availability: 'OFFLINE' })
  const [portfolioForm, setPortfolioForm] = useState({ title: '', description: '', image: null })
  const [profile, setProfile] = useState(null)
  const [portfolio, setPortfolio] = useState([])
  const [reviews, setReviews] = useState([])
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(async () => {
      try {
        const [profileData, reviewData, portfolioData] = await Promise.all([getWorkerProfile(), getWorkerReviews(), getWorkerPortfolio()])
        setProfile(profileData)
        setReviews(reviewData)
        setPortfolio(portfolioData)
        setForm({ fullName: profileData.user?.fullName || '', skills: profileData.skills || '', experience: profileData.experience || 0, bio: profileData.bio || '', city: profileData.city || '', availability: profileData.availability || 'OFFLINE' })
      } catch (requestError) {
        setError(getErrorMessage(requestError))
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
      const updated = await updateWorkerProfile({ ...form, experience: Number(form.experience) })
      setProfile(updated)
      setMessage('Profile updated successfully')
    } catch (requestError) {
      setError(getErrorMessage(requestError))
    }
  }

  const uploadProfileImage = async (file) => {
    setIsUploading(true)
    try {
      setProfile(await uploadWorkerProfileImage(file))
    } catch (requestError) {
      setError(getErrorMessage(requestError))
    } finally {
      setIsUploading(false)
    }
  }

  const addPortfolio = async (event) => {
    event.preventDefault()
    if (!portfolioForm.image) {
      setError('Portfolio image is required')
      return
    }
    setIsUploading(true)
    setError('')
    try {
      const item = await addWorkerPortfolio(portfolioForm)
      setPortfolio((current) => [item, ...current])
      setPortfolioForm({ title: '', description: '', image: null })
    } catch (requestError) {
      setError(getErrorMessage(requestError))
    } finally {
      setIsUploading(false)
    }
  }

  const removePortfolio = async (id) => {
    await deleteWorkerPortfolio(id)
    setPortfolio((current) => current.filter((item) => item.id !== id))
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <section className="rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl shadow-black/20 backdrop-blur-2xl lg:p-8">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-emerald-200">Profile</p>
        <h1 className="break-safe mt-4 text-3xl font-black tracking-tight sm:text-5xl">Build trust before every booking.</h1>
      </section>

      {error && <div className="rounded-2xl bg-rose-500/10 p-4 font-bold text-rose-100">{error}</div>}
      {message && <div className="rounded-2xl bg-emerald-500/10 p-4 font-bold text-emerald-100">{message}</div>}

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <aside className="rounded-[2rem] bg-white p-6 text-slate-950 shadow-2xl shadow-black/10">
          <ImageUploadArea isUploading={isUploading} label="Upload profile picture" preview={profile?.user?.profilePicture} onUpload={uploadProfileImage} />
          <h2 className="break-safe mt-6 text-3xl font-black">{profile?.user?.fullName || 'Worker'}</h2>
          <p className="break-safe mt-2 font-bold text-slate-500">{profile?.skills || 'Skills not added yet'}</p>
          <div className="mt-6 grid gap-3">
            <Stat icon={Star} label="Rating" value={profile?.rating || '0.00'} />
            <Stat icon={BriefcaseBusiness} label="Completed jobs" value={profile?.completedJobs || 0} />
            <Stat icon={MapPin} label="City" value={profile?.city || 'No city'} />
          </div>
        </aside>

        <form className="rounded-[2rem] bg-white p-6 text-slate-950 shadow-2xl shadow-black/10" onSubmit={submit}>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Full Name"><input className="field-input pl-4" name="fullName" value={form.fullName} onChange={update} /></Field>
            <Field label="Skills"><input className="field-input pl-4" name="skills" value={form.skills} onChange={update} /></Field>
            <Field label="Experience"><input className="field-input pl-4" min="0" name="experience" type="number" value={form.experience} onChange={update} /></Field>
            <Field label="City"><input className="field-input pl-4" name="city" value={form.city} onChange={update} /></Field>
            <Field label="Availability"><select className="field-input pl-4" name="availability" value={form.availability} onChange={update}>{availabilityOptions.map((item) => <option key={item} value={item}>{item}</option>)}</select></Field>
            <div className="md:col-span-2"><Field label="Bio"><textarea className="field-input min-h-32 py-3 pl-4" name="bio" value={form.bio} onChange={update} /></Field></div>
          </div>
          <button className="mt-6 min-h-12 w-full rounded-full bg-slate-950 font-black text-white" type="submit">Save profile</button>
        </form>
      </div>

      <section className="rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl shadow-black/20 backdrop-blur-2xl">
        <h2 className="text-3xl font-black">Portfolio gallery</h2>
        <form className="mt-5 grid gap-4 rounded-[1.5rem] bg-white p-5 text-slate-950 lg:grid-cols-[280px_1fr]" onSubmit={addPortfolio}>
          <ImageUploadArea compact isUploading={isUploading} label="Upload work image" onUpload={(image) => setPortfolioForm((current) => ({ ...current, image }))} />
          <div className="grid gap-3">
            <input className="field-input pl-4" placeholder="Project title" value={portfolioForm.title} onChange={(event) => setPortfolioForm((current) => ({ ...current, title: event.target.value }))} />
            <textarea className="field-input min-h-24 py-3 pl-4" placeholder="Short description" value={portfolioForm.description} onChange={(event) => setPortfolioForm((current) => ({ ...current, description: event.target.value }))} />
            <button className="min-h-11 rounded-full bg-slate-950 font-black text-white disabled:opacity-50" disabled={isUploading} type="submit">{isUploading ? 'Uploading...' : 'Add portfolio item'}</button>
          </div>
        </form>

        {portfolio.length === 0 ? (
          <p className="mt-5 rounded-[1.5rem] bg-white/10 p-6 text-center font-bold text-white/60">No portfolio images yet.</p>
        ) : (
          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {portfolio.map((item) => (
              <motion.article animate={{ opacity: 1, y: 0 }} className="overflow-hidden rounded-[1.5rem] bg-white text-slate-950 shadow-2xl shadow-black/10" initial={{ opacity: 0, y: 16 }} key={item.id}>
                <img alt={item.title || 'Portfolio'} className="h-52 w-full object-cover" src={item.imageUrl} />
                <div className="p-4">
                  <h3 className="text-xl font-black">{item.title || 'Work sample'}</h3>
                  <p className="mt-2 text-sm font-bold text-slate-500">{item.description || 'No description added.'}</p>
                  <p className="mt-3 text-xs font-black uppercase tracking-[0.14em] text-slate-400">{formatDateTime(item.createdAt)}</p>
                  <button className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-full bg-rose-50 px-4 text-sm font-black text-rose-700" type="button" onClick={() => removePortfolio(item.id)}><Trash2 className="h-4 w-4" />Delete</button>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl shadow-black/20 backdrop-blur-2xl">
        <h2 className="text-3xl font-black">Customer reviews</h2>
        {reviews.length === 0 ? <p className="mt-4 font-bold text-white/60">No reviews yet.</p> : (
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {reviews.map((review) => (
              <article className="rounded-[1.5rem] bg-white p-5 text-slate-950" key={review.id}>
                <div className="flex gap-1 text-amber-400">{Array.from({ length: 5 }).map((_, index) => <Star className={`h-4 w-4 ${index < review.rating ? 'fill-amber-400' : 'text-slate-300'}`} key={index} />)}</div>
                <p className="mt-3 font-bold text-slate-700">{review.comment || 'No comment added.'}</p>
                <p className="mt-3 text-xs font-black uppercase tracking-[0.14em] text-slate-400">{review.user.fullName} · {formatDateTime(review.createdAt)}</p>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

function Stat({ icon: Icon, label, value }) {
  return <div className="rounded-2xl bg-slate-100 p-4"><p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-slate-400"><Icon className="h-4 w-4 shrink-0" />{label}</p><p className="break-safe mt-2 text-xl font-black">{value}</p></div>
}

function Field({ children, label }) {
  return <label className="grid gap-2 text-sm font-black text-slate-700">{label}{children}</label>
}

export default WorkerProfilePage
