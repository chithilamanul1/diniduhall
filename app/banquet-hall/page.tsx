'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  UsersIcon,
  AirVentIcon,
  MicIcon,
  LightbulbIcon,
  ParkingCircleIcon,
  HeartIcon,
  WineIcon,
  UtensilsIcon,
  ChevronRightIcon,
} from 'lucide-react'
import Image from 'next/image'

const amenities = [
  {
    icon: UsersIcon,
    title: 'Capacity 250-275',
    description: 'Perfect for intimate and medium-sized gatherings',
  },
  {
    icon: AirVentIcon,
    title: 'AC & Non-AC Options',
    description: 'Climate-controlled comfort for all seasons',
  },
  {
    icon: MicIcon,
    title: 'Professional Sound System',
    description: 'State-of-the-art audio equipment',
  },
  {
    icon: LightbulbIcon,
    title: 'Premium Lighting',
    description: 'Customizable ambiance lighting',
  },
  {
    icon: ParkingCircleIcon,
    title: 'Ample Parking',
    description: 'Secure parking for 100+ vehicles',
  },

  {
    icon: WineIcon,
    title: 'Full Bar Service',
    description: 'Extensive beverage selection available',
  },
  {
    icon: UtensilsIcon,
    title: 'In-House Catering',
    description: 'Exquisite culinary experiences',
  },
]

const photos = [
  '/images/business/unnamed (11).webp',
  '/images/business/unnamed (12).webp',
  '/images/business/unnamed (13).webp',
  '/images/business/unnamed (14).webp',
]

