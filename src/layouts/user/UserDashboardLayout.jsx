import { CheckCircle2, ClipboardList, Home, PlusCircle, UserRound } from 'lucide-react'
import DashboardShell from '../DashboardShell'

const navItems = [
  { label: 'Dashboard', path: '/user/dashboard', icon: Home, end: true },
  { label: 'Create Request', path: '/user/requests/create', icon: PlusCircle, end: true },
  { label: 'My Requests', path: '/user/requests', icon: ClipboardList, end: true },
  { label: 'Completed', path: '/user/completed', icon: CheckCircle2, end: true },
  { label: 'Profile', path: '/user/profile', icon: UserRound, end: true },
]

function UserDashboardLayout() {
  return (
    <DashboardShell
      animateOutlet
      navItems={navItems}
      panelLabel="Customer dashboard"
      productLabel="AllHelp"
    />
  )
}

export default UserDashboardLayout
