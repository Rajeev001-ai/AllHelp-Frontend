import { motion } from 'framer-motion'
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Headphones,
  Hammer,
  MapPin,
  Paintbrush,
  PlugZap,
  ShieldCheck,
  Snowflake,
  Sparkles,
  Star,
  Users,
  WalletCards,
  Wrench,
} from 'lucide-react'
import heroImage from '../../assets/allhelp-hero.png'
import AnimatedCounter from './AnimatedCounter'
import SectionHeader from './SectionHeader'

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0 },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const heroStats = [
  { value: '10,000+', label: 'Jobs Completed' },
  { value: '500+', label: 'Verified Workers' },
  { value: '98%', label: 'Customer Satisfaction' },
]

const trustBadges = [
  { title: 'Verified Professionals', icon: BadgeCheck, copy: 'Profiles, skills, city, rating, and work history stay visible.' },
  { title: 'Admin Managed Assignments', icon: ShieldCheck, copy: 'Every request is reviewed before a worker is assigned.' },
  { title: 'Trusted Community', icon: Users, copy: 'Customers and workers both grow through reviews and accountability.' },
  { title: 'Fast Support', icon: Headphones, copy: 'The platform keeps service movement clear from request to completion.' },
]

const audienceCards = [
  {
    label: 'For Customers',
    title: 'Book trusted help without calling ten people.',
    copy: 'Send one clear request and let AllHelp match you with a verified professional.',
    accent: 'from-emerald-300 to-cyan-300',
    points: ['Find trusted workers', 'Easy booking', 'Verified professionals', 'Transparent process'],
  },
  {
    label: 'For Workers',
    title: 'Turn your skill into consistent local income.',
    copy: 'Create your profile, receive assigned jobs, complete quality work, and build reputation.',
    accent: 'from-amber-300 to-rose-300',
    points: ['Get more jobs', 'Increase earnings', 'Flexible work schedule', 'Grow your reputation'],
  },
]

const services = [
  { title: 'Electrician', icon: PlugZap, color: 'from-amber-400 to-orange-500', copy: 'Switches, wiring, lights, urgent repairs.' },
  { title: 'Plumber', icon: Wrench, color: 'from-sky-400 to-cyan-500', copy: 'Leaks, taps, pipes, bathroom and kitchen work.' },
  { title: 'Painter', icon: Paintbrush, color: 'from-fuchsia-400 to-rose-500', copy: 'Wall refresh, room painting, finishing work.' },
  { title: 'Cleaner', icon: Sparkles, color: 'from-emerald-400 to-teal-500', copy: 'Deep cleaning, move-in cleaning, home care.' },
  { title: 'Carpenter', icon: Hammer, color: 'from-yellow-500 to-stone-500', copy: 'Furniture, doors, fittings, custom repairs.' },
  { title: 'AC Repair', icon: Snowflake, color: 'from-indigo-400 to-blue-500', copy: 'Servicing, cooling checks, gas refill, repair.' },
]

const workerStories = [
  { name: 'Rohit Verma', role: 'Electrician', quote: 'Earlier I struggled to find work. Now I receive regular jobs every week.', growth: '+42% monthly income' },
  { name: 'Sameer Khan', role: 'AC Technician', quote: 'AllHelp sends clear job details, location, and timing before I accept work.', growth: '18 jobs this month' },
  { name: 'Pooja Mehta', role: 'Cleaner', quote: 'My profile and reviews help customers trust me before I reach their home.', growth: '4.9 worker rating' },
]

const customerReviews = [
  { name: 'Ananya Sharma', role: 'Homeowner', quote: 'I booked a plumber in minutes and could see the request status the whole time.' },
  { name: 'Meera Kapoor', role: 'Customer', quote: 'The admin assignment made the experience feel controlled and trustworthy.' },
  { name: 'Arjun Nair', role: 'Office Manager', quote: 'We needed quick cleaning support and AllHelp made the process simple.' },
]

const whyChoose = [
  { title: 'Trusted Workers', icon: BadgeCheck },
  { title: 'Admin Managed Quality', icon: ShieldCheck },
  { title: 'Fast Assignment', icon: Clock3 },
  { title: 'Secure Platform', icon: WalletCards },
  { title: 'Real Reviews', icon: Star },
  { title: 'Easy Process', icon: CheckCircle2 },
]

const platformStats = [
  { value: 500, suffix: '+', label: 'Workers', icon: BriefcaseBusiness },
  { value: 2400, suffix: '+', label: 'Customers', icon: Users },
  { value: 10000, suffix: '+', label: 'Completed Jobs', icon: CheckCircle2 },
  { value: 24, suffix: '+', label: 'Cities Served', icon: MapPin },
]

