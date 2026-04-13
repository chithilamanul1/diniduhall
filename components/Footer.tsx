'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  ArrowRightIcon,
} from 'lucide-react'

export function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <footer className="relative bg-neutral-950 text-neutral-200 overflow-hidden pt-24 pb-12">
      {/* Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gold/5 rounded-full blur-[120px]" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-20">
          {/* Brand Column */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <Link href="/" className="inline-block mb-8 group">
              <img
                src="/images/dinidu-gardens-logo.png"
                alt="Dinidu Gardens"
                className="h-24 w-auto object-contain brightness-0 invert transition-transform duration-500 group-hover:scale-105"
              />
            </Link>
            <p className="font-body text-neutral-400 mb-8 leading-relaxed">
              Where heritage meets modern elegance. Seeduwa's premier venue for life's most precious benchmarks.
            </p>
            <div className="flex gap-4">
              {[FacebookIcon, InstagramIcon].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-gold hover:border-gold hover:text-white transition-all duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="font-heading text-xl font-bold mb-8 text-white tracking-[0.1em] uppercase">
              Explore
            </h3>
            <ul className="space-y-4 font-body text-sm">
              {[
                { name: 'Banquet Hall', path: '/banquet-hall' },
                { name: 'Catering Services', path: '/catering' },
                { name: 'Restaurant', path: '/restaurant' },
                { name: 'Events Gallery', path: '/gallery' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className="group flex items-center text-neutral-400 hover:text-gold transition-colors"
                  >
                    <ArrowRightIcon className="w-0 h-3 mr-0 group-hover:w-3 group-hover:mr-2 transition-all duration-300 opacity-0 group-hover:opacity-100" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services Quick View */}
          <motion.div variants={itemVariants}>
            <h3 className="font-heading text-xl font-bold mb-8 text-white tracking-[0.1em] uppercase">
              Planning
            </h3>
            <ul className="space-y-4 font-body text-sm">
              {[
                { name: 'Book a Date', path: '/booking' },
                { name: 'Menu Selection', path: '/restaurant' },
                { name: 'Event Calendar', path: '/events' },
                { name: 'About the Legacy', path: '/about' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className="group flex items-center text-neutral-400 hover:text-gold transition-colors"
                  >
                    <ArrowRightIcon className="w-0 h-3 mr-0 group-hover:w-3 group-hover:mr-2 transition-all duration-300 opacity-0 group-hover:opacity-100" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Column */}
          <motion.div variants={itemVariants}>
            <h3 className="font-heading text-xl font-bold mb-8 text-white tracking-[0.1em] uppercase">
              Connect
            </h3>
            <ul className="space-y-6 font-body text-sm">
              <li className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-gold/50 transition-colors">
                  <MapPinIcon className="w-5 h-5 text-gold" />
                </div>
                <span className="text-neutral-400 group-hover:text-neutral-200 transition-colors pt-2">
                  24 Kotugoda Rd, Seeduwa 11410, Sri Lanka
                </span>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-gold/50 transition-colors">
                  <PhoneIcon className="w-5 h-5 text-gold" />
                </div>
                <span className="text-neutral-400 group-hover:text-neutral-200 transition-colors">
                  077 732 8155
                </span>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-gold/50 transition-colors">
                  <MailIcon className="w-5 h-5 text-gold" />
                </div>
                <span className="text-neutral-400 group-hover:text-neutral-200 transition-colors">
                  info@dinidugardens.lk
                </span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          variants={itemVariants}
          className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left"
        >
          <div className="space-y-2">
            <p className="font-body text-xs text-neutral-500 uppercase tracking-widest">
              © {new Date().getFullYear()} Dinidu Gardens. Elevating Celebrations.
            </p>
          </div>
          
          <div className="font-body text-[10px] text-neutral-600 uppercase tracking-[0.3em] leading-relaxed max-w-md">
            Built with luxury and precision by{' '}
            <a href="https://seranex.org" className="text-gold/60 hover:text-gold transition-colors font-bold">Seranex Lanka</a>
            . Represented by <span className="text-white/40">Chithila Manul</span>.
          </div>
        </motion.div>
      </motion.div>
    </footer>
  )
}
