'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MenuIcon, XIcon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  
  const navLinks = [
    {
      name: 'Home',
      path: '/',
    },
    {
      name: 'Banquet Hall',
      path: '/banquet-hall',
    },
    {
      name: 'Catering',
      path: '/catering',
    },
    {
      name: 'Restaurant',
      path: '/restaurant',
    },
    {
      name: 'Events',
      path: '/events',
    },
    {
      name: 'Gallery',
      path: '/gallery',
    },
  ]
  
  const isActive = (path: string) => pathname === path
  
  return (
    <nav className="sticky top-0 z-50 bg-cream/95 backdrop-blur-xl border-b border-neutral-200 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center group transition-transform duration-300 hover:scale-[1.05]">
            <img
              src="/images/dinidu-gardens-logo.png"
              alt="Dinidu Gardens"
              className="h-20 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`font-body text-sm font-medium tracking-wide transition-colors ${isActive(link.path) ? 'text-gold' : 'text-neutral-600 hover:text-neutral-900'}`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/booking"
              className="bg-gold text-white px-8 py-3 rounded-full font-body font-medium text-sm tracking-wide hover:bg-gold/90 transition-colors"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-neutral-700 hover:text-gold transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <XIcon className="w-6 h-6" />
            ) : (
              <MenuIcon className="w-6 h-6" />
            )}
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
    </nav>
  )
}
