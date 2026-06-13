import { BriefcaseBusiness, CheckCircle2, IndianRupee, LayoutDashboard, UserRound } from 'lucide-react'
import DashboardShell from '../DashboardShell'

const navItems = [
  { label: 'Dashboard', path: '/worker/dashboard', icon: LayoutDashboard, end: true },
  { label: 'Assigned Jobs', path: '/worker/jobs', icon: BriefcaseBusiness },
  { label: 'Completed Jobs', path: '/worker/completed', icon: CheckCircle2 },
  { label: 'Earnings', path: '/worker/earnings', icon: IndianRupee },
  { label: 'Profile', path: '/worker/profile', icon: UserRound },
]

function WorkerDashboardLayout() {
  return (
    <DashboardShell
      navItems={navItems}
      panelLabel="Jobs dashboard"
      productLabel="AllHelp Worker"
    />
  )
}

export default WorkerDashboardLayout
