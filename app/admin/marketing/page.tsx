'use client'

import React, { useState, useEffect } from 'react'
import { MegaphoneIcon, SendIcon, UsersIcon, CheckCircle2Icon } from 'lucide-react'
import { sendBroadcast, getSubscribers } from '@/app/actions/admin'

export default function MarketingBroadcaster() {
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [subCount, setSubCount] = useState(0)

  useEffect(() => {
    getSubscribers().then((subs) => setSubCount(subs.length))
  }, [])

  const handleBroadcast = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResult(null)

    const res = await sendBroadcast(subject, message)
    setResult(res)

    if (res.success) {
      setSubject('')
      setMessage('')
    }
    setLoading(false)
  }

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-heading text-neutral-900 tracking-tight">
          Marketing <span className="italic font-light">Broadcaster</span>
        </h1>
        <p className="font-body text-neutral-500 mt-1">
          Announce new offers and updates to your subscribed customers.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-3xl p-10 border border-neutral-100 shadow-sm">
          <form className="space-y-6" onSubmit={handleBroadcast}>
            {result?.success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-2xl flex items-center gap-3">
                <CheckCircle2Icon className="w-5 h-5" />
                Broadcast sent to {result.sentTo} subscriber(s).
              </div>
            )}

            {result?.error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-2xl">
                {result.error}
              </div>
            )}

            <div>
              <label className="block text-sm font-body font-medium text-neutral-700 mb-2">
                Campaign Subject
              </label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Exclusive Wedding Package Offer 2026"
                className="w-full px-6 py-4 rounded-2xl border border-neutral-200 bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-gold transition-all font-body"
              />
            </div>

            <div>
              <label className="block text-sm font-body font-medium text-neutral-700 mb-2">
                Email Content (HTML Supported)
              </label>
              <textarea
                required
                rows={10}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="<h2>Special Offer!</h2><p>Book your dream wedding at Dinidu Gardens...</p>"
                className="w-full px-6 py-4 rounded-2xl border border-neutral-200 bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-gold transition-all font-body font-mono text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loading || subCount === 0}
              className={`bg-gold text-white px-10 py-4 rounded-full font-body font-semibold tracking-widest hover:bg-gold/90 transition-all flex items-center justify-center gap-3 w-full shadow-lg shadow-gold/20 ${
                loading || subCount === 0 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <MegaphoneIcon className="w-5 h-5" />
              <span>{loading ? 'SENDING BROADCAST...' : 'SEND BROADCAST'}</span>
            </button>
          </form>
        </div>

        <div className="space-y-6">
          <div className="bg-neutral-900 rounded-3xl p-8 text-white">
            <div className="flex items-center space-x-3 mb-4">
              <UsersIcon className="w-6 h-6 text-gold" />
              <h3 className="font-heading text-xl">Subscriber Stats</h3>
            </div>
            <p className="text-4xl font-heading font-bold mb-2">{subCount}</p>
            <p className="font-body text-neutral-500 text-sm">
              Active subscribers ready for broadcasts.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-neutral-100">
            <h4 className="font-heading text-lg text-neutral-900 mb-3">
              Tips
            </h4>
            <ul className="space-y-2 font-body text-sm text-neutral-500">
              <li>• Use <code>&lt;h2&gt;</code> for headings</li>
              <li>• Use <code>&lt;p&gt;</code> for paragraphs</li>
              <li>• Use <code>&lt;img&gt;</code> for imagery</li>
              <li>• Keep subject lines under 60 chars</li>
              <li>• Clear CTAs drive bookings</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