function PremiumLanding({ onLoginClick, onRegisterClick }) {
  return (
    <div className="min-h-screen overflow-hidden bg-[#070914] text-white">
      <Navigation onLoginClick={onLoginClick} onRegisterClick={onRegisterClick} />
      <main>
        <HeroSection onRegisterClick={onRegisterClick} />
        <TrustSection />
        <DualAudienceSection />
        <PopularServicesSection />
        <WorkerStoriesSection />
        <CustomerTestimonialsSection />
        <WhyChooseSection />
        <StatisticsSection />
        <FinalCta onRegisterClick={onRegisterClick} />
      </main>
      <PremiumFooter />
    </div>
  )
}

function Navigation({ onLoginClick, onRegisterClick }) {
  return (
    <motion.header
      animate={{ y: 0, opacity: 1 }}
      className="fixed left-0 right-0 top-0 z-40 px-3 pt-3 sm:px-4 sm:pt-4"
      initial={{ y: -18, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-lg border border-white/12 bg-[#08111f]/78 px-4 py-3 shadow-2xl shadow-black/20 backdrop-blur-2xl md:px-6">
        <a className="flex items-center gap-3" href="#top" aria-label="AllHelp home">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-emerald-300 via-cyan-300 to-sky-300 text-lg font-black text-slate-950 shadow-lg shadow-emerald-500/20">
            A
          </span>
          <span className="text-lg font-black">AllHelp</span>
        </a>
        <div className="hidden items-center gap-7 text-sm font-bold text-white/70 lg:flex">
          <a className="transition hover:text-white" href="#customers-workers">Customers & Workers</a>
          <a className="transition hover:text-white" href="#services">Services</a>
          <a className="transition hover:text-white" href="#trust">Trust</a>
          <a className="transition hover:text-white" href="#stories">Stories</a>
        </div>
        <div className="flex items-center gap-2">
          <button className="hidden rounded-lg px-4 py-2 text-sm font-extrabold text-white/78 transition hover:bg-white/10 hover:text-white sm:inline-flex" type="button" onClick={onLoginClick}>
            Login
          </button>
          <button className="shimmer-button rounded-lg bg-white px-4 py-2 text-sm font-black text-slate-950 shadow-xl shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:bg-emerald-100 sm:px-5" type="button" onClick={onRegisterClick}>
            Get started
          </button>
        </div>
      </nav>
    </motion.header>
  )
}

function HeroSection({ onRegisterClick }) {
  return (
    <section className="relative isolate px-4 pb-20 pt-32 sm:pt-36 lg:min-h-screen" id="top">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,#070914_0%,#0d1727_38%,#092a29_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:48px_48px] opacity-35" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-36 bg-gradient-to-b from-transparent to-[#f7fafc]" />

      <div className="mx-auto grid max-w-7xl items-start gap-12 lg:grid-cols-[0.95fr_1.05fr] xl:grid-cols-[0.9fr_1.1fr]">
        <motion.div animate="show" className="relative z-10" initial="hidden" variants={stagger}>
          <motion.div className="mb-6 inline-flex max-w-full items-center gap-2 rounded-lg border border-white/12 bg-white/10 px-4 py-2 text-sm font-extrabold text-emerald-100 shadow-lg shadow-black/10 backdrop-blur-xl" variants={fadeUp}>
            <Sparkles className="h-4 w-4 shrink-0 text-emerald-300" />
            Two-sided worker marketplace for trusted local services
          </motion.div>
          <motion.h1 className="max-w-5xl text-5xl font-black leading-[1.02] text-white sm:text-6xl lg:text-7xl xl:text-8xl" variants={fadeUp}>
            Hire Trusted Workers.
            <span className="block bg-gradient-to-r from-emerald-200 via-cyan-200 to-sky-200 bg-clip-text text-transparent">Build Your Income.</span>
          </motion.h1>
          <motion.p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl" variants={fadeUp}>
            Connect customers with skilled professionals through one trusted platform.
          </motion.p>
          <motion.div className="mt-9 flex flex-col gap-3 sm:flex-row" variants={fadeUp}>
            <button className="shimmer-button group inline-flex min-h-14 items-center justify-center rounded-lg bg-gradient-to-r from-emerald-300 via-cyan-300 to-sky-300 px-7 text-base font-black text-slate-950 shadow-2xl shadow-emerald-500/25 transition hover:-translate-y-1" type="button" onClick={onRegisterClick}>
              Hire a Worker
              <ArrowRight className="ml-2 h-5 w-5 transition group-hover:translate-x-1" />
            </button>
            <button className="inline-flex min-h-14 items-center justify-center rounded-lg border border-white/14 bg-white/10 px-7 text-base font-black text-white shadow-xl shadow-black/10 backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/15" type="button" onClick={onRegisterClick}>
              Become a Worker
              <BriefcaseBusiness className="ml-2 h-5 w-5" />
            </button>
          </motion.div>
          <motion.div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3" variants={fadeUp}>
            {heroStats.map((stat) => (
              <motion.div className="rounded-lg border border-white/12 bg-white/8 p-4 backdrop-blur-xl" key={stat.label} whileHover={{ y: -5 }}>
                <p className="text-3xl font-black text-white">{stat.value}</p>
                <p className="mt-2 text-sm font-bold text-white/58">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <HeroMarketplaceVisual />
      </div>
    </section>
  )
}

function HeroMarketplaceVisual() {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="relative z-10 mx-auto w-full max-w-2xl lg:mt-16 xl:max-w-3xl"
      initial={{ opacity: 0, y: 34, scale: 0.96 }}
      transition={{ duration: 0.7, delay: 0.15 }}
    >
      <div className="absolute -inset-5 rounded-lg bg-gradient-to-br from-emerald-300/22 via-cyan-300/12 to-sky-400/20 blur-2xl" />
      <div className="glass-panel relative overflow-hidden rounded-lg p-3 sm:p-4">
        <motion.div
          className="relative overflow-hidden rounded-lg border border-white/14 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 shadow-2xl shadow-emerald-950/30"
          transition={{ type: 'spring', stiffness: 180, damping: 18 }}
          whileHover={{ y: -6, scale: 1.01 }}
        >
          <img className="block w-full opacity-95" src={heroImage} alt="Verified worker helping a customer through AllHelp" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/72 via-slate-950/10 to-slate-950/18" />
          <motion.div
            animate={{ y: [0, -7, 0] }}
            className="absolute bottom-4 right-4 rounded-lg border border-white/18 bg-white/14 p-4 shadow-2xl shadow-black/25 backdrop-blur-2xl"
            transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="flex items-center gap-2 text-amber-300">
              <Star className="h-5 w-5 fill-current" />
              <span className="text-lg font-black text-white">4.9 Rating</span>
            </div>
            <p className="mt-2 text-sm font-black text-emerald-200">500+ Jobs Completed</p>
          </motion.div>
        </motion.div>
      </div>
      <motion.div
        className="mt-4 grid gap-3 sm:grid-cols-3"
        initial={{ opacity: 0, y: 18 }}
        transition={{ delay: 0.45, duration: 0.55 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {[
          { label: 'Admin managed', value: 'Quality control' },
          { label: 'Worker side', value: 'Earn weekly' },
          { label: 'Customer side', value: 'Book faster' },
        ].map((item) => (
          <div className="rounded-lg border border-white/12 bg-white/8 p-4 shadow-xl shadow-black/10 backdrop-blur-xl" key={item.label}>
            <p className="text-xs font-black text-emerald-200">{item.label}</p>
            <p className="mt-1 text-sm font-black text-white">{item.value}</p>
          </div>
        ))}
      </motion.div>
    </motion.div>
  )
}

function TrustSection() {
  return (
    <section className="bg-[#f7fafc] px-4 py-20">
      <motion.div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-4" initial="hidden" variants={stagger} viewport={{ once: true, amount: 0.2 }} whileInView="show">
        {trustBadges.map((item) => {
          const Icon = item.icon
          return (
            <motion.article className="group rounded-lg border border-slate-200 bg-white/85 p-5 shadow-xl shadow-slate-200/60 backdrop-blur-xl transition hover:-translate-y-2" key={item.title} variants={fadeUp}>
              <div className="mb-5 grid h-12 w-12 place-items-center rounded-lg bg-slate-950 text-emerald-300 transition group-hover:scale-105">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-black text-slate-950">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.copy}</p>
            </motion.article>
          )
        })}
      </motion.div>
    </section>
  )
}

function DualAudienceSection() {
  return (
    <section className="bg-[#f7fafc] px-4 py-24" id="customers-workers">
      <SectionHeader
        copy="AllHelp wins only when both sides win: customers get confidence, workers get opportunity."
        eyebrow="Two audiences, one platform"
        title="Built for the people hiring and the people earning."
      />
      <div className="mx-auto mt-14 grid max-w-7xl gap-5 lg:grid-cols-2">
        {audienceCards.map((card) => (
          <motion.article className="group relative overflow-hidden rounded-lg border border-slate-200 bg-white p-8 shadow-2xl shadow-slate-200/70" initial={{ opacity: 0, y: 26 }} key={card.label} viewport={{ once: true, amount: 0.25 }} whileHover={{ y: -8 }} whileInView={{ opacity: 1, y: 0 }}>
            <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${card.accent}`} />
            <p className="text-sm font-black text-emerald-700">{card.label}</p>
            <h3 className="mt-4 text-3xl font-black leading-tight text-slate-950 sm:text-4xl">{card.title}</h3>
            <p className="mt-4 max-w-xl leading-7 text-slate-600">{card.copy}</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {card.points.map((point) => (
                <div className="flex items-center gap-3 rounded-lg bg-slate-50 p-4 font-bold text-slate-800" key={point}>
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
                  {point}
                </div>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

function PopularServicesSection() {
  return (
    <section className="bg-[#f7fafc] px-4 py-24" id="services">
      <SectionHeader
        copy="Popular categories are designed for fast request creation and better admin assignment."
        eyebrow="Popular services"
        title="High-demand local work, organized beautifully."
      />
      <motion.div className="mx-auto mt-14 grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-3" initial="hidden" variants={stagger} viewport={{ once: true, amount: 0.2 }} whileInView="show">
        {services.map((service) => {
          const Icon = service.icon
          return (
            <motion.article className="group rounded-lg border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 transition hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-900/10" key={service.title} variants={fadeUp}>
              <div className={`mb-7 grid h-14 w-14 place-items-center rounded-lg bg-gradient-to-br ${service.color} text-white shadow-lg transition group-hover:scale-105`}>
                <Icon className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-black text-slate-950">{service.title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{service.copy}</p>
              <div className="mt-7 inline-flex items-center text-sm font-black text-emerald-700">
                Explore service
                <ChevronRight className="ml-1 h-4 w-4 transition group-hover:translate-x-1" />
              </div>
            </motion.article>
          )
        })}
      </motion.div>
    </section>
  )
}

function WorkerStoriesSection() {
  return (
    <section className="bg-[#f7fafc] px-4 pb-24" id="stories">
      <div className="mx-auto max-w-7xl rounded-lg bg-gradient-to-br from-slate-950 via-[#111a2a] to-emerald-950 p-5 shadow-2xl shadow-slate-300/70 sm:p-8">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
          <div>
            <p className="text-sm font-black text-emerald-300">Worker success stories</p>
            <h2 className="mt-4 text-4xl font-black leading-tight text-white sm:text-5xl">Real skills deserve a real pipeline of work.</h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              Give workers a place to build reputation, receive assigned jobs, and grow with every completed service.
            </p>
          </div>
          <div className="grid gap-4">
            {workerStories.map((story) => (
              <motion.article className="rounded-lg border border-white/10 bg-white/8 p-5 backdrop-blur-xl" initial={{ opacity: 0, x: 24 }} key={story.name} viewport={{ once: true }} whileHover={{ x: 6 }} whileInView={{ opacity: 1, x: 0 }}>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-lg font-black text-white">{story.name}</p>
                    <p className="text-sm font-bold text-emerald-200">{story.role}</p>
                  </div>
                  <span className="rounded-lg bg-emerald-300 px-3 py-1 text-sm font-black text-slate-950">{story.growth}</span>
                </div>
                <p className="mt-4 text-lg font-bold leading-8 text-slate-200">"{story.quote}"</p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function CustomerTestimonialsSection() {
  const loop = [...customerReviews, ...customerReviews]

  return (
    <section className="overflow-hidden bg-white py-24" id="reviews">
      <div className="px-4">
        <SectionHeader
          copy="Trust is built through visible progress, verified workers, and real reviews."
          eyebrow="Customer testimonials"
          title="Customers feel guided from request to completion."
        />
      </div>
      <div className="mt-14 flex w-max gap-5 testimonial-track">
        {loop.map((item, index) => (
          <article className="w-[330px] rounded-lg border border-slate-200 bg-[#f8fafc] p-6 shadow-xl shadow-slate-200/60 sm:w-[410px]" key={`${item.name}-${index}`}>
            <div className="mb-6 flex gap-1 text-amber-400">
              {Array.from({ length: 5 }).map((_, starIndex) => (
                <Star className="h-5 w-5 fill-current" key={starIndex} />
              ))}
            </div>
            <p className="text-lg font-bold leading-8 text-slate-800">"{item.quote}"</p>
            <div className="mt-8 flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-lg bg-gradient-to-br from-emerald-300 to-cyan-300 font-black text-slate-950">
                {item.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-black text-slate-950">{item.name}</h3>
                <p className="text-sm font-bold text-slate-500">{item.role}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function WhyChooseSection() {
  return (
    <section className="bg-[#f7fafc] px-4 py-24" id="trust">
      <SectionHeader
        copy="A marketplace cannot feel premium unless operations, quality, and trust are designed into the platform."
        eyebrow="Why choose us"
        title="Everything needed to make local work feel reliable."
      />
      <div className="mx-auto mt-14 grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {whyChoose.map((item, index) => {
          const Icon = item.icon
          return (
            <motion.div className="rounded-lg border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60" initial={{ opacity: 0, y: 24 }} key={item.title} transition={{ delay: index * 0.05 }} viewport={{ once: true }} whileHover={{ y: -7 }} whileInView={{ opacity: 1, y: 0 }}>
              <div className="mb-6 grid h-12 w-12 place-items-center rounded-lg bg-slate-950 text-emerald-300">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-black text-slate-950">{item.title}</h3>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

function StatisticsSection() {
  return (
    <section className="bg-white px-4 pb-24">
      <div className="mx-auto grid max-w-7xl gap-4 rounded-lg bg-gradient-to-br from-slate-950 via-[#111827] to-emerald-950 p-4 shadow-2xl shadow-slate-300/70 sm:grid-cols-2 lg:grid-cols-4">
        {platformStats.map((stat) => {
          const Icon = stat.icon
          return (
            <motion.div className="rounded-lg border border-white/10 bg-white/8 p-6 backdrop-blur-xl" initial={{ opacity: 0, y: 24 }} key={stat.label} viewport={{ once: true }} whileHover={{ y: -6 }} whileInView={{ opacity: 1, y: 0 }}>
              <Icon className="mb-8 h-7 w-7 text-emerald-300" />
              <div className="text-4xl font-black text-white">
                <AnimatedCounter suffix={stat.suffix} value={stat.value} />
              </div>
              <p className="mt-2 font-bold text-white/62">{stat.label}</p>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

function FinalCta({ onRegisterClick }) {
  return (
    <section className="relative bg-[#070914] px-4 py-24 text-center sm:py-32">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(16,185,129,0.16),transparent_36%),linear-gradient(315deg,rgba(14,165,233,0.16),transparent_34%)]" />
      <motion.div className="relative mx-auto max-w-4xl" initial={{ opacity: 0, y: 28 }} viewport={{ once: true }} whileInView={{ opacity: 1, y: 0 }}>
        <p className="mb-4 text-sm font-black text-emerald-300">Ready to start?</p>
        <h2 className="text-4xl font-black leading-tight text-white sm:text-6xl">Ready to Hire or Start Earning?</h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          Join the platform designed for customers who want trusted help and workers who want dependable opportunity.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <button className="shimmer-button inline-flex min-h-14 items-center justify-center rounded-lg bg-white px-8 text-base font-black text-slate-950 transition hover:-translate-y-1" type="button" onClick={onRegisterClick}>
            Hire Worker
          </button>
          <button className="inline-flex min-h-14 items-center justify-center rounded-lg border border-white/12 bg-white/10 px-8 text-base font-black text-white backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/15" type="button" onClick={onRegisterClick}>
            Become Worker
          </button>
        </div>
      </motion.div>
    </section>
  )
}

function PremiumFooter() {
  const groups = [
    { title: 'Company', links: ['About', 'Trust', 'Careers'] },
    { title: 'Services', links: ['Electrician', 'Plumber', 'Cleaning'] },
    { title: 'Workers', links: ['Join as worker', 'Worker profile', 'Earnings'] },
    { title: 'Support', links: ['Help center', 'Safety', 'Contact'] },
  ]

  return (
    <footer className="border-t border-white/10 bg-[#070914] px-4 py-12 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_1.8fr]">
        <div>
          <a className="flex items-center gap-3" href="#top" aria-label="AllHelp home">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-white text-lg font-black text-slate-950">A</span>
            <span className="text-lg font-black">AllHelp</span>
          </a>
          <p className="mt-4 max-w-md text-sm leading-6 text-white/58">
            A premium two-sided marketplace for trusted workers, customer requests, admin assignment, and service completion.
          </p>
          <p className="mt-5 text-sm font-bold text-white/45">Contact: support@allhelp.com</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {groups.map((group) => (
            <div key={group.title}>
              <h3 className="font-black text-white">{group.title}</h3>
              <div className="mt-4 grid gap-3 text-sm font-bold text-white/58">
                {group.links.map((link) => (
                  <a className="transition hover:text-white" href="#top" key={link}>{link}</a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default PremiumLanding
