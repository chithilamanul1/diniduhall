import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Event Catering Sri Lanka | Best Wedding Catering Weweldeniya',
  description: 'Looking for top-tier event catering in Sri Lanka? Dinidu Caterers specializes in wedding, corporate, and outdoor catering in Weweldeniya with custom gourmet menus.',
  keywords: ['event catering sri lanka', 'wedding catering weweldeniya', 'best caterers in sri lanka', 'outdoor catering weweldeniya', 'corporate event catering'],
}

export default function CateringLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
