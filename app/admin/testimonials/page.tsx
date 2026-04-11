'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  StarIcon, 
  TrashIcon, 
  PlusIcon, 
  UserIcon, 
  QuoteIcon,
  CheckCircle2Icon,
  StarHalfIcon
} from 'lucide-react'
import { 
  getTestimonials, 
  createTestimonial, 
  deleteTestimonial, 
  toggleFeaturedTestimonial 
} from '@/app/actions/testimonials'

export default function TestimonialsAdmin() {
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showAdd, setShowAdd] = useState(false)
  const [newT, setNewT] = useState({
    author: '',
    role: '',
    content: '',
    rating: 5
  })

  useEffect(() => {
    loadTestimonials()
  }, [])

  async function loadTestimonials() {
    setLoading(true)
    const data = await getTestimonials()
    setTestimonials(data)
    setLoading(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    await createTestimonial(newT)
    setNewT({ author: '', role: '', content: '', rating: 5 })
    setShowAdd(false)
    loadTestimonials()
  }

  return (
    <div className="space-y-10 pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-heading text-neutral-900 tracking-tight">
            Customer <span className="italic font-light">Testimonials</span>
          </h1>
          <p className="font-body text-neutral-500 mt-1">
            Manage public feedback and featured reviews.
          </p>
        </div>
        <button 
          onClick={() => setShowAdd(!showAdd)}
          className="bg-neutral-900 text-white px-6 py-3 rounded-xl font-body font-medium flex items-center gap-2 hover:bg-neutral-800 transition-colors"
        >
          {showAdd ? <TrashIcon size={18} /> : <PlusIcon size={18} />}
          {showAdd ? 'Cancel' : 'Add Review'}
        </button>
      </div>

      {showAdd && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-3xl border border-neutral-100 shadow-sm"
        >
          <h2 className="font-heading text-xl mb-6">New Testimonial</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-body font-bold text-neutral-400 uppercase tracking-widest">Author Name</label>
                <input 
                  type="text" 
                  value={newT.author}
                  onChange={(e) => setNewT({...newT, author: e.target.value})}
                  className="w-full bg-neutral-50 border border-neutral-100 rounded-xl px-5 py-3 outline-none focus:border-gold font-body"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-body font-bold text-neutral-400 uppercase tracking-widest">Role / Event Type</label>
                <input 
                  type="text" 
                  value={newT.role}
                  onChange={(e) => setNewT({...newT, role: e.target.value})}
                  placeholder="e.g., Wedding Client"
                  className="w-full bg-neutral-50 border border-neutral-100 rounded-xl px-5 py-3 outline-none focus:border-gold font-body"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-body font-bold text-neutral-400 uppercase tracking-widest">Review Content</label>
              <textarea 
                value={newT.content}
                onChange={(e) => setNewT({...newT, content: e.target.value})}
                className="w-full bg-neutral-50 border border-neutral-100 rounded-xl px-5 py-3 outline-none focus:border-gold font-body h-32 resize-none"
                required
              />
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-sm font-body text-neutral-500 mr-2">Rating:</span>
                {[1,2,3,4,5].map((s) => (
                  <button 
                    key={s} 
                    type="button"
                    onClick={() => setNewT({...newT, rating: s})}
                    className={`${newT.rating >= s ? 'text-gold' : 'text-neutral-200'} transition-colors`}
                  >
                    <StarIcon size={24} fill={newT.rating >= s ? 'currentColor' : 'none'} />
                  </button>
                ))}
              </div>
              <button 
                type="submit"
                className="bg-gold text-white px-10 py-3 rounded-xl font-body font-bold shadow-lg shadow-gold/20 hover:scale-[1.02] transition-transform"
              >
                Publish Testimonial
              </button>
            </div>
          </form>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
          <div className="col-span-full py-20 flex justify-center">
             <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin" />
          </div>
        ) : testimonials.length === 0 ? (
          <div className="col-span-full text-center py-20 bg-white rounded-3xl border border-dashed border-neutral-200">
            <QuoteIcon className="w-12 h-12 text-neutral-100 mx-auto mb-4" />
            <p className="text-neutral-400 font-body">No testimonials yet.</p>
          </div>
        ) : (
          testimonials.map((t) => (
            <motion.div 
              key={t.id}
              className="bg-white p-6 rounded-3xl border border-neutral-100 shadow-sm relative group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-1">
                  {Array(t.rating).fill(0).map((_, i) => (
                    <StarIcon key={i} size={14} className="text-gold" fill="currentColor" />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button 
                   onClick={() => toggleFeaturedTestimonial(t.id, !t.isFeatured).then(loadTestimonials)}
                   className={`p-2 rounded-full transition-colors ${t.isFeatured ? 'bg-gold/10 text-gold' : 'text-neutral-300 hover:text-gold'}`}
                   title={t.isFeatured ? 'Remove from Featured' : 'Pin to Homepage'}
                  >
                    <CheckCircle2Icon size={18} />
                  </button>
                  <button 
                    onClick={() => deleteTestimonial(t.id).then(loadTestimonials)}
                    className="p-2 text-neutral-300 hover:text-red-500 transition-colors"
                  >
                    <TrashIcon size={18} />
                  </button>
                </div>
              </div>
              <p className="font-body text-neutral-600 mb-6 italic leading-relaxed">"{t.content}"</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400">
                  <UserIcon size={20} />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-neutral-900 text-sm">{t.author}</h4>
                  <p className="text-xs text-neutral-500 font-body">{t.role || 'Guest'}</p>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}
