'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { StarIcon, QuoteIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { getTestimonials } from '@/app/actions/testimonials'

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [activeIdx, setActiveIdx] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const data = await getTestimonials(true) // Fetch only featured
      setTestimonials(data)
      setLoading(false)
    }
    load()
  }, [])

  if (!loading && testimonials.length === 0) return null

  const next = () => setActiveIdx((prev) => (prev + 1) % testimonials.length)
  const prev = () => setActiveIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  return (
    <section className="py-24 px-4 bg-neutral-900 overflow-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gold rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold rounded-full blur-[120px]" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="font-body text-sm text-gold uppercase tracking-[0.3em] mb-4 block">
            Guest Experiences
          </span>
          <h2 className="font-heading text-5xl md:text-7xl text-white">
            Client <span className="italic font-light">Voices</span>
          </h2>
        </div>

        {loading ? (
          <div className="h-64 flex items-center justify-center">
             <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <div className="flex justify-center gap-1 mb-8">
                  {Array(testimonials[activeIdx].rating).fill(0).map((_, i) => (
                    <StarIcon key={i} size={20} className="text-gold" fill="currentColor" />
                  ))}
                </div>

                <QuoteIcon className="w-16 h-16 text-gold/10 mx-auto mb-8" />
                
                <blockquote className="font-heading text-2xl md:text-4xl lg:text-5xl text-white/90 leading-tight mb-12 max-w-4xl mx-auto font-light">
                  "{testimonials[activeIdx].content}"
                </blockquote>

                <div className="space-y-2">
                  <cite className="font-heading text-xl text-gold not-italic font-bold tracking-wide">
                    {testimonials[activeIdx].author}
                  </cite>
                  <p className="font-body text-sm text-white/40 uppercase tracking-[0.2em]">
                    {testimonials[activeIdx].role || 'Valued Guest'}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            {testimonials.length > 1 && (
              <div className="flex justify-center items-center gap-8 mt-16">
                <button 
                  onClick={prev}
                  className="p-4 rounded-full border border-white/10 text-white/50 hover:text-gold hover:border-gold transition-all duration-300"
                >
                  <ChevronLeftIcon size={24} />
                </button>
                <div className="flex gap-2">
                  {testimonials.map((_, i) => (
                    <button 
                      key={i}
                      onClick={() => setActiveIdx(i)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${i === activeIdx ? 'bg-gold w-8' : 'bg-white/20'}`}
                    />
                  ))}
                </div>
                <button 
                  onClick={next}
                  className="p-4 rounded-full border border-white/10 text-white/50 hover:text-gold hover:border-gold transition-all duration-300"
                >
                  <ChevronRightIcon size={24} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
