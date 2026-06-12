export const serviceCategories = [
  {
    title: 'Electrical',
    description: 'Repairs, fitting, wiring checks, and emergency fixes.',
    signal: 'Most requested',
    icon: 'EL',
  },
  {
    title: 'Plumbing',
    description: 'Leaks, fittings, bathroom repairs, and water-line work.',
    signal: 'Nearby workers',
    icon: 'PL',
  },
  {
    title: 'Cleaning',
    description: 'Deep cleaning, move-in cleaning, and recurring home care.',
    signal: 'Verified help',
    icon: 'CL',
  },
  {
    title: 'Appliance Care',
    description: 'AC, washing machine, refrigerator, and kitchen appliance support.',
    signal: 'Fast assignment',
    icon: 'AC',
  },
]

export const workflowSteps = [
  {
    label: 'Request',
    title: 'User sends work details',
    description: 'Customers share service type, location, timing, and issue details from the website.',
  },
  {
    label: 'Review',
    title: 'Admin checks availability',
    description: 'The admin team reviews the request and identifies the best local worker for the job.',
  },
  {
    label: 'Assign',
    title: 'Nearby worker gets the job',
    description: 'A verified worker is assigned based on area, skill match, and current availability.',
  },
]

export const trustMetrics = [
  { value: '3-step', label: 'managed request flow' },
  { value: 'Local', label: 'worker assignment' },
  { value: 'Admin', label: 'verified coordination' },
]
