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
  // Garden & Outdoor
  { url: '/images/business/dinidugardens (45).jpeg', category: 'garden', alt: 'Garden Tea Service' },
  { url: '/images/business/dinidugardens (46).jpeg', category: 'garden', alt: 'Outdoor Event Setup' },
  { url: '/images/business/dinidugardens (47).jpeg', category: 'garden', alt: 'Lush Garden Path' },
  { url: '/images/business/dinidugardens (48).jpeg', category: 'garden', alt: 'Outdoor Celebration' },
  { url: '/images/business/dinidugardens (49).jpeg', category: 'garden', alt: 'Garden Decor' },
  { url: '/images/business/dinidugardens (50).jpeg', category: 'garden', alt: 'Aerial Garden View' },
  { url: '/images/business/dinidugardens (51).jpeg', category: 'garden', alt: 'Nature and Landscapes' },
  { url: '/images/business/dinidugardens (52).jpeg', category: 'garden', alt: 'Evening Garden Ambiance' },

  // Catering & Food
  { url: '/images/business/dinidugardens (1).jpeg', category: 'catering', alt: 'Dessert Buffet Selection' },
  { url: '/images/business/dinidugardens (2).jpeg', category: 'catering', alt: 'Fresh Salad Bar' },
  { url: '/images/business/dinidugardens (3).jpeg', category: 'catering', alt: 'Appetizers and Finger Food' },
  { url: '/images/business/dinidugardens (4).jpeg', category: 'catering', alt: 'Main Course Buffet' },
  { url: '/images/business/dinidugardens (5).jpeg', category: 'catering', alt: 'Gourmet Platter' },
  { url: '/images/business/dinidugardens (6).jpeg', category: 'catering', alt: 'Chef Special Cold Cuts' },
  { url: '/images/business/dinidugardens (7).jpeg', category: 'catering', alt: 'Assorted Pastries' },
  { url: '/images/business/dinidugardens (8).jpeg', category: 'catering', alt: 'Traditional Sri Lankan Buffet' },
  { url: '/images/business/dinidugardens (9).jpeg', category: 'catering', alt: 'Elegant Table Catering' },
  { url: '/images/business/dinidugardens (10).jpeg', category: 'catering', alt: 'Fresh Pasta Salad' },
  { url: '/images/business/dinidugardens (11).jpeg', category: 'catering', alt: 'Dessert Cups' },
  { url: '/images/business/dinidugardens (12).jpeg', category: 'catering', alt: 'Savory Snacks Selection' },
  { url: '/images/business/dinidugardens (13).jpeg', category: 'catering', alt: 'Meat Carving Station' },
  { url: '/images/business/dinidugardens (14).jpeg', category: 'catering', alt: 'Veggie Delight Spread' },
  { url: '/images/business/dinidugardens (15).jpeg', category: 'catering', alt: 'Chocolate Fondue Section' },
  { url: '/images/business/dinidugardens (16).jpeg', category: 'catering', alt: 'International Cuisine Buffet' },
  { url: '/images/business/dinidugardens (17).jpeg', category: 'catering', alt: 'Signature Drinks and Cocktails' },
  { url: '/images/business/dinidugardens (18).jpeg', category: 'catering', alt: 'Gourmet Appetizer Display' },
  { url: '/images/business/dinidugardens (19).jpeg', category: 'catering', alt: 'Artisan Breads and Cheeses' },
  { url: '/images/business/dinidugardens (20).jpeg', category: 'catering', alt: 'Seafood Specialities' },

  // Banquet Hall & Decor
  { url: '/images/business/dinidugardens (21).jpeg', category: 'banquet', alt: 'Luxurious Hall Interior' },
  { url: '/images/business/dinidugardens (22).jpeg', category: 'banquet', alt: 'Wedding Stage Lighting' },
  { url: '/images/business/dinidugardens (23).jpeg', category: 'banquet', alt: 'Grand Ballroom Setup' },
  { url: '/images/business/dinidugardens (24).jpeg', category: 'banquet', alt: 'Elegant Table Decor' },
  { url: '/images/business/dinidugardens (25).jpeg', category: 'banquet', alt: 'Floral Arrangements' },
  { url: '/images/business/dinidugardens (26).jpeg', category: 'banquet', alt: 'High-End AV Systems' },
  { url: '/images/business/dinidugardens (27).jpeg', category: 'banquet', alt: 'Reception Area Ambiance' },
  { url: '/images/business/dinidugardens (28).jpeg', category: 'banquet', alt: 'Corporate Event Set-up' },
  { url: '/images/business/dinidugardens (29).jpeg', category: 'banquet', alt: 'Modern Lighting Design' },
  { url: '/images/business/dinidugardens (30).jpeg', category: 'banquet', alt: 'Wedding Aisle Decor' },
  { url: '/images/business/dinidugardens (31).jpeg', category: 'banquet', alt: 'Buffet Table Elegance' },
  { url: '/images/business/dinidugardens (32).jpeg', category: 'banquet', alt: 'Dance Floor Ambience' },
  { url: '/images/business/dinidugardens (33).jpeg', category: 'banquet', alt: 'Table Setting Close-up' },
  { url: '/images/business/dinidugardens (34).jpeg', category: 'banquet', alt: 'Lobby and Entrance' },
  { url: '/images/business/dinidugardens (35).jpeg', category: 'banquet', alt: 'Guest Seating Arrangements' },
  { url: '/images/business/dinidugardens (36).jpeg', category: 'banquet', alt: 'Floral Centerpieces' },
  { url: '/images/business/dinidugardens (37).jpeg', category: 'banquet', alt: 'Hall Panoramic View' },
  { url: '/images/business/dinidugardens (38).jpeg', category: 'banquet', alt: 'Stage Decoration Detail' },
  { url: '/images/business/dinidugardens (39).jpeg', category: 'banquet', alt: 'Event Sound System' },
  { url: '/images/business/dinidugardens (40).jpeg', category: 'banquet', alt: 'Cocktail Table Decor' },
  { url: '/images/business/dinidugardens (41).jpeg', category: 'banquet', alt: 'Hall Entrance Guard' },
  { url: '/images/business/dinidugardens (42).jpeg', category: 'banquet', alt: 'Vibrant Event Lighting' },
  { url: '/images/business/dinidugardens (43).jpeg', category: 'banquet', alt: 'Reception Hallway' },
  { url: '/images/business/dinidugardens (44).jpeg', category: 'banquet', alt: 'Hall Interior Night Mood' },
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
