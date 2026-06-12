import { Eye, EyeOff } from 'lucide-react'

function AuthField({ icon: Icon, label, onTogglePassword, showPassword, toggleable, ...props }) {
  return (
    <label className="grid gap-2 text-sm font-black text-slate-800">
      {label}
      <span className="relative">
        {Icon && <Icon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />}
        <input
          className={`min-h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100 ${
            Icon ? 'pl-12' : 'pl-4'
          } ${toggleable ? 'pr-12' : 'pr-4'}`}
          {...props}
        />
        {toggleable && (
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
            type="button"
            onClick={onTogglePassword}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        )}
      </span>
    </label>
  )
}

export default AuthField
