import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Road House Restaurant Seeduwa | Fine Dining & Cuisine',
  description: 'Experience exceptional dining at Road House Restaurant. Explore our gourmet menu featuring signature dishes, cocktails, and family dining in a lush garden setting.',
  keywords: ['road house restaurant seeduwa', 'best restaurants in seeduwa', 'dining seeduwa sri lanka', 'dinidu gardens restaurant'],
}

export default function RestaurantLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
