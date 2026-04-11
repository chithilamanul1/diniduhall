'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ClockIcon, ChevronRightIcon, UtensilsIcon } from 'lucide-react'
import Image from 'next/image'

const chefRecommendations = [
  {
    name: 'Smoked Brisket Platter',
    description:
      '12-hour smoked beef brisket, house BBQ sauce, coleslaw, cornbread',
    price: 'LKR 3,200',
    tag: 'Signature',
  },
  {
    name: 'Road House Burger',
    description:
      'Double patty, aged cheddar, bacon jam, crispy onions, brioche bun',
    price: 'LKR 1,800',
    tag: 'Popular',
  },
  {
    name: 'Grilled Salmon Steak',
    description:
      'Atlantic salmon, lemon butter, roasted vegetables, garlic mash',
    price: 'LKR 2,900',
    tag: "Chef's Pick",
  },
  {
    name: 'Premium Ribs',
    description: 'Fall-off-the-bone pork ribs, whiskey glaze, mac & cheese',
    price: 'LKR 2,600',
    tag: 'Signature',
  },
  {
    name: 'Truffle Mushroom Pasta',
    description: 'Fresh fettuccine, wild mushrooms, truffle cream, parmesan',
    price: 'LKR 2,100',
    tag: 'Vegetarian',
  },
  {
    name: 'Steak & Frites',
    description: '250g ribeye, peppercorn sauce, hand-cut fries, rocket salad',
    price: 'LKR 3,500',
    tag: 'Premium',
  },
]