export default function BanquetHall() {
  return (
    <div className="w-full bg-cream">
      {/* Hero Banner */}
      <section className="relative h-[60vh] w-full overflow-hidden">
        <Image
          src="/images/business/unnamed (1).webp"
          alt="Dinidu Gardens Banquet Hall Interior Seeduwa"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 pt-20">
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
              duration: 0.8,
            }}
            className="flex flex-col items-center"
          >
            <span className="font-body text-sm md:text-base text-white/80 uppercase tracking-[0.3em] mb-6">
              Grandeur & Sophistication
            </span>
            <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl text-white mb-6">
              The Banquet <span className="italic font-light">Hall</span>
            </h1>
            <div className="w-24 h-[2px] bg-gold mb-8" />
            <p className="font-body text-xl md:text-2xl text-white/90 max-w-2xl mx-auto font-light leading-relaxed">
              Where elegance and sophistication create unforgettable moments
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-24 px-4 bg-cream">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
            }}
            className="flex flex-col items-center"
          >
            <div className="mb-6 mx-auto">
              <Image
                src="/images/dinidu-gardens-logo.png"
                alt="Dinidu Gardens"
                width={120}
                height={120}
                className="h-16 w-auto object-contain mx-auto"
              />
            </div>
            <span className="font-body text-sm text-gold uppercase tracking-[0.2em] mb-4 block">
              Welcome
            </span>
            <h2 className="font-heading text-4xl md:text-5xl text-neutral-900 mb-6 leading-tight">
              A Venue of <span className="italic font-light">Distinction</span>
            </h2>
            <div className="w-16 h-[2px] bg-gold mb-8" />
            <p className="font-body text-lg text-neutral-600 mb-6 leading-relaxed">
              Our banquet hall is the epitome of luxury and refinement, designed
              to host your most cherished celebrations. With a capacity of up to
              275 guests, state-of-the-art facilities, and impeccable service,
              we transform your vision into reality.
            </p>
            <p className="font-body text-lg text-neutral-600 leading-relaxed">
              From grand weddings to corporate galas, our versatile space adapts
              to your needs while maintaining an atmosphere of timeless
              elegance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Capacity & Options */}
      <section className="py-24 px-4 bg-cream border-t border-neutral-200">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-16">
            <motion.div
              initial={{
                opacity: 0,
                x: -30,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.6,
              }}
            >
              <div className="relative aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl">
                <Image
                  src="/images/business/unnamed (10).webp"
                  alt="Dinidu Gardens Banquet Hall Elegant Interior"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
            <motion.div
              initial={{
                opacity: 0,
                x: 30,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.6,
              }}
            >
              <div>
                <span className="font-body text-sm text-gold uppercase tracking-[0.2em] mb-4 block">
                  Features
                </span>
                <h3 className="font-heading text-4xl md:text-5xl text-neutral-900 mb-6 leading-tight">
                  Spacious &{' '}
                  <span className="italic font-light">Versatile</span>
                </h3>
                <div className="w-16 h-[2px] bg-gold mb-8" />
                <p className="font-body text-lg text-neutral-600 mb-8 leading-relaxed">
                  Our main hall comfortably accommodates 250-275 guests with
                  flexible seating arrangements. Whether you prefer an intimate
                  setup or a standard banquet style, our team will configure the
                  space to perfection.
                </p>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center mr-4 flex-shrink-0">
                      <AirVentIcon className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <h4 className="font-heading text-xl font-bold text-neutral-900 mb-1">
                        Air-Conditioned Hall
                      </h4>
                      <p className="font-body text-neutral-600">
                        Climate-controlled comfort for year-round events
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center mr-4 flex-shrink-0">
                      <UsersIcon className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <h4 className="font-heading text-xl font-bold text-neutral-900 mb-1">
                        Flexible Layouts
                      </h4>
                      <p className="font-body text-neutral-600">
                        Banquet, theater, classroom, or cocktail configurations
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Amenities Grid */}
      <section className="py-24 px-4 bg-cream border-t border-neutral-200">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
            }}
            className="flex flex-col items-center text-center mb-16"
          >
            <span className="font-body text-sm text-gold uppercase tracking-[0.2em] mb-4 block">
              Facilities
            </span>
            <h2 className="font-heading text-4xl md:text-5xl text-neutral-900 mb-6 leading-tight">
              Premium <span className="italic font-light">Amenities</span>
            </h2>
            <div className="w-16 h-[2px] bg-gold mb-8" />
            <p className="font-body text-lg text-neutral-600">
              Everything you need for a flawless event
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {amenities.map((amenity, index) => (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.05,
                }}
                className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-shadow border border-neutral-100"
              >
                <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center mb-6">
                  <amenity.icon className="w-7 h-7 text-gold" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-neutral-900 mb-3">
                  {amenity.title}
                </h3>
                <p className="font-body text-neutral-600 leading-relaxed">
                  {amenity.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Showcase */}
      <section className="py-24 px-4 bg-cream border-t border-neutral-200">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
            }}
            className="flex flex-col items-center text-center mb-16"
          >
            <span className="font-body text-sm text-gold uppercase tracking-[0.2em] mb-4 block">
              Gallery
            </span>
            <h2 className="font-heading text-4xl md:text-5xl text-neutral-900 mb-6 leading-tight">
              Experience the <span className="italic font-light">Elegance</span>
            </h2>
            <div className="w-16 h-[2px] bg-gold mb-8" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {photos.map((photo, index) => (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  scale: 0.95,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                className="relative aspect-[4/3] rounded-[3rem] overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
              >
                <Image
                  src={photo}
                  alt={`Dinidu Gardens Banquet Hall Seeduwa Photo ${index + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-cream border-t border-neutral-200">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
            }}
            className="flex flex-col items-center"
          >
            <span className="font-body text-sm text-gold uppercase tracking-[0.2em] mb-4 block">
              Bookings
            </span>
            <h2 className="font-heading text-4xl md:text-5xl text-neutral-900 mb-6 leading-tight">
              Create Your Perfect{' '}
              <span className="italic font-light">Event</span>
            </h2>
            <div className="w-16 h-[2px] bg-gold mb-8" />
            <p className="font-body text-lg text-neutral-600 mb-10 leading-relaxed">
              Let us help you bring your vision to life. Our experienced team is
              ready to assist with every detail.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/booking"
                className="inline-flex items-center justify-center bg-gold text-white px-10 py-4 rounded-full font-body font-medium tracking-wide hover:bg-gold/90 transition-colors"
              >
                Reserve Your Date
                <ChevronRightIcon className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/gallery"
                className="inline-flex items-center justify-center bg-white text-neutral-900 border border-neutral-200 px-10 py-4 rounded-full font-body font-medium tracking-wide hover:bg-neutral-50 transition-colors"
              >
                View Gallery
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
