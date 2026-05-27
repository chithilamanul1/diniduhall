import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Event Catering Sri Lanka | Best Wedding Catering Seeduwa',
  description: 'Looking for top-tier event catering in Sri Lanka? Dinidu Caterers specializes in wedding, corporate, and outdoor catering in Seeduwa with custom gourmet menus.',
  keywords: ['event catering sri lanka', 'wedding catering seeduwa', 'best caterers in sri lanka', 'outdoor catering seeduwa', 'corporate event catering'],
}

export default function CateringLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
