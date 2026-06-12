import {
  BadgeCheck,
  CheckCircle2,
  Clock3,
  Hammer,
  Headphones,
  Paintbrush,
  PlugZap,
  ShieldCheck,
  Sparkles,
  Snowflake,
  Users,
  WalletCards,
  Wrench,
} from 'lucide-react'

export const services = [
  { title: 'Electrician', icon: PlugZap, color: 'from-amber-400 to-orange-500', copy: 'Wiring, fittings, switches, and urgent repairs.' },
  { title: 'Plumber', icon: Wrench, color: 'from-sky-400 to-cyan-500', copy: 'Leak fixes, pipe work, bathroom and kitchen support.' },
  { title: 'Painter', icon: Paintbrush, color: 'from-fuchsia-400 to-rose-500', copy: 'Room refreshes, wall finishes, and clean paint jobs.' },
  { title: 'Cleaner', icon: Sparkles, color: 'from-emerald-400 to-teal-500', copy: 'Home cleaning, deep cleaning, and move-in care.' },
  { title: 'Carpenter', icon: Hammer, color: 'from-yellow-500 to-stone-500', copy: 'Furniture repair, fittings, doors, and custom work.' },
  { title: 'AC Repair', icon: Snowflake, color: 'from-indigo-400 to-blue-500', copy: 'Cooling checks, servicing, gas refill, and repairs.' },
]

export const steps = [
  { title: 'Request Service', icon: CheckCircle2, copy: 'Customers choose a category, location, preferred time, and job details.' },
  { title: 'Admin Assigns Worker', icon: ShieldCheck, copy: 'Your operations team reviews the request and assigns the best nearby worker.' },
  { title: 'Worker Completes Job', icon: BadgeCheck, copy: 'Verified workers arrive, finish the work, and update the service status.' },
  { title: 'Secure Payment', icon: WalletCards, copy: 'The platform keeps pricing and payment flow clear for both sides.' },
]

export const reasons = [
  { title: 'Verified Workers', icon: BadgeCheck, copy: 'Workers are onboarded with details, skills, area, and availability.' },
  { title: 'Fast Support', icon: Headphones, copy: 'Admin-led assignment keeps early operations responsive and accountable.' },
  { title: 'Trusted Platform', icon: ShieldCheck, copy: 'Every request has a clear owner, worker match, and service trail.' },
  { title: 'Transparent Pricing', icon: WalletCards, copy: 'Customers see clear service intent before workers are assigned.' },
]

export const stats = [
  { value: 500, suffix: '+', label: 'Verified workers', icon: Users },
  { value: 1200, suffix: '+', label: 'Happy customers', icon: BadgeCheck },
  { value: 3200, suffix: '+', label: 'Completed jobs', icon: CheckCircle2 },
  { value: 97, suffix: '%', label: 'Satisfaction rate', icon: Clock3 },
]

export const testimonials = [
  { name: 'Ananya Sharma', role: 'Homeowner', quote: 'AllHelp made it easy to get a reliable electrician without calling ten people.' },
  { name: 'Rohit Verma', role: 'Worker', quote: 'The platform helps me receive nearby jobs and spend less time searching for customers.' },
  { name: 'Meera Kapoor', role: 'Customer', quote: 'The admin assignment flow feels trustworthy. I knew someone was handling my request.' },
  { name: 'Arjun Nair', role: 'Service Partner', quote: 'Clean job details, location matching, and fast assignment make the work smoother.' },
]

export const workerBenefits = [
  'Receive jobs near your service area',
  'Show your skill, experience, and availability',
  'Earn from verified customer requests',
]

export const illustrationItems = [
  { label: 'Request', value: 'Plumbing', tone: 'bg-cyan-400' },
  { label: 'Worker', value: '2.1 km away', tone: 'bg-emerald-400' },
  { label: 'Status', value: 'Assigned', tone: 'bg-amber-400' },
]