export default function RoadHouseRestaurant() {
  return (
    <div className="w-full bg-cream">
      {/* Hero Banner */}
      <section className="relative h-[60vh] w-full overflow-hidden">
        <Image
          src="/images/business/unnamed (33).webp"
          alt="Road House Restaurant Seeduwa - High-End Dining"
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
              Exceptional Dining
            </span>
            <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl text-white mb-6">
              Road House <span className="italic font-light">Restaurant</span>
            </h1>
            <div className="w-24 h-[2px] bg-blue mb-8" />
            <p className="font-body text-xl md:text-2xl text-white/90 max-w-2xl mx-auto font-light leading-relaxed">
              Refined Flavors • Unforgettable Nights
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
                src="/images/roadhouse-logo.png"
                alt="Road House"
                width={120}
                height={120}
                className="h-16 w-auto object-contain mx-auto"
              />
            </div>
            <span className="font-body text-sm text-blue uppercase tracking-[0.2em] mb-4 block">
              Welcome
            </span>
            <h2 className="font-heading text-4xl md:text-5xl text-neutral-900 mb-6 leading-tight">
              A Culinary <span className="italic font-light">Journey</span>
            </h2>
            <div className="w-16 h-[2px] bg-blue mb-8" />
            <p className="font-body text-lg text-neutral-600 mb-6 leading-relaxed">
              Road House Restaurant offers a sophisticated yet welcoming dining
              experience. Our elegant interior, ambient lighting, and
              exceptional service create the perfect setting for intimate
              dinners, family gatherings, and celebrations.
            </p>
            <p className="font-body text-lg text-neutral-600 leading-relaxed">
              From premium steaks to delicate seafood, our menu is crafted with
              passion and precision by our expert culinary team.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Image & Features */}
      <section className="py-24 px-4 bg-cream border-t border-neutral-200">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
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
                  src="/images/business/unnamed (44).webp"
                  alt="Road House Restaurant Interior and Culinary Excellence"
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
                <span className="font-body text-sm text-blue uppercase tracking-[0.2em] mb-4 block text-left">
                  YOUR PERFECT VENUE
                </span>
                <h3 className="font-heading text-4xl md:text-5xl text-neutral-900 mb-6 leading-tight text-left">
                  Set the Stage for <span className="italic font-light">Celebration</span>
                </h3>
                <div className="w-16 h-[2px] bg-blue mb-8" />
                <p className="font-body text-lg text-neutral-600 mb-8 leading-relaxed text-left">
                  Whether it's an intimate gathering or a grand reception, we provide the perfect backdrop. Impeccable service meets stunning design to bring your vision to life.
                </p>
                <div className="space-y-6">
                  <div className="flex items-start group">
                    <div className="w-10 h-10 rounded-full bg-blue/10 flex items-center justify-center mr-4 flex-shrink-0 group-hover:bg-blue group-hover:text-white transition-all duration-300 text-blue">
                      <UtensilsIcon className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-heading text-xl font-bold text-neutral-900 mb-1">
                        Culinary Excellence
                      </h4>
                      <p className="font-body text-neutral-600">
                        From traditional Sri Lankan feasts to international flavors, crafted to perfection.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start group">
                    <div className="w-10 h-10 rounded-full bg-blue/10 flex items-center justify-center mr-4 flex-shrink-0 group-hover:bg-blue group-hover:text-white transition-all duration-300 text-blue">
                      <ClockIcon className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-heading text-xl font-bold text-neutral-900 mb-1">
                        Set the Mood
                      </h4>
                      <p className="font-body text-neutral-600">
                        Fully equipped to host the entertainment that keeps your party alive.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Chef's Recommendations */}
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
            <span className="font-body text-sm text-blue uppercase tracking-[0.2em] mb-4 block">
              Menu Highlights
            </span>
            <h2 className="font-heading text-4xl md:text-5xl text-neutral-900 mb-6 leading-tight">
              Chef's <span className="italic font-light">Recommendations</span>
            </h2>
            <div className="w-16 h-[2px] bg-blue mb-8" />
            <p className="font-body text-lg text-neutral-600">
              Discover our signature dishes, prepared with the finest
              ingredients
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {chefRecommendations.map((dish, index) => (
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
                className="bg-white rounded-3xl p-10 shadow-sm hover:shadow-xl transition-shadow border border-neutral-100"
              >
                <div className="flex justify-between items-start mb-6">
                  <span className="font-body text-xs text-blue uppercase tracking-wider font-semibold">
                    {dish.tag}
                  </span>
                  <UtensilsIcon className="w-5 h-5 text-neutral-300" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-neutral-900 mb-3">
                  {dish.name}
                </h3>
                <p className="font-body text-neutral-600 mb-6 leading-relaxed">
                  {dish.description}
                </p>
                <p className="font-body text-xl font-medium text-blue">
                  {dish.price}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Operating Hours & CTA */}
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
            <div className="bg-white rounded-[3rem] shadow-xl p-10 md:p-16 mb-16 w-full border border-neutral-100">
              <span className="font-body text-sm text-blue uppercase tracking-[0.2em] mb-4 block">
                Visit Us
              </span>
              <h2 className="font-heading text-4xl md:text-5xl text-neutral-900 mb-6 leading-tight">
                Operating <span className="italic font-light">Hours</span>
              </h2>
              <div className="w-16 h-[2px] bg-blue mx-auto mb-10" />

              <div className="max-w-md mx-auto space-y-6 font-body text-neutral-700">
                <div className="flex justify-between border-b border-neutral-100 pb-4">
                  <span className="font-medium tracking-wide">
                    Monday - Thursday
                  </span>
                  <span>11:00 AM - 11:00 PM</span>
                </div>
                <div className="flex justify-between border-b border-neutral-100 pb-4">
                  <span className="font-medium tracking-wide">
                    Friday - Saturday
                  </span>
                  <span>11:00 AM - 1:00 AM</span>
                </div>
                <div className="flex justify-between pb-4">
                  <span className="font-medium tracking-wide">Sunday</span>
                  <span>12:00 PM - 10:00 PM</span>
                </div>
              </div>
              <div className="mt-10 inline-block px-8 py-3 bg-blue/5 rounded-full border border-blue/20">
                <p className="font-body text-sm font-medium text-blue tracking-wide">
                  Live Jazz Every Friday & Saturday Night
                </p>
              </div>
            </div>

            <span className="font-body text-sm text-blue uppercase tracking-[0.2em] mb-4 block">
              Reservations
            </span>
            <h2 className="font-heading text-4xl md:text-5xl text-neutral-900 mb-6 leading-tight">
              Reserve Your <span className="italic font-light">Table</span>
            </h2>
            <div className="w-16 h-[2px] bg-blue mb-8" />
            <p className="font-body text-lg text-neutral-600 mb-10 leading-relaxed">
              Join us for an unforgettable dining experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/booking"
                className="inline-flex items-center justify-center bg-blue text-white px-10 py-4 rounded-full font-body font-medium tracking-wide hover:bg-blue/90 transition-colors"
              >
                Book Now
                <ChevronRightIcon className="ml-2 w-5 h-5" />
              </Link>
              <a
                href="tel:0777328155"
                className="inline-flex items-center justify-center bg-white text-neutral-900 border border-neutral-200 px-10 py-4 rounded-full font-body font-medium tracking-wide hover:bg-neutral-50 transition-colors"
              >
                Call Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
