'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MenuIcon, XIcon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = React.useState(false)
  const pathname = usePathname()
  
  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Banquet Hall', path: '/banquet-hall' },
    { name: 'Catering', path: '/catering' },
    { name: 'Restaurant', path: '/restaurant' },
    { name: 'Events', path: '/events' },
    { name: 'Gallery', path: '/gallery' },
  ]
  
  const isActive = (path: string) => pathname === path
  
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled 
          ? 'py-2 bg-cream/80 backdrop-blur-2xl shadow-lg border-b border-gold/5' 
          : 'py-3 bg-transparent overflow-visible'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center transition-all duration-500">
          {/* Logo */}
          <Link href="/" className="flex items-center group overflow-visible relative">
            <motion.div
              animate={{ 
                scale: scrolled ? 0.85 : 1,
              }}
              transition={{ duration: 0.5 }}
              className="relative overflow-visible"
            >
              <img
                src="/images/dinidu-gardens-logo.png"
                alt="Dinidu Gardens"
                className={`w-auto transition-all duration-500 ${scrolled ? 'h-14' : 'h-24 md:h-28'}`}
              />
              <div className="absolute inset-x-0 -bottom-2 h-[2px] bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            <div className="flex items-center space-x-8 lg:space-x-12 px-8 py-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  <Link
                    href={link.path}
                    className={`font-body text-xs lg:text-sm font-semibold tracking-[0.2em] uppercase transition-all duration-300 relative group truncate ${
                      isActive(link.path) ? 'text-gold' : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                  >
                    {link.name}
                    <span className={`absolute -bottom-1 left-0 w-0 h-[1.5px] bg-gold transition-all duration-300 group-hover:w-full ${isActive(link.path) ? 'w-full' : ''}`} />
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Link
                href="/booking"
                className="bg-neutral-900 text-gold hover:bg-gold hover:text-white px-10 py-4 rounded-full font-body font-bold text-xs tracking-widest uppercase transition-all duration-500 shadow-xl hover:shadow-gold/20 flex items-center gap-2 group border border-gold/20"
              >
                Book Your Day
                <div className="w-1.5 h-1.5 rounded-full bg-gold group-hover:bg-white animate-pulse" />
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className={`md:hidden p-3 rounded-2xl transition-all duration-300 ${
              scrolled ? 'bg-white/10 text-neutral-900' : 'bg-white/20 text-white'
            }`}
            aria-label="Open menu"
          >
            <MenuIcon className="w-7 h-7" />
          </button>
        </div>
      </div>

      {/* Full-Screen Mobile Menu */}
      <AnimatePresence mode="wait">
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-neutral-900 flex flex-col md:hidden overflow-y-auto"
            style={{ height: '100dvh' }}
          >
            {/* Menu Header with Close Button */}
            <div className="flex justify-between items-center h-24 px-6 border-b border-white/10 flex-shrink-0">
              <img
                src="/images/dinidu-gardens-logo.png"
                alt="Dinidu Gardens"
                className="h-16 w-auto object-contain brightness-0 invert"
              />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
                aria-label="Close menu"
              >
                <XIcon className="w-8 h-8" />
              </button>
            </div>

            {/* Menu Links content */}
            <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`font-heading text-3xl font-light tracking-[0.1em] transition-colors ${
                      isActive(link.path) ? 'text-gold' : 'text-neutral-300 hover:text-white'
                    }`}
                  >
                    {link.name.toUpperCase()}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
                className="pt-8"
              >
                <Link
                  href="/booking"
                  onClick={() => setMobileMenuOpen(false)}
                  className="bg-gold text-white px-12 py-5 rounded-full font-body font-semibold text-lg tracking-widest hover:bg-gold/90 transition-all shadow-xl shadow-gold/20 inline-block text-center"
                >
                  BOOK NOW
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
