import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Banquet Hall Seeduwa | Best Wedding Reception Halls in Sri Lanka',
  description: 'Looking for the best banquet hall in Seeduwa? Dinidu Gardens offers premium wedding reception halls in Sri Lanka with 250-275 capacity, AC, and stunning garden views.',
  keywords: ['banquet hall seeduwa', 'wedding reception halls sri lanka', 'reception halls in seeduwa', 'party halls sri lanka', 'Dinidu Gardens banquet'],
}

export default function BanquetHallLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
