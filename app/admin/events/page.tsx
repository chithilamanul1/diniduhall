'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  CalendarIcon,
  PlusIcon,
  LockIcon,
  UnlockIcon,
  TrashIcon,
  EditIcon,
} from 'lucide-react'
import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  lockEventDate,
} from '@/app/actions/admin'

export default function AdminEvents() {
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [description, setDescription] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadEvents()
  }, [])

  async function loadEvents() {
    setLoading(true)
    const data = await getEvents()
    setEvents(data)
    setLoading(false)
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    await createEvent({ title, date, description })
    setTitle('')
    setDate('')
    setDescription('')
    setShowForm(false)
    await loadEvents()
    setSaving(false)
  }

  async function handleLock(id: string) {
    await lockEventDate(id)
    await loadEvents()
  }

  async function handleUnlock(id: string) {
    await updateEvent(id, { isLocked: false })
    await loadEvents()
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this event?')) return
    await deleteEvent(id)
    await loadEvents()
  }

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-heading text-neutral-900 tracking-tight">
            Event <span className="italic font-light">Calendar</span>
          </h1>
          <p className="font-body text-neutral-500 mt-1">
            Manage events and lock dates to prevent double-booking.
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-gold text-white px-6 py-3 rounded-full font-body font-semibold text-sm tracking-widest hover:bg-gold/90 transition-all flex items-center gap-2 shadow-lg shadow-gold/20"
        >
          <PlusIcon className="w-4 h-4" />
          ADD EVENT
        </button>
      </div>

      {/* Create Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-8 border border-neutral-100 shadow-sm"
        >
          <h3 className="text-lg font-heading text-neutral-900 mb-6">
            New Event
          </h3>
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                required
                placeholder="Event Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-5 py-4 rounded-2xl border border-neutral-200 bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-gold transition-all font-body"
              />
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-5 py-4 rounded-2xl border border-neutral-200 bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-gold transition-all font-body"
              />
            </div>
            <textarea
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-5 py-4 rounded-2xl border border-neutral-200 bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-gold transition-all font-body"
            />
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="bg-gold text-white px-8 py-3 rounded-full font-body font-semibold text-sm tracking-widest hover:bg-gold/90 transition-all"
              >
                {saving ? 'SAVING...' : 'CREATE EVENT'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-8 py-3 rounded-full font-body text-sm text-neutral-500 hover:bg-neutral-100 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Events List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin" />
          </div>
        ) : events.length > 0 ? (
          events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`bg-white rounded-3xl p-8 border shadow-sm transition-all ${
                event.isLocked
                  ? 'border-blue-200 bg-blue-50/30'
                  : 'border-neutral-100'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div
                  className={`p-3 rounded-2xl ${
                    event.isLocked ? 'bg-blue-100' : 'bg-gold/10'
                  }`}
                >
                  <CalendarIcon
                    className={`w-5 h-5 ${
                      event.isLocked ? 'text-blue-600' : 'text-gold'
                    }`}
                  />
                </div>
                {event.isLocked && (
                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium flex items-center gap-1">
                    <LockIcon className="w-3 h-3" />
                    LOCKED
                  </span>
                )}
              </div>

              <h3 className="font-heading text-xl font-semibold text-neutral-900 mb-2">
                {event.title}
              </h3>
              <p className="font-body text-sm text-neutral-500 mb-1">
                {new Date(event.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              {event.description && (
                <p className="font-body text-sm text-neutral-400 mt-2">
                  {event.description}
                </p>
              )}

              <div className="flex gap-2 mt-6 pt-4 border-t border-neutral-100">
                {event.isLocked ? (
                  <button
                    onClick={() => handleUnlock(event.id)}
                    className="p-2 hover:bg-neutral-100 rounded-full text-neutral-400 transition-colors"
                    title="Unlock date"
                  >
                    <UnlockIcon className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => handleLock(event.id)}
                    className="p-2 hover:bg-blue-50 rounded-full text-blue-600 transition-colors"
                    title="Lock date"
                  >
                    <LockIcon className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => handleDelete(event.id)}
                  className="p-2 hover:bg-red-50 rounded-full text-neutral-400 hover:text-red-500 transition-colors"
                  title="Delete event"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center text-neutral-400">
            <CalendarIcon className="w-12 h-12 mx-auto mb-4 opacity-10" />
            <p className="font-body">No events created yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}
