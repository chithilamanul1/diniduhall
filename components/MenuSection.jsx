'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Utensils, 
  Wine, 
  ChevronRight, 
  Star,
  Coffee,
  ChefHat
} from 'lucide-react'

const MENU_DATA = {
  packages: [
    {
      id: 'menu1',
      title: 'Menu 1',
      subtitle: 'Classic Heritage',
      description: 'A traditional selection of Sri Lankan favorites.',
      items: [
        { type: 'Staples', content: 'Fried Rice / Steam Rice' },
        { type: 'Meat', content: 'Chicken Curry / Black Pork Curry' },
        { type: 'Seafood', content: 'Fish Ambulthiyal' },
        { type: 'Vegetables', content: 'Dhal Curry / Potato Tempered' },
        { type: 'Acquaintances', content: 'Brinjal Moju, Malay Pickle, Sambol' },
        { type: 'Crunch', content: 'Crispy Papadam & Fresh Salad' },
        { type: 'Desserts', content: 'Vanilla Ice Cream / Fresh Fruit Salad' },
      ]
    },
    {
      id: 'menu2',
      title: 'Menu 2',
      subtitle: 'Executive Choice',
      description: 'Enhanced variety with premium side selections.',
      items: [
        { type: 'Staples', content: 'Fried Rice / White Rice' },
        { type: 'Meat', content: 'Chicken Curry / Black Pork Curry' },
        { type: 'Seafood', content: 'Fish Devilled / Fish Stew' },
        { type: 'Vegetables', content: 'Dhal Curry / Potato Tempered' },
        { type: 'Acquaintances', content: 'Brinjal Moju, Malay Pickle' },
        { type: 'Crunch', content: 'Crispy Papadam & Green Salad' },
        { type: 'Desserts', content: 'Cream Caramel / Watalappam' },
      ]
    },
    {
      id: 'menu3',
      title: 'Menu 3',
      subtitle: 'Grand Celebration',
      description: 'A balanced blend of rice and noodle specialties.',
      items: [
        { type: 'Staples', content: 'Fried Rice / White Rice / Noodles' },
        { type: 'Meat', content: 'Chicken Curry / Black Pork Curry' },
        { type: 'Seafood', content: 'Fish Ambulthiyal / Beef Stew' },
        { type: 'Vegetables', content: 'Cadju Curry / Dhal Curry' },
        { type: 'Acquaintances', content: 'Brinjal Moju / Potato Tempered' },
        { type: 'Crunch', content: 'Malay Pickle, Sambol, Papadam, Salad' },
        { type: 'Desserts', content: 'Cream Caramel / Watalappam' },
      ]
    },
    {
      id: 'menu4',
      title: 'Menu 4',
      subtitle: 'Imperial Deluxe',
      description: 'Our most diverse offering for large gatherings.',
      items: [
        { type: 'Staples', content: 'Fried Rice / White Rice / Noodles' },
        { type: 'Meat', content: 'Chicken Curry / Black Pork Curry' },
        { type: 'Seafood', content: 'Fish Ambulthiyal / Pork Devilled' },
        { type: 'Vegetables', content: 'Cadju Curry / Dhal Curry' },
        { type: 'Acquaintances', content: 'Brinjal Moju / Potato Tempered' },
        { type: 'Crunch', content: 'Malay Pickle, Chutney, Papadam, Egg Salad' },
        { type: 'Desserts', content: 'Watalappam, Jelly & Custard, Ice Cream' },
      ]
    },
    {
      id: 'menu5',
      title: 'Menu 5',
      subtitle: 'Signature Buriyani',
      description: 'Exquisite Buriyani feast for true gourmets.',
      items: [
        { type: 'Welcome', content: 'Fresh Signature Welcome Drink' },
        { type: 'Main', content: 'Premium Chicken Buriyani' },
        { type: 'Curry', content: 'Authentic Chicken Kuruma' },
        { type: 'Special', content: 'Grand Cadju & Pea Curry' },
        { type: 'Sides', content: 'Brinjal Moju / Pineapple Thel' },
        { type: 'Relish', content: 'Umbalakada Sambol / Malay Pickle' },
        { type: 'Desserts', content: 'Traditional Watalappam / Jelly & Custard' },
      ]
    }
  ],
  bites: [
    { name: 'Devilled Chicken', category: 'Meat' },
    { name: 'Peppered Pork', category: 'Meat' },
    { name: 'Spicy Beef', category: 'Meat' },
    { name: 'Hot Butter Prawns', category: 'Seafood' },
    { name: 'Devilled Cuttlefish', category: 'Seafood' },
    { name: 'Crispy Fried Fish', category: 'Seafood' },
    { name: 'Classic Cutlets', category: 'Snacks' },
    { name: 'Devilled Sausages', category: 'Snacks' },
    { name: 'French Fries', category: 'Sides' },
    { name: 'Boiled Vegetables', category: 'Veg' },
    { name: 'Spicy Kadala', category: 'Snacks' },
    { name: 'Devilled Cashew', category: 'Premium' },
    { name: 'Venue BBQ Special', category: 'Premium' },
  ]
}

