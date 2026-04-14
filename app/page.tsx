'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ChevronDownIcon,
  HeartIcon,
  BriefcaseIcon,
  PartyPopperIcon,
} from 'lucide-react'
import { JsonLd } from '@/components/JsonLd'
import Image from 'next/image'
import { TestimonialsSection } from '@/components/TestimonialsSection'

const heroImages = [
  '/images/business/dinidugardens (44).jpeg', // Hall Atmosphere
  '/images/business/dinidugardens (37).jpeg', // Grand Panoramic
  '/images/business/dinidugardens (27).jpeg', // Reception Glow
]

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])
  
  return (
    <div className="w-full bg-cream">
      <JsonLd />
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src="/images/business/unnamed (1).webp"
            alt="Dinidu Gardens - Premier Wedding Venue Sri Lanka"
            fill
            className="object-cover contrast-[1.1] brightness-[0.85]"
            priority
            quality={100}
          />
          {/* Artistic Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-black/60" />
        </motion.div>

        {/* Content Overlay */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 pt-32 md:pt-48">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center mt-12 md:mt-20"
          >
            <motion.div
              initial={{ opacity: 0, letterSpacing: '0.1em' }}
              animate={{ opacity: 1, letterSpacing: '0.6em' }}
              transition={{ duration: 2, delay: 0.2 }}
              className="font-body text-[10px] md:text-xs text-gold font-bold uppercase mb-10 tracking-[0.6em]"
            >
              The Pinnacle of Elegance
            </motion.div>

            <h1 className="font-heading text-7xl md:text-[11rem] lg:text-[14rem] text-white leading-tight mb-8 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              <span className="block overflow-hidden h-[1.1em]">
                <motion.span 
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="block"
                >
                  Dinidu
                </motion.span>
              </span>
              <span className="block overflow-hidden -mt-4 md:-mt-10 h-[1.2em]">
                <motion.span 
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.2, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="block italic font-light text-sharp-gold leading-none"
                >
                  Gardens
                </motion.span>
              </span>
            </h1>

            <motion.div 
               initial={{ scaleX: 0 }}
               animate={{ scaleX: 1 }}
               transition={{ duration: 1.5, delay: 1 }}
               className="w-32 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent mb-12" 
            />

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 1.2 }}
              className="font-body text-base md:text-2xl text-white/80 max-w-2xl mx-auto mb-16 font-light leading-relaxed tracking-wider"
            >
              Crafting <span className="text-white italic">extraordinary memories</span> in the 
              heart of Seeduwa's tropical luxury.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.5 }}
              className="flex flex-col sm:flex-row gap-8 w-full max-w-sm sm:max-w-none sm:justify-center"
            >
              <Link
                href="/booking"
                className="group relative overflow-hidden bg-gold text-white px-14 py-5 rounded-full font-body font-bold tracking-[0.2em] uppercase transition-all duration-500 hover:scale-105 active:scale-95 shadow-2xl shadow-gold/30"
              >
                <span className="relative z-10">Book Your Day</span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
          }}
        >
          <ChevronDownIcon className="w-8 h-8 text-white/70" />
        </motion.div>
      </section>

      {/* Services Section (Bento Grid) */}
      <section className="py-32 px-4 md:px-8 max-w-7xl mx-auto relative overflow-hidden">
        {/* Decorative Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="text-center mb-20 relative">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-body text-sm text-gold uppercase tracking-[0.3em] mb-4 block font-medium"
          >
            Exclusive Offerings
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-6xl md:text-7xl text-neutral-900"
          >
            Our <span className="italic font-light">Services</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:auto-rows-[340px]">
          {/* Main Service: Weddings (Large) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-8 md:row-span-2 group relative rounded-[2rem] overflow-hidden bg-neutral-100 shadow-2xl shadow-black/5 h-[450px] md:h-full"
          >
            <Link href="/banquet-hall" className="block h-full w-full relative">
              <Image
                src="/images/business/unnamed (1).webp"
                alt="Luxury Weddings at Dinidu Gardens Seeduwa"
                fill
                className="object-cover transition-all duration-1000 group-hover:scale-105 group-hover:rotate-1"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />
              <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end transform transition-transform duration-500">
                <div className="mb-6">
                  <Image
                    src="/images/dinidu-gardens-logo.png"
                    alt="Dinidu Gardens"
                    width={180}
                    height={180}
                    className="h-24 w-auto object-contain brightness-0 invert opacity-100 mb-4"
                  />
                </div>
                <h3 className="font-heading text-4xl md:text-6xl text-white mb-4">
                  Weddings
                </h3>
                <p className="font-body text-white/70 text-lg max-w-xl leading-relaxed">
                  Create your dream wedding in one of the most romantic <span className="text-gold font-medium">wedding reception halls in Sri Lanka</span>. 
                  Bespoke décor and flawless garden service tailored to your love story.
                </p>
                <div className="mt-8 flex items-center text-gold font-medium text-sm tracking-widest uppercase group-hover:translate-x-2 transition-transform">
                  Explore Venue <ChevronDownIcon className="ml-2 w-4 h-4 -rotate-90" />
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Service 2: Corporate (Medium) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-4 md:row-span-1 group relative rounded-[2rem] overflow-hidden bg-neutral-100 shadow-xl shadow-black/5 h-[400px] md:h-full"
          >
            <Link href="/catering" className="block h-full w-full relative">
              <Image
                src="/images/business/dinidugardens (41).jpeg"
                alt="Professional Corporate Event Catering - Dinidu Gardens Seeduwa"
                fill
                className="object-cover transition-all duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-8">
                <h3 className="font-heading text-3xl text-white mb-2">Corporate</h3>
                <p className="font-body text-white/60 text-sm leading-relaxed mb-4">
                  Professional spaces equipped with modern amenities for your business needs.
                </p>
                <div className="h-[1px] w-0 bg-gold group-hover:w-full transition-all duration-500" />
              </div>
            </Link>
          </motion.div>

          {/* Service 3: Celebrations (Medium) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-4 md:row-span-1 group relative rounded-[2rem] overflow-hidden bg-neutral-100 shadow-xl shadow-black/5 h-[400px] md:h-full"
          >
            <Link href="/restaurant" className="block h-full w-full relative">
              <Image
                src="/images/business/unnamed (11).webp"
                alt="Special Celebrations and Events at Road House Seeduwa"
                fill
                className="object-cover transition-all duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-8">
                <h3 className="font-heading text-3xl text-white mb-2">Celebrations</h3>
                <p className="font-body text-white/60 text-sm leading-relaxed mb-4">
                  Birthdays and milestones deserve a venue as special as the occasion.
                </p>
                <div className="h-[1px] w-0 bg-gold group-hover:w-full transition-all duration-500" />
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto border-t border-neutral-200">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-[4/3] relative rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/business/buffet-spread.png"
                alt="Elegant Buffet Salad Spread - Dinidu Gardens"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-8 right-8 bg-gold text-white p-8 rounded-2xl shadow-xl max-w-[200px]">
              <span className="block font-heading text-5xl font-bold mb-1">
                15+
              </span>
              <span className="font-body text-sm tracking-wide">
                Years of Excellence
              </span>
            </div>
          </div>

          <div>
            <span className="font-body text-sm text-gold uppercase tracking-[0.2em] mb-4 block">
              Our Story
            </span>
            <h2 className="font-heading text-5xl md:text-6xl text-neutral-900 mb-6 leading-tight">
              A Legacy of{' '}
              <span className="italic font-light">Unforgettable</span>{' '}
              Celebrations
            </h2>
            <div className="w-16 h-[2px] bg-gold mb-8" />

            <p className="font-body text-lg text-neutral-600 mb-6 leading-relaxed">
              Nestled amidst lush tropical gardens, Dinidu Gardens Banquet Hall
              has been the premier destination for life's most meaningful
              celebrations. Our venue seamlessly blends natural beauty with
              sophisticated elegance, creating an atmosphere that transforms
              every event into an extraordinary experience.
            </p>
            <p className="font-body text-lg text-neutral-600 mb-12 leading-relaxed">
              From intimate gatherings to grand celebrations, our dedicated team
              ensures every detail is meticulously crafted to exceed your
              expectations. With state-of-the-art facilities and personalized
              service, your vision becomes our masterpiece.
            </p>

            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-neutral-200">
              <div>
                <span className="block font-heading text-4xl text-gold font-bold mb-2">
                  500+
                </span>
                <span className="font-body text-xs text-neutral-500 uppercase tracking-wider">
                  Events Hosted
                </span>
              </div>
              <div>
                <span className="block font-heading text-4xl text-gold font-bold mb-2">
                  250-275
                </span>
                <span className="font-body text-xs text-neutral-500 uppercase tracking-wider">
                  Guest Capacity
                </span>
              </div>
              <div>
                <span className="block font-heading text-4xl text-gold font-bold mb-2">
                  100%
                </span>
                <span className="font-body text-xs text-neutral-500 uppercase tracking-wider">
                  Satisfaction
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />
    </div>
  )
}
