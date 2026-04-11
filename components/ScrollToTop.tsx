'use client'

import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { ArrowUpIcon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function ScrollToTop() {
  const pathname = usePathname()
  const [showButton, setShowButton] = useState(false)
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  
  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
  
  return (
    <AnimatePresence>
      {showButton && (
        <motion.button
          initial={{
            opacity: 0,
            scale: 0.8,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            scale: 0.8,
          }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 bg-gold text-white p-3 rounded-full shadow-lg hover:bg-gold/90 transition-colors"
          aria-label="Scroll to top"
        >
          <ArrowUpIcon className="w-6 h-6" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
