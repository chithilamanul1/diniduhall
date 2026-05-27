import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Photo Gallery | Wedding & Event Decor | Dinidu Gardens',
  description: 'Explore our photo gallery showcasing elegant wedding receptions, corporate event setups, and beautiful garden vistas at Dinidu Gardens, Weweldeniya.',
  keywords: ['wedding gallery sri lanka', 'dinidu gardens photos', 'event decoration weweldeniya', 'banquet hall gallery'],
}

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
