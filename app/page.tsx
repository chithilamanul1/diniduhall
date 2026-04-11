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
        {heroImages.map((image, index) => (
          <motion.div
            key={index}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: index === currentSlide ? 1 : 0,
            }}
            transition={{
              duration: 1.5,
            }}
            className="absolute inset-0"
          >
            <Image
              src={image}
              alt={`Dinidu Gardens - Best Banquet Hall in Sri Lanka ${index + 1}`}
              fill
              className="object-cover contrast-[1.05] brightness-[1.02]"
              priority={index === 0}
              quality={100}
              unoptimized={false}
            />
            <div className="absolute inset-0 bg-black/35 transition-opacity duration-1000" />
          </motion.div>
        ))}

        {/* Content Overlay */}
        <div className="relative z-10 min-h-screen md:h-full flex flex-col items-center justify-center text-center px-4 py-20 pb-32 md:pb-20">
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1,
              delay: 0.2,
            }}
            className="flex flex-col items-center"
          >
            <span className="font-body text-xs md:text-base text-white/80 uppercase tracking-[0.3em] mb-4 md:mb-6">
              Where Elegance Meets Nature
            </span>

            <h1 className="font-heading text-5xl md:text-8xl lg:text-9xl text-white mb-4 md:mb-6">
              Dinidu <span className="italic font-light">Gardens</span>
            </h1>

            <div className="w-16 md:w-24 h-[1.5px] md:h-[2px] bg-gold mb-6 md:mb-8" />

            <p className="font-body text-base md:text-xl text-white/90 max-w-2xl mx-auto mb-8 md:mb-12 font-light leading-relaxed">
              Experience the best <span className="font-medium text-gold">banquet halls in Sri Lanka</span>. 
              An exquisite venue for your most cherished celebrations,
              surrounded by lush tropical gardens in Seeduwa.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full max-w-[280px] sm:max-w-none sm:justify-center">
              <Link
                href="/booking"
                className="bg-gold text-white px-8 sm:w-64 py-3.5 sm:py-4 rounded-full font-body font-medium tracking-wide hover:bg-gold/90 transition-colors text-center text-sm sm:text-base border border-gold shadow-lg shadow-gold/20"
              >
                Reserve Your Date
              </Link>
              <Link
                href="/gallery"
                className="bg-white text-neutral-900 px-8 sm:w-64 py-3.5 sm:py-4 rounded-full font-body font-medium tracking-wide hover:bg-neutral-100 transition-colors text-center text-sm sm:text-base border border-white shadow-lg shadow-black/5"
              >
                Explore Gallery
              </Link>
            </div>
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

      {/* Services Section */}
      <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="font-body text-sm text-gold uppercase tracking-[0.2em] mb-4 block">
            What We Offer
          </span>
          <h2 className="font-heading text-5xl md:text-6xl text-neutral-900">
            Our <span className="italic font-light">Services</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Service 1 */}
          <Link href="/banquet-hall" className="group block">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-6">
              <Image
                src="/images/business/unnamed (1).webp"
                alt="Luxury Weddings at Dinidu Gardens Seeduwa"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 z-10">
                <Image
                  src="/images/dinidu-gardens-logo.png"
                  alt="Dinidu Gardens"
                  width={140}
                  height={140}
                  className="h-20 w-auto object-contain brightness-0 invert opacity-95"
                />
              </div>
            </div>
            <h3 className="font-heading text-3xl text-neutral-900 mb-3">
              Weddings
            </h3>
            <p className="font-body text-neutral-600 leading-relaxed">
              Create your dream wedding in one of the most romantic <span className="font-medium">wedding reception halls in Sri Lanka</span>, with
              bespoke décor and flawless garden service.
            </p>
          </Link>

          {/* Service 2 */}
          <Link href="/catering" className="group block">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-6">
              <Image
                src="/images/business/dinidugardens (41).jpeg"
                alt="Professional Corporate Event Catering - Dinidu Gardens Seeduwa"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 z-10">
                <Image
                  src="/images/dinidu-gardens-logo.png"
                  alt="Dinidu Gardens"
                  width={140}
                  height={140}
                  className="h-20 w-auto object-contain brightness-0 invert opacity-95"
                />
              </div>
            </div>
            <h3 className="font-heading text-3xl text-neutral-900 mb-3">
              Corporate Events
            </h3>
            <p className="font-body text-neutral-600 leading-relaxed">
              Impress your clients and team with professional event spaces
              equipped with modern amenities.
            </p>
          </Link>

          {/* Service 3 */}
          <Link href="/restaurant" className="group block">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-6">
              <Image
                src="/images/business/unnamed (11).webp"
                alt="Special Celebrations and Events at Road House Seeduwa"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 z-10">
                <Image
                  src="/images/dinidu-gardens-logo.png"
                  alt="Dinidu Gardens"
                  width={140}
                  height={140}
                  className="h-20 w-auto object-contain brightness-0 invert opacity-95"
                />
              </div>
            </div>
            <h3 className="font-heading text-3xl text-neutral-900 mb-3">
              Celebrations
            </h3>
            <p className="font-body text-neutral-600 leading-relaxed">
              Birthdays, anniversaries, and special milestones deserve a venue
              as special as the occasion.
            </p>
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto border-t border-neutral-200">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-[4/3] relative rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/business/dinidugardens (21).jpeg"
                alt="Dinidu Gardens Banquet Hall Interior Seeduwa"
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
