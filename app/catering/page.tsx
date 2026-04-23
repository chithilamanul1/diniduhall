'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ChevronRightIcon, CheckCircleIcon } from 'lucide-react'
import Image from 'next/image'

type TabType = 'wedding' | 'corporate' | 'outdoor' | 'funeral'

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
  const [memorialTab, setMemorialTab] = useState<'mala_batha' | 'dane'>('mala_batha')
  
  const getPackages = () => {
    switch (activeTab) {
      case 'wedding':
        return weddingPackages
      case 'outdoor':
        return outdoorPackages
      default:
        return []
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
          <div className="flex flex-wrap justify-center gap-4 mb-16">
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
              onClick={() => setActiveTab('funeral')}
              className={`px-8 py-4 rounded-full font-body font-medium tracking-wide transition-all ${activeTab === 'funeral' ? 'bg-orange text-white shadow-lg' : 'bg-white text-neutral-600 hover:bg-neutral-50 border border-neutral-200'}`}
            >
              Memorial & Funeral
            </button>
            <button
              onClick={() => setActiveTab('outdoor')}
              className={`px-8 py-4 rounded-full font-body font-medium tracking-wide transition-all ${activeTab === 'outdoor' ? 'bg-orange text-white shadow-lg' : 'bg-white text-neutral-600 hover:bg-neutral-50 border border-neutral-200'}`}
            >
              Outdoor Catering
            </button>
          </div>

          {/* Package Cards & Custom Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {activeTab === 'corporate' ? (
              <div className="bg-[#1a1a1a] rounded-[2rem] border border-neutral-800 p-8 md:p-12 shadow-2xl">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                  <div>
                    <h3 className="font-heading text-4xl text-white mb-2">Corporate Events</h3>
                    <p className="text-white/70 max-w-2xl text-sm leading-relaxed">From working lunches and tea breaks to gala dinners and award ceremonies — professional catering that runs on time, every time.</p>
                  </div>
                  <Link href="/contact" className="inline-flex items-center px-6 py-3 rounded-full border border-white/20 text-white/90 hover:bg-white/10 transition-colors text-sm font-medium tracking-wide shrink-0">
                    Contact us <span className="text-white/50 ml-2">for pricing</span>
                  </Link>
                </div>
                
                <div className="bg-[#262626] rounded-xl border border-white/5 overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-3 border-b border-white/10">
                    <div className="p-8 border-b md:border-b-0 md:border-r border-white/10 last:border-0">
                      <h4 className="text-gold text-xs font-bold tracking-widest uppercase mb-6">TEA BREAK & SNACKS</h4>
                      <ul className="space-y-4">
                        {['Hot tea & coffee', 'Assorted short eats', 'Finger sandwiches', 'Pastries & biscuits', 'Fresh juices'].map((item, i) => (
                          <li key={i} className="text-white/90 text-sm border-b border-white/5 pb-2 last:border-0">{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-8 border-b md:border-b-0 md:border-r border-white/10 last:border-0">
                      <h4 className="text-gold text-xs font-bold tracking-widest uppercase mb-6">WORKING LUNCH</h4>
                      <ul className="space-y-4">
                        {['Fried rice or noodles', 'Chicken or fish main', 'Vegetable side (2 choices)', 'Salad & condiments', 'Soft drinks', 'Dessert (1 choice)'].map((item, i) => (
                          <li key={i} className="text-white/90 text-sm border-b border-white/5 pb-2 last:border-0">{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-8 last:border-0">
                      <h4 className="text-gold text-xs font-bold tracking-widest uppercase mb-6">GALA DINNER</h4>
                      <ul className="space-y-4">
                        {['Welcome drink', 'Soup & bread corner', 'Appetizers', 'Full buffet (Premier or Prestige menu)', 'Dessert buffet', 'Full service team'].map((item, i) => (
                          <li key={i} className="text-white/90 text-sm border-b border-white/5 pb-2 last:border-0">{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3">
                     <div className="p-8 border-b md:border-b-0 md:border-r border-white/10 last:border-0">
                       <h4 className="text-gold text-xs font-bold tracking-widest uppercase mb-6">AWARD CEREMONIES</h4>
                        <ul className="space-y-4">
                          {['Pre-event cocktail bites', 'Seated or buffet dinner', 'Stage-side service', 'Branded menu cards'].map((item, i) => (
                            <li key={i} className="text-white/90 text-sm border-b border-white/5 pb-2 last:border-0">{item}</li>
                          ))}
                          <li className="text-white/50 text-xs italic pt-2">Available on request</li>
                        </ul>
                     </div>
                     <div className="p-8 border-b md:border-b-0 md:border-r border-white/10 last:border-0">
                       <h4 className="text-gold text-xs font-bold tracking-widest uppercase mb-6">ADD-ONS</h4>
                       <ul className="space-y-4">
                          {['Live stations (hoppers, koththu)', 'Soft drinks package', 'Disposable or real crockery', 'On-site coordinator'].map((item, i) => (
                            <li key={i} className="text-white/90 text-sm border-b border-white/5 pb-2 last:border-0">{item}</li>
                          ))}
                          <li className="text-white/50 text-xs italic pt-2">All priced on request</li>
                        </ul>
                     </div>
                     <div className="p-8 bg-[#2d2d2d]/30 hidden md:block">
                        {/* Empty column area to match design */}
                     </div>
                  </div>
                </div>
                
                <div className="mt-8 border border-white/10 rounded-xl p-8 bg-[#262626]/50 text-center md:text-left">
                  <h5 className="text-white/60 text-[10px] font-bold tracking-widest uppercase mb-6">INCLUDED WITH EVERY CORPORATE CATERING BOOKING</h5>
                  <div className="flex flex-wrap gap-3 mb-6 justify-center md:justify-start">
                     {['Trained service staff', 'Full buffet setup', 'On-site coordinator', 'Setup & teardown', 'Branded menu cards available', 'Scalable for any team size'].map(t => (
                       <span key={t} className="px-4 py-2 rounded-full border border-white/20 text-white/80 text-xs">{t}</span>
                     ))}
                  </div>
                  <p className="text-white/50 text-xs italic text-center md:text-left pt-2">Suitable for seminars, conferences, product launches, team events, and award nights.</p>
                </div>
              </div>
            ) : activeTab === 'funeral' ? (
              <div className="bg-[#1a1a1a] rounded-[2rem] border border-neutral-800 p-8 md:p-12 shadow-2xl relative">
                <div className="text-center mb-10">
                  <span className="font-body text-[10px] text-white/50 font-bold uppercase tracking-[0.3em] block mb-3">DINIDU GARDENS</span>
                  <h3 className="font-heading text-4xl md:text-5xl text-white italic font-light mb-6">Dāne & Mala Batha</h3>
                  <div className="w-1.5 h-1.5 bg-white/30 rounded-full mx-auto mb-6" />
                  <p className="text-white/70 max-w-2xl mx-auto text-sm leading-relaxed">
                    We understand the importance of these occasions. Our team provides respectful, thoughtful catering — so your family can focus on what matters most.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row bg-[#262626] p-1.5 rounded-xl max-w-md mx-auto mb-12 gap-1.5">
                   <button 
                     onClick={() => setMemorialTab('mala_batha')} 
                     className={`flex-1 py-3 text-sm font-bold tracking-widest uppercase rounded-lg transition-colors ${memorialTab === 'mala_batha' ? 'bg-[#333] text-white border border-white/10 shadow-sm' : 'text-white/50 hover:text-white/80'}`}
                   >
                     MALA BATHA
                   </button>
                   <button 
                     onClick={() => setMemorialTab('dane')} 
                     className={`flex-1 py-3 text-sm font-bold tracking-widest uppercase rounded-lg transition-colors ${memorialTab === 'dane' ? 'bg-[#333] text-white border border-white/10 shadow-sm' : 'text-white/50 hover:text-white/80'}`}
                   >
                     DĀNE
                   </button>
                </div>
                
                {memorialTab === 'mala_batha' ? (
                  <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.3}}>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
                      <div>
                        <h4 className="font-heading text-3xl text-white mb-3">Mala Batha</h4>
                        <p className="text-white/70 max-w-xl text-sm leading-relaxed">A simple, dignified meal served to mourners, family, and friends during a time of grief. We prepare everything with care and respect, so your family does not have to worry about a thing.</p>
                      </div>
                      <Link href="/contact" className="inline-flex items-center px-6 py-3 rounded-full border border-white/20 text-white/90 hover:bg-white/10 transition-colors text-sm font-medium tracking-wide shrink-0">
                        Contact us <span className="text-white/50 ml-2">for pricing</span>
                      </Link>
                    </div>

                    <div className="bg-[#262626] border border-white/5 rounded-xl p-6 mb-10 text-white/80 text-sm leading-relaxed border-l-2 border-l-white/20">
                      This is a respectful, plain meal in keeping with the occasion. No devilled dishes, no koththu, no fried rice. Simple, wholesome food — prepared with the utmost care.
                    </div>

                    <div className="mb-10">
                      <h5 className="text-white/40 text-[10px] font-bold tracking-widest uppercase mb-4">SERVED TO</h5>
                      <div className="flex flex-wrap gap-3">
                        {['Monks (on request)', 'Family & close relatives', 'Friends & mourners'].map(t => (
                          <span key={t} className="px-4 py-2 rounded-full border border-white/10 bg-[#262626] text-white/70 text-xs font-medium">{t}</span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-[#262626] rounded-xl border border-white/5 overflow-hidden">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-b border-white/10">
                        <div className="p-6 lg:p-8 border-b sm:border-b-0 lg:border-r border-white/10">
                          <h6 className="text-[#a8a8a8] text-[10px] font-bold tracking-widest uppercase mb-6">RICE</h6>
                          <div className="space-y-4">
                            <div className="border-b border-white/5 pb-3">
                              <div className="text-white font-medium text-sm">Plain steam rice</div>
                            </div>
                            <div className="border-b border-white/5 pb-3">
                              <div className="text-white font-medium text-sm">Red rice (on request)</div>
                            </div>
                          </div>
                        </div>
                        <div className="p-6 lg:p-8 border-b sm:border-b-0 lg:border-r border-white/10">
                          <h6 className="text-[#a8a8a8] text-[10px] font-bold tracking-widest uppercase mb-6">CURRIES</h6>
                          <div className="space-y-4">
                            {['Dhal curry', 'Cashew curry', 'Potato curry', 'Mixed vegetable', 'Eggplant moju'].map((v, i) => (
                              <div key={i} className="border-b border-white/5 pb-3 last:border-0"><div className="text-white font-medium text-sm">{v}</div></div>
                            ))}
                          </div>
                        </div>
                        <div className="p-6 lg:p-8 border-b sm:border-b-0 lg:border-r border-white/10">
                          <h6 className="text-[#a8a8a8] text-[10px] font-bold tracking-widest uppercase mb-6">PROTEIN</h6>
                          <div className="space-y-4">
                            <div className="border-b border-white/5 pb-3">
                              <div className="text-white font-medium text-sm">Fish curry</div>
                            </div>
                            <div className="border-b border-white/5 pb-3">
                              <div className="text-white font-medium text-sm">Fish stew</div>
                            </div>
                          </div>
                          <p className="text-white/40 italic text-[11px] mt-4 leading-relaxed">Fish based on family preference. Other proteins available on request.</p>
                        </div>
                        <div className="p-6 lg:p-8">
                          <h6 className="text-[#a8a8a8] text-[10px] font-bold tracking-widest uppercase mb-6">CONDIMENTS</h6>
                          <div className="space-y-4">
                            {['Coconut sambol', 'Seeni sambol', 'Papadam', 'Maldives fish sambol'].map((c, i) => (
                              <div key={i} className="border-b border-white/5 pb-3 last:border-0"><div className="text-white font-medium text-sm">{c}</div></div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 lg:grid-cols-4">
                        <div className="p-6 lg:p-8 border-b sm:border-b-0 lg:border-r border-white/10 col-span-1 lg:col-span-1">
                          <h6 className="text-[#a8a8a8] text-[10px] font-bold tracking-widest uppercase mb-6">DRINKS</h6>
                          <div className="space-y-4">
                            {['Plain tea', 'Hot water', 'Fresh lime (plain)'].map((d, i) => (
                              <div key={i} className="border-b border-white/5 pb-3 last:border-0"><div className="text-white font-medium text-sm">{d}</div></div>
                            ))}
                          </div>
                        </div>
                        <div className="bg-[#2d2d2d]/30 col-span-1 lg:col-span-3 hidden sm:block"></div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.3}}>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
                      <div>
                        <h4 className="font-heading text-3xl text-white mb-3">Dāne</h4>
                        <p className="text-white/70 max-w-xl text-sm leading-relaxed">A generous, wholesome meal offered in memory of a loved one. Served to monks, family, and friends — the Dāne is a meaningful act of merit, and we help you honour it with the right food.</p>
                        
                        <div className="flex gap-4 mt-6">
                          <span className="px-5 py-2.5 rounded-lg border border-white/20 text-white text-sm font-medium">7 Dawase Dāne</span>
                          <span className="px-5 py-2.5 rounded-lg border border-white/20 text-white text-sm font-medium">3 Māse Dāne</span>
                        </div>
                      </div>
                      <Link href="/contact" className="inline-flex items-center px-6 py-3 rounded-full border border-white/20 text-white/90 hover:bg-white/10 transition-colors text-sm font-medium tracking-wide shrink-0">
                        Contact us <span className="text-white/50 ml-2">for pricing</span>
                      </Link>
                    </div>

                    <p className="text-white/80 text-sm leading-relaxed mb-6 block border-b border-white/10 pb-10">
                      Held on the 7th day after passing. A full, warm meal — more generous than the Mala Batha — offered to monks first, then to family and those who gathered to pay their respects.
                    </p>

                    <div className="mb-10 mt-6">
                      <h5 className="text-white/40 text-[10px] font-bold tracking-widest uppercase mb-4">SERVED TO</h5>
                      <div className="flex flex-wrap gap-3">
                        {['Monks (first serving)', 'Family & relatives', 'Friends & well-wishers'].map(t => (
                          <span key={t} className="px-4 py-2 rounded-full border border-white/10 bg-[#262626] text-white/70 text-xs font-medium">{t}</span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-[#262626] rounded-xl border border-white/5 overflow-hidden">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-b border-white/10">
                        <div className="p-6 lg:p-8 border-b sm:border-b-0 lg:border-r border-white/10">
                          <h6 className="text-[#a8a8a8] text-[10px] font-bold tracking-widest uppercase mb-6">RICE</h6>
                          <div className="space-y-4">
                            <div className="border-b border-white/5 pb-3">
                              <div className="text-white font-medium text-sm">Steam rice</div>
                            </div>
                            <div className="pb-3">
                              <div className="text-white font-medium text-sm">Fried rice (chicken or seafood)</div>
                            </div>
                          </div>
                        </div>
                        <div className="p-6 lg:p-8 border-b sm:border-b-0 lg:border-r border-white/10">
                          <h6 className="text-[#a8a8a8] text-[10px] font-bold tracking-widest uppercase mb-6">CHICKEN</h6>
                          <div className="space-y-4">
                            <div className="border-b border-white/5 pb-3">
                              <div className="text-white font-medium text-sm">Devilled chicken</div>
                            </div>
                            <div className="border-b border-white/5 pb-3">
                              <div className="text-white font-medium text-sm">Sri Lankan chicken curry</div>
                            </div>
                            <div className="text-white/50 italic text-xs pt-1">Choice of one</div>
                          </div>
                        </div>
                        <div className="p-6 lg:p-8 border-b sm:border-b-0 lg:border-r border-white/10">
                          <h6 className="text-[#a8a8a8] text-[10px] font-bold tracking-widest uppercase mb-6">FISH & SEA FOOD</h6>
                          <div className="space-y-4">
                            <div className="border-b border-white/5 pb-3">
                              <div className="text-white font-medium text-sm">Fish curry</div>
                            </div>
                            <div className="border-b border-white/5 pb-3">
                              <div className="text-white font-medium text-sm">Devilled fish</div>
                            </div>
                            <div className="border-b border-white/5 pb-3">
                              <div className="text-white font-medium text-sm">Fish stew</div>
                            </div>
                            <div className="text-white/50 italic text-xs pt-1">Choice of one</div>
                          </div>
                        </div>
                        <div className="p-6 lg:p-8">
                          <h6 className="text-[#a8a8a8] text-[10px] font-bold tracking-widest uppercase mb-6">VEGETABLES</h6>
                          <div className="space-y-4">
                            {['Dhal curry', 'Cashew curry', 'Potato tempered', 'Mixed vegetable', 'Eggplant moju'].map((c, i) => (
                              <div key={i} className="border-b border-white/5 pb-3 last:border-0"><div className="text-white font-medium text-sm">{c}</div></div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="p-6 lg:p-8 border-b sm:border-b-0 lg:border-r border-white/10">
                          <h6 className="text-[#a8a8a8] text-[10px] font-bold tracking-widest uppercase mb-6">SALADS</h6>
                          <div className="space-y-4">
                            {['Green salad', 'Carrot & cucumber salad', 'Fruit salad'].map((d, i) => (
                              <div key={i} className="border-b border-white/5 pb-3 last:border-0"><div className="text-white font-medium text-sm">{d}</div></div>
                            ))}
                          </div>
                        </div>
                        <div className="p-6 lg:p-8 border-b sm:border-b-0 lg:border-r border-white/10">
                          <h6 className="text-[#a8a8a8] text-[10px] font-bold tracking-widest uppercase mb-6">CONDIMENTS</h6>
                          <div className="space-y-4">
                            {['Coconut sambol', 'Seeni sambol', 'Papadam', 'Chutney'].map((d, i) => (
                              <div key={i} className="border-b border-white/5 pb-3 last:border-0"><div className="text-white font-medium text-sm">{d}</div></div>
                            ))}
                          </div>
                        </div>
                        <div className="p-6 lg:p-8 border-b sm:border-b-0 lg:border-r border-white/10">
                          <h6 className="text-[#a8a8a8] text-[10px] font-bold tracking-widest uppercase mb-6">DESSERTS</h6>
                          <div className="space-y-4">
                            {['Watalappan', 'Caramel pudding', 'Ice cream', 'Cut fruits'].map((d, i) => (
                              <div key={i} className="border-b border-white/5 pb-3 last:border-0"><div className="text-white font-medium text-sm">{d}</div></div>
                            ))}
                            <div className="text-white/50 italic text-xs pt-1">Additional choices on request</div>
                          </div>
                        </div>
                        <div className="p-6 lg:p-8">
                          <h6 className="text-[#a8a8a8] text-[10px] font-bold tracking-widest uppercase mb-6">DRINKS</h6>
                          <div className="space-y-4">
                            {['Plain tea & coffee', 'Fresh lime juice', 'Cordial drinks'].map((d, i) => (
                              <div key={i} className="border-b border-white/5 pb-3 last:border-0"><div className="text-white font-medium text-sm">{d}</div></div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {getPackages().map((pkg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-3xl p-10 shadow-sm hover:shadow-xl transition-shadow border border-neutral-100"
                  >
                    <div className="border-b border-neutral-200 pb-6 mb-8">
                      <h3 className="font-heading text-3xl font-bold text-neutral-900 mb-3">
                        {pkg.name}
                      </h3>
                      <p className="font-body text-xl font-medium text-orange">
                        Starting from {pkg.price}
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
              </div>
            )}
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
