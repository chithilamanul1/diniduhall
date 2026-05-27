import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Road House Restaurant Weweldeniya | Fine Dining & Cuisine',
  description: 'Experience exceptional dining at Road House Restaurant. Explore our gourmet menu featuring signature dishes, cocktails, and family dining in a lush garden setting.',
  keywords: ['road house restaurant weweldeniya', 'best restaurants in weweldeniya', 'dining weweldeniya sri lanka', 'dinidu gardens restaurant'],
}

export default function RestaurantLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
