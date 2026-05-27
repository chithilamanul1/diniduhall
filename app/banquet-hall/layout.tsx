import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Banquet Hall Weweldeniya | Best Wedding Reception Halls in Sri Lanka',
  description: 'Looking for the best banquet hall in Weweldeniya? Dinidu Gardens offers premium wedding reception halls in Sri Lanka with 250-275 capacity, AC, and stunning garden views.',
  keywords: ['banquet hall weweldeniya', 'wedding reception halls sri lanka', 'reception halls in weweldeniya', 'party halls sri lanka', 'Dinidu Gardens banquet'],
}

export default function BanquetHallLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
