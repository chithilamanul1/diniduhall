'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { SparklesIcon, CalendarIcon, UsersIcon, ShieldCheckIcon } from 'lucide-react'

export default function About() {
  return (
    <div className="w-full bg-cream min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] w-full overflow-hidden">
        <Image
          src="/images/business/dinidugardens (37).jpeg"
          alt="Dinidu Gardens Banquet Hall - Luxury Event Venue Sri Lanka"
          fill
          className="object-cover brightness-[0.7]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/60" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <span className="font-body text-xs md:text-sm text-gold uppercase tracking-[0.4em] mb-4 block font-semibold">
              The Legacy
            </span>
            <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl text-white mb-6">
              Our <span className="italic font-light">Story</span>
            </h1>
            <div className="w-20 h-[2px] bg-gold mb-6" />
            <p className="font-body text-lg md:text-xl text-white/90 max-w-xl mx-auto font-light tracking-wide">
              Crafting extraordinary memories in the heart of Weweldeniya
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content & Legacy */}
      <section className="py-24 px-4 md:px-8 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-7 space-y-6"
          >
            <span className="font-body text-xs text-gold uppercase tracking-[0.3em] font-semibold block">
              Established Excellence
            </span>
            <h2 className="font-heading text-4xl md:text-5xl text-neutral-900 leading-tight">
              A Legacy of <span className="italic font-light">Timeless Elegance</span>
            </h2>
            <div className="w-16 h-[2px] bg-gold" />
            
            <div className="space-y-6 font-body text-base md:text-lg text-neutral-600 leading-relaxed font-light">
              <p>
                Nestled amidst lush tropical gardens, Dinidu Gardens Banquet Hall
                has been the premier destination for life's most meaningful
                celebrations. Our venue seamlessly blends natural beauty with
                sophisticated elegance, creating an atmosphere that transforms
                every event into an extraordinary experience.
              </p>
              <p>
                From intimate gatherings to grand celebrations, our dedicated team
                ensures every detail is meticulously crafted to exceed your
                expectations. With state-of-the-art facilities and personalized
                service, your vision becomes our masterpiece.
              </p>
              <p>
                We believe that every wedding, birthday, and corporate gathering is a unique milestone. 
                That's why we offer bespoke setups, professional lighting, climate-controlled comfort, 
                and outstanding catering services tailored just for you.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-5 relative"
          >
            <div className="aspect-[3/4] relative rounded-[3rem] overflow-hidden shadow-2xl border border-neutral-100">
              <Image
                src="/images/business/dinidugardens (4).jpeg"
                alt="Dinidu Gardens Legacy Celebration"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-gold text-white p-6 rounded-2xl shadow-xl max-w-[180px]">
              <span className="block font-heading text-4xl font-bold mb-1">15+</span>
              <span className="font-body text-xs tracking-wider uppercase">Years of Service</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Values / Stats */}
      <section className="py-20 px-4 md:px-8 bg-neutral-900 text-white relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto border border-gold/20">
                <CalendarIcon className="w-8 h-8 text-gold" />
              </div>
              <h3 className="font-heading text-4xl text-gold font-bold">500+</h3>
              <h4 className="font-heading text-xl">Events Hosted</h4>
              <p className="font-body text-neutral-400 text-sm font-light max-w-xs mx-auto leading-relaxed">
                Over a decade of successful corporate gatherings, weddings, and spectacular events.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-4"
            >
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto border border-gold/20">
                <UsersIcon className="w-8 h-8 text-gold" />
              </div>
              <h3 className="font-heading text-4xl text-gold font-bold">250-275</h3>
              <h4 className="font-heading text-xl">Guest Capacity</h4>
              <p className="font-body text-neutral-400 text-sm font-light max-w-xs mx-auto leading-relaxed">
                Spacious banquet hall offering both intimate layouts and larger celebrations.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto border border-gold/20">
                <ShieldCheckIcon className="w-8 h-8 text-gold" />
              </div>
              <h3 className="font-heading text-4xl text-gold font-bold">50+</h3>
              <h4 className="font-heading text-xl">Secure Parking</h4>
              <p className="font-body text-neutral-400 text-sm font-light max-w-xs mx-auto leading-relaxed">
                Dedicated secure parking spaces ensuring safety and peace of mind for your guests.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Elegant CTA */}
      <section className="py-24 px-4 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <SparklesIcon className="w-10 h-10 text-gold mx-auto mb-6 opacity-80" />
          <h2 className="font-heading text-4xl md:text-5xl text-neutral-900 mb-6 leading-tight">
            Create Your <span className="italic font-light">Unforgettable Day</span>
          </h2>
          <p className="font-body text-neutral-600 text-lg mb-10 leading-relaxed font-light">
            Contact our experienced event planning team today to secure your date and bring your dream celebration to life.
          </p>
          <div className="flex gap-6 justify-center">
            <Link
              href="/booking"
              className="bg-gold text-white px-10 py-4 rounded-full font-body font-medium tracking-wide hover:bg-gold/90 transition-colors shadow-lg hover:shadow-gold/20"
            >
              Book Your Venue
            </Link>
            <a
              href="tel:0777702044"
              className="bg-white text-neutral-900 border border-neutral-200 px-10 py-4 rounded-full font-body font-medium tracking-wide hover:bg-neutral-50 transition-colors"
            >
              Call Us
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  )
}