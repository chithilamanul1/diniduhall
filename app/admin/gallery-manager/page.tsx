'use client'

import React, { useEffect, useState } from 'react'

export default function GalleryManager() {
  const [images, setImages] = useState<{filename: string, url: string}[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchImages()
  }, [])

  const fetchImages = async () => {
    setLoading(true)
    const res = await fetch('/api/gallery')
    const data = await res.json()
    if (data.images) {
      setImages(data.images)
    }
    setLoading(false)
  }

  const handleAction = async (filename: string, action: string, category?: string) => {
    // Optimistic UI update
    setImages(prev => prev.filter(img => img.filename !== filename))
    
    await fetch('/api/gallery', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filename, action, category })
    })
  }

  if (loading) return <div className="p-8 text-white">Loading images...</div>

  return (
    <div className="min-h-screen bg-neutral-900 p-8 font-sans">
      <h1 className="text-3xl font-bold text-white mb-2">Gallery Manager</h1>
      <p className="text-gray-400 mb-8">Uncategorized images: {images.length}</p>

      {images.length === 0 ? (
        <div className="text-xl text-green-400">All images sorted! 🎉</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {images.map(img => (
            <div key={img.filename} className="bg-neutral-800 rounded-lg overflow-hidden shadow-lg border border-neutral-700 flex flex-col">
              <div className="relative h-48 w-full bg-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.url} alt={img.filename} className="object-contain w-full h-full" loading="lazy" />
              </div>
              <div className="p-4 flex flex-col gap-2 flex-grow justify-end">
                <p className="text-xs text-gray-500 truncate mb-2" title={img.filename}>{img.filename}</p>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => handleAction(img.filename, 'move', 'weddings')} className="bg-pink-600 hover:bg-pink-500 text-white text-xs py-2 px-2 rounded font-bold transition shadow-sm">Wedding</button>
                  <button onClick={() => handleAction(img.filename, 'move', 'catering')} className="bg-orange-600 hover:bg-orange-500 text-white text-xs py-2 px-2 rounded font-bold transition shadow-sm">Catering</button>
                  <button onClick={() => handleAction(img.filename, 'move', 'outdoor')} className="bg-green-600 hover:bg-green-500 text-white text-xs py-2 px-2 rounded font-bold transition shadow-sm">Outdoor</button>
                  <button onClick={() => handleAction(img.filename, 'move', 'general')} className="bg-blue-600 hover:bg-blue-500 text-white text-xs py-2 px-2 rounded font-bold transition shadow-sm">General</button>
                </div>
                <button onClick={() => handleAction(img.filename, 'delete')} className="bg-red-900 hover:bg-red-800 text-white text-xs py-2 px-2 rounded mt-2 w-full font-bold transition shadow-sm">🗑️ Delete (Blur/Bad)</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
