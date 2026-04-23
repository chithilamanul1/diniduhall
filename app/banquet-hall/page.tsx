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

      {/* Wedding Packages Content */}
      <section className="py-24 px-4 bg-white border-t border-neutral-200">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center mb-16"
          >
            <span className="font-body text-sm text-gold uppercase tracking-[0.2em] mb-4 block">
              Offerings
            </span>
            <h2 className="font-heading text-4xl md:text-5xl text-neutral-900 mb-6 leading-tight">
              Wedding <span className="italic font-light">Packages</span>
            </h2>
            <div className="w-16 h-[2px] bg-gold mb-8" />
          </motion.div>

          {/* Add-ons */}
          <div className="mb-16">
            <h3 className="text-neutral-900 text-sm font-bold tracking-widest uppercase mb-6 px-2">RECEPTION BITES ADD-ONS <span className="text-neutral-500 ml-2">(PER 100 PAX)</span></h3>
            <div className="w-full h-px bg-neutral-200 mb-6" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 bg-neutral-50 rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b sm:border-b-0 sm:border-r border-neutral-200 flex flex-col justify-center">
                <h4 className="text-neutral-900 font-bold text-sm mb-2 tracking-wide uppercase">HOPPERS</h4>
                <div className="text-gold text-lg font-medium mb-1">LKR 9,500</div>
                <div className="text-neutral-500 text-xs">130 pieces</div>
              </div>
              <div className="p-6 border-b sm:border-b-0 lg:border-r border-neutral-200 flex flex-col justify-center">
                <h4 className="text-neutral-900 font-bold text-sm mb-2 tracking-wide uppercase">KOTHTHU</h4>
                <div className="text-gold text-lg font-medium mb-1">LKR 2,500</div>
                <div className="text-neutral-500 text-xs">60 portions</div>
              </div>
              <div className="p-6 border-b sm:border-b-0 sm:border-r border-neutral-200 flex flex-col justify-center">
                <h4 className="text-neutral-900 font-bold text-sm mb-2 tracking-wide uppercase">STRING HOPPERS</h4>
                <div className="text-gold text-lg font-medium mb-1">LKR 2,500</div>
                <div className="text-neutral-500 text-xs">60 portions</div>
              </div>
              <div className="p-6 border-neutral-200 flex flex-col justify-center">
                <h4 className="text-neutral-900 font-bold text-sm mb-2 tracking-wide uppercase">BITES BOARD</h4>
                <div className="text-gold text-lg font-medium mb-1">On request</div>
                <div className="text-neutral-500 text-xs text-balance">Chicken • Pork • Fish • Cutlets</div>
              </div>
            </div>
          </div>

          {/* Main Packages */}
          <div>
            <h3 className="text-neutral-900 text-sm font-bold tracking-widest uppercase mb-6 px-2">CHOOSE YOUR PACKAGE</h3>
            <div className="w-full h-px bg-neutral-200 mb-6" />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-lg">
              {/* Classic */}
              <div className="p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-neutral-200 bg-neutral-50/50">
                <div className="mb-8">
                  <h4 className="font-heading text-3xl font-bold text-neutral-900 mb-2">Classic</h4>
                  <p className="text-sm text-neutral-500">Elegant essentials</p>
                </div>
                <div className="mb-10">
                  <div className="text-gold text-3xl mb-1">LKR 3,900</div>
                  <div className="text-xs text-neutral-400">net per person • min. 100 pax</div>
                </div>
                
                <div className="mb-8">
                  <h5 className="text-xs font-bold text-gold tracking-widest uppercase mb-6">HALL & SERVICE</h5>
                  <ul className="space-y-4">
                    {['Banquet hall access', 'Basic table & chair setup', 'Standard linen & tableware', 'Service staff included'].map((item, i) => (
                      <li key={i} className="flex text-sm text-neutral-700 font-medium items-start"><span className="text-gold mr-3 text-lg leading-none">•</span> <span className="leading-tight shrink">{item}</span></li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h5 className="text-xs font-bold text-gold tracking-widest uppercase mb-6">MENU INCLUDES</h5>
                  <ul className="space-y-4">
                    {[
                      'Welcome drink (1 choice)', 
                      'Veg creamy soup & bread', 
                      'Green salad & Mexican slaw', 
                      'Seafood fried rice & steam rice', 
                      'Noodles & cheese pasta', 
                      'Chicken, beef, fish & prawns', 
                      'Cashew curry, potato, dhal & mixed veg', 
                      'Hot butter cuttlefish', 
                      'Full condiments board', 
                      'Desserts — caramel, watalappan, mousse, bread pudding, ice cream'
                    ].map((item, i) => (
                      <li key={i} className="flex text-sm text-neutral-700 font-medium items-start"><span className="text-gold mr-3 text-lg leading-none">•</span> <span className="leading-snug shrink">{item}</span></li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-12">
                  <Link href="/booking" className="block w-full py-4 text-center border border-neutral-300 text-neutral-900 bg-white text-sm font-bold tracking-widest hover:bg-neutral-100 transition-colors rounded-lg shadow-sm">
                    ENQUIRE ↗
                  </Link>
                </div>
              </div>

              {/* Premier */}
              <div className="p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-gold/20 bg-white relative flex flex-col shadow-2xl z-10 scale-[1.02] -my-2 lg:-my-4 rounded-xl border">
                <div className="absolute top-0 left-0 w-full h-[4px] bg-gold rounded-t-xl" />
                <div className="absolute top-6 right-6 lg:right-auto lg:left-10 bg-gold/10 text-gold text-[10px] font-bold tracking-widest px-3 py-1 rounded-full uppercase">Most Popular</div>
                <div className="mb-8 mt-10 lg:mt-6">
                  <h4 className="font-heading text-3xl font-bold text-neutral-900 mb-2">Premier</h4>
                  <p className="text-sm text-neutral-500">Our signature experience</p>
                </div>
                <div className="mb-10">
                  <div className="text-gold text-3xl mb-1">LKR 5,500</div>
                  <div className="text-xs text-neutral-400">net per person • min. 100 pax</div>
                </div>
                
                <div className="mb-8">
                  <h5 className="text-xs font-bold text-gold tracking-widest uppercase mb-6">HALL & SERVICE</h5>
                  <ul className="space-y-4">
                    {[
                      'Banquet hall access', 
                      'Premium table & chair setup', 
                      'Upgraded linen & tableware', 
                      'Dedicated service staff',
                      'Floral centrepiece on tables'
                    ].map((item, i) => (
                      <li key={i} className="flex text-sm text-neutral-700 font-medium items-start"><span className="text-gold mr-3 text-lg leading-none">•</span> <span className="leading-tight shrink">{item}</span></li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex-grow">
                  <h5 className="text-xs font-bold text-gold tracking-widest uppercase mb-6">MENU INCLUDES</h5>
                  <ul className="space-y-4">
                    {[
                      'Welcome drink (1 choice)', 
                      'Veg & chicken creamy soup, bread corner', 
                      'Appetizer shooters & tuna pasta', 
                      'Green salad & Mexican slaw', 
                      '2 rice choices from 4 options', 
                      'Noodles or pasta (1 choice)', 
                      'Chicken & pork (1 choice each)', 
                      'Fish (1 choice from 3)', 
                      '4 vegetable choices from 7', 
                      'Full condiments board',
                      'Expanded dessert buffet — 9 selections'
                    ].map((item, i) => (
                      <li key={i} className="flex text-sm text-neutral-700 font-medium items-start"><span className="text-gold mr-3 text-lg leading-none">•</span> <span className="leading-snug shrink">{item}</span></li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-12">
                  <Link href="/booking" className="block w-full py-4 text-center bg-gold text-white text-sm font-bold tracking-widest hover:bg-gold/90 transition-colors rounded-lg shadow-md hover:shadow-lg">
                    ENQUIRE ↗
                  </Link>
                </div>
              </div>

              {/* Prestige */}
              <div className="p-8 lg:p-10 flex flex-col bg-neutral-50/50">
                <div className="mb-8">
                  <h4 className="font-heading text-3xl font-bold text-neutral-900 mb-2">Prestige</h4>
                  <p className="text-sm text-neutral-500">The grandest celebration</p>
                </div>
                <div className="mb-10">
                  <div className="text-gold text-3xl mb-1">LKR 6,000</div>
                  <div className="text-xs text-neutral-400">net per person • min. 100 pax</div>
                </div>
                
                <div className="mb-8">
                  <h5 className="text-xs font-bold text-gold tracking-widest uppercase mb-6">HALL & SERVICE</h5>
                  <ul className="space-y-4">
                    {[
                      'Banquet hall access', 
                      'Grand table & chair setup', 
                      'Premium linen, tableware & charger plates', 
                      'Senior dedicated service team',
                      'Floral centrepieces & aisle décor',
                      'Welcome reception area setup'
                    ].map((item, i) => (
                      <li key={i} className="flex text-sm text-neutral-700 font-medium items-start"><span className="text-gold mr-3 text-lg leading-none">•</span> <span className="leading-tight shrink">{item}</span></li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex-grow">
                  <h5 className="text-xs font-bold text-gold tracking-widest uppercase mb-6">MENU INCLUDES</h5>
                  <ul className="space-y-4">
                    {[
                      'Welcome drink (1 choice)', 
                      'Veg & chicken soup, bread corner', 
                      'Prawn cocktail, seafood terrine & appetizer shooters', 
                      'Thai seafood salad, Thai beef salad & 2 more', 
                      '3 rice choices incl. Mongolian rice & biriyani', 
                      '2 noodle / pasta choices', 
                      'Chicken, pork, fish (1 choice each)', 
                      'Sea food — hot butter prawns or cuttlefish', 
                      '5 vegetable choices from 7', 
                      'Full condiments board',
                      'Dessert buffet — 6 choices from 11 selections'
                    ].map((item, i) => (
                      <li key={i} className="flex text-sm text-neutral-700 font-medium items-start"><span className="text-gold mr-3 text-lg leading-none">•</span> <span className="leading-snug shrink">{item}</span></li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-12">
                  <Link href="/booking" className="block w-full py-4 text-center border border-neutral-300 text-neutral-900 bg-white text-sm font-bold tracking-widest hover:bg-neutral-100 transition-colors rounded-lg shadow-sm">
                    ENQUIRE ↗
                  </Link>
                </div>
              </div>
            </div>
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
