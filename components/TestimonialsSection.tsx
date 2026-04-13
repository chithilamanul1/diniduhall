'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { StarIcon, QuoteIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { getTestimonials } from '@/app/actions/testimonials'

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const FALLBACK_TESTIMONIALS = [
    {
      author: "Anusha & Dilshan",
      role: "Wedding Celebration",
      content: "The most magical day of our lives. The garden setting and the attention to detail from the Dinidu team were beyond our expectations. Truly a gem in Seeduwa.",
      rating: 5
    },
    {
      author: "SeraNex Lanka",
      role: "Corporate Annual Gala",
      content: "Exquisite catering and a perfectly managed venue. Our corporate guests were highly impressed by the atmosphere and professional service.",
      rating: 5
    },
    {
      author: "Sarah Mendis",
      role: "Private Birthday Party",
      content: "Perfect planning and a beautiful hall. The team made everything so easy for us. Highly recommended for any special occasion!",
      rating: 5
    }
  ]

  useEffect(() => {
    async function load() {
      try {
        const data = await getTestimonials(true)
        if (data && data.length > 0) {
          setTestimonials(data)
        } else {
          setTestimonials(FALLBACK_TESTIMONIALS)
        }
      } catch (error) {
        console.error("Testimonials load error:", error)
        setTestimonials(FALLBACK_TESTIMONIALS)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (!loading && testimonials.length === 0) return null

  return (
    <section className="py-32 px-4 bg-neutral-950 overflow-hidden relative border-t border-white/5">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <motion.div 
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-gold rounded-full blur-[150px]" 
        />
        <motion.div 
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{ duration: 15, repeat: Infinity, delay: 2 }}
          className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-gold rounded-full blur-[180px]" 
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-body text-sm text-gold uppercase tracking-[0.4em] mb-4 block"
          >
            Real Stories
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-6xl md:text-8xl text-white leading-tight"
          >
            Client <span className="italic font-light">Voices</span>
          </motion.h2>
        </div>

        {loading ? (
          <div className="h-64 flex items-center justify-center">
             <div className="w-10 h-10 border-2 border-gold border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className={`group relative p-8 rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-500 hover:bg-white/10 hover:border-gold/30 shadow-2xl ${
                  idx === 0 ? 'md:col-span-2 lg:col-span-1 lg:row-span-2 flex flex-col justify-center' : ''
                }`}
              >
                <div className="absolute top-8 right-8 transition-opacity duration-500 opacity-20 group-hover:opacity-100">
                  <QuoteIcon size={40} className="text-gold" />
                </div>

                <div className="flex gap-1 mb-6">
                  {Array(item.rating).fill(0).map((_, i) => (
                    <StarIcon key={i} size={16} className="text-gold" fill="currentColor" />
                  ))}
                </div>

                <blockquote className={`font-body text-white/90 leading-relaxed mb-8 italic ${
                  idx === 0 ? 'text-2xl md:text-3xl font-light' : 'text-lg'
                }`}>
                  "{item.content}"
                </blockquote>

                <div className="mt-auto flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/20 flex items-center justify-center font-heading text-lg text-gold font-bold">
                    {item.author.charAt(0)}
                  </div>
                  <div>
                    <cite className="block font-heading text-lg text-white not-italic font-bold tracking-wide">
                      {item.author}
                    </cite>
                    <p className="font-body text-xs text-gold/60 uppercase tracking-widest font-medium">
                      {item.role || 'Valued Guest'}
                    </p>
                  </div>
                </div>

                {/* Decorative Accent */}
                <div className="absolute bottom-4 right-8 w-1/3 h-[1px] bg-gradient-to-r from-transparent to-gold/20" />
              </motion.div>
            ))}
          </div>
        )}

        {/* Call to Action Link */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <a href="/gallery" className="inline-flex items-center gap-2 text-white/50 hover:text-gold transition-colors font-body text-sm tracking-widest uppercase">
            View Wedding Stories <ChevronRightIcon size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
