import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Upcoming Events & Public Calendar | Dinidu Gardens',
  description: 'Stay updated with public events, locked dates, and upcoming celebrations at Dinidu Gardens. Check our calendar for availability.',
  keywords: ['dinidu gardens events', 'public events seeduwa', 'banquet hall calendar sri lanka', 'wedding calendar seeduwa'],
}

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
