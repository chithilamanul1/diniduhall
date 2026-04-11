'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ScrollToTop } from '@/components/ScrollToTop'

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith('/admin')

  if (isAdmin) {
    return <>{children}</>
  }

  return (
    <>
      <Navbar />
      <ScrollToTop />
      <main>{children}</main>
      <Footer />
    </>
  )
}
