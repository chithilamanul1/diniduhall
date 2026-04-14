'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import {
  ShieldCheckIcon,
  UserPlusIcon,
  TrashIcon,
  MailIcon,
  ShieldIcon,
  ClockIcon,
} from 'lucide-react'
import { getStaff, createStaff, deleteStaff, updateStaffRole } from '@/app/actions/staff'

export default function StaffManagement() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [staff, setStaff] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'MANAGER' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isSuperAdmin = (session?.user as any)?.role === 'SUPER_ADMIN'

  useEffect(() => {
    if (status === 'unauthenticated' || (status === 'authenticated' && !isSuperAdmin)) {
      router.push('/admin')
    }
  }, [status, isSuperAdmin, router])

  useEffect(() => {
    loadStaff()
  }, [])

  async function loadStaff() {
    setLoading(true)
    const data = await getStaff()
    setStaff(data)
    setLoading(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)
    const result = await createStaff(formData)
    if (result.success) {
      setShowAddModal(false)
      setFormData({ name: '', email: '', password: '', role: 'MANAGER' })
      loadStaff()
    } else {
      alert(result.error)
    }
    setIsSubmitting(false)
  }

  async function handleDelete(id: string) {
    if (id === (session?.user as any).id) {
      alert("You cannot delete your own account.")
      return
    }
    if (!confirm('Are you sure you want to remove this staff member?')) return
    await deleteStaff(id)
    loadStaff()
  }

  if (status === 'loading' || !isSuperAdmin) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading text-neutral-900 tracking-tight">
            Staff <span className="italic font-light">Management</span>
          </h1>
          <p className="font-body text-neutral-500 mt-1">
            Manage manager accounts and administrative permissions.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-neutral-900 text-gold hover:bg-gold hover:text-white rounded-full font-body font-bold text-sm tracking-widest uppercase transition-all shadow-xl shadow-gold/10"
        >
          <UserPlusIcon className="w-5 h-5" />
          Add Manager
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          [1, 2, 3].map((i) => (
            <div key={i} className="bg-white h-48 rounded-[2rem] animate-pulse border border-neutral-100" />
          ))
        ) : staff.length > 0 ? (
          staff.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-[2rem] border border-neutral-100 shadow-sm relative group hover:shadow-xl hover:shadow-gold/5 transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center text-xl font-bold text-gold">
                  {member.name?.charAt(0) || 'U'}
                </div>
                <div className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                  member.role === 'SUPER_ADMIN' ? 'bg-neutral-900 text-gold' : 'bg-neutral-100 text-neutral-500'
                }`}>
                  {member.role === 'SUPER_ADMIN' ? 'Owner' : 'Manager'}
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-heading text-neutral-900 leading-tight truncate">{member.name}</h3>
                <p className="text-sm font-body text-neutral-500 mt-1 truncate">{member.email}</p>
              </div>

              <div className="mt-8 pt-6 border-t border-neutral-50 flex items-center justify-between">
                <div className="flex items-center text-xs text-neutral-400 font-body">
                  <ClockIcon className="w-4 h-4 mr-2" />
                  Joined {new Date(member.createdAt).toLocaleDateString()}
                </div>
                <button
                  onClick={() => handleDelete(member.id)}
                  className="p-2 text-neutral-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                  title="Remove Member"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center bg-white rounded-[2rem] border border-dashed border-neutral-200">
            <ShieldIcon className="w-16 h-16 mx-auto text-neutral-200 mb-4" />
            <p className="text-neutral-400 font-body">No other staff members found.</p>
          </div>
        )}
      </div>

      {/* Add Staff Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm"
            onClick={() => setShowAddModal(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative bg-white w-full max-w-lg rounded-[2.5rem] p-10 shadow-2xl overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full translate-x-12 -translate-y-12" />
            
            <h2 className="text-2xl font-heading text-neutral-900 relative">Add <span className="italic font-light">Staff Member</span></h2>
            <p className="text-sm font-body text-neutral-400 mt-1 mb-8 relative">Create a new account for managers or administrators.</p>

            <form onSubmit={handleSubmit} className="space-y-5 relative">
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-2 block px-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-6 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:ring-2 focus:ring-gold/20 outline-none transition-all font-body text-sm"
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-2 block px-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-6 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:ring-2 focus:ring-gold/20 outline-none transition-all font-body text-sm"
                    placeholder="manager@dinidugardens.lk"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-2 block px-1">Password</label>
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-6 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:ring-2 focus:ring-gold/20 outline-none transition-all font-body text-sm"
                    placeholder="••••••••"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-2 block px-1">Account Type</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-6 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:ring-2 focus:ring-gold/20 outline-none transition-all font-body text-sm"
                  >
                    <option value="MANAGER">Manager (Staff)</option>
                    <option value="SUPER_ADMIN">Owner (Super Admin)</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-8 py-4 border border-neutral-100 text-neutral-500 rounded-full font-body font-bold text-xs tracking-widest transition-all"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-8 py-4 bg-gold text-white rounded-full font-body font-bold text-xs tracking-widest transition-all shadow-lg shadow-gold/20 disabled:opacity-50"
                >
                  {isSubmitting ? 'CREATING...' : 'CREATE ACCOUNT'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}
