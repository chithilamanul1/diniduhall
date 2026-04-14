'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  UsersIcon, 
  MapPinIcon, 
  ImageIcon, 
  InfoIcon,
  CheckCircle2Icon,
  XCircleIcon,
  SearchIcon
} from 'lucide-react'
import { getAllVenues, createVenue, updateVenue, deleteVenue } from '@/app/actions/venues'

export default function VenueManagement() {
  const [venues, setVenues] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingVenue, setEditingVenue] = useState<any>(null)
  const [actionLoading, setActionLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    capacity: 0,
    location: '',
    amenities: '',
    isActive: true
  })

  useEffect(() => {
    loadVenues()
  }, [])

  async function loadVenues() {
    setLoading(true)
    const data = await getAllVenues()
    setVenues(data)
    setLoading(false)
  }

  const handleOpenModal = (venue: any = null) => {
    if (venue) {
      setEditingVenue(venue)
      setFormData({
        name: venue.name,
        description: venue.description || '',
        capacity: venue.capacity,
        location: venue.location || '',
        amenities: venue.amenities?.join(', ') || '',
        isActive: venue.isActive
      })
    } else {
      setEditingVenue(null)
      setFormData({
        name: '',
        description: '',
        capacity: 0,
        location: '',
        amenities: '',
        isActive: true
      })
    }
    setIsModalOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setActionLoading(true)
    
    const processedData = {
      ...formData,
      capacity: Number(formData.capacity),
      amenities: formData.amenities.split(',').map(s => s.trim()).filter(Boolean)
    }

    if (editingVenue) {
      await updateVenue(editingVenue.id, processedData)
    } else {
      await createVenue(processedData)
    }

    await loadVenues()
    setIsModalOpen(false)
    setActionLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this venue? This action cannot be undone.')) return
    setActionLoading(true)
    await deleteVenue(id)
    await loadVenues()
    setActionLoading(false)
  }

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-heading text-neutral-900 tracking-tight">
            Hall <span className="italic font-light">Management</span>
          </h1>
          <p className="font-body text-neutral-500 mt-1">
            Manage your banquet halls, capacities, and venue details.
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-neutral-900 text-white px-6 py-3 rounded-full font-body font-medium flex items-center justify-center space-x-2 hover:bg-neutral-800 transition-all shadow-sm"
        >
          <PlusIcon className="w-5 h-5" />
          <span>Add New Hall</span>
        </button>
      </div>

      {/* Venues Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          Array(3).fill(0).map((_, i) => (
            <div key={i} className="bg-white rounded-[2.5rem] p-8 border border-neutral-100 shadow-sm animate-pulse h-64" />
          ))
        ) : venues.length > 0 ? (
          venues.map((venue, i) => (
            <motion.div
              key={venue.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white rounded-[2.5rem] p-8 border border-neutral-100 shadow-sm hover:shadow-xl transition-all relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${venue.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {venue.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>

              <div className="space-y-6">
                <div className="w-14 h-14 bg-gold/10 rounded-2xl flex items-center justify-center">
                  <ImageIcon className="w-7 h-7 text-gold" />
                </div>
                
                <div>
                  <h3 className="text-2xl font-heading font-bold text-neutral-900 leading-tight">
                    {venue.name}
                  </h3>
                  <div className="flex items-center text-neutral-500 text-sm mt-2 font-body">
                    <MapPinIcon className="w-4 h-4 mr-1.5" />
                    {venue.location || 'Main Premises'}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-100">
                    <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold mb-1">Capacity</p>
                    <div className="flex items-center text-neutral-900 font-bold">
                      <UsersIcon className="w-4 h-4 mr-2 text-gold" />
                      {venue.capacity}
                    </div>
                  </div>
                  <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-100">
                    <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold mb-1">Inquiries</p>
                    <div className="flex items-center text-neutral-900 font-bold">
                      <SearchIcon className="w-4 h-4 mr-2 text-gold" />
                      {venue._count?.bookings || 0}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => handleOpenModal(venue)}
                    className="flex-1 bg-neutral-50 text-neutral-600 hover:bg-neutral-100 p-3 rounded-xl transition-colors flex items-center justify-center font-medium text-sm"
                  >
                    <PencilIcon className="w-4 h-4 mr-2" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(venue.id)}
                    className="p-3 bg-red-50 text-red-500 hover:bg-red-100 rounded-xl transition-colors"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full py-20 bg-white rounded-[2.5rem] border border-dashed border-neutral-200 text-center">
            <InfoIcon className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
            <p className="text-neutral-500 font-body">No venues found. Add your first hall to get started.</p>
          </div>
        )}
      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-[3rem] shadow-2xl w-full max-w-2xl overflow-hidden relative"
            >
              <div className="p-8 md:p-12">
                <h2 className="text-3xl font-heading text-neutral-900 mb-8">
                  {editingVenue ? 'Edit' : 'Add New'} <span className="italic font-light">Hall</span>
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest font-bold text-neutral-400">Hall Name</label>
                      <input
                        type="text"
                        required
                        className="w-full bg-neutral-50 border border-neutral-100 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-gold/20 focus:border-gold outline-none transition-all"
                        placeholder="e.g. Grand Ballroom"
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest font-bold text-neutral-400">Capacity</label>
                      <input
                        type="number"
                        required
                        className="w-full bg-neutral-50 border border-neutral-100 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-gold/20 focus:border-gold outline-none transition-all"
                        placeholder="e.g. 250"
                        value={formData.capacity}
                        onChange={e => setFormData({...formData, capacity: Number(e.target.value)})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-bold text-neutral-400">Location / Specifics</label>
                    <input
                      type="text"
                      className="w-full bg-neutral-50 border border-neutral-100 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-gold/20 focus:border-gold outline-none transition-all"
                      placeholder="e.g. Main Floor, AC"
                      value={formData.location}
                      onChange={e => setFormData({...formData, location: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-bold text-neutral-400">Description</label>
                    <textarea
                      rows={3}
                      className="w-full bg-neutral-50 border border-neutral-100 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-gold/20 focus:border-gold outline-none transition-all resize-none"
                      placeholder="Describe the hall features..."
                      value={formData.description}
                      onChange={e => setFormData({...formData, description: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-bold text-neutral-400">Amenities (comma separated)</label>
                    <input
                      type="text"
                      className="w-full bg-neutral-50 border border-neutral-100 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-gold/20 focus:border-gold outline-none transition-all"
                      placeholder="e.g. AC, Sound System, Stage"
                      value={formData.amenities}
                      onChange={e => setFormData({...formData, amenities: e.target.value})}
                    />
                  </div>

                  <div className="flex items-center space-x-3 pt-2">
                    <input
                      type="checkbox"
                      id="isActive"
                      className="w-5 h-5 accent-gold rounded"
                      checked={formData.isActive}
                      onChange={e => setFormData({...formData, isActive: e.target.checked})}
                    />
                    <label htmlFor="isActive" className="text-sm font-body text-neutral-600">Active and available for booking</label>
                  </div>

                  <div className="flex items-center gap-4 pt-6">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 px-6 py-4 rounded-full font-body font-medium border border-neutral-200 hover:bg-neutral-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={actionLoading}
                      className="flex-1 bg-neutral-900 text-white px-6 py-4 rounded-full font-body font-medium hover:bg-neutral-800 transition-all flex items-center justify-center space-x-2"
                    >
                      {actionLoading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <span>{editingVenue ? 'Save Changes' : 'Create Hall'}</span>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
