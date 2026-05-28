import GalleryClient from './GalleryClient'
import fs from 'fs'
import path from 'path'

export const dynamic = 'force-dynamic'; // Refresh when new images are added

type GalleryImage = {
  url: string
  category: 'banquet' | 'catering' | 'garden'
  alt: string
}

// Fallback images in case the user hasn't categorized yet
const fallbackImages: GalleryImage[] = [
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

export default function GalleryPage() {
  const dynamicImages: GalleryImage[] = []
  const publicPath = path.join(process.cwd(), 'public')
  
  const categoryMap = [
    { id: 'banquet', folder: 'weddings' }, 
    { id: 'catering', folder: 'catering' }, 
    { id: 'garden', folder: 'outdoor' },
    { id: 'banquet', folder: 'general' }
  ]

  categoryMap.forEach(cat => {
    const dirPath = path.join(publicPath, 'images', cat.folder)
    if (fs.existsSync(dirPath)) {
      const files = fs.readdirSync(dirPath)
      files.forEach(file => {
        if (file.match(/\.(jpg|jpeg|png|webp|gif)$/i)) {
          dynamicImages.push({
            url: `/images/${cat.folder}/${file}`,
            category: cat.id as any,
            alt: file.replace(/\.[^/.]+$/, "")
          })
        }
      })
    }
  })

  // We combine the fallback images and the dynamically loaded ones
  const finalImages = [...fallbackImages, ...dynamicImages]

  return <GalleryClient initialImages={finalImages} />
}
