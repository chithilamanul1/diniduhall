'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { UsersIcon, TrashIcon, PlusIcon, MailIcon } from 'lucide-react'
import { getSubscribers, addSubscriber, removeSubscriber } from '@/app/actions/admin'

export default function AdminSubscribers() {
  const [subscribers, setSubscribers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [adding, setAdding] = useState(false)

  useEffect(() => {
    loadSubscribers()
  }, [])

  async function loadSubscribers() {
    setLoading(true)
    const data = await getSubscribers()
    setSubscribers(data)
    setLoading(false)
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    setAdding(true)
    setError('')
    const result = await addSubscriber(email)
    if (result && 'error' in result) {
      setError(result.error)
    } else {
      setEmail('')
      await loadSubscribers()
    }
    setAdding(false)
  }

  async function handleRemove(id: string) {
    if (!confirm('Remove this subscriber?')) return
    await removeSubscriber(id)
    await loadSubscribers()
  }

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-heading text-neutral-900 tracking-tight">
          Subscriber <span className="italic font-light">Management</span>
        </h1>
        <p className="font-body text-neutral-500 mt-1">
          Manage your email marketing list and newsletter subscribers.
        </p>
      </div>

      {/* Stats */}
      <div className="bg-white p-6 rounded-3xl border border-neutral-100 shadow-sm flex items-center space-x-4 w-fit">
        <div className="p-4 rounded-2xl bg-purple-50">
          <UsersIcon className="w-6 h-6 text-purple-500" />
        </div>
        <div>
          <p className="text-sm font-body text-neutral-500 font-medium">
            Total Subscribers
          </p>
          <p className="text-2xl font-heading font-bold text-neutral-900">
            {subscribers.length}
          </p>
        </div>
      </div>

      {/* Add Subscriber */}
      <div className="bg-white rounded-3xl p-8 border border-neutral-100 shadow-sm">
        <h3 className="text-lg font-heading text-neutral-900 mb-4">
          Add Subscriber Manually
        </h3>
        <form onSubmit={handleAdd} className="flex gap-4 items-start">
          <div className="flex-1">
            <input
              type="email"
              required
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-4 rounded-2xl border border-neutral-200 bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-gold transition-all font-body"
            />
            {error && (
              <p className="text-red-500 text-sm font-body mt-2">{error}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={adding}
            className="bg-gold text-white px-8 py-4 rounded-full font-body font-semibold text-sm tracking-widest hover:bg-gold/90 transition-all flex items-center gap-2 shadow-lg shadow-gold/20 whitespace-nowrap"
          >
            <PlusIcon className="w-4 h-4" />
            {adding ? 'ADDING...' : 'ADD'}
          </button>
        </form>
      </div>

      {/* Subscriber List */}
      <div className="bg-white rounded-3xl border border-neutral-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-neutral-50">
          <h2 className="text-xl font-heading text-neutral-900 font-semibold">
            All Subscribers
          </h2>
        </div>
        <div className="divide-y divide-neutral-50">
          {loading ? (
            <div className="py-20 flex justify-center">
              <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin" />
            </div>
          ) : subscribers.length > 0 ? (
            subscribers.map((sub, idx) => (
              <motion.div
                key={sub.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.03 }}
                className="flex justify-between items-center px-6 py-4 hover:bg-neutral-50/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <MailIcon className="w-5 h-5 text-purple-500" />
                  </div>
                  <div>
                    <p className="font-body font-medium text-neutral-900">
                      {sub.email}
                    </p>
                    <p className="font-body text-xs text-neutral-400">
                      Subscribed{' '}
                      {new Date(sub.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(sub.id)}
                  className="p-2 hover:bg-red-50 rounded-full text-neutral-400 hover:text-red-500 transition-colors"
                  title="Remove"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </motion.div>
            ))
          ) : (
            <div className="py-20 text-center text-neutral-400">
              <UsersIcon className="w-12 h-12 mx-auto mb-4 opacity-10" />
              <p className="font-body">No subscribers yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
