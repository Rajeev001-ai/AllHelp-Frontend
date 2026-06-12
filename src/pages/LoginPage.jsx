import { motion } from 'framer-motion'
import { LockKeyhole, Mail } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthField from '../components/auth/AuthField'
import AuthStatus from '../components/auth/AuthStatus'
import AuthSubmitButton from '../components/auth/AuthSubmitButton'
import { useAuth } from '../hooks/useAuth'
import AuthShell from '../layouts/AuthShell'
import { getDashboardPath, getErrorMessage } from '../utils/authRedirect'

const initialForm = {
  emailOrUsername: '',
  password: '',
}

function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState({ type: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const updateForm = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    setStatus({ type: '', message: '' })

    try {
      const response = await login(form)
      navigate(getDashboardPath(response.role), { replace: true })
    } catch (error) {
      setStatus({ type: 'error', message: getErrorMessage(error) })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthShell
      copy="Sign in to request trusted help, manage your service work, or coordinate assignments."
      eyebrow="Secure login"
      title="Welcome back to AllHelp."
    >
      <motion.form
        animate={{ opacity: 1, x: 0 }}
        className="space-y-5"
        initial={{ opacity: 0, x: 18 }}
        onSubmit={handleSubmit}
      >
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-600">Login</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">Continue to your account</h2>
        </div>

        <AuthStatus status={status} />

        <div className="grid gap-4">
          <AuthField
            icon={Mail}
            label="Email or admin username"
            name="emailOrUsername"
            onChange={updateForm}
            required
            value={form.emailOrUsername}
          />
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
        </div>

        <AuthSubmitButton disabled={isSubmitting}>{isSubmitting ? 'Logging in...' : 'Login'}</AuthSubmitButton>

        <p className="text-center text-sm font-bold text-slate-500">
          New to AllHelp?{' '}
          <Link className="font-black text-emerald-700 hover:text-emerald-900" to="/register">
            Create an account
          </Link>
        </p>
      </motion.form>
    </AuthShell>
  )
}

export default LoginPage
