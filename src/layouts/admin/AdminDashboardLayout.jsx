import { BarChart3, BriefcaseBusiness, CheckCircle2, ClipboardList, GitBranch, LayoutDashboard, MessageSquareText, UsersRound } from 'lucide-react'
import DashboardShell from '../DashboardShell'

const navItems = [
  { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard, end: true },
  { label: 'Requests', path: '/admin/requests', icon: ClipboardList },
  { label: 'Assignments', path: '/admin/assignments', icon: GitBranch },
  { label: 'Completions', path: '/admin/completions', icon: CheckCircle2 },
  { label: 'Workers', path: '/admin/workers', icon: BriefcaseBusiness },
  { label: 'Users', path: '/admin/users', icon: UsersRound },
  { label: 'Messages', path: '/admin/messages', icon: MessageSquareText },
  { label: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
]

function AdminDashboardLayout() {
  return (
    <DashboardShell
      navItems={navItems}
      panelLabel="Operations panel"
      productLabel="AllHelp Admin"
      theme="admin"
    />
  )
}

export default AdminDashboardLayout
