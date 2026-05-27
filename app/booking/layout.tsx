import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Book Your Event | Online Booking Inquiry | Dinidu Gardens',
  description: 'Inquire about availability for your wedding, corporate event, or reception. Fill out our simple booking inquiry form and plan your special day with Dinidu Gardens.',
  keywords: ['book wedding hall seeduwa', 'dinidu gardens booking', 'reception hall inquiry sri lanka', 'wedding venue availability seeduwa'],
}

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
