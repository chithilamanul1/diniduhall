'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  SendIcon, 
  UsersIcon, 
  MailIcon, 
  AlertCircleIcon,
  CheckCircle2Icon,
  EyeIcon,
  TypeIcon,
  MegaphoneIcon
} from 'lucide-react'
import { getSubscribers, sendBroadcast, getDashboardStats } from '@/app/actions/admin'

export default function MarketingAdmin() {
  const [subscribers, setSubscribers] = useState<any[]>([])
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)
  
  const [message, setMessage] = useState({
    subject: '',
    content: ''
  })

  const [status, setStatus] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    setLoading(true)
    const [subData, statsData] = await Promise.all([
      getSubscribers(),
      getDashboardStats()
    ])
    setSubscribers(subData)
    setStats(statsData)
    setLoading(false)
  }

  async function handleSend(e: React.FormEvent) {
    e.preventDefault()
    if (!message.subject || !message.content) return
    
    if (!confirm(`Are you sure you want to send this email to ${subscribers.length} subscribers?`)) return

    setSending(true)
    setStatus(null)
    
    try {
      const result = await sendBroadcast(message.subject, message.content)
      if (result.success) {
        setStatus({ type: 'success', text: `Successfully sent to ${result.sentTo} subscribers!` })
        setMessage({ subject: '', content: '' })
      } else {
        setStatus({ type: 'error', text: result.error || 'Failed to send broadcast.' })
      }
    } catch (error: any) {
      setStatus({ type: 'error', text: error.message || 'An unexpected error occurred.' })
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="space-y-10 pb-20">
      <div>
        <h1 className="text-3xl font-heading text-neutral-900 tracking-tight">
          Marketing <span className="italic font-light">Broadcast</span>
        </h1>
        <p className="font-body text-neutral-500 mt-1">
          Send newsletters and announcements to your subscribers.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Composer */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-neutral-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-heading text-xl">Email Composer</h2>
              <button 
                onClick={() => setPreviewMode(!previewMode)}
                className="text-xs font-body font-bold text-blue uppercase tracking-widest flex items-center gap-2"
              >
                {previewMode ? <TypeIcon size={14} /> : <EyeIcon size={14} />}
                {previewMode ? 'Back to Editor' : 'Preview Mode'}
              </button>
            </div>

            {previewMode ? (
              <div className="border border-neutral-100 rounded-2xl p-8 bg-neutral-50 min-h-[400px]">
                <h3 className="text-sm font-body font-bold text-neutral-400 mb-4 uppercase tracking-wider border-b pb-2">Subject: {message.subject || '(No Subject)'}</h3>
                <div 
                  className="prose prose-neutral max-w-none font-body text-neutral-700"
                  dangerouslySetInnerHTML={{ __html: message.content.replace(/\n/g, '<br/>') || '<p class="text-neutral-300 italic">Start typing to see preview...</p>' }}
                />
              </div>
            ) : (
              <form onSubmit={handleSend} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-body font-bold text-neutral-400 uppercase tracking-widest">Email Subject</label>
                  <input 
                    type="text" 
                    value={message.subject}
                    onChange={(e) => setMessage({...message, subject: e.target.value})}
                    placeholder="e.g., Special Offer for May Weddings!"
                    className="w-full bg-neutral-50 border border-neutral-100 rounded-xl px-6 py-4 outline-none focus:border-blue transition-colors font-body"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-body font-bold text-neutral-400 uppercase tracking-widest">Email Content (HTML supported)</label>
                  <textarea 
                    value={message.content}
                    onChange={(e) => setMessage({...message, content: e.target.value})}
                    placeholder="Write your announcement here..."
                    className="w-full bg-neutral-50 border border-neutral-100 rounded-xl px-6 py-4 outline-none focus:border-blue transition-colors font-body h-[300px] resize-none font-mono text-xs"
                    required
                  />
                </div>

                {status && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`p-4 rounded-xl flex items-center gap-3 ${status.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}
                  >
                    {status.type === 'success' ? <CheckCircle2Icon size={20} /> : <AlertCircleIcon size={20} />}
                    <span className="text-sm font-body font-medium">{status.text}</span>
                  </motion.div>
                )}

                <button 
                  type="submit"
                  disabled={sending || subscribers.length === 0}
                  className={`w-full py-4 rounded-xl font-body font-bold flex items-center justify-center gap-3 transition-all ${
                    sending || subscribers.length === 0 
                      ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed' 
                      : 'bg-blue text-white shadow-lg shadow-blue/20 hover:scale-[1.01]'
                  }`}
                >
                  {sending ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <SendIcon size={18} />
                  )}
                  {sending ? 'Sending Broadcast...' : `Send to ${subscribers.length} Subscribers`}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-neutral-100 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-blue/10 rounded-2xl text-blue">
                <UsersIcon size={24} />
              </div>
              <div>
                <h3 className="font-heading font-bold text-neutral-900">Audience</h3>
                <p className="text-sm font-body text-neutral-500">Reach your subscribers</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-neutral-50">
                <span className="text-sm font-body text-neutral-500">Total Subscribers</span>
                <span className="font-heading font-bold text-neutral-900">{subscribers.length}</span>
              </div>
              <p className="text-xs font-body text-neutral-400 leading-relaxed italic">
                * Broadcasts are delivered via Resend. Ensure your verified sender domain is configured for high deliverability.
              </p>
            </div>
          </div>

          <div className="bg-cream p-8 rounded-3xl border border-white shadow-sm overflow-hidden relative">
             <MailIcon className="absolute -right-4 -bottom-4 w-32 h-32 text-white/40 rotate-12" />
             <h3 className="font-heading font-bold text-neutral-900 mb-2">Tips</h3>
             <ul className="text-xs font-body text-neutral-600 space-y-3 relative z-10">
               <li className="flex gap-2">• Use emojis in subjects for higher open rates</li>
               <li className="flex gap-2">• Keep your message clear and call-to-action focused</li>
               <li className="flex gap-2">• Test your HTML in preview mode before sending</li>
             </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
