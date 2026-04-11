'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ChevronRightIcon, CheckCircleIcon } from 'lucide-react'
import Image from 'next/image'

type TabType = 'wedding' | 'corporate' | 'outdoor'

const weddingPackages = [
  {
    name: 'Classic Wedding Package',
    price: 'LKR 3,500 per person',
    items: [
      'Welcome Drinks',
      'Appetizer Platter',
      'Main Course Buffet (5 dishes)',
      'Dessert Selection',
      'Wedding Cake',
      'Beverages',
    ],
  },
  {
    name: 'Premium Wedding Package',
    price: 'LKR 5,000 per person',
    items: [
      'Champagne Reception',
      'Canapé Selection',
      'Live Cooking Stations',
      'Main Course Buffet (8 dishes)',
      'Premium Dessert Bar',
      'Custom Wedding Cake',
      'Full Bar Service',
    ],
  },
  {
    name: 'Royal Wedding Package',
    price: 'LKR 7,500 per person',
    items: [
      'Luxury Welcome Reception',
      'International Canapés',
      'Multiple Live Stations',
      'Gourmet Buffet (12 dishes)',
      'Chocolate Fountain',
      'Custom Multi-Tier Cake',
      'Premium Bar & Sommelier',
      'Late Night Snacks',
    ],
  },
]

const corporatePackages = [
  {
    name: 'Business Breakfast',
    price: 'LKR 1,200 per person',
    items: [
      'Fresh Fruit Platter',
      'Pastries & Breads',
      'Hot Breakfast Items',
      'Coffee & Tea Service',
      'Fresh Juices',
    ],
  },
  {
    name: 'Corporate Lunch',
    price: 'LKR 2,000 per person',
    items: [
      'Salad Bar',
      'Soup Station',
      'Main Course (3 options)',
      'Rice & Breads',
      'Dessert',
      'Beverages',
    ],
  },
  {
    name: 'Gala Dinner',
    price: 'LKR 4,500 per person',
    items: [
      'Cocktail Reception',
      'Appetizers',
      'Premium Main Course (5 options)',
      'Wine Pairing',
      'Gourmet Desserts',
      'Coffee Service',
    ],
  },
]

const outdoorPackages = [
  {
    name: 'Garden Party Package',
    price: 'LKR 2,500 per person',
    items: [
      'BBQ Station',
      'Grilled Specialties',
      'Fresh Salads',
      'Finger Foods',
      'Refreshments',
      'Dessert Table',
    ],
  },
  {
    name: 'Beach Event Package',
    price: 'LKR 3,500 per person',
    items: [
      'Seafood Station',
      'Grilled Meats',
      'Tropical Salads',
      'Beach Cocktails',
      'Ice Cream Bar',
      'Sunset Canapés',
    ],
  },
  {
    name: 'Festival Catering',
    price: 'Custom Quote',
    items: [
      'Multiple Food Stalls',
      'Live Cooking Demos',
      'Street Food Selection',
      'Beverage Stations',
      'Dessert Trucks',
      'Custom Menu Design',
    ],
  },
]

