import GalleryClient from './GalleryClient'
import galleryData from '../../gallery-data.json'

export const dynamic = 'force-dynamic';

type GalleryImage = {
  url: string
  category: 'banquet' | 'catering' | 'garden'
  alt: string
}

export default function GalleryPage() {
  const dynamicImages: GalleryImage[] = []
  
  const categoryMap = [
    { id: 'banquet', folder: 'weddings' }, 
    { id: 'catering', folder: 'catering' }, 
    { id: 'garden', folder: 'outdoor' },
    { id: 'banquet', folder: 'general' }
  ]
  
  categoryMap.forEach(cat => {
    const files = (galleryData as any)[cat.folder] || [];
    files.forEach((file: string) => {
       dynamicImages.push({
         url: `/images/${cat.folder}/${file}`,
         category: cat.id as any,
         alt: file.replace(/\.[^/.]+$/, "")
       })
    })
  })

  return <GalleryClient initialImages={dynamicImages} />
}
