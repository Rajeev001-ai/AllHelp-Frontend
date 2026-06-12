import { motion } from 'framer-motion'
import { BriefcaseBusiness, LockKeyhole, Mail, Phone, User } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthField from '../components/auth/AuthField'
import AuthStatus from '../components/auth/AuthStatus'
import AuthSubmitButton from '../components/auth/AuthSubmitButton'
import { useAuth } from '../hooks/useAuth'
import AuthShell from '../layouts/AuthShell'
import { getDashboardPath, getErrorMessage } from '../utils/authRedirect'

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  role: 'USER',
}

function RegisterPage() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState({ type: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const updateForm = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus({ type: '', message: '' })

    if (form.password !== form.confirmPassword) {
      setStatus({ type: 'error', message: 'Password and confirm password do not match' })
      return
    }

    setIsSubmitting(true)

    try {
      const { confirmPassword, ...payload } = form
      void confirmPassword
      const response = await register(payload)
      navigate(getDashboardPath(response.role), { replace: true })
    } catch (error) {
      setStatus({ type: 'error', message: getErrorMessage(error) })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthShell
      copy="Create an account to hire reliable local help or start receiving work opportunities as a skilled worker."
      eyebrow="Join AllHelp"
      title="Get started with trusted local services."
    >
      <motion.form
        animate={{ opacity: 1, x: 0 }}
        className="space-y-5"
        initial={{ opacity: 0, x: 18 }}
        onSubmit={handleSubmit}
      >
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-600">Register</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">Choose how you want to use AllHelp</h2>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <RoleCard
            checked={form.role === 'USER'}
            description="Hire verified workers for home services"
            icon={User}
            label="Customer"
            onChange={updateForm}
            value="USER"
          />
          <RoleCard
            checked={form.role === 'WORKER'}
            description="Find nearby work and earn from your skill"
            icon={BriefcaseBusiness}
            label="Worker"
            onChange={updateForm}
            value="WORKER"
          />
        </div>

        <AuthStatus status={status} />

        <div className="grid gap-4 sm:grid-cols-2">
          <AuthField icon={User} label="Full name" name="fullName" onChange={updateForm} required value={form.fullName} />
          <AuthField icon={Mail} label="Email" name="email" onChange={updateForm} required type="email" value={form.email} />
          <AuthField icon={Phone} label="Phone" name="phone" onChange={updateForm} required value={form.phone} />
          <AuthField
            icon={LockKeyhole}
            label="Password"
            name="password"
            onChange={updateForm}
            onTogglePassword={() => setShowPassword((current) => !current)}
            required
            showPassword={showPassword}
            toggleable
            type={showPassword ? 'text' : 'password'}
            value={form.password}
          />
          <div className="sm:col-span-2">
            <AuthField
              icon={LockKeyhole}
              label="Confirm password"
              name="confirmPassword"
              onChange={updateForm}
              onTogglePassword={() => setShowConfirmPassword((current) => !current)}
              required
              showPassword={showConfirmPassword}
              toggleable
              type={showConfirmPassword ? 'text' : 'password'}
              value={form.confirmPassword}
            />
          </div>
        </div>

        <AuthSubmitButton disabled={isSubmitting}>
          {isSubmitting ? 'Creating account...' : `Create ${form.role === 'WORKER' ? 'worker' : 'customer'} account`}
        </AuthSubmitButton>

        <p className="text-center text-sm font-bold text-slate-500">
          Already have an account?{' '}
          <Link className="font-black text-emerald-700 hover:text-emerald-900" to="/login">
            Login
          </Link>
        </p>
      </motion.form>
    </AuthShell>
  )
}

function RoleCard({ checked, description, icon: Icon, label, onChange, value }) {
  return (
    <label className="group cursor-pointer">
      <input checked={checked} className="peer sr-only" name="role" onChange={onChange} type="radio" value={value} />
      <span className="flex min-h-28 items-start gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-4 transition peer-checked:border-emerald-400 peer-checked:bg-emerald-50 peer-checked:shadow-xl peer-checked:shadow-emerald-100 group-hover:-translate-y-1 group-hover:border-emerald-200">
        <span className="grid h-12 w-12 flex-none place-items-center rounded-2xl bg-white text-emerald-700 shadow-lg">
          <Icon className="h-6 w-6" />
        </span>
        <span>
          <strong className="block text-lg font-black text-slate-950">{label}</strong>
          <span className="mt-1 block text-sm font-semibold leading-6 text-slate-500">{description}</span>
        </span>
      </span>
    </label>
  )
}

export default RegisterPage