export default function CateringServices() {
  const [activeTab, setActiveTab] = useState<TabType>('wedding')
  
  const getPackages = () => {
    switch (activeTab) {
      case 'wedding':
        return weddingPackages
      case 'corporate':
        return corporatePackages
      case 'outdoor':
        return outdoorPackages
    }
  }
  
  return (
    <div className="w-full bg-cream">
      {/* Hero Banner */}
      <section className="relative h-[60vh] w-full overflow-hidden">
        <Image
          src="/images/business/unnamed (44).webp"
          alt="Dinidu Caterers - Exquisite Event Catering in Sri Lanka"
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
              Exquisite Dining
            </span>
            <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl text-white mb-6">
              Catering <span className="italic font-light">Services</span>
            </h1>
            <div className="w-24 h-[2px] bg-orange mb-8" />
            <p className="font-body text-xl md:text-2xl text-white/90 max-w-2xl mx-auto font-light leading-relaxed">
              Exquisite culinary experiences crafted for your special occasions
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
            <div className="mb-10 mx-auto">
              <Image
                src="/images/dinidu-caterers-logo.png"
                alt="Dinidu Caterers"
                width={200}
                height={200}
                className="h-28 w-auto object-contain mx-auto"
              />
            </div>
            <span className="font-body text-sm text-orange uppercase tracking-[0.2em] mb-4 block">
              Our Expertise
            </span>
            <h2 className="font-heading text-4xl md:text-5xl text-neutral-900 mb-6 leading-tight">
              Culinary <span className="italic font-light">Excellence</span>
            </h2>
            <div className="w-16 h-[2px] bg-orange mb-8" />
            <p className="font-body text-lg text-neutral-600 mb-6 leading-relaxed">
              Our award-winning culinary team brings decades of experience to
              create memorable dining experiences. From intimate gatherings to
              grand celebrations, we tailor our menus to reflect your taste and
              style.
            </p>
            <p className="font-body text-lg text-neutral-600 leading-relaxed">
              Using only the finest ingredients and innovative techniques, we
              ensure every dish is a masterpiece.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tabbed Menu Interface */}
      <section className="py-24 px-4 bg-cream border-t border-neutral-200">
        <div className="max-w-7xl mx-auto">
          {/* Tab Navigation */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <button
              onClick={() => setActiveTab('wedding')}
              className={`px-8 py-4 rounded-full font-body font-medium tracking-wide transition-all ${activeTab === 'wedding' ? 'bg-orange text-white shadow-lg' : 'bg-white text-neutral-600 hover:bg-neutral-50 border border-neutral-200'}`}
            >
              Wedding Packages
            </button>
            <button
              onClick={() => setActiveTab('corporate')}
              className={`px-8 py-4 rounded-full font-body font-medium tracking-wide transition-all ${activeTab === 'corporate' ? 'bg-orange text-white shadow-lg' : 'bg-white text-neutral-600 hover:bg-neutral-50 border border-neutral-200'}`}
            >
              Corporate Events
            </button>
            <button
              onClick={() => setActiveTab('outdoor')}
              className={`px-8 py-4 rounded-full font-body font-medium tracking-wide transition-all ${activeTab === 'outdoor' ? 'bg-orange text-white shadow-lg' : 'bg-white text-neutral-600 hover:bg-neutral-50 border border-neutral-200'}`}
            >
              Outdoor Catering
            </button>
          </div>

          {/* Package Cards */}
          <motion.div
            key={activeTab}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.4,
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {getPackages().map((pkg, index) => (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                className="bg-white rounded-3xl p-10 shadow-sm hover:shadow-xl transition-shadow border border-neutral-100"
              >
                <div className="border-b border-neutral-200 pb-6 mb-8">
                  <h3 className="font-heading text-3xl font-bold text-neutral-900 mb-3">
                    {pkg.name}
                  </h3>
                  <p className="font-body text-xl font-medium text-orange">
                    {pkg.price}
                  </p>
                </div>
                <ul className="space-y-4">
                  {pkg.items.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircleIcon className="w-5 h-5 text-orange flex-shrink-0 mt-0.5 mr-4" />
                      <span className="font-body text-neutral-600 leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Culinary Imagery Section */}
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
            <span className="font-body text-sm text-orange uppercase tracking-[0.2em] mb-4 block">
              Gallery
            </span>
            <h2 className="font-heading text-4xl md:text-5xl text-neutral-900 mb-6 leading-tight">
              A Feast for the <span className="italic font-light">Senses</span>
            </h2>
            <div className="w-16 h-[2px] bg-orange mb-8" />
            <p className="font-body text-lg text-neutral-600">
              Every dish is crafted with passion and precision
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              '/images/business/unnamed.webp',
              '/images/business/unnamed (2).webp',
              '/images/business/unnamed (3).webp',
              '/images/business/unnamed (4).webp',
              '/images/business/unnamed (5).webp',
              '/images/business/unnamed (6).webp',
            ].map((image, index) => (
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
                  delay: index * 0.05,
                }}
                className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
              >
                <Image
                  src={image}
                  alt={`Dinidu Caterers - Wedding and Event Catering Sri Lanka Photo ${index + 1}`}
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
            <span className="font-body text-sm text-orange uppercase tracking-[0.2em] mb-4 block">
              Inquiries
            </span>
            <h2 className="font-heading text-4xl md:text-5xl text-neutral-900 mb-6 leading-tight">
              Create Your Perfect <span className="italic font-light">Menu</span>
            </h2>
            <div className="w-16 h-[2px] bg-orange mb-8" />
            <p className="font-body text-lg text-neutral-600 mb-10 leading-relaxed">
              Our culinary team is ready to customize a menu that perfectly
              suits your event and exceeds your expectations.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/booking"
                className="inline-flex items-center justify-center bg-orange text-white px-10 py-4 rounded-full font-body font-medium tracking-wide hover:bg-orange/90 transition-colors"
              >
                Request a Quote
                <ChevronRightIcon className="ml-2 w-5 h-5" />
              </Link>
              <a
                href="tel:0777328155"
                className="inline-flex items-center justify-center bg-white text-neutral-900 border border-neutral-200 px-10 py-4 rounded-full font-body font-medium tracking-wide hover:bg-neutral-50 transition-colors"
              >
                Call Us Now
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
