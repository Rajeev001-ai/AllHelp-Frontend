import { motion } from 'framer-motion'
import { CalendarDays, Clock3, FileText, MapPin, Send, Wrench } from 'lucide-react'
import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import AuthStatus from '../../components/auth/AuthStatus'
import { createServiceRequest } from '../../services/requestService'
import { getErrorMessage } from '../../utils/authRedirect'
import { serviceCategories, urgencyOptions } from '../../utils/requestHelpers'

const initialForm = {
  category: '',
  description: '',
  address: '',
  city: '',
  preferredDate: '',
  preferredTime: '',
  urgency: 'MEDIUM',
}

function CreateRequestPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [form, setForm] = useState({ ...initialForm, category: searchParams.get('category') || '' })
  const [status, setStatus] = useState({ type: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const updateForm = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus({ type: '', message: '' })
    setIsSubmitting(true)

    try {
      await createServiceRequest({
        ...form,
        preferredDate: form.preferredDate || null,
        preferredTime: form.preferredTime || null,
      })
      navigate('/user/requests', { replace: true })
    } catch (error) {
      setStatus({ type: 'error', message: getErrorMessage(error) })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-6">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-emerald-200">Create request</p>
        <h1 className="break-safe mt-3 text-3xl font-black tracking-tight sm:text-5xl">Tell us what help you need.</h1>
        <p className="break-safe mt-4 max-w-2xl leading-8 text-white/68">Share clear details so AllHelp can coordinate the right worker for your service.</p>
      </div>

      <motion.form
        animate={{ opacity: 1, y: 0 }}
        className="rounded-[2rem] border border-white/10 bg-white p-5 text-slate-950 shadow-2xl shadow-black/20 sm:p-7"
        initial={{ opacity: 0, y: 18 }}
        onSubmit={handleSubmit}
      >
        <AuthStatus status={status} />

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <Field label="Service Category" icon={Wrench}>
            <select className="field-input" name="category" onChange={updateForm} required value={form.category}>
              <option value="">Select service</option>
              {serviceCategories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </Field>

          <Field label="Urgency" icon={Clock3}>
            <select className="field-input" name="urgency" onChange={updateForm} value={form.urgency}>
              {urgencyOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </Field>

          <div className="md:col-span-2">
            <Field label="Description" icon={FileText}>
              <textarea
                className="field-input min-h-32 resize-y py-3"
                name="description"
                onChange={updateForm}
                placeholder="Example: Fan is not working, switch board needs checking..."
                required
                value={form.description}
              />
            </Field>
          </div>

          <Field label="Address" icon={MapPin}>
            <input className="field-input" name="address" onChange={updateForm} required value={form.address} />
          </Field>

          <Field label="City" icon={MapPin}>
            <input className="field-input" name="city" onChange={updateForm} value={form.city} />
          </Field>

          <Field label="Preferred Date" icon={CalendarDays}>
            <input className="field-input" name="preferredDate" onChange={updateForm} type="date" value={form.preferredDate} />
          </Field>

          <Field label="Preferred Time" icon={Clock3}>
            <input className="field-input" name="preferredTime" onChange={updateForm} type="time" value={form.preferredTime} />
          </Field>
        </div>

        <button
          className="shimmer-button mt-7 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 px-7 font-black text-slate-950 shadow-2xl shadow-emerald-500/20 transition hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isSubmitting}
          type="submit"
        >
          <Send className="h-5 w-5" />
          {isSubmitting ? 'Sending request...' : 'Send service request'}
        </button>
      </motion.form>
    </div>
  )
}

function Field({ children, icon: Icon, label }) {
  return (
    <label className="grid gap-2 text-sm font-black text-slate-800">
      {label}
      <span className="relative">
        <Icon className="pointer-events-none absolute left-4 top-4 h-5 w-5 text-slate-400" />
        {children}
      </span>
    </label>
  )
}

export default CreateRequestPage
