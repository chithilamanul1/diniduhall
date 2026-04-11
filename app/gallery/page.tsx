'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { XIcon } from 'lucide-react'
import Image from 'next/image'

type Category = 'all' | 'banquet' | 'catering' | 'garden'

type GalleryImage = {
  url: string
  category: 'banquet' | 'catering' | 'garden'
  alt: string
}

const images: GalleryImage[] = [
  { url: '/images/business/sssss.webp', category: 'garden', alt: 'Dinidu Gardens Night View Seeduwa' },
  { url: '/images/business/unnamed (1).webp', category: 'banquet', alt: 'Elegant Banquet Hall Interior' },
  { url: '/images/business/unnamed (10).webp', category: 'banquet', alt: 'Wedding Table Setup' },
  { url: '/images/business/unnamed (20).webp', category: 'banquet', alt: 'Buffet and Event Decor' },
  { url: '/images/business/unnamed (33).webp', category: 'garden', alt: 'Outdoor Garden Event' },
  { url: '/images/business/unnamed (44).webp', category: 'catering', alt: 'Gourmet Culinary Display' },
  { url: '/images/business/unnamed.webp', category: 'catering', alt: 'Appetizer Spoon Selection' },
  { url: '/images/business/unnamed (2).webp', category: 'catering', alt: 'Catering Menu Item' },
  { url: '/images/business/unnamed (3).webp', category: 'catering', alt: 'Event Food Presentation' },
  { url: '/images/business/unnamed (4).webp', category: 'banquet', alt: 'Grand Hall Entrance' },
  { url: '/images/business/unnamed (5).webp', category: 'catering', alt: 'Main Course Buffet' },
  { url: '/images/business/unnamed (6).webp', category: 'catering', alt: 'Corporate Lunch Spread' },
  { url: '/images/business/unnamed (11).webp', category: 'banquet', alt: 'Hall Decorative Lighting' },
  { url: '/images/business/unnamed (12).webp', category: 'banquet', alt: 'Wedding Reception Seating' },
  { url: '/images/business/unnamed (27).webp', category: 'garden', alt: 'Garden Pathways and Lighting' },
  { url: '/images/business/unnamed (30).webp', category: 'garden', alt: 'Outdoor Lounge Area' },
  { url: '/images/business/unnamed (42).webp', category: 'catering', alt: 'Dessert Bar Setup' },
]

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all')
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)
  
  const filteredImages =
    selectedCategory === 'all'
      ? images
      : images.filter((img) => img.category === selectedCategory)
  
  return (
    <div className="w-full bg-cream min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] w-full overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
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
              Our Portfolio
            </span>
            <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl text-white mb-6">
              Photo <span className="italic font-light">Gallery</span>
            </h1>
            <div className="w-24 h-[2px] bg-gold mb-8" />
            <p className="font-body text-xl md:text-2xl text-white/90 max-w-2xl mx-auto font-light leading-relaxed">
              Moments captured, memories preserved
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
            }}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-8 py-3 rounded-full font-body font-medium tracking-wide transition-all ${selectedCategory === 'all' ? 'bg-gold text-white shadow-md' : 'bg-transparent text-neutral-600 hover:text-gold border border-neutral-300 hover:border-gold'}`}
            >
              All Photos
            </button>
            <button
              onClick={() => setSelectedCategory('banquet')}
              className={`px-8 py-3 rounded-full font-body font-medium tracking-wide transition-all ${selectedCategory === 'banquet' ? 'bg-gold text-white shadow-md' : 'bg-transparent text-neutral-600 hover:text-gold border border-neutral-300 hover:border-gold'}`}
            >
              Banquet Hall
            </button>
            <button
              onClick={() => setSelectedCategory('catering')}
              className={`px-8 py-3 rounded-full font-body font-medium tracking-wide transition-all ${selectedCategory === 'catering' ? 'bg-gold text-white shadow-md' : 'bg-transparent text-neutral-600 hover:text-gold border border-neutral-300 hover:border-gold'}`}
            >
              Catering
            </button>
            <button
              onClick={() => setSelectedCategory('garden')}
              className={`px-8 py-3 rounded-full font-body font-medium tracking-wide transition-all ${selectedCategory === 'garden' ? 'bg-gold text-white shadow-md' : 'bg-transparent text-neutral-600 hover:text-gold border border-neutral-300 hover:border-gold'}`}
            >
              Garden & Outdoor
            </button>
          </motion.div>

          {/* Masonry Grid */}
          <motion.div
            layout
            className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8"
          >
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.url}
                layout
                initial={{
                  opacity: 0,
                  scale: 0.95,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.95,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.02,
                }}
                className="break-inside-avoid cursor-pointer group"
                onClick={() => setLightboxImage(image.url)}
              >
                <div className="relative overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all border border-neutral-100 min-h-[200px]">
                  <Image
                    src={image.url}
                    alt={image.alt}
                    width={800}
                    height={600}
                    className="w-full h-auto group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-12"
            onClick={() => setLightboxImage(null)}
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
              aria-label="Close lightbox"
            >
              <XIcon className="w-6 h-6 text-white" />
            </button>
            <motion.img
              initial={{
                scale: 0.95,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              exit={{
                scale: 0.95,
                opacity: 0,
              }}
              transition={{
                type: 'spring',
                duration: 0.5,
              }}
              src={lightboxImage}
              alt="Gallery image"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