export default function MenuSection() {
  const [activeTab, setActiveTab] = useState('packages')
  const [selectedPackage, setSelectedPackage] = useState(MENU_DATA.packages[4]) // Default to Menu 5

  return (
    <section id="menu" className="py-32 px-4 md:px-8 bg-cream relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-body text-sm text-gold uppercase tracking-[0.4em] mb-4 block font-semibold"
          >
            Culinary Excellence
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-6xl md:text-8xl text-neutral-900 leading-[0.9]"
          >
            Banquet <span className="italic font-light">Experiences</span>
          </motion.h2>
        </div>

        {/* Tab Controls */}
        <div className="flex justify-center mb-16">
          <div className="flex gap-2 p-1.5 rounded-full bg-neutral-100 border border-neutral-200">
            <button
              onClick={() => setActiveTab('packages')}
              className={`flex items-center gap-2 px-8 py-3 rounded-full font-body text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                activeTab === 'packages' ? 'bg-neutral-900 text-gold shadow-lg' : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              <Utensils size={14} /> Banquet Packages
            </button>
            <button
              onClick={() => setActiveTab('bites')}
              className={`flex items-center gap-2 px-8 py-3 rounded-full font-body text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                activeTab === 'bites' ? 'bg-neutral-900 text-gold shadow-lg' : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              <Wine size={14} /> Standard Bites
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'packages' ? (
            <motion.div
              key="packages"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12"
            >
              {/* Package Navigation */}
              <div className="lg:col-span-5 space-y-4">
                {MENU_DATA.packages.map((pkg) => (
                  <button
                    key={pkg.id}
                    onClick={() => setSelectedPackage(pkg)}
                    className={`w-full text-left p-6 rounded-[2rem] border transition-all duration-500 group relative overflow-hidden ${
                      selectedPackage.id === pkg.id 
                        ? 'bg-neutral-900 border-gold/30 shadow-2xl' 
                        : 'bg-white border-neutral-200 hover:border-gold/20 hover:shadow-xl'
                    }`}
                  >
                    <div className="flex justify-between items-center relative z-10">
                      <div>
                        <span className={`text-[10px] uppercase tracking-[0.3em] font-bold mb-1 block ${
                          selectedPackage.id === pkg.id ? 'text-gold' : 'text-neutral-400'
                        }`}>
                          {pkg.subtitle}
                        </span>
                        <h3 className={`text-2xl font-heading ${
                          selectedPackage.id === pkg.id ? 'text-white' : 'text-neutral-900'
                        }`}>
                          {pkg.title}
                        </h3>
                      </div>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                        selectedPackage.id === pkg.id ? 'bg-gold text-white rotate-90' : 'bg-neutral-100 text-neutral-400 rotate-0'
                      }`}>
                        <ChevronRight size={18} />
                      </div>
                    </div>
                    {/* Active Accent */}
                    {selectedPackage.id === pkg.id && (
                      <motion.div 
                        layoutId="active-bg"
                        className="absolute inset-0 bg-gradient-to-r from-gold/10 to-transparent"
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Package Details */}
              <div className="lg:col-span-7 bg-white rounded-[3rem] p-8 md:p-12 border border-neutral-200 shadow-2xl relative overflow-hidden group">
                {/* Decorative Icon */}
                <div className="absolute top-8 right-8 text-neutral-50 opacity-100 transition-transform duration-1000 group-hover:scale-110">
                  <ChefHat size={120} className="text-gold/20" />
                </div>

                <div className="relative z-10 h-full flex flex-col">
                  <div className="mb-12">
                    <div className="flex items-center gap-2 mb-4">
                      {Array(5).fill(0).map((_, i) => (
                        <Star key={i} size={12} className="text-gold fill-gold" />
                      ))}
                    </div>
                    <h4 className="text-4xl md:text-5xl font-heading text-neutral-900 mb-4">
                      {selectedPackage.title}
                    </h4>
                    <p className="font-body text-neutral-500 max-w-md">
                      {selectedPackage.description}
                    </p>
                  </div>

                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    {selectedPackage.items.map((item, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="pb-4 border-b border-neutral-100"
                      >
                        <span className="text-[10px] text-gold uppercase tracking-widest font-bold mb-1 block">
                          {item.type}
                        </span>
                        <p className="font-body text-neutral-900 font-medium">
                          {item.content}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-12 pt-8 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="text-center sm:text-left">
                      <span className="text-[10px] text-neutral-400 uppercase tracking-widest block mb-1">Inquiry for Packages</span>
                      <p className="font-heading text-xl text-neutral-900">Customized Catering</p>
                    </div>
                    <a 
                      href="/booking" 
                      className="w-full sm:w-auto px-10 py-4 bg-neutral-900 text-gold rounded-full font-body text-xs font-bold uppercase tracking-widest hover:bg-gold hover:text-white transition-all duration-500 shadow-xl shadow-gold/10"
                    >
                      Reserve Now
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="bites"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-[3rem] p-4 md:p-12 border border-neutral-200 shadow-2xl"
            >
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                {MENU_DATA.bites.map((bite, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.03 }}
                    className="group relative p-6 rounded-3xl border border-neutral-100 hover:border-gold/30 hover:bg-gold/5 transition-all duration-300 overflow-hidden"
                  >
                    <div className="text-[10px] text-neutral-400 uppercase tracking-widest mb-2 group-hover:text-gold transition-colors">
                      {bite.category}
                    </div>
                    <h5 className="font-heading text-xl text-neutral-900">{bite.name}</h5>
                    <div className="absolute bottom-0 right-0 w-12 h-12 bg-gold/10 rounded-tl-3xl translate-x-12 translate-y-12 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500 flex items-center justify-center">
                      <Star size={14} className="text-gold" />
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-16 text-center">
                <p className="font-body text-neutral-500 max-w-2xl mx-auto italic">
                  * Our Standard Bites are primarily served as side additions to the banquet buffet. 
                  Please inquire about bulk serving portions for your cocktail hour.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}