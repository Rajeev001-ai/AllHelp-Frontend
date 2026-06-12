import { ArrowRight } from 'lucide-react'

function AuthSubmitButton({ children, disabled }) {
  return (
    <button
      className="shimmer-button group inline-flex min-h-14 w-full items-center justify-center rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 px-7 text-base font-black text-slate-950 shadow-2xl shadow-emerald-500/20 transition hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-60"
      disabled={disabled}
      type="submit"
    >
      {children}
      <ArrowRight className="ml-2 h-5 w-5 transition group-hover:translate-x-1" />
    </button>
  )
}

export default AuthSubmitButton
