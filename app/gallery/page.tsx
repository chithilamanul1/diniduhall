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
    <div className="w-full bg-[#fdfaf6] min-h-screen selection:bg-gold/30">
      {/* Cinematic Hero */}
      <section className="relative h-[80vh] w-full overflow-hidden flex items-center justify-center">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <Image
            src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920&q=80"
            alt="Dinidu Gardens Hero"
            fill
            className="object-cover brightness-50"
            priority
          />
        </motion.div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#fdfaf6]" />

        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <span className="font-body text-xs md:text-sm text-gold/80 uppercase tracking-[0.5em] mb-8 block font-semibold">
              The Art of Celebration
            </span>
            <h1 className="font-heading text-6xl md:text-9xl text-white mb-8 border-b border-white/10 pb-8">
              Legacy in <span className="italic font-light">Frames</span>
            </h1>
            <p className="font-body text-lg md:text-2xl text-white/70 max-w-2xl mx-auto font-light leading-relaxed">
              Every detail meticulously captured. Every memory elegantly preserved at Dinidu Gardens.
            </p>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/30 flex flex-col items-center gap-4"
        >
          <span className="text-[10px] tracking-[0.4em] uppercase">Scroll to Explore</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-white/40 to-transparent" />
        </motion.div>
      </section>

      {/* Filter Tabs (Refined) */}
      <section className="pt-0 pb-16 px-4 sticky top-20 z-30 pointer-events-none">
        <div className="max-w-7xl mx-auto flex justify-center pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-2 p-2 rounded-full border border-neutral-200 bg-white/60 backdrop-blur-2xl shadow-2xl shadow-black/5"
          >
            {(['all', 'banquet', 'catering', 'garden'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-8 py-3 rounded-full font-body text-xs font-bold uppercase tracking-widest transition-all duration-500 ${
                  selectedCategory === cat 
                    ? 'bg-neutral-900 text-gold shadow-lg' 
                    : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100'
                }`}
              >
                {cat === 'all' ? 'Everything' : cat}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Parallax Masonry Grid */}
      <section className="pb-32 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="popLayout">
            <motion.div
              layout
              className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8"
            >
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.url}
                  layout
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                  transition={{ 
                    duration: 0.8, 
                    delay: (index % 3) * 0.1,
                    ease: [0.21, 0.47, 0.32, 0.98]
                  }}
                  className="break-inside-avoid cursor-pointer group"
                  onClick={() => setLightboxImage(image.url)}
                >
                  <div className="relative overflow-hidden rounded-[2rem] shadow-xl transition-all duration-700 hover:shadow-gold/10 hover:border-gold/20 border border-neutral-100/50 bg-white">
                    <Image
                      src={image.url}
                      alt={image.alt}
                      width={800}
                      height={1000}
                      className="w-full h-auto transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-110"
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileHover={{ opacity: 1, y: 0 }}
                      >
                         <span className="text-[10px] text-gold uppercase tracking-[0.3em] font-bold mb-2 block">
                           {image.category}
                         </span>
                         <h3 className="text-white font-heading text-xl">{image.alt}</h3>
                      </motion.div>
                    </div>

                    {/* Subtle Parallax Layer (Simulated via hover scale) */}
                    <div className="absolute top-4 right-4 text-white/50 text-[10px] tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                      Click to View
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
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
